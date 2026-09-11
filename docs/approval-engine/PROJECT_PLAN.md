# Dynamic Multi-Tier Approval Workflow & Delegation Engine
## Enterprise Project Plan, Sprint Breakdown & Governance Framework

---

| **Document Information** | **Specification Details** |
| :--- | :--- |
| **Project Title** | Dynamic Multi-Tier Approval Workflow & Delegation Engine |
| **Target Candidate / Role** | Andhika Putra Pratama — Senior System Analyst / Enterprise Solution Architect |
| **Enterprise Client** | PT Nusantara Transindo (BUMN Transport & Logistics Holding) |
| **Project Manager** | Senior Technical Project Management (PM) Office |
| **Document Version** | 1.0.0 (Formal Enterprise Release) |
| **Effective Date** | Q3/Q4 Enterprise Cycle |
| **Status** | Approved for Execution |
| **Target Repository / Path** | `E:/KODING/Porto/docs/approval-engine/PROJECT_PLAN.md` |

---

## Executive Summary

**PT Nusantara Transindo** is a premier Indonesian state-owned transport and logistics holding company operating across **50+ nationwide branch offices**, managing over **3,000+ permanent and contract personnel**, and orchestrating multi-modal freight, maritime shipping, and overland distribution. 

Due to historical decentralized mergers and legacy paper-based/hybrid practices, the enterprise faces critical bottlenecks:
1. **Unpredictable Approval Cycles:** Critical operational requests (Procurement, Capex, Change Requests, HR mutations) experience average approval lead times exceeding 14 calendar days.
2. **Audit Deficiencies & Compliance Vulnerabilities:** Disconnected email approvals and informal authorization memos fail BPK (Badan Pemeriksa Keuangan) and internal BUMN compliance audits.
3. **Out-of-Office Deadlocks:** Approvers traveling or on annual leave halt regional terminal operations due to absent or unmonitored delegation governance.
4. **SLA Blindspots:** Executive leadership lacks real-time telemetry into pending approval queues, tier-level bottlenecks, and financial exposure risk.

This project delivers an enterprise-grade **Dynamic Multi-Tier Approval Workflow & Delegation Engine**. Built from an exhaustive System Analysis foundation into a resilient Laravel proof-of-concept (PoC) and integrated into Andhika Putra Pratama's Windows XP interactive portfolio and a dedicated standalone repository, this initiative proves end-to-end systems architecture leadership, rigorous business analysis, and modern engineering maturity.

---

## 1. Project Scope & Objectives

### 1.1 Core Strategic Objectives
* **Objective 1 (Process Determinism & Velocity):** Reduce enterprise approval cycle latency from an average of 14 days to less than 48 hours across all financial tiers by enforcing automated 1x24h tier-level SLAs and escalation triggers.
* **Objective 2 (Dynamic Rule Matrix):** Architect an expressive, database-driven Decision Matrix capable of resolving multi-tier approver chains based on Organizational Unit (OrgUnit), Financial Thresholds (IDR), Risk Classification, and Request Category without hardcoded code modifications.
* **Objective 3 (Legal Delegation & Acting Officer Support):** Implement a legally robust *Pejabat Sementara* (Pjs / Acting Officer) delegation protocol with strict time-boxing, scope restriction, granular audit trail segregation, and immediate revocation.
* **Objective 4 (Auditability & Compliance Assurance):** Maintain an immutable, tamper-evident audit event log capturing every state transition, user attribution, system escalation, proxy approval, and timestamp for 100% compliance with BUMN governance standards.
* **Objective 5 (Portfolio Showcase Excellence):** Demonstrate Senior System Analyst caliber to technical recruiters, Engineering Directors, and Enterprise Solution Architects via complete specification artifacts (BRD/SRS, BPMN 2.0, ERD, Data Dictionary, OpenAPI 3.1) and interactive browser-based portfolio presentation.

### 1.2 Enterprise Organizational Hierarchy
The engine models PT Nusantara Transindo's 7-tier corporate governance structure:

```
[Tier 7] PresDir (Direktur Utama)       -> Executive Board / Unlimited Financial Authority
   ▲
[Tier 6] Director (Direktur Operasional/Keuangan) -> Enterprise Directorate (Up to IDR 10B)
   ▲
[Tier 5] VP (Vice President)             -> Division Head / Corporate HQ (Up to IDR 2B)
   ▲
[Tier 4] GM (General Manager)            -> Regional Corridor / Branch General Manager (Up to IDR 500M)
   ▲
[Tier 3] Manager                         -> Departmental Head / Terminal Manager (Up to IDR 100M)
   ▲
[Tier 2] Supervisor                      -> Unit / Fleet Section Lead (Up to IDR 25M)
   ▲
[Tier 1] Staff                           -> Request Originator / Operational Staff (Up to IDR 5M)
```

