---
title: "Enterprise Fleet Telematics & Fuel Anomaly Detection Engine"
description: "Arsitektur Real-Time IoT Telematics & Fleet Intelligence untuk 1.500+ unit armada: Ingestion protokol CAN-bus SAE J1939 (5.000 ping/detik), algoritma filter Kalman untuk mitigasi false alarm sloshing bahan bakar, deteksi pencurian solar (fuel siphoning), dan koridor geofence dinamis Ditjen Hubdat."
client: "PT Trans Nusantara Logistics & Pengawasan Subsidi BBM PSO BPH Migas"
role: "Lead System Analyst & IoT Solutions Architect"
period: "2026"
category: "IoT Telematics, Logistics & Algorithmic Anomaly Detection"
featured: true
tags: ["IoT Telematics", "CAN-bus SAE J1939", "Kalman Filter", "Fuel Theft Anomaly", "Dynamic Geofencing", "Kafka Streaming", "SIT/UAT Matrix", "Kepmenhub KM 158/2021"]
metrics:
  - label: "Efisiensi Belanja Solar Armada"
    value: "Hemat Rp 4.2 Miliar / Tahun"
  - label: "Deteksi Pencurian Bahan Bakar"
    value: "7 Hari → < 45 Detik Real-Time"
  - label: "Akurasi Filter Guncangan Tangki"
    value: "< 0.12% False Positive Rate"
---

## Ringkasan Eksekutif
Dalam manajemen armada transportasi darat dan logistik berskala nasional (1.500+ unit bus antarkota dan truk kargo), bahan bakar minyak (BBM Solar) menyerap **38% hingga 45% dari total biaya operasional perusahaan**. Sebelum sistem pemantauan telematika berbasis sensor ini dibangun, kebocoran bahan bakar akibat pencurian BBM ilegal (*fuel siphoning* / "kencing solar"), deviasi rute tidak resmi, dan manipulasi nota pengisian SPBU menyebabkan kerugian korporasi lebih dari **Rp 400 Juta setiap bulan**.

Sebagai **Lead System Analyst & IoT Solutions Architect**, saya merancang spesifikasi arsitektur hulu-ke-hilir untuk **Enterprise Fleet Telematics & Fuel Anomaly Detection Engine** yang menghubungkan modul *on-board* kendaraan, filter matematika sinyal sensor, rule engine deteksi anomali seketika, dan rekonsiliasi finansial belanja bahan bakar.

---

## Sumber Kasus & Sumber Data Riil (Ground Truth)
Studi kasus ini dikembangkan mengacu pada standar transportasi resmi dan arsitektur telematika otomotif industri:
1. **Regulasi Resmi Kementerian Perhubungan & BPH Migas:**
   * **Kepmenhub No. KM 158/2021:** Standar Penerapan Sistem Pemantauan dan Pelacakan Berbasis GPS pada Angkutan Orang dan Barang Nasional.
   * **Peraturan BPH Migas No. 04/2020:** Pedoman Pengendalian dan Pengawasan Penyaluran Jenis Bahan Bakar Minyak Tertentu (JBT Solar Subsidi) pada Angkutan Umum BUMN.
2. **Standar Protokol Telematika & Sensor Kendaraan:**
   * **SAE J1939 / CAN-bus Standard:** Ekstraksi data ECU kendaraan (Fuel Level %, Engine RPM, Vehicle Speed, Coolant Temp, Odometer).
   * **NMEA-0183:** Kalibrasi sinyal GPS receiver (Latitude, Longitude, Altitude, Satellites In View).
3. **Triangulasi Sumber Data Uji Ingestion:**
   * **Stream 1 (IoT Telemetry Telematics):** Paket MQTT / TCP biner 5.000 ping/detik dari 1.500 unit GPS tracker on-board.
   * **Stream 2 (Enterprise ERP Fleet Master):** Jadwal trayek aktif, supir bertugas, dan koridor batas rute izin Ditjen Hubdat.
   * **Stream 3 (Pertamina Fuel Card / SPBU Ingestion):** Struk elektronik pembelian solar dengan stempel waktu, nominal rupiah, dan volume liter.

---

## Masalah Operasional Kritis (The Core Problems)

1. **Pencurian Bahan Bakar di Rest Area Liar (*Fuel Siphoning*):**
   * Pengemudi atau oknum tidak bertanggung jawab menyedot 30 hingga 50 liter solar dari tangki saat kendaraan berhenti di bahu jalan atau tempat parkir liar pada dini hari. Tanpa sensor level kontinu, kehilangan ini baru terdeteksi 7 hari kemudian saat evaluasi konsumsi BBM mingguan.
2. **False Alarm Akibat Guncangan Cairan Tangki (*Sloshing Noise*):**
   * Sensor pelampung analog tangki mengalami guncangan ekstrem ketika bus melewati jalan berlubang, tikungan tajam, atau tanjakan perbukitan. Fluktuasi cairan hingga $\pm 15$ liter memicu ribuan alarm pencurian palsu jika tidak dieliminasi melalui penyaringan sinyal (*signal noise filtering*).
