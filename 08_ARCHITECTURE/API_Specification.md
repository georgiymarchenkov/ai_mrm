---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: architecture_doc
title: API Specification
language: ru
industry: advertising
role_apply: [developer, architect]
period: 2025-10
version: "1.0"
source_path: 08_ARCHITECTURE/API_Specification.md
effective_date: 2025-10-24
visibility: internal
security_level: high
tags: [architecture, api_specification]
---

# API Specification
## MRM AI Platform

**Version:** 1.0  
**Date:** 23.10.2025  
**Base URL:** `https://api.mrm-ai.com/v1`

---

## Table of Contents

1. [Authentication](#authentication)
2. [Core Resources](#core-resources)
3. [API Endpoints](#api-endpoints)
4. [Webhooks](#webhooks)
5. [Rate Limiting](#rate-limiting)
6. [Error Handling](#error-handling)

---

## Authentication

### OAuth 2.0 + JWT

**Flow:**
1. Client requests auth token with credentials
2. Server returns JWT access token + refresh token
3. Client includes token in `Authorization` header for all API calls
4. Refresh token when access token expires

**Endpoints:**

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response 200:
{
  "access_token": "eyJhbGc...",
  "refresh_token": "refresh_token...",
  "expires_in": 3600,
  "token_type": "Bearer"
}
```

```http
POST /auth/refresh
Authorization: Bearer {refresh_token}

Response 200:
{
  "access_token": "new_access_token...",
  "expires_in": 3600
}
```

### API Headers

All API requests must include:
- `Authorization: Bearer {access_token}`
- `Content-Type: application/json`
- `X-Client-ID: {client_id}` (for multi-tenant)

---

## Core Resources

### 1. Clients

```typescript
interface Client {
  id: string;
  name: string;
  type: 'agency' | 'direct_advertiser';
  industry: string;
  created_at: string;
  updated_at: string;
  settings: {
    timezone: string;
    currency: 'RUB' | 'USD' | 'EUR';
    default_language: 'ru' | 'en';
  };
  integrations: {
    yandex_direct?: { connected: boolean; account_id?: string };
    vk_ads?: { connected: boolean; account_id?: string };
    yandex_metrika?: { connected: boolean; counter_ids?: number[] };
  };
}
```

### 2. Projects

```typescript
interface Project {
  id: string;
  client_id: string;
  name: string;
  description?: string;
  status: 'draft' | 'active' | 'paused' | 'completed' | 'archived';
  budget: {
    total: number;
    spent: number;
    currency: string;
  };
  timeline: {
    start_date: string;      // ISO 8601
    end_date?: string;
  };
  team: Array<{
    user_id: string;
    role: string;            // PM, Media_Planner, Analyst, etc.
  }>;
  created_at: string;
  updated_at: string;
}
```

### 3. Media Plans

```typescript
interface MediaPlan {
  id: string;
  project_id: string;
  name: string;
  status: 'draft' | 'pending_approval' | 'approved' | 'active' | 'completed';
  total_budget: number;
  channels: Array<{
    channel: 'yandex_direct' | 'vk_ads' | 'google_ads' | 'mytarget';
    budget: number;
    budget_percentage: number;
    formats: string[];       // e.g., ['search', 'display']
    kpis: {
      target_impressions?: number;
      target_clicks?: number;
      target_cpa?: number;
      target_romi?: number;
    };
  }>;
  targeting: {
    geo: string[];
    age?: { min: number; max: number };
    gender?: 'all' | 'male' | 'female';
    interests?: string[];
  };
  created_by: string;        // User ID
  approved_by?: string;
  created_at: string;
  updated_at: string;
}
```

### 4. Campaigns

```typescript
interface Campaign {
  id: string;
  media_plan_id: string;
  external_id?: string;      // ID in external platform (Yandex, VK)
  platform: 'yandex_direct' | 'vk_ads' | 'google_ads';
  name: string;
  status: 'draft' | 'pending_moderation' | 'active' | 'paused' | 'archived';
  budget: {
    daily_limit?: number;
    total_limit?: number;
    spent: number;
  };
  performance: {
    impressions: number;
    clicks: number;
    ctr: number;
    conversions: number;
    cost: number;
    cpa: number;
  };
  created_at: string;
  updated_at: string;
  last_synced_at?: string;
}
```

### 5. Reports

```typescript
interface Report {
  id: string;
  project_id: string;
  type: 'performance' | 'analytical_notes' | 'media_plan_analysis';
  period: {
    start_date: string;
    end_date: string;
  };
  data: {
    summary: any;            // Report-specific data
    channels: any[];
    insights: string[];
    recommendations: string[];
  };
  generated_by: 'ai' | 'user';
  generated_at: string;
  format: 'json' | 'pdf' | 'xlsx';
  download_url?: string;
}
```

---

## API Endpoints

### Clients

#### List Clients
```http
GET /clients
Query Parameters:
  - limit: number (default: 20, max: 100)
  - offset: number (default: 0)
  - search: string (search by name)
  - type: 'agency' | 'direct_advertiser'

Response 200:
{
  clients: Client[],
  total: number,
  has_more: boolean
}
```

#### Create Client
```http
POST /clients
Body: {
  name: string;
  type: 'agency' | 'direct_advertiser';
  industry: string;
  settings?: {
    timezone?: string;
    currency?: string;
  };
}

Response 201:
{
  client: Client
}
```

#### Get Client
```http
GET /clients/:id

Response 200:
{
  client: Client
}
```

#### Update Client
```http
PATCH /clients/:id
Body: Partial<Client>

Response 200:
{
  client: Client
}
```

---

### Projects

#### List Projects
```http
GET /projects
Query Parameters:
  - client_id: string (required)
  - status: 'draft' | 'active' | 'paused' | 'completed' | 'archived'
  - limit, offset

Response 200:
{
  projects: Project[],
  total: number
}
```

#### Create Project
```http
POST /projects
Body: {
  client_id: string;
  name: string;
  description?: string;
  budget: {
    total: number;
    currency: string;
  };
  timeline: {
    start_date: string;
    end_date?: string;
  };
  team?: Array<{user_id: string, role: string}>;
}

Response 201:
{
  project: Project
}
```

#### Get Project
```http
GET /projects/:id

Response 200:
{
  project: Project,
  media_plans: MediaPlan[],
  campaigns: Campaign[]
}
```

---

### Media Plans

#### Create Media Plan
```http
POST /media-plans
Body: {
  project_id: string;
  name: string;
  total_budget: number;
  channels: Array<{
    channel: string;
    budget: number;
    formats?: string[];
    kpis?: object;
  }>;
  targeting?: object;
}

Response 201:
{
  media_plan: MediaPlan
}
```

#### Analyze Media Plan (AI)
```http
POST /media-plans/:id/analyze
Body: {
  analysis_type: 'shmatov_calculator' | 'optimization' | 'forecast';
}

Response 200:
{
  analysis: {
    effective_frequency: number;
    effective_reach: number;
    grp_cost: number;
    recommendations: Array<{
      priority: 'high' | 'medium' | 'low';
      action: string;
      expected_impact: string;
    }>;
  }
}
```

---

### Campaigns

#### List Campaigns
```http
GET /campaigns
Query Parameters:
  - project_id: string
  - media_plan_id: string
  - platform: string
  - status: string

Response 200:
{
  campaigns: Campaign[],
  total: number
}
```

#### Create Campaign
```http
POST /campaigns
Body: {
  media_plan_id: string;
  platform: 'yandex_direct' | 'vk_ads';
  name: string;
  budget: {
    daily_limit?: number;
    total_limit?: number;
  };
  targeting: object;
  creative: object;        // Platform-specific
}

Response 201:
{
  campaign: Campaign
}
```

#### Sync Campaign
```http
POST /campaigns/:id/sync

Response 200:
{
  campaign: Campaign,      // Updated with latest data from platform
  last_synced_at: string
}
```

---

### Reports

#### Generate Report (AI)
```http
POST /reports/generate
Body: {
  project_id: string;
  type: 'performance' | 'analytical_notes' | 'channel_comparison';
  period: {
    start_date: string;
    end_date: string;
  };
  options?: {
    include_recommendations: boolean;
    format: 'json' | 'pdf' | 'xlsx';
  };
}

Response 202 (Async Job):
{
  job_id: string,
  status: 'processing',
  estimated_time: 30       // seconds
}
```

#### Get Report
```http
GET /reports/:id

Response 200:
{
  report: Report
}
```

#### Download Report
```http
GET /reports/:id/download
Query Parameters:
  - format: 'pdf' | 'xlsx'

Response 200:
Content-Type: application/pdf | application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
```

---

### AI Assistants

#### Generate Brief
```http
POST /ai/briefs/generate
Body: {
  client_id: string;
  input_text: string;      // Transcript, notes, email
  input_type: 'transcript' | 'notes' | 'email';
}

Response 200:
{
  brief: {
    brief_id: string;
    completeness: number;   // 0-1
    sections: object;       // Structured brief
    missing_fields: string[];
  }
}
```

#### Task Decomposition
```http
POST /ai/tasks/decompose
Body: {
  project_id: string;
  task_description: string;
  raci_matrix?: object;
}

Response 200:
{
  tasks: Array<{
    id: string;
    title: string;
    description: string;
    responsible: string[];
    accountable: string;
    estimated_hours: number;
    dependencies: string[];
  }>
}
```

#### Media Plan Optimization
```http
POST /ai/media-plans/optimize
Body: {
  media_plan_id: string;
  optimization_goal: 'maximize_reach' | 'minimize_cpa' | 'maximize_romi';
  constraints?: {
    max_budget_reallocation_percentage?: number;
  };
}

Response 200:
{
  original_plan: object;
  optimized_plan: object;
  expected_improvement: {
    metric: string;
    value: number;
    percentage: number;
  };
}
```

---

## Webhooks

### Subscribing to Webhooks

```http
POST /webhooks
Body: {
  url: string;             // Your webhook endpoint
  events: Array<'campaign.status_changed' | 'report.generated' | 'project.created'>;
  secret: string;          // For signature verification
}

Response 201:
{
  webhook: {
    id: string;
    url: string;
    events: string[];
    created_at: string;
  }
}
```

### Webhook Payload Example

```http
POST https://your-app.com/webhooks/mrm-ai
Headers:
  X-MRM-Signature: sha256=...
  X-MRM-Event: campaign.status_changed

Body:
{
  event: 'campaign.status_changed',
  timestamp: '2025-10-23T12:00:00Z',
  data: {
    campaign_id: 'camp_123',
    old_status: 'pending_moderation',
    new_status: 'active'
  }
}
```

---

## Rate Limiting

**Limits:**
- **Free Tier:** 100 requests/hour
- **Pro Tier:** 1,000 requests/hour
- **Enterprise:** Custom

**Headers:**
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 950
X-RateLimit-Reset: 1635945600    // Unix timestamp
```

**429 Response:**
```json
{
  "error": {
    "code": "rate_limit_exceeded",
    "message": "Rate limit exceeded. Retry after 60 seconds.",
    "retry_after": 60
  }
}
```

---

## Error Handling

### Error Response Format

```json
{
  "error": {
    "code": "error_code",
    "message": "Human-readable error message",
    "details": {
      "field": "additional_context"
    },
    "request_id": "req_abc123"
  }
}
```

### Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `unauthorized` | 401 | Invalid or expired token |
| `forbidden` | 403 | No permission to access resource |
| `not_found` | 404 | Resource not found |
| `validation_error` | 400 | Invalid request parameters |
| `rate_limit_exceeded` | 429 | Too many requests |
| `internal_error` | 500 | Server error |
| `service_unavailable` | 503 | Service temporarily unavailable |

---

## Pagination

**Standard pagination:**
```http
GET /resources?limit=20&offset=40

Response:
{
  data: [...],
  total: 150,
  limit: 20,
  offset: 40,
  has_more: true
}
```

**Cursor-based pagination (for large datasets):**
```http
GET /resources?limit=20&cursor=abc123

Response:
{
  data: [...],
  next_cursor: "def456",
  has_more: true
}
```

---

## Versioning

**URL Versioning:** `https://api.mrm-ai.com/v1/...`

**Deprecation:**
- 6 months notice before deprecating an endpoint
- Deprecation header: `X-API-Deprecated: true`
- Migration guide provided

---

## SDKs

### TypeScript/JavaScript
```bash
npm install @mrm-ai/sdk
```

```typescript
import { MRMAIClient } from '@mrm-ai/sdk';

const client = new MRMAIClient({
  apiKey: 'your_api_key'
});

const projects = await client.projects.list({ client_id: 'client_123' });
```

### Python
```bash
pip install mrm-ai
```

```python
from mrm_ai import MRMAIClient

client = MRMAIClient(api_key='your_api_key')
projects = client.projects.list(client_id='client_123')
```

---

**Version:** 1.0  
**Last Updated:** 23.10.2025  
**Maintained by:** MRM AI API Team

