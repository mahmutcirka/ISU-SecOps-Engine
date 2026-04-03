# Test ve CI Yönergeleri

`ISU-SecOps-Engine` projesinde kod kalitesi, güvenlik ve kararlılık (stability) her zaman en yüksek önceliktir.

## 1. Otomatik Denetimler (Terminal)
Tüm geliştirme etkileşimleri sisteme gömülü olan `just` komut dizilerinden geçer not almak zorundadır.

- **`just fmt`**: `rustfmt.toml` ve `taplo.toml` kurallarını zorlayarak (maks. 100 karakter satır limiti, özel yorum hizalamaları vb.) tüm Rust ve TOML kodlarının sistemli kod katı sınırlandırmaları dahilinde kalmasını sağlar.
- **`just lint`**: Arka planda `cargo clippy --all-targets -- -D warnings` komutunu koşar. Sistemde `0` uyarı olması şarttır. `clippy.toml` üzerinde belirlediğimiz bilişsel (cognitive) ve döngüsel (cyclomatic) karmaşıklıklara dair maksimum 30 limit kuralını acımasızca uygular.
- **`just audit`**: Tüm bağımlılık (dependency) ağaçlarını `cargo deny check` ile analiz ederek projeye "bakımı durdurulmuş, zafiyet barındıran veya lisanstan yoksun" tek bir dış kütüphane düğümünün bile bulaşmamasını garantiler.
- **`just test`**: Tüm birim (unit) testlerini çalıştırır.
- **`just ci`**: Son kapı denetleyicisi. Herhangi bir git commit işleminden önce bunu manuel olarak çalıştırın! Prosedürün tamamını bir zincir halinde yürütür (`fmt` -> `lint` -> `audit` -> `test` -> `build`).

## 2. Birim ve Entegrasyon Testleri
- Testleri inanılmaz derecede optimize şekilde koşmak için `cargo-nextest` kullanıyoruz (`cargo nextest run`).
- Test konfigürasyonları VS Code özellikleriyle harmanlanmıştır. IDE üzerindeki VS Code görevlerinden (tasks) `Test: All` seçimi doğrudan `cargo nextest` yapısını çalıştırır.

## 3. İnteraktif Web ve UI Testleri
- Arka uç (backend) ve arayüzler birbiriyle doğrudan bağlı çalıştığından (Kullanıcı arayüzüne (UI) Axum kökenlik eder), sadece `cargo run -- server` emrini vererek geliştirme modunu canlı olarak `localhost:3000` üzerinden ayağa kaldırabilirsiniz.
- Ön uç (Frontend), sunucudan gelen yanıt bağlantısının çökmesi veya kopması ihtimaline dahi uyum sağlayarak, ekrana sadece boş bir pop-up atmak yerine dinamik fetch API yapısıyla arayüzle bütünleşik hata mesajları (graceful UI errors) sergileyecek şekilde test edilmek üzere kurgulanmıştır.

## 4. Hata Ayıklama (Debugging)
`.vscode/launch.json` içinde kurgulanmış profesyonel LLDB ayarlamalarını kullanın.
- **Debug: Main Binary** komutu, doğrudan ana Axum API'sini kırılma noktaları (breakpoints) bağlamında duraklatmalı olarak canlandırır.
- **Debug: Test (by name)** ise tek bir bağımsız algoritmayı (tek bir fonksiyonu) lazer odaklı test edebilmenizi sağlar.
