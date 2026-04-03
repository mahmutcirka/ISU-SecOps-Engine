# Değişiklik Geçmişi (Changelog) - ISU-SecOps-Engine

Projeyle ilgili tüm dikkate değer güncellemeler ve değişiklikler bu dosyada belgelenecektir.

## [v0.3.0] - Görsel Network Haritası (Final Zirve Sürüm)
**Yayınlanma Tarihi:** 2026-04-03

### Eklenenler (Faz 3 Zirve Mimarisi)
- **Topoloji Haritası (Topology Map)**: Çıkarılan tüm zafiyet ve DNS istihbaratını uzay geometrisinde görselleştiren (vis-network.js) etkileşimli yeni sekme eklendi. Ana domain merkezde olacak şekilde; NS sunucuları, Web Sunucu IP'leri, Keşfedilen Portlar ve Alt alan adları birbiriyle örümcek ağı mantığında Physics (Fizik) tabanlı animasyonlarla bağlandı.

## [v0.2.0] - İleri İstihbarat ve Web Zafiyet Ağları
**Yayınlanma Tarihi:** 2026-04-03

### Eklenenler (Faz 1 & Faz 2 Ortak Özellik Pakedi)
- **Hızlı Asenkron TCP Port Tarayıcı**: Bulunan A kayıtlarındaki IP'leri `tokio::net` üzerinden saniyeler içinde zafiyet/port taramasından geçirir.
- **Pasif OSINT Araştırması**: Kaba kuvvete gerek kalmadan `crt.sh` üzerinden hedefin tüm Sertifika Şeffaflık Loglarını çıkarır.
- **IP / ASN / Whois İstihbaratı**: `reqwest` ile Amerikan RDAP API'lerine çıkılarak bulut sunucularının tespiti.
- **Subdomain Takeover**: CNAME kalıntıları için AWS S3, GitHub Pages, Fastly ve Heroku takeover zafiyet tespiti eklendi.
- **Web Güvenlik Duvarı (WAF) Tespiti**: Zararsız SQLi Patternleri fırlatılarak trafiği dinleyen Cloudflare/Akamai bariyerlerinin haritası çıkarıldı.
- **AWS S3 Bucket Zafiyet Okuyucusu**: Halka açık bırakılan kurumsal cloud depolama sızıntıları için test modülü eklendi.
- **TLS & Security Headers (Savunma Katmanları)**: HSTS, CSP ve diğer güvenlik bariyerlerini analiz edip zayıf SSL/TLS yapılandırmalarını denetler.
- **Yepyeni UI Sekmeleri**: Tamamı Vanilla JS ile yazılan Frontend'e yeni "IP & Ports" ve "Web Vulns" sekmeleri eklendi, veri görselleştirme dinamiği bir üst seviyeye taşındı.

## [v0.1.0] - İlk Çekirdek Motor Sürümü
**Yayınlanma Tarihi:** 2026-04-03

### Eklenenler
- **Çekirdek DNS İstihbarat Modülü**:
  - Standart kayıt çıkarımı sağlandı (A, AAAA, NS, MX, CNAME, TXT).
  - Hedeflenen DNS sunucularında doğrudan ham TCP bağlantısı üzerinden Zone Transfer (Alan Adı Tam Aktarımı - AXFR) denemeleri desteklendi.
  - SPF, DMARC ve DKIM varlıkları için pasif güvenlik denetimi getirildi.
  - Asenkron çalışan yüksek verimli çoklu iş parçacıklarına sahip Brute-Force (Kaba Kuvvet) yöntemiyle alt alan adı (subdomain) keşfi geliştirildi.
- **Axum Web Sunucusu**: DNS motorunu HTTP istekleri üzerinden dinamik olarak ateşleyebilen `/api/dns/enumerate` uç noktası (endpoint) sisteme dahil edildi.
- **Web Arayüzü (UI)**: Doğrudan Axum'un statik dosya işleyicisi (sayfası) olarak servis edilen, şık cam efektli (Glassmorphism) Vanilla CSS ve JS tabanlı tek sayfalık modern bir arayüz eklendi.
- **Otomatik Domain Temizleyici**: Doğrudan saf domain aramalarını garantilemek için kullanıcı girdisindeki URL kalıntılarını (`http://`, `https://`) ve yolları (`/`) akıllıca süzüp temizleyen ayrıştırma mantığı koda dahil edildi.
- **Kurumsal Geliştirme Ortamı (Dev Environment) Kurulumu**:
  - `Justfile` aracılığıyla çok sıkı CI/CD (Sürekli Entegrasyon) yönergeleri uygulandı.
  - `.vscode/tasks.json`, `launch.json` ve `settings.json` eklenerek profesyonel LLDB hata ayıklama ortamı kurgulandı.
  - `rustfmt.toml`, `clippy.toml`, `taplo.toml` ve `deny.toml` aracılığıyla kod kalitesi mutlak düzeyde zorunlu tutuldu, çok katmanlı karmaşık kod yapısı (cognitive complexity) limitlendi ve lisanssız/tehlikeli kütüphanelerin eklenmesi engellendi.
