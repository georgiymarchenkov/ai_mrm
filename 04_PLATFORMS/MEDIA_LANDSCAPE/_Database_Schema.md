---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: schema
title: Схема базы данных медиаландшафта
language: ru
industry: advertising
role_apply: [tech_lead, developer]
period: 2025-10
version: "1.0"
source_path: 04_PLATFORMS/MEDIA_LANDSCAPE/_Database_Schema.md
effective_date: 2025-10-24
visibility: internal
security_level: medium
tags: [database, schema, data_model]
---

# Схема базы данных медиаландшафта

## 🎯 ОБЗОР

База данных медиаландшафта состоит из 9 основных доменов, связанных между собой через идентификаторы площадок и форматов.

---

## 📊 ОСНОВНЫЕ СУЩНОСТИ

### 1. Platform (Площадка)

**Главная сущность системы**

```typescript
interface Platform {
  // Идентификация
  id: string;                           // Уникальный ID (UUID)
  code: string;                         // Код (vk_ads, yandex_direct)
  name: string;                         // Название (VK Реклама)
  name_en: string;                      // Английское название
  
  // Классификация
  category: PlatformCategory;           // Категория (см. ниже)
  subcategory?: string;                 // Подкатегория
  type: PlatformType;                   // Тип (см. ниже)
  tags: string[];                       // Теги для поиска
  
  // Статус
  status: PlatformStatus;               // active | inactive | archived
  availability: 'russia' | 'international' | 'limited';
  is_active: boolean;
  
  // Метаданные
  description: string;                  // Описание площадки
  logo_url?: string;                    // Логотип
  website_url?: string;                 // Официальный сайт
  media_kit_url?: string;               // Медиакит
  
  // Охваты
  audience: {
    monthly_reach: number;              // Ежемесячный охват (уники)
    daily_reach?: number;               // Дневной охват
    registered_users?: number;          // Зарегистрированные
    active_users?: number;              // Активные пользователи
  };
  
  // Демография (общая по площадке)
  demographics: {
    age_distribution: Record<string, number>;  // {'18-24': 25, '25-34': 40, ...}
    gender_distribution: Record<string, number>; // {'male': 45, 'female': 55}
    geo_distribution: Record<string, number>;    // {'moscow': 30, 'spb': 15, ...}
  };
  
  // Технические возможности
  capabilities: {
    has_api: boolean;
    api_version?: string;
    supports_rtb: boolean;
    supports_programmatic: boolean;
    tracking_capabilities: string[];    // ['pixel', 'postback', 's2s']
    attribution_window: number;         // В днях
  };
  
  // Коммерческие условия (базовые)
  commercial: {
    minimum_budget: number;             // Минимальный бюджет в ₽
    minimum_campaign_duration?: number; // В днях
    payment_terms: string[];            // ['prepay', 'postpay_30']
    vat_included: boolean;
    agency_discount?: number;           // % скидки агентствам
  };
  
  // Временные метки
  created_at: string;                   // ISO datetime
  updated_at: string;
  last_verified_at: string;             // Когда последний раз проверяли данные
  
  // Связи
  parent_platform_id?: string;          // Если это подплощадка
  related_platform_ids: string[];       // Связанные площадки
}

// Категории площадок
enum PlatformCategory {
  SOCIAL_MEDIA = 'social_media',           // Соцсети
  SEARCH = 'search',                       // Поисковые системы
  VIDEO = 'video',                         // Видеоплатформы
  DISPLAY = 'display',                     // Display сети
  PROGRAMMATIC = 'programmatic',           // Programmatic платформы
  NATIVE = 'native',                       // Native реклама
  AUDIO = 'audio',                         // Аудиореклама
  ECOM = 'ecom',                           // E-commerce площадки
  CONTENT = 'content',                     // Контентные платформы
  MOBILE = 'mobile',                       // Мобильные сети
  OOH = 'ooh',                            // Наружная реклама (digital)
  CPA = 'cpa'                             // CPA сети
}

// Типы площадок
enum PlatformType {
  SELF_SERVICE = 'self_service',       // Самообслуживание (кабинет)
  MANAGED = 'managed',                 // Управляемое размещение
  HYBRID = 'hybrid'                    // Гибрид
}

enum PlatformStatus {
  ACTIVE = 'active',                   // Активная
  INACTIVE = 'inactive',               // Временно неактивна
  ARCHIVED = 'archived',               // Архивная
  BETA = 'beta'                        // В тестировании
}
```

