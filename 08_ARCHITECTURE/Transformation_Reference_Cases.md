---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: reference
title: Transformation Reference Cases - Референсные примеры трансформаций
language: ru
industry: advertising
role_apply: [developer, ai_engineer, qa]
period: 2025-10
version: "1.0"
source_path: 08_ARCHITECTURE/Transformation_Reference_Cases.md
effective_date: 2025-10-24
visibility: internal
security_level: medium
tags: [architecture, transformation, examples, reference]
---

# Transformation Reference Cases
## Референсные примеры трансформаций данных

→ [Data Transformation Testing Plan](./Data_Transformation_Testing_Plan.md)

---

## 🎯 НАЗНАЧЕНИЕ

Этот документ содержит **конкретные примеры** трансформаций различных входных данных в эталонную структуру MRM. Используется для:
- Разработки AI prompts
- Тестирования extraction accuracy
- Обучения команды
- Документации expected behavior

---

## 📋 CASE 1: Тендерный заказ → Бриф

### Input: Тендерный документ

```
Файл: tender_sberbank_premium_card.xlsx

┌─────────────────────────────────────────────────────────────┐
│              ТЕНДЕРНОЕ ЗАДАНИЕ                              │
│         Продвижение премиальной банковской карты            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Заказчик: ПАО "Сбербанк"                                   │
│ Контактное лицо: Иванова Елена Петровна                    │
│ Email: e.ivanova@sberbank.ru                                │
│                                                             │
│ ОПИСАНИЕ ПРОЕКТА:                                           │
│ Необходимо провести рекламную кампанию по продвижению      │
│ премиальной банковской карты "Сбербанк Премьер" среди      │
│ состоятельных клиентов в крупных городах России.           │
│                                                             │
│ ЦЕЛЕВАЯ АУДИТОРИЯ:                                          │
│ - Возраст: 30-50 лет                                        │
│ - Доход: от 150 000 руб/мес                                 │
│ - География: Москва, Санкт-Петербург, Екатеринбург,        │
│   Новосибирск, Казань                                       │
│ - Интересы: премиум-услуги, путешествия, бизнес            │
│                                                             │
│ БЮДЖЕТ:                                                     │
│ Общий бюджет кампании: 18 500 тыс. руб.                    │
│ (включая НДС)                                               │
│                                                             │
│ СРОКИ:                                                      │
│ Начало: 01.11.2025                                          │
│ Окончание: 31.12.2025                                       │
│                                                             │
│ ОЖИДАЕМЫЕ РЕЗУЛЬТАТЫ:                                       │
│ - Охват: не менее 2 млн человек                             │
│ - CPA (стоимость заявки): не более 1 800 руб                │
│ - Конверсия в заявку: не менее 2,5%                         │
│                                                             │
│ ПРИОРИТЕТНЫЕ КАНАЛЫ:                                        │
│ Digital-реклама (Яндекс, VK, Telegram)                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Output: Эталонный бриф MRM

```json
{
  "artifact_type": "brief",
  "artifact_name": "Бриф: Сбербанк Премьер",
  
  "data": {
    // Основная информация
    "client_name": "Сбербанк",
    "client_full_name": "ПАО \"Сбербанк\"",
    "campaign_name": "Сбербанк Премьер - Q4 2025",
    "campaign_objective": "Продвижение премиальной банковской карты среди состоятельных клиентов",
    
    // Продукт
    "product": {
      "name": "Сбербанк Премьер",
      "category": "Финансовые услуги",
      "subcategory": "Премиальные банковские карты"
    },
    
    // Бюджет
    "budget": {
      "total": 18500000,          // Преобразовали "18 500 тыс. руб." → 18,500,000
      "currency": "RUB",
      "includes_vat": true,
      "vat_rate": 0.20
    },
    
    // Период
    "period": {
      "start": "2025-11-01",
      "end": "2025-12-31",
      "duration_days": 61
    },
    
    // География
    "geography": [
      "Москва",
      "Санкт-Петербург",
      "Екатеринбург",
      "Новосибирск",
      "Казань"
    ],
    
    // Целевая аудитория
    "target_audience": {
      "age": [30, 50],
      "gender": "all",
      "income": {
        "min": 150000,
        "currency": "RUB",
        "period": "month"
      },
      "interests": [
        "премиум-услуги",
        "путешествия",
        "бизнес"
      ],
      "description": "Состоятельные клиенты с высоким уровнем дохода"
    },
    
    // KPI
    "kpis": {
      "reach": {
        "value": 2000000,
        "unit": "people",
        "description": "Охват целевой аудитории"
      },
      "cpa": {
        "value": 1800,
        "currency": "RUB",
        "description": "Стоимость заявки"
      },
      "conversion_rate": {
        "value": 2.5,
        "unit": "percent",
        "description": "Конверсия в заявку"
      }
    },
    
    // Каналы
    "preferred_channels": [
      "Яндекс Директ",
      "VK Реклама",
      "Telegram Ads"
    ],
    
    // Контакты
    "contacts": {
      "primary": {
        "name": "Иванова Елена Петровна",
        "email": "e.ivanova@sberbank.ru",
        "role": "Контактное лицо"
      }
    }
  },
  
  "metadata": {
    "source_type": "tender_import",
    "source_file": "tender_sberbank_premium_card.xlsx",
    "extracted_at": "2025-10-24T10:00:00Z",
    "ai_confidence": 0.92
  },
  
  "completeness": 95,
  "status": "draft"
}
```

### Маппинг полей

```typescript
// Как AI должен понимать маппинг:
const TENDER_TO_BRIEF_MAPPING = {
  'Заказчик': 'client_name',
  'ПАО "Сбербанк"': 'client_full_name',
  'ОПИСАНИЕ ПРОЕКТА': 'campaign_objective',
  'Общий бюджет кампании: X тыс. руб.': 'budget.total (умножить на 1000)',
  'включая НДС': 'budget.includes_vat = true',
  'Начало: DD.MM.YYYY': 'period.start',
  'Окончание: DD.MM.YYYY': 'period.end',
  'Возраст: X-Y лет': 'target_audience.age = [X, Y]',
  'Доход: от X руб/мес': 'target_audience.income.min',
  'География: город1, город2': 'geography = [город1, город2]',
  'Интересы: x, y, z': 'target_audience.interests',
  'CPA: X руб': 'kpis.cpa.value',
  'Охват: X человек': 'kpis.reach.value',
  'Конверсия: X%': 'kpis.conversion_rate.value',
  'ПРИОРИТЕТНЫЕ КАНАЛЫ': 'preferred_channels'
};
```

---

## 📋 CASE 2: Медиаплан агентства → Эталонный медиаплан

### Input: Медиаплан от агентства Realweb

```
Файл: realweb_sberbank_november_2025.xlsx

