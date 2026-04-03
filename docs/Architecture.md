# Mimari: ISU-SecOps-Engine

## Sisteme Genel Bakış
`ISU-SecOps-Engine`, tamamı Rust ile yazılmış yüksek performanslı ve asenkron bir Siber Güvenlik Operasyon (SecOps) platformudur. İçerdiği Web Arayüzünü (UI) kendi içinde barındıran ve aynı anda çok iş parçacıklı (multi-threaded) hızlı sızma testi (pentest) süreçlerini yürütebilen tek parça (single-binary) bir mimari üzerine kuruludur.

Şu anki çekirdek katman, derinlemesine DNS Bilgi Toplama (Enumeration) ve Güvenlik Analizi üzerine odaklanmaktadır.

## Temel Teknoloji Yığını
- **Arka Uç (Backend) Dili:** Rust (v1.85+)
- **Asenkron Çalışma Zamanı:** `tokio`
- **Web API & Statik Sunucu:** `axum` ve `tower-http` (Node.js bağımlılığı kesinlikle yoktur)
- **DNS Protokol Motoru:** `hickory-resolver` & `hickory-client` (Doğrudan (Native) DNS yığını)

## Klasör & Modül Yapısı
- `/src/main.rs`: Komut satırı alt araçlarını (`clap` ile) ve motorun ön yüklemesini yöneten ana giriş noktası.
- `/src/server.rs`: Axum Web sunucusu API uç noktalarını (`/api/dns/enumerate`) ve statik dosya sunumunu (`public/`) yönetir.
- `/src/modules/pentest/dns.rs`: Şunların mutlak mantığını içerir:
  - Standart Kayıt Çözümleme (A, AAAA, MX, NS, TXT, CNAME)
  - Güvenlik Konfigürasyonları (SPF, DMARC, DKIM)
  - Tokio görevleri üzerinde kilitlenerek (blocking) çalışan ham TCP Alan Adı Aktarımı (AXFR) denemeleri.
  - Asenkron veri akış havuzlaması (`buffer_unordered`) kullanarak Alt Alan Adı (Subdomain) Keşfi.
- `/public/`: Herhangi bir derleyiciye ihtiyaç duymadan, cam efekti (glassmorphism) estetiği barındıran ve son derece tepkisel çalışan Vanilla JavaScript & CSS ön ucunu barındırır.
- `/.vscode/` & kök dizindeki `*.toml` dosyaları: Clippy kurallarını, format hizalama sınırlarını ve hata ayıklayıcı (debugger) yapılarını zorunlu kılan katı kurumsal geliştirici ortam konfigürasyonlarını depolar.

## Veri Akışı
1. **Girdi:** Kullanıcı, HEDEF DOMAIN'i Web Arayüzü (`app.js`) veya Cargo CLI üzerinden sisteme iletir.
2. **Kabul (`tokio` + `axum`):** İstek `/api/dns/enumerate` uç noktasına ulaşır ve `DnsArgs` yapısına dönüştürülür.
3. **Çalıştırma (`dns.rs`):** Standart sorgular eşzamanlı olarak yürütülür. Subdomain (alt alan adı) keşfi sürecinde ise `futures::stream` tarafından yönetilen yüzlerce süper verimli asenkron tokio görevi oluşturulur.
4. **Çıktı:** Kesin sınırlarla tiplendirilmiş bir `DnsResult` yükü `serde_json` ile serialize (JSON) edilir ve tekrar kullanıcı ara yüzüne yollanarak veriler dinamik DOM düğümlerine görsel olarak yansıtılır.
