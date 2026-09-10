---
title: "Aplikasi PUMK (Pendanaan Usaha Mikro & Kecil) — Perum DAMRI"
description: "Arsitektur sistem digitalisasi pembinaan & pembiayaan UMKM BUMN Perum DAMRI: verifikasi NIK 16 digit, generate kode mitra unik dengan lockForUpdate, modul cicilan TJSL, dan integrasi SSO terpusat."
client: "Perum DAMRI (BUMN Transportasi)"
role: "System Analyst & Full-Stack Engineer"
period: "2024 - 2026"
category: "Enterprise ERP & Public Sector"
featured: true
tags: ["Laravel 12", "PostgreSQL", "BPMN 2.0", "SSO Auth", "PUMK/TJSL", "Kamus Data", "Automated Testing"]
metrics:
  - label: "Kepatuhan Regulasi TJSL"
    value: "100% Passed"
  - label: "Pencegahan Race Condition"
    value: "0% Duplikasi"
  - label: "Otomasi Rekonsiliasi Bank"
    value: "3x Lebih Cepat"
---

## Ringkasan Eksekutif
Aplikasi **PUMK (Program Usaha Mikro dan Kecil)** Perum DAMRI merupakan platform resmi BUMN untuk mengelola seluruh siklus pembiayaan dan pembinaan UMKM (Mitra Binaan) di bawah mandat Tanggung Jawab Sosial dan Lingkungan (TJSL/PKBL). 

Sebagai **System Analyst dan Developer**, saya merancang kamus data (*data dictionary*) komprehensif, spesifikasi alur BPMN, skema database relasional dengan proteksi *concurrency*, serta mengimplementasikan modul inti sistem.

## Tantangan Analisis & Solusi Arsitektur

### 1. Eliminasi Race Condition Pembuatan Kode Mitra
- **Masalah:** Ketika beberapa cabang DAMRI mendaftarkan Mitra Binaan secara bersamaan pada awal tahun anggaran, terdapat risiko *duplicate key* pada format kode `PUMK-{tahun}-{urutan 3 digit}`.
- **Solusi Analisis & Dev:** Mengimplementasikan pola database locking:
  ```php
  // MitraController: Proteksi race condition nomor urut
  DB::transaction(function() {
      $lastMitra = RefMitra::whereYear('created_at', now()->year)
          ->lockForUpdate()
          ->latest('id')
          ->first();
      // Generate format aman PUMK-2026-XXX
  });
  ```

### 2. Integrasi Otentikasi SSO Pusat DAMRI (Zero Plaintext Password)
- Sistem tidak menyimpan kredensial/password lokal sama sekali.
- Menggunakan arsitektur *Shadow User* yang diverifikasi langsung ke database `sso` terpusat DAMRI berbasis NIK pegawai dan Business Unit (`id_bu`).

### 3. Validasi Ketat & Kamus Data Standar
- Validasi wajib 16 digit NIK pemilik usaha UMKM sesuai standar Dukcapil.
- Menyatukan terminologi antara format Excel operasional Product Owner (seperti *Kode MB*, *Monthly Review PK*, *TW I-IV*) dengan skema database aplikasi (`ref_mitra`, `tr_tjsl_pembayaran`).

## Dampak Bisnis Nyata
- **Zero Discrepancy:** Menghilangkan 100% duplikasi pencatatan nomor mitra binaan di seluruh unit DAMRI.
- **Audit Ready:** Seluruh riwayat transaksi cicilan dan restrukturisasi tercatat dalam *audit trail* yang siap diuji BPK / auditor internal.
