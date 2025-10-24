---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: overview
title: Pricing Models - Данные справочника
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: 14_REFERENCES/Pricing_Models/Data.md
effective_date: 2025-10-24
visibility: internal
security_level: low
tags: [documentation]
---

# Pricing Models - Данные справочника

→ [References](../_README.md) | [Database Schema](../Database_Schema.md)

---

## 📊 МОДЕЛИ ЦЕНООБРАЗОВАНИЯ (из медиапланов)

### 1. CPC (Cost Per Click)

```json
{
  "id": "pricing-001",
  "code": "cpc",
  "name_ru": "Цена за клик",
  "name_en": "Cost Per Click",
  
  "full_name": "Cost Per Click",
  "description": "Оплата за каждый клик по рекламе",
  
  "applicable_channels": ["context", "social", "programmatic"],
  "applicable_formats": ["text_ads", "display_banners", "feed_posts"],
  
  "typical_rates_by_industry": {
    "real_estate": {
      "min": 80,
      "avg": 120,
      "max": 200,
      "city_moscow": 120,
      "city_spb": 80,
      "city_kazan": 50
    },
    "ecommerce": {
      "min": 20,
      "avg": 45,
      "max": 80
    },
    "b2b": {
      "min": 100,
      "avg": 250,
      "max": 500
    }
  },
  
  "calculation_formula": "Cost = Clicks × CPC",
  
  "is_active": true,
  
  "metadata": {
    "best_for": ["performance", "conversions"],
    "risk": "low",
    "payment_timing": "post-click"
  }
}
```

---

### 2. CPM (Cost Per Mille)

```json
{
  "id": "pricing-002",
  "code": "cpm",
  "name_ru": "Цена за тысячу показов",
  "name_en": "Cost Per Mille",
  
  "full_name": "Cost Per Thousand Impressions",
  "description": "Оплата за 1000 показов рекламы",
  
  "applicable_channels": ["programmatic", "social", "video"],
  "applicable_formats": ["display_banners", "video", "native_ads"],
  
  "typical_rates_by_industry": {
    "real_estate": {
      "min": 150,
      "avg": 200,
      "max": 300,
      "programmatic": 200,
      "social": 150,
      "video": 250
    },
    "ecommerce": {
      "min": 100,
      "avg": 150,
      "max": 250
    }
  },
  
  "calculation_formula": "Cost = (Impressions / 1000) × CPM",
  
  "is_active": true,
  
  "metadata": {
    "best_for": ["awareness", "reach"],
    "risk": "medium",
    "payment_timing": "post-impression"
  }
}
```

---

### 3. CPCV (Cost Per Completed View)

```json
{
  "id": "pricing-003",
  "code": "cpcv",
  "name_ru": "Цена за досмотр видео",
  "name_en": "Cost Per Completed View",
  
  "full_name": "Cost Per Completed View",
  "description": "Оплата за полный досмотр видео (обычно >75% или 30 сек)",
  
  "applicable_channels": ["video", "programmatic"],
  "applicable_formats": ["video_15s", "video_30s", "video_preroll"],
  
  "typical_rates_by_industry": {
    "real_estate": {
      "min": 15,
      "avg": 25,
      "max": 40,
      "duration_15s": 25,
      "duration_30s": 30
    },
    "ecommerce": {
      "min": 10,
      "avg": 20,
      "max": 35
    }
  },
  
  "calculation_formula": "Cost = Completed Views × CPCV",
  
  "is_active": true,
  
  "metadata": {
    "best_for": ["video_awareness", "storytelling"],
    "completion_threshold": "75% or 30s",
    "risk": "low"
  }
}
```

---

### 4. CPL (Cost Per Lead)

```json
{
  "id": "pricing-004",
  "code": "cpl",
  "name_ru": "Цена за лид",
  "name_en": "Cost Per Lead",
  
  "full_name": "Cost Per Lead",
  "description": "Оплата за целевое действие (заполнение формы, звонок, etc)",
  
  "applicable_channels": ["context", "social", "programmatic", "retail_media"],
  "applicable_formats": ["all"],
  
  "typical_rates_by_industry": {
    "real_estate": {
      "min": 1000,
      "avg": 1667,
      "max": 3000,
      "context": 1500,
      "programmatic": 2500,
      "social": 1800,
      "retail_media": 1200
    },
    "ecommerce": {
      "min": 300,
      "avg": 800,
      "max": 1500
    },
    "b2b": {
      "min": 2000,
      "avg": 4500,
      "max": 8000
    }
  },
  
  "calculation_formula": "CPL = Total Cost / Total Leads",
  
  "is_active": true,
  
  "metadata": {
    "best_for": ["lead_generation", "performance"],
    "payment_timing": "post-lead",
    "risk": "very_low",
    "quality_matters": true
  }
}
```

---

### 5. CPV (Cost Per View)

```json
{
  "id": "pricing-005",
  "code": "cpv",
  "name_ru": "Цена за просмотр",
  "name_en": "Cost Per View",
  
  "full_name": "Cost Per View",
  "description": "Оплата за просмотр видео (обычно >10 сек или клик)",
  
  "applicable_channels": ["video"],
  "applicable_formats": ["youtube_trueview"],
  
  "typical_rates_by_industry": {
    "real_estate": {
      "min": 2,
      "avg": 3.5,
      "max": 8
    }
  },
  
  "calculation_formula": "Cost = Views × CPV",
  
  "is_active": true,
  
  "metadata": {
    "best_for": ["video_awareness"],
    "view_threshold": "10s or click"
  }
}
```

---

### 6. CPA (Cost Per Action)

```json
{
  "id": "pricing-006",
  "code": "cpa",
  "name_ru": "Цена за действие",
  "name_en": "Cost Per Action",
  
  "full_name": "Cost Per Action / Acquisition",
  "description": "Оплата за целевое действие (покупка, регистрация)",
  
  "applicable_channels": ["all"],
  "applicable_formats": ["all"],
  
  "typical_rates_by_industry": {
    "ecommerce": {
      "min": 100,
      "avg": 500,
      "max": 2000,
      "pct_of_order": 0.05
    },
    "real_estate": {
      "avg": 50000,
      "pct_of_deal": 0.01
    }
  },
  
  "calculation_formula": "CPA = Total Cost / Total Actions",
  
  "is_active": true,
  
  "metadata": {
    "best_for": ["performance", "sales"],
    "risk": "minimal",
    "payment_timing": "post-action"
  }
}
```

---

## 📊 SUMMARY

```yaml
Pricing Models: 6
  CPC (performance)
  CPM (awareness)
  CPCV (video completion)
  CPL (lead generation)
  CPV (video views)
  CPA (acquisitions)

Most Common:
  Context: CPC, CPM
  Programmatic: CPM, CPCV
  Social: CPC, CPM
  Video: CPCV, CPV

Risk Level:
  Lowest: CPL, CPA (pay for results)
  Low: CPC (pay for clicks)
  Medium: CPM, CPCV (pay for views)
```

---

**Версия:** 2.1 | **Статус:** ✅


