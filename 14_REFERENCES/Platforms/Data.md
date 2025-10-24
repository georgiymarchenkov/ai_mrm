---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: overview
title: Platforms - Данные справочника
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: 14_REFERENCES/Platforms/Data.md
effective_date: 2025-10-24
visibility: internal
security_level: low
tags: [documentation]
---

# Platforms - Данные справочника

→ [References](../_README.md) | [Database Schema](../Database_Schema.md)

---

## 📊 РЕКЛАМНЫЕ ПЛОЩАДКИ (из медиапланов)

### CONTEXT ADVERTISING

#### 1. YANDEX DIRECT

```json
{
  "id": "platform-001",
  "code": "yandex_direct",
  "name_ru": "Яндекс.Директ",
  "name_en": "Yandex Direct",
  
  "channel": "context",
  "platform_type": "search_and_display",
  
  "api_available": true,
  "api_version": "v5",
  "api_docs_url": "https://yandex.ru/dev/direct/doc/",
  
  "min_budget_rub": 300,
  "min_daily_budget_rub": 300,
  
  "audience_size_ru": 95000000,
  "audience_size_global": 105000000,
  
  "pricing_models": ["cpc", "cpm", "cpa"],
  
  "benchmarks": {
    "search": {
      "avg_cpc": 120,
      "range_cpc": [30, 300],
      "avg_ctr": 0.025,
      "avg_cpl": 1500
    },
    "rsya": {
      "avg_cpc": 35,
      "range_cpc": [10, 80],
      "avg_ctr": 0.015,
      "avg_cpl": 2000
    }
  },
  
  "targeting_capabilities": {
    "geo": ["country", "region", "city", "district", "radius"],
    "demo": ["age", "gender"],
    "interests": ["yandex_metrica_goals", "search_history", "site_visits"],
    "behaviors": ["device_type", "browser", "os"],
    "contextual": ["keywords", "site_theme"],
    "retargeting": ["metrica_segments", "crm_upload"]
  },
  
  "supported_formats": [
    "text_ads_search",
    "text_image_ads_search",
    "rsya_banners",
    "dynamic_ads",
    "smart_banners"
  ],
  
  "rate_limit_requests_per_sec": 10,
  "rate_limit_requests_per_day": 100000,
  
  "support_email": "direct-support@yandex-team.ru",
  "account_manager_needed": true,
  "min_spend_for_manager": 100000,
  
  "is_active": true,
  
  "metadata": {
    "market_share_ru": 0.55,
    "best_for": ["search_intent", "local_business", "real_estate"],
    "payment_methods": ["card", "invoice", "agency_contract"]
  }
}
```

---

#### 2. GOOGLE ADS

```json
{
  "id": "platform-002",
  "code": "google_ads",
  "name_ru": "Google Ads",
  "name_en": "Google Ads",
  
  "channel": "context",
  "platform_type": "search_and_display",
  
  "api_available": true,
  "api_version": "v14",
  "api_docs_url": "https://developers.google.com/google-ads/api",
  
  "min_budget_rub": 500,
  "min_daily_budget_rub": 500,
  
  "audience_size_ru": 85000000,
  "audience_size_global": 4000000000,
  
  "pricing_models": ["cpc", "cpm", "cpa", "cpv"],
  
  "benchmarks": {
    "search": {
      "avg_cpc": 110,
      "range_cpc": [25, 280],
      "avg_ctr": 0.028,
      "avg_cpl": 1800
    },
    "display": {
      "avg_cpm": 250,
      "range_cpm": [150, 400],
      "avg_ctr": 0.012,
      "avg_cpl": 2500
    }
  },
  
  "targeting_capabilities": {
    "geo": ["country", "region", "city", "radius"],
    "demo": ["age", "gender", "parental_status", "household_income"],
    "interests": ["affinity", "in_market", "custom_intent"],
    "behaviors": ["device", "browser", "os"],
    "contextual": ["keywords", "topics", "placements"],
    "retargeting": ["website_visitors", "customer_match", "youtube"]
  },
  
  "supported_formats": [
    "text_ads_search",
    "responsive_search_ads",
    "display_banners",
    "responsive_display_ads",
    "video_ads",
    "performance_max"
  ],
  
  "rate_limit_requests_per_sec": 15,
  "rate_limit_requests_per_day": 150000,
  
  "support_email": "support@google.com",
  "account_manager_needed": true,
  "min_spend_for_manager": 200000,
  
  "is_active": true,
  
  "metadata": {
    "market_share_ru": 0.40,
    "best_for": ["search_intent", "b2b", "global_reach"],
    "payment_methods": ["card", "invoice"]
  }
}
```

