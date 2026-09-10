---
title: "Modernisasi Sistem E-Ticketing & LMB Online — Armada DAMRI"
description: "Spesifikasi arsitektur loket tiket digital terintegrasi dan lembar manifest bus (LMB) online untuk ratusan rute operasional bus antar-kota dan bandara di seluruh Indonesia."
client: "Perum DAMRI — Direktorat Operasional"
role: "System Analyst & QA Specialist"
period: "2023 - 2024"
category: "Transportation Tech & Fleet Logistics"
featured: true
tags: ["E-Ticketing", "BPMN 2.0", "REST API", "Offline-Ready POS", "QA Test Matrix", "Postman", "Fleet Tracking"]
metrics:
  - label: "Akurasi Manifest Penumpang"
    value: "99.9%"
  - label: "Waktu Terbit Tiket Loket"
    value: "< 3 Detik"
  - label: "QA Test Scenarios"
    value: "160+ Kasus"
---

## Ringkasan Eksekutif
Operasional transportasi publik skala nasional seperti DAMRI menuntut keandalan tinggi pada sistem loket tiket stasiun/bandara dan Lembar Manifest Bus (LMB). Sistem ini menggantikan proses pencatatan manual di loket terminal menjadi sistem digital tersentralisasi yang terhubung langsung ke sistem akuntansi pusat (*CentralKeu*) dan rekonsiliasi agen (*DILS*).

## Peran & Tanggung Jawab Analis
- **Penyusunan BRD & SRS:** Menerjemahkan alur bisnis tiket bus (reguler, bandara, AKAP, KSPN) ke dalam standar diagram alur BPMN 2.0.
- **Spesifikasi API Antarmuka:** Menyusun kontrak API OpenAPI antara aplikasi loket kasir, aplikasi mobile penumpang (*My DAMRI*), dan sistem backoffice.
- **QA Rigor:** Merancang skenario pengujian komprehensif untuk kondisi ekstrem seperti koneksi internet terminal putus di tengah transaksi pembayaran, pemesanan kursi ganda (*double booking*), dan pembatalan tiket.

## Dampak Sistem
- Mencegah *seat collision* pada jam keberangkatan padat.
- Integrasi otomatis manifest penumpang dengan asuransi perjalanan Jasa Raharja.
