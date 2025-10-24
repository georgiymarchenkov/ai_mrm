---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: architecture_doc
title: Architecture Overview - Обзор архитектуры
language: ru
industry: advertising
role_apply: [developer, architect]
period: 2025-10
version: "1.0"
source_path: 08_ARCHITECTURE/Overview.md
effective_date: 2025-10-24
visibility: internal
security_level: high
tags: [architecture, overview]
---

# Architecture Overview - Обзор архитектуры

→ [Architecture](../_README.md)

## 🏗️ ОБЩАЯ АРХИТЕКТУРА

MRM платформа построена на **микросервисной архитектуре** с event-driven подходом.

---

## 🎯 ЦЕНТРАЛЬНАЯ КОНЦЕПЦИЯ

**Проект = Структурированная база данных + Google Sheets интерфейс**

→ Подробнее: [Project Data Architecture](./Project_Data_Architecture.md)  
→ Диаграммы: [Project Lifecycle Diagram](./Project_Lifecycle_Diagram.md)

**Ключевые принципы:**
1. ✅ Файлы → Структурированные данные → БД (один раз!)
2. ✅ Google Sheets как живой интерфейс (real-time sync)
3. ✅ Месячные итерации с отдельными артефактами
4. ✅ AI-ассистент максимально заполняет данные через коммуникацию

---

## 📊 ОСНОВНЫЕ КОМПОНЕНТЫ

### 1. Frontend Layer
- **Tech:** Next.js 14, TypeScript, TailwindCSS
- **State:** Zustand + React Query
- **UI:** Shadcn/ui components

### 2. API Layer
- **Tech:** Node.js + Express / Python + FastAPI
- **Auth:** JWT + OAuth 2.0
- **Rate Limiting:** Redis-based

### 3. Business Logic Layer
- **Microservices:** Campaign, Reporting, AI, etc.
- **Communication:** REST + gRPC
- **Events:** Kafka / RabbitMQ

### 4. Data Layer
- **Primary DB:** PostgreSQL (relational data)
- **Analytics DB:** ClickHouse (time-series)
- **Cache:** Redis
- **Vector DB:** Pinecone/Weaviate (AI embeddings)
- **Interface:** Google Sheets (двусторонняя синхронизация)

### 5. AI Layer
- **LLM:** Claude 3.5 Sonnet API
- **Context:** Vector DB для RAG
- **Tools:** Function calling
- **Task:** Максимальное заполнение данных проекта

### 6. Integration Layer
- **Connectors:** Ad platforms APIs
- **Queue:** Background jobs processing
- **Webhooks:** Real-time updates
- **Google Sheets API:** Двусторонняя синхронизация

---

## 🔄 DATA FLOW

```
User → Frontend → API Gateway → Microservices → Database
                        ↓
                   Event Bus
                        ↓
        AI Agents / Analytics / Integrations
```

---

## 🔒 SECURITY

- JWT authentication
- Role-based access control (RACI)
- Data encryption at rest
- HTTPS only
- API rate limiting

---

## 📈 SCALABILITY

- Horizontal scaling для microservices
- Database sharding для больших объемов
- CDN для static assets
- Auto-scaling на Kubernetes

---

**Версия:** 2.1 | **Статус:** ✅


