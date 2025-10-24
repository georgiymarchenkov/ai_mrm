---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: specification
title: MVP Technical Specification - Техническая спецификация MVP
language: ru
industry: advertising
role_apply: [developer, architect, devops]
period: 2025-10
version: "1.0"
source_path: MVP_TECHNICAL_SPECIFICATION.md
effective_date: 2025-10-24
visibility: internal
security_level: high
tags: [mvp, tech_stack, architecture, infrastructure, specification]
synonyms: [tech spec, технические требования, infrastructure]
---

# MVP Technical Specification
## Техническая спецификация разработки и инфраструктуры MVP MRM AI Platform

→ [MVP Implementation Plan](./00_PROJECT_OVERVIEW/MVP_IMPLEMENTATION_PLAN.md) | [Architecture](./08_ARCHITECTURE/Overview.md)

**Версия:** 1.0  
**Дата:** 24 октября 2025  
**Статус:** Ready for Development

---

## 🎯 Executive Summary

### Цель документа

Определить **complete technology stack**, архитектуру и infrastructure requirements для разработки и deployment MVP MRM AI Platform с учетом:
- ✅ SaaS масштабирования (multi-tenancy, horizontal scaling)
- ✅ AI-first подхода (Claude API, RAG, agent-based development)
- ✅ Production-ready качества
- ✅ Cost-efficiency на старте

### Ключевые решения

```yaml
Primary Stack:
  Frontend: Next.js 14 + TypeScript + React
  Backend: Supabase (PostgreSQL + Auth + Storage) + Node.js microservices
  AI Layer: Claude 3.5 Sonnet + Pinecone Vector DB
  Deployment: Vercel (frontend) + Railway/Fly.io (backend) + Kubernetes (scale)
  
Development:
  Monorepo: Turborepo на GitHub
  CI/CD: GitHub Actions
  Testing: Vitest + Playwright
  Documentation: Docusaurus
```

---

## 📊 Architecture Overview

### High-Level Architecture (Updated with Garpun)

```
┌─────────────────────────────────────────────────────────────────┐
│                        CDN (Cloudflare)                          │
└─────────────────────┬───────────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────────┐
│                   Frontend (Vercel)                              │
│  Next.js 14 App Router + Server Components + Server Actions     │
└─────────────────────┬───────────────────────────────────────────┘
                      │
        ┌─────────────┼─────────────┐
        │             │             │
┌───────▼────┐  ┌────▼─────┐  ┌───▼──────┐
│  Supabase  │  │ Backend  │  │   AI     │
│  (BaaS)    │  │ Services │  │ Services │
│            │  │          │  │          │
│ PostgreSQL │  │ Node.js  │  │ Claude   │
│ Auth       │  │ FastAPI  │  │ RAG      │
│ Storage    │  │          │  │ Agents   │
│ Realtime   │  │          │  │          │
└─────┬──────┘  └──┬───────┘  └───┬──────┘
      │            │              │
      │   ┌────────▼─────┐        │
      │   │   Garpun     │◄───────┘
      │   │  (Partner)   │
      │   │              │
      │   │ • Ad APIs    │
      │   │ • Analytics  │
      │   │ • ETL        │
      │   └──────┬───────┘
      │          │
      └──────────┼──────────────┘
                 │
    ┌────────────┼────────────┐
    │            │            │
┌───▼──────┐ ┌──▼──────┐ ┌──▼────────┐
│ClickHouse│ │ Redis   │ │ Pinecone  │
│(Analytics)│ │(Cache) │ │(Vectors)  │
└──────────┘ └─────────┘ └───────────┘
    ▲
    │
┌───┴──────────────────────────┐
│   External Ad Platforms       │
│ • Yandex Direct               │
│ • VK Ads (via Garpun)         │
│ • Yandex Metrika              │
│ • Google Ads                  │
└───────────────────────────────┘
```

**🆕 KEY CHANGE: Garpun Partnership**
- ✅ **Garpun handles all ad platform integrations**
- ✅ **Saved 4.5 months of development time**
- ✅ **Focus on AI, UX, core value instead of "plumbing"**
- → See [Garpun Partnership Integration](./07_INTEGRATIONS/Garpun_Partnership/README.md)

### Layered Architecture

```yaml
1. Presentation Layer:
   - Next.js 14 (App Router, Server Components)
   - shadcn/ui + TailwindCSS
   - React Query для state management

2. API Gateway Layer:
   - Next.js API Routes (простые endpoints)
   - Supabase Edge Functions (serverless)
   - Kong/Traefik (для microservices, если нужно)

3. Application Layer:
   - Supabase (Auth, RLS, Realtime)
   - Node.js microservices (complex logic)
   - FastAPI services (Python, для AI/data processing)

4. AI/Agent Layer:
   - Claude 3.5 Sonnet API
   - RAG Service (Pinecone + embedding model)
   - LangChain/LangGraph для agent orchestration

5. Data Layer:
   - Supabase PostgreSQL (primary DB)
   - ClickHouse (analytics, time-series)
   - Redis (cache, sessions, queues)
   - Pinecone (vector embeddings)
   - S3-compatible storage (files, exports)

6. Integration Layer:
   - API connectors (Yandex, VK, Google)
   - Webhooks receiver
   - Background jobs (BullMQ + Redis)

7. Infrastructure Layer:
   - Vercel (frontend hosting)
   - Railway/Fly.io (backend services)
   - Kubernetes (future scale)
   - Cloudflare (CDN, DDoS)
```

---

## 🛠️ Technology Stack (Detailed)

### Frontend Stack

#### Core Framework

**Next.js 14.2+ (App Router)**

```typescript
// Tech stack
Framework: Next.js 14.2.x
Language: TypeScript 5.3+
Runtime: Node.js 20 LTS

// Features используемые
✅ App Router (RSC, Server Actions)
✅ Parallel Routes (dashboard layouts)
✅ Route Groups (auth), (app)
✅ Server Components (default)
✅ Client Components (interactive UI)
✅ Server Actions (form submissions, mutations)
✅ Middleware (auth, redirects)
✅ API Routes (webhooks, simple endpoints)
✅ Image Optimization (next/image)
✅ Font Optimization (next/font)

// Why Next.js?
+ Best-in-class DX
+ Excellent performance (Turbopack)
+ Built-in optimization
+ Vercel deployment (zero-config)
+ Large ecosystem
+ React Server Components (SEO + performance)
```

#### UI Framework & Styling

**shadcn/ui + TailwindCSS + Radix UI**

