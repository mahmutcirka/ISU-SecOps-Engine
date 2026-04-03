try {
    if (typeof feather !== 'undefined') feather.replace();
} catch (e) {
    console.error('Feather icons error:', e);
}

const form = document.getElementById('dns-form');
const loader = document.getElementById('loader');
const resultsContainer = document.getElementById('results-container');
const submitBtn = document.getElementById('submit-btn');

const tabStandard = document.getElementById('tab-standard');
const tabSecurity = document.getElementById('tab-security');
const tabAxfr = document.getElementById('tab-axfr');
const tabSubdomains = document.getElementById('tab-subdomains');

// Create error container dynamically
const errContainer = document.createElement('div');
errContainer.style.color = '#ef4444';
errContainer.style.background = 'rgba(239, 68, 68, 0.1)';
errContainer.style.padding = '12px';
errContainer.style.borderRadius = '8px';
errContainer.style.marginBottom = '20px';
errContainer.style.display = 'none';
form.insertAdjacentElement('afterend', errContainer);

// Tab Switching
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        btn.classList.add('active');
        const target = btn.getAttribute('data-target');
        document.querySelector(target).classList.add('active');
    });
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    errContainer.style.display = 'none';
    
    let rawDomain = document.getElementById('domain').value.trim();
    // Sanitize domain (remove http://, https://, and paths)
    try {
        if (rawDomain.startsWith('http://') || rawDomain.startsWith('https://')) {
            const url = new URL(rawDomain);
            rawDomain = url.hostname;
        } else if (rawDomain.includes('/')) {
            rawDomain = rawDomain.split('/')[0];
        }
    } catch(e) {
        // Fallback to simple replace
        rawDomain = rawDomain.replace(/^https?:\/\//, '').split('/')[0];
    }
    
    // Strip www. if user types it manually, to ensure DMARC/SPF lookups hit the root
    if (rawDomain.startsWith('www.')) {
        rawDomain = rawDomain.substring(4);
    }
    
    const domain = rawDomain.trim();
    
    let wordlist = document.getElementById('wordlist').value.trim();

    if (!domain) return;

    // UI State
    submitBtn.disabled = true;
    loader.classList.remove('hidden');
    resultsContainer.classList.add('hidden');

    try {
        const payload = {
            domain,
            wordlist: wordlist ? wordlist : null
        };

        const response = await fetch('/api/dns/enumerate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const json = await response.json();

        if (json.success && json.data) {
            renderResults(json.data);
            resultsContainer.classList.remove('hidden');
        } else {
            errContainer.textContent = "Error: " + (json.error || "Unknown error occurred on server.");
            errContainer.style.display = 'block';
        }

    } catch (err) {
        errContainer.textContent = "Bağlantı hatası: Sunucu yanıt vermiyor. (cargo run -- server çalışıyor mu?)";
        errContainer.style.display = 'block';
        console.error(err);
    } finally {
        submitBtn.disabled = false;
        loader.classList.add('hidden');
    }
});

