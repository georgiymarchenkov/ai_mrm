---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: artifact_doc
title: Обзор артефактов MRM системы
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: 02_ARTIFACTS/_Artifacts_Overview.md
effective_date: 2025-10-24
visibility: internal
security_level: medium
tags: [artifact, artifacts]
---

# Обзор артефактов MRM системы

**Дата:** 23 октября 2025  
**Версия:** 2.0 (обновлено после анализа схемы)

---

## 🎯 Что такое артефакты?

**Артефакты** — это ключевые документы и данные, которые создаются и используются на протяжении всего жизненного цикла рекламного проекта.

**Всего артефактов:** 12  
**MVP артефактов:** 8  
**Post-MVP:** 4

→ См. детальный [ARTIFACTS_ANALYSIS.md](../ARTIFACTS_ANALYSIS.md)

---

## 📋 12 КЛЮЧЕВЫХ АРТЕФАКТОВ

### 🔴 MVP - КРИТИЧНЫЕ (8 артефактов)

#### 1. [Project_Passport](./Project_Passport/) - Паспорт проекта
**Назначение:** Центр управления проектом, Dashboard

**Создается:** PM в начале проекта  
**Использует:** Вся команда, Клиент  
**Обновляется:** Постоянно (автоматически)

**Ключевые данные:**
- Project ID, Name, Status
- Client & Brand info
- PM & Team
- Timeline & Milestones
- Budget (total, spent, remaining)
- KPIs & Progress
- Links to all artifacts

**Форматы:**
- 🌐 Web Dashboard (основной)
- 📊 Google Sheets (для экспорта)
- 📄 PDF (для презентаций)

**Экономия времени:** 10-15 часов/месяц (автоматическая агрегация)

---

#### 2. [Brief](./Brief/) - Бриф клиента ✅ 67%
**Назначение:** Входная точка, описание целей и требований

**Создается:** Client или Account Manager  
**Использует:** Strategist, PM, Specialist  
**Обновляется:** Редко (после согласования фиксируется)

**Ключевые данные:**
- Client info & Contact person
- Campaign goals & KPIs
- Target audience
- Budget & Timeline
- Preferred channels
- Creative requirements
- Competitors

**Форматы:**
- 🌐 Web Form (основной для заполнения)
- 📊 Google Sheets (альтернатива)
- 📄 PDF (для архива)

**Экономия времени:** 2-3 часа на бриф (AI автозаполнение)

**Файлы:**
- ✅ [Data_Structure.md](./Brief/Data_Structure.md) - JSON Schema
- ✅ [UI_Template_Web.md](./Brief/UI_Template_Web.md) - Web UI
- ✅ [Validation_Rules.md](./Brief/Validation_Rules.md) - Валидация
- ⏳ UI_Template_Sheets.md - Google Sheets
- ⏳ Examples.md - Примеры
- ⏳ API_Endpoints.md - API

---

#### 3. [Commercial_Proposal](./Commercial_Proposal/) - Коммерческое предложение
**Назначение:** Оценка стоимости, услуги, условия

**Создается:** PM + Account Manager  
**Использует:** Client для принятия решения  
**Обновляется:** По запросу (версии v1, v2, final)

**Ключевые данные:**
- Services list & Descriptions
- Budget breakdown (media, production, agency fee)
- Timeline estimate
- Payment terms & Schedule
- SLA & Guarantees
- Approval workflow

**Форматы:**
- 🌐 Web (расчет и генерация)
- 📊 Google Sheets (для работы)
- 📄 PDF (для отправки клиенту)

**Экономия времени:** 4-6 часов на КП (AI расчет на основе брифа)

---

#### 4. [Strategy_Document](./Strategy_Document/) - Стратегический документ
**Назначение:** Маркетинговая стратегия, positioning

**Создается:** Strategist  
**Использует:** PM, Specialist, Creative  
**Обновляется:** По фазам (draft, v1, final)

**Ключевые данные:**
- Market & Competitive analysis
- Target audience insights
- Positioning & USP
- Messaging framework
- Channel strategy rationale
- Creative concept direction
- Success metrics

**Форматы:**
- 🌐 Web (создание и согласование)
- 📄 PDF/PPT (презентация клиенту)
- 📊 Google Sheets (для данных)

**Экономия времени:** 8-12 часов (AI анализ рынка + генерация)

---

#### 5. [Media_Plan](./Media_Plan/) - Медиаплан
**Назначение:** Распределение бюджета по каналам и времени

**Создается:** Specialist (Media Planner)  
**Использует:** PM, Client, Specialist (Buyer)  
**Обновляется:** Часто (оптимизация бюджета)

**Ключевые данные:**
- Channel allocation & Budget per channel
- Flight schedule (по неделям/дням)
- Reach & Frequency forecast
- GRP calculation
- CPM/CPC estimates
- Expected results (impressions, clicks)

**Форматы:**
- 📊 Google Sheets (основной инструмент планирования)
- 🌐 Web (визуализация и что-если сценарии)
- 📄 PDF (для презентации)

**Экономия времени:** 6-10 часов на план (AI оптимизация)