```typescript
UI Components: shadcn/ui 0.8+ (copy-paste components)
  ├─ Built on Radix UI primitives
  ├─ Fully customizable
  ├─ Accessible by default (WCAG 2.1 AA)
  └─ TypeScript + variants (class-variance-authority)

Styling: TailwindCSS 3.4+
  ├─ Utility-first CSS
  ├─ JIT compiler
  ├─ Custom theme (brand colors)
  └─ Plugins: @tailwindcss/forms, @tailwindcss/typography

Icons: Lucide React (tree-shakable)
Charts: Recharts (for analytics dashboards)
Tables: TanStack Table v8 (for media plans, 100+ rows)
Forms: React Hook Form + Zod validation
Dates: date-fns (lightweight vs moment)

// Example component structure
/components
  /ui           # shadcn/ui primitives (button, dialog, etc.)
  /forms        # reusable form components
  /tables       # table configurations
  /charts       # chart wrappers
  /layouts      # page layouts (DashboardLayout, etc.)
```

#### State Management

**Zustand + React Query + Server State**

```typescript
Global State: Zustand 4.x
  ├─ Lightweight (< 1kb)
  ├─ No boilerplate (vs Redux)
  ├─ TypeScript-first
  └─ DevTools support

Server State: TanStack Query (React Query) v5
  ├─ Data fetching, caching, sync
  ├─ Automatic refetch, retry
  ├─ Optimistic updates
  ├─ Infinite queries (pagination)
  └─ SSR support (prefetch on server)

Form State: React Hook Form
  ├─ Uncontrolled forms (performance)
  ├─ Zod schema validation
  └─ TypeScript inference

// State architecture
zustand:        User preferences, UI state, modals
React Query:    Server data (campaigns, reports), cache
React Context:  Theme, i18n (if needed)
Server State:   Auth user (Supabase), RBAC
```

#### Authentication & Authorization

**Supabase Auth + Row Level Security**

```typescript
Auth Provider: Supabase Auth
  ├─ Email/Password
  ├─ Magic Links
  ├─ OAuth (Google, optional)
  ├─ JWT tokens
  └─ Session management

Client SDK: @supabase/supabase-js
  ├─ useAuth() hook
  ├─ Protected routes (middleware)
  └─ RLS policies (database-level RBAC)

RBAC Implementation:
  ├─ 7 roles: pm, account_manager, specialist, strategist, analyst, creative, client
  ├─ Stored in users.role (enum)
  ├─ RLS policies per table
  └─ Client-side: role-based UI rendering
```

---

### Backend Stack

#### Backend-as-a-Service: Supabase

**Supabase (PostgreSQL + Auth + Storage + Realtime)**

```yaml
Platform: Supabase (self-hosted capable)
Plan: Pro ($25/mo) → Team ($599/mo when scale)

Components:
  1. PostgreSQL 15:
     - Primary database
     - Row Level Security (RLS) для RBAC
     - Full-text search (pg_trgm)
     - JSONB для flexible fields
     - PostGIS (если location-based таргетинг)
  
  2. Auth:
     - JWT-based authentication
     - User management API
     - Email verification
     - Password reset
     - Multi-tenancy support (tenant_id)
  
  3. Storage:
     - S3-compatible file storage
     - Для: Excel uploads, exports, креативов
     - CDN для file delivery
     - Access policies (RLS)
  
  4. Realtime:
     - PostgreSQL CDC (Change Data Capture)
     - WebSocket subscriptions
     - Для: live dashboard updates, notifications
  
  5. Edge Functions:
     - Serverless functions (Deno runtime)
     - Для: webhooks, light API endpoints
     - Auto-scaling

Why Supabase:
  ✅ Open-source (self-host capable)
  ✅ PostgreSQL (not proprietary DB)
  ✅ RLS = database-level security
  ✅ Realtime built-in
  ✅ Generous free tier → scale gradually
  ✅ Fast development (vs building auth/storage)
  ✅ TypeScript SDK auto-generated from schema
```

#### Microservices Layer

**Node.js + TypeScript / Python + FastAPI**

```yaml
Service Architecture:
  
  1. Core API Service (Node.js + Express/Fastify):
     Purpose: Business logic, orchestration
     Language: TypeScript
     Framework: Fastify 4.x (faster than Express)
     
     Modules:
       - Campaign management
       - User management (extends Supabase)
       - Artifact CRUD
       - Permissions logic
     
     Libs:
       - Prisma (ORM, type-safe DB queries)
       - Zod (validation)
       - p-queue (concurrency control)
  
  2. AI Service (Python + FastAPI):
     Purpose: AI assistants, RAG, embeddings
     Language: Python 3.11+
     Framework: FastAPI 0.104+
     
     Modules:
       - Claude API wrapper
       - RAG service (query, ingestion)
       - Prompt management
       - Agent orchestration (LangChain)
     
     Libs:
       - anthropic (Claude SDK)
       - langchain 0.1+
       - pinecone-client
       - pydantic (validation)
       - tiktoken (token counting)
  
  3. Integration Service (Node.js):
     Purpose: External API integrations
     Language: TypeScript
     Framework: Fastify
     
     Connectors:
       - Yandex Direct API
       - Yandex Metrika API
       - VK Ads API
       - Google Sheets API
       - Telegram Bot API
     
     Features:
       - Rate limiting per platform
       - Retry logic (exponential backoff)
       - Webhook receiver
       - Data normalization
  
  4. Analytics Service (Python):
     Purpose: Data processing, calculations
     Language: Python 3.11+
     Framework: FastAPI
     
     Modules:
       - Shmatov calculators
       - GRP/Reach calculations
       - Report generation
       - ClickHouse queries
     
     Libs:
       - pandas (data processing)
       - numpy (calculations)
       - clickhouse-driver
       - matplotlib/plotly (charts)

Communication:
  - REST API (primary)
  - gRPC (service-to-service, optional for perf)
  - Message Queue: BullMQ + Redis (async jobs)
```

#### API Gateway (Optional, for scale)

**Kong / Traefik**

```yaml
Gateway: Kong OSS / Traefik v3
Purpose: Unified entry point для microservices

Features:
  - Routing (path-based, header-based)
  - Rate limiting (per user, per tenant)
  - Authentication (JWT validation)
  - Load balancing
  - Circuit breaker
  - Observability (metrics, tracing)

Configuration:
  routes:
    - /api/core/*    → Core API Service
    - /api/ai/*      → AI Service
    - /api/integrations/* → Integration Service
    - /api/analytics/* → Analytics Service

When to add:
  - MVP: No (Vercel + Supabase sufficient)
  - Post-MVP: Yes (when >3 microservices)
```

---

### Database Layer

#### Primary Database: Supabase PostgreSQL

**Schema Design (MVP)**

