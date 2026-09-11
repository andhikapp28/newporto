---
title: "Dynamic Multi-Tier Approval Workflow & Delegation Engine"
description: "Arsitektur Core ERP & SaaS untuk tata kelola persetujuan bertingkat (Procurement, Capex, Change Request, HR): evaluasi conditional routing dinamis, delegasi wewenang Pejabat Sementara (Pjs), SLA auto-escalation 24 jam, optimistic concurrency locking, dan audit ledger kriptografis SHA-256."
client: "PT Nusantara Transindo (Persero) — Holding Logistik & Multimoda"
role: "Lead System Analyst & Solution Architect"
period: "2026"
category: "Core ERP, SaaS & Workflow Automation"
featured: true
tags: ["BPMN 2.0", "ERD 3NF", "OpenAPI 3.1", "Optimistic Locking", "RBAC & Pjs Delegation", "Cryptographic Audit Ledger", "SLA Sentinel", "SIT/UAT Testing"]
metrics:
  - label: "Lead Time Approval Korporat"
    value: "14 Hari → <48 Jam"
  - label: "Double-Approval & Race Condition"
    value: "0% Defect (Zero Tolerance)"
  - label: "Kepatuhan Audit & Governance"
    value: "100% Cryptographic Traceability"
---

## Ringkasan Eksekutif
Dalam operasional korporat skala holding (50+ kantor cabang/depo regional dan 3.000+ personel), birokrasi persetujuan anggaran dan perubahan sistem seringkali menjadi *bottleneck* kritis. Sebelum sistem ini dirancang, pengajuan belanja modal (*Capex*), pengadaan barang/jasa (*Procurement*), tiket perubahan sistem (*Change Request*), serta mutasi SDM berjalan melalui lembar fisik berjenjang dan email tanpa SLA terikat, memakan waktu hingga **14–21 hari kalender**.

Sebagai **Lead System Analyst & Solution Architect**, saya merancang fondasi arsitektur **Dynamic Multi-Tier Approval Workflow & Delegation Engine** dari hulu ke hilir:
1. **Analisis Kebutuhan Bisnis & Regulasi (BRD/SRS):** Menghilangkan *hardcoded approval chain* dengan merancang rule engine dinamis berbasis batas kewenangan finansial (Rp 5 Juta hingga >Rp 10 Miliar) dan matriks jabatan sesuai Good Corporate Governance (GCG) BUMN.
2. **Pemodelan Proses Bisnis Formal (BPMN 2.0):** Memetakan Exclusive Gateway (*threshold branching*), Inclusive Gateway (*multidisciplinary parallel review*), Boundary Timer Events (*18h warning, 24h breach escalation*), dan mekanisme legalitas *Pejabat Sementara (Pjs)*.
3. **Data Architecture & Concurrency Spec (ERD 3NF):** Merancang 11 tabel relasional teroptimasi indeks, kamus data komprehensif, proteksi *race condition* melalui **Optimistic Concurrency Control (OCC)** berkolom `version` dengan fallback HTTP 409 Conflict, serta buku besar audit *append-only* berantai hash SHA-256 (tamper-evident).
4. **Verifikasi Kualitas (SIT/UAT Matrix 42 Skenario):** Menyusun matriks pengujian end-to-end mencakup Happy Path, Delegation Loop Guards, SLA Boundary Watches, Security Access Control, dan SOP Rollback 5-Menit.
5. **Implementasi Proof-of-Concept (PoC):** Membangun backend engine fungsional dengan OpenAPI 3.1, automated test suite (11/11 PASSED), dan Postman collection siap uji.

---

## Analisis Masalah & Kebutuhan Bisnis (The Core Problem)

1. **Hardcoded Routing Trap:** Sistem warisan (*legacy*) menanamkan ID manajer langsung di baris kode aplikasi. Ketika terjadi mutasi, rotasi jabatan, atau restrukturisasi divisi, tim developer harus melakukan revisi kode dan redeploy server live.
2. **Approval Paralysis Akibat Cuti (Absentee Bottleneck):** Ketika seorang Vice President atau General Manager dinas luar kota atau cuti tahunan, pengajuan bernilai miliaran rupiah tertahan tanpa mekanisme pengalihan wewenang resmi (*Pejabat Sementara / Pjs*).
3. **Ketiadaan SLA & Akuntabilitas Waktu:** Dokumen menggantung tanpa batas waktu. Tidak ada peringatan dini (*early-warning trigger*) maupun eskalasi otomatis (*auto-escalation*) ke atasan hierarki jika berkas diabaikan.
4. **Risiko Benturan Persetujuan Bersamaan (Concurrent Dual-Approval):** Pada pengajuan yang didelegasikan atau melibatkan tim komite, dua pejabat berisiko menekan tombol *Approve* atau *Reject* pada milidetik yang sama, merusak integritas *state machine* dan validasi anggaran.
5. **Integritas Audit Trail Lemah:** Catatan persetujuan tradisional mudah diubah langsung di basis data (*UPDATE query*) tanpa jejak tamper, menyulitkan proses investigasi auditor internal maupun BPK.

