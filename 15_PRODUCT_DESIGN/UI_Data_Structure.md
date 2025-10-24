# Структура данных для UI интерфейса MRM

**Дата:** 24 октября 2025  
**Версия:** 1.0

---

## 🎯 Общая структура интерфейса

```
┌──────────────────────────────────────────────────────────────┐
│  HEADER (User Info, Notifications, Settings)                 │
├─────────────┬──────────────────────────┬─────────────────────┤
│             │                          │                     │
│  SIDEBAR    │   ARTIFACT VIEWER        │   AI ASSISTANT      │
│  (Icons)    │   (Content Area)         │   (Chat)            │
│             │                          │                     │
│  - Icons    │  - Dashboard             │  - Messages         │
│  - Active   │  - Tables                │  - Input            │
│  - Badge    │  - Charts                │  - Actions          │
│             │  - Documents             │  - Suggestions      │
│             │                          │                     │
└─────────────┴──────────────────────────┴─────────────────────┘
```

---

## 📦 Структура данных проекта

### Project Context
```json
{
  "project": {
    "id": "PRJ_2025_142",
    "name": "ЖК «Зеленая Долина» - Осенний запуск",
    "client": {
      "id": "CLIENT_087",
      "name": "ГК «СтройИнвест»",
      "industry": "Недвижимость - Застройщик",
      "logo": "/assets/clients/stroyinvest-logo.png"
    },
    "status": "active",
    "phase": "execution",
    "startDate": "2025-09-15",
    "endDate": "2025-12-31",
    "budget": {
      "total": 15000000,
      "spent": 4500000,
      "remaining": 10500000,
      "currency": "RUB"
    },
    "team": {
      "pm": {
        "name": "Светлана Морозова",
        "avatar": "/assets/avatars/pm-svetlana.jpg",
        "role": "Project Manager"
      },
      "account": {
        "name": "Дмитрий Соколов",
        "avatar": "/assets/avatars/acc-dmitriy.jpg",
        "role": "Account Manager"
      },
      "specialist": {
        "name": "Анна Волкова",
        "avatar": "/assets/avatars/spec-anna.jpg",
        "role": "Media Specialist"
      }
    },
    "kpis": {
      "leads": {
        "target": 500,
        "current": 187,
        "unit": "лидов"
      },
      "cpl": {
        "target": 3000,
        "current": 2850,
        "unit": "₽"
      },
      "reach": {
        "target": 2000000,
        "current": 850000,
        "unit": "показов"
      }
    }
  }
}
```

---

## 🎨 Артефакты (левая панель)

