# Business Requirements Document & Software Requirements Specification (BRD / SRS)

## Project: Dynamic Multi-Tier Approval Workflow & Delegation Engine

| Field | Value |
| :--- | :--- |
| **Document Reference** | NT-SA-2026-ENG-001 |
| **Version** | 1.0.0 |
| **Target Enterprise** | PT Nusantara Transindo (Persero) |
| **Status** | Approved for Implementation |
| **Author** | Principal System Analyst & Enterprise Architecture Team |
| **Classification** | Internal — Restricted |

---

## 1. Executive Summary & Business Context

### 1.1 Company Profile

**PT Nusantara Transindo (Persero)** is a premier Indonesian state-owned transport and multimodal logistics holding company. Operating a sprawling national distribution network, Nusantara Transindo manages:

- Over **50 operational branch offices and logistics hubs** spanning 6 major island corridors (Sumatra, Java, Kalimantan, Sulawesi, Bali-Nusa Tenggara, and Papua-Maluku).
- A diversified workforce exceeding **3,000 active employees**, comprising branch frontline agents, fleet supervisors, technical engineers, procurement specialists, and executive leadership.
- A commercial fleet of **1,200+ heavy freight vehicles**, 35 coastal feeder container vessels, and 18 dry-port intermodal terminals.
- Annual operational expenditures (Opex) and capital investments (Capex) surpassing **IDR 3.8 Trillion**.

### 1.2 Strategic Intent

To sustain rapid logistics velocity and ensure strict adherence to Good Corporate Governance (GCG) and BUMN compliance mandates, PT Nusantara Transindo is commissioning the **Dynamic Multi-Tier Approval Workflow & Delegation Engine**. This mission-critical platform replaces fragmented, legacy siloed workflows with a unified, rule-driven, event-based orchestrator that powers procurement, capital expenditures, operational change requests, and human capital workflows across all corporate tiers.

---

## 2. Problem Statement & Baseline Analysis

The enterprise currently experiences severe operational friction caused by legacy approval mechanisms:

| Friction Point | Legacy State | Business Impact | Target Future State |
| :--- | :--- | :--- | :--- |
| **Approval Route Definition** | Hardcoded conditional routing embedded in monolithic stored procedures | Modifying a branch approval rule requires a 2-week software deployment cycle | Configuration-driven dynamic rule engine evaluated via JSON/DSL rules |
| **Absenteeism & Bottlenecks** | No automated delegation; if an approving Manager or VP is on official duty or leave, documents stall | Mean Time to Approval (MTTA) for purchase orders exceeds **14.2 business days**, risking supply chain stock-outs | Real-time delegation engine linked to HRIS with automated acting-officer (*Pelaksana Tugas / Pjs*) substitution |
| **SLA Tracking & Visibility** | Approvals lack definitive timeboxes; SLA monitoring is handled via manual spreadsheets | Requests slip through gaps with zero operational accountability; internal expedites require WhatsApp escalations | Built-in 1x24h SLA timers per tier with automated escalation, early warning triggers, and SLA breach reporting |
| **Audit Trail & Non-Repudiation** | Basic database timestamps without immutable state transition logs or cryptographic verification | BPK (Badan Pemeriksa Keuangan) and internal audit findings regarding lack of evidentiary trail for high-value approvals | WORM (Write Once Read Many) compliant immutable audit log capturing IP, client agent, geo-coordinates, and user acting-as context |
| **Race Conditions** | Naive database updates without concurrency controls | Conflicting actions (e.g., simultaneous Approve and Revise clicks by parallel approvers) yield corrupted request states | Pessimistic/Optimistic locking strategy with explicit step state validation and idempotency tokens |

### 2.1 Key Performance Indicators — Current vs. Target

| KPI | Baseline (Current) | Target (Post-Implementation) | Improvement |
| :--- | :--- | :--- | :--- |
| Mean Time to Approval (MTTA) | 14.2 business days | 3.5 business days | -75% |
| SLA Breach Rate | Not tracked | < 5% | Measurable |
| Stalled Requests (> 7 days) | 23% of active requests | < 2% | -91% |
| Audit Finding Closure Rate | 45% | > 95% | +111% |
| Delegation Automation | 0% (all manual) | > 90% | +90% |

---

## 3. Approval Classification & Threshold Matrix

Approval thresholds strictly reflect PT Nusantara Transindo's enterprise delegation of authority (*Surat Keputusan Direksi tentang Pendelegasian Wewenang*).

