# BPMN 2.0 Process Flow & Workflow Orchestration Specification

## Project: Dynamic Multi-Tier Approval Workflow & Delegation Engine

| Field | Value |
| :--- | :--- |
| **Document Reference** | NT-SA-2026-ENG-002 |
| **Version** | 1.0.0 |
| **Target Enterprise** | PT Nusantara Transindo (Persero) |
| **Standard** | BPMN 2.0 (Business Process Model and Notation) |
| **Status** | Approved for Implementation |
| **Author** | Principal System Analyst & Enterprise Architecture Team |

---

## 1. Overview & BPMN 2.0 Architecture

This document formalizes the operational workflows of the **Dynamic Multi-Tier Approval Workflow & Delegation Engine** using BPMN 2.0 conventions. The process model spans five primary swimlanes representing key organizational participants and system components:

1. **Requester (Pool: Operational Units):** Branch staff, department officers, and engineers initiating requests.
2. **Approver Pool (Pool: Corporate Hierarchy):** Supervisors, Managers, GMs, VPs, Directors, and PresDir.
3. **Delegation Engine (Subsystem):** Automated component evaluating leave status and re-routing to Acting Officers (*Pelaksana Tugas / Pjs*).
4. **SLA & Escalation Daemon (Subsystem):** Asynchronous background worker monitoring tier timers, early warnings, and auto-escalations.
5. **ERP & Downstream Core (External System):** SAP ERP, Treasury, General Ledger, and Fleet Management Core.

---

## 2. End-to-End Approval Orchestration Flow (BPMN 2.0)

### 2.1 Complete Workflow Diagram

```mermaid
flowchart TD
    %% Start Event
    Start([● Start: Request Submitted]) --> InitValidation[Validate Request Schema & Attachments]

    %% Validation Check
    InitValidation --> ValCheck{Valid Payload?}
    ValCheck -- No --> RejectInvalid[Return 422 Unprocessable Entity] --> EndFailed([✖ End: Submission Terminated])
    ValCheck -- Yes --> SynthRoute[Synthesize Dynamic Route via Threshold Engine]

    %% Dynamic Routing Gateways
    SynthRoute --> RouteFork{Threshold & Type Routing}

    %% Single Tier Fast Track
    RouteFork -- "Staff Fast-Track < IDR 5M" --> StepFastTrack[Step: Branch Manager Direct Approval]
    
    %% Multi-Tier Routes
    RouteFork -- "OPEX < IDR 25M" --> StepTier2[Step: Unit Supervisor]
    RouteFork -- "OPEX < IDR 100M" --> StepTier2
    RouteFork -- "OPEX < IDR 500M" --> StepTier3[Step: Department Manager]
    RouteFork -- "OPEX < IDR 2B" --> StepTier4[Step: Regional Hub GM]
    RouteFork -- "CAPEX / OPEX < IDR 10B" --> SplitParallel{Parallel Gateway: Finance & Legal}
    RouteFork -- "Enterprise >= IDR 10B" --> SplitExec{Parallel Gateway: VP, Director & Board}

    %% Parallel Branches
    SplitParallel --> StepFinMgr[Step: Finance Manager Review]
    SplitParallel --> StepLegal[Step: Legal Counsel Review]
    StepFinMgr --> JoinParallel{Join Gateway: All Approved?}
    StepLegal --> JoinParallel
    JoinParallel --> StepTier5[Step: Division VP Approval]

    SplitExec --> StepVPExec[Step: Division VP Approval]
    SplitExec --> StepRiskExec[Step: Enterprise Risk Assessment]
    StepVPExec --> JoinExec{Join Gateway: Exec Cleared?}
    StepRiskExec --> JoinExec
    JoinExec --> StepDirector[Step: Executive Director Approval]
    StepDirector --> StepPresDir[Step: President Director Sign-off]

    %% Step Execution Subprocess Link
    StepFastTrack --> ExecSubprocess[[Subprocess: Execute Step Approval with SLA & Delegation]]
    StepTier2 --> ExecSubprocess
    StepTier3 --> ExecSubprocess
    StepTier4 --> ExecSubprocess
    StepTier5 --> ExecSubprocess
    StepPresDir --> ExecSubprocess

    %% Subprocess Result Evaluation
    ExecSubprocess --> StepResult{Step Outcome}
    
    StepResult -- "REJECTED" --> StepRejected[Update Request Status: REJECTED]
    StepRejected --> NotifyRejection[Notify Requester with Mandatory Reason]
    NotifyRejection --> EndRejected([✖ End: Request Rejected])

    StepResult -- "REVISION_REQUESTED" --> StepRevision[Subprocess: Revision & Resubmit Loop]
    StepRevision --> ResubmitCheck{Resubmitted?}
    ResubmitCheck -- "Yes: Delta OK" --> ExecSubprocess
    ResubmitCheck -- "Yes: Amount Increased" --> SynthRoute
    ResubmitCheck -- "No: Expired / Cancelled" --> EndCancelled([✖ End: Request Withdrawn])

    StepResult -- "APPROVED" --> NextStepCheck{Downstream Steps Exist?}
    NextStepCheck -- Yes --> AdvanceStep[Activate Next Tier Step] --> ExecSubprocess
    NextStepCheck -- No --> StepFullyApproved[Update Request Status: FULLY_APPROVED]

    %% Completion
    StepFullyApproved --> TriggerERP[Fire Integration Webhook: ERP PO / Disbursement]
    TriggerERP --> NotifySuccess[Notify Requester & Stakeholders]
    NotifySuccess --> EndSuccess([✔ End: Workflow Completed])
```