---

## Matriks Batas Kewenangan Finansial (Approval Threshold Matrix)

Sesuai regulasi korporat dan standar pengadaan BUMN (Perpres 16/2018 & 12/2021), rantai persetujuan diselesaikan secara sekuensial dinamis berdasarkan plafon anggaran:

| Tier Level | Jabatan Struktural / Peran | Plafon Kewenangan (IDR) | Ruang Lingkup Persetujuan | SLA Per Tier |
| :---: | :--- | :--- | :--- | :---: |
| **Tier 1** | Staf / Requester | < Rp 5.000.000 | Inisiasi PR/PO, Reimbursement Operasional | Inisiasi |
| **Tier 2** | Supervisor / Kasie | < Rp 25.000.000 | Operasional Rutin Cabang, Suku Cadang Ringan | 24 Jam |
| **Tier 3** | Branch Manager / Kabag | < Rp 100.000.000 | Pengadaan Wilayah, Sewa Fasilitas, CR Minor | 24 Jam |
| **Tier 4** | General Manager / SVP | < Rp 500.000.000 | Pengadaan Tender Terbatas, Maintenance Armada | 24 Jam |
| **Tier 5** | Vice President Divisi | < Rp 2.000.000.000 | Kontrak Vendor Jangka Panjang, Capex Depot | 24 Jam |
| **Tier 6** | Direktur Terkait | < Rp 10.000.000.000 | Pengadaan Armada Baru, Capex Strategis | 48 Jam |
| **Tier 7** | Direktur Utama & Komite | > Rp 10.000.000.000 | Akuisisi Aset Korporat, Investasi Multi-Tahun | 72 Jam |

---

## Solusi Rekayasa Sistem & Arsitektur

```
+-----------------------------------------------------------------------------------+
|                        PT NUSANTARA TRANSINDO (PERSERO)                           |
|               DYNAMIC MULTI-TIER APPROVAL & DELEGATION ENGINE ARCHITECTURE        |
+-----------------------------------------------------------------------------------+
                                          |
                               [ 1. Requisition Entry ]
                      POST /api/requests (PR / Capex / CR / HR)
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|                           RULE ENGINE DISPATCHER                                  |
|  * Match Category -> * Match Expenditure Amount -> * Resolve Sequential Steps    |
+-----------------------------------------------------------------------------------+
                                          |
                      +-------------------+-------------------+
                      |                                       |
           [ 2. Check Active Leave ]              [ 3. SLA Sentinel Timer ]
             Delegation Registry                   18h Warning -> 24h Auto-Escalate
          (Route to Pjs / Delegate)                Route up to Supervisor / Next Tier
                      |                                       |
                      +-------------------+-------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|                     CONCURRENCY & TRANSACTION ISOLATION                           |
|       * Optimistic Lock: WHERE id = ? AND version = ?                             |
|       * Stale Version Detected -> 409 Conflict (RFC 7807 Problem Detail)          |
|       * Database Row Lock: SELECT FOR UPDATE NOWAIT in Critical Window            |
+-----------------------------------------------------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|                     CRYPTOGRAPHIC AUDIT LEDGER (TAMPER-EVIDENT)                   |
|   SHA-256 Chained Hashes: H(n) = SHA256(H(n-1) + Step_ID + Actor_ID + Action)    |
|   Immutable Append-Only Log: Nonce, Timestamp, IPv4/v6, User-Agent, Legal Actor   |
+-----------------------------------------------------------------------------------+
```

### 1. State Machine & Routing Engine
Alur hidup pengajuan dikunci dalam siklus status deterministik:
$$\text{DRAFT} \longrightarrow \text{SUBMITTED} \longrightarrow \text{PENDING\_APPROVAL} \longrightarrow \begin{cases} \text{APPROVED} \longrightarrow \text{FINAL\_APPROVED} \\ \text{REVISED} \longrightarrow \text{RESUBMITTED} \\ \text{REJECTED} \end{cases}$$

- **Delegasi Wewenang Pejabat Sementara (Pjs):** Sistem mengecek tabel `delegations` secara *real-time*. Jika *assigned approver* memiliki delegasi aktif dalam rentang tanggal berlaku, sistem memunculkan tugas persetujuan di *dashboard* penerima kuasa.
- **Audit Dual-Identitas:** Pada catatan tindakan (`approval_actions`), sistem menyimpan `actor_user_id` (orang yang menekan tombol) sekaligus `delegator_user_id` (pejabat asal pemilik wewenang) untuk menjamin transparansi hukum.

