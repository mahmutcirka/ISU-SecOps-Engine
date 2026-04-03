<div align="center">
  
  # 🛡️ ISU-SecOps-Engine
  
  **Yeni Nesil, Asenkron ve Yüksek Performanslı Siber Güvenlik İstihbarat Platformu**
  
  [![Rust](https://img.shields.io/badge/Made%20with-Rust-black?style=for-the-badge&logo=rust&logoColor=white)](#)
  [![Axum](https://img.shields.io/badge/Powered%20by-Axum-blue?style=for-the-badge)](#)
  [![Security](https://img.shields.io/badge/SecOps-v0.1.0-red?style=for-the-badge)](#)
  [![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)](#)

</div>

---

> _"Saldırı yüzeyini saniyeler içinde analiz edin, güvenlik standartlarınızı endüstriyel sınırlar içinde tutun."_

**ISU-SecOps-Engine**, tamamıyla **Rust** ile geliştirilmiş, Node.js veya herhangi dış bir runtime ortamına bağımlı olmadan kendi içinde hem karmaşık **DNS Sızma Testi** algoritmalarını yürütebilen hem de kullanıcısına "Glassmorphism" (Cam efekti) tarzında göz kamaştırıcı bir **Web Arayüzü** sunabilen devasa bir siber operasyon motorudur.

---

## 🔥 Temel Özellikler (v0.1.0 Çekirdek Modülü)

### 🌍 DNS Bilgi Toplama (Enumeration) Modülü
* **Standart Kayıt Çözümlemesi:** Bir alan adının belkemiği olan tüm (A, AAAA, MX, NS, CNAME, TXT) kayıtlarını anında haritalandırır.
* **Katı Güvenlik Kontrolleri:** Alan adının kimliğini sahteciliğe karşı denetler. Güvenlik politikalarının (SPF ve DMARC varlığı) ve DKIM seçicilerinin olup olmadığını analiz eder.
* **Zone Transfer (AXFR) Sınaması:** Bulunan yetkili isim sunucularını (NS) doğrudan hedef alarak onlarla raw (ham) TCP üzerinden konuşur ve ölümcül olan "Tam DNS Aktarımı" zafiyetini (Zone Transfer/AXFR) denetler.
* **Subdomain Brute-Force (Alt Alan Adı Keşfi):** `tokio::stream` altyapısında saniyede yüzlerce asenkron kaba-kuvvet atağı gerçekleştirerek gizli alt alan adlarını (örn: `test_words.txt` referansıyla) gün yüzüne çıkartır.

### 💻 Bütünleşik Özel Web Arayüzü
* Derlemeye veya kurulum sihirbazlarına (Vite/Node) ihtiyaç duymadan, saf (Vanilla) JS ve muazzam fütüristik CSS özellikleriyle tasarlanmış **Karanlık Mod (Dark Mode)** destekli web ekranı.
* Hatalı link (URL/scheme vb.) denemelerinde bile arka planda hedefi kusursuzca süzerek (`www.` dahil) analizini yarım bırakmayan akıllı mimari.

---

## ⚡ Hızlı Başlangıç

Sistemi tek bir hareketle canlandırmak çok basit! Arka planı ve web ara yüzünü saniyeler içinde başlatmak için terminale şunu yazmanız yeterli:

```bash
cargo run -- server
```

1. Hemen ardından tarayıcınızdan **[http://localhost:3000](http://localhost:3000)** adresine gidin.
2. Hedef `domain` ve (opsiyonel olarak) kullanılacak `wordlist` dizinini forma girin. Herhangi bir kelime listesi girmezseniz sistem otomatik olarak kendi çekirdeğindeki listeyi ateşleyecektir!

_(Not: Sadece lokal makinenizde CLI üzerinden tarama yapmak isterseniz alternatif olarak şu komutu da kullanabilirsiniz: `cargo run -- pentest dns <hedef_domain> --wordlist test_words.txt`)_

---

## 🏗️ Mimari & Kurumsal Standartlar

Bu proje, kod kalitesini mutlak surette **sıfır hataya** zorlayan katı VS Code kuralları, `Justfile` tabanlı otonom CI (Sürekli Entegrasyon) ve `cargo-deny` üzerinden tedarik zinciri güvenliği standartlarıyla donatılmıştır. 

Daha fazla teknik detaylı okuma yapmak isteyenler için özel dokümantasyon dosyalarımız:
- 📂 [Mimari Detaylar (Architecture.md)](./docs/Architecture.md)
- 🧪 [Test & CI Yönergeleri (Testing.md)](./docs/Testing.md)
- 📜 [Geçmiş & Sürüm Notları (Changelog.md)](./docs/Changelog.md)

---
<div align="center">
  <i>Burası sadece bir başlangıç. Motor yeni modüller (Port scanner, Passive DNS vb.) eklenerek durmaksızın büyüyecektir. Tüm modüller eklendikçe tıpkı Architecture ve Changelog klasörlerinde olduğu gibi <b>bu döküman da anlık olarak güncellenecektir!</b></i> 🏴‍☠️
</div>