---

### PROGRAMMATIC

#### 3. SOLOWAY DSP

```json
{
  "id": "platform-003",
  "code": "soloway_dsp",
  "name_ru": "Soloway DSP",
  "name_en": "Soloway DSP",
  
  "channel": "programmatic",
  "platform_type": "dsp",
  
  "api_available": true,
  "api_version": "v2",
  
  "min_budget_rub": 50000,
  "min_daily_budget_rub": 5000,
  
  "audience_size_ru": 80000000,
  
  "pricing_models": ["cpm", "cpc", "cpcv"],
  
  "benchmarks": {
    "display": {
      "avg_cpm": 200,
      "range_cpm": [150, 300],
      "avg_ctr": 0.018,
      "avg_cpl": 2800
    },
    "video": {
      "avg_cpcv": 25,
      "range_cpcv": [15, 40],
      "completion_rate": 0.70
    }
  },
  
  "targeting_capabilities": {
    "geo": ["city", "district"],
    "demo": ["age", "gender", "income"],
    "interests": ["dmp_segments"],
    "behaviors": ["device", "browser"],
    "contextual": ["site_categories"],
    "retargeting": ["pixel_based", "crm_upload"]
  },
  
  "supported_formats": [
    "display_banners",
    "video_preroll",
    "native_ads",
    "rich_media"
  ],
  
  "is_active": true,
  
  "metadata": {
    "best_for": ["awareness", "reach", "video"],
    "exchanges": ["MyTarget", "Yandex", "Google", "Own SSP"]
  }
}
```

---

#### 4. GETINTENT

```json
{
  "id": "platform-004",
  "code": "getintent",
  "name_ru": "Getintent",
  "name_en": "Getintent",
  
  "channel": "programmatic",
  "platform_type": "dsp",
  
  "min_budget_rub": 30000,
  
  "pricing_models": ["cpm", "cpcv"],
  
  "benchmarks": {
    "video": {
      "avg_cpcv": 28,
      "range_cpcv": [20, 45],
      "avg_cpm": 220
    }
  },
  
  "supported_formats": ["display_banners", "video_preroll", "video_midroll"],
  
  "is_active": true
}
```

---

### SOCIAL MEDIA

#### 5. VK ADS

```json
{
  "id": "platform-005",
  "code": "vk_ads",
  "name_ru": "VK Реклама",
  "name_en": "VK Ads",
  
  "channel": "social",
  "platform_type": "social_network",
  
  "api_available": true,
  "api_version": "5.131",
  "api_docs_url": "https://dev.vk.com/ru/api/ads",
  
  "min_budget_rub": 100,
  "min_daily_budget_rub": 100,
  
  "audience_size_ru": 75000000,
  
  "pricing_models": ["cpc", "cpm", "cpf"],
  
  "benchmarks": {
    "feed": {
      "avg_cpc": 35,
      "range_cpc": [20, 60],
      "avg_cpm": 150,
      "avg_ctr": 0.020,
      "avg_cpl": 1500
    },
    "stories": {
      "avg_cpm": 200,
      "avg_ctr": 0.015,
      "avg_cpl": 2000
    }
  },
  
  "targeting_capabilities": {
    "geo": ["country", "region", "city"],
    "demo": ["age", "gender", "relationship_status", "education"],
    "interests": ["communities", "likes", "apps"],
    "behaviors": ["device", "browser"],
    "retargeting": ["pixel", "audience_upload"]
  },
  
  "supported_formats": [
    "feed_posts",
    "stories",
    "clips",
    "carousel",
    "community_promotion"
  ],
  
  "is_active": true,
  
  "metadata": {
    "best_for": ["b2c", "engagement", "young_audience"],
    "audience_age": "18-35 (70%)"
  }
}
```

