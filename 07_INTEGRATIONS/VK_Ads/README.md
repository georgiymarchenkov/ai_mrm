---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: integration_spec
title: VK Ads API Integration
language: ru
industry: advertising
role_apply: [specialist, developer]
period: 2025-10
version: "1.0"
source_path: 07_INTEGRATIONS/VK_Ads/README.md
effective_date: 2025-10-24
visibility: internal
security_level: medium
tags: [integration, advertising, vk_ads]
---

# VK Ads API Integration

## Обзор

Интеграция с VK Ads (ВКонтакте Реклама) для автоматизации таргетированной рекламы в социальной сети ВКонтакте.

**API Version:** 5.131  
**Documentation:** https://dev.vk.com/ru/ads  
**Статус:** 🔄 В разработке (MVP)  
**Уровень интеграции:** Level 2 (Read + Write)

---

## Возможности

### MVP (Sprint 0-2)

#### ✅ Реализовано
- [ ] OAuth 2.0 аутентификация
- [ ] Получение списка кабинетов и кампаний
- [ ] Получение статистики

#### 🔄 В разработке
- [ ] Создание рекламных кампаний
- [ ] Создание объявлений (таргетированная реклама)
- [ ] Управление ставками
- [ ] Таргетинг (аудитории, интересы, демография)

#### 📋 Запланировано (Post-MVP)
- [ ] Ретаргетинг (пиксель, аудитории)
- [ ] Динамические объявления (каталог товаров)
- [ ] Stories Ads
- [ ] Lookalike аудитории
- [ ] Автоматическая оптимизация ставок

---

## Архитектура

```
VK_Ads/
├── README.md (этот файл)
├── api-client.ts                    # Основной API-клиент
├── auth-service.ts                  # OAuth 2.0 аутентификация
├── types.ts                         # TypeScript типы
├── mappers/
│   ├── campaign-mapper.ts           # Маппинг Campaign
│   ├── ad-mapper.ts                 # Маппинг объявлений
│   └── statistics-mapper.ts         # Маппинг статистики
├── services/
│   ├── accounts-service.ts          # Управление рекламными кабинетами
│   ├── campaigns-service.ts         # Управление кампаниями
│   ├── ads-service.ts               # Управление объявлениями
│   ├── targeting-service.ts         # Настройка таргетинга
│   ├── statistics-service.ts        # Получение статистики
│   └── sync-service.ts              # Синхронизация данных
└── tests/
    ├── api-client.spec.ts
    ├── campaigns-service.spec.ts
    └── e2e.spec.ts
```

---

## API Endpoints

### 1. Accounts (Рекламные кабинеты)

#### Получение списка кабинетов
```typescript
GET /api/v1/integrations/vk-ads/accounts

Query Parameters:
- client_id: string

Response:
{
  accounts: Array<{
    account_id: string,
    account_type: 'general' | 'agency',
    account_status: 'active' | 'banned',
    account_name: string,
    balance: number,                  // Текущий баланс (₽)
    currency: 'RUB',
    access_role: 'admin' | 'manager' | 'reports'
  }>
}
```

### 2. Campaigns

#### Получение списка кампаний
```typescript
GET /api/v1/integrations/vk-ads/campaigns

Query Parameters:
- client_id: string
- account_id: string
- status?: 'active' | 'paused' | 'archived'

Response:
{
  campaigns: Array<{
    id: string,                       // ID в VK Ads
    mrm_id: string,                   // ID в MRM AI
    account_id: string,
    name: string,
    type: 'normal' | 'vk_apps_managed' | 'mobile_apps',
    status: 'active' | 'paused' | 'archived',
    budget: {
      type: 'day' | 'all',
      limit: number,                  // Лимит бюджета
      spent: number                   // Потрачено
    },
    statistics: {
      impressions: number,
      clicks: number,
      ctr: number,
      spent: number,
      reach: number,
      conversions: number,
      cpa: number
    }
  }>,
  total: number
}
```

