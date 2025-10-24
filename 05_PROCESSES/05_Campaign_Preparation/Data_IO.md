---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: process
title: 05_Campaign_Preparation - Data I/O
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: 05_PROCESSES/05_Campaign_Preparation/Data_IO.md
effective_date: 2025-10-24
visibility: internal
security_level: medium
tags: [process, 05_campaign_preparation, data_io]
---

# 05_Campaign_Preparation - Data I/O

→ [Overview](./Overview.md) | [Steps](./Process_Steps.md) | [Roles](./Roles_Responsibilities.md) | [Test](./Test_Scenario.md)

---

## 📥 INPUT

```json
{
  "media_plan_lines": [{...}], // 142 lines
  "creative_concept": {...}
}
```

---

## 📤 OUTPUT: Campaigns

```json
{
  "campaign_id": "CMP-001",
  "media_plan_line_id": "MP-001",
  "platform": "yandex_direct",
  "platform_campaign_id": "12345678",
  
  "creatives": [
    {"id": "CR-001", "type": "text_ad", "headline": "...", "body": "...", "url": "..."},
    {"id": "CR-002", "type": "banner", "size": "240x400", "file": "..."}
  ],
  
  "targeting": {
    "geo": "Moscow",
    "age": [35, 55],
    "keywords": ["купить квартиру москва центр"]
  },
  
  "budget": {"daily": 16000, "total": 500000},
  "schedule": {"start": "2025-10-01", "end": "2025-10-31"},
  
  "tracking": {
    "utm": "source=yandex&medium=cpc&campaign=msk_solnechny_search_oct",
    "goals": ["lead", "phone", "chat"]
  },
  
  "status": "ready" // draft → ready → live
}
```

---

## 142 campaigns total

---

**Версия:** 2.1 | **Строк:** 38 | **Статус:** ✅


