------


# Project Manager - Артефакты и документы

→ [Roles](../_README.md) | [Description](./Role_Description.md) | [Functions](./Functions.md)


## 📋 Артефакты, с которыми работает PM

PM создает, использует и управляет множеством артефактов на протяжении всего проекта.

---

## 1. ВХОДЯЩИЕ АРТЕФАКТЫ

### [Brief](../../02_ARTIFACTS/Brief/)
**Откуда:** Client + Account Manager  
**Использование:** Основа для планирования проекта

**PM делает:**
- ✅ Анализирует бриф на completeness
- ✅ Уточняет unclear requirements
- ✅ Определяет feasibility
- ✅ Оценивает ресурсы и timeline
- ✅ Выявляет риски

**Ключевые данные:**
- Цели и KPI
- Бюджет
- Timeline
- Target audience
- Deliverables

→ См. [02_ARTIFACTS/Brief/](../../02_ARTIFACTS/Brief/)

---

### [Strategy Document](../../02_ARTIFACTS/Strategy_Document/)
**Откуда:** Strategist  
**Использование:** Основа для медиаплана и execution

**PM делает:**
- ✅ Review стратегии
- ✅ Согласование с брифом
- ✅ Оценка реализуемости
- ✅ Планирование execution
- ✅ Определение milestones

**Ключевые данные:**
- Channel strategy
- Messaging framework
- Target audience insights
- Competitive positioning

→ См. [02_ARTIFACTS/Strategy_Document/](../../02_ARTIFACTS/Strategy_Document/)

---

## 2. СОЗДАВАЕМЫЕ PM АРТЕФАКТЫ

### 2.1. Project Charter
**Назначение:** Формальное начало проекта

**Содержание:**
```yaml
Sections:
  1. Project Overview
     - Background
     - Business case
     - Objectives
  
  2. Scope
     - In scope
     - Out of scope
     - Deliverables
  
  3. Stakeholders
     - RACI matrix
     - Communication plan
  
  4. Timeline
     - Key phases
     - Milestones
     - Critical dates
  
  5. Budget
     - Total budget
     - Allocation by phase
     - Contingency
  
  6. Success Criteria
     - KPIs
     - Acceptance criteria
  
  7. Assumptions & Constraints
  8. Risks & Mitigation
  9. Approvals
```

**Частота:** Один раз в начале проекта  
**Time to create:** 2-4 часа  
**С AI:** 30-45 минут (генерация из брифа)

**Template:** Доступен в MRM AI

---

### 2.2. Project Plan / Timeline
**Назначение:** Детальный план выполнения

**Содержание:**
- Gantt chart / Timeline
- Task breakdown (WBS)
- Dependencies
- Resource allocation
- Critical path
- Milestones

**Инструмент:** Google Sheets, Jira, Gantt charts  
**Частота:** Создается в начале, обновляется weekly  
**Time:** 4-6 часов создание, 1-2 часа обновление

**С AI:**
- Автоматическая генерация timeline
- Automatic updates из Jira
- AI рекомендации по оптимизации

---

### 2.3. RACI Matrix
**Назначение:** Определение ответственности

**Структура:**
```
| Task/Activity | Client | Account | PM | Strategist | Specialist | Analyst |
|---------------|--------|---------|----|-----------|-----------| --------|
| Brief approval| A      | R       | C  | I         | I         | I       |
| Strategy      | A      | C       | C  | A/R       | C         | C       |
| Media plan    | A      | R       | A  | C         | A/R       | C       |
...
```

**Частота:** Создается в начале  
**Time:** 1-2 часа  
**Template:** Доступен в MRM AI

→ См. [PM/RACI_Matrix.md](./RACI_Matrix.md) для детального примера

---

### 2.4. Status Reports
**Назначение:** Регулярная отчетность о прогрессе

**Виды:**

#### Weekly Status Report
```yaml
Sections:
  1. Executive Summary (2-3 sentences)
  2. Progress This Week
     - Completed tasks
     - Key achievements
     - Metrics update
  
  3. Issues & Blockers
     - Current issues
     - Impact
     - Mitigation actions
  
  4. Risks
     - New risks identified
     - Status of known risks
  
  5. Next Week Plans
     - Upcoming tasks
     - Key deliverables
     - Decisions needed
  
  6. Budget Status
     - Spent to date
     - Forecast
     - Variance
  
  7. Timeline Status
     - On track / at risk / delayed
     - Schedule variance
```

