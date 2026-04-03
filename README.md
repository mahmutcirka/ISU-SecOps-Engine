<div align="center">

![SecOps Engine Logo](file:///C:/Users/mahmu/.gemini/antigravity/brain/fd06c365-7d7a-4be5-8b5b-3e9c3ae1c848/secops_engine_logo_v2_1775256018096.png)

# 🛰️ SecOps Engine v0.4.0
### *Advanced DNS Enumeration & Security Auditing Platform*

[![Rust](https://img.shields.io/badge/Language-Rust-orange.svg)](https://www.rust-lang.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Production--Ready-success.svg)]()
[![Security](https://img.shields.io/badge/Security-Stealth--Optimized-brightgreen.svg)]()

[Features](#-key-features) • [Installation](#-installation) • [Architecture](#-architecture) • [Dashboard](#-web-dashboard) • [Legal](#-disclaimer)

</div>

---

## 🛡️ Introduction

**SecOps Engine**, siber güvenlik araştırmacıları ve pentest uzmanları için geliştirilmiş; yüksek performanslı, asenkron ve çok katmanlı bir istihbarat toplama aracıdır. Alan adlarını sadece listelemekle kalmaz, aynı zamanda WAF tespiti, S3 sızıntıları, DNS takibi ve port taraması yaparak kapsamlı bir risk haritası oluşturur.

## ✨ Key Features

- 🕵️ **Advanced OSINT:** `crt.sh` entegrasyonu ile pasif subdomain keşfi.
- ⚡ **Asenkron Port Scanner:** En kritik TCP portlarını milisaniyeler içinde tarayan `tokio` destekli motor.
- 🎭 **Stealth & Evasion:**
  - **User-Agent Rotation:** Her istekte değişen tarayıcı kimlikleri.
  - **DNS Resolver Rotation:** Google, Cloudflare, Quad9 ve OpenDNS arasında otomatik rotasyon.
  - **Request Jitter:** Bloklanmayı önlemek için ayarlanabilir rastgele gecikmeler.
- 🪣 **Cloud Leak Detection:** Amazon S3 kova (bucket) sızıntısı ve subdomain takeover (devralma) kontrolleri.
- 🧱 **Firewall Awareness:** Web Uygulama Güvenlik Duvarı (WAF) tespiti ve güvenlik başlıkları analizi.
- 📊 **Interactive Dashboard:** `vis-network.js` tabanlı topoloji haritası ve modern "Glassmorphism" UI.

## 🏗️ Architecture

```mermaid
graph TD
    User([User]) --> CLI[CLI Interface]
    User --> WEB[Web Dashboard]
    WEB --> API[Axum API Server]
    CLI --> CORE[SecOps Core Engine]
    API --> CORE
    CORE --> DNS[Stealth DNS Resolver]
    CORE --> SCAN[Async Port Scanner]
    CORE --> VULN[Vulnerability Modules]
    VULN --> S3[S3/Takeover Checks]
    VULN --> WAF[WAF Detection]
    DNS --> Internet((Public DNS/Web))
    SCAN --> Internet
```

## 🛠️ Installation

### Prerequisites
- [Rust](https://www.rust-lang.org/tools/install) (latest stable)
- [Just](https://github.com/casey/just) (optional, for automation tasks)

### Build from source
```bash
git clone https://github.com/youruser/ISU-SecOps-Engine.git
cd ISU-SecOps-Engine
cargo build --release
```

## 🚀 Usage

### 💻 Command Line Interface
```bash
# DNS ve Güvenlik taraması yap
cargo run -- pentest dns example.com

# Özel bir wordlist ile brute-force yap
cargo run -- pentest dns example.com --wordlist subdomains.txt
```

### 🌐 Web Dashboard (Modern UI)
```bash
# Sunucuyu başlat (Varsayılan Port: 3000)
cargo run -- server --port 3000
```
Tarayıcıda `http://localhost:3000` adresine giderek etkileşimli analiz ekranına ulaşabilirsiniz.

---

## 📸 Web Dashboard Preview

````carousel
![Main Dashboard](file:///C:/Users/mahmu/.gemini/antigravity/brain/fd06c365-7d7a-4be5-8b5b-3e9c3ae1c848/premium_dashboard_ui_1775253798070.webp)
<!-- slide -->
![Topology Map](file:///C:/Users/mahmu/.gemini/antigravity/brain/fd06c365-7d7a-4be5-8b5b-3e9c3ae1c848/topology_map_scanme_1775253519832.png)
<!-- slide -->
![Critical Vulnerabilities](file:///C:/Users/mahmu/.gemini/antigravity/brain/fd06c365-7d7a-4be5-8b5b-3e9c3ae1c848/nmap_vulns_details_1775255383047.png)
````

---

## ⚖️ Disclaimer

> [!CAUTION]
> Bu araç sadece **eğitim ve yasal penetrasyon testleri** amaçlıdır. İzin alınmayan sistemler üzerinde tarama yapmak yasal sonuçlar doğurabilir. Kullanıcı, yaptığı eylemlerden tamamen kendisi sorumludur.

---
<div align="center">
Built with 🦀 by ISU Security Team
</div>