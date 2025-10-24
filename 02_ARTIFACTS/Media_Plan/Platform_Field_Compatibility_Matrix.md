---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: specification
title: Platform Field Compatibility Matrix - Матрица совместимости полей по платформам
language: ru
industry: advertising
role_apply: [specialist, analyst, developer]
period: 2025-10
version: "1.0"
source_path: 02_ARTIFACTS/Media_Plan/Platform_Field_Compatibility_Matrix.md
effective_date: 2025-10-24
visibility: internal
security_level: medium
tags: [media_plan, platforms, compatibility, data_structure, metrics]
synonyms: [совместимость, метрики, платформы, поля]
related_docs:
  - 02_ARTIFACTS/Media_Plan/Data_Structure.md
  - 04_PLATFORMS/_Platforms_Overview.md
  - 07_INTEGRATIONS/README.md
---

# Platform Field Compatibility Matrix
## Матрица совместимости полей медиаплана с рекламными платформами

→ [Media Plan Overview](./Overview.md) | [Data Structure](./Data_Structure.md) | [Platforms](../../04_PLATFORMS/_Platforms_Overview.md)

---

## 🎯 Назначение

Этот документ определяет, **какие поля медиаплана доступны для каждого типа рекламного инструмента**.

**Используется для:**
- Разработка схемы БД (conditional fields)
- API design (platform-specific endpoints)
- UI forms (показывать только релевантные поля)
- Migration Assistant (парсинг разных структур)
- Report Generator (доступные метрики)
- Validation rules (обязательность полей)

---

## 📊 Compatibility Matrix

### Legend:
- ✅ `+` - **Поле доступно** (можно заполнить и получить данные)
- ❌ `-` - **Поле недоступно** (не применимо для этого типа инструмента)

---

## 🗂️ Основные параметры кампании

| Поле / Инструмент | Контекстная реклама | Медийная реклама | Таргет | Программатик | Мобайл | Еком | Инфлюенс | DOOH |
|-------------------|---------------------|------------------|--------|--------------|--------|------|----------|------|
| **Ссылка на площадку / Адрес** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Тип** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Кампания** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Гео** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **Описание** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Устройства** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **Формат** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Таргетинги / тематика площадки** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |

### Примечания:
- **Гео:** DOOH привязан к физическому адресу (фиксированный), а не к гео-таргетингу
- **Устройства:** DOOH - физические экраны, концепция "устройств" неприменима
- **Таргетинги:** DOOH основан на локации, не на аудиторных сегментах

---

## 👥 Аудитория и охват

| Поле / Инструмент | Контекстная реклама | Медийная реклама | Таргет | Программатик | Мобайл | Еком | Инфлюенс | DOOH |
|-------------------|---------------------|------------------|--------|--------------|--------|------|----------|------|
| **Кол-во подписчиков** | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| **Дата выхода поста** | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Клики** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **Показы** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Просмотры** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **Прочтения** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **Вовлеченность** (лайки, клики, комментарии) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **ER REACH (ERR)** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **Охват (OTS)** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **GRP** | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| **Частота прогноз** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

### Примечания:
- **Подписчики:** Специфично для Influencer marketing (размер аудитории блогера)
- **Дата выхода поста:** Только для Influencer (публикация у блогера)
- **Клики, Просмотры, Прочтения, Вовлеченность:** Цифровые метрики, недоступны для DOOH
- **GRP (Gross Rating Point):** Традиционная метрика для offline (DOOH, TV, Radio)
- **Частота прогноз:** Доступна для всех (можно моделировать)

---

## 💰 Стоимостные метрики

| Поле / Инструмент | Контекстная реклама | Медийная реклама | Таргет | Программатик | Мобайл | Еком | Инфлюенс | DOOH |
|-------------------|---------------------|------------------|--------|--------------|--------|------|----------|------|
| **Емкость площадки** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **VTR, %** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **CTR, %** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **CPM** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **CPC** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **CPE** (цена за целевое действие) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **CPV** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **CPT** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **SOV, %** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **CR лиды** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **Лиды** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **CPL** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **CR продажа** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **Продажи** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **CPA/CPS** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |

### Примечания:
- **Емкость площадки:** DOOH фиксированная (количество экранов × время)
- **VTR, CTR:** Interaction metrics, недоступны для DOOH (нет кликов)
- **CPM:** Доступен везде (универсальная метрика "за 1000 показов")
- **CPC, CPE, CPT:** Action-based metrics, не применимы к DOOH
- **CPV (Cost Per View):** Для DOOH интерпретируется как "cost per impression"
- **SOV, CR, Лиды, CPL, Продажи, CPA/CPS:** Performance metrics, нужен attribution tracking (недоступен для DOOH без спец. технологий)

---

## 📋 Подробности по категориям инструментов

### 1. Контекстная реклама (Яндекс Директ - primary, Google Ads - secondary)

**Особенности:**
- Полный набор performance метрик (CTR, CPC, CR, CPA)
- Keyword-based targeting
- Search + Display network
- Auction-based pricing

**Ключевые метрики:**
- CTR (Click-Through Rate) - primary metric
- CPC (Cost Per Click) - pricing model
- Conversion metrics (leads, sales)
- Quality Score / CTR forecast

**Data sources:**
- Яндекс Директ API (основной)
- Яндекс Метрика (для конверсий)
- Google Ads API (опционально)
- Google Analytics (for conversions)

---

### 2. Медийная реклама (Display, Banner, Video)

**Особенности:**
- Brand awareness focus
- CPM-based pricing (обычно)
- Rich media formats
- Programmatic or direct deals

**Ключевые метрики:**
- Impressions, Reach
- VTR (Video Through Rate) для видео
- CPM (основная модель)
- Brand lift (опционально)

**Data sources:**
- Ad servers (DV360, Яндекс Директ Дисплей)
- Yandex Metrika
- Google Analytics
- Brand lift studies

---

### 3. Таргетированная реклама (VK, MyTarget, Facebook/Instagram)

**Особенности:**
- Social media platforms
- Audience-based targeting (интересы, поведение, lookalike)
- Engagement metrics (likes, shares, comments)
- Разнообразие форматов (carousel, stories, video)

**Ключевые метрики:**
- ER (Engagement Rate)
- CTR, CPC
- Reach, Frequency
- Conversions (if pixel setup)

**Data sources:**
- VK Ads API
- MyTarget API
- Facebook/Instagram API (if available)
- Pixel tracking

---

### 4. Программатик (Programmatic Display/Video)

**Особенности:**
- Real-time bidding (RTB)
- DSP platforms (Soloway, Getintent, DV360)
- Advanced targeting (1st party data, DMPs)
- Brand safety & viewability

**Ключевые метрики:**
- CPM (bid-based)
- Viewability (%)
- Brand safety score
- Reach, Frequency

**Data sources:**
- DSP APIs
- DMP integrations
- Viewability vendors (IAS, MOAT)

---

### 5. Мобайл (Mobile Apps, In-App Ads)

**Особенности:**
- App install campaigns
- In-app advertising
- Mobile-specific formats (interstitial, rewarded video)
- Attribution tracking (Adjust, AppsFlyer)

**Ключевые метрики:**
- Installs
- CPI (Cost Per Install)
- In-app events (registrations, purchases)
- Retention rates

**Data sources:**
- Mobile ad networks (AppLovin, IronSource, Unity)
- MMP (Mobile Measurement Partner) - Adjust, AppsFlyer
- App stores data

---

### 6. Ecom (Маркетплейсы: Ozon, Wildberries, Yandex Market)

**Особенности:**
- Product listing ads
- In-platform advertising
- Direct sales attribution
- ROAS focus

**Ключевые метрики:**
- ROAS (Return on Ad Spend) - primary
- Orders, Revenue
- CTR, CR (cart → purchase)
- ACoS (Advertising Cost of Sales)

**Data sources:**
- Ozon Ads API
- Wildberries Ads API
- Yandex Market Ads API
- Merchant dashboards

---

### 7. Инфлюенс (Influencer Marketing, Блогеры)

**Особенности:**
- Collaboration with influencers/bloggers
- Content-based (posts, stories, videos)
- Audience of influencer = your reach
- CPM based on influencer's audience size