#### Создание кампании
```typescript
POST /api/v1/integrations/vk-ads/campaigns

Body:
{
  mrm_campaign_id: string,
  account_id: string,
  name: string,
  type: 'normal' | 'mobile_apps',     // Normal - обычная таргетированная реклама
  objective: 'traffic' | 'conversions' | 'reach' | 'mobile_app_installs',
  budget: {
    type: 'day' | 'all',
    limit: number,                    // Дневной или общий бюджет (₽)
    strategy: 'maximum_coverage' | 'optimal_price' | 'average_price',
    target_cpc?: number,              // Если strategy = average_price
    target_cpa?: number               // Для conversions objective
  },
  targeting: {
    geo: {
      type: 'country' | 'region' | 'city',
      ids: number[]                   // VK region IDs
    },
    age: {from: number, to: number},  // 14-80
    sex: 0 | 1 | 2,                   // 0 - все, 1 - женский, 2 - мужской
    interests: number[],              // VK interest category IDs
    behaviors: string[],              // Поведенческий таргетинг
    groups?: {
      include?: number[],             // Подписчики этих групп
      exclude?: number[]              // Исключить подписчиков
    },
    retargeting?: {
      pixel_id?: string,
      audience_ids?: string[]
    }
  },
  schedule: {
    start_date: string,
    end_date?: string,
    time_targeting?: {
      hours: number[],
      days_of_week: number[]
    }
  },
  tracking: {
    pixel_id?: string,
    utm_tags: {
      source: string,
      medium: string,
      campaign: string,
      content?: string
    }
  }
}

Response:
{
  campaign_id: string,
  mrm_campaign_id: string,
  status: 'DRAFT' | 'MODERATION' | 'ACTIVE',
  moderation: {
    status: 'pending' | 'approved' | 'rejected',
    reject_reason?: string
  }
}
```

### 3. Ads (Объявления)

#### Создание объявления
```typescript
POST /api/v1/integrations/vk-ads/ads

Body:
{
  campaign_id: string,                // VK campaign ID
  ad_format: 'image' | 'video' | 'carousel' | 'text_image',
  creative: {
    title: string,                    // До 33 символов
    link_title?: string,              // Текст кнопки (до 25 символов)
    description?: string,             // До 90 символов
    link_url: string,                 // Landing page
    image_url?: string,               // Для image/text_image (если нет video)
    video_id?: string,                // VK video ID (если video format)
    carousel_items?: Array<{          // Для carousel
      title: string,
      description: string,
      image_url: string,
      link_url: string
    }>
  },
  cpc?: number,                       // Цена за клик (₽), если не auto
  impressions_limit?: number,         // Ограничение показов
  status: 'active' | 'paused'
}

Response:
{
  ad_id: string,
  campaign_id: string,
  status: 'pending_moderation' | 'approved' | 'rejected',
  moderation_result: {
    status: 'pending' | 'approved' | 'rejected',
    reject_reason?: string
  }
}
```

### 4. Statistics

#### Получение статистики
```typescript
POST /api/v1/integrations/vk-ads/statistics

Body:
{
  account_id: string,
  ids_type: 'campaign' | 'ad',
  ids: string[],
  date_from: string,                  // YYYY-MM-DD
  date_to: string,
  period: 'day' | 'month' | 'overall',
  metrics: ('impressions' | 'clicks' | 'reach' | 'spent' | 'ctr' | 'cpc' | 'cpm' | 'conversions' | 'cpa')[]
}

Response:
{
  data: Array<{
    id: string,                       // Campaign or Ad ID
    date?: string,                    // Если period = day
    impressions: number,
    clicks: number,
    reach: number,                    // Уникальный охват
    spent: number,                    // Расход (₽)
    ctr: number,                      // %
    cpc: number,                      // ₽
    cpm: number,                      // ₽ за 1000 показов
    conversions: number,
    cpa: number                       // ₽
  }>,
  totals: {
    impressions: number,
    clicks: number,
    reach: number,
    spent: number,
    conversions: number
  }
}
```

---

## Аутентификация

### OAuth 2.0 Flow

VK использует OAuth 2.0 с некоторыми особенностями:

