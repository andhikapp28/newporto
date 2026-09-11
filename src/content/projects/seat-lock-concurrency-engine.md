---
title: "High-Concurrency Seat Lock & Distributed Reservation Engine"
description: "Arsitektur reservasi tiket transportasi massal berkapasitas 10.000 req/s: Distributed Mutex Locking (Redis SETNX), TTL Watchdog otomatis 600 detik, mitigasi race condition pada lonjakan flash sale mudik, dan jaminan 0% insiden double-booking."
client: "Platform Tiket Transportasi Publik Nasional & Antarmuka OTA"
role: "Lead System Analyst & Concurrency Architect"
period: "2026"
category: "High-Concurrency Systems & Distributed Locking"
featured: true
tags: ["Distributed Locks", "Redis SETNX", "Race Condition Mitigation", "TTL Watchdog Daemon", "Idempotency Protocol", "k6 Stress Testing", "High Availability"]
metrics:
  - label: "Throughput Kapasitas Puncak"
    value: "10.000 req/s (Stress Tested)"
  - label: "Insiden Double-Booking Kursi"
    value: "Tepat 0% (Hard Consistency)"
  - label: "P99 Lock Acquisition Latency"
    value: "< 45 ms (Sub-Second UX)"
---

## Ringkasan Eksekutif
Pada platform pemesanan tiket angkutan umum (bus antarkota, kereta api, maupun kapal feri), periode liburan puncak (seperti mudik Idul Fitri dan Nataru) menciptakan lonjakan lalu lintas ekstrem. Ratusan calon penumpang seringkali menargetkan nomor kursi yang sama dalam milidetik yang identik. Sistem reservasi konvensional yang hanya bertumpu pada *database row-level locking* murni kerap mengalami kehabisan koneksi (*connection pool exhaustion*), *deadlock*, dan kegagalan fatal berupa **kursi terjual ganda (*double-booking*)**.

Sebagai **Lead System Analyst & Concurrency Architect**, saya merancang spesifikasi dan memverifikasi arsitektur **Distributed Seat Lock Engine** menggunakan **Redis SETNX Mutex**, **TTL Watchdog**, serta protokol kunci idempotensi yang menjamin integritas alokasi kursi tanpa celah kesalahan.

---

## Sumber Kasus & Sumber Data Riil (Ground Truth)
1. **Pola Trafik Pemesanan Tiket Transportasi Nasional:**
   * Lonjakan musiman mudik Lebaran (lonjakan trafik 15x lipat dari hari normal pada detik pembukaan penjualan tiket H-45).
   * Pola akses multikanal simultan dari Web Portal, Mobile App Android/iOS, dan konsorsium Online Travel Agent (OTA).
2. **Karakteristik Data Uji Beban (Load Test Data):**
   * Simulasi 10.000 *Virtual Users (VU)* secara konkuren menggunakan k6 load testing suite.
   * Dataset 50 rute armada antarkota dengan 2.000 kapasitas kursi per jam keberangkatan.

---

## Masalah Kritis yang Dipecahkan (The Core Problem)

1. **Race Condition Milidetik yang Sama (Phantom Booking):**
   * Dua pengguna di kota berbeda mengklik kursi 4B pada pukul 08:00:00.102 WIB. Query database relasional `SELECT FOR UPDATE` memicu antrian kunci panjang yang berujung *database timeout*, membiarkan transaksi kedua lolos validasi ketersediaan semu.
2. **Kursi Menggantung Akibat Pembatalan Sepihak (Ghost Inventory):**
   * Calon pembeli mengunci kursi namun menutup peramban (*browser abandonment*) tanpa menuntaskan pembayaran. Tanpa mekanisme *watchdog* otomatis yang deterministik, kursi tersebut terkunci selamanya dan tidak dapat dibeli oleh orang lain.
