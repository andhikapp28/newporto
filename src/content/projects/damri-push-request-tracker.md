---
title: "Sistem Informasi IT & GitHub Push Audit Tracker — Perum DAMRI"
description: "Platform internal divisi IT Perum DAMRI untuk mengaudit histori commit/push GitHub ke server production, pelacakan status deployment, dan manajemen proyek kanban developer."
client: "Divisi Teknologi Informasi — Perum DAMRI"
role: "Lead Developer & System Analyst"
period: "2024 - 2026"
category: "DevOps & Internal Tooling"
featured: true
tags: ["Laravel 12", "GitHub API", "PostgreSQL", "Kanban Board", "SSO Auth", "Audit Trail", "Deployment Tracking"]
metrics:
  - label: "Visibilitas Deploy Prod"
    value: "100% Tercatat"
  - label: "Pelacakan Diff File"
    value: "Real-time"
  - label: "Efisiensi Rilis Fitur"
    value: "2.5x Lebih Cepat"
---

## Ringkasan Eksekutif
Sebelum adanya sistem ini, tim IT DAMRI mengalami kendala dalam melacak apakah kode yang sudah di-commit oleh berbagai developer vendor maupun in-house sudah benar-benar di-pull ke server production, file apa saja yang mengalami perubahan, serta bagaimana progress pengerjaan backlog fitur.

Aplikasi **Push Request** dibangun untuk menyatukan 2 fungsi krusial:
1. **Catatan Push GitHub (`push-notes`)**: Melacak commit, status pull ke production, dan diff file via integrasi langsung dengan GitHub API.
2. **Manajemen Proyek (`projects`)**: Pengelolaan task kanban board, timeline, milestone, go-live checklist, dan portofolio beban kerja tim IT.

## Arsitektur & Spesifikasi Teknis

### 1. Sinkronisasi Webhook & Audit Commit GitHub
- Merancang endpoint webhook aman yang mendengarkan event `push` dari repository resmi DAMRI.
- Mengekstrak author, commit hash, file list, dan memvalidasi apakah branch target adalah `main`/`release`.
- Menyediakan antarmuka audit visual bagi System Analyst dan Tech Lead sebelum proses deployment dieksekusi.

### 2. Pelacakan Status Pull ke Server Production
- Mencegah insiden *untracked deployment* atau desinkronisasi antara repository GitHub dan server live.
- Setiap rilis memiliki checklist verifikasi formal (go-live checklist) sebelum status ditandai `Deployed`.

### 3. Role-Based Access Control (RBAC) & Integrasi SSO DAMRI
- Berbasis Spatie Laravel Permission yang dikombinasikan dengan database SSO DAMRI.
- Menu sidebar dinamis yang dapat disesuaikan per level pengguna (Developer, Analyst, dan Manajer IT).

## Architecture Decision Record (ADR)

### ADR-001: Event-Driven GitHub Webhook Ingestion vs Periodic Polling Cron (CI/CD Deployment Audit)

* **Status:** ACCEPTED & IN-PRODUCTION
* **Tanggal Keputusan:** Q2 2025
* **Penanggung Jawab:** Lead Developer & DevOps Solutions Architect
* **Konteks Keputusan:**
  Divisi Teknologi Informasi Perum DAMRI mengelola puluhan repositori aplikasi yang dikerjakan secara paralel oleh tim internal dan berbagai vendor pihak ketiga. Tanpa sistem pelacakan terpusat, tim pimpinan TI mengalami kendala visibilitas dalam memverifikasi apakah commit yang diajukan vendor benar-benar telah di-pull ke server produksi live, file apa saja yang mengalami perubahan (*diff analysis*), serta apakah prosedur checklist pra-rilis (*go-live checklist*) telah dipatuhi. Sistem membutuhkan mekanisme penyerapan audit commit yang real-time, bebas dari pembatasan kuota rate limit GitHub API, dan terlindungi dari manipulasi data fiktif.

