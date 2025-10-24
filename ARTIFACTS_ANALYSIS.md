---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: report
title: Анализ артефактов MRM системы
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: ARTIFACTS_ANALYSIS.md
effective_date: 2025-10-24
visibility: internal
security_level: low
tags: [report, progress]
---

# Анализ артефактов MRM системы

**Дата:** 23 октября 2025  
**Версия:** 1.0

---

## 🎯 СРАВНЕНИЕ: Схема MRM vs Текущая структура

### На схеме MRM (колонка "Данные" - фиолетовая):

Выявлено **15 основных артефактов:**

1. **Паспорт проекта** 📋
2. **Задачи** ✅
3. **Команда** 👥
4. **Оценки** 💰
5. **Документы** 📄
6. **Процессы** 🔄
7. **Работы** 🛠️
8. **Коммуникация** 💬
9. **РИМ** (Resource & Issue Management) 📊
10. **Отчет** 📈
11. **Медиапланы** 📊
12. **Статусы** 🚦
13. **Инструменты** 🔧
14. **Продукты** 📦
15. **Экономика** 💵

---

### В нашей текущей структуре (02_ARTIFACTS/):

Создано **6 артефактов:**

1. ✅ **Brief** (Бриф) - частично покрывает "Паспорт проекта"
2. ⏳ **Commercial_Proposal** (КП) - покрывает "Оценки" + "Экономика"
3. ⏳ **Media_Plan** (Медиаплан) - покрывает "Медиапланы"
4. ⏳ **Campaign_Report** (Отчет кампании) - покрывает "Отчет"
5. ⏳ **Strategy_Document** (Стратегия) - новый артефакт
6. ⏳ **Technical_Specification** (ТЗ) - покрывает "Работы"

---

## 📊 ПОЛНАЯ ТАБЛИЦА СООТВЕТСТВИЯ

