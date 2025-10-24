---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: integration_spec
title: Yandex Metrika API Integration
language: ru
industry: advertising
role_apply: [specialist, developer]
period: 2025-10
version: "1.0"
source_path: 07_INTEGRATIONS/Yandex_Metrika/README.md
effective_date: 2025-10-24
visibility: internal
security_level: medium
tags: [integration, analytics, yandex_metrika]
---

# Yandex Metrika API Integration

## Обзор

Интеграция с Яндекс.Метрикой для получения данных о поведении пользователей на сайте, конверсиях и атрибуции рекламных кампаний.

**API Version:** Management API v1, Reporting API v1  
**Documentation:** https://yandex.ru/dev/metrika/doc/api2/intro.html  
**Статус:** 🔄 В разработке (MVP)  
**Уровень интеграции:** Level 1 (Read-Only)

---

## Возможности

### MVP (Sprint 0-2)

#### ✅ Реализовано
- [ ] OAuth 2.0 аутентификация
- [ ] Получение списка счетчиков
- [ ] Получение базовой статистики (визиты, просмотры, отказы)

#### 🔄 В разработке
- [ ] Получение конверсий (цели)
- [ ] Атрибуция источников трафика (UTM)
- [ ] E-commerce данные
- [ ] Воронки (Funnels)

#### 📋 Запланировано (Post-MVP)
- [ ] Вебвизор (Session Replay)
- [ ] Карты кликов
- [ ] Сегментация пользователей
- [ ] Cohort Analysis
- [ ] User Explorer (детали по отдельным пользователям)

---

## Архитектура

```
Yandex_Metrika/
├── README.md (этот файл)
├── api-client.ts                    # Основной API-клиент
├── auth-service.ts                  # OAuth 2.0
├── types.ts                         # TypeScript типы
├── mappers/
│   └── statistics-mapper.ts         # Маппинг статистики
├── services/
│   ├── counters-service.ts          # Управление счетчиками
│   ├── reports-service.ts           # Reporting API (статистика)
│   ├── conversions-service.ts       # Конверсии (цели)
│   ├── attribution-service.ts       # Атрибуция источников
│   └── sync-service.ts              # Синхронизация
└── tests/
    ├── api-client.spec.ts
    └── reports-service.spec.ts
```

---

## API Endpoints

### 1. Counters (Счетчики)

#### Получение списка счетчиков
```typescript
GET /api/v1/integrations/yandex-metrika/counters

Query Parameters:
- client_id: string

Response:
{
  counters: Array<{
    id: number,                       // Counter ID
    name: string,
    site: string,                     // example.com
    status: 'Active' | 'Deleted',
    create_time: string,
    timezone: string,
    goals: Array<{
      id: number,
      name: string,
      type: 'url' | 'action' | 'step',
      conditions: any[]
    }>
  }>
}
```

### 2. Reports (Статистика)

#### Получение общей статистики
```typescript
POST /api/v1/integrations/yandex-metrika/reports/general

Body:
{
  counter_id: number,
  date_from: string,                  // YYYY-MM-DD
  date_to: string,
  metrics: ('visits' | 'pageviews' | 'users' | 'bounceRate' | 'pageDepth' | 'avgVisitDurationSeconds')[],
  dimensions?: ('date' | 'ym:s:startURL' | 'ym:s:searchPhrase' | 'ym:s:UTMSource' | 'ym:s:UTMMedium' | 'ym:s:UTMCampaign')[],
  filters?: string,                   // API v1 filter expression
  sort?: string,                      // -ym:s:visits (сортировка по визитам, DESC)
  limit?: number,                     // Default: 100
  offset?: number
}

Response:
{
  data: Array<{
    dimensions: {
      date?: string,
      utm_source?: string,
      utm_medium?: string,
      utm_campaign?: string
    },
    metrics: {
      visits: number,
      pageviews: number,
      users: number,
      bounce_rate: number,            // %
      page_depth: number,             // Страниц за визит
      avg_visit_duration: number      // Секунды
    }
  }>,
  totals: {
    visits: number,
    pageviews: number,
    users: number
  },
  summary: {
    avg_bounce_rate: number,
    avg_page_depth: number,
    avg_visit_duration: number
  }
}
```

