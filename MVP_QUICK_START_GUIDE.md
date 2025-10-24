---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: guide_doc
title: MVP Quick Start Guide - Быстрый старт разработки
language: ru
industry: advertising
role_apply: [developer]
period: 2025-10
version: "1.0"
source_path: MVP_QUICK_START_GUIDE.md
effective_date: 2025-10-24
visibility: internal
security_level: low
tags: [mvp, quickstart, development, setup]
---

# MVP Quick Start Guide
## Быстрый старт разработки MRM AI Platform

→ [MVP Technical Specification](./MVP_TECHNICAL_SPECIFICATION.md) | [MVP Implementation Plan](./00_PROJECT_OVERVIEW/MVP_IMPLEMENTATION_PLAN.md)

**Время setup:** ~30 минут  
**Для:** Frontend/Backend developers joining the project

---

## 🎯 Pre-requisites

### Required Software

```bash
# Install these before starting:

1. Node.js 20 LTS
   https://nodejs.org/

2. pnpm (package manager)
   npm install -g pnpm

3. Docker Desktop
   https://www.docker.com/products/docker-desktop

4. Git
   https://git-scm.com/

5. VSCode (recommended)
   https://code.visualstudio.com/
```

### Required Accounts

```yaml
Create accounts (free tiers):
  1. GitHub: github.com
  2. Supabase: supabase.com
  3. Vercel: vercel.com
  4. Claude API: console.anthropic.com
  5. Pinecone: pinecone.io

Ask team lead for:
  - GitHub organization invite
  - Supabase project access
  - Environment variables (.env.local)
```

---

## 🚀 Local Setup (Step-by-Step)

### 1. Clone Repository

```bash
# Clone main monorepo
git clone https://github.com/mrm-ai/mrm-platform.git
cd mrm-platform

# Install dependencies (this will take 3-5 min)
pnpm install
```

### 2. Start Local Services

```bash
# Start PostgreSQL, Redis, ClickHouse (Docker Compose)
docker-compose up -d

# Check services are running
docker-compose ps

# Should see:
# - postgres:15 (port 5432)
# - redis:7 (port 6379)
# - clickhouse:23 (port 8123)
```

### 3. Environment Variables

```bash
# Copy example env
cp .env.example .env.local

# Edit .env.local with your values
nano .env.local
```

**Required variables:**

```bash
# Database (local)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/mrm_dev"

# Supabase (create project at supabase.com)
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# AI Services
ANTHROPIC_API_KEY="sk-ant-..." # Get from console.anthropic.com
OPENAI_API_KEY="sk-..." # For embeddings

# Pinecone (vector DB)
PINECONE_API_KEY="your-api-key"
PINECONE_ENVIRONMENT="us-west1-gcp"
PINECONE_INDEX="mrm-docs-dev"

# Redis
REDIS_URL="redis://localhost:6379"

# Optional (for full features)
YANDEX_API_KEY="your-key"
VK_API_KEY="your-key"
```

### 4. Database Setup

```bash
# Run Prisma migrations
pnpm db:migrate

# Seed database with test data
pnpm db:seed

# Open Prisma Studio (DB GUI)
pnpm db:studio
# Opens at http://localhost:5555
```

### 5. Start Development Servers

```bash
# Option 1: Start all services (recommended)
pnpm dev

# This starts:
# - Frontend (Next.js): http://localhost:3000
# - API Service: http://localhost:4000
# - AI Service: http://localhost:5000

# Option 2: Start individual services
pnpm dev:web      # Frontend only
pnpm dev:api      # API service only
pnpm dev:ai       # AI service only
```

### 6. Verify Setup

```bash
# Open browser
http://localhost:3000

# You should see login page

# Test login with seed user:
Email: admin@mrm-platform.com
Password: admin123

# If successful, you'll see dashboard
```

---

## 🛠️ Development Workflow

### Daily Workflow

