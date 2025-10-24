---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: guide_doc
title: MVP Implementation Plan - План реализации MVP
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "2.0"
source_path: 00_PROJECT_OVERVIEW/MVP_IMPLEMENTATION_PLAN.md
effective_date: 2025-10-24
visibility: internal
security_level: low
tags: [mvp, implementation, roadmap, strategy]
synonyms: [MVP план, план разработки, roadmap]
---

# MVP Implementation Plan
## План реализации минимально жизнеспособного продукта MRM AI Platform

→ [Project Overview](./README.md) | [Roadmap](./Roadmap.md) | [Vision](./Vision_Mission.md)

---

## 🎯 Executive Summary

**Цель:** Запустить MVP MRM AI Platform к **2025 Q4** (декабрь).

**Scope MVP:**
- 4 core modules
- 7 roles с RBAC
- 8 key artifacts
- 3 AI assistants
- 5 integrations

**Team:** 8-10 developers (2 backend, 2 frontend, 1 AI specialist, 1 QA, 1 PM, 1 Designer)

**Timeline:** 12 weeks (3 months)

**Budget:** ~$150k (team salaries + infrastructure)

---

## 📦 MVP Scope

### Core Modules (Priority 1)

#### 1. Migration Assistant 🚀
**Goal:** Помочь агентствам быстро загрузить существующие данные

**Features:**
- AI-powered Excel/Google Sheets parsing
- Auto-detection полей (budget, channels, dates)
- Mapping к internal schema
- Preview & validation перед импортом
- Batch import (до 100 files)

**Value:** Снижение барьера входа с недель до часов

---

#### 2. Media Plan Analyzer 📊
**Goal:** Анализ и оптимизация медиапланов

**Features:**
- Загрузка media plan (Excel/CSV)
- Auto-calculation: GRP, Reach, Frequency
- Shmatov calculators integration
- Optimization suggestions (channel mix, timing)
- Export optimized plan

**Value:** Экономия 3-5 дней на создание плана

---

#### 3. Report Generator + Analytics 📈
**Goal:** Автоматическая генерация отчетов

**Features:**
- Интеграция с Yandex Metrika, Google Analytics
- Auto-collection данных (daily)
- AI-generated insights ("CTR упал на 15%, рекомендация: pause channel X")
- Customizable templates (weekly, monthly)
- PDF export + email delivery

**Value:** Экономия 2-3 часов/день на ручной сбор данных

---

#### 4. AI Project Assistant 🤖
**Goal:** Помощник для PM и команды

**Features:**
- Meeting transcription + notes
- Task decomposition из high-level запросов
- Deadline tracking + reminders
- RACI matrix generation
- Knowledge base search (RAG-powered)

**Value:** Снижение административной нагрузки на 40%

---

### Supporting Components

#### Roles & RBAC
```yaml
Roles:
  - Project Manager
  - Account Manager
  - Specialist (Media Buyer)
  - Strategist
  - Analyst
  - Creative
  - Client

Permissions:
  - Каждая роль = свои права на artifacts и features
  - Role-based dashboards
  - Data isolation (multi-tenancy)
```

#### Artifacts
```yaml
Core Artifacts (MVP):
  - Brief
  - Strategy Document
  - Media Plan
  - Budget Model
  - Campaign Report
  - Project Passport
  - Communication Log
  - Tasks

Storage:
  - PostgreSQL (structured data)
  - S3/MinIO (files)
  - Vector DB (embeddings для RAG)
```

#### Integrations
```yaml
MVP Integrations:
  1. Yandex Direct API - campaign data
  2. Yandex Metrika API - analytics
  3. VK Ads API - campaign data
  4. Google Sheets - bidirectional sync
  5. Telegram Bot - notifications

Future (Post-MVP):
  - Google Ads
  - Bitrix24 CRM
  - GA4
```

---

## 📅 Implementation Roadmap

### Phase 1: Foundation (Weeks 1-3)

**Sprint 1** (Week 1-2):
```yaml
Backend:
  - Database schema (all 8 artifacts)
  - API endpoints (CRUD)
  - Authentication (JWT)
  - RBAC middleware

Frontend:
  - UI components (Shadcn/ui)
  - Layout & navigation
  - Brief form
  - Media Plan table

AI:
  - Claude API integration
  - Basic prompts library
  - Context management

Hours: 176h total
```

