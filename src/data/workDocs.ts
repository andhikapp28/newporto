// src/data/workDocs.ts
// Enterprise Work Documents Data for Andhika Putra Pratama Portfolio
// Extracted for Static SSR Routes (/docs/[id]) & Windows XP Desktop In-App Viewer

export interface WorkDoc {
  id: string;
  title: string;
  ref: string;
  version?: string;
  status: string;
  author: string;
  category: string;
  categoryBadge: string;
  date: string;
  description: string;
  descriptionId: string;
  keywords: string[];
  relatedProjectId?: string;
  downloadFilename: string;
  downloadUrl?: string;
  snippet: string;
}

export const workDocs: WorkDoc[] = [
  {
    "id": "cv-ats",
    "title": "CV_ATS_Andhika_Putra_Pratama.doc",
    "ref": "DOC-CV-ATS-2026",
    "version": "2026.1",
    "status": "ACTIVE / ATS COMPLIANT",
    "author": "Andhika Putra Pratama, S.Kom.",
    "category": "ATS Resume / Profile",
    "categoryBadge": "ATS Resume",
    "date": "2026",
    "description": "Curriculum Vitae ATS standard specification for Senior System Analyst & Solution Architect with hands-on Software Development & QA Testing Depth.",
    "descriptionId": "Curriculum Vitae standar ATS untuk Senior System Analyst & Solution Architect dengan keahlian teknis pengembangan perangkat lunak dan pengujian QA.",
    "keywords": [
      "cv",
      "ats",
      "resume",
      "andhika putra pratama",
      "system analyst",
      "solution architect",
      "itera",
      "toefl 640"
    ],
    "downloadFilename": "CV_ATS_Andhika_Putra_Pratama.pdf",
    "snippet": "================================================================================\nCURRICULUM VITAE — ATS STANDARD SPECIFICATION\nANDHIKA PUTRA PRATAMA, S.Kom.\nSystem Analyst (with hands-on Software Development & QA Testing Depth)\nEmail: andhikapp28@gmail.com | GitHub: github.com/andhikapp28 | Location: Indonesia\n================================================================================\n\n[PROFESSIONAL PROFILE]\nSystem Analyst with direct end-to-end engineering lifecycle experience across \n40+ enterprise platforms. Bridges ambiguous business logic into razor-sharp,\nauditable technical specifications (SRS/BRD/TAD). Experienced in implementing \ndatabase concurrency control, API integrations, and leading rigorous \nSystem Integration Testing (SIT) and User Acceptance Testing (UAT).\n\n[EDUCATION]\nBachelor of Computer Science (S.Kom.) — Informatics Engineering\nInstitut Teknologi Sumatera (ITERA) | 2019 – 2023\nGPA: 3.73 / 4.00 (Sangat Memuaskan / High Distinction)\n\n[CORE TECHNICAL COMPETENCIES]\n• System Analysis: SRS/BRD, BPMN 2.0, Use Case, ERD 3NF, Data Dictionary, WBS, MoM\n• Software Development: PHP 8.2+, Laravel 12, PostgreSQL, REST APIs, GitHub API, SSO\n• QA & Testing: SIT/UAT Test Suites, Boundary Value Analysis, Concurrency Stress Test\n• Change Management: ITIL-aligned Change Requests (CR), Rollback Protocols, GL QA/QC\n\n[CERTIFICATIONS]\n• IT Specialist in Python — Pearson / Certiport (Score: 890 / 1000)\n• Machine Learning Specialization — DeepLearning.AI / Stanford Online\n• Crash Course on Python — Google / Coursera\n• TOEFL ITP Official Score: 640 (C1 Advanced English Proficiency)",
    "downloadUrl": "/documents/CV_ATS_Andhika_Putra_Pratama.pdf"
  },
  {
    "id": "srs-pumk",
    "title": "SRS_PUMK_Executive_Summary.doc",
    "ref": "SRS-PUMK-08062026-15",
    "version": "1.2",
    "status": "APPROVED FOR PRODUCTION",
    "author": "Andhika Putra Pratama, S.Kom.",
    "category": "System Requirements Specification (SRS)",
    "categoryBadge": "System Analyst",
    "date": "08 Juni 2026",
    "description": "Software Requirements Specification (SRS) Executive Summary for Aplikasi Program Pendanaan Usaha Mikro dan Kecil (PUMK) Perum DAMRI.",
    "descriptionId": "Ringkasan Eksekutif Spesifikasi Kebutuhan Perangkat Lunak (SRS) Aplikasi PUMK Perum DAMRI (16 Modul, Concurrency, RBAC & Kamus Data).",
    "keywords": [
      "srs",
      "pumk",
      "damri",
      "tjsl",
      "pkbl",
      "concurrency",
      "lockforupdate",
      "rbac",
      "data dictionary"
    ],
    "downloadFilename": "SRS_PUMK_Executive_Summary.doc",
    "snippet": "================================================================================\nSOFTWARE REQUIREMENTS SPECIFICATION (SRS) — EXECUTIVE SUMMARY\nAplikasi Program Pendanaan Usaha Mikro dan Kecil (PUMK) — Perum DAMRI\nDoc Ref: SRS-PUMK-08062026-15 | Version: 1.2 | Status: APPROVED FOR PRODUCTION\nAuthor / Lead System Analyst: Andhika Putra Pratama, S.Kom.\nTarget Units: TJSL / PKBL, Divisi Keuangan, 40+ Cabang Operasional\n================================================================================\n\n1. EXECUTIVE BUSINESS PROBLEM & STATEMENT OF NEED\n   Unit Tanggung Jawab Sosial dan Lingkungan (TJSL) Perum DAMRI membutuhkan sentralisasi\n   tata kelola penyaluran dana pinjaman modal kerja bagi Usaha Mikro & Kecil (Mitra Binaan).\n   Sistem terdahulu yang berbasis spreadsheet manual memiliki celah:\n   a. Desinkronisasi data angsuran, bunga pinjaman, dan rekonsiliasi mutasi perbankan.\n   b. Risiko registrasi ganda penerima pembiayaan lintas BUMN akibat belum validnya NIK.\n   c. Benturan kode mitra saat cabang di seluruh Indonesia menginput secara bersamaan.\n\n2. SYSTEM SCOPE & FUNCTIONAL BREAKDOWN (16 Core Modules)\n   [MOD-01] Validasi NIK 16 Digit & Integrasi Kependudukan\n   [MOD-02] Scoring & Evaluasi Kelayakan Karakter Usaha Mikro\n   [MOD-03] Penetapan Plafon Pembiayaan & Skema Angsuran (Jasa Admin & Pokok)\n   [MOD-04] Penerbitan Digital Akad Perjanjian & Surat Penyerahan Pinjaman\n   [MOD-05] Manajemen Kas Masuk & Pencatatan Kwitansi Rekonsiliasi Bank BUMN\n   [MOD-06] Pemantauan Kolektibilitas Pinjaman (Lancar, DPK, Kurang Lancar, Macet)\n   [MOD-07] Restrukturisasi Termin Pinjaman & Penjadwalan Ulang Angsuran\n   [MOD-08] Ekspor Laporan Triwulanan (TW1 - TW4) Standar Mandatori Kementerian BUMN & OJK\n\n3. CRITICAL BUSINESS RULES & TECHNICAL GOVERNANCE\n   BR-01 [Validasi Identitas]: NIK wajib tepat 16 digit angka terverifikasi unik dalam\n         basis data sistem untuk mencegah duplikasi bantuan.\n   BR-02 [Penerbitan Kode Unik Mitra]: Format standar PUMK-{YYYY}-{NNN}. Wajib dieksekusi\n         dalam isolasi transaksi tingkat database menggunakan pessimistic locking \n         (lockForUpdate) untuk mencegah race condition / nomor ganda saat jam sibuk.\n   BR-03 [Matriks Akses Berjenjang (RBAC)]:\n         - Staff Cabang       : Input profil mitra & upload proposal (Draft).\n         - Kepala Cabang      : Verifikasi kelayakan lapangan & rekomendasi awal.\n         - Tim TJSL Kantor Pusat: Approval limit pembiayaan & penerbitan SPK.\n         - Divisi Keuangan    : Pencatatan mutasi kas masuk & rekonsiliasi bank.\n         - Auditor BPK / SPI  : Akses peninjauan menyeluruh (Read-Only Audit Trail).\n\n4. DATA DICTIONARY & NON-FUNCTIONAL STANDARDS\n   - Kamus Data Teknis: Mendefinisikan 24 tabel relasional (32KB data dictionary formal).\n   - SSO Terpusat: Otentikasi pegawai via LDAP/SSO DAMRI (Shadow User Pattern).\n   - Audit Trail: Setiap perubahan plafon, status, dan transaksi mencatat ID user,\n     timestamp presisi milidetik, alamat IP, serta delta data before/after.",
    "relatedProjectId": "damri-pumk-system"
  },
  {
    "id": "cr-governance",
    "title": "CR_Change_Request_Governance_Log.doc",
    "ref": "CR-GOV-ITIL-2026",
    "version": "1.0",
    "status": "AUDITED & PRODUCTION GATED",
    "author": "Andhika Putra Pratama, S.Kom.",
    "category": "ITIL Change Management",
    "categoryBadge": "ITIL Governance",
    "date": "Agustus 2026",
    "description": "ITIL-aligned Change Request (CR) governance and audit log summary across SIMA Operasi, E-Office, and SIMA Teknik enterprise platforms.",
    "descriptionId": "Tata kelola Change Request (CR) dan log audit berbasis ITIL untuk platform enterprise SIMA Operasi, E-Office, dan SIMA Teknik.",
    "keywords": [
      "cr",
      "change request",
      "governance",
      "itil",
      "sima operasi",
      "e-office",
      "sima teknik",
      "rollback"
    ],
    "downloadFilename": "CR_Change_Request_Governance_Log.doc",
    "snippet": "================================================================================\nCHANGE REQUEST (CR) GOVERNANCE & AUDIT LOG SUMMARY\nFramework: ITIL Change Management Lifecycle & Software Quality Gate\nLead System Analyst & Release Gatekeeper: Andhika Putra Pratama, S.Kom.\n================================================================================\n\n1. PRINSIP TATA KELOLA PERUBAHAN SISTEM\n   Menjamin setiap modifikasi alur proses bisnis, penyesuaian formula kalkulasi,\n   dan penambahan modul pada sistem produksi berjalan terprediksi, terdokumentasi,\n   memiliki analisis dampak (impact analysis) komprehensif, dan disetujui stakeholder.\n\n2. STANDAR PROSEDUR OPERASIONAL (SOP) CHANGE REQUEST\n   [Inisiasi CR] -> [Analisis Dampak & Risiko] -> [Tinjauan Teknis & Estimasi Mandays]\n   -> [Persetujuan CAB / Unit Owner] -> [Development Staging] -> [Verifikasi SIT & UAT]\n   -> [Sign-Off Go-Live (GL-QAQC)] -> [Deployment Produksi & Evaluasi 72 Jam]\n\n3. DAFTAR SAMPEL CHANGE REQUEST YANG TELAH SELESAI DIEKSEKUSI:\n\n   -----------------------------------------------------------------------------\n   [CR-01] CR-SO-26062026-02 | Sistem: SIMA OPERASI (Penjadwalan & Armada)\n   - Deskripsi      : Penambahan Modul Rekapan Anggaran Operasional Cabang\n   - Latar Belakang : Kebutuhan konsolidasi real-time biaya BBM dan tol armada bus.\n   - Analisis Dampak: \n     * Basis Data: Penambahan tabel tr_anggaran_operasi (FK: id_trayek, id_bus).\n     * Backend   : Optimasi aggregation query dengan composite indexing.\n     * Frontend  : Form validasi limit plafon anggaran per armada.\n   - Status & Hasil : APPROVED & DEPLOYED | UAT Pass Rate: 100%\n   -----------------------------------------------------------------------------\n   [CR-02] CR-EOF-27082026-12 | Sistem: E-OFFICE (Tata Naskah Dinas Elektronik)\n   - Deskripsi      : Penyesuaian Format Naskah Dinas & Alur Disposisi Bertingkat\n   - Latar Belakang : Kepatuhan terhadap Peraturan Direksi Tata Naskah Dinas terbaru.\n   - Analisis Dampak: Refactoring state machine disposisi, penambahan validasi digital signature.\n   - Status & Hasil : APPROVED & DEPLOYED | UAT Pass Rate: 100%\n   -----------------------------------------------------------------------------\n   [CR-03] CR-SIMAT-07072026-03 | Sistem: SIMA TEKNIK (Perawatan Armada Bus)\n   - Deskripsi      : Penyesuaian Formula Estimasi Biaya Pemeliharaan & Suku Cadang\n   - Latar Belakang : Pembaruan katalog harga sparepart vendor rekanan tahun anggaran baru.\n   - Analisis Dampak: Update service layer kalkulasi biaya estimasi vs realisasi faktur.\n   - Status & Hasil : APPROVED & DEPLOYED | UAT Pass Rate: 98.5%\n   -----------------------------------------------------------------------------\n\n4. METRIK KEBERHASILAN GOVERNANCE\n   - 100% Perubahan skema basis data produksi memiliki tiket CR formal.\n   - Zero undocumented schema changes di seluruh lingkungan server operasional.\n   - Waktu rata-rata penyelesaian analisis dampak: < 24 jam kerja."
  },
  {
    "id": "enterprise-systems",
    "title": "Enterprise_Systems_Documentation_Catalogue.doc",
    "ref": "CAT-ENT-SYS-40",
    "version": "2026.08",
    "status": "VERIFIED CATALOGUE",
    "author": "Andhika Putra Pratama, S.Kom.",
    "category": "Enterprise Architecture & Systems Catalogue",
    "categoryBadge": "Enterprise Scope",
    "date": "2024 – 2026",
    "description": "Enterprise Systems Documentation Catalogue covering 40+ operational, logistics, ticketing, financial, HR, and governance platforms.",
    "descriptionId": "Katalog dokumentasi sistem enterprise mencakup 40+ platform operasional, logistik, ticketing, keuangan, SDM, dan tata kelola.",
    "keywords": [
      "enterprise systems",
      "40 systems",
      "damri",
      "catalogue",
      "sima",
      "dils",
      "hcms",
      "afc",
      "tiketing"
    ],
    "downloadFilename": "Enterprise_Systems_Documentation_Catalogue.doc",
    "snippet": "================================================================================\nENTERPRISE SYSTEMS DOCUMENTATION CATALOGUE (40+ SYSTEMS)\nRole: System Analyst & Technical Specification Lead — Andhika Putra Pratama, S.Kom.\nOrganisasi: Perum DAMRI (Transportasi, Logistik & Ekosistem Bisnis BUMN)\n================================================================================\n\nPORTFOLIO OVERVIEW:\nTelah memetakan proses bisnis, menyusun spesifikasi kebutuhan teknis (SRS/BRD),\nmerancang arsitektur data (TAD/ERD), menyusun panduan pengguna (Manual Guide),\nserta memandu pengujian integrasi (SIT/UAT) untuk lebih dari 40 sistem enterprise:\n\n[A] SISTEM OPERASIONAL, LOGISTIK & MANAJEMEN ARMADA\n01. SIMA UMUM               : Sistem Informasi Manajemen Administrasi Umum\n02. SIMA OPERASI            : Manajemen Penjadwalan Bus, Trayek, & Alokasi Awak\n03. SIMA TEKNIK             : Perawatan Armada Bus, Bengkel, & Manajemen Suku Cadang\n04. SIMA PROPERTY           : Manajemen Aset Gedung, Pool, Depo & Properti Komersial\n05. DILS                    : DAMRI Integrated Logistics System\n06. DILS AGEN               : Portal Keagenan Kargo & Ekspedisi Logistik\n07. LMB ONLINE              : Laporan Muatan Bus & Kapasitas Bagasi Real-Time\n08. AUTOMATIC SCALE SYSTEM  : Integrasi Sensor Jembatan Timbang Truk Kargo\n\n[B] SISTEM TIKET, TRANSAKSI PENUMPANG & GATE PAYMENT\n09. NEW TIKET (LOKET)       : Point-of-Sale (POS) Kasir Loket Tiket Terminal\n10. NEW ETIKETING API       : Gateway Integrasi Tiket dengan OTA & Mitra Eksternal\n11. AUTOMATIC FARE COLLECTION (AFC) : Integrasi Gate Pembayaran Non-Tunai / Kartu\n12. TICKET BOX              : Kios Penjualan Tiket Mandiri Penumpang\n13. MY DAMRI                : Aplikasi Mobile Penumpang (Pemesanan & Jadwal Bus)\n14. DAMRI BUS ASIA          : Sistem Reservasi & Operasional Rute Antarnegara\n15. MITRA DAMRI             : Dashboard Mitra Penjualan & Agen Perjalanan\n\n[C] SISTEM KEUANGAN, PENGADAAN & INVESTASI\n16. PUMK                    : Program Pendanaan Usaha Mikro & Kecil (TJSL BUMN)\n17. E-PROPOSAL              : Pengajuan Anggaran Inisiatif & Bisnis Divisi\n18. E-PROCUREMENT           : Pengadaan Barang & Jasa serta Evaluasi Vendor\n19. E-CASH RECEIPT          : Penerimaan Kas Operasional & Penyetoran Bank\n20. WEB REKON               : Rekonsiliasi Transaksi Tiket vs Mutasi Rekening Bank\n21. CENTRAL KEU             : Sentralisasi Pelaporan & Pembukuan Keuangan\n22. DOKUMEN KONTRAK         : Manajemen Kontrak Kerjasama Legal & Finansial\n\n[D] SISTEM SDM, TATA KELOLA NASKAH, RISK & CRM\n23. HCMS                    : Human Capital Management System (Data Pegawai)\n24. E-OFFICE (NASKAH DINAS) : Tata Naskah Dinas Elektronik & Alur Disposisi\n25. CUTI & ABSENSI          : Presensi Geotagging & Pengajuan Cuti Karyawan\n26. PAYROLL                 : Perhitungan Gaji Pokok, Tunjangan, & Insentif\n27. EVALKIN                 : Sistem Evaluasi Kinerja & Penilaian KPI Tahunan\n28. DAMRI LEARNING          : Learning Management System (LMS) Pelatihan Pegawai\n29. SERVICE DESK (CRM)      : Helpdesk Pelayanan Keluhan Penumpang & Layanan\n30. AUDIT MANAGEMENT (AMS)  : Pelacakan Temuan Audit Internal & Eksternal\n31. RISK REGISTER           : Manajemen Profil & Mitigasi Risiko Korporat\n32. QUALITY CHECK           : Standardisasi Inspeksi Kelaikan Armada (Ramp Check)\n33-40. VMS, SMAPS, API ENHANCEMENT, MIDDLEWARE, DAN MODUL INTEGRASI LAINNYA.\n\nSTANDAR ARTEFAK YANG DIHASILKAN:\n- Software Requirements Specification (SRS) & Business Requirement Document (BRD)\n- Technical Architecture Document (TAD) & Entity Relationship Diagram (ERD 3NF)\n- Diagram Alur Proses Bisnis (BPMN 2.0 / Activity Diagram)\n- Matriks System Integration Testing (SIT) & User Acceptance Testing (UAT)\n- Buku Panduan Pengguna (Manual Guide) & Notulensi Rapat Teknis (MoM)"
  },
  {
    "id": "sit-uat-matrix",
    "title": "SIT_and_UAT_Signoff_Matrix.doc",
    "ref": "SIT-VMS / SIT-EOF / UAT-SIMA / GL-QAQC",
    "version": "1.0",
    "status": "100% PASSED & SIGNED OFF",
    "author": "Andhika Putra Pratama, S.Kom.",
    "category": "Quality Assurance & Testing Matrix",
    "categoryBadge": "QA Rigor",
    "date": "Juli 2026",
    "description": "Dual-phase SIT & UAT testing matrix and sign-off records with boundary value testing, concurrency stress tests, and defect severity SLAs.",
    "descriptionId": "Matriks pengujian SIT & UAT dua fase beserta sign-off pengujian batas, stress test konkurensi, dan SLA keparahan defect.",
    "keywords": [
      "sit",
      "uat",
      "test matrix",
      "qa",
      "boundary testing",
      "concurrency",
      "lockforupdate",
      "defect sla"
    ],
    "downloadFilename": "SIT_and_UAT_Signoff_Matrix.doc",
    "snippet": "================================================================================\nSYSTEM INTEGRATION TESTING (SIT) & USER ACCEPTANCE TESTING (UAT) MATRIX\nQA Specialist & Test Architect: Andhika Putra Pratama, S.Kom.\nStandar Ref: SIT-VMS / SIT-EOF / UAT-SIMA / GL-QAQC\nTujuan Kualitas: Zero Critical Defect Escaped to Production Environment\n================================================================================\n\n1. METODOLOGI PENGUJIAN DUA FASE (DUAL-PHASE TESTING)\n   a. System Integration Testing (SIT) — Verifikasi Internal Engineering:\n      - Validasi kontrak REST API dan error handling antarmodul.\n      - Integritas relasional foreign key & constraint basis data.\n      - Concurrency & race condition handling di bawah traffic simulasi.\n   b. User Acceptance Testing (UAT) — Validasi Kebutuhan Bisnis Pengguna:\n      - Skenario pengujian berbasis alur kerja nyata (End-to-End User Journey).\n      - Dilaksanakan bersama Product Owner, perwakilan cabang, & unit bisnis.\n\n2. SAMPEL LEMBAR PENGUJIAN UAT (Aplikasi PUMK & SIMA Operasi)\n   -----------------------------------------------------------------------------\n   [TC-ID] UAT-PUMK-01 | Fitur: Pendaftaran Mitra Binaan Baru\n   - Aktor        : Petugas Cabang (Role: CABANG_OPERATOR)\n   - Prasyarat    : Pengguna login via SSO DAMRI dengan hak akses cabang aktif.\n   - Langkah Uji  : 1. Akses menu Pendaftaran Mitra Binaan.\n                    2. Input NIK 16 digit valid: '3201012345670001'.\n                    3. Upload dokumen proposal kelayakan (PDF < 5MB).\n                    4. Klik tombol 'Simpan Pengajuan'.\n   - Hasil Harapan: Data tersimpan, kode mitra PUMK-{YYYY}-{NNN} terbit otomatis,\n                    NIK terverifikasi unik, status 'DRAFT_PROPOSAL'.\n   - Hasil Aktual : LULUS (PASS) — Kode unik PUMK-2026-042 terbit tanpa anomali.\n   -----------------------------------------------------------------------------\n   [TC-ID] UAT-PUMK-02 | Fitur: Negative & Boundary Test Validasi NIK\n   - Langkah Uji  : Input NIK 15 digit dan input NIK yang telah terdaftar sebelumnya.\n   - Hasil Harapan: Form menampilkan error interaktif: 'NIK harus tepat 16 digit'\n                    atau 'NIK telah terdaftar dalam sistem'. Tombol simpan terkunci.\n   - Hasil Aktual : LULUS (PASS) — Validasi client & server berjalan sinkron.\n   -----------------------------------------------------------------------------\n   [TC-ID] UAT-PUMK-03 | Fitur: Concurrency Stress Test Multi-Cabang\n   - Langkah Uji  : 20 submit pengajuan serentak dalam jendela waktu 2 detik.\n   - Hasil Harapan: 20 nomor urut terbit berurutan, 0 duplicate key error.\n   - Hasil Aktual : LULUS (PASS) — Pessimistic locking (lockForUpdate) berhasil.\n   -----------------------------------------------------------------------------\n\n3. KLASIFIKASI DEFECT & SEVERITY SLA\n   - P1 (Blocker)  : Crash sistem, korupsi data, kegagalan perhitungan uang. (SLA: < 2 Jam)\n   - P2 (Critical) : Fungsi inti gagal beroperasi, tidak ada workaround. (SLA: < 8 Jam)\n   - P3 (Major)    : Fungsi parsial terganggu, ada alternatif operasional. (SLA: < 24 Jam)\n   - P4 (Minor)    : Kesalahan tipografi, glitch tata letak visual. (SLA: Next Release)\n\n4. PENCAPAIAN MUTU PENGUJIAN\n   - Tingkat kelulusan UAT siklus pertama: > 96.8%.\n   - Defect Leakage ke Lingkungan Produksi: 0 Critical Bugs.",
    "relatedProjectId": "damri-pumk-system"
  },
  {
    "id": "golive-checklist",
    "title": "GoLive_QAQC_Release_Checklist.doc",
    "ref": "GL-QAQC-06072026-05 / GL-HCMS-10072026-08",
    "version": "2.0",
    "status": "PRODUCTION GATING PROTOCOL (PASSED)",
    "author": "Andhika Putra Pratama, S.Kom.",
    "category": "Release Governance & Quality Gate",
    "categoryBadge": "Quality Gate",
    "date": "06 Juli 2026",
    "description": "Pre-production release quality gate and deployment checklist covering code quality, staging migration, DB sanity, and 5-minute rollback plan.",
    "descriptionId": "Daftar periksa kesiapan rilis (Quality Gate) pra-produksi mencakup kualitas kode, migrasi staging, sanitasi basis data, dan SOP rollback 5 menit.",
    "keywords": [
      "go live",
      "golive",
      "qaqc",
      "release checklist",
      "quality gate",
      "database sanity",
      "rollback sop"
    ],
    "downloadFilename": "GoLive_QAQC_Release_Checklist.doc",
    "snippet": "================================================================================\nGO-LIVE QA/QC QUALITY GATE & DEPLOYMENT CHECKLIST\nQuality Assurance & Release Governance — Andhika Putra Pratama, S.Kom.\nReferensi Standar: GL-QAQC-06072026-05 / GL-HCMS-10072026-08\nStatus: PRODUCTION GATING PROTOCOL\n================================================================================\n\n1. PRINSIP QUALITY GATE SEBELUM PRODUKSI\n   Sebuah sistem atau modul baru DILARANG KERAS di-deploy ke server produksi\n   sebelum seluruh poin verifikasi berikut dinyatakan PASSED dan ditandatangani.\n\n2. DAFTAR PERIKSA KESIAPAN RILIS (PRE-RELEASE CHECKLIST):\n\n   [A] KUALITAS KODE & INTEGRASI (DEVELOPER & QA)\n   [x] 1. Seluruh branch fitur telah di-merge ke branch release via approved PR.\n   [x] 2. Unit testing & static analysis pass (0 error, 0 security vulnerability).\n   [x] 3. Skenario System Integration Testing (SIT) 100% lulus tanpa defect blocker.\n   [x] 4. Berita Acara UAT telah ditandatangani resmi oleh Product Owner / User.\n\n   [B] BASIS DATA & SKEMA (DATABASE SANITY)\n   [x] 5. Migration script telah diuji di staging environment dengan data riil tersanitasi.\n   [x] 6. Backup snapshot basis data produksi diambil sebelum eksekusi migrasi.\n   [x] 7. Script rollback migrasi siap pakai jika terjadi anomali runtime.\n   [x] 8. Foreign key constraints dan indexing tabel telah tervalidasi.\n\n   [C] KONFIGURASI KEAMANAN & ENVIRONMENT\n   [x] 9. Parameter debug dinonaktifkan (APP_DEBUG=false / NODE_ENV=production).\n   [x] 10. Kredensial, API key, dan webhook secret tersimpan di Environment Vault aman.\n   [x] 11. Endpoint otentikasi SSO terhubung ke production identity realm.\n   [x] 12. Sertifikat SSL/TLS valid dan HTTPS enforced pada seluruh route.\n\n   [D] RENCANA MITIGASI & ROLLBACK\n   [x] 13. Dokumen SOP Rollback 5 Menit tersedia di meja Tech Lead.\n   [x] 14. Tim siaga (Standby Support) ditetapkan untuk masa pemantauan pasca-rilis (72 jam).\n\n3. SIGN-OFF KELAYAKAN RILIS\n   Status Verifikasi : SIAP PRODUKSI (READY FOR PRODUCTION)\n   Quality Gatekeeper: Andhika Putra Pratama, S.Kom. (QA & System Analyst)"
  },
  {
    "id": "tad-pushrequest",
    "title": "TAD_PushRequest_Architecture.doc",
    "ref": "TAD-PRT-DEV-2026",
    "version": "1.0",
    "status": "IMPLEMENTED & IN PRODUCTION",
    "author": "Andhika Putra Pratama, S.Kom.",
    "category": "Technical Architecture Document (TAD)",
    "categoryBadge": "Developer",
    "date": "2026",
    "description": "Technical Architecture Document for Push Request Tracker: internal DevOps deployment governance tool with HMAC-SHA256 signature verification.",
    "descriptionId": "Dokumen Arsitektur Teknis Push Request Tracker: alat tata kelola deployment DevOps internal dengan verifikasi webhook GitHub HMAC-SHA256.",
    "keywords": [
      "tad",
      "technical architecture",
      "push request tracker",
      "github webhook",
      "hmac-sha256",
      "kanban",
      "deploy"
    ],
    "downloadFilename": "TAD_PushRequest_Architecture.doc",
    "snippet": "================================================================================\nTECHNICAL ARCHITECTURE DOCUMENT (TAD) — PUSH REQUEST TRACKER\nInternal DevOps & Deployment Governance Tool — Perum DAMRI\nLead Developer & System Analyst: Andhika Putra Pratama, S.Kom.\nStatus: IMPLEMENTED & IN PRODUCTION\n================================================================================\n\n1. ARSITEKTUR TINGKAT TINGGI (HIGH LEVEL ARCHITECTURE)\n   Push Request Tracker dibangun untuk menyatukan audit commit repository GitHub,\n   pelacakan status deployment ke server live produksi, dan kanban workflow.\n   \n   Alur Data:\n   [GitHub Enterprise Repo] \n         | (Webhook POST on Push / Release Event)\n         v\n   [Webhook Controller] (HMAC-SHA256 Signature Verification)\n         |\n         v\n   [Ingestion Queue & Background Worker]\n         |\n         +--> [GitHub REST API] (Fetch Commit Diff, File Additions / Deletions)\n         |\n         +--> [PostgreSQL Database] (Audit Trail Storage)\n         |\n         v\n   [Real-Time Kanban UI] (Datatables, Diff Modal, Deploy Approval Gate)\n\n2. DESAIN BASIS DATA UTAMA (DATA ARCHITECTURE)\n   - push_notes       : Header event push, repository, branch, author, commit hash.\n   - change_logs      : Rincian commit message, author, dan ringkasan fungsional.\n   - change_log_files : Rincian nama file, status (added/modified/deleted), lines (+/-).\n   - prod_pulls       : Rekam status penarikan kode ke server produksi live.\n   - users & roles    : RBAC (Admin TI, Tech Lead, Developer, QA Auditor).\n\n3. FITUR KEAMANAN & KEANDALAN SISTEM\n   - HMAC-SHA256 Verification: Memvalidasi header X-Hub-Signature-256 pada setiap event.\n   - Idempotency Handling: Menghindari duplikasi log audit saat terjadi webhook retry.\n   - Rate Limiting: Melindungi server dari lonjakan traffic push mendadak.\n\n4. HASIL KUANTITATIF & NILAI BISNIS\n   - 100% Visibilitas Deployment: Menghilangkan insiden file tertinggal saat rilis.\n   - Efisiensi Approval: Tech Lead dapat menginspeksi file diff langsung dari browser XP\n     sebelum menyetujui penarikan kode ke server live.",
    "relatedProjectId": "damri-push-request-tracker"
  },
  {
    "id": "srs-approval-engine",
    "title": "SRS_Approval_Workflow_Engine.doc",
    "ref": "SRS-2026-NT-WF-001",
    "version": "2.0-Enterprise",
    "status": "APPROVED FOR IMPLEMENTATION",
    "author": "Andhika Putra Pratama, S.Kom.",
    "category": "System Requirements Specification (SRS)",
    "categoryBadge": "Core ERP / SA",
    "date": "2026",
    "description": "SRS for Enterprise Dynamic Multi-Tier Approval & Delegation Engine with 7-tier financial threshold matrix, Pjs delegation protocol, and 24h SLA sentinel.",
    "descriptionId": "SRS Engine Approval & Delegasi Bertingkat Dinamis dengan matriks batas finansial 7-tier, protokol delegasi Pjs, dan sentinel SLA 24 jam.",
    "keywords": [
      "srs",
      "approval engine",
      "workflow",
      "delegation",
      "pjs",
      "sla sentinel",
      "merkle hash",
      "perpres 16/2018"
    ],
    "downloadFilename": "SRS_Approval_Workflow_Engine.doc",
    "snippet": "================================================================================\nSOFTWARE REQUIREMENTS SPECIFICATION (SRS) — ENTERPRISE APPROVAL & DELEGATION ENGINE\nPT Nusantara Transindo (Persero) — Holding Logistik & Multimoda Nasional\nDoc Ref: SRS-2026-NT-WF-001 | Version: 2.0-Enterprise | Status: APPROVED FOR IMPLEMENTATION\nLead System Analyst & Solution Architect: Andhika Putra Pratama, S.Kom.\nCoverage: 50+ Cabang Regional, 3.000+ Pegawai, 1.200 Armada, Modul Procurement/Capex/CR/HR\n================================================================================\n\n1. EXECUTIVE BUSINESS PROBLEM STATEMENT & STATUTORY BASELINE\n   Pada operasional korporat berskala nasional dengan 50+ cabang, alur persetujuan pengadaan\n   barang/jasa (PR/PO), belanja modal (Capex), tiket perubahan sistem (Change Request),\n   dan mutasi/cuti SDM sebelumnya berjalan manual berbasis lembar fisik dan email informal.\n   Hal ini memunculkan 4 risiko fatal:\n   a. Bottleneck Persetujuan (Absentee Delay): Ketika pejabat berwenang dinas luar/cuti,\n      pengajuan tertahan rata-rata 14–21 hari tanpa ada mekanisme penunjukan resmi.\n   b. Hardcoded Approval Trap: Alur persetujuan ditanam di kode aplikasi (hardcoded).\n      Setiap perubahan struktur organisasi mewajibkan developer mengubah kode dan redeploy.\n   c. Ketiadaan SLA & Escalation: Tidak ada timer pengingat (warning) maupun eskalasi\n      otomatis ke atasan jika berkas diabaikan dalam batas 1x24 jam.\n   d. Celah Integritas Audit: Riwayat persetujuan tidak memiliki rantai kriptografis yang\n      membuktikan non-repudiation di hadapan auditor BPK / pengawas internal.\n\n2. FINANCIAL THRESHOLD MATRIX (GCG & PERPRES 16/2018 COMPLIANCE)\n   Sistem mengevaluasi rantai persetujuan secara sekuensial dinamis berdasarkan nominal belanja:\n   --------------------------------------------------------------------------------\n   Tier 1 | Requester / Staf     | < Rp 5.000.000       | Inisiasi & Form Submission\n   Tier 2 | Supervisor / Kasie   | < Rp 25.000.000      | Verifikasi Operasional Cabang\n   Tier 3 | Branch Manager       | < Rp 100.000.000     | Pengadaan Rutin Depo Regional\n   Tier 4 | General Manager/SVP  | < Rp 500.000.000     | Maintenance Berat / Tender Terbatas\n   Tier 5 | VP Divisi Terkait    | < Rp 2.000.000.000   | Kontrak Vendor Tahunan\n   Tier 6 | Direktur Terkait     | < Rp 10.000.000.000  | Capex Pengadaan Armada Baru\n   Tier 7 | Direktur Utama & BoD | > Rp 10.000.000.000  | Investasi Strategis Multi-Tahun\n   --------------------------------------------------------------------------------\n\n3. PEJABAT SEMENTARA (Pjs) DELEGATION PROTOCOL\n   BR-DEL-01 [Scope Restriction]: Pejabat hanya dapat mendelegasikan wewenang ke posisi\n              setara (peer) atau satu tingkat di bawahnya (direct subordinate). Dilarang\n              mendelegasikan wewenang melompati dua tingkat struktural.\n   BR-DEL-02 [Time-Bound Window]: Masa delegasi wajib memiliki tanggal mulai dan selesai\n              (maksimal 30 hari kalender). Kadaluwarsa secara otomatis (auto-revoke).\n   BR-DEL-03 [Threshold Ceiling]: Penerima kuasa (Pjs) tidak boleh melampaui plafon nominal\n              asli pemberi kuasa.\n   BR-DEL-04 [Dual-Identity Audit]: Setiap transaksi mencatat actor_user_id (Pjs yang bertindak)\n              dan delegator_user_id (pejabat asal pemilik hak) demi transparansi hukum penuh.\n\n4. 24-HOUR SLA SENTINEL & AUTO-ESCALATION\n   - SLA Clock: Tepat 24 jam waktu kerja per tier persetujuan.\n   - 18 Jam (75% Elapsed): Sistem mengirimkan peringatan dini via Push Notification & Email.\n   - 24 Jam (100% Breached): SLA Sentinel memicu Boundary Timer Event, otomatis mengeskalasi\n     tiket ke atasan langsung pejabat yang lambat, mencatat penalti SLA pada log KPI pejabat.\n\n5. CONCURRENCY CONTROL & CRYPTOGRAPHIC AUDIT LEDGER\n   - Optimistic Concurrency Control (OCC): Kolom 'version' pada tabel approval_steps.\n     Jika delegator dan Pjs mengklik approve bersamaan, request pertama sukses dan menaikkan\n     version; request kedua gagal seketika dengan HTTP 409 Conflict.\n   - SHA-256 Merkle Hash Chaining: Setiap event persetujuan merekam hash berantai dari blok\n     sebelumnya. Manipulasi data langsung di database akan membatalkan integritas seluruh rantai.",
    "relatedProjectId": "approval-workflow-engine"
  },
  {
    "id": "sit-approval-engine",
    "title": "SIT_UAT_Approval_Engine_Matrix.doc",
    "ref": "QA-MATRIX-2026-NT-003",
    "version": "1.0",
    "status": "100% EXECUTED & APPROVED",
    "author": "Andhika Putra Pratama, S.Kom.",
    "category": "Quality Assurance & Test Matrix",
    "categoryBadge": "QA Rigor",
    "date": "2026",
    "description": "SIT/UAT test execution matrix for Approval Workflow & Delegation Engine with 42 enterprise test scenarios across happy paths, concurrency, and security.",
    "descriptionId": "Matriks eksekusi uji SIT/UAT untuk Engine Alur Kerja Approval & Delegasi dengan 42 skenario enterprise mencakup happy path, konkurensi, dan keamanan.",
    "keywords": [
      "sit",
      "uat",
      "approval engine",
      "qa matrix",
      "concurrency",
      "merkle hash",
      "rollback",
      "test cases"
    ],
    "downloadFilename": "SIT_UAT_Approval_Engine_Matrix.doc",
    "snippet": "================================================================================\nSYSTEM INTEGRATION & USER ACCEPTANCE TESTING (SIT/UAT) SIGN-OFF MATRIX\nProject: Dynamic Multi-Tier Approval Workflow & Delegation Engine\nDoc Ref: QA-MATRIX-2026-NT-003 | Status: 100% EXECUTED & APPROVED\nLead QA Automation & Test Architect: Andhika Putra Pratama, S.Kom.\nCoverage: 42 Enterprise Test Scenarios (Happy Path, Concurrency, Delegation, SLA, Security)\n================================================================================\n\n1. EXECUTIVE TEST EXECUTION SUMMARY\n   Total Scenarios Executed : 42 Scenarios\n   Passed                   : 42 (100%)\n   Failed / Blocked         : 0 (Zero Tolerance)\n   P1 (Blocker Defects)     : 0 Open\n   P2 (Critical Defects)    : 0 Open\n   P95 API Response Time    : 42ms (Target: < 200ms)\n   Concurrency Contention   : 100 Simultaneous Requests -> 1 Winner, 99 Handled Gracefully\n\n2. CATEGORY BREAKDOWN MATRIX\n   Category A: Happy Path & Threshold Boundaries (10 Scenarios) -> 10 PASSED\n     - TC-HP-01: Inisiasi PR Rp 4.5M (Single Tier Approval - Supervisor) -> PASS\n     - TC-HP-02: Pengadaan Capex Rp 850M (Multi-Tier: Spv -> Mgr -> GM -> VP) -> PASS\n     - TC-HP-03: Akuisisi Armada Rp 12M (Full 7-Tier to President Director) -> PASS\n     - TC-HP-04: Return for Revision flow with differential resubmit -> PASS\n   Category B: Delegation & Pejabat Sementara (Pjs) (8 Scenarios) -> 8 PASSED\n     - TC-DEL-01: Auto-routing ke Pjs saat approver berstatus 'ON_LEAVE' -> PASS\n     - TC-DEL-02: Auto-expire delegasi tepat pada pukul 23:59:59 hari terakhir -> PASS\n     - TC-DEL-03: Pencegahan siklus sirkular (A delegasi ke B, B delegasi ke A) -> PASS (422 Error)\n     - TC-DEL-04: Dual-identity audit recording (Pjs actor vs Delegator principal) -> PASS\n   Category C: SLA Sentinel & Auto-Escalation (6 Scenarios) -> 6 PASSED\n     - TC-SLA-01: Early warning notification pada 75% batas waktu (jam ke-18) -> PASS\n     - TC-SLA-02: Auto-escalation ke atasan langsung pada jam ke-24 tepat -> PASS\n     - TC-SLA-03: Pengecualian hari libur nasional & akhir pekan dari jam SLA -> PASS\n   Category D: Concurrency & Race-Condition Defense (8 Scenarios) -> 8 PASSED\n     - TC-CON-01: Delegator & Pjs klik 'Approve' bersamaan (<5ms) -> 1 Succeeds, 1 409 Conflict\n     - TC-CON-02: Simultan Approve vs Reject -> State terkunci pada aksi pemenang pertama\n     - TC-CON-03: Double-click submit form -> Idempotency-Key mencegah duplikasi baris\n   Category E: Security & Access Control (5 Scenarios) -> 5 PASSED\n     - TC-SEC-01: Unauthorized approval injection via parameter tampering -> 403 Forbidden\n     - TC-SEC-02: Cross-branch requisition tampering -> 403 Forbidden (RBAC Branch Guard)\n     - TC-SEC-03: Database audit ledger tampering detection -> Hash mismatch detected\n   Category F: Boundary Values & Error Recovery (5 Scenarios) -> 5 PASSED\n     - TC-BND-01: Persis pada batas nominal Rp 25.000.000 vs Rp 25.000.001 -> Naik Tier tepat\n     - TC-BND-02: Rollback SOP 5-Menit simulasi kegagalan migrasi -> Sukses tanpa data loss\n\n3. QUALITY GATE & STAKEHOLDER SIGN-OFF\n   Lead Solution Architect  : Andhika Putra Pratama, S.Kom. [SIGNED]\n   Head of Internal Audit   : Dra. Sri Wahyuni, M.Ak., CFrA  [SIGNED]\n   VP Enterprise Systems    : Ir. Bambang Hermanto, M.T.    [SIGNED]",
    "relatedProjectId": "approval-workflow-engine"
  },
  {
    "id": "srs-payment-recon",
    "title": "SRS_Payment_Reconciliation_Engine.doc",
    "ref": "SRS-2026-FIN-RECON-002",
    "version": "2.1-Enterprise",
    "status": "APPROVED FOR PRODUCTION",
    "author": "Andhika Putra Pratama, S.Kom.",
    "category": "System Requirements Specification (SRS)",
    "categoryBadge": "FinTech / SNAP",
    "date": "2026",
    "description": "SRS for 3-Way Payment Reconciliation & Settlement Engine compliant with Bank Indonesia SNAP standards featuring automated self-healing and cutoff rollforward.",
    "descriptionId": "SRS Engine Rekonsiliasi & Settlement Pembayaran 3-Way sesuai standar SNAP Bank Indonesia dengan fitur auto-healing dan rollforward cutoff.",
    "keywords": [
      "srs",
      "payment reconciliation",
      "bi snap",
      "padg 23/15",
      "3-way matching",
      "auto-healing",
      "cutoff"
    ],
    "downloadFilename": "SRS_Payment_Reconciliation_Engine.doc",
    "snippet": "================================================================================\nSOFTWARE REQUIREMENTS SPECIFICATION (SRS) — 3-WAY PAYMENT RECONCILIATION ENGINE\nPT Nusantara Transindo (Persero) & Integrasi SNAP Bank Indonesia\nDoc Ref: SRS-2026-FIN-RECON-002 | Version: 2.1-Enterprise | Status: APPROVED\nLead System Analyst & FinTech Solutions Architect: Andhika Putra Pratama, S.Kom.\nGround Truth: Bank Indonesia SNAP (PADG 23/15/PADG/2021) & PBI 23/6/PBI/2021\n================================================================================\n\n1. EXECUTIVE BUSINESS PROBLEM & STATEMENT OF NEED\n   Platform transaksi transportasi dan merchant korporat menerima volume pembayaran\n   tinggi melalui beragam kanal: QRIS SNAP, Virtual Account (Mandiri, BCA, BRI, BNI),\n   dan Kartu Uang Elektronik prabayar. Proses rekonsiliasi manual menimbulkan 3 krisis:\n   a. Webhook Timeout Drops: Sekitar 1.4% notifikasi pembayaran asinkron hilang saat jam sibuk.\n      Nasabah telah terdebit di bank, namun tiket di aplikasi penumpang berstatus UNPAID.\n   b. Cutoff Shifts (23:00 WIB vs UTC 24/7): Transaksi pukul 23:15 WIB tercatat pada tanggal\n      berbeda di mutasi bank vs sistem internal, memicu alarm selisih kas palsu.\n   c. Beban Kerja Spreadsheet Manual: Staf Treasury menghabiskan 40+ jam/bulan mencocokkan\n      jutaan baris Excel dengan rumus VLOOKUP yang rentan human error.\n\n2. 3-WAY MATCHING PIPELINE SPECIFICATION\n   - Leg 1 (Internal Core DB)  : Pesanan tiket dan status billing (orders, tickets)\n   - Leg 2 (Payment Gateway)    : Webhook event callback store (HMAC SHA-256)\n   - Leg 3 (Bank Clearing File) : Mutasi rekening koran SWIFT MT940 / CSV Kliring\n\n3. AUTOMATED SELF-HEALING & ANOMALY RESOLUTION\n   - Asynchronous Healing Daemon: Saat mutasi bank ada tetapi webhook hilang, daemon memanggil\n     API BI SNAP GET /v1.0/debit/status. Jika status confirmed, tiket diterbitkan <90 detik.\n   - Timing Bucket Rollforward: Transaksi antara 23:00-23:59 WIB otomatis dialokasikan ke bucket\n     kliring D+1, menghasilkan 0 Rupiah selisih pembukuan harian.\n   - MDR Deduper Engine: Validasi nominal potongan biaya transaksi (QRIS 0.7%, VA Rp 2.500)\n     menghasilkan pencocokan dana bersih hingga presisi 1 Rupiah.\n\n4. REAL BUSINESS IMPACT METRICS\n   - Durasi Rekonsiliasi : 40 Jam/Bulan -> 12 Menit/Batch (-99.5% Penghematan Waktu)\n   - Selisih Saldo Mengambang : 2.8% -> 0.001% (Nir-Varians)\n   - Temuan Audit BPK / KAP : 100% Wajar Tanpa Pengecualian (WTP)",
    "relatedProjectId": "payment-reconciliation-engine"
  },
  {
    "id": "sit-payment-recon",
    "title": "SIT_UAT_Payment_Recon_Matrix.doc",
    "ref": "QA-RECON-2026-004",
    "version": "1.0",
    "status": "100% PASSED & SIGNED OFF",
    "author": "Andhika Putra Pratama, S.Kom.",
    "category": "Quality Assurance & Test Matrix",
    "categoryBadge": "QA FinTech",
    "date": "2026",
    "description": "SIT/UAT test execution matrix for 3-Way Payment Reconciliation Engine with 35 enterprise test scenarios including SNAP API timeout healing and cutoff shifts.",
    "descriptionId": "Matriks uji SIT/UAT untuk Engine Rekonsiliasi Pembayaran 3-Way dengan 35 skenario enterprise termasuk pemulihan timeout webhook API SNAP dan pergeseran cutoff.",
    "keywords": [
      "sit",
      "uat",
      "payment reconciliation",
      "snap",
      "webhook timeout",
      "mdr",
      "qa matrix"
    ],
    "downloadFilename": "SIT_UAT_Payment_Recon_Matrix.doc",
    "snippet": "================================================================================\nSIT/UAT TEST EXECUTION MATRIX — 3-WAY PAYMENT RECONCILIATION ENGINE\nProject: Multi-Bank Automated Payment Reconciliation & Settlement Engine\nDoc Ref: QA-RECON-2026-004 | Status: 100% PASSED & SIGNED OFF\nLead QA Automation: Andhika Putra Pratama, S.Kom.\nCoverage: 35 Enterprise Test Scenarios (SNAP, Cutoff Shift, Fee Deduplication, Rollback)\n================================================================================\n\n1. TEST EXECUTION SUMMARY\n   Total Scenarios Executed : 35 Scenarios\n   Passed                   : 35 (100%)\n   Blocker / Critical Open  : 0 (Zero Tolerance)\n   Reconciliation Accuracy  : 100.00% (Penny-Level Match)\n   Auto-Healing Latency     : P95 = 38 seconds (Target: < 90s)\n\n2. CORE SCENARIOS HIGHLIGHTS\n   [TC-REC-01] Synchronous QRIS SNAP Match -> PASS (Zero Variance)\n   [TC-REC-02] VA Mandiri Gross, Fee & Net Triangulation -> PASS\n   [TC-REC-11] Async Webhook Timeout Drop Healing via SNAP API -> PASS (<90s recovery)\n   [TC-REC-15] X-SIGNATURE Tampering Injection Defense -> PASS (401 Unauthorized)\n   [TC-REC-19] Midnight Cutoff 23:15 WIB Rollforward to D+1 Bucket -> PASS\n   [TC-REC-25] QRIS 0.7% MDR Cent-Rounding Consistency -> PASS\n   [TC-REC-35] 5-Minute Financial Rollback SOP -> PASS (State reverted cleanly)",
    "relatedProjectId": "payment-reconciliation-engine"
  },
  {
    "id": "srs-telematics",
    "title": "SRS_Fleet_Telematics_Fuel_Anomaly.doc",
    "ref": "SRS-2026-IOT-FLEET-004",
    "version": "1.0",
    "status": "APPROVED FOR PRODUCTION",
    "author": "Andhika Putra Pratama, S.Kom.",
    "category": "System Requirements Specification (SRS)",
    "categoryBadge": "IoT / Logistics",
    "date": "2026",
    "description": "SRS for Enterprise Fleet Telematics and Fuel Anomaly Detection Engine monitoring 1,500+ buses via CAN-bus SAE J1939, 1D Kalman filter, and geofencing.",
    "descriptionId": "SRS Engine Telematika Armada Enterprise & Deteksi Anomali BBM memantau 1.500+ bus via CAN-bus SAE J1939, filter Kalman 1D, dan geofencing.",
    "keywords": [
      "srs",
      "fleet telematics",
      "fuel anomaly",
      "can-bus j1939",
      "kalman filter",
      "fuel siphoning",
      "geofence"
    ],
    "downloadFilename": "SRS_Fleet_Telematics_Fuel_Anomaly.doc",
    "snippet": "================================================================================\nSOFTWARE REQUIREMENTS SPECIFICATION (SRS) — ENTERPRISE FLEET TELEMATICS\nPT Trans Nusantara Logistics & BPH Migas Pengawasan Subsidi BBM\nDoc Ref: SRS-2026-IOT-FLEET-004 | Status: APPROVED FOR PRODUCTION\nLead System Analyst & IoT Solutions Architect: Andhika Putra Pratama, S.Kom.\nCoverage: 1,500+ Unit Armada, CAN-bus SAE J1939, Protokol MQTT, Kepmenhub KM 158/2021\n================================================================================\n\n1. EXECUTIVE BUSINESS PROBLEM & STATEMENT OF NEED\n   Biaya BBM Solar menyerap 38%-45% Opex armada bus dan truk kargo nasional.\n   Sistem pemantauan manual terdahulu menimbulkan kebocoran Rp 400+ Juta per bulan:\n   a. Pencurian Solar Ilegal (Fuel Siphoning): Pengemudi menyedot 30-50 liter saat berhenti\n      di rest area liar atau parkir malam tanpa izin. Baru terdeteksi setelah 7 hari.\n   b. False Alarm Sloshing: Guncangan armada di jalanan berlubang memicu fluktuasi cairan\n      tangki hingga +/- 15L, memicu ribuan alarm palsu tanpa filter sinyal.\n   c. Deviasi Rute Resmi: Armada keluar koridor izin Ditjen Hubdat demi muatan tidak berizin.\n\n2. ARCHITECTURAL & ALGORITHMIC SPECIFICATION\n   - High-Throughput Ingestion: Kafka / Redis Streams menampung 5.000 ping/detik dari 1.500 bus.\n   - 1D Continuous Kalman Filter: Mengeliminasi noise guncangan jalanan (<0.12% false alarm).\n   - Fuel Siphoning Rule Engine: Penurunan volume >8 Liter dalam <180 detik saat mesin OFF\n     memicu push alert Critical P1 ke Manajer Depo dalam tempo <45 detik.\n   - Dynamic Geofence Corridor: Buffer 250 meter di sepanjang rute resmi Ditjen Hubdat.\n   - SPBU 3-Way Triangulation: Mencocokkan nota Pertamina vs kenaikan sensor tangki (+/- 15 min).\n\n3. MEASURED BUSINESS IMPACT\n   - Penurunan Pencurian BBM : Turun 88.5% (Penghematan Opex Rp 4.2 Miliar/Tahun)\n   - Waktu Deteksi Anomali  : Dari 7 Hari Audit Manual menjadi < 45 Detik Real-Time Alert\n   - Kepatuhan Trayek Resmi : 99.8% Kepatuhan Koridor Geofence\n   - Payback Period IoT      : 2.2 Bulan (Target Awal: 12 Bulan)",
    "relatedProjectId": "fleet-telematics-fuel-anomaly-engine"
  },
  {
    "id": "sit-telematics",
    "title": "SIT_UAT_Telematics_Matrix.doc",
    "ref": "QA-IOT-2026-005",
    "version": "1.0",
    "status": "100% PASSED & SIGNED OFF",
    "author": "Andhika Putra Pratama, S.Kom.",
    "category": "Quality Assurance & Test Matrix",
    "categoryBadge": "QA IoT",
    "date": "2026",
    "description": "SIT/UAT test execution matrix for Fleet Telematics & Fuel Anomaly Engine with 35 test scenarios covering CAN-bus decoding, Kalman vibration filtering, and theft alerts.",
    "descriptionId": "Matriks uji SIT/UAT untuk Engine Telematika Armada & Anomali BBM dengan 35 skenario pengujian decoding CAN-bus, filter getaran Kalman, dan peringatan pencurian.",
    "keywords": [
      "sit",
      "uat",
      "telematics",
      "can-bus",
      "kalman filter",
      "fuel siphoning",
      "spbu reconciliation",
      "qa matrix"
    ],
    "downloadFilename": "SIT_UAT_Telematics_Matrix.doc",
    "snippet": "================================================================================\nSIT/UAT TEST EXECUTION MATRIX — ENTERPRISE FLEET TELEMATICS & IOT\nProject: Fleet Telematics, Geofencing & Fuel Anomaly Detection Engine\nDoc Ref: QA-IOT-2026-005 | Status: 100% PASSED & SIGNED OFF\nLead QA Specialist: Andhika Putra Pratama, S.Kom.\nCoverage: 35 Enterprise Test Scenarios (CAN-bus, Kalman Filter, Theft Alert, Geofence)\n================================================================================\n\n1. TEST EXECUTION SUMMARY\n   Total Scenarios Executed : 35 Scenarios\n   Passed                   : 35 (100%)\n   Blocker / Critical Open  : 0 (Zero Tolerance)\n   Detection Alert Latency  : P95 = 34 seconds (Target: < 45s)\n   False Alarm Rate         : 0.08% under severe simulated road vibration\n\n2. CORE SCENARIOS HIGHLIGHTS\n   [IOT-TC-01] J1939 CAN-bus Frame Decode (Fuel, Speed, RPM) -> PASS\n   [IOT-TC-02] Kalman Filter Liquid Sloshing Vibration Suppression -> PASS (<0.1% False Alarm)\n   [IOT-TC-03] Fuel Siphoning Rapid Drop (>8L in <180s, Engine OFF) -> PASS (Alert in 32s)\n   [IOT-TC-04] Geofence Corridor Breach (250m buffer, >5 min deviation) -> PASS\n   [IOT-TC-05] SPBU Struk Reconciliation vs Inflow Sensor Delta -> PASS (1.5% delta matched)\n   [IOT-TC-06] Ghost SPBU Receipt Fraud Detection (0.0L delta flag) -> PASS\n   [IOT-TC-07] GPS Tunnel Blackout Flash Memory Offline Buffer Recovery -> PASS\n   [IOT-TC-08] MQTT Telemetry Packet Replay Attack Defense -> PASS (401 Unauthorized)",
    "relatedProjectId": "fleet-telematics-fuel-anomaly-engine"
  },
  {
    "id": "catalog-artefak",
    "title": "00_MASTER_INDEX_PORTFOLIO_EVIDENCE.doc",
    "ref": "CAT-EV-DOSSIER-00",
    "version": "2026.1",
    "status": "READY FOR RECRUITER & DIRECTORS",
    "author": "Andhika Putra Pratama, S.Kom.",
    "category": "Portfolio Evidence Master Index",
    "categoryBadge": "Master Dossier (.docx / .xlsx)",
    "date": "2026",
    "description": "Master catalog of enterprise business and technical artifacts (.docx SRS, .xlsx financial models, and SIT/UAT matrices) in confidential interview dossier.",
    "descriptionId": "Katalog master artefak bisnis & teknis enterprise (dokumen SRS .docx, model finansial .xlsx, dan matriks SIT/UAT) pada berkas dossier wawancara rahasia.",
    "keywords": [
      "master index",
      "portfolio evidence",
      "daftar porto",
      "docx",
      "xlsx",
      "financial models",
      "srs",
      "sit matrix"
    ],
    "downloadFilename": "00_MASTER_INDEX_PORTFOLIO_EVIDENCE.doc",
    "snippet": "================================================================================\nMASTER CATALOG ARTEFAK PORTOFOLIO BISNIS & TEKNIS (DAFTAR PORTO)\nCandidate: Andhika Putra Pratama, S.Kom. (Lead System Analyst & Solution Architect)\nStatus: INTERVIEW AUDIT DOSSIER — READY FOR RECRUITER & DIRECTORS\nLocation: E:/KODING/Porto/Daftar Porto/ (Confidential Enterprise Evidence)\n================================================================================\n\n1. STRUKTUR BERKAS STANDAR BISNIS (.DOCX & .XLSX):\n   [01_Multi_Tier_Approval_Engine]\n   • 01_SRS_Approval_Workflow_Engine.docx (55 KB) - 24 FR, 10 NFR, 7-Tier Thresholds\n   • 02_Financial_Threshold_Matrix_and_SLA_Model.xlsx (11 KB) - Model 50 Transaksi & SLA\n   • 03_SIT_UAT_Test_Execution_Matrix.xlsx (12 KB) - 42 Skenario SIT/UAT Formal\n\n   [02_Payment_Reconciliation_Settlement_Engine]\n   • 01_SRS_Payment_Reconciliation_Engine.docx (41 KB) - 3-Way Matching SNAP Bank Indonesia\n   • 02_Three_Way_Reconciliation_and_Discrepancy_Model.xlsx (14 KB) - 100 Transaksi Multikanal\n   • 03_SIT_UAT_Payment_Recon_Matrix.xlsx (10 KB) - 35 Skenario UAT Rekonsiliasi & Cutoff\n   • 04_Executive_Summary_and_Data_Sources.docx (38 KB) - Rujukan Regulasi PADG BI & SPKN\n\n   [03_Seat_Lock_and_Concurrency_Engine]\n   • 01_SRS_Seat_Lock_Concurrency_Engine.docx (38 KB) - Distributed Mutex (Redis SETNX)\n   • 02_Concurrency_Stress_Test_and_Capacity_Model.xlsx (6 KB) - Model Beban k6 10.000 VU\n   • 03_SIT_UAT_Seat_Lock_Matrix.xlsx (6 KB) - 30 Skenario UAT Konkurensi & Failover\n\n2. GROUND TRUTH SOURCES & REGULATORY CITATIONS:\n   - Bank Indonesia SNAP (PADG No. 23/15/PADG/2021)\n   - Peraturan Presiden No. 16/2018 jo No. 12/2021 & PER-08/MBU/12/2019\n   - Standar Pemeriksaan Keuangan Negara (SPKN) BPK RI & PSAK 71"
  },
  {
    "id": "srs-seatlock",
    "title": "SRS_SeatLock_Engine_v1.0.doc",
    "ref": "SRS-RND-SL-2026-001",
    "version": "1.0-R&D",
    "status": "DRAFT — R&D LAB",
    "author": "Andhika Putra Pratama, S.Kom.",
    "category": "System Requirements Specification (SRS)",
    "categoryBadge": "R&D Lab",
    "date": "2026",
    "description": "SRS for High-Concurrency Seat Lock Engine featuring distributed Redis SETNX mutex, dynamic TTL watchdog, and UUIDv4 idempotency registry.",
    "descriptionId": "SRS Engine Penguncian Kursi Konkurensi Tinggi dengan mutex terdistribusi Redis SETNX, watchdog TTL dinamis, dan registri idempotency UUIDv4.",
    "keywords": [
      "srs",
      "seat lock",
      "concurrency",
      "redis setnx",
      "idempotency",
      "distributed lock",
      "race condition"
    ],
    "downloadFilename": "SRS_SeatLock_Engine_v1.0.doc",
    "snippet": "================================================================================\nSOFTWARE REQUIREMENTS SPECIFICATION (SRS) — SEAT LOCK ENGINE\nHigh-Concurrency Reservation, Race Condition & Idempotency Specification\nDoc Ref: SRS-RND-SL-2026-001 | Version: 1.0-R&D | Status: DRAFT — R&D LAB\nAuthor / System Analyst: Andhika Putra Pratama, S.Kom.\nDomain: High-Throughput Transport & Fleet Reservation Systems\n================================================================================\n\n1. EXECUTIVE BUSINESS PROBLEM STATEMENT\n   Pada sistem reservasi tiket armada transportasi berskala nasional saat peak season\n   (seperti mudik Lebaran atau promo flash sale), lonjakan ribuan pemesanan per detik \n   memicu race condition fatal:\n   a. Double-Booking Catastrophe: Dua pengguna berhasil membayar kursi yang persis sama\n      karena jeda latensi database relasional (phantom read / non-atomic read-then-write).\n   b. Zombie Seat Locks: Kursi dikunci oleh pengguna yang meninggalkan halaman checkout,\n      sehingga kursi hangus tanpa ada pembelian riil (lost revenue).\n   c. Network Retry Duplication: Koneksi internet seluler yang tidak stabil membuat aplikasi\n      mengirimkan ulang request pemesanan, menduplikasi transaksi di payment gateway.\n\n2. SYSTEM SCOPE & CORE MODULES (8 Core Modules)\n   [MOD-01] Real-Time Seat Inventory & Topology Matrix\n   [MOD-02] Distributed Lock Manager (Redis SETNX + Dynamic TTL)\n   [MOD-03] Checkout Orchestrator & State Transition Engine\n   [MOD-04] Payment Webhook Ingestion & 3-Way Reconciliation\n   [MOD-05] TTL Watchdog & Zombie Key Auto-Eviction\n   [MOD-06] Idempotency Registry (UUIDv4 Key De-duplication)\n   [MOD-07] Cryptographic Audit Trail & Event Sourcing Ledger\n   [MOD-08] Concurrency Telemetry & Capacity Stress Analytics\n\n3. CRITICAL BUSINESS RULES & CONCURRENCY GOVERNANCE\n   BR-SL-01 [Plafon Kursi]: Maksimal 4 kursi per akun per sesi transaksi.\n   BR-SL-02 [Lock Expiry TTL]: Kunci kursi bersifat sementara dengan TTL tepat 10 menit\n            (600 detik). Watchdog wajib melepas lock jika checkout tidak rampung.\n   BR-SL-03 [Mandatori Idempotency]: Setiap transaksi wajib menyertakan header Idempotency-Key\n            (UUIDv4). Request identik dalam 24 jam wajib mengembalikan response cache 200 OK.\n   BR-SL-04 [Penanganan Webhook Terlambat]: Jika notifikasi bayar masuk setelah TTL habis\n            dan kursi sudah dibeli orang lain, engine otomatis menerbitkan auto-refund voucher.\n   BR-SL-05 [Pessimistic Fallback]: Redis Cluster sebagai primary distributed lock, dengan\n            database pessimistic locking (SELECT FOR UPDATE) sebagai secondary consistency guard.\n   BR-SL-06 [Audit Trail Immutability]: Setiap event pergantian state (LOCKED, RELEASED,\n            BOOKED) wajib ditulis ke event stream yang append-only.\n\n4. DATA DICTIONARY HIGHLIGHTS (seat_locks table)\n   - id             : UUID (Primary Key, Cluster Clustered Index)\n   - seat_id        : VARCHAR(32) (Foreign Key ke seats.id, Indexed)\n   - session_token  : VARCHAR(64) (Kriptografis unik pemegang kunci)\n   - locked_at      : TIMESTAMP WITH TIME ZONE (Presisi milidetik)\n   - ttl_expires_at : TIMESTAMP WITH TIME ZONE (Evaluasi kedaluwarsa)\n   - status         : ENUM('TEMP_LOCKED', 'CHECKOUT', 'BOOKED', 'EXPIRED')\n   - idempotency_key: VARCHAR(64) (Unique constraint, 24h retention)\n\n5. NON-FUNCTIONAL REQUIREMENTS (NFR) & ARCHITECTURAL BENCHMARKS\n   - P99 Lock Acquisition Latency : < 50 milidetik pada beban 10.000 req/detik.\n   - Double-Booking Tolerance     : 0.00% (Strict Zero-Tolerance).\n   - Redis Memory Footprint       : ~256 bytes per active seat lock key.\n   - Failure Mode SLA             : Graceful degradation ke database transaction boundary.",
    "relatedProjectId": "seat-lock-concurrency-engine"
  }
];

export const workDocsMap: Record<string, WorkDoc> = workDocs.reduce((acc, doc) => {
  acc[doc.id] = doc;
  return acc;
}, {} as Record<string, WorkDoc>);

export function getWorkDoc(id: string): WorkDoc | undefined {
  return workDocsMap[id];
}