Sheet 1: "Общая информация"
┌──────────────────────────────────────────┐
│ Клиент:     Сбербанк                     │
│ Проект:     Премьер карта                │
│ Период:     Ноябрь 2025                  │
│ Бюджет:     5 000 тыс. руб. (без НДС)   │
│ Менеджер:   Петров А.В.                  │
└──────────────────────────────────────────┘

Sheet 2: "Яндекс Директ"
┌─────────────────┬────────────┬──────────────┬─────────────┐
│ Формат          │ Бюджет     │ Показы (план)│ CPC (план)  │
│                 │ (тыс.руб)  │              │             │
├─────────────────┼────────────┼──────────────┼─────────────┤
│ Поиск           │ 800        │ 1 200 000    │ 45          │
│ РСЯ             │ 600        │ 2 500 000    │ 18          │
│ Мастер кампаний │ 400        │ 1 800 000    │ 22          │
├─────────────────┼────────────┼──────────────┼─────────────┤
│ ИТОГО           │ 1 800      │ 5 500 000    │ -           │
└─────────────────┴────────────┴──────────────┴─────────────┘

Sheet 3: "VK Реклама"
┌─────────────────┬────────────┬──────────────┬─────────────┐
│ Формат          │ Бюджет     │ Охват (план) │ CPM (план)  │
│                 │ (тыс.руб)  │              │             │
├─────────────────┼────────────┼──────────────┼─────────────┤
│ Лента           │ 700        │ 800 000      │ 350         │
│ Истории         │ 500        │ 600 000      │ 420         │
│ Клипы           │ 300        │ 400 000      │ 380         │
├─────────────────┼────────────┼──────────────┼─────────────┤
│ ИТОГО           │ 1 500      │ 1 800 000    │ -           │
└─────────────────┴────────────┴──────────────┴─────────────┘

