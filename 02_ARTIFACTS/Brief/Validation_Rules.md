---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: artifact_doc
title: Brief - Правила валидации
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: 02_ARTIFACTS/Brief/Validation_Rules.md
effective_date: 2025-10-24
visibility: internal
security_level: medium
tags: [artifact, brief]
---

# Brief - Правила валидации

## ✅ Validation Rules для брифа клиента

Правила проверки данных при заполнении и отправке брифа.

→ См. [Data_Structure.md](./Data_Structure.md) для JSON schema

---

## 📋 Обязательные поля (Required)

### Минимальный валидный бриф должен содержать:

```yaml
Required Fields:
  clientInfo:
    - companyName ✓ (min 2 chars)
    - contactPerson.name ✓
    - contactPerson.email ✓ (valid email)
  
  campaignGoals:
    - primaryGoal ✓ (enum value)
    - description ✓ (min 50 chars)
  
  targetAudience:
    - description ✓ (min 50 chars)
  
  budget:
    - total ✓ (> 0)
    - currency ✓
  
  timeline:
    - startDate ✓ (valid date, >= today)
    - endDate ✓ (valid date, > startDate)
```

**Результат:** Без этих полей бриф не может быть отправлен (submit disabled)

---

## 🔍 Детальные правила валидации

### 1. CLIENT INFO

#### 1.1. Company Name
```javascript
validation: {
  required: true,
  minLength: 2,
  maxLength: 200,
  pattern: /^[a-zA-Zа-яА-ЯёЁ0-9\s"'«»\-.,()№]+$/,
  
  errors: {
    required: "Название компании обязательно",
    minLength: "Минимум 2 символа",
    maxLength: "Максимум 200 символов",
    pattern: "Недопустимые символы в названии"
  }
}
```

#### 1.2. Industry
```javascript
validation: {
  optional: true,
  enum: [
    'ecommerce', 'finance', 'realestate', 
    'education', 'horeca', 'healthcare', 
    'technology', 'retail', 'automotive', 
    'other'
  ],
  
  errors: {
    enum: "Выберите отрасль из списка"
  }
}
```

#### 1.3. Website
```javascript
validation: {
  optional: true,
  pattern: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
  
  errors: {
    pattern: "Некорректный URL. Пример: https://example.com"
  }
}
```

#### 1.4. Contact Person - Name
```javascript
validation: {
  required: true,
  minLength: 3,
  maxLength: 100,
  pattern: /^[a-zA-Zа-яА-ЯёЁ\s\-]+$/,
  
  errors: {
    required: "ФИО контактного лица обязательно",
    minLength: "Минимум 3 символа",
    pattern: "Используйте только буквы, пробелы и дефисы"
  }
}
```

#### 1.5. Contact Person - Email
```javascript
validation: {
  required: true,
  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  
  async: {
    checkExists: async (email) => {
      // Check if email already exists in system
      const exists = await checkEmailInDatabase(email);
      if (exists) {
        return {
          warning: "Этот email уже используется. Хотите загрузить данные?"
        };
      }
    }
  },
  
  errors: {
    required: "Email обязателен",
    pattern: "Некорректный email. Пример: user@example.com"
  }
}
```

#### 1.6. Contact Person - Phone
```javascript
validation: {
  optional: true,
  pattern: /^\+?[0-9]{10,15}$/,
  
  normalize: (phone) => {
    // Remove all non-numeric except +
    return phone.replace(/[^0-9+]/g, '');
  },
  
  errors: {
    pattern: "Некорректный телефон. Пример: +79991234567"
  }
}
```

---

### 2. CAMPAIGN GOALS

#### 2.1. Primary Goal
```javascript
validation: {
  required: true,
  enum: [
    'brand_awareness',
    'lead_generation',
    'sales',
    'app_installs',
    'traffic',
    'engagement'
  ],
  
  errors: {
    required: "Выберите основную цель кампании",
    enum: "Недопустимое значение цели"
  }
}
```

#### 2.2. Description
```javascript
validation: {
  required: true,
  minLength: 50,
  maxLength: 2000,
  
  warnings: {
    optimal: {
      check: (text) => text.length < 100,
      message: "Рекомендуем более подробное описание (минимум 100 символов)"
    }
  },
  
  errors: {
    required: "Описание бизнес-задачи обязательно",
    minLength: "Минимум 50 символов. Опишите подробнее.",
    maxLength: "Максимум 2000 символов"
  }
}
```

