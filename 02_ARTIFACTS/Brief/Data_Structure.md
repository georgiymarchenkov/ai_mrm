---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: artifact_doc
title: Brief - Структура данных
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: 02_ARTIFACTS/Brief/Data_Structure.md
effective_date: 2025-10-24
visibility: internal
security_level: medium
tags: [artifact, brief]
---

# Brief - Структура данных

## 📋 JSON Schema для брифа клиента

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "ClientBrief",
  "type": "object",
  "required": [
    "briefId",
    "clientInfo",
    "campaignGoals",
    "targetAudience",
    "budget",
    "timeline"
  ],
  "properties": {
    "briefId": {
      "type": "string",
      "format": "uuid",
      "description": "Уникальный идентификатор брифа"
    },
    "createdAt": {
      "type": "string",
      "format": "date-time",
      "description": "Дата создания брифа"
    },
    "updatedAt": {
      "type": "string",
      "format": "date-time",
      "description": "Дата последнего обновления"
    },
    "status": {
      "type": "string",
      "enum": ["draft", "submitted", "in_review", "approved", "rejected"],
      "description": "Статус брифа"
    },
    "clientInfo": {
      "type": "object",
      "required": ["companyName", "contactPerson", "email"],
      "properties": {
        "companyName": {
          "type": "string",
          "minLength": 2,
          "maxLength": 200,
          "description": "Название компании"
        },
        "industry": {
          "type": "string",
          "description": "Отрасль бизнеса"
        },
        "website": {
          "type": "string",
          "format": "uri",
          "description": "Сайт компании"
        },
        "contactPerson": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "description": "ФИО контактного лица"
            },
            "position": {
              "type": "string",
              "description": "Должность"
            },
            "email": {
              "type": "string",
              "format": "email",
              "description": "Email"
            },
            "phone": {
              "type": "string",
              "pattern": "^\\+?[0-9]{10,15}$",
              "description": "Телефон"
            }
          }
        },
        "decisionMakers": {
          "type": "array",
          "description": "Лица, принимающие решения",
          "items": {
            "type": "object",
            "properties": {
              "name": { "type": "string" },
              "position": { "type": "string" },
              "email": { "type": "string", "format": "email" }
            }
          }
        }
      }
    },
    "campaignGoals": {
      "type": "object",
      "required": ["primaryGoal", "description"],
      "properties": {
        "primaryGoal": {
          "type": "string",
          "enum": [
            "brand_awareness",
            "lead_generation",
            "sales",
            "app_installs",
            "traffic",
            "engagement"
          ],
          "description": "Основная цель кампании"
        },
        "secondaryGoals": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "description": "Дополнительные цели"
        },
        "description": {
          "type": "string",
          "minLength": 50,
          "maxLength": 2000,
          "description": "Описание бизнес-задачи"
        },
        "kpis": {
          "type": "array",
          "description": "Ключевые метрики успеха",
          "items": {
            "type": "object",
            "properties": {
              "metric": {
                "type": "string",
                "enum": [
                  "reach",
                  "impressions",
                  "clicks",
                  "ctr",
                  "conversions",
                  "cpa",
                  "roas",
                  "roi"
                ]
              },
              "target": {
                "type": "number",
                "description": "Целевое значение"
              },
              "unit": {
                "type": "string",
                "description": "Единица измерения (%, руб, шт)"
              }
            }
          }
        },
        "successCriteria": {
          "type": "string",
          "description": "Критерии успеха кампании"
        }
      }
    },
    "targetAudience": {
      "type": "object",
      "required": ["description"],
      "properties": {
        "description": {
          "type": "string",
          "minLength": 50,
          "description": "Описание целевой аудитории"
        },
        "demographics": {
          "type": "object",
          "properties": {
            "gender": {
              "type": "array",
              "items": {
                "type": "string",
                "enum": ["male", "female", "all"]
              }
            },
            "ageRange": {
              "type": "object",
              "properties": {
                "min": { "type": "integer", "minimum": 0, "maximum": 100 },
                "max": { "type": "integer", "minimum": 0, "maximum": 100 }
              }
            },
            "geography": {
              "type": "array",
              "description": "Регионы показа",
              "items": {
                "type": "object",
                "properties": {
                  "type": {
                    "type": "string",
                    "enum": ["country", "region", "city"]
                  },
                  "name": { "type": "string" },
                  "priority": { "type": "string", "enum": ["primary", "secondary"] }
                }
              }
            },
            "income": {
              "type": "string",
              "enum": ["low", "below_average", "average", "above_average", "high", "any"]
            }
          }
        },
        "interests": {
          "type": "array",
          "description": "Интересы аудитории",
          "items": { "type": "string" }
        },
        "behaviors": {
          "type": "array",
          "description": "Поведенческие характеристики",
          "items": { "type": "string" }
        },
        "painPoints": {
          "type": "array",
          "description": "Боли и проблемы ЦА",
          "items": { "type": "string" }
        }
      }
    },
    "budget": {
      "type": "object",
      "required": ["total", "currency"],
      "properties": {
        "total": {
          "type": "number",
          "minimum": 0,
          "description": "Общий бюджет"
        },
        "currency": {
          "type": "string",
          "enum": ["RUB", "USD", "EUR"],
          "default": "RUB"
        },
        "period": {
          "type": "string",
          "enum": ["day", "week", "month", "quarter", "year", "total"],
          "description": "Период бюджета"
        },
        "distribution": {
          "type": "object",
          "description": "Распределение бюджета",
          "properties": {
            "media": {
              "type": "number",
              "minimum": 0,
              "maximum": 100,
              "description": "% на медийный бюджет"
            },
            "production": {
              "type": "number",
              "minimum": 0,
              "maximum": 100,
              "description": "% на производство контента"
            },
            "agency": {
              "type": "number",
              "minimum": 0,
              "maximum": 100,
              "description": "% на агентское вознаграждение"
            }
          }
        },
        "flexibility": {
          "type": "string",
          "enum": ["strict", "flexible", "very_flexible"],
          "description": "Гибкость бюджета"
        }
      }
    },
    "timeline": {
      "type": "object",
      "required": ["startDate", "endDate"],
      "properties": {
        "startDate": {
          "type": "string",
          "format": "date",
          "description": "Дата начала кампании"
        },
        "endDate": {
          "type": "string",
          "format": "date",
          "description": "Дата окончания кампании"
        },
        "isFlexible": {
          "type": "boolean",
          "description": "Гибкость сроков"
        },
        "milestones": {
          "type": "array",
          "description": "Ключевые этапы",
          "items": {
            "type": "object",
            "properties": {
              "name": { "type": "string" },
              "date": { "type": "string", "format": "date" },
              "description": { "type": "string" }
            }
          }
        }
      }
    },
    "channels": {
      "type": "object",
      "description": "Предпочитаемые каналы",
      "properties": {
        "preferred": {
          "type": "array",
          "description": "Предпочитаемые каналы",
          "items": {
            "type": "string",
            "enum": [
              "yandex_direct",
              "google_ads",
              "vk_ads",
              "mytarget",
              "telegram_ads",
              "programmatic",
              "youtube",
              "ozon",
              "yandex_market",
              "cpa_networks",
              "influencers"
            ]
          }
        },
        "excluded": {
          "type": "array",
          "description": "Исключенные каналы",
          "items": { "type": "string" }
        },
        "notes": {
          "type": "string",
          "description": "Дополнительные комментарии по каналам"
        }
      }
    },
    "creativeRequirements": {
      "type": "object",
      "description": "Требования к креативам",
      "properties": {
        "brandGuidelines": {
          "type": "string",
          "description": "Ссылка на брендбук"
        },
        "tone": {
          "type": "string",
          "enum": ["formal", "friendly", "playful", "authoritative", "inspirational"],
          "description": "Тон коммуникации"
        },
        "restrictions": {
          "type": "array",
          "description": "Ограничения и табу",
          "items": { "type": "string" }
        },
        "references": {
          "type": "array",
          "description": "Примеры понравившихся креативов",
          "items": {
            "type": "object",
            "properties": {
              "url": { "type": "string", "format": "uri" },
              "description": { "type": "string" }
            }
          }
        }
      }
    },
    "competitorsAnalysis": {
      "type": "object",
      "properties": {
        "mainCompetitors": {
          "type": "array",
          "description": "Основные конкуренты",
          "items": {
            "type": "object",
            "properties": {
              "name": { "type": "string" },
              "website": { "type": "string", "format": "uri" },
              "strengths": { "type": "array", "items": { "type": "string" } },
              "weaknesses": { "type": "array", "items": { "type": "string" } }
            }
          }
        },
        "differentiators": {
          "type": "array",
          "description": "Наши отличия от конкурентов",
          "items": { "type": "string" }
        }
      }
    },
    "additionalInfo": {
      "type": "object",
      "properties": {
        "previousCampaigns": {
          "type": "array",
          "description": "Предыдущие кампании",
          "items": {
            "type": "object",
            "properties": {
              "description": { "type": "string" },
              "results": { "type": "string" },
              "learnings": { "type": "string" }
            }
          }
        },
        "assets": {
          "type": "array",
          "description": "Доступные материалы",
          "items": {
            "type": "object",
            "properties": {
              "type": {
                "type": "string",
                "enum": ["logo", "photos", "videos", "texts", "brandbook", "other"]
              },
              "url": { "type": "string", "format": "uri" },
              "description": { "type": "string" }
            }
          }
        },
        "legalRequirements": {
          "type": "array",
          "description": "Юридические требования",
          "items": { "type": "string" }
        },
        "notes": {
          "type": "string",
          "description": "Дополнительные комментарии"
        }
      }
    },
    "approvals": {
      "type": "array",
      "description": "История согласований",
      "items": {
        "type": "object",
        "properties": {
          "date": { "type": "string", "format": "date-time" },
          "user": { "type": "string" },
          "action": {
            "type": "string",
            "enum": ["approved", "rejected", "requested_changes"]
          },
          "comment": { "type": "string" }
        }
      }
    }
  }
}
```

---

## 📊 Размер данных

**Средний brief:**
- JSON size: ~10-15 KB
- Количество полей: 50-80
- Время заполнения: 30-60 минут (вручную)
- Время заполнения с AI: 15-30 минут

---

## 🔗 API Endpoints

См. [API_Endpoints.md](./API_Endpoints.md)

---

**Версия:** 1.0 | **Дата:** 2025-10-23 | **Статус:** ✅ Завершено

