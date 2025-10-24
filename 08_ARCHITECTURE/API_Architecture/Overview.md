---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: architecture_doc
title: API Architecture - Архитектура API
language: ru
industry: advertising
role_apply: [developer, architect]
period: 2025-10
version: "1.0"
source_path: 08_ARCHITECTURE/API_Architecture/Overview.md
effective_date: 2025-10-24
visibility: internal
security_level: high
tags: [architecture, API_Architecture]
---

# API Architecture - Архитектура API

→ [Architecture](../_README.md)

## 🎯 API LAYERS

### API Gateway
- Request routing
- Authentication (JWT)
- Rate limiting
- Load balancing

### REST APIs
- `/v1/briefs`, `/v1/media-plans`, etc.
- JSON responses
- Standard HTTP methods

### GraphQL (optional)
- Flexible queries
- Single endpoint
- Real-time subscriptions

### WebSockets
- Real-time updates
- Campaign monitoring
- Collaborative editing

## 🔒 SECURITY
- JWT tokens
- Role-based access (RACI)
- API keys for integrations

**Версия:** 2.1 | **Статус:** ✅


