---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: overview
title: References API - API Endpoints
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: 14_REFERENCES/API_Endpoints.md
effective_date: 2025-10-24
visibility: internal
security_level: low
tags: [documentation]
---

# References API - API Endpoints

→ [References](../_README.md) | [Database Schema](./Database_Schema.md)

---

## 🔗 BASE URL

```
https://api.mrm-platform.ru/v1/references
```

---

## 📍 CITIES

### Get All Cities
```http
GET /api/v1/references/cities
Query params:
  ?market_tier=1
  ?is_active=true
  ?sort=population desc

Response 200:
{
  "data": [{city}, {city}, ...],
  "total": 5,
  "page": 1
}
```

### Get City by Code
```http
GET /api/v1/references/cities/{code}

Response 200:
{city object with all details}
```

### Get City Benchmarks
```http
GET /api/v1/references/cities/{code}/benchmarks
Query params:
  ?industry=real_estate_developer
  ?channel=context

Response 200:
{
  "city_code": "moscow",
  "benchmarks": {
    "context": {"avg_cpl": 1500, "avg_cpc": 120},
    "programmatic": {"avg_cpm": 200}
  }
}
```

---

## 📍 PLATFORMS

### Get All Platforms
```http
GET /api/v1/references/platforms
Query params:
  ?channel=context
  ?api_available=true
  ?is_active=true

Response 200:
{
  "data": [{platform}, {platform}, ...],
  "total": 9
}
```

### Get Platform by Code
```http
GET /api/v1/references/platforms/{code}

Example: GET /platforms/yandex_direct

Response 200:
{platform object}
```

### Get Platform Benchmarks
```http
GET /api/v1/references/platforms/{code}/benchmarks
Query params:
  ?city=moscow
  ?industry=real_estate

Response 200:
{
  "platform_code": "yandex_direct",
  "benchmarks": {
    "search": {"avg_cpc": 120, "avg_ctr": 0.025}
  }
}
```

---

## 📍 AD FORMATS

### Get All Formats
```http
GET /api/v1/references/ad-formats
Query params:
  ?format_type=video
  ?channel=programmatic
  ?platform=youtube_ads

Response 200:
{
  "data": [{format}, {format}, ...],
  "total": 8
}
```

### Get Format Specifications
```http
GET /api/v1/references/ad-formats/{code}/specs

Response 200:
{
  "format_code": "video_15s",
  "creative_specs": {
    "video": {...},
    "audio": {...}
  }
}
```

---

## 📍 INDUSTRIES

### Get All Industries
```http
GET /api/v1/references/industries

Response 200:
{
  "data": [{industry}, {industry}, ...],
  "total": 3
}
```

### Get Industry Recommendations
```http
GET /api/v1/references/industries/{code}/recommendations

Response 200:
{
  "industry_code": "real_estate_developer",
  "recommended_channels": {...},
  "typical_metrics": {...},
  "seasonality": {...}
}
```

---

## 📍 OBJECTIVES

### Get All Objectives
```http
GET /api/v1/references/objectives

Response 200:
{
  "data": [{objective}, {objective}, ...],
  "total": 4
}
```

### Get Objective KPIs
```http
GET /api/v1/references/objectives/{code}/kpis

Response 200:
{
  "objective_code": "conversions",
  "primary_kpis": ["leads", "cpl", "conversion_rate"],
  "recommended_channels": {...}
}
```

---

## 📍 PRODUCT TYPES

### Get All Product Types
```http
GET /api/v1/references/product-types
Query params:
  ?industry=real_estate_developer

Response 200:
{
  "data": [{product_type}, {product_type}, ...],
  "total": 3
}
```

---

## 📍 PRICING MODELS

### Get All Pricing Models
```http
GET /api/v1/references/pricing-models

Response 200:
{
  "data": [{pricing_model}, {pricing_model}, ...],
  "total": 6
}
```

### Get Typical Rates
```http
GET /api/v1/references/pricing-models/{code}/rates
Query params:
  ?industry=real_estate
  ?city=moscow
  ?channel=context

Response 200:
{
  "pricing_model": "cpc",
  "industry": "real_estate",
  "city": "moscow",
  "rates": {
    "min": 80,
    "avg": 120,
    "max": 200
  }
}
```

---

## 📍 BATCH QUERIES

### Get Multiple References
```http
POST /api/v1/references/batch

Body:
{
  "queries": [
    {"type": "cities", "codes": ["moscow", "spb"]},
    {"type": "platforms", "codes": ["yandex_direct", "google_ads"]},
    {"type": "pricing_models", "codes": ["cpc", "cpm"]}
  ]
}

Response 200:
{
  "cities": [{...}, {...}],
  "platforms": [{...}, {...}],
  "pricing_models": [{...}, {...}]
}
```

---

## 📍 BENCHMARKS (Consolidated)

### Get All Benchmarks for Context
```http
POST /api/v1/references/benchmarks

Body:
{
  "city": "moscow",
  "industry": "real_estate_developer",
  "channels": ["context", "programmatic", "social"]
}

Response 200:
{
  "city": "moscow",
  "industry": "real_estate_developer",
  "benchmarks": {
    "context": {
      "platforms": {
        "yandex_direct": {"avg_cpl": 1500, "avg_cpc": 120},
        "google_ads": {"avg_cpl": 1800, "avg_cpc": 110}
      }
    },
    "programmatic": {...},
    "social": {...}
  }
}
```

---

## 🔒 ADMIN ENDPOINTS

### Create/Update/Delete (Admin only)

```http
POST /api/v1/admin/references/{type}
PUT /api/v1/admin/references/{type}/{id}
DELETE /api/v1/admin/references/{type}/{id}

Headers:
  Authorization: Bearer {admin_token}
  
Body: {reference object}
```

---

## 📊 USAGE EXAMPLES

### Example 1: Get recommendations for brief

```javascript
// Get city benchmarks
const city = await fetch('/references/cities/moscow');

// Get industry recommendations
const industry = await fetch('/references/industries/real_estate_developer/recommendations');

// Get objective KPIs
const objective = await fetch('/references/objectives/conversions/kpis');

// Use in brief validation
const recommendedCPL = city.benchmarks.context.avg_cpl;
const userCPL = brief.expected_cpl;
if (userCPL > recommendedCPL * 1.5) {
  warning('CPL выше среднего на 50%');
}
```

### Example 2: Media plan auto-fill

```javascript
// User selects: Moscow + Context + Yandex Direct
const benchmarks = await fetch('/references/benchmarks', {
  method: 'POST',
  body: JSON.stringify({
    city: 'moscow',
    industry: 'real_estate',
    channels: ['context']
  })
});

// Pre-fill media plan line
const suggestedCPC = benchmarks.context.platforms.yandex_direct.avg_cpc;
const suggestedCPL = benchmarks.context.platforms.yandex_direct.avg_cpl;
```

---

**Версия:** 2.1 | **Статус:** ✅