```sql
-- Multi-tenancy schema
CREATE TABLE tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  plan TEXT NOT NULL CHECK (plan IN ('free', 'startup', 'pro')),
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Users (extends Supabase auth.users)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL CHECK (role IN ('pm', 'account_manager', 'specialist', 'strategist', 'analyst', 'creative', 'client')),
  avatar_url TEXT,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS Policy example
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own tenant users"
  ON users FOR SELECT
  USING (
    tenant_id = (SELECT tenant_id FROM users WHERE id = auth.uid())
  );

-- Projects
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  client_name TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'completed', 'archived')),
  budget NUMERIC(15, 2),
  start_date DATE,
  end_date DATE,
  team JSONB DEFAULT '{}', -- {pm_id, account_id, specialist_ids[], ...}
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_projects_tenant ON projects(tenant_id);
CREATE INDEX idx_projects_status ON projects(status);

-- Artifacts (polymorphic table)
CREATE TABLE artifacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('brief', 'strategy', 'media_plan', 'campaign_report', 'budget', 'technical_spec', 'communication', 'tasks')),
  title TEXT NOT NULL,
  data JSONB NOT NULL, -- flexible schema per type
  version INTEGER DEFAULT 1,
  created_by UUID REFERENCES users(id),
  updated_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_artifacts_tenant ON artifacts(tenant_id);
CREATE INDEX idx_artifacts_project ON artifacts(project_id);
CREATE INDEX idx_artifacts_type ON artifacts(type);

-- Media Plans (denormalized for performance)
CREATE TABLE media_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  artifact_id UUID REFERENCES artifacts(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  total_budget NUMERIC(15, 2) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  channels JSONB NOT NULL, -- [{channel, budget, grp, reach, ...}]
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'approved', 'active', 'completed')),
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Campaign Reports
CREATE TABLE campaign_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  media_plan_id UUID REFERENCES media_plans(id) ON DELETE SET NULL,
  report_date DATE NOT NULL,
  report_type TEXT NOT NULL CHECK (report_type IN ('daily', 'weekly', 'monthly', 'final')),
  metrics JSONB NOT NULL, -- {impressions, clicks, ctr, cpc, conversions, ...}
  insights JSONB DEFAULT '[]', -- AI-generated insights
  pdf_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_reports_project_date ON campaign_reports(project_id, report_date DESC);

-- Integrations (OAuth tokens, settings)
CREATE TABLE integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  platform TEXT NOT NULL CHECK (platform IN ('yandex_direct', 'yandex_metrika', 'vk_ads', 'google_ads', 'google_analytics')),
  credentials JSONB NOT NULL, -- encrypted tokens
  settings JSONB DEFAULT '{}',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'error')),
  last_sync_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(tenant_id, platform)
);

-- Analytics Events (for ClickHouse, stored here temporarily)
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID,
  user_id UUID,
  event_type TEXT NOT NULL,
  event_data JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_events_created ON analytics_events(created_at DESC);

-- Background Jobs (for BullMQ tracking)
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  payload JSONB,
  result JSONB,
  error TEXT,
  attempts INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

**Indexes Strategy:**

```sql
-- Performance indexes
CREATE INDEX CONCURRENTLY idx_users_tenant_role ON users(tenant_id, role);
CREATE INDEX CONCURRENTLY idx_artifacts_updated ON artifacts(updated_at DESC);
CREATE INDEX CONCURRENTLY idx_media_plans_dates ON media_plans(start_date, end_date);

-- Full-text search (GIN)
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX idx_projects_name_trgm ON projects USING gin(name gin_trgm_ops);
CREATE INDEX idx_artifacts_title_trgm ON artifacts USING gin(title gin_trgm_ops);

-- JSONB indexes (for frequent queries)
CREATE INDEX idx_artifacts_data_status ON artifacts USING gin((data -> 'status'));
```

#### Analytics Database: ClickHouse

**ClickHouse for Time-Series Data**

```yaml
Purpose: High-performance analytics queries
Version: ClickHouse 23.x
Deployment: ClickHouse Cloud / Self-hosted (Docker)

Tables:

1. campaign_metrics (time-series):
   CREATE TABLE campaign_metrics (
     date Date,
     datetime DateTime,
     tenant_id UUID,
     project_id UUID,
     channel String,
     platform String, -- yandex_direct, vk_ads, etc.
     campaign_id String,
     
     impressions UInt64,
     clicks UInt32,
     cost Decimal(15, 2),
     conversions UInt32,
     
     ctr Float32, -- clicks/impressions
     cpc Decimal(10, 2), -- cost/clicks
     cpa Decimal(10, 2), -- cost/conversions
     
     metadata String -- JSON string with flexible fields
   ) ENGINE = MergeTree()
   PARTITION BY toYYYYMM(date)
   ORDER BY (tenant_id, project_id, date, channel);

2. user_events (product analytics):
   CREATE TABLE user_events (
     timestamp DateTime,
     tenant_id UUID,
     user_id UUID,
     event_type String, -- page_view, button_click, feature_used
     event_data String, -- JSON
     session_id String
   ) ENGINE = MergeTree()
   PARTITION BY toYYYYMM(timestamp)
   ORDER BY (tenant_id, timestamp);

Queries:
  - Daily aggregations (SUM, AVG by date)
  - Channel comparison (GROUP BY channel)
  - Trend analysis (time-series)
  - Cohort analysis (retention)

Sync Strategy:
  - PostgreSQL → ClickHouse ETL (daily batch)
  - OR real-time via Kafka/BullMQ
  - Materialized views for common queries
```

#### Caching Layer: Redis

**Redis for Cache + Sessions + Queues**

```yaml
Version: Redis 7.x
Deployment: Upstash (serverless) / Redis Cloud

Use Cases:

1. API Response Cache:
   - TTL: 5-60 minutes
   - Keys: `cache:reports:{project_id}:{date}`
   - Invalidation: on data update

2. Session Storage:
   - Supabase sessions (если не JWT-only)
   - User preferences cache

3. Rate Limiting:
   - Per-user: 100 req/min
   - Per-tenant: 1000 req/min
   - Algorithm: Token bucket (redis sliding window)

4. Message Queue (BullMQ):
   - Job queue для background tasks:
     * Data sync jobs (Yandex/VK API)
     * Report generation (PDF)
     * Email sending
     * RAG ingestion
   
   Queues:
     - integrations-queue (high priority)
     - reports-queue (medium)
     - emails-queue (low)

Libraries:
  - Node.js: ioredis, bullmq
  - Python: redis-py, arq (async)
```

#### Vector Database: Pinecone

**Pinecone for RAG Embeddings**

```yaml
Platform: Pinecone (managed vector DB)
Plan: Starter ($70/mo) → Standard ($249/mo)
Alternative: Chroma (self-hosted, free) для dev

Index Configuration:
  name: mrm-docs
  dimensions: 1536 (OpenAI text-embedding-3-small)
            OR 3072 (text-embedding-3-large, better quality)
  metric: cosine
  pods: s1.x1 (5M vectors, 1 pod)