3. **Penyimpangan Trayek Resmi (*Geofence Corridor Breach*):**
   * Armada keluar jalur trayek resmi AKAP untuk mengangkut penumpang liar atau muatan ilegal di luar manifest resmi, melanggar izin Ditjen Hubdat dan memboroskan konsumsi solar.
4. **Klaim Struk SPBU Fiktif (*Ghost Fuel Vouchers*):**
   * Klaim nota pengisian solar dari SPBU pihak ketiga yang nilainya digelembungkan tanpa adanya bahan bakar riil yang dimasukkan ke tangki kendaraan.

---

## Solusi Arsitektur Telematika & Algoritma Deteksi

```
[1.500 Bus Fleet OBD/CAN-bus] 
          │ (MQTT / TCP Telemetry Stream 5.000 ping/s)
          ▼
[High-Throughput Ingestion Queue (Kafka / Redis Streams)]
          │
          ├──▶ [1D Continuous Kalman Filter] ──▶ Mengeliminasi Noise Sloshing (<0.12% False Alarm)
          │
          ├──▶ [Fuel Siphoning Rule Engine]  ──▶ Penurunan >8L dalam <180s saat Mesin OFF ──▶ Alert P1 (<45s)
          │
          ├──▶ [Dynamic Geofence Corridor]   ──▶ Buffer 250m Sepanjang Rute Resmi Ditjen Hubdat
          │
          └──▶ [SPBU 3-Way Triangulation]    ──▶ Klaim Nota vs Kenaikan Riil Sensor Tangki (Toleransi 2%)
```

1. **Algoritma Pemulus Sinyal Tangki (Continuous 1D Kalman Filter):**
   * Menyaring lonjakan data mentah (*raw analog sensor voltage*) akibat gelombang cairan solar saat bergerak dinamis. Menghasilkan estimasi volume riil tangki yang presisi dan mereduksi *false alarm rate* dari 24.5% menjadi **kurang dari 0.12%**.
2. **Fuel Siphoning Rule Engine (Rate-of-Drop Threshold):**
   * Logika deteksi: Jika volume cairan tangki mengalami penurunan $\Delta V > 8\text{ Liter}$ dalam kurun waktu $\Delta t \le 180\text{ detik}$ ketika status mesin `OFF` atau kecepatan kendaraan $0\text{ km/jam}$, sistem langsung memicu notifikasi darurat (*Critical P1 Siren*) ke layar dispatcher dan ponsel Kepala Depo regional dalam waktu **< 45 detik**.
3. **Dynamic Polyline Geofence Corridor Engine:**
   * Koridor rute resmi dihitung secara otomatis sebagai *polygon buffer* selebar 250 meter di kanan-kiri rute Ditjen Hubdat. Jika kendaraan keluar jalur lebih dari 5 menit, tiket pelanggaran trayek otomatis diterbitkan dengan koordinat eksak OpenStreetMap.
4. **Triangulasi SPBU 3-Way Verification:**
   * Setiap kali armada melakukan pengisian BBM di SPBU, sistem mencocokkan nominal liter pada struk dengan peningkatan volume tangki terukur pada jendela waktu $\pm 15$ menit. Klaim nota fiktif terdeteksi seketika.

---

## Metrik Penghematan Finansial & Dampak Teruji

| Indikator Kinerja Utama (KPI) | Sebelum Implementasi | Setelah Sistem Telematika | Hasil & ROI Kuantitatif |
| :--- | :---: | :---: | :---: |
| **Kehilangan Solar Ilegal (Theft)** | 3.85% dari total belanja BBM | **0.44% (Terkendali)** | **Turun 88.5% (-Rp 4.2 M/th)** |
| **Waktu Deteksi Pencurian Solar** | 7 Hari (Audit Manual) | **< 45 Detik (Real-Time)** | **Tangkap Basah di Lokasi** |
| **False Alarm Fluktuasi Guncangan** | 24.5% Alarm Palsu | **< 0.12% (Kalman Filter)** | **Nir-Gangguan Operasional** |
| **Kepatuhan Rute Izin Ditjen Hubdat** | 91.2% | **99.8% Kepatuhan** | **Zero Pelanggaran Izin** |
| **Payback Period Investasi IoT** | Proyeksi 12 Bulan | **2.2 Bulan (Tercapai)** | **ROI Cepat Terbukti** |

---

## Ketersediaan Dokumen Bukti Lengkap (Business Dossier)
Seluruh spesifikasi teknis dan model kalkulasi penghematan keuangan telah didokumentasikan dalam format standar bisnis di direktori lokal internal:
* `Daftar Porto/04_Fleet_Telematics_Fuel_Anomaly_Engine/01_SRS_Fleet_Telematics_Fuel_Anomaly_Engine.docx` (Dokumen SRS Standar Korporat - 39 KB)
* `Daftar Porto/04_Fleet_Telematics_Fuel_Anomaly_Engine/02_Fuel_Anomaly_Telemetry_and_Savings_Model.xlsx` (Model Finansial ROI Hemat Rp 4.2 Miliar & Simulasi Kalman 60 Ping - 11 KB)
* `Daftar Porto/04_Fleet_Telematics_Fuel_Anomaly_Engine/03_SIT_UAT_Telematics_Matrix.xlsx` (Matriks 35 Skenario UAT Telematika & Geofence - 7 KB)
