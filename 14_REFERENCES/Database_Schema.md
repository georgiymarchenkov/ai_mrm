---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: overview
title: Database Schema - Схема БД справочников
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: 14_REFERENCES/Database_Schema.md
effective_date: 2025-10-24
visibility: internal
security_level: low
tags: [documentation]
---

# Database Schema - Схема БД справочников

→ [References](../_README.md)

---

## 🗄️ ОБЩАЯ СТРУКТУРА

Все справочники имеют базовую структуру:

```sql
CREATE TABLE ref_base (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) UNIQUE NOT NULL,
  name_ru VARCHAR(255) NOT NULL,
  name_en VARCHAR(255),
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  created_by UUID REFERENCES users(id),
  updated_by UUID REFERENCES users(id)
);
```

---

## 1. CITIES (Города)

```sql
CREATE TABLE ref_cities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) UNIQUE NOT NULL, -- 'moscow', 'spb', 'kazan'
  name_ru VARCHAR(255) NOT NULL,
  name_en VARCHAR(255),
  
  -- География
  country_code VARCHAR(2) DEFAULT 'RU',
  region VARCHAR(255),
  timezone VARCHAR(50) DEFAULT 'Europe/Moscow',
  coordinates POINT, -- lat, lng
  
  -- Население и экономика
  population INTEGER,
  population_year INTEGER,
  gdp_per_capita_rub INTEGER,
  
  -- Для медиапланирования
  audience_digital INTEGER, -- Интернет-аудитория
  audience_social INTEGER, -- Соцсети
  market_tier INTEGER, -- 1=Москва/СПб, 2=Миллионники, 3=Регионы
  
  -- Бенчмарки
  avg_cpl_context INTEGER, -- Средний CPL в контексте
  avg_cpc_context INTEGER, -- Средний CPC
  avg_cpm_programmatic INTEGER, -- Средний CPM
  
  is_active BOOLEAN DEFAULT true,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Индексы
CREATE INDEX idx_cities_code ON ref_cities(code);
CREATE INDEX idx_cities_active ON ref_cities(is_active);
CREATE INDEX idx_cities_tier ON ref_cities(market_tier);
```

---

## 2. PLATFORMS (Площадки)

```sql
CREATE TABLE ref_platforms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) UNIQUE NOT NULL, -- 'yandex_direct', 'google_ads'
  name_ru VARCHAR(255) NOT NULL,
  name_en VARCHAR(255),
  
  -- Категоризация
  channel VARCHAR(50) NOT NULL, -- 'context', 'programmatic', 'social', etc.
  platform_type VARCHAR(50), -- 'search', 'display', 'video', 'native'
  
  -- Технические параметры
  api_available BOOLEAN DEFAULT false,
  api_version VARCHAR(20),
  api_docs_url TEXT,
  min_budget_rub INTEGER,
  min_daily_budget_rub INTEGER,
  
  -- Аудитория
  audience_size_ru INTEGER, -- Месячная аудитория в РФ
  audience_size_global INTEGER,
  
  -- Ценообразование
  pricing_models VARCHAR[] DEFAULT ARRAY['cpc', 'cpm'], -- Поддерживаемые модели
  avg_cpc_rub INTEGER,
  avg_cpm_rub INTEGER,
  avg_cpcv_rub INTEGER,
  
  -- Таргетинг
  targeting_capabilities JSONB, -- geo, demo, interests, behaviors, etc.
  
  -- Форматы
  supported_formats VARCHAR[], -- Массив кодов форматов
  
  -- Ограничения
  rate_limit_requests_per_sec INTEGER,
  rate_limit_requests_per_day INTEGER,
  
  -- Контакты
  support_email VARCHAR(255),
  account_manager_needed BOOLEAN DEFAULT false,
  
  is_active BOOLEAN DEFAULT true,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Индексы
CREATE INDEX idx_platforms_code ON ref_platforms(code);
CREATE INDEX idx_platforms_channel ON ref_platforms(channel);
CREATE INDEX idx_platforms_active ON ref_platforms(is_active);
```

---

## 3. AD_FORMATS (Форматы рекламы)

```sql
CREATE TABLE ref_ad_formats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) UNIQUE NOT NULL, -- 'search_text', 'display_banner', 'video_15s'
  name_ru VARCHAR(255) NOT NULL,
  name_en VARCHAR(255),
  
  -- Категоризация
  format_type VARCHAR(50) NOT NULL, -- 'text', 'image', 'video', 'html5'
  channel VARCHAR(50), -- 'context', 'programmatic', 'social'
  
  -- Платформы
  platforms VARCHAR[], -- ['yandex_direct', 'google_ads']
  
  -- Технические требования
  creative_specs JSONB, -- Размеры, форматы файлов, вес
  /*
  {
    "image": {
      "sizes": [{"width": 240, "height": 400}, {"width": 728, "height": 90}],
      "formats": ["jpg", "png"],
      "max_size_kb": 150
    },
    "video": {
      "duration_sec": [15, 30],
      "formats": ["mp4", "mov"],
      "max_size_mb": 100,
      "resolution": "1920x1080"
    }
  }
  */
  
  -- Производительность
  avg_ctr DECIMAL(5,4), -- 0.0250 = 2.5%
  avg_cpc_rub INTEGER,
  avg_cpm_rub INTEGER,
  
  -- Ограничения
  min_budget_rub INTEGER,
  text_limits JSONB, -- Заголовки, тексты
  
  is_active BOOLEAN DEFAULT true,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Индексы
CREATE INDEX idx_formats_code ON ref_ad_formats(code);
CREATE INDEX idx_formats_type ON ref_ad_formats(format_type);
CREATE INDEX idx_formats_channel ON ref_ad_formats(channel);
```