#### Получение конверсий (целей)
```typescript
POST /api/v1/integrations/yandex-metrika/reports/conversions

Body:
{
  counter_id: number,
  date_from: string,
  date_to: string,
  goal_ids: number[],                 // IDs целей (если не указано - все цели)
  dimensions?: ('date' | 'ym:s:UTMSource' | 'ym:s:UTMCampaign')[]
}

Response:
{
  data: Array<{
    dimensions: {
      date?: string,
      utm_source?: string,
      utm_campaign?: string
    },
    goals: Array<{
      goal_id: number,
      goal_name: string,
      goal_reaches: number,           // Достижений цели
      conversion_rate: number,        // % от визитов
      goal_value: number              // Ценность цели (если настроена)
    }>
  }>,
  totals: {
    goal_reaches: number,
    conversion_rate: number
  }
}
```

#### Атрибуция источников трафика
```typescript
POST /api/v1/integrations/yandex-metrika/reports/attribution

Body:
{
  counter_id: number,
  date_from: string,
  date_to: string,
  attribution_model: 'last_click' | 'first_click' | 'linear' | 'last_yandex_click',
  goal_id?: number                    // Для атрибуции конверсий
}

Response:
{
  data: Array<{
    source: string,                   // utm_source
    medium: string,                   // utm_medium
    campaign: string,                 // utm_campaign
    visits: number,
    conversions: number,
    attributed_conversions: number,   // С учетом модели атрибуции
    revenue?: number                  // Если E-commerce настроен
  }>,
  attribution_summary: {
    direct_conversions: number,       // Прямые конверсии (без мультитач)
    assisted_conversions: number,     // Ассистирующие конверсии
    multi_touch_conversions: number   // Конверсии с несколькими касаниями
  }
}
```

#### E-commerce данные
```typescript
POST /api/v1/integrations/yandex-metrika/reports/ecommerce

Body:
{
  counter_id: number,
  date_from: string,
  date_to: string,
  dimensions?: ('ym:s:productName' | 'ym:s:productCategory' | 'ym:s:UTMCampaign')[]
}

Response:
{
  data: Array<{
    dimensions: {
      product_name?: string,
      product_category?: string,
      utm_campaign?: string
    },
    metrics: {
      product_impressions: number,
      product_clicks: number,
      product_adds_to_cart: number,
      product_removes_from_cart: number,
      product_purchases: number,
      revenue: number                 // ₽
    }
  }>,
  totals: {
    revenue: number,
    transactions: number,
    average_order_value: number
  }
}
```

---

## Аутентификация

### OAuth 2.0

Аналогично Yandex Direct:
1. Authorization URL
2. Callback с code
3. Exchange code → tokens
4. Auto-refresh

**Требуемые scope:**
- `metrika:read` - чтение статистики
- `metrika:write` - управление счетчиками (если нужно)

---

## Data Mapping

### Metrics Mapping

| MRM AI Metric | Yandex Metrika Dimension/Metric |
|---------------|--------------------------------|
| `visits` | `ym:s:visits` |
| `users` | `ym:s:users` |
| `pageviews` | `ym:s:pageviews` |
| `bounce_rate` | `ym:s:bounceRate` |
| `conversion_rate` | `ym:s:goal<GOAL_ID>conversionRate` |
| `utm_source` | `ym:s:UTMSource` |
| `utm_medium` | `ym:s:UTMMedium` |
| `utm_campaign` | `ym:s:UTMCampaign` |

### Attribution Models

| Model | Описание |
|-------|----------|
| `last_click` | Вся ценность конверсии — последнему клику |
| `first_click` | Вся ценность — первому касанию |
| `linear` | Равномерно распределяется между всеми касаниями |
| `last_yandex_click` | Последний клик из Яндекс-рекламы (по умолчанию в Яндексе) |

---

## Filters

Яндекс.Метрика использует специальный синтаксис для фильтров:

```typescript
// Пример: Только визиты из Москвы с глубиной просмотра >3
filters: "ym:s:regionCity=='Москва' AND ym:s:pageDepth>3"

// Только визиты по UTM source = yandex или google
filters: "ym:s:UTMSource=~'yandex|google'"

// Исключить ботов
filters: "ym:s:isRobot=='No'"
```

**Builder для фильтров в MRM AI:**
```typescript
const filterBuilder = new MetrikaFilterBuilder();
filterBuilder
  .where('regionCity', '==', 'Москва')
  .and('pageDepth', '>', 3)
  .build();
// Output: "ym:s:regionCity=='Москва' AND ym:s:pageDepth>3"
```

---

## Rate Limiting

**Yandex Metrika Limits:**
- 5 requests per second per token
- Unlimited requests per day (но рекомендуется кэширование)