**Частота:** Weekly (каждую пятницу)  
**Time:** 3-4 часа вручную  
**С AI:** 10-15 минут (автогенерация + review)

**Аудитория:**
- Client
- Internal stakeholders
- Team (для transparency)

---

#### Monthly Status Report
**Более comprehensive:**
- Month in review
- Trend analysis
- Deeper insights
- Budget reconciliation
- Photos/screenshots
- Next month forecast

**Частота:** Monthly  
**Time:** 6-8 часов вручную  
**С AI:** 30-45 минут

---

### 2.5. Risk Register
**Назначение:** Tracking и управление рисками

**Структура:**
```yaml
Risk Entry:
  id: RISK-001
  description: "Специалист может уйти на больничный"
  category: Resource
  probability: Medium (50%)
  impact: High (timeline delay 1-2 weeks)
  risk_score: 7.5/10
  
  mitigation:
    strategy: "Cross-training второго специалиста"
    owner: PM
    status: In Progress
  
  contingency:
    plan: "Найм external contractor"
    cost: 150k руб
  
  status: Active
  last_updated: 2025-10-23
```

**Частота:** Создается в начале, обновляется weekly  
**Tool:** Excel, Google Sheets, или MRM AI

---

### 2.6. Change Request Log
**Назначение:** Tracking изменений в scope

**Структура:**
```yaml
Change Request:
  id: CR-001
  date: 2025-10-23
  requestor: Client
  description: "Добавить YouTube в медиаплан"
  
  impact_analysis:
    timeline: +2 weeks
    budget: +200k руб
    resources: +1 specialist (part-time)
    risks: Может повлиять на основные каналы
  
  decision: Approved with conditions
  approver: Client + PM
  implementation_date: 2025-11-01
  
  notes: "Убрали Telegram для компенсации бюджета"
```

**Частота:** As needed (обычно 2-5 за проект)  
**Process:** Request → Analysis → Decision → Implementation

---

### 2.7. Decision Log
**Назначение:** Документирование ключевых решений

**Почему важно:**
- ✅ Transparency
- ✅ Accountability
- ✅ Reference для будущего
- ✅ Защита от "а мы так не договаривались"

**Структура:**
```yaml
Decision:
  id: DEC-001
  date: 2025-10-23
  decision: "Использовать VK вместо Facebook для таргета"
  
  context: "Facebook ограничения в РФ"
  alternatives_considered:
    - Facebook (не feasible)
    - Telegram (дороже)
    - VK (выбрано)
  
  decision_maker: PM + Client
  rationale: "VK лучшее coverage в РФ при адекватном CPM"
  
  impacted_stakeholders: Specialist, Analyst
  communication: Email to team, updated in plan
```

**Tool:** Google Docs, Confluence, или MRM AI

---

### 2.8. Meeting Minutes
**Назначение:** Фиксация обсуждений и договоренностей

**Шаблон:**
```markdown
# Meeting Minutes

**Date:** 2025-10-23
**Attendees:** PM, Client CEO, Marketing Director
**Duration:** 1 hour
**Location:** Zoom

## Agenda
1. Review media plan
2. Discuss budget allocation
3. Next steps

## Discussion Summary
[Key points discussed]

## Decisions Made
1. ✅ Approve media plan v2
2. ✅ Increase budget by 20%

## Action Items
- [ ] [PM] Update plan - Due: Oct 25
- [ ] [Account] Send contract - Due: Oct 24
- [ ] [Specialist] Start setup - Due: Oct 27

## Open Questions
- Creative guidelines for new channels?

## Next Meeting
Oct 30, 2025, 10:00 AM
```

**Частота:** After every meeting  
**Time:** 30-60 минут вручную  
**С AI:** 5-10 минут (автогенерация из recording)

---

## 3. ИСПОЛЬЗУЕМЫЕ PM АРТЕФАКТЫ

### [Media Plan](../../02_ARTIFACTS/Media_Plan/)
**Откуда:** Specialist  
**PM действия:**
- ✅ Review и validation
- ✅ Проверка budget alignment
- ✅ Финальное approve перед клиентом
- ✅ Tracking execution

→ См. [02_ARTIFACTS/Media_Plan/](../../02_ARTIFACTS/Media_Plan/)

---

