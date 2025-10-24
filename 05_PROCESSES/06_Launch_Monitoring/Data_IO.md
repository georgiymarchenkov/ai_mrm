---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: process
title: 06_Launch_Monitoring - Data I/O
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: 05_PROCESSES/06_Launch_Monitoring/Data_IO.md
effective_date: 2025-10-24
visibility: internal
security_level: medium
tags: [process, 06_launch_monitoring, data_io]
---

# 06_Launch_Monitoring - Data I/O

→ [Overview](./Overview.md) | [Steps](./Process_Steps.md) | [Roles](./Roles_Responsibilities.md) | [Test](./Test_Scenario.md)

---

## 📥 INPUT (via API connectors)

```json
{
  "platform": "yandex_direct",
  "campaign_id": "CMP-001",
  "date": "2025-10-15",
  "metrics": {
    "impressions": 12500,
    "clicks": 450,
    "ctr": 0.036,
    "spend": 16000,
    "cpc": 35.5,
    "conversions": 12,
    "cpa": 1333
  }
}
```

```json
{
  "source": "yandex_metrica",
  "goals": [
    {"goal": "lead", "count": 45, "value": 1},
    {"goal": "phone", "count": 28, "value": 1},
    {"goal": "chat", "count": 15, "value": 0.5}
  ]
}
```

```json
{
  "source": "crm",
  "leads": [
    {"id": "L-001", "source": "yandex", "campaign": "CMP-001", "status": "new"}
  ]
}
```

---

## 📤 OUTPUT: Dashboards & Reports

### Real-time Dashboard Data

```json
{
  "date": "2025-10-15",
  "summary": {
    "total_spend": 485000,
    "total_leads": 320,
    "avg_cpl": 1516,
    "campaigns_live": 142,
    "issues": 3
  },
  "by_channel": {...},
  "by_city": {...}
}
```

---

**Версия:** 2.1 | **Строк:** 48 | **Статус:** ✅