---

## 4. INDUSTRIES (Индустрии)

```sql
CREATE TABLE ref_industries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) UNIQUE NOT NULL, -- 'real_estate_developer', 'ecommerce'
  name_ru VARCHAR(255) NOT NULL,
  name_en VARCHAR(255),
  
  -- Иерархия
  parent_id UUID REFERENCES ref_industries(id),
  level INTEGER DEFAULT 1, -- 1=Отрасль, 2=Подотрасль
  
  -- Типичные метрики
  typical_cpl_range_rub INTEGER[], -- [1000, 3000]
  typical_conversion_rate DECIMAL(5,4), -- 0.0850 = 8.5%
  typical_deal_cycle_days INTEGER,
  typical_ltv_rub INTEGER,
  
  -- Сезонность
  seasonality JSONB, -- По месяцам
  /*
  {
    "jan": 0.8, "feb": 0.9, "mar": 1.0,
    "apr": 1.1, "may": 1.2, "jun": 1.1,
    "jul": 0.9, "aug": 0.8, "sep": 1.0,
    "oct": 1.1, "nov": 1.0, "dec": 0.9
  }
  */
  
  -- Рекомендуемые каналы
  recommended_channels JSONB,
  /*
  {
    "context": {"priority": 1, "budget_pct": 0.40},
    "programmatic": {"priority": 2, "budget_pct": 0.25},
    "social": {"priority": 3, "budget_pct": 0.20}
  }
  */
  
  is_active BOOLEAN DEFAULT true,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Индексы
CREATE INDEX idx_industries_code ON ref_industries(code);
CREATE INDEX idx_industries_parent ON ref_industries(parent_id);
```

---

## 5. OBJECTIVES (Цели)

```sql
CREATE TABLE ref_objectives (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) UNIQUE NOT NULL, -- 'awareness', 'conversions', 'sales'
  name_ru VARCHAR(255) NOT NULL,
  name_en VARCHAR(255),
  
  -- Категоризация
  funnel_stage VARCHAR(50), -- 'awareness', 'consideration', 'conversion'
  
  -- KPIs
  primary_kpis VARCHAR[], -- ['reach', 'impressions', 'brand_lift']
  secondary_kpis VARCHAR[],
  
  -- Рекомендуемые каналы
  recommended_channels JSONB,
  
  -- Typical budget allocation
  typical_budget_split JSONB,
  
  is_active BOOLEAN DEFAULT true,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

---

## 6. PRODUCT_TYPES (Типы продуктов)

```sql
CREATE TABLE ref_product_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) UNIQUE NOT NULL, -- 'apartments', 'parking', 'business_spaces'
  name_ru VARCHAR(255) NOT NULL,
  name_en VARCHAR(255),
  
  -- Категоризация
  industry_code VARCHAR(50) REFERENCES ref_industries(code),
  category VARCHAR(50), -- 'physical', 'digital', 'service'
  
  -- Типичные параметры
  typical_price_range_rub INTEGER[],
  typical_conversion_rate DECIMAL(5,4),
  typical_decision_timeframe_days INTEGER,
  
  -- Для медиапланирования
  recommended_ad_formats VARCHAR[],
  
  is_active BOOLEAN DEFAULT true,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

---

## 7. PRICING_MODELS (Модели ценообразования)

```sql
CREATE TABLE ref_pricing_models (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) UNIQUE NOT NULL, -- 'cpc', 'cpm', 'cpcv', 'cpa', 'cpl'
  name_ru VARCHAR(255) NOT NULL,
  name_en VARCHAR(255),
  
  -- Описание
  description TEXT,
  full_name VARCHAR(255), -- 'Cost Per Click'
  
  -- Применимость
  applicable_channels VARCHAR[],
  applicable_formats VARCHAR[],
  
  -- Типичные значения по индустриям
  typical_rates_by_industry JSONB,
  /*
  {
    "real_estate": {"min": 80, "avg": 120, "max": 200},
    "ecommerce": {"min": 20, "avg": 45, "max": 80}
  }
  */
  
  -- Формула расчета
  calculation_formula TEXT,
  
  is_active BOOLEAN DEFAULT true,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🔗 СВЯЗИ МЕЖДУ СПРАВОЧНИКАМИ

```sql
-- Платформа поддерживает форматы
CREATE TABLE ref_platform_formats (
  platform_id UUID REFERENCES ref_platforms(id),
  format_id UUID REFERENCES ref_ad_formats(id),
  is_recommended BOOLEAN DEFAULT false,
  avg_performance_index DECIMAL(3,2), -- 1.0 = среднее, >1 = лучше среднего
  PRIMARY KEY (platform_id, format_id)
);

-- Бенчмарки по городам и индустриям
CREATE TABLE ref_city_industry_benchmarks (
  city_id UUID REFERENCES ref_cities(id),
  industry_id UUID REFERENCES ref_industries(id),
  platform_id UUID REFERENCES ref_platforms(id),
  avg_cpl_rub INTEGER,
  avg_cpc_rub INTEGER,
  avg_conversion_rate DECIMAL(5,4),
  data_collected_at DATE,
  PRIMARY KEY (city_id, industry_id, platform_id)
);
```

---

## 📊 МИГРАЦИИ

```sql
-- V001: Create base tables
-- V002: Add initial data (cities, platforms)
-- V003: Add benchmarks
-- V004: Add indexes
```

---

**Версия:** 2.1 | **Статус:** ✅


