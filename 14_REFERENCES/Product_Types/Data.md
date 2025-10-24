---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: overview
title: Product Types - Данные справочника
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: 14_REFERENCES/Product_Types/Data.md
effective_date: 2025-10-24
visibility: internal
security_level: low
tags: [documentation]
---

# Product Types - Данные справочника

→ [References](../_README.md) | [Database Schema](../Database_Schema.md)

---

## 📊 ТИПЫ ПРОДУКТОВ (из брифов)

### REAL ESTATE

#### 1. APARTMENTS (Квартиры)

```json
{
  "id": "product-type-001",
  "code": "apartments",
  "name_ru": "Квартиры",
  "name_en": "Apartments",
  
  "industry_code": "real_estate_developer",
  "category": "physical",
  
  "typical_price_range_rub": [4000000, 18000000],
  "typical_conversion_rate": 0.08,
  "typical_decision_timeframe_days": 60,
  
  "variations": [
    {
      "code": "studio",
      "name_ru": "Студия",
      "area_sqm": [25, 35],
      "price_range_rub": [3000000, 5000000]
    },
    {
      "code": "1room",
      "name_ru": "1-комнатная",
      "area_sqm": [35, 50],
      "price_range_rub": [4000000, 8000000]
    },
    {
      "code": "2room",
      "name_ru": "2-комнатная",
      "area_sqm": [55, 75],
      "price_range_rub": [7000000, 14000000]
    },
    {
      "code": "3room",
      "name_ru": "3-комнатная",
      "area_sqm": [75, 100],
      "price_range_rub": [12000000, 20000000]
    }
  ],
  
  "recommended_ad_formats": [
    "text_ads_search",
    "display_banners",
    "video_15s",
    "carousel",
    "dynamic_ads"
  ],
  
  "typical_features": [
    "Площадь",
    "Этаж",
    "Количество комнат",
    "Отделка",
    "Вид из окон",
    "Балкон/лоджия"
  ],
  
  "is_active": true,
  
  "metadata": {
    "avg_cpl": 1667,
    "best_channels": ["context", "retail_media"],
    "search_keywords": ["купить квартиру", "новостройки", "жк"]
  }
}
```

---

#### 2. PARKING (Паркинг)

```json
{
  "id": "product-type-002",
  "code": "parking",
  "name_ru": "Паркинг",
  "name_en": "Parking",
  
  "industry_code": "real_estate_developer",
  "category": "physical",
  
  "typical_price_range_rub": [500000, 2000000],
  "typical_conversion_rate": 0.12,
  "typical_decision_timeframe_days": 30,
  
  "variations": [
    {
      "code": "outdoor",
      "name_ru": "Открытый",
      "price_range_rub": [300000, 800000]
    },
    {
      "code": "underground",
      "name_ru": "Подземный",
      "price_range_rub": [800000, 1500000]
    },
    {
      "code": "multi_level",
      "name_ru": "Многоуровневый",
      "price_range_rub": [600000, 1200000]
    }
  ],
  
  "recommended_ad_formats": [
    "text_ads_search",
    "display_banners"
  ],
  
  "is_active": true
}
```

---

#### 3. BUSINESS SPACES (Коммерческие помещения)

```json
{
  "id": "product-type-003",
  "code": "business_spaces",
  "name_ru": "Коммерческие помещения",
  "name_en": "Business Spaces",
  
  "industry_code": "real_estate_developer",
  "category": "physical",
  
  "typical_price_range_rub": [3000000, 50000000],
  "typical_conversion_rate": 0.05,
  "typical_decision_timeframe_days": 90,
  
  "variations": [
    {
      "code": "retail",
      "name_ru": "Торговые площади",
      "area_sqm": [50, 500]
    },
    {
      "code": "office",
      "name_ru": "Офисные площади",
      "area_sqm": [30, 1000]
    },
    {
      "code": "warehouse",
      "name_ru": "Складские площади",
      "area_sqm": [100, 5000]
    }
  ],
  
  "recommended_ad_formats": [
    "text_ads_search",
    "linkedin_ads",
    "b2b_platforms"
  ],
  
  "is_active": true,
  
  "metadata": {
    "target_audience": "Business owners, investors",
    "best_channels": ["context", "b2b_platforms"]
  }
}
```

---

## 📊 SUMMARY

```yaml
Product Types: 3
  Apartments (4 variations)
  Parking (3 variations)
  Business Spaces (3 variations)

Price Range: 300k₽ - 50M₽
Conversion Rates: 5% - 12%
Decision Time: 30 - 90 days
```

---

**Версия:** 2.1 | **Статус:** ✅


