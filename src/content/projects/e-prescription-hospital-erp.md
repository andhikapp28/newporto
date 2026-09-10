---
title: "Hospital E-Prescription & Pharmacy Inventory ERP"
description: "Modernizing clinical prescription flows, doctor-to-pharmacist handoffs, and stock dispensing with role-based access control (RBAC) and immutable audit logs."
client: "Regional Healthcare Network (3 Hospitals)"
role: "System Analyst & QA Lead"
period: "2023"
category: "HealthTech & Enterprise ERP"
featured: true
tags: ["HealthTech", "FHIR / HL7 Standards", "RBAC", "PostgreSQL", "Audit Trail", "Manual & Auto QA"]
metrics:
  - label: "Dispensing Errors"
    value: "0 Incidents"
  - label: "Prescription Fulfillment"
    value: "3.2x Faster"
  - label: "Doctor Adoption Rate"
    value: "96%"
---

## Executive Summary
Paper-based prescription slips caused illegible handwriting issues, delayed pharmacy queue times, and frequent discrepancies with physical medicine stock. The initiative unified the Electronic Medical Record (EMR) with the central pharmacy inventory system across 3 hospital branches.

## Key Bottlenecks Identified
- **Medication Reconciliation Errors:** Risk of adverse drug interactions when patients were prescribed by different specialists simultaneously.
- **Stock Phantom Discrepancy:** Pharmacy stock counts did not update in real-time, resulting in doctors prescribing medicines that were out of stock.
- **Strict Data Privacy:** Strict regulatory requirements for patient health records and medical confidentiality (Permenkes 24/2022).

## Technical Specification & Implementation Strategy

### 1. Requirements & BPMN Modeling
- Elicited requirements from 4 key user groups: General Practitioners, Specialists, Pharmacists, and Hospital Administrators.
- Designed complete swimlane BPMN diagrams covering: Prescription Creation → Automated Drug Interaction Check → Pharmacy Verification → Dispensation & Patient Counseling.

### 2. Dev Feasibility: Relational Data Model & Drug Master Database
- Formulated normalized database schema handling batch expiration dates, dosage formulations, and hierarchical substitution rules.
- Designed real-time WebSocket push notifications to pharmacy display terminals when high-urgency (CITO) prescriptions are submitted.

### 3. QA Rigor: Safety-Critical Verification
- Mapped exhaustive edge-case test matrix for drug contraindications (e.g. prescribing Penicillin to a patient flagged with severe allergy).
- Executed high-load concurrency testing for simultaneous peak out-patient clinic hours (8:00 AM - 11:00 AM).

## Business Impact
- **Eliminated 100% of illegible prescription errors.**
- **Average Patient Pharmacy Waiting Time** dropped from 42 minutes to 13 minutes.
- **Auditing Compliance:** Passed national health ministry electronic medical record accreditation with an A rating.