Sheet 4: "Telegram Ads"
┌─────────────────┬────────────┬──────────────┬─────────────┐
│ Формат          │ Бюджет     │ Охват (план) │ CPM (план)  │
│                 │ (тыс.руб)  │              │             │
├─────────────────┼────────────┼──────────────┼─────────────┤
│ Каналы          │ 1 000      │ 1 200 000    │ 420         │
│ Посты           │ 700        │ 900 000      │ 390         │
├─────────────────┼────────────┼──────────────┼─────────────┤
│ ИТОГО           │ 1 700      │ 2 100 000    │ -           │
└─────────────────┴────────────┴──────────────┴─────────────┘
```

### Output: Эталонный медиаплан MRM

```json
{
  "artifact_type": "media_plan",
  "artifact_name": "Медиаплан Ноябрь 2025",
  
  "data": {
    // Основная информация
    "client_name": "Сбербанк",
    "project_name": "Премьер карта",
    "period": {
      "month": 11,
      "year": 2025,
      "name": "Ноябрь 2025",
      "start_date": "2025-11-01",
      "end_date": "2025-11-30"
    },
    
    // Бюджет
    "total_budget": 5000000,      // 5 000 тыс. руб. → 5,000,000
    "budget_currency": "RUB",
    "budget_includes_vat": false, // Явно "без НДС"
    
    // Каналы
    "channels": [
      {
        "name": "Яндекс Директ",
        "platform": "yandex_direct",
        "budget": 1800000,        // 1 800 тыс. руб. → 1,800,000
        "budget_percentage": 36,   // 1800/5000 * 100
        
        "formats": [
          {
            "name": "Поиск",
            "budget": 800000,
            "kpis": {
              "impressions": 1200000,
              "cpc": 45,
              "clicks": 26666       // Расчетное: budget / cpc
            }
          },
          {
            "name": "РСЯ",
            "budget": 600000,
            "kpis": {
              "impressions": 2500000,
              "cpc": 18,
              "clicks": 33333
            }
          },
          {
            "name": "Мастер кампаний",
            "budget": 400000,
            "kpis": {
              "impressions": 1800000,
              "cpc": 22,
              "clicks": 18181
            }
          }
        ],
        
        "kpis": {
          "impressions": 5500000,
          "clicks": 78180,
          "ctr": 1.42,             // Расчетное: clicks/impressions * 100
          "avg_cpc": 23.03         // Расчетное: budget/clicks
        }
      },
      
      {
        "name": "VK Реклама",
        "platform": "vk_ads",
        "budget": 1500000,
        "budget_percentage": 30,
        
        "formats": [
          {
            "name": "Лента",
            "budget": 700000,
            "kpis": {
              "reach": 800000,
              "cpm": 350,
              "impressions": 2000000  // Расчетное: budget / cpm * 1000
            }
          },
          {
            "name": "Истории",
            "budget": 500000,
            "kpis": {
              "reach": 600000,
              "cpm": 420,
              "impressions": 1190476
            }
          },
          {
            "name": "Клипы",
            "budget": 300000,
            "kpis": {
              "reach": 400000,
              "cpm": 380,
              "impressions": 789473
            }
          }
        ],
        
        "kpis": {
          "reach": 1800000,
          "impressions": 3979949,
          "avg_cpm": 377
        }
      },
      
      {
        "name": "Telegram Ads",
        "platform": "telegram_ads",
        "budget": 1700000,
        "budget_percentage": 34,
        
        "formats": [
          {
            "name": "Каналы",
            "budget": 1000000,
            "kpis": {
              "reach": 1200000,
              "cpm": 420,
              "impressions": 2380952
            }
          },
          {
            "name": "Посты",
            "budget": 700000,
            "kpis": {
              "reach": 900000,
              "cpm": 390,
              "impressions": 1794871
            }
          }
        ],
        
        "kpis": {
          "reach": 2100000,
          "impressions": 4175823,
          "avg_cpm": 407
        }
      }
    ],
    
    // Таргетинг (общий для всех каналов, если не указан отдельно)
    "targeting": {
      "geo": ["Москва", "Санкт-Петербург", "Екатеринбург", "Новосибирск", "Казань"],
      "age": [30, 50],
      "gender": "all",
      "interests": ["финансы", "премиум-услуги", "путешествия"]
    },
    
    // Расписание
    "schedule": {
      "start_date": "2025-11-01",
      "end_date": "2025-11-30",
      "days_active": 30,
      "daily_budget": 166666      // total_budget / 30
    },
    
    // Общие KPI
    "overall_kpis": {
      "total_impressions": 13655772,
      "total_reach": 3900000,
      "total_clicks": 78180,
      "avg_ctr": 0.57,
      "total_budget": 5000000
    }
  },
  
  "metadata": {
    "source_type": "agency_media_plan",
    "agency_name": "Realweb",
    "source_file": "realweb_sberbank_november_2025.xlsx",
    "manager": "Петров А.В.",
    "extracted_at": "2025-10-24T10:00:00Z",
    "ai_confidence": 0.94
  },
  
  "completeness": 98,
  "status": "draft"
}
```

### Ключевые трансформации

```typescript
const AGENCY_MEDIAPLAN_TRANSFORMATIONS = {
  // 1. Преобразование бюджета
  'X тыс. руб.': (value) => value * 1000,
  
  // 2. Маппинг названий каналов
  channel_mapping: {
    'Яндекс Директ': 'yandex_direct',
    'VK Реклама': 'vk_ads',
    'Telegram Ads': 'telegram_ads'
  },
  
  // 3. Расчет недостающих метрик
  calculated_metrics: {
    'clicks': 'budget / cpc',
    'impressions (from CPM)': 'budget / cpm * 1000',
    'ctr': 'clicks / impressions * 100',
    'budget_percentage': 'channel_budget / total_budget * 100'
  },
  
  // 4. Объединение данных с разных листов
  multi_sheet_aggregation: {
    'Sheet "Общая информация"': 'Основные данные проекта',
    'Sheet "Канал X"': 'Данные по каналу X',
    'Итоговые строки': 'Суммы для валидации'
  },
  
  // 5. Валидация консистентности
  validation_rules: [
    'Сумма бюджетов каналов = total_budget',
    'Сумма бюджетов форматов = бюджет канала',
    'budget_percentage всех каналов ≈ 100%'
  ]
};
```

---

## 📋 CASE 3: Правила UTM → Структура медиаплана

### Input: Таблица с правилами UTM

```
Файл: utm_rules_sberbank_premier.xlsx