### 1.3 Approval Types & Business Domains
1. **Procurement (PR / PO):** Purchase Requisitions and Purchase Orders for operational logistics consumables, spare parts, fleet maintenance, fuel supply, and warehouse materials.
2. **Capital Expenditure (Capex):** Vessel acquisitions, truck fleet expansion, container yard crane procurement, regional hub land leases, and major infrastructure investments.
3. **Change Request (CR):** IT & Engineering changes, route operational adjustments, customs clearance protocol modifications, and core logistics software schema alterations.
4. **Human Resources (Leave & Mutation):** Annual/medical leave, regional cross-branch employee mutations, temporary terminal rotations, and promotional tier advancements.

### 1.4 Financial Threshold Matrix (IDR)
Financial requests evaluate sequentially through required organizational bands until reaching the tier holding requisite financial sign-off authority:

| Tier Level | Designation | Max Approval Limit (IDR) | Cumulative Approval Rule |
| :---: | :--- | :--- | :--- |
| **Tier 1** | Staff | `< Rp 5.000.000` | Self-contained operational petty cash / minor supplies (single tier) |
| **Tier 2** | Supervisor | `< Rp 25.000.000` | Requires Tier 1 Submission -> Tier 2 Approval |
| **Tier 3** | Manager | `< Rp 100.000.000` | Requires Tier 1 -> Tier 2 -> Tier 3 Approval |
| **Tier 4** | General Manager (GM) | `< Rp 500.000.000` | Requires Tier 1 -> Tier 2 -> Tier 3 -> Tier 4 Approval |
| **Tier 5** | Vice President (VP) | `< Rp 2.000.000.000` | Requires Tier 1 -> Tier 2 -> Tier 3 -> Tier 4 -> Tier 5 Approval |
| **Tier 6** | Director | `< Rp 10.000.000.000` | Requires Tier 1 -> ... -> Tier 5 -> Tier 6 Board Approval |
| **Tier 7** | President Director (PresDir) | `≥ Rp 10.000.000.000` (Unlimited) | Full chain escalation to Chief Executive Officer |

*Note: Non-financial requests (Leave, Mutation, CR) use Risk / Criticality Levels (Low, Medium, High, Emergency) mapped directly to designated tiers (e.g., Cross-regional Mutation requires GM + HR Director; Critical IT CR requires VP Technology).*

### 1.5 SLA, Delegation (Pjs), and Escalation Rules
* **Standard Tier SLA:** Exactly **1x24 hours (24:00:00)** countdown initiated upon entering an approver's queue.
* **Proactive Breach Warning:** Automated notification dispatched at **T - 6 hours** (at 18 hours elapsed) via email/in-app alert to current pending approver.
* **Breach & Auto-Escalation:** At **T = 24 hours**, system marks the step as `ESCALATED_SLA_BREACH`, preserves the breach event in the audit trail, and either:
  1. Escalates authority to the immediate superior tier in the reporting line, OR
  2. Re-assigns the task to the designated Departmental Deputy/Pjs, notifying Division Head.
* **Delegation / Pjs (Pejabat Sementara) Framework:**
  - An approver can grant active delegation to a subordinate or peer of equivalent rank for a defined date-time window `[delegation_start, delegation_end]`.
  - Delegation contracts specify allowable scopes: `ALL`, `FINANCIAL_ONLY_BELOW_THRESHOLD`, `LEAVE_ONLY`, etc.
  - Action attribution: Audit logs explicitly state: *Approved by Budi Santoso (Pjs) on behalf of Hendra Wijaya (GM Regional 1) under Delegation ID #DEL-2026-042*.
  - Emergency Revocation: Primary approvers can revoke delegation immediately upon returning to duty.

### 1.6 Scope Boundaries

```
┌─────────────────────────────────────────────────────────┬────────────────────────────────────────────────────────┐
│ IN-SCOPE                                                │ OUT-OF-SCOPE                                           │
├─────────────────────────────────────────────────────────┼────────────────────────────────────────────────────────┤
│ • Dynamic multi-tier rule evaluation engine             │ • Direct payment gateway / bank disbursement execution │
│ • 4 request types: PR/PO, Capex, CR, HR Mutations      │ • Full HRIS payroll calculation engine                 │
│ • State-machine workflow tracking & transition audits   │ • Native iOS / Android mobile application codebases    │
│ • Pejabat Sementara (Pjs) delegation with scoping       │ • Multi-tenant SaaS billing / subscription management  │
│ • 1x24h SLA timers, warnings, and auto-escalation daemon│ • Heavy legacy ERP data migration execution            │
│ • Complete SA documentation (BRD, SRS, BPMN, ERD, DD)   │ • Real hardware Biometric authentication devices       │
│ • Laravel 11 PoC with RESTful OpenAPI 3.1 contract     │                                                        │
│ • Windows XP Luna-themed portfolio case study UI        │                                                        │
│ • Comprehensive automated Pest/PHPUnit test suite       │                                                        │
└─────────────────────────────────────────────────────────┴────────────────────────────────────────────────────────┘
```

