---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: integration_spec
title: Yandex Metrika Integration - Интеграция с Яндекс.Метрика
language: ru
industry: advertising
role_apply: [specialist, analyst]
period: 2025-10
version: "1.0"
source_path: 07_INTEGRATIONS/Yandex_Metrika/Overview.md
effective_date: 2025-10-24
visibility: internal
security_level: medium
tags: [integration, yandex_metrika, analytics]
synonyms: [metrika, метрика, яндекс метрика]
---

# Yandex Metrika Integration
## Интеграция с Яндекс.Метрика

→ [Integrations](../_README.md) | [README](./README.md)

---

## 🎯 Назначение

**Yandex Metrika** - веб-аналитика для измерения эффективности трафика на сайте.

**Интеграция позволяет:**
- Собирать данные о посетителях (sessions, pageviews, bounce rate)
- Отслеживать конверсии и цели
- Анализировать источники трафика
- Строить воронки и когорты
- Автоматически генерировать отчеты

---

## 📊 API Endpoints

### Management API

**Base URL:** `https://api-metrika.yandex.net/management/v1/`

#### Получение счетчиков
```http
GET /counters
Authorization: OAuth {access_token}

Response:
{
  "counters": [
    {
      "id": 12345678,
      "name": "Client Site",
      "site": "example.com",
      "status": "Active"
    }
  ]
}
```

---

### Reporting API

**Base URL:** `https://api-metrika.yandex.net/stat/v1/data`

#### Получение статистики
```http
GET /data
  ?ids={counter_id}
  &metrics=ym:s:visits,ym:s:users,ym:s:pageviews
  &dimensions=ym:s:date
  &date1=2025-10-01
  &date2=2025-10-31
Authorization: OAuth {access_token}

Response:
{
  "data": [
    {
      "dimensions": [{"name": "2025-10-01"}],
      "metrics": [1234, 987, 5432]
    },
    ...
  ]
}
```

---

## 🔑 Authentication

### OAuth 2.0

**Step 1:** Получить OAuth токен

1. Зарегистрировать приложение: https://oauth.yandex.ru/
2. Redirect user на `https://oauth.yandex.ru/authorize?response_type=token&client_id={app_id}`
3. Получить `access_token` из redirect URL

**Step 2:** Использовать токен в requests

```bash
curl -H "Authorization: OAuth {access_token}" \
  https://api-metrika.yandex.net/management/v1/counters
```

---

## 📈 Метрики

### Traffic Metrics
```yaml
ym:s:visits         - Визиты (sessions)
ym:s:users          - Пользователи (unique visitors)
ym:s:pageviews      - Просмотры страниц
ym:s:bounceRate     - Показатель отказов (%)
ym:s:avgVisitDuration - Средняя длительность визита (секунды)
```

### Source Metrics
```yaml
ym:s:<source>visits - Визиты по источникам
  источники:
    - organic (SEO)
    - ad (реклама)
    - referral (переходы с других сайтов)
    - direct (прямые заходы)
    - social (соцсети)
```

### Goal/Conversion Metrics
```yaml
ym:s:goal{goalId}reaches     - Достижения цели
ym:s:goal{goalId}conversionRate - Конверсия в цель (%)
```

---

## 🔄 Sync Strategy

### Real-time Sync (Webhooks - опционально)
```yaml
Trigger: Новое событие на сайте
Action: Webhook → MRM Platform
Use Case: Real-time dashboard updates
```

### Batch Sync (Scheduled)
```yaml
Frequency: Каждые 6 часов
Process:
  1. Fetch data за last 7 days (updated retroactively)
  2. Upsert в ClickHouse (time-series DB)
  3. Invalidate report cache
  4. Send alerts если anomaly (CTR drop >20%)
```

---

## 💾 Data Storage

### ClickHouse Schema

```sql
CREATE TABLE metrika_stats (
  date Date,
  counter_id UInt64,
  source String,
  visits UInt32,
  users UInt32,
  pageviews UInt32,
  bounce_rate Float32,
  avg_duration UInt32,
  goal_reaches Map(String, UInt32),
  updated_at DateTime
) ENGINE = MergeTree()
PARTITION BY toYYYYMM(date)
ORDER BY (date, counter_id, source);
```

---

## 🔗 Integration Points

### 1. Campaign Report Generator
```yaml
Purpose: Auto-collect web analytics для отчетов
Flow:
  1. Campaign создан → link Metrika counter
  2. Daily: fetch stats (visits, conversions)
  3. Weekly/Monthly: generate report with insights
```

### 2. Analytics Dashboard
```yaml
Purpose: Real-time dashboard for Specialist/Analyst
Metrics:
  - Live visitors count
  - Today's traffic (visits, bounce rate)
  - Goal completions
  - Source breakdown (pie chart)
```

### 3. Alert System
```yaml
Triggers:
  - Bounce rate >70% (проблема с landing page)
  - Conversion rate drop >20% (проблема с воронкой)
  - Traffic drop >50% (проблема с рекламой)

Actions:
  - Telegram notification → Specialist
  - Email → PM + Client
```

---

## 🧪 Testing

### Test Counter
```yaml
Counter ID: 12345678 (test)
Site: test.example.com
Goals:
  - Goal 1: Form submission
  - Goal 2: Purchase
```

### Mock Data
```python
# For dev/staging environments
mock_metrika_response = {
  "data": [
    {
      "dimensions": [{"name": "2025-10-24"}],
      "metrics": [1500, 320, 4800, 42.5, 180]
    }
  ]
}
```

---

## 📚 Resources

- **API Docs:** https://yandex.ru/dev/metrika/doc/
- **OAuth Setup:** https://oauth.yandex.ru/
- **Metrika Interface:** https://metrika.yandex.ru/

---

## 👥 Ownership

**Responsible:** Backend Developer  
**Uses:** Specialist, Analyst, PM  
**Maintains:** DevOps (uptime, sync jobs)

---

**Версия:** 1.0  
**Статус:** ✅ Defined  
**Priority:** High (критична для отчетности)

