---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: integration_spec
title: Yandex Direct API Integration
language: ru
industry: advertising
role_apply: [specialist, developer]
period: 2025-10
version: "1.0"
source_path: 07_INTEGRATIONS/Yandex_Direct/README.md
effective_date: 2025-10-24
visibility: internal
security_level: medium
tags: [integration, advertising, yandex_direct]
---

# Yandex Direct API Integration

## Обзор

Интеграция с Яндекс.Директ для автоматизации создания, управления и мониторинга рекламных кампаний.

**API Version:** v5  
**Documentation:** https://yandex.ru/dev/direct/doc/start/intro.html  
**Статус:** 🔄 В разработке (MVP)  
**Уровень интеграции:** Level 2 (Read + Write)

---

## Возможности

### MVP (Sprint 0-2)

#### ✅ Реализовано
- [ ] OAuth 2.0 аутентификация
- [ ] Получение списка кампаний
- [ ] Получение статистики по кампаниям

#### 🔄 В разработке
- [ ] Создание поисковых кампаний
- [ ] Создание РСЯ кампаний
- [ ] Управление ставками
- [ ] Получение прогнозов (Forecast)

#### 📋 Запланировано (Post-MVP)
- [ ] Автоматическая оптимизация ставок
- [ ] Управление креативами (баннеры, объявления)
- [ ] A/B тестирование объявлений
- [ ] Smart Bidding strategies
- [ ] Keyword research и suggestions

---

## Архитектура

### Компоненты

```
Yandex_Direct/
├── README.md (этот файл)
├── api-client.ts                    # Основной API-клиент
├── auth-service.ts                  # OAuth 2.0 аутентификация
├── types.ts                         # TypeScript типы для API
├── mappers/
│   ├── campaign-mapper.ts           # Маппинг Campaign (MRM AI ↔ Yandex)
│   ├── ad-mapper.ts                 # Маппинг объявлений
│   └── statistics-mapper.ts         # Маппинг статистики
├── services/
│   ├── campaigns-service.ts         # Управление кампаниями
│   ├── statistics-service.ts        # Получение статистики
│   ├── forecast-service.ts          # Прогнозы
│   └── sync-service.ts              # Синхронизация данных
├── dto/
│   ├── create-campaign.dto.ts       # DTO для создания кампании
│   └── update-campaign.dto.ts       # DTO для обновления кампании
└── tests/
    ├── api-client.spec.ts
    ├── campaigns-service.spec.ts
    └── e2e.spec.ts
```

---

## API Endpoints

### 1. Campaigns

#### Получение списка кампаний
```typescript
GET /api/v1/integrations/yandex-direct/campaigns

Query Parameters:
- client_id: string (ID клиента в MRM AI)
- status?: 'active' | 'paused' | 'archived'
- limit?: number (default: 100)
- offset?: number (default: 0)

Response:
{
  campaigns: Array<{
    id: string,                 // ID в Yandex Direct
    mrm_id: string,             // ID в MRM AI
    name: string,
    type: 'TEXT_CAMPAIGN' | 'DYNAMIC_TEXT_CAMPAIGN' | 'MOBILE_APP_CAMPAIGN',
    status: 'active' | 'paused' | 'archived',
    budget: {
      amount: number,           // Дневной бюджет
      spent: number,            // Потрачено за сегодня
      currency: 'RUB'
    },
    dates: {
      start: string,            // ISO 8601
      end: string | null
    },
    statistics: {
      impressions: number,
      clicks: number,
      ctr: number,
      cost: number,
      conversions: number,
      cpa: number
    }
  }>,
  total: number,
  has_more: boolean
}
```

