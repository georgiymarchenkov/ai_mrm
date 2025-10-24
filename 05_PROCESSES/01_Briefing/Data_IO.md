---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: process
title: 01_Briefing - Data Input/Output
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: 05_PROCESSES/01_Briefing/Data_IO.md
effective_date: 2025-10-24
visibility: internal
security_level: medium
tags: [process, 01_briefing, data_io]
---

# 01_Briefing - Data Input/Output

→ [Overview](./Overview.md) | [Steps](./Process_Steps.md) | [Roles](./Roles_Responsibilities.md) | [Test](./Test_Scenario.md)

---

## 📥 INPUT DATA

### 1. From Client (initial request)

```json
{
  "client": {
    "company_name": "string",
    "industry": "string",
    "contact_person": "string",
    "email": "string",
    "phone": "string"
  },
  "request": {
    "type": "new_campaign | ongoing | test",
    "budget_estimate": "number",
    "timeline": "date_range",
    "goals_high_level": "string"
  }
}
```

### 2. From CRM (if existing client)

```json
{
  "client_history": {
    "previous_campaigns": ["campaign_id"],
    "total_spent": "number",
    "avg_romi": "number",
    "preferred_channels": ["array"]
  }
}
```

### 3. From Market Data (optional)

```json
{
  "industry_benchmarks": {
    "avg_cpl": "number",
    "avg_roas": "number",
    "top_channels": ["array"]
  }
}
```

---

## 📤 OUTPUT DATA: BRIEF Structure

### Main Structure

```json
{
  "brief_id": "BRF-2025-001",
  "created_at": "ISO8601",
  "updated_at": "ISO8601",
  "status": "draft | in_progress | approved",
  "completeness": "percentage",
  
  "sections": {
    "company": {...},
    "products": [{...}],
    "target_audience": [{...}],
    "goals_kpis": {...},
    "channels": {...},
    "creative": {...},
    "analytics": {...},
    "project": {...}
  }
}
```

---

### Section 1: COMPANY

```json
{
  "company": {
    "name": "ООО СтройГрупп",
    "industry": "real_estate_developer",
    "sub_industry": "residential",
    "website": "https://stroygroupp.ru",
    "year_founded": 2010,
    "team_size": "50-100",
    
    "positioning_current": "string",
    "positioning_desired": "string",
    "brand_personality": ["modern", "trustworthy", "premium"],
    
    "competitors": [
      {
        "name": "Садовые кварталы",
        "positioning": "Premium family",
        "strengths": ["location", "green area"],
        "weaknesses": ["far from metro"]
      }
    ],
    
    "usp": ["metro 5min", "established developer", "quality"]
  }
}
```

---

### Section 2: PRODUCTS (array)

```json
{
  "products": [
    {
      "product_id": "PROD-001",
      "name": "ЖК Солнечный - Квартиры",
      "type": "apartments",
      "city": "Москва",
      "location": "Центр, м. Маяковская 5мин",
      
      "variations": [
        {
          "name": "1-комнатные",
          "area": "45-50 кв.м",
          "price_range": [8000000, 10000000],
          "quantity_available": 20
        },
        {
          "name": "2-комнатные",
          "area": "65-75 кв.м",
          "price_range": [12000000, 14000000],
          "quantity_available": 30
        }
      ],
      
      "target_audience": {
        "primary": "Families 35-50, high income",
        "secondary": "Professionals 30-45"
      },
      
      "usp": ["центр города", "метро 5мин", "премиум отделка"],
      "landing_page": "https://solnechniy-msk.ru/kvartiry",
      
      "sales_status": {
        "current_monthly_sales": 15,
        "target_monthly_sales": 40,
        "average_deal_cycle_days": 60
      }
    }
  ]
}
```

---

### Section 3: TARGET AUDIENCE (array)

```json
{
  "target_audience": [
    {
      "segment_id": "TA-001",
      "segment_name": "Established Families Moscow",
      "priority": "primary",
      
      "demographics": {
        "age": [35, 55],
        "gender": "all",
        "income_monthly": ">200000",
        "family_status": "married_with_kids",
        "education": "higher"
      },
      
      "psychographics": {
        "values": ["status", "convenience", "quality"],
        "lifestyle": "active, career-focused",
        "pain_points": ["traffic", "time waste", "old apartment"]
      },
      
      "behavior": {
        "online_channels": ["yandex_search", "vk", "telegram"],
        "search_keywords": ["квартиры центр москва", "новостройки у метро"],
        "decision_timeframe": "30-90 days",
        "influences": ["location", "developer reputation", "price"]
      },
      
      "size_estimate": 50000
    }
  ]
}
```

