---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: architecture_doc
title: Frontend Architecture - Архитектура Frontend
language: ru
industry: advertising
role_apply: [developer, architect]
period: 2025-10
version: "1.0"
source_path: 08_ARCHITECTURE/Frontend_Architecture/Overview.md
effective_date: 2025-10-24
visibility: internal
security_level: high
tags: [architecture, Frontend_Architecture]
---

# Frontend Architecture - Архитектура Frontend

→ [Architecture](../_README.md)

## 🎯 TECH STACK

### Framework
- Next.js 14 (App Router, RSC)
- TypeScript 5.0+
- React 18+

### State Management
- Zustand (client state)
- React Query (server state)
- Context API (theme, auth)

### UI Components
- Shadcn/ui
- TailwindCSS
- Radix UI primitives

### Forms
- React Hook Form
- Zod validation

## 📁 STRUCTURE
```
app/
├── (auth)/          # Auth pages
├── (dashboard)/     # Main app
│   ├── briefs/
│   ├── media-plans/
│   └── campaigns/
└── api/             # API routes
```

**Версия:** 2.1 | **Статус:** ✅