---

## 3. Subprocess 1: Step Execution, SLA Monitoring & Delegation

Every individual tier step executes inside a standardized isolated subprocess containing Timer Boundary Events and Delegation Logic:

### 3.1 Subprocess BPMN Diagram

```mermaid
flowchart TD
    SubStart([Subprocess Start]) --> CheckLeave{Approver on Leave in HRIS?}

    %% Delegation Branch
    CheckLeave -- Yes --> FetchDelegatee[Fetch Registered Acting Officer / Pjs]
    FetchDelegatee --> CeilingCheck{Delegatee Threshold >= Amount?}
    CeilingCheck -- Yes --> AssignDelegatee[Assign Step to Pjs<br/>Log Acting-As Context]
    CeilingCheck -- No --> EscalateUpward[Auto-Escalate to Delegator Direct Supervisor]
    AssignDelegatee --> StartTimers[Set Step Status PENDING<br/>Start SLA Timer: 24h]
    EscalateUpward --> StartTimers

    %% Normal Assignee Branch
    CheckLeave -- No --> AssignPrimary[Assign Step to Primary Approver]
    AssignPrimary --> StartTimers

    %% Parallel Monitoring & Action
    StartTimers --> WaitAction{Approver Action / Boundary Events}

    %% Timer Boundary Event: 18h Warning
    WaitAction -- "Timer: 18 Hours Elapsed (75%)" --> SLAWarning[Boundary Event: Dispatch 75% SLA Warning<br/>WhatsApp, Email & Push]
    SLAWarning --> WaitAction

    %% Timer Boundary Event: 24h Escalation
    WaitAction -- "Timer: 24 Hours Elapsed (100%)" --> SLAEscalate[Boundary Event: SLA Breach Escalation]
    SLAEscalate --> ReassignManager[Mark Step ESCALATED_SLA_BREACH<br/>Reassign to Direct Line Manager]
    ReassignManager --> NotifyEscalation[Notify Line Manager & Log SLA Metric]
    NotifyEscalation --> WaitAction

    %% Explicit Approver Actions
    WaitAction -- "Action: APPROVE" --> ValidateAuth[Validate Token, 2FA if >= 1B, Entity Version]
    ValidateAuth --> CheckRace{Optimistic Lock Valid?}
    CheckRace -- No (Version Mismatch) --> ThrowConflict[Throw 409 Conflict<br/>Prompt User to Refresh] --> WaitAction
    CheckRace -- Yes --> CommitApprove[Commit APPROVED to Database<br/>Stop SLA Clock<br/>Append Immutable Audit Log]
    CommitApprove --> SubEndApprove([Subprocess End: APPROVED])

    WaitAction -- "Action: REJECT" --> ValidateRejectComment[Validate Mandatory Comment >= 20 chars]
    ValidateRejectComment --> CommitReject[Commit REJECTED<br/>Stop SLA Clock<br/>Append Immutable Audit Log]
    CommitReject --> SubEndReject([Subprocess End: REJECTED])

    WaitAction -- "Action: REQUEST_REVISION" --> ValidateRevComment[Validate Mandatory Instructions]
    ValidateRevComment --> CommitRevision[Commit REVISION_REQUESTED<br/>Pause Approver SLA Clock]
    CommitRevision --> SubEndRevision([Subprocess End: REVISION_REQUESTED])

    WaitAction -- "Action: MANUAL_DELEGATE" --> ValidateManualTarget[Validate Target User & Ceiling]
    ValidateManualTarget --> ReassignManual[Reassign Step to Target<br/>Log Audit Event] --> WaitAction
```

---

## 4. Subprocess 2: Revision and Resubmit Differential Loop

