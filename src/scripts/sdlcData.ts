// Auto-generated bilingual dataset for SDLC_Lens.exe (ID and EN)
// Supporting 7 flagship enterprise projects:
// 1. pumk
// 2. push
// 3. enterprise-docs
// 4. approval-engine
// 5. seatlock
// 6. payment-recon
// 7. telematics

export interface SdlcProjectData {
  analyst: string;
  dev: string;
  qa: string;
}

export const sdlcDataId: Record<string, SdlcProjectData> = {
  pumk: {
    analyst: `<div class="space-y-4">
          <div class="p-4 rounded-lg bg-blue-50 border border-blue-200">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-0.5 rounded bg-blue-700 text-white text-[10px] font-bold uppercase">Analyst Lens</span>
              <span class="font-bold text-blue-900 text-sm">PUMK - TJSL/PKBL Fund Management & Mitra Unique ID</span>
            </div>
            <p class="text-slate-800 text-xs leading-relaxed">
              Sistem PUMK Perum DAMRI dirancang untuk mengelola penyaluran dana TJSL/PKBL kepada mitra UMKM di seluruh cabang. Peran Analyst menentukan kebutuhan bisnis end-to-end, memetakan proses dari unit TJSL/PKBL di kantor pusat hingga cabang pelaksana, dan memastikan data Excel historis bermigrasi ke PostgreSQL secara konsisten.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="p-3 rounded bg-white border border-blue-200">
              <div class="font-bold text-blue-900 text-xs mb-2">Stakeholder Mapping</div>
              <ul class="text-[11px] text-slate-700 space-y-1 list-disc pl-4">
                <li><strong>Unit TJSL/PKBL Pusat:</strong> menetapkan kuota anggaran & kebijakan program.</li>
                <li><strong>Business Unit (BU):</strong> melakukan verifikasi legal & financial mitra.</li>
                <li><strong>Cabang Operasional:</strong> mengusulkan mitra baru, memonitor realisasi.</li>
                <li><strong>Audit Internal & OJK:</strong> memerlukan laporan real-time & audit trail.</li>
              </ul>
            </div>
            <div class="p-3 rounded bg-white border border-blue-200">
              <div class="font-bold text-blue-900 text-xs mb-2">Struktur BRD Utama</div>
              <ul class="text-[11px] text-slate-700 space-y-1 list-disc pl-4">
                <li>BRD-PUMK-01: Pembentukan Kode Mitra Unik</li>
                <li>BRD-PUMK-02: Validasi NIK vs Dukcapil</li>
                <li>BRD-PUMK-03: Alur Persetujuan Pengajuan</li>
                <li>BRD-PUMK-04: Monitoring Cicilan & Realisasi</li>
                <li>BRD-PUMK-05: Pelaporan OJK TJSL/PKBL</li>
              </ul>
            </div>
          </div>

          <div class="p-3 rounded bg-blue-50 border border-blue-200">
            <div class="font-bold text-blue-900 text-xs mb-2">Data Flow: Excel &rarr; PostgreSQL</div>
            <div class="grid grid-cols-5 gap-2 text-center text-[10px]">
              <div class="p-2 rounded bg-white border border-blue-200"><strong>1. Excel Legacy</strong><br/><span class="text-slate-500">MB, Kode MB, Review PK</span></div>
              <div class="self-center text-blue-700 font-bold">&rarr;</div>
              <div class="p-2 rounded bg-white border border-blue-200"><strong>2. ETL Cleansing</strong><br/><span class="text-slate-500">Normalisasi, deduplikasi</span></div>
              <div class="self-center text-blue-700 font-bold">&rarr;</div>
              <div class="p-2 rounded bg-white border border-blue-200"><strong>3. PostgreSQL</strong><br/><span class="text-slate-500">ref_mitra, tr_tjsl</span></div>
            </div>
          </div>

          <div class="p-3 rounded bg-slate-50 border border-slate-200">
            <div class="font-bold text-slate-900 text-xs mb-2">Entity Relationship Highlights</div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10px]">
              <div class="p-2 rounded bg-white border border-slate-300"><strong>ref_mitra</strong><br/>id, kode_mitra, nik, nama_umkm, cabang_id</div>
              <div class="p-2 rounded bg-white border border-slate-300"><strong>tr_pengajuan</strong><br/>id, mitra_id, nilai, status_approval</div>
              <div class="p-2 rounded bg-white border border-slate-300"><strong>tr_pembayaran</strong><br/>id, pengajuan_id, periode, nominal</div>
            </div>
          </div>

          <div class="p-3 rounded bg-blue-50 border border-blue-200">
            <div class="font-bold text-blue-900 text-xs mb-2">Compliance Requirements (OJK Reporting)</div>
            <p class="text-slate-800 text-xs leading-relaxed">
              Laporan TJSL/PKBL harus memenuhi format OJK: realisasi dana per triwulan, jumlah mitra aktif, sektor usaha, dan dampak sosial. Sistem menyediakan export Excel/CSV otomatis dengan primary key kode mitra yang konsisten agar auditor dapat melakukan vlookup lintas periode tanpa mismatch ID.
            </p>
          </div>
        </div>`,
    dev: `<div class="space-y-4">
          <div class="p-4 rounded-lg bg-indigo-50 border border-indigo-200">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-0.5 rounded bg-indigo-700 text-white text-[10px] font-bold uppercase">Developer Lens</span>
              <span class="font-bold text-indigo-900 text-sm">PUMK Architecture & Concurrency Control</span>
            </div>
            <p class="text-slate-800 text-xs leading-relaxed">
              Arsitektur dibangun dengan Laravel 12, PostgreSQL, dan Redis caching untuk performa data master. Keamanan mengintegrasikan SSO DAMRI dengan RBAC berbasis peran cabang/pusat. Mekanisme <code>lockForUpdate()</code> mencegah race condition saat puluhan cabang menciptakan mitra secara serentak.
            </p>
          </div>

          <div class="flex flex-wrap gap-2">
            <span class="px-2 py-1 rounded bg-slate-800 text-indigo-300 text-[10px] font-bold">Laravel 12</span>
            <span class="px-2 py-1 rounded bg-slate-800 text-indigo-300 text-[10px] font-bold">PostgreSQL 15</span>
            <span class="px-2 py-1 rounded bg-slate-800 text-indigo-300 text-[10px] font-bold">Redis</span>
            <span class="px-2 py-1 rounded bg-slate-800 text-indigo-300 text-[10px] font-bold">SSO OAuth2</span>
            <span class="px-2 py-1 rounded bg-slate-800 text-indigo-300 text-[10px] font-bold">RBAC</span>
            <span class="px-2 py-1 rounded bg-slate-800 text-indigo-300 text-[10px] font-bold">PHPUnit</span>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div class="p-2.5 rounded bg-white border border-indigo-200"><div class="text-lg font-black text-indigo-700">99.9%</div><div class="text-[10px] text-slate-600">Uptime Target</div></div>
            <div class="p-2.5 rounded bg-white border border-indigo-200"><div class="text-lg font-black text-indigo-700">&lt;500ms</div><div class="text-[10px] text-slate-600">Lock Latency</div></div>
            <div class="p-2.5 rounded bg-white border border-indigo-200"><div class="text-lg font-black text-indigo-700">50+</div><div class="text-[10px] text-slate-600">Cabang Aktif</div></div>
            <div class="p-2.5 rounded bg-white border border-indigo-200"><div class="text-lg font-black text-indigo-700">0</div><div class="text-[10px] text-slate-600">Duplikat Kode</div></div>
          </div>

          <div class="p-3 rounded bg-slate-50 border border-slate-200">
            <div class="font-bold text-indigo-900 text-xs mb-2">Database Schema Highlights</div>
            <ul class="text-[11px] text-slate-700 space-y-1 list-disc pl-4">
              <li><strong>ref_mitra:</strong> primary key serial + kode_mitra unik, indexed by nik & cabang_id.</li>
              <li><strong>tr_pengajuan:</strong> foreign key ke ref_mitra, status_approval dengan state machine.</li>
              <li><strong>tr_pembayaran:</strong> partition by year untuk performa historis.</li>
              <li><strong>ref_users_shadow:</strong> mapping NIK SSO ke user lokal tanpa menyimpan password.</li>
            </ul>
          </div>

          <pre class="font-mono text-[11px] bg-slate-950 text-indigo-300 p-3 rounded overflow-x-auto">// MitraController.php - pessimistic locking untuk kode unik
DB::transaction(function () use ($request) {
    $last = RefMitra::whereYear('created_at', now()->year)
        ->lockForUpdate()
        ->orderBy('urutan', 'desc')
        ->first();

    $urutan = $last ? $last->urutan + 1 : 1;
    $kode   = sprintf('PUMK-%s-%03d', now()->year, $urutan);

    return RefMitra::create(array_merge($request->validated(), [
        'kode_mitra'      => $kode,
        'urutan'          => $urutan,
        'status_approval' => 'DRAFT',
    ]));
}, 5);</pre>

          <div class="p-3 rounded bg-slate-50 border border-slate-200">
            <div class="font-bold text-indigo-900 text-xs mb-2">API Endpoint Design (REST)</div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] font-mono">
              <div class="p-2 rounded bg-white border border-slate-300">POST /api/v1/mitra</div>
              <div class="p-2 rounded bg-white border border-slate-300">GET /api/v1/mitra/{kode}</div>
              <div class="p-2 rounded bg-white border border-slate-300">PATCH /api/v1/pengajuan/{id}/approve</div>
              <div class="p-2 rounded bg-white border border-slate-300">GET /api/v1/reports/tjsl</div>
            </div>
          </div>
        </div>`,
    qa: `<div class="space-y-4">
          <div class="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-0.5 rounded bg-emerald-700 text-white text-[10px] font-bold uppercase">QA Rigor</span>
              <span class="font-bold text-emerald-900 text-sm">PUMK Test Strategy & Quality Gates</span>
            </div>
            <p class="text-slate-800 text-xs leading-relaxed">
              Strategi pengujian PUMK mencakup unit test, integration test SSO, E2E alur pendaftaran mitra, performance test konkurensi, dan regression matrix sebelum setiap release. Target coverage unit test &ge; 80% dan zero critical defect masuk ke production.
            </p>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div class="p-2 rounded bg-white border border-emerald-200"><div class="text-lg font-black text-emerald-700">&ge;80%</div><div class="text-[10px] text-slate-600">Unit Coverage</div></div>
            <div class="p-2 rounded bg-white border border-emerald-200"><div class="text-lg font-black text-emerald-700">100</div><div class="text-[10px] text-slate-600">Concurrent Users</div></div>
            <div class="p-2 rounded bg-white border border-emerald-200"><div class="text-lg font-black text-emerald-700">&lt;2s</div><div class="text-[10px] text-slate-600">E2E Response</div></div>
            <div class="p-2 rounded bg-white border border-emerald-200"><div class="text-lg font-black text-emerald-700">0</div><div class="text-[10px] text-slate-600">P1 Defect</div></div>
          </div>

          <div class="p-3 rounded bg-slate-50 border border-slate-200">
            <div class="font-bold text-emerald-900 text-xs mb-2">Integration Test Scenarios (SSO)</div>
            <ul class="text-[11px] text-slate-700 space-y-1 list-disc pl-4">
              <li>Login dengan NIK valid mengembalikan token JWT dan membuat shadow user otomatis.</li>
              <li>Login dengan NIK tidak terdaftar SSO ditolak dengan HTTP 401 dan tidak membuat shadow.</li>
              <li>Token expired menghasilkan redirect ke SSO DAMRI dengan state parameter.</li>
              <li>Role cabang hanya bisa mengakses data cabangnya sendiri (row-level security).</li>
            </ul>
          </div>

          <div class="p-3 rounded bg-white border border-emerald-200 overflow-x-auto">
            <div class="font-bold text-emerald-900 text-xs mb-2">E2E Test: Full Mitra Registration Flow</div>
            <table class="w-full text-[10px] border-collapse">
              <thead>
                <tr class="bg-emerald-100 text-emerald-900">
                  <th class="border border-emerald-200 p-1.5 text-left">Step</th>
                  <th class="border border-emerald-200 p-1.5 text-left">Action</th>
                  <th class="border border-emerald-200 p-1.5 text-left">Expected Result</th>
                </tr>
              </thead>
              <tbody class="text-slate-700">
                <tr><td class="border border-emerald-200 p-1.5">1</td><td class="border border-emerald-200 p-1.5">Cabang input NIK 16 digit</td><td class="border border-emerald-200 p-1.5">Validasi sukses, nama terisi otomatis</td></tr>
                <tr><td class="border border-emerald-200 p-1.5">2</td><td class="border border-emerald-200 p-1.5">Submit 20 request bersamaan</td><td class="border border-emerald-200 p-1.5">Kode mitra unik, tidak ada duplikat</td></tr>
                <tr><td class="border border-emerald-200 p-1.5">3</td><td class="border border-emerald-200 p-1.5">BU approve pengajuan</td><td class="border border-emerald-200 p-1.5">Status approval berubah menjadi APPROVED</td></tr>
                <tr><td class="border border-emerald-200 p-1.5">4</td><td class="border border-emerald-200 p-1.5">Generate laporan TJSL</td><td class="border border-emerald-200 p-1.5">Export CSV sesuai template OJK</td></tr>
              </tbody>
            </table>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="p-3 rounded bg-emerald-50 border border-emerald-200">
              <div class="font-bold text-emerald-900 text-xs mb-2">Regression Matrix</div>
              <ul class="text-[11px] text-slate-700 space-y-1 list-disc pl-4">
                <li>CRUD mitra setelah update RBAC</li>
                <li>Export laporan setelah partition baru</li>
                <li>SSO login setelah library upgrade</li>
                <li>lockForUpdate setelah index rebuild</li>
              </ul>
            </div>
            <div class="p-3 rounded bg-emerald-50 border border-emerald-200">
              <div class="font-bold text-emerald-900 text-xs mb-2">UAT Checklist</div>
              <ul class="text-[11px] text-slate-700 space-y-1 list-disc pl-4">
                <li>Skenario happy path end-to-end</li>
                <li>Boundary NIK 15, 16, 17 digit</li>
                <li>Multi-cabang concurrent entry</li>
                <li>Approval workflow & audit trail</li>
              </ul>
            </div>
          </div>
        </div>`
  },
  push: {
    analyst: `<div class="space-y-4">
          <div class="p-4 rounded-lg bg-blue-50 border border-blue-200">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-0.5 rounded bg-blue-700 text-white text-[10px] font-bold uppercase">Analyst Lens</span>
              <span class="font-bold text-blue-900 text-sm">Push Request - Change Management Governance</span>
            </div>
            <p class="text-slate-800 text-xs leading-relaxed">
              Push Request Tracker adalah sistem governance perubahan kode produksi yang mengadopsi ITIL Change Management. Sistem mencatat setiap push, pull request, commit, dan deployment agar proses go-live memiliki jejak audit yang utuh dan dapat diverifikasi.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="p-3 rounded bg-white border border-blue-200">
              <div class="font-bold text-blue-900 text-xs mb-2">ITIL-Aligned Change Categories</div>
              <ul class="text-[11px] text-slate-700 space-y-1 list-disc pl-4">
                <li><strong>Standard:</strong> low-risk patch & hotfix tanpa CAB.</li>
                <li><strong>Normal:</strong> feature change dengan assessment ringan.</li>
                <li><strong>Emergency:</strong> critical bug fix dengan post-approval.</li>
                <li><strong>Major:</strong> breaking change memerlukan CAB review.</li>
              </ul>
            </div>
            <div class="p-3 rounded bg-white border border-blue-200">
              <div class="font-bold text-blue-900 text-xs mb-2">Audit Trail Requirements</div>
              <ul class="text-[11px] text-slate-700 space-y-1 list-disc pl-4">
                <li>Commit hash (SHA) wajib tersimpan.</li>
                <li>Author, reviewer, approver tercatat.</li>
                <li>Timestamp push & deployment presisi.</li>
                <li>Daftar file yang berubah tersimpan otomatis.</li>
              </ul>
            </div>
          </div>

          <div class="p-3 rounded bg-blue-50 border border-blue-200">
            <div class="font-bold text-blue-900 text-xs mb-2">Risk Assessment Matrix</div>
            <table class="w-full text-[10px] border-collapse mt-2">
              <thead>
                <tr class="bg-blue-100 text-blue-900">
                  <th class="border border-blue-200 p-1.5 text-left">Risk</th>
                  <th class="border border-blue-200 p-1.5 text-left">Impact</th>
                  <th class="border border-blue-200 p-1.5 text-left">Mitigation</th>
                </tr>
              </thead>
              <tbody class="text-slate-700">
                <tr><td class="border border-blue-200 p-1.5">Unreviewed push</td><td class="border border-blue-200 p-1.5">High</td><td class="border border-blue-200 p-1.5">Mandatory PR approval before merge</td></tr>
                <tr><td class="border border-blue-200 p-1.5">Deployment conflict</td><td class="border border-blue-200 p-1.5">Medium</td><td class="border border-blue-200 p-1.5">Deployment window & rollback plan</td></tr>
                <tr><td class="border border-blue-200 p-1.5">Webhook spoofing</td><td class="border border-blue-200 p-1.5">High</td><td class="border border-blue-200 p-1.5">HMAC SHA-256 verification</td></tr>
              </tbody>
            </table>
          </div>

          <div class="p-3 rounded bg-slate-50 border border-slate-200">
            <div class="font-bold text-blue-900 text-xs mb-2">RACI Matrix - Approval Workflow</div>
            <div class="grid grid-cols-4 gap-2 text-center text-[10px] font-bold">
              <div class="p-2 rounded bg-white border border-slate-300">Role</div>
              <div class="p-2 rounded bg-white border border-slate-300">Request</div>
              <div class="p-2 rounded bg-white border border-slate-300">Review</div>
              <div class="p-2 rounded bg-white border border-slate-300">Approve</div>
              <div class="p-2 rounded bg-blue-100 border border-blue-200 text-blue-900">Developer</div>
              <div class="p-2 rounded bg-blue-50 border border-blue-200 text-slate-700">R</div>
              <div class="p-2 rounded bg-blue-50 border border-blue-200 text-slate-700">C</div>
              <div class="p-2 rounded bg-blue-50 border border-blue-200 text-slate-700">I</div>
              <div class="p-2 rounded bg-blue-100 border border-blue-200 text-blue-900">Tech Lead</div>
              <div class="p-2 rounded bg-blue-50 border border-blue-200 text-slate-700">A</div>
              <div class="p-2 rounded bg-blue-50 border border-blue-200 text-slate-700">R</div>
              <div class="p-2 rounded bg-blue-50 border border-blue-200 text-slate-700">C</div>
              <div class="p-2 rounded bg-blue-100 border border-blue-200 text-blue-900">Release Manager</div>
              <div class="p-2 rounded bg-blue-50 border border-blue-200 text-slate-700">I</div>
              <div class="p-2 rounded bg-blue-50 border border-blue-200 text-slate-700">A</div>
              <div class="p-2 rounded bg-blue-50 border border-blue-200 text-slate-700">R</div>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-2 text-center">
            <div class="p-2 rounded bg-white border border-blue-200"><div class="text-lg font-black text-blue-700">&lt;5</div><div class="text-[10px] text-slate-600">Lead Time (days)</div></div>
            <div class="p-2 rounded bg-white border border-blue-200"><div class="text-lg font-black text-blue-700">100%</div><div class="text-[10px] text-slate-600">Approval Traceability</div></div>
            <div class="p-2 rounded bg-white border border-blue-200"><div class="text-lg font-black text-blue-700">24h</div><div class="text-[10px] text-slate-600">Rollback SLA</div></div>
          </div>
        </div>`,
    dev: `<div class="space-y-4">
          <div class="p-4 rounded-lg bg-indigo-50 border border-indigo-200">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-0.5 rounded bg-indigo-700 text-white text-[10px] font-bold uppercase">Developer Lens</span>
              <span class="font-bold text-indigo-900 text-sm">Push Request - GitHub Webhook & Audit Pipeline</span>
            </div>
            <p class="text-slate-800 text-xs leading-relaxed">
              Sistem menerima event push dari GitHub via webhook, memverifikasi HMAC signature, menyimpan metadata ke PostgreSQL, dan memperbarui kanban deployment secara real-time melalui WebSocket. Diff viewer memudahkan reviewer membandingkan versi kode.
            </p>
          </div>

          <div class="flex flex-wrap gap-2">
            <span class="px-2 py-1 rounded bg-slate-800 text-indigo-300 text-[10px] font-bold">GitHub Webhook</span>
            <span class="px-2 py-1 rounded bg-slate-800 text-indigo-300 text-[10px] font-bold">HMAC SHA-256</span>
            <span class="px-2 py-1 rounded bg-slate-800 text-indigo-300 text-[10px] font-bold">WebSocket</span>
            <span class="px-2 py-1 rounded bg-slate-800 text-indigo-300 text-[10px] font-bold">Laravel Queue</span>
            <span class="px-2 py-1 rounded bg-slate-800 text-indigo-300 text-[10px] font-bold">Diff Viewer</span>
            <span class="px-2 py-1 rounded bg-slate-800 text-indigo-300 text-[10px] font-bold">CI/CD</span>
          </div>

          <div class="p-3 rounded bg-slate-50 border border-slate-200">
            <div class="font-bold text-indigo-900 text-xs mb-2">Webhook Integration Architecture</div>
            <div class="grid grid-cols-5 gap-2 text-center text-[10px]">
              <div class="p-2 rounded bg-white border border-indigo-200"><strong>GitHub Push</strong></div>
              <div class="self-center text-indigo-700 font-bold">&rarr;</div>
              <div class="p-2 rounded bg-white border border-indigo-200"><strong>Laravel Route</strong><br/><span class="text-slate-500">HMAC Verify</span></div>
              <div class="self-center text-indigo-700 font-bold">&rarr;</div>
              <div class="p-2 rounded bg-white border border-indigo-200"><strong>Queue + DB</strong><br/><span class="text-slate-500">WS Broadcast</span></div>
            </div>
          </div>

          <pre class="font-mono text-[11px] bg-slate-950 text-indigo-300 p-3 rounded overflow-x-auto">// WebhookController.php - HMAC verification & audit log
public function handlePush(Request $request)
{
    $signature = $request->header('X-Hub-Signature-256');
    $payload   = $request->getContent();
    $expected  = 'sha256=' . hash_hmac('sha256', $payload, config('github.secret'));

    if (!hash_equals($expected, $signature)) {
        abort(401, 'Invalid webhook signature');
    }

    $data = $request->input('commits');
    AuditPush::create([
        'repo'        => $request->input('repository.full_name'),
        'commit_hash' => $request->input('after'),
        'author'      => $request->input('pusher.name'),
        'files'       => collect($data)->pluck('modified')->flatten()->unique()->implode(', '),
        'status'      => 'VERIFIED',
    ]);

    broadcast(new DeploymentUpdated($audit))->toOthers();

    return response()->json(['status' => 'accepted']);
}</pre>

          <div class="p-3 rounded bg-slate-50 border border-slate-200">
            <div class="font-bold text-indigo-900 text-xs mb-2">Database Schema for Audit Logs</div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10px]">
              <div class="p-2 rounded bg-white border border-slate-300"><strong>audit_pushes</strong><br/>id, repo, commit_hash, author, files, status</div>
              <div class="p-2 rounded bg-white border border-slate-300"><strong>deployments</strong><br/>id, push_id, env, deployed_at, rollback_hash</div>
              <div class="p-2 rounded bg-white border border-slate-300"><strong>approvals</strong><br/>id, deployment_id, approver, decision, timestamp</div>
            </div>
          </div>

          <div class="p-3 rounded bg-slate-50 border border-slate-200">
            <div class="font-bold text-indigo-900 text-xs mb-2">Real-Time Notification & Diff Viewer</div>
            <ul class="text-[11px] text-slate-700 space-y-1 list-disc pl-4">
              <li><strong>WebSocket:</strong> Laravel Echo + Reverb memperbarui kanban deployment tanpa refresh.</li>
              <li><strong>Diff Viewer:</strong> membandingkan diff dua commit via GitHub API dan menampilkan statistik +/- lines.</li>
              <li><strong>Pipeline Automation:</strong> webhook trigger menjalankan GitHub Actions untuk build & unit test.</li>
              <li><strong>Security:</strong> secret webhook disimpan di environment, tidak di codebase.</li>
            </ul>
          </div>
        </div>`,
    qa: `<div class="space-y-4">
          <div class="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-0.5 rounded bg-emerald-700 text-white text-[10px] font-bold uppercase">QA Rigor</span>
              <span class="font-bold text-emerald-900 text-sm">Push Request - Security & Load Testing</span>
            </div>
            <p class="text-slate-800 text-xs leading-relaxed">
              Pengujian Push Request difokuskan pada keamanan webhook, integritas data audit, dan ketahanan sistem terhadap lonjakan event GitHub. Setiap skenario negative test dieksekusi sebelum deployment pipeline dinyatakan aman.
            </p>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div class="p-2 rounded bg-white border border-emerald-200"><div class="text-lg font-black text-emerald-700">401</div><div class="text-[10px] text-slate-600">Invalid Signature</div></div>
            <div class="p-2 rounded bg-white border border-emerald-200"><div class="text-lg font-black text-emerald-700">200 req/s</div><div class="text-[10px] text-slate-600">Webhook Load</div></div>
            <div class="p-2 rounded bg-white border border-emerald-200"><div class="text-lg font-black text-emerald-700">100%</div><div class="text-[10px] text-slate-600">Replay Rejected</div></div>
            <div class="p-2 rounded bg-white border border-emerald-200"><div class="text-lg font-black text-emerald-700">&lt;1s</div><div class="text-[10px] text-slate-600">Audit Persist</div></div>
          </div>

          <div class="p-3 rounded bg-white border border-emerald-200 overflow-x-auto">
            <div class="font-bold text-emerald-900 text-xs mb-2">Webhook Security Testing</div>
            <table class="w-full text-[10px] border-collapse">
              <thead>
                <tr class="bg-emerald-100 text-emerald-900">
                  <th class="border border-emerald-200 p-1.5 text-left">Scenario</th>
                  <th class="border border-emerald-200 p-1.5 text-left">Attack Vector</th>
                  <th class="border border-emerald-200 p-1.5 text-left">Expected</th>
                </tr>
              </thead>
              <tbody class="text-slate-700">
                <tr><td class="border border-emerald-200 p-1.5">Signature tampering</td><td class="border border-emerald-200 p-1.5">Modify X-Hub-Signature-256</td><td class="border border-emerald-200 p-1.5">HTTP 401, no DB write</td></tr>
                <tr><td class="border border-emerald-200 p-1.5">Replay attack</td><td class="border border-emerald-200 p-1.5">Resend same payload</td><td class="border border-emerald-200 p-1.5">Rejected by idempotency key</td></tr>
                <tr><td class="border border-emerald-200 p-1.5">Missing secret</td><td class="border border-emerald-200 p-1.5">Empty GITHUB_SECRET</td><td class="border border-emerald-200 p-1.5">Controller throws 500 on staging only</td></tr>
              </tbody>
            </table>
          </div>

          <div class="p-3 rounded bg-emerald-50 border border-emerald-200">
            <div class="font-bold text-emerald-900 text-xs mb-2">Integration Testing with GitHub API Mocks</div>
            <ul class="text-[11px] text-slate-700 space-y-1 list-disc pl-4">
              <li>Mock GitHub push payload dengan 3 commit & file changes tervalidasi.</li>
              <li>Assert record audit_pushes berisi commit hash & daftar file yang tepat.</li>
              <li>Simulasikan event branch deletion untuk memastikan tidak tercatat sebagai push.</li>
              <li>Verifikasi broadcast WebSocket terkirim ke channel deployment-updates.</li>
            </ul>
          </div>

          <div class="p-3 rounded bg-slate-50 border border-slate-200">
            <div class="font-bold text-emerald-900 text-xs mb-2">Load & Workflow Edge Cases</div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-slate-700">
              <div class="p-2 rounded bg-white border border-slate-300">
                <strong>Concurrent Webhooks:</strong> 200 push events/detik selama 60 detik tanpa message loss atau duplikat audit.
              </div>
              <div class="p-2 rounded bg-white border border-slate-300">
                <strong>Approval Edge Cases:</strong> approve sebelum review, double approve, approve setelah rollback semua ditolak sistem.
              </div>
              <div class="p-2 rounded bg-white border border-slate-300">
                <strong>Rollback Verification:</strong> setelah rollback, deployment.status = ROLLED_BACK dan rollback_hash terisi.
              </div>
              <div class="p-2 rounded bg-white border border-slate-300">
                <strong>Diff Viewer Accuracy:</strong> perbandingan commit menghasilkan statistik lines added/removed sama dengan GitHub.
              </div>
            </div>
          </div>
        </div>`
  },
  'enterprise-docs': {
    analyst: `<div class="space-y-4">
          <div class="p-4 rounded-lg bg-blue-50 border border-blue-200">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-0.5 rounded bg-blue-700 text-white text-[10px] font-bold uppercase">Analyst Lens</span>
              <span class="font-bold text-blue-900 text-sm">Portofolio Enterprise - Tata Kelola Spesifikasi Sistem &amp; Kepatuhan GCG</span>
            </div>
            <p class="text-slate-800 text-xs leading-relaxed">
              Standardisasi perancangan arsitektur enterprise mencakup 40+ modul sistem operasional dan finansial. Berperan menyusun Software Requirements Specification (SRS) formal, Traceability Matrix dari regulasi BUMN/OJK hingga user stories, diagram alir BPMN 2.0 multi-aktor, serta kamus data terstandardisasi untuk menghindari ambiguitas teknis di tim pengembang.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="p-3 rounded bg-white border border-blue-200">
              <div class="font-bold text-blue-900 text-xs mb-2">Traceability Framework</div>
              <ul class="text-[11px] text-slate-700 space-y-1 list-disc pl-4">
                <li><strong>Regulasi BUMN / GCG:</strong> Kebijakan audit, pemisahan kewenangan (SoD).</li>
                <li><strong>Business Requirements (BRD):</strong> Kebutuhan divisi operasional, SDM, keuangan.</li>
                <li><strong>System Specs (SRS):</strong> Spesifikasi fungsional, non-fungsional, &amp; data model.</li>
                <li><strong>Verification Matrix:</strong> Pemetaan langsung setiap requirement ke skenario SIT/UAT.</li>
              </ul>
            </div>
            <div class="p-3 rounded bg-white border border-blue-200">
              <div class="font-bold text-blue-900 text-xs mb-2">Standar Artefak Arsitektur</div>
              <ul class="text-[11px] text-slate-700 space-y-1 list-disc pl-4">
                <li>BPMN 2.0 Swimlane untuk alur lintas departemen.</li>
                <li>Normalisasi ERD hingga 3NF (Third Normal Form).</li>
                <li>Kamus Data (Data Dictionary) komprehensif.</li>
                <li>OpenAPI 3.1 REST API contract definition.</li>
              </ul>
            </div>
          </div>

          <div class="p-3 rounded bg-blue-50 border border-blue-200">
            <div class="font-bold text-blue-900 text-xs mb-2">Dampak Terhadap Efisiensi Rekayasa</div>
            <p class="text-slate-800 text-xs leading-relaxed">
              Dengan spesifikasi yang presisi dan tidak ambigu di tahap awal, angka rework arsitektur berkurang drastis dari rata-rata industri 30% menjadi di bawah 4%. Pengembang langsung menerima kontrak API dan skema relasional yang siap dikodekan tanpa friksi pemahaman bisnis.
            </p>
          </div>
        </div>`,
    dev: `<div class="space-y-4">
          <div class="p-4 rounded-lg bg-indigo-50 border border-indigo-200">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-0.5 rounded bg-indigo-700 text-white text-[10px] font-bold uppercase">Developer Lens</span>
              <span class="font-bold text-indigo-900 text-sm">Arsitektur Modular Monolith &amp; Kontrak API Terstandar</span>
            </div>
            <p class="text-slate-800 text-xs leading-relaxed">
              Arsitektur aplikasi enterprise dirancang berbasis pola domain-driven design (DDD) modular monolith atau microservices terisolasi. Seluruh interaksi antar subsistem menggunakan kontrak schema-first (OpenAPI / JSON Schema) untuk menjamin backward compatibility dan mencegah breaking changes pada rilis bertahap.
            </p>
          </div>

          <div class="flex flex-wrap gap-2">
            <span class="px-2 py-1 rounded bg-slate-800 text-indigo-300 text-[10px] font-bold">PostgreSQL 15</span>
            <span class="px-2 py-1 rounded bg-slate-800 text-indigo-300 text-[10px] font-bold">Redis Cache</span>
            <span class="px-2 py-1 rounded bg-slate-800 text-indigo-300 text-[10px] font-bold">OpenAPI 3.1</span>
            <span class="px-2 py-1 rounded bg-slate-800 text-indigo-300 text-[10px] font-bold">Docker</span>
            <span class="px-2 py-1 rounded bg-slate-800 text-indigo-300 text-[10px] font-bold">CI/CD GitHub Actions</span>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div class="p-2.5 rounded bg-white border border-indigo-200"><div class="text-lg font-black text-indigo-700">40+</div><div class="text-[10px] text-slate-600">Dokumen Spesifikasi</div></div>
            <div class="p-2.5 rounded bg-white border border-indigo-200"><div class="text-lg font-black text-indigo-700">&lt;4%</div><div class="text-[10px] text-slate-600">Rework Rate</div></div>
            <div class="p-2.5 rounded bg-white border border-indigo-200"><div class="text-lg font-black text-indigo-700">100%</div><div class="text-[10px] text-slate-600">API Contract Match</div></div>
            <div class="p-2.5 rounded bg-white border border-indigo-200"><div class="text-lg font-black text-indigo-700">0</div><div class="text-[10px] text-slate-600">Schema Drift</div></div>
          </div>

          <div class="p-3 rounded bg-slate-50 border border-slate-200">
            <div class="font-bold text-indigo-900 text-xs mb-2">Standard Database Migration &amp; Versioning</div>
            <ul class="text-[11px] text-slate-700 space-y-1 list-disc pl-4">
              <li>Setiap perubahan skema database wajib melalui migration berurutan (forward &amp; rollback down script).</li>
              <li>Prinsip non-destructive migration: kolom baru nullable atau ber-default value.</li>
              <li>Pemisahan read-replica untuk pelaporan analitik berat agar tidak mengganggu transaksi OLTP.</li>
            </ul>
          </div>
        </div>`,
    qa: `<div class="space-y-4">
          <div class="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-0.5 rounded bg-emerald-700 text-white text-[10px] font-bold uppercase">QA Rigor</span>
              <span class="font-bold text-emerald-900 text-sm">Tata Kelola Pengujian SIT/UAT &amp; Gerbang Kualitas (Quality Gates)</span>
            </div>
            <p class="text-slate-800 text-xs leading-relaxed">
              Menerapkan standarisasi siklus pengujian perangkat lunak dari Unit Testing, System Integration Testing (SIT), User Acceptance Testing (UAT), hingga Performance &amp; Stress Testing. Setiap rilis diverifikasi dengan matriks kepatuhan bebas defect P1/P2 sebelum mendapatkan sign-off produksi.
            </p>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div class="p-2 rounded bg-white border border-emerald-200"><div class="text-lg font-black text-emerald-700">42+</div><div class="text-[10px] text-slate-600">Skenario Uji Formal</div></div>
            <div class="p-2 rounded bg-white border border-emerald-200"><div class="text-lg font-black text-emerald-700">100%</div><div class="text-[10px] text-slate-600">SIT Sign-off Pass</div></div>
            <div class="p-2 rounded bg-white border border-emerald-200"><div class="text-lg font-black text-emerald-700">0</div><div class="text-[10px] text-slate-600">P1 Defect in Prod</div></div>
            <div class="p-2 rounded bg-white border border-emerald-200"><div class="text-lg font-black text-emerald-700">5 Mins</div><div class="text-[10px] text-slate-600">Rollback SLA</div></div>
          </div>

          <div class="p-3 rounded bg-slate-50 border border-slate-200">
            <div class="font-bold text-emerald-900 text-xs mb-2">Klasifikasi Tingkat Keparahan Defect (Severity)</div>
            <ul class="text-[11px] text-slate-700 space-y-1 list-disc pl-4">
              <li><strong>P1 - Blocker:</strong> Sistem crash, integritas data finansial rusak, atau transaksi macet. Rilis wajib ditunda.</li>
              <li><strong>P2 - Critical:</strong> Fitur utama tidak berjalan, tidak ada workaround layak. Harus diselesaikan dalam 24 jam.</li>
              <li><strong>P3 - Major:</strong> Fitur terganggu tetapi ada workaround sementara. Diselesaikan di sprint berjalan.</li>
              <li><strong>P4 - Minor / Cosmetic:</strong> Kesalahan ketik, misalignment UI kecil yang tidak mengganggu fungsi.</li>
            </ul>
          </div>
        </div>`
  },
  'approval-engine': {
    analyst: `<div class="space-y-4">
          <div class="p-4 rounded-lg bg-blue-50 border border-blue-200">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-0.5 rounded bg-blue-700 text-white text-[10px] font-bold uppercase">Analyst Lens</span>
              <span class="font-bold text-blue-900 text-sm">Dynamic Multi-Tier Approval Workflow &amp; Pjs Delegation Engine</span>
            </div>
            <p class="text-slate-800 text-xs leading-relaxed">
              Dirancang untuk mengatasi bottleneck otorisasi finansial dan operasional pada struktur hierarki enterprise. Menghadirkan perutean matriks persetujuan bertingkat dinamis berbasis nilai transaksi (&lt;Rp 50 Juta s/d &gt;Rp 5 Miliar), pendelegasian wewenang pejabat pengganti sementara (Pjs) otomatis dengan window masa aktif, auto-eskalasi SLA 24 jam, dan pencatatan rantai audit ledger SHA-256 yang anti-tamper.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="p-3 rounded bg-white border border-blue-200">
              <div class="font-bold text-blue-900 text-xs mb-2">Matriks Otorisasi Finansial</div>
              <ul class="text-[11px] text-slate-700 space-y-1 list-disc pl-4">
                <li><strong>Tier 1 (&lt;Rp 50 Juta):</strong> Supervisor Cabang (1-step approval).</li>
                <li><strong>Tier 2 (Rp 50M - Rp 500M):</strong> Manajer Divisi Operasional (2-step).</li>
                <li><strong>Tier 3 (Rp 500M - Rp 5 Miliar):</strong> General Manager / VP (3-step).</li>
                <li><strong>Tier 4 (&gt;Rp 5 Miliar):</strong> Direksi / Board of Directors (4-step final).</li>
              </ul>
            </div>
            <div class="p-3 rounded bg-white border border-blue-200">
              <div class="font-bold text-blue-900 text-xs mb-2">Aturan Bisnis &amp; Pencegahan Fraud</div>
              <ul class="text-[11px] text-slate-700 space-y-1 list-disc pl-4">
                <li><strong>Separation of Duties (SoD):</strong> Pembuat pengajuan dilarang menyetujui dokumen sendiri.</li>
                <li><strong>Pjs Auto-Revert:</strong> Hak persetujuan otomatis dicabut saat masa penugasan berakhir.</li>
                <li><strong>Anti-Loop Delegation:</strong> Mencegah delegasi sirkular (User A &rarr; User B &rarr; User A).</li>
                <li><strong>SLA Escalation:</strong> Jika persetujuan mandek &gt;24 jam, notifikasi eskalasi naik 1 tingkat.</li>
              </ul>
            </div>
          </div>

          <div class="p-3 rounded bg-blue-50 border border-blue-200">
            <div class="font-bold text-blue-900 text-xs mb-2">Audit Trail Ledger Berbasis Hash (SHA-256)</div>
            <p class="text-slate-800 text-xs leading-relaxed">
              Setiap aksi persetujuan menghasilkan payload hash SHA-256 yang merantai hash transaksi sebelumnya (prinsip Merkle Tree). Hal ini menjamin bahwa riwayat audit tidak dapat dimanipulasi dari database internal oleh pihak manapun tanpa merusak integritas rantai verifikasi.
            </p>
          </div>
        </div>`,
    dev: `<div class="space-y-4">
          <div class="p-4 rounded-lg bg-indigo-50 border border-indigo-200">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-0.5 rounded bg-indigo-700 text-white text-[10px] font-bold uppercase">Developer Lens</span>
              <span class="font-bold text-indigo-900 text-sm">Optimistic Locking, State Machine &amp; Distributed Mutex</span>
            </div>
            <p class="text-slate-800 text-xs leading-relaxed">
              Arsitektur engine approval dibangun di atas finite state machine deterministik dengan proteksi race condition ganda: Optimistic Locking pada tingkat database menggunakan kolom <code>version</code>, serta Redis Mutex Lock terdistribusi untuk mencegah dual-approval simultan saat dua manajer mengklik tombol persetujuan di milidetik yang sama.
            </p>
          </div>

          <div class="flex flex-wrap gap-2">
            <span class="px-2 py-1 rounded bg-slate-800 text-indigo-300 text-[10px] font-bold">State Machine</span>
            <span class="px-2 py-1 rounded bg-slate-800 text-indigo-300 text-[10px] font-bold">PostgreSQL 15</span>
            <span class="px-2 py-1 rounded bg-slate-800 text-indigo-300 text-[10px] font-bold">Redis Distributed Lock</span>
            <span class="px-2 py-1 rounded bg-slate-800 text-indigo-300 text-[10px] font-bold">Optimistic Locking</span>
            <span class="px-2 py-1 rounded bg-slate-800 text-indigo-300 text-[10px] font-bold">SHA-256 Ledger</span>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div class="p-2.5 rounded bg-white border border-indigo-200"><div class="text-lg font-black text-indigo-700">0%</div><div class="text-[10px] text-slate-600">Dual-Approval Leak</div></div>
            <div class="p-2.5 rounded bg-white border border-indigo-200"><div class="text-lg font-black text-indigo-700">&lt;15ms</div><div class="text-[10px] text-slate-600">State Transition</div></div>
            <div class="p-2.5 rounded bg-white border border-indigo-200"><div class="text-lg font-black text-indigo-700">10,000+</div><div class="text-[10px] text-slate-600">Trans / Hari</div></div>
            <div class="p-2.5 rounded bg-white border border-indigo-200"><div class="text-lg font-black text-indigo-700">100%</div><div class="text-[10px] text-slate-600">Audit Verifiable</div></div>
          </div>

          <pre class="font-mono text-[11px] bg-slate-950 text-indigo-300 p-3 rounded overflow-x-auto">// ApprovalEngineService.php - State transition dengan Optimistic Locking
DB::transaction(function () use ($ticketId, $approverId, $expectedVersion) {
    // 1. Dapatkan tiket dengan pengecekan versi (Optimistic Lock)
    $ticket = Ticket::where('id', $ticketId)
        ->where('version', $expectedVersion)
        ->lockForUpdate()
        ->firstOrFail();

    // 2. Evaluasi aturan delegasi & hak otorisasi
    $this->guardDelegationAuthority($ticket, $approverId);

    // 3. Mutasi state dan naikkan versi
    $ticket->current_tier += 1;
    $ticket->version      += 1;
    $ticket->status        = $ticket->current_tier > $ticket->max_tier ? 'APPROVED' : 'IN_REVIEW';
    $ticket->save();

    // 4. Catat hash audit trail berantai
    AuditLedger::append([
        'ticket_id' => $ticket->id,
        'actor_id'  => $approverId,
        'prev_hash' => $ticket->last_audit_hash,
        'signature' => hash('sha256', $ticket->id . $approverId . now())
    ]);
});</pre>
        </div>`,
    qa: `<div class="space-y-4">
          <div class="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-0.5 rounded bg-emerald-700 text-white text-[10px] font-bold uppercase">QA Rigor</span>
              <span class="font-bold text-emerald-900 text-sm">Pengujian Stres Konkurensi &amp; Verifikasi Edge Case Delegasi</span>
            </div>
            <p class="text-slate-800 text-xs leading-relaxed">
              Pengujian engine approval berfokus pada ketahanan konkurensi tingkat tinggi: simulasi klik ganda simultan dari dua pengambil keputusan, skenario batas nominal (boundary testing), pengujian delegasi bertingkat (pjs loop), serta protokol rollback darurat 5 menit jika terjadi kegagalan sistem downstream.
            </p>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div class="p-2 rounded bg-white border border-emerald-200"><div class="text-lg font-black text-emerald-700">0</div><div class="text-[10px] text-slate-600">Race Condition Pass</div></div>
            <div class="p-2 rounded bg-white border border-emerald-200"><div class="text-lg font-black text-emerald-700">500 rps</div><div class="text-[10px] text-slate-600">Burst Concurrency</div></div>
            <div class="p-2 rounded bg-white border border-emerald-200"><div class="text-lg font-black text-emerald-700">&lt;5 Mins</div><div class="text-[10px] text-slate-600">Rollback SOP</div></div>
            <div class="p-2 rounded bg-white border border-emerald-200"><div class="text-lg font-black text-emerald-700">100%</div><div class="text-[10px] text-slate-600">Merkle Integrity</div></div>
          </div>

          <div class="p-3 rounded bg-slate-50 border border-slate-200">
            <div class="font-bold text-emerald-900 text-xs mb-2">Boundary &amp; Negative Test Scenarios</div>
            <ul class="text-[11px] text-slate-700 space-y-1 list-disc pl-4">
              <li><strong>Boundary Test:</strong> Pengajuan senilai Rp 50.000.000 (tepat di batas tier 1) vs Rp 50.000.001 (masuk ke tier 2).</li>
              <li><strong>Cyclical Delegation:</strong> User A mendelegasikan ke B, B mencoba mendelegasikan ke A &rarr; Ditolak HTTP 422 dengan pesan circular dependency.</li>
              <li><strong>Concurrent Approval:</strong> 50 thread HTTP POST mencoba approve tiket yang sama secara bersamaan &rarr; Tepat 1 thread berhasil, 49 thread menerima HTTP 409 Conflict.</li>
            </ul>
          </div>
        </div>`
  },
  seatlock: {
    analyst: `<div class="space-y-4">
          <div class="p-4 rounded-lg bg-blue-50 border border-blue-200">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-0.5 rounded bg-blue-700 text-white text-[10px] font-bold uppercase">Analyst Lens</span>
              <span class="font-bold text-blue-900 text-sm">High-Concurrency Seat Lock &amp; Race Condition Defense</span>
            </div>
            <p class="text-slate-800 text-xs leading-relaxed">
              Pada lonjakan mudik Lebaran dan libur nasional, ribuan penumpang memperebutkan nomor kursi yang sama dalam rentang milidetik. Peran System Analyst merumuskan aturan batas kepemilikan kursi, durasi TTL penguncian sementara (600 detik), batas toleransi pembayaran (grace period), dan eliminasi double booking hingga 0%.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="p-3 rounded bg-white border border-blue-200">
              <div class="font-bold text-blue-900 text-xs mb-2">Business Rules &amp; Anti-Scalping</div>
              <ul class="text-[11px] text-slate-700 space-y-1 list-disc pl-4">
                <li><strong>BR-SL-01:</strong> Maksimal 4 kursi per akun per sesi transaksi.</li>
                <li><strong>BR-SL-02:</strong> Kunci kursi sementara memiliki batas kedaluwarsa mutlak 10 menit (600s).</li>
                <li><strong>BR-SL-03:</strong> Watchdog otomatis mengembalikan kursi ke status AVAILABLE jika sesi ditinggalkan.</li>
                <li><strong>BR-SL-04:</strong> Idempotency-Key UUIDv4 wajib disertakan pada seluruh request pemesanan.</li>
              </ul>
            </div>
            <div class="p-3 rounded bg-white border border-blue-200">
              <div class="font-bold text-blue-900 text-xs mb-2">State Transition Model</div>
              <ul class="text-[11px] text-slate-700 space-y-1 list-disc pl-4">
                <li><strong>AVAILABLE:</strong> Kursi terbuka untuk seluruh calon pembeli.</li>
                <li><strong>TEMP_LOCKED:</strong> Terkunci sementara oleh sesi spesifik (Redis SETNX).</li>
                <li><strong>SOLD:</strong> Pembayaran berhasil diverifikasi webhook gateway bank.</li>
                <li><strong>RELEASED / EXPIRED:</strong> TTL habis tanpa pembayaran, kembali ke pool.</li>
              </ul>
            </div>
          </div>
        </div>`,
    dev: `<div class="space-y-4">
          <div class="p-4 rounded-lg bg-indigo-50 border border-indigo-200">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-0.5 rounded bg-indigo-700 text-white text-[10px] font-bold uppercase">Developer Lens</span>
              <span class="font-bold text-indigo-900 text-sm">Redis SETNX Mutex &amp; Deterministic TTL Watchdogs</span>
            </div>
            <p class="text-slate-800 text-xs leading-relaxed">
              Arsitektur performa tinggi berbasis <strong>Redis Distributed Lock (SETNX + EX 600s)</strong> dengan fallback secondary lock PostgreSQL <code>SELECT FOR UPDATE</code>. Mampu menahan beban puncak hingga 10.000 req/s dengan latensi P99 &lt;45ms.
            </p>
          </div>

          <div class="flex flex-wrap gap-2">
            <span class="px-2 py-1 rounded bg-slate-800 text-indigo-300 text-[10px] font-bold">Redis SETNX</span>
            <span class="px-2 py-1 rounded bg-slate-800 text-indigo-300 text-[10px] font-bold">Redis Sentinel HA</span>
            <span class="px-2 py-1 rounded bg-slate-800 text-indigo-300 text-[10px] font-bold">PostgreSQL Advisory Locks</span>
            <span class="px-2 py-1 rounded bg-slate-800 text-indigo-300 text-[10px] font-bold">k6 Load Testing</span>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div class="p-2.5 rounded bg-white border border-indigo-200"><div class="text-lg font-black text-indigo-700">10.000</div><div class="text-[10px] text-slate-600">Peak RPS Tested</div></div>
            <div class="p-2.5 rounded bg-white border border-indigo-200"><div class="text-lg font-black text-indigo-700">&lt;45ms</div><div class="text-[10px] text-slate-600">P99 Lock Latency</div></div>
            <div class="p-2.5 rounded bg-white border border-indigo-200"><div class="text-lg font-black text-indigo-700">0%</div><div class="text-[10px] text-slate-600">Double-Booking Rate</div></div>
            <div class="p-2.5 rounded bg-white border border-indigo-200"><div class="text-lg font-black text-indigo-700">600s</div><div class="text-[10px] text-slate-600">Deterministic TTL</div></div>
          </div>

          <pre class="font-mono text-[11px] bg-slate-950 text-indigo-300 p-3 rounded overflow-x-auto">// Distributed Mutex Lock Acquisition in Redis
const acquired = await redis.set("seat:" + scheduleId + ":" + seatNo, sessionId, "NX", "EX", 600);
if (!acquired) {
  return res.status(409).json({ error: 'Seat is currently being reserved by another passenger' });
}</pre>
        </div>`,
    qa: `<div class="space-y-4">
          <div class="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-0.5 rounded bg-emerald-700 text-white text-[10px] font-bold uppercase">QA Rigor</span>
              <span class="font-bold text-emerald-900 text-sm">Concurrency Stress Matrix &amp; Failover Drills</span>
            </div>
            <p class="text-slate-800 text-xs leading-relaxed">
              30 skenario uji konkurensi ekstrem menggunakan k6 dan simulator kueri paralel. Memvalidasi ketahanan failover Redis Sentinel dan verifikasi tepat 0 kasus kursi ganda.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="p-3 rounded bg-white border border-emerald-200">
              <div class="font-bold text-emerald-900 text-xs mb-2">Simulated Concurrency Stress Test</div>
              <p class="text-[11px] text-slate-700 leading-relaxed">
                100 request simultan pada milidetik yang identik untuk kursi 4B: tepat 1 pengguna berhasil (200 OK), 99 pengguna tertib menerima 409 Conflict.
              </p>
            </div>
            <div class="p-3 rounded bg-white border border-emerald-200">
              <div class="font-bold text-emerald-900 text-xs mb-2">Sentinel Node Crash Drill</div>
              <p class="text-[11px] text-slate-700 leading-relaxed">
                Simulasi crash pada node master Redis: replica dipromosikan menjadi master dalam 1.4 detik tanpa kehilangan state kunci kursi aktif.
              </p>
            </div>
          </div>
        </div>`
  },
  'payment-recon': {
    analyst: `<div class="space-y-4">
          <div class="p-4 rounded-lg bg-blue-50 border border-blue-200">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-0.5 rounded bg-blue-700 text-white text-[10px] font-bold uppercase">Analyst Lens</span>
              <span class="font-bold text-blue-900 text-sm">Rekonsiliasi Pembayaran Multi-Bank &amp; Settlement Otomatis (Standar BI SNAP)</span>
            </div>
            <p class="text-slate-800 text-xs leading-relaxed">
              Merancang sistem rekonsiliasi finansial otomatis 3-arah (Three-Way Matching) antara Catatan Transaksi Internal, Webhook Gateway Pembayaran (Payment Gateway), dan Rekening Koran Bank (Bank Statement MT940). Memenuhi standar Bank Indonesia Standar Nasional Open API Pembayaran (SNAP BI), mengeliminasi selisih pembukuan manual, dan memangkas waktu tutup buku dari 40 jam menjadi hanya 12 menit.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="p-3 rounded bg-white border border-blue-200">
              <div class="font-bold text-blue-900 text-xs mb-2">Pilar 3-Way Matching</div>
              <ul class="text-[11px] text-slate-700 space-y-1 list-disc pl-4">
                <li><strong>Sisi 1 (Order Internal):</strong> Transaksi penjualan tiket/layanan di database lokal.</li>
                <li><strong>Sisi 2 (Gateway Webhook):</strong> Notifikasi status pembayaran sukses dari PG.</li>
                <li><strong>Sisi 3 (Rekening Koran):</strong> Dana riil masuk yang tercatat pada mutasi bank H+1.</li>
              </ul>
            </div>
            <div class="p-3 rounded bg-white border border-blue-200">
              <div class="font-bold text-blue-900 text-xs mb-2">Penanganan Anomali &amp; Cutoff</div>
              <ul class="text-[11px] text-slate-700 space-y-1 list-disc pl-4">
                <li><strong>Cutoff D+1 Rollforward:</strong> Transaksi pukul 23:59 otomatis dialokasikan ke pembukuan hari berikutnya.</li>
                <li><strong>Dispute Ledger:</strong> Selisih biaya admin atau suspended transaction masuk ke antrean investigasi keuangan.</li>
                <li><strong>Webhook Auto-Healing:</strong> Mekanisme polling aktif jika webhook bank mengalami keterlambatan jaringan.</li>
              </ul>
            </div>
          </div>
        </div>`,
    dev: `<div class="space-y-4">
          <div class="p-4 rounded-lg bg-indigo-50 border border-indigo-200">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-0.5 rounded bg-indigo-700 text-white text-[10px] font-bold uppercase">Developer Lens</span>
              <span class="font-bold text-indigo-900 text-sm">Engine Rekonsiliasi Terdistribusi &amp; Idempotency Key Lock</span>
            </div>
            <p class="text-slate-800 text-xs leading-relaxed">
              Arsitektur streaming ingestion berbasis antrean pesan (message queue) yang memproses hingga 200.000 baris mutasi bank per menit. Dilengkapi dengan kunci idempotensi Redis (Idempotency Key) untuk memastikan tidak ada pencatatan kredit ganda pada pengulangan webhook atau retry transaksi.
            </p>
          </div>

          <div class="flex flex-wrap gap-2">
            <span class="px-2 py-1 rounded bg-slate-800 text-indigo-300 text-[10px] font-bold">SNAP BI Protocol</span>
            <span class="px-2 py-1 rounded bg-slate-800 text-indigo-300 text-[10px] font-bold">Redis Idempotency</span>
            <span class="px-2 py-1 rounded bg-slate-800 text-indigo-300 text-[10px] font-bold">PostgreSQL Partitioning</span>
            <span class="px-2 py-1 rounded bg-slate-800 text-indigo-300 text-[10px] font-bold">RabbitMQ</span>
            <span class="px-2 py-1 rounded bg-slate-800 text-indigo-300 text-[10px] font-bold">HMAC-SHA256</span>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div class="p-2.5 rounded bg-white border border-indigo-200"><div class="text-lg font-black text-indigo-700">12 Mins</div><div class="text-[10px] text-slate-600">Recon Run Time</div></div>
            <div class="p-2.5 rounded bg-white border border-indigo-200"><div class="text-lg font-black text-indigo-700">0.00%</div><div class="text-[10px] text-slate-600">Financial Leakage</div></div>
            <div class="p-2.5 rounded bg-white border border-indigo-200"><div class="text-lg font-black text-indigo-700">200k/m</div><div class="text-[10px] text-slate-600">Batch Ingestion</div></div>
            <div class="p-2.5 rounded bg-white border border-indigo-200"><div class="text-lg font-black text-indigo-700">&lt;90s</div><div class="text-[10px] text-slate-600">Auto-Healing SLA</div></div>
          </div>
        </div>`,
    qa: `<div class="space-y-4">
          <div class="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-0.5 rounded bg-emerald-700 text-white text-[10px] font-bold uppercase">QA Rigor</span>
              <span class="font-bold text-emerald-900 text-sm">Chaos Testing: Drop Webhook, Duplikat Callback, &amp; Cutoff Boundary</span>
            </div>
            <p class="text-slate-800 text-xs leading-relaxed">
              Pengujian rekonsiliasi pembayaran menggunakan framework injeksi anomali jaringan. Menguji ketahanan engine saat webhook terputus di tengah jalan, callback bank diterima secara tidak berurutan (out-of-order), atau mutasi rekening tertunda melewati batas cutoff harian.
            </p>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div class="p-2 rounded bg-white border border-emerald-200"><div class="text-lg font-black text-emerald-700">100%</div><div class="text-[10px] text-slate-600">Idempotency Pass</div></div>
            <div class="p-2 rounded bg-white border border-emerald-200"><div class="text-lg font-black text-emerald-700">0.00%</div><div class="text-[10px] text-slate-600">Balance Discrepancy</div></div>
            <div class="p-2 rounded bg-white border border-emerald-200"><div class="text-lg font-black text-emerald-700">30+</div><div class="text-[10px] text-slate-600">Chaos Edge Cases</div></div>
            <div class="p-2 rounded bg-white border border-emerald-200"><div class="text-lg font-black text-emerald-700">100%</div><div class="text-[10px] text-slate-600">SNAP Compliance</div></div>
          </div>
        </div>`
  },
  telematics: {
    analyst: `<div class="space-y-4">
          <div class="p-4 rounded-lg bg-blue-50 border border-blue-200">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-0.5 rounded bg-blue-700 text-white text-[10px] font-bold uppercase">Analyst Lens</span>
              <span class="font-bold text-blue-900 text-sm">IoT Telematics &amp; Real-Time Fuel Siphoning Detection</span>
            </div>
            <p class="text-slate-800 text-xs leading-relaxed">
              Armada 1.500+ bus dan truk logistik nasional menyerap 38%-45% Opex pada konsumsi BBM Solar. Peran System Analyst merancang aturan deteksi pencurian bahan bakar seketika, pemfilteran noise guncangan jalanan (sloshing), koridor geofence izin trayek resmi Ditjen Hubdat, dan rekonsiliasi struk SPBU Pertamina.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="p-3 rounded bg-white border border-blue-200">
              <div class="font-bold text-blue-900 text-xs mb-2">Regulasi &amp; Ground Truth</div>
              <ul class="text-[11px] text-slate-700 space-y-1 list-disc pl-4">
                <li><strong>Kepmenhub KM 158/2021:</strong> Standarisasi GPS pelacakan angkutan umum.</li>
                <li><strong>Peraturan BPH Migas 04/2020:</strong> Pengawasan BBM solar subsidi PSO.</li>
                <li><strong>SAE J1939 / CAN-bus:</strong> Ekstraksi data ECU analog &amp; digital.</li>
                <li><strong>Struk SPBU API:</strong> Triangulasi nota pembelian vs kenaikan tangki.</li>
              </ul>
            </div>
            <div class="p-3 rounded bg-white border border-blue-200">
              <div class="font-bold text-blue-900 text-xs mb-2">Rule Engine Kunci</div>
              <ul class="text-[11px] text-slate-700 space-y-1 list-disc pl-4">
                <li><strong>Fuel Theft Rule:</strong> Drop &gt;8L dalam &lt;180s saat mesin OFF &rarr; Alert P1 (&lt;45s).</li>
                <li><strong>Kalman Filter:</strong> Mereduksi false alarm sloshing hingga &lt;0.12%.</li>
                <li><strong>Geofence Corridor:</strong> Buffer 250m sepanjang izin trayek resmi.</li>
                <li><strong>SPBU Voucher Check:</strong> Deteksi struk fiktif tanpa kenaikan delta tangki.</li>
              </ul>
            </div>
          </div>
        </div>`,
    dev: `<div class="space-y-4">
          <div class="p-4 rounded-lg bg-indigo-50 border border-indigo-200">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-0.5 rounded bg-indigo-700 text-white text-[10px] font-bold uppercase">Developer Lens</span>
              <span class="font-bold text-indigo-900 text-sm">MQTT Telemetry Pipeline &amp; 1D Kalman Filter</span>
            </div>
            <p class="text-slate-800 text-xs leading-relaxed">
              Pipeline streaming menerima 5.000 ping/detik dari 1.500 unit armada via broker MQTT/Kafka dengan latensi P95 &lt;45ms. Algoritma 1D Kalman Filter diimplementasikan secara kontinu untuk membersihkan sinyal analog sensor bahan bakar.
            </p>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div class="p-2.5 rounded bg-white border border-indigo-200"><div class="text-lg font-black text-indigo-700">Rp 4.2 M</div><div class="text-[10px] text-slate-600">Annual Fuel Saved</div></div>
            <div class="p-2.5 rounded bg-white border border-indigo-200"><div class="text-lg font-black text-indigo-700">&lt;45s</div><div class="text-[10px] text-slate-600">Theft Alert Latency</div></div>
            <div class="p-2.5 rounded bg-white border border-indigo-200"><div class="text-lg font-black text-indigo-700">&lt;0.12%</div><div class="text-[10px] text-slate-600">False Positive Rate</div></div>
            <div class="p-2.5 rounded bg-white border border-indigo-200"><div class="text-lg font-black text-indigo-700">2.2 Bulan</div><div class="text-[10px] text-slate-600">Payback Period</div></div>
          </div>

          <pre class="font-mono text-[11px] bg-slate-950 text-indigo-300 p-3 rounded overflow-x-auto">// Fuel Siphoning Alert Detection Logic
if (engineStatus === "OFF" &amp;&amp; speed === 0) {
  const deltaFuel = lastKalmanLevel - currentKalmanLevel;
  const elapsedSeconds = (currentTimestamp - lastTimestamp) / 1000;
  if (deltaFuel &gt; 8.0 &amp;&amp; elapsedSeconds &lt;= 180) {
    await dispatchCriticalAlert("FUEL_SIPHONING", { busId, deltaFuel, location });
  }
}</pre>
        </div>`,
    qa: ``
  }
};