---

### Section 4: GOALS & KPIs

```json
{
  "goals_kpis": {
    "business_goals": [
      {
        "goal": "Sell 120 apartments in Q4 2025",
        "timeline": "Q4 2025",
        "priority": "P0"
      }
    ],
    
    "marketing_kpis": {
      "leads": {
        "total": 9000,
        "by_month": [2500, 3000, 3500],
        "target_cpl": 1667,
        "quality_threshold": 0.7
      },
      
      "brand": {
        "awareness_lift": 0.2,
        "consideration_increase": 0.15
      }
    },
    
    "budget": {
      "total_monthly": 15000000,
      "total_quarterly": 45000000,
      "flexibility": 0.1,
      "by_city": {
        "moscow": 8000000,
        "spb": 4000000,
        "kazan": 3000000
      }
    }
  }
}
```

---

### Section 5: CHANNELS (requirements by channel)

```json
{
  "channels": {
    "context_advertising": {
      "platforms": ["yandex_direct", "google_ads"],
      "budget": 6000000,
      "expected_leads": 5000,
      "target_cpl": 1200,
      
      "requirements": {
        "keywords_ideas": ["купить квартиру москва центр", ...],
        "negative_keywords": ["аренда", "вторичка", "дешево"],
        "landing_pages": ["url1", "url2"],
        "current_performance": {...}
      }
    },
    
    "programmatic": {
      "budget": 3500000,
      "expected_reach": 5000000,
      "formats": ["display", "video"]
    }
  }
}
```

---

### Section 6: CREATIVE

```json
{
  "creative": {
    "brand_guidelines": {
      "logo_url": "url",
      "colors": ["#FF6B00", "#FFFFFF"],
      "fonts": ["Montserrat", "Open Sans"],
      "tone_of_voice": "confident, premium, warm"
    },
    
    "materials": {
      "photos": ["url1", "url2"],
      "videos": ["url1"],
      "existing_creatives": ["url1"]
    },
    
    "restrictions": [
      "Не использовать конкурентов в креативах",
      "Обязательно указывать FZ-214"
    ]
  }
}
```

---

### Section 7: ANALYTICS

```json
{
  "analytics": {
    "systems": {
      "yandex_metrica": {
        "counters": [
          {"site": "solnechniy-msk.ru", "id": "12345678"}
        ]
      },
      "google_analytics": {
        "properties": [
          {"site": "solnechniy-msk.ru", "id": "G-XXXXXXX"}
        ]
      },
      "crm": {
        "system": "bitrix24",
        "api_available": true
      }
    },
    
    "goals": [
      {"name": "lead_form_submit", "value": 1},
      {"name": "phone_click", "value": 1},
      {"name": "chat_started", "value": 0.5}
    ],
    
    "access": {
      "granted": false,
      "requested_at": "ISO8601"
    }
  }
}
```

---

### Section 8: PROJECT

```json
{
  "project": {
    "timeline": {
      "start_date": "2025-10-01",
      "end_date": "2025-12-31",
      "milestones": [
        {"name": "Strategy approved", "date": "2025-10-15"},
        {"name": "Campaigns live", "date": "2025-11-01"}
      ]
    },
    
    "stakeholders": [
      {
        "name": "Иван Петров",
        "role": "CMO",
        "decision_level": "final_approver"
      }
    ],
    
    "risks": [
      {
        "risk": "Delayed approvals",
        "mitigation": "Single point of contact",
        "probability": "medium"
      }
    ]
  }
}
```

---

## ✅ VALIDATION RULES

```yaml
Required Fields (must be filled):
  - company.name
  - products[].name, price_range, landing_page
  - target_audience[].demographics
  - goals_kpis.marketing_kpis.leads.total
  - goals_kpis.budget.total_monthly
  - channels (at least 1)

Completeness Calculation:
  total_fields = 150
  filled_fields = count(non_null_values)
  completeness = (filled_fields / total_fields) * 100
  
  threshold: >95% для approval
```

---

## 🔗 API ENDPOINTS (for developers)

```yaml
POST /api/briefs
  - Create new brief
  - Input: client_id, request data
  - Output: brief_id, brief_url

GET /api/briefs/{id}
  - Get brief data
  - Output: full brief JSON

PATCH /api/briefs/{id}
  - Update brief sections
  - Input: sections to update
  - Output: updated brief

POST /api/briefs/{id}/validate
  - Run validation
  - Output: completeness, errors[]

POST /api/briefs/{id}/approve
  - Approve brief
  - Input: approver_id
  - Output: approved status
```

---

**Версия:** 2.1  
**Строк:** 96  
**Статус:** ✅ Готово