### Структура артефакта
```json
{
  "artifacts": [
    {
      "id": "passport",
      "name": "Паспорт проекта",
      "nameShort": "Паспорт",
      "icon": "📋",
      "iconType": "emoji",
      "color": "#667EEA",
      "badge": null,
      "status": "complete",
      "lastUpdated": "2025-10-24T10:30:00Z",
      "viewType": "dashboard",
      "aiContext": "Общая информация о проекте, команда, сроки, бюджет"
    },
    {
      "id": "brief",
      "name": "Бриф клиента",
      "nameShort": "Бриф",
      "icon": "📝",
      "iconType": "emoji",
      "color": "#48BB78",
      "badge": null,
      "status": "complete",
      "lastUpdated": "2025-09-18T14:20:00Z",
      "viewType": "form",
      "aiContext": "Требования клиента, цели, бюджет, целевая аудитория"
    },
    {
      "id": "strategy",
      "name": "Стратегия",
      "nameShort": "Стратегия",
      "icon": "🎯",
      "iconType": "emoji",
      "color": "#F56565",
      "badge": null,
      "status": "complete",
      "lastUpdated": "2025-09-25T16:45:00Z",
      "viewType": "document",
      "aiContext": "Маркетинговая стратегия, позиционирование, каналы"
    },
    {
      "id": "mediaplan",
      "name": "Медиаплан",
      "nameShort": "Медиаплан",
      "icon": "📊",
      "iconType": "emoji",
      "color": "#ED8936",
      "badge": {
        "text": "Обновлен",
        "type": "info"
      },
      "status": "in_progress",
      "lastUpdated": "2025-10-24T09:15:00Z",
      "viewType": "table",
      "aiContext": "Распределение бюджета по каналам, расчеты, прогнозы"
    },
    {
      "id": "technical_spec",
      "name": "Техническое задание",
      "nameShort": "ТЗ",
      "icon": "⚙️",
      "iconType": "emoji",
      "color": "#4299E1",
      "badge": null,
      "status": "complete",
      "lastUpdated": "2025-10-01T11:30:00Z",
      "viewType": "checklist",
      "aiContext": "Настройки кампаний, таргетинги, креативы, UTM"
    },
    {
      "id": "report",
      "name": "Отчет по кампании",
      "nameShort": "Отчет",
      "icon": "📈",
      "iconType": "emoji",
      "color": "#9F7AEA",
      "badge": {
        "text": "3 новых",
        "type": "success"
      },
      "status": "in_progress",
      "lastUpdated": "2025-10-24T08:00:00Z",
      "viewType": "dashboard",
      "aiContext": "Результаты кампании, метрики, аналитика, инсайты"
    },
    {
      "id": "commercial_proposal",
      "name": "Коммерческое предложение",
      "nameShort": "КП",
      "icon": "💰",
      "iconType": "emoji",
      "color": "#38B2AC",
      "badge": null,
      "status": "complete",
      "lastUpdated": "2025-09-20T13:00:00Z",
      "viewType": "document",
      "aiContext": "Расчет стоимости услуг, бюджет, сроки, условия"
    },
    {
      "id": "tasks",
      "name": "Задачи команды",
      "nameShort": "Задачи",
      "icon": "✓",
      "iconType": "emoji",
      "color": "#68D391",
      "badge": {
        "text": "5",
        "type": "warning"
      },
      "status": "in_progress",
      "lastUpdated": "2025-10-24T11:45:00Z",
      "viewType": "kanban",
      "aiContext": "Задачи команды, статусы, дедлайны, ответственные"
    },
    {
      "id": "communication",
      "name": "Коммуникация",
      "nameShort": "Общение",
      "icon": "💬",
      "iconType": "emoji",
      "color": "#FC8181",
      "badge": {
        "text": "Новое",
        "type": "alert"
      },
      "status": "active",
      "lastUpdated": "2025-10-24T12:00:00Z",
      "viewType": "timeline",
      "aiContext": "История общения с клиентом, встречи, решения"
    },
    {
      "id": "team",
      "name": "Команда проекта",
      "nameShort": "Команда",
      "icon": "👥",
      "iconType": "emoji",
      "color": "#B794F4",
      "badge": null,
      "status": "active",
      "lastUpdated": "2025-09-15T10:00:00Z",
      "viewType": "grid",
      "aiContext": "Члены команды, роли, контакты, загрузка"
    },
    {
      "id": "products",
      "name": "Креативы и материалы",
      "nameShort": "Креативы",
      "icon": "🎨",
      "iconType": "emoji",
      "color": "#F687B3",
      "badge": null,
      "status": "in_progress",
      "lastUpdated": "2025-10-22T15:30:00Z",
      "viewType": "gallery",
      "aiContext": "Креативные материалы, баннеры, видео, тексты"
    },
    {
      "id": "rim",
      "name": "Риски и ресурсы",
      "nameShort": "Риски",
      "icon": "⚠️",
      "iconType": "emoji",
      "color": "#F6AD55",
      "badge": null,
      "status": "monitoring",
      "lastUpdated": "2025-10-23T14:00:00Z",
      "viewType": "table",
      "aiContext": "Управление рисками, проблемы, ресурсы"
    }
  ]
}
```

---

## 💬 AI Assistant (правая панель)

