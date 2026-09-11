# Go-Live Production Readiness Checklist

## Dynamic Multi-Tier Approval Workflow & Delegation Engine

| Metadata        | Detail                                        |
|-----------------|-----------------------------------------------|
| **Project**     | PT Nusantara Transindo — Approval Engine      |
| **Document**    | 07 — Production Go-Live Readiness Checklist   |
| **Version**     | 1.0                                           |
| **Author**      | QA Engineering & DevOps Division              |
| **Created**     | 2026-09-11                                    |
| **Go-Live Date**| TBD (pending quality gate sign-off)           |
| **Status**      | Draft — Pending Review                        |

---

## Table of Contents

1. [Pre-Go-Live Timeline](#1-pre-go-live-timeline)
2. [Code Sanitization Checks](#2-code-sanitization-checks)
3. [Database Migration Verification](#3-database-migration-verification)
4. [Rollback Scripts & Procedures](#4-rollback-scripts--procedures)
5. [SSL / SSO Validation](#5-ssl--sso-validation)
6. [Performance Baseline & SLA](#6-performance-baseline--sla)
7. [Monitoring & Alerting Setup](#7-monitoring--alerting-setup)
8. [5-Minute Rollback SOP](#8-5-minute-rollback-sop)
9. [Go-Live Day Runbook](#9-go-live-day-runbook)
10. [Post-Go-Live Stabilization](#10-post-go-live-stabilization)
11. [Sign-Off](#11-sign-off)

---

## 1. Pre-Go-Live Timeline

| Day        | Activity                                        | Owner      | Status |
|------------|------------------------------------------------|------------|--------|
| T-14       | Code freeze on `release/approval-engine-v1`    | Dev Lead   | 🔲     |
| T-14       | Final SIT execution and defect triage          | QA Lead    | 🔲     |
| T-10       | UAT environment refresh with production data   | DBA        | 🔲     |
| T-10       | UAT test execution begins                      | QA + Business | 🔲  |
| T-7        | Performance / load test execution              | DevOps     | 🔲     |
| T-5        | Security penetration test                      | InfoSec    | 🔲     |
| T-3        | UAT sign-off deadline                          | Product Owner | 🔲  |
| T-2        | Staging deployment dry run                     | DevOps     | 🔲     |
| T-2        | Rollback drill in staging                      | DevOps     | 🔲     |
| T-1        | Go/No-Go decision meeting                      | Steering Committee | 🔲 |
| T-0        | Production deployment                          | DevOps + On-call | 🔲 |
| T+1        | Hypercare monitoring begins                    | SRE        | 🔲     |
| T+7        | Hypercare review & hand-off to BAU support     | All        | 🔲     |

---

## 2. Code Sanitization Checks

### 2.1 Static Analysis & Code Quality

| # | Check                                           | Tool / Method        | Criteria                              | Status | Evidence |
|---|------------------------------------------------|----------------------|---------------------------------------|--------|----------|
| 1 | No hardcoded credentials in source code         | `gitleaks`, `trufflehog` | Zero findings                       | 🔲     |          |
| 2 | No hardcoded IP addresses or hostnames          | Custom regex scan    | All URLs via env vars / config        | 🔲     |          |
| 3 | No `TODO`, `FIXME`, `HACK` comments in release branch | `grep -rn "TODO\|FIXME\|HACK"` | Zero findings (or exempted with JIRA link) | 🔲 | |
| 4 | No debug logging statements (`console.log`, `System.out.println`, `print()`) | Static analysis rule | Zero non-sanctioned debug output     | 🔲     |          |
| 5 | No disabled security controls (`@Ignore`, `skip_auth`, `CORS: *`) | Manual review + grep | Zero findings                       | 🔲     |          |
| 6 | All environment-specific config externalized    | Config audit         | Zero hardcoded env references         | 🔲     |          |
| 7 | Dependencies vulnerability scan                 | `npm audit` / `pip audit` / `mvn dependency-check` | Zero HIGH/CRITICAL CVEs | 🔲 | |
| 8 | License compliance check                        | `license-checker`    | No GPL-incompatible licenses in production deps | 🔲 | |
| 9 | Code coverage ≥ 80% for approval engine module  | JaCoCo / Istanbul    | 80% line coverage, 70% branch        | 🔲     |          |
| 10| SonarQube quality gate passed                   | SonarQube            | Zero blocker/critical issues; ≤ 5 major | 🔲  |          |

### 2.2 API Contract Verification

| # | Check                                                | Criteria                           | Status |
|---|-----------------------------------------------------|------------------------------------|--------|
| 1 | OpenAPI spec matches implementation                  | `swagger-diff` zero breaking changes | 🔲   |
| 2 | All API endpoints require authentication             | No unprotected routes              | 🔲     |
| 3 | Rate limiting configured on approval endpoints       | 100 req/min per user               | 🔲     |
| 4 | Request/response payload size limits enforced        | Max 10 MB per request              | 🔲     |
| 5 | API versioning headers present (`X-API-Version`)     | Version header in all responses    | 🔲     |
| 6 | Error responses use standard format (RFC 7807)       | Consistent error schema            | 🔲     |

---

## 3. Database Migration Verification

### 3.1 Migration Script Validation

| # | Check                                                  | Method                         | Criteria                                 | Status |
|---|-------------------------------------------------------|--------------------------------|------------------------------------------|--------|
| 1 | All migration scripts versioned (Flyway/Liquibase)     | Migration tool audit           | Sequential version numbering, no gaps    | 🔲     |
| 2 | Migration scripts idempotent                           | Run migration twice on clean DB | Second run completes with no errors     | 🔲     |
| 3 | Rollback script exists for each migration              | File audit                     | 1:1 mapping: `V{n}__*.sql` → `R{n}__*.sql` | 🔲 |
| 4 | Migration tested on production-volume dataset          | Staging with prod clone        | Completes within maintenance window (< 30 min) | 🔲 |
| 5 | No destructive DDL without data preservation           | Script review                  | `DROP TABLE` preceded by backup; `ALTER` preserves data | 🔲 |
| 6 | Index creation uses `CONCURRENTLY` where applicable    | Script review                  | No table locks > 5 seconds               | 🔲 |

### 3.2 Data Integrity Checks

| # | Check                                                  | Query / Method                           | Criteria              | Status |
|---|-------------------------------------------------------|------------------------------------------|-----------------------|--------|
| 1 | Row count comparison: pre vs post migration            | `SELECT COUNT(*) FROM {each table}`      | Delta report clean    | 🔲     |
| 2 | Checksum verification for critical tables              | `MD5(CAST(array_agg(t.* ORDER BY id) AS TEXT))` | Checksums match | 🔲   |
| 3 | Foreign key constraint integrity                       | `SELECT * FROM pg_constraint WHERE contype = 'f'` — verify all valid | Zero orphaned references | 🔲 |
| 4 | New columns have appropriate defaults                  | Schema diff                              | No nullable columns without business justification | 🔲 |
| 5 | Audit table structure preserved                        | Schema compare                           | Immutable triggers intact | 🔲 |
| 6 | Approval policy seed data loaded                       | Spot check                               | All tier thresholds match spec | 🔲 |
| 7 | Branch and cost center reference data complete         | `SELECT COUNT(*) FROM branches`          | Matches master list    | 🔲    |

### 3.3 Backup & Recovery

| # | Check                                                  | Method                    | Criteria                                | Status |
|---|-------------------------------------------------------|---------------------------|-----------------------------------------|--------|
| 1 | Full database backup taken before migration            | `pg_dump` with verification | Backup file verified (restore test)   | 🔲     |
| 2 | Point-in-time recovery (PITR) configured               | WAL archiving check       | WAL shipped to backup location          | 🔲     |
| 3 | Backup restore tested in isolated environment          | Restore to temp instance  | Full restore < 60 minutes; data intact  | 🔲     |
| 4 | Backup retention policy documented                     | Policy review             | 30-day retention; 7 daily + 4 weekly    | 🔲     |

---

## 4. Rollback Scripts & Procedures

### 4.1 Application Rollback

| # | Component                    | Rollback Method                                  | RTO      | Status |
|---|------------------------------|--------------------------------------------------|----------|--------|
| 1 | Backend API (approval-engine)| Container image rollback: `kubectl rollout undo deployment/approval-engine` | < 2 min | 🔲 |
| 2 | Frontend SPA                 | CDN cache invalidation + redeploy previous build | < 3 min  | 🔲     |
| 3 | Background workers (SLA timer, escalation) | `kubectl rollout undo deployment/approval-workers` | < 2 min | 🔲 |
| 4 | Database schema              | Execute rollback migration `R{n}__rollback_*.sql` | < 10 min | 🔲    |
| 5 | Configuration (ConfigMap/Secrets) | `kubectl rollout undo configmap/approval-config` + pod restart | < 3 min | 🔲 |

### 4.2 Rollback Decision Criteria

| Trigger                                           | Severity | Action                          |
|---------------------------------------------------|----------|---------------------------------|
| HTTP 5xx rate > 5% of traffic for > 3 minutes     | Critical | Immediate full rollback         |
| Approval routing produces incorrect tier assignment | Critical | Immediate full rollback         |
| Data corruption detected in audit trail           | Critical | Immediate full rollback + data recovery |
| p95 latency > 5s for > 5 minutes                 | High     | Rollback if not resolved in 15 min |
| Email notifications not sending                   | Medium   | Continue; hot-fix within 4 hours |
| UI cosmetic issue                                 | Low      | Continue; fix in next patch      |

### 4.3 Rollback Script Inventory

| Script File                          | Purpose                           | Tested On    | Last Test Date |
|--------------------------------------|-----------------------------------|--------------|----------------|
| `rollback/R001__undo_approval_tables.sql` | Reverts approval schema changes  | Staging      |                |
| `rollback/R002__undo_delegation_tables.sql` | Reverts delegation tables       | Staging      |                |
| `rollback/R003__undo_sla_config.sql` | Reverts SLA configuration tables  | Staging      |                |
| `rollback/R004__undo_audit_triggers.sql` | Removes new audit triggers      | Staging      |                |
| `rollback/deploy_rollback.sh`        | Full orchestrated rollback script | Staging      |                |
| `rollback/verify_rollback.sh`        | Post-rollback integrity checks   | Staging      |                |

---

## 5. SSL / SSO Validation

### 5.1 SSL/TLS Configuration

| # | Check                                                  | Tool / Method           | Criteria                              | Status |
|---|-------------------------------------------------------|-------------------------|---------------------------------------|--------|
| 1 | TLS 1.2 minimum enforced (TLS 1.0/1.1 disabled)      | `nmap --script ssl-enum-ciphers` | No TLS < 1.2 supported         | 🔲     |
| 2 | Certificate chain valid and complete                   | `openssl s_client -connect` | Full chain to trusted root CA      | 🔲     |
| 3 | Certificate expiry > 90 days from go-live             | Certificate audit       | Expiry date verified                  | 🔲     |
| 4 | HSTS header present with `max-age ≥ 31536000`        | `curl -I` inspection    | Header present and correct            | 🔲     |
| 5 | Certificate auto-renewal configured (Let's Encrypt / ACM) | Automation check    | Renewal tested successfully           | 🔲     |
| 6 | Weak cipher suites disabled                           | `testssl.sh`            | No RC4, DES, 3DES, NULL, EXPORT       | 🔲     |
| 7 | OCSP stapling enabled                                 | `openssl s_client -status` | OCSP response present              | 🔲     |
| 8 | Internal service-to-service mTLS configured           | Service mesh audit      | All inter-service calls encrypted     | 🔲     |

### 5.2 SSO / Azure AD Integration

| # | Check                                                  | Method                         | Criteria                              | Status |
|---|-------------------------------------------------------|--------------------------------|---------------------------------------|--------|
| 1 | SSO login flow: user redirected to Azure AD            | Manual test                    | Redirect to `login.microsoftonline.com` | 🔲   |
| 2 | SSO callback processes correctly                       | Manual test                    | Token exchange succeeds; user session created | 🔲 |
| 3 | SSO logout: session destroyed on both app and IdP      | Manual test                    | Single-logout propagation verified    | 🔲     |
| 4 | Role mapping: Azure AD groups → application roles      | Cross-reference audit          | All 10 test users map to correct roles | 🔲    |
| 5 | Token refresh: silent re-auth before expiry            | Monitor network tab            | Refresh token call at T-5min of expiry | 🔲    |
| 6 | MFA enforcement for approver roles                     | Policy check                   | Conditional Access policy active for approval actions | 🔲 |
| 7 | Fallback: SSO outage handled gracefully                | Simulate IdP timeout           | Error page with "SSO temporarily unavailable" + service desk contact | 🔲 |
| 8 | Service principal permissions scoped correctly          | Azure AD App Registration audit | Minimum necessary Graph API permissions | 🔲  |
| 9 | SAML assertion / OIDC claims include required attributes | Token inspection              | `email`, `name`, `groups`, `employee_id` present | 🔲 |
| 10| Session duration aligned with security policy           | Config review                  | 30-min idle timeout; 8-hour max session | 🔲   |

---

## 6. Performance Baseline & SLA

### 6.1 Response Time SLA

| Endpoint / Operation                       | Method | p50 Target | p95 Target | p99 Target | Max     | Status |
|--------------------------------------------|--------|-----------|-----------|-----------|---------|--------|
| `POST /api/requests` (submit request)      | POST   | < 500 ms  | < 1,500 ms| < 3,000 ms| 5,000 ms| 🔲     |
| `POST /api/approvals/{id}/approve`         | POST   | < 300 ms  | < 1,000 ms| < 2,000 ms| 3,000 ms| 🔲     |
| `GET /api/approvals/queue`                 | GET    | < 200 ms  | < 800 ms  | < 1,500 ms| 2,000 ms| 🔲     |
| `GET /api/requests/{id}` (detail view)     | GET    | < 150 ms  | < 500 ms  | < 1,000 ms| 2,000 ms| 🔲     |
| `POST /api/delegations` (create delegation)| POST   | < 400 ms  | < 1,200 ms| < 2,500 ms| 4,000 ms| 🔲     |
| `GET /api/audit/{requestId}` (audit trail) | GET    | < 300 ms  | < 1,000 ms| < 2,000 ms| 3,000 ms| 🔲     |
| `POST /api/requests/bulk-approve`          | POST   | < 1,000 ms| < 3,000 ms| < 5,000 ms| 8,000 ms| 🔲     |
| SSO login flow (redirect → callback)       | —      | < 1,500 ms| < 3,000 ms| < 5,000 ms| 8,000 ms| 🔲     |

### 6.2 Load Test Configuration

| Parameter                        | Value                                          |
|----------------------------------|------------------------------------------------|
| Tool                             | k6 / Apache JMeter                             |
| Baseline concurrent users        | 100                                            |
| Peak concurrent users            | 500                                            |
| Stress test peak                 | 1,000                                          |
| Test duration                    | 30 minutes steady state + 10 min ramp          |
| Data set                         | 10,000 pre-seeded requests across 5 branches   |
| Approval action mix              | 60% approve, 20% reject, 10% return, 10% delegate |

### 6.3 Load Test Results (to be filled)

| Metric                          | Baseline (100 users) | Peak (500 users) | Stress (1000 users) | Pass? |
|---------------------------------|---------------------|-------------------|---------------------|-------|
| Avg response time               |                     |                   |                     | 🔲    |
| p95 response time               |                     |                   |                     | 🔲    |
| p99 response time               |                     |                   |                     | 🔲    |
| Error rate                      |                     |                   |                     | 🔲    |
| Throughput (req/sec)            |                     |                   |                     | 🔲    |
| CPU utilization (app pods)      |                     |                   |                     | 🔲    |
| Memory utilization (app pods)   |                     |                   |                     | 🔲    |
| DB connection pool utilization  |                     |                   |                     | 🔲    |
| DB query p95 latency            |                     |                   |                     | 🔲    |

### 6.4 Performance Acceptance Criteria

| Criteria                                          | Threshold                  | Status |
|--------------------------------------------------|----------------------------|--------|
| p95 response time under peak load                 | < 2,000 ms                 | 🔲     |
| Error rate under peak load                        | < 0.1%                     | 🔲     |
| Zero HTTP 5xx under baseline load                 | 0 errors                   | 🔲     |
| CPU utilization under peak load                   | < 70%                      | 🔲     |
| Memory utilization under peak load                | < 80%                      | 🔲     |
| DB connection pool under peak load                | < 80% of max pool          | 🔲     |
| No memory leaks over 30-minute sustained load     | Heap stable (< 5% growth)  | 🔲     |
| Graceful degradation under stress (1000 users)    | No crashes; errors < 5%    | 🔲     |

---

## 7. Monitoring & Alerting Setup

### 7.1 Infrastructure Monitoring

| # | Metric                               | Tool          | Alert Threshold                     | Notification Channel | Status |
|---|--------------------------------------|---------------|-------------------------------------|----------------------|--------|
| 1 | CPU utilization (app pods)           | Prometheus + Grafana | Warning: > 70% for 5 min; Critical: > 90% for 2 min | PagerDuty + Slack #ops-alerts | 🔲 |
| 2 | Memory utilization (app pods)        | Prometheus + Grafana | Warning: > 75%; Critical: > 90%  | PagerDuty + Slack    | 🔲     |
| 3 | Pod restart count                    | Kubernetes events | Any restart in last 10 min         | Slack #ops-alerts    | 🔲     |
| 4 | Disk usage (database volume)         | Prometheus    | Warning: > 70%; Critical: > 85%    | PagerDuty            | 🔲     |
| 5 | Database connection pool exhaustion  | PgBouncer metrics | Active connections > 80% of max   | PagerDuty            | 🔲     |
| 6 | Database replication lag             | PostgreSQL metrics | Lag > 5 seconds                   | PagerDuty            | 🔲     |
| 7 | Certificate expiry                   | cert-manager / custom | < 30 days to expiry              | Slack + Email        | 🔲     |
| 8 | Node health (Kubernetes)             | kube-state-metrics | NotReady state > 1 minute        | PagerDuty            | 🔲     |

### 7.2 Application Monitoring

| # | Metric                                | Tool              | Alert Threshold                       | Notification   | Status |
|---|---------------------------------------|-------------------|---------------------------------------|----------------|--------|
| 1 | HTTP 5xx error rate                   | Application APM   | > 1% of requests in 5 min window     | PagerDuty (P1) | 🔲     |
| 2 | HTTP 4xx error rate                   | Application APM   | > 10% of requests (may indicate attack) | Slack         | 🔲     |
| 3 | Approval endpoint p95 latency         | Application APM   | > 2,000 ms for 3 min                 | PagerDuty      | 🔲     |
| 4 | SLA timer worker health               | Custom health check | Heartbeat missing > 2 minutes       | PagerDuty (P1) | 🔲     |
| 5 | Notification delivery failures        | Queue monitoring   | Failed deliveries > 5 in 10 min      | Slack          | 🔲     |
| 6 | SSO authentication failures           | Azure AD + App logs | > 10 failures in 5 min              | PagerDuty      | 🔲     |
| 7 | Audit log write failures              | Custom metric      | Any failure (zero tolerance)         | PagerDuty (P1) | 🔲     |
| 8 | Background job queue depth            | Queue monitoring   | Queue depth > 1,000 items            | Slack          | 🔲     |
| 9 | ERP integration (SAP) error rate      | Integration monitor | Any error in PO creation             | PagerDuty      | 🔲     |
| 10| Delegation auto-expiry job execution  | Cron job monitor   | Job missed scheduled execution       | Slack          | 🔲     |

### 7.3 Business Metrics Dashboard

| # | Metric                                    | Visualization       | Refresh Rate | Status |
|---|-------------------------------------------|---------------------|-------------|--------|
| 1 | Requests submitted per hour               | Time series chart   | 1 min       | 🔲     |
| 2 | Approval turnaround time (avg, p95)       | Histogram           | 5 min       | 🔲     |
| 3 | SLA compliance rate by tier               | Gauge per tier      | 5 min       | 🔲     |
| 4 | Active delegations count                  | Counter             | 1 min       | 🔲     |
| 5 | Pending requests by age bucket            | Stacked bar chart   | 5 min       | 🔲     |
| 6 | Rejection rate trend                      | Line chart          | 15 min      | 🔲     |
| 7 | Top approvers by volume (leaderboard)     | Table               | 1 hour      | 🔲     |
| 8 | Escalation events per day                 | Bar chart           | 1 hour      | 🔲     |

### 7.4 Log Aggregation

| # | Check                                     | Configuration                         | Status |
|---|-------------------------------------------|---------------------------------------|--------|
| 1 | Application logs shipped to central SIEM  | Fluentd → Elasticsearch / Splunk      | 🔲     |
| 2 | Structured logging (JSON format)          | All log lines are JSON with trace ID  | 🔲     |
| 3 | Log retention policy: 90 days hot, 1 year cold | Index lifecycle management configured | 🔲 |
| 4 | Sensitive data masking in logs            | PII/financial data masked before shipping | 🔲  |
| 5 | Distributed tracing configured            | OpenTelemetry → Jaeger/Tempo          | 🔲     |
| 6 | Correlation ID propagated across services | `X-Correlation-ID` header in all service calls | 🔲 |

---

## 8. 5-Minute Rollback SOP

### Standard Operating Procedure: Emergency Production Rollback

**Objective:** Restore the approval engine to the last known-good state within 5 minutes of rollback decision.

**Trigger:** Rollback authorized by On-Call Lead or DevOps Lead per criteria in Section 4.2.

---

### Phase 1: Initiate (T+0:00 — T+0:30)

| Step | Action                                              | Command / Tool                                       | Owner       |
|------|------------------------------------------------------|------------------------------------------------------|-------------|
| 1.1  | Announce rollback in Slack #incident channel         | `@channel 🔴 ROLLBACK INITIATED — Approval Engine — [reason]` | On-Call Lead |
| 1.2  | Confirm current deployment version                   | `kubectl get deployment approval-engine -o jsonpath='{.spec.template.spec.containers[0].image}'` | DevOps |
| 1.3  | Confirm rollback target version                      | `kubectl rollout history deployment/approval-engine`  | DevOps      |

### Phase 2: Application Rollback (T+0:30 — T+2:30)

| Step | Action                                              | Command / Tool                                       | Owner       |
|------|------------------------------------------------------|------------------------------------------------------|-------------|
| 2.1  | Rollback backend API deployment                      | `kubectl rollout undo deployment/approval-engine --namespace=production` | DevOps |
| 2.2  | Rollback background workers                          | `kubectl rollout undo deployment/approval-workers --namespace=production` | DevOps |
| 2.3  | Monitor rollout status                               | `kubectl rollout status deployment/approval-engine --namespace=production --timeout=120s` | DevOps |
| 2.4  | Rollback frontend (if applicable)                    | `aws cloudfront create-invalidation --distribution-id $CF_DIST_ID --paths "/*"` + redeploy previous S3 build | DevOps |

### Phase 3: Database Rollback — If Required (T+2:30 — T+4:00)

> ⚠️ **Database rollback is only executed if the deployment included schema changes. Skip if schema unchanged.**

| Step | Action                                              | Command / Tool                                       | Owner |
|------|------------------------------------------------------|------------------------------------------------------|-------|
| 3.1  | Enable maintenance mode                              | `kubectl set env deployment/approval-engine MAINTENANCE_MODE=true` | DevOps |
| 3.2  | Execute rollback migration                           | `flyway -url=$PROD_DB_URL -locations=filesystem:./rollback undo` | DBA   |
| 3.3  | Verify schema rollback                               | `flyway info` — confirm version matches pre-deploy state | DBA   |
| 3.4  | Disable maintenance mode                             | `kubectl set env deployment/approval-engine MAINTENANCE_MODE=false` | DevOps |

### Phase 4: Verify (T+4:00 — T+5:00)

| Step | Action                                              | Method                                               | Owner       |
|------|------------------------------------------------------|------------------------------------------------------|-------------|
| 4.1  | Health check: all pods Running/Ready                 | `kubectl get pods -l app=approval-engine -n production` | DevOps    |
| 4.2  | Smoke test: submit test approval request             | Execute automated smoke test suite against production | QA          |
| 4.3  | Verify API response times within SLA                 | Check Grafana dashboard — p95 < 2s                   | SRE         |
| 4.4  | Verify SSO login flow functional                     | Manual login test with test account                  | QA          |
| 4.5  | Verify no data loss for in-flight requests           | `SELECT COUNT(*) FROM approval_requests WHERE status = 'PENDING' AND created_at > '[deploy_time]'` | DBA |
| 4.6  | Announce rollback complete                           | `@channel ✅ ROLLBACK COMPLETE — Approval Engine restored to v[X.Y.Z] — monitoring` | On-Call Lead |

### Rollback Timeline Summary

```
T+0:00  ─── Decision & Announce ──────────── 30s
T+0:30  ─── kubectl rollout undo (API) ───── 60s
T+1:30  ─── kubectl rollout undo (Workers) ─ 60s
T+2:30  ─── DB rollback (if needed) ──────── 90s
T+4:00  ─── Verify & Smoke Test ──────────── 60s
T+5:00  ─── ALL CLEAR ────────────────────── ✅
```

### Rollback Drill Log

| Drill Date | Environment | Duration | Result | Issues Found         | Fixed? |
|------------|-------------|----------|--------|----------------------|--------|
|            | Staging     |          |        |                      |        |
|            | Staging     |          |        |                      |        |

> **Requirement:** Rollback drill must be executed successfully in staging at least once before go-live. Results logged above.

---

## 9. Go-Live Day Runbook

### 9.1 Deployment Schedule

| Time (WIB)   | Activity                                            | Owner         | Duration |
|--------------|-----------------------------------------------------|---------------|----------|
| 21:00        | Deployment freeze announcement to all users         | Change Mgmt   | —        |
| 22:00        | Begin maintenance window                            | DevOps        | —        |
| 22:00        | Full database backup                                | DBA           | 30 min   |
| 22:30        | Execute database migration scripts                  | DBA           | 15 min   |
| 22:45        | Deploy backend API (blue-green / canary)            | DevOps        | 15 min   |
| 23:00        | Deploy background workers                           | DevOps        | 10 min   |
| 23:10        | Deploy frontend                                     | DevOps        | 10 min   |
| 23:20        | Automated smoke test suite                          | QA            | 15 min   |
| 23:35        | Manual sanity check (critical happy paths)          | QA + Business | 20 min   |
| 23:55        | Go/No-Go for traffic cutover                        | On-Call Lead  | 5 min    |
| 00:00        | Enable production traffic                           | DevOps        | —        |
| 00:00–06:00  | Hypercare monitoring                               | SRE + On-Call | 6 hrs    |
| 06:00        | Morning handoff to day team                         | SRE           | —        |

### 9.2 War Room Setup

| Role             | Primary Contact    | Backup Contact     | Comms Channel           |
|------------------|--------------------|--------------------|-------------------------|
| On-Call Lead     |                    |                    | Slack #ae-go-live       |
| DevOps Engineer  |                    |                    | Slack #ae-go-live       |
| DBA              |                    |                    | Slack #ae-go-live       |
| QA Lead          |                    |                    | Slack #ae-go-live       |
| Backend Dev      |                    |                    | Slack #ae-go-live       |
| Product Owner    |                    |                    | Slack #ae-go-live       |
| InfoSec          |                    |                    | Slack #ae-go-live       |
| Escalation: CTO  |                    |                    | Phone (direct)          |

### 9.3 Go / No-Go Decision Matrix

| Checkpoint                          | Go Criteria                        | No-Go Action                    |
|--------------------------------------|------------------------------------|---------------------------------|
| Database migration                   | All scripts succeed; checksums match | Rollback DB; abort deployment   |
| Backend deployment                   | All pods healthy; health check 200   | Rollback to previous image      |
| Smoke tests                          | 100% critical paths pass            | Rollback full stack             |
| SSO login                            | Login + logout succeed              | Rollback; engage Azure AD team  |
| Performance                          | p95 < 2s under baseline load        | Investigate; rollback if > 5 min |

---

## 10. Post-Go-Live Stabilization

### 10.1 Hypercare Period (T+0 to T+7)

| Day   | Focus Area                                    | Escalation Path              |
|-------|-----------------------------------------------|------------------------------|
| T+0   | Real-time monitoring; immediate defect response | On-Call → Dev Lead → CTO    |
| T+1   | Review overnight logs; first business-day usage | QA + Product Owner triage   |
| T+2   | Performance trend analysis; SLA compliance     | DevOps report               |
| T+3   | Delegation feature focus (business feedback)   | Product Owner               |
| T+4   | Integration health (SAP, email, SSO)           | Integration team            |
| T+5   | Cumulative defect review; hot-fix planning     | Dev Lead                    |
| T+7   | Hypercare exit review; handoff to BAU support  | Steering Committee          |

### 10.2 Hypercare Exit Criteria

| Criteria                                          | Threshold                  | Status |
|--------------------------------------------------|----------------------------|--------|
| Zero P1 incidents during hypercare                | 0                          | 🔲     |
| P2 incidents resolved within SLA                  | 100%                       | 🔲     |
| System uptime during hypercare                    | ≥ 99.5%                   | 🔲     |
| No unplanned rollbacks                            | 0                          | 🔲     |
| User adoption rate (active users / total users)   | ≥ 80%                     | 🔲     |
| Business stakeholder satisfaction survey           | ≥ 4.0 / 5.0               | 🔲     |

### 10.3 Known Issues & Accepted Risks

| # | Issue Description                     | Severity | Workaround                   | Target Fix Date | Owner     |
|---|---------------------------------------|----------|-------------------------------|-----------------|-----------|
|   |                                       |          |                               |                 |           |

---

## 11. Sign-Off

### Production Readiness Approval

| Role               | Name              | Checklist Section(s) Reviewed | Approved? | Date | Signature |
|--------------------|-------------------|-------------------------------|-----------|------|-----------|
| Dev Lead           |                   | Code Sanitization, Rollback   |           |      |           |
| DBA                |                   | Database Migration, Backup    |           |      |           |
| InfoSec Lead       |                   | SSL/SSO, Security Scan        |           |      |           |
| QA Lead            |                   | Test Results, Quality Gate    |           |      |           |
| DevOps Lead        |                   | Monitoring, Rollback SOP      |           |      |           |
| Product Owner      |                   | UAT Sign-off, Go-Live Plan    |           |      |           |
| Project Sponsor    |                   | Overall Go/No-Go              |           |      |           |

---

> **Final Go-Live Authorization**
>
> Based on the completed checklist above, production deployment of the Dynamic Multi-Tier Approval Workflow & Delegation Engine is:
>
> - [ ] **APPROVED** for Go-Live on _______________
> - [ ] **NOT APPROVED** — Reason: _______________
>
> Authorized by: _____________________________ Date: _______________
> Title: Project Sponsor / Steering Committee Chair

---

*Document generated for PT Nusantara Transindo — Approval Engine Project*
*Classification: INTERNAL — CONFIDENTIAL*