#### Создание кампании
```typescript
POST /api/v1/integrations/yandex-direct/campaigns

Body:
{
  mrm_campaign_id: string,           // ID кампании в MRM AI
  name: string,
  type: 'SEARCH' | 'NETWORK',        // Поиск или РСЯ
  budget: {
    daily_limit: number,             // Дневной бюджет (₽)
    strategy: 'AVERAGE_CPC' | 'AVERAGE_CPA' | 'HIGHEST_POSITION',
    average_cpc?: number,            // Средняя ставка (если strategy = AVERAGE_CPC)
    average_cpa?: number             // Средний CPA (если strategy = AVERAGE_CPA)
  },
  targeting: {
    geo: number[],                   // Region IDs (например, [1] для Москвы)
    age: {min: number, max: number}, // 18-99
    gender: 'ALL' | 'MALE' | 'FEMALE',
    devices: ('DESKTOP' | 'MOBILE' | 'TABLET')[]
  },
  schedule: {
    start_date: string,              // ISO 8601
    end_date?: string,               // Если null - бессрочная
    time_targeting?: {
      hours: number[],               // 0-23
      days_of_week: number[]         // 1-7 (пн-вс)
    }
  },
  ads: Array<{
    title1: string,                  // До 35 символов
    title2?: string,                 // До 30 символов
    text: string,                    // До 81 символа
    url: string,                     // Landing page
    display_url?: string,            // Отображаемая ссылка
    mobile_url?: string              // Мобильная ссылка
  }>,
  keywords?: Array<{
    text: string,                    // "купить телефон"
    bid: number                      // Ставка в ₽
  }>,
  tracking: {
    counter_id?: number,             // Yandex Metrika counter ID
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
  campaign_id: string,               // ID созданной кампании в Yandex Direct
  mrm_campaign_id: string,
  status: 'DRAFT' | 'MODERATION' | 'ACTIVE',
  moderation_status: {
    status: 'NEW' | 'PENDING' | 'YES' | 'NO',
    message?: string
  }
}
```

#### Обновление кампании
```typescript
PATCH /api/v1/integrations/yandex-direct/campaigns/:campaignId

Body: (partial update)
{
  name?: string,
  status?: 'ACTIVE' | 'PAUSED',
  budget?: {
    daily_limit?: number,
    strategy?: 'AVERAGE_CPC' | 'AVERAGE_CPA'
  },
  schedule?: {
    end_date?: string
  }
}

Response:
{
  campaign_id: string,
  status: 'success',
  updated_at: string
}
```

#### Удаление кампании
```typescript
DELETE /api/v1/integrations/yandex-direct/campaigns/:campaignId

Response:
{
  campaign_id: string,
  status: 'archived',
  archived_at: string
}
```

---

### 2. Statistics

#### Получение статистики
```typescript
POST /api/v1/integrations/yandex-direct/statistics

Body:
{
  campaign_ids?: string[],           // Если не указано - все кампании клиента
  date_from: string,                 // ISO 8601
  date_to: string,
  group_by: ('date' | 'campaign' | 'ad_group' | 'ad' | 'keyword')[],
  metrics: ('impressions' | 'clicks' | 'ctr' | 'cost' | 'cpc' | 'conversions' | 'cpa')[],
  order_by?: {
    field: string,
    direction: 'ASC' | 'DESC'
  }
}

Response:
{
  data: Array<{
    date?: string,                   // Если group_by содержит 'date'
    campaign_id?: string,            // Если group_by содержит 'campaign'
    campaign_name?: string,
    ad_group_id?: string,
    ad_id?: string,
    keyword?: string,
    impressions: number,
    clicks: number,
    ctr: number,                     // %
    cost: number,                    // ₽
    cpc: number,                     // ₽
    conversions: number,
    cpa: number                      // ₽
  }>,
  totals: {
    impressions: number,
    clicks: number,
    cost: number,
    conversions: number
  },
  summary: {
    average_ctr: number,
    average_cpc: number,
    average_cpa: number
  }
}
```

---

### 3. Forecast

#### Получение прогноза
```typescript
POST /api/v1/integrations/yandex-direct/forecast

Body:
{
  keywords: string[],                // Список ключевых слов
  geo: number[],                     // Region IDs
  budget: number,                    // Дневной бюджет (₽)
  currency: 'RUB'
}

Response:
{
  forecast: {
    total_shows: {min: number, max: number},
    total_clicks: {min: number, max: number},
    total_cost: {min: number, max: number},
    average_cpc: number,
    average_ctr: number
  },
  by_keyword: Array<{
    keyword: string,
    shows: {min: number, max: number},
    clicks: {min: number, max: number},
    cost: {min: number, max: number},
    recommended_bid: number
  }>
}
```

