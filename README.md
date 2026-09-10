# Modern System Analyst Portfolio (with Dev & QA Rigor)

Website portofolio interaktif dan modern khusus untuk peran **System Analyst (SA)** dengan fondasi **Development Feasibility** dan **Quality Assurance (QA) Rigor**.

Dibangun dengan **Astro v7 + Tailwind CSS v4**, dirancang untuk kecepatan kilat (100% static output), $0 hosting cost, dan pengelolaan konten berbasis Markdown (Astro Content Collections).

---

## ✨ Fitur & Keunggulan Khusus System Analyst

1. **SDLC Lens Switcher (Interactive Demo):**
   - Menampilkan sebuah fitur sistem yang sama dari 3 kacamata berbeda:
     - 🔍 **Analyst Lens:** BRD, alur proses bisnis BPMN 2.0, state machine, SLA.
     - 💻 **Developer Lens:** Spesifikasi REST API (OpenAPI JSON), idempotency header, locking database.
     - 🛡️ **QA Lens:** Kriteria penerimaan BDD (Gherkin format: Given/When/Then), negative test cases, fault injection.
2. **The 3-Pillar Capability Matrix:**
   - Elicitation & BRD/SRS, Tech Feasibility (SQL, REST, PoC), dan Defensive Rigor (API automation, boundary testing).
3. **Interactive Architecture Diagram:**
   - Diagram alur sistem terdistribusi (Client $\to$ Gateway $\to$ Service $\to$ Queue $\to$ Database) yang interaktif: klik tiap node untuk melihat spesifikasi SA, Dev, dan QA assertions-nya.
4. **Markdown-Based Case Studies (Tanpa CMS, Type-Safe):**
   - Studi kasus disajikan layaknya *System Specification Document* profesional dengan metrik kuantitatif.
   - Tambah/edit studi kasus baru cukup dengan menambah file `.md` di folder `src/content/projects/`.
5. **System Analysis 4-Step Methodology:**
   - Elicit $\to$ Model $\to$ Specify $\to$ Validate.
6. **SEO & Social Share Ready:**
   - Dilengkapi meta tags lengkap, Open Graph, Google Fonts (Plus Jakarta Sans & JetBrains Mono), dan tema Modern Dark Blueprint.

---

## 🛠️ Menjalankan Proyek di Komputer Lokal

Buka terminal di folder `E:\KODING\Porto`:

```bash
# Menjalankan local server development
npm run dev

# Membangun versi production (HTML statis di folder /dist)
npm run build

# Menjalankan preview dari hasil build production
npm run preview
```

Website akan berjalan di: `http://localhost:4321`

---

## ✍️ Cara Menambah / Mengubah Studi Kasus (Case Study)

Masuk ke folder `src/content/projects/`. Semua file di sini berekstensi `.md` (Markdown).

Contoh template file baru `src/content/projects/proyek-baru-anda.md`:

```yaml
---
title: "Judul Proyek Sistem"
description: "Ringkasan masalah dan arsitektur yang dirancang dalam 1-2 kalimat."
client: "Nama Klien / Industri"
role: "Lead System Analyst"
period: "2024"
category: "Fintech / Retail / HealthTech"
featured: true
tags: ["PostgreSQL", "BPMN 2.0", "OpenAPI", "Postman"]
metrics:
  - label: "Bottleneck Reduction"
    value: "65%"
  - label: "QA Test Coverage"
    value: "95%"
  - label: "TAT Efficiency"
    value: "3.5x Faster"
---

## Executive Summary
Tuliskan ringkasan konteks bisnis dan peranmu di sini...

## Problem Statement & Bottlenecks
- Masalah 1...
- Masalah 2...

## Solutions & Architecture
Jelaskan alur BPMN, skema database, atau API contract...

## QA & Edge-Case Verification
Jelaskan bagaimana kamu memastikan sistem bebas dari bug/kebocoran data...

## Business Impact
Tuliskan hasil nyata dan efisiensi yang diraih...
```

Astro akan **secara otomatis** membuat halaman baru di `/projects/proyek-baru-anda` dan menampilkannya di daftar Case Studies homepage.

---

## 🚀 Panduan Deploy ke GitHub Pages (100% Gratis)

Proyek ini sudah dilengkapi file workflow otomatis di `.github/workflows/deploy.yml`.

### Langkah-langkah:
1. Buat repository baru di akun GitHub kamu (misal: `porto` atau `username.github.io`).
2. Jika nama repo kamu **bukan** `username.github.io` (misal repo bernama `porto`), buka file `astro.config.mjs` dan atur:
   ```javascript
   export default defineConfig({
     site: 'https://username.github.io',
     base: '/porto',
     // ...
   });
   ```
   *(Jika repo kamu bernama `username.github.io` atau memakai custom domain, opsi `base` tidak perlu diatur).*
3. Push kode lokal ke GitHub:
   ```bash
   git remote add origin https://github.com/username/porto.git
   git branch -M main
   git push -u origin main
   ```
4. Di halaman repo GitHub:
   - Masuk ke tab **Settings** $\to$ **Pages**.
   - Di bagian **Build and deployment** > **Source**, pilih **GitHub Actions**.
5. Selesai! GitHub Actions akan otomatis men-deploy website portofoliomu setiap ada `git push`.

---

## 🎨 Menyesuaikan Profil Pribadi

- **Email & Kontak:** Edit di `src/components/ContactSection.astro` (ganti `analyst.dipa@example.com` dan link LinkedIn/GitHub).
- **Hero & Headline:** Edit teks di `src/components/Hero.astro`.
- **Navigasi & Brand:** Edit di `src/components/Header.astro`.