* **Opsi yang Dipertimbangkan:**
  1. **Opsi A: Scheduled Polling Cron (Pengecekan Terjadwal GitHub REST API setiap 15 Menit)**
     * *Kelebihan:* Konfigurasi mudah tanpa perlu membuka URL endpoint publik untuk callback.
     * *Kelemahan:* Dibatasi oleh kuota ketat GitHub API (maksimal 5.000 permintaan/jam per organisasi). Menimbulkan *polling lag* hingga 15 menit, serta memboroskan sumber daya komputasi server untuk kueri berulang saat tidak ada aktivitas pengkodean.
  2. **Opsi B: Manual Deployment Logging via Form Spreadsheet / Ticket System**
     * *Kelebihan:* Tidak membutuhkan integrasi API langsung ke repositori Git.
     * *Kelemahan:* Sangat rentan kelalaian manusia (*human error*), nomor commit hash dapat dimanipulasi, dan tidak memberikan bukti forensik digital atas perubahan baris kode aktual di server produksi.
  3. **Opsi C: Event-Driven GitHub Webhook Ingestion dengan Verifikasi Kriptografis HMAC SHA-256 (Pilihan)**
     * *Kelebihan:* Menerima sinyal perubahan seketika (<1 detik) tepat saat perintah `git push` dieksekusi. Keaslian payload dijamin menggunakan *shared secret* via verifikasi header `X-Hub-Signature-256`, meniadakan risiko injeksi payload palsu dari server luar. Memetakan commit hash SHA, author, dan daftar file termodifikasi secara otomatis ke tiket kanban dan lembar verifikasi rilis.
     * *Kelemahan:* Membutuhkan endpoint ingress publik yang aman dengan sertifikat SSL/TLS valid untuk menerima webhook dari GitHub Cloud.

* **Keputusan yang Diambil:**
  Memilih **Opsi C (Event-Driven GitHub Webhook Ingestion + HMAC SHA-256)** sebagai tulang punggung pelacakan rilis, dipadukan dengan kontrol akses berbasis RBAC dan autentikasi SSO DAMRI terpusat.

* **Justifikasi Teknis & Analisis Trade-Off:**

| Parameter Evaluasi | Opsi A: Scheduled Polling Cron | Opsi B: Pelaporan Manual | Opsi C: GitHub Webhooks + HMAC (Pilihan) | Justifikasi Arsitektur |
| :--- | :---: | :---: | :---: | :--- |
| **Latensi Audit Commit** | 15 Menit (Jeda siklus cron) | Berjam-jam / Berhari-hari | **< 1 Detik (Real-Time)** | Perubahan kode langsung tercermin di dashboard saat developer melakukan push. |
| **Konsumsi API Rate Limit** | Menghabiskan kuota 5.000 req/jam | N/A | **Nol Penggunaan Kuota (Event-Driven)** | GitHub bertindak sebagai pemanggil aktif, sistem hanya menerima payload masuk. |
| **Keamanan Data (Anti-Spoofing)**| Menggunakan Personal Access Token| Rawan pelaporan fiktif | **Verifikasi Kriptografis HMAC SHA-256** | Payload yang tidak cocok dengan shared secret langsung ditolak dengan kode 401. |
| **Pelacakan Diff File** | Memerlukan kueri API tambahan | Tidak tersedia | **Ekstraksi Otomatis dari JSON Payload**| Menampilkan daftar file `added`, `modified`, dan `removed` secara instan. |
| **Transparansi Kinerja Vendor**| Rendah | Sangat Rendah | **100% Audit Trail Akuntabel** | Setiap rilis live terhubung langsung ke author dan commit hash resmi. |

---

## C4 Model Architecture Blueprint (Context & Containers)

### Level 1: System Context Diagram
Diagram konteks menggambarkan posisi sistem Push Request Tracker terhadap developer internal, konsorsium vendor mitra, lead analis, dan server produksi:

```
+---------------------------------------------------------------------------------------+
|                                    SYSTEM CONTEXT                                     |
+---------------------------------------------------------------------------------------+

  [ Developer In-House / Vendor ]    [ IT Lead & System Analyst ]     [ VP Teknologi Informasi ]
  (Pengembang Aplikasi DAMRI)        (Pemeriksa Kualitas & Reviewer)  (Pimpinan Divisi TI BUMN)
           │                                      │                               │
           │ Melakukan git push / PR              │ Verifikasi Diff & Checklist    │ Pantau Portofolio & Deploy
           ▼                                      ▼                               ▼
+---------------------------------------------------------------------------------------+
|              SISTEM INFORMASI IT & GITHUB PUSH AUDIT TRACKER (DAMRI)                  |
|                                                                                       |
|   * Mengkonsumsi event webhook push dari seluruh repositori GitHub resmi DAMRI.       |
|   * Memverifikasi tanda tangan HMAC SHA-256 dan memetakan commit hash ke tiket task.  |
|   * Mengaudit status sinkronisasi pull server production dan mengunci rilis live.     |
+---------------------------------------------------------------------------------------+
           │                                 │                       │
           │ Webhook Event Push (TLS)        │ Otentikasi Terpusat   │ Verifikasi Status Deployment
           ▼                                 ▼                       ▼
  [ GitHub Enterprise Cloud ]       [ DAMRI Central SSO IdP ]  [ Server Linux Production ]
  (Repositori Kode Sumber)          (Single Sign-On Pegawai)   (Web & API Live Server)
```

### Level 2: Container Architecture Diagram
Diagram kontainer menguraikan modul penanganan webhook, mesin manajemen task kanban, dan skema database relasional:

