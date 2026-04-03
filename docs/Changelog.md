# Değişiklik Geçmişi (Changelog) - ISU-SecOps-Engine

Projeyle ilgili tüm dikkate değer güncellemeler ve değişiklikler bu dosyada belgelenecektir.

Bu dosya yapısı [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) sistemini temel almakta olup proje [Semantik Sürümleme (Semantic Versioning)](https://semver.org/spec/v2.0.0.html) yaklaşımını benimsemektedir.

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
