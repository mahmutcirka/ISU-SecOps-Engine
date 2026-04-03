# 🛰️ SecOps Engine v0.5.0
### *Advanced DNS Enumeration & Security Auditing Platform*

```text
  ____                ___                    _____             _             
 / ___|  ___  ___ ___| _ \ _ __  ___       | ____|_ __   __ _(_)_ __   ___ 
 \___ \ / _ \/ __/ _ \ |_) | '_ \/ __|_____|  _| | '_ \ / _` | | '_ \ / _ \
  ___) |  __/ (_| (_) |  __/| | | \__ \_____| |___| | | | (_| | | | | |  __/
 |____/ \___|\___\___/|_|   |_| |_|___/     |_____|_| |_|\__, |_|_| |_|\___|
                                                         |___/              
```

[![Rust](https://img.shields.io/badge/Language-Rust-orange.svg)](https://www.rust-lang.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Production--Ready-success.svg)]()
[![Security](https://img.shields.io/badge/Security-Stealth--Optimized-brightgreen.svg)]()

[Features](#-key-features) • [Installation](#-installation) • [Architecture](#-architecture) • [Usage](#-usage) • [Legal](#-disclaimer)

---

## 🛡️ Introduction

**SecOps Engine**, siber güvenlik araştırmacıları ve pentest uzmanları için geliştirilmiş; yüksek performanslı, asenkron ve çok katmanlı bir istihbarat toplama aracıdır. Alan adlarını sadece listelemekle kalmaz, aynı zamanda WAF tespiti, S3 sızıntıları, DNS takibi ve port taraması yaparak kapsamlı bir risk haritası oluşturur.

## ✨ Key Features

- 🕵️ **Advanced OSINT:** `crt.sh` entegrasyonu ile pasif subdomain keşfi.
- ⚡ **Asenkron Port Scanner:** En kritik TCP portlarını milisaniyeler içinde tarayan `tokio` destekli motor.
- 🎭 **Stealth & Evasion:**
  - **User-Agent Rotation:** Her istekte değişen tarayıcı kimlikleri.
  - **DNS Resolver Rotation:** Google, Cloudflare, Quad9 ve OpenDNS arasında otomatik rotasyon. (Sistem DNS'i ile hibrit çalışma desteği).
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
git clone https://github.com/mahmutcirka/ISU-SecOps-Engine.git
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

## ⚖️ Disclaimer

> [!CAUTION]
> Bu araç sadece **eğitim ve yasal penetrasyon testleri** amaçlıdır. İzin alınmayan sistemler üzerinde tarama yapmak yasal sonuçlar doğurabilir. Kullanıcı, yaptığı eylemlerden tamamen kendisi sorumludur.

---
<div align="center">
Built with 🦀 by **Mahmut Cırka**
</div>