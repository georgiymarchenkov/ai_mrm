---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: assistant_spec
title: Migration Assistant - AI для миграции проектов
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: 06_AI_ASSISTANTS/Migration_Assistant/Overview.md
effective_date: 2025-10-24
visibility: internal
security_level: low
tags: [ai_assistant, migration_assistant]
---

# Migration Assistant - AI для миграции проектов

→ [AI Assistants](../_README.md)

## 🎯 НАЗНАЧЕНИЕ

AI-ассистент для быстрой миграции существующих проектов в MRM платформу.

---

## 🤖 ВОЗМОЖНОСТИ

### 1. Data Import
- Импорт из Excel/Sheets
- Parsing PDF documents
- Extraction из Jira/Trello

### 2. Auto-Mapping
- Определяет структуру данных
- Мапит на MRM артефакты
- Валидирует completeness

### 3. Cleanup & Normalization
- Находит duplicates
- Исправляет errors
- Стандартизирует formats

### 4. Guided Migration
- Пошаговый wizard
- Предложения по missing data
- Validation на каждом шаге

---

## 💬 ПРОЦЕСС МИГРАЦИИ

```
1. Upload data (Excel/Sheets/PDF)
   ↓
2. AI анализирует структуру
   ↓
3. Предлагает mapping
   ↓
4. User подтверждает/корректирует
   ↓
5. Import + validation
   ↓
6. Проект готов в MRM
```

**Время:** 1-2 часа вместо 2-3 дней

---

## 📊 ПОДДЕРЖИВАЕМЫЕ ФОРМАТЫ

- Excel/Google Sheets (медиапланы, брифы)
- PDF (коммерческие предложения, отчеты)
- Jira export (задачи)
- Trello export (workflow)
- CSV (any data)

---

## 🔧 ТЕХНОЛОГИИ

- **LLM:** Claude 3.5 Sonnet (analysis + mapping)
- **OCR:** For PDF parsing
- **Validation:** Schema-based validation

---

## 📊 МЕТРИКИ

```yaml
Time saved: 2-3 дня → 1-2 часа (20x faster)
Success rate: 95% (successful migrations)
Data accuracy: 98%
User satisfaction: 4.8/5
```

---

**Версия:** 2.1 | **Статус:** ✅