### 3.1 Financial Authority Matrix

| Tier | Organizational Role | Procurement / OPEX Threshold | CAPEX Threshold | Delegation Capability |
| :--- | :--- | :--- | :--- | :--- |
| **Tier 1** | Operational Staff / Officer | < IDR 5,000,000 | Ineligible (Draft only) | No |
| **Tier 2** | Unit / Branch Supervisor | < IDR 25,000,000 | < IDR 10,000,000 | Yes (to peer Supervisor) |
| **Tier 3** | Branch / Department Manager | < IDR 100,000,000 | < IDR 50,000,000 | Yes (to Asst. Manager / Sr. Supervisor) |
| **Tier 4** | General Manager (GM) Regional Hub | < IDR 500,000,000 | < IDR 200,000,000 | Yes (to designated Pjs / Acting GM) |
| **Tier 5** | Vice President (VP) Corporate Division | < IDR 2,000,000,000 | < IDR 1,000,000,000 | Yes (to Senior GM) |
| **Tier 6** | Executive Director (C-Suite) | < IDR 10,000,000,000 | < IDR 5,000,000,000 | Yes (to peer Director) |
| **Tier 7** | President Director (PresDir) | Unlimited (≥ IDR 10B) | Unlimited (≥ IDR 5B) | Yes (to Director nominated as Acting PresDir) |

### 3.2 Target Approval Workflow Types

| # | Type Code | Full Name | Description | Typical Attachments |
| :--- | :--- | :--- | :--- | :--- |
| 1 | `PROC` | Procurement (PR/PO) | Operational consumables, fleet maintenance spares, bunker fuel contracts, port handling services | Vendor quotations, price comparison matrix, technical specs |
| 2 | `CAPEX` | Capital Expenditure | Acquisition of prime movers, shipyard retrofits, automated sorting hub infrastructure, IT hardware | Feasibility study, ROI projection, asset classification |
| 3 | `CR` | Change Request | Routing network topology adjustments, freight tariff modifications, core IT infrastructure changes | Impact assessment, technical specification, rollback plan |
| 4 | `HR` | HR Leave / Mutation | Inter-island employee transfers, structural role promotions, managerial leave > 5 working days | Transfer request form, competency assessment, clearance |

### 3.3 Routing Logic Summary

The engine evaluates the following ordered predicate chain to synthesize an approval route:

```
ROUTE = f(RequestType, Amount, CostCenter, OriginBranch, BudgetStatus)

IF RequestType == PROC AND Amount < 5_000_000:
    Chain = [Staff.Manager]                       # Single-tier fast-track
ELIF RequestType == PROC AND Amount < 25_000_000:
    Chain = [Supervisor, Manager]                  # Two-tier
ELIF RequestType == PROC AND Amount < 100_000_000:
    Chain = [Supervisor, Manager, GM]              # Three-tier
ELIF RequestType == PROC AND Amount < 500_000_000:
    Chain = [Manager, GM, VP]                      # Mid-range
ELIF RequestType == PROC AND Amount < 2_000_000_000:
    Chain = [GM, VP, Director]                     # Senior
ELIF RequestType == PROC AND Amount < 10_000_000_000:
    Chain = [VP, Director, PresDir]                # Executive
ELSE:
    Chain = [VP, Director, PresDir, BOC_Approval]  # Board oversight
```

---

## 4. Functional Requirements (FR)

### 4.1 Request Submission & Dynamic Routing

| FR ID | Requirement | Priority | Acceptance Criteria |
| :--- | :--- | :--- | :--- |
| **FR-001** | Dynamic Route Synthesis: Upon submission, the engine shall dynamically synthesize an ordered approval chain based on request type, origin branch, cost center, and total monetary valuation, adhering to the threshold matrix | P0 — Critical | Given a PROC request of IDR 75M from Branch Jakarta-Tanjung Priok, the engine produces chain [Supervisor → Manager → GM] within 150ms |
| **FR-002** | Multi-Tier Sequential & Parallel Splits: The engine shall support both sequential tiers and parallel fork-join tiers (e.g., simultaneous clearance from Finance Manager and Legal Counsel before routing to GM) | P0 — Critical | Parallel steps are created atomically; fork-join gate blocks until all parallel steps reach APPROVED |
| **FR-003** | Matrix Bypass for In-Budget Items: If an OPEX item is pre-tagged with a verified ERP Budget Code and falls under IDR 50M, Tier 4 (GM) approval shall be bypassed | P1 — High | Budget-tagged OPEX IDR 30M skips GM; non-tagged IDR 30M does not skip |
| **FR-004** | Ad-Hoc Approver Insertion: Authorized approvers at Tier 4+ can insert a downstream ad-hoc reviewer without invalidating the governance chain | P1 — High | Inserted step appears between current and next tier; audit trail reflects insertion reason |

