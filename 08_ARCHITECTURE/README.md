---
title: 08. Architecture - Техническая архитектура
period: 2025-10
version: "1.0"
---

# 🏗️ 08. Architecture - Техническая архитектура

> **System design:** Backend, Frontend, Data, AI, Integrations

**Тип:** Microservices, Event-driven  
**Масштаб:** 1000+ пользователей  
**Статус:** ✅ Спроектирована

---

## 📁 Содержимое

### Основные документы

| Документ | Описание | Статус |
|----------|----------|--------|
| [`Project_Data_Architecture.md`](./Project_Data_Architecture.md) | Архитектура данных | ✅ |
| [`API_Specification.md`](./API_Specification.md) | REST API спецификация | ✅ |
| [`Implementation_Roadmap.md`](./Implementation_Roadmap.md) | Дорожная карта | ✅ |
| [`Data_Transformation_Testing_Plan.md`](./Data_Transformation_Testing_Plan.md) | Тестирование трансформаций | ✅ |
| [`Deployment.md`](./Deployment.md) | Деплой и инфраструктура | ✅ |

---

## 🎯 Ключевые компоненты

### Frontend
- **Tech:** Next.js 14, TypeScript, Tailwind CSS
- **State:** Zustand / Redux Toolkit
- **Forms:** React Hook Form + Zod

### Backend
- **Tech:** NestJS, TypeScript, PostgreSQL
- **ORM:** Prisma
- **Queue:** Bull/BullMQ
- **Cache:** Redis

### AI Layer
- **LLM:** OpenAI GPT-4 / Claude Sonnet
- **Vector DB:** Pinecone
- **Frameworks:** LangChain

### Data Storage
- **Structured:** PostgreSQL (main)
- **Analytics:** ClickHouse
- **Time-series:** TimescaleDB
- **Vector:** Pinecone
- **Files:** S3-compatible

---

## 🔗 Связанные разделы

- [09_DEVELOPMENT](../09_DEVELOPMENT/) - Стандарты разработки
- [07_INTEGRATIONS](../07_INTEGRATIONS/) - Внешние интеграции
- [MVP Technical Spec](../00_PROJECT_OVERVIEW/MVP_TECHNICAL_SPECIFICATION.md)

---

**Версия:** 1.0 | **Статус:** ✅ Документация готова

