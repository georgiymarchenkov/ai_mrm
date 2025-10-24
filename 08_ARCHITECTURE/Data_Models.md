---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: architecture_doc
title: Data Models
language: ru
industry: advertising
role_apply: [developer, architect]
period: 2025-10
version: "1.0"
source_path: 08_ARCHITECTURE/Data_Models.md
effective_date: 2025-10-24
visibility: internal
security_level: high
tags: [architecture, data_models]
---

# Data Models
## MRM AI Platform

**Version:** 1.0  
**Date:** 23.10.2025

---

## Database Architecture

### Primary Databases

1. **PostgreSQL** — Transactional data (OLTP)
   - Users, Clients, Projects, Media Plans, Campaigns
   - Relations, ACID compliance

2. **ClickHouse** — Analytics data (OLAP)
   - Campaign statistics (time-series)
   - Event logs, metrics
   - Fast aggregations

3. **Redis** — Cache + Queues
   - Session storage
   - API rate limiting
   - Job queues (Bull)

4. **Vector DB (Pinecone/Chroma)** — AI/ML
   - Embeddings for semantic search
   - Template learning
   - Feedback loop data

---

## PostgreSQL Schema

### Core Tables

#### 1. users
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  role VARCHAR(50) NOT NULL, -- 'admin', 'pm', 'media_planner', 'analyst', 'account_manager', 'specialist'
  status VARCHAR(20) DEFAULT 'active', -- 'active', 'suspended', 'deleted'
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_login_at TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_status ON users(status);
```

#### 2. clients
```sql
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL, -- 'agency', 'direct_advertiser'
  industry VARCHAR(100),
  website VARCHAR(255),
  settings JSONB DEFAULT '{}', -- {timezone, currency, language}
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_clients_type ON clients(type);
CREATE INDEX idx_clients_industry ON clients(industry);
```

#### 3. client_integrations
```sql
CREATE TABLE client_integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  platform VARCHAR(50) NOT NULL, -- 'yandex_direct', 'vk_ads', 'yandex_metrika'
  status VARCHAR(20) DEFAULT 'connected', -- 'connected', 'disconnected', 'error'
  credentials JSONB NOT NULL, -- Encrypted tokens
  platform_account_id VARCHAR(255),
  last_synced_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(client_id, platform)
);

CREATE INDEX idx_integrations_client ON client_integrations(client_id);
CREATE INDEX idx_integrations_platform ON client_integrations(platform);
```

#### 4. projects
```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(20) DEFAULT 'draft', -- 'draft', 'active', 'paused', 'completed', 'archived'
  budget_total DECIMAL(15, 2),
  budget_spent DECIMAL(15, 2) DEFAULT 0,
  budget_currency VARCHAR(3) DEFAULT 'RUB',
  start_date DATE,
  end_date DATE,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_projects_client ON projects(client_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_dates ON projects(start_date, end_date);
```

#### 5. project_team
```sql
CREATE TABLE project_team (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(50) NOT NULL, -- Project-specific role
  raci VARCHAR(1) CHECK (raci IN ('R', 'A', 'C', 'I')),
  assigned_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(project_id, user_id, role)
);

CREATE INDEX idx_team_project ON project_team(project_id);
CREATE INDEX idx_team_user ON project_team(user_id);
```

#### 6. media_plans
```sql
CREATE TABLE media_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  version INT DEFAULT 1,
  status VARCHAR(20) DEFAULT 'draft', -- 'draft', 'pending_approval', 'approved', 'active', 'completed'
  total_budget DECIMAL(15, 2),
  channels JSONB NOT NULL, -- Array of {channel, budget, formats, kpis}
  targeting JSONB, -- {geo, age, gender, interests}
  created_by UUID REFERENCES users(id),
  approved_by UUID REFERENCES users(id),
  approved_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_mediaplans_project ON media_plans(project_id);
CREATE INDEX idx_mediaplans_status ON media_plans(status);
```

#### 7. campaigns
```sql
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  media_plan_id UUID REFERENCES media_plans(id) ON DELETE CASCADE,
  external_id VARCHAR(255), -- ID in external platform
  platform VARCHAR(50) NOT NULL, -- 'yandex_direct', 'vk_ads'
  name VARCHAR(255) NOT NULL,
  status VARCHAR(20) DEFAULT 'draft', -- 'draft', 'pending_moderation', 'active', 'paused', 'archived'
  budget_daily DECIMAL(15, 2),
  budget_total DECIMAL(15, 2),
  budget_spent DECIMAL(15, 2) DEFAULT 0,
  configuration JSONB, -- Platform-specific settings
  last_synced_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(external_id, platform)
);

