---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: process
title: 07_Analytics_Optimization - Data I/O
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: 05_PROCESSES/07_Analytics_Optimization/Data_IO.md
effective_date: 2025-10-24
visibility: internal
security_level: medium
tags: [process, 07_analytics_optimization, data_io]
---

# 07_Analytics_Optimization - Data I/O

→ [Overview](./Overview.md) | [Steps](./Process_Steps.md) | [Roles](./Roles_Responsibilities.md) | [Test](./Test_Scenario.md)

---

## 📥 INPUT

```json
{
  "campaign_data": {
    "daily_metrics": [...], // 14+ days
    "spend_by_channel": {...},
    "leads_by_channel": {...},
    "conversions": {...}
  },
  "external_factors": {
    "seasonality": {...},
    "competitors": {...},
    "market_trends": {...}
  }
}
```

---

## 📤 OUTPUT

### Econometric Forecast

```json
{
  "forecast": {
    "next_week": {"leads": 2200, "cpl": 1620},
    "next_month": {"leads": 9500, "cpl": 1580}
  },
  "confidence": 0.85
}
```

### Attribution Model

```json
{
  "attribution": {
    "yandex_search": {"credit": 0.35, "true_cpl": 1180},
    "programmatic": {"credit": 0.18, "true_cpl": 1950},
    "smm": {"credit": 0.12, "true_cpl": 2100}
  }
}
```

### Removal Effect

```json
{
  "removal_effect": [
    {"channel": "banner_network_X", "remove_impact": "-50 leads only", "recommendation": "pause"},
    {"channel": "programmatic", "remove_impact": "-800 leads", "recommendation": "keep"}
  ]
}
```

### Optimization Actions

```json
{
  "actions": [
    {"campaign": "CMP-015", "action": "pause", "reason": "CPL 3500₽ (target 1667₽)"},
    {"campaign": "CMP-042", "action": "increase_budget", "from": 15000, "to": 25000}
  ]
}
```

---

**Версия:** 2.1 | **Строк:** 54 | **Статус:** ✅


