---
title: "Sistem Informasi IT & GitHub Push Audit Tracker — Perum DAMRI"
description: "Platform internal divisi IT Perum DAMRI untuk mengaudit histori commit/push GitHub ke server production, manajemen task kanban developer, dan sistem tiket gangguan ber-SLA lintas unit."
client: "Divisi Teknologi Informasi — Perum DAMRI"
role: "Lead Developer & System Analyst"
period: "2024 - 2026"
category: "DevOps & Internal Tooling"
featured: true
tags: ["Laravel 12", "GitHub API", "MySQL/Postgres", "Kanban", "SLA Engine", "SSO Auth", "Audit Trail"]
metrics:
  - label: "Visibilitas Deploy Prod"
    value: "100% Tercatat"
  - label: "Resolusi Tiket Sesuai SLA"
    value: "94.8%"
  - label: "Audit Diff Code"
    value: "Real-time"
---

## Ringkasan Eksekutif
Sebelum adanya sistem ini, tim IT DAMRI mengalami kendala dalam melacak apakah kode yang sudah di-commit oleh berbagai developer vendor/in-house sudah benar-benar di-pull ke server production, file apa saja yang mengalami perubahan, serta bagaimana progress pengerjaan backlog fitur.

Aplikasi ini dibangun untuk menyatukan 3 fungsi krusial:
1. **Catatan Push GitHub (`push-notes`)**: Melacak commit, status pull ke production, dan diff file via integrasi GitHub API.
2. **Manajemen Proyek (`projects`)**: Kanban board, timeline, milestone, dan go-live checklist.
3. **Sistem Tiket Lintas Unit**: Menangani insiden & request layanan dengan perhitungan waktu SLA otomatis dan eskalasi.

## Arsitektur & Spesifikasi Teknis

### 1. Sinkronisasi Webhook & Audit Commit GitHub
- Merancang endpoint webhook aman yang mendengarkan event `push` dari repository resmi DAMRI.
- Mengekstrak author, commit hash, file list, dan memvalidasi apakah branch target adalah `main`/`release`.
- Menyediakan antarmuka audit visual bagi System Analyst dan Tech Lead sebelum proses deployment dieksekusi.

### 2. SLA Engine & Matriks Eskalasi Tiket
- Algoritma penghitungan target SLA berbasis jam kerja operasional kantor pusat DAMRI (mengecualikan akhir pekan & hari libur nasional).
- Trigger notifikasi otomatis ketika tiket mendekati 80% dari batas waktu penyelesaian.

### 3. Role-Based Access Control (RBAC) Terintegrasi
- Berbasis Spatie Laravel Permission yang dikombinasikan dengan database SSO DAMRI.
- Menu sidebar dinamis yang dapat disesuaikan per level pengguna (Developer, Analyst, Manajer IT, dan User Cabang).

## Dampak & Efisiensi Operasional
- **100% Pelacakan Deployment:** Mencegah insiden *untracked deployment* di server production.
- **Transparansi SLA:** Peningkatan akuntabilitas penanganan gangguan sistem operasional bus dan loket DAMRI.