CREATE INDEX idx_campaigns_mediaplan ON campaigns(media_plan_id);
CREATE INDEX idx_campaigns_platform ON campaigns(platform);
CREATE INDEX idx_campaigns_external ON campaigns(external_id, platform);
```

#### 8. campaign_statistics
```sql
-- Aggregated statistics (daily rollup from ClickHouse)
CREATE TABLE campaign_statistics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  impressions BIGINT DEFAULT 0,
  clicks BIGINT DEFAULT 0,
  ctr DECIMAL(5, 2) DEFAULT 0,
  cost DECIMAL(15, 2) DEFAULT 0,
  cpc DECIMAL(10, 2) DEFAULT 0,
  conversions INT DEFAULT 0,
  cr DECIMAL(5, 2) DEFAULT 0,
  cpa DECIMAL(10, 2) DEFAULT 0,
  revenue DECIMAL(15, 2) DEFAULT 0,
  romi DECIMAL(10, 2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(campaign_id, date)
);

CREATE INDEX idx_stats_campaign ON campaign_statistics(campaign_id);
CREATE INDEX idx_stats_date ON campaign_statistics(date);
```

#### 9. reports
```sql
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- 'performance', 'analytical_notes', 'channel_comparison'
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  data JSONB NOT NULL, -- Report content
  generated_by VARCHAR(20) DEFAULT 'ai', -- 'ai', 'user'
  generated_at TIMESTAMP DEFAULT NOW(),
  format VARCHAR(10) DEFAULT 'json', -- 'json', 'pdf', 'xlsx'
  file_url TEXT, -- S3 URL if generated PDF/XLSX
  created_by UUID REFERENCES users(id)
);

CREATE INDEX idx_reports_project ON reports(project_id);
CREATE INDEX idx_reports_period ON reports(period_start, period_end);
```

#### 10. ai_prompts
```sql
CREATE TABLE ai_prompts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL, -- 'migration', 'media_plan', 'report', 'brief'
  prompt_template TEXT NOT NULL,
  version INT DEFAULT 1,
  status VARCHAR(20) DEFAULT 'active', -- 'active', 'deprecated'
  metadata JSONB, -- {model, temperature, max_tokens, etc}
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(name, version)
);

CREATE INDEX idx_prompts_category ON ai_prompts(category);
```

#### 11. ai_feedback
```sql
CREATE TABLE ai_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_id UUID REFERENCES ai_prompts(id),
  user_id UUID REFERENCES users(id),
  input_data JSONB, -- Input to AI
  output_data JSONB, -- AI output
  user_action VARCHAR(50), -- 'accepted', 'edited', 'rejected'
  edit_distance INT, -- % of output edited
  feedback_text TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_feedback_prompt ON ai_feedback(prompt_id);
CREATE INDEX idx_feedback_user ON ai_feedback(user_id);
CREATE INDEX idx_feedback_action ON ai_feedback(user_action);
```

#### 12. jobs
```sql
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(50) NOT NULL, -- 'sync_campaign', 'generate_report', 'send_email'
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
  payload JSONB NOT NULL,
  result JSONB,
  error TEXT,
  attempts INT DEFAULT 0,
  max_attempts INT DEFAULT 3,
  scheduled_at TIMESTAMP DEFAULT NOW(),
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_jobs_type ON jobs(type);
CREATE INDEX idx_jobs_scheduled ON jobs(scheduled_at);
```

---

## ClickHouse Schema

### Event Logs (Time-Series)

#### campaign_events
```sql
CREATE TABLE campaign_events (
  event_id UUID,
  timestamp DateTime64(3),
  campaign_id UUID,
  platform String,
  event_type String, -- 'impression', 'click', 'conversion'
  user_id Nullable(String), -- User identifier (if available)
  cost Decimal(10, 2),
  metadata String -- JSON string
)
ENGINE = MergeTree()
PARTITION BY toYYYYMM(timestamp)
ORDER BY (campaign_id, timestamp);
```

#### campaign_metrics_hourly
```sql
CREATE TABLE campaign_metrics_hourly (
  timestamp DateTime,
  campaign_id UUID,
  platform String,
  impressions UInt64,
  clicks UInt32,
  conversions UInt16,
  cost Decimal(15, 2),
  revenue Decimal(15, 2)
)
ENGINE = SummingMergeTree()
PARTITION BY toYYYYMM(timestamp)
ORDER BY (campaign_id, timestamp);
```

### Materialized Views for Aggregations

```sql
CREATE MATERIALIZED VIEW campaign_daily_stats
ENGINE = SummingMergeTree()
ORDER BY (campaign_id, date)
AS SELECT
  campaign_id,
  toDate(timestamp) as date,
  sum(impressions) as impressions,
  sum(clicks) as clicks,
  sum(conversions) as conversions,
  sum(cost) as cost,
  sum(revenue) as revenue