---

### 2. Format (Формат размещения)

**Конкретный формат рекламы на площадке**

```typescript
interface Format {
  // Идентификация
  id: string;                           // UUID
  platform_id: string;                  // Площадка (FK)
  code: string;                         // vk_feed_video_640x360
  name: string;                         // Видео в ленте VK
  
  // Классификация
  format_type: FormatType;              // Тип формата
  placement_type: PlacementType;        // Тип размещения
  
  // Технические спецификации
  specs: {
    // Для display/баннеров
    dimensions?: {
      width: number;
      height: number;
      unit: 'px' | 'dp';
    };
    
    // Для видео
    video?: {
      min_duration: number;             // Секунды
      max_duration: number;
      aspect_ratio: string;             // '16:9', '9:16', '1:1'
      is_skippable: boolean;
      skip_after?: number;              // Секунд до кнопки skip
      required_codecs: string[];        // ['h264', 'vp9']
      max_file_size_mb: number;
      resolutions: string[];            // ['1280x720', '1920x1080']
    };
    
    // Для аудио
    audio?: {
      duration: number;
      format: string[];                 // ['mp3', 'aac']
      bitrate_kbps: number;
      max_file_size_mb: number;
    };
    
    // Для native
    native?: {
      title_max_length?: number;
      description_max_length?: number;
      image_required: boolean;
      image_specs?: {
        width: number;
        height: number;
        formats: string[];              // ['jpg', 'png']
      };
    };
  };
  
  // Где показывается
  placement: {
    location: string;                   // 'news_feed', 'stories', 'sidebar'
    position?: string;                  // 'top', 'middle', 'bottom'
    device_types: DeviceType[];         // ['desktop', 'mobile', 'tablet']
  };
  
  // Показатели производительности (бенчмарки)
  performance_benchmarks: {
    ctr_avg: number;                    // %
    ctr_range: [number, number];        // [min, max]
    vtr_15s?: number;                   // % досмотров 15 сек (видео)
    vtr_complete?: number;              // % полных досмотров
    viewability_avg: number;            // %
    ivt_avg: number;                    // % Invalid Traffic
    engagement_rate?: number;           // %
  };
  
  // Особенности
  features: {
    supports_animation: boolean;
    supports_html5: boolean;
    supports_interactive: boolean;
    allows_clickthrough: boolean;
    requires_moderation: boolean;
    moderation_time_hours?: number;
  };
  
  // Статус
  is_active: boolean;
  is_beta: boolean;
  
  // Метки времени
  created_at: string;
  updated_at: string;
  deprecated_at?: string;               // Если формат устарел
}

enum FormatType {
  DISPLAY_BANNER = 'display_banner',
  VIDEO_INSTREAM = 'video_instream',
  VIDEO_OUTSTREAM = 'video_outstream',
  NATIVE = 'native',
  AUDIO = 'audio',
  RICH_MEDIA = 'rich_media',
  CAROUSEL = 'carousel',
  STORIES = 'stories',
  REWARDED = 'rewarded'                 // Rewarded ads (mobile games)
}

enum PlacementType {
  FEED = 'feed',                        // В ленте
  SIDEBAR = 'sidebar',                  // Боковая колонка
  PREROLL = 'preroll',                  // Перед видео
  MIDROLL = 'midroll',                  // В середине видео
  POSTROLL = 'postroll',                // После видео
  OVERLAY = 'overlay',                  // Поверх контента
  INTERSTITIAL = 'interstitial',        // Полноэкранное
  NATIVE = 'native',                    // Нативное
  STORIES = 'stories',                  // Истории
  SEARCH = 'search'                     // В поиске
}

enum DeviceType {
  DESKTOP = 'desktop',
  MOBILE = 'mobile',
  TABLET = 'tablet',
  SMART_TV = 'smart_tv',
  CONNECTED_TV = 'connected_tv'
}
```

