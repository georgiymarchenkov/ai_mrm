---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: overview
title: Ad Formats - Данные справочника
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: 14_REFERENCES/Ad_Formats/Data.md
effective_date: 2025-10-24
visibility: internal
security_level: low
tags: [documentation]
---

# Ad Formats - Данные справочника

→ [References](../_README.md) | [Database Schema](../Database_Schema.md)

---

## 📊 ФОРМАТЫ РЕКЛАМЫ (из медиапланов)

### CONTEXT FORMATS

#### 1. TEXT ADS - SEARCH (Поиск)

```json
{
  "id": "format-001",
  "code": "text_ads_search",
  "name_ru": "Текстовые объявления в поиске",
  "name_en": "Text Ads - Search",
  
  "format_type": "text",
  "channel": "context",
  
  "platforms": ["yandex_direct", "google_ads"],
  
  "creative_specs": {
    "text": {
      "title1": {"max_chars": 35, "required": true},
      "title2": {"max_chars": 30, "required": false},
      "description": {"max_chars": 81, "required": true},
      "display_url": {"max_chars": 20}
    },
    "extensions": ["sitelinks", "callouts", "phone", "location"]
  },
  
  "benchmarks": {
    "yandex": {
      "avg_cpc": 120,
      "range_cpc": [80, 200],
      "avg_ctr": 0.025,
      "avg_cpl": 2000
    },
    "google": {
      "avg_cpc": 110,
      "range_cpc": [70, 180],
      "avg_ctr": 0.028,
      "avg_cpl": 1800
    }
  },
  
  "is_active": true,
  
  "metadata": {
    "best_for": ["high_intent", "search_queries", "conversions"],
    "min_variants": 3
  }
}
```

---

#### 2. RSA / РСЯ BANNERS

```json
{
  "id": "format-002",
  "code": "rsya_banners",
  "name_ru": "Баннеры РСЯ",
  "name_en": "Yandex Display Network",
  
  "format_type": "image",
  "channel": "context",
  
  "platforms": ["yandex_direct"],
  
  "creative_specs": {
    "image": {
      "sizes": [
        {"width": 240, "height": 400},
        {"width": 300, "height": 250},
        {"width": 728, "height": 90},
        {"width": 300, "height": 600}
      ],
      "formats": ["jpg", "png", "gif"],
      "max_size_kb": 150,
      "min_resolution": 72
    },
    "text": {
      "title": {"max_chars": 33},
      "body": {"max_chars": 75}
    }
  },
  
  "benchmarks": {
    "avg_cpc": 35,
    "range_cpc": [20, 60],
    "avg_ctr": 0.015,
    "avg_cpl": 2200
  },
  
  "is_active": true
}
```

---

### PROGRAMMATIC FORMATS

#### 3. DISPLAY BANNERS (Standard)

```json
{
  "id": "format-003",
  "code": "display_banners_standard",
  "name_ru": "Стандартные баннеры",
  "name_en": "Display Banners - Standard",
  
  "format_type": "image",
  "channel": "programmatic",
  
  "platforms": ["soloway_dsp", "getintent", "google_ads"],
  
  "creative_specs": {
    "image": {
      "standard_sizes": [
        {"width": 300, "height": 250, "name": "Medium Rectangle"},
        {"width": 728, "height": 90, "name": "Leaderboard"},
        {"width": 160, "height": 600, "name": "Wide Skyscraper"},
        {"width": 300, "height": 600, "name": "Half Page"},
        {"width": 320, "height": 50, "name": "Mobile Banner"},
        {"width": 320, "height": 100, "name": "Large Mobile Banner"}
      ],
      "formats": ["jpg", "png", "gif", "html5"],
      "max_size_kb": 150,
      "max_animation_duration_sec": 30
    }
  },
  
  "benchmarks": {
    "avg_cpm": 200,
    "range_cpm": [150, 300],
    "avg_ctr": 0.018,
    "avg_cpl": 2800
  },
  
  "is_active": true
}
```

---

#### 4. VIDEO 15"