FROM campaign_metrics_hourly
GROUP BY campaign_id, date;
```

---

## Redis Data Structures

### 1. Session Storage
```
Key: session:{session_id}
Type: Hash
TTL: 24 hours
Fields: {user_id, email, role, created_at}
```

### 2. Rate Limiting
```
Key: ratelimit:{user_id}:{endpoint}
Type: String (counter)
TTL: 1 hour
```

### 3. API Cache
```
Key: cache:campaigns:{project_id}
Type: String (JSON)
TTL: 15 minutes
```

### 4. Job Queues
```
Queue: queue:sync
Queue: queue:reports
Queue: queue:email
(Managed by Bull)
```

---

## Vector DB Schema

### Embeddings for Template Learning

```typescript
interface TemplateEmbedding {
  id: string;
  client_id: string;
  artifact_type: 'media_plan' | 'report' | 'brief';
  embedding: number[]; // 1536-dim vector (OpenAI ada-002)
  metadata: {
    file_name: string;
    columns: string[];
    sample_data: any;
    frequency: number; // How often this template is used
  };
}
```

### Semantic Search for Projects

```typescript
interface ProjectEmbedding {
  id: string;
  project_id: string;
  content: string; // Brief + Media Plan description
  embedding: number[];
  metadata: {
    industry: string;
    budget: number;
    channels: string[];
    performance_rating: number; // 1-10
  };
}
```

---

## Data Migration Strategy

### Phase 1: Initial Setup (Sprint 0)
- Create PostgreSQL tables
- Create ClickHouse tables
- Setup Redis

### Phase 2: Seed Data (Sprint 0-1)
- Import demo clients & projects
- Populate AI prompts library
- Load benchmarks data

### Phase 3: Production Migration (Sprint 2+)
- Bulk import historical campaigns
- Backfill ClickHouse with historical stats
- Generate embeddings for templates

---

## Data Retention Policy

| Data Type | Retention | Archive |
|-----------|-----------|---------|
| Campaign events (ClickHouse) | 12 months | S3 (Parquet) |
| Campaign statistics (PostgreSQL) | 24 months | S3 |
| Reports | Indefinite | - |
| Logs | 30 days | S3 |
| AI feedback | Indefinite | - |

---

## Backup & Recovery

### PostgreSQL
- **Full Backup:** Daily at 02:00 UTC
- **Incremental:** Every 6 hours
- **WAL Archiving:** Continuous
- **Retention:** 30 days

### ClickHouse
- **Snapshot:** Daily
- **Replication:** 3 replicas
- **Retention:** 30 days

### Redis
- **RDB Snapshot:** Every 15 minutes
- **AOF:** Enabled (every second)
- **Retention:** 7 days

---

## Scaling Strategy

### PostgreSQL
- **Vertical Scaling:** 8 vCPU, 32GB RAM (initial) → 32 vCPU, 128GB RAM
- **Read Replicas:** 2 replicas for read-heavy queries
- **Connection Pooling:** PgBouncer

### ClickHouse
- **Horizontal Scaling:** 3 nodes (initial) → 10+ nodes
- **Sharding:** By client_id
- **Replication:** 3x per shard

### Redis
- **Cluster Mode:** 3 nodes (1 primary + 2 replicas)
- **Sentinel:** For automatic failover

---

**Version:** 1.0  
**Last Updated:** 23.10.2025  
**Maintained by:** MRM AI Data Team