---

## Аутентификация

### OAuth 2.0 Flow

1. **Получение authorization URL:**
```typescript
GET /api/v1/integrations/yandex-direct/auth/url?client_id=:clientId

Response:
{
  auth_url: "https://oauth.yandex.ru/authorize?response_type=code&client_id=XXX..."
}
```

2. **Пользователь авторизуется** и Yandex редиректит на callback URL с `code`

3. **Обмен code на токены:**
```typescript
POST /api/v1/integrations/yandex-direct/auth/callback

Body:
{
  code: string,
  client_id: string  // ID клиента в MRM AI
}

Response:
{
  status: 'success',
  client_id: string,
  expires_at: string  // Когда истекает access token
}
```

4. **Автоматическое обновление токена** происходит прозрачно при истечении access token

---

## Data Mapping

### Campaign Status Mapping

| MRM AI Status | Yandex Direct Status |
|---------------|---------------------|
| `draft` | `DRAFT` |
| `active` | `ACTIVE` |
| `paused` | `SUSPENDED` |
| `archived` | `ARCHIVED` |

### Campaign Type Mapping

| MRM AI Type | Yandex Direct Type |
|-------------|-------------------|
| `search` | `TEXT_CAMPAIGN` |
| `network` | `DYNAMIC_TEXT_CAMPAIGN` |
| `mobile_app` | `MOBILE_APP_CAMPAIGN` |

---

## Rate Limiting

**Yandex Direct Limits:**
- 10 requests per second per token
- 100,000 requests per day per token

**Наша реализация:**
- Token bucket algorithm: 8 RPS (запас 20%)
- Automatic retry при 429 (Too Many Requests) с exponential backoff

```typescript
// Пример использования rate limiter
const rateLimiter = new YandexDirectRateLimiter({
  tokensPerSecond: 8,
  maxBurst: 10
});

await rateLimiter.acquire(); // Ждет, если лимит исчерпан
const result = await yandexDirectAPI.getCampaigns();
```

---

## Error Handling

### Типичные ошибки

| Error Code | Значение | Действие MRM AI |
|------------|----------|-----------------|
| 53 | Campaign limit exceeded | Уведомить клиента, предложить удалить старые кампании |
| 54 | Invalid campaign params | Валидация на стороне MRM AI перед отправкой |
| 201 | Authorization error | Refresh token, если не помогло - уведомить клиента о необходимости повторной авторизации |
| 1000 | Internal Yandex error | Retry через 30 секунд, если не помогло - логировать и уведомить admins |

### Пример обработки ошибки

```typescript
try {
  const campaign = await yandexDirectAPI.createCampaign(campaignData);
} catch (error) {
  if (error.code === 53) {
    // Campaign limit exceeded
    await notificationService.send({
      to: client.email,
      subject: 'Достигнут лимит кампаний в Яндекс.Директ',
      body: 'Пожалуйста, удалите неактуальные кампании или обратитесь в поддержку Яндекса для увеличения лимита.'
    });
    throw new BusinessLogicError('Campaign limit exceeded');
  }
  
  if (error.code === 201) {
    // Auth error - try to refresh token
    await authService.refreshToken(client.id, 'yandex_direct');
    // Retry
    return yandexDirectAPI.createCampaign(campaignData);
  }
  
  // Unknown error - log and rethrow
  logger.error('Yandex Direct API error', {error, campaignData});
  throw error;
}
```

---

## Синхронизация данных

### Автоматическая синхронизация

**Cron Jobs:**
- **Статистика кампаний:** Каждые 1 час (для активных кампаний)
- **Статус кампаний:** Каждые 15 минут (для кампаний в модерации)
- **Бюджеты:** Каждые 30 минут (для отслеживания расхода)

