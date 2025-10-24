---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: process
title: 03_Media_Planning - Data I/O
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: 05_PROCESSES/03_Media_Planning/Data_IO.md
effective_date: 2025-10-24
visibility: internal
security_level: medium
tags: [process, 03_media_planning, data_io]
---

# 03_Media_Planning - Data I/O

→ [Overview](./Overview.md) | [Steps](./Process_Steps.md) | [Roles](./Roles_Responsibilities.md) | [Test](./Test_Scenario.md)

---

## 📥 INPUT

```json
{
  "strategy_id": "STR-2025-001",
  "channel_strategy": {
    "channel_mix": [{...}],
    "budget_allocation": {...}
  }
}
```

---

## 📤 OUTPUT: Media Plan (table)

### Structure of ONE LINE:

```json
{
  "line_id": "MP-001",
  "city": "Москва",
  "brand": "ЖК Солнечный",
  "product": "Квартиры",
  "channel": "Контекст",
  "platform": "Яндекс Директ",
  "format": "Поиск",
  "campaign_name": "MSK_Solnechny_Search_Q4",
  
  "audience": {
    "age": [35, 55],
    "geo": "Москва",
    "interests": ["недвижимость", "квартиры"]
  },
  
  "keywords": ["купить квартиру москва центр", ...],
  
  "budget": 500000,
  "pricing_model": "CPC",
  "rate_estimate": 120,
  "expected_clicks": 4200,
  "expected_leads": 210,
  "expected_cpl": 2380,
  
  "capacity": "unlimited",
  "flight_dates": ["2025-10-01", "2025-10-31"],
  
  "landing_page": "https://solnechniy-msk.ru/kvartiry",
  "utm_tags": "source=yandex&medium=cpc&campaign=msk_solnechny_search_oct",
  
  "creative_requirements": "Текстовые объявления 50+ вариантов",
  "tracking": "Metrica goals: lead, phone, chat",
  
  "responsible": "Specialist Name",
  "status": "draft"
}
```

---

## FULL MEDIA PLAN: Array of 100-150 lines

```json
{
  "media_plan_id": "MP-2025-001",
  "strategy_id": "STR-2025-001",
  "created_at": "ISO8601",
  "status": "draft | approved",
  
  "lines": [
    {...}, // MP-001
    {...}, // MP-002
    ... // 100-150 lines total
  ],
  
  "summary": {
    "total_budget": 15000000,
    "total_lines": 142,
    "by_channel": {...},
    "by_city": {...},
    "by_product": {...}
  }
}
```

---

## ✅ VALIDATION

```yaml
Rules:
  - Sum of line budgets = strategy total (±2%)
  - No duplicate lines
  - All required fields filled
  - Expected results realistic (within benchmarks)
```

---

**Версия:** 2.1 | **Строк:** 62 | **Статус:** ✅