---

### 3. Targeting (Таргетинг)

**Возможности таргетинга на площадке**

```typescript
interface PlatformTargeting {
  id: string;
  platform_id: string;
  
  // Географический таргетинг
  geo_targeting: {
    available: boolean;
    levels: GeoLevel[];                 // ['country', 'city', 'district']
    min_radius_km?: number;             // Для радиус-таргетинга
    supports_exclusion: boolean;
  };
  
  // Демографический таргетинг
  demographic_targeting: {
    age: {
      available: boolean;
      min_age?: number;
      max_age?: number;
      granularity: 'year' | 'range';    // По году или диапазонам
    };
    
    gender: {
      available: boolean;
      options: string[];                // ['male', 'female', 'unknown']
    };
    
    education: {
      available: boolean;
      levels: string[];                 // ['high_school', 'bachelor', ...]
    };
    
    income: {
      available: boolean;
      levels: string[];                 // ['low', 'medium', 'high']
    };
  };
  
  // Поведенческий таргетинг
  behavioral_targeting: {
    interests: {
      available: boolean;
      categories_count: number;
      supports_custom: boolean;
    };
    
    online_behavior: {
      available: boolean;
      types: string[];                  // ['searches', 'sites_visited', 'apps_used']
    };
    
    purchase_behavior: {
      available: boolean;
      categories: string[];
    };
  };
  
  // Контекстный таргетинг
  contextual_targeting: {
    keywords: {
      available: boolean;
      max_keywords?: number;
    };
    
    topics: {
      available: boolean;
      taxonomy: string;                 // 'iab', 'custom'
    };
    
    placements: {
      available: boolean;
      can_select_sites: boolean;
      can_exclude_sites: boolean;
    };
  };
  
  // Аудитории
  audience_targeting: {
    retargeting: {
      available: boolean;
      pixel_tracking: boolean;
      list_upload: boolean;
      max_list_size?: number;
      min_list_size?: number;
    };
    
    lookalike: {
      available: boolean;
      similarity_ranges: number[];      // [1, 2, 5, 10] %
      min_source_size?: number;
    };
    
    custom_audiences: {
      available: boolean;
      types: string[];                  // ['email', 'phone', 'device_id']
    };
  };
  
  // Устройства и технологии
  device_targeting: {
    device_types: {
      available: boolean;
      types: DeviceType[];
    };
    
    os: {
      available: boolean;
      systems: string[];                // ['ios', 'android', 'windows', ...]
    };
    
    browsers: {
      available: boolean;
      browsers: string[];
    };
    
    connection_type: {
      available: boolean;
      types: string[];                  // ['wifi', '3g', '4g', '5g']
    };
  };
  
  // Временной таргетинг
  time_targeting: {
    day_parting: {
      available: boolean;
      granularity: 'hour' | 'half_hour';
    };
    
    day_of_week: {
      available: boolean;
    };
    
    seasonality: {
      available: boolean;
    };
  };
  
  // Частота показов
  frequency_capping: {
    available: boolean;
    levels: string[];                   // ['campaign', 'ad_group', 'creative']
    time_windows: string[];             // ['hour', 'day', 'week', 'month']
  };
}

enum GeoLevel {
  COUNTRY = 'country',
  REGION = 'region',
  CITY = 'city',
  DISTRICT = 'district',
  RADIUS = 'radius',
  POSTAL_CODE = 'postal_code'
}
```

---

### 4. Pricing (Ценообразование)

**Цены и модели оплаты**

