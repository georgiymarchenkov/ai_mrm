---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: artifact_doc
title: Brief - Примеры
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: 02_ARTIFACTS/Brief/Examples.md
effective_date: 2025-10-24
visibility: internal
security_level: medium
tags: [artifact, brief]
---

# Brief - Примеры

→ [Overview](./Overview.md) | [Data Structure](./Data_Structure.md) | [Web UI](./UI_Template_Web.md) | [Sheets UI](./UI_Template_Sheets.md) | [Validation](./Validation_Rules.md)

---

## 🎯 КЕЙС: ЗАСТРОЙЩИК "СТРОЙГРУПП"

### Описание клиента:
- **Компания:** ООО "СтройГрупп"
- **Индустрия:** Недвижимость (застройщик)
- **География:** Москва, СПб, Казань
- **Проекты:** 3 ЖК на разных стадиях
- **Бюджет:** 15М₽/месяц на 3 месяца (Q4 2025)

---

## 📋 ПРИМЕР ЗАПОЛНЕННОГО БРИФА

### 1. COMPANY

```json
{
  "company": {
    "name": "ООО СтройГрупп",
    "industry": "real_estate_developer",
    "sub_industry": "residential",
    "website": "https://stroygroupp.ru",
    "year_founded": 2010,
    "team_size": "50-100",
    
    "positioning_current": "Проверенный застройщик с 15-летним опытом",
    "positioning_desired": "Премиум-комфорт в лучших локациях городов",
    "brand_personality": ["modern", "trustworthy", "premium"],
    
    "competitors": [
      {
        "name": "Садовые кварталы",
        "positioning": "Premium family living",
        "strengths": ["green areas", "infrastructure"],
        "weaknesses": ["далеко от метро", "высокая цена"]
      },
      {
        "name": "ПИК",
        "positioning": "Массовый сегмент",
        "strengths": ["объемы", "цена"],
        "weaknesses": ["качество", "локации"]
      }
    ],
    
    "usp": [
      "Метро 5-10 минут от всех ЖК",
      "Проверенный застройщик 15+ лет",
      "Качественные материалы и отделка"
    ]
  }
}
```

---

### 2. PRODUCTS

```json
{
  "products": [
    {
      "product_id": "PROD-001",
      "name": "ЖК Солнечный - Квартиры",
      "type": "apartments",
      "city": "Москва",
      "location": "Центр, м. Маяковская 5 мин",
      "address": "ул. Садовая-Триумфальная, 18",
      
      "variations": [
        {
          "name": "1-комнатные",
          "area_sqm": [45, 50],
          "price_range": [8000000, 10000000],
          "quantity_available": 20,
          "floor_range": [5, 20]
        },
        {
          "name": "2-комнатные",
          "area_sqm": [65, 75],
          "price_range": [12000000, 14000000],
          "quantity_available": 30,
          "floor_range": [5, 20]
        },
        {
          "name": "3-комнатные",
          "area_sqm": [85, 95],
          "price_range": [15000000, 18000000],
          "quantity_available": 15,
          "floor_range": [5, 20]
        }
      ],
      
      "features": [
        "Панорамные окна",
        "Высокие потолки 3м",
        "Подземный паркинг",
        "Консьерж-сервис",
        "Детская площадка"
      ],
      
      "target_audience": {
        "primary": "Семьи 35-50, высокий доход",
        "secondary": "Профессионалы 30-45, карьера"
      },
      
      "usp": ["центр города", "метро 5мин", "премиум отделка"],
      "landing_page": "https://solnechniy-msk.ru/kvartiry",
      
      "sales_status": {
        "current_monthly_sales": 15,
        "target_monthly_sales": 40,
        "average_deal_cycle_days": 60,
        "conversion_lead_to_sale": 0.08
      }
    },
    
    {
      "product_id": "PROD-002",
      "name": "ЖК Морской - Квартиры",
      "type": "apartments",
      "city": "СПб",
      "location": "Приморский район, м. Комендантский проспект 7 мин",
      "address": "Коломяжский проспект, 15",
      
      "variations": [
        {
          "name": "1-комнатные",
          "area_sqm": [40, 48],
          "price_range": [6000000, 8000000],
          "quantity_available": 35
        },
        {
          "name": "2-комнатные",
          "area_sqm": [60, 70],
          "price_range": [9000000, 11000000],
          "quantity_available": 40
        }
      ],
      
      "features": [
        "Вид на Финский залив",
        "Собственный пляж",
        "Благоустроенный двор",
        "Охраняемая территория"
      ],
      
      "target_audience": {
        "primary": "Молодые семьи 28-40",
        "secondary": "Пары без детей 25-35"
      },
      
      "usp": ["вид на море", "природа рядом", "современный"],
      "landing_page": "https://morskoy-spb.ru",
      
      "sales_status": {
        "current_monthly_sales": 20,
        "target_monthly_sales": 50,
        "average_deal_cycle_days": 45,
        "conversion_lead_to_sale": 0.10
      }
    },
    
    {
      "product_id": "PROD-003",
      "name": "ЖК Лесной - Квартиры",
      "type": "apartments",
      "city": "Казань",
      "location": "Приволжский район, м. Суконная слобода 10 мин",
      "address": "ул. Большая Красная, 55",
      
      "variations": [
        {
          "name": "1-комнатные",
          "area_sqm": [38, 45],
          "price_range": [4000000, 5500000],
          "quantity_available": 25
        },
        {
          "name": "2-комнатные",
          "area_sqm": [55, 65],
          "price_range": [6000000, 7500000],
          "quantity_available": 30
        }
      ],
      
      "features": [
        "Лесопарк рядом",
        "Развитая инфраструктура",
        "Доступные цены",
        "Качественная отделка"
      ],
      
      "target_audience": {
        "primary": "Молодые покупатели 25-35, первая квартира"
      },
      
      "usp": ["доступная цена", "экология", "качество"],
      "landing_page": "https://lesnoy-kzn.ru",
      
      "sales_status": {
        "current_monthly_sales": 12,
        "target_monthly_sales": 30,
        "average_deal_cycle_days": 50,
        "conversion_lead_to_sale": 0.09
      }
    }
  ]
}
```

