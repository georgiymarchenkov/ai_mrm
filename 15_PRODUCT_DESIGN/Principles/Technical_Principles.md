---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: overview
title: Technical Principles - Технические принципы
language: ru
industry: advertising
role_apply: [pm, product_manager]
period: 2025-10
version: "1.0"
source_path: 15_PRODUCT_DESIGN/Principles/Technical_Principles.md
effective_date: 2025-10-24
visibility: internal
security_level: low
tags: [principles, product_design]
---

# Technical Principles - Технические принципы

→ [Product Design](../_README.md)

---

## 🏗️ ARCHITECTURE PRINCIPLES

### 1. **MICROSERVICES OVER MONOLITH**

**Принцип:** Разбиваем на независимые сервисы, каждый отвечает за свою domain.

**Почему:**
- Масштабируемость (разные сервисы масштабируются независимо)
- Независимые deploy (можно обновлять частями)
- Technology flexibility (можно использовать разные стеки)
- Team autonomy (команды работают независимо)

**Структура:**
```
Brief Service (Node.js + PostgreSQL)
MediaPlan Service (Python + PostgreSQL + ClickHouse)
AI Service (Python + Claude API + Vector DB)
Integration Service (Node.js)
Auth Service (Node.js + PostgreSQL)
Analytics Service (Python + ClickHouse)
Notification Service (Node.js + Redis)
```

**Communication:**
- Sync: REST API / GraphQL
- Async: Message queue (RabbitMQ / Kafka)
- Events: Event bus

**Trade-off:**
- ✅ Pros: Scalable, flexible, resilient
- ⚠️ Cons: Complexity, distributed debugging, network latency

---

### 2. **API-FIRST DESIGN**

**Принцип:** Сначала проектируем API (contract), потом реализуем.

**Почему:**
- Frontend и Backend разрабатываются параллельно
- API design review перед кодом
- API documentation всегда актуальна
- Легко создавать integrations

**Process:**
1. Define API contract (OpenAPI 3.0)
2. Review & approve
3. Generate mock server
4. Frontend использует mocks
5. Backend реализует contract
6. Integration testing

**Tools:**
- OpenAPI (Swagger)
- Postman (testing)
- Prism (mock server)

**Анти-паттерн:**
❌ Писать код, потом документировать API  
❌ Frontend ждет Backend implementation  
❌ API changes breaking Frontend

---

### 3. **DATABASE PER SERVICE**

**Принцип:** Каждый сервис имеет свою БД, нет shared database.

**Почему:**
- Service independence
- Schema evolution без breaking changes
- Technology choice (PostgreSQL, MongoDB, Redis - что нужно)
- Scaling per service

**Pattern:**
```
Brief Service → PostgreSQL (structured brief data)
MediaPlan Service → PostgreSQL (plans) + ClickHouse (analytics)
AI Service → Vector DB (embeddings) + Redis (cache)
Auth Service → PostgreSQL (users, permissions)
```

**Data consistency:**
- Eventual consistency (not ACID across services)
- Saga pattern для distributed transactions
- Event sourcing для audit trail

**Trade-off:**
- ✅ Pros: Independence, flexibility
- ⚠️ Cons: No JOIN across services, eventual consistency

---

### 4. **IMMUTABLE INFRASTRUCTURE**

**Принцип:** Infrastructure as Code. Никаких manual changes на серверах.

**Почему:**
- Reproducible (можно пересоздать environment)
- Version control (Git для infrastructure)
- Easy rollback
- Disaster recovery

**Tools:**
- Terraform (infrastructure provisioning)
- Kubernetes (container orchestration)
- Docker (containerization)
- Helm (Kubernetes package manager)

**Pattern:**
- Never SSH to production
- All changes via CI/CD
- Servers are cattle, not pets

**Анти-паттерн:**
❌ Manual apt-get install на production  
❌ "It works on my machine"  
❌ Snowflake servers (каждый уникальный)

---

### 5. **SECURITY BY DESIGN**