```typescript
interface PlatformPricing {
  id: string;
  platform_id: string;
  format_id?: string;                   // Если цена зависит от формата
  
  // Модели оплаты
  pricing_models: PricingModel[];
  
  // Цены (бенчмарк)
  prices: {
    // CPM - Cost Per Mille (1000 показов)
    cpm?: {
      min: number;                      // Минимальная цена в ₽
      avg: number;                      // Средняя цена
      max: number;                      // Максимальная цена
      currency: 'RUB';
    };
    
    // CPC - Cost Per Click
    cpc?: {
      min: number;
      avg: number;
      max: number;
      currency: 'RUB';
    };
    
    // CPV - Cost Per View (для видео)
    cpv?: {
      min: number;
      avg: number;
      max: number;
      currency: 'RUB';
      view_definition: string;          // '15s', 'complete', '50%'
    };
    
    // CPA - Cost Per Action
    cpa?: {
      min: number;
      avg: number;
      max: number;
      currency: 'RUB';
      action_type: string;              // 'lead', 'purchase', 'install'
    };
    
    // CPL - Cost Per Lead
    cpl?: {
      min: number;
      avg: number;
      max: number;
      currency: 'RUB';
    };
    
    // CPI - Cost Per Install (mobile apps)
    cpi?: {
      min: number;
      avg: number;
      max: number;
      currency: 'RUB';
      platform: 'ios' | 'android' | 'both';
    };
    
    // Fixed - Фиксированная цена размещения
    fixed?: {
      amount: number;
      currency: 'RUB';
      period: 'day' | 'week' | 'month';
    };
  };
  
  // Множители и надбавки
  multipliers: {
    // Географические надбавки
    geo_multipliers?: Record<string, number>;  // {'moscow': 1.5, 'spb': 1.3}
    
    // Временные надбавки
    time_multipliers?: {
      prime_time?: number;              // Множитель в прайм-тайм
      weekends?: number;                // Множитель на выходные
      holidays?: number;                // Множитель в праздники
    };
    
    // Таргетинг надбавки
    targeting_multipliers?: {
      narrow_targeting?: number;        // За узкий таргетинг
      lookalike?: number;               // За lookalike
      retargeting?: number;             // За ретаргетинг
    };
    
    // Формат надбавки
    format_multipliers?: Record<string, number>;
  };
  
  // Скидки
  discounts: {
    // Объемные скидки
    volume_discounts?: Array<{
      min_budget: number;               // Минимальный бюджет
      discount_percent: number;         // % скидки
    }>;
    
    // Долгосрочные скидки
    duration_discounts?: Array<{
      min_days: number;
      discount_percent: number;
    }>;
    
    // Агентские скидки
    agency_discount?: number;           // % агентской скидки
    
    // Промо и акции
    promotions?: Array<{
      name: string;
      description: string;
      discount_percent: number;
      valid_from: string;
      valid_until: string;
      conditions?: string;
    }>;
  };
  
  // Минимумы
  minimums: {
    min_daily_budget?: number;
    min_campaign_budget?: number;
    min_bid?: number;                   // Минимальная ставка
  };
  
  // Комиссии
  fees: {
    platform_fee_percent?: number;      // Комиссия площадки
    tech_fee_percent?: number;          // Техническая комиссия
    vat_percent: number;                // НДС (обычно 20%)
  };
  
  // Метаданные
  effective_from: string;               // Дата начала действия
  effective_until?: string;             // Дата окончания
  source: string;                       // Источник данных
  last_updated: string;
  verified_by?: string;                 // Кто проверил
}

enum PricingModel {
  CPM = 'cpm',                          // За 1000 показов
  CPC = 'cpc',                          // За клик
  CPV = 'cpv',                          // За просмотр видео
  CPA = 'cpa',                          // За действие
  CPL = 'cpl',                          // За лид
  CPI = 'cpi',                          // За установку
  CPE = 'cpe',                          // За вовлечение
  FIXED = 'fixed',                      // Фиксированная цена
  HYBRID = 'hybrid'                     // Гибридная модель
}
```

---

### 5. Performance Benchmarks (Бенчмарки производительности)

**Исторические данные по эффективности**

