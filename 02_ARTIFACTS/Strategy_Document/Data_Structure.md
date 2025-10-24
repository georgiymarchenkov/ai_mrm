---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: artifact_doc
title: Strategy Document - Структура данных
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: 02_ARTIFACTS/Strategy_Document/Data_Structure.md
effective_date: 2025-10-24
visibility: internal
security_level: medium
tags: [artifact, strategy_document]
---

# Strategy Document - Структура данных

→ [Overview](./Overview.md) | [Examples](./Examples.md)

---

## 📊 DATA STRUCTURE

```json
{
  "strategy_id": "STR-2025-001",
  "brief_id": "BRF-2025-001",
  "created_at": "ISO8601",
  "updated_at": "ISO8601",
  "status": "draft | under_review | approved",
  
  "sections": {
    "research": {...},
    "positioning": {...},
    "channel_strategy": {...},
    "creative_concept": {...},
    "kpi_framework": {...}
  }
}
```

---

## 1. RESEARCH

```json
{
  "research": {
    "market_analysis": {
      "moscow": {
        "market_size": "80+ ЖК",
        "avg_price_sqm": 250000,
        "demand": "high",
        "growth_yoy": 0.12,
        "key_trends": ["премиумизация", "локация важнее цены"]
      }
    },
    
    "competitors": [
      {
        "name": "Садовые кварталы",
        "positioning": "Premium family",
        "strengths": ["локация", "green space"],
        "weaknesses": ["далеко от метро"],
        "budget_estimate": "5-7M/month"
      }
    ],
    
    "benchmarks": {
      "cpl_moscow": [1500, 2500],
      "conversion_lead_to_sale": [0.08, 0.12],
      "avg_deal_cycle_days": 60
    }
  }
}
```

---

## 2. POSITIONING

```json
{
  "positioning": [
    {
      "product_id": "PROD-001",
      "product_name": "ЖК Солнечный",
      "positioning_statement": "Для established семей 35-50, которые ценят статус и удобство, ЖК Солнечный — это премиум-комфорт в сердце Москвы с метро в 5 минутах",
      "target_audience": "Families 35-50, high income",
      "usp": ["metro 5min", "center", "established developer"],
      "brand_personality": ["confident", "prestigious", "warm"],
      "emotional_benefits": ["status", "convenience", "time value"],
      "rational_benefits": ["location", "quality", "infrastructure"],
      "differentiation": "Ближе к метро чем Садовые кварталы, качественнее чем ПИК"
    }
  ]
}
```

---

## 3. CHANNEL STRATEGY

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
        "platforms": ["yandex_direct", "google_ads"],
        "rationale": "Основной драйвер конверсий, высокий intent аудитории"
      }
    ],
    
    "budget_allocation": {
      "by_city": {
        "moscow": {"amount": 8000000, "pct": 0.53},
        "spb": {"amount": 4000000, "pct": 0.27},
        "kazan": {"amount": 3000000, "pct": 0.20}
      }
    }
  }
}
```

---

## 4. CREATIVE CONCEPT

```json
{
  "creative_concept": [
    {
      "product_id": "PROD-001",
      "concept_name": "Свет в центре города",
      "big_idea": "Твой статус заслуживает центра",
      
      "visual_direction": {
        "colors": ["#FFD700", "#FFFFFF", "#1A1A1A"],
        "style": "bright, premium, welcoming",
        "mood": "confident, aspirational",
        "references": ["modern luxury", "urban comfort"]
      },
      
      "messaging": {
        "headline": "Ваш статус заслуживает центра",
        "subhead": "ЖК Солнечный. Метро 5 минут",
        "body": "Премиум-квартиры от проверенного застройщика",
        "cta": "Записаться на просмотр",
        "tone": "Confident, professional, warm"
      },
      
      "formats": ["static_ads", "carousel", "video_15sec", "video_30sec"]
    }
  ]
}
```

---

## 5. KPI FRAMEWORK

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
        "by_month": [2500, 3000, 3500],
        "by_city": {"moscow": 4500, "spb": 3000, "kazan": 1500}
      },
      "brand": {
        "awareness_lift": 0.20,
        "consideration_lift": 0.15
      }
    },
    
    "channel_kpis": {
      "context": {"leads": 5000, "cpl": 1200, "roas": 3.0},
      "programmatic": {"reach": 5000000, "leads": 1500, "cpl": 2333}
    }
  }
}
```

---

**Версия:** 2.1 | **Строк:** 115 | **Статус:** ✅