### Структура чата
```json
{
  "chat": {
    "currentArtifact": "mediaplan",
    "context": {
      "projectId": "PRJ_2025_142",
      "artifactId": "mediaplan",
      "artifactName": "Медиаплан",
      "userRole": "pm"
    },
    "messages": [
      {
        "id": "msg_001",
        "type": "ai",
        "timestamp": "2025-10-24T09:00:00Z",
        "content": "Добрый день! Я анализирую медиаплан проекта «ЖК Зеленая Долина». Вижу, что бюджет распределен между 4 каналами. Хотите обсудить оптимизацию?",
        "avatar": "/assets/ai-assistant-avatar.png",
        "name": "AI Ассистент",
        "actions": [
          {
            "id": "action_optimize",
            "label": "Предложить оптимизацию",
            "type": "primary"
          },
          {
            "id": "action_analyze",
            "label": "Анализ эффективности",
            "type": "secondary"
          }
        ]
      },
      {
        "id": "msg_002",
        "type": "user",
        "timestamp": "2025-10-24T09:02:00Z",
        "content": "Да, давай посмотрим варианты оптимизации. Особенно интересует канал VK Реклама.",
        "avatar": "/assets/avatars/pm-svetlana.jpg",
        "name": "Светлана Морозова"
      },
      {
        "id": "msg_003",
        "type": "ai",
        "timestamp": "2025-10-24T09:02:30Z",
        "content": "Анализирую VK Реклама...\n\n**Текущее состояние:**\n- Бюджет: 4,5 млн ₽ (30%)\n- CPL факт: 2,850 ₽\n- CPL план: 3,000 ₽\n- Экономия: 150 ₽ на лиде\n\n**Рекомендация:** VK Реклама показывает лучший CPL среди всех каналов. Предлагаю увеличить бюджет на 15% (+675 тыс ₽) за счет снижения бюджета в Google Ads, где CPL выше плана.",
        "avatar": "/assets/ai-assistant-avatar.png",
        "name": "AI Ассистент",
        "attachments": [
          {
            "type": "chart",
            "title": "Сравнение CPL по каналам",
            "data": {
              "type": "bar",
              "channels": ["Яндекс Директ", "VK Реклама", "Google Ads", "myTarget"],
              "values": [3200, 2850, 3800, 3100]
            }
          }
        ],
        "actions": [
          {
            "id": "action_apply",
            "label": "Применить изменения",
            "type": "primary"
          },
          {
            "id": "action_simulate",
            "label": "Смоделировать результат",
            "type": "secondary"
          },
          {
            "id": "action_export",
            "label": "Экспорт отчета",
            "type": "tertiary"
          }
        ]
      }
    ],
    "suggestions": [
      "Показать распределение бюджета по неделям",
      "Рассчитать прогноз лидов до конца кампании",
      "Сравнить с аналогичными проектами",
      "Создать отчет для клиента"
    ],
    "quickActions": [
      {
        "id": "export_mediaplan",
        "icon": "📥",
        "label": "Экспорт",
        "color": "#4299E1"
      },
      {
        "id": "share_artifact",
        "icon": "📤",
        "label": "Поделиться",
        "color": "#48BB78"
      },
      {
        "id": "create_task",
        "icon": "✓",
        "label": "Создать задачу",
        "color": "#ED8936"
      },
      {
        "id": "schedule_review",
        "icon": "📅",
        "label": "Запланировать ревью",
        "color": "#9F7AEA"
      }
    ]
  }
}
```

---

## 📊 Пример данных медиаплана

