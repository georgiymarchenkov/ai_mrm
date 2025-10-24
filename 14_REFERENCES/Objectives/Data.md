---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: overview
title: Objectives - Данные справочника
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: 14_REFERENCES/Objectives/Data.md
effective_date: 2025-10-24
visibility: internal
security_level: low
tags: [documentation]
---

# Objectives - Данные справочника

→ [References](../_README.md) | [Database Schema](../Database_Schema.md)

---

## 📊 МАРКЕТИНГОВЫЕ ЦЕЛИ (из брифов)

### 1. AWARENESS (Узнаваемость)

```json
{
  "id": "objective-001",
  "code": "awareness",
  "name_ru": "Узнаваемость бренда",
  "name_en": "Brand Awareness",
  
  "funnel_stage": "awareness",
  
  "primary_kpis": [
    "reach",
    "impressions",
    "brand_lift",
    "ad_recall"
  ],
  
  "secondary_kpis": [
    "video_views",
    "engagement_rate"
  ],
  
  "recommended_channels": {
    "programmatic": {"priority": 1, "budget_pct": 0.35},
    "video": {"priority": 1, "budget_pct": 0.30},
    "social": {"priority": 2, "budget_pct": 0.20},
    "context_display": {"priority": 3, "budget_pct": 0.15}
  },
  
  "typical_budget_split": {
    "awareness": 0.60,
    "consideration": 0.25,
    "conversion": 0.15
  },
  
  "is_active": true,
  
  "metadata": {
    "best_formats": ["video", "display", "native"],
    "targeting": "broad",
    "optimization_goal": "reach"
  }
}
```

---

### 2. CONSIDERATION (Рассмотрение)

```json
{
  "id": "objective-002",
  "code": "consideration",
  "name_ru": "Рассмотрение/Интерес",
  "name_en": "Consideration",
  
  "funnel_stage": "consideration",
  
  "primary_kpis": [
    "site_visits",
    "engagement_rate",
    "time_on_site",
    "pages_per_visit"
  ],
  
  "secondary_kpis": [
    "video_completion_rate",
    "content_downloads"
  ],
  
  "recommended_channels": {
    "context": {"priority": 1, "budget_pct": 0.30},
    "social": {"priority": 1, "budget_pct": 0.25},
    "programmatic": {"priority": 2, "budget_pct": 0.25},
    "content": {"priority": 2, "budget_pct": 0.20}
  },
  
  "is_active": true
}
```

---

### 3. CONVERSIONS (Конверсии)

```json
{
  "id": "objective-003",
  "code": "conversions",
  "name_ru": "Конверсии/Лиды",
  "name_en": "Conversions",
  
  "funnel_stage": "conversion",
  
  "primary_kpis": [
    "leads",
    "cpl",
    "conversion_rate",
    "quality_leads_pct"
  ],
  
  "secondary_kpis": [
    "roas",
    "cpa",
    "romi"
  ],
  
  "recommended_channels": {
    "context_search": {"priority": 1, "budget_pct": 0.50},
    "retail_media": {"priority": 1, "budget_pct": 0.20},
    "social": {"priority": 2, "budget_pct": 0.15},
    "programmatic": {"priority": 3, "budget_pct": 0.15}
  },
  
  "typical_budget_split": {
    "awareness": 0.20,
    "consideration": 0.30,
    "conversion": 0.50
  },
  
  "is_active": true,
  
  "metadata": {
    "best_formats": ["search_text", "dynamic_ads"],
    "targeting": "narrow",
    "optimization_goal": "conversions"
  }
}
```

---

### 4. SALES (Продажи)

```json
{
  "id": "objective-004",
  "code": "sales",
  "name_ru": "Продажи",
  "name_en": "Sales",
  
  "funnel_stage": "conversion",
  
  "primary_kpis": [
    "sales",
    "revenue",
    "roas",
    "romi"
  ],
  
  "secondary_kpis": [
    "avg_order_value",
    "ltv"
  ],
  
  "recommended_channels": {
    "context_search": {"priority": 1, "budget_pct": 0.40},
    "ecom_platforms": {"priority": 1, "budget_pct": 0.30},
    "retargeting": {"priority": 1, "budget_pct": 0.20},
    "email": {"priority": 2, "budget_pct": 0.10}
  },
  
  "is_active": true
}
```

---

## 📊 SUMMARY

```yaml
Objectives: 4
  Awareness (Funnel top)
  Consideration (Funnel middle)
  Conversions (Funnel bottom)
  Sales (Funnel bottom)

Typical Budget Split:
  Awareness-focused: 60% awareness, 25% consideration, 15% conversion
  Conversion-focused: 20% awareness, 30% consideration, 50% conversion
```

---

**Версия:** 2.1 | **Статус:** ✅


