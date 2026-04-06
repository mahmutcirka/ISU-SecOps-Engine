# 🏗️ Proje Mimarisi & Teknik Detaylar

Bu doküman, **ISU-SecOps-Engine** (DNS Enumeration) projesinin arka planındaki mimari kararları, kullanılan teknikleri ve güvenlik yaklaşımlarını detaylandırmaktadır.

## 1. Asenkron Motor (Tokio & Hickory)

Projenin kalbinde **Rust Tokio** asenkron çalışma zamanı (runtime) bulunmaktadır. Geleneksel senkron tarayıcıların aksine, bu araç her bir DNS sorgusunu ve port bağlantısını ayrı birer "lightweight" task olarak yönetir.

- **Paralel Çözümleme:** `hickory-resolver` (eski adıyla trust-dns) kullanılarak sistem DNS ayarlarından bağımsız, yüksek performanslı sorgular yapılır.
- **Konküransi Yönetimi:** `futures::stream::buffer_unordered` kullanılarak ağ kaynaklarını tüketmeden aynı anda yüzlerce sorgu (örn: 100 subdomain bruteforce) gerçekleştirilir.

## 2. Modüler Yapı (Separation of Concerns)

Kod tabanı, her bir işlevin kendi sınırları içerisinde kalmasını sağlayan modüler bir mimariye sahiptir:

- **`src/modules/pentest/dns.rs`:** Ana orkestrasyon katmanı.
- **`src/modules/pentest/port_scanner.rs`:** Düşük seviyeli TCP bağlantı yönetimi.
- **`src/modules/pentest/osint.rs`:** Harici API entegrasyonu (`crt.sh`).
- **`src/modules/pentest/whois.rs`:** RDAP protokolü üzerinden bilgi toplama.

## 3. SecOps & Güvenlik Analizi Yaklaşımları

### E-posta Güvenlik Denetimi
Araç sadece IP bulmakla kalmaz, hedef alan adının **SPF (Sender Policy Framework)** ve **DMARC** kayıtlarını analiz eder. Bu, organizasyonun "Email Spoofing" saldırılarına karşı ne kadar dirençli olduğunu gösterir.

### Zone Transfer (AXFR) Testi
Eski veya yanlış yapılandırılmış DNS sunucularında hala mümkün olabilen AXFR saldırısını otomatik olarak her Name Server üzerinde dener. Başarılı bir AXFR, tüm iç ağ haritasının saldırganın eline geçmesine neden olabilir.

### Gizlilik (Stealth)
`src/modules/utils/stealth.rs` modülü, OSINT sorguları sırasında `reqwest` istemcisine rastgele `User-Agent` değerleri atayarak WAF (Web Application Firewall) engellemelerini minimize eder.

## 4. Veri Görselleştirme (Topology Graph)

Frontend tarafında `vis-network.js` kullanılarak, toplanan veriler bir "Hiyerarşik Ağ Grafiği"ne dönüştürülür. Bu sayede:
- Domain -> Subdomain ilişkisi,
- Subdomain -> IP ilişkisi,
- IP -> Açık Port ilişkisi görsel olarak takip edilebilir.

---
> [!NOTE]
> Bu proje, modern SecOps ihtiyaçları göz önüne alınarak "hız ve derinlik" dengesiyle geliştirilmiştir.