### Медиаплан для застройщика
```json
{
  "mediaplan": {
    "id": "MP_2025_142",
    "projectId": "PRJ_2025_142",
    "name": "Медиаплан ЖК «Зеленая Долина» - Q4 2025",
    "status": "active",
    "period": {
      "start": "2025-10-01",
      "end": "2025-12-31"
    },
    "summary": {
      "totalBudget": 15000000,
      "channels": 4,
      "placements": 18,
      "expectedLeads": 500,
      "expectedCPL": 3000
    },
    "channels": [
      {
        "id": "yandex_direct",
        "name": "Яндекс Директ",
        "icon": "🔴",
        "budget": 6000000,
        "budgetPercent": 40,
        "placements": 6,
        "metrics": {
          "impressions": 8000000,
          "clicks": 120000,
          "leads": 200,
          "cpl": 3200,
          "ctr": 1.5
        },
        "status": "active",
        "color": "#FFCC00"
      },
      {
        "id": "vk_ads",
        "name": "VK Реклама",
        "icon": "🔵",
        "budget": 4500000,
        "budgetPercent": 30,
        "placements": 5,
        "metrics": {
          "impressions": 12000000,
          "clicks": 180000,
          "leads": 158,
          "cpl": 2850,
          "ctr": 1.5
        },
        "status": "active",
        "color": "#0077FF"
      },
      {
        "id": "google_ads",
        "name": "Google Ads",
        "icon": "🌐",
        "budget": 3000000,
        "budgetPercent": 20,
        "placements": 4,
        "metrics": {
          "impressions": 5000000,
          "clicks": 75000,
          "leads": 79,
          "cpl": 3800,
          "ctr": 1.5
        },
        "status": "active",
        "color": "#4285F4"
      },
      {
        "id": "mytarget",
        "name": "myTarget",
        "icon": "🎯",
        "budget": 1500000,
        "budgetPercent": 10,
        "placements": 3,
        "metrics": {
          "impressions": 6000000,
          "clicks": 90000,
          "leads": 48,
          "cpl": 3100,
          "ctr": 1.5
        },
        "status": "active",
        "color": "#FF6B6B"
      }
    ],
    "timeline": {
      "weeks": [
        {
          "weekNumber": 1,
          "period": "01.10 - 07.10",
          "budget": 1200000,
          "leads": 40,
          "status": "completed"
        },
        {
          "weekNumber": 2,
          "period": "08.10 - 14.10",
          "budget": 1200000,
          "leads": 42,
          "status": "completed"
        },
        {
          "weekNumber": 3,
          "period": "15.10 - 21.10",
          "budget": 1200000,
          "leads": 38,
          "status": "completed"
        },
        {
          "weekNumber": 4,
          "period": "22.10 - 28.10",
          "budget": 1200000,
          "leads": 45,
          "status": "active"
        }
      ]
    }
  }
}
```

---

## 🎨 UI Components

### Sidebar Item
```json
{
  "component": "ArtifactIcon",
  "props": {
    "id": "mediaplan",
    "icon": "📊",
    "color": "#ED8936",
    "isActive": true,
    "badge": {
      "text": "Обновлен",
      "type": "info"
    },
    "onClick": "handleArtifactClick"
  }
}
```

### Chat Message
```json
{
  "component": "ChatMessage",
  "props": {
    "type": "ai",
    "avatar": "/assets/ai-assistant-avatar.png",
    "name": "AI Ассистент",
    "timestamp": "2025-10-24T09:00:00Z",
    "content": "Анализирую медиаплан...",
    "actions": [
      {
        "label": "Применить",
        "type": "primary",
        "onClick": "handleApply"
      }
    ]
  }
}
```

### Dashboard Card
```json
{
  "component": "MetricCard",
  "props": {
    "title": "Лиды",
    "value": 187,
    "target": 500,
    "unit": "лидов",
    "trend": "+12%",
    "trendDirection": "up",
    "icon": "📊",
    "color": "#48BB78"
  }
}
```

---

## 🔄 Состояния интерфейса

### UI States
```json
{
  "states": {
    "loading": {
      "artifact": false,
      "chat": false,
      "action": false
    },
    "active": {
      "artifactId": "mediaplan",
      "viewMode": "table",
      "chatExpanded": true,
      "sidebarCollapsed": false
    },
    "notifications": [
      {
        "id": "notif_001",
        "type": "success",
        "message": "Медиаплан успешно обновлен",
        "timestamp": "2025-10-24T09:15:00Z",
        "autoHide": true
      }
    ],
    "modal": {
      "isOpen": false,
      "type": null,
      "data": null
    }
  }
}
```

---

## 📱 Responsive Breakpoints

```javascript
const breakpoints = {
  mobile: '320px - 767px',   // Sidebar collapsed, single column
  tablet: '768px - 1023px',  // Sidebar icons only, reduced chat
  desktop: '1024px - 1439px', // Full layout
  wide: '1440px+'            // Expanded view, more space
};
```

---

## 🎯 Взаимодействие компонентов

```
User clicks artifact icon
   ↓
Update activeArtifactId in state
   ↓
Load artifact data from API
   ↓
Update Artifact Viewer (center panel)
   ↓
Send context to AI Assistant
   ↓
AI generates greeting message
   ↓
Update Chat with new context
```

---

**Версия:** 1.0  
**Дата:** 2025-10-24  
**Статус:** ✅ Complete

