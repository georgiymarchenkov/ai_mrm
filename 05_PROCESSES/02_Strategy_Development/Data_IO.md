---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: process
title: 02_Strategy_Development - Data I/O
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: 05_PROCESSES/02_Strategy_Development/Data_IO.md
effective_date: 2025-10-24
visibility: internal
security_level: medium
tags: [process, 02_strategy_development, data_io]
---

# 02_Strategy_Development - Data I/O

→ [Overview](./Overview.md) | [Steps](./Process_Steps.md) | [Roles](./Roles_Responsibilities.md) | [Test](./Test_Scenario.md)

---

## 📥 INPUT

```json
{
  "brief_id": "BRF-2025-001",
  "brief": {
    "company": {...},
    "products": [{...}],
    "target_audience": [{...}],
    "goals_kpis": {...},
    "budget": {...}
  }
}
```

---

## 📤 OUTPUT: Strategy Document

```json
{
  "strategy_id": "STR-2025-001",
  "brief_id": "BRF-2025-001",
  "created_at": "ISO8601",
  "status": "draft | approved",
  
  "sections": {
    "research": {...},
    "positioning": {...},
    "channel_strategy": {...},
    "creative_concept": {...},
    "kpi_framework": {...}
  }
}
```

### Research Section

```json
{
  "research": {
    "market_analysis": {
      "moscow": {
        "market_size": "80+ ЖК",
        "avg_price": "250k₽/m²",
        "demand": "high",
        "growth": "+12% YoY"
      },
      "spb": {...},
      "kazan": {...}
    },
    
    "competitors": [
      {
        "name": "Садовые кварталы",
        "positioning": "Premium family",
        "strengths": ["location", "green space"],
        "weaknesses": ["far from metro"],
        "estimated_budget": "5-7M₽/month"
      }
    ],
    
    "benchmarks": {
      "cpl_moscow": [1500, 2500],
      "cpl_spb": [800, 1500],
      "cpl_kazan": [500, 800],
      "conversion_lead_to_sale": [0.08, 0.12]
    }
  }
}
```

### Positioning Section

```json
{
  "positioning": [
    {
      "product_id": "PROD-001",
      "product_name": "ЖК Солнечный",
      "positioning_statement": "Для established семей 35-50...",
      "target_audience": "Families 35-50, high income",
      "usp": ["metro 5min", "center", "established developer"],
      "brand_personality": ["confident", "prestigious", "warm"],
      "emotional_benefits": ["status", "convenience", "time value"],
      "rational_benefits": ["location", "quality", "infrastructure"]
    }
  ]
}
```

### Channel Strategy Section

```json
{
  "channel_strategy": {
    "channel_mix": [
      {
        "channel": "context_advertising",
        "budget": 6000000,
        "budget_pct": 0.40,
        "role": "conversion",
        "expected_leads": 5000,
        "target_cpl": 1200,
        "platforms": ["yandex_direct", "google_ads"]
      },
      {
        "channel": "programmatic",
        "budget": 3500000,
        "budget_pct": 0.23,
        "role": "awareness",
        "expected_reach": 5000000,
        "expected_leads": 1500
      }
    ],
    
    "budget_allocation": {
      "by_city": {
        "moscow": 8000000,
        "spb": 4000000,
        "kazan": 3000000
      },
      "by_product": {
        "apartments": 12000000,
        "parking": 1500000,
        "business": 1500000
      }
    }
  }
}
```

### Creative Concept Section

```json
{
  "creative_concept": [
    {
      "product_id": "PROD-001",
      "concept_name": "Свет в центре города",
      "visual_direction": {
        "colors": ["warm gold", "cream", "white"],
        "style": "bright, premium, welcoming",
        "mood": "confident, prestigious"
      },
      "messaging": {
        "headline": "Ваш статус заслуживает центра",
        "subhead": "ЖК Солнечный. Метро 5 минут",
        "cta": "Записаться на просмотр"
      },
      "formats": ["static_ads", "carousel", "video"]
    }
  ]
}
```

### KPI Framework Section

```json
{
  "kpi_framework": {
    "business_kpis": {
      "sales": 120,
      "revenue": 1200000000,
      "romi": 3.0
    },
    
    "marketing_kpis": {
      "leads": {
        "total": 9000,
        "target_cpl": 1667,
        "by_month": [2500, 3000, 3500]
      }
    },
    
    "channel_kpis": {
      "context": {
        "leads": 5000,
        "cpl": 1200,
        "roas": 3.0
      }
    }
  }
}
```

---

## ✅ VALIDATION

```yaml
Required:
  - positioning (all products)
  - channel_strategy.channel_mix (min 3 channels)
  - budget_allocation.by_city
  - creative_concept (all products)
  - kpi_framework.business_kpis
```

---

**Версия:** 2.1 | **Строк:** 78 | **Статус:** ✅