**Sprint 2** (Week 3):
```yaml
Features:
  - Migration Assistant (MVP version)
    - Excel parser
    - Field detection AI
    - Preview UI
  
  - User Management
    - Registration/Login
    - Role assignment
    - Profile settings

Testing:
  - Unit tests (80%+ coverage)
  - Integration tests (API)
  - E2E tests (critical paths)

Hours: 88h
```

---

### Phase 2: Core Features (Weeks 4-8)

**Sprint 3-4** (Week 4-6):
```yaml
Media Plan Analyzer:
  - Import media plan (Excel, CSV, Google Sheets)
  - Parse и validate структуру
  - Calculate GRP, Reach, Frequency
  - Shmatov calculators integration
  - Optimization engine (basic)
  - Export optimized plan

UI:
  - Media Plan dashboard
  - Interactive table with filters
  - Charts (budget distribution, reach curve)
  - Comparison view (before/after optimization)

Hours: 176h
```

**Sprint 5-6** (Week 7-8):
```yaml
Report Generator:
  - Yandex Metrika integration
  - Auto data collection (scheduled jobs)
  - Report templates (weekly, monthly)
  - AI insights generation
  - PDF export
  - Email delivery

Analytics Dashboard:
  - Real-time metrics (impressions, clicks, CPC)
  - Historical trends
  - Channel comparison
  - Alerts (budget overspend, low CTR)

Hours: 176h
```

---

### Phase 3: AI & Polish (Weeks 9-12)

**Sprint 7** (Week 9-10):
```yaml
AI Project Assistant:
  - Meeting transcription (Whisper API)
  - Task decomposition
  - RACI generator
  - RAG knowledge base
    - Vector DB setup (Pinecone/Chroma)
    - Ingestion pipeline
    - Semantic search

Integrations:
  - VK Ads API
  - Google Sheets sync
  - Telegram notifications

Hours: 176h
```

**Sprint 8** (Week 11-12):
```yaml
Polish & Production Ready:
  - UI/UX improvements (feedback from beta users)
  - Performance optimization
  - Security audit
  - Documentation (user guides, API docs)
  - Deployment (Kubernetes cluster)
  - Monitoring & alerting (Grafana/Prometheus)

Beta Testing:
  - 3-5 pilot agencies
  - Feedback collection
  - Bug fixes
  - Iteration on prompts

Hours: 176h + overtime
```

---

## 👥 Team Structure

### Development Team

```yaml
Backend Developers (2):
  - Senior: Database, API, Integrations
  - Mid: Auth, RBAC, Jobs

Frontend Developers (2):
  - Senior: Core UI, Dashboard
  - Mid: Forms, Tables, Charts

AI Specialist (1):
  - Prompt engineering
  - RAG implementation
  - Model fine-tuning (future)

QA Engineer (1):
  - Test automation
  - Manual testing
  - Bug tracking

Designer (1 - part time):
  - UI/UX design
  - Prototypes (Figma)
  - Style guide

PM (1):
  - Sprint planning
  - Backlog management
  - Stakeholder communication
```

### Weekly Capacity

```
Total: 40h/person × 8 people = 320h/week
Actual (accounting for meetings, overhead): ~250h/week productive
12 weeks × 250h = 3000h total
```

---

## 🎯 Success Metrics

### MVP Launch Criteria

```yaml
Functionality:
  - ✅ All 4 core modules working
  - ✅ 7 roles with RBAC
  - ✅ 5 integrations live
  - ✅ AI assistants respond in <5s
  - ✅ RAG accuracy >80%

Quality:
  - ✅ Zero critical bugs
  - ✅ <5 high-priority bugs
  - ✅ 80%+ test coverage
  - ✅ <2s page load time
  - ✅ 99% uptime (staging)

User Validation:
  - ✅ 3+ pilot agencies onboarded
  - ✅ >70% satisfaction score
  - ✅ Key workflows tested end-to-end
```

### Post-MVP Metrics (First 3 months)

```yaml
Adoption:
  - 10+ agencies using platform
  - 50+ active users
  - 1000+ artifacts created

Efficiency:
  - 60% reduction in time for media plan creation
  - 75% reduction in manual data collection
  - 40% reduction in PM administrative overhead

Satisfaction:
  - NPS >40
  - 4.5+ rating
  - <10% churn rate
```