Metadata Schema:
  {
    tenant_id: "mrm",
    client_id: "global" | "{client_id}",
    project_id: "platform_docs" | "{project_id}",
    artifact_type: "tool_doc" | "process" | "prompt" | ...,
    source_path: "03_TOOLS/Reach_Calculator/Overview.md",
    chunk_index: 0,
    heading: "## Формула расчета",
    line_range: [45, 89],
    language: "ru",
    tags: ["reach", "calculator"],
    version: "1.0",
    effective_date: "2025-10-24"
  }

Queries:
  - Semantic search: vector similarity
  - Filters: tenant_id, artifact_type, language
  - Hybrid search: vector + metadata filters
  - Re-ranking: Cohere Rerank API (optional)

Embedding Model:
  - Production: OpenAI text-embedding-3-large
  - Cost: $0.00013 per 1K tokens
  - Alternative: e5-large-v2 (open-source, self-hosted)

Ingestion Pipeline:
  1. Extract text from MD files
  2. Parse frontmatter → metadata
  3. Chunk by H2/H3 (800-1200 tokens)
  4. Generate embeddings (batch 100)
  5. Upsert to Pinecone (with metadata)
  6. Store citations (file, heading, line_range)

RAG Query Flow:
  1. User query → embed (same model)
  2. Pinecone search (k=20, filters)
  3. Re-rank top 20 → top 5 (Cohere)
  4. Format as context for Claude
  5. Generate response + citations
```

---

### AI/Agent Layer

#### LLM: Claude API

**Anthropic Claude 3.5 Sonnet**

```yaml
Provider: Anthropic
Model: claude-3-5-sonnet-20241022
Context: 200K tokens input
Output: 8K tokens max
Cost: $3 per 1M input tokens, $15 per 1M output tokens

Why Claude:
  ✅ Best-in-class for reasoning
  ✅ 200K context (vs GPT-4: 128K)
  ✅ Extended thinking (for complex analysis)
  ✅ Function calling (tool use)
  ✅ Artifacts (для structured output)
  ✅ Lower refusal rate (helpfulness)

SDK: @anthropic-ai/sdk (TypeScript/Node.js)
      anthropic (Python)

Rate Limits:
  Tier 1: 50 req/min, 40K tokens/min
  Tier 2: 1000 req/min, 80K tokens/min
  (Достигается after $100 spend)

Prompts Storage:
  - Version control в Git (09_DEVELOPMENT/AI_Prompts_Library/)
  - Runtime loading from DB (for A/B testing)
  - Variables injection: {user_name}, {project_context}, ...

Example Usage:
  const message = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 4096,
    temperature: 0.3,
    system: SYSTEM_PROMPT,
    messages: [
      { role: 'user', content: userQuery },
      ...conversationHistory
    ],
    tools: [
      { name: 'search_knowledge_base', ...},
      { name: 'calculate_reach', ...}
    ]
  });
```

#### Agent Framework: LangChain

**LangChain/LangGraph for Agent Orchestration**

```yaml
Library: LangChain 0.1+ (Python) / LangChain.js (TypeScript)
         LangGraph (для complex multi-step agents)

Why LangChain:
  ✅ Unified interface для LLMs
  ✅ Built-in RAG components
  ✅ Agent orchestration (ReAct, Plan-Execute)
  ✅ Tool calling abstraction
  ✅ Memory management
  ✅ LangSmith (observability, tracing)

Agent Types:

1. Media Plan Analyzer Agent:
   Type: ReAct (Reasoning + Acting)
   Tools:
     - search_knowledge_base (RAG)
     - calculate_grp (Shmatov calculator)
     - calculate_reach
     - optimize_budget
   Flow:
     Query → Reason → Tool call → Observe → Repeat → Final answer

2. Report Generator Agent:
   Type: Plan-Execute
   Flow:
     1. Plan: Break down report into sections
     2. Execute: Generate each section in parallel
     3. Aggregate: Combine sections
     4. Review: Check completeness
     5. Output: Final report

3. PM Assistant Agent:
   Type: Multi-tool conversational
   Tools:
     - search_rag (knowledge base)
     - decompose_task (task breakdown)
     - create_raci (RACI matrix generation)
     - search_calendar (schedule)
   Memory: Conversation history (last 10 messages)

LangSmith Integration:
  - Tracing каждого agent run
  - Latency tracking
  - Token usage
  - Success/failure metrics
  - Prompt versioning
```

#### RAG Service Architecture

**Detailed RAG Implementation**

```python
# RAG Service Structure

from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Pinecone as PineconeLangChain
from pinecone import Pinecone
from anthropic import Anthropic

class RAGService:
    def __init__(self):
        self.embeddings = OpenAIEmbeddings(
            model="text-embedding-3-large",
            dimensions=3072
        )
        self.pinecone = Pinecone(api_key=PINECONE_KEY)
        self.index = self.pinecone.Index("mrm-docs")
        self.anthropic = Anthropic(api_key=CLAUDE_KEY)
        self.reranker = CohereRerank(api_key=COHERE_KEY) # optional
    
    async def query(
        self, 
        query: str, 
        filters: dict,
        k: int = 10,
        rerank: bool = True
    ) -> List[Chunk]:
        # 1. Embed query
        query_embedding = await self.embeddings.aembed_query(query)
        
        # 2. Vector search
        results = self.index.query(
            vector=query_embedding,
            filter={
                "tenant_id": {"$eq": filters["tenant_id"]},
                "language": {"$eq": filters.get("language", "ru")},
                "artifact_type": {"$in": filters.get("artifact_types", [])}
            },
            top_k=k,
            include_metadata=True
        )
        
        # 3. Re-rank (optional, improves accuracy by 10-15%)
        if rerank and len(results.matches) > 0:
            docs = [match.metadata["text"] for match in results.matches]
            reranked = await self.reranker.rerank(query, docs, top_n=5)
            results = [results.matches[i] for i in reranked.indexes]
        
        # 4. Format chunks with citations
        chunks = []
        for match in results[:5]:  # Top 5
            chunks.append({
                "text": match.metadata["text"],
                "score": match.score,
                "citation": {
                    "file": match.metadata["source_path"],
                    "heading": match.metadata["heading"],
                    "line_range": match.metadata["line_range"]
                },
                "metadata": match.metadata
            })
        
        return chunks
    
    async def generate_with_rag(
        self, 
        query: str, 
        context_chunks: List[Chunk],
        system_prompt: str
    ) -> str:
        # Build context from chunks
        context = "\n\n".join([
            f"[Source: {c['citation']['file']}]\n{c['text']}"
            for c in context_chunks
        ])
        
        # Generate with Claude
        response = await self.anthropic.messages.create(
            model="claude-3-5-sonnet-20241022",
            max_tokens=4096,
            temperature=0.3,
            system=system_prompt,
            messages=[{
                "role": "user",
                "content": f"""Context:\n{context}\n\nQuestion: {query}"""
            }]
        )
        
        return response.content[0].text

