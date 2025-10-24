---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: overview
title: Техническая архитектура MRM AI Platform
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: Technical_Architecture.md
effective_date: 2025-10-24
visibility: internal
security_level: low
tags: [documentation]
---

# Техническая архитектура MRM AI Platform

## 🏗️ Общая архитектура системы

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                            │
├─────────────────────────────────────────────────────────────────┤
│  Web App (Next.js)  │  Mobile Web  │  API Clients  │  Webhooks  │
└────────────┬────────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      API GATEWAY LAYER                          │
├─────────────────────────────────────────────────────────────────┤
│  Load Balancer  │  Rate Limiting  │  Auth  │  Routing  │  SSL   │
└────────────┬────────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────────┐
│                     APPLICATION LAYER                           │
├───────────────────┬─────────────────────┬──────────────────────┤
│  Backend Services │   AI Services       │  Integration Layer   │
│  (NestJS/FastAPI) │   (AI Agents)       │  (External APIs)     │
├───────────────────┼─────────────────────┼──────────────────────┤
│  • Auth Service   │  • AI Orchestrator  │  • Google Ads        │
│  • Project Mgmt   │  • PM Agent         │  • Meta Ads          │
│  • Artifact Mgmt  │  • Strategist Agent │  • Yandex.Direct     │
│  • User Mgmt      │  • Analyst Agent    │  • GA4               │
│  • Analytics      │  • Planner Agent    │  • Metrica           │
│  • Billing        │  • RAG System       │  • Internal APIs     │
│  • Notifications  │  • Embeddings       │                      │
└───────┬───────────┴─────────┬───────────┴──────────┬───────────┘
        │                     │                      │
        ▼                     ▼                      ▼
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│   DATA LAYER     │  │   AI LAYER       │  │  CACHE LAYER     │
├──────────────────┤  ├──────────────────┤  ├──────────────────┤
│  PostgreSQL      │  │  OpenAI/Claude   │  │  Redis           │
│  (Primary DB)    │  │  API             │  │  (Cache)         │
│                  │  │                  │  │                  │
│  ClickHouse      │  │  Vector DB       │  │  Session Store   │
│  (Analytics)     │  │  (Pinecone/      │  │                  │
│                  │  │   pgvector)      │  │  Queue           │
│  S3/GCS          │  │                  │  │  (BullMQ)        │
│  (File Storage)  │  │  Embedding API   │  │                  │
└──────────────────┘  └──────────────────┘  └──────────────────┘
        │                     │                      │
        └─────────────────────┴──────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    INFRASTRUCTURE LAYER                         │
├─────────────────────────────────────────────────────────────────┤
│  Kubernetes/ECS  │  Docker  │  CI/CD  │  Monitoring  │  Logs    │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔐 Security Architecture

### Authentication Flow:
```
User → Login → Auth Service → JWT Token → 
                ↓
        Refresh Token (httpOnly cookie) + Access Token
                ↓
        Subsequent requests with Bearer token
                ↓
        API Gateway validates → Routes to service
```

### Authorization:
- **RBAC (Role-Based Access Control):**
  ```
  Organization Admin
    └── Project Manager
          └── Team Member
                └── Guest (read-only)
  ```

- **Permissions:**
  - `project.create`, `project.read`, `project.update`, `project.delete`
  - `artifact.create`, `artifact.read`, `artifact.update`, `artifact.publish`
  - `team.invite`, `team.manage`
  - `billing.view`, `billing.manage`

### Data Security:
- **Encryption at rest:** AES-256
- **Encryption in transit:** TLS 1.3
- **Secrets management:** AWS Secrets Manager / HashiCorp Vault
- **API Keys:** Hashed and salted
- **PII data:** Encrypted columns in DB

---

## 📊 Database Architecture

### PostgreSQL Schema (Main DB)

#### Core Tables:

**organizations:**
```sql
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  subscription_plan VARCHAR(50) NOT NULL, -- free, team, business, enterprise
  subscription_status VARCHAR(50) NOT NULL, -- active, cancelled, past_due
  trial_ends_at TIMESTAMP,
  settings JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**users:**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  name VARCHAR(255),
  avatar_url TEXT,
  email_verified_at TIMESTAMP,
  last_login_at TIMESTAMP,
  preferences JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**organization_members:**
```sql
CREATE TABLE organization_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(50) NOT NULL, -- admin, manager, member, guest
  invited_by UUID REFERENCES users(id),
  joined_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(organization_id, user_id)
);
```

**projects:**
```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  client_name VARCHAR(255),
  status VARCHAR(50) NOT NULL, -- draft, active, paused, completed, archived
  start_date DATE,
  end_date DATE,
  budget DECIMAL(15,2),
  currency VARCHAR(3) DEFAULT 'USD',
  settings JSONB,
  metadata JSONB,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_projects_org ON projects(organization_id);
