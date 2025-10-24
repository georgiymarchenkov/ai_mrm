---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: architecture_doc
title: 🏗️ 08_ARCHITECTURE - Technical Architecture
language: ru
industry: advertising
role_apply: [developer, architect]
period: 2025-10
version: "1.0"
source_path: 08_ARCHITECTURE/_README.md
effective_date: 2025-10-24
visibility: internal
security_level: high
tags: [architecture, _readme]
---

# 🏗️ 08_ARCHITECTURE - Technical Architecture

**Назначение:** Техническая архитектура MRM AI системы

---

## 🎯 ЦЕНТРАЛЬНАЯ КОНЦЕПЦИЯ

**Проект = Структурированная БД + Google Sheets интерфейс**

→ **[📖 Project Data Architecture Documentation](./_PROJECT_DATA_ARCHITECTURE_SUMMARY.md)** ← **START HERE!**

**Ключевая идея:** AI-ассистент превращает файлы в структурированные данные и активно собирает недостающую информацию через коммуникацию с командой для достижения 100% полноты проекта.

---

## 📚 ДОКУМЕНТАЦИЯ ПО PROJECT DATA ARCHITECTURE

### Основные документы:
1. **[Summary & Index](./_PROJECT_DATA_ARCHITECTURE_SUMMARY.md)** - Начните здесь! Навигация по всей документации
2. **[Full Documentation](./Project_Data_Architecture.md)** - Полное описание архитектуры (1,492 строки)
3. **[Lifecycle Diagrams](./Project_Lifecycle_Diagram.md)** - Визуальные схемы и flow-диаграммы
4. **[Quick Reference](./Project_Data_Quick_Reference.md)** - Быстрая памятка для разработчиков
5. **[Implementation Roadmap](./Implementation_Roadmap.md)** - План на 12 недель (6 фаз)
6. **[AI Assistant Guide](../06_AI_ASSISTANTS/Project_Data_Assistant_Guide.md)** - Руководство для AI

---

## 📋 КОМПОНЕНТЫ

### 1. Frontend Architecture
- Next.js 14 (React)
- TypeScript
- UI Components
- State Management
- **Google Sheets Integration** ← Интерфейс для команды

### 2. Backend Architecture
- Node.js / Python
- **PostgreSQL (main DB)** ← Структурированные данные проектов
- ClickHouse (analytics)
- Vector DB (AI)
- **S3** ← Хранение файлов

### 3. AI Layer
- **Claude API** ← Извлечение данных из файлов
- Context Management
- Tool Registry
- Memory System
- **Data Collector** ← Роль AI-ассистента

### 4. Integrations Layer
- API Gateway
- Rate Limiting
- Auth & Security
- **Google Sheets API** ← Двусторонняя синхронизация

### 5. Data Layer
- **Project Data Structure** ← Living Database
- Data Warehouse
- ETL Pipelines
- Caching (Redis)
- **File Processing Pipeline** ← Excel/PDF/PPTX → Структура

### 6. Infrastructure
- Cloud (AWS/GCP)
- Docker/K8s
- Monitoring
- CI/CD

---

## 📁 СТРУКТУРА

```
Architecture/
├── System_Overview.md
├── Frontend_Architecture.md
├── Backend_Architecture.md
├── AI_Architecture.md
├── Data_Architecture.md
├── Infrastructure.md
├── Security.md
└── Diagrams/
```

---

## 🔗 СВЯЗИ

- **09_DEVELOPMENT/** ← Реализация
- **07_INTEGRATIONS/** ← Интеграции
- **06_AI_ASSISTANTS/** ← AI компонент

---

**Версия:** 1.0 | **Дата:** 2025-10-23 | **Статус:** ✅


