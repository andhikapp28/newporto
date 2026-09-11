# SIT & UAT Test Matrix

## Dynamic Multi-Tier Approval Workflow & Delegation Engine

| Metadata        | Detail                                      |
|-----------------|---------------------------------------------|
| **Project**     | PT Nusantara Transindo — Approval Engine    |
| **Document**    | 06 — System Integration & User Acceptance Testing Matrix |
| **Version**     | 1.0                                         |
| **Author**      | QA Engineering Division                     |
| **Created**     | 2026-09-11                                  |
| **Status**      | Draft — Pending Review                      |
| **Reviewers**   | Lead Architect, Product Owner, IT Security  |

---

## Table of Contents

1. [Test Scope & Objectives](#1-test-scope--objectives)
2. [Defect Classification Guide](#2-defect-classification-guide)
3. [Environment Matrix](#3-environment-matrix)
4. [Test Scenarios](#4-test-scenarios)
   - 4.1 [Happy Path — Approval Flow per Tier](#41-happy-path--approval-flow-per-tier)
   - 4.2 [Delegation & Proxy Approval](#42-delegation--proxy-approval)
   - 4.3 [SLA & Escalation](#43-sla--escalation)
   - 4.4 [Concurrency & Edge Cases](#44-concurrency--edge-cases)
   - 4.5 [Security & Access Control](#45-security--access-control)
   - 4.6 [Boundary Value Analysis](#46-boundary-value-analysis)
5. [Go-Live Quality Gate Checklist](#5-go-live-quality-gate-checklist)
6. [Sign-Off](#6-sign-off)

---

## 1. Test Scope & Objectives

### 1.1 In Scope

| Area                         | Coverage                                                    |
|------------------------------|-------------------------------------------------------------|
| Multi-tier approval routing  | Tier 1 (Supervisor) → Tier 4 (Board of Directors)           |
| Delegation engine            | Proxy assignment, chain delegation, time-bound delegation   |
| SLA enforcement              | Timer-based escalation, breach notification, auto-routing   |
| Concurrent operations        | Simultaneous approvals, race conditions, session conflicts   |
| Security controls            | RBAC enforcement, cross-branch isolation, audit integrity   |
| Boundary conditions          | Threshold edges, zero/negative/max values                   |
| Integration touchpoints      | ERP (SAP), Email gateway, SSO (Azure AD), Mobile push       |

### 1.2 Out of Scope

- End-to-end financial reconciliation (covered in Finance UAT)
- Third-party vendor portal integration
- Legacy system data migration validation (separate test plan)

### 1.3 Entry Criteria

- All code merged to `release/approval-engine-v1` branch
- SIT environment provisioned with production-equivalent configuration
- Test data seeded: 50 users, 5 branches, 12 cost centers, 8 approval policies
- SSO integration configured and smoke-tested
- All P1/P2 defects from prior sprint resolved

### 1.4 Exit Criteria

- 100% of P1 scenarios passed
- ≥ 95% of P2 scenarios passed
- ≥ 90% of P3/P4 scenarios passed
- Zero open P1 defects; ≤ 2 open P2 defects (with documented workarounds)
- Performance SLA met: p95 response < 2s for approval submission
- UAT sign-off obtained from all designated business stakeholders

---

## 2. Defect Classification Guide

| Severity | Label        | Definition                                                                                   | SLA (Fix)   | Example                                                        |
|----------|--------------|----------------------------------------------------------------------------------------------|-------------|----------------------------------------------------------------|
| **P1**   | Blocker      | System crash, data loss, or complete workflow halt. No workaround exists.                     | 4 hours     | Approval submission returns HTTP 500; request data lost         |
| **P2**   | Critical     | Major feature broken or produces incorrect result. Limited workaround may exist.             | 8 hours     | Delegation routes to wrong approver; amount threshold miscalculated |
| **P3**   | Major        | Feature works but with significant deviation from spec. Workaround available.                | 24 hours    | SLA timer shows incorrect remaining time; email notification delayed > 5 min |
| **P4**   | Minor        | Cosmetic, UX, or documentation issue. No functional impact.                                  | Next sprint | Typo in approval status label; misaligned column in report     |

### Defect Lifecycle

```
New → Triaged → Assigned → In Progress → Fixed → Verified → Closed
                                        ↘ Won't Fix → Closed (with justification)
                                        ↘ Deferred → Backlog
```

### Defect Report Template

| Field            | Required | Description                              |
|------------------|----------|------------------------------------------|
| Defect ID        | Yes      | AUTO-generated (e.g., DEF-AE-0001)      |
| Test Scenario ID | Yes      | Link to originating scenario             |
| Severity         | Yes      | P1 / P2 / P3 / P4                       |
| Environment      | Yes      | SIT / UAT / Staging                     |
| Steps to Reproduce | Yes   | Numbered steps                           |
| Expected Result  | Yes      | Per test scenario                        |
| Actual Result    | Yes      | Observed behavior with evidence          |
| Attachments      | Yes      | Screenshot, HAR file, or log snippet     |
| Assigned To      | No       | Dev team member                          |

---

## 3. Environment Matrix

| Environment | Purpose     | Database           | SSO Provider | ERP Connection | Data Set      |
|-------------|-------------|--------------------|--------------|----------------|---------------|
| SIT         | Integration | PostgreSQL 15 (dedicated) | Azure AD (sandbox) | SAP S/4HANA QA | Synthetic (seeded) |
| UAT         | Acceptance  | PostgreSQL 15 (dedicated) | Azure AD (staging) | SAP S/4HANA QA | Anonymized production clone |
| Staging     | Pre-prod    | PostgreSQL 15 (replica) | Azure AD (prod-mirror) | SAP S/4HANA Prod (read-only) | Production snapshot |

### Test User Accounts

| Role                   | User ID          | Branch        | Approval Limit     |
|------------------------|------------------|---------------|---------------------|
| Requestor              | REQ-USR-01       | Jakarta HQ    | N/A                 |
| Supervisor (Tier 1)    | SPV-USR-01       | Jakarta HQ    | ≤ Rp 10.000.000     |
| Manager (Tier 2)       | MGR-USR-01       | Jakarta HQ    | ≤ Rp 100.000.000    |
| VP Finance (Tier 3)    | VP-USR-01        | Jakarta HQ    | ≤ Rp 1.000.000.000  |
| Director (Tier 4)      | DIR-USR-01       | Jakarta HQ    | > Rp 1.000.000.000  |
| Delegated Approver     | DLG-USR-01       | Jakarta HQ    | Inherits delegator  |
| Branch Supervisor      | SPV-USR-02       | Surabaya      | ≤ Rp 10.000.000     |
| Branch Manager         | MGR-USR-02       | Surabaya      | ≤ Rp 100.000.000    |
| IT Admin               | ADM-USR-01       | Jakarta HQ    | System admin         |
| Auditor (read-only)    | AUD-USR-01       | Jakarta HQ    | View only            |

---

## 4. Test Scenarios

### 4.1 Happy Path — Approval Flow per Tier

| ID | Category | Scenario | Precondition | Test Steps | Expected Result | Severity | Status |
|----|----------|----------|--------------|------------|-----------------|----------|--------|
| HP-001 | Happy Path | Tier 1 single-approver: Supervisor approves request ≤ Rp 10 juta | REQ-USR-01 logged in; SPV-USR-01 active; approval policy for Tier 1 configured | 1. REQ-USR-01 creates purchase request for Rp 5.000.000 with valid cost center and budget code<br>2. System routes request to SPV-USR-01's approval queue<br>3. SPV-USR-01 logs in, opens pending queue<br>4. SPV-USR-01 reviews details and clicks "Approve"<br>5. SPV-USR-01 enters approval remark: "Approved per budget allocation" | 1. Request created with status `PENDING_APPROVAL`<br>2. SPV-USR-01 receives email + in-app notification within 60s<br>3. Request appears in SPV-USR-01's pending queue with correct amount and details<br>4. Status transitions to `APPROVED`<br>5. Audit log records: timestamp, actor, action, remark<br>6. Requestor receives approval confirmation notification<br>7. ERP integration triggered (SAP PO creation) | P1 | 🔲 Not Run |
| HP-002 | Happy Path | Tier 2 sequential: Manager approves request Rp 10–100 juta | REQ-USR-01 logged in; SPV-USR-01 and MGR-USR-01 active; Tier 2 policy configured | 1. REQ-USR-01 creates purchase request for Rp 50.000.000<br>2. System routes to SPV-USR-01 (Tier 1 first)<br>3. SPV-USR-01 approves with remark<br>4. System auto-routes to MGR-USR-01 (Tier 2)<br>5. MGR-USR-01 approves with remark | 1. After Tier 1 approval, status = `PENDING_TIER2`<br>2. MGR-USR-01 receives notification with Tier 1 approval context<br>3. After Tier 2 approval, status = `APPROVED`<br>4. Full approval chain visible in audit trail: Tier 1 → Tier 2<br>5. Total processing time recorded | P1 | 🔲 Not Run |
| HP-003 | Happy Path | Tier 3 sequential: VP Finance approves request Rp 100 juta – 1 miliar | All tier approvers active; Tier 3 policy configured | 1. REQ-USR-01 creates purchase request for Rp 500.000.000<br>2. Request traverses Tier 1 → Tier 2 → Tier 3<br>3. Each approver reviews and approves sequentially<br>4. VP-USR-01 gives final approval | 1. Status transitions: `PENDING_T1` → `PENDING_T2` → `PENDING_T3` → `APPROVED`<br>2. Each tier approver sees cumulative approval history<br>3. Notifications sent at each transition<br>4. ERP integration fires only after final tier approval | P1 | 🔲 Not Run |
| HP-004 | Happy Path | Tier 4 full chain: Director approves request > Rp 1 miliar | All four tier approvers active; Tier 4 policy configured | 1. REQ-USR-01 creates capital expenditure request for Rp 2.500.000.000<br>2. Request traverses full chain: Tier 1 → 2 → 3 → 4<br>3. DIR-USR-01 reviews and approves at Tier 4 | 1. All four approval tiers execute sequentially<br>2. DIR-USR-01 sees full approval chain and all prior remarks<br>3. Status = `APPROVED` only after Tier 4<br>4. Board-level audit record created with document hash | P1 | 🔲 Not Run |
| HP-005 | Happy Path | Rejection at Tier 1: Supervisor rejects request | REQ-USR-01 logged in; SPV-USR-01 active | 1. REQ-USR-01 submits request for Rp 8.000.000<br>2. SPV-USR-01 opens request in approval queue<br>3. SPV-USR-01 clicks "Reject" and enters mandatory rejection reason<br>4. Confirm rejection | 1. Status transitions to `REJECTED`<br>2. Rejection reason stored in audit trail<br>3. Requestor receives rejection notification with reason<br>4. Request cannot be re-approved without resubmission<br>5. ERP integration NOT triggered | P1 | 🔲 Not Run |
| HP-006 | Happy Path | Rejection at mid-tier: Manager rejects after Supervisor approved | SPV-USR-01 has already approved; MGR-USR-01 active | 1. Request for Rp 75.000.000 already approved by Tier 1<br>2. MGR-USR-01 reviews and clicks "Reject"<br>3. MGR-USR-01 provides rejection reason | 1. Status = `REJECTED` (not `PENDING_T1` — no rollback to prior tier)<br>2. Tier 1 approval remains in audit trail but marked as superseded<br>3. Both requestor AND Tier 1 approver receive rejection notification<br>4. Rejection reason includes which tier rejected | P1 | 🔲 Not Run |
| HP-007 | Happy Path | Request with return-for-revision: Approver sends back for correction | SPV-USR-01 active; request submitted with incomplete justification | 1. REQ-USR-01 submits request for Rp 9.000.000 with missing attachment<br>2. SPV-USR-01 clicks "Return for Revision" with note: "Please attach quotation"<br>3. REQ-USR-01 receives notification, edits request, re-attaches document<br>4. REQ-USR-01 resubmits<br>5. SPV-USR-01 approves the revised version | 1. Status: `PENDING` → `RETURNED` → `REVISED` → `PENDING` → `APPROVED`<br>2. Revision history preserved (diff between original and revised)<br>3. Return-for-revision does not count as rejection in metrics<br>4. Approver sees both original and revised versions side-by-side | P2 | 🔲 Not Run |
| HP-008 | Happy Path | Bulk approval: Supervisor approves multiple requests at once | SPV-USR-01 has 5 pending requests, all ≤ Rp 10 juta | 1. SPV-USR-01 opens approval queue<br>2. Selects 5 requests via checkbox<br>3. Clicks "Bulk Approve"<br>4. Enters single remark applied to all<br>5. Confirms bulk action | 1. All 5 requests transition to `APPROVED` atomically<br>2. Each request has individual audit entry with bulk operation reference ID<br>3. 5 individual notifications sent to respective requestors<br>4. If any single request fails, entire batch rolls back (atomic) | P2 | 🔲 Not Run |
| HP-009 | Happy Path | Approval with attachment review: Approver downloads and verifies attached document | Request submitted with PDF quotation attachment | 1. REQ-USR-01 submits request with 3 PDF attachments (quotation, budget justification, vendor comparison)<br>2. SPV-USR-01 opens request, clicks each attachment to preview<br>3. SPV-USR-01 downloads vendor comparison for offline review<br>4. SPV-USR-01 approves with remark referencing attachment content | 1. All attachments render correctly in preview pane<br>2. Download delivers original file with correct filename and MIME type<br>3. Attachment metadata (upload time, size, uploader) visible<br>4. Virus scan status shown for each attachment | P2 | 🔲 Not Run |
| HP-010 | Happy Path | Mobile approval: Approver completes approval via mobile app | SPV-USR-01 logged in on mobile (Android/iOS); push notifications enabled | 1. REQ-USR-01 submits request for Rp 7.500.000<br>2. SPV-USR-01 receives push notification on mobile device<br>3. SPV-USR-01 taps notification, app opens to request detail<br>4. SPV-USR-01 reviews summary and taps "Approve"<br>5. Biometric authentication prompt appears; SPV-USR-01 confirms via fingerprint | 1. Push notification delivered within 30s of submission<br>2. Request detail renders fully on mobile viewport<br>3. Biometric/PIN required before approval action commits<br>4. Status updates in real-time on both web and mobile<br>5. Audit log records device type: `MOBILE_ANDROID` or `MOBILE_IOS` | P2 | 🔲 Not Run |

### 4.2 Delegation & Proxy Approval

| ID | Category | Scenario | Precondition | Test Steps | Expected Result | Severity | Status |
|----|----------|----------|--------------|------------|-----------------|----------|--------|
| DLG-001 | Delegation | Basic delegation: Supervisor delegates to a designated proxy before leave | SPV-USR-01 active; DLG-USR-01 exists in same branch; no existing delegation | 1. SPV-USR-01 navigates to Delegation Management<br>2. Creates delegation to DLG-USR-01<br>3. Sets date range: 2026-09-15 to 2026-09-22<br>4. Selects scope: "All pending and new requests"<br>5. Confirms delegation with approval PIN<br>6. REQ-USR-01 submits request for Rp 8.000.000 on 2026-09-16 | 1. Delegation record created with status `ACTIVE`<br>2. DLG-USR-01 receives delegation notification with scope details<br>3. New request routes to DLG-USR-01's queue (not SPV-USR-01)<br>4. DLG-USR-01's approval shows as "Approved by DLG-USR-01 on behalf of SPV-USR-01"<br>5. SPV-USR-01 receives shadow notification of actions taken during delegation | P1 | 🔲 Not Run |
| DLG-002 | Delegation | Delegation expiry: Proxy access revoked automatically after end date | Active delegation DLG-USR-01 ← SPV-USR-01, end date = 2026-09-22 | 1. System clock advances past 2026-09-22 23:59:59 WIB<br>2. DLG-USR-01 attempts to approve a pending request on 2026-09-23<br>3. REQ-USR-01 submits new request on 2026-09-23 | 1. Delegation status auto-transitions to `EXPIRED`<br>2. DLG-USR-01 sees error: "Delegation period has expired. Action not permitted."<br>3. New request routes back to SPV-USR-01 (original approver)<br>4. DLG-USR-01's approval queue clears delegated items<br>5. Audit log records delegation expiry event | P1 | 🔲 Not Run |
| DLG-003 | Delegation | Chain delegation: Delegate further delegates to third party | DLG-USR-01 has active delegation from SPV-USR-01 | 1. DLG-USR-01 attempts to create a sub-delegation to another user (USR-CHAIN-01)<br>2. System checks chain delegation policy | 1. If policy `allow_chain_delegation = false` (default): System blocks with message "Chain delegation is not permitted. Contact the original delegator."<br>2. If policy `allow_chain_delegation = true`: Sub-delegation created with max depth = 2; audit trail shows full chain<br>3. Original delegator (SPV-USR-01) receives notification of chain delegation | P2 | 🔲 Not Run |
| DLG-004 | Delegation | Delegation with scope restriction: Proxy can only approve up to a sub-limit | SPV-USR-01 sets delegation with amount cap of Rp 5.000.000 | 1. SPV-USR-01 creates delegation to DLG-USR-01 with amount limit Rp 5.000.000<br>2. Request A (Rp 3.000.000) arrives in DLG-USR-01's queue<br>3. Request B (Rp 8.000.000) arrives in DLG-USR-01's queue<br>4. DLG-USR-01 approves Request A<br>5. DLG-USR-01 attempts to approve Request B | 1. Request A approved successfully by delegate<br>2. Request B shows as "View Only — Exceeds delegation limit"<br>3. DLG-USR-01 cannot take action on Request B; prompt to contact SPV-USR-01<br>4. Request B remains in SPV-USR-01's queue (or escalates per SLA policy) | P2 | 🔲 Not Run |
| DLG-005 | Delegation | Overlapping delegation: Two delegates for same period | SPV-USR-01 already has active delegation to DLG-USR-01 (Sept 15–22) | 1. SPV-USR-01 attempts to create second delegation to DLG-USR-02 for Sept 18–25<br>2. System detects date overlap | 1. System blocks creation with error: "Active delegation exists for overlapping period (Sep 15–22 to DLG-USR-01). Cancel or modify existing delegation first."<br>2. No partial delegation created<br>3. Original delegation remains unaffected | P2 | 🔲 Not Run |
| DLG-006 | Delegation | Early delegation revocation: Delegator returns early and cancels delegation | Active delegation to DLG-USR-01 (Sept 15–22); today is Sept 18 | 1. SPV-USR-01 logs in on Sept 18<br>2. Navigates to Delegation Management<br>3. Clicks "Revoke Delegation" on active delegation<br>4. Confirms with approval PIN<br>5. DLG-USR-01 has 2 pending requests in delegated queue | 1. Delegation status = `REVOKED`<br>2. Pending delegated requests return to SPV-USR-01's queue immediately<br>3. DLG-USR-01 loses access to delegated queue; sees empty state<br>4. Actions already taken by DLG-USR-01 during delegation period are preserved (not rolled back)<br>5. Both parties receive revocation notification | P2 | 🔲 Not Run |
| DLG-007 | Delegation | Delegate approves, then delegator returns and reviews audit trail | DLG-USR-01 approved 3 requests during delegation period; delegation now expired | 1. SPV-USR-01 returns, logs in<br>2. Navigates to "Delegation Activity Report"<br>3. Filters by delegation period (Sept 15–22)<br>4. Reviews each action taken by DLG-USR-01 | 1. Report shows all 3 approvals with: timestamp, request ID, amount, DLG-USR-01's remark<br>2. Each approval marked as "Delegated Action"<br>3. SPV-USR-01 can add retrospective remarks but cannot reverse delegated approvals<br>4. Report exportable as PDF/CSV | P3 | 🔲 Not Run |
| DLG-008 | Delegation | Delegation during pending multi-tier request: Approval mid-chain when delegator is substituted | Request at Tier 2 (MGR-USR-01); MGR-USR-01 creates delegation to DLG-USR-02 | 1. Request for Rp 75.000.000 approved by Tier 1, now pending Tier 2 (MGR-USR-01)<br>2. MGR-USR-01 creates delegation to DLG-USR-02 effective immediately<br>3. DLG-USR-02 logs in and sees the pending Tier 2 request<br>4. DLG-USR-02 approves | 1. Request seamlessly transitions to DLG-USR-02's queue<br>2. DLG-USR-02's approval recorded as "on behalf of MGR-USR-01"<br>3. Request continues to Tier 3 (VP-USR-01) with correct approval chain<br>4. Tier 3 approver sees delegation context in approval history | P1 | 🔲 Not Run |

### 4.3 SLA & Escalation

| ID | Category | Scenario | Precondition | Test Steps | Expected Result | Severity | Status |
|----|----------|----------|--------------|------------|-----------------|----------|--------|
| SLA-001 | SLA | SLA warning at 75% elapsed: Approver receives reminder | SLA policy: Tier 1 must act within 24 hours; request pending for 18 hours | 1. REQ-USR-01 submits request at 08:00 WIB<br>2. SPV-USR-01 does not act for 18 hours<br>3. System SLA timer reaches 75% threshold at 02:00 WIB next day | 1. At 18-hour mark (75%), SPV-USR-01 receives warning notification: "Request #REQ-12345 requires your action within 6 hours"<br>2. Request card in approval queue shows amber warning indicator<br>3. Dashboard SLA widget updates to show at-risk item<br>4. Warning logged in SLA tracking table | P2 | 🔲 Not Run |
| SLA-002 | SLA | SLA breach: Auto-escalation to next-level approver | SLA policy: Tier 1 = 24h; auto-escalate on breach; SPV-USR-01 inactive for 24h | 1. REQ-USR-01 submits request at 08:00 WIB Monday<br>2. SPV-USR-01 takes no action<br>3. 24 hours elapse (08:00 WIB Tuesday)<br>4. System triggers auto-escalation | 1. Request status changes to `ESCALATED`<br>2. Request appears in MGR-USR-01's queue (next level up) with escalation badge<br>3. SPV-USR-01 receives breach notification: "SLA breached. Request escalated to Manager."<br>4. MGR-USR-01 receives notification: "Escalated request requires your attention (SLA breach at Tier 1)"<br>5. Requestor notified of escalation<br>6. SLA breach metric incremented in reporting dashboard | P1 | 🔲 Not Run |
| SLA-003 | SLA | SLA with business hours calculation: Weekend/holiday excluded | SLA = 8 business hours; request submitted Friday 16:00 WIB; Monday is holiday | 1. REQ-USR-01 submits request Friday 16:00 WIB<br>2. System calculates SLA deadline excluding Saturday, Sunday, and Monday (national holiday)<br>3. SPV-USR-01 logs in Tuesday 09:00 WIB | 1. SLA deadline calculated as Tuesday 16:00 WIB (not Monday 00:00)<br>2. SLA timer pauses during non-business hours (18:00–08:00) and non-working days<br>3. Dashboard shows correct remaining time based on business hours<br>4. Holiday calendar reference: configurable per-branch | P2 | 🔲 Not Run |
| SLA-004 | SLA | Multi-tier SLA: Each tier has independent SLA clock | Request traversing Tier 1 → Tier 2 → Tier 3; each tier SLA = 24h | 1. Request submitted, routed to Tier 1<br>2. Tier 1 approves at hour 20 (within SLA)<br>3. Tier 2 SLA clock starts fresh from Tier 1 approval timestamp<br>4. Tier 2 approves at hour 10<br>5. Tier 3 SLA clock starts fresh | 1. Each tier's SLA measured independently (not cumulative)<br>2. Tier 1: 20h elapsed / 24h limit = within SLA ✓<br>3. Tier 2: 10h elapsed / 24h limit = within SLA ✓<br>4. Total processing time recorded as aggregate metric (30h) separate from per-tier SLA<br>5. SLA compliance report shows per-tier and total metrics | P2 | 🔲 Not Run |
| SLA-005 | SLA | Escalation chain exhaustion: All approvers at escalated level also breach SLA | Tier 1 breached → escalated to Tier 2; Tier 2 also breaches 24h SLA | 1. Request escalated to MGR-USR-01 after SPV-USR-01 SLA breach<br>2. MGR-USR-01 takes no action for 24 hours<br>3. Second escalation triggers | 1. Request escalates to VP-USR-01 (Tier 3) with double-escalation badge<br>2. IT Admin (ADM-USR-01) receives system alert: "Request #REQ-12345 — double SLA breach"<br>3. Email sent to department head with escalation summary<br>4. Request cannot escalate beyond Tier 4 (Director); if Director also breaches, alert sent to Compliance Officer and request flagged `CRITICAL_OVERDUE` | P1 | 🔲 Not Run |
| SLA-006 | SLA | SLA pause: Approver marks request as "Need More Information" | Request pending at Tier 1; SPV-USR-01 requests additional info from requestor | 1. SPV-USR-01 opens request, clicks "Request Info" with question<br>2. SLA timer pauses<br>3. REQ-USR-01 responds with additional information after 48 hours<br>4. SLA timer resumes<br>5. SPV-USR-01 acts within remaining SLA window | 1. SLA clock stops at "Request Info" action<br>2. Status = `AWAITING_INFO`; requestor receives notification with approver's question<br>3. On info submission, SLA resumes from paused time (not reset)<br>4. Requestor's response time tracked separately for reporting<br>5. If requestor does not respond within 72h, request auto-cancelled with notification | P2 | 🔲 Not Run |

### 4.4 Concurrency & Edge Cases

| ID | Category | Scenario | Precondition | Test Steps | Expected Result | Severity | Status |
|----|----------|----------|--------------|------------|-----------------|----------|--------|
| CON-001 | Concurrency | Simultaneous approve and reject: Two sessions act on same request | SPV-USR-01 logged in on two browser tabs viewing the same request | 1. SPV-USR-01 opens request #REQ-12345 in Chrome Tab A<br>2. SPV-USR-01 opens same request in Chrome Tab B<br>3. In Tab A, clicks "Approve" at timestamp T<br>4. In Tab B, clicks "Reject" at timestamp T+200ms<br>5. Both submissions arrive at server nearly simultaneously | 1. First action (Approve at T) succeeds and commits<br>2. Second action (Reject at T+200ms) fails with optimistic lock error: "This request has already been actioned. Please refresh."<br>3. Request status = `APPROVED` (first write wins)<br>4. Audit log records only the successful action<br>5. Tab B refreshes to show current status | P1 | 🔲 Not Run |
| CON-002 | Concurrency | Delegate and original approver both active: Race condition | Delegation active but SPV-USR-01 logs in unexpectedly; both see the same request | 1. Active delegation to DLG-USR-01; SPV-USR-01 also logged in<br>2. Both users see request #REQ-12345 in their queues<br>3. DLG-USR-01 clicks Approve; SPV-USR-01 clicks Approve at same time | 1. System grants priority to DLG-USR-01 (active delegate) OR first-write-wins depending on config<br>2. Second action blocked with "Already actioned" message<br>3. No duplicate approval records created<br>4. Audit log shows single approval event with actor identification | P1 | 🔲 Not Run |
| CON-003 | Concurrency | Network timeout mid-approval: Client loses connection during submit | SPV-USR-01 clicks Approve; network drops before server response | 1. SPV-USR-01 clicks "Approve" on request<br>2. Client sends HTTP POST to `/api/approvals/{id}/approve`<br>3. Server receives and processes (commits to DB) — status = APPROVED<br>4. Response packet lost due to network timeout<br>5. Client shows "Request timeout" error<br>6. SPV-USR-01 refreshes page and retries approval | 1. Server-side: approval committed successfully (idempotency key prevents duplicate)<br>2. Client-side: timeout error displayed with guidance "Your action may have been recorded. Please refresh."<br>3. On retry: server recognizes idempotency key, returns 200 with existing approval (not 409)<br>4. No double-approval recorded<br>5. Requestor receives exactly one notification | P1 | 🔲 Not Run |
| CON-004 | Concurrency | Approver role changed during pending request: RBAC updated mid-workflow | Request pending at Tier 2 for MGR-USR-01; admin changes MGR-USR-01's role to "Analyst" | 1. Request #REQ-12345 pending MGR-USR-01 approval at Tier 2<br>2. ADM-USR-01 changes MGR-USR-01's role from "Manager" to "Analyst" in IAM<br>3. MGR-USR-01 attempts to approve the pending request | 1. System performs real-time RBAC check at action time (not at routing time only)<br>2. MGR-USR-01 sees error: "You no longer have approval authority for this request tier"<br>3. Request is re-routed to the new Tier 2 approver (whoever holds the Manager role)<br>4. Audit log records: role change event → re-routing event<br>5. Requestor notified of routing change | P1 | 🔲 Not Run |
| CON-005 | Concurrency | Request edit while pending approval: Requestor modifies amount | Request pending Tier 1 approval; requestor attempts to edit | 1. REQ-USR-01 submits request for Rp 8.000.000<br>2. While pending SPV-USR-01's approval, REQ-USR-01 tries to edit amount to Rp 12.000.000<br>3. System checks edit policy | 1. Edit blocked with message: "Cannot modify request while pending approval. Withdraw and resubmit."<br>2. If withdraw is allowed: request status → `WITHDRAWN`; SPV-USR-01's queue updated; new submission required<br>3. Amount change that crosses tier threshold (10M → 12M) correctly triggers Tier 2 routing on resubmission | P2 | 🔲 Not Run |
| CON-006 | Concurrency | Database failover during approval: Primary DB switches to replica | Approval action in progress; PostgreSQL primary fails over to standby | 1. SPV-USR-01 initiates approval action<br>2. During transaction, primary PostgreSQL node becomes unreachable<br>3. Connection pool fails over to standby replica<br>4. Transaction retries on new connection | 1. If transaction was not committed on primary: action fails safely; user sees "Temporary error, please retry"<br>2. If transaction was committed before failover: standby has replicated data; status consistent<br>3. No partial state (e.g., approval recorded but notification not sent)<br>4. System health check detects failover; ops team alerted<br>5. Subsequent requests route to standby without user intervention | P1 | 🔲 Not Run |
| CON-007 | Concurrency | Concurrent bulk approval by multiple supervisors: Overlapping request sets | SPV-USR-01 and SPV-USR-02 both have request #REQ-99999 visible (cross-assignment edge case) | 1. SPV-USR-01 selects 10 requests including REQ-99999 for bulk approval<br>2. SPV-USR-02 selects 8 requests including REQ-99999 for bulk approval<br>3. Both submit bulk approval within 1 second | 1. REQ-99999 approved by whichever bulk operation commits first<br>2. Other bulk operation succeeds for its unique requests; REQ-99999 returns individual error within batch result<br>3. Batch result for second submitter: "9 approved, 1 skipped (already actioned)"<br>4. No request left in inconsistent state | P2 | 🔲 Not Run |
| CON-008 | Concurrency | Session expiry during approval form fill: Token expires mid-action | SPV-USR-01 opens approval form; session token expires (30-min idle timeout) while typing remark | 1. SPV-USR-01 opens request detail at 09:00<br>2. Spends 35 minutes reviewing attachments and typing lengthy remark<br>3. Clicks "Approve" at 09:35 (session expired at 09:30)<br>4. Server returns 401 Unauthorized | 1. Client intercepts 401 and shows re-authentication modal (not full page redirect)<br>2. Remark text and form state preserved in browser after re-auth<br>3. After re-login, approval can be submitted without re-entering data<br>4. If re-auth fails 3 times, redirect to login page with session state saved to localStorage for recovery | P2 | 🔲 Not Run |

### 4.5 Security & Access Control

| ID | Category | Scenario | Precondition | Test Steps | Expected Result | Severity | Status |
|----|----------|----------|--------------|------------|-----------------|----------|--------|
| SEC-001 | Security | Unauthorized approval attempt: User without approval role tries to approve | REQ-USR-01 (Requestor role) logged in; knows request ID | 1. REQ-USR-01 navigates to own submitted request #REQ-12345<br>2. Inspects DOM / intercepts API call to find approval endpoint<br>3. Sends direct POST to `/api/approvals/REQ-12345/approve` with own auth token<br>4. Also attempts via Postman/curl with manipulated role claim | 1. API returns 403 Forbidden: "Insufficient permissions to perform approval action"<br>2. No state change on request<br>3. Security audit log records: unauthorized action attempt with source IP, user ID, endpoint, timestamp<br>4. If > 5 unauthorized attempts in 10 minutes: account temporarily locked; security team alerted<br>5. JWT role claim validated server-side against IAM database (not trusted from token alone) | P1 | 🔲 Not Run |
| SEC-002 | Security | Cross-branch access: Supervisor attempts to approve request from another branch | SPV-USR-02 (Surabaya branch) logged in; request #REQ-12345 belongs to Jakarta HQ | 1. SPV-USR-02 attempts to navigate to `/approvals/REQ-12345` (Jakarta HQ request)<br>2. Also attempts direct API call with request ID from another branch<br>3. Attempts to search for cross-branch requests in approval queue | 1. UI: Request not visible in SPV-USR-02's approval queue (branch filter applied server-side)<br>2. Direct URL: 404 Not Found (not 403, to prevent ID enumeration)<br>3. API: 404 with generic message; no data leakage about request existence<br>4. Search results filtered by branch_id at query level<br>5. Cross-branch access attempt logged in security audit | P1 | 🔲 Not Run |
| SEC-003 | Security | Audit trail integrity: Attempt to modify historical audit records | ADM-USR-01 (IT Admin) has database access; attempts to alter audit log | 1. ADM-USR-01 connects to PostgreSQL database directly<br>2. Attempts `UPDATE audit_log SET action = 'REJECTED' WHERE action = 'APPROVED' AND request_id = 'REQ-12345'`<br>3. Attempts `DELETE FROM audit_log WHERE request_id = 'REQ-12345'` | 1. Audit table has database-level trigger that prevents UPDATE and DELETE operations<br>2. UPDATE attempt returns error: "Audit records are immutable — modification denied"<br>3. DELETE attempt returns error: "Audit records are immutable — deletion denied"<br>4. Attempted modification itself is logged to a separate tamper-detection table (meta-audit)<br>5. Audit records include SHA-256 hash chain; any gap in sequence detected by integrity check job | P1 | 🔲 Not Run |
| SEC-004 | Security | Self-approval prevention: Requestor is also the designated approver | REQ-USR-01 has dual role: Requestor + Supervisor for their own cost center | 1. REQ-USR-01 submits a purchase request for Rp 5.000.000<br>2. System evaluates approval routing; REQ-USR-01 is the mapped Tier 1 approver<br>3. Request appears in REQ-USR-01's own approval queue | 1. System detects self-approval conflict and auto-routes to alternate approver (next supervisor in branch) or escalates to Tier 2<br>2. REQ-USR-01 cannot see own request in approval queue<br>3. Conflict flagged in audit: "Self-approval prevented; rerouted to [alternate]"<br>4. Policy configurable: some orgs allow self-approval below Rp 1.000.000 — respects configuration | P1 | 🔲 Not Run |
| SEC-005 | Security | Token replay attack: Captured approval token reused after session invalidation | Attacker captures valid JWT used for previous approval action | 1. SPV-USR-01 approves request using valid session token T1<br>2. SPV-USR-01 logs out (session invalidated)<br>3. Attacker replays same token T1 with new approval request via curl<br>4. Also test: expired token (past `exp` claim) replayed | 1. Server validates token against session store (not just JWT signature/expiry)<br>2. Replayed token returns 401: "Session invalidated"<br>3. Expired token returns 401: "Token expired"<br>4. Each approval action requires fresh CSRF token (single-use nonce)<br>5. Replay attempt logged with source IP and flagged for security review | P1 | 🔲 Not Run |

### 4.6 Boundary Value Analysis

| ID | Category | Scenario | Precondition | Test Steps | Expected Result | Severity | Status |
|----|----------|----------|--------------|------------|-----------------|----------|--------|
| BVA-001 | Boundary | Exact threshold: Request at exactly Rp 10.000.000 (Tier 1 upper boundary) | Tier 1 limit defined as `amount <= 10,000,000`; Tier 2 as `amount > 10,000,000` | 1. REQ-USR-01 submits request for exactly Rp 10.000.000,00 (zero sen)<br>2. Observe routing decision | 1. Request routes to Tier 1 only (Supervisor), NOT Tier 2<br>2. Boundary condition handled by `<=` operator (inclusive upper bound)<br>3. Amount stored as exact decimal (no floating-point rounding)<br>4. Approval chain: Tier 1 only<br>5. Verify with `amount = 10,000,000.00` and `amount = 10,000,000.01` (latter should route to Tier 2) | P1 | 🔲 Not Run |
| BVA-002 | Boundary | Threshold boundary + 1: Request at Rp 10.000.001 triggers Tier 2 | Tier boundary between 1 and 2 at Rp 10.000.000 | 1. REQ-USR-01 submits request for Rp 10.000.001<br>2. Observe routing | 1. Request routes to Tier 1 → Tier 2 (sequential)<br>2. Correct tier escalation triggered by Rp 1 difference<br>3. Both SPV-USR-01 and MGR-USR-01 included in approval chain<br>4. Boundary logic consistent across all tier transitions (test also at Rp 100.000.001 and Rp 1.000.000.001) | P1 | 🔲 Not Run |
| BVA-003 | Boundary | Zero amount: Request submitted with Rp 0 | No minimum amount validation (testing if it exists) | 1. REQ-USR-01 creates request and enters amount Rp 0<br>2. Clicks submit | 1. Validation error: "Amount must be greater than zero"<br>2. Form does not submit; field highlighted in red<br>3. Server-side validation also rejects (in case client-side bypassed)<br>4. API returns 422 Unprocessable Entity with clear error message | P2 | 🔲 Not Run |
| BVA-004 | Boundary | Negative amount: Request with Rp -5.000.000 | No negative amount validation (testing if it exists) | 1. REQ-USR-01 enters amount: -5000000 in the amount field<br>2. Attempts form submission<br>3. Also test: direct API call with `"amount": -5000000` | 1. Client-side: Input field rejects negative value (number input with `min=1`)<br>2. If bypassed: server returns 422: "Amount must be a positive number"<br>3. Negative amount does NOT create a "credit" request or reverse approval flow<br>4. Attempt logged as validation failure in application log | P2 | 🔲 Not Run |
| BVA-005 | Boundary | Maximum integer overflow: Request with Rp 9.999.999.999.999 (near max safe integer) | System uses BIGINT / DECIMAL(18,2) for amount storage | 1. REQ-USR-01 enters amount: 9,999,999,999,999.99 (13 digits + 2 decimal)<br>2. Submit request<br>3. Also test: amount exceeding DECIMAL(18,2) precision: 9,999,999,999,999,999.99 | 1. Within storage range: request accepted, amount stored precisely (no rounding/truncation)<br>2. Exceeding storage range: validation error "Amount exceeds maximum supported value"<br>3. Display formatting correct: "Rp 9.999.999.999.999,99" (Indonesian locale)<br>4. Amount comparison for tier routing uses exact decimal arithmetic (not floating-point)<br>5. No integer overflow or wraparound behavior | P2 | 🔲 Not Run |

---

## 5. Go-Live Quality Gate Checklist

### 5.1 Test Execution Summary

| Metric                              | Target       | Actual | Status |
|--------------------------------------|-------------|--------|--------|
| Total test scenarios                  | 42          |        | 🔲     |
| P1 scenarios passed                   | 100%        |        | 🔲     |
| P2 scenarios passed                   | ≥ 95%       |        | 🔲     |
| P3/P4 scenarios passed                | ≥ 90%       |        | 🔲     |
| Open P1 defects                       | 0           |        | 🔲     |
| Open P2 defects                       | ≤ 2         |        | 🔲     |
| Regression test pass rate             | 100%        |        | 🔲     |
| Performance p95 response time         | < 2,000 ms  |        | 🔲     |
| Security scan (OWASP ZAP / Burp)     | 0 High/Critical |   | 🔲     |

### 5.2 Quality Gate Criteria

| # | Gate                                      | Owner            | Criteria                                                        | Status |
|---|-------------------------------------------|------------------|-----------------------------------------------------------------|--------|
| 1 | All P1 test scenarios passed              | QA Lead          | Zero P1 failures in final test run                              | 🔲     |
| 2 | Defect closure                            | Dev Lead         | All P1 closed; P2 ≤ 2 with workaround documented               | 🔲     |
| 3 | Performance baseline met                  | DevOps           | p95 < 2s; throughput ≥ 100 concurrent approvals                 | 🔲     |
| 4 | Security assessment passed                | InfoSec          | OWASP Top 10 scan clean; penetration test report accepted       | 🔲     |
| 5 | UAT business sign-off                     | Product Owner    | Signed UAT acceptance form from all designated stakeholders     | 🔲     |
| 6 | Rollback plan tested                      | DevOps           | Rollback executed successfully in staging within 5 minutes      | 🔲     |
| 7 | Monitoring & alerting configured          | SRE              | All critical alerts verified in staging; on-call roster confirmed| 🔲     |
| 8 | Data migration verified                   | DBA              | Checksum match; row count delta report clean                    | 🔲     |
| 9 | Documentation complete                    | Tech Writer      | API docs, user manual, runbook updated and reviewed             | 🔲     |
| 10| Training delivered                        | Change Mgmt      | End-user training completed; training attendance ≥ 95%          | 🔲     |

### 5.3 Sign-Off Authority

| Role              | Name (Placeholder) | Sign-Off Scope              | Date | Signature |
|-------------------|--------------------|-----------------------------|------|-----------|
| QA Lead           | __________________ | Test execution completeness  |      |           |
| Dev Lead          | __________________ | Code quality & defect status |      |           |
| Product Owner     | __________________ | Business acceptance          |      |           |
| IT Security       | __________________ | Security assessment          |      |           |
| DevOps Lead       | __________________ | Infrastructure readiness     |      |           |
| Project Sponsor   | __________________ | Go/No-Go decision            |      |           |

---

## 6. Sign-Off

| Section                    | Reviewed By | Date | Status    |
|----------------------------|-------------|------|-----------|
| Happy Path scenarios       |             |      | 🔲 Pending |
| Delegation scenarios       |             |      | 🔲 Pending |
| SLA & Escalation scenarios |             |      | 🔲 Pending |
| Concurrency scenarios      |             |      | 🔲 Pending |
| Security scenarios         |             |      | 🔲 Pending |
| Boundary Value scenarios   |             |      | 🔲 Pending |
| Quality Gate checklist     |             |      | 🔲 Pending |

---

*Document generated for PT Nusantara Transindo — Approval Engine Project*
*Classification: INTERNAL — CONFIDENTIAL*