**Интеграция:** Калькуляторы Шматова, MMM модели

---

#### 6. [Technical_Specification](./Technical_Specification/) - Техническое задание
**Назначение:** Инструкции для запуска кампаний

**Создается:** Specialist (Media Planner) + PM  
**Использует:** Specialist (Buyer), QA  
**Обновляется:** По каналам (каждая платформа отдельно)

**Ключевые данные:**
- Campaign settings per platform
- Targeting parameters (geo, demo, interests)
- Creative specifications & assets
- UTM structure & Naming conventions
- Pixel & Goals setup
- Budget & Bid strategy
- QA checklist

**Форматы:**
- 🌐 Web (чек-листы с автопроверкой)
- 📊 Google Sheets (для сложных настроек)
- 📄 PDF (для архива)

**Экономия времени:** 3-5 часов на ТЗ (шаблоны + автогенерация)

---

#### 7. [Campaign_Report](./Campaign_Report/) - Отчет по кампании
**Назначение:** Результаты, аналитика, инсайты

**Создается:** Analyst + Specialist  
**Использует:** Client, PM, Strategist  
**Обновляется:** Регулярно (weekly, monthly, final)

**Ключевые данные:**
- Performance metrics (reach, CTR, conversions)
- Spend tracking (plan vs fact)
- KPI achievement (vs brief goals)
- Channel comparison (best/worst performers)
- Attribution analysis
- Insights & Anomalies
- Recommendations & Next steps

**Форматы:**
- 🌐 Web Dashboard (real-time)
- 📊 Google Sheets (детальные данные)
- 📄 PDF/PPT (презентация клиенту)

**Экономия времени:** 10-15 часов на отчет (автосбор данных + AI инсайты)

**Интеграция:** API всех рекламных платформ, Analytics

---

#### 8. [Tasks](./Tasks/) - Задачи команды
**Назначение:** Управление задачами и workflow

**Создается:** PM (автоматически из проекта)  
**Использует:** Вся команда  
**Обновляется:** Постоянно (ежедневно)

**Ключевые данные:**
- Task title & Description
- Assignee & RACI
- Status (Todo, In Progress, Done, Blocked)
- Priority (P0, P1, P2, P3)
- Due date & Time estimate
- Dependencies (blocked by, blocks)
- Comments & Attachments
- Time tracking (logged hours)

**Форматы:**
- 🌐 Web (Kanban board / List view)
- 📊 Google Sheets (для легких проектов)
- 📱 Mobile app

**Экономия времени:** 5-8 часов/неделю (автосоздание задач из процессов)

**Интеграция:** Jira, Asana, ClickUp, Monday

---

### 🟡 POST-MVP - ВАЖНЫЕ (4 артефакта)

#### 9. [Team](./Team/) - Команда проекта
**Назначение:** Состав, роли, загрузка

**Ключевые данные:**
- Team members list
- Roles & Permissions
- RACI matrix
- Availability & Workload
- Skills & Expertise
- Contact info

**Экономия времени:** 2-3 часа (автосинхронизация с HR)

---

#### 10. [Communication](./Communication/) - Коммуникация
**Назначение:** История общения с клиентом

**Ключевые данные:**
- Message thread & Email integration
- Meeting minutes
- Decisions log
- Approvals
- Files shared

**Экономия времени:** 3-4 часа/неделю (автологирование)

---

#### 11. [RIM](./RIM/) - Resource & Issue Management
**Назначение:** Управление ресурсами и рисками

**Ключевые данные:**
- Resource allocation
- Budget tracking (real-time)
- Risk register
- Issue log
- Change requests

**Экономия времени:** 4-5 часов/неделю (AI предсказание рисков)

---

#### 12. [Products](./Products/) - Продукты / Deliverables
**Назначение:** Креативы и deliverables

**Ключевые данные:**
- Product name & Type
- Specifications
- Status & Versions
- Approvals
- File storage

**Экономия времени:** 2-3 часа (централизованное хранение)

---

## 🔄 ЖИЗНЕННЫЙ ЦИКЛ АРТЕФАКТОВ

```
1. KICKOFF
   ↓
   Client заполняет Brief
   ↓
   PM создает Project_Passport
   ↓
   Система автогенерирует Tasks

2. STRATEGY
   ↓
   Strategist создает Strategy_Document
   ↓
   PM согласует с Client
   ↓
   Обновляется Project_Passport (статус)

3. PLANNING
   ↓
   Specialist создает Media_Plan
   ↓
   PM создает Commercial_Proposal
   ↓
   Client approves → обновляется Brief

4. EXECUTION
   ↓
   Specialist создает Technical_Specification
   ↓
   Tasks обновляются (In Progress)
   ↓
   Campaign_Report начинает собирать данные

5. MONITORING
   ↓
   Campaign_Report обновляется (weekly)
   ↓
   RIM отслеживает риски
   ↓
   Tasks закрываются, новые создаются

6. CLOSEOUT
   ↓
   Final Campaign_Report
   ↓
   Project_Passport archived
   ↓
   Communication экспортируется
```

---

## 📊 СВЯЗИ МЕЖДУ АРТЕФАКТАМИ

