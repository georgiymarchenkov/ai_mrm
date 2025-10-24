---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: architecture_doc
title: Backend Architecture - Архитектура Backend
language: ru
industry: advertising
role_apply: [developer, architect]
period: 2025-10
version: "1.0"
source_path: 08_ARCHITECTURE/Backend_Architecture/Overview.md
effective_date: 2025-10-24
visibility: internal
security_level: high
tags: [architecture, Backend_Architecture]
---

# Backend Architecture - Архитектура Backend

→ [Architecture](../_README.md)

## 🎯 MICROSERVICES

### Core Services:
1. **Auth Service** - authentication, users
2. **Project Service** - briefs, strategies, plans
3. **Campaign Service** - campaign management
4. **Analytics Service** - data collection, reporting
5. **AI Service** - AI assistants, predictions
6. **Integration Service** - external APIs

## 📡 COMMUNICATION
- **REST** - synchronous requests
- **gRPC** - inter-service communication
- **Kafka/RabbitMQ** - async events

## 🗄️ DATA STORAGE
Each service owns its database (database per service pattern).

**Версия:** 2.1 | **Статус:** ✅