CREATE INDEX idx_projects_status ON projects(status);
```

**project_members:**
```sql
CREATE TABLE project_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(50) NOT NULL, -- pm, strategist, media_buyer, analyst, creative, viewer
  permissions JSONB,
  added_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(project_id, user_id)
);
```

**artifacts:**
```sql
CREATE TABLE artifacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- brief, strategy, media_plan, roadmap, task, report, document
  title VARCHAR(255) NOT NULL,
  content JSONB NOT NULL, -- structured content based on type
  version INTEGER DEFAULT 1,
  status VARCHAR(50) DEFAULT 'draft', -- draft, in_review, approved, published
  created_by UUID REFERENCES users(id),
  updated_by UUID REFERENCES users(id),
  approved_by UUID REFERENCES users(id),
  approved_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_artifacts_project ON artifacts(project_id);
CREATE INDEX idx_artifacts_type ON artifacts(type);
```

**artifact_versions:**
```sql
CREATE TABLE artifact_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artifact_id UUID REFERENCES artifacts(id) ON DELETE CASCADE,
  version INTEGER NOT NULL,
  content JSONB NOT NULL,
  changes_summary TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(artifact_id, version)
);
```

**tasks:**
```sql
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  artifact_id UUID REFERENCES artifacts(id) ON DELETE SET NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) NOT NULL, -- todo, in_progress, review, done, cancelled
  priority VARCHAR(50), -- low, medium, high, critical
  assignee_id UUID REFERENCES users(id),
  due_date DATE,
  completed_at TIMESTAMP,
  tags VARCHAR(50)[],
  order_index INTEGER,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_tasks_project ON tasks(project_id);
CREATE INDEX idx_tasks_assignee ON tasks(assignee_id);
CREATE INDEX idx_tasks_status ON tasks(status);
```

**comments:**
```sql
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  artifact_id UUID REFERENCES artifacts(id) ON DELETE CASCADE,
  task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  mentions UUID[],
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP
);

CREATE INDEX idx_comments_artifact ON comments(artifact_id);
CREATE INDEX idx_comments_task ON comments(task_id);
```

**ai_conversations:**
```sql
CREATE TABLE ai_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  agent_type VARCHAR(50) NOT NULL, -- pm, strategist, analyst, planner
  title VARCHAR(255),
  context JSONB, -- conversation context/metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**ai_messages:**
```sql
CREATE TABLE ai_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES ai_conversations(id) ON DELETE CASCADE,
  role VARCHAR(50) NOT NULL, -- user, assistant, system
  content TEXT NOT NULL,
  metadata JSONB, -- token usage, model, etc.
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_ai_messages_conversation ON ai_messages(conversation_id);
```

**integrations:**
```sql
CREATE TABLE integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  platform VARCHAR(50) NOT NULL, -- google_ads, meta_ads, ga4, etc.
  credentials JSONB NOT NULL, -- encrypted credentials
  settings JSONB,
  status VARCHAR(50) DEFAULT 'active',
  last_sync_at TIMESTAMP,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**campaign_data:**
```sql
CREATE TABLE campaign_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  integration_id UUID REFERENCES integrations(id) ON DELETE CASCADE,
  platform VARCHAR(50) NOT NULL,
  campaign_id VARCHAR(255) NOT NULL,
  campaign_name VARCHAR(255),
  date DATE NOT NULL,
  metrics JSONB NOT NULL, -- impressions, clicks, conversions, cost, etc.
  dimensions JSONB, -- device, location, etc.
  synced_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(integration_id, campaign_id, date)
);

CREATE INDEX idx_campaign_data_project ON campaign_data(project_id);
CREATE INDEX idx_campaign_data_date ON campaign_data(date);
```

**notifications:**
```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT,
  action_url TEXT,
  data JSONB,
  read_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(user_id, read_at);
