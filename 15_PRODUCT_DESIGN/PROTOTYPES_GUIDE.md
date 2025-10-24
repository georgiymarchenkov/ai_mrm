# Руководство по прототипам MRM AI интерфейса

**Дата:** 24 октября 2025  
**Версия:** 1.0  
**Статус:** ✅ Complete

---

## 📋 Содержание

1. [Обзор прототипов](#обзор-прототипов)
2. [Структура интерфейса](#структура-интерфейса)
3. [Описание прототипов](#описание-прототипов)
4. [Компоненты UI](#компоненты-ui)
5. [Цветовая схема](#цветовая-схема)
6. [Интерактивность](#интерактивность)
7. [Адаптивность](#адаптивность)
8. [Следующие шаги](#следующие-шаги)

---

## 🎯 Обзор прототипов

Создано **3 интерактивных HTML прототипа** для десктопной версии MRM AI платформы:

### Прототип 1: Медиаплан
**Файл:** `prototype_v1_mediaplan.html`  
**Артефакт:** 📊 Медиаплан  
**Пример:** ЖК «Зеленая Долина» - Осенний запуск

**Особенности:**
- Таблица распределения бюджета по каналам
- 4 key metrics cards (бюджет, лиды, CPL, каналы)
- Детальная таблица с каналами (Яндекс Директ, VK Реклама, Google Ads, myTarget)
- AI ассистент с предложениями по оптимизации
- График сравнения CPL встроен в чат
- Sidebar с полным списком артефактов

### Прототип 2: Паспорт проекта
**Файл:** `prototype_v2_passport.html`  
**Артефакт:** 📋 Паспорт проекта  
**Пример:** ЖК «Зеленая Долина» - Общая информация

**Особенности:**
- Dashboard view с ключевыми метриками проекта
- Карточки: Бюджет, Сроки, KPI
- Команда проекта (6 членов с аватарами)
- Круговой прогресс (37% completion)
- Timeline с ключевыми вехами
- Компактный sidebar с иконками артефактов
- AI ассистент с кратким статусом проекта

### Прототип 3: Отчет по кампании
**Файл:** `prototype_v3_report.html`  
**Артефакт:** 📈 Отчет по кампании  
**Пример:** ЖК «Зеленая Долина» - Отчет за октябрь 2025

**Особенности:**
- 5 KPI карточек (показы, клики, лиды, CTR, CPL)
- Line chart с динамикой лидов по неделям
- Pie chart с распределением лидов по каналам
- 5 AI-инсайтов с рекомендациями
- Период селектор (неделя/месяц/квартал)
- Цветовая индикация трендов (positive/negative)
- AI ассистент с детальным анализом

---

## 🏗️ Структура интерфейса

### Общая схема (все прототипы)

```
┌────────────────────────────────────────────────────────────────┐
│  HEADER (80px)                                                  │
│  • Лого + Название проекта                                      │
│  • Статус бейджи (активность, бюджет, сроки)                   │
│  • User section (аватар + имя + роль)                           │
├─────────┬──────────────────────────────────┬────────────────────┤
│         │                                  │                    │
│ SIDEBAR │   CONTENT AREA                   │  AI ASSISTANT      │
│ (80px)  │   (flex: 1)                      │  (420px)           │
│         │                                  │                    │
│ Icons   │  • Header с названием артефакта  │  • Header          │
│ only    │  • Metrics / Dashboard           │  • Chat messages   │
│         │  • Tables / Charts               │  • Quick actions   │
│         │  • Data visualization            │  • Input + Send    │
│         │                                  │  • Suggestions     │
│         │                                  │                    │
└─────────┴──────────────────────────────────┴────────────────────┘
```

### Размеры и пропорции

```yaml
Header:
  Height: 80px
  Background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)
  
Sidebar:
  Width: 80px
  Background: linear-gradient(180deg, #a78bfa 0%, #8b5cf6 100%)
  Items: 12 artifact icons (56x56px каждая)
  
Content:
  Flex: 1 (занимает оставшееся пространство)
  Background: linear-gradient(135deg, #e9d5ff 0%, #ddd6fe 100%)
  Padding: 30px
  
Chat Assistant:
  Width: 420px
  Background: linear-gradient(180deg, #a7f3d0 0%, #6ee7b7 100%)
  Sections: Header (80px) + Messages (flex) + Input (auto)
```

---

## 📊 Описание прототипов

### 1. Медиаплан (prototype_v1_mediaplan.html)

#### Структура контента

**Metrics Grid (4 колонки):**
```
┌──────────────┬──────────────┬──────────────┬──────────────┐
│ Общий бюджет │ Лиды (план)  │ CPL средний  │ Каналов      │
│ 15 млн ₽     │ 500          │ 3,000 ₽      │ 4            │
│ Progress 30% │ Progress 37% │ ▼ 5% от пл.  │ 18 размещ.   │
└──────────────┴──────────────┴──────────────┴──────────────┘
```

**Channels Table:**
```
┌─────────────────┬────────────┬────────┬─────────┬──────┬─────────┐
│ Канал           │ Бюджет     │ Лиды   │ CPL     │ CTR  │ Статус  │
├─────────────────┼────────────┼────────┼─────────┼──────┼─────────┤
│ Яндекс Директ   │ 6,000,000₽ │ 200    │ 3,200₽  │ 1.5% │ Активен │
│ 🔴 Поиск + РСЯ  │ 40%        │        │         │      │         │
├─────────────────┼────────────┼────────┼─────────┼──────┼─────────┤
│ VK Реклама      │ 4,500,000₽ │ 158    │ 2,850₽↓ │ 1.5% │ Активен │
│ 🔵 Лента+Истории│ 30%        │        │ (лучший)│      │         │
├─────────────────┼────────────┼────────┼─────────┼──────┼─────────┤
│ Google Ads      │ 3,000,000₽ │ 79     │ 3,800₽↑ │ 1.5% │ Активен │
│ 🌐 Search+Display│ 20%       │        │ (худший)│      │         │
├─────────────────┼────────────┼────────┼─────────┼──────┼─────────┤
│ myTarget        │ 1,500,000₽ │ 48     │ 3,100₽  │ 1.5% │ Активен │
│ 🎯 Медийка+Ретарг│ 10%       │        │         │      │         │
└─────────────────┴────────────┴────────┴─────────┴──────┴─────────┘
```

**AI Chat Highlights:**
- Приветствие с анализом медиаплана
- Ключевые находки (3 пункта с данными)
- Интерактивный график CPL по каналам
- Рекомендация по оптимизации VK бюджета
- 3 action buttons (Применить / Смоделировать / Экспорт)

**Data Source:**
```json
{
  "totalBudget": 15000000,
  "expectedLeads": 500,
  "currentLeads": 187,
  "avgCPL": 3000,
  "channels": 4,
  "placements": 18
}
```

---

### 2. Паспорт проекта (prototype_v2_passport.html)

#### Структура контента

**Dashboard Grid (3 колонки - 1 ряд):**
```
┌────────────────────┬────────────────────┬────────────────────┐
│ 💰 Бюджет          │ 📅 Сроки           │ 🎯 KPI: Лиды       │
│ 15 млн ₽           │ 92 дня             │ 187                │
│ Израсходовано:     │ 15 сен - 31 дек    │ Цель: 500 лидов    │
│ 4.5 млн ₽          │ Прошло 26%         │ Достигнуто 37%     │
│ Progress: 30%      │ 68 дней осталось   │ +12% от плана      │
└────────────────────┴────────────────────┴────────────────────┘
```

**Dashboard Grid (2 колонки + 1 - 2 ряд):**
```
┌──────────────────────────────────────────┬───────────────────┐
│ 👥 Команда проекта                       │ 📊 Прогресс       │
│                                          │                   │
│ [СМ] Светлана Морозова  - PM             │     ╭─────╮       │
│ [ДС] Дмитрий Соколов    - Account Mgr    │    │  37% │       │
│ [АВ] Анна Волкова       - Media Spec     │     ╰─────╯       │
│ [ИП] Игорь Петров       - Analyst        │                   │
│ [МК] Мария Кузнецова    - Creative Dir   │  ✓ В графике      │
│ [КА] Козлов Алексей     - Клиент         │                   │
└──────────────────────────────────────────┴───────────────────┘
```

**Timeline (Full width):**
```
┌──────────────────────────────────────────────────────────────┐
│ 🗓️ Ключевые вехи проекта                                     │
│                                                              │
│  ● 15 сен 2025   ✓ Kickoff Meeting                          │
│  ● 25 сен 2025   ✓ Утверждение стратегии                    │
│  ● 1 окт 2025    ✓ Запуск кампании                          │
│  ○ 1 ноя 2025    ⏳ Промежуточный отчет (через 7 дней!)     │
│  ○ 31 дек 2025   ○ Финальный отчет                          │
└──────────────────────────────────────────────────────────────┘
```

**AI Chat Highlights:**
- Общий прогресс проекта (37%)
- Что хорошо (4 пункта с checkmarks)
- На что обратить внимание (3 пункта с warning)
- Список из 5 задач требующих внимания
- Предложение помочь с подготовкой отчета

**Data Source:**
```json
{
  "budget": {
    "total": 15000000,
    "spent": 4500000,
    "remaining": 10500000
  },
  "timeline": {
    "duration": 92,
    "elapsed": 24,
    "remaining": 68
  },
  "kpi": {
    "target": 500,
    "current": 187,
    "percentage": 37
  },
  "team": [
    {"name": "Светлана Морозова", "role": "PM"},
    {"name": "Дмитрий Соколов", "role": "Account"},
    {"name": "Анна Волкова", "role": "Specialist"},
    {"name": "Игорь Петров", "role": "Analyst"},
    {"name": "Мария Кузнецова", "role": "Creative"},
    {"name": "Козлов Алексей", "role": "Client"}
  ]
}
```

---

### 3. Отчет по кампании (prototype_v3_report.html)

#### Структура контента

**KPI Grid (5 колонок):**
```
┌─────────┬─────────┬─────────┬─────────┬─────────┐
│ 👁️ Показы│ 👆 Клики│ 🎯 Лиды  │ 📊 CTR  │ 💰 CPL  │
│ 8.5М    │ 127K    │ 187     │ 1.49%   │ 2,950₽  │
│ ↑ 12.5% │ ↑ 8.3%  │ ↑ 37%   │ ↓ 0.1%  │ ↓ 5.2%  │
└─────────┴─────────┴─────────┴─────────┴─────────┘
```

**Charts Section (2 колонки):**
```
┌────────────────────────────────────┬─────────────────────┐
│ 📊 Динамика лидов по неделям       │ 🎯 Распределение    │
│                                    │    лидов            │
│     50 ┤                           │                     │
│     40 ┤  •───•                    │   ╭───────╮         │
│     30 ┤       ╰•                  │  │   187   │        │
│     20 ┤          ╰•               │   ╰───────╯         │
│     10 ┤                           │                     │
│      0 ┴───────────────────        │  ■ Яндекс - 75     │
│        W1  W2  W3  W4              │  ■ VK - 60         │
│        40  42  38  45              │  ■ Google - 30     │
│                                    │  ■ myTarget - 22   │
└────────────────────────────────────┴─────────────────────┘
```

**AI Insights (Full width):**
```
┌──────────────────────────────────────────────────────────────┐
│ 🤖 AI Инсайты и рекомендации                                 │
│                                                              │
│ ✅ Отличная динамика по лидам                                │
│    На 37% выше плана (187 vs 136). Неделя 4: 45 лидов       │
│                                                              │
│ ✅ CPL ниже плана                                            │
│    2,950₽ (-5.2%). Экономия ~50₽ на каждом лиде             │
│                                                              │
│ ⚠️ Google Ads требует оптимизации                            │
│    CPL на 27% выше среднего (3,800₽ vs 2,950₽)              │
│                                                              │
│ ✅ VK Реклама - лучший канал                                 │
│    Лучший CPL 2,850₽. Рекомендуется +15-20% бюджета         │
│                                                              │
│ ⚠️ Небольшое снижение CTR                                    │
│    -0.1% до 1.49%. Рекомендуется обновить креативы           │
└──────────────────────────────────────────────────────────────┘
```

**AI Chat Highlights:**
- Поздравление с отличными результатами
- Ключевые достижения (4 пункта)
- Что требует внимания (2 пункта)
- Детальные рекомендации по Google Ads (3 уровня действий)
- Моделирование сценариев

**Data Source:**
```json
{
  "metrics": {
    "impressions": 8500000,
    "clicks": 127000,
    "leads": 187,
    "ctr": 1.49,
    "cpl": 2950
  },
  "trends": {
    "impressions": "+12.5%",
    "clicks": "+8.3%",
    "leads": "+37%",
    "ctr": "-0.1%",
    "cpl": "-5.2%"
  },
  "weeklyLeads": [40, 42, 38, 45],
  "channelDistribution": {
    "yandex": 75,
    "vk": 60,
    "google": 30,
    "mytarget": 22
  }
}
```

---

## 🎨 Компоненты UI

### Карточки (Cards)

**Metric Card:**
```css
Background: white
Border-radius: 16px
Padding: 20px
Box-shadow: 0 2px 8px rgba(0,0,0,0.08)
Hover: translateY(-4px) + увеличение тени

Содержание:
- Label (11px, uppercase, #64748b)
- Value (32px, bold, #1a202c)
- Progress bar / Trend indicator
```

**Dashboard Card:**
```css
Background: white
Border-radius: 16px
Padding: 24px
Box-shadow: 0 2px 8px rgba(0,0,0,0.08)

Может быть:
- Обычная (1 колонка)
- Wide (2 колонки)
- Full (3 колонки)
```

**Insight Card:**
```css
Background: #f8fafc
Border-radius: 12px
Padding: 16px
Border-left: 4px solid [color]
  - Green (#10b981): Positive
  - Orange (#f59e0b): Warning
  - Red (#ef4444): Negative

Содержание:
- Icon (28px emoji)
- Title (14px, bold)
- Description (13px, #64748b)
```

### Кнопки (Buttons)

**Primary Button:**
```css
Background: #8b5cf6
Color: white
Padding: 10px 18px
Border-radius: 10px
Font-size: 13px
Font-weight: 600

Hover: 
  - Background: #7c3aed
  - TranslateY: -2px
  - Box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3)
```

**Secondary Button:**
```css
Background: white
Color: #4a5568
Padding: 10px 18px
Border-radius: 10px
Font-size: 13px
Font-weight: 600

Hover: 
  - Background: #f7fafc
```

**Action Button (в чате):**
```css
Background: white
Color: #059669
Border: 2px solid #059669
Padding: 8px 14px
Border-radius: 10px
Font-size: 12px
Font-weight: 600

Hover: 
  - Background: #059669
  - Color: white
```

**Quick Action (круглая):**
```css
Width: 48px
Height: 48px
Border-radius: 50%
Background: white
Box-shadow: 0 4px 12px rgba(0,0,0,0.15)
Font-size: 20px (emoji)

Hover: 
  - Scale: 1.1
  - Box-shadow: 0 6px 20px rgba(0,0,0,0.2)
```

### Sidebar

**Artifact Icon (компактный режим):**
```css
Width: 56px
Height: 56px
Border-radius: 14px
Background: rgba(255, 255, 255, 0.15)
Font-size: 26px
Display: flex, center

Active state:
  - Background: white
  - Box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4)
  - Transform: scale(1.05)

Badge:
  - Position: absolute, top: -4px, right: -4px
  - Background: #ef4444
  - Width: 20px, Height: 20px
  - Border-radius: 50%
  - Font-size: 11px
```

### Chat Messages

**AI Message:**
```css
Display: flex, gap: 12px
Animation: slideIn 0.3s ease

Avatar:
  - Width: 36px, Height: 36px
  - Border-radius: 50%
  - Background: white
  - Icon: 🤖

Bubble:
  - Background: white
  - Padding: 14px 16px
  - Border-radius: 16px
  - Box-shadow: 0 2px 8px rgba(0,0,0,0.08)
  - Font-size: 14px
  - Line-height: 1.6
```

**User Message:**
```css
Similar to AI, but:
  - Avatar: gradient background + initials
  - Bubble: background #f0f9ff
```

**Suggestion Chips:**
```css
Padding: 6px 12px
Background: white
Border-radius: 16px
Font-size: 12px
Color: #065f46

Hover:
  - Background: #d1fae5
  - TranslateY: -2px
```

---

## 🎨 Цветовая схема

### Основные цвета

```css
/* Backgrounds */
--header-gradient: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
--sidebar-gradient: linear-gradient(180deg, #a78bfa 0%, #8b5cf6 100%);
--content-gradient: linear-gradient(135deg, #e9d5ff 0%, #ddd6fe 100%);
--chat-gradient: linear-gradient(180deg, #a7f3d0 0%, #6ee7b7 100%);

/* Primary */
--purple-600: #8b5cf6;
--purple-700: #7c3aed;

/* Success */
--green-600: #10b981;
--green-700: #059669;
--green-800: #065f46;

/* Warning */
--orange-500: #f59e0b;
--orange-600: #d97706;

/* Error */
--red-500: #ef4444;
--red-600: #dc2626;

/* Neutral */
--gray-900: #1a202c;
--gray-700: #4a5568;
--gray-600: #64748b;
--gray-400: #94a3b8;
--gray-200: #e2e8f0;
--gray-100: #f1f5f9;
--gray-50: #f8fafc;

/* White */
--white: #ffffff;
```

### Семантические цвета

```css
/* Status */
--status-active: #059669;
--status-pending: #f59e0b;
--status-blocked: #ef4444;

/* Trends */
--trend-up: #10b981;
--trend-down: #ef4444;
--trend-neutral: #64748b;

/* Channels */
--channel-yandex: #fbbf24;  /* Yellow */
--channel-vk: #3b82f6;       /* Blue */
--channel-google: #4ade80;   /* Green */
--channel-mytarget: #f87171;  /* Red */
```

### Градиенты

```css
/* Cards */
--gradient-budget: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
--gradient-timeline: linear-gradient(135deg, #ddd6fe 0%, #c4b5fd 100%);
--gradient-kpi: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);

/* Progress */
--gradient-progress: linear-gradient(90deg, #10b981 0%, #059669 100%);

/* Avatars */
--gradient-user-1: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--gradient-user-2: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
--gradient-user-3: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
--gradient-user-4: linear-gradient(135deg, #ec4899 0%, #db2777 100%);
--gradient-user-5: linear-gradient(135deg, #10b981 0%, #059669 100%);
```

---

## 🔄 Интерактивность

### Hover Effects

**Карточки:**
```css
transition: all 0.3s ease;
hover: {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}
```

**Кнопки:**
```css
transition: all 0.2s ease;
hover: {
  background: darker shade;
  transform: translateY(-2px);
  box-shadow: enhanced;
}
```

**Sidebar Items:**
```css
transition: all 0.3s ease;
hover: {
  background: lighter;
  transform: translateX(5px) или scale(1.1);
}
```

### Animations

**Slide In (для сообщений):**
```css
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

animation: slideIn 0.3s ease;
```

**Progress Bar Fill:**
```css
transition: width 0.5s ease;
```

### Click Actions

**Artifact Icon Click:**
```javascript
1. Update active state (add .active class)
2. Load artifact data from API
3. Update content area
4. Send context to AI
5. AI generates greeting message
```

**Action Button Click:**
```javascript
1. Disable button (loading state)
2. Send request to AI API
3. Stream response
4. Update UI with results
5. Enable button
```

---

## 📱 Адаптивность

### Breakpoints

```javascript
const breakpoints = {
  mobile: '320px - 767px',
  tablet: '768px - 1023px',
  desktop: '1024px - 1439px',
  wide: '1440px+'
};
```

### Mobile (320-767px)

```css
Layout: Single column
Sidebar: Hidden (hamburger menu)
Content: Full width
Chat: Bottom sheet (collapsible)
Header: Compact (logo + hamburger)
```

### Tablet (768-1023px)

```css
Layout: Two column
Sidebar: Icons only (80px)
Content: Flex: 1
Chat: Reduced width (320px)
Header: Same as desktop
```

### Desktop (1024-1439px)

```css
Layout: Three column (как в прототипах)
Sidebar: Icons only (80px)
Content: Flex: 1
Chat: Full width (420px)
Header: Full
```

### Wide (1440px+)

```css
Layout: Three column (расширенный)
Sidebar: Icons + labels (option)
Content: Max-width: 1400px, centered
Chat: Full width (420px)
Additional whitespace
```

---

## 🚀 Следующие шаги

### Phase 1: Доработка прототипов (неделя 1-2)

**Технические улучшения:**
- [ ] Добавить реальные SVG иконки вместо emoji
- [ ] Подключить реальные шрифты (Inter, SF Pro)
- [ ] Добавить интерактивность (JavaScript)
- [ ] Создать data bindings
- [ ] Добавить loading states
- [ ] Добавить error states

**Дополнительные экраны:**
- [ ] Бриф клиента (form view)
- [ ] Стратегический документ (document view)
- [ ] Техническое задание (checklist view)
- [ ] Задачи команды (kanban view)
- [ ] Коммуникация (timeline view)

### Phase 2: Интеграция с AI (неделя 3-4)

**AI Integration:**
- [ ] Подключить Claude API
- [ ] Реализовать streaming ответов
- [ ] Добавить context management
- [ ] Реализовать actions (экспорт, создание задач)
- [ ] Добавить suggestions engine
- [ ] Реализовать multimodal (charts в чате)

**Features:**
- [ ] Real-time collaboration
- [ ] Auto-save
- [ ] Version history
- [ ] Comments & annotations
- [ ] File attachments

### Phase 3: UI Framework (неделя 5-6)

**Tech Stack:**
```yaml
Frontend: Next.js 14 + React
Styling: TailwindCSS
State: Zustand / Jotai
Charts: Recharts / Visx
UI Components: Radix UI / Headless UI
Icons: Lucide React
Animations: Framer Motion
```

**Components Library:**
- [ ] Design system в Figma
- [ ] Component library в Storybook
- [ ] Темизация (light/dark mode)
- [ ] Accessibility (WCAG AA)
- [ ] i18n (RU/EN)

### Phase 4: Backend Integration (неделя 7-8)

**API:**
- [ ] REST API endpoints
- [ ] WebSocket для real-time
- [ ] GraphQL для сложных запросов
- [ ] Authentication & Authorization
- [ ] Rate limiting
- [ ] Caching strategy

**Data:**
- [ ] PostgreSQL schema
- [ ] ClickHouse для аналитики
- [ ] Vector DB для AI контекста
- [ ] Redis для кеширования
- [ ] S3 для файлов

### Phase 5: Testing & Launch (неделя 9-10)

**Testing:**
- [ ] Unit tests (Jest + React Testing Library)
- [ ] Integration tests (Playwright)
- [ ] E2E tests
- [ ] Performance testing
- [ ] Accessibility audit
- [ ] User testing (5-8 пользователей)

**Launch:**
- [ ] Beta версия для внутренней команды
- [ ] Сбор feedback
- [ ] Итерация на основе feedback
- [ ] Production deploy
- [ ] Onboarding materials
- [ ] Documentation

---

## 📚 Дополнительные материалы

### Файлы

**Структура данных:**
- `UI_Data_Structure.md` - Полная структура данных для всех компонентов

**Прототипы:**
- `prototype_v1_mediaplan.html` - Медиаплан с таблицей каналов
- `prototype_v2_passport.html` - Паспорт проекта (dashboard)
- `prototype_v3_report.html` - Отчет по кампании (analytics)

**Другие документы:**
- `02_ARTIFACTS/_Artifacts_Overview.md` - Описание всех артефактов
- `06_AI_ASSISTANTS/` - Спецификации AI ассистентов
- `01_ROLES/` - RACI матрицы для каждой роли

### Открыть прототипы

**Способ 1: Прямо в браузере**
```bash
# MacOS
open prototype_v1_mediaplan.html
open prototype_v2_passport.html
open prototype_v3_report.html

# Linux
xdg-open prototype_v1_mediaplan.html

# Windows
start prototype_v1_mediaplan.html
```

**Способ 2: Локальный сервер**
```bash
# Python
python -m http.server 8000

# Node.js
npx serve

# Затем открыть:
http://localhost:8000/prototype_v1_mediaplan.html
http://localhost:8000/prototype_v2_passport.html
http://localhost:8000/prototype_v3_report.html
```

### Контакты

**Вопросы по дизайну:**
- Design Team Lead
- Product Manager

**Вопросы по разработке:**
- Tech Lead
- Frontend Team

---

**Версия:** 1.0  
**Дата:** 2025-10-24  
**Статус:** ✅ Complete  
**Следующее обновление:** После Phase 1

