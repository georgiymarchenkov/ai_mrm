---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: guide_doc
title: Pre-Development Action Plan - Детальный план подготовки к разработке
language: ru
industry: advertising
role_apply: [founder, product_manager, designer]
period: 2025-10
version: "1.0"
source_path: PRE_DEVELOPMENT_ACTION_PLAN.md
effective_date: 2025-10-24
visibility: internal
security_level: high
tags: [action_plan, pre_development, design, validation, mvp]
---

# 🎯 Pre-Development Action Plan
## Детальный план работы по устранению блокеров MVP

**Цель:** Достичь 85%+ готовности для старта Sprint 1  
**Timeline:** 4-6 недель  
**Budget:** $9-13K (immediate) + $12-18K (post-launch)

→ [MVP Readiness Analysis](./MVP_READINESS_CRITICAL_ANALYSIS.md)

---

## 📋 ОГЛАВЛЕНИЕ

### 🔴 БЛОКЕРЫ (Priority 0):
1. [Design System & UI Kit](#1-design-system--ui-kit)
2. [Figma Mockups (10 экранов)](#2-figma-mockups-10-экранов)
3. [Validated User Stories](#3-validated-user-stories)

### 🟠 ВАЖНЫЕ (Priority 1):
4. [API Specification (OpenAPI)](#4-api-specification-openapi)
5. [Seed Data (structured)](#5-seed-data-structured)
6. [Onboarding Flow](#6-onboarding-flow)
7. [Test Cases & QA](#7-test-cases--qa)

---

# 🔴 БЛОКЕРЫ

## 1. Design System & UI Kit

**Status:** 0% → Target: 100%  
**Budget:** $2K  
**Timeline:** 1-2 weeks  
**Deliverable:** Figma file с компонентами + Style guide

---

### 📊 Что нужно сделать:

#### Phase 1: Выбор базы (Day 1)

**Задача:** Выбрать готовый UI kit для адаптации

**Варианты:**

```yaml
Option A: Untitled UI ($249) ⭐ РЕКОМЕНДУЮ
  Link: https://www.untitledui.com/
  Pros:
    - Самый популярный для SaaS
    - 7,000+ компонентов
    - Figma + React code
    - Dark mode из коробки
    - Хорошая документация
  Cons:
    - $249 (но окупается за час работы)

Option B: Flowbite Pro ($199)
  Link: https://flowbite.com/pro/
  Pros:
    - Дешевле
    - Tailwind CSS based
    - Много примеров
  Cons:
    - Меньше компонентов
    - Нет dark mode

Option C: TailwindUI ($299)
  Link: https://tailwindui.com/
  Pros:
    - От создателей Tailwind
    - Высокое качество кода
  Cons:
    - Дороже
    - Меньше готовых компонентов

Option D: Создать с нуля
  Pros: Полный контроль
  Cons: 3-4 недели работы + $5K
```

**РЕКОМЕНДАЦИЯ:** ✅ Купить **Untitled UI** ($249)

---

#### Phase 2: Брендинг (Day 2-3)

**Задача:** Определить цвета, шрифты, стиль бренда MRM AI

**ЧТО НУЖНО ПРЕДОСТАВИТЬ МНЕ:**

```yaml
1. Брендинг (если есть):
   - Logo (SVG + PNG)
   - Brand colors (если уже есть)
   - Font preferences
   
2. Референсы (что нравится):
   - Скриншоты 3-5 сайтов/приложений, которые нравятся стилистически
   - Примеры: Linear, Notion, Airtable, Monday.com, ClickUp
   
3. Настроение бренда:
   - Professional or Friendly?
   - Minimal or Rich?
   - Modern or Classic?
```

**Если брендинга НЕТ, предлагаю стандартный SaaS style:**

```yaml
Colors:
  Primary: #6366F1 (Indigo) - для CTA, links
  Secondary: #8B5CF6 (Purple) - для accents
  Success: #10B981 (Green)
  Warning: #F59E0B (Amber)
  Error: #EF4444 (Red)
  Gray scale: Slate (50-900)
  
Fonts:
  Primary: Inter (Google Fonts, free)
  Mono: JetBrains Mono (for code)
  
Style:
  - Modern, clean, professional
  - Rounded corners (8px)
  - Soft shadows
  - Generous whitespace
```

**Action Items для вас:**

- [ ] Купить Untitled UI license ($249)
- [ ] Прислать мне license key или Figma link
- [ ] Предоставить logo (если есть) или утвердить что создадим позже
- [ ] Выбрать 3-5 референсов дизайна (screenshots или links)
- [ ] Утвердить color palette (предложенный или свой)

**Deliverable:** Адаптированная design system в Figma

---

#### Phase 3: Создание Component Library (Day 4-7)

**Компоненты для MVP (20 штук):**

```yaml
Forms & Inputs:
  - Button (4 variants: primary, secondary, outline, ghost)
  - Input (text, email, password, number)
  - Textarea
  - Select / Dropdown
  - Checkbox
  - Radio
  - Switch / Toggle
  - DatePicker
  - TimePicker

Layout:
  - Card
  - Modal / Dialog
  - Drawer / Sidebar
  - Tabs
  - Accordion / Collapse

Feedback:
  - Alert (success, warning, error, info)
  - Toast / Notification
  - Progress Bar
  - Loading Spinner
  - Badge

Data Display:
  - Table
  - Pagination
  - Avatar
  - Empty State

Navigation:
  - Breadcrumbs
  - Dropdown Menu
```

**ЧТО НУЖНО ПРЕДОСТАВИТЬ МНЕ:**

```yaml
Примеры использования каждого компонента:
  
  Например для Button:
  - Primary button: "Создать проект", "Сохранить"
  - Secondary: "Отмена", "Назад"
  - Outline: "Экспорт", "Поделиться"
  - Ghost: Icons in toolbar
  
  Для Table:
  - Список проектов (columns: название, бюджет, статус, дата)
  - Список кампаний
  - Список отчетов
```

**Action Items для вас:**

- [ ] Просмотреть список компонентов (выше)
- [ ] Добавить недостающие компоненты (если нужны)
- [ ] Предоставить реальные примеры текстов для кнопок, labels
- [ ] Утвердить Figma workspace URL

**Deliverable:** Figma file со всеми компонентами

**Timeline:** Day 1-7 (1 неделя)

---

### ✅ Критерии готовности Design System:

- [ ] Figma file создан и shared с командой
- [ ] 20 базовых компонентов готовы
- [ ] Color palette определена
- [ ] Typography scale определена
- [ ] Spacing system (4px grid)
- [ ] Icon set выбран (Heroicons / Lucide)
- [ ] Responsive breakpoints определены
- [ ] Dark mode поддержка (optional для MVP)
- [ ] Документация компонентов (аннотации в Figma)

**Output:** `design-system.fig` в Figma

---

## 2. Figma Mockups (10 экранов)

**Status:** 0% → Target: 100%  
**Budget:** $5-8K  
**Timeline:** 3-4 weeks  
**Deliverable:** 10 полных mockups в Figma

---

### 📊 Список экранов для MVP:

#### Экраны Tier 1 (критичные, делаем первыми):

```yaml
1. Экран: Login / Signup
   Описание: Аутентификация пользователя
   Компоненты: Form, Input (email, password), Button, Link
   States: Default, Loading, Error
   
2. Экран: Dashboard (главная)
   Описание: Overview всех проектов + key metrics
   Компоненты: Sidebar nav, Cards, Table, Charts
   Data: 5 проектов, KPIs (budget, campaigns, ROI)
   
3. Экран: Projects List
   Описание: Список всех проектов с фильтрами
   Компоненты: Table, Filters, Search, Pagination
   Data: 20 проектов (название, клиент, бюджет, статус, дата)
   
4. Экран: Project Detail
   Описание: Детальная информация о проекте
   Компоненты: Tabs, Timeline, Artifacts list, Team members
   Data: Project info, 5 artifacts, 3 team members, timeline
   
5. Экран: Brief Creation Form
   Описание: Форма создания брифа клиента
   Компоненты: Multi-step form, Progress indicator, Save/Cancel
   Data: Client info, Budget, Channels, Goals, Dates
```

#### Экраны Tier 2 (важные, делаем после Tier 1):

```yaml
6. Экран: Media Plan Editor
   Описание: Создание/редактирование медиаплана
   Компоненты: Table (editable), Charts, Budget calculator
   Data: Channels, Budget allocation, Dates, KPIs
   
7. Экран: Campaign Report View
   Описание: Просмотр отчета по кампании
   Компоненты: Charts, Tables, Filters, Export button
   Data: Performance metrics, Charts (CTR, CPC, ROI)
   
8. Экран: Settings - User Profile
   Описание: Настройки профиля пользователя
   Компоненты: Form, Avatar upload, Password change
   Data: Name, Email, Avatar, Role, Company
   
9. Экран: Settings - Team Management
   Описание: Управление командой и правами
   Компоненты: Table, Invite button, Role selector
   Data: 5 team members, roles, permissions
   
10. Экран: Empty States
    Описание: Пустые состояния для новых пользователей
    Компоненты: Illustration, Text, CTA button
    Варианты: No projects, No campaigns, No data
```

---

### 📋 ЧТО НУЖНО ПРЕДОСТАВИТЬ МНЕ для каждого экрана:

#### Для КАЖДОГО экрана нужно:

```yaml
1. Content (контент):
   - Заголовки (H1, H2, H3)
   - Body text (описания, hints, tooltips)
   - Labels (для полей форм)
   - Button text
   - Error messages
   - Success messages
   
2. Data (реальные данные для примера):
   - Для таблиц: реальные строки (3-5 штук)
   - Для графиков: реальные цифры
   - Для форм: placeholder examples
   
3. User flow (что происходит):
   - Что user делает на этом экране?
   - Откуда пришел? Куда идет дальше?
   - Какие actions доступны?
   
4. Business rules:
   - Валидация (какие поля обязательны?)
   - Permissions (кто может видеть/редактировать?)
   - States (draft, published, archived, etc.)
```

---

### 📝 TEMPLATE для каждого экрана:

Заполните этот template для ВСЕХ 10 экранов:

```yaml
═══════════════════════════════════════════
SCREEN 1: Login / Signup
═══════════════════════════════════════════

Purpose:
  Что: Аутентификация пользователя в систему
  Кто: Новые и существующие пользователи
  Зачем: Получить доступ к платформе

Layout:
  - Split screen (left: form, right: marketing content)
  - Form в центре
  - Logo сверху
  
Content:
  Heading: "Добро пожаловать в MRM AI"
  Subheading: "Войдите или создайте аккаунт"
  
  Login form:
    - Email field (label: "Email", placeholder: "ivan@agency.ru")
    - Password field (label: "Пароль", placeholder: "••••••••")
    - Forgot password link: "Забыли пароль?"
    - Submit button: "Войти"
    - Divider: "или"
    - Signup link: "Создать аккаунт"
  
  Signup form:
    - Name field (label: "Имя", placeholder: "Иван Иванов")
    - Email field (label: "Email", placeholder: "ivan@agency.ru")
    - Password field (label: "Пароль", min 8 chars)
    - Terms checkbox: "Я согласен с условиями использования"
    - Submit button: "Создать аккаунт"
    
  Marketing content (right side):
    - Hero image / illustration
    - Value proposition bullets:
      • "Управляйте проектами в 10x быстрее"
      • "AI-ассистент для каждой задачи"
      • "Экономия 280+ часов в месяц"

States:
  - Default (empty form)
  - Loading (spinner on button)
  - Error (red border + error message under field)
  - Success (redirect to dashboard)

Navigation:
  From: Landing page, email link
  To: Dashboard (after successful login)
  
Error messages:
  - "Неверный email или пароль"
  - "Email уже зарегистрирован"
  - "Пароль должен быть минимум 8 символов"

═══════════════════════════════════════════
SCREEN 2: Dashboard
═══════════════════════════════════════════

Purpose:
  Что: Главная страница с overview всех проектов
  Кто: Все роли (PM, Specialist, Account, etc.)
  Зачем: Быстро увидеть статус всех проектов и KPIs

Layout:
  - Sidebar navigation (left)
  - Top bar (breadcrumbs, search, notifications, profile)
  - Main content (3 columns)
  
Content:
  Heading: "Дашборд"
  Subheading: "Последние обновления по вашим проектам"
  
  Top KPIs (4 cards):
    Card 1: "Активные проекты"
      Value: 12
      Change: +3 за последний месяц
      Icon: Folder
      
    Card 2: "Общий бюджет"
      Value: ₽45,000,000
      Change: +15% за последний квартал
      Icon: Money
      
    Card 3: "Кампании в работе"
      Value: 28
      Change: +5 за последнюю неделю
      Icon: Target
      
    Card 4: "Средний ROI"
      Value: 320%
      Change: +12% за последний месяц
      Icon: TrendingUp
  
  Recent Projects table:
    Headers: Название | Клиент | Бюджет | Статус | Обновлено
    
    Row 1:
      Name: "Clarins - Beauty School Campaign"
      Client: "Clarins"
      Budget: ₽5,000,000
      Status: В работе (green badge)
      Updated: 2 часа назад
      
    Row 2:
      Name: "Апельсин - Запуск ЖК"
      Client: "Апельсин"
      Budget: ₽15,000,000
      Status: Планирование (yellow badge)
      Updated: 1 день назад
      
    Row 3:
      Name: "ГПБ - Финансовые услуги"
      Client: "Газпромбанк"
      Budget: ₽25,000,000
      Status: В работе (green badge)
      Updated: 3 часа назад
      
    Row 4:
      Name: "МТС - Тарифы для бизнеса"
      Client: "МТС"
      Budget: ₽8,000,000
      Status: На согласовании (orange badge)
      Updated: 5 часов назад
      
    Row 5:
      Name: "Сбербанк - Ипотека"
      Client: "Сбербанк"
      Budget: ₽30,000,000
      Status: Завершен (gray badge)
      Updated: 2 недели назад
  
  Quick actions:
    - Button: "+ Новый проект"
    - Button: "Импорт из Excel"
    - Link: "Посмотреть все проекты →"

Sidebar navigation:
  - Dashboard (active)
  - Проекты
  - Кампании
  - Отчеты
  - Аналитика
  - Настройки
  - Помощь

Navigation:
  From: Login, Any page (via sidebar)
  To: Project detail (click on row), Projects list (click "все проекты")

Actions:
  - Click on project row → Project detail
  - Click "+ Новый проект" → Project creation wizard
  - Click "Импорт" → Migration assistant

═══════════════════════════════════════════
```

**Action Items для вас:**

- [ ] Заполнить template для ВСЕХ 10 экранов (можно в отдельном файле)
- [ ] Предоставить реальные данные для примеров:
  - [ ] 5 проектов с реальными названиями
  - [ ] 3-5 клиентов (реальные или вымышленные российские компании)
  - [ ] Реальные бюджеты (в рублях)
  - [ ] Статусы проектов
- [ ] Предоставить screenshots текущих инструментов (если используете)
- [ ] Указать референсы дизайна для каждого типа экрана

**Template файл создам для вас:**

```
📄 MOCKUPS_SPECIFICATION.md
  - Templates для всех 10 экранов
  - Чеклисты
  - Примеры заполнения
```

**Deliverable:** 10 Figma mockups готовы к разработке

**Timeline:** Week 1-4 (3-4 недели)

---

### ✅ Критерии готовности Mockups:

Для каждого экрана:
- [ ] Layout определен (расположение элементов)
- [ ] Весь контент на месте (real content, не Lorem Ipsum)
- [ ] Все states показаны (default, loading, error, success)
- [ ] Navigation paths очевидны
- [ ] Responsive версии (desktop, tablet, mobile)
- [ ] Interactive prototype (кликабельный)
- [ ] Annotated (комментарии для developers)

**Output:** `mvp-mockups.fig` в Figma + Interactive prototype link

---

## 3. Validated User Stories

**Status:** 40% → Target: 100%  
**Budget:** $2-3K  
**Timeline:** 1-2 weeks  
**Deliverable:** Prioritized backlog с validated user stories

---

### 📊 Процесс валидации:

#### Phase 1: Собрать существующие данные (Day 1)

**У нас УЖЕ ЕСТЬ:**
- ✅ PDF интервью с командами агентств
- ✅ PDF интервью с клиентами
- ✅ Roles & RACI Analysis (1063 задачи)
- ✅ Pain Points analysis
- ✅ Team Audit (280h/month automation potential)

**ЧТО НУЖНО СДЕЛАТЬ:**

```yaml
1. Извлечь Top-10 Pain Points из интервью:
   
   Example format:
   Pain Point #1:
     Problem: "Хаос в Excel файлах - проекты разбросаны, версии перепутаны"
     Frequency: 10/10 respondents mentioned
     Time lost: 5-10 hours/week per person
     Willingness to pay: High (8/10)
     Priority: P0 (critical)
     
     Suggested solution:
       Feature: Migration Assistant
       User story: "Как PM, я хочу импортировать все проекты из Excel одним кликом, чтобы не тратить недели на ручной перенос"
       Acceptance criteria:
         - Upload multiple Excel files
         - AI auto-detects structure
         - Preview before import
         - Import completes in <5 min
```

**Action Items для вас:**

- [ ] Прочитать 2 PDF интервью (если еще не читали)
- [ ] Выписать Top-10 самых частых жалоб/проблем
- [ ] Для каждой проблемы указать:
  - [ ] Как часто встречается?
  - [ ] Сколько времени тратится?
  - [ ] Насколько критична? (1-10)
  - [ ] Сколько готовы платить за решение?

**Template:**

```yaml
═══════════════════════════════════════════
PAIN POINT #1
═══════════════════════════════════════════

Problem (своими словами):
  "Все проекты в разных Excel файлах. Постоянно путаются версии. 
   Трачу 2-3 часа в день на поиск нужной информации."

Who has this problem:
  - Project Managers (10/10)
  - Specialists (7/10)
  - Account Managers (5/10)

Frequency:
  ☑️ Daily
  ☐ Weekly
  ☐ Monthly

Time lost:
  2-3 hours per day per person

Current workaround:
  "Складываем все в Dropbox, используем naming convention,
   но все равно путаница."

Pain level (1-10):
  9/10 - Very painful

Willingness to pay:
  8/10 - Definitely would pay

Priority:
  ☑️ P0 - Critical (must have in MVP)
  ☐ P1 - Important
  ☐ P2 - Nice to have

═══════════════════════════════════════════
```

---

#### Phase 2: Провести дополнительные интервью (Day 2-7)

**Цель:** Validировать что наши решения действительно решают проблемы

**Кол-во:** 5 интервью (1 час каждое)

**Кого интервьюировать:**
- 2 Project Managers
- 1 Media Specialist
- 1 Account Manager
- 1 Strategist/Analyst

**ЧТО НУЖНО ПРЕДОСТАВИТЬ МНЕ:**

```yaml
Кандидаты для интервью:
  Person 1:
    Name: Иван И. (можно анонимно)
    Role: Project Manager
    Company: Средний размер агентства (10-30 человек)
    Experience: 3+ years
    Contact: ivan@email.ru или Telegram
    
  Person 2:
    Name: Мария П.
    Role: Media Specialist
    Company: Крупное агентство (50+ человек)
    Experience: 5+ years
    Contact: maria@email.ru
    
  ... (еще 3 человека)
```

**Вопросы для интервью (я подготовлю полный скрипт):**

```yaml
Категории вопросов:

1. Current Process (как сейчас работают):
   - Как вы управляете проектами сейчас?
   - Какие инструменты используете?
   - Что самое болезненное в текущем процессе?

2. Pain Points Validation (проверка наших гипотез):
   - Сколько времени тратите на X?
   - Как часто возникает проблема Y?
   - Что делаете чтобы решить Z?

3. Solution Validation (покажем концепт):
   - Если бы была функция X, насколько это полезно? (1-10)
   - Сколько времени это сэкономит?
   - Что еще важно добавить?

4. Prioritization (что важнее):
   - Из этих 5 фич, какие 3 самые важные?
   - Без чего точно не будете использовать?
   - Что можно отложить на потом?

5. Willingness to Pay:
   - Сколько стоит ваше время? (₽/час)
   - Если сэкономите X часов, сколько готовы платить?
   - Какой budget на инструменты?
```

**Action Items для вас:**

- [ ] Найти 5 кандидатов для интервью
- [ ] Согласовать даты/время интервью
- [ ] Я подготовлю interview script
- [ ] Провести интервью (или я могу помочь)
- [ ] Записать/законспектировать ответы

**Deliverable:** 5 interview transcripts или summaries

---

#### Phase 3: Prioritization по RICE (Day 8-10)

**Метод RICE:**

```
Score = (Reach × Impact × Confidence) / Effort

Reach = сколько пользователей затронет (0-100)
Impact = насколько сильно поможет (0.25, 0.5, 1, 2, 3)
Confidence = насколько уверены (0-100%)
Effort = сколько работы (person-weeks)
```

**ЧТО НУЖНО СДЕЛАТЬ:**

Для каждой user story рассчитать RICE score:

```yaml
User Story: "Migration Assistant - Import from Excel"

Reach:
  Вопрос: Сколько новых пользователей будут использовать эту фичу?
  Ответ: 100 (все новые пользователи)
  Score: 100

Impact:
  Вопрос: Насколько сильно это им поможет?
  Options:
    0.25 = Minimal (saves 10-30 min)
    0.5  = Low (saves 1-2 hours)
    1    = Medium (saves 3-5 hours)
    2    = High (saves 1-2 days)
    3    = Massive (saves weeks, critical feature)
  Ответ: 3 (экономит недели миграции)
  Score: 3

Confidence:
  Вопрос: Насколько мы уверены в оценках выше?
  Ответ: 80% (есть интервью + реальные данные)
  Score: 0.8

Effort:
  Вопрос: Сколько работы потребуется?
  Ответ: 2-3 weeks для 1 developer
  Score: 2.5

RICE Score = (100 × 3 × 0.8) / 2.5 = 96 ⭐ VERY HIGH
```

**Action Items для вас:**

Для каждой фичи MVP ответить на вопросы:

```yaml
Feature: Migration Assistant
  Reach: 100 (all new users)
  Impact: 3 (saves weeks)
  Confidence: 80%
  Effort: 2-3 weeks
  RICE: 96

Feature: AI Brief Generator
  Reach: 80 (most users will use)
  Impact: 2 (saves 1-2 days)
  Confidence: 60% (AI - less certain)
  Effort: 3-4 weeks
  RICE: ?

Feature: Real-time Dashboard
  Reach: ?
  Impact: ?
  Confidence: ?
  Effort: ?
  RICE: ?

... (для всех MVP features)
```

**Я помогу:**
- Подготовлю список всех features для оценки
- Помогу с Effort estimation
- Посчитаю final RICE scores
- Создам prioritized backlog

**Deliverable:** 
- `feature_prioritization_RICE.xlsx` 
- `validated_user_stories.md`
- `mvp_scope_definition.md`

---

### ✅ Критерии готовности User Stories:

- [ ] Top-10 pain points extracted из интервью
- [ ] 5 новых интервью проведены
- [ ] Все features оценены по RICE
- [ ] MVP scope определен (Must Have vs Should Have vs Won't Have)
- [ ] User stories написаны в формате: "As a [role], I want [feature], so that [benefit]"
- [ ] Acceptance criteria для каждой story (3-5 критериев)
- [ ] Effort estimates (story points или hours)
- [ ] Priority установлен (P0, P1, P2, P3)

**Output:** 
- `validated_backlog.md`
- `mvp_features_locked.md` (финальный locked scope)

**Timeline:** Week 1-2 (1-2 недели параллельно с дизайном)

---

# 🟠 ВАЖНЫЕ (Priority 1)

## 4. API Specification (OpenAPI)

**Status:** 30% → Target: 80%  
**Budget:** $2-3K  
**Timeline:** 1-2 weeks  
**Deliverable:** OpenAPI 3.0 spec + Swagger UI

---

### 📊 Что нужно сделать:

#### Phase 1: Audit существующей документации (Day 1)

**У нас УЖЕ ЕСТЬ:**
- ✅ Data models (JSON schemas) для всех артефактов
- ✅ Общая архитектура API
- ✅ Auth flow описан

**ЧТО НУЖНО ДОПОЛНИТЬ:**

```yaml
1. Детальные endpoints:
   - HTTP methods
   - Request/response examples
   - Error codes
   - Pagination
   
2. Authentication:
   - JWT token format
   - Refresh token flow
   - API keys для integrations
   
3. Rate limiting:
   - Limits по tier (Free/Team/Business)
   - Headers (X-RateLimit-*)
   
4. Webhooks:
   - Events (project.created, campaign.completed)
   - Payload examples
   - Retry logic
```

---

#### Phase 2: Создать OpenAPI spec (Day 2-10)

**ЧТО НУЖНО ПРЕДОСТАВИТЬ МНЕ:**

Для каждой группы endpoints, нужно определить:

```yaml
═══════════════════════════════════════════
ENDPOINT GROUP: Projects
═══════════════════════════════════════════

Endpoints нужные:
  1. GET /projects - List all projects
  2. POST /projects - Create new project
  3. GET /projects/:id - Get project details
  4. PATCH /projects/:id - Update project
  5. DELETE /projects/:id - Delete project
  6. GET /projects/:id/team - Get project team
  7. POST /projects/:id/team - Add team member
  ... (какие еще?)

Для каждого endpoint:

GET /projects (List all projects)
  Query parameters:
    - page: number (default: 1)
    - limit: number (default: 20, max: 100)
    - status: enum (active, draft, completed, archived)
    - client: string (filter by client name)
    - sort: enum (created_at, updated_at, budget)
    - order: enum (asc, desc)
    
  Response 200:
    {
      "data": [
        {
          "id": "proj_abc123",
          "name": "Clarins - Beauty School",
          "client": "Clarins",
          "budget": 5000000,
          "status": "active",
          "created_at": "2025-10-01T10:00:00Z",
          "updated_at": "2025-10-24T15:30:00Z"
        },
        ... more projects
      ],
      "meta": {
        "total": 156,
        "page": 1,
        "limit": 20,
        "pages": 8
      }
    }
    
  Response 401:
    {
      "error": {
        "code": "UNAUTHORIZED",
        "message": "Invalid or expired token"
      }
    }
    
  Response 403:
    {
      "error": {
        "code": "FORBIDDEN",
        "message": "You don't have permission to view projects"
      }
    }

POST /projects (Create new project)
  Request body:
    {
      "name": "Project name",
      "client": "Client name",
      "budget": 5000000,
      "start_date": "2025-11-01",
      "end_date": "2025-12-31",
      "team": ["user_id_1", "user_id_2"]
    }
    
  Response 201:
    {
      "data": {
        "id": "proj_abc123",
        "name": "...",
        "created_at": "..."
      }
    }
    
  Response 400:
    {
      "error": {
        "code": "VALIDATION_ERROR",
        "message": "Invalid input",
        "details": {
          "name": "Project name is required",
          "budget": "Budget must be positive number"
        }
      }
    }

... (и так для ВСЕХ endpoints)

═══════════════════════════════════════════
```

**Action Items для вас:**

- [ ] Просмотреть список endpoint groups:
  - [ ] Authentication (`/auth/*`)
  - [ ] Projects (`/projects/*`)
  - [ ] Briefs (`/briefs/*`)
  - [ ] Media Plans (`/media-plans/*`)
  - [ ] Campaigns (`/campaigns/*`)
  - [ ] Reports (`/reports/*`)
  - [ ] Integrations (`/integrations/*`)
  - [ ] AI Assistants (`/ai/*`)
  - [ ] Users & Teams (`/users/*`, `/teams/*`)
  
- [ ] Добавить недостающие endpoint groups (если есть)

- [ ] Для TOP-10 самых важных endpoints предоставить:
  - [ ] Пример request payload (JSON)
  - [ ] Пример response (JSON)
  - [ ] Какие query параметры нужны
  - [ ] Какие error cases возможны

**Я сделаю:**
- Создам полную OpenAPI 3.0 spec
- Настрою Swagger UI
- Сгенерирую TypeScript SDK
- Создам Postman collection для тестирования

**Deliverable:** 
- `openapi.yaml`
- Swagger UI: `https://api.mrm.ai/docs`
- TypeScript SDK для frontend
- Postman collection

**Timeline:** Week 2-3 (1-2 недели)

---

### ✅ Критерии готовности API Spec:

- [ ] OpenAPI 3.0 file создан
- [ ] Все endpoint groups покрыты
- [ ] Request/response examples для всех endpoints
- [ ] Error responses documented (400, 401, 403, 404, 500)
- [ ] Authentication flow described
- [ ] Rate limiting rules defined
- [ ] Pagination strategy defined
- [ ] Swagger UI deployed
- [ ] TypeScript SDK generated
- [ ] Postman collection exported

**Output:** `openapi.yaml` + Swagger UI

---

## 5. Seed Data (structured)

**Status:** 15% → Target: 60%  
**Budget:** $2K  
**Timeline:** 1-2 weeks  
**Deliverable:** JSON/SQL seed data для development

---

### 📊 Что нужно сделать:

#### Phase 1: Инвентаризация существующих данных (Day 1)

**У нас УЖЕ ЕСТЬ:**
- 12 Excel файлов с реальными кампаниями
- 4 CSV файлов
- 17 screenshots

**НУЖНО:**
1. Выбрать 3 лучших проекта для demo
2. Конвертировать в structured JSON
3. Создать SQL seed scripts

---

#### Phase 2: Выбрать 3 demo projects (Day 1-2)

**ЧТО НУЖНО ПРЕДОСТАВИТЬ МНЕ:**

```yaml
Demo Project #1: Clarins - Beauty School Campaign
  
  Почему выбрали:
    - Полный lifecycle (brief → strategy → plan → campaign → report)
    - Средний бюджет (₽5M)
    - Хороший пример для beauty/retail
    
  Какие данные есть:
    - ✅ Excel: Clarins _ Паспорт проекта.xlsx
    - ✅ Excel: Clarins_SEM_Еженедельный отчет.xlsx
    - ✅ Документ: Clarins_Redesign_Plan_Beauty_School.md
    - ✅ Анализ: Clarins_Weekly_CTR_Analysis.md
    
  Что нужно извлечь:
    - Brief data (client, budget, goals, dates)
    - Media plan (channels, budget allocation)
    - Campaign data (ads, creatives, targeting)
    - Report data (metrics, CTR, CPC, conversions)
    - Team (roles involved)

Demo Project #2: Апельсин - Запуск ЖК
  
  Почему выбрали:
    - Real estate vertical
    - Крупный бюджет (₽15M)
    - Lead generation focus
    
  Какие данные есть:
    - ✅ Excel: ОРИГИНАЛ Апельсин __ Тендер __ Медиаплан.xlsx
    
  Что нужно извлечь:
    - Brief
    - Media plan
    - (Campaign data если есть)

Demo Project #3: ГПБ - Финансовые услуги
  
  Почему выбрали:
    - Finance vertical
    - Самый крупный бюджет (₽25M)
    - Multi-channel strategy
    
  Какие данные есть:
    - ✅ Excel: Планирование ГПБ-УА.xlsx
    - ✅ CSV: Планирование ГПБ-УА.csv
    
  Что нужно извлечь:
    - Brief
    - Media plan
    - Budget model
```

**Action Items для вас:**

- [ ] Утвердить 3 demo проекта (или предложить другие)
- [ ] Предоставить доступ ко ВСЕМ данным по этим проектам:
  - [ ] Excel файлы
  - [ ] CSV файлы  
  - [ ] Документы
  - [ ] Screenshots
  - [ ] Любые другие материалы
  
- [ ] Для каждого проекта указать:
  - [ ] Client name
  - [ ] Industry
  - [ ] Campaign goal
  - [ ] Budget
  - [ ] Duration (start/end dates)
  - [ ] Channels used
  - [ ] Key metrics achieved

---

#### Phase 3: Конвертация в JSON (Day 3-7)

**Я сделаю:**

Конвертирую Excel/CSV → structured JSON:

```json
{
  "projects": [
    {
      "id": "proj_clarins_001",
      "name": "Clarins - Beauty School Campaign",
      "client": {
        "id": "client_clarins",
        "name": "Clarins",
        "industry": "Beauty & Cosmetics",
        "contact": {
          "name": "Анна Смирнова",
          "email": "anna@clarins.ru",
          "phone": "+7 (495) 123-45-67"
        }
      },
      "budget": 5000000,
      "currency": "RUB",
      "start_date": "2025-07-01",
      "end_date": "2025-07-31",
      "status": "completed",
      "team": [
        {
          "user_id": "user_001",
          "name": "Иван Петров",
          "role": "project_manager"
        },
        {
          "user_id": "user_002",
          "name": "Мария Иванова",
          "role": "media_specialist"
        }
      ],
      "brief": {
        "id": "brief_clarins_001",
        "goal": "Повышение awareness бренда и продвижение Beauty School",
        "target_audience": {
          "age": [25, 45],
          "gender": "female",
          "interests": ["beauty", "cosmetics", "skincare"],
          "geo": ["Москва", "Санкт-Петербург"]
        },
        "kpis": [
          {
            "metric": "reach",
            "target": 1000000
          },
          {
            "metric": "registrations",
            "target": 5000
          }
        ]
      },
      "media_plan": {
        "id": "mp_clarins_001",
        "channels": [
          {
            "channel": "yandex_direct",
            "budget": 2000000,
            "expected_reach": 500000,
            "cpm": 400
          },
          {
            "channel": "vk_ads",
            "budget": 1500000,
            "expected_reach": 300000,
            "cpm": 250
          },
          {
            "channel": "programmatic",
            "budget": 1500000,
            "expected_reach": 400000,
            "cpm": 300
          }
        ],
        "total_budget": 5000000,
        "expected_total_reach": 1200000
      },
      "campaigns": [
        {
          "id": "camp_clarins_yd_001",
          "platform": "yandex_direct",
          "name": "Clarins Beauty School - Поиск",
          "budget": 1000000,
          "start_date": "2025-07-01",
          "end_date": "2025-07-31",
          "performance": {
            "impressions": 2500000,
            "clicks": 12500,
            "ctr": 0.5,
            "cpc": 80,
            "conversions": 625,
            "cpa": 1600,
            "spent": 1000000
          }
        }
      ],
      "reports": [
        {
          "id": "report_clarins_weekly_01",
          "type": "weekly",
          "period_start": "2025-07-01",
          "period_end": "2025-07-07",
          "metrics": {
            "total_impressions": 500000,
            "total_clicks": 2500,
            "total_spent": 200000,
            "avg_ctr": 0.5,
            "avg_cpc": 80
          },
          "insights": [
            "CTR выше среднего на 15% для возрастной группы 25-34",
            "Рекомендация: увеличить ставки для этого сегмента"
          ]
        }
      ]
    }
  ]
}
```

**ЧТО НУЖНО ОТ ВАС:**
- Проверить конвертированные данные
- Дополнить недостающую информацию
- Утвердить final version

---

#### Phase 4: SQL seed scripts (Day 8-10)

**Я сделаю:**

```sql
-- seed/001_users.sql
INSERT INTO users (id, name, email, role) VALUES
  ('user_001', 'Иван Петров', 'ivan@agency.ru', 'project_manager'),
  ('user_002', 'Мария Иванова', 'maria@agency.ru', 'media_specialist'),
  ('user_003', 'Алексей Смирнов', 'alex@agency.ru', 'account_manager');

-- seed/002_clients.sql
INSERT INTO clients (id, name, industry) VALUES
  ('client_clarins', 'Clarins', 'Beauty & Cosmetics'),
  ('client_apelsin', 'Апельсин', 'Real Estate'),
  ('client_gpb', 'Газпромбанк', 'Finance');

-- seed/003_projects.sql
INSERT INTO projects (id, name, client_id, budget, status) VALUES
  ('proj_clarins_001', 'Clarins - Beauty School Campaign', 'client_clarins', 5000000, 'completed'),
  ('proj_apelsin_001', 'Апельсин - Запуск ЖК', 'client_apelsin', 15000000, 'in_progress'),
  ('proj_gpb_001', 'ГПБ - Финансовые услуги', 'client_gpb', 25000000, 'planning');

... и т.д. для всех таблиц
```

**Deliverable:**
- `seed/demo_projects.json` (3 projects, full data)
- `seed/*.sql` (SQL seed scripts для всех таблиц)
- `seed/README.md` (инструкции как использовать)

**Timeline:** Week 3-4 (1-2 недели)

---

### ✅ Критерии готовности Seed Data:

- [ ] 3 demo projects выбраны
- [ ] JSON files созданы для всех артефактов:
  - [ ] Briefs
  - [ ] Media Plans
  - [ ] Campaigns
  - [ ] Reports
- [ ] SQL seed scripts созданы
- [ ] Mock API responses подготовлены (MSW handlers)
- [ ] Documentation как использовать seed data
- [ ] Data validated (нет errors, consistent)

**Output:** `seed/` directory с JSON + SQL files

---

## 6. Onboarding Flow

**Status:** 20% → Target: 80%  
**Budget:** $5-8K  
**Timeline:** 2-3 weeks  
**Deliverable:** Onboarding wizard + Help center MVP

---

### 📊 Что нужно сделать:

#### Phase 1: Onboarding Wizard Design (Week 1)

**Шаги wizard:**

```yaml
Step 1: Welcome
Step 2: Profile Setup
Step 3: Import or Create Sample?
Step 4: Invite Team (optional)
Step 5: Quick Tour
Step 6: Ready!
```

**ЧТО НУЖНО ПРЕДОСТАВИТЬ МНЕ:**

Для каждого шага:

```yaml
═══════════════════════════════════════════
STEP 1: Welcome
═══════════════════════════════════════════

Screen title: "Добро пожаловать в MRM AI! 🎉"

Content:
  Heading: "Вы в 10 минутах от управления проектами в 10x быстрее"
  
  Value proposition bullets:
    • "Мигрируйте проекты из Excel за 10 минут"
    • "AI-ассистент экономит 280+ часов в месяц"
    • "Все инструменты в одном месте"
  
  Image: Hero illustration (что показать?)
  
  CTA: "Начать" (button)
  Link: "Уже были здесь? Войти"

═══════════════════════════════════════════
STEP 2: Profile Setup
═══════════════════════════════════════════

Screen title: "Расскажите о себе"

Form fields:
  - Name (pre-filled from signup)
  - Email (pre-filled, readonly)
  - Company name (required)
  - Your role (dropdown):
      • Project Manager
      • Media Specialist
      • Account Manager
      • Strategist
      • Analyst
      • Other
  - Team size (dropdown):
      • Solo (1 person)
      • Small (2-5)
      • Medium (6-15)
      • Large (16-50)
      • Enterprise (50+)

CTA: "Продолжить"
Progress: Step 2 of 6

═══════════════════════════════════════════
STEP 3: Import or Sample?
═══════════════════════════════════════════

Screen title: "Как хотите начать?"

Option A: Import existing project
  Heading: "Импортировать проекты"
  Description: "Загрузите Excel/CSV файлы, AI автоматически перенесет данные"
  Icon: Upload
  CTA: "Загрузить файлы"
  
Option B: Create sample project
  Heading: "Создать демо-проект"
  Description: "Мы создадим проект с примерами данных, чтобы вы могли сразу попробовать"
  Icon: Sparkles
  CTA: "Создать демо"
  
Option C: Start from scratch
  Heading: "Начать с нуля"
  Description: "Создам первый проект вручную"
  Icon: Plus
  CTA: "Создать проект"

... (и так для всех 6 steps)
```

**Action Items для вас:**

- [ ] Утвердить структуру wizard (6 шагов ok?)
- [ ] Предоставить content для каждого шага:
  - [ ] Headlines
  - [ ] Descriptions
  - [ ] Button text
  - [ ] Error messages
- [ ] Выбрать что показывать в "Quick Tour" (5 ключевых экранов)
- [ ] Определить что включить в demo project

---

#### Phase 2: Help Center MVP (Week 2)

**Структура:**

```yaml
Help Center:
  
  Section 1: Getting Started (5 articles)
    1.1. "Как создать первый проект"
    1.2. "Как создать бриф"
    1.3. "Как создать медиаплан"
    1.4. "Как пригласить команду"
    1.5. "Как подключить интеграции"
  
  Section 2: Features (10 articles)
    2.1. "Migration Assistant - Импорт из Excel"
    2.2. "AI Brief Generator"
    2.3. "Media Plan Analyzer"
    2.4. "Report Generator"
    ... etc
  
  Section 3: Integrations (5 articles)
    3.1. "Яндекс Директ"
    3.2. "VK Реклама"
    3.3. "Яндекс Метрика"
    ... etc
  
  Section 4: FAQ (10 questions)
    4.1. "Сколько стоит?"
    4.2. "Как работает trial?"
    4.3. "Безопасны ли мои данные?"
    ... etc
```

**ЧТО НУЖНО ПРЕДОСТАВИТЬ МНЕ:**

Для каждой article:

```yaml
Article: "Как создать первый проект"

Target audience: New users (first 10 minutes)

Content:
  Introduction (1-2 sentences):
    "Проект в MRM AI - это контейнер для всех артефактов 
     одной рекламной кампании: бриф, стратегия, медиаплан, 
     кампании и отчеты."
  
  Step-by-step:
    1. Нажмите "+ Новый проект" в дашборде
    2. Заполните базовую информацию:
       - Название проекта
       - Клиент
       - Бюджет
       - Даты
    3. Нажмите "Создать"
    4. Проект создан! Теперь добавьте первый артефакт.
  
  Screenshots:
    - Dashboard с кнопкой "Новый проект"
    - Форма создания проекта
    - Созданный проект
  
  Next steps:
    - "Создайте бриф" (link)
    - "Импортируйте данные из Excel" (link)
  
  Related:
    - "Как удалить проект"
    - "Как пригласить команду в проект"
```

**Action Items для вас:**

- [ ] Утвердить структуру Help Center
- [ ] Для TOP-5 articles предоставить:
  - [ ] Outline (план статьи)
  - [ ] Screenshots (если есть)
  - [ ] Часто задаваемые вопросы users
  
- [ ] Я напишу полные статьи на основе вашего input

---

#### Phase 3: Video Tutorials (Week 3)

**3 ключевых видео:**

```yaml
Video 1: "Product Overview" (2-3 min)
  Script:
    0:00 - Intro: "Welcome to MRM AI"
    0:10 - Problem: "Managing ad campaigns is chaos"
    0:30 - Solution: "MRM AI brings order"
    0:45 - Demo: Quick walkthrough of Dashboard
    1:30 - Key features highlight
    2:30 - CTA: "Start your trial"

Video 2: "Migration Assistant Demo" (2 min)
  Script:
    0:00 - "Import your projects in 10 minutes"
    0:15 - Step 1: Upload Excel
    0:30 - Step 2: AI auto-mapping
    0:45 - Step 3: Preview & confirm
    1:15 - Step 4: Import complete
    1:30 - Show result: All projects imported
    1:45 - CTA: "Try it now"

Video 3: "Creating Media Plan" (3 min)
  Script:
    0:00 - "Create media plan in 1 hour, not 1 week"
    0:20 - Step 1: Create new media plan
    0:40 - Step 2: Add channels
    1:00 - Step 3: AI optimization suggestions
    1:30 - Step 4: Review and approve
    2:00 - Step 5: Export and share
    2:30 - CTA: "Create your first plan"
```

**Action Items для вас:**

- [ ] Утвердить 3 видео (или предложить другие темы)
- [ ] Я могу написать полные scripts
- [ ] Вы делаете запись (или нанимаете видеографа)
- [ ] Я могу помочь с editing guidelines

**Budget video:**
- DIY (Loom): $0, 2-3 hours работы
- Professional: $1K-2K per video

**Deliverable:**
- Onboarding wizard (Figma mockups)
- Help center MVP (10-15 articles)
- 3 video tutorials (scripts + videos)

**Timeline:** Week 6-8 (2-3 недели, после MVP launch)

---

## 7. Test Cases & QA

**Status:** 0% → Target: 60%  
**Budget:** $3-5K  
**Timeline:** 2-3 weeks  
**Deliverable:** Test strategy + Test cases для MVP

---

### 📊 Что нужно сделать:

#### Phase 1: Test Strategy (Day 1-2)

**Документ:** `TEST_STRATEGY.md`

**Содержание:**

```yaml
1. Testing Levels:
   - Unit tests (target: 80% coverage)
   - Integration tests (API endpoints)
   - E2E tests (critical flows)
   - Performance tests (load)
   - Security tests (OWASP)

2. Tools:
   Frontend:
     - Unit: Vitest + Testing Library
     - E2E: Playwright
   
   Backend:
     - Unit: pytest (Python) or Jest (Node.js)
     - Integration: Supertest / httpx
     - Load: k6 or Artillery
   
3. Test Environments:
   - Local (dev machine)
   - CI (GitHub Actions)
   - Staging (pre-prod)
   - Production (smoke tests only)

4. Test Data:
   - Use seed data (from item #5)
   - Mock external APIs
   - Isolate test database

5. CI/CD Integration:
   - Run tests on every PR
   - Block merge if tests fail
   - Coverage reports

6. Bug Tracking:
   - Tool: Linear / GitHub Issues / Jira
   - Priority: P0 (critical) to P3 (nice to have)
   - Workflow: New → In Progress → Fixed → Verified → Closed
```

**Action Items для вас:**

- [ ] Утвердить testing tools
- [ ] Утвердить coverage target (80% ok?)
- [ ] Выбрать bug tracking tool

---

#### Phase 2: Critical User Flows (Day 3-5)

**5 критических flows для E2E тестов:**

```yaml
Flow 1: User Onboarding
  Steps:
    1. Visit landing page
    2. Click "Sign Up"
    3. Fill form (name, email, password)
    4. Verify email
    5. Complete profile setup
    6. Create first project
  
  Success criteria:
    - User registered
    - Email verified
    - Profile complete
    - First project created
    - Dashboard loads with project
  
  Test cases:
    TC-001: Happy path (all steps successful)
    TC-002: Email already exists
    TC-003: Weak password rejected
    TC-004: Email verification timeout
    TC-005: Network error handling

Flow 2: Brief Creation
  Steps:
    1. Navigate to project
    2. Click "New Brief"
    3. Fill mandatory fields
    4. Save draft
    5. AI suggestions applied
    6. Submit for approval
  
  Success criteria:
    - Brief created with ID
    - All data saved
    - Status = "pending_approval"
    - Notification sent to approver
  
  Test cases:
    TC-101: Create brief successfully
    TC-102: Missing required fields
    TC-103: AI suggestions timeout
    TC-104: Concurrent edits conflict
    TC-105: Auto-save works

... (для всех 5 flows)
```

**Action Items для вас:**

- [ ] Утвердить 5 критических flows
- [ ] Добавить flows если есть еще важные
- [ ] Для каждого flow указать:
  - [ ] Expected результат
  - [ ] Что может пойти не так
  - [ ] Edge cases

---

#### Phase 3: Test Cases Template (Day 6-10)

**Template для test case:**

```yaml
Test Case ID: TC-001
Title: User can sign up successfully

Priority: P0 (Critical)
Type: E2E
Feature: Authentication
Author: QA Engineer
Date: 2025-10-24

Preconditions:
  - User has valid email
  - User not registered yet

Test Steps:
  Step 1: Navigate to /signup
    Expected: Signup form displayed
    
  Step 2: Enter name "Иван Петров"
    Expected: Field accepts input
    
  Step 3: Enter email "ivan@test.ru"
    Expected: Field accepts input
    
  Step 4: Enter password "SecurePass123!"
    Expected: Field accepts input, shows strength
    
  Step 5: Click "Создать аккаунт"
    Expected: Loading spinner, then redirect to /verify-email
    
  Step 6: Check email inbox
    Expected: Verification email received
    
  Step 7: Click verification link
    Expected: Redirect to /dashboard
    
  Step 8: Check dashboard
    Expected: Welcome message, empty state

Expected Result:
  - User registered in database
  - Email sent
  - User redirected to dashboard
  - No errors in console

Actual Result:
  (filled during test execution)

Status: Not Run | Pass | Fail

Notes:
  - Test with different email providers (Gmail, Yandex, etc.)
  - Test with different password strengths
  - Test with already registered email
```

**Action Items для вас:**

- [ ] Review test case template
- [ ] Я создам test cases для TOP-20 scenarios
- [ ] Вы review и approve

**Deliverable:**
- `TEST_STRATEGY.md`
- `test-cases/` folder с 50-100 test cases
- `ci-cd-pipeline.yml` (GitHub Actions config)

**Timeline:** Week 8-10 (2-3 недели, можно делать после MVP launch)

---

# 📅 ОБЩИЙ TIMELINE

## Week 1-2: FOUNDATION (CRITICAL)

**Параллельно:**

```yaml
Track 1: Design (Designer full-time)
  Day 1: Купить Untitled UI ($249)
  Day 2-3: Брендинг (colors, fonts)
  Day 4-7: Component library (20 components)
  Day 8-14: Mockups Tier 1 (5 экранов)
  
Track 2: Product (PM/Founder half-time)
  Day 1: Extract pain points из интервью
  Day 2-3: Schedule 5 user interviews
  Day 4-10: Conduct interviews
  Day 11-14: RICE prioritization
  
Track 3: Backend (Backend Lead half-time)
  Day 8-14: Start API spec (структура)
```

**Deliverables Week 1-2:**
- ✅ Design system адаптирован
- ✅ Первые 5 mockups готовы
- ✅ 5 user interviews проведены
- ✅ Pain points validated
- ✅ API spec outline

---

## Week 3-4: PRE-DEVELOPMENT

**Параллельно:**

```yaml
Track 1: Design (Designer full-time)
  Day 15-21: Mockups Tier 2 (5 экранов)
  Day 22-28: Interactive prototype
  
Track 2: Product (PM half-time)
  Day 15-18: Finalize MVP scope
  Day 19-28: User stories + acceptance criteria
  
Track 3: Backend (Developer full-time)
  Day 15-21: Complete API spec
  Day 22-28: Convert Excel → JSON (seed data)
  
Track 4: QA (QA Engineer starts)
  Day 22-28: Test strategy document
```

**Deliverables Week 3-4:**
- ✅ Все 10 mockups готовы
- ✅ Interactive prototype
- ✅ MVP scope locked
- ✅ API spec v0.1 complete
- ✅ 3 demo projects в JSON
- ✅ Test strategy approved

---

## Week 5-6: SPRINT 1 BEGINS 🚀

**NOW можем начать разработку:**

```yaml
Sprint 1 Goals:
  - Infrastructure setup
  - Auth & Users
  - Projects CRUD
  - Dashboard MVP
  
Team:
  - 2 Backend devs (full-time)
  - 2 Frontend devs (full-time)
  - 1 Designer (support, 50%)
  - 1 PM (full-time)
  - 1 QA (part-time)
```

---

## Week 7-12: SPRINTS 2-4 (MVP Development)

**Onboarding & QA в фоне:**

```yaml
Week 7-8:
  - Onboarding wizard design & dev
  - Help center MVP (first 5 articles)
  
Week 9-10:
  - Test cases creation
  - Video tutorials scripts
  
Week 11-12:
  - Video recording & editing
  - Final QA before launch
```

---

# ✅ ACTIONABLE CHECKLIST

## Сегодня (Day 1):

**Вам нужно:**

- [ ] Утвердить budget $9-13K immediate
- [ ] Нанять/контракт UI designer (3-4 weeks full-time)
- [ ] Купить Untitled UI license ($249)
- [ ] Прислать мне:
  - [ ] Logo (если есть)
  - [ ] 3-5 референсов дизайна (screenshots)
  - [ ] Предпочтения по цветам/стилю
- [ ] Найти 5 кандидатов для user interviews
- [ ] Дать мне доступ к:
  - [ ] 12 Excel files
  - [ ] 4 CSV files
  - [ ] 2 PDF interview files

---

## Week 1 (Day 2-7):

**Вам нужно:**

- [ ] Заполнить mockups specification для 10 экранов
  - [ ] Я подготовлю template
  - [ ] Вы заполните content, data, flows
  
- [ ] Провести 5 user interviews
  - [ ] Я подготовлю script
  - [ ] Вы проведете или я помогу
  - [ ] Законспектировать ответы
  
- [ ] Утвердить адаптированную design system
  - [ ] Designer покажет первую версию
  - [ ] Вы approve colors, fonts, style

---

## Week 2 (Day 8-14):

**Вам нужно:**

- [ ] Review первых 5 mockups
- [ ] Дать feedback по дизайну
- [ ] Prioritize features по RICE (вместе со мной)
- [ ] Lock MVP scope (final decision)

---

## Week 3-4 (Day 15-28):

**Вам нужно:**

- [ ] Review оставшихся 5 mockups
- [ ] Approve interactive prototype
- [ ] Review API spec
- [ ] Review seed data (demo projects)
- [ ] Approve test strategy

---

## Week 5: GO/NO-GO DECISION

**Критерии для GO:**

- [ ] Design system: 100% ✅
- [ ] Mockups: 100% (10/10 screens) ✅
- [ ] User stories: 100% validated ✅
- [ ] API spec: 80%+ ✅
- [ ] Seed data: 60%+ ✅
- [ ] Team hired: 100% ✅

**Если все ✅ → SPRINT 1 STARTS! 🚀**

---

# 📁 ФАЙЛЫ КОТОРЫЕ Я СОЗДАМ

```
/pre-development
  /design
    - DESIGN_SYSTEM_ADAPTATION_GUIDE.md
    - BRAND_GUIDELINES.md
    - COMPONENT_LIBRARY_SPEC.md
    
  /mockups
    - MOCKUPS_SPECIFICATION_TEMPLATE.md (для вас)
    - MOCKUPS_REVIEW_CHECKLIST.md
    
  /validation
    - USER_INTERVIEW_SCRIPT.md
    - PAIN_POINTS_EXTRACTION_TEMPLATE.md
    - RICE_PRIORITIZATION_SPREADSHEET.xlsx
    - MVP_SCOPE_DEFINITION.md
    
  /api
    - openapi.yaml (skeleton)
    - API_SPEC_COMPLETION_GUIDE.md
    
  /data
    - SEED_DATA_STRUCTURE.md
    - demo_projects.json (template)
    - excel_to_json_mapping.md
    
  /onboarding
    - ONBOARDING_WIZARD_SPEC.md
    - HELP_CENTER_STRUCTURE.md
    - VIDEO_SCRIPTS.md
    
  /qa
    - TEST_STRATEGY.md
    - TEST_CASE_TEMPLATE.md
    - CRITICAL_FLOWS.md
```

---

# 🎯 SUMMARY

**Чтобы начать разработку, вам нужно предоставить:**

### 🔴 БЛОКЕРЫ (Week 1-2):

1. **Design:**
   - Купить Untitled UI ($249)
   - Логотип (если есть)
   - 3-5 референсов дизайна
   - Утвердить цвета

2. **Mockups:**
   - Заполнить specification для 10 экранов
   - Реальные данные для примеров
   - Review & feedback

3. **Validation:**
   - Найти 5 people для интервью
   - Провести интервью (я помогу со script)
   - Prioritize features

### 🟠 ВАЖНЫЕ (Week 3-4):

4. **API Spec:**
   - Review endpoint groups
   - Примеры request/response для TOP-10

5. **Seed Data:**
   - Утвердить 3 demo projects
   - Дать доступ ко всем Excel/CSV
   - Review converted JSON

6-7. **Onboarding & QA:**
   - Можно делать позже (Week 7-10)

---

**BUDGET:** $9-13K immediate  
**TIMELINE:** 4-6 weeks до Sprint 1  
**ROI:** Экономия $20-30K времени разработки

---

**Версия:** 1.0  
**Дата:** 24 октября 2025  
**Автор:** AI Development Team  
**Status:** 📋 Ready to Execute

---

## 📞 NEXT STEPS

1. **Вы:** Review этот план
2. **Вы:** Approve budget
3. **Вы:** Hire designer
4. **Я:** Создам все templates из списка выше
5. **Вы:** Начнете заполнять templates
6. **Мы:** Weekly sync для review progress

**Let's go! 🚀**