---

### 3. TARGET_AUDIENCE (детально)

```json
{
  "target_audience": [
    {
      "segment_id": "TA-001",
      "segment_name": "Established Families Moscow",
      "priority": "primary",
      "product": "ЖК Солнечный",
      
      "demographics": {
        "age": [35, 55],
        "gender": "all",
        "income_monthly": ">200000",
        "family_status": "married_with_kids",
        "education": "higher",
        "occupation": "Managers, Executives, Entrepreneurs"
      },
      
      "psychographics": {
        "values": ["status", "convenience", "quality", "time_value"],
        "lifestyle": "Active, career-focused, family-oriented",
        "pain_points": [
          "Трафик - тратят много времени на дорогу",
          "Старая квартира - хотят улучшить жилищные условия",
          "Статус - важно где живут"
        ],
        "aspirations": [
          "Квартира в центре города",
          "Престижный адрес",
          "Комфорт для семьи"
        ]
      },
      
      "behavior": {
        "online_channels": ["yandex_search", "vk", "telegram"],
        "search_keywords": [
          "купить квартиру москва центр",
          "новостройки у метро москва",
          "квартиры в центре москвы"
        ],
        "decision_timeframe_days": [30, 90],
        "decision_factors": [
          "Локация (метро близко)",
          "Репутация застройщика",
          "Цена/качество",
          "Инфраструктура"
        ],
        "info_sources": [
          "Яндекс поиск",
          "Отзывы на форумах",
          "Сайты застройщиков",
          "Рекомендации знакомых"
        ]
      },
      
      "size_estimate": 50000,
      "geographic_focus": "Москва, ЦАО, САО"
    }
  ]
}
```

---

### 4. GOALS & KPIs

```json
{
  "goals_kpis": {
    "business_goals": [
      {
        "goal": "Продать 120 квартир в Q4 2025",
        "breakdown": {
          "ЖК Солнечный": 40,
          "ЖК Морской": 50,
          "ЖК Лесной": 30
        },
        "timeline": "Q4 2025 (Oct-Dec)",
        "priority": "P0"
      },
      {
        "goal": "Выручка 1.2 млрд ₽",
        "calculation": "120 квартир × 10М₽ average",
        "timeline": "Q4 2025",
        "priority": "P0"
      }
    ],
    
    "marketing_kpis": {
      "leads": {
        "total": 9000,
        "by_month": {
          "october": 2500,
          "november": 3000,
          "december": 3500
        },
        "by_city": {
          "moscow": 4500,
          "spb": 3000,
          "kazan": 1500
        },
        "target_cpl": 1667,
        "quality_threshold": 0.70
      },
      
      "brand_awareness": {
        "awareness_lift": 0.20,
        "consideration_increase": 0.15,
        "measurement": "Brand lift study"
      },
      
      "engagement": {
        "site_visits": 450000,
        "avg_time_on_site_minutes": 3.5,
        "pages_per_visit": 4.2
      }
    },
    
    "budget": {
      "total_monthly": 15000000,
      "total_quarterly": 45000000,
      "flexibility": 0.10,
      "by_city": {
        "moscow": 8000000,
        "spb": 4000000,
        "kazan": 3000000
      },
      "by_product": {
        "apartments": 12000000,
        "parking": 1500000,
        "business_spaces": 1500000
      },
      "reserve": 2000000
    }
  }
}
```

---

### 5. CHANNELS (требования)

```json
{
  "channels": {
    "context_advertising": {
      "platforms": ["yandex_direct", "google_ads"],
      "budget": 6000000,
      "expected_leads": 5000,
      "target_cpl": 1200,
      
      "requirements": {
        "keywords_ideas": [
          "купить квартиру москва центр",
          "новостройки москва",
          "квартиры у метро",
          "жк солнечный москва"
        ],
        "negative_keywords": [
          "аренда",
          "вторичка",
          "дешево",
          "комната",
          "хостел"
        ],
        "landing_pages": {
          "moscow": "https://solnechniy-msk.ru/kvartiry",
          "spb": "https://morskoy-spb.ru",
          "kazan": "https://lesnoy-kzn.ru"
        },
        "ad_formats": ["text_ads", "dynamic_ads"],
        "geo_targeting": ["Moscow", "SPb", "Kazan"],
        "device_strategy": "All devices, mobile priority"
      }
    }
  }
}
```

---

## ✅ COMPLETENESS CHECK

```yaml
Company: 100% ✅
Products: 100% (3 products) ✅
Target Audience: 100% ✅
Goals & KPIs: 100% ✅
Budget: 100% ✅
Channels: 90% (достаточно) ✅
Creative: 95% ✅
Analytics: 100% ✅

Overall: 97% ✅ READY FOR APPROVAL
```

---

**Версия:** 2.1 | **Строк:** 195 | **Статус:** ✅