┌──────────────┬──────────────┬───────────────┬─────────────────┬──────────────┐
│ Канал        │ Формат       │ utm_source    │ utm_medium      │ utm_campaign │
├──────────────┼──────────────┼───────────────┼─────────────────┼──────────────┤
│ Яндекс       │ Поиск        │ yandex        │ cpc             │ premier_nov  │
│ Яндекс       │ РСЯ          │ yandex        │ cpc             │ premier_nov  │
│ Яндекс       │ Мастер       │ yandex        │ cpc             │ premier_nov  │
│ VK           │ Лента        │ vk            │ social          │ premier_nov  │
│ VK           │ Истории      │ vk            │ social          │ premier_nov  │
│ VK           │ Клипы        │ vk            │ video           │ premier_nov  │
│ Telegram     │ Каналы       │ telegram      │ messenger       │ premier_nov  │
│ Telegram     │ Посты        │ telegram      │ messenger       │ premier_nov  │
└──────────────┴──────────────┴───────────────┴─────────────────┴──────────────┘

┌──────────────┬──────────────┬──────────────────┬──────────────────────────────┐
│ Канал        │ Формат       │ utm_content      │ utm_term                     │
├──────────────┼──────────────┼──────────────────┼──────────────────────────────┤
│ Яндекс       │ Поиск        │ text_ad          │ {keyword}                    │
│ Яндекс       │ РСЯ          │ banner_{size}    │ {geo}_{age}                  │
│ Яндекс       │ Мастер       │ smart            │ auto                         │
│ VK           │ Лента        │ image_ad         │ {targeting_id}               │
│ VK           │ Истории      │ story            │ premium                      │
│ VK           │ Клипы        │ video_15s        │ premium                      │
│ Telegram     │ Каналы       │ channel_post     │ {channel_name}               │
│ Telegram     │ Посты        │ sponsored        │ finance                      │
└──────────────┴──────────────┴──────────────────┴──────────────────────────────┘
```

### Output: UTM структура привязанная к медиаплану

```json
{
  "artifact_type": "utm_rules",
  "artifact_name": "Правила UTM Ноябрь 2025",
  
  "data": {
    "project_name": "Сбербанк Премьер",
    "period": "Ноябрь 2025",
    "campaign_code": "premier_nov",
    
    "channels": [
      {
        "channel_name": "Яндекс Директ",
        "channel_code": "yandex",
        
        "formats": [
          {
            "format_name": "Поиск",
            "utm_template": "utm_source=yandex&utm_medium=cpc&utm_campaign=premier_nov&utm_content=text_ad&utm_term={keyword}",
            
            "utm_params": {
              "utm_source": "yandex",
              "utm_medium": "cpc",
              "utm_campaign": "premier_nov",
              "utm_content": "text_ad",
              "utm_term": "{keyword}"       // Динамический параметр
            },
            
            "dynamic_params": {
              "keyword": {
                "type": "dynamic",
                "description": "Поисковый запрос из Яндекс Директ",
                "example": "премиум карта сбербанк"
              }
            }
          },
          
          {
            "format_name": "РСЯ",
            "utm_template": "utm_source=yandex&utm_medium=cpc&utm_campaign=premier_nov&utm_content=banner_{size}&utm_term={geo}_{age}",
            
            "utm_params": {
              "utm_source": "yandex",
              "utm_medium": "cpc",
              "utm_campaign": "premier_nov",
              "utm_content": "banner_{size}",
              "utm_term": "{geo}_{age}"
            },
            
            "dynamic_params": {
              "size": {
                "type": "dynamic",
                "description": "Размер баннера",
                "example": "300x250"
              },
              "geo": {
                "type": "dynamic",
                "description": "Город показа",
                "example": "moscow"
              },
              "age": {
                "type": "dynamic",
                "description": "Возрастная группа",
                "example": "30_40"
              }
            }
          },
          
          {
            "format_name": "Мастер кампаний",
            "utm_template": "utm_source=yandex&utm_medium=cpc&utm_campaign=premier_nov&utm_content=smart&utm_term=auto",
            
            "utm_params": {
              "utm_source": "yandex",
              "utm_medium": "cpc",
              "utm_campaign": "premier_nov",
              "utm_content": "smart",
              "utm_term": "auto"
            },
            
            "dynamic_params": {}
          }
        ]
      },
      
      {
        "channel_name": "VK Реклама",
        "channel_code": "vk",
        
        "formats": [
          {
            "format_name": "Лента",
            "utm_template": "utm_source=vk&utm_medium=social&utm_campaign=premier_nov&utm_content=image_ad&utm_term={targeting_id}",
            
            "utm_params": {
              "utm_source": "vk",
              "utm_medium": "social",
              "utm_campaign": "premier_nov",
              "utm_content": "image_ad",
              "utm_term": "{targeting_id}"
            },
            
            "dynamic_params": {
              "targeting_id": {
                "type": "dynamic",
                "description": "ID таргетинга во VK",
                "example": "12345"
              }
            }
          },
          
          {
            "format_name": "Истории",
            "utm_template": "utm_source=vk&utm_medium=social&utm_campaign=premier_nov&utm_content=story&utm_term=premium",
            
            "utm_params": {
              "utm_source": "vk",
              "utm_medium": "social",
              "utm_campaign": "premier_nov",
              "utm_content": "story",
              "utm_term": "premium"
            }
          },
          
          {
            "format_name": "Клипы",
            "utm_template": "utm_source=vk&utm_medium=video&utm_campaign=premier_nov&utm_content=video_15s&utm_term=premium",
            
            "utm_params": {
              "utm_source": "vk",
              "utm_medium": "video",
              "utm_campaign": "premier_nov",
              "utm_content": "video_15s",
              "utm_term": "premium"
            }
          }
        ]
      },
      
      {
        "channel_name": "Telegram Ads",
        "channel_code": "telegram",
        
        "formats": [
          {
            "format_name": "Каналы",
            "utm_template": "utm_source=telegram&utm_medium=messenger&utm_campaign=premier_nov&utm_content=channel_post&utm_term={channel_name}",
            
            "utm_params": {
              "utm_source": "telegram",
              "utm_medium": "messenger",
              "utm_campaign": "premier_nov",
              "utm_content": "channel_post",
              "utm_term": "{channel_name}"
            },
            
            "dynamic_params": {
              "channel_name": {
                "type": "dynamic",
                "description": "Название канала в Telegram",
                "example": "finance_news"
              }
            }
          },
          
          {
            "format_name": "Посты",
            "utm_template": "utm_source=telegram&utm_medium=messenger&utm_campaign=premier_nov&utm_content=sponsored&utm_term=finance",
            
            "utm_params": {
              "utm_source": "telegram",
              "utm_medium": "messenger",
              "utm_campaign": "premier_nov",
              "utm_content": "sponsored",
              "utm_term": "finance"
            }
          }
        ]
      }
    ],
    
    // Правила генерации финальных URL
    "url_generation_rules": {
      "base_url": "https://www.sberbank.ru/premier-card",
      "append_params": true,
      "encoding": "url_encode",
      
      "examples": [
        {
          "channel": "Яндекс Директ",
          "format": "Поиск",
          "keyword": "премиум карта",
          "final_url": "https://www.sberbank.ru/premier-card?utm_source=yandex&utm_medium=cpc&utm_campaign=premier_nov&utm_content=text_ad&utm_term=%D0%BF%D1%80%D0%B5%D0%BC%D0%B8%D1%83%D0%BC+%D0%BA%D0%B0%D1%80%D1%82%D0%B0"
        },
        {
          "channel": "VK Реклама",
          "format": "Лента",
          "targeting_id": "12345",
          "final_url": "https://www.sberbank.ru/premier-card?utm_source=vk&utm_medium=social&utm_campaign=premier_nov&utm_content=image_ad&utm_term=12345"
        }
      ]
    }
  },
  
  "metadata": {
    "source_type": "utm_rules_import",
    "source_file": "utm_rules_sberbank_premier.xlsx",
    "extracted_at": "2025-10-24T10:00:00Z",
    "ai_confidence": 0.97
  },
  
  "completeness": 100,
  "status": "approved"
}
```

---

## 📋 CASE 4: Выгрузка Яндекс Директ → Структура кампаний

### Input: Статистика из Яндекс Директ

```
Файл: yandex_direct_stats_october_2025.xlsx