---

## 2. Sprint Breakdown (3-Sprint Lifecycle)

```
===================================================================================================
                                  PROJECT LIFECYCLE ROADMAP
===================================================================================================
 SPRINT 1: Research & SA Documentation
 ├─ Task 1.1: Enterprise BRD & SRS (ISO/IEC/IEEE 29148 & BABOK Standards)
 ├─ Task 1.2: Enterprise BPMN 2.0 Workflows (Core, Pjs Delegation, SLA Escalation)
 ├─ Task 1.3: Relational ERD & Database Schema Modeling (3NF Architecture)
 └─ Task 1.4: Enterprise Data Dictionary & State Transition Matrix
       │
       ▼ [Quality Gate 1: SA & Requirements Integrity]
 SPRINT 2: PoC Backend Development & API Contract
 ├─ Task 2.1: OpenAPI 3.1 RESTful Contract Specification
 ├─ Task 2.2: Laravel 11 Workflow Core Engine (State Pattern, Rule Evaluator, Audit Observers)
 ├─ Task 2.3: Delegation & SLA Escalation Daemon (Console Schedules, Queue Events)
 └─ Task 2.4: Seeders, Comprehensive Pest/PHPUnit Test Suite, and Postman Collection
       │
       ▼ [Quality Gate 2: Code Architecture & QA Verification]
 SPRINT 3: Portfolio Integration & Showcase
 ├─ Task 3.1: Windows XP Portfolio Luna Desktop Case Study Window Component
 ├─ Task 3.2: Standalone Production GitHub Repository Packaging
 └─ Task 3.3: Interactive Live Demonstration & Architecture Presentation Module
       │
       ▼ [Quality Gate 3: Senior SA Presentation & Executive Review]
===================================================================================================
```

---

### Sprint 1: Research & System Analysis Documentation
* **Sprint Goal:** Establish complete, audit-grade enterprise System Analyst documentation modeling PT Nusantara Transindo's approval architecture to professional corporate standards.
* **Duration:** Sprint 1 Focus (Foundational System Architecture)
* **Lead:** Andhika Putra Pratama (Senior System Analyst)

#### Detailed Deliverables & Work Breakdown
1. **Deliverable 1.1: Business Requirements Document (BRD) & Software Requirements Specification (SRS)**
   - *File Target:* `docs/approval-engine/01_BRD_SRS.md`
   - Enterprise business context, operational pain points, and current-state vs future-state gap analysis.
   - Comprehensive Functional Requirements (FR-01 to FR-28) with traceability identifiers.
   - Non-Functional Requirements (NFR-01 to NFR-15): Performance (<200ms evaluation latency), Concurrency (500 simultaneous requests), High Availability (99.9%), Security (RBAC, tamper-evident audit hashes), and Compliance (BUMN/PP No. 60/2008).
   - User Personas: Operational Staff, Departmental Supervisor, Regional GM, Corporate VP, Executive Director, System Administrator, Compliance Auditor.

2. **Deliverable 1.2: BPMN 2.0 Process Models & Workflows**
   - *File Target:* `docs/approval-engine/02_BPMN_Process_Flow.md`
   - **Diagram 1 (End-to-End Submission & Multi-Tier Resolution):** Pools for Submitter, System Engine, Approver Tiers 1-7, and Finance/ERP. Includes conditional sequence flows, parallel forks, and data-based gateway routing.
   - **Diagram 2 (Delegation & Pjs Acting Officer Lifecyle):** Pre-delegation declaration, authorization validation, operational proxy execution, and revocation loops.
   - **Diagram 3 (SLA Timer & Auto-Escalation Loop):** Intermediate boundary timer events (18h warning, 24h expiration), event-based gateways, compensation flows, and escalation handling.
   - Detailed XML/Mermaid sequence diagrams and narrative process step definitions.