**Принцип:** Security встроена с первого дня, не добавляется потом.

**Layers:**

#### Authentication & Authorization:
- OAuth 2.0 / OpenID Connect
- JWT tokens (short-lived, refresh tokens)
- RBAC (Role-Based Access Control)
- MFA для admin accounts

#### Data Protection:
- Encryption at rest (AES-256)
- Encryption in transit (TLS 1.3)
- Secrets management (HashiCorp Vault)
- PII data masking в logs

#### Network Security:
- API Gateway (rate limiting, WAF)
- Private networks (VPC)
- Network policies (Kubernetes)
- DDoS protection

#### Application Security:
- Input validation (всегда!)
- SQL injection prevention (ORMs, prepared statements)
- XSS prevention (Content Security Policy)
- CSRF protection (tokens)
- Dependency scanning (Snyk, Dependabot)

#### Monitoring & Response:
- Security logs (centralized)
- Intrusion detection
- Vulnerability scanning
- Incident response plan

**Compliance:**
- GDPR / 152-ФЗ (персональные данные)
- SOC 2 Type II (если нужно для enterprise clients)

**Анти-паттерн:**
❌ "Добавим security later"  
❌ Plain text passwords  
❌ Hardcoded secrets в коде

---

### 6. **OBSERVABILITY, NOT JUST MONITORING**

**Принцип:** Мы должны понимать WHY что-то сломалось, не только ЧТО сломалось.

**3 Pillars:**

#### 1. Metrics (Prometheus + Grafana)
- System metrics (CPU, RAM, disk)
- Application metrics (request rate, latency, errors)
- Business metrics (briefs created, AI acceptance rate)
- Custom dashboards

#### 2. Logs (ELK Stack)
- Centralized logging
- Structured logs (JSON)
- Log levels (DEBUG, INFO, WARN, ERROR)
- Search & filtering (Kibana)
- Log retention (30-90 days)

#### 3. Traces (Jaeger / Zipkin)
- Distributed tracing
- Request flow across services
- Performance bottlenecks
- Error propagation

**Alerting:**
- Critical alerts → PagerDuty → On-call engineer
- Warning alerts → Slack channel
- Info → Email digest

**SLIs/SLOs:**
```
SLI: Latency P99 < 500ms
SLO: 99.9% requests meet SLI
Error Budget: 0.1% = ~43 minutes downtime/month
```

**Анти-паттерн:**
❌ Мониторинг только на production (нужен на всех env)  
❌ Logs только на сервере (централизуй!)  
❌ No alerting (молчаливые падения)

---

### 7. **TEST PYRAMID**

**Принцип:** Много unit tests, меньше integration, еще меньше E2E.

```
        /\
       /E2E\          10% - Slow, brittle, expensive
      /------\
     /Integr.\        20% - Medium speed, medium cost
    /----------\
   /   Unit     \     70% - Fast, reliable, cheap
  /--------------\
```

**Coverage targets:**
- Unit tests: 80%+
- Integration tests: Key flows
- E2E tests: Critical user journeys (5-10 scenarios)

**Tools:**
- Unit: Jest (JS), Pytest (Python)
- Integration: Supertest, Testcontainers
- E2E: Playwright, Cypress
- Load testing: k6, JMeter

**CI/CD:**
- Unit tests: Every commit
- Integration: Every PR
- E2E: Before deploy to prod
- Load tests: Weekly

**Анти-паттерн:**
❌ 90% E2E tests (slow, flaky)  
❌ No tests (YOLO deploy)  
❌ Tests fail → Ignore → Deploy anyway

---

### 8. **FAIL FAST, RECOVER FASTER**

**Принцип:** Обнаруживаем проблемы быстро, восстанавливаемся автоматически.

**Strategies:**

#### Circuit Breaker Pattern:
```
AI Service down → Circuit opens → Fallback to templates
After 30s → Try again → Success → Circuit closes
```

