---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: artifact_doc
title: Products - Рекламируемые продукты
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: 02_ARTIFACTS/Products/Overview.md
effective_date: 2025-10-24
visibility: internal
security_level: medium
tags: [artifact, products, catalog]
---

# Products - Рекламируемые продукты

→ [Artifacts](../_README.md)

---

## 🎯 Назначение

**Products** - каталог продуктов/услуг клиента, которые рекламируются в кампании.

**Содержит:**
- Описание продуктов
- USP (Unique Selling Points)
- Целевые аудитории по продуктам
- Креативные материалы
- Посадочные страницы (Landing Pages)

---

## 📋 Структура продукта

### Product Card

```yaml
ID: product_001
Name: "Премиум кредитная карта"
Category: Финансы > Кредитные карты
Description: >
  Кредитная карта с кэшбэком 5% и беспроцентным периодом 100 дней

USP:
  - 5% кэшбэк на все покупки
  - 100 дней без %
  - Бесплатное обслуживание

Target_Audience:
  - Age: 25-45
  - Income: >80k₽/month
  - Interests: [shopping, travel, финансы]

Landing_Page: https://example.com/premium-card
Creatives: [banner_1.jpg, video_15sec.mp4]

Priority: High
Launch_Date: 2025-11-01
```

---

## 🔗 Связь с другими артефактами

**Input to:**
- [Brief](../Brief/) - описание продуктов в брифе
- [Strategy](../Strategy_Document/) - выбор продуктов для промо
- [Media_Plan](../Media_Plan/) - распределение бюджета по продуктам

**Uses:**
- Креативы от Creative team
- Landing Pages от Dev team

---

## 👥 Роли

**Owner:** Client  
**Managed by:** Account Manager  
**Used by:** Strategist, Specialist, Creative

---

## 📊 Примеры использования

### Multi-Product Campaign

```
Клиент: Банк
Продукты:
  1. Кредитная карта (Priority: High, Budget: 40%)
  2. Ипотека (Priority: Medium, Budget: 35%)
  3. Вклады (Priority: Low, Budget: 25%)

Стратегия: Разные креативы и таргетинги по продуктам
```

---

**Версия:** 1.0  
**Статус:** ✅ Defined