# Usage in AI Assistant
rag = RAGService()

async def media_plan_assistant(user_query: str, tenant_id: str):
    # 1. RAG retrieval
    chunks = await rag.query(
        query=user_query,
        filters={
            "tenant_id": tenant_id,
            "artifact_types": ["tool_doc", "process", "prompt"]
        },
        k=10,
        rerank=True
    )
    
    # 2. Generate response
    response = await rag.generate_with_rag(
        query=user_query,
        context_chunks=chunks,
        system_prompt=MEDIA_PLAN_ASSISTANT_PROMPT
    )
    
    # 3. Return with citations
    return {
        "answer": response,
        "sources": [c["citation"] for c in chunks]
    }
```

---

### Development Workflow

#### Version Control: GitHub

**GitHub Organization & Repositories**

```yaml
Organization: mrm-ai (or company name)

Repositories:

1. mrm-platform (Main monorepo):
   Structure:
     /apps
       /web           # Next.js frontend
       /docs          # Docusaurus documentation
     /packages
       /ui            # Shared UI components
       /database      # Prisma schema, migrations
       /types         # Shared TypeScript types
       /utils         # Shared utilities
     /services
       /api           # Node.js Core API
       /ai            # Python AI Service
       /integrations  # Integration Service
       /analytics     # Analytics Service
     /docs            # This repo (platform_docs)
     /scripts         # DevOps scripts
   
   Tool: Turborepo (монорепо orchestration)

2. mrm-infrastructure:
   - Terraform configs
   - Kubernetes manifests
   - Docker compose для local dev
   - CI/CD configs

3. mrm-prompts (private):
   - AI prompts library (версионирование)
   - Prompt testing framework
   - A/B test results