```bash
# 1. Pull latest changes
git checkout develop
git pull origin develop

# 2. Create feature branch
git checkout -b feature/your-feature-name

# 3. Start services
pnpm dev

# 4. Make changes, test locally

# 5. Run checks before commit
pnpm lint        # ESLint
pnpm typecheck   # TypeScript
pnpm test        # Run tests

# 6. Commit changes
git add .
git commit -m "feat: add your feature"

# 7. Push and create PR
git push origin feature/your-feature-name
# Go to GitHub and create Pull Request
```

### Code Structure

```
mrm-platform/
├── apps/
│   ├── web/              # Next.js frontend
│   │   ├── app/          # App Router pages
│   │   ├── components/   # React components
│   │   └── lib/          # Utilities
│   └── docs/             # Docusaurus docs
│
├── packages/
│   ├── ui/               # Shared UI components
│   ├── database/         # Prisma schema
│   └── types/            # Shared TypeScript types
│
├── services/
│   ├── api/              # Node.js Core API
│   ├── ai/               # Python AI Service
│   ├── integrations/     # Integration Service
│   └── analytics/        # Analytics Service
│
├── docker-compose.yml    # Local services
├── turbo.json            # Turborepo config
└── package.json
```

### Common Tasks

#### Adding New Component

```bash
# Create component in apps/web/components/
# Example: apps/web/components/media-plan-table.tsx

import { Button } from '@/components/ui/button'

export function MediaPlanTable() {
  return (
    <div>
      <Button>Create Plan</Button>
    </div>
  )
}

# Use in page:
# apps/web/app/dashboard/media-plans/page.tsx
import { MediaPlanTable } from '@/components/media-plan-table'
```

#### Adding New API Endpoint

```typescript
// services/api/src/routes/projects.ts

import { FastifyPluginAsync } from 'fastify'

const projectsRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/projects', async (request, reply) => {
    const { user } = request
    
    const projects = await fastify.prisma.project.findMany({
      where: { tenantId: user.tenantId }
    })
    
    return { projects }
  })
}

export default projectsRoutes
```

#### Adding Database Table

```bash
# Edit Prisma schema
nano packages/database/prisma/schema.prisma

# Add model:
model Campaign {
  id        String   @id @default(uuid())
  projectId String
  project   Project  @relation(fields: [projectId], references: [id])
  name      String
  budget    Decimal
  createdAt DateTime @default(now())
}

# Create migration
pnpm db:migrate:dev --name add_campaigns_table

# Generate Prisma Client
pnpm db:generate
```

---

## 🧪 Testing

### Run Tests

```bash
# All tests
pnpm test

# Watch mode (for TDD)
pnpm test:watch

# Coverage
pnpm test:coverage

# E2E tests (Playwright)
pnpm test:e2e

# Specific service
pnpm --filter @mrm/api test
```

### Writing Tests

```typescript
// Example Vitest test
// services/api/src/utils/calculations.test.ts

import { describe, it, expect } from 'vitest'
import { calculateGRP } from './calculations'

describe('calculateGRP', () => {
  it('should calculate GRP correctly', () => {
    const reach = 50 // 50%
    const frequency = 3
    const grp = calculateGRP(reach, frequency)
    
    expect(grp).toBe(150)
  })
  
  it('should handle zero reach', () => {
    expect(calculateGRP(0, 5)).toBe(0)
  })
})
```

---

## 🚢 Deployment

### Preview Deployment (Automatic)

```bash
# Every PR creates preview deployment
# Just push to your branch

git push origin feature/my-feature

# GitHub Actions will:
# 1. Run tests
# 2. Build app
# 3. Deploy to Vercel preview
# 4. Comment PR with URL
```

### Production Deployment

```bash
# Merge PR to main branch
# Automatic deployment via GitHub Actions

# Or manual:
vercel deploy --prod
```

---

## 🆘 Troubleshooting

### Common Issues

#### 1. Database Connection Error

```bash
# Problem: Can't connect to PostgreSQL
# Solution:
docker-compose ps  # Check if postgres is running
docker-compose up postgres -d

# If still not working, reset DB:
docker-compose down -v
docker-compose up -d
pnpm db:migrate
```

#### 2. Port Already in Use