### 4.2 Automated Delegation Engine (*Pelaksana Tugas / Pjs*)

| FR ID | Requirement | Priority | Acceptance Criteria |
| :--- | :--- | :--- | :--- |
| **FR-005** | HRIS Leave Sync: Integrate with SAP SuccessFactors / internal HRIS via real-time webhooks to synchronize leave schedules, official external travel, and sick leaves | P0 — Critical | Leave status reflected within 60 seconds of HRIS event |
| **FR-006** | Automatic Delegation Trigger: When an approval step lands on a user flagged as absent/on-leave, the engine shall automatically route to the registered Acting Officer (*Pjs*) | P0 — Critical | Absent approver's step is re-assigned within 5 seconds; no manual intervention |
| **FR-007** | Manual Delegation Setup: Users can proactively configure time-bounded delegation rules specifying target assignee, scope, and ceiling monetary threshold | P1 — High | Delegation rule with start/end date, scope filter, and ceiling persists and activates at start date |
| **FR-008** | Delegation Ceilings & Upward Re-routing: A delegatee cannot exercise approval authority beyond their own baseline role limit unless granted by SK Direksi; if exceeded, auto-escalate upward | P0 — Critical | Delegatee with Manager ceiling receives VP-level request → auto-routes to VP's supervisor |
| **FR-009** | Delegation Recursion Prevention: Detect and prohibit circular or cascading delegations exceeding depth of 2 | P1 — High | A → B → C is allowed; C → A is rejected with clear error message |

### 4.3 SLA Management & Escalation Engine

| FR ID | Requirement | Priority | Acceptance Criteria |
| :--- | :--- | :--- | :--- |
| **FR-010** | Tier SLA Clock: Each approval step initializes a countdown SLA timer set to **1x24 business hours** (configurable per workflow type) | P0 — Critical | Timer starts on step activation; pauses on non-business hours if configured |
| **FR-011** | Early Warning Notification: At 75% SLA consumption (18 hours), dispatch alerts via Email, WhatsApp Business API, and Mobile Push | P0 — Critical | Notification delivered within 30 seconds of threshold crossing |
| **FR-012** | Auto-Escalation Execution: Upon 100% SLA expiration, execute escalation policy — re-route to approver's direct line manager or designated backup | P0 — Critical | Escalated step created, original step marked ESCALATED_SLA_BREACH, dashboard updated |
| **FR-013** | SLA Pause States: When request transitions to REVISION_REQUESTED, SLA clock freezes; a 48-hour author-response SLA initiates | P1 — High | Approver SLA frozen; author SLA starts; both correctly resume/stop on resubmit |

### 4.4 Action Lifecycle & Concurrency Protection

| FR ID | Requirement | Priority | Acceptance Criteria |
| :--- | :--- | :--- | :--- |
| **FR-014** | Core Action Set: Approver may execute APPROVE, REJECT, REQUEST_REVISION, and DELEGATE | P0 — Critical | All four actions produce correct state transitions and audit events |
| **FR-015** | Mandatory Justification: Rejection and Revision actions require structured comment (min 20 chars) and categorization tag | P1 — High | Action without comment or with < 20 chars returns 422 validation error |
| **FR-016** | Revise-Resubmit Differential Loop: On resubmit, if amounts unchanged/decreased, return to revising tier; if increased, recompute route from Tier 1 | P0 — Critical | Amount increase triggers full re-routing; decrease returns to same approver |
| **FR-017** | Optimistic Locking & Race Condition Prevention: Validate incremental `version` token; simultaneous actions on shared pool yield 409 Conflict for second actor | P0 — Critical | 100 concurrent threads hitting same step: exactly 1 succeeds, 99 receive 409 |
| **FR-018** | Idempotent Action Tokens: Client transmits `Idempotency-Key` UUID; repeated submissions within 300s window return cached response | P1 — High | Duplicate POST with same key returns 200 with original response body |

### 4.5 Audit Trail, Security & Reporting

