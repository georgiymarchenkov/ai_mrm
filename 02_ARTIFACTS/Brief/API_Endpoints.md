---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: artifact_doc
title: Brief - API Endpoints
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: 02_ARTIFACTS/Brief/API_Endpoints.md
effective_date: 2025-10-24
visibility: internal
security_level: medium
tags: [artifact, brief]
---

# Brief - API Endpoints

→ [Overview](./Overview.md) | [Data Structure](./Data_Structure.md)

---

## 📋 REST API

Base URL: `https://api.mrm-platform.ru/v1`

---

## CREATE BRIEF

```http
POST /briefs
Authorization: Bearer {token}
Content-Type: application/json

{
  "client": {
    "company_name": "ООО СтройГрупп",
    "industry": "Недвижимость",
    "contact": {...}
  },
  "products": [
    {
      "name": "ЖК Солнечный",
      "city": "Москва",
      "type": "Квартиры"
    }
  ],
  "objectives": ["awareness", "conversions"],
  "budget": 45000000,
  "period": {
    "start": "2025-10-01",
    "end": "2025-12-31"
  }
}

Response 201:
{
  "brief_id": "BRF-2025-001",
  "status": "draft",
  "completeness": 0.65,
  "created_at": "2025-10-23T12:00:00Z"
}
```

---

## GET BRIEF

```http
GET /briefs/{brief_id}

Response 200:
{full brief object according to Data_Structure.md}
```

---

## UPDATE BRIEF

```http
PATCH /briefs/{brief_id}

{
  "budget": 50000000,
  "status": "under_review"
}

Response 200:
{updated brief object}
```

---

## VALIDATE BRIEF

```http
POST /briefs/{brief_id}/validate

Response 200:
{
  "is_valid": true,
  "completeness": 0.95,
  "missing_fields": [],
  "warnings": []
}
```

---

## AI GENERATE BRIEF

```http
POST /briefs/generate
{
  "conversation": [
    {"role": "user", "content": "У нас 3 ЖК..."},
    {"role": "assistant", "content": "Какой бюджет?"}
  ]
}

Response 200:
{
  "brief": {...},
  "completeness": 0.85,
  "next_questions": [...]
}
```

---

**Версия:** 2.1 | **Статус:** ✅


