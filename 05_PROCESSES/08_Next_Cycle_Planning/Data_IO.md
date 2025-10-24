---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: process
title: 08_Next_Cycle_Planning - Data I/O
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: 05_PROCESSES/08_Next_Cycle_Planning/Data_IO.md
effective_date: 2025-10-24
visibility: internal
security_level: medium
tags: [process, 08_next_cycle_planning, data_io]
---

# 08_Next_Cycle_Planning - Data I/O

→ [Overview](./Overview.md) | [Steps](./Process_Steps.md) | [Roles](./Roles_Responsibilities.md) | [Test](./Test_Scenario.md)

---

## 📥 INPUT

```json
{
  "month_results": {
    "period": "2025-10",
    "spend": 15000000,
    "leads": 8200,
    "sales": 98,
    "cpl": 1829,
    "cpa": 153061,
    "romi": 2.8
  },
  "by_channel": {...},
  "learnings": [...]
}
```

---

## 📤 OUTPUT: Updated Brief

```json
{
  "brief_id": "BRF-2025-001-M2",
  "based_on": "BRF-2025-001-M1",
  "month": "2025-11",
  
  "changes": {
    "budget": {
      "total": 16000000, // +1M based on good results
      "context": 6500000, // +500k (performed well)
      "banner_network_x": 0 // removed (bad performance)
    },
    
    "target_audience": {
      "age_adjusted": [30, 50], // expanded (good results in 30-35)
      "new_segment": "investors" // found in data
    },
    
    "kpis": {
      "leads": 9500, // more realistic based on M1
      "target_cpl": 1684 // adjusted
    }
  },
  
  "learnings_applied": [
    "Context advertising overperformed → +8% budget",
    "Banner Network X underperformed → removed",
    "Age 30-35 segment strong → expanded targeting"
  ],
  
  "status": "approved"
}
```

---

**Версия:** 2.1 | **Строк:** 48 | **Статус:** ✅