3. **Deliverable 1.3 & 1.4: Relational ERD & Enterprise Data Dictionary / State Transition Matrix**
   - *File Target:* `docs/approval-engine/03_ERD_Data_Dictionary.md`
   - Fully normalized (3NF) relational database design with PostgreSQL/MySQL compliance.
   - Key Entities: `users`, `roles`, `departments`, `organization_units`, `approval_rules`, `rule_criteria`, `approval_requests`, `approval_steps`, `approval_actions`, `delegations`, `sla_policies`, and `audit_trails`.
   - Complete foreign key constraints, composite index definitions, cascading policies, and soft-delete strategies.
   - Exhaustive column-by-column field definitions: Table Name, Field Name, Data Type, Length, Nullable, Default, Index, Constraints, and Enterprise Business Descriptions.
   - State Transition Matrix mapping permissible transitions across states:
     `DRAFT` → `SUBMITTED` → `IN_REVIEW` → `APPROVED` | `REJECTED` | `REVISED` | `DELEGATED` | `ESCALATED` | `CANCELLED`.
   - Invalidation rules: illegal transitions, state guard conditions, idempotency rules.

---

### Sprint 2: PoC Backend Development (Laravel) + API Contract
* **Sprint Goal:** Build a working, robust Laravel 11 proof-of-concept backend implementing the dynamic workflow engine, delegation logic, SLA background escalation daemon, and OpenAPI 3.1 contract.
* **Duration:** Sprint 2 Focus (Engineering & PoC Realization)
* **Lead:** Backend Technical Engineer / System Analyst Architect

#### Detailed Deliverables & Work Breakdown
1. **Deliverable 2.1: OpenAPI 3.1 Specification (RESTful API Contract)**
   - *File Target:* `docs/approval-engine/sprint2/openapi-approval-engine.yaml`
   - Strict OpenAPI 3.1.0 schema specification covering:
     - Authentication (`/api/v1/auth/login`) with Sanctum bearer tokens.
     - Request Lifecycle (`/api/v1/requests`, `/api/v1/requests/{id}`, `/api/v1/requests/{id}/submit`, `/api/v1/requests/{id}/approve`, `/api/v1/requests/{id}/reject`, `/api/v1/requests/{id}/revise`).
     - Delegation Management (`/api/v1/delegations`, `/api/v1/delegations/{id}/revoke`).
     - Rule Engine Configuration (`/api/v1/rules`, `/api/v1/rules/evaluate-preview`).
     - Audit & Telemetry (`/api/v1/requests/{id}/audit-trail`, `/api/v1/analytics/sla-metrics`).
   - Detailed request/response schemas with standard JSON:API-style payload structures, error status codes (400, 401, 403, 404, 409 Conflict, 422 Validation, 500), and reusable component schemas.

2. **Deliverable 2.2: Laravel Core Engine Implementation**
   - *File Target Location:* `apps/approval-engine-backend/` (or repository scaffold)
   - Migrations modeling all entities specified in Sprint 1 ERD.
   - Eloquent Models with explicit relationships, casting, scopes, and UUID primary keys.
   - Core Engine Services:
     - `RuleEvaluationService`: Parses request payload, matches criteria against active rules, builds dynamic sequential/parallel approval chains.
     - `WorkflowStateMachine`: Enforces valid state transitions and triggers lifecycle events.
     - `DelegationService`: Resolves effective approver by querying active `delegations` table during runtime.
     - `AuditLogService`: Observer-driven recording of actor, action, previous_state, new_state, IP address, user agent, and payload checksum.

3. **Deliverable 2.3: Delegation & SLA Escalation Daemon**
   - Scheduled Console Command: `php artisan workflow:check-sla-breaches`.
   - Calculates real-time elapsed seconds per active step against configured SLA (default 86400 seconds).
   - Generates automated escalation events (`StepEscalatedEvent`), reassigns current step to higher tier or supervisor, and broadcasts notification hooks.
   - Pjs auto-expiry cron: `php artisan workflow:expire-delegations` to gracefully terminate out-of-office delegations past `end_date`.

4. **Deliverable 2.4: Seeders, Automated Test Suite, and Postman Collection**
   - Database Seeders populating PT Nusantara Transindo's 7-tier organizational structure, 50 branch org units, sample users for each tier, and standard approval matrices.
   - Pest / PHPUnit Test Suite:
     - Unit Tests: Rule evaluation priority matching, boundary threshold checks (e.g., IDR 4,999,999 vs 5,000,001), delegation window validity.
     - Feature Tests: Full multi-tier lifecycle (Submit → Supervisor Approve → Manager Approve → GM Approve → Finalized), SLA breach auto-escalation trigger, unauthorized approval rejection (403), circular delegation prevention.
   - Exported Postman / Insomnia Collection (`postman_collection.json`) with pre-configured environment variables for quick reviewer testing.

---

### Sprint 3: Portfolio Integration & Showcase
* **Sprint Goal:** Integrate the approval engine project into Andhika Putra Pratama's Windows XP interactive portfolio as a rich desktop application window and package a pristine standalone GitHub repository.
* **Duration:** Sprint 3 Focus (User Experience, Integration & Presentation)
* **Lead:** Fullstack Portfolio Engineer / Senior System Analyst