```bash
# Problem: Port 3000 is already in use
# Solution: Kill process
lsof -ti:3000 | xargs kill -9

# Or change port in .env.local:
PORT=3001
```

#### 3. pnpm install fails

```bash
# Problem: Dependencies not installing
# Solution: Clear cache
pnpm store prune
rm -rf node_modules
pnpm install
```

#### 4. TypeScript Errors

```bash
# Problem: Type errors not auto-fixed
# Solution: Regenerate types
pnpm db:generate  # Prisma types
pnpm typecheck    # Check all types
```

#### 5. AI Service Not Starting

```bash
# Problem: Python service fails
# Solution: Check Python version and deps
python --version  # Should be 3.11+
cd services/ai
pip install -r requirements.txt
```

---

## 📚 Learning Resources

### Must-Read Docs

```yaml
Priority 1 (First Week):
  - Next.js App Router: https://nextjs.org/docs/app
  - Supabase Auth: https://supabase.com/docs/guides/auth
  - Prisma: https://www.prisma.io/docs
  - shadcn/ui: https://ui.shadcn.com

Priority 2 (Second Week):
  - Claude API: https://docs.anthropic.com
  - LangChain: https://python.langchain.com
  - Pinecone: https://docs.pinecone.io
  - React Query: https://tanstack.com/query

Project-Specific:
  - MVP Technical Spec: ./MVP_TECHNICAL_SPECIFICATION.md
  - Architecture: ./08_ARCHITECTURE/Overview.md
  - RAG Service: ./09_DEVELOPMENT/RAG/README.md
```

### Video Tutorials

```yaml
Next.js 14:
  - https://www.youtube.com/watch?v=... (App Router crash course)

Supabase:
  - https://www.youtube.com/watch?v=... (Auth + RLS)

LangChain:
  - https://www.youtube.com/watch?v=... (RAG tutorial)
```

---

## 🤝 Getting Help

### Communication Channels

```yaml
Slack Channels:
  #dev-general: General dev discussion
  #dev-frontend: Frontend questions
  #dev-backend: Backend questions
  #dev-ai: AI/ML questions
  #dev-help: Stuck? Ask here!

Daily Standup: 10:00 AM (15 min)
  - What did yesterday
  - What doing today
  - Any blockers?

Code Review: Within 24 hours
  - Tag 1 reviewer minimum
  - Address comments
  - Merge when approved
```

### Key Contacts

```yaml
Team Lead: @john (john@mrm-platform.com)
Frontend Lead: @sarah (sarah@mrm-platform.com)
Backend Lead: @mike (mike@mrm-platform.com)
AI Lead: @anna (anna@mrm-platform.com)
DevOps: @alex (alex@mrm-platform.com)
```

---

## ✅ Setup Checklist

Before starting first task:

- [ ] Cloned repository
- [ ] Installed all dependencies (pnpm install)
- [ ] Started local services (docker-compose up)
- [ ] Created .env.local with all variables
- [ ] Ran database migrations (pnpm db:migrate)
- [ ] Seeded database (pnpm db:seed)
- [ ] Started dev servers (pnpm dev)
- [ ] Logged in at http://localhost:3000
- [ ] Ran tests successfully (pnpm test)
- [ ] Read MVP Technical Specification
- [ ] Joined Slack channels
- [ ] Added to GitHub organization

---

## 🎓 Next Steps

### First Week Tasks

```yaml
Day 1:
  - Complete setup checklist
  - Read MVP Technical Specification
  - Watch Next.js/Supabase tutorials
  - Attend team introduction meeting

Day 2:
  - Explore codebase (read README files)
  - Run app locally, click around
  - Make small PR (fix typo, add comment)
  - Get familiar with PR process

Day 3:
  - Pick "good first issue" from GitHub
  - Implement + test locally
  - Create PR
  - Respond to code review

Day 4-5:
  - Work on Sprint tasks
  - Attend daily standups
  - Ask questions in Slack
  - Help review others' PRs
```

---

**Версия:** 1.0  
**Last Updated:** 24 октября 2025  
**Статус:** ✅ Ready for New Developers

**Questions?** Ask in #dev-help Slack channel!