```typescript
interface PerformanceBenchmark {
  id: string;
  platform_id: string;
  format_id?: string;
  
  // Сегментация
  segment: {
    industry?: string;                  // Индустрия (fintech, ecom, ...)
    objective?: CampaignObjective;      // Цель кампании
    audience_type?: string;             // Тип аудитории
    period: 'Q1_2024' | 'Q2_2024' | string;
  };
  
  // Метрики показов
  impressions: {
    avg_impressions: number;
    viewability_rate: number;           // % viewable impressions
    ivt_rate: number;                   // % Invalid Traffic
    completion_rate?: number;           // % завершенных (для видео)
  };
  
  // Метрики взаимодействия
  engagement: {
    ctr: number;                        // Click-Through Rate %
    ctr_range: [number, number];        // [min, max]
    
    // Для видео
    vtr_15s?: number;                   // Video Through Rate 15 сек
    vtr_complete?: number;              // Complete view rate
    avg_watch_time?: number;            // Среднее время просмотра (сек)
    
    // Для других форматов
    interaction_rate?: number;          // % взаимодействий
    engagement_rate?: number;           // % вовлечения
  };
  
  // Метрики конверсий
  conversions: {
    cvr?: number;                       // Conversion Rate %
    cpa_avg?: number;                   // Средний CPA
    roas?: number;                      // Return on Ad Spend
    ltv?: number;                       // Lifetime Value
  };
  
  // Качество трафика
  quality: {
    bounce_rate?: number;               // % отказов
    avg_session_duration?: number;      // Средняя длительность сессии (сек)
    pages_per_session?: number;         // Страниц за сессию
    brand_safety_score?: number;        // Оценка brand safety (0-100)
  };
  
  // Охваты и частота
  reach: {
    avg_reach: number;                  // Средний охват
    avg_frequency: number;              // Средняя частота
    unique_reach_rate?: number;         // % уникального охвата
  };
  
  // Стоимость
  costs: {
    avg_cpm: number;
    avg_cpc?: number;
    avg_cpv?: number;
    avg_cpa?: number;
  };
  
  // Количество кампаний в выборке
  sample_size: {
    campaigns_count: number;
    total_budget: number;
    total_impressions: number;
  };
  
  // Метаданные
  calculated_at: string;
  data_source: string;                  // 'internal', 'industry', 'vendor'
}

enum CampaignObjective {
  AWARENESS = 'awareness',
  CONSIDERATION = 'consideration',
  CONVERSIONS = 'conversions',
  TRAFFIC = 'traffic',
  ENGAGEMENT = 'engagement',
  APP_INSTALLS = 'app_installs',
  LEAD_GENERATION = 'lead_generation',
  SALES = 'sales'
}
```

---

### 6. Commercial Terms (Коммерческие условия)

**Детальные коммерческие условия работы с площадкой**

```typescript
interface CommercialTerms {
  id: string;
  platform_id: string;
  
  // Базовые условия
  terms: {
    contract_type: 'io' | 'msa' | 'direct';  // IO, MSA, прямой договор
    minimum_budget: number;             // Минимальный бюджет размещения
    minimum_duration?: number;          // Минимальная длительность (дни)
    billing_currency: 'RUB';
  };
  
  // Условия оплаты
  payment: {
    payment_terms: PaymentTerms[];
    prepayment_percent?: number;        // % предоплаты
    payment_due_days?: number;          // Оплата через N дней
    accepts_agency_model: boolean;      // Работает ли через агентства
    supports_credit_line: boolean;      // Кредитная линия
    credit_limit?: number;
  };
  
  // Агентские условия
  agency: {
    agency_discount_percent: number;    // % агентской скидки
    requires_agency_contract: boolean;
    min_monthly_spend?: number;         // Минимум в месяц для агентств
    volume_tiers?: Array<{
      min_monthly_spend: number;
      discount_percent: number;
    }>;
  };
  
  // Условия возврата и компенсаций
  refunds: {
    allows_refunds: boolean;
    refund_conditions: string;
    compensation_policy: string;        // Политика компенсаций
    sla?: {
      guaranteed_viewability?: number;  // Гарантированный viewability %
      guaranteed_delivery?: boolean;    // Гарантия доставки показов
      compensation_if_missed: string;   // Компенсация при недоборе
    };
  };
  
  // Документооборот
  documentation: {
    requires_io: boolean;               // Требуется ли IO
    io_template_url?: string;
    reporting_frequency: string[];      // ['daily', 'weekly', 'monthly']
    report_formats: string[];           // ['pdf', 'excel', 'api']
    acts_reconciliation: boolean;       // Акты сверки
  };
  
  // Поддержка и сервис
  support: {
    account_manager_included: boolean;
    dedicated_manager_threshold?: number; // Бюджет для выделенного менеджера
    support_channels: string[];         // ['email', 'phone', 'chat']
    support_hours: string;              // '24/7', '9-18 MSK'
    response_time_sla?: string;         // 'within 24h', 'within 1h'
  };
  
  // Дополнительные сервисы
  additional_services: {
    creative_production: boolean;       // Производство креативов
    campaign_strategy: boolean;         // Стратегическая помощь
    analytics_support: boolean;         // Аналитическая поддержка
    training: boolean;                  // Обучение
  };
  
  // Метаданные
  valid_from: string;
  valid_until?: string;
  last_negotiated: string;
  negotiated_by?: string;               // Кто договаривался
  notes?: string;
}

enum PaymentTerms {
  PREPAY_100 = 'prepay_100',           // 100% предоплата
  PREPAY_50 = 'prepay_50',             // 50% предоплата
  POSTPAY_7 = 'postpay_7',             // Постоплата 7 дней
  POSTPAY_14 = 'postpay_14',           // Постоплата 14 дней
  POSTPAY_30 = 'postpay_30',           // Постоплата 30 дней
  CREDIT_LINE = 'credit_line'          // Кредитная линия
}
```

