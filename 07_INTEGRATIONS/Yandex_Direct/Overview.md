---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: integration_spec
title: Yandex Direct Integration - Интеграция
language: ru
industry: advertising
role_apply: [specialist, developer]
period: 2025-10
version: "1.0"
source_path: 07_INTEGRATIONS/Yandex_Direct/Overview.md
effective_date: 2025-10-24
visibility: internal
security_level: medium
tags: [integration, advertising, yandex_direct]
---

# Yandex Direct Integration - Интеграция

→ [Integrations](../_README.md)

## 🎯 НАЗНАЧЕНИЕ

Интеграция с Yandex Direct API для управления кампаниями и получения данных.

---

## 🔗 API CAPABILITIES

### 1. Campaign Management
- Create/update/delete campaigns
- Manage ad groups
- Keywords management
- Bids optimization

### 2. Performance Data
- Daily stats (impressions, clicks, spend)
- Conversion tracking
- Quality Score

### 3. Reporting
- Custom reports
- Automated data extraction
- Real-time updates

---

## 📊 DATA SCHEMA

```json
{
  "campaign": {
    "id": "campaign_id",
    "name": "Campaign Name",
    "status": "active",
    "budget": 500000,
    "spent": 123456
  },
  "stats": {
    "impressions": 100000,
    "clicks": 5000,
    "ctr": 0.05,
    "avg_cpc": 24.69,
    "conversions": 250
  }
}
```

---

## 🔧 ТЕХНОЛОГИИ

- **API Version:** v5
- **Authentication:** OAuth 2.0
- **Rate Limits:** 10 req/sec
- **Updates:** Hourly sync

---

**Версия:** 2.1 | **Статус:** ✅


