---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: guide_doc
title: Development Setup - Настройка окружения
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: 09_DEVELOPMENT/Development_Setup.md
effective_date: 2025-10-24
visibility: internal
security_level: low
tags: [development, guide]
---

# Development Setup - Настройка окружения

→ [Development](../_README.md)

## 🛠️ STACK

### Frontend:
```bash
- Next.js 14 (App Router)
- TypeScript 5.0+
- TailwindCSS + Shadcn/ui
- Zustand (state) + React Query (data)
```

### Backend:
```bash
- Node.js 20+ / Python 3.11+
- Express / FastAPI
- PostgreSQL 15+
- Redis 7+
- ClickHouse (analytics)
```

### AI:
```bash
- Claude 3.5 Sonnet API
- Pinecone/Weaviate (vector DB)
- LangChain (orchestration)
```

---

## 🚀 QUICK START

```bash
# Clone repo
git clone https://github.com/mrm-ai/platform.git
cd platform

# Install dependencies
npm install  # frontend
cd backend && pip install -r requirements.txt  # backend

# Setup env
cp .env.example .env
# Fill POSTGRES_URL, REDIS_URL, CLAUDE_API_KEY

# Run migrations
npm run db:migrate

# Start dev servers
npm run dev  # frontend (3000)
cd backend && uvicorn main:app --reload  # backend (8000)
```

---

## 📁 STRUCTURE

```
/
├── frontend/          # Next.js app
│   ├── app/          # Pages (App Router)
│   ├── components/   # React components
│   └── lib/          # Utils, hooks
├── backend/
│   ├── api/          # API routes
│   ├── services/     # Business logic
│   ├── models/       # DB models
│   └── ai/           # AI agents
├── database/
│   └── migrations/   # SQL migrations
└── docs/             # Documentation
```

---

## 🧪 TESTING

```bash
# Frontend
npm test              # Jest + RTL
npm run test:e2e      # Playwright

# Backend
pytest                # Unit tests
pytest --cov          # Coverage
```

---

**Версия:** 2.1 | **Статус:** ✅