```
+--------------------------------------------------------------------------------------------------+
|                                   CONTAINER BLUEPRINT                                            |
+--------------------------------------------------------------------------------------------------+

  [ Pengguna: Tim IT DAMRI & Developer Vendor (Web Browser) ]
                          │
                          │ HTTPS / TLS 1.3
                          ▼
+──────────────────────────────────────────────────────────────────────────────────────────────────+
|  PUSH REQUEST APPLICATION CONTAINER (Laravel 12 / Nginx Web Server)                              |
|                                                                                                  |
|  * Webhook Ingestion Controller: Handler event `push` & validasi header HMAC `X-Hub-Signature`  |
|  * Push Notes & Diff Engine: Parser commit message, author, branch, dan daftar berkas berubah    |
|  * Kanban Project Manager: Papan status task (Backlog -> In Progress -> Review -> Deployed)       |
|  * Deployment Checklist Engine: Verifikasi go-live pra-pull server live                          |
|  * RBAC Security Layer: Spatie Laravel Permission + DAMRI SSO Token Guard                        |
+──────────────────────────────────────────────────────────────────────────────────────────────────+
        │                                         │                                      │
        │ Simpan Histori Commit & Relasi Proyek    │ Otentikasi Pegawai TI                │ Notifikasi Rilis Live
        ▼                                         ▼                                      ▼
+──────────────────────────+             +──────────────────────────+          +───────────────────+
| POSTGRESQL DATABASE      |             | DAMRI SSO IDENTITY SVR   |          | ALERT & DISPATCH  |
|                          |             |                          |          | SERVICE           |
| * push_notes             |             | * Validasi Akun Pegawai  |          |                   |
| * projects & tasks       |             | * Mapping Role & Hak     |          | * Broadcast Bot   |
| * deployment_checklists  |             |   Akses Menu Internal    |          |   Telegram IT     |
| * vendor_audit_logs      |             | * Session Management     |          | * Email Alert PR  |
+──────────────────────────+             +──────────────────────────+          +───────────────────+
```

---

## Enterprise Governance & Vendor Oversight

### 1. Kriteria Acceptance Gatekeeper (Vendor Code Oversight Gates)
Seluruh tim pengembang vendor eksternal wajib melewati gerbang kualitas dan kepatuhan kode (*code oversight quality gates*):
* **Protokol Perlindungan Branch & Multi-Party Review Gate:**
  * Akses *direct push* ke branch utama (`main`, `master`, `production`) diblokir secara absolut di level GitHub repository policy.
  * Setiap perubahan kode wajib diajukan melalui Pull Request (PR) dan wajib mendapatkan minimal **2 Approving Review**:
    1. *System Analyst Review:* Memverifikasi bahwa implementasi fungsi telah sesuai dengan dokumen spesifikasi kebutuhan perangkat lunak (SRS).
    2. *Technical Lead Review:* Memverifikasi kepatuhan standar penulisan kode, efisiensi kueri basis data, dan ketiadaan celah keamanan.
* **Security & Vulnerability Scanning Gate:**
  * Setiap commit yang diajukan wajib lolos pemindaian dependensi otomatis (GitHub Dependabot / Trivy Security Scan) dengan syarat kelulusan: **0 Kerentanan kategori High atau Critical**.
* **Production Pull Authorization Gate:**
  * Administrator server dilarang mengeksekusi `git pull` di lingkungan produksi sebelum commit hash terkait disetujui di dalam sistem Push Request Tracker dan seluruh butir *Go-Live Checklist* (migrasi basis data, backup konfigurasi `.env`, dan uji coba staging) telah ditandai valid.

### 2. Standar Kepatuhan Kontrak Vendor & SLA Deployment
* **Pengikatan Berita Acara Serah Terima (BAST) Vendor:**
  * Persetujuan pencairan termin pembayaran pekerjaan vendor diikat secara sah dengan catatan riwayat komit, keselarasan tiket pengerjaan kanban, dan ketiadaan temuan pelanggaran kode pada sistem Push Request Tracker.
* **Failed Deployment Rollback SLA:**
  * Jika terjadi anomali sistem pasca-deployment di lingkungan live (*production incident*), tim pengembang vendor diwajibkan menjalankan prosedur *rollback* ke commit hash stabil sebelumnya dalam waktu maksimal **15 menit kalender** dan mengunggah laporan post-mortem insiden ke sistem dalam waktu <4 jam.

---

## Dampak & Efisiensi Operasional
- **100% Pelacakan Deployment:** Mencegah insiden file tertinggal saat rilis ke production.
- **Transparansi Proyek:** Memperjelas timeline pengerjaan antar developer internal dan eksternal.