function renderResults(data) {
    // 1. Standard Records
    if (data.standard_records && data.standard_records.length > 0) {
        tabStandard.innerHTML = data.standard_records.map(r => `
            <div class="record-row">
                <span class="badge info">${r.record_type}</span>
                <span class="record-value">${r.value}</span>
            </div>
        `).join('');
    } else {
        tabStandard.innerHTML = `<div class="empty-state">No standard records found.</div>`;
    }

    // 2. Security Controls
    let secHtml = '';
    const s = data.security;
    if (s) {
        s.spf.forEach(val => {
            const isDanger = val.includes("Not Found");
            secHtml += `<div class="record-row"><span class="badge ${isDanger ? 'danger' : 'success'}">SPF</span><span class="record-value">${val}</span></div>`;
        });
        s.dmarc.forEach(val => {
            const isDanger = val.includes("Not Found");
            secHtml += `<div class="record-row"><span class="badge ${isDanger ? 'danger' : 'success'}">DMARC</span><span class="record-value">${val}</span></div>`;
        });
        s.dkim.forEach(val => {
            const isDanger = val.includes("Not Found");
            secHtml += `<div class="record-row"><span class="badge ${isDanger ? 'danger' : 'success'}">DKIM</span><span class="record-value">${val}</span></div>`;
        });
    }
    tabSecurity.innerHTML = secHtml || `<div class="empty-state">No security records found.</div>`;

    // 3. AXFR
    if (data.axfr && data.axfr.length > 0) {
        tabAxfr.innerHTML = data.axfr.map(a => {
            const isSuccess = a.status === 'success';
            let html = `<div class="record-row" style="flex-direction: column;">
                <div style="display: flex; margin-bottom: 8px;">
                    <span class="badge ${isSuccess ? 'danger' : 'success'}">AXFR</span>
                    <span class="record-value" style="font-weight: 600;">${a.ns}</span>
                </div>`;
            
            if (isSuccess) {
                html += `<div style="background: rgba(0,0,0,0.3); padding: 10px; border-radius: 8px; font-family: monospace; font-size: 0.85rem; max-height: 200px; overflow-y: auto;">`;
                html += a.records.join('<br>');
                html += `</div>`;
            } else {
                html += `<div style="color: var(--text-secondary); font-size: 0.9rem;">${a.status}</div>`;
            }
            html += `</div>`;
            return html;
        }).join('');
    } else {
        tabAxfr.innerHTML = `<div class="empty-state">No Name Servers found to attempt AXFR.</div>`;
    }

    // 4. Subdomains
    let subHtml = '';
    if (data.osint_subdomains && data.osint_subdomains.length > 0) {
        subHtml += `<h4 style="margin-bottom:12px; color:var(--info);">Passive OSINT (crt.sh)</h4>`;
        subHtml += data.osint_subdomains.map(sub => `
            <div class="record-row" style="padding: 8px 0;">
                <span class="record-value" style="color: var(--text-primary); min-width: 150px;"><i data-feather="search" style="width:14px; height:14px; margin-right:8px; color:var(--text-secondary);"></i>${sub}</span>
            </div>
        `).join('');
    }
    
    if (data.subdomains && data.subdomains.length > 0) {
        subHtml += `<h4 style="margin-top:20px; margin-bottom:12px; color:var(--success);">Brute-Force Hits</h4>`;
        subHtml += data.subdomains.map(sub => `
            <div class="record-row" style="padding: 8px 0;">
                <span class="record-value" style="color: var(--success); font-weight: 600; min-width: 150px;">${sub.subdomain}</span>
                <span class="record-value" style="color: var(--text-secondary);">${sub.ips.join(', ')}</span>
            </div>
        `).join('');
    }
    
    if (!subHtml) {
        subHtml = `<div class="empty-state">No subdomains found or wordlist not provided.</div>`;
    }
    tabSubdomains.innerHTML = subHtml;

    // 5. IP & Port Intel
    const tabIpIntel = document.getElementById('tab-ipintel');
    if (tabIpIntel) {
        let intelHtml = '';
        if (data.ip_intel && data.ip_intel.length > 0) {
            intelHtml += `<h4 style="margin-bottom:12px; color:var(--info);">IP Intelligence / Whois</h4>`;
            data.ip_intel.forEach(intel => {
                intelHtml += `
                    <div class="record-row" style="display:flex; justify-content:space-between;">
                        <span style="font-weight:bold; color:var(--success)">${intel.ip}</span>
                        <span style="color:var(--text-secondary)">${intel.country} / ${intel.network_name}</span>
                    </div>
                `;
            });
        }
        if (data.open_ports && data.open_ports.length > 0) {
            intelHtml += `<h4 style="margin-top:20px; margin-bottom:12px; color:var(--warning);">Open TCP Ports</h4><div style="display:flex; gap:10px; flex-wrap:wrap;">`;
            data.open_ports.forEach(port => {
                intelHtml += `<span class="badge warning" style="margin:0">${port.port}/TCP (${port.service})</span>`;
            });
            intelHtml += `</div>`;
        }
        tabIpIntel.innerHTML = intelHtml || `<div class="empty-state">No Intel data acquired.</div>`;
    }
    
    feather.replace();
}
