---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: architecture_doc
title: Data Architecture - Архитектура данных
language: ru
industry: advertising
role_apply: [developer, architect]
period: 2025-10
version: "1.0"
source_path: 08_ARCHITECTURE/Data_Architecture/Overview.md
effective_date: 2025-10-24
visibility: internal
security_level: high
tags: [architecture, Data_Architecture]
---

# Data Architecture - Архитектура данных

→ [Architecture](../_README.md)

## 🎯 DATA STORAGE

### Primary Database (PostgreSQL)
- Relational data (users, projects, briefs)
- ACID transactions
- Row-based storage

### Analytics Database (ClickHouse)
- Time-series data (performance metrics)
- Column-based storage
- Fast aggregations

### Vector Database (Pinecone)
- AI embeddings
- Semantic search
- RAG for AI assistants

### Cache (Redis)
- Session data
- API rate limiting
- Real-time counters

## 🔄 DATA FLOW
```
Sources → ETL → Data Lake → Processing → Databases → APIs → Frontend
```

**Версия:** 2.1 | **Статус:** ✅


