---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: integration_spec
title: Yandex Metrica Integration - Интеграция
language: ru
industry: advertising
role_apply: [specialist, developer]
period: 2025-10
version: "1.0"
source_path: 07_INTEGRATIONS/Metrica/Overview.md
effective_date: 2025-10-24
visibility: internal
security_level: medium
tags: [integration, analytics, metrica]
---

# Yandex Metrica Integration - Интеграция

→ [Integrations](../_README.md)

## 🎯 НАЗНАЧЕНИЕ

Интеграция с Yandex Metrica для tracking conversions и user behavior.

---

## 🔗 API CAPABILITIES

### 1. Goals & Conversions
- Goals tracking
- E-commerce tracking
- Custom events

### 2. Analytics Data
- Traffic sources
- User behavior
- Funnel analysis

### 3. Real-Time Data
- Live visitors
- Real-time conversions

---

## 📊 DATA SCHEMA

```json
{
  "conversions": {
    "goal_id": 12345,
    "goal_name": "Lead",
    "visits": 5000,
    "conversions": 250,
    "conversion_rate": 0.05
  },
  "sources": {
    "utm_source": "yandex",
    "utm_medium": "cpc",
    "visits": 3000,
    "conversions": 150
  }
}
```

---

**Версия:** 2.1 | **Статус:** ✅


