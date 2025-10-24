---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: artifact_doc
title: Media Plan - Обзор
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: 02_ARTIFACTS/Media_Plan/Overview.md
effective_date: 2025-10-24
visibility: internal
security_level: medium
tags: [artifact, media_plan]
---

# Media Plan - Обзор

→ [Artifacts](../_README.md) | [Data Structure](./Data_Structure.md) | [Examples](./Examples.md)

---

## 🎯 ЧТО ЭТО

**Media Plan (Медиаплан)** - детальная таблица размещений: 1 строка = 1 площадка + 1 формат + 1 бренд.

---

## 📋 НАЗНАЧЕНИЕ

Медиаплан детализирует стратегию в конкретные размещения для:
- Заказов у площадок
- Формирования бюджетов
- Технических требований
- Запуска кампаний

---

## 🔄 СТРУКТУРА

```
Strategy → Planning → Media Plan (100-150 строк) → Orders → Launch
```

---

## 📊 СТРОКА МЕДИАПЛАНА

Каждая строка содержит:
- Город, бренд, продукт
- Канал, площадка, формат
- Budget, pricing model, rate
- Expected results (clicks, leads, CPL)
- Dates, landing page, UTM
- Responsible

**Правило:** 1 строка = 1 размещение (атомарно)

---

## 👥 РОЛИ

| Роль | Участие |
|------|---------|
| **Specialists** | Создают строки [R] |
| **PM** | Контролирует [A] |
| **Account** | Координирует с client [C] |
| **Client** | Утверждает [A] |

---

## 📈 МЕТРИКИ

```yaml
Строк: 100-150 (зависит от сложности)
Время создания: 5-7 дней
Budget accuracy: ±2% от strategy
Completeness: 100% полей
```

---

## 🔗 СВЯЗИ

**Процессы:**  
→ [03_Media_Planning](../../05_PROCESSES/03_Media_Planning/Overview.md)

**Артефакты:**  
← [Strategy_Document](../Strategy_Document/Overview.md) (input)  
→ Orders, Campaigns (output)

---

**Версия:** 2.1 | **Строк:** 68 | **Статус:** ✅