1. **Получение authorization URL:**
```typescript
GET /api/v1/integrations/vk-ads/auth/url?client_id=:clientId

Response:
{
  auth_url: "https://oauth.vk.com/authorize?client_id=XXX&scope=ads&response_type=code..."
}
```

**Требуемые scope:**
- `ads` - управление рекламой
- `stats` - статистика

2. **Callback и получение токена** (аналогично Yandex Direct)

---

## Data Mapping

### Campaign Status

| MRM AI | VK Ads |
|--------|--------|
| `draft` | `0` (stopped) |
| `active` | `1` (started) |
| `paused` | `0` (stopped) |
| `archived` | `2` (deleted) |

### Ad Status

| MRM AI | VK Ads |
|--------|--------|
| `pending_moderation` | `0` |
| `active` | `1` |
| `paused` | `2` |
| `archived` | `3` |

---

## Targeting

### География (Geo)

```typescript
// Примеры VK region IDs
{
  "1": "Москва",
  "2": "Санкт-Петербург",
  "10": "Волгоградская область",
  "-1": "Россия (вся страна)"
}
```

**API для получения списка регионов:**
```typescript
GET /api/v1/integrations/vk-ads/targeting/geo

Response:
{
  countries: Array<{id: number, title: string}>,
  regions: Array<{id: number, title: string, country_id: number}>,
  cities: Array<{id: number, title: string, region_id: number}>
}
```

### Интересы (Interests)

VK предоставляет ~1000 категорий интересов.

**API для получения категорий:**
```typescript
GET /api/v1/integrations/vk-ads/targeting/interests

Response:
{
  categories: Array<{
    id: number,
    name: string,
    parent_id?: number
  }>
}
```

Примеры:
- `1` - Автомобили
- `2` - Бизнес
- `17` - Финансы
- `19` - Технологии

### Retargeting

Создание аудитории ретаргетинга:
```typescript
POST /api/v1/integrations/vk-ads/retargeting/audiences

Body:
{
  account_id: string,
  name: string,
  pixel_id: string,
  rules: Array<{
    type: 'pixel_event',
    event: 'page_view' | 'add_to_cart' | 'purchase',
    timeframe: number              // Дней (1-180)
  }>
}

Response:
{
  audience_id: string,
  size: number,                    // Размер аудитории
  status: 'calculating' | 'ready'
}
```

---

## Rate Limiting

**VK Ads Limits:**
- 3 requests per second per token
- 100,000 requests per day

**Наша реализация:**
- Token bucket: 2.5 RPS (запас)
- Queue для батч-операций

---

## Error Handling

### Типичные ошибки

| Error Code | Значение | Действие |
|------------|----------|----------|
| 5 | User authorization failed | Refresh token или переавторизация |
| 100 | Invalid parameter | Валидация на стороне MRM AI |
| 600 | Permission denied | Проверка прав доступа к рекламному кабинету |
| 603 | Some ads were not created | Partial success - обработать успешные, логировать неуспешные |

---

## Синхронизация

### Cron Jobs:
- **Статистика:** Каждые 2 часа (VK обновляет статистику с задержкой)
- **Модерация:** Каждые 15 минут (для объявлений в модерации)
- **Баланс кабинетов:** Каждые 30 минут

---

## Roadmap

### Sprint 0-1 (MVP)
- ✅ OAuth authentication
- ✅ Get campaigns, ads
- ✅ Get statistics
- 🔄 Create campaigns
- 🔄 Create ads (image format)

### Sprint 2-3
- Video ads
- Carousel ads
- Retargeting (pixel + audiences)
- Lookalike audiences

### Sprint 4+
- Stories Ads
- Dynamic ads (product catalog)
- AI-powered creative optimization

---

## Полезные ссылки

- [VK Ads API Docs](https://dev.vk.com/ru/ads)
- [OAuth Guide](https://dev.vk.com/ru/api/access-token/getting-started)
- [Targeting Options](https://dev.vk.com/ru/reference/objects/ad-targeting)
- [Error Codes](https://dev.vk.com/ru/reference/errors)

---

**Версия:** 1.0  
**Дата:** 23.10.2025  
**Разработчик:** MRM AI Development Team