#### 2.3. KPIs
```javascript
validation: {
  optional: true,
  array: {
    minItems: 0,
    maxItems: 10,
    
    item: {
      metric: {
        required: true,
        enum: ['reach', 'impressions', 'clicks', 'ctr', 'conversions', 'cpa', 'roas', 'roi']
      },
      target: {
        required: true,
        type: 'number',
        min: 0,
        max: 1000000000
      },
      unit: {
        required: true,
        maxLength: 20
      }
    }
  },
  
  warnings: {
    noKPIs: {
      check: (kpis) => kpis.length === 0,
      message: "Рекомендуем указать хотя бы 1-2 KPI для измерения успеха"
    }
  },
  
  errors: {
    maxItems: "Максимум 10 KPI",
    'item.metric.required': "Выберите метрику",
    'item.target.required': "Укажите целевое значение",
    'item.target.min': "Значение должно быть больше 0"
  }
}
```

---

### 3. TARGET AUDIENCE

#### 3.1. Description
```javascript
validation: {
  required: true,
  minLength: 50,
  maxLength: 5000,
  
  warnings: {
    tooShort: {
      check: (text) => text.length < 150,
      message: "Чем подробнее описание, тем точнее таргетинг"
    }
  },
  
  errors: {
    required: "Описание целевой аудитории обязательно",
    minLength: "Минимум 50 символов",
    maxLength: "Максимум 5000 символов"
  }
}
```

#### 3.2. Age Range
```javascript
validation: {
  optional: true,
  custom: {
    check: (range) => {
      if (range.min < 0 || range.max > 100) return false;
      if (range.min >= range.max) return false;
      return true;
    }
  },
  
  warnings: {
    tooNarrow: {
      check: (range) => (range.max - range.min) < 5,
      message: "Слишком узкий возрастной диапазон может ограничить охват"
    },
    tooWide: {
      check: (range) => (range.max - range.min) > 50,
      message: "Слишком широкий диапазон. Рекомендуем сузить для точного таргетинга"
    }
  },
  
  errors: {
    custom: "Некорректный возрастной диапазон",
    range: "Минимальный возраст должен быть меньше максимального"
  }
}
```

#### 3.3. Geography
```javascript
validation: {
  optional: true,
  array: {
    minItems: 0,
    maxItems: 100,
    
    item: {
      type: {
        required: true,
        enum: ['country', 'region', 'city']
      },
      name: {
        required: true,
        minLength: 2,
        maxLength: 100
      },
      priority: {
        optional: true,
        enum: ['primary', 'secondary']
      }
    }
  },
  
  warnings: {
    noGeo: {
      check: (geo) => geo.length === 0,
      message: "Рекомендуем указать географию для более точного планирования"
    }
  }
}
```

---

### 4. BUDGET

#### 4.1. Total Budget
```javascript
validation: {
  required: true,
  type: 'number',
  min: 10000,  // Минимальный бюджет 10k
  max: 1000000000,  // Максимум 1 млрд
  
  warnings: {
    low: {
      check: (budget) => budget < 50000,
      message: "Бюджет ниже 50k может ограничить возможности размещения"
    },
    veryHigh: {
      check: (budget) => budget > 10000000,
      message: "Большой бюджет. Рекомендуем разбить на несколько кампаний"
    }
  },
  
  errors: {
    required: "Укажите бюджет",
    min: "Минимальный бюджет 10,000 ₽",
    max: "Максимум 1,000,000,000 ₽",
    type: "Бюджет должен быть числом"
  }
}
```

#### 4.2. Currency
```javascript
validation: {
  required: true,
  enum: ['RUB', 'USD', 'EUR'],
  default: 'RUB',
  
  errors: {
    enum: "Выберите валюту из списка"
  }
}
```

#### 4.3. Budget Distribution
```javascript
validation: {
  optional: true,
  custom: {
    check: (distribution) => {
      const total = (distribution.media || 0) + 
                    (distribution.production || 0) + 
                    (distribution.agency || 0);
      return total <= 100;  // Сумма не больше 100%
    }
  },
  
  warnings: {
    notComplete: {
      check: (distribution) => {
        const total = (distribution.media || 0) + 
                      (distribution.production || 0) + 
                      (distribution.agency || 0);
        return total < 100 && total > 0;
      },
      message: `Распределение не достигает 100%. Осталось: ${100 - total}%`
    }
  },
  
  errors: {
    custom: "Сумма процентов не может превышать 100%"
  }
}
```

---

### 5. TIMELINE

#### 5.1. Start Date
```javascript
validation: {
  required: true,
  type: 'date',
  min: () => new Date(),  // Не раньше сегодня
  
  warnings: {
    tooSoon: {
      check: (date) => {
        const diff = (date - new Date()) / (1000 * 60 * 60 * 24);
        return diff < 7;  // Меньше недели
      },
      message: "Запуск через менее чем 7 дней. Убедитесь, что команда успеет подготовиться."
    }
  },
  
  errors: {
    required: "Укажите дату начала",
    min: "Дата начала не может быть в прошлом",
    type: "Некорректная дата"
  }
}
```