┌─────────────┬───────────────────────────────┬──────────┬──────────┬──────────┬─────────────┬─────────┐
│ ID кампании │ Название кампании              │ Показы   │ Клики    │ CTR, %   │ Расход, руб │ Конверсии│
├─────────────┼───────────────────────────────┼──────────┼──────────┼──────────┼─────────────┼─────────┤
│ 123456789   │ Сбербанк_Премьер_Поиск_Москва │ 1245678  │ 34567    │ 2.77     │ 1556789.50  │ 876     │
│ 123456790   │ Сбербанк_Премьер_РСЯ_Москва   │ 2567890  │ 45678    │ 1.78     │ 821234.00   │ 567     │
│ 123456791   │ Сбербанк_Премьер_Поиск_СПб    │ 876543   │ 23456    │ 2.68     │ 1056789.00  │ 634     │
│ 123456792   │ Сбербанк_Премьер_РСЯ_СПб      │ 1789012  │ 34567    │ 1.93     │ 623456.50   │ 445     │
│ 123456793   │ Сбербанк_Премьер_Мастер       │ 1234567  │ 18901    │ 1.53     │ 415678.00   │ 302     │
└─────────────┴───────────────────────────────┴──────────┴──────────┴──────────┴─────────────┴─────────┘

┌─────────────┬─────────┬─────────────┬───────────────┬─────────────┬─────────────┐
│ ID кампании │ Отказы  │ Показатель  │ Ср. позиция   │ Ср. цена    │ Статус      │
│             │         │ отказов, %  │               │ клика, руб  │             │
├─────────────┼─────────┼─────────────┼───────────────┼─────────────┼─────────────┤
│ 123456789   │ 8760    │ 25.3        │ 1.2           │ 45.02       │ Активна     │
│ 123456790   │ 13670   │ 29.9        │ 3.5           │ 17.98       │ Активна     │
│ 123456791   │ 6340    │ 27.1        │ 1.3           │ 45.04       │ Активна     │
│ 123456792   │ 10340   │ 29.4        │ 3.8           │ 18.04       │ Активна     │
│ 123456793   │ 5734    │ 38.9        │ 2.1           │ 21.99       │ Активна     │
└─────────────┴─────────┴─────────────┴───────────────┴─────────────┴─────────────┘
```

### Output: Структура кампаний в MRM

```json
{
  "artifact_type": "platform_campaigns",
  "artifact_name": "Кампании Яндекс Директ - Октябрь 2025",
  
  "data": {
    "platform": "yandex_direct",
    "period": {
      "month": 10,
      "year": 2025,
      "name": "Октябрь 2025"
    },
    
    "campaigns": [
      {
        "external_id": "123456789",
        "platform": "yandex_direct",
        "name": "Сбербанк_Премьер_Поиск_Москва",
        
        // Парсим название кампании
        "parsed_name": {
          "client": "Сбербанк",
          "product": "Премьер",
          "format": "Поиск",
          "geo": "Москва"
        },
        
        "status": "active",
        "campaign_type": "search",
        
        // Метрики
        "metrics": {
          "impressions": 1245678,
          "clicks": 34567,
          "ctr": 2.77,
          "cost": 1556789.50,
          "conversions": 876,
          "bounces": 8760,
          "bounce_rate": 25.3,
          "avg_position": 1.2,
          "avg_cpc": 45.02,
          
          // Расчетные метрики
          "conversion_rate": 2.53,        // conversions / clicks * 100
          "cpa": 1777.28,                 // cost / conversions
          "romi": null                    // Нет данных о revenue
        },
        
        // Маппинг к медиаплану
        "media_plan_mapping": {
          "channel": "Яндекс Директ",
          "format": "Поиск",
          "geo": "Москва"
        }
      },
      
      {
        "external_id": "123456790",
        "platform": "yandex_direct",
        "name": "Сбербанк_Премьер_РСЯ_Москва",
        
        "parsed_name": {
          "client": "Сбербанк",
          "product": "Премьер",
          "format": "РСЯ",
          "geo": "Москва"
        },
        
        "status": "active",
        "campaign_type": "display",
        
        "metrics": {
          "impressions": 2567890,
          "clicks": 45678,
          "ctr": 1.78,
          "cost": 821234.00,
          "conversions": 567,
          "bounces": 13670,
          "bounce_rate": 29.9,
          "avg_position": 3.5,
          "avg_cpc": 17.98,
          "conversion_rate": 1.24,
          "cpa": 1448.66
        },
        
        "media_plan_mapping": {
          "channel": "Яндекс Директ",
          "format": "РСЯ",
          "geo": "Москва"
        }
      },
      
      {
        "external_id": "123456791",
        "platform": "yandex_direct",
        "name": "Сбербанк_Премьер_Поиск_СПб",
        
        "parsed_name": {
          "client": "Сбербанк",
          "product": "Премьер",
          "format": "Поиск",
          "geo": "СПб"
        },
        
        "status": "active",
        "campaign_type": "search",
        
        "metrics": {
          "impressions": 876543,
          "clicks": 23456,
          "ctr": 2.68,
          "cost": 1056789.00,
          "conversions": 634,
          "bounces": 6340,
          "bounce_rate": 27.1,
          "avg_position": 1.3,
          "avg_cpc": 45.04,
          "conversion_rate": 2.70,
          "cpa": 1667.07
        },
        
        "media_plan_mapping": {
          "channel": "Яндекс Директ",
          "format": "Поиск",
          "geo": "Санкт-Петербург"     // Нормализовали СПб → Санкт-Петербург
        }
      },
      
      {
        "external_id": "123456792",
        "platform": "yandex_direct",
        "name": "Сбербанк_Премьер_РСЯ_СПб",
        
        "parsed_name": {
          "client": "Сбербанк",
          "product": "Премьер",
          "format": "РСЯ",
          "geo": "СПб"
        },
        
        "status": "active",
        "campaign_type": "display",
        
        "metrics": {
          "impressions": 1789012,
          "clicks": 34567,
          "ctr": 1.93,
          "cost": 623456.50,
          "conversions": 445,
          "bounces": 10340,
          "bounce_rate": 29.4,
          "avg_position": 3.8,
          "avg_cpc": 18.04,
          "conversion_rate": 1.29,
          "cpa": 1401.15
        },
        
        "media_plan_mapping": {
          "channel": "Яндекс Директ",
          "format": "РСЯ",
          "geo": "Санкт-Петербург"
        }
      },
      
      {
        "external_id": "123456793",
        "platform": "yandex_direct",
        "name": "Сбербанк_Премьер_Мастер",
        
        "parsed_name": {
          "client": "Сбербанк",
          "product": "Премьер",
          "format": "Мастер",
          "geo": null    // Не указано в названии
        },
        
        "status": "active",
        "campaign_type": "smart",
        
        "metrics": {
          "impressions": 1234567,
          "clicks": 18901,
          "ctr": 1.53,
          "cost": 415678.00,
          "conversions": 302,
          "bounces": 5734,
          "bounce_rate": 38.9,
          "avg_position": 2.1,
          "avg_cpc": 21.99,
          "conversion_rate": 1.60,
          "cpa": 1376.42
        },
        
        "media_plan_mapping": {
          "channel": "Яндекс Директ",
          "format": "Мастер кампаний",
          "geo": "Все регионы"
        }
      }
    ],
    
    // Агрегированные метрики
    "summary": {
      "total_campaigns": 5,
      "active_campaigns": 5,
      
      "total_metrics": {
        "impressions": 7713690,
        "clicks": 157169,
        "avg_ctr": 2.04,
        "total_cost": 4473947.00,
        "total_conversions": 2824,
        "avg_conversion_rate": 1.80,
        "avg_cpa": 1584.63,
        "avg_cpc": 28.46
      },
      
      // По форматам
      "by_format": {
        "Поиск": {
          "campaigns": 2,
          "impressions": 2122221,
          "clicks": 58023,
          "cost": 2613578.50,
          "conversions": 1510
        },
        "РСЯ": {
          "campaigns": 2,
          "impressions": 4356902,
          "clicks": 80245,
          "cost": 1444690.50,
          "conversions": 1012
        },
        "Мастер": {
          "campaigns": 1,
          "impressions": 1234567,
          "clicks": 18901,
          "cost": 415678.00,
          "conversions": 302
        }
      }
    }
  },
  
  "metadata": {
    "source_type": "platform_export",
    "platform": "yandex_direct",
    "source_file": "yandex_direct_stats_october_2025.xlsx",
    "extracted_at": "2025-10-24T10:00:00Z",
    "ai_confidence": 0.96
  },
  
  "completeness": 100,
  "status": "processed"
}
```

### Ключевые трансформации

```typescript
const YANDEX_EXPORT_TRANSFORMATIONS = {
  // 1. Парсинг названия кампании
  campaign_name_parsing: {
    pattern: '{Client}_{Product}_{Format}_{Geo}',
    example: 'Сбербанк_Премьер_Поиск_Москва',
    extracted: {
      client: 'Сбербанк',
      product: 'Премьер',
      format: 'Поиск',
      geo: 'Москва'
    }
  },
  
  // 2. Нормализация географии
  geo_normalization: {
    'СПб': 'Санкт-Петербург',
    'Москва': 'Москва',
    'Екб': 'Екатеринбург',
    'Нск': 'Новосибирск'
  },
  
  // 3. Расчет недостающих метрик
  calculated_metrics: {
    'conversion_rate': 'conversions / clicks * 100',
    'cpa': 'cost / conversions',
    'romi': 'revenue / cost * 100 (если есть revenue)'
  },
  
  // 4. Маппинг типа кампании
  campaign_type_mapping: {
    'Поиск': 'search',
    'РСЯ': 'display',
    'Мастер': 'smart',
    'Динамические': 'dynamic'
  },
  
  // 5. Маппинг к медиаплану
  media_plan_mapping: {
    format: 'По полю "Format" из parsed_name',
    geo: 'По полю "Geo" из parsed_name (с нормализацией)',
    channel: 'yandex_direct'
  }
};
```

---

## 📝 ОБЩИЕ ПРАВИЛА ТРАНСФОРМАЦИИ

### 1. Единицы измерения

```typescript
const UNIT_CONVERSIONS = {
  // Бюджет
  'тыс. руб.': (value) => value * 1000,
  'млн. руб.': (value) => value * 1000000,
  '$': (value) => value * 90, // курс доллара (динамический)
  '€': (value) => value * 100, // курс евро (динамический)
  
  // Охват/показы
  'тыс.': (value) => value * 1000,
  'млн.': (value) => value * 1000000,
  'K': (value) => value * 1000,
  'M': (value) => value * 1000000,
  
  // Проценты
  '%': (value) => value / 100, // если нужно в decimal
  'процентов': (value) => value / 100
};
```

### 2. Даты

```typescript
const DATE_FORMATS = {
  // Русский формат
  'DD.MM.YYYY': '24.10.2025',
  'DD.MM.YY': '24.10.25',
  'D месяц YYYY': '24 октября 2025',
  
  // Международный
  'YYYY-MM-DD': '2025-10-24',
  'MM/DD/YYYY': '10/24/2025',
  
  // Преобразование всегда в ISO
  output_format: 'YYYY-MM-DD'
};
```

### 3. География

```typescript
const GEO_NORMALIZATION = {
  // Сокращения → Полное название
  'МСК': 'Москва',
  'СПб': 'Санкт-Петербург',
  'Питер': 'Санкт-Петербург',
  'Екб': 'Екатеринбург',
  'Нск': 'Новосибирск',
  'Казань': 'Казань',
  
  // Регионы
  'МО': 'Московская область',
  'ЛО': 'Ленинградская область',
  
  // Особые случаи
  'Вся Россия': 'all_russia',
  'Все регионы': 'all_russia',
  'РФ': 'all_russia'
};
```

### 4. Названия каналов

```typescript
const CHANNEL_NORMALIZATION = {
  // Различные написания → Стандартное название
  'Яндекс': 'yandex_direct',
  'Яндекс Директ': 'yandex_direct',
  'Yandex Direct': 'yandex_direct',
  
  'VK': 'vk_ads',
  'ВКонтакте': 'vk_ads',
  'VK Реклама': 'vk_ads',
  
  'Телеграм': 'telegram_ads',
  'Telegram': 'telegram_ads',
  'Telegram Ads': 'telegram_ads',
  
  'myTarget': 'mytarget',
  'МайТаргет': 'mytarget'
};
```

---

## ✅ ЧЕКЛИСТ ДЛЯ СОЗДАНИЯ REFERENCE CASE

При добавлении нового reference case:

```
□ 1. Реальный пример файла от клиента/агентства
□ 2. Input: полная структура исходных данных
□ 3. Output: ожидаемая структура в MRM формате
□ 4. Маппинг полей (Input → Output)
□ 5. Правила трансформации
□ 6. Расчетные метрики (формулы)
□ 7. Валидационные правила
□ 8. Edge cases и особые случаи
□ 9. Примеры ошибок и как их избежать
□ 10. AI confidence threshold
```

---

**Версия:** 1.0  
**Дата:** 24.10.2025  
**Статус:** ✅ Living Document (постоянно пополняется)

**Следующий шаг:** Использовать эти reference cases для обучения AI и тестирования.


