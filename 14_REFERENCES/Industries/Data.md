---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: overview
title: Industries - Данные справочника
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: 14_REFERENCES/Industries/Data.md
effective_date: 2025-10-24
visibility: internal
security_level: low
tags: [documentation]
---

# Industries - Данные справочника

→ [References](../_README.md) | [Database Schema](../Database_Schema.md)

---

## 📊 ИНДУСТРИИ (из брифов)

### 1. НЕДВИЖИМОСТЬ - ЗАСТРОЙЩИК

```json
{
  "id": "industry-001",
  "code": "real_estate_developer",
  "name_ru": "Недвижимость - Застройщик",
  "name_en": "Real Estate - Developer",
  
  "parent_id": null,
  "level": 1,
  
  "typical_metrics": {
    "cpl_range_rub": [1000, 3000],
    "avg_cpl_rub": 1667,
    "conversion_lead_to_sale": 0.08,
    "deal_cycle_days": 60,
    "ltv_rub": 500000,
    "romi_target": 3.0
  },
  
  "seasonality": {
    "jan": 0.85, "feb": 0.90, "mar": 1.05,
    "apr": 1.15, "may": 1.20, "jun": 1.15,
    "jul": 0.95, "aug": 0.80, "sep": 1.10,
    "oct": 1.15, "nov": 1.05, "dec": 0.95
  },
  
  "recommended_channels": {
    "context": {"priority": 1, "budget_pct": 0.40, "rationale": "High intent"},
    "programmatic": {"priority": 2, "budget_pct": 0.25, "rationale": "Awareness"},
    "social": {"priority": 3, "budget_pct": 0.15, "rationale": "Engagement"},
    "video": {"priority": 4, "budget_pct": 0.10, "rationale": "Storytelling"},
    "retail_media": {"priority": 2, "budget_pct": 0.10, "rationale": "High intent"}
  },
  
  "target_audience_profiles": [
    {
      "segment": "Families 35-50, premium",
      "pct": 0.40,
      "avg_check_rub": 15000000
    },
    {
      "segment": "Young families 28-40, comfort",
      "pct": 0.35,
      "avg_check_rub": 8000000
    },
    {
      "segment": "First-time buyers 25-35, economy",
      "pct": 0.25,
      "avg_check_rub": 5000000
    }
  ],
  
  "is_active": true,
  
  "metadata": {
    "typical_products": ["apartments", "parking", "business_spaces"],
    "decision_factors": ["location", "developer_reputation", "price", "infrastructure"],
    "info_sources": ["search", "marketplaces", "forums", "recommendations"]
  }
}
```

---

### 2. E-COMMERCE

```json
{
  "id": "industry-002",
  "code": "ecommerce",
  "name_ru": "Электронная коммерция",
  "name_en": "E-Commerce",
  
  "level": 1,
  
  "typical_metrics": {
    "cpl_range_rub": [300, 1500],
    "avg_cpl_rub": 800,
    "conversion_lead_to_sale": 0.15,
    "deal_cycle_days": 3,
    "ltv_rub": 15000,
    "romi_target": 4.0
  },
  
  "recommended_channels": {
    "context": {"priority": 1, "budget_pct": 0.35},
    "ecom_platforms": {"priority": 1, "budget_pct": 0.30},
    "social": {"priority": 2, "budget_pct": 0.20},
    "programmatic": {"priority": 3, "budget_pct": 0.15}
  },
  
  "is_active": true
}
```

---

### 3. B2B SERVICES

```json
{
  "id": "industry-003",
  "code": "b2b_services",
  "name_ru": "B2B Услуги",
  "name_en": "B2B Services",
  
  "level": 1,
  
  "typical_metrics": {
    "cpl_range_rub": [2000, 8000],
    "avg_cpl_rub": 4500,
    "conversion_lead_to_sale": 0.05,
    "deal_cycle_days": 90,
    "ltv_rub": 1500000,
    "romi_target": 2.5
  },
  
  "recommended_channels": {
    "context": {"priority": 1, "budget_pct": 0.50},
    "linkedin": {"priority": 2, "budget_pct": 0.25},
    "programmatic": {"priority": 3, "budget_pct": 0.15},
    "email": {"priority": 2, "budget_pct": 0.10}
  },
  
  "is_active": true
}
```

---

## 📊 SUMMARY

```yaml
Industries: 3
  Real Estate: Developer
  E-Commerce
  B2B Services

Avg CPL Range: 300₽ - 8000₽
Avg Deal Cycle: 3 - 90 days
```

---

**Версия:** 2.1 | **Статус:** ✅