### [Campaign Reports](../../02_ARTIFACTS/Campaign_Report/)
**Откуда:** Specialist + Analyst  
**PM действия:**
- ✅ Review качества
- ✅ Анализ insights
- ✅ Презентация клиенту
- ✅ Follow-up actions

→ См. [02_ARTIFACTS/Campaign_Report/](../../02_ARTIFACTS/Campaign_Report/)

---

### [Technical Specification](../../02_ARTIFACTS/Technical_Specification/)
**Откуда:** Specialist  
**PM действия:**
- ✅ Review completeness
- ✅ Проверка alignment с планом
- ✅ Approve для execution
- ✅ QA checklist

→ См. [02_ARTIFACTS/Technical_Specification/](../../02_ARTIFACTS/Technical_Specification/)

---

## 4. АРХИВНЫЕ АРТЕФАКТЫ

### 4.1. Lessons Learned Document
**Назначение:** Continuous improvement

**Создается:** В конце проекта  
**Содержание:**
```yaml
Sections:
  1. Project Summary
  2. What Went Well
     - Successes
     - Best practices
     - Efficient processes
  
  3. What Could Be Improved
     - Challenges faced
     - Bottlenecks
     - Mistakes made
  
  4. Key Learnings
     - Technical insights
     - Process improvements
     - Team dynamics
  
  5. Recommendations
     - For future projects
     - For the team
     - For the organization
  
  6. Actionable Items
     - Process changes
     - Tool improvements
     - Training needs
```

**Audience:** PM team, organization  
**Storage:** Knowledge base, MRM AI

---

### 4.2. Project Closure Report
**Назначение:** Formal project end

**Содержание:**
- Final results vs objectives
- Budget final (spent vs planned)
- Timeline final (actual vs planned)
- Quality assessment
- Client satisfaction score
- Team feedback
- ROI calculation

**Частота:** Once at project end  
**Time:** 4-6 часов  
**С AI:** 1-2 часа (автосбор данных + генерация)

---

## 📊 Матрица артефактов по фазам

| Фаза | Создает PM | Использует PM | Approves PM |
|------|-----------|---------------|-------------|
| **Kickoff** | Project Charter, RACI, Plan | Brief | - |
| **Strategy** | - | Strategy Doc | Strategy |
| **Planning** | Timeline, Budget, Risk Register | Media Plan draft | Media Plan |
| **Execution** | Status Reports, Meeting Minutes | Technical Spec | Technical Spec |
| **Monitoring** | Change Requests, Decision Log | Campaign Reports | - |
| **Closeout** | Closure Report, Lessons Learned | Final Deliverables | All final |

---

## 💾 Хранение и версионирование

### Структура папок:
```
/Project_[Client]_[Name]/
  /01_Initiation/
    - Project_Charter_v1.0.pdf
    - RACI_Matrix.xlsx
  
  /02_Planning/
    - Project_Plan_v2.1.xlsx
    - Risk_Register.xlsx
    - Budget_Plan.xlsx
  
  /03_Execution/
    /Status_Reports/
      - 2025-10-W42_Status.pdf
      - 2025-10-W43_Status.pdf
    /Meeting_Minutes/
    /Change_Requests/
  
  /04_Monitoring/
    - Decision_Log.xlsx
  
  /05_Closeout/
    - Final_Report.pdf
    - Lessons_Learned.pdf
  
  /Archive/
```

### Версионирование:
- v1.0 - Major version (significant changes)
- v1.1 - Minor version (small updates)
- Draft/Final labels

---

## 🤖 AI помощь с артефактами

**MRM AI может:**
- ✅ Автогенерировать большинство артефактов
- ✅ Собирать данные из разных источников
- ✅ Версионирование и tracking изменений
- ✅ Напоминания о deadlines
- ✅ Шаблоны для всех типов документов
- ✅ Автоархивация

**Экономия:** 15-20 часов/месяц на документацию

---

## 🔗 Связанные документы

- [Role_Description.md](./Role_Description.md) - Роль PM
- [Functions.md](./Functions.md) - Функции PM
- [02_ARTIFACTS/](../../02_ARTIFACTS/) - Все артефакты детально
- [05_PROCESSES/](../../05_PROCESSES/) - Процессы создания артефактов

---

**Версия:** 1.0 | **Дата:** 2025-10-23 | **Статус:** ✅ Завершено