#### Detailed Deliverables & Work Breakdown
1. **Deliverable 3.1: Windows XP Portfolio Luna Desktop Case Study Window Component**
   - *File Target Location:* `src/components/apps/ApprovalEngineApp.astro` (or React/Astro portfolio view component in `E:/KODING/Porto`)
   - Luna Windows XP UI aesthetics: Classic blue header, tabbed dialog (`General`, `Architecture & BRD`, `Interactive Workflow Demo`, `BPMN / ERD Viewer`, `API Contract & Specs`).
   - Interactive Workflow Simulator: Allows recruiters to pick a Request Type (e.g., Capex), enter an amount (e.g., IDR 350,000,000), toggle Approver Out-of-Office (Pjs Mode), and watch the dynamic tier chain render in real time with step-by-step approval buttons.
   - System Analyst deep dive tabs displaying embedded ERD schemas, state transition diagrams, and architectural rationale.

2. **Deliverable 3.2: Standalone Production GitHub Repository Packaging**
   - *File Target Location:* Standalone folder / Git setup ready for GitHub publication (`apps/approval-engine-backend/` & documentation links).
   - Comprehensive `README.md` featuring:
     - Architectural banner, project badges, executive summary.
     - Interactive ASCII & SVG architecture diagrams.
     - Step-by-step local setup instructions (`composer install`, `php artisan migrate --seed`, `php artisan test`).
     - System Analyst Case Study writeup highlighting business problem, proposed solution, architectural tradeoffs, and measurable ROI for PT Nusantara Transindo.
     - Docker Compose / Laravel Sail configuration for single-command evaluator spin-up (`docker compose up -d`).

3. **Deliverable 3.3: Interactive Live Demonstration & Architecture Presentation Module**
   - High-fidelity visual workflow inspector showcasing real-time JSON payloads, rule matching logs, and audit trail outputs.
   - Exportable PDF / Markdown summary generator for HR reviewers and hiring managers.

---

## 3. Acceptance Criteria per Deliverable

### Sprint 1: Research & SA Documentation Acceptance Criteria

```gherkin
Feature: Business Requirements and Specification Integrity (Deliverable 1.1)
  Scenario: Validation of requirements coverage
    Given the BRD/SRS document is compiled
    When reviewed against ISO/IEC/IEEE 29148 standards
    Then it must contain at least 25 numbered Functional Requirements (FR) with explicit acceptance criteria
    And it must contain at least 10 Non-Functional Requirements (NFR) specifying latency, security, and scalability
    And it must explicitly define the 7-tier governance hierarchy of PT Nusantara Transindo
    And it must include all 4 domain request categories: PR/PO, Capex, Change Request, and HR Leave/Mutation.
```

```gherkin
Feature: BPMN 2.0 Process Modeling Conformance (Deliverable 1.2)
  Scenario: Validation of multi-tier BPMN workflows
    Given the BPMN 2.0 workflow specifications
    When parsed by standard BPMN engines or visual renderers
    Then the Core Approval Workflow must illustrate end-to-end routing from Tier 1 Staff to Tier 7 PresDir
    And it must feature conditional branching gateways evaluating threshold boundaries (5M, 25M, 100M, 500M, 2B, 10B)
    And the Delegation Sub-process must model time-window verification, Pjs assignment, and notification
    And the SLA Escalation model must show intermediate timer boundary events at 18h warning and 24h breach.
```

```gherkin
Feature: Relational ERD & Schema Normalization (Deliverable 1.3)
  Scenario: Database schema normalization and relationship integrity
    Given the Entity Relationship Diagram and DDL schema
    When evaluated against Third Normal Form (3NF) principles
    Then there must be no transitive functional dependencies
    And all foreign key relations (users, approval_requests, approval_steps, audit_trails) must have explicit onDelete and onUpdate actions
    And the schema must support composite indexing on (request_id, step_order) and (user_id, status)
    And audit trail records must be immutable (no update or hard-delete privileges granted).
```

```gherkin
Feature: Enterprise Data Dictionary & State Matrix Completeness (Deliverable 1.4)
  Scenario: Field-level definitions and state machine integrity
    Given the Data Dictionary and State Transition Matrix
    When checked for every table and column
    Then each entry must provide: field name, data type, max length, nullable constraint, default value, and business description
    And the State Transition Matrix must explicitly prohibit invalid state jumps (e.g., REJECTED cannot become APPROVED without a new submission cycle)
    And all terminal states (APPROVED, REJECTED, CANCELLED) must be clearly identified.
```

---

### Sprint 2: PoC Backend Development Acceptance Criteria