### Входные данные:
- **Brief** → Strategy_Document, Media_Plan, Commercial_Proposal
- **Strategy_Document** → Media_Plan, Technical_Specification
- **Media_Plan** → Technical_Specification, Campaign_Report
- **Commercial_Proposal** → Project_Passport (budget)

### Выходные данные:
- **Campaign_Report** → Client, Strategy (для следующих кампаний)
- **Tasks** → Team workload, Project_Passport (progress)
- **RIM** → Project_Passport (risks, budget status)

---

## 💾 ФОРМАТЫ АРТЕФАКТОВ

### 🌐 Web (Interactive)
**Для:** Brief, Project_Passport, Tasks, Campaign_Report (Dashboard)

**Преимущества:**
- Real-time обновления
- Коллаборация
- AI интеграция
- Access control

---

### 📊 Google Sheets
**Для:** Media_Plan, Technical_Specification, Commercial_Proposal

**Преимущества:**
- Знакомый инструмент
- Формулы и расчеты
- Легко экспортировать
- Версионирование

**Важно:** Sheets интегрированы с Web платформой (двусторонняя синхронизация)

---

### 📄 PDF / PPT
**Для:** Strategy_Document, Campaign_Report (для презентаций)

**Преимущества:**
- Профессиональный вид
- Легко отправить клиенту
- Фиксированная версия

**Генерация:** Автоматическая из Web/Sheets

---

## 🤖 AI ПОМОЩЬ С АРТЕФАКТАМИ

### Автогенерация:
- ✅ Brief → 70% полей автозаполняются из CRM
- ✅ Strategy_Document → 60% AI генерация на основе Brief
- ✅ Media_Plan → AI оптимизация распределения бюджета
- ✅ Technical_Specification → Шаблоны по типу кампании
- ✅ Campaign_Report → Полная автоматизация сбора данных

### Валидация:
- ✅ Проверка completeness (все ли поля заполнены)
- ✅ Cross-field validation (consistency между полями)
- ✅ Business rules (бюджет vs timeline, goals vs channels)

### Insights:
- ✅ Campaign_Report: AI выявляет аномалии и возможности
- ✅ Media_Plan: "Что если" сценарии
- ✅ RIM: Предсказание рисков срыва дедлайнов

---

## 📁 УНИФИЦИРОВАННАЯ СТРУКТУРА

**Каждый артефакт имеет 6 стандартных MD файлов:**

```
02_ARTIFACTS/
  └── [Artifact_Name]/
      ├── Data_Structure.md         # JSON Schema
      ├── UI_Template_Web.md        # Web UI
      ├── UI_Template_Sheets.md     # Google Sheets
      ├── Validation_Rules.md       # Валидация / Workflow
      ├── Examples.md               # Примеры
      └── API_Endpoints.md          # REST API
```

**Итого:** 12 артефактов × 6 файлов = **72 MD файла**

---

## ⏱️ ЭКОНОМИЯ ВРЕМЕНИ

### До MRM AI (manual):
```yaml
Brief: 3-4 часа заполнение + уточнения
Strategy: 16-24 часа разработка
Media Plan: 8-12 часов планирование
Commercial Proposal: 6-8 часов расчет
Technical Specification: 5-7 часов написание
Campaign Report: 12-20 часов сборка и анализ

ИТОГО: 50-75 часов на проект
```

### С MRM AI (автоматизация):
```yaml
Brief: 30-60 минут (AI автозаполнение)
Strategy: 4-6 часов (AI генерация + review)
Media Plan: 2-3 часа (AI оптимизация)
Commercial Proposal: 1-2 часа (автоматический расчет)
Technical Specification: 1-2 часа (шаблоны)
Campaign Report: 1-2 часа (автосбор + AI insights)

ИТОГО: 10-16 часов на проект
```

**ЭКОНОМИЯ:** 40-60 часов на проект = **75-80%**

---

## 🔗 Навигация

### Артефакты MVP:
- [Project_Passport/](./Project_Passport/) - Паспорт проекта
- [Brief/](./Brief/) - Бриф (67% готово)
- [Commercial_Proposal/](./Commercial_Proposal/) - КП
- [Strategy_Document/](./Strategy_Document/) - Стратегия
- [Media_Plan/](./Media_Plan/) - Медиаплан
- [Technical_Specification/](./Technical_Specification/) - ТЗ
- [Campaign_Report/](./Campaign_Report/) - Отчет
- [Tasks/](./Tasks/) - Задачи

### Артефакты Post-MVP:
- [Team/](./Team/) - Команда
- [Communication/](./Communication/) - Коммуникация
- [RIM/](./RIM/) - Resource & Issue Management
- [Products/](./Products/) - Продукты

### Другие разделы:
- [01_ROLES/](../01_ROLES/) - Роли и их работа с артефактами
- [05_PROCESSES/](../05_PROCESSES/) - Процессы создания артефактов
- [06_AI_ASSISTANTS/](../06_AI_ASSISTANTS/) - AI помощь с артефактами

---

**Версия:** 2.0 | **Дата:** 2025-10-23 | **Статус:** ✅ Обновлено (12 артефактов)