#### Retry Logic:
- Exponential backoff: 1s, 2s, 4s, 8s
- Max retries: 3-5
- Idempotency (повторный запрос = безопасен)

#### Health Checks:
- Liveness probe (жив ли сервис?)
- Readiness probe (готов ли обрабатывать запросы?)
- Startup probe (запустился ли?)

#### Auto-recovery:
- Kubernetes restarts unhealthy pods
- Auto-scaling при высокой нагрузке
- Blue-green deployments (zero downtime)

**RTO/RPO:**
```
RTO (Recovery Time Objective): < 15 minutes
RPO (Recovery Point Objective): < 5 minutes data loss
```

**Анти-паттерн:**
❌ Ручное восстановление (slow!)  
❌ No retries (one failure = game over)  
❌ No circuit breaker (cascade failures)

---

### 9. **COST OPTIMIZATION**

**Принцип:** Cloud costs должны быть предсказуемы и оптимизированы.

**Strategies:**

#### Right-sizing:
- Не over-provision ресурсы
- Мониторинг usage
- Auto-scaling (scale down ночью)

#### Caching:
- Redis для frequently accessed data
- CDN для static assets
- API response caching (Nginx, API Gateway)

#### Database optimization:
- Indexes (обязательно!)
- Query optimization
- Read replicas для read-heavy workloads
- Archiving старых данных

#### AI costs (Claude API):
- Context caching (reuse prompts)
- Prompt optimization (shorter = cheaper)
- Rate limiting per user
- Monitoring token usage

**Budget alerts:**
- Daily cost monitoring
- Alerts при >120% от expected
- Cost attribution (по сервисам)

**Анти-паттерн:**
❌ No cost monitoring (сюрпризы в конце месяца)  
❌ Always-on expensive instances  
❌ No caching (повторные запросы)

---

### 10. **DEVELOPER EXPERIENCE (DX)**

**Принцип:** Разработка должна быть приятной и продуктивной.

**Must-have:**

#### Local Development:
- Docker Compose (все сервисы locally)
- Hot reload (instant feedback)
- Seed data (не нужно создавать вручную)
- One-command setup: `make dev`

#### Documentation:
- README с quickstart (5 минут до первого запуска)
- API docs (OpenAPI)
- Architecture diagrams (C4 model)
- Troubleshooting guide

#### CI/CD:
- Fast builds (<5 минут)
- Clear error messages
- Automatic PR previews
- Easy rollback

#### Code Quality:
- Linters (автоматом в IDE)
- Formatters (Prettier, Black)
- Pre-commit hooks
- Code review process

**Metrics:**
- Time to first commit (новый dev): <1 день
- Deploy frequency: Multiple times per day
- Lead time: Commit → Production <1 hour
- MTTR: <15 minutes

**Анти-паттерн:**
❌ Onboarding takes 1 week  
❌ Manual deployment steps  
❌ No documentation  
❌ Broken main branch

---

## 📊 SUMMARY

```yaml
Принципы: 10

Категории:
  Architecture: Microservices, API-First, Database per Service
  Infrastructure: Immutable, Security, Observability
  Quality: Test Pyramid, Fail Fast
  Efficiency: Cost Optimization, Developer Experience

Trade-offs acknowledged: Yes
  - Microservices = Complexity
  - Eventual consistency = Not ACID
  - Immutable infrastructure = Learning curve
```

---

## ✅ ARCHITECTURE DECISION RECORD (ADR)

Для каждого важного технического решения создаём ADR:

```markdown
# ADR-001: Use Microservices Architecture

Date: 2025-10-24
Status: Accepted

## Context
Нужно выбрать архитектуру для MRM platform.

## Decision
Используем microservices вместо monolith.

## Consequences
+ Independent scaling
+ Technology flexibility
- Increased complexity
- Distributed debugging harder

## Alternatives Considered
1. Monolith: Rejected (not scalable)
2. Serverless: Rejected (vendor lock-in)
```

---

**Версия:** 1.0 | **Дата:** 2025-10-24 | **Статус:** ✅