---

## 💰 Budget Breakdown

### Development Costs (3 months)

```yaml
Team Salaries:
  Backend Senior: $8k/mo × 3 = $24k
  Backend Mid: $5k/mo × 3 = $15k
  Frontend Senior: $7k/mo × 3 = $21k
  Frontend Mid: $4k/mo × 3 = $12k
  AI Specialist: $9k/mo × 3 = $27k
  QA: $4k/mo × 3 = $12k
  PM: $6k/mo × 3 = $18k
  Designer (PT): $3k/mo × 3 = $9k
  
  Total Salaries: $138k
```

### Infrastructure (3 months + 3 months post-launch)

```yaml
Cloud (AWS/Google Cloud):
  - Compute (K8s cluster): $500/mo
  - Storage (S3, PostgreSQL): $200/mo
  - Network & CDN: $100/mo
  - Total: $800/mo × 6 = $4.8k

AI Services:
  - Claude API: $1k/mo (MVP usage)
  - Vector DB (Pinecone): $200/mo
  - Total: $1.2k/mo × 6 = $7.2k

Monitoring & Tools:
  - Sentry, Datadog, etc.: $300/mo × 6 = $1.8k

Total Infrastructure: ~$14k
```

**Grand Total: ~$152k**

---

## 🚀 Launch Strategy

### Beta Launch (Week 10-11)

```yaml
Target:
  - 3-5 pilot agencies
  - Mix: small (1-3 specialists) and mid-size (5-10 specialists)
  - Industries: varied (finance, retail, e-commerce)

Onboarding:
  1. 1-hour demo + training
  2. Hands-on setup (Migration Assistant)
  3. First project walkthrough
  4. Weekly check-ins during beta

Feedback Loop:
  - Daily bug reports
  - Weekly survey (NPS, satisfaction)
  - User interviews (2-3 per agency)
```

### Public Launch (Week 12+)

```yaml
Marketing:
  - Landing page + demo video
  - Blog posts (case studies from beta)
  - Social media (LinkedIn, industry forums)
  - Direct outreach to agencies

Pricing (introductory):
  - Free tier: 1 project, 3 users, limited AI calls
  - Startup: $99/mo - 5 projects, 10 users
  - Professional: $299/mo - unlimited projects/users, priority support
```

---

## 🔄 Post-MVP Roadmap

### Q1 2026: Growth & Expansion

```yaml
Features:
  - Advanced media plan optimization (ML-based)
  - Campaign automation (auto-setup from plan)
  - Multi-language support (EN)
  - Mobile app (iOS/Android)

Integrations:
  - Google Ads
  - Facebook Ads
  - Bitrix24 CRM full sync
  - GA4

Scale:
  - 50+ agencies
  - 200+ users
  - $50k MRR
```

### Q2 2026: Enterprise

```yaml
Features:
  - White-label option
  - Advanced RBAC (custom roles)
  - API for partners
  - Data warehouse (ClickHouse) for big agencies

Enterprise Sales:
  - Target: large agencies (50+ employees)
  - Custom pricing
  - Dedicated support
```

---

## 🎓 Risks & Mitigation

### Technical Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|-----------|
| AI accuracy <80% | High | Medium | Extensive prompt testing, human-in-loop |
| Integration APIs unstable | Medium | Low | Fallback to manual import |
| Performance issues | Medium | Low | Load testing early, horizontal scaling |
| Security breach | Critical | Low | Security audit, pen-testing |

### Business Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|-----------|
| Low adoption | High | Medium | Free tier, strong onboarding |
| Competition launches first | Medium | Medium | Focus on unique value (AI + MRM) |
| Budget overrun | Medium | Low | Weekly budget review, buffer (20%) |
| Key team member leaves | High | Low | Knowledge sharing, documentation |

---

## 📚 Related Documents

- [Roadmap.md](./Roadmap.md) - long-term vision
- [Vision_Mission.md](./Vision_Mission.md) - why we're building this
- [Technical_Architecture.md](../08_ARCHITECTURE/Overview.md) - how it's built
- [JTBD_Analysis.md](../15_PRODUCT_DESIGN/JTBD/JTBD_Analysis.md) - user needs

---

**Версия:** 2.0  
**Last Updated:** 24 октября 2025  
**Status:** ✅ Ready for Execution