Branch Strategy: GitHub Flow (simplified)
  - main: Production-ready
  - develop: Integration branch
  - feature/*: Feature branches
  - hotfix/*: Emergency fixes

Protection Rules (main branch):
  ✅ Require PR reviews (min 1)
  ✅ Require status checks (CI)
  ✅ No force push
  ✅ No direct commits
```

#### Monorepo: Turborepo

**Turborepo Configuration**

```json
// turbo.json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**"]
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": ["coverage/**"]
    },
    "lint": {
      "outputs": []
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

**Why Turborepo:**
- ✅ Fast builds (incremental, cached)
- ✅ Task orchestration
- ✅ Remote caching (Vercel)
- ✅ Better than Nx для smaller teams

#### CI/CD: GitHub Actions

**GitHub Actions Workflows**

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  lint-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - uses: pnpm/action-setup@v2
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Lint
        run: pnpm lint
      
      - name: Type check
        run: pnpm typecheck
      
      - name: Test
        run: pnpm test
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
  
  build:
    needs: lint-and-test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build
        run: pnpm build
  
  deploy-preview:
    if: github.event_name == 'pull_request'
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Vercel Preview
        run: vercel deploy --token=${{ secrets.VERCEL_TOKEN }}

# .github/workflows/deploy-production.yml
name: Deploy Production

on:
  push:
    branches: [main]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to Vercel Production
        run: vercel deploy --prod --token=${{ secrets.VERCEL_TOKEN }}
  
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Railway
        uses: railway/deploy@v1
        with:
          token: ${{ secrets.RAILWAY_TOKEN }}
          service: api
```

#### Testing Strategy

**Testing Stack**

```yaml
Unit Tests:
  Framework: Vitest (faster than Jest)
  Coverage: >80% для business logic
  Location: *.test.ts co-located with code

Integration Tests:
  Framework: Vitest + Supertest (API testing)
  Database: PostgreSQL test instance (Docker)
  Coverage: All API endpoints

E2E Tests:
  Framework: Playwright
  Coverage: Critical user flows:
    - Login → Dashboard
    - Create brief → Generate media plan
    - Upload Excel → Migration preview → Confirm
    - Generate report → Export PDF
  Run: On PR to main, nightly на staging

AI/Prompt Tests:
  Framework: LangSmith Evaluations
  Datasets: Golden set (100 queries)
  Metrics: RAGAS (faithfulness, answer_relevancy)
  Run: Before deploying new prompts

Load Tests:
  Framework: k6
  Scenarios:
    - 100 concurrent users (dashboard)
    - 1000 API requests/sec
    - RAG query latency < 2s (P95)
  Run: Before production deploy

Example Vitest config:
// vitest.config.ts
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: ['**/*.test.ts', '**/node_modules/**']
    },
    globals: true,
    environment: 'node',
    setupFiles: ['./test/setup.ts']
  }
});
```

---

## 🚀 Deployment & Infrastructure

### Frontend Hosting: Vercel

**Vercel for Next.js**

```yaml
Platform: Vercel
Plan: Pro ($20/month/team member)

Features:
  ✅ Zero-config Next.js deployment
  ✅ Global CDN (edge network)
  ✅ Automatic HTTPS
  ✅ Preview deployments (per PR)
  ✅ Web Analytics
  ✅ Edge Functions (для middleware)
  ✅ Image Optimization
  ✅ DDoS protection

Domains:
  Production: app.mrm-platform.com
  Staging: staging.mrm-platform.com
  Preview: {pr-number}.mrm-platform.vercel.app

Environment Variables:
  - NEXT_PUBLIC_SUPABASE_URL
  - NEXT_PUBLIC_SUPABASE_ANON_KEY
  - CLAUDE_API_KEY (server-only)
  - PINECONE_API_KEY
  - SENTRY_DSN

Build Config:
  Framework: Next.js
  Build Command: pnpm build
  Output Directory: .next
  Node Version: 20.x

Performance:
  - Edge caching (static pages)
  - ISR (Incremental Static Regeneration)
  - Streaming SSR (for AI responses)

Cost Estimate:
  Free tier: 100GB bandwidth
  Pro: $20/seat + $0.40/GB overage
  Expected: ~$50-100/month MVP
```

### Backend Hosting: Railway / Fly.io

**Railway for Backend Services**

```yaml
Platform: Railway.app (or Fly.io as alternative)
Plan: Hobby ($5/month) → Developer ($20/month)

Deployment:
  - Docker containers
  - Auto-deploy from GitHub (main branch)
  - Environment variables from Railway UI
  - PostgreSQL addon (Supabase external)
  - Redis addon (Upstash external for MVP)

Services Deployed:
  1. api-service (Node.js Core API)
     - 512MB RAM, 0.5 vCPU
     - Autoscaling: 1-3 instances
  
  2. ai-service (Python FastAPI)
     - 1GB RAM, 1 vCPU (AI inference)
     - Autoscaling: 1-2 instances
  
  3. integration-service (Node.js)
     - 512MB RAM, 0.5 vCPU
     - Autoscaling: 1-2 instances
  
  4. analytics-service (Python)
     - 512MB RAM, 0.5 vCPU
     - Autoscaling: 1 instance (cron jobs)

Health Checks:
  - /health endpoint (каждые 30s)
  - Restart on 3 failed checks
  - Alerting: Discord/Slack webhook

Cost Estimate:
  - Hobby: $5/mo (1 service)
  - Developer: $20/mo (4 services)
  - Expected MVP: $20-50/month

Alternative - Fly.io:
  Pros:
    + Cheaper ($0.01/hr per 256MB)
    + Global regions (lower latency)
    + Anycast routing
  Cons:
    - More configuration vs Railway
    - Learning curve (flyctl CLI)
```

### Database Hosting

**Supabase (PostgreSQL)**

```yaml
Supabase Plan: Pro
Cost: $25/month
Includes:
  - 8GB database
  - 250GB bandwidth
  - 100GB file storage
  - Daily backups (7 days)
  - Connection pooling
  - Read replicas (add-on)

Scaling:
  - Vertical: Upgrade plan ($25 → $599 Team)
  - Horizontal: Read replicas for heavy reads
  - Sharding: By tenant_id (future)

Backup Strategy:
  - Supabase: Daily auto-backups (7 days)
  - Manual: pg_dump weekly → S3
  - Point-in-time recovery (Pro plan)

Monitoring:
  - Supabase Dashboard (connections, CPU, disk)
  - pg_stat_statements (slow queries)
  - Alerting: >80% disk usage → Slack
```

**ClickHouse (Analytics)**

```yaml
Option 1: ClickHouse Cloud
  Plan: Development ($50/month)
  Includes:
    - 24GB RAM, 120GB storage
    - Auto-scaling compute
    - Backups
  
  Good for: MVP, managed service

Option 2: Self-hosted (Docker)
  Hosting: Railway / Fly.io
  Instance: 2GB RAM, 50GB SSD
  Cost: ~$15/month
  
  Good for: Cost-sensitive, control

Recommendation: Start with PostgreSQL only
                Add ClickHouse post-MVP if query performance < 100ms
```

**Redis (Cache & Queues)**

```yaml
Option 1: Upstash (Serverless Redis)
  Plan: Free tier → Pro ($10/month)
  Features:
    - Serverless (pay per request)
    - Global edge caching
    - REST API (no connection pooling)
    - Durability (AOF persistence)
  
  Cost (MVP): Free tier sufficient
              ($0.20 per 100K commands)

Option 2: Redis Cloud
  Plan: Free 30MB → Paid $7/month (250MB)
  Features:
    - Traditional Redis
    - Connection pooling
    - Persistence

Recommendation: Upstash for MVP (free tier)
```

**Pinecone (Vector DB)**

```yaml
Plan: Starter ($70/month)
Includes:
  - 1 pod (5M vectors)
  - 100K queries/month
  - 1 index
  - 99.9% uptime SLA

Scaling:
  - Add pods: $70/pod (5M more vectors)
  - Standard plan: $249/month (3 pods, replicas)

Alternative: Chroma (open-source)
  Hosting: Self-host on Railway/Fly
  Cost: ~$10/month (small instance)
  Pros: Free, full control
  Cons: More maintenance, no managed scaling

Recommendation: 
  - Dev/Staging: Chroma (free)
  - Production: Pinecone (managed, reliable)
```

### CDN & DDoS Protection: Cloudflare

**Cloudflare Configuration**

```yaml
Plan: Pro ($20/month) OR Enterprise (custom)
Domain: mrm-platform.com

Features Used:
  ✅ Global CDN (cache static assets)
  ✅ DDoS protection (L3, L4, L7)
  ✅ Web Application Firewall (WAF)
  ✅ Rate limiting (per IP)
  ✅ SSL/TLS (automatic)
  ✅ Analytics (traffic, threats)
  ✅ DNS management

Configuration:
  Cache Rules:
    - Static assets (images, CSS, JS): 30 days
    - API responses (immutable): 1 hour
    - Dynamic pages: No cache

  WAF Rules:
    - Block SQL injection attempts
    - Block XSS attempts
    - Rate limit: 100 req/10sec per IP
    - Challenge suspicious IPs (bot detection)

  Page Rules:
    - app.mrm-platform.com/* → Always HTTPS
    - api.mrm-platform.com/* → Bypass cache

Cost: $20/month (Pro plan sufficient for MVP)
```

---

## 🔐 Security & Compliance

### Authentication & Authorization

**Security Architecture**

```yaml
Authentication:
  Provider: Supabase Auth
  Method: JWT (access token + refresh token)
  Token Expiry: 1 hour (access), 30 days (refresh)
  
  MFA: Optional (TOTP, future)
  SSO: Optional (SAML, future enterprise)

Authorization:
  Model: RBAC (Role-Based Access Control)
  Roles: pm, account_manager, specialist, strategist, analyst, creative, client
  
  Implementation:
    - Database: Row Level Security (RLS) policies
    - API: Middleware checks (req.user.role)
    - Frontend: Conditional rendering

  Example RLS Policy:
    CREATE POLICY "Users can only see own tenant projects"
      ON projects FOR SELECT
      USING (tenant_id = (
        SELECT tenant_id FROM users WHERE id = auth.uid()
      ));
```

### Data Security

**Encryption & Privacy**

```yaml
Data at Rest:
  - PostgreSQL: AES-256 encryption (Supabase managed)
  - ClickHouse: Encryption enabled
  - S3 Storage: Server-side encryption (SSE-S3)
  - Backups: Encrypted

Data in Transit:
  - HTTPS only (TLS 1.3)
  - API-to-service: mTLS (future, if microservices in diff networks)

Secrets Management:
  - GitHub Secrets (CI/CD)
  - Vercel Environment Variables
  - Railway Environment Variables
  - Never commit secrets to Git (.env in .gitignore)

PII Handling:
  - User emails: Stored in auth.users (Supabase managed)
  - Client data: Tenant-isolated (RLS)
  - Data retention: 90 days after account deletion
  - GDPR: Right to erasure (delete account + data)

API Security:
  - Rate limiting: 100 req/min per user, 1000 req/min per tenant
  - Input validation: Zod schemas
  - SQL injection: Parameterized queries (Prisma ORM)
  - XSS: React auto-escaping + CSP headers
  - CSRF: SameSite cookies + CSRF tokens (POST/PUT/DELETE)
```

### Monitoring & Logging

**Observability Stack**

```yaml
Application Performance Monitoring (APM):
  Tool: Sentry (errors + performance)
  Plan: Team ($26/month)
  
  Features:
    - Error tracking (frontend + backend)
    - Performance monitoring (slow transactions)
    - Release tracking (deploy notifications)
    - User feedback (crash reports)
    - Source maps (minified code → readable)
  
  Alerts:
    - Error rate >1% → Slack
    - P95 latency >2s → Slack
    - New error (never seen) → Email

Logging:
  Tool: BetterStack (Logtail) OR Datadog Logs
  Plan: Hobby ($5/month) → Professional ($29/month)
  
  Log Aggregation:
    - All services → centralized logs
    - Structured JSON logs
    - Retention: 30 days
  
  Queries:
    - Filter by: service, level (error/warn/info), user_id, tenant_id
    - Search: full-text
    - Dashboards: error rates, slow queries

Metrics:
  Tool: Prometheus + Grafana (self-hosted)
       OR Datadog Metrics (managed, $15/month)
  
  Metrics Tracked:
    - Request rate (req/sec)
    - Latency (P50, P95, P99)
    - Error rate (%)
    - Database connections
    - Memory usage, CPU usage
    - AI API calls (count, cost)
  
  Dashboards:
    - Service health (per microservice)
    - Database performance
    - AI costs tracking

Uptime Monitoring:
  Tool: UptimeRobot (Free) OR Better Uptime ($20/month)
  
  Checks:
    - app.mrm-platform.com (every 5 min)
    - api.mrm-platform.com/health (every 1 min)
    - Supabase status (external check)
  
  Alerting:
    - Downtime >2 min → SMS + Slack
    - Status page: status.mrm-platform.com

Tracing (AI-specific):
  Tool: LangSmith
  Plan: Developer ($39/month)
  
  Traces:
    - Every AI assistant call
    - RAG query (retrieve → generate)
    - Token usage per call
    - Latency breakdown (embed → search → generate)
    - Prompt versions
  
  Evaluation:
    - RAGAS metrics (faithfulness, answer_relevancy)
    - A/B testing (prompt variants)
```

---

## 💰 Cost Breakdown (MVP - 3 months)

### Infrastructure Costs

```yaml
Frontend:
  Vercel Pro: $20/seat × 2 (dev seats) = $40/month
  Bandwidth overage: ~$20/month
  Total: $60/month

Backend:
  Railway Developer: $20/month (4 services)
  Total: $20/month

Databases:
  Supabase Pro: $25/month
  Redis Upstash: Free tier
  Pinecone Starter: $70/month
  ClickHouse: $0 (use PostgreSQL initially)
  Total: $95/month

AI Services:
  Claude API: $300/month (estimated usage)
    - 10K queries/month
    - Avg 5K input tokens, 1K output tokens per query
    - Cost: (10K × 5K × $3/1M) + (10K × 1K × $15/1M) = $150 + $150
  OpenAI Embeddings: $50/month
    - 5M tokens/month embedded
    - Cost: 5M × $0.00013/1K = $650/month... wait, recalc
    - Cost: (5M tokens / 1000) × $0.00013 = $0.65/month (much cheaper!)
  LangSmith: $39/month
  Cohere Rerank (optional): $0 (free tier 1K calls/month)
  Total: $390/month

CDN & Security:
  Cloudflare Pro: $20/month
  Total: $20/month

Monitoring & Logging:
  Sentry Team: $26/month
  BetterStack: $10/month
  UptimeRobot: Free
  Total: $36/month

Domains & Misc:
  Domain: $15/year = $1.25/month
  Email (Google Workspace): $6/month × 3 = $18/month
  Total: $20/month

----------------------------------
TOTAL INFRASTRUCTURE: $641/month
3 MONTHS: $1,923
```

### Development Costs (from MVP plan)

```yaml
Team Salaries (3 months): $138,000
Infrastructure (3 months): $1,923
Tools & Licenses: $500
Contingency (10%): $14,042

TOTAL: ~$154,500 for MVP
```

### Post-MVP Scaling Costs

```yaml
Month 4-6 (10 pilot agencies, 50 users):
  Vercel: $80/month (more bandwidth)
  Railway: $50/month (scale instances)
  Supabase: $599/month (Team plan, more storage)
  Pinecone: $249/month (Standard, replicas)
  Claude API: $1000/month (30K queries)
  ClickHouse Cloud: $50/month (add for analytics)
  Monitoring: $100/month (more seats)
  
  Total: ~$2,128/month

Month 7-12 (50 agencies, 200+ users):
  Infrastructure: $5,000-8,000/month
  Consider: Move to Kubernetes on AWS/GCP for better economics
```

---

## 🎯 MVP Development Priorities

### Phase 1: Foundation (Weeks 1-3) - Sprint 1-2

**Infrastructure Setup:**

```bash
Week 1: Dev Environment
- [x] GitHub organization + repositories
- [x] Turborepo monorepo setup
- [x] Local dev environment (Docker Compose)
  - PostgreSQL (for Supabase local dev)
  - Redis
  - ClickHouse (optional)
- [x] VSCode workspace + extensions
- [x] Pre-commit hooks (Husky + lint-staged)

Week 2: Core Services
- [x] Supabase project creation + schema
- [x] Next.js app scaffold (App Router)
- [x] Core API service (Fastify + Prisma)
- [x] Authentication flow (Supabase Auth)
- [x] RBAC implementation (RLS policies)
- [x] CI/CD pipeline (GitHub Actions)

Week 3: Deployment Pipeline
- [x] Vercel deployment (frontend)
- [x] Railway deployment (backend)
- [x] Environment variables setup
- [x] Monitoring (Sentry, logs)
- [x] Health checks + uptime monitoring
```

**Features to Build:**

```yaml
Sprint 1 (Week 1-2): Core Platform
  Frontend:
    - [ ] Auth pages (login, signup, password reset)
    - [ ] Dashboard layout (sidebar, header)
    - [ ] User settings page
    - [ ] Role-based navigation

  Backend:
    - [ ] User management API
    - [ ] Tenant management
    - [ ] Project CRUD
    - [ ] Artifact CRUD (basic)

  Database:
    - [ ] Full schema migration
    - [ ] RLS policies
    - [ ] Seed data (test users, projects)

Sprint 2 (Week 3): First Module - Migration Assistant
  Frontend:
    - [ ] File upload UI (drag-drop)
    - [ ] Preview table (parsed Excel)
    - [ ] Field mapping UI
    - [ ] Import confirmation

  Backend:
    - [ ] Excel parser (SheetJS)
    - [ ] AI field detection (Claude)
    - [ ] Data validation
    - [ ] Batch import API

  AI:
    - [ ] Claude API integration
    - [ ] Field detection prompt
    - [ ] Basic context management
```

### Phase 2: Core Features (Weeks 4-8) - Sprint 3-6

```yaml
Sprint 3-4 (Week 4-6): Media Plan Analyzer
  Features:
    - [ ] Media plan upload
    - [ ] Shmatov calculators implementation
    - [ ] AI analysis (optimization suggestions)
    - [ ] Interactive plan editor
    - [ ] Export to Excel

  Backend:
    - [ ] Calculation engine
    - [ ] Plan versioning
    - [ ] Optimization algorithms

Sprint 5-6 (Week 7-8): Report Generator + Analytics
  Features:
    - [ ] Yandex Metrika integration
    - [ ] Data sync jobs (BullMQ)
    - [ ] Report templates
    - [ ] AI insights generation
    - [ ] PDF export
    - [ ] Email delivery

  Analytics:
    - [ ] ClickHouse setup (or PostgreSQL views)
    - [ ] Dashboard queries
    - [ ] Real-time metrics
```

### Phase 3: AI & Polish (Weeks 9-12) - Sprint 7-8

```yaml
Sprint 7 (Week 9-10): AI Project Assistant + RAG
  Features:
    - [ ] RAG service (Pinecone + embeddings)
    - [ ] Documentation ingestion pipeline
    - [ ] Knowledge base search
    - [ ] Task decomposition
    - [ ] RACI generator

  Infrastructure:
    - [ ] Pinecone setup
    - [ ] Embedding pipeline
    - [ ] LangSmith tracing

Sprint 8 (Week 11-12): Production Ready
  - [ ] UI/UX polish
  - [ ] Performance optimization
  - [ ] Security audit
  - [ ] Load testing
  - [ ] Documentation (user guides)
  - [ ] Beta testing with 3-5 agencies
  - [ ] Bug fixes + iterations
```

---

## 📚 Documentation & Knowledge Base

### Developer Documentation

**Docusaurus Site**

```yaml
Tool: Docusaurus 3.x
Hosting: Vercel (same as main app)
Domain: docs.mrm-platform.com

Structure:
  /docs
    /getting-started
      - installation.md
      - local-development.md
      - project-structure.md
    
    /api
      - authentication.md
      - endpoints.md (auto-generated from OpenAPI)
      - webhooks.md
    
    /architecture
      - overview.md
      - database-schema.md
      - microservices.md
      - ai-agents.md
    
    /guides
      - adding-new-integration.md
      - creating-ai-assistant.md
      - testing.md
      - deployment.md
    
    /reference
      - tech-stack.md
      - environment-variables.md
      - troubleshooting.md

Features:
  - Search (Algolia DocSearch)
  - API playground (OpenAPI integration)
  - Code examples (syntax highlighting)
  - Versioning (docs per release)
```

### OpenAPI Specification

**API Documentation**

```yaml
Tool: OpenAPI 3.1 (Swagger)
Generator: @fastify/swagger (auto-generated from code)

Endpoints Documented:
  - Auth: /auth/*
  - Users: /users/*
  - Projects: /projects/*
  - Artifacts: /artifacts/*
  - Media Plans: /media-plans/*
  - Reports: /reports/*
  - Integrations: /integrations/*
  - AI: /ai/*

Interactive Docs:
  - URL: api.mrm-platform.com/docs
  - Try it out (send requests from browser)
  - Schema downloads (JSON, YAML)
```

---

## 🔄 Next Steps & Decisions

### Immediate Actions (Week 1)

1. **Create GitHub Organization**
   - Set up repositories (mrm-platform, mrm-infrastructure)
   - Invite team members
   - Configure branch protection rules

2. **Provision Services**
   - Supabase project (Pro plan)
   - Vercel team account
   - Railway account
   - Pinecone index creation

3. **Set up Local Dev Environment**
   - Clone monorepo
   - Install dependencies
   - Docker Compose for local services
   - Run migrations
   - Seed data

4. **Kick-off Meeting**
   - Review this spec with team
   - Assign Sprint 1 tasks
   - Set up daily standups (10am)
   - Agree on communication channels (Slack/Discord)

### Architecture Decisions to Validate

```yaml
Decisions to confirm with team:

1. Supabase vs custom PostgreSQL + Auth service?
   Recommendation: Supabase (faster MVP, good enough for scale)
   Trade-off: Slight vendor lock-in vs development speed

2. Turborepo vs Nx monorepo?
   Recommendation: Turborepo (simpler, Vercel integration)
   Trade-off: Nx has more features, but more complex

3. Fastify vs Express for API?
   Recommendation: Fastify (faster, better TypeScript)
   Trade-off: Smaller ecosystem vs Express

4. Pinecone vs Chroma for vectors?
   Recommendation: Pinecone for prod, Chroma for dev
   Trade-off: Cost vs reliability

5. Railway vs Fly.io vs AWS ECS?
   Recommendation: Railway for MVP (ease of use)
   Trade-off: Can migrate to K8s/AWS later if needed

6. ClickHouse now vs later?
   Recommendation: Later (PostgreSQL sufficient for MVP)
   Trade-off: Simpler stack now, add when query perf becomes issue
```

---

## 🎓 Team Training & Resources

### Onboarding Materials

```yaml
Week 1 Onboarding:
  Day 1: Tech stack overview (this document)
  Day 2: Local setup + run MVP mockup
  Day 3: Code architecture walkthrough
  Day 4: First PR (simple task)
  Day 5: Sprint planning

Resources:
  - Next.js 14 App Router: https://nextjs.org/docs
  - Supabase Docs: https://supabase.com/docs
  - Claude API: https://docs.anthropic.com
  - LangChain: https://python.langchain.com
  - Pinecone: https://docs.pinecone.io
```

---

## ✅ Success Criteria

### Technical Metrics

```yaml
MVP Launch Checklist:
  Performance:
    - [ ] P95 page load < 2s
    - [ ] P95 API latency < 500ms
    - [ ] P95 RAG query < 2s
  
  Reliability:
    - [ ] 99% uptime (staging, 2 weeks)
    - [ ] Zero critical bugs
    - [ ] <5 high-priority bugs
  
  Quality:
    - [ ] 80%+ test coverage
    - [ ] All E2E tests passing
    - [ ] Security audit passed
    - [ ] Load test: 100 concurrent users
  
  Features:
    - [ ] All 4 core modules working
    - [ ] 7 roles with RBAC functional
    - [ ] 3 AI assistants responding <5s
    - [ ] 5 integrations connected

Post-MVP (First 3 months):
  - [ ] 10+ agencies onboarded
  - [ ] 50+ active users
  - [ ] 1000+ artifacts created
  - [ ] NPS >40
  - [ ] <10% churn rate
```

---

**Версия:** 1.0  
**Дата:** 24 октября 2025  
**Статус:** ✅ Ready for Development  
**Next Review:** После Sprint 1 (неделя 3)

**Changelog:**
- v1.0 (2025-10-24): Initial comprehensive specification

