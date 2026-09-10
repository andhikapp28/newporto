---
title: "Omnichannel POS & Real-Time Inventory Sync Architecture"
description: "Redesigning legacy retail POS infrastructure into an event-driven architecture with offline-first synchronization, zero stock discrepancy, and strict QA boundary validation."
client: "Retail Chain (50+ Outlets)"
role: "Lead System Analyst (with Dev & QA oversight)"
period: "2024"
category: "Retail Tech & Distributed Systems"
featured: true
tags: ["Event-Driven", "PostgreSQL", "BPMN 2.0", "OpenAPI", "Postman Automation", "Redis"]
metrics:
  - label: "Stock Discrepancy"
    value: "0.01%"
  - label: "Sync Latency"
    value: "< 350ms"
  - label: "QA Test Scenarios"
    value: "140+ cases"
---

## Executive Summary
Prior to this initiative, the client experienced severe stock discrepancies between physical retail stores and e-commerce channels due to batched cron synchronization. During flash sales, over-selling caused high order cancellation rates (up to 14%).

As the **System Analyst**, I led the end-to-end specification: from stakeholder elicitation to architecture blueprinting, defining API contracts with engineering, and crafting exhaustive automated QA scenarios for network partition edge cases.

## Problem Statement & Bottleneck Analysis
- **Concurrency Race Conditions:** Two online shoppers and one cashier checkout could purchase the last SKU simultaneously.
- **Offline Reliability:** Cashiers could not process checkouts when internet connections were unstable or down.
- **Unclear Acceptance Criteria:** Developers previously coded assumptions without formal error handling schemas.

## Solution Architecture & Specifications

### 1. Analysis Phase: BPMN 2.0 State Machine
- Modeled the order lifecycle: `DRAFT` → `RESERVED (5m TTL)` → `PAID` → `DEDUCTED` → `FULFILLED` or `RELEASED`.
- Introduced optimistic locking on SKU inventory records in PostgreSQL with distributed Redis reservation tokens.

### 2. Dev Feasibility: API Contract & Idempotency
- Formulated RESTful contracts using OpenAPI 3.1 with mandatory `X-Idempotency-Key` headers.
- Prevented double-charging and duplicate deduction even when cashiers clicked "Pay" multiple times under slow network.

### 3. QA Rigor: Edge Cases & Network Partitioning
- Designed 140+ test cases including chaos network drop during checkout payload transmission.
- Automated API test collections using Postman & Newman in CI pipeline to validate 4xx and 5xx fallback behaviors.

## Measurable Business Impact
- **Order Cancellations due to Stock Discrepancy** dropped from 14% to less than 0.01%.
- **Checkout Processing Time** improved by 62% through asynchronous background event dispatching.
- **Sprint Rework Rate** reduced by 45% due to comprehensive pre-sprint SRS and Gherkin acceptance criteria.
