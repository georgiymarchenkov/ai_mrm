---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: overview
title: Cities - Данные справочника
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: 14_REFERENCES/Cities/Data.md
effective_date: 2025-10-24
visibility: internal
security_level: low
tags: [documentation]
---

# Cities - Данные справочника

→ [References](../_README.md) | [Database Schema](../Database_Schema.md)

---

## 📊 ГОРОДА (из медиапланов)

### TIER 1: Москва и СПб

#### 1. МОСКВА

```json
{
  "id": "city-001",
  "code": "moscow",
  "name_ru": "Москва",
  "name_en": "Moscow",
  
  "country_code": "RU",
  "region": "Центральный федеральный округ",
  "timezone": "Europe/Moscow",
  "coordinates": [55.7558, 37.6173],
  
  "population": 13100000,
  "population_year": 2024,
  "gdp_per_capita_rub": 1800000,
  
  "audience_digital": 11500000,
  "audience_social": 9800000,
  "market_tier": 1,
  
  "benchmarks": {
    "context": {
      "avg_cpl": 1500,
      "avg_cpc": 120,
      "range_cpc": [80, 200],
      "avg_ctr": 0.025
    },
    "programmatic": {
      "avg_cpm": 200,
      "range_cpm": [150, 300],
      "avg_cpl": 2500
    },
    "social": {
      "avg_cpc": 35,
      "range_cpc": [25, 60],
      "avg_cpl": 1200
    }
  },
  
  "real_estate_specifics": {
    "avg_apartment_price_sqm": 250000,
    "avg_cpl_real_estate": 2000,
    "conversion_lead_to_sale": 0.08,
    "avg_deal_cycle_days": 60
  },
  
  "is_active": true,
  "metadata": {
    "metro_lines": 15,
    "districts": ["ЦАО", "САО", "ВАО", "ЮАО", "ЗАО", "СВАО", "ЮВАО", "СЗАО", "ЮЗАО"],
    "key_areas": ["Центр", "Хамовники", "Тверской", "Пресненский"]
  }
}
```

---

#### 2. САНКТ-ПЕТЕРБУРГ

```json
{
  "id": "city-002",
  "code": "spb",
  "name_ru": "Санкт-Петербург",
  "name_en": "Saint Petersburg",
  
  "country_code": "RU",
  "region": "Северо-Западный федеральный округ",
  "timezone": "Europe/Moscow",
  "coordinates": [59.9343, 30.3351],
  
  "population": 5600000,
  "population_year": 2024,
  "gdp_per_capita_rub": 950000,
  
  "audience_digital": 4800000,
  "audience_social": 4200000,
  "market_tier": 1,
  
  "benchmarks": {
    "context": {
      "avg_cpl": 1200,
      "avg_cpc": 80,
      "range_cpc": [60, 150],
      "avg_ctr": 0.028
    },
    "programmatic": {
      "avg_cpm": 180,
      "range_cpm": [130, 250],
      "avg_cpl": 2000
    },
    "social": {
      "avg_cpc": 30,
      "range_cpc": [20, 50],
      "avg_cpl": 1000
    }
  },
  
  "real_estate_specifics": {
    "avg_apartment_price_sqm": 150000,
    "avg_cpl_real_estate": 1600,
    "conversion_lead_to_sale": 0.10,
    "avg_deal_cycle_days": 45
  },
  
  "is_active": true,
  "metadata": {
    "metro_lines": 5,
    "districts": ["Центральный", "Приморский", "Василеостровский", "Выборгский"],
    "key_areas": ["Центр", "Петроградская сторона", "Приморский район"]
  }
}
```

---

### TIER 2: Миллионники

#### 3. КАЗАНЬ

```json
{
  "id": "city-003",
  "code": "kazan",
  "name_ru": "Казань",
  "name_en": "Kazan",
  
  "country_code": "RU",
  "region": "Приволжский федеральный округ",
  "timezone": "Europe/Moscow",
  "coordinates": [55.8304, 49.0661],
  
  "population": 1300000,
  "population_year": 2024,
  "gdp_per_capita_rub": 620000,
  
  "audience_digital": 980000,
  "audience_social": 850000,
  "market_tier": 2,
  
  "benchmarks": {
    "context": {
      "avg_cpl": 800,
      "avg_cpc": 50,
      "range_cpc": [35, 90],
      "avg_ctr": 0.032
    },
    "programmatic": {
      "avg_cpm": 120,
      "range_cpm": [80, 180],
      "avg_cpl": 1500
    },
    "social": {
      "avg_cpc": 20,
      "range_cpc": [15, 35],
      "avg_cpl": 700
    }
  },
  
  "real_estate_specifics": {
    "avg_apartment_price_sqm": 100000,
    "avg_cpl_real_estate": 1000,
    "conversion_lead_to_sale": 0.09,
    "avg_deal_cycle_days": 50
  },
  
  "is_active": true,
  "metadata": {
    "metro_lines": 1,
    "districts": ["Вахитовский", "Приволжский", "Советский"],
    "key_areas": ["Центр", "Приволжский район"]
  }
}
```

---

## 🔍 ДОПОЛНИТЕЛЬНЫЕ ГОРОДА

### Екатеринбург
```json
{
  "code": "ekb",
  "name_ru": "Екатеринбург",
  "population": 1500000,
  "market_tier": 2,
  "benchmarks": {
    "context": {"avg_cpl": 900, "avg_cpc": 55},
    "programmatic": {"avg_cpm": 130}
  }
}
```

### Новосибирск
```json
{
  "code": "nsk",
  "name_ru": "Новосибирск",
  "population": 1600000,
  "market_tier": 2,
  "benchmarks": {
    "context": {"avg_cpl": 850, "avg_cpc": 52},
    "programmatic": {"avg_cpm": 125}
  }
}
```

---

## 📊 SUMMARY

```yaml
Total Cities: 5
  Tier 1: 2 (Moscow, SPb)
  Tier 2: 3 (Kazan, Ekb, Nsk)

Coverage:
  Population: 23M+ (15% населения РФ)
  Digital Audience: 19M+
  Budget Share: ~60% всей рекламы РФ
```

---

## 🔗 API ENDPOINTS

```
GET  /api/v1/references/cities
GET  /api/v1/references/cities/{code}
GET  /api/v1/references/cities/{code}/benchmarks
POST /api/v1/references/cities (admin)
```

---

**Версия:** 2.1 | **Статус:** ✅