**Наша реализация:**
- Token bucket: 4 RPS
- Кэширование отчетов на 15 минут (для часто запрашиваемых данных)

---

## Синхронизация

### Cron Jobs:
- **Базовая статистика:** Каждые 30 минут
- **Конверсии:** Каждый час
- **E-commerce данные:** Каждые 2 часа
- **Атрибуция:** Ежедневно (в 02:00 UTC)

**Примечание:** Яндекс.Метрика имеет задержку обновления данных:
- Real-time данные: задержка ~15-30 минут
- Полные данные: задержка до 24 часов

---

## Error Handling

### Типичные ошибки

| Error Code | Значение | Действие |
|------------|----------|----------|
| 400 | Invalid query | Валидация фильтров/метрик на стороне MRM AI |
| 403 | No access to counter | Проверить права доступа, уведомить клиента |
| 429 | Rate limit | Retry с backoff |
| 503 | Service unavailable | Retry через 1 минуту |

---

## Интеграция с рекламными платформами

### Cross-Platform Attribution

Совмещение данных из Yandex Direct, VK Ads и Yandex Metrika для полной атрибуции:

```typescript
POST /api/v1/analytics/cross-platform-attribution

Body:
{
  client_id: string,
  date_from: string,
  date_to: string,
  platforms: ('yandex_direct' | 'vk_ads' | 'google_ads')[],
  metrika_counter_id: number,
  attribution_model: 'last_click' | 'linear'
}

Response:
{
  attribution: Array<{
    platform: string,
    campaign_id: string,
    campaign_name: string,
    spent: number,                    // Из рекламной платформы
    clicks: number,                   // Из рекламной платформы
    metrika_visits: number,           // Из Яндекс.Метрики
    metrika_conversions: number,      // Из Яндекс.Метрики
    attributed_conversions: number,   // С учетом модели атрибуции
    cpa: number,                      // spent / attributed_conversions
    romi: number                      // (revenue - spent) / spent
  }>,
  summary: {
    total_spent: number,
    total_conversions: number,
    average_cpa: number,
    total_romi: number
  }
}
```

---

## Use Cases

### 1. Dashboard для клиента
Объединение статистики из Yandex Direct (расход, клики) + Yandex Metrika (конверсии, поведение):

```
Campaign: "FinTech App Launch"
- Spent: 3,930,000 ₽ (Direct + VK)
- Clicks: 315,000 (Direct + VK)
- Visits: 280,000 (Metrika - после фильтрации ботов)
- Conversions: 12,370 (Metrika - goal "App Install")
- CPA: 318 ₽
- Bounce Rate: 32% (Metrika)
- Avg Session Duration: 3m 45s (Metrika)
```

### 2. Автоматическая оптимизация
AI-ассистент анализирует данные Metrika и рекомендует:
- Отключить кампании с high bounce rate
- Увеличить ставки на source/medium с высоким CR
- Добавить negative keywords для нецелевого трафика

### 3. A/B тестирование лендингов
Сравнение конверсий между разными лендингами:
```typescript
// Landing A: /landing-simple
// Landing B: /landing-detailed

// Yandex Metrika покажет:
Landing A: 5,000 visits, 3.2% CR
Landing B: 5,000 visits, 4.5% CR
// Вывод: Landing B на 40% эффективнее!
```

---

## Roadmap

### Sprint 0-1 (MVP)
- ✅ OAuth authentication
- ✅ Get counters
- ✅ General statistics (visits, pageviews, bounce rate)
- 🔄 Conversions (goals)
- 🔄 Attribution (basic)

### Sprint 2-3
- E-commerce integration
- Funnels (воронки конверсий)
- Cross-platform attribution (Direct + VK + Metrika)

### Sprint 4+
- Cohort analysis
- User Explorer (детальная информация по пользователям)
- Heatmaps & Session Replay integration
- AI-powered insights (anomaly detection, recommendations)

---

## Полезные ссылки

- [Yandex Metrika API Docs](https://yandex.ru/dev/metrika/doc/api2/intro.html)
- [Reporting API Reference](https://yandex.ru/dev/metrika/doc/api2/api_v1/intro.html)
- [Dimensions & Metrics](https://yandex.ru/dev/metrika/doc/api2/api_v1/attributes.html)
- [OAuth Guide](https://yandex.ru/dev/id/doc/ru/)

---

**Версия:** 1.0  
**Дата:** 23.10.2025  
**Разработчик:** MRM AI Development Team