```gherkin
Feature: OpenAPI 3.1 Contract Validation (Deliverable 2.1)
  Scenario: Schema linting and endpoint completeness
    Given the OpenAPI 3.1 YAML specification
    When validated via Spectral or Redocly CLI
    Then it must yield 0 errors and 0 warnings
    And it must define all endpoints for request creation, multi-tier actioning, delegation declaration, and audit log retrieval
    And every response schema must define valid HTTP 200, 201, 400, 401, 403, 404, 422, and 500 structures.
```

```gherkin
Feature: Dynamic Multi-Tier Rule Evaluation (Deliverable 2.2)
  Scenario: Accurate dynamic tier chain generation
    Given a Purchase Requisition request of IDR 350,000,000 originating from Tier 1 Staff
    When the RuleEvaluationService processes the request
    Then the generated approval pipeline must contain exactly 4 sequential steps:
      | Step Order | Required Approver Role | Financial Authority Limit |
      | 1          | Supervisor             | Up to 25M                 |
      | 2          | Manager                | Up to 100M                |
      | 3          | General Manager (GM)   | Up to 500M                |
    And it must NOT require VP or Director sign-off because IDR 350M <= IDR 500M
    And each step must initialize with status PENDING and an active 1x24h SLA timer.
```

```gherkin
Feature: Pejabat Sementara (Pjs) Delegation Engine (Deliverable 2.2 & 2.3)
  Scenario: Delegation execution and audit attribution
    Given GM Hendra Wijaya has an active delegation to Pjs Budi Santoso valid from 2026-09-10 to 2026-09-20
    When a request awaiting GM approval is reviewed by Pjs Budi Santoso
    Then Budi Santoso is authorized to approve the request
    And the resulting approval_actions record must record:
      | Field            | Value                              |
      | actor_id         | Budi Santoso (User ID)             |
      | on_behalf_of_id  | Hendra Wijaya (User ID)            |
      | delegation_id    | Active Delegation ID               |
      | action           | APPROVED                           |
    And the step status transitions to COMPLETED.
```

```gherkin
Feature: 1x24h SLA Countdown & Auto-Escalation Daemon (Deliverable 2.3)
  Scenario: Automatic breach escalation upon 24 hours expiry
    Given an approval step has been in PENDING status for 24 hours and 1 minute (86,460 seconds)
    When the scheduled command 'php artisan workflow:check-sla-breaches' executes
    Then the step status must update to ESCALATED
    And a new escalation record must be logged in audit_trails
    And an automated escalation step must be created targeting the immediate superior role
    And an alert event must be dispatched to system notification channels.
```

```gherkin
Feature: Automated Test Coverage & Code Quality (Deliverable 2.4)
  Scenario: Pest / PHPUnit test execution
    Given the backend test suite is executed
    When running 'php artisan test --coverage'
    Then test line coverage must exceed 85% across all Core Engine Services
    And 100% of all unit and feature tests must pass without regressions or skipped assertions.
```

---

### Sprint 3: Portfolio Integration Acceptance Criteria

```gherkin
Feature: Windows XP Portfolio Case Study Window (Deliverable 3.1)
  Scenario: Luna desktop window execution and interactive simulator
    Given the user navigates the Windows XP portfolio desktop at E:/KODING/Porto
    When the user double-clicks the 'Approval Engine Case Study' desktop icon or Start Menu item
    Then an authentic Windows XP Luna styled modal window must open with sound/visual fidelity
    And the user can interact with the live Approval Rule Simulator to input IDR amounts and observe dynamic chain calculation
    And all architecture tabs (BRD, BPMN, ERD, API) must render smoothly without UI overflow or console errors.
```

```gherkin
Feature: Standalone Production GitHub Repository (Deliverable 3.2 & 3.3)
  Scenario: Standalone repository review readiness
    Given an external recruiter or hiring manager clones the repository
    When following the instructions in README.md
    Then the project can be spun up cleanly via Docker Compose or PHP local server
    And running database migrations and seeders creates an immediate, testable demo dataset
    And the repository contains an executive architectural summary explicitly highlighting Andhika Putra Pratama's contributions as Senior System Analyst.
```

---

## 4. Quality Gates Framework

To ensure that the artifacts meet enterprise standards and reflect senior-level capability, three specialized review gates are established:

```
                  ┌────────────────────────────────────────────────────────┐
                  │                 DELIVERABLE SUBMISSION                 │
                  └───────────────────────────┬────────────────────────────┘
                                              │
                                              ▼
                  ┌────────────────────────────────────────────────────────┐
                  │          GATE 1: SYSTEM ANALYST INTEGRITY GATE         │
                  │  • ISO/IEC/IEEE 29148 Compliance                       │
                  │  • BABOK Requirements Traceability Matrix              │
                  │  • BPMN 2.0 Semantic & Gateway Correctness             │
                  │  • 3NF Database Normalization & Data Dictionary Depth   │
                  └───────────────────────────┬────────────────────────────┘
                                              │ [PASSED]
                                              ▼
                  ┌────────────────────────────────────────────────────────┐
                  │          GATE 2: QA & TECHNICAL EXCELLENCE GATE        │
                  │  • OpenAPI 3.1 Spec Linting (0 Errors, 0 Warnings)     │
                  │  • Code Architecture: Service Layer & State Pattern    │
                  │  • Test Coverage > 85% (Unit, Edge Cases, Concurrency) │
                  │  • SLA Daemon & Cron Timing Precision                   │
                  └───────────────────────────┬────────────────────────────┘
                                              │ [PASSED]
                                              ▼
                  ┌────────────────────────────────────────────────────────┐
                  │       GATE 3: HR & TECHNICAL RECRUITER REVIEW GATE     │
                  │  • Enterprise Realism (Indonesian BUMN Logistics Context│
                  │  • Storytelling: Problem -> Architecture -> Business ROI│
                  │  • Windows XP Luna Portfolio Integration Polish         │
                  │  • Standalone GitHub Presentation & One-Click Readiness │
                  └───────────────────────────┬────────────────────────────┘
                                              │ [PASSED]
                                              ▼
                  ┌────────────────────────────────────────────────────────┐
                  │           FINAL ENTERPRISE PORTFOLIO RELEASE           │
                  └────────────────────────────────────────────────────────┘
```

### 4.1 Gate 1: System Analyst (SA) Review Gate
* **Reviewer:** Principal System Analyst / Enterprise Architect Agent
* **Mandatory Criteria Checklist:**
  - [ ] **Traceability Matrix:** Every Functional Requirement (FR) maps to at least one entity attribute, API endpoint, and test case.
  - [ ] **Edge-Case Completeness:** Documented specifications for circular delegation loops, deceased/terminated approvers, multi-currency conversion fallback, zero-approver department edge cases, and parallel conflict resolutions.
  - [ ] **BPMN 2.0 Rigor:** Proper usage of start/end events, conditional sequence flows, compensation triggers, sub-processes, and intermediate boundary timer events. No disconnected flows or deadlocks.
  - [ ] **Database Soundness:** Strict 3NF compliance, elimination of data redundancies, foreign key referential integrity with explicit indices on all join keys and state query predicates.

### 4.2 Gate 2: QA & Backend Engineering Gate
* **Reviewer:** Lead QA Automation Engineer Agent
* **Mandatory Criteria Checklist:**
  - [ ] **API Contract Hygiene:** OpenAPI 3.1 linting passes cleanly via standard linters without schema ambiguities.
  - [ ] **Threshold Accuracy:** Boundary condition tests verify exact currency cutoffs (e.g., IDR 24,999,999 routes to Supervisor max; IDR 25,000,000 advances to Manager tier).
  - [ ] **Concurrency & Race Conditions:** Two approvers acting simultaneously on the same pending step cannot produce dual approvals or inconsistent states (tested with pessimistic locking / database transactions).
  - [ ] **SLA Daemon Performance:** Escalation cron processes batches of 1,000 overdue steps within <5 seconds without locking pending transactions.
  - [ ] **Test Coverage:** Automated test suite executes green with >85% code coverage across service and state layers.

### 4.3 Gate 3: HR & Technical Recruiter Gate
* **Reviewer:** Senior Technical Recruiter & VP of Engineering Evaluator Agent
* **Mandatory Criteria Checklist:**
  - [ ] **Enterprise Gravitas:** The scenario (PT Nusantara Transindo, Indonesian BUMN logistics) immediately conveys high-stakes enterprise experience, not a generic tutorial or toy app.
  - [ ] **Clarity of Business Impact:** Documentation and case study highlight concrete business metrics (e.g., cycle time reduced from 14 days to 48h, 100% audit readiness, 0 unmonitored approvals).
  - [ ] **Aesthetic & Experiential Polish:** Windows XP Luna desktop integration feels responsive, nostalgic, and intuitive, showcasing front-end craftsmanship alongside backend systems architecture.
  - [ ] **Developer Experience (DX):** Standalone repository features a top 1% README with clear architecture diagrams, crisp GIF/screenshots, copy-pasteable Docker setup, and zero-hassle evaluation.

---

## 5. Definition of Ready (DoR) & Definition of Done (DoD)