| FR ID | Requirement | Priority | Acceptance Criteria |
| :--- | :--- | :--- | :--- |
| **FR-019** | Immutable Audit Logging: Every state transition writes immutable record with Actor ID, Real Persona ID (if delegated), IP, User Agent, Geolocation, Timestamp (UTC+7), Old State, New State, Digital Signature hash | P0 — Critical | Audit records are append-only; any mutation attempt triggers tamper alert |
| **FR-020** | Two-Factor Challenge for High-Value Approvals: Approvals exceeding IDR 1B require TOTP or biometric verification before commit | P0 — Critical | High-value approve without 2FA returns 403; with valid TOTP returns 200 |
| **FR-021** | Executive Dashboard & Analytics: Real-time analytics with branch-level MTTA, active bottlenecks, SLA breach rates, delegation volumes | P1 — High | Dashboard refreshes every 30 seconds; drill-down by branch, type, tier |
| **FR-022** | Bulk Operations & Batch Approval: Authorized users (Tier 5+) may batch-approve multiple requests of the same type if all are below their threshold ceiling | P2 — Medium | Batch of 10 requests approved atomically; partial failure rolls back entire batch |
| **FR-023** | Request Withdrawal: Requester may withdraw a request if no step has been actioned (all steps still PENDING) | P2 — Medium | Withdrawal transitions all steps to CANCELLED; notification sent to all assignees |
| **FR-024** | Document Versioning & Diff Tracking: Each resubmission creates a new document version; approvers can view field-level diffs between versions | P2 — Medium | Version history accessible; diff highlights changed fields in red/green |

---

## 5. Non-Functional Requirements (NFR)

| ID | Category | Requirement Specification | Measurement Metric |
| :--- | :--- | :--- | :--- |
| **NFR-001** | **Performance** | API response time for approval actions (`POST /api/v1/approvals/action`) must not exceed 200ms at P95 | P95 ≤ 200ms, P99 ≤ 500ms |
| **NFR-002** | **Throughput** | Handle peak operational surges during fiscal month-end reconciliations | 500 req/sec sustained, 1,200 req/sec burst |
| **NFR-003** | **High Availability** | Multi-region HA with zero single-point-of-failure | 99.95% annual uptime (< 4.38 hours downtime/yr) |
| **NFR-004** | **Data Integrity** | ACID guarantees on workflow step transitions; zero orphaned steps | 100% transactional integrity verified by integration tests |
| **NFR-005** | **Security** | ISO 27001, BUMN Cybersecurity Maturity, OWASP Top 10 API compliance | TLS 1.3, AES-256 at rest, JWT with RS256, CSP headers |
| **NFR-006** | **Auditability** | Append-only audit logs with cryptographic HMAC chain verification | Zero log mutation; automated tamper detection within 60s |
| **NFR-007** | **Scalability** | Horizontal scaling via stateless microservices backed by Redis and Postgres read replicas | Auto-scale at CPU > 70% or queue depth > 500 |
| **NFR-008** | **Recovery** | Disaster recovery for database and workflow state | RPO < 1 minute, RTO < 15 minutes |
| **NFR-009** | **Internationalization** | Support Bahasa Indonesia (primary) and English (secondary) UI and notifications | All UI strings externalized; locale switching without redeployment |
| **NFR-010** | **Observability** | Distributed tracing (OpenTelemetry), structured logging, health checks | Trace propagation across all services; /health endpoint < 50ms |

---

## 6. Actor & Use Case Specifications

### 6.1 Actor Profiles

| Actor | Description | Authentication | Primary Interactions |
| :--- | :--- | :--- | :--- |
| **Requester** (Staff/Officer) | Initiates PR, Capex, CR, or HR submissions | SSO + LDAP | Submit, Withdraw, Resubmit |
| **Approver** (Supervisor to Director) | Reviews, approves, rejects, or requests revisions within authority matrix | SSO + LDAP + 2FA (Tier 5+) | Approve, Reject, Revise, Delegate, Insert Ad-Hoc |
| **Delegatee** (Acting Officer / Pjs) | Temporarily exercises delegated authority on behalf of absent primary approver | SSO + LDAP | Same as Approver (with delegation ceiling enforcement) |
| **System Scheduler** (Workflow Daemon) | Background worker managing SLA countdowns, early warnings, and auto-escalations | Service Account + mTLS | Timer evaluation, Escalation, Notification dispatch |
| **Administrator** (Compliance/Audit) | Configures routing policies, monitors SLAs, conducts audit inspections | SSO + LDAP + MFA | Policy config, Log inspection, Report generation |
| **External System** (ERP / HRIS) | Upstream and downstream system integrations | API Key + mTLS | Webhook receive, Budget validation, Leave sync |

