---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: overview
title: 14_REFERENCES - Справочники
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: 14_REFERENCES/_README.md
effective_date: 2025-10-24
visibility: internal
security_level: low
tags: [documentation]
---

# 14_REFERENCES - Справочники

→ [Project Overview](../00_PROJECT_OVERVIEW/README.md)

---

## 🎯 НАЗНАЧЕНИЕ

Справочники (references/dictionaries) - нормализованные данные для всех артефактов MRM платформы.

---

## 📁 СТРУКТУРА СПРАВОЧНИКОВ

### 1. **Cities** (Города)
Список городов с параметрами для медиапланирования.

### 2. **Platforms** (Площадки)
Рекламные площадки с техническими параметрами и ценообразованием.

### 3. **Ad_Formats** (Форматы рекламы)
Все возможные форматы с требованиями к креативам.

### 4. **Industries** (Индустрии)
Отрасли клиентов с типичными метриками.

### 5. **Objectives** (Цели)
Маркетинговые цели и соответствующие KPIs.

### 6. **Product_Types** (Типы продуктов)
Классификация продуктов для продвижения.

### 7. **Pricing_Models** (Модели ценообразования)
CPC, CPM, CPCV, CPL и другие модели.

---

## 🗄️ БАЗА ДАННЫХ

Все справочники хранятся в PostgreSQL с:
- Версионированием (audit trail)
- Поддержкой мультиязычности
- Возможностью расширения

---

## 🔗 СВЯЗИ С АРТЕФАКТАМИ

**Brief** использует:
- Industries, Objectives, Product_Types, Cities

**Media_Plan** использует:
- Platforms, Ad_Formats, Pricing_Models, Cities

**Strategy_Document** использует:
- All references

**Campaign** использует:
- Platforms, Ad_Formats, Cities

---

## 📊 СТАТИСТИКА

```yaml
Справочников: 7
Записей total: ~500+
Используется в артефактах: Все 8 MVP
```

---

**Версия:** 2.1 | **Статус:** ✅