### 5.1 Definition of Ready (DoR)
A sprint task or deliverable is Ready for implementation only when:
1. **User Story & Acceptance Criteria Formulated:** Clear user story written in standard Agile format with explicit Given-When-Then criteria.
2. **Data & Schema Dependencies Identified:** Required database tables, foreign keys, and input/output payload contracts are documented.
3. **Enterprise Edge Cases Addressed:** Unusual scenarios (e.g., approver on leave without setting Pjs, concurrent edits, transaction rollback) are defined.
4. **Architectural Review Approved:** Technical approach reviewed for consistency with PT Nusantara Transindo's organizational governance.

### 5.2 Definition of Done (DoD)
A deliverable is declared Done and accepted into the portfolio release only when:
1. **Specification & Documentation Completed:** All markdown documentation is fully fleshed out, properly formatted, cross-linked, and saved under `docs/approval-engine/`.
2. **Code Implementation Verified:** Working code committed, following PSR-12 coding standards, typed strictly, and free of security flaws (OWASP Top 10 checked).
3. **Automated Tests Passing:** Unit and integration tests written and passing green with line coverage ≥85%.
4. **API Contract Synchronized:** OpenAPI 3.1 schema matches 100% of live controller routes, parameters, and response structures.
5. **No Broken Links or Assets:** Diagrams, references, and UI assets load without 404s or rendering artifacts.
6. **Cross-Agent Sign-off:** Sign-offs recorded from SA Agent, QA Agent, and PM Lead.

---

## 6. Risk Management, Assumptions & Mitigations

| Risk ID | Risk Description | Likelihood | Impact | Mitigation Strategy |
| :---: | :--- | :---: | :---: | :--- |
| **RSK-01** | **Circular Delegation Loops**<br>(User A delegates to B, B delegates to C, C delegates to A) | Medium | High | Enforce recursive graph traversal validation during delegation creation. Reject creation if target user already delegates back to originator. |
| **RSK-02** | **SLA Escalation Cascade Overload**<br>(Batch escalation triggering hundreds of simultaneous notifications) | Low | Medium | Implement queued job dispatching with rate limiting and batch chunks of 50 records per daemon cycle. |
| **RSK-03** | **Stale / Concurrent Approvals**<br>(Two Pjs acting on the same step simultaneously) | Medium | High | Utilize database row-level locking (`SELECT ... FOR UPDATE`) inside atomic database transactions during action execution. |
| **RSK-04** | **Complex Threshold Matrix Maintenance**<br>(Frequent business policy changes hardcoded in code) | High | High | Decouple rules from codebase into database-driven `approval_rules` and `rule_criteria` evaluated by an extensible RuleEngine. |
| **RSK-05** | **Portfolio Window Performance Overhead**<br>(Large ERD/BPMN artifacts slowing Windows XP Astro desktop) | Low | Medium | Lazy-load heavy case study tabs and diagrams; use lightweight SVG/Mermaid vectors with zoom-pan modals. |

---

## 7. Project Execution Governance & Multi-Agent Protocol

```
+-----------------------------------------------------------------------------------------+
|                                 MULTI-AGENT RACI MATRIX                                 |
+--------------------------+------------+------------+---------------+--------------------+
| Deliverable              | PM Agent   | SA Agent   | Backend Dev   | QA / Review Agent  |
+--------------------------+------------+------------+---------------+--------------------+
| BRD & SRS Documents      | Accountable| Responsible| Consulted     | Informed           |
| BPMN 2.0 Workflows       | Consulted  | Responsible| Consulted     | Informed           |
| ERD & Data Dictionary    | Consulted  | Responsible| Consulted     | Informed           |
| OpenAPI 3.1 Contract     | Informed   | Accountable| Responsible   | Consulted          |
| Laravel PoC Core Engine  | Informed   | Consulted  | Responsible   | Accountable        |
| SLA Daemon & Pjs Logic   | Informed   | Consulted  | Responsible   | Accountable        |
| Pest / PHPUnit Tests     | Informed   | Informed   | Responsible   | Accountable        |
| Windows XP Portfolio UI  | Accountable| Consulted  | Responsible   | Informed           |
| Standalone GitHub Repo   | Accountable| Responsible| Responsible   | Accountable        |
+--------------------------+------------+------------+---------------+--------------------+
```

### Next Steps & Handoff Directive:
With this Project Plan formally established and approved, the engineering workstream immediately transitions to **Sprint 1 Execution**:
1. SA Agent initiates **Task 1.1**: Enterprise BRD & SRS compilation (`01_BRD_SRS.md`).
2. SA Agent initiates **Task 1.2**: BPMN 2.0 Workflow modeling (`02_BPMN_Process_Flow.md`).
3. SA Agent initiates **Task 1.3 & 1.4**: ERD schema design and Data Dictionary (`03_ERD_Data_Dictionary.md`).

---
*Project Plan authored & approved by Senior Technical PM Office on behalf of Andhika Putra Pratama.*
