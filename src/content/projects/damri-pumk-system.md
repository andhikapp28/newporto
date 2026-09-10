---
title: "Aplikasi PUMK (Program Pendanaan Usaha Mikro & Kecil) — Perum DAMRI"
description: "Arsitektur digitalisasi pembinaan & pembiayaan UMKM BUMN Perum DAMRI: verifikasi NIK 16 digit, generate kode mitra unik berbasis lockForUpdate, modul cicilan TJSL, dan integrasi SSO terpusat."
client: "Perum DAMRI (BUMN Transportasi)"
role: "System Analyst & Full-Stack Developer"
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

Sebagai **System Analyst dan Developer**, saya merancang dokumen spesifikasi kebutuhan perangkat lunak (SRS/BRD), menyusun kamus data (*data dictionary*) teknis setebal 32KB, memetakan diagram alur proses bisnis (BPMN 2.0), serta mengimplementasikan modul inti sistem berbasis Laravel 12 dan PostgreSQL.

## Analisis Masalah & Kebutuhan Bisnis
1. **Desinkronisasi Terminologi Operasional vs Database:** Product Owner dari unit TJSL menggunakan lembar kerja Excel dengan istilah historis (*MB, Kode MB, Monthly Review PK, TW I-IV*). Analis bertugas memetakan istilah bisnis tersebut ke dalam skema basis data relasional formal (`ref_mitra`, `tr_tjsl_pembayaran`, `ref_users`).
2. **Risiko Race Condition Pembuatan Nomor Mitra:** Pada awal tahun anggaran, puluhan cabang DAMRI secara serentak menginput data mitra baru. Tanpa penguncian transaksi, format kode `PUMK-{tahun}-{urutan 3 digit}` rawan mengalami *duplicate primary key* atau nomor loncat.
3. **Standarisasi Identitas Kependudukan (NIK):** Pemilik usaha wajib tervalidasi 16 digit NIK secara ketat untuk mencegah penerima pembiayaan ganda lintas BUMN.

## Solusi Arsitektur & Spesifikasi Rekayasa

### 1. Concurrency Control & Database Locking
Mengimplementasikan transaksi terisolasi dengan `lockForUpdate()` pada level basis data PostgreSQL untuk menjamin penerbitan kode mitra unik bebas benturan:
```php
// MitraController: Proteksi race condition nomor urut
DB::transaction(function() {
    $lastMitra = RefMitra::whereYear('created_at', now()->year)
        ->lockForUpdate()
        ->latest('id')
        ->first();
    
    $nextNumber = $lastMitra ? ($lastMitra->urutan + 1) : 1;
    $kodeMitra = sprintf('PUMK-%s-%03d', now()->year, $nextNumber);
    // Simpan data mitra dengan kode unik yang terjamin
});
```

### 2. Integrasi Otentikasi SSO Pusat DAMRI (Shadow User Pattern)
- Sistem tidak menyimpan kredensial/password lokal pegawai di database aplikasi untuk mematuhi tata kelola keamanan TI BUMN.
- Otentikasi dilakukan via koneksi SSO terpusat (`sso`), kemudian sistem mencatat *shadow user* lokal di `ref_users` berdasarkan NIK pegawai dan unit bisnis (`id_bu`).

### 3. Modul Pencatatan Cicilan & Rekonsiliasi TJSL
- Mengelola data penyaluran pembiayaan (Bank BRI, Bank Mandiri), jadwal angsuran, pencatatan kwitansi kas masuk (`tr_tjsl_pembayaran`), hingga rekapitulasi evaluasi kinerja triwulanan (TW1 s/d TW4).

## Dampak Kuantitatif & Keberhasilan Proyek
- **0% Duplikasi Nomor Mitra:** Menghilangkan seluruh insiden tabrakan nomor registrasi di cabang.
- **Efisiensi Audit Trail:** Seluruh riwayat transaksi cicilan dan restrukturisasi mitra tercatat dalam log audit yang transparan dan siap diuji auditor BPK / internal.
- **Kamus Data Standar:** Dokumen *kamus-data.md* menjadi acuan tunggal bagi tim developer, QA, dan product owner.