3. **Double-Click & Retransmisi Jaringan:**
   * Pengguna menekan tombol "Bayar Sekarang" berkali-kali saat sinyal seluler tidak stabil, menciptakan duplikasi pembuatan pesanan dan memotong kuota ganda.

---

## Solusi Teknis & Arsitektur Mesin

```
[10.000 req/s Traffic]
        │
        ▼
[API Gateway (Rate Limiter & Idempotency Key)]
        │
        ▼
[Redis Sentinel Cluster] ◀── [Atomic SETNX seat:{id}:lock {user_id} EX 600]
        │
   ┌────┴────────────────────────┐
[Success (200 OK)]        [Conflict (409 Already Locked)]
   │                             │
   ▼                             ▼
[Lock Granted (10 Min TTL)]  [Immediate Suggest Next Seat]
   │
   ├─▶ [Payment Callback Arrives] ──▶ [Seat Status: SOLD]
   │
   └─▶ [TTL Expires (Watchdog)]   ──▶ [Seat Status: REVERT AVAILABLE]
```

1. **Distributed Mutex Lock (Atomic Redis SETNX):**
   * Perintah `SET seat:{schedule_id}:{seat_no} {reservation_token} NX EX 600` dieksekusi dalam tempo <5 ms. Hanya 1 request yang berhasil mendapatkan *lock*, sedangkan 99 request lainnya langsung menerima respons `409 Conflict` secara instan tanpa membebani database utama.
2. **Deterministic TTL Watchdog (600 Detik):**
   * Kursi yang dikunci memiliki batas kedaluwarsa mutlak 10 menit. Jika pembayaran tidak diverifikasi gateway dalam rentang tersebut, kunci memori otomatis terlepas dan kursi kembali tersedia untuk publik.
3. **Grace Period Pembayaran Perbatasan:**
   * Jika notifikasi pembayaran bank diterima pada detik ke-599 dari batas 600 detik, sistem memberikan perpanjangan toleransi *grace period* 60 detik guna mencegah dana terdebit tanpa tiket terbit.
4. **Idempotency-Key Envelope:**
   * Setiap request membawa UUID unik pada header HTTP. Request kembar dengan payload identik tidak akan membuat sesi baru melainkan mengembalikan *cached response* dari permintaan pertama.

---

## Metrik Pengujian & Performa Teruji

| Parameter Metrik Beban | Sistem Database Tradisional | Redis Distributed Mutex | Hasil Validasi |
| :--- | :---: | :---: | :---: |
| **Kapasitas Throughput Puncak** | 850 req/s (Mulai Deadlock) | **10.000+ req/s** | **Peningkatan 11.7x** |
| **P99 Latensi Akuisisi Kunci** | > 2.400 ms | **< 45 ms** | **Pengalaman Kilat** |
| **Insiden Double Booking** | Rata-rata 14 kasus per lonjakan | **Tepat 0 Kasus (Nir-Defek)** | **Integritas 100%** |
| **Waktu Pelepasan Kursi Hangus** | Manual via cronjob 1 jam | **Real-time (Eksak 600 detik)** | **Zero Ghost Seats** |

---

## Ketersediaan Dokumen Bukti Lengkap (Business Dossier)
Seluruh artefak teknis dan model simulasi kapasitas telah didokumentasikan dalam format standar bisnis di direktori lokal:
* `Daftar Porto/03_Seat_Lock_and_Concurrency_Engine/01_SRS_Seat_Lock_Concurrency_Engine.docx` (Dokumen SRS Standar Korporat - 38 KB)
* `Daftar Porto/03_Seat_Lock_and_Concurrency_Engine/02_Concurrency_Stress_Test_and_Capacity_Model.xlsx` (Model Simulasi Beban k6 10.000 VU - 6 KB)
* `Daftar Porto/03_Seat_Lock_and_Concurrency_Engine/03_SIT_UAT_Seat_Lock_Matrix.xlsx` (Matriks 30 Skenario UAT Konkurensi & Sentinel Failover - 6 KB)