```typescript
// Пример cron job для синхронизации статистики
@Cron('0 * * * *') // Каждый час
async syncCampaignStatistics() {
  const activeCampaigns = await db.campaigns.findMany({
    where: {
      platform: 'yandex_direct',
      status: 'active'
    }
  });
  
  for (const campaign of activeCampaigns) {
    try {
      const stats = await yandexDirectAPI.getStatistics({
        campaign_ids: [campaign.external_id],
        date_from: moment().startOf('day').toISOString(),
        date_to: moment().endOf('day').toISOString()
      });
      
      await db.campaignStatistics.upsert({
        where: {campaign_id: campaign.id, date: today},
        update: stats,
        create: {campaign_id: campaign.id, date: today, ...stats}
      });
      
      logger.info('Synced statistics for campaign', {campaignId: campaign.id});
    } catch (error) {
      logger.error('Failed to sync statistics', {campaignId: campaign.id, error});
    }
  }
}
```

### Manual Sync

```typescript
POST /api/v1/integrations/yandex-direct/sync

Body:
{
  client_id: string,
  sync_type: 'campaigns' | 'statistics' | 'all',
  date_range?: {
    from: string,
    to: string
  }
}

Response:
{
  status: 'success',
  sync_id: string,  // Для отслеживания прогресса
  campaigns_synced: number,
  statistics_synced: number,
  errors: Array<{campaign_id: string, error: string}>
}
```

---

## Testing

### Unit Tests

```bash
npm test src/integrations/yandex-direct
```

### Integration Tests (with Mock API)

```bash
npm test:integration src/integrations/yandex-direct
```

### E2E Tests (with Sandbox Account)

Yandex Direct предоставляет sandbox для тестирования:
- Sandbox URL: https://api-sandbox.direct.yandex.ru/json/v5/
- Документация: https://yandex.ru/dev/direct/doc/dg/concepts/sandbox.html

```bash
npm test:e2e src/integrations/yandex-direct
```

---

## Мониторинг

### Метрики

Dashboard: `/admin/integrations/yandex-direct/metrics`

- **API Calls Rate:** Количество вызовов API в минуту
- **Success Rate:** % успешных запросов (target: >99%)
- **Error Rate:** % ошибочных запросов с разбивкой по типам
- **Sync Lag:** Задержка синхронизации статистики (target: <10 минут)
- **Active Campaigns:** Количество активных кампаний
- **Daily Spend:** Общий расход за день по всем кампаниям

### Alerts

- **Error Rate > 5%** за последние 5 минут → Notify DevOps
- **Sync Lag > 30 минут** → Notify DevOps
- **Auth Errors** → Notify Account Manager для переавторизации
- **Rate Limit Reached** → Notify DevOps, review usage patterns

---

## Roadmap

### Sprint 0-1 (MVP)
- ✅ OAuth 2.0 authentication
- ✅ Get campaigns (read-only)
- ✅ Get statistics (read-only)
- 🔄 Create search campaigns
- 🔄 Get forecast

### Sprint 2-3
- Update campaigns (status, budget, bids)
- Manage ads (create, update, delete)
- Keyword research
- Automatic statistics sync (cron)

### Sprint 4+
- Smart Bidding integration
- A/B testing framework
- Performance optimization recommendations (AI-powered)
- Batch operations (bulk create/update)

---

## Полезные ссылки

- [Yandex Direct API v5 Docs](https://yandex.ru/dev/direct/doc/start/intro.html)
- [OAuth 2.0 Guide](https://yandex.ru/dev/id/doc/ru/codes/code-url)
- [Campaign Types](https://yandex.ru/dev/direct/doc/ref-v5/campaigns/CampaignTypeEnum.html)
- [Error Codes](https://yandex.ru/dev/direct/doc/ref-v5/errors/error-codes.html)
- [Sandbox](https://yandex.ru/dev/direct/doc/dg/concepts/sandbox.html)

---

**Версия:** 1.0  
**Дата:** 23.10.2025  
**Разработчик:** MRM AI Development Team

