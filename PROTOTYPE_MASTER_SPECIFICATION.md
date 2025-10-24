---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: prototype_specification
title: Техническое задание на прототипирование веб-приложения MRM AI Platform
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: PROTOTYPE_MASTER_SPECIFICATION.md
effective_date: 2025-10-24
visibility: internal
security_level: high
tags: [prototype, ui, ux, specification, design]
---

# 🎨 Техническое задание на прототипирование веб-приложения MRM AI Platform

**Дата создания:** 24 октября 2025  
**Версия:** 1.0  
**Статус:** ✅ Готово к разработке

---

## 📋 ОГЛАВЛЕНИЕ

1. [Обзор проекта](#обзор-проекта)
2. [Общая архитектура интерфейса](#общая-архитектура-интерфейса)
3. [Дизайн-система](#дизайн-система)
4. [Структура экранов](#структура-экранов)
5. [Навигация и информационная архитектура](#навигация-и-информационная-архитектура)
6. [AI-ассистент](#ai-ассистент)
7. [Интерактивные элементы](#интерактивные-элементы)
8. [Адаптивность](#адаптивность)
9. [Требования к прототипам](#требования-к-прототипам)
10. [Детализированные ТЗ по артефактам](#детализированные-тз-по-артефактам)

---

## 🎯 ОБЗОР ПРОЕКТА

### Назначение

MRM AI Platform — система управления рекламными проектами с интеграцией AI-ассистентов для автоматизации работы рекламных агентств.

### Целевая аудитория

- **Рекламные агентства:** 5-50 человек
- **Роли:** Account Manager, Strategist, Specialist, Analyst, Project Manager, Creative, Client
- **География:** Россия и СНГ
- **Рынок:** Digital-агентства, Performance-агентства, Full-service агентства

### Ключевые особенности

✅ **AI-First подход** — AI-ассистенты на каждом экране  
✅ **Структурированные данные** — 12 типов артефактов  
✅ **Процессный подход** — 8 процессов жизненного цикла  
✅ **Интеграции** — Яндекс Директ, VK Реклама, MyTarget, Telegram Ads  
✅ **Аналитика** — Real-time dashboard, автоматические отчеты

---

## 🏗️ ОБЩАЯ АРХИТЕКТУРА ИНТЕРФЕЙСА

### Базовая структура экрана

```
┌─────────────────────────────────────────────────────────────────────┐
│  HEADER (высота: 64px)                                              │
│  [Logo] [Навигация] [Поиск] [Нотификации] [Профиль]                │
├────────────┬────────────────────────────────────┬────────────────────┤
│            │                                    │                    │
│  ЛЕВАЯ     │  ОСНОВНОЙ КОНТЕНТ                 │  ПРАВАЯ ПАНЕЛЬ     │
│  ПАНЕЛЬ    │  (Артефакт / Dashboard)           │  (AI-ассистент)    │
│            │                                    │                    │
│  Навигация │  - Заголовок артефакта            │  - AI Chat         │
│  по        │  - Toolbar                        │  - Быстрые         │
│  артефактам│  - Данные артефакта               │    действия        │
│            │  - Визуализации                   │  - Контекстные     │
│  280px     │  - Формы редактирования           │    подсказки       │
│  ширина    │                                    │                    │
│            │  Адаптивная ширина                │  360px ширина      │
│            │  (min: 640px)                     │  (сворачивается)   │
│            │                                    │                    │
│            │                                    │                    │
└────────────┴────────────────────────────────────┴────────────────────┘
```

### Принципы разделения

#### 1. Левая панель (280px)
**Назначение:** Навигация и быстрый доступ к артефактам проекта

**Содержимое:**
- Название проекта и клиента
- Статус проекта (визуальный индикатор)
- Список артефактов с иконками и статусами
- Фильтры и поиск по артефактам
- Быстрые ссылки на процессы
- Сворачивается до 48px (только иконки)

**Поведение:**
- Фиксированная позиция
- Активный артефакт подсвечен
- Hover эффекты на элементах
- Badge с количеством незавершенных задач

#### 2. Основной контент (адаптивная ширина)
**Назначение:** Отображение и редактирование артефакта

**Содержимое:**
- Breadcrumbs навигация
- Заголовок артефакта с метаданными
- Toolbar с действиями
- Основное содержимое (формы, таблицы, визуализации)
- История изменений (collapsed)

**Особенности:**
- Вертикальный скролл
- Секционная структура
- Прогрессивное раскрытие информации
- Автосохранение каждые 3 секунды

#### 3. Правая панель — AI-ассистент (360px)
**Назначение:** Интеллектуальная помощь в работе с артефактом

**Содержимое:**
- Chat интерфейс с AI
- Контекстные подсказки
- Быстрые действия (shortcuts)
- Предложения по оптимизации
- Связанные документы

**Поведение:**
- Фиксированная позиция
- Сворачивается кнопкой (остается только индикатор)
- Адаптируется под роль пользователя
- Хранит историю диалога в контексте артефакта

---

## 🎨 ДИЗАЙН-СИСТЕМА

### Цветовая палитра

#### Основные цвета
```css
/* Primary - Основной бренд-цвет */
--color-primary-50:  #E3F2FD;
--color-primary-100: #BBDEFB;
--color-primary-200: #90CAF9;
--color-primary-300: #64B5F6;
--color-primary-400: #42A5F5;
--color-primary-500: #2196F3;  /* Главный primary */
--color-primary-600: #1E88E5;
--color-primary-700: #1976D2;
--color-primary-800: #1565C0;
--color-primary-900: #0D47A1;

/* Success - Успешные действия */
--color-success-50:  #E8F5E9;
--color-success-500: #4CAF50;
--color-success-700: #388E3C;

/* Warning - Предупреждения */
--color-warning-50:  #FFF3E0;
--color-warning-500: #FF9800;
--color-warning-700: #F57C00;

/* Danger - Ошибки и критичные действия */
--color-danger-50:  #FFEBEE;
--color-danger-500: #F44336;
--color-danger-700: #D32F2F;

/* Info - Информационные блоки */
--color-info-50:  #E1F5FE;
--color-info-500: #03A9F4;
--color-info-700: #0288D1;
```

#### Нейтральные цвета
```css
/* Grayscale */
--color-gray-50:  #FAFAFA;
--color-gray-100: #F5F5F5;
--color-gray-200: #EEEEEE;
--color-gray-300: #E0E0E0;
--color-gray-400: #BDBDBD;
--color-gray-500: #9E9E9E;
--color-gray-600: #757575;
--color-gray-700: #616161;
--color-gray-800: #424242;
--color-gray-900: #212121;

/* Text colors */
--color-text-primary:   #212121;
--color-text-secondary: #757575;
--color-text-disabled:  #BDBDBD;
--color-text-hint:      #9E9E9E;

/* Background colors */
--color-bg-primary:   #FFFFFF;
--color-bg-secondary: #F5F5F5;
--color-bg-tertiary:  #FAFAFA;
--color-bg-overlay:   rgba(0, 0, 0, 0.5);

/* Border colors */
--color-border-light: #E0E0E0;
--color-border-dark:  #BDBDBD;
```

#### Семантические цвета по статусам
```css
/* Статусы артефактов */
--status-draft:      #9E9E9E;  /* Черновик */
--status-review:     #FF9800;  /* На проверке */
--status-approved:   #4CAF50;  /* Утвержден */
--status-rejected:   #F44336;  /* Отклонен */
--status-archived:   #757575;  /* Архив */

/* Статусы задач */
--task-todo:         #BDBDBD;  /* К выполнению */
--task-progress:     #2196F3;  /* В работе */
--task-review:       #FF9800;  /* На проверке */
--task-done:         #4CAF50;  /* Выполнено */
--task-blocked:      #F44336;  /* Заблокировано */
```

### Типографика

#### Шрифты
```css
/* Primary font family */
--font-family-primary: 'Inter', -apple-system, BlinkMacSystemFont, 
                       'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 
                       'Cantarell', 'Fira Sans', 'Droid Sans', 
                       'Helvetica Neue', sans-serif;

/* Monospace font (для кода, JSON) */
--font-family-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', 
                    'Monaco', 'Courier New', monospace;

/* Numbers font (для метрик, дашбордов) */
--font-family-numbers: 'Inter', tabular-nums;
```

#### Размеры шрифтов
```css
/* Font sizes */
--font-size-xs:   12px;  /* 0.75rem */
--font-size-sm:   14px;  /* 0.875rem */
--font-size-base: 16px;  /* 1rem */
--font-size-lg:   18px;  /* 1.125rem */
--font-size-xl:   20px;  /* 1.25rem */
--font-size-2xl:  24px;  /* 1.5rem */
--font-size-3xl:  30px;  /* 1.875rem */
--font-size-4xl:  36px;  /* 2.25rem */

/* Line heights */
--line-height-tight:  1.25;
--line-height-normal: 1.5;
--line-height-relaxed: 1.75;

/* Font weights */
--font-weight-normal:   400;
--font-weight-medium:   500;
--font-weight-semibold: 600;
--font-weight-bold:     700;
```

#### Стили заголовков
```css
/* H1 - Главный заголовок страницы */
h1, .heading-1 {
  font-size: 36px;
  font-weight: 700;
  line-height: 1.25;
  color: var(--color-text-primary);
  letter-spacing: -0.02em;
}

/* H2 - Заголовок секции */
h2, .heading-2 {
  font-size: 30px;
  font-weight: 600;
  line-height: 1.25;
  color: var(--color-text-primary);
  letter-spacing: -0.01em;
}

/* H3 - Заголовок подсекции */
h3, .heading-3 {
  font-size: 24px;
  font-weight: 600;
  line-height: 1.33;
  color: var(--color-text-primary);
}

/* H4 - Заголовок блока */
h4, .heading-4 {
  font-size: 20px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--color-text-primary);
}

/* H5 - Подзаголовок */
h5, .heading-5 {
  font-size: 18px;
  font-weight: 600;
  line-height: 1.44;
  color: var(--color-text-secondary);
}

/* H6 - Мелкий заголовок */
h6, .heading-6 {
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

### Отступы и интервалы

```css
/* Spacing scale (8px base) */
--spacing-0:  0px;
--spacing-1:  4px;   /* 0.25rem */
--spacing-2:  8px;   /* 0.5rem */
--spacing-3:  12px;  /* 0.75rem */
--spacing-4:  16px;  /* 1rem */
--spacing-5:  20px;  /* 1.25rem */
--spacing-6:  24px;  /* 1.5rem */
--spacing-8:  32px;  /* 2rem */
--spacing-10: 40px;  /* 2.5rem */
--spacing-12: 48px;  /* 3rem */
--spacing-16: 64px;  /* 4rem */
--spacing-20: 80px;  /* 5rem */

/* Paddings для контейнеров */
--padding-xs: var(--spacing-2);
--padding-sm: var(--spacing-3);
--padding-md: var(--spacing-4);
--padding-lg: var(--spacing-6);
--padding-xl: var(--spacing-8);

/* Margins */
--margin-xs: var(--spacing-2);
--margin-sm: var(--spacing-3);
--margin-md: var(--spacing-4);
--margin-lg: var(--spacing-6);
--margin-xl: var(--spacing-8);
```

### Скругления углов

```css
/* Border radius */
--radius-none: 0px;
--radius-sm:   4px;   /* Мелкие элементы (chips, badges) */
--radius-md:   8px;   /* Кнопки, inputs */
--radius-lg:   12px;  /* Карточки, модальные окна */
--radius-xl:   16px;  /* Крупные блоки */
--radius-full: 9999px; /* Круглые элементы */
```

### Тени

```css
/* Shadows */
--shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1), 
             0 1px 2px rgba(0, 0, 0, 0.06);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07), 
             0 2px 4px rgba(0, 0, 0, 0.05);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1), 
             0 4px 6px rgba(0, 0, 0, 0.05);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1), 
             0 10px 10px rgba(0, 0, 0, 0.04);
--shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.15);

/* Inner shadow */
--shadow-inner: inset 0 2px 4px rgba(0, 0, 0, 0.06);

/* Focus shadow */
--shadow-focus: 0 0 0 3px rgba(33, 150, 243, 0.3);
```

### Z-index слои

```css
/* Z-index layers */
--z-base:      0;
--z-dropdown:  1000;
--z-sticky:    1100;
--z-fixed:     1200;
--z-modal-backdrop: 1300;
--z-modal:     1400;
--z-popover:   1500;
--z-tooltip:   1600;
--z-notification: 1700;
```

### Анимации

```css
/* Transitions */
--transition-fast:   150ms ease-in-out;
--transition-base:   200ms ease-in-out;
--transition-slow:   300ms ease-in-out;
--transition-slower: 500ms ease-in-out;

/* Easing functions */
--ease-in:     cubic-bezier(0.4, 0, 1, 1);
--ease-out:    cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

---

## 🧩 КОМПОНЕНТЫ ДИЗАЙН-СИСТЕМЫ

### Кнопки

#### Варианты кнопок
```jsx
// Primary - основное действие
<Button variant="primary" size="md">
  Создать проект
</Button>

// Secondary - второстепенное действие
<Button variant="secondary" size="md">
  Отменить
</Button>

// Outline - контурная кнопка
<Button variant="outline" size="md">
  Экспорт
</Button>

// Ghost - прозрачная кнопка
<Button variant="ghost" size="md">
  <Icon name="edit" />
  Редактировать
</Button>

// Danger - опасное действие
<Button variant="danger" size="md">
  Удалить проект
</Button>

// Link - кнопка-ссылка
<Button variant="link" size="md">
  Подробнее
</Button>
```

#### Размеры кнопок
```css
/* Small - 32px height */
.button-sm {
  height: 32px;
  padding: 0 12px;
  font-size: 14px;
}

/* Medium - 40px height (default) */
.button-md {
  height: 40px;
  padding: 0 16px;
  font-size: 16px;
}

/* Large - 48px height */
.button-lg {
  height: 48px;
  padding: 0 24px;
  font-size: 18px;
}
```

#### Состояния кнопок
- **Default** — обычное состояние
- **Hover** — при наведении (изменение цвета)
- **Active** — при нажатии (немного темнее)
- **Disabled** — неактивная (opacity: 0.5, cursor: not-allowed)
- **Loading** — загрузка (спиннер + disabled)

### Поля ввода (Inputs)

```jsx
// Text input
<Input 
  type="text"
  placeholder="Введите название"
  label="Название проекта"
  required
  error="Поле обязательно для заполнения"
  helperText="Минимум 3 символа"
/>

// Number input
<Input 
  type="number"
  placeholder="1000000"
  label="Бюджет, ₽"
  min={0}
  step={1000}
/>

// Email input
<Input 
  type="email"
  placeholder="ivan@example.com"
  label="Email"
  validation="email"
/>

// Date picker
<DatePicker 
  label="Дата начала"
  value={date}
  minDate={today}
  onChange={handleDateChange}
/>

// Textarea
<Textarea 
  label="Описание проекта"
  placeholder="Подробно опишите задачу..."
  rows={5}
  maxLength={2000}
  showCounter
/>
```

### Селекты и выпадающие списки

```jsx
// Select dropdown
<Select 
  label="Отрасль"
  options={industries}
  value={selected}
  onChange={handleChange}
  searchable
  placeholder="Выберите отрасль"
/>

// Multi-select
<Select 
  label="Каналы"
  options={channels}
  value={selectedChannels}
  onChange={handleChange}
  multiple
  placeholder="Выберите каналы"
/>

// Autocomplete with search
<Autocomplete 
  label="Город"
  options={cities}
  value={city}
  onChange={handleChange}
  onSearch={handleSearch}
  placeholder="Начните вводить..."
/>
```

### Чекбоксы и радио-кнопки

```jsx
// Checkbox
<Checkbox 
  label="Согласен с условиями"
  checked={agreed}
  onChange={handleChange}
/>

// Checkbox group
<CheckboxGroup 
  label="Цели кампании"
  options={goals}
  value={selectedGoals}
  onChange={handleChange}
  orientation="vertical"
/>

// Radio buttons
<RadioGroup 
  label="Гибкость бюджета"
  options={flexibilityOptions}
  value={flexibility}
  onChange={handleChange}
  orientation="horizontal"
/>
```

### Карточки (Cards)

```jsx
// Basic card
<Card>
  <CardHeader>
    <Title>Заголовок карточки</Title>
    <Subtitle>Подзаголовок</Subtitle>
  </CardHeader>
  <CardBody>
    Содержимое карточки
  </CardBody>
  <CardFooter>
    <Button>Действие</Button>
  </CardFooter>
</Card>

// Clickable card
<Card hoverable clickable onClick={handleClick}>
  <CardContent>
    <Icon name="project" />
    <Title>Проект #123</Title>
    <Meta>Создан 24.10.2025</Meta>
  </CardContent>
</Card>

// Card with badge
<Card>
  <Badge status="success">Активен</Badge>
  <CardContent>
    ...
  </CardContent>
</Card>
```

### Модальные окна (Modals)

```jsx
<Modal 
  open={isOpen}
  onClose={handleClose}
  size="md"
  title="Создание проекта"
  footer={
    <>
      <Button variant="secondary" onClick={handleClose}>
        Отменить
      </Button>
      <Button variant="primary" onClick={handleSubmit}>
        Создать
      </Button>
    </>
  }
>
  <ModalContent>
    {/* Form fields */}
  </ModalContent>
</Modal>
```

### Алерты и уведомления

```jsx
// Alert box
<Alert 
  variant="info"
  title="Информация"
  closable
  onClose={handleClose}
>
  Проект успешно создан
</Alert>

// Toast notification
<Toast 
  variant="success"
  position="top-right"
  duration={3000}
  onClose={handleClose}
>
  Изменения сохранены
</Toast>

// Inline message
<Message variant="warning">
  <Icon name="warning" />
  Обратите внимание на этот момент
</Message>
```

### Таблицы

```jsx
<Table
  columns={columns}
  data={data}
  sortable
  filterable
  pagination={{
    pageSize: 20,
    total: 100
  }}
  onRowClick={handleRowClick}
  selectable
  selectedRows={selected}
  onSelectionChange={handleSelection}
/>
```

### Табы

```jsx
<Tabs defaultValue="general">
  <TabList>
    <Tab value="general">Общее</Tab>
    <Tab value="budget">Бюджет</Tab>
    <Tab value="timeline">Сроки</Tab>
  </TabList>
  
  <TabPanel value="general">
    {/* General content */}
  </TabPanel>
  
  <TabPanel value="budget">
    {/* Budget content */}
  </TabPanel>
  
  <TabPanel value="timeline">
    {/* Timeline content */}
  </TabPanel>
</Tabs>
```

### Badges и теги

```jsx
// Status badge
<Badge variant="success">Утвержден</Badge>
<Badge variant="warning">На проверке</Badge>
<Badge variant="danger">Отклонен</Badge>

// Count badge
<Badge count={5} />

// Tag (removable)
<Tag 
  label="JavaScript"
  removable
  onRemove={handleRemove}
/>
```

### Loader и Progress

```jsx
// Spinner
<Spinner size="md" />

// Progress bar
<ProgressBar 
  value={60}
  max={100}
  label="60% завершено"
  variant="success"
/>

// Skeleton loader
<Skeleton count={3} />
<Skeleton width={200} height={20} />
```

---

## 📐 СТРУКТУРА ЭКРАНОВ

### 1. Dashboard (Главная страница)

**URL:** `/dashboard`

**Назначение:** Обзор всех проектов, метрики, недавние действия

**Левая панель:**
- Навигация по разделам:
  - 📊 Dashboard
  - 📁 Проекты
  - 📈 Аналитика
  - 👥 Команда
  - ⚙️ Настройки

**Основной контент:**
- Статистические карточки (KPI)
- Список активных проектов
- График загрузки команды
- Недавние действия
- Уведомления и задачи

**Правая панель (AI-ассистент):**
- Приветствие пользователя
- Быстрые действия (создать проект, бриф)
- Рекомендации на основе аналитики
- Помощь и подсказки

---

### 2. Список проектов

**URL:** `/projects`

**Левая панель:**
- Фильтры:
  - По статусу
  - По клиенту
  - По дате
  - По PM
- Сортировка
- Сохраненные фильтры

**Основной контент:**
- Таблица/карточки проектов:
  - Название
  - Клиент
  - Статус
  - Бюджет
  - Дедлайн
  - PM
  - Прогресс
- Пагинация
- Bulk actions

**Правая панель:**
- Создать новый проект
- Импорт проектов
- Статистика по выборке
- AI рекомендации

---

### 3. Карточка проекта / Паспорт проекта

**URL:** `/project/:id`

**Детальное ТЗ:** [02_ARTIFACTS/Project_Passport/Prototype_Specification.md](./02_ARTIFACTS/Project_Passport/Prototype_Specification.md)

---

### 4. Бриф клиента

**URL:** `/project/:id/brief`

**Детальное ТЗ:** [02_ARTIFACTS/Brief/Prototype_Specification.md](./02_ARTIFACTS/Brief/Prototype_Specification.md)

---

### 5. Стратегический документ

**URL:** `/project/:id/strategy`

**Детальное ТЗ:** [02_ARTIFACTS/Strategy_Document/Prototype_Specification.md](./02_ARTIFACTS/Strategy_Document/Prototype_Specification.md)

---

### 6. Медиаплан

**URL:** `/project/:id/media-plan`

**Детальное ТЗ:** [02_ARTIFACTS/Media_Plan/Prototype_Specification.md](./02_ARTIFACTS/Media_Plan/Prototype_Specification.md)

---

### 7. Коммерческое предложение

**URL:** `/project/:id/commercial-proposal`

**Детальное ТЗ:** [02_ARTIFACTS/Commercial_Proposal/Prototype_Specification.md](./02_ARTIFACTS/Commercial_Proposal/Prototype_Specification.md)

---

### 8. Техническое задание

**URL:** `/project/:id/technical-spec`

**Детальное ТЗ:** [02_ARTIFACTS/Technical_Specification/Prototype_Specification.md](./02_ARTIFACTS/Technical_Specification/Prototype_Specification.md)

---

### 9. Отчет по кампании

**URL:** `/project/:id/campaign-report`

**Детальное ТЗ:** [02_ARTIFACTS/Campaign_Report/Prototype_Specification.md](./02_ARTIFACTS/Campaign_Report/Prototype_Specification.md)

---

### 10. Задачи команды

**URL:** `/project/:id/tasks`

**Детальное ТЗ:** [02_ARTIFACTS/Tasks/Prototype_Specification.md](./02_ARTIFACTS/Tasks/Prototype_Specification.md)

---

## 🧭 НАВИГАЦИЯ И ИНФОРМАЦИОННАЯ АРХИТЕКТУРА

### Глобальная навигация (Header)

```
┌─────────────────────────────────────────────────────────────────────┐
│ [Logo MRM AI]  [Dashboard] [Проекты] [Аналитика]  [🔍 Поиск]       │
│                                           [🔔3] [👤 Иван И.] [⚙️]   │
└─────────────────────────────────────────────────────────────────────┘
```

**Элементы:**
1. **Logo** — клик возвращает на dashboard
2. **Навигация** — основные разделы
3. **Поиск** — глобальный поиск по проектам и артефактам
4. **Нотификации** — badge с количеством
5. **Профиль** — dropdown с настройками
6. **Настройки** — быстрый доступ

### Breadcrumbs (Хлебные крошки)

```
Проекты / ЖК Солнечный / Медиаплан
```

**Принципы:**
- Всегда показываем путь
- Кликабельные элементы
- Текущая страница не кликабельна
- Сокращение длинных названий

### Левая панель проекта

**Структура:**
```
┌───────────────────────┐
│ [←] ЖК Солнечный     │
│ 🟢 Активен           │
├───────────────────────┤
│ 📊 Паспорт проекта   │
│ 📋 Бриф              │
│ 💼 Ком. предложение  │
│ 📈 Стратегия         │
│ 📊 Медиаплан         │
│ 📝 Техническое ТЗ    │
│ 📑 Отчет             │
│ ✅ Задачи       [12] │
├───────────────────────┤
│ 👥 Команда           │
│ 💬 Коммуникация      │
│ 📁 Файлы             │
│ ⚙️ Настройки         │
└───────────────────────┘
```

**Особенности:**
- Активный элемент подсвечен
- Badge с количеством задач
- Статусы артефактов (цветные точки)
- Сворачивание панели

---

## 🤖 AI-АССИСТЕНТ (Правая панель)

### Общая структура

```
┌────────────────────────┐
│ 🤖 AI Ассистент       │
│                  [─][×]│
├────────────────────────┤
│                        │
│ [Chat history]         │
│                        │
│ AI: Чем могу помочь?   │
│                        │
│ User: Создай медиаплан │
│                        │
│ AI: Конечно! Для       │
│ создания медиаплана... │
│                        │
│ [Suggested actions]    │
│ • Добавить площадку    │
│ • Оптимизировать       │
│ • Экспорт в Excel      │
│                        │
├────────────────────────┤
│ [Введите сообщение...] │
│                    [→] │
└────────────────────────┘
```

### Функции AI-ассистента

#### 1. Контекстная помощь
AI знает:
- Текущий артефакт
- Роль пользователя
- Историю проекта
- Связанные данные

**Примеры:**
```
🤖 AI (на экране Брифа):
"Я вижу, что целевая аудитория - семьи 35-50 лет.
Рекомендую добавить охватные кампании в VK и Telegram."

🤖 AI (на экране Медиаплана):
"Бюджет на Яндекс Директ составляет 60%. Это выше среднего
для недвижимости (обычно 45%). Хотите пересмотреть распределение?"

🤖 AI (на экране Отчета):
"CTR упал на 15% за последнюю неделю. Проверьте креативы
и настройки таргетинга."
```

#### 2. Быстрые действия

**Для каждого артефакта свои quick actions:**

**Бриф:**
- ✨ Автозаполнить из CRM
- 📊 Предложить каналы
- 💰 Рассчитать бюджет
- 📝 Сгенерировать описание ЦА

**Медиаплан:**
- ➕ Добавить площадку из ландшафта
- 🔄 Оптимизировать распределение
- 📊 Рассчитать reach/frequency
- 📤 Экспорт в Excel

**Отчет:**
- 📈 Сгенерировать инсайты
- 🔍 Найти аномалии
- 📊 Обновить графики
- 📧 Отправить клиенту

#### 3. Интеллектуальные рекомендации

**На основе:**
- Данных артефакта
- Исторических проектов
- Бенчмарков индустрии
- Медиаландшафта

**Типы рекомендаций:**
```
💡 Совет:
"Для вашей ЦА эффективен формат Stories в VK.
Средний CTR: 2.5%, что в 2 раза выше, чем у баннеров."

⚠️ Предупреждение:
"Бюджет на программатик превышает рекомендованный для
этой географии. Возможен перерасход без результата."

✅ Валидация:
"Все обязательные поля заполнены. Бриф готов к отправке."

🎯 Оптимизация:
"Перераспределив 10% бюджета с YouTube на Яндекс Директ,
можете получить +500 лидов при том же CPL."
```

#### 4. Генерация контента

**Что может сгенерировать AI:**
- Текст стратегии
- Описание ЦА
- KPI и метрики
- Креативные концепции
- Медиаплан (черновик)
- Отчеты и инсайты
- Технические задания

**Workflow генерации:**
```
User: "Сгенерируй стратегию на основе брифа"
  ↓
AI: "Анализирую бриф... Готово!

Стратегия для ЖК Солнечный:

1. Positioning: Премиум-комфорт в центре Москвы
2. Key Message: "Ваш статус заслуживает центра"
3. Channels:
   - Яндекс Директ (40%) - основной драйвер
   - Программатик (25%) - охват
   - VK Реклама (20%) - ретаргетинг
   - Telegram Ads (15%) - премиум аудитория

[Применить] [Редактировать] [Отменить]"
```

#### 5. Диалоговый интерфейс

**Типы сообщений:**

**От AI:**
- Информационное
- Вопрос (требует ответа)
- Предложение действия (кнопки)
- Генерация контента (карточка)

**От пользователя:**
- Текстовый запрос
- Команда (слэш-команды)
- Файл (drag & drop)

**Примеры диалога:**
```
User: "/add площадка Яндекс"

AI: "Добавляю площадку Яндекс Директ.
    Какой формат: Поиск, РСЯ или оба?"
    [Поиск] [РСЯ] [Оба]

User: [Клик на "Оба"]

AI: "Добавлено 2 строки в медиаплан:
    - Яндекс Директ: Поиск
    - Яндекс Директ: РСЯ
    
    Хотите задать бюджет?"
    [Да, задать] [Позже]
```

### Адаптация под роли

AI меняет поведение в зависимости от роли:

**Account Manager:**
- Помощь с клиентской коммуникацией
- Генерация брифов и предложений
- Напоминания о дедлайнах

**Strategist:**
- Анализ рынка и конкурентов
- Генерация стратегий
- Рекомендации по каналам

**Specialist (Media Planner):**
- Оптимизация медиаплана
- Подбор площадок из ландшафта
- Расчет метрик

**Analyst:**
- Анализ данных
- Генерация инсайтов
- Выявление аномалий

**Project Manager:**
- Контроль сроков и бюджета
- Управление командой
- Риски и проблемы

---

## 🎮 ИНТЕРАКТИВНЫЕ ЭЛЕМЕНТЫ

### Drag & Drop

**Где используется:**
- Загрузка файлов
- Перестановка элементов в медиаплане
- Kanban доска задач
- Приоритизация

**Визуальная обратная связь:**
- Hover зона (пунктир)
- Перетаскиваемый элемент (полупрозрачный)
- Зона drop (подсветка)
- Анимация при размещении

### Inline редактирование

**Двойной клик или клик на иконку редактирования:**
- Текст → Поле ввода
- Число → Number input
- Дата → Date picker
- Список → Dropdown

**Сохранение:**
- Enter — сохранить
- Esc — отменить
- Blur — сохранить
- ✓/✗ иконки

### Автосохранение

**Принцип:**
- Автоматически каждые 3 секунды
- После потери фокуса поля
- Индикатор статуса:
  - "Сохранено" (✓)
  - "Сохранение..." (⟳)
  - "Ошибка" (✗ с retry)

### Контекстные меню

**Right-click меню:**
- В таблицах (строки)
- В списках
- В Kanban карточках

**Примеры действий:**
- Редактировать
- Дублировать
- Удалить
- Экспорт
- Поделиться

### Keyboard shortcuts

**Глобальные:**
- `Cmd/Ctrl + K` — глобальный поиск
- `Cmd/Ctrl + N` — новый проект
- `Cmd/Ctrl + S` — сохранить
- `Cmd/Ctrl + /` — показать shortcuts
- `Esc` — закрыть модалку/панель

**В редакторе:**
- `Cmd/Ctrl + B` — жирный
- `Cmd/Ctrl + I` — курсив
- `Cmd/Ctrl + Z` — отменить
- `Cmd/Ctrl + Shift + Z` — повторить

### Фильтры и поиск

**Фильтры:**
- Множественный выбор
- Диапазоны (даты, числа)
- Теги
- Сохранение фильтров

**Поиск:**
- Живой поиск (debounce 300ms)
- Подсветка найденного
- Фильтры + поиск комбинируются
- История поиска

---

## 📱 АДАПТИВНОСТЬ

### Breakpoints

```css
/* Mobile */
--breakpoint-xs: 320px;
--breakpoint-sm: 640px;

/* Tablet */
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;

/* Desktop */
--breakpoint-xl: 1280px;
--breakpoint-2xl: 1536px;
```

### Поведение на разных экранах

#### Mobile (320px - 767px)
- Левая панель скрыта (hamburger menu)
- Правая панель скрыта (floating button для AI)
- Основной контент на всю ширину
- Вертикальные стеки вместо колонок
- Touch-friendly элементы (min 44px)

#### Tablet (768px - 1023px)
- Левая панель сворачивается до иконок (48px)
- Правая панель появляется как overlay
- Основной контент адаптивный
- Некоторые элементы в 2 колонки

#### Desktop (1024px+)
- Все 3 панели видны
- Оптимальное использование пространства
- Hover эффекты
- Keyboard navigation

### Адаптивные компоненты

**Таблицы:**
- Desktop: полная таблица
- Tablet: скрыть некоторые колонки
- Mobile: карточки вместо таблицы

**Формы:**
- Desktop: 2-3 колонки
- Tablet: 2 колонки
- Mobile: 1 колонка

**Графики:**
- Адаптивная ширина
- Упрощение на mobile
- Touch interactions

---

## 🎯 ТРЕБОВАНИЯ К ПРОТОТИПАМ

### Уровень детализации

**High-fidelity прототипы:**
- Финальные цвета и шрифты
- Реальный контент (не Lorem Ipsum)
- Все интерактивные элементы
- Микроанимации
- Адаптивные версии (desktop + mobile)

### Инструменты

**Рекомендуемые:**
- **Figma** (приоритет)
- Adobe XD
- Sketch

### Структура Figma файла

```
MRM AI Platform Prototype
├── 📄 Cover (обложка)
├── 🎨 Design System
│   ├── Colors
│   ├── Typography
│   ├── Components
│   └── Icons
├── 📱 Screens
│   ├── Dashboard
│   ├── Projects
│   ├── Brief
│   ├── Strategy
│   ├── Media Plan
│   ├── Commercial Proposal
│   ├── Technical Spec
│   ├── Campaign Report
│   └── Tasks
├── 🔄 User Flows
│   ├── Create Project
│   ├── Fill Brief
│   ├── Generate Strategy
│   └── Launch Campaign
└── 📱 Mobile Versions
```

### Компоненты в Figma

**Создать переиспользуемые компоненты:**
- Buttons (все варианты)
- Inputs (все типы)
- Cards
- Modals
- Alerts
- Tables
- AI Chat bubble
- Navigation items
- Badges
- Icons

**Варианты компонентов:**
- States: default, hover, active, disabled
- Sizes: sm, md, lg
- Variants: primary, secondary, outline...

### Прототипирование

**Интерактивность в Figma:**
- Клики на кнопки
- Переходы между экранами
- Overlay для модалок
- Scroll behavior
- Hover states
- Smart Animate для анимаций

**User Flows:**
- Создание проекта (от А до Я)
- Заполнение брифа
- Работа с медиапланом
- Генерация отчета с AI

### Экспорт

**Необходимые форматы:**
- Figma link (для dev handoff)
- PNG exports (для презентаций)
- PDF (полная документация)
- Code exports (CSS variables)

### Документация

**Для каждого экрана:**
- Описание назначения
- Структура данных
- Интерактивные элементы
- AI функции
- Edge cases (пустые состояния, ошибки)
- Адаптивное поведение

**Аннотации в Figma:**
- Комментарии к компонентам
- Spacing annotations
- Interaction notes
- Content guidelines

---

## 📚 ДЕТАЛИЗИРОВАННЫЕ ТЗ ПО АРТЕФАКТАМ

Для каждого артефакта создан детальный документ со спецификацией прототипа:

### MVP Артефакты

1. **[Brief — Бриф клиента](./02_ARTIFACTS/Brief/Prototype_Specification.md)**
   - Форма заполнения брифа
   - 5 шагов с прогресс-баром
   - AI автозаполнение и валидация

2. **[Strategy Document — Стратегический документ](./02_ARTIFACTS/Strategy_Document/Prototype_Specification.md)**
   - Структурированная стратегия
   - Визуализации и таблицы
   - AI генерация и рекомендации

3. **[Media Plan — Медиаплан](./02_ARTIFACTS/Media_Plan/Prototype_Specification.md)**
   - Таблица медиаплана
   - Оптимизация бюджета
   - Интеграция с медиаландшафтом

4. **[Project Passport — Паспорт проекта](./02_ARTIFACTS/Project_Passport/Prototype_Specification.md)**
   - Dashboard проекта
   - Метрики и прогресс
   - Быстрый доступ к артефактам

5. **[Commercial Proposal — Коммерческое предложение](./02_ARTIFACTS/Commercial_Proposal/Prototype_Specification.md)**
   - Расчет стоимости
   - Услуги и условия
   - Генерация PDF

6. **[Technical Specification — Техническое задание](./02_ARTIFACTS/Technical_Specification/Prototype_Specification.md)**
   - Инструкции по запуску
   - Чеклисты
   - Настройки платформ

7. **[Campaign Report — Отчет по кампании](./02_ARTIFACTS/Campaign_Report/Prototype_Specification.md)**
   - Дашборд аналитики
   - Графики и метрики
   - AI инсайты

8. **[Tasks — Задачи команды](./02_ARTIFACTS/Tasks/Prototype_Specification.md)**
   - Kanban доска
   - Фильтры и поиск
   - Timeline view

### Post-MVP Артефакты

9. Analytics Dashboard
10. Team Management
11. Communication Center
12. File Storage

---

## ✅ КРИТЕРИИ ПРИЕМКИ ПРОТОТИПОВ

### Обязательные требования

#### 1. Соответствие дизайн-системе
- ✅ Использованы цвета из палитры
- ✅ Шрифты и размеры соответствуют спецификации
- ✅ Отступы кратны 4px или 8px
- ✅ Компоненты переиспользуемые

#### 2. Структура "Левая-Центр-Правая"
- ✅ Левая панель (280px) — навигация
- ✅ Основной контент (адаптивный) — данные
- ✅ Правая панель (360px) — AI-ассистент

#### 3. Контент и данные
- ✅ Реальные примеры (российские компании)
- ✅ Корректные метрики и числа
- ✅ Тексты на русском языке
- ✅ Валюта в рублях (₽)

#### 4. Интерактивность
- ✅ Все кнопки кликабельны
- ✅ Формы с валидацией
- ✅ Модальные окна работают
- ✅ AI-ассистент функционален

#### 5. Адаптивность
- ✅ Desktop версия (1440px+)
- ✅ Tablet версия (768px)
- ✅ Mobile версия (375px)

#### 6. AI-функции
- ✅ Контекстные подсказки
- ✅ Быстрые действия
- ✅ Генерация контента
- ✅ Рекомендации

### Дополнительные критерии

#### 7. UX
- ✅ Понятная навигация
- ✅ Логичный workflow
- ✅ Минимум кликов до цели
- ✅ Подсказки и hints

#### 8. Accessibility
- ✅ Контраст текста WCAG AA
- ✅ Клавиатурная навигация
- ✅ ARIA labels
- ✅ Focus indicators

#### 9. Performance
- ✅ Оптимизированные изображения
- ✅ Lazy loading
- ✅ Skeleton loaders

#### 10. Edge Cases
- ✅ Пустые состояния (empty states)
- ✅ Состояния загрузки
- ✅ Ошибки и fallbacks
- ✅ Успешные действия (success states)

---

## 📞 КОНТАКТЫ И ВОПРОСЫ

**Project Owner:** [Имя]  
**Designer:** [Имя]  
**Developer:** [Имя]  

**Обратная связь:** [email/slack]

---

## 📝 CHANGELOG

| Дата | Версия | Изменения |
|------|--------|-----------|
| 2025-10-24 | 1.0 | Первая версия ТЗ |

---

**Версия:** 1.0  
**Дата:** 2025-10-24  
**Статус:** ✅ Готово к разработке  

**🎨 Удачи в создании прототипов! 🚀**