---

### VIDEO ADVERTISING

#### 6. YOUTUBE (via Google Ads)

```json
{
  "id": "platform-006",
  "code": "youtube_ads",
  "name_ru": "YouTube Реклама",
  "name_en": "YouTube Ads",
  
  "channel": "video",
  "platform_type": "video_platform",
  
  "audience_size_ru": 70000000,
  "audience_size_global": 2500000000,
  
  "pricing_models": ["cpv", "cpm"],
  
  "benchmarks": {
    "trueview": {
      "avg_cpv": 3.5,
      "range_cpv": [2, 8],
      "view_rate": 0.30,
      "avg_cpl": 3500
    },
    "bumper": {
      "avg_cpm": 300,
      "completion_rate": 0.95
    }
  },
  
  "supported_formats": [
    "trueview_instream",
    "trueview_discovery",
    "bumper_6s",
    "non_skippable"
  ],
  
  "is_active": true
}
```

---

#### 7. YANDEX VIDEO

```json
{
  "id": "platform-007",
  "code": "yandex_video",
  "name_ru": "Яндекс.Видео",
  "name_en": "Yandex Video",
  
  "channel": "video",
  "platform_type": "video_platform",
  
  "audience_size_ru": 50000000,
  
  "pricing_models": ["cpcv", "cpm"],
  
  "benchmarks": {
    "preroll": {
      "avg_cpcv": 20,
      "range_cpcv": [15, 35],
      "completion_rate": 0.65
    }
  },
  
  "supported_formats": ["preroll", "midroll"],
  
  "is_active": true
}
```

---

### RETAIL MEDIA

#### 8. ЯНДЕКС.НЕДВИЖИМОСТЬ

```json
{
  "id": "platform-008",
  "code": "yandex_realty",
  "name_ru": "Яндекс.Недвижимость",
  "name_en": "Yandex Realty",
  
  "channel": "retail_media",
  "platform_type": "vertical_marketplace",
  
  "min_budget_rub": 10000,
  
  "audience_size_ru": 15000000,
  
  "pricing_models": ["cpc", "cpm", "cpl"],
  
  "benchmarks": {
    "listing_promo": {
      "avg_cpc": 80,
      "avg_cpl": 1200
    }
  },
  
  "is_active": true,
  
  "metadata": {
    "best_for": ["real_estate", "high_intent"],
    "audience": "Active home buyers"
  }
}
```

---

#### 9. ЦИАН

```json
{
  "id": "platform-009",
  "code": "cian",
  "name_ru": "ЦИАН",
  "name_en": "CIAN",
  
  "channel": "retail_media",
  "platform_type": "vertical_marketplace",
  
  "audience_size_ru": 12000000,
  
  "pricing_models": ["cpc", "cpl"],
  
  "benchmarks": {
    "listing_promo": {
      "avg_cpc": 70,
      "avg_cpl": 1100
    }
  },
  
  "is_active": true,
  
  "metadata": {
    "best_for": ["real_estate"],
    "audience": "Active home buyers"
  }
}
```

---

## 📊 SUMMARY

```yaml
Total Platforms: 9
  Context: 2 (Yandex, Google)
  Programmatic: 2 (Soloway, Getintent)
  Social: 1 (VK)
  Video: 2 (YouTube, Yandex Video)
  Retail Media: 2 (Yandex Realty, CIAN)

API Available: 5/9
Market Coverage: 95M+ audience
```

---

**Версия:** 2.1 | **Статус:** ✅


