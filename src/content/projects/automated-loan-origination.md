---
title: "Automated Loan Origination & Rule-Based Credit Scoring Engine"
description: "Architecting a multi-tier financial evaluation pipeline, bridging strict financial compliance into deterministic microservices with exhaustive negative QA assertions."
client: "Fintech P2P Lending Platform"
role: "System Analyst & Solution Architect"
period: "2023 - 2024"
category: "Fintech & Regulatory Tech"
featured: true
tags: ["Fintech", "Decision Engine", "REST API", "PostgreSQL", "Swagger", "BDD Gherkin", "Security Audit"]
metrics:
  - label: "Approval TAT"
    value: "15m -> 45s"
  - label: "Credit Policy Drift"
    value: "0%"
  - label: "Regulatory Compliance"
    value: "100% Passed"
---

## Executive Summary
Financial underwriting was heavily constrained by manual assessor reviews, taking 15 minutes to 3 hours per applicant. The challenge was digitizing multi-variable scoring algorithms, third-party credit bureau integrations (FDC, SLIK, Dukcapil), and fraud checks while ensuring strict data privacy and zero audit discrepancy.

## Key System Architecture Challenges
- **Multiple Fragile 3rd-Party APIs:** External government and credit registry APIs frequently suffered timeouts and unpredictable schema changes.
- **Auditability Requirements:** Every single underwriting decision had to be deterministically reproducible for central bank compliance audits.
- **Complex Scoring Rules:** Business teams frequently changed credit criteria rules without developer redeployment overhead.

## Solutions & System Specifications

### 1. Business Logic & DMN (Decision Model and Notation)
- Designed a decoupled Business Rules Engine (BRE) allowing analysts to define credit risk score matrices without modifying core application code.
- Mapped applicant funnel through comprehensive state diagrams and fault-tolerant fallbacks.

### 2. Dev Feasibility: Circuit Breaker & Resilient API Design
- Specified circuit breakers and fallback queues for 3rd-party credit bureau APIs. If Bureau A timed out, the system automatically fell back to Bureau B with adjusted risk weights.
- Designed strictly typed JSON schemas with cryptographic HMAC signature verification for webhook callbacks.

### 3. QA Rigor: Automated Negative Assertions & Synthetic Fraud Vectors
- Authored 90+ synthetic test identities to test boundary conditions: blacklisted NIKs, anomalous salary ratios, and duplicated document hashing.
- Enforced Gherkin scenarios for every underwriting rule branch to ensure 100% test coverage before production deployment.

## Business Impact
- **Turnaround Time (TAT):** Decreased from 15 minutes to 45 seconds for 82% of eligible applicants.
- **Default / NPL Rate:** Remained below 1.2% due to strict rule verification and multi-vector identity matching.
- **Zero Regulatory Audit Findings:** 100% of decision logs were immutable and instantly queryable.