```json
{
  "id": "format-004",
  "code": "video_15s",
  "name_ru": "Видео 15 секунд",
  "name_en": "Video 15 seconds",
  
  "format_type": "video",
  "channel": "programmatic",
  
  "platforms": ["soloway_dsp", "getintent", "youtube_ads", "yandex_video"],
  
  "creative_specs": {
    "video": {
      "duration_sec": 15,
      "formats": ["mp4", "mov", "avi"],
      "codecs": ["H.264", "H.265"],
      "resolution": "1920x1080",
      "max_size_mb": 100,
      "aspect_ratios": ["16:9", "1:1", "9:16"],
      "frame_rate": [24, 30, 60]
    },
    "audio": {
      "required": true,
      "codec": "AAC",
      "bitrate": "128kbps"
    }
  },
  
  "benchmarks": {
    "avg_cpcv": 25,
    "range_cpcv": [15, 40],
    "completion_rate": 0.70,
    "avg_cpl": 4000
  },
  
  "is_active": true,
  
  "metadata": {
    "best_for": ["awareness", "storytelling"]
  }
}
```

---

#### 5. VIDEO 30"

```json
{
  "id": "format-005",
  "code": "video_30s",
  "name_ru": "Видео 30 секунд",
  "name_en": "Video 30 seconds",
  
  "format_type": "video",
  "channel": "programmatic",
  
  "platforms": ["soloway_dsp", "youtube_ads", "yandex_video"],
  
  "creative_specs": {
    "video": {
      "duration_sec": 30,
      "formats": ["mp4", "mov"],
      "resolution": "1920x1080",
      "max_size_mb": 150
    }
  },
  
  "benchmarks": {
    "avg_cpcv": 30,
    "completion_rate": 0.60,
    "avg_cpl": 5000
  },
  
  "is_active": true
}
```

---

### SOCIAL FORMATS

#### 6. FEED POSTS (VK)

```json
{
  "id": "format-006",
  "code": "vk_feed_post",
  "name_ru": "Запись в ленте VK",
  "name_en": "VK Feed Post",
  
  "format_type": "native",
  "channel": "social",
  
  "platforms": ["vk_ads"],
  
  "creative_specs": {
    "text": {
      "max_chars": 16384,
      "recommended_chars": [100, 300]
    },
    "image": {
      "sizes": [
        {"width": 1080, "height": 1080, "name": "Square"},
        {"width": 1080, "height": 1350, "name": "Portrait"},
        {"width": 1200, "height": 630, "name": "Landscape"}
      ],
      "formats": ["jpg", "png"],
      "max_size_mb": 10
    },
    "video": {
      "duration_sec": [3, 60],
      "max_size_mb": 50
    }
  },
  
  "benchmarks": {
    "avg_cpc": 35,
    "avg_cpm": 150,
    "avg_ctr": 0.020,
    "avg_cpl": 1800
  },
  
  "is_active": true
}
```

---

#### 7. STORIES (VK)

```json
{
  "id": "format-007",
  "code": "vk_stories",
  "name_ru": "Истории VK",
  "name_en": "VK Stories",
  
  "format_type": "vertical_video",
  "channel": "social",
  
  "platforms": ["vk_ads"],
  
  "creative_specs": {
    "video": {
      "duration_sec": [5, 15],
      "aspect_ratio": "9:16",
      "resolution": "1080x1920",
      "formats": ["mp4"],
      "max_size_mb": 50
    },
    "image": {
      "resolution": "1080x1920",
      "formats": ["jpg", "png"],
      "max_size_mb": 5
    }
  },
  
  "benchmarks": {
    "avg_cpm": 200,
    "avg_ctr": 0.015,
    "swipe_up_rate": 0.008,
    "avg_cpl": 2500
  },
  
  "is_active": true
}
```

---

### VIDEO FORMATS

#### 8. YOUTUBE TRUEVIEW

```json
{
  "id": "format-008",
  "code": "youtube_trueview",
  "name_ru": "YouTube TrueView",
  "name_en": "YouTube TrueView",
  
  "format_type": "video",
  "channel": "video",
  
  "platforms": ["youtube_ads"],
  
  "creative_specs": {
    "video": {
      "duration_sec": [12, 180],
      "skippable_after_sec": 5,
      "formats": ["mp4", "mov", "avi"],
      "resolution": "1920x1080",
      "max_size_gb": 2
    }
  },
  
  "benchmarks": {
    "avg_cpv": 3.5,
    "view_rate": 0.30,
    "avg_cpl": 3500
  },
  
  "is_active": true
}
```

---

## 📊 SUMMARY

```yaml
Total Formats: 8
  Text: 1
  Image/Display: 2
  Video: 4
  Native/Social: 2

By Channel:
  Context: 2
  Programmatic: 3
  Social: 2
  Video: 2
```

---

**Версия:** 2.1 | **Статус:** ✅