```

---

### ClickHouse Schema (Analytics DB)

**campaign_metrics:**
```sql
CREATE TABLE campaign_metrics (
  date Date,
  project_id String,
  campaign_id String,
  platform String,
  impressions UInt64,
  clicks UInt64,
  conversions UInt64,
  cost Float64,
  revenue Float64,
  dimensions Nested(
    key String,
    value String
  ),
  created_at DateTime
) ENGINE = MergeTree()
PARTITION BY toYYYYMM(date)
ORDER BY (project_id, platform, campaign_id, date);
```

**user_events:**
```sql
CREATE TABLE user_events (
  timestamp DateTime,
  user_id String,
  organization_id String,
  event_name String,
  event_properties String, -- JSON string
  session_id String,
  device_type String,
  browser String
) ENGINE = MergeTree()
PARTITION BY toYYYYMM(timestamp)
ORDER BY (organization_id, user_id, timestamp);
```

---

### Vector Database (Pinecone/pgvector)

**Embeddings for RAG:**
```python
{
  "id": "artifact_uuid_chunk_1",
  "values": [0.1, 0.2, ...],  # 1536-dimensional vector (OpenAI embedding)
  "metadata": {
    "project_id": "uuid",
    "artifact_id": "uuid",
    "artifact_type": "strategy",
    "chunk_text": "...",
    "chunk_index": 1,
    "created_at": "2025-10-23T12:00:00Z"
  }
}
```

---

## 🤖 AI Agent Architecture

### AI Orchestrator Pattern:

```python
class AIOrchestrator:
    """
    Central orchestrator that routes requests to specialized agents
    """
    def __init__(self):
        self.agents = {
            'pm': ProjectManagerAgent(),
            'strategist': StrategyAgent(),
            'planner': MediaPlannerAgent(),
            'analyst': AnalystAgent(),
            'creative': CreativeAgent()
        }
        self.rag_system = RAGSystem()
        
    async def handle_request(self, user_message, context):
        # 1. Determine which agent(s) to use
        intent = await self.classify_intent(user_message)
        
        # 2. Retrieve relevant context from RAG
        relevant_docs = await self.rag_system.search(
            query=user_message,
            context=context
        )
        
        # 3. Route to appropriate agent
        agent = self.agents[intent['agent_type']]
        
        # 4. Generate response
        response = await agent.generate_response(
            message=user_message,
            context=context,
            relevant_docs=relevant_docs
        )
        
        # 5. Execute actions if needed
        if response.has_actions():
            await self.execute_actions(response.actions)
        
        return response
```

### Agent Base Class:

```python
class BaseAgent:
    def __init__(self, model="gpt-4", temperature=0.7):
        self.model = model
        self.temperature = temperature
        self.system_prompt = self.get_system_prompt()
    
    def get_system_prompt(self) -> str:
        """Override in subclasses"""
        raise NotImplementedError
    
    async def generate_response(self, message, context, relevant_docs):
        # Build prompt with context
        prompt = self.build_prompt(message, context, relevant_docs)
        
        # Call LLM
        response = await llm_client.chat_completion(
            model=self.model,
            messages=[
                {"role": "system", "content": self.system_prompt},
                *context.get('conversation_history', []),
                {"role": "user", "content": prompt}
            ],
            temperature=self.temperature,
            tools=self.get_available_tools()
        )
        
        # Parse and return
        return self.parse_response(response)
    
    def get_available_tools(self):
        """Define tools/functions this agent can call"""
        return []
```

### Project Manager Agent:

```python
class ProjectManagerAgent(BaseAgent):
    def get_system_prompt(self):
        return """
        You are an AI Project Manager for advertising campaigns.
        
        Your responsibilities:
        - Guide users through project setup
        - Create and manage project artifacts
        - Monitor deadlines and milestones
        - Identify risks and blockers
        - Coordinate team members
        
        Available tools:
        - create_project(name, client, dates, budget)
        - create_artifact(type, content)
        - assign_task(user, task, deadline)
        - get_project_status(project_id)
        - search_knowledge_base(query)
        
        Always:
        - Be proactive with reminders
        - Ask clarifying questions
        - Provide structured outputs
        - Cite sources from knowledge base
        """
    
    def get_available_tools(self):
        return [
            {
                "type": "function",
                "function": {
                    "name": "create_project",
                    "description": "Create a new advertising campaign project",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "name": {"type": "string"},
                            "client": {"type": "string"},
                            "budget": {"type": "number"},
                            "start_date": {"type": "string", "format": "date"},
                            "objectives": {"type": "array", "items": {"type": "string"}}
                        },
                        "required": ["name", "client"]
                    }
                }
            },
            {
                "type": "function",
                "function": {
                    "name": "create_brief",
                    "description": "Create campaign brief artifact",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "project_id": {"type": "string"},
                            "content": {
                                "type": "object",
                                "properties": {
                                    "objectives": {"type": "array"},
                                    "target_audience": {"type": "string"},
                                    "budget": {"type": "number"},
                                    "timeline": {"type": "object"},
                                    "kpis": {"type": "array"}
                                }
                            }
                        }
                    }
                }
            }
            # ... more tools
        ]
