---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: artifact_doc
title: Campaign Report - Структура данных
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: 02_ARTIFACTS/Campaign_Report/Data_Structure.md
effective_date: 2025-10-24
visibility: internal
security_level: medium
tags: [artifact, campaign_report]
---

# Campaign Report - Структура данных

→ [Overview](./Overview.md)

---

## 📊 WEEKLY REPORT STRUCTURE

```json
{
  "report_id": "REP-2025-W42",
  "period": {"start": "2025-10-14", "end": "2025-10-20"},
  "campaign_id": "CMP-2025-001",
  
  "summary": {
    "spend": 3800000,
    "spend_vs_plan": 0.95,
    "leads": 2100,
    "leads_vs_plan": 1.05,
    "cpl": 1810,
    "cpl_vs_target": 1.08,
    "quality": 0.72
  },
  
  "by_channel": {
    "context": {
      "spend": 1520000,
      "leads": 1200,
      "cpl": 1267,
      "roas": 3.2
    }
  },
  
  "insights": [
    "Context overperforming: +15% leads vs plan",
    "Programmatic underperforming: CPL too high"
  ],
  
  "recommendations": [
    "Increase context budget by 10%",
    "Pause 3 worst programmatic placements"
  ]
}
```

---

**Версия:** 2.1 | **Статус:** ✅