### 6.2 Detailed Use Case Descriptions

#### UC-001: Submit Approval Request

| Field | Detail |
| :--- | :--- |
| **Primary Actor** | Requester |
| **Preconditions** | Requester is authenticated; has valid department and cost center assignment |
| **Trigger** | Requester clicks "Submit for Approval" in the portal |

**Main Success Scenario:**
1. Requester fills request form: type, description, financial valuation, cost center, attachments.
2. Engine validates request schema (mandatory fields, attachment size ≤ 25 MB, valid cost center).
3. Engine queries Dynamic Routing Matrix: `f(Type, Amount, CostCenter, Branch, BudgetStatus)`.
4. Engine synthesizes ordered approval chain and persists `approval_chain` + `approval_steps`.
5. Step 1 transitions to `PENDING`; SLA timer starts; Tier 1 approver receives notification.
6. Request status becomes `IN_PROGRESS`.
7. Requester sees real-time status tracker in dashboard.

**Alternative Flows:**
- **AF-1 (Budget Pre-approved):** At step 3, if OPEX with verified budget code < IDR 50M, GM tier is omitted.
- **AF-2 (Parallel Tier):** At step 4, if routing rules specify parallel split (e.g., Finance + Legal), both steps are created with `PENDING` status simultaneously.

**Exception Flows:**
- **EF-1:** Invalid cost center → `422 Unprocessable Entity`, submission aborted with field-level error messages.
- **EF-2:** Attachment virus scan positive → `400 Bad Request`, file quarantined, security team alerted.

---

#### UC-002: Execute Multi-Tier Approval Action

| Field | Detail |
| :--- | :--- |
| **Primary Actor** | Tier Approver / Delegatee |
| **Preconditions** | User is assigned to the active pending step; step status is `PENDING` |
| **Trigger** | Approver opens request detail and selects an action |

**Main Success Scenario:**
1. Approver opens request detail, inspects attachments, delta values, and previous tier approvals.
2. Approver clicks `APPROVE` with optional remarks.
3. Engine validates entity `version` token to prevent race conditions.
4. Engine checks if 2FA is required (amount ≥ IDR 1B) — if yes, prompts for TOTP.
5. Current step transitions to `APPROVED`; SLA timer stops.
6. Immutable audit log persisted with user ID, IP, user agent, acting persona, and HMAC signature.
7. Engine checks for downstream steps:
   - If downstream exists → activate next step (`PENDING`), start SLA, notify next approver.
   - If no downstream → update request to `FULLY_APPROVED`, fire webhook to ERP core.

**Alternative Flows:**
- **AF-1 (Reject):** Approver selects `REJECT` with mandatory comment (≥ 20 chars) and tag → request status `REJECTED` → notification to requester.
- **AF-2 (Request Revision):** Approver selects `REQUEST_REVISION` → SLA pauses → requester notified with revision instructions.
- **AF-3 (Delegate):** Approver selects `DELEGATE` → engine validates target is eligible → step reassigned → original approver remains in audit trail.

---

#### UC-003: Auto-Escalate Stalled Approval (SLA Breach)

| Field | Detail |
| :--- | :--- |
| **Primary Actor** | System Scheduler / Workflow Daemon |
| **Preconditions** | Step status is `PENDING`, SLA elapsed time ≥ 24 business hours |
| **Trigger** | Background cron worker scheduled evaluation (every 5 minutes) |

**Main Success Scenario:**
1. Worker queries: `SELECT * FROM approval_steps WHERE status = 'PENDING' AND sla_due_at <= NOW()`.
2. Engine marks current step status as `ESCALATED_SLA_BREACH`.
3. Engine resolves approver's direct line manager from HRIS organizational hierarchy.
4. New escalation step created, assigned to line manager, preserving original tier authority context.
5. Urgent notification dispatched to line manager (Email + WhatsApp + Push).
6. SLA breach event recorded in `sla_escalations` table and flagged on executive dashboard.
7. Audit event `ACTION_AUTO_ESCALATED` logged with root cause metadata (original assignee, elapsed time).

---

#### UC-004: Request Revision and Resubmit Loop

| Field | Detail |
| :--- | :--- |
| **Primary Actor** | Tier Approver (reviewer) and Requester (author) |
| **Preconditions** | Approver determines supporting data is inadequate |
| **Trigger** | Approver clicks `REQUEST_REVISION` |