```

### RAG System:

```python
class RAGSystem:
    def __init__(self, vector_db, embeddings_model):
        self.vector_db = vector_db
        self.embeddings_model = embeddings_model
    
    async def index_artifact(self, artifact):
        """Index an artifact for semantic search"""
        # 1. Chunk the content
        chunks = self.chunk_content(artifact.content, chunk_size=500)
        
        # 2. Generate embeddings
        embeddings = await self.embeddings_model.embed(chunks)
        
        # 3. Store in vector DB
        for i, (chunk, embedding) in enumerate(zip(chunks, embeddings)):
            await self.vector_db.upsert({
                "id": f"{artifact.id}_chunk_{i}",
                "values": embedding,
                "metadata": {
                    "artifact_id": artifact.id,
                    "project_id": artifact.project_id,
                    "type": artifact.type,
                    "chunk_text": chunk,
                    "chunk_index": i
                }
            })
    
    async def search(self, query, context, top_k=5):
        """Search for relevant documents"""
        # 1. Generate query embedding
        query_embedding = await self.embeddings_model.embed(query)
        
        # 2. Search vector DB
        results = await self.vector_db.query(
            vector=query_embedding,
            top_k=top_k,
            filter={
                "project_id": context.get("project_id")
            }
        )
        
        # 3. Return relevant chunks
        return [r.metadata for r in results]
```

---

## 🔄 API Architecture

### REST API Structure:

```
/api/v1
├── /auth
│   ├── POST   /login
│   ├── POST   /register
│   ├── POST   /logout
│   ├── POST   /refresh-token
│   └── POST   /forgot-password
│
├── /organizations
│   ├── GET    /organizations
│   ├── POST   /organizations
│   ├── GET    /organizations/:id
│   ├── PATCH  /organizations/:id
│   ├── DELETE /organizations/:id
│   ├── GET    /organizations/:id/members
│   ├── POST   /organizations/:id/members
│   └── DELETE /organizations/:id/members/:userId
│
├── /projects
│   ├── GET    /projects
│   ├── POST   /projects
│   ├── GET    /projects/:id
│   ├── PATCH  /projects/:id
│   ├── DELETE /projects/:id
│   ├── POST   /projects/:id/archive
│   ├── GET    /projects/:id/members
│   ├── POST   /projects/:id/members
│   └── GET    /projects/:id/activity
│
├── /artifacts
│   ├── GET    /projects/:projectId/artifacts
│   ├── POST   /projects/:projectId/artifacts
│   ├── GET    /artifacts/:id
│   ├── PATCH  /artifacts/:id
│   ├── DELETE /artifacts/:id
│   ├── GET    /artifacts/:id/versions
│   ├── POST   /artifacts/:id/approve
│   └── GET    /artifacts/:id/export
│
├── /tasks
│   ├── GET    /projects/:projectId/tasks
│   ├── POST   /projects/:projectId/tasks
│   ├── GET    /tasks/:id
│   ├── PATCH  /tasks/:id
│   ├── DELETE /tasks/:id
│   └── POST   /tasks/:id/complete
│
├── /ai
│   ├── POST   /ai/chat
│   ├── POST   /ai/conversations
│   ├── GET    /ai/conversations/:id
│   ├── GET    /ai/conversations/:id/messages
│   ├── POST   /ai/generate-brief
│   ├── POST   /ai/generate-strategy
│   ├── POST   /ai/analyze-campaign
│   └── POST   /ai/suggest-optimizations
│
├── /analytics
│   ├── GET    /projects/:projectId/dashboard
│   ├── GET    /projects/:projectId/metrics
│   ├── POST   /projects/:projectId/reports
│   └── GET    /projects/:projectId/insights
│
├── /integrations
│   ├── GET    /integrations
│   ├── POST   /integrations/google-ads/connect
│   ├── POST   /integrations/meta-ads/connect
│   ├── GET    /integrations/:id/status
│   ├── POST   /integrations/:id/sync
│   └── DELETE /integrations/:id
│
└── /billing
    ├── GET    /billing/subscription
    ├── POST   /billing/subscription/upgrade
    ├── POST   /billing/subscription/cancel
    ├── GET    /billing/invoices
    └── POST   /billing/payment-method