| № | Артефакт из схемы MRM | Текущий артефакт | Покрытие | Приоритет | Статус |
|---|----------------------|------------------|----------|-----------|--------|
| 1 | **Паспорт проекта** | Brief | 70% | 🔴 High | В работе (4/6) |
| 2 | **Задачи** | *отсутствует* | 0% | 🔴 High | ⏳ Нужно создать |
| 3 | **Команда** | *отсутствует* | 0% | 🟡 Medium | ⏳ Нужно создать |
| 4 | **Оценки** | Commercial_Proposal | 50% | 🔴 High | ⏳ Нужно создать |
| 5 | **Документы** | *встроено в другие* | 30% | 🟢 Low | Не отдельный артефакт |
| 6 | **Процессы** | *в 05_PROCESSES/* | 0% | 🟡 Medium | Отдельная категория |
| 7 | **Работы** | Technical_Specification | 60% | 🟡 Medium | ⏳ Нужно создать |
| 8 | **Коммуникация** | *отсутствует* | 0% | 🟡 Medium | ⏳ Нужно создать |
| 9 | **РИМ** | *отсутствует* | 0% | 🟡 Medium | ⏳ Нужно создать |
| 10 | **Отчет** | Campaign_Report | 50% | 🔴 High | ⏳ Нужно создать |
| 11 | **Медиапланы** | Media_Plan | 50% | 🔴 High | ⏳ Нужно создать |
| 12 | **Статусы** | *встроено в другие* | 40% | 🟢 Low | Часть других артефактов |
| 13 | **Инструменты** | *в 03_TOOLS/* | 0% | 🟢 Low | Отдельная категория |
| 14 | **Продукты** | *отсутствует* | 0% | 🟡 Medium | ⏳ Нужно создать |
| 15 | **Экономика** | Commercial_Proposal | 40% | 🟡 Medium | Часть КП |

**Итого покрытие:** ~30% (6 из 15 артефактов частично покрыты)

---

## ✅ РЕКОМЕНДУЕМАЯ СТРУКТУРА АРТЕФАКТОВ

### Priority 1 - КРИТИЧНЫЕ (MVP) - 8 артефактов:

#### 1. **Brief** (Бриф / Паспорт проекта) ✅ 67% готово
**Назначение:** Входная точка, описание проекта и целей

**Структура MD файлов:**
- ✅ Data_Structure.md (JSON schema)
- ✅ UI_Template_Web.md (Web интерфейс)
- ✅ Validation_Rules.md (Правила валидации)
- ⏳ UI_Template_Sheets.md (Google Sheets)
- ⏳ Examples.md (Примеры)
- ⏳ API_Endpoints.md (API)

**Ключевые данные:**
- Client info
- Campaign goals & KPIs
- Target audience
- Budget & Timeline
- Channels
- Creative requirements

---

#### 2. **Commercial_Proposal** (Коммерческое предложение) ⏳ 0%
**Назначение:** Оценка стоимости, услуги, условия

**Структура MD файлов:**
- ⏳ Data_Structure.md
- ⏳ UI_Template_Web.md
- ⏳ UI_Template_Sheets.md
- ⏳ Calculation_Logic.md (Логика расчета)
- ⏳ Examples.md
- ⏳ API_Endpoints.md

**Ключевые данные:**
- Services list
- Budget breakdown
- Timeline estimate
- Payment terms
- SLA
- Approval workflow

**Связь с схемой:** Покрывает "Оценки" + частично "Экономика"

---

#### 3. **Media_Plan** (Медиаплан) ⏳ 0%
**Назначение:** Распределение бюджета по каналам и времени

**Структура MD файлов:**
- ⏳ Data_Structure.md
- ⏳ UI_Template_Web.md
- ⏳ UI_Template_Sheets.md (важно! основной инструмент)
- ⏳ Calculation_Logic.md (Расчет охватов, GRP, etc.)
- ⏳ Examples.md
- ⏳ API_Endpoints.md

**Ключевые данные:**
- Channel allocation
- Budget per channel
- Flight schedule
- Reach & Frequency forecast
- GRP calculation
- CPM/CPC estimates

**Связь с схемой:** Покрывает "Медиапланы"

---

#### 4. **Campaign_Report** (Отчет по кампании) ⏳ 0%
**Назначение:** Результаты кампании, аналитика

**Структура MD файлов:**
- ⏳ Data_Structure.md
- ⏳ UI_Template_Web.md (Dashboard)
- ⏳ UI_Template_Sheets.md
- ⏳ Calculation_Logic.md (Метрики, attribution)
- ⏳ Examples.md
- ⏳ API_Endpoints.md

**Ключевые данные:**
- Performance metrics (reach, CTR, conversions, etc.)
- Spend tracking
- KPI achievement
- Channel comparison
- Insights & recommendations
- Next steps

**Связь с схемой:** Покрывает "Отчет"

---

#### 5. **Technical_Specification** (Техническое задание) ⏳ 0%
**Назначение:** Инструкции для специалистов по настройке

**Структура MD файлов:**
- ⏳ Data_Structure.md
- ⏳ UI_Template_Web.md
- ⏳ UI_Template_Sheets.md
- ⏳ Validation_Rules.md (Чек-листы)
- ⏳ Examples.md (Примеры по каналам)
- ⏳ API_Endpoints.md

**Ключевые данные:**
- Campaign settings (per platform)
- Targeting parameters
- Creative specifications
- UTM structure
- Pixel & goals setup
- QA checklist

**Связь с схемой:** Покрывает "Работы"

---

#### 6. **Strategy_Document** (Стратегический документ) ⏳ 0%
**Назначение:** Маркетинговая стратегия, positioning

**Структура MD файлов:**
- ⏳ Data_Structure.md
- ⏳ UI_Template_Web.md
- ⏳ UI_Template_Sheets.md
- ⏳ Validation_Rules.md
- ⏳ Examples.md
- ⏳ API_Endpoints.md

**Ключевые данные:**
- Market analysis
- Competitive analysis
- Target audience insights
- Positioning
- Messaging framework
- Channel strategy
- Creative concept

**Связь с схемой:** Новый артефакт (важен для качества)

---

#### 7. **Tasks** (Задачи / Работы) ⏳ 0% - НОВЫЙ!
**Назначение:** Задачи команды, workflow

**Структура MD файлов:**
- ⏳ Data_Structure.md
- ⏳ UI_Template_Web.md (Kanban/List view)
- ⏳ UI_Template_Sheets.md (для легких проектов)
- ⏳ Workflow_Rules.md (Статусы, переходы)
- ⏳ Examples.md
- ⏳ API_Endpoints.md

**Ключевые данные:**
- Task title & description
- Assignee & RACI
- Status (Todo, In Progress, Done, Blocked)
- Priority
- Due date
- Dependencies
- Time tracking
- Comments & attachments

**Связь с схемой:** Покрывает "Задачи" + частично "Работы"

**Интеграция:** Jira, Asana, ClickUp

---

#### 8. **Project_Passport** (Паспорт проекта) ⏳ 0% - НОВЫЙ!
**Назначение:** Мета-информация о проекте, Dashboard

**Структура MD файлов:**
- ⏳ Data_Structure.md
- ⏳ UI_Template_Web.md (Dashboard view)
- ⏳ UI_Template_Sheets.md
- ⏳ Validation_Rules.md
- ⏳ Examples.md
- ⏳ API_Endpoints.md

**Ключевые данные:**
- Project ID & Name
- Client & Brand
- Project Manager & Team
- Status (Active, Paused, Completed)
- Timeline (start, end, milestones)
- Budget (total, spent, remaining)
- KPIs & Progress
- Links to all artifacts
- History & Changelog

**Связь с схемой:** Полностью покрывает "Паспорт проекта" + "Статусы"

**Особенность:** Это "центр управления" проектом, откуда доступны все остальные артефакты

---

### Priority 2 - ВАЖНЫЕ (Post-MVP) - 4 артефакта:

#### 9. **Team** (Команда проекта) ⏳ 0% - НОВЫЙ!
**Назначение:** Состав команды, роли, загрузка

**Структура MD файлов:**
- ⏳ Data_Structure.md
- ⏳ UI_Template_Web.md
- ⏳ UI_Template_Sheets.md
- ⏳ RACI_Rules.md
- ⏳ Examples.md
- ⏳ API_Endpoints.md

**Ключевые данные:**
- Team members
- Roles & Permissions
- RACI matrix
- Availability & Workload
- Contact info
- Skills & Expertise

**Связь с схемой:** Покрывает "Команда"

---

#### 10. **Communication** (Коммуникация) ⏳ 0% - НОВЫЙ!
**Назначение:** История коммуникации с клиентом

**Структура MD файлов:**
- ⏳ Data_Structure.md
- ⏳ UI_Template_Web.md (Chat/Feed view)
- ⏳ UI_Template_Sheets.md (Log)
- ⏳ Validation_Rules.md
- ⏳ Examples.md
- ⏳ API_Endpoints.md

**Ключевые данные:**
- Message thread
- Meeting minutes
- Decisions log
- Approvals
- Files shared
- Email integration

**Связь с схемой:** Покрывает "Коммуникация"

---

#### 11. **RIM** (Resource & Issue Management) ⏳ 0% - НОВЫЙ!
**Назначение:** Управление ресурсами и рисками

**Структура MD файлов:**
- ⏳ Data_Structure.md
- ⏳ UI_Template_Web.md
- ⏳ UI_Template_Sheets.md
- ⏳ Validation_Rules.md
- ⏳ Examples.md
- ⏳ API_Endpoints.md

**Ключевые данные:**
- Resource allocation
- Budget tracking
- Risk register
- Issue log
- Change requests
- Dependencies

**Связь с схемой:** Покрывает "РИМ"

---

#### 12. **Products** (Продукты / Deliverables) ⏳ 0% - НОВЫЙ!
**Назначение:** Перечень deliverables, креативов

**Структура MD файлов:**
- ⏳ Data_Structure.md
- ⏳ UI_Template_Web.md (Gallery view)
- ⏳ UI_Template_Sheets.md
- ⏳ Validation_Rules.md (Форматы, specs)
- ⏳ Examples.md
- ⏳ API_Endpoints.md

**Ключевые данные:**
- Product name & type
- Specifications
- Status (Draft, In Review, Approved)
- Versions
- Approvals
- File links

**Связь с схемой:** Покрывает "Продукты"

---

## 📁 УНИФИЦИРОВАННАЯ СТРУКТУРА MD ФАЙЛОВ

**Для КАЖДОГО артефакта создаем 6 стандартных файлов:**

```
02_ARTIFACTS/
  ├── [Artifact_Name]/
  │   ├── Data_Structure.md         # JSON Schema, типы данных
  │   ├── UI_Template_Web.md        # Web UI (React components)
  │   ├── UI_Template_Sheets.md     # Google Sheets template
  │   ├── Validation_Rules.md       # Правила валидации / Workflow rules
  │   ├── Examples.md               # Примеры заполнения
  │   └── API_Endpoints.md          # REST API endpoints
```

### Содержание каждого файла:

#### 1. **Data_Structure.md**
```markdown
# [Artifact] - Data Structure

## JSON Schema
## Field Descriptions
## Data Types
## Relationships
## Indexes
```

#### 2. **UI_Template_Web.md**
```markdown
# [Artifact] - Web UI Template

## Layout Overview
## Components (React/JSX)
## Form Fields
## Validation
## Actions
## AI Suggestions
```

#### 3. **UI_Template_Sheets.md**
```markdown
# [Artifact] - Google Sheets Template

## Sheet Structure
## Tabs Overview
## Formulas
## Conditional Formatting
## Data Validation
## Charts
## Import/Export
```

#### 4. **Validation_Rules.md** or **Workflow_Rules.md**
```markdown
# [Artifact] - Validation Rules / Workflow

## Required Fields
## Field Validation
## Cross-field Validation
## Business Rules
## Workflow States
## Transitions
```

#### 5. **Examples.md**
```markdown
# [Artifact] - Examples

## Example 1: [Use Case]
## Example 2: [Use Case]
## Example 3: [Use Case]
## Common Patterns
## Edge Cases
```

#### 6. **API_Endpoints.md**
```markdown
# [Artifact] - API Endpoints

## CRUD Operations
  - POST /api/[artifact] - Create
  - GET /api/[artifact]/:id - Read
  - PUT /api/[artifact]/:id - Update
  - DELETE /api/[artifact]/:id - Delete

## Additional Endpoints
## Request/Response Examples
## Error Codes
## Authentication
```

---

## 🎯 ИТОГОВАЯ СТРУКТУРА (12 артефактов × 6 файлов = 72 файла)

### MVP (8 артефактов × 6 = 48 файлов):
1. ✅ Brief (4/6 готово)
2. ⏳ Commercial_Proposal (0/6)
3. ⏳ Media_Plan (0/6)
4. ⏳ Campaign_Report (0/6)
5. ⏳ Technical_Specification (0/6)
6. ⏳ Strategy_Document (0/6)
7. ⏳ Tasks (0/6) - НОВЫЙ
8. ⏳ Project_Passport (0/6) - НОВЫЙ

### Post-MVP (4 артефакта × 6 = 24 файла):
9. ⏳ Team (0/6) - НОВЫЙ
10. ⏳ Communication (0/6) - НОВЫЙ
11. ⏳ RIM (0/6) - НОВЫЙ
12. ⏳ Products (0/6) - НОВЫЙ

---

## 📊 ПРИОРИТИЗАЦИЯ СОЗДАНИЯ

### Этап 1 (2-3 часа): Доделать Brief
- ✅ Data_Structure.md
- ✅ UI_Template_Web.md
- ✅ Validation_Rules.md
- ⏳ UI_Template_Sheets.md
- ⏳ Examples.md
- ⏳ API_Endpoints.md

### Этап 2 (6-8 часов): Создать топ-3 критичных
- ⏳ Media_Plan (6 файлов)
- ⏳ Campaign_Report (6 файлов)
- ⏳ Technical_Specification (6 файлов)

### Этап 3 (4-6 часов): Создать остальные MVP
- ⏳ Commercial_Proposal (6 файлов)
- ⏳ Strategy_Document (6 файлов)
- ⏳ Project_Passport (6 файлов)
- ⏳ Tasks (6 файлов)

### Этап 4 (4-5 часов): Post-MVP
- ⏳ Team, Communication, RIM, Products (24 файла)

**Итого:** 20-25 часов для полного создания всех артефактов

---

## ✅ ДЕЙСТВИЯ

**Сейчас:**
1. ✅ Создать этот анализ
2. ⏳ Доделать Brief (3 файла)
3. ⏳ Создать структуру для новых артефактов (Tasks, Project_Passport)
4. ⏳ Начать создание Media_Plan

**Вопросы к вам:**
- Подтверждаете ли список из 12 артефактов?
- Согласны с приоритетами?
- Начать создавать сейчас или нужны правки?

---

## 🔗 Связанные документы

- [02_ARTIFACTS/_Artifacts_Overview.md](./02_ARTIFACTS/_Artifacts_Overview.md) - Обзор
- [RESTRUCTURING_CHECKLIST.md](./RESTRUCTURING_CHECKLIST.md) - Чек-лист
- [PROGRESS_REPORT.md](./PROGRESS_REPORT.md) - Отчет о прогрессе

---

**Версия:** 1.0 | **Дата:** 2025-10-23 | **Статус:** ✅ Готов к утверждению