---

### 7. Contacts (Контакты)

**Контактная информация по площадкам**

```typescript
interface PlatformContact {
  id: string;
  platform_id: string;
  
  // Тип контакта
  contact_type: ContactType;
  
  // Личная информация
  person: {
    first_name: string;
    last_name: string;
    position: string;                   // Должность
    department?: string;
    email: string;
    phone?: string;
    telegram?: string;
    whatsapp?: string;
  };
  
  // Зона ответственности
  responsibilities: {
    is_primary: boolean;                // Основной контакт
    handles: string[];                  // ['sales', 'support', 'billing']
    regions?: string[];                 // Географические зоны
    industries?: string[];              // Отрасли
  };
  
  // Коммуникация
  communication: {
    preferred_channel: 'email' | 'phone' | 'telegram';
    working_hours: string;              // '9:00-18:00 MSK'
    timezone: string;                   // 'Europe/Moscow'
    language: string[];                 // ['ru', 'en']
    response_time: string;              // 'within 24h'
  };
  
  // История взаимодействия
  interaction_history: Array<{
    date: string;
    type: 'call' | 'email' | 'meeting';
    subject: string;
    notes?: string;
    next_action?: string;
  }>;
  
  // Статус
  is_active: boolean;
  last_contacted: string;
  
  // Метаданные
  created_at: string;
  updated_at: string;
  added_by: string;                     // Кто добавил контакт
}

enum ContactType {
  ACCOUNT_MANAGER = 'account_manager',  // Аккаунт-менеджер
  SALES = 'sales',                      // Отдел продаж
  SUPPORT = 'support',                  // Техподдержка
  BILLING = 'billing',                  // Биллинг
  TECHNICAL = 'technical',              // Техническая поддержка
  CREATIVE = 'creative',                // Креатив (если помогают)
  EXECUTIVE = 'executive'               // Руководство
}
```

---

### 8. Creative Specifications (Технические требования к креативам)