```

### WebSocket Events:

```
Client → Server:
- join_project: Subscribe to project updates
- leave_project: Unsubscribe
- typing: User is typing
- cursor_position: Real-time collaboration

Server → Client:
- artifact_updated: Artifact changed
- task_updated: Task changed
- comment_added: New comment
- user_joined: User joined project
- notification: New notification
- ai_response_chunk: Streaming AI response
```

---

## 🚀 Deployment Architecture

### Production Environment:

```
┌─────────────────────────────────────────────────┐
│              CloudFlare CDN                     │
│          (DDoS protection, SSL, Cache)          │
└─────────────┬───────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────┐
│          Load Balancer (AWS ALB)                │
└─────────────┬───────────────────────────────────┘
              │
      ┌───────┴────────┐
      ▼                ▼
┌──────────┐     ┌──────────┐
│  Next.js │     │  Backend │
│  (SSR)   │     │  API     │
│  3 nodes │     │  5 nodes │
└──────────┘     └─────┬────┘
                       │
            ┌──────────┼──────────┐
            ▼          ▼          ▼
       ┌────────┐ ┌────────┐ ┌────────┐
       │ Postgre│ │ Redis  │ │  S3    │
       │   SQL  │ │ Cluster│ │ Bucket │
       │ Primary│ │ 3 nodes│ │        │
       │ +Replica│ │        │ │        │
       └────────┘ └────────┘ └────────┘
```

### Kubernetes Deployment:

```yaml
# backend-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mrm-backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: mrm-backend
  template:
    metadata:
      labels:
        app: mrm-backend
    spec:
      containers:
      - name: api
        image: mrm-backend:latest
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: database-credentials
              key: url
        - name: REDIS_URL
          value: "redis://redis-service:6379"
        resources:
          requests:
            memory: "512Mi"
            cpu: "500m"
          limits:
            memory: "1Gi"
            cpu: "1000m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
```

---

## 📈 Scaling Strategy

### Horizontal Scaling:
- **API servers:** Auto-scale 3-20 nodes based on CPU/memory
- **Worker processes:** Auto-scale for background jobs
- **Database:** Read replicas for heavy queries

### Caching Strategy:
- **Application cache (Redis):**
  - User sessions
  - API responses (5-60min TTL)
  - Computed metrics
  
- **CDN cache:**
  - Static assets (immutable)
  - API responses for public data (5min TTL)

### Database Optimization:
- **Indexes** on all foreign keys and frequently queried columns
- **Partitioning** for large tables (campaign_data by date)
- **Materialized views** for complex aggregations
- **Connection pooling** (PgBouncer)

---

## 🔍 Monitoring & Observability

### Metrics to Track:
- **Application:** Response time, error rate, throughput
- **Database:** Query time, connection pool, slow queries
- **AI:** Token usage, response time, error rate
- **Business:** Active users, projects created, AI usage

### Alerting:
- Error rate > 1%
- Response time > 2s (p95)
- Database CPU > 80%
- AI API failures
- Billing issues

### Logging:
```javascript
// Structured logging
logger.info('project_created', {
  projectId: project.id,
  userId: user.id,
  organizationId: org.id,
  duration: 150,
  metadata: { ... }
});
```

---

## 🧪 Testing Strategy

### Unit Tests:
- All business logic functions
- API endpoint handlers
- AI agent functions
- Target: >80% coverage

### Integration Tests:
- API endpoints
- Database operations
- External API integrations
- AI agent workflows

### E2E Tests (Playwright/Cypress):
- User registration & login
- Project creation flow
- Artifact creation
- AI chat interaction
- Analytics dashboard

### Load Testing (k6):
- 100 concurrent users
- 1000 requests/second
- Response time < 2s (p95)

---

**Документ:** Техническая архитектура  
**Версия:** 1.0  
**Дата:** 23 октября 2025

