---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: process
title: 01_Briefing - Roles & Responsibilities
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: 05_PROCESSES/01_Briefing/Roles_Responsibilities.md
effective_date: 2025-10-24
visibility: internal
security_level: medium
tags: [process, 01_briefing, roles_responsibilities]
---

# 01_Briefing - Roles & Responsibilities

→ [Overview](./Overview.md) | [Steps](./Process_Steps.md) | [Data](./Data_IO.md) | [Test](./Test_Scenario.md)

---

## 👥 КТО ЧТО ДЕЛАЕТ

### 1. ACCOUNT MANAGER [Lead, R/A]

**Ответственность:** Координация всего процесса briefing

**Конкретные действия:**

```yaml
1. Project Setup:
   - Создать проект в MRM
   - Выбрать template brief
   - Отправить ссылку client

2. Client Communication:
   - Провести briefing call (1ч)
   - Уточнить вопросы team
   - Организовать deep dive sessions

3. Brief Filling:
   - Заполнить данные из звонков
   - Дополнить пропуски
   - Проверить completeness

4. Final Approval:
   - Review с client
   - Получить approval
   - Передать Strategist
```

**Инструменты:**
- MRM Platform
- CRM
- Email, Calendar

**Time:** 6-8 часов total

---

### 2. STRATEGIST [Reviewer, C]

**Ответственность:** Определить достаточность данных для strategy

**Конкретные действия:**

```yaml
1. Brief Review (Day 2):
   - Прочитать текущий brief
   - Оценить completeness для strategy
   
2. Identify Gaps:
   - Positioning data: есть/нет?
   - Competitor info: достаточно?
   - Target audience: детально?
   - Goals: измеримые?

3. Add Questions:
   - Создать список вопросов (8-12)
   - Добавить в brief (comments)
   - Пример вопросов:
     * "Как хотите позиционировать ЖК?"
     * "Кто main конкуренты?"
     * "Customer journey - как?"

4. Final Confirmation:
   - Проверить ответы
   - Confirm: "Могу разработать стратегию"
```

**Критерий готовности:**
> "У меня есть все данные чтобы разработать positioning, channel strategy и budget allocation"

**Time:** 2-3 часа total

---

### 3. SPECIALIST (Context) [Reviewer, C]

**Ответственность:** Технические требования для context advertising

**Конкретные действия:**

```yaml
1. Brief Review:
   - Проверить landing pages
   - Проверить conversion actions
   - Проверить keywords ideas

2. Add Questions (если missing):
   - Landing pages URLs?
   - Метрики tracking setup?
   - Keywords current performance?
   - Negative keywords list?
   - Budget по городам?

3. Technical Check:
   - Verify landing pages exist
   - Check Metrica/GA4 IDs
   - Test form submissions
   - Check mobile version

4. Final Confirmation:
   - Confirm: "Могу спланировать context campaigns"
```

**Критерий готовности:**
> "У меня есть landing pages, tracking setup, keywords идеи. Могу создать campaigns."

**Time:** 1-2 часа total

---

### 4. ANALYST [Reviewer, C]

**Ответственность:** Tracking и analytics requirements

**Конкретные действия:**

```yaml
1. Current Setup Audit:
   - Какие analytics системы используются?
   - Yandex Metrica: ID?
   - Google Analytics: ID?
   - CRM система?

2. Add Questions:
   - Доступы к systems?
   - Goals configured?
   - CRM API available?
   - Call tracking?

3. Verify Access:
   - Request admin access
   - Check if tracking codes installed
   - Test goals firing

4. Final Confirmation:
   - Confirm: "Могу настроить tracking"
```

**Критерий готовности:**
> "У меня есть доступы, понимаю текущий setup. Могу настроить полный tracking."

**Time:** 1-2 часа total

---

### 5. CREATIVE [Reviewer, C]

**Ответственность:** Креативные материалы и brand guidelines

**Конкретные действия:**

```yaml
1. Materials Check:
   - Brand guidelines: есть?
   - Logo files: есть?
   - Photos: есть?
   - Videos: есть?

2. Add Questions:
   - Brand book?
   - Color palette (HEX)?
   - Fonts (with licenses)?
   - Photo/video materials?
   - Tone of voice?
   - Restrictions (что нельзя)?

3. Materials Request:
   - Создать checklist materials
   - Отправить client
   - Verify received files

4. Final Confirmation:
   - Confirm: "Могу создать креативы"
```

**Критерий готовности:**
> "У меня есть brand guidelines и materials. Могу разработать креативную концепцию."

**Time:** 1-2 часа total

---

### 6. PM [Controller, I]

**Ответственность:** Контроль сроков и completeness

**Конкретные действия:**

```yaml
1. Timeline Monitoring:
   - Track days since start
   - Check if on schedule
   - Escalate if delays

2. Completeness Check:
   - Run automated validation
   - Check all roles confirmed
   - Verify no blockers

3. Team Coordination:
   - Daily status check
   - Resolve blockers
   - Facilitate communication

4. Final Validation:
   - Brief completeness >95%
   - All roles confirmed
   - Client approved
   - → Green light для Strategy
```

**Time:** 1-2 часа total (мониторинг)

---

### 7. CLIENT [Approver, A]

**Ответственность:** Предоставить данные и approve

**Конкретные действия:**

```yaml
1. Initial Fill:
   - Заполнить brief form (30-60%)
   - Базовая информация

2. Briefing Call:
   - Участвовать в call (1ч)
   - Ответить на вопросы

3. Answer Questions:
   - Ответить на team questions
   - Предоставить materials

4. Final Approval:
   - Review filled brief
   - Confirm accuracy
   - Approve → процесс идет дальше
```

**Time:** 3-5 часов total (распределено по дням)

---

## 📊 RACI MATRIX

| Действие | Account | Strategist | Specialist | Analyst | Creative | PM | Client |
|----------|---------|------------|------------|---------|----------|----|---------| 
| Create project | **R/A** | I | I | I | I | C | I |
| Send brief | **R** | I | I | I | I | I | **A** |
| Initial fill | I | I | I | I | I | I | **R** |
| Briefing call | **R** | C | C | C | C | I | **R** |
| Add questions | C | **R** | **R** | **R** | **R** | I | I |
| Answer questions | **R** | C | C | C | C | I | **R** |
| Deep dive | **R** | C | C | C | C | I | **R** |
| Final validation | **R** | C | C | C | C | **A** | I |
| Approve brief | **R** | I | I | I | I | I | **A** |

**Легенда:** R=Responsible, A=Accountable, C=Consulted, I=Informed

---

## ⏱️ TIME ALLOCATION

```yaml
Total Process Time: 2-5 дней

By Role:
  Account Manager: 6-8ч (lead role)
  Strategist: 2-3ч (reviewer)
  Specialist: 1-2ч (reviewer)
  Analyst: 1-2ч (reviewer)
  Creative: 1-2ч (reviewer)
  PM: 1-2ч (controller)
  Client: 3-5ч (data provider)
```

---

**Версия:** 2.1  
**Строк:** 118  
**Статус:** ✅ Готово