### 2. Concurrency Mitigation (Optimistic Locking & Race-Condition Defense)
Untuk mencegah *double-action* ketika delegator dan penerima kuasa menekan tombol persetujuan pada detik yang sama, sistem menerapkan mekanisme **Optimistic Concurrency Control (OCC)**:

```javascript
// src/services/approval-engine.js - Optimistic Locking Implementation
const step = db.prepare(
  'SELECT id, step_order, status, version FROM approval_steps WHERE id = ?'
).get(stepId);

if (step.status !== 'PENDING') {
  throw new ConflictError('This approval step is no longer pending action.');
}

// Atomic update guarded by version check
const updateResult = db.prepare(`
  UPDATE approval_steps 
  SET status = 'APPROVED', 
      version = version + 1, 
      updated_at = CURRENT_TIMESTAMP
  WHERE id = ? AND version = ?
`).run(stepId, step.version);

if (updateResult.changes === 0) {
  // Concurrent write detected - another approver executed first
  throw new ConflictError(
    'Concurrent approval detected. The request state was updated by another officer. Please refresh.'
  );
}
```

### 3. Cryptographic Audit Trail (Merkle Chaining)
Audit trail tidak sekadar menyimpan teks, melainkan dirangkai dalam rantai kriptografis SHA-256 yang saling terhubung:
$$H_n = \text{SHA256}\Big(H_{n-1} \parallel \text{RequestID} \parallel \text{StepID} \parallel \text{ActorID} \parallel \text{Action} \parallel \text{Timestamp}\Big)$$

Jika seorang teknisi basis data mencoba mengubah *action* atau memanipulasi riwayat persetujuan secara ilegal, verifikasi *hash chain* (`GET /api/requests/{id}/audit-trail`) akan langsung mendeteksi *tampering* dan menandai rekaman tidak valid.

---

## Artefak Spesifikasi & Tata Kelola Sistem (SA Suite)

Seluruh dokumen spesifikasi formal telah disusun secara lengkap dan terstandarisasi industri di repositori proyek:

1. **`01_BRD_SRS.md`:** 24 Kebutuhan Fungsional (`FR-001` s/d `FR-024`), 10 NFRs, Use Case spesifik (`UC-001` s/d `UC-005`), Matriks Ketertelusuran Kebutuhan (*Requirements Traceability Matrix*).
2. **`02_BPMN_Process_Flow.md`:** Diagram alir proses bisnis BPMN 2.0 formal, pemodelan Exclusive Gateway, Timer Event, sub-proses Pjs, dan jalur pengembalian revisi.
3. **`03_ERD_Data_Dictionary.md`:** Normalisasi bentuk ketiga (3NF) untuk 11 tabel inti (`approval_requests`, `approval_chains`, `approval_steps`, `approval_actions`, `delegations`, `users`, `roles`, `role_thresholds`, `branches`, `audit_logs`, `sla_escalations`).
4. **`04_RBAC_Delegation_Matrix.md`:** Matriks hak akses 7 tingkatan organisasi, tata kelola plafon delegasi wewenang, batas kedalaman delegasi (maksimal level 1, anti-rekursif), dan protokol sengketa konkurensi.
5. **`05_CR_Governance.md`:** Tata kelola *Change Request* formal simulasi pembentukan unit baru (*Digital Transformation Office - DTO*) ke dalam alur pengadaan barang dan anggaran tanpa merusak pengajuan yang sedang berjalan (*grandfathering migration*).
6. **`06_SIT_UAT_Matrix.md`:** Matriks pengujian terstruktur 42 skenario (Happy Path, Boundary Value, Chaos/Concurrency, Security).
7. **`07_GoLive_Checklist.md`:** SOP kesiapan pra-produksi, *pre-flight verification*, dan prosedur *rollback* darurat 5-menit.

---

## Dampak Kuantitatif & Nilai Bisnis bagi Direksi & Manajemen

- **Penurunan Siklus Waktu Hingga 85%:** Dari rata-rata 14 hari kalender menjadi **kurang dari 48 jam** untuk pengajuan belanja modal dan pengadaan rutin berkat *automated delegation* dan *SLA sentinel*.
- **Eliminasi 100% Kebocoran Otoritas:** Meniadakan risiko belanja tanpa persetujuan sah atau *unauthorized approval bypass* melalui validasi RBAC berlapis.
- **Transparansi Siap Audit (BPK / BPKP Compliance):** Buku besar audit kriptografis menjamin pembuktian forensik digital tidak terbantahkan (*non-repudiation*) jika terjadi sengketa pengadaan di kemudian hari.
- **Skalabilitas Arsitektur Tanpa *Downtime*:** Fleksibilitas konfigurasi aturan memungkinkan penambahan cabang, direksi baru, atau perubahan batas nominal melalui GUI tanpa intervensi *source code* developer.