```typescript
interface CreativeSpec {
  id: string;
  format_id: string;                    // Связь с форматом
  
  // Общие требования
  general: {
    file_formats: string[];             // ['jpg', 'png', 'gif', 'mp4']
    max_file_size_mb: number;
    animation_allowed: boolean;
    animation_max_duration?: number;    // Секунды
    loop_allowed: boolean;
  };
  
  // Изображения
  image?: {
    dimensions: Array<{
      width: number;
      height: number;
      required: boolean;                // Обязательный размер
    }>;
    aspect_ratios: string[];            // ['1:1', '4:5', '16:9']
    min_resolution_dpi: number;
    color_space: string[];              // ['RGB', 'CMYK']
    transparency_allowed: boolean;
  };
  
  // Видео
  video?: {
    codecs: string[];                   // ['h264', 'h265', 'vp9']
    containers: string[];               // ['mp4', 'mov']
    resolutions: string[];              // ['1920x1080', '1280x720']
    fps: number[];                      // [24, 30, 60]
    bitrate_kbps: {
      min?: number;
      max?: number;
      recommended: number;
    };
    audio_required: boolean;
    audio_codecs?: string[];            // ['aac', 'mp3']
  };
  
  // HTML5
  html5?: {
    supported: boolean;
    max_file_size_mb: number;
    allowed_technologies: string[];     // ['javascript', 'css3', 'svg']
    restricted_apis: string[];          // Запрещенные API
    clickthrough_required: boolean;
  };
  
  // Текстовые элементы (для native)
  text?: {
    title?: {
      max_length: number;
      allowed_chars?: string;           // Разрешенные символы
    };
    description?: {
      max_length: number;
      allowed_chars?: string;
    };
    cta_button?: {
      max_length: number;
      predefined_options?: string[];    // Преднастроенные опции
    };
  };
  
  // Контентные ограничения
  restrictions: {
    prohibited_content: string[];       // ['alcohol', 'gambling', ...]
    requires_disclaimer: boolean;
    age_restrictions?: string;          // '18+', '16+'
    brand_safety_requirements: string;
  };
  
  // Модерация
  moderation: {
    required: boolean;
    typical_review_time_hours: number;
    rejection_reasons: string[];        // Типичные причины отклонения
    appeal_process: string;
  };
}
```

---

## 🔗 СВЯЗИ МЕЖДУ СУЩНОСТЯМИ

```
Platform (1) ←→ (N) Format
Platform (1) ←→ (1) PlatformTargeting
Platform (1) ←→ (N) PlatformPricing
Platform (1) ←→ (N) PerformanceBenchmark
Platform (1) ←→ (1) CommercialTerms
Platform (1) ←→ (N) PlatformContact
Format (1) ←→ (1) CreativeSpec
Format (1) ←→ (N) PlatformPricing (специфичные для формата)
```

---

## 💾 ХРАНИЛИЩЕ ДАННЫХ

### Рекомендуемая структура:

**PostgreSQL (основная БД):**
- Таблицы для всех сущностей
- Связи через Foreign Keys
- Индексы на часто используемые поля

**JSON файлы (резервное хранилище / импорт):**
- Каждая сущность в отдельном JSON
- Легко редактировать и импортировать
- Версионирование через Git

**Vector Database (для поиска):**
- Эмбеддинги описаний площадок
- Семантический поиск площадок
- Рекомендации площадок на основе запроса

---

## 🔄 API ENDPOINTS (концептуальные)

```typescript
// Площадки
GET    /api/v1/platforms                // Список всех площадок
GET    /api/v1/platforms/:id            // Детали площадки
GET    /api/v1/platforms/search         // Поиск площадок
GET    /api/v1/platforms/:id/formats    // Форматы площадки

// Форматы
GET    /api/v1/formats                  // Все форматы
GET    /api/v1/formats/:id              // Детали формата
GET    /api/v1/formats/:id/specs        // Спецификации

// Таргетинг
GET    /api/v1/platforms/:id/targeting  // Возможности таргетинга
GET    /api/v1/targeting/options        // Все опции таргетинга

// Цены
GET    /api/v1/platforms/:id/pricing    // Цены площадки
GET    /api/v1/pricing/benchmarks       // Бенчмарк цены
POST   /api/v1/pricing/estimate         // Оценка стоимости

// Бенчмарки
GET    /api/v1/benchmarks                // Все бенчмарки
GET    /api/v1/benchmarks/filter        // Фильтр бенчмарков
GET    /api/v1/platforms/:id/benchmarks // Бенчмарки площадки

// Коммерческое
GET    /api/v1/platforms/:id/terms      // Коммерческие условия
GET    /api/v1/platforms/:id/contacts   // Контакты

// Поиск и рекомендации
POST   /api/v1/platforms/recommend      // Рекомендовать площадки
POST   /api/v1/platforms/semantic-search // Семантический поиск
```

---

**Версия:** 1.0  
**Дата:** 2025-10-24  
**Статус:** ✅ Готово к реализации