#### 5.2. End Date
```javascript
validation: {
  required: true,
  type: 'date',
  min: (brief) => brief.timeline.startDate,  // После start date
  
  custom: {
    check: (endDate, brief) => {
      const start = new Date(brief.timeline.startDate);
      const end = new Date(endDate);
      const diffDays = (end - start) / (1000 * 60 * 60 * 24);
      return diffDays >= 1;  // Минимум 1 день
    }
  },
  
  warnings: {
    tooShort: {
      check: (endDate, brief) => {
        const diffDays = (new Date(endDate) - new Date(brief.timeline.startDate)) / (1000 * 60 * 60 * 24);
        return diffDays < 14;
      },
      message: "Кампания короче 2 недель. Может быть недостаточно для сбора данных."
    },
    tooLong: {
      check: (endDate, brief) => {
        const diffDays = (new Date(endDate) - new Date(brief.timeline.startDate)) / (1000 * 60 * 60 * 24);
        return diffDays > 365;
      },
      message: "Кампания дольше года. Рекомендуем разбить на несколько периодов."
    }
  },
  
  errors: {
    required: "Укажите дату окончания",
    min: "Дата окончания должна быть после даты начала",
    custom: "Кампания должна длиться минимум 1 день"
  }
}
```

---

## 🔄 Cross-field Validation

### Consistency Checks:

#### Budget vs Timeline
```javascript
crossValidation: {
  budgetVsTimeline: {
    check: (brief) => {
      const budget = brief.budget.total;
      const days = (new Date(brief.timeline.endDate) - 
                   new Date(brief.timeline.startDate)) / (1000 * 60 * 60 * 24);
      const dailyBudget = budget / days;
      
      return {
        valid: dailyBudget >= 1000,  // Минимум 1k/день
        dailyBudget: dailyBudget
      };
    },
    
    warning: (result) => {
      if (!result.valid) {
        return `Дневной бюджет ${Math.round(result.dailyBudget)} ₽ слишком низкий. Рекомендуем минимум 1000 ₽/день.`;
      }
    }
  }
}
```

#### Goals vs Channels
```javascript
crossValidation: {
  goalsVsChannels: {
    recommendations: {
      'brand_awareness': ['programmatic', 'youtube', 'vk_ads'],
      'lead_generation': ['yandex_direct', 'vk_ads', 'mytarget'],
      'sales': ['yandex_direct', 'mytarget', 'ecom_platforms'],
      'traffic': ['yandex_direct', 'telegram_ads'],
      'engagement': ['vk_ads', 'telegram_ads', 'youtube']
    },
    
    warning: (brief) => {
      const goal = brief.campaignGoals.primaryGoal;
      const channels = brief.channels.preferred;
      const recommended = crossValidation.goalsVsChannels.recommendations[goal];
      
      const hasRecommended = channels.some(ch => recommended.includes(ch));
      
      if (!hasRecommended && channels.length > 0) {
        return `Для цели "${goal}" рекомендуем: ${recommended.join(', ')}`;
      }
    }
  }
}
```

---

## 🤖 AI-powered Validation

### Smart Warnings:

#### Incomplete Brief Detection
```javascript
aiValidation: {
  completeness: async (brief) => {
    const score = await AI.assessCompleteness(brief);
    
    if (score < 0.7) {
      return {
        type: 'warning',
        message: `Бриф заполнен на ${Math.round(score * 100)}%. Рекомендуем добавить:`,
        suggestions: [
          'Конкурентный анализ (опционально, но полезно)',
          'Креативные референсы',
          'Предыдущие кампании (если есть)'
        ]
      };
    }
  }
}
```

#### Inconsistency Detection
```javascript
aiValidation: {
  inconsistency: async (brief) => {
    const issues = await AI.detectInconsistencies(brief);
    
    // Example: Цель "Продажи", но бюджет слишком маленький
    if (issues.length > 0) {
      return {
        type: 'warning',
        issues: issues.map(issue => ({
          field: issue.field,
          message: issue.message,
          suggestion: issue.fix
        }))
      };
    }
  }
}
```

---

## 📊 Validation States

```javascript
validationStates = {
  VALID: {
    icon: '✅',
    color: 'green',
    canSubmit: true
  },
  
  WARNING: {
    icon: '⚠️',
    color: 'orange',
    canSubmit: true,
    message: 'Можно отправить, но есть рекомендации'
  },
  
  ERROR: {
    icon: '❌',
    color: 'red',
    canSubmit: false,
    message: 'Исправьте ошибки перед отправкой'
  },
  
  VALIDATING: {
    icon: '🔄',
    color: 'blue',
    canSubmit: false,
    message: 'Проверка...'
  }
}
```

---

## 🔗 Связанные документы

- [Data_Structure.md](./Data_Structure.md) - JSON schema с типами
- [UI_Template_Web.md](./UI_Template_Web.md) - UI с валидацией
- [Examples.md](./Examples.md) - Примеры валидных брифов
- [API_Endpoints.md](./API_Endpoints.md) - API валидации

---

**Версия:** 1.0 | **Дата:** 2025-10-23 | **Статус:** ✅ Завершено

