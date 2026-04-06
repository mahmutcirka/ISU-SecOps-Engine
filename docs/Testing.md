# 🧪 DNS Enumeration: Testing & Verification Guide

DNS Enumeration, her geliştirme aşamasında sıkı test döngülerinden (`cargo test`, `clippy`, `fmt`) geçirilir.

## 🧱 Unit & Integration Tests

### 1. DNS Resolution Test
`hickory-resolver`'ın hem sistem DNS'i hem de rotasyon tabanlı özel DNS'ler üzerinden gerçek alan adlarını çözüp çözemediğini doğrular.
```bash
cargo test test_real_dns_resolution
```

### 2. Stealth User-Agent Variability
UA rotasyon havuzunun rastgeleliğini ve varyansını kontrol ederek "Single-U-A" (tek düze) davranış sergilenmediğini onaylar.
```bash
cargo test test_random_user_agent_variability
```

### 3. Serialization Checks
DnsResult veri yapılarının Web API üzerinden JSON formatına hatasız dönüştüğünü doğrular.
```bash
cargo test test_dns_result_default
```

## 🔍 Code Quality Audit

Projeyi teslim etmeden önce veya CI/CD süreçlerinde aşağıdaki komutları çalıştırırız:
```bash
# Format kontrolü
cargo fmt --check

# Statik analiz ve lint denetimi (warnings as errors)
cargo clippy --all-targets -- -D warnings

# Tüm test suitini koştur
cargo test --workspace
```

## 🌐 End-to-End (E2E) Browser Verification

Web Dashboard testleri için aşağıdaki adımlar takip edilir:
1. `cargo run -- server --port 3000` komutu ile sunucuyu başlatın.
2. `http://localhost:3000` adresine gidin.
3. `scanme.nmap.org` gibi bilinen bir alan adını girin.
4. "Enumerate Domain" butonuna basarak metriklerin (Subdomains, Ports) yüklendiğini doğrulayın.
5. "Topology Map" sekmesine geçerek grafik çizimini kontrol edin.

## 🛠️ Debugging DNS
Eğer taramalar 0 sonuç veriyorsa, DNS sorgusunun bloklanıp bloklanmadığını kontrol etmek için:
- `DEBUG=1 cargo run -- pentest dns yourdomain.com` (Gelecek versiyon loglaması için rezerve edilmiştir).
- Halihazırda `test_real_dns_resolution` testi bu tanıyı koymaktadır.
