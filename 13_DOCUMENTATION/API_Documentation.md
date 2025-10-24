---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: overview
title: API Documentation - Документация API
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: 13_DOCUMENTATION/API_Documentation.md
effective_date: 2025-10-24
visibility: internal
security_level: low
tags: [documentation]
---

# API Documentation - Документация API

→ [Documentation](../_README.md)

## 📚 REST API

Base URL: `https://api.mrm-platform.ru/v1`

---

## 🔐 AUTHENTICATION

```bash
POST /auth/login
Content-Type: application/json

{
  "email": "user@agency.com",
  "password": "********"
}

Response:
{
  "access_token": "eyJhbGc...",
  "refresh_token": "...",
  "expires_in": 3600
}
```

---

## 📋 BRIEFS

### Create Brief
```bash
POST /briefs
Authorization: Bearer {token}

{
  "client_id": "client-123",
  "objectives": ["awareness", "conversions"],
  "budget": 15000000,
  ...
}

Response:
{
  "brief_id": "BRF-2025-001",
  "status": "draft"
}
```

### Get Brief
```bash
GET /briefs/{brief_id}

Response: {full brief object}
```

---

## 📊 MEDIA PLANS

### Create Media Plan
```bash
POST /media-plans
{
  "strategy_id": "STR-2025-001",
  "lines": [...]
}
```

### Get Plan Stats
```bash
GET /media-plans/{plan_id}/stats

Response:
{
  "total_budget": 15000000,
  "expected_leads": 9000,
  "avg_cpl": 1667
}
```

---

## 📈 CAMPAIGNS

### Get Campaign Performance
```bash
GET /campaigns/{campaign_id}/performance?period=7d

Response:
{
  "spend": 3800000,
  "leads": 2100,
  "cpl": 1810,
  "roas": 3.2
}
```

---

## 🤖 AI ASSISTANTS

### Generate Brief
```bash
POST /ai/brief-generator
{
  "conversation": [...],
  "context": {...}
}

Response:
{
  "brief": {...},
  "completeness": 0.95
}
```

---

**Полная документация:** [api-docs.mrm-platform.ru](https://api-docs.mrm-platform.ru)

**Версия:** 2.1 | **Статус:** ✅


