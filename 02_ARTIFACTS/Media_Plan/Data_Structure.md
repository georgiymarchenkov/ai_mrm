---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: artifact_doc
title: Media Plan - Структура данных
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: 02_ARTIFACTS/Media_Plan/Data_Structure.md
effective_date: 2025-10-24
visibility: internal
security_level: medium
tags: [artifact, media_plan]
---

# Media Plan - Структура данных

→ [Overview](./Overview.md) | [Examples](./Examples.md)

---

## 📊 СТРУКТУРА ОДНОЙ СТРОКИ

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
    "interests": ["недвижимость"]
  },
  
  "keywords": ["купить квартиру москва центр"],
  
  "budget": 500000,
  "pricing_model": "CPC",
  "rate_estimate": 120,
  "expected_clicks": 4200,
  "expected_leads": 210,
  "expected_cpl": 2380,
  
  "capacity": "unlimited",
  "flight_dates": ["2025-10-01", "2025-10-31"],
  
  "landing_page": "https://solnechniy-msk.ru/kvartiry",
  "utm": "source=yandex&medium=cpc&campaign=msk_solnechny_search_oct",
  
  "creative_requirements": "Текстовые объявления 50+ вариантов",
  "tracking": "Metrica goals: lead, phone, chat",
  
  "responsible": "Specialist Name",
  "status": "draft"
}
```

---

## 📋 FULL MEDIA PLAN

```json
{
  "media_plan_id": "MP-2025-001",
  "strategy_id": "STR-2025-001",
  "created_at": "ISO8601",
  "status": "draft | approved",
  
  "lines": [
    {...}, // MP-001
    {...}, // MP-002
    // 100-150 lines total
  ],
  
  "summary": {
    "total_budget": 15000000,
    "total_lines": 142,
    "expected_leads": 9000,
    "avg_cpl": 1667,
    
    "by_channel": {
      "context": {"budget": 6000000, "lines": 45},
      "programmatic": {"budget": 3500000, "lines": 18}
    },
    
    "by_city": {
      "moscow": {"budget": 8000000, "lines": 75},
      "spb": {"budget": 4000000, "lines": 42},
      "kazan": {"budget": 3000000, "lines": 25}
    }
  }
}
```

---

## ✅ VALIDATION

```yaml
Required fields:
  - line_id, city, brand, product
  - channel, platform, format
  - budget, pricing_model
  - flight_dates
  - responsible

Checks:
  - SUM(budget) = strategy.total (±2%)
  - No duplicate line_ids
  - All dates valid (within campaign period)
  - Expected results realistic (benchmarks)
```

---

**Версия:** 2.1 | **Строк:** 72 | **Статус:** ✅