export const sdlcDataEn: Record<string, SdlcProjectData> = {
  pumk: {
    analyst: `<div class="space-y-4">
          <div class="p-4 rounded-lg bg-blue-50 border border-blue-200">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-0.5 rounded bg-blue-700 text-white text-[10px] font-bold uppercase">Analyst Lens</span>
              <span class="font-bold text-blue-900 text-sm">PUMK - TJSL/PKBL Fund Management &amp; Mitra Unique ID</span>
            </div>
            <p class="text-slate-800 text-xs leading-relaxed">
              The PUMK system for state-owned enterprise transit was architected to govern TJSL/PKBL fund disbursements to small and micro business partners across nationwide branches. The Analyst role defined end-to-end business requirements, mapped processes from headquarters to operational branch units, and ensured seamless legacy Excel migration into PostgreSQL without data corruption.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="p-3 rounded bg-white border border-blue-200">
              <div class="font-bold text-blue-900 text-xs mb-2">Stakeholder Mapping</div>
              <ul class="text-[11px] text-slate-700 space-y-1 list-disc pl-4">
                <li><strong>HQ TJSL/PKBL Unit:</strong> Allocates budget quotas and overall corporate program policy.</li>
                <li><strong>Business Unit (BU):</strong> Conducts partner legal and financial viability verifications.</li>
                <li><strong>Branch Operations:</strong> Submits new partner applicants and monitors disbursement.</li>
                <li><strong>Internal Audit &amp; OJK:</strong> Requires real-time compliance reporting &amp; full audit trails.</li>
              </ul>
            </div>
            <div class="p-3 rounded bg-white border border-blue-200">
              <div class="font-bold text-blue-900 text-xs mb-2">Core BRD Specifications</div>
              <ul class="text-[11px] text-slate-700 space-y-1 list-disc pl-4">
                <li>BRD-PUMK-01: Deterministic Unique Partner ID Generation</li>
                <li>BRD-PUMK-02: Citizen ID (NIK) Verification against Registry</li>
                <li>BRD-PUMK-03: Multi-tier Proposal Approval Workflow</li>
                <li>BRD-PUMK-04: Installment &amp; Repayment Realization Tracking</li>
                <li>BRD-PUMK-05: Real-Time Regulatory OJK TJSL/PKBL Reporting</li>
              </ul>
            </div>
          </div>

          <div class="p-3 rounded bg-blue-50 border border-blue-200">
            <div class="font-bold text-blue-900 text-xs mb-2">Data Flow Pipeline: Excel &rarr; PostgreSQL</div>
            <div class="grid grid-cols-5 gap-2 text-center text-[10px]">
              <div class="p-2 rounded bg-white border border-blue-200"><strong>1. Legacy Excel</strong><br/><span class="text-slate-500">Unstructured Sheets</span></div>
              <div class="self-center text-blue-700 font-bold">&rarr;</div>
              <div class="p-2 rounded bg-white border border-blue-200"><strong>2. ETL Pipeline</strong><br/><span class="text-slate-500">Normalization &amp; Dedup</span></div>
              <div class="self-center text-blue-700 font-bold">&rarr;</div>
              <div class="p-2 rounded bg-white border border-blue-200"><strong>3. PostgreSQL</strong><br/><span class="text-slate-500">ref_mitra, tr_tjsl</span></div>
            </div>
          </div>

          <div class="p-3 rounded bg-slate-50 border border-slate-200">
            <div class="font-bold text-slate-900 text-xs mb-2">Entity Relationship Highlights</div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10px]">
              <div class="p-2 rounded bg-white border border-slate-300"><strong>ref_mitra</strong><br/>id, partner_code, nik, business_name, branch_id</div>
              <div class="p-2 rounded bg-white border border-slate-300"><strong>tr_application</strong><br/>id, partner_id, amount, approval_status</div>
              <div class="p-2 rounded bg-white border border-slate-300"><strong>tr_payment</strong><br/>id, application_id, cycle, principal_amount</div>
            </div>
          </div>

          <div class="p-3 rounded bg-blue-50 border border-blue-200">
            <div class="font-bold text-blue-900 text-xs mb-2">Compliance Requirements (OJK Audit Governance)</div>
            <p class="text-slate-800 text-xs leading-relaxed">
              TJSL/PKBL statements must adhere to strict regulatory guidelines: quarterly disbursement quotas, active beneficiary counts, economic sector classification, and audited social impacts. The system provides automated Excel/CSV exports utilizing immutable primary keys so external auditors can run multi-period audits without ID mismatches.
            </p>
          </div>
        </div>`,
    dev: `<div class="space-y-4">
          <div class="p-4 rounded-lg bg-indigo-50 border border-indigo-200">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-0.5 rounded bg-indigo-700 text-white text-[10px] font-bold uppercase">Developer Lens</span>
              <span class="font-bold text-indigo-900 text-sm">PUMK Architecture &amp; Concurrency Control</span>
            </div>
            <p class="text-slate-800 text-xs leading-relaxed">
              Engineered with Laravel 12, PostgreSQL 15, and Redis caching for ultra-fast master data lookups. Security integrates corporate SSO with role-based access control (RBAC) segregated by branch and central authority. Pessimistic locking (<code>lockForUpdate()</code>) mitigates race conditions when dozens of nationwide branches generate partner codes simultaneously.
            </p>
          </div>

          <div class="flex flex-wrap gap-2">
            <span class="px-2 py-1 rounded bg-slate-800 text-indigo-300 text-[10px] font-bold">Laravel 12</span>
            <span class="px-2 py-1 rounded bg-slate-800 text-indigo-300 text-[10px] font-bold">PostgreSQL 15</span>
            <span class="px-2 py-1 rounded bg-slate-800 text-indigo-300 text-[10px] font-bold">Redis</span>
            <span class="px-2 py-1 rounded bg-slate-800 text-indigo-300 text-[10px] font-bold">SSO OAuth2</span>
            <span class="px-2 py-1 rounded bg-slate-800 text-indigo-300 text-[10px] font-bold">RBAC</span>
            <span class="px-2 py-1 rounded bg-slate-800 text-indigo-300 text-[10px] font-bold">PHPUnit</span>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div class="p-2.5 rounded bg-white border border-indigo-200"><div class="text-lg font-black text-indigo-700">99.9%</div><div class="text-[10px] text-slate-600">Uptime SLA</div></div>
            <div class="p-2.5 rounded bg-white border border-indigo-200"><div class="text-lg font-black text-indigo-700">&lt;500ms</div><div class="text-[10px] text-slate-600">Lock Latency</div></div>
            <div class="p-2.5 rounded bg-white border border-indigo-200"><div class="text-lg font-black text-indigo-700">50+</div><div class="text-[10px] text-slate-600">Active Branches</div></div>
            <div class="p-2.5 rounded bg-white border border-indigo-200"><div class="text-lg font-black text-indigo-700">0</div><div class="text-[10px] text-slate-600">Duplicate Codes</div></div>
          </div>

          <div class="p-3 rounded bg-slate-50 border border-slate-200">
            <div class="font-bold text-indigo-900 text-xs mb-2">Database Schema Highlights</div>
            <ul class="text-[11px] text-slate-700 space-y-1 list-disc pl-4">
              <li><strong>ref_mitra:</strong> Serial primary key + unique partner_code, indexed on NIK and branch_id.</li>
              <li><strong>tr_pengajuan:</strong> Foreign key to ref_mitra, deterministic approval state machine.</li>
              <li><strong>tr_pembayaran:</strong> Range-partitioned by year for multi-decade historical query speed.</li>
              <li><strong>ref_users_shadow:</strong> Maps SSO enterprise identities into local role tokens without storing passwords.</li>
            </ul>
          </div>

          <pre class="font-mono text-[11px] bg-slate-950 text-indigo-300 p-3 rounded overflow-x-auto">// MitraController.php - Pessimistic row locking for atomic code generation
DB::transaction(function () use ($request) {
    $last = RefMitra::whereYear('created_at', now()->year)
        ->lockForUpdate()
        ->orderBy('urutan', 'desc')
        ->first();

    $urutan = $last ? $last->urutan + 1 : 1;
    $code   = sprintf('PUMK-%s-%03d', now()->year, $urutan);

    return RefMitra::create(array_merge($request->validated(), [
        'kode_mitra'      => $code,
        'urutan'          => $urutan,
        'status_approval' => 'DRAFT',
    ]));
}, 5);</pre>
        </div>`,
    qa: `<div class="space-y-4">
          <div class="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-0.5 rounded bg-emerald-700 text-white text-[10px] font-bold uppercase">QA Rigor</span>
              <span class="font-bold text-emerald-900 text-sm">PUMK Test Strategy &amp; Quality Gates</span>
            </div>
            <p class="text-slate-800 text-xs leading-relaxed">
              The PUMK quality assurance framework spans unit testing, SSO integration verification, end-to-end partner registration journeys, concurrency stress benchmarks, and regression gates before production release. Targets &ge; 80% unit test coverage and zero P1 defects escaping to production.
            </p>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div class="p-2 rounded bg-white border border-emerald-200"><div class="text-lg font-black text-emerald-700">&ge;80%</div><div class="text-[10px] text-slate-600">Unit Coverage</div></div>
            <div class="p-2 rounded bg-white border border-emerald-200"><div class="text-lg font-black text-emerald-700">100</div><div class="text-[10px] text-slate-600">Concurrent Users</div></div>
            <div class="p-2 rounded bg-white border border-emerald-200"><div class="text-lg font-black text-emerald-700">&lt;2s</div><div class="text-[10px] text-slate-600">E2E Latency</div></div>
            <div class="p-2 rounded bg-white border border-emerald-200"><div class="text-lg font-black text-emerald-700">0</div><div class="text-[10px] text-slate-600">P1 Production Bug</div></div>
          </div>

          <div class="p-3 rounded bg-slate-50 border border-slate-200">
            <div class="font-bold text-emerald-900 text-xs mb-2">SSO Integration Test Scenarios</div>
            <ul class="text-[11px] text-slate-700 space-y-1 list-disc pl-4">
              <li>Valid corporate NIK returns signed JWT and provisions shadow user record automatically.</li>
              <li>Unregistered SSO user rejected with HTTP 401 and prevents shadow record creation.</li>
              <li>Expired JWT tokens trigger clean redirection to OAuth authorization server with state preserve.</li>
              <li>Branch roles are strictly constrained via PostgreSQL row-level security policies.</li>
            </ul>
          </div>
        </div>`
  },
  push: {
    analyst: `<div class="space-y-4">
          <div class="p-4 rounded-lg bg-blue-50 border border-blue-200">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-0.5 rounded bg-blue-700 text-white text-[10px] font-bold uppercase">Analyst Lens</span>
              <span class="font-bold text-blue-900 text-sm">Push Request - Change Management &amp; Deployment Governance</span>
            </div>
            <p class="text-slate-800 text-xs leading-relaxed">
              Push Request Tracker is an ITIL-aligned change management and deployment governance platform. It captures every code push, pull request merge, commit SHA, and staging/production deployment into an immutable audit trail to eliminate unauthorized changes and guarantee strict compliance with enterprise change advisory boards.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="p-3 rounded bg-white border border-blue-200">
              <div class="font-bold text-blue-900 text-xs mb-2">ITIL Change Classifications</div>
              <ul class="text-[11px] text-slate-700 space-y-1 list-disc pl-4">
                <li><strong>Standard:</strong> Low-risk operational patches pre-authorized by engineering leads.</li>
                <li><strong>Normal:</strong> Feature increments undergoing peer review, SIT testing, and QA sign-off.</li>
                <li><strong>Emergency:</strong> Hotfixes addressing P1 production incidents with post-audit review.</li>
                <li><strong>Major:</strong> Breaking architectural upgrades requiring CAB approval and rollback plan.</li>
              </ul>
            </div>
            <div class="p-3 rounded bg-white border border-blue-200">
              <div class="font-bold text-blue-900 text-xs mb-2">Audit Trail Rigor</div>
              <ul class="text-[11px] text-slate-700 space-y-1 list-disc pl-4">
                <li>Immutable Git commit SHA-1/SHA-256 capture.</li>
                <li>Author, peer reviewer, and deployment approver logging.</li>
                <li>Microsecond-precision timestamps across push and release.</li>
                <li>Automated file diff tracking and secret leak scanning.</li>
              </ul>
            </div>
          </div>
        </div>`,
    dev: `<div class="space-y-4">
          <div class="p-4 rounded-lg bg-indigo-50 border border-indigo-200">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-0.5 rounded bg-indigo-700 text-white text-[10px] font-bold uppercase">Developer Lens</span>
              <span class="font-bold text-indigo-900 text-sm">Event-Driven Webhooks &amp; Git Diff Streaming Architecture</span>
            </div>
            <p class="text-slate-800 text-xs leading-relaxed">
              Constructed around an event-driven webhook ingestion pipeline that validates HMAC-SHA256 signatures on every incoming GitHub/GitLab webhook. The service parses raw commit diffs asynchronously via queue workers, updates deployment statues, and broadcasts live release feeds to dashboard clients via WebSockets.
            </p>
          </div>

          <div class="flex flex-wrap gap-2">
            <span class="px-2 py-1 rounded bg-slate-800 text-indigo-300 text-[10px] font-bold">Node.js / Express</span>
            <span class="px-2 py-1 rounded bg-slate-800 text-indigo-300 text-[10px] font-bold">GitHub Webhooks API</span>
            <span class="px-2 py-1 rounded bg-slate-800 text-indigo-300 text-[10px] font-bold">PostgreSQL</span>
            <span class="px-2 py-1 rounded bg-slate-800 text-indigo-300 text-[10px] font-bold">HMAC-SHA256</span>
            <span class="px-2 py-1 rounded bg-slate-800 text-indigo-300 text-[10px] font-bold">Redis Streams</span>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div class="p-2.5 rounded bg-white border border-indigo-200"><div class="text-lg font-black text-indigo-700">&lt;200ms</div><div class="text-[10px] text-slate-600">Webhook Processing</div></div>
            <div class="p-2.5 rounded bg-white border border-indigo-200"><div class="text-lg font-black text-indigo-700">100%</div><div class="text-[10px] text-slate-600">HMAC Verified</div></div>
            <div class="p-2.5 rounded bg-white border border-indigo-200"><div class="text-lg font-black text-indigo-700">500+</div><div class="text-[10px] text-slate-600">Deployments Tracked</div></div>
            <div class="p-2.5 rounded bg-white border border-indigo-200"><div class="text-lg font-black text-indigo-700">0</div><div class="text-[10px] text-slate-600">Lost Events</div></div>
          </div>
        </div>`,
    qa: `<div class="space-y-4">
          <div class="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-0.5 rounded bg-emerald-700 text-white text-[10px] font-bold uppercase">QA Rigor</span>
              <span class="font-bold text-emerald-900 text-sm">Webhook Signature Verification &amp; Security Quality Gates</span>
            </div>
            <p class="text-slate-800 text-xs leading-relaxed">
              QA test suites test webhook replay attacks, forged HMAC headers, out-of-order event bursts during massive release merges, and automated secret token detection before code ever transitions to production deployment pipelines.
            </p>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div class="p-2 rounded bg-white border border-emerald-200"><div class="text-lg font-black text-emerald-700">100%</div><div class="text-[10px] text-slate-600">Replay Defense</div></div>
            <div class="p-2 rounded bg-white border border-emerald-200"><div class="text-lg font-black text-emerald-700">0</div><div class="text-[10px] text-slate-600">Secret Leaks</div></div>
            <div class="p-2 rounded bg-white border border-emerald-200"><div class="text-lg font-black text-emerald-700">1,000</div><div class="text-[10px] text-slate-600">Webhook Stress (rps)</div></div>
            <div class="p-2 rounded bg-white border border-emerald-200"><div class="text-lg font-black text-emerald-700">&lt;50ms</div><div class="text-[10px] text-slate-600">Validation SLA</div></div>
          </div>
        </div>`
  },
  'enterprise-docs': {
    analyst: `<div class="space-y-4">
          <div class="p-4 rounded-lg bg-blue-50 border border-blue-200">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-0.5 rounded bg-blue-700 text-white text-[10px] font-bold uppercase">Analyst Lens</span>
              <span class="font-bold text-blue-900 text-sm">Enterprise Portfolio - System Specification Governance &amp; GCG Compliance</span>
            </div>
            <p class="text-slate-800 text-xs leading-relaxed">
              Standardized enterprise architecture governance encompassing 40+ operational and financial system modules. Responsible for authoring formal Software Requirements Specifications (SRS), bidirectional traceability matrices linking state-owned corporate governance (GCG) regulations to user stories, formal BPMN 2.0 multi-actor swimlanes, and standardized enterprise data dictionaries.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="p-3 rounded bg-white border border-blue-200">
              <div class="font-bold text-blue-900 text-xs mb-2">Traceability Framework</div>
              <ul class="text-[11px] text-slate-700 space-y-1 list-disc pl-4">
                <li><strong>State Regulatory Compliance:</strong> Audit policies, separation of duties (SoD).</li>
                <li><strong>Business Requirements (BRD):</strong> Operational, HR, and financial division needs.</li>
                <li><strong>System Specs (SRS):</strong> Functional, non-functional, and relational data models.</li>
                <li><strong>Verification Matrix:</strong> Direct 1-to-1 mapping of requirements to SIT/UAT cases.</li>
              </ul>
            </div>
            <div class="p-3 rounded bg-white border border-blue-200">
              <div class="font-bold text-blue-900 text-xs mb-2">Architectural Standards</div>
              <ul class="text-[11px] text-slate-700 space-y-1 list-disc pl-4">
                <li>BPMN 2.0 multi-lane cross-functional process diagrams.</li>
                <li>Rigorous Third Normal Form (3NF) relational database schemas.</li>
                <li>Enterprise data dictionaries eliminating schema ambiguities.</li>
                <li>OpenAPI 3.1 contract-first REST specifications.</li>
              </ul>
            </div>
          </div>
        </div>`,
    dev: `<div class="space-y-4">
          <div class="p-4 rounded-lg bg-indigo-50 border border-indigo-200">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-0.5 rounded bg-indigo-700 text-white text-[10px] font-bold uppercase">Developer Lens</span>
              <span class="font-bold text-indigo-900 text-sm">Modular Monolith Architecture &amp; Schema-First Contracts</span>
            </div>
            <p class="text-slate-800 text-xs leading-relaxed">
              Enterprise architecture architected around domain-driven design (DDD) principles using modular monolith and isolated microservices patterns. All inter-subsystem communication is strictly governed by schema-first contracts (OpenAPI / JSON Schema) to maintain backward compatibility and eliminate breaking changes during staged releases.
            </p>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div class="p-2.5 rounded bg-white border border-indigo-200"><div class="text-lg font-black text-indigo-700">40+</div><div class="text-[10px] text-slate-600">Formal Specs</div></div>
            <div class="p-2.5 rounded bg-white border border-indigo-200"><div class="text-lg font-black text-indigo-700">&lt;4%</div><div class="text-[10px] text-slate-600">Rework Rate</div></div>
            <div class="p-2.5 rounded bg-white border border-indigo-200"><div class="text-lg font-black text-indigo-700">100%</div><div class="text-[10px] text-slate-600">Contract Match</div></div>
            <div class="p-2.5 rounded bg-white border border-indigo-200"><div class="text-lg font-black text-indigo-700">0</div><div class="text-[10px] text-slate-600">Schema Drift</div></div>
          </div>
        </div>`,
    qa: `<div class="space-y-4">
          <div class="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-0.5 rounded bg-emerald-700 text-white text-[10px] font-bold uppercase">QA Rigor</span>
              <span class="font-bold text-emerald-900 text-sm">SIT/UAT Governance &amp; Quality Gates</span>
            </div>
            <p class="text-slate-800 text-xs leading-relaxed">
              Standardized software testing lifecycle spanning unit test coverage, system integration testing (SIT), user acceptance testing (UAT), and concurrency load benchmarking. Every milestone release is gated against a strict zero P1/P2 defect policy before receiving production deployment sign-off.
            </p>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div class="p-2 rounded bg-white border border-emerald-200"><div class="text-lg font-black text-emerald-700">42+</div><div class="text-[10px] text-slate-600">Formal Test Cases</div></div>
            <div class="p-2 rounded bg-white border border-emerald-200"><div class="text-lg font-black text-emerald-700">100%</div><div class="text-[10px] text-slate-600">SIT Sign-Off</div></div>
            <div class="p-2 rounded bg-white border border-emerald-200"><div class="text-lg font-black text-emerald-700">0</div><div class="text-[10px] text-slate-600">P1 in Production</div></div>
            <div class="p-2 rounded bg-white border border-emerald-200"><div class="text-lg font-black text-emerald-700">5 Mins</div><div class="text-[10px] text-slate-600">Rollback SLA</div></div>
          </div>
        </div>`
  },
  'approval-engine': {
    analyst: `<div class="space-y-4">
          <div class="p-4 rounded-lg bg-blue-50 border border-blue-200">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-0.5 rounded bg-blue-700 text-white text-[10px] font-bold uppercase">Analyst Lens</span>
              <span class="font-bold text-blue-900 text-sm">Dynamic Multi-Tier Approval Workflow &amp; Acting Officer Delegation Engine</span>
            </div>
            <p class="text-slate-800 text-xs leading-relaxed">
              Architected to eliminate financial and operational decision bottlenecks across hierarchical enterprise structures. Features dynamic approval routing based on transaction values (&lt;$50k up to &gt;$5M), automated Acting Officer (Pjs) delegation windows with automatic role reclamation, 24-hour SLA auto-escalations, and tamper-evident SHA-256 Merkle audit chains.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="p-3 rounded bg-white border border-blue-200">
              <div class="font-bold text-blue-900 text-xs mb-2">Financial Authority Matrix</div>
              <ul class="text-[11px] text-slate-700 space-y-1 list-disc pl-4">
                <li><strong>Tier 1 (&lt;Rp 50M):</strong> Branch Supervisor (1-step single approval).</li>
                <li><strong>Tier 2 (Rp 50M - Rp 500M):</strong> Operations Division Manager (2-step approval).</li>
                <li><strong>Tier 3 (Rp 500M - Rp 5B):</strong> General Manager / VP (3-step multi-tier approval).</li>
                <li><strong>Tier 4 (&gt;Rp 5B):</strong> Board of Directors (4-step final executive authorization).</li>
              </ul>
            </div>
            <div class="p-3 rounded bg-white border border-blue-200">
              <div class="font-bold text-blue-900 text-xs mb-2">Business Rules &amp; Fraud Prevention</div>
              <ul class="text-[11px] text-slate-700 space-y-1 list-disc pl-4">
                <li><strong>Separation of Duties (SoD):</strong> Creators are strictly forbidden from approving their own requests.</li>
                <li><strong>Acting Officer Auto-Revert:</strong> Delegation rights automatically expire upon term completion.</li>
                <li><strong>Anti-Loop Delegation:</strong> Prevents cyclical delegation loops (User A &rarr; B &rarr; A).</li>
                <li><strong>SLA Escalation:</strong> Unaddressed tickets &gt;24h automatically escalate to the supervisor tier.</li>
              </ul>
            </div>
          </div>
        </div>`,
    dev: `<div class="space-y-4">
          <div class="p-4 rounded-lg bg-indigo-50 border border-indigo-200">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-0.5 rounded bg-indigo-700 text-white text-[10px] font-bold uppercase">Developer Lens</span>
              <span class="font-bold text-indigo-900 text-sm">Optimistic Locking, Finite State Machine &amp; Distributed Mutex</span>
            </div>
            <p class="text-slate-800 text-xs leading-relaxed">
              Built on a deterministic finite state machine with dual race-condition defenses: database-level Optimistic Locking using an incremental <code>version</code> column, paired with a Redis distributed mutex lock to prevent concurrent double-approvals when two managers submit at the exact same millisecond.
            </p>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div class="p-2.5 rounded bg-white border border-indigo-200"><div class="text-lg font-black text-indigo-700">0%</div><div class="text-[10px] text-slate-600">Double-Approval Leak</div></div>
            <div class="p-2.5 rounded bg-white border border-indigo-200"><div class="text-lg font-black text-indigo-700">&lt;15ms</div><div class="text-[10px] text-slate-600">Transition Latency</div></div>
            <div class="p-2.5 rounded bg-white border border-indigo-200"><div class="text-lg font-black text-indigo-700">10,000+</div><div class="text-[10px] text-slate-600">Daily Trans</div></div>
            <div class="p-2.5 rounded bg-white border border-indigo-200"><div class="text-lg font-black text-indigo-700">100%</div><div class="text-[10px] text-slate-600">Audit Verifiable</div></div>
          </div>

          <pre class="font-mono text-[11px] bg-slate-950 text-indigo-300 p-3 rounded overflow-x-auto">// ApprovalEngineService.php - State transition with Optimistic Locking
DB::transaction(function () use ($ticketId, $approverId, $expectedVersion) {
    $ticket = Ticket::where('id', $ticketId)
        ->where('version', $expectedVersion)
        ->lockForUpdate()
        ->firstOrFail();

    $this->guardDelegationAuthority($ticket, $approverId);

    $ticket->current_tier += 1;
    $ticket->version      += 1;
    $ticket->status        = $ticket->current_tier > $ticket->max_tier ? 'APPROVED' : 'IN_REVIEW';
    $ticket->save();

    AuditLedger::append([
        'ticket_id' => $ticket->id,
        'actor_id'  => $approverId,
        'prev_hash' => $ticket->last_audit_hash,
        'signature' => hash('sha256', $ticket->id . $approverId . now())
    ]);
});</pre>
        </div>`,
    qa: `<div class="space-y-4">
          <div class="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-0.5 rounded bg-emerald-700 text-white text-[10px] font-bold uppercase">QA Rigor</span>
              <span class="font-bold text-emerald-900 text-sm">Concurrency Stress Benchmarking &amp; Edge Case Verification</span>
            </div>
            <p class="text-slate-800 text-xs leading-relaxed">
              Testing regimes concentrate on high-concurrency stress testing: simulated simultaneous dual-approval clicks, boundary value testing around financial limits, delegation loops, and verified emergency 5-minute rollback protocols.
            </p>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div class="p-2 rounded bg-white border border-emerald-200"><div class="text-lg font-black text-emerald-700">0</div><div class="text-[10px] text-slate-600">Race Condition Pass</div></div>
            <div class="p-2 rounded bg-white border border-emerald-200"><div class="text-lg font-black text-emerald-700">500 rps</div><div class="text-[10px] text-slate-600">Burst Load</div></div>
            <div class="p-2 rounded bg-white border border-emerald-200"><div class="text-lg font-black text-emerald-700">&lt;5 Mins</div><div class="text-[10px] text-slate-600">Rollback SLA</div></div>
            <div class="p-2 rounded bg-white border border-emerald-200"><div class="text-lg font-black text-emerald-700">100%</div><div class="text-[10px] text-slate-600">Merkle Integrity</div></div>
          </div>
        </div>`
  },
  seatlock: {
    analyst: `<div class="space-y-4">
          <div class="p-4 rounded-lg bg-blue-50 border border-blue-200">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-0.5 rounded bg-blue-700 text-white text-[10px] font-bold uppercase">Analyst Lens</span>
              <span class="font-bold text-blue-900 text-sm">Seat Lock &amp; Distributed Inventory Reservation Engine</span>
            </div>
            <p class="text-slate-800 text-xs leading-relaxed">
              Designed to solve double-booking anomalies during peak holiday travel booking spikes across nationwide bus fleets. Enforces an immutable 10-minute hold TTL per seat, automated expiration watchdogs returning abandoned seats to inventory, and strict zero overselling guarantees to eliminate customer dispute penalties.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="p-3 rounded bg-white border border-blue-200">
              <div class="font-bold text-blue-900 text-xs mb-2">Seat State Machine Lifecycle</div>
              <ul class="text-[11px] text-slate-700 space-y-1 list-disc pl-4">
                <li><strong>AVAILABLE:</strong> Open for all passengers to select.</li>
                <li><strong>LOCKED (10m TTL):</strong> Mutex-locked by specific user session during checkout.</li>
                <li><strong>CONFIRMED:</strong> Payment verified via SNAP BI; ticket issued permanently.</li>
                <li><strong>EXPIRED / RELEASED:</strong> Automatic watchdog returns unconfirmed seats to AVAILABLE.</li>
              </ul>
            </div>
            <div class="p-3 rounded bg-white border border-blue-200">
              <div class="font-bold text-blue-900 text-xs mb-2">Business KPI Targets</div>
              <ul class="text-[11px] text-slate-700 space-y-1 list-disc pl-4">
                <li>0% Double-booking rate across millions of reservations.</li>
                <li>Sub-second hold confirmation even at 10,000 requests/second.</li>
                <li>Immediate seat recovery on abandoned payment drops.</li>
              </ul>
            </div>
          </div>
        </div>`,
    dev: `<div class="space-y-4">
          <div class="p-4 rounded-lg bg-indigo-50 border border-indigo-200">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-0.5 rounded bg-indigo-700 text-white text-[10px] font-bold uppercase">Developer Lens</span>
              <span class="font-bold text-indigo-900 text-sm">Redis SETNX Mutex Lock &amp; Distributed Concurrency Mitigation</span>
            </div>
            <p class="text-slate-800 text-xs leading-relaxed">
              Engineered with Redis distributed locks using atomic <code>SETNX</code> with deterministic 600-second TTL. If Redis encounters network partitions, an automated fallback layer delegates locking to PostgreSQL row-level pessimistic locks (<code>SELECT FOR UPDATE</code>) with zero downtime and strict ACID guarantees.
            </p>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div class="p-2.5 rounded bg-white border border-indigo-200"><div class="text-lg font-black text-indigo-700">10,000</div><div class="text-[10px] text-slate-600">Peak req/sec</div></div>
            <div class="p-2.5 rounded bg-white border border-indigo-200"><div class="text-lg font-black text-indigo-700">&lt;8ms</div><div class="text-[10px] text-slate-600">Lock Acquisition</div></div>
            <div class="p-2.5 rounded bg-white border border-indigo-200"><div class="text-lg font-black text-indigo-700">600s</div><div class="text-[10px] text-slate-600">Deterministic TTL</div></div>
            <div class="p-2.5 rounded bg-white border border-indigo-200"><div class="text-lg font-black text-indigo-700">0%</div><div class="text-[10px] text-slate-600">Double Booking</div></div>
          </div>
        </div>`,
    qa: `<div class="space-y-4">
          <div class="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-0.5 rounded bg-emerald-700 text-white text-[10px] font-bold uppercase">QA Rigor</span>
              <span class="font-bold text-emerald-900 text-sm">10,000 req/s Concurrency Stress Testing &amp; Network Partition Simulation</span>
            </div>
            <p class="text-slate-800 text-xs leading-relaxed">
              Load tested via k6 and JMeter sending up to 10,000 simultaneous hold requests against the exact same seat row. Verified that exactly one reservation succeeds while 9,999 requests receive clean HTTP 409 Conflict notices without memory exhaustion or lock deadlocks.
            </p>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div class="p-2 rounded bg-white border border-emerald-200"><div class="text-lg font-black text-emerald-700">0</div><div class="text-[10px] text-slate-600">Double Bookings</div></div>
            <div class="p-2 rounded bg-white border border-emerald-200"><div class="text-lg font-black text-emerald-700">10k rps</div><div class="text-[10px] text-slate-600">Load Benchmark</div></div>
            <div class="p-2 rounded bg-white border border-emerald-200"><div class="text-lg font-black text-emerald-700">100%</div><div class="text-[10px] text-slate-600">TTL Release Rate</div></div>
            <div class="p-2 rounded bg-white border border-emerald-200"><div class="text-lg font-black text-emerald-700">&lt;50ms</div><div class="text-[10px] text-slate-600">p99 Latency</div></div>
          </div>
        </div>`
  },
  'payment-recon': {
    analyst: `<div class="space-y-4">
          <div class="p-4 rounded-lg bg-blue-50 border border-blue-200">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-0.5 rounded bg-blue-700 text-white text-[10px] font-bold uppercase">Analyst Lens</span>
              <span class="font-bold text-blue-900 text-sm">Multi-Bank Payment Reconciliation &amp; Automated Settlement (SNAP BI Standard)</span>
            </div>
            <p class="text-slate-800 text-xs leading-relaxed">
              Engineered an automated 3-way financial reconciliation engine (Three-Way Matching) reconciling Internal Booking Ledgers, Payment Gateway Webhook Logs, and Core Bank MT940 statement mutations. Complies with Bank Indonesia SNAP standards, eliminating manual ledger discrepancies and slashing reconciliation time from 40 hours to 12 minutes.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="p-3 rounded bg-white border border-blue-200">
              <div class="font-bold text-blue-900 text-xs mb-2">Three-Way Matching Pillars</div>
              <ul class="text-[11px] text-slate-700 space-y-1 list-disc pl-4">
                <li><strong>Pillar 1 (Internal Orders):</strong> Ticket and reservation transaction records.</li>
                <li><strong>Pillar 2 (Gateway Webhook):</strong> Encrypted webhook callbacks acknowledging capture.</li>
                <li><strong>Pillar 3 (Bank Statements):</strong> Real bank deposit mutations verified D+1.</li>
              </ul>
            </div>
            <div class="p-3 rounded bg-white border border-blue-200">
              <div class="font-bold text-blue-900 text-xs mb-2">Anomaly Handling &amp; Cutoff</div>
              <ul class="text-[11px] text-slate-700 space-y-1 list-disc pl-4">
                <li><strong>Cutoff D+1 Rollforward:</strong> Trans at 23:59 roll cleanly into the next accounting ledger.</li>
                <li><strong>Dispute Ledger:</strong> Fee discrepancies automatically route to finance queues.</li>
                <li><strong>Webhook Auto-Healing:</strong> Active polling kicks in if network timeouts delay bank callbacks.</li>
              </ul>
            </div>
          </div>
        </div>`,
    dev: `<div class="space-y-4">
          <div class="p-4 rounded-lg bg-indigo-50 border border-indigo-200">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-0.5 rounded bg-indigo-700 text-white text-[10px] font-bold uppercase">Developer Lens</span>
              <span class="font-bold text-indigo-900 text-sm">Distributed Reconciliation Engine &amp; Idempotency Key Locks</span>
            </div>
            <p class="text-slate-800 text-xs leading-relaxed">
              Message queue-backed batch processing engine capable of digesting 200,000 banking ledger lines per minute. Features Redis idempotency key locking to safeguard against duplicate ledger credits during webhook retries or transient connection hiccups.
            </p>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div class="p-2.5 rounded bg-white border border-indigo-200"><div class="text-lg font-black text-indigo-700">12 Mins</div><div class="text-[10px] text-slate-600">Recon Run Time</div></div>
            <div class="p-2.5 rounded bg-white border border-indigo-200"><div class="text-lg font-black text-indigo-700">0.00%</div><div class="text-[10px] text-slate-600">Financial Leakage</div></div>
            <div class="p-2.5 rounded bg-white border border-indigo-200"><div class="text-lg font-black text-indigo-700">200k/m</div><div class="text-[10px] text-slate-600">Batch Ingestion</div></div>
            <div class="p-2.5 rounded bg-white border border-indigo-200"><div class="text-lg font-black text-indigo-700">&lt;90s</div><div class="text-[10px] text-slate-600">Auto-Healing SLA</div></div>
          </div>
        </div>`,
    qa: `<div class="space-y-4">
          <div class="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-0.5 rounded bg-emerald-700 text-white text-[10px] font-bold uppercase">QA Rigor</span>
              <span class="font-bold text-emerald-900 text-sm">Chaos Testing: Webhook Drops, Duplicate Callbacks, &amp; Cutoff Transitions</span>
            </div>
            <p class="text-slate-800 text-xs leading-relaxed">
              Comprehensive fault injection tests the engine under dropped webhook deliveries, out-of-order callback arrivals, and bank statement cutoff boundary transactions, confirming zero financial balance divergence.
            </p>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div class="p-2 rounded bg-white border border-emerald-200"><div class="text-lg font-black text-emerald-700">100%</div><div class="text-[10px] text-slate-600">Idempotency Pass</div></div>
            <div class="p-2 rounded bg-white border border-emerald-200"><div class="text-lg font-black text-emerald-700">0.00%</div><div class="text-[10px] text-slate-600">Discrepancy Rate</div></div>
            <div class="p-2 rounded bg-white border border-emerald-200"><div class="text-lg font-black text-emerald-700">30+</div><div class="text-[10px] text-slate-600">Chaos Cases</div></div>
            <div class="p-2 rounded bg-white border border-emerald-200"><div class="text-lg font-black text-emerald-700">100%</div><div class="text-[10px] text-slate-600">SNAP Compliance</div></div>
          </div>
        </div>`
  },
  telematics: {
    analyst: `<div class="space-y-4">
          <div class="p-4 rounded-lg bg-blue-50 border border-blue-200">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-0.5 rounded bg-blue-700 text-white text-[10px] font-bold uppercase">Analyst Lens</span>
              <span class="font-bold text-blue-900 text-sm">Fleet Telematics &amp; Fuel Anomaly Engine (CAN-bus J1939 &amp; IoT)</span>
            </div>
            <p class="text-slate-800 text-xs leading-relaxed">
              Telemetry and fuel anomaly surveillance for nationwide fleet operations (1,500+ commercial buses). Leverages CAN-bus J1939 real-time sensor streams and IoT gateways to detect fuel theft and fuel siphoning anomalies in &lt;45 seconds, saving Rp 4.2B ($270k) annually in operational expenditure.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="p-3 rounded bg-white border border-blue-200">
              <div class="font-bold text-blue-900 text-xs mb-2">Fuel Anomaly Detection Criteria</div>
              <ul class="text-[11px] text-slate-700 space-y-1 list-disc pl-4">
                <li><strong>Sudden Drop Anomaly:</strong> Fuel level drop &gt;5% while engine RPM is 0 triggers instant P1 alert.</li>
                <li><strong>Fuel Sloshing Filter:</strong> Kalman filtering suppresses false positives from vehicle inclines.</li>
                <li><strong>Depot Geofencing:</strong> Refueling must match authorized coordinates and geo-timestamps.</li>
              </ul>
            </div>
            <div class="p-3 rounded bg-white border border-blue-200">
              <div class="font-bold text-blue-900 text-xs mb-2">Operational Impact</div>
              <ul class="text-[11px] text-slate-700 space-y-1 list-disc pl-4">
                <li>1,500+ Active buses monitored nationwide in real-time.</li>
                <li>Rp 4.2 Billion/year verified fuel theft reduction.</li>
                <li>Driver safety scorecards and idle time analytics.</li>
              </ul>
            </div>
          </div>
        </div>`,
    dev: `<div class="space-y-4">
          <div class="p-4 rounded-lg bg-indigo-50 border border-indigo-200">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-0.5 rounded bg-indigo-700 text-white text-[10px] font-bold uppercase">Developer Lens</span>
              <span class="font-bold text-indigo-900 text-sm">MQTT Streaming Ingestion &amp; Kalman Filter DSP Pipeline</span>
            </div>
            <p class="text-slate-800 text-xs leading-relaxed">
              High-throughput MQTT broker ingesting telemetry packets from 1,500+ vehicles every 3 seconds. Implements a streaming digital signal processing (DSP) Kalman filter in Go/Python to eliminate liquid sloshing noise before persisting clean time-series metrics into TimescaleDB.
            </p>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div class="p-2.5 rounded bg-white border border-indigo-200"><div class="text-lg font-black text-indigo-700">&lt;45s</div><div class="text-[10px] text-slate-600">Anomaly Alert SLA</div></div>
            <div class="p-2.5 rounded bg-white border border-indigo-200"><div class="text-lg font-black text-indigo-700">1,500+</div><div class="text-[10px] text-slate-600">Active Fleets</div></div>
            <div class="p-2.5 rounded bg-white border border-indigo-200"><div class="text-lg font-black text-indigo-700">99.8%</div><div class="text-[10px] text-slate-600">Kalman Accuracy</div></div>
            <div class="p-2.5 rounded bg-white border border-indigo-200"><div class="text-lg font-black text-indigo-700">&lt;100ms</div><div class="text-[10px] text-slate-600">Ingestion Latency</div></div>
          </div>
        </div>`,
    qa: `<div class="space-y-4">
          <div class="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-0.5 rounded bg-emerald-700 text-white text-[10px] font-bold uppercase">QA Rigor</span>
              <span class="font-bold text-emerald-900 text-sm">Simulated GPS Drift, Sensor Dropout, &amp; Alert Latency Benchmarking</span>
            </div>
            <p class="text-slate-800 text-xs leading-relaxed">
              QA testing incorporates GPS dead-reckoning simulation inside tunnels, intermittent cellular tower handoffs, sensor jitter simulation, and verification that high-priority alerts reach depot managers in &lt;45 seconds under load.
            </p>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div class="p-2 rounded bg-white border border-emerald-200"><div class="text-lg font-black text-emerald-700">&lt;45s</div><div class="text-[10px] text-slate-600">Alert Latency</div></div>
            <div class="p-2 rounded bg-white border border-emerald-200"><div class="text-lg font-black text-emerald-700">0%</div><div class="text-[10px] text-slate-600">False Siphon Alarms</div></div>
            <div class="p-2 rounded bg-white border border-emerald-200"><div class="text-lg font-black text-emerald-700">100%</div><div class="text-[10px] text-slate-600">Offline Packet Buffer</div></div>
            <div class="p-2 rounded bg-white border border-emerald-200"><div class="text-lg font-black text-emerald-700">20+</div><div class="text-[10px] text-slate-600">Terrain Edge Cases</div></div>
          </div>
        </div>`
  }
};