When an approver determines that a submission is incomplete or inaccurate, the workflow enters the **Revision & Resubmit Subprocess**:

### 4.1 Resubmit Sequence & Differential Routing

```mermaid
sequenceDiagram
    autonumber
    actor Approver as Tier N Approver
    participant Engine as Workflow Engine
    participant DB as PostgreSQL DB
    actor Requester as Requester
    participant HRIS as SAP HRIS

    Approver->>Engine: POST /action (REQUEST_REVISION, reason, delta_notes)
    Engine->>DB: UPDATE approval_steps SET status='REVISION_REQUESTED' WHERE id=step_id
    Engine->>DB: UPDATE approval_requests SET status='NEEDS_REVISION', version=version+1
    Engine->>DB: INSERT INTO audit_logs (action='REVISION_REQUESTED', actor=approver_id)
    Engine->>Requester: Dispatch Notification (Revision Requested + SLA 48h)

    Note over Requester: Requester edits attachments, cost items, or specifications
    
    alt Requester Resubmits within 48h
        Requester->>Engine: POST /resubmit (request_id, updated_payload)
        Engine->>DB: SELECT amount, cost_center FROM approval_requests WHERE id=request_id
        
        alt Financial Amount Increased (> Previous Amount)
            Note over Engine: Amount Increased: Baseline Authority Invalidated
            Engine->>DB: UPDATE approval_steps SET status='SUPERSEDED' WHERE status='PENDING'
            Engine->>Engine: Re-evaluate Routing Matrix (Synthesize Fresh Chain)
            Engine->>DB: INSERT INTO approval_steps (new tiers starting at Tier 1)
            Engine->>Approver: Notify: Request re-routed to Tier 1
        else Financial Amount Unchanged or Decreased
            Note over Engine: Differential OK: Return to Same Tier
            Engine->>DB: UPDATE approval_steps SET status='PENDING' WHERE id=step_id
            Engine->>Engine: Reset Step SLA Timer (24h)
            Engine->>Approver: Notify: Revised Request Ready for Re-evaluation
        end
    else Requester Fails to Resubmit within 48h (SLA Expired)
        Engine->>DB: UPDATE approval_requests SET status='WITHDRAWN_DUE_TO_INACTION'
        Engine->>Requester: Notification: Request Expired and Auto-Withdrawn
    end
```

---

## 5. Gateway Taxonomy & Technical Routing Rules

### 5.1 Exclusive Gateways (XOR - Threshold Routing)

Exclusive gateways direct the execution token along exactly one outbound path based on the boolean evaluation of the request parameters:

| Gateway ID | Gateway Name | Inbound Conditions | Outbound Destination | Business Rationale |
| :--- | :--- | :--- | :--- | :--- |
| `GW_XOR_01` | Amount Threshold Branching | `request_type == 'PROC'` and `amount < 5_000_000` | Tier 1 Fast-Track (Branch Manager) | Minor operational expenses (< 5M IDR) fast-tracked to prevent logistical halt |
| `GW_XOR_02` | Mid-Tier OPEX Threshold | `request_type == 'PROC'` and `5M <= amount < 25M` | Tier 2 (Unit Supervisor) | Standard operational spares and fleet repair kits |
| `GW_XOR_03` | Department Threshold | `request_type == 'PROC'` and `25M <= amount < 100M` | Tier 3 (Branch / Dept Manager) | Substantial regional hub purchases |
| `GW_XOR_04` | Regional Hub Threshold | `request_type == 'PROC'` and `100M <= amount < 500M` | Tier 4 (Regional Hub GM) | Inter-branch transport contracts and facility leases |
| `GW_XOR_05` | Corporate Division Threshold | `request_type == 'PROC'` and `500M <= amount < 2B` | Tier 5 (Corporate VP) | Fleet tire bulk procurement, port cargo handling |
| `GW_XOR_06` | Board Authority Threshold | `amount >= 10_000_000_000` | Tier 7 (President Director & BOC) | Vessel acquisitions, major multimodal terminal construction |

### 5.2 Inclusive Gateways (OR - Parallel Multi-Disciplinary Approvals)

Inclusive gateways allow one or more parallel approval streams to execute simultaneously based on condition tags. A downstream synchronizing inclusive merge gateway joins the parallel executions:

```mermaid
flowchart LR
    InGateway{Inclusive Split: CAPEX >= 2B}
    InGateway -- "Always Required" --> FinBranch[Finance Division Review<br/>Role: VP Finance]
    InGateway -- "Asset Type == Fleet / Vessel" --> TechBranch[Technical Fleet Review<br/>Role: VP Technical Ops]
    InGateway -- "External Contractual Risk == True" --> LegalBranch[Legal Counsel Review<br/>Role: VP Legal & Compliance]

    FinBranch --> InMerge{Inclusive Join: Synchronizing Gate}
    TechBranch --> InMerge
    LegalBranch --> InMerge

    InMerge --> PostExec[Directorate Approval Gate]
```

- **Execution Semantics:** The inclusive merge gateway dynamically computes the number of active inbound tokens created during the split and blocks advancement until all active branches emit an `APPROVED` signal.
- **Fast-Fail Semantics:** If any active parallel branch emits a `REJECTED` signal, the inclusive join immediately triggers cancellation tokens for all sibling pending branches, transitioning the overall request to `REJECTED`.

---

## 6. Boundary Timer Events & SLA Auto-Escalation Engine

### 6.1 State Machine for SLA Management

```
[Step Activated] 
       │
       ▼
   (PENDING) ───[T + 18h]───► Dispatch SLA Warning Alert (Email + WA + Push)
       │
   [T + 24h] (SLA Expiration)
       │
       ▼
[ESCALATED_SLA_BREACH]
       │
       ├─► Look up Line Manager in HRIS
       ├─► Generate Escalated Step (Tier N preserved)
       └─► Re-route assigned_user_id to Line Manager
```

### 6.2 Escalation Matrix by Corporate Tier

| Breaching Approver Tier | Line Manager Fallback Target | Secondary Fallback (if Line Manager on Leave) | Notification Urgency |
| :--- | :--- | :--- | :--- |
| **Tier 2 (Supervisor)** | Department Manager | Assistant Manager | Moderate (Email + Mobile App) |
| **Tier 3 (Manager)** | General Manager (Regional Hub) | Senior Manager / Designated Pjs | High (WhatsApp + Email) |
| **Tier 4 (General Manager)** | Division Vice President | Corporate Director | Urgent (Direct SMS + WA + Push) |
| **Tier 5 (Vice President)** | Executive Director (C-Suite) | President Director | Critical (Executive Assistant Alert) |
| **Tier 6 (Director)** | President Director | Board of Commissioners Audit Committee | Immediate Executive Briefing |

---

## 7. Delegation Subprocess & Exception Handlers

### 7.1 Automated Delegation Logic Flowchart

```mermaid
flowchart TD
    D1[Event: Step Ready for Assignment] --> D2[Query HRIS Leave Roster for Assignee]
    D2 --> D3{Is Assignee on Leave or Travel?}
    D3 -- No --> D4[Assign Step to Original User]
    
    D3 -- Yes --> D5[Query Active Delegations: delegator_id = user_id]
    D5 --> D6{Delegation Rule Exists?}
    
    D6 -- Yes --> D7[Check Delegation Scope & Ceilings]
    D7 --> D8{Delegatee Ceiling >= Amount?}
    D8 -- Yes --> D9[Assign Step to Registered Pjs<br/>Set is_delegated = TRUE, real_actor = Pjs]
    D8 -- No --> D10[Log Ceiling Mismatch Exception<br/>Route Upward to Delegator Supervisor]
    
    D6 -- No --> D11[No Delegation Configured by Absentee<br/>Apply Default Organizational Fallback]
    D11 --> D12[Route Step to Direct Deputy or Supervisor<br/>Mark delegation_mode = AUTO_ABSENCE_FALLBACK]
```

---

## 8. BPMN Process Traceability & Verification

| Process Trace ID | Path Evaluated | Expected Final State | Validation Criterion |
| :--- | :--- | :--- | :--- |
| **TRACE-01** | Sub-5M fast track approval by Branch Manager | `FULLY_APPROVED` | 1 step generated, executed in < 2 hours |
| **TRACE-02** | 80M OPEX: Supervisor → Manager → GM; Manager requests revision; resubmitted with same amount | `FULLY_APPROVED` | Step resets to Manager without repeating Supervisor step |
| **TRACE-03** | 150M OPEX: GM on leave with Pjs configured; Pjs approves within 12 hours | `FULLY_APPROVED` | Step executed by Pjs; audit log contains both delegator and Pjs IDs |
| **TRACE-04** | 3B CAPEX: Parallel split (Finance + Legal); Finance approves, Legal rejects | `REJECTED` | Legal rejection terminates Finance branch immediately; request marked `REJECTED` |
| **TRACE-05** | 40M OPEX: Supervisor breaches 24h SLA | `ESCALATED_SLA_BREACH` | New step generated for Department Manager; breach count incremented for Supervisor |

---

*End of Document — NT-SA-2026-ENG-002 v1.0.0*
