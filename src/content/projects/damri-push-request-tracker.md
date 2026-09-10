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

## Dampak & Efisiensi Operasional
- **100% Pelacakan Deployment:** Mencegah insiden file tertinggal saat rilis ke production.
- **Transparansi Proyek:** Memperjelas timeline pengerjaan antar developer internal dan eksternal.
