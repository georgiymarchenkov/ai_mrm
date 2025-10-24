---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: guide_doc
title: 👨‍💻 09_DEVELOPMENT - Development Guide
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: 09_DEVELOPMENT/_README.md
effective_date: 2025-10-24
visibility: internal
security_level: low
tags: [development, guide]
---

# 👨‍💻 09_DEVELOPMENT - Development Guide

**Назначение:** Руководство по разработке, стандарты кода, deployment

---

## 📋 СОДЕРЖАНИЕ

### Development:
- Code_Style_Guide.md
- Git_Workflow.md
- Testing_Strategy.md
- PR_Review_Process.md

### Deployment:
- Environment_Setup.md
- CI_CD_Pipeline.md
- Deployment_Process.md
- Rollback_Strategy.md

### Monitoring:
- Logging.md
- Metrics.md
- Alerting.md
- Performance.md

---

## 🛠️ TECH STACK

### Frontend:
```
- Next.js 14
- TypeScript
- Tailwind CSS
- Zustand / Jotai
```

### Backend:
```
- Node.js / Python
- PostgreSQL
- ClickHouse
- Redis
```

### AI:
```
- Claude API
- Vector DB (Pinecone)
- LangChain
```

---

## 📁 СТРУКТУРА

```
Development/
├── Setup/
│   ├── Local_Environment.md
│   ├── Dependencies.md
│   └── Configuration.md
├── Standards/
│   ├── Code_Style.md
│   ├── Naming_Conventions.md
│   └── Architecture_Patterns.md
├── Testing/
│   ├── Unit_Tests.md
│   ├── Integration_Tests.md
│   └── E2E_Tests.md
└── Deployment/
    ├── Staging.md
    ├── Production.md
    └── Monitoring.md
```

---

## ✅ ЧЕКЛИСТ

### Before Commit:
```
☐ Lint passed
☐ Tests passed
☐ Types check passed
☐ No console.logs
☐ Comments added
```

### Before PR:
```
☐ Branch up-to-date
☐ Tests cover changes
☐ Documentation updated
☐ Self-review done
```

### Before Deploy:
```
☐ All tests green
☐ Performance check
☐ Security scan
☐ Staging tested
☐ Rollback plan ready
```

---

## 🔗 СВЯЗИ

- **08_ARCHITECTURE/** ← Архитектура
- **10_SPRINTS/** ← Backlog и планирование

---

**Версия:** 1.0 | **Дата:** 2025-10-23 | **Статус:** ✅


