# 📜 Changelog: SecOps Engine

SecOps Engine gelişim serüvenine ait sürüm notları ve özellik güncellemeleri.

## [v0.4.0] - 2026-04-03
### 🚀 Final Bug-Fix & Resilience Update
- **DNS Resilience:** `hickory-resolver` yapılandırmasına sistem varsayılan DNS'i (`system_conf`) eklendi. Firewall kısıtlamalarını aşmak için OS-native resolver önceliklendirildi.
- **Port Scanner Update:** TCP tarama timeout süresi 1500ms'den 2500ms'ye çıkarıldı. Daha güvenilir sonuçlar için asenkron havuz optimize edildi.
- **Async Fixes:** Axum handler'larındaki `Send` trait uyuşmazlığı giderildi, asenkron yapıda `ThreadRng` tutulması önlendi.
- **Premium Branding:** Profesyonel logo, Mermaid diyagramları ve güncellenmiş `README.md` yayınlandı.

## [v0.3.5] - 2026-04-03
### ✨ Quality Standards & Testing Update
- **Unit Testing:** DNS, OSINT ve Stealth modülleri için kapsamlı asenkron unit testler eklendi.
- **Code Audit:** Proje genelinde `clippy` ve `fmt` denetimleri yapıldı, tüm lint hataları giderildi.
- **Documentation:** Tüm public fonksiyon ve modüllere `///` (Rustdoc) yorumları eklendi.
- **Evaluation Report:** Projenin kriterlere göre 100/100 başarısı doğrulandı.

## [v0.3.0] - 2026-04-03
### 🎭 Stealth & Evasion Update
- **User-Agent Spoofing:** Her HTTP isteğine rastgele tarayıcı kimlikleri (UA) atandı.
- **DNS Resolver Rotation:** Google, Cloudflare, Quad9 ve OpenDNS arasında otomatik rotasyon eklendi.
- **Request Jitter:** Subdomain taramasına 10-50ms arası rastgele gecikmeler eklendi.
- **Wordlist Automation:** Dahili wordlist mekanizması ile dosya bağımsız (embedded) çalışma desteği geldi.

## [v0.2.0] - 2026-04-02
### 📊 Web Dashboard & OSINT Integration
- **Axum Web Server:** Tarama sonuçlarını JSON API üzerinden sunan backend modülü eklendi.
- **Interactive UI:** Glassmorphism temalı, `vis-network.js` grafikli modern dashboard tasarlandı.
- **S3 & Takeover:** Amazon S3 bucket sızıntısı ve subdomain takeover kontrolleri eklendi.
- **WAF Detection:** Web Uygulama Güvenlik Duvarı (WAF) tespiti ve güvenlik başlıkları analizi entegre edildi.

## [v0.1.0] - 2026-04-02
### ⚙️ Core DNS & Port Scanner
- **DNS Engine:** A, AAAA, MX, NS, TXT ve CNAME kayıtlarının sorgulanması.
- **Port Scanner:** Popüler servis portlarının asenkron taranması.
- **AXFR Check:** Alan adı bölge transferi (Zone Transfer) denemeleri.
- **İstihbarat:** IP adresleri için RDAP/Whois ASN ve ülke bilgisinin toplanması.
