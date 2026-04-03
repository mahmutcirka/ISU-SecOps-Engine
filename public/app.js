feather.replace();

const form = document.getElementById('dns-form');
const loader = document.getElementById('loader');
const resultsContainer = document.getElementById('results-container');
const submitBtn = document.getElementById('submit-btn');

const tabStandard = document.getElementById('tab-standard');
const tabSecurity = document.getElementById('tab-security');
const tabAxfr = document.getElementById('tab-axfr');
const tabSubdomains = document.getElementById('tab-subdomains');

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
    
    const domain = document.getElementById('domain').value.trim();
    const wordlist = document.getElementById('wordlist').value.trim();

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
            alert("Error: " + (json.error || "Unknown error occurred"));
        }

    } catch (err) {
        alert("Failed to connect to the server.");
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
    if (data.subdomains && data.subdomains.length > 0) {
        tabSubdomains.innerHTML = data.subdomains.map(sub => `
            <div class="record-row">
                <span class="record-value" style="color: var(--success); font-weight: 600; min-width: 150px;">${sub.subdomain}</span>
                <span class="record-value" style="color: var(--text-secondary);">${sub.ips.join(', ')}</span>
            </div>
        `).join('');
    } else {
        tabSubdomains.innerHTML = `<div class="empty-state">No subdomains found or wordlist not provided.</div>`;
    }
}