**Уникальные поля:**
- **Подписчики** (followers count)
- **Дата выхода поста** (publication date)
- **Engagement Rate** (likes + comments / reach)

**Ключевые метрики:**
- ER REACH (engagement rate by reach)
- CPM (based on followers)
- Reach (influencer's audience)
- Clicks (if tracking link provided)

**Data sources:**
- Manual input (от инфлюенсера)
- Influencer platforms (Epicstars, GetBlogger)
- Social media APIs (for public data)

**Недоступные метрики:** Большинство performance metrics (CPC, CPA, CPL) недоступны напрямую, если нет UTM tracking.

---

### 8. DOOH (Digital Out-of-Home: цифровые билборды, экраны)

**Особенности:**
- Physical displays (outdoor screens, indoor panels)
- Location-based (фиксированный адрес)
- No direct interaction (no clicks)
- Traditional media metrics (GRP, Reach)

**Уникальные поля:**
- **GRP** (Gross Rating Point) - TV/DOOH metric
- **Адрес** (physical location)

**Доступные метрики:**
- Impressions (OTS - Opportunity To See)
- CPM (based on traffic/footfall)
- CPV (cost per view, interpreted as impression)
- Reach, Frequency (estimated)

**Недоступные метрики:**
- Все interaction metrics (clicks, VTR, CTR, engagement)
- Все performance metrics (CPC, CPE, CPA, CR, leads, sales)
- Digital targeting fields (devices, detailed targeting)

**Data sources:**
- DOOH operator data (Russ Outdoor, Gallery, etc.)
- Traffic analytics (footfall, vehicle count)
- Manual input (screen specs, location)

---

## 🔧 Техническая имплементация

### Database Schema (PostgreSQL)

```sql
-- Campaign table with conditional fields based on platform_category

CREATE TABLE media_plan_campaigns (
  id UUID PRIMARY KEY,
  project_id UUID REFERENCES projects(id),
  
  -- Universal fields (все платформы)
  platform_url TEXT,
  platform_type TEXT NOT NULL, -- 'context', 'display', 'target', 'programmatic', 'mobile', 'ecom', 'influencer', 'dooh'
  campaign_name TEXT NOT NULL,
  description TEXT,
  format TEXT,
  start_date DATE,
  end_date DATE,
  budget DECIMAL(15,2),
  
  -- Conditional fields (JSON for flexibility)
  platform_specific JSONB, -- хранит поля, специфичные для платформы
  
  -- Common metrics (большинство платформ)
  impressions INTEGER,
  clicks INTEGER,
  views INTEGER,
  engagement INTEGER,
  reach INTEGER,
  frequency DECIMAL(3,2),
  
  -- Cost metrics
  cpm DECIMAL(10,2),
  cpc DECIMAL(10,2),
  cpv DECIMAL(10,2),
  cpe DECIMAL(10,2),
  
  -- Performance metrics (если доступны)
  leads INTEGER,
  cpl DECIMAL(10,2),
  conversions INTEGER,
  cpa DECIMAL(10,2),
  revenue DECIMAL(15,2),
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index for fast platform_type filtering
CREATE INDEX idx_campaigns_platform_type ON media_plan_campaigns(platform_type);

-- Example of platform_specific JSONB structure

-- For Influencer:
{
  "influencer_name": "Имя блогера",
  "followers_count": 250000,
  "post_date": "2025-11-15",
  "post_url": "https://instagram.com/...",
  "er_reach": 3.2
}

-- For DOOH:
{
  "location_address": "Москва, Тверская 1",
  "screen_count": 5,
  "screen_type": "LED billboard 6x3m",
  "grp": 45.2,
  "traffic_estimate": 50000
}

-- For Ecom:
{
  "marketplace": "Ozon",
  "product_ids": ["123", "456"],
  "orders": 120,
  "roas": 4.5,
  "acos": 22
}
```

---

### API Design (REST)

#### Get campaigns with platform filtering

```http
GET /api/v1/projects/{project_id}/media-plan/campaigns?platform_type=influencer

Response:
{
  "campaigns": [
    {
      "id": "uuid",
      "platform_type": "influencer",
      "campaign_name": "Блогер @ivanov обзор",
      "impressions": 250000,
      "clicks": 8000,
      "engagement": 12000,
      "platform_specific": {
        "influencer_name": "Иван Иванов",
        "followers_count": 250000,
        "post_date": "2025-11-15",
        "er_reach": 4.8
      },
      // ... other fields
    }
  ]
}
```

#### Get available fields for platform

```http
GET /api/v1/platform-fields?platform_type=dooh

Response:
{
  "platform_type": "dooh",
  "available_fields": [
    "platform_url",
    "campaign_name",
    "description",
    "format",
    "impressions",
    "reach",
    "frequency",
    "cpm",
    "cpv",
    "grp"
  ],
  "unavailable_fields": [
    "clicks",
    "ctr",
    "cpc",
    "geo_targeting",
    "devices",
    // ... все interaction & performance metrics
  ],
  "platform_specific_fields": [
    {
      "name": "location_address",
      "type": "string",
      "required": true,
      "description": "Физический адрес размещения"
    },
    {
      "name": "grp",
      "type": "number",
      "required": false,
      "description": "Gross Rating Point"
    }
  ]
}
```

---

### UI Implementation (Dynamic Forms)

```typescript
// Frontend: conditional field rendering

interface CampaignFormProps {
  platformType: PlatformType;
}

const platformFieldsConfig = {
  context: ['url', 'campaign', 'geo', 'devices', 'format', 'targeting', 'clicks', 'impressions', 'ctr', 'cpc', 'leads', 'cpl'],
  display: ['url', 'campaign', 'geo', 'devices', 'format', 'targeting', 'impressions', 'reach', 'vtr', 'cpm'],
  influencer: ['url', 'campaign', 'description', 'format', 'followers_count', 'post_date', 'impressions', 'engagement', 'er_reach'],
  dooh: ['url', 'campaign', 'description', 'format', 'location', 'impressions', 'reach', 'grp', 'cpm'],
  // ... other platforms
};

const unavailableFields = {
  dooh: ['clicks', 'ctr', 'cpc', 'geo', 'devices', 'targeting', 'engagement'],
  // ...
};

function CampaignForm({ platformType }: CampaignFormProps) {
  const availableFields = platformFieldsConfig[platformType];
  const unavailable = unavailableFields[platformType] || [];
  
  return (
    <Form>
      {availableFields.includes('url') && <Input name="url" label="Ссылка на площадку" />}
      {availableFields.includes('campaign') && <Input name="campaign" label="Кампания" />}
      {availableFields.includes('geo') && <GeoSelect name="geo" label="Гео" />}
      
      {/* Influencer specific */}
      {platformType === 'influencer' && (
        <>
          <Input name="followers_count" label="Количество подписчиков" type="number" />
          <DatePicker name="post_date" label="Дата выхода поста" />
        </>
      )}
      
      {/* DOOH specific */}
      {platformType === 'dooh' && (
        <>
          <Input name="location" label="Адрес размещения" />
          <Input name="grp" label="GRP" type="number" step="0.1" />
        </>
      )}
      
      {/* Show grayed out unavailable fields with tooltip */}
      {unavailable.map(field => (
        <Tooltip key={field} content={`Недоступно для ${platformType}`}>
          <Input name={field} label={fieldLabels[field]} disabled />
        </Tooltip>
      ))}
    </Form>
  );
}
```

---

## 📊 Migration Assistant: Platform Detection

При миграции из Excel, Migration Assistant должен:

1. **Определить тип платформы** по содержимому:
   - Наличие "подписчики" → Influencer
   - Наличие "GRP" → DOOH
   - Наличие "заказы", "ROAS" → Ecom
   - Наличие "ключевые слова" → Context
   - И т.д.

2. **Парсить только доступные поля** для этой платформы

3. **Игнорировать недоступные поля** (или помечать как N/A)

```typescript
// Migration Assistant: platform detection logic

function detectPlatformType(excelData: any[]): PlatformType {
  const headers = excelData[0]; // first row = headers
  
  // Check for unique fields
  if (headers.includes('подписчики') || headers.includes('followers')) {
    return 'influencer';
  }
  
  if (headers.includes('GRP') || headers.includes('адрес размещения')) {
    return 'dooh';
  }
  
  if (headers.includes('ROAS') || headers.includes('заказы') || headers.includes('ACoS')) {
    return 'ecom';
  }
  
  if (headers.includes('ключевые слова') || headers.includes('CTR') && headers.includes('CPC')) {
    return 'context';
  }
  
  // Default or ambiguous
  return 'display'; // or prompt user
}

function parseFieldsForPlatform(row: any, platformType: PlatformType): Campaign {
  const availableFields = platformFieldsConfig[platformType];
  
  const campaign: Partial<Campaign> = {
    platform_type: platformType,
  };
  
  // Parse only available fields
  for (const field of availableFields) {
    const value = row[fieldMapping[field]]; // fieldMapping = Excel column → DB field
    if (value !== undefined && value !== null) {
      campaign[field] = value;
    }
  }
  
  // Platform-specific parsing
  if (platformType === 'influencer') {
    campaign.platform_specific = {
      followers_count: row['подписчики'] || row['followers'],
      post_date: row['дата выхода поста'] || row['post_date'],
      // ...
    };
  }
  
  if (platformType === 'dooh') {
    campaign.platform_specific = {
      location_address: row['адрес'] || row['location'],
      grp: row['GRP'],
      // ...
    };
  }
  
  return campaign as Campaign;
}
```

---

## ✅ Validation Rules

При создании/редактировании кампании, валидация должна учитывать platform_type:

```typescript
// Validation schema (Zod)

const baseCampaignSchema = z.object({
  platform_type: z.enum(['context', 'display', 'target', 'programmatic', 'mobile', 'ecom', 'influencer', 'dooh']),
  campaign_name: z.string().min(1),
  budget: z.number().positive(),
  // ... universal fields
});

const contextCampaignSchema = baseCampaignSchema.extend({
  geo: z.string().min(1), // required for context
  cpc: z.number().positive().optional(),
  ctr: z.number().min(0).max(100).optional(),
});

const influencerCampaignSchema = baseCampaignSchema.extend({
  platform_specific: z.object({
    followers_count: z.number().int().positive(), // required for influencer
    post_date: z.date().optional(),
  }),
});

const doohCampaignSchema = baseCampaignSchema.extend({
  platform_specific: z.object({
    location_address: z.string().min(1), // required for DOOH
    grp: z.number().positive().optional(),
  }),
  // Disallow certain fields for DOOH
  clicks: z.undefined(),
  ctr: z.undefined(),
  cpc: z.undefined(),
});

function validateCampaign(data: any): ValidationResult {
  const { platform_type } = data;
  
  switch (platform_type) {
    case 'context':
      return contextCampaignSchema.parse(data);
    case 'influencer':
      return influencerCampaignSchema.parse(data);
    case 'dooh':
      return doohCampaignSchema.parse(data);
    // ... other platforms
    default:
      return baseCampaignSchema.parse(data);
  }
}
```

---

## 📈 Reporting: Available Metrics per Platform

Report Generator должен показывать только доступные метрики:

```typescript
// Report Generator: metrics filtering

function getAvailableMetrics(platformType: PlatformType): Metric[] {
  const allMetrics: Record<string, Metric[]> = {
    context: ['impressions', 'clicks', 'ctr', 'cpc', 'leads', 'cpl', 'conversions', 'cpa'],
    display: ['impressions', 'reach', 'frequency', 'vtr', 'cpm', 'engagement'],
    influencer: ['impressions', 'reach', 'clicks', 'engagement', 'er_reach', 'cpm'],
    dooh: ['impressions', 'reach', 'frequency', 'grp', 'cpm', 'cpv'],
    // ...
  };
  
  return allMetrics[platformType] || [];
}

function generateReport(campaigns: Campaign[]): Report {
  const reportSections = campaigns.map(campaign => {
    const availableMetrics = getAvailableMetrics(campaign.platform_type);
    
    return {
      campaign_name: campaign.campaign_name,
      platform_type: campaign.platform_type,
      metrics: availableMetrics.reduce((acc, metric) => {
        acc[metric] = campaign[metric];
        return acc;
      }, {}),
    };
  });
  
  return { sections: reportSections };
}
```

---

## 🔗 Integration with Garpun

Garpun Partnership упрощает сбор данных для большинства платформ:

| Platform Category | Garpun Coverage | Notes |
|-------------------|-----------------|-------|
| Контекстная реклама | ✅ Full | Yandex Direct, Google Ads |
| Медийная реклама | ✅ Full | YD Display, Google Display |
| Таргет | ✅ Full | VK, MyTarget, TikTok |
| Программатик | ⚠️ Partial | Зависит от DSP (нужны прямые интеграции) |
| Мобайл | ✅ Full | Via ad networks APIs |
| Ecom | ✅ Full | Ozon, Wildberries, Yandex Market |
| Инфлюенс | ❌ Manual | Данные от блогеров вручную |
| DOOH | ⚠️ Partial | Зависит от оператора (Russ Outdoor API?) |

→ [Garpun Documentation](../../07_INTEGRATIONS/Garpun_Partnership/README.md)

---

## 🎯 Use Cases

### Use Case 1: Specialist создает медиаплан

```
1. Specialist выбирает тип инструмента: "Таргет (VK Ads)"
2. UI показывает только релевантные поля:
   ✅ Ссылка, Кампания, Гео, Устройства, Формат, Таргетинги
   ✅ Показы, Клики, CTR, CPC, Engagement, ER
   ❌ GRP (недоступно)
   ❌ Подписчики (недоступно)
3. Specialist заполняет поля
4. Validation проходит (все required поля заполнены)
5. Campaign сохранена с platform_type='target'
```

### Use Case 2: Migration из Excel (mixed platforms)

```
1. User загружает Excel с 50 кампаниями (разные типы)
2. Migration Assistant:
   - Анализирует первую строку (headers)
   - Для каждой строки определяет platform_type
     Row 1: "Яндекс Директ" → context
     Row 2: "VK Ads" → target
     Row 3: "Блогер @ivanov" → influencer (есть поле "подписчики")
     Row 4: "Билборд на Тверской" → dooh (есть поле "GRP")
3. Парсит только доступные поля для каждого типа
4. Результат: 50 кампаний мигрированы с корректными platform_type
```

### Use Case 3: Report Generator (cross-platform)

```
1. Analyst запрашивает отчет за октябрь (все кампании)
2. Report Generator:
   - Группирует кампании по platform_type
   - Для каждой группы показывает доступные метрики:
     
     Контекст (5 кампаний):
       Impressions: 1.2M
       Clicks: 45K
       CTR: 3.75%
       CPC: ₽12.50
       Leads: 1,200
       CPL: ₽468
     
     DOOH (2 кампании):
       Impressions: 500K
       Reach: 250K
       GRP: 45.2
       CPM: ₽120
       (no clicks, CTR, CPC — not applicable)
     
     Influencer (3 кампании):
       Impressions: 800K
       Engagement: 32K
       ER Reach: 4.2%
       Followers reached: 750K
       (no GRP — not applicable)
```

---

## 📚 Related Documentation

- [Media Plan Data Structure](./Data_Structure.md) - полная схема данных
- [Platforms Overview](../../04_PLATFORMS/_Platforms_Overview.md) - обзор всех платформ
- [Garpun Integration](../../07_INTEGRATIONS/Garpun_Partnership/README.md) - автоматический сбор данных
- [Migration Assistant](../../06_AI_ASSISTANTS/Migration_Assistant/README.md) - как работает миграция
- [Report Generator](../../06_AI_ASSISTANTS/Report_Generator/Overview.md) - генерация отчетов

---

## 🔄 Changelog

**v1.0 (2025-10-24):**
- Initial version based on real agency template
- Матрица совместимости 8 типов инструментов × 35 полей
- Техническая имплементация (DB, API, UI, validation)
- Integration guidelines for Garpun
- Use cases and examples

---

**Версия:** 1.0  
**Дата:** 24 октября 2025  
**Статус:** ✅ Ready for implementation  
**Owner:** Product / Development Team  
**Next Review:** After MVP Sprint 1 (based on real usage)