**Main Success Scenario:**
1. Approver selects `REQUEST_REVISION`, enters revision instructions (min 20 chars), selects category tag.
2. Step status → `REVISION_REQUESTED`; request status → `NEEDS_REVISION`; SLA timer pauses.
3. Author-response SLA (48 hours) initiates for requester.
4. Requester modifies attachments, line items, or description; clicks `RESUBMIT`.
5. Engine evaluates delta between version N and version N+1:
   - If amount unchanged or decreased → step resets to `PENDING` for same approver.
   - If amount increased → engine recomputes approval chain from Tier 1.
6. Approver receives notification of resubmission with highlighted diffs.
7. Approver re-evaluates and proceeds to approval/rejection.

---

#### UC-005: Configure Delegation (Manual)

| Field | Detail |
| :--- | :--- |
| **Primary Actor** | Approver (delegator) |
| **Preconditions** | User has delegation capability per tier matrix |
| **Trigger** | Approver navigates to "My Delegations" settings |

**Main Success Scenario:**
1. Delegator selects target delegatee from eligible personnel list (same or lower tier, same branch/division).
2. Delegator configures: start date, end date, scope (all types or specific), monetary ceiling.
3. Engine validates no circular delegation exists (depth ≤ 2).
4. Delegation rule persisted with status `SCHEDULED` or `ACTIVE`.
5. Upon activation, all new incoming steps for delegator are automatically re-routed to delegatee.
6. Audit log records delegation activation with both user IDs and full delegation parameters.

---

## 7. Requirement Traceability Matrix (RTM)

| Business Need | Functional Req IDs | Architecture Component | Verification Method |
| :--- | :--- | :--- | :--- |
| Dynamic Routing by Threshold | FR-001, FR-002, FR-003, FR-004 | `WorkflowOrchestrator` | Integration test: 50+ routing scenario matrix |
| Zero Absenteeism Bottleneck | FR-005, FR-006, FR-007, FR-008, FR-009 | `DelegationManager` | Mock HRIS sync + delegation ceiling validation |
| Timebox SLA & Accountability | FR-010, FR-011, FR-012, FR-013 | `SLADaemon` + `NotificationService` | Chaos test: delay processing > 24h |
| Concurrency & Data Safety | FR-017, FR-018 | Database locking + Redis idempotency guard | Stress test: 100 concurrent threads on 1 step |
| Regulatory Compliance & BPK Audit | FR-019, FR-020, FR-024 | `AuditLogger` + WORM storage | HMAC chain verification + tamper injection test |
| Operational Efficiency | FR-021, FR-022, FR-023 | `AnalyticsDashboard` + Batch API | UAT with branch managers |

---

## 8. Assumptions & Constraints

### 8.1 Assumptions
1. SAP SuccessFactors HRIS provides real-time webhook capabilities for leave status changes.
2. All employees have registered mobile devices for WhatsApp Business API notification delivery.
3. Corporate SSO (Active Directory / Keycloak) is the canonical identity provider.
4. ERP Budget Module exposes a synchronous REST API for budget allocation verification.
5. Network connectivity between branch offices and central data center meets minimum 10 Mbps SLA.

### 8.2 Constraints
1. The system must operate within the existing PT Nusantara Transindo private cloud infrastructure (no public cloud for primary workloads per BUMN regulation).
2. All data must reside within Indonesian jurisdiction (data sovereignty compliance).
3. Implementation timeline: 6 months from project kick-off to production go-live.
4. Budget envelope: IDR 4.5 Billion inclusive of infrastructure, licensing, and professional services.
5. Legacy system decommission requires parallel-run period of minimum 3 months.

---

## 9. Glossary

| Term | Definition |
| :--- | :--- |
| **Pjs (Pelaksana Tugas)** | Acting Officer — an employee temporarily executing the duties of an absent superior |
| **SK Direksi** | Board of Directors Decree — formal directive establishing authority delegation |
| **BPK** | Badan Pemeriksa Keuangan — Supreme Audit Board of the Republic of Indonesia |
| **GCG** | Good Corporate Governance — BUMN compliance framework |
| **MTTA** | Mean Time to Approval — average elapsed time from submission to final approval |
| **WORM** | Write Once Read Many — storage paradigm ensuring data immutability |
| **PR/PO** | Purchase Request / Purchase Order |
| **CAPEX** | Capital Expenditure |
| **OPEX** | Operational Expenditure |

---

*End of Document — NT-SA-2026-ENG-001 v1.0.0*
