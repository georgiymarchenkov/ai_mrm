---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: process
title: 01_Briefing - Process Steps
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: 05_PROCESSES/01_Briefing/Process_Steps.md
effective_date: 2025-10-24
visibility: internal
security_level: medium
tags: [process, 01_briefing, process_steps]
---

# 01_Briefing - Process Steps

→ [Overview](./Overview.md) | [Roles](./Roles_Responsibilities.md) | [Data](./Data_IO.md) | [Test](./Test_Scenario.md)

---

## 📋 ПОШАГОВЫЙ ПРОЦЕСС

### STEP 1: Project Creation (30 мин)

**Кто:** Account Manager

**Действия:**
1. Создать проект в MRM
   - Input: Client name, Budget estimate, Timeline
   - Select template: по industry (Real Estate, Retail, etc.)
2. System auto-creates:
   - Brief form (пустой, готовый к заполнению)
   - Project structure (folders, team)
   - Timeline template
3. Generate brief URL
4. Send email to client с ссылкой

**Результат:** Brief URL sent to client

**Инструменты:** MRM Platform

---

### STEP 2: Client Initial Fill (1-2 часа для client)

**Кто:** Client

**Действия:**
1. Open brief URL
2. Fill базовую информацию (30-60%):
   - Company info
   - Products/Services
   - Budget & Timeline
   - Goals (high-level)
3. Save & notify Account

**Результат:** Brief 30-60% complete

**Инструменты:** Brief form (web or telegram bot)

**Примечание:** Клиент заполняет сколько может, остальное - через звонки

---

### STEP 3: Briefing Call (1 час)

**Кто:** Account Manager + Client

**Действия:**
1. Account schedules call
2. During call:
   - Go through brief sections
   - Ask clarifying questions
   - AI transcribes (optional)
   - Account takes notes в MRM
3. After call:
   - Account updates brief с collected info
   - Brief completeness → 60-70%

**Результат:** Brief 60-70% complete, key questions answered

**Инструменты:** Video call, MRM (notes), AI transcription

---

### STEP 4: Team Review (1-2 дня, parallel)

**Кто:** Strategist, Specialist, Analyst, Creative (параллельно)

**Действия каждой роли:**

**Strategist:**
- Review brief
- Identify missing strategic data
- Add questions to brief:
  - Positioning preferences?
  - Competitors details?
  - Customer journey data?

**Specialist (Context):**
- Review brief
- Add questions:
  - Keywords ideas?
  - Negative keywords?
  - Current campaigns data?
  - Landing pages ready?

**Analyst:**
- Review brief
- Add questions:
  - Analytics systems (IDs)?
  - CRM system?
  - Current tracking setup?
  - Access to accounts?

**Creative:**
- Review brief
- Add questions:
  - Brand guidelines?
  - Photo/video materials?
  - Previous creatives?
  - Tone of voice?

**Результат:** 20-40 вопросов added to brief

**Инструменты:** MRM Platform (comments/questions)

---

### STEP 5: Client Answers Questions (1 день)

**Кто:** Client (with Account help)

**Действия:**
1. Client receives questions (email notification)
2. Answers in brief form
3. Or Account calls client, gets answers, fills

**Результат:** Brief 80-90% complete

---

### STEP 6: Deep Dive Sessions (1 день, по необходимости)

**Кто:** Специфические роли + Client (1:1 calls)

**Если нужны детали:**

**Strategist + Client (30 мин):**
- Discuss positioning
- Clarify target audience
- Understand goals deeply

**Specialist + Client (30 мин):**
- Technical details
- Keywords discussion
- Landing pages review

**Analyst + Client (30 мин):**
- Verify tracking access
- Check analytics setup
- Discuss goals structure

**Результат:** Brief 90-95% complete

**Инструменты:** Calls, screen sharing

---

### STEP 7: Final Validation (2 часа)

**Кто:** PM + Account

**Действия:**
1. PM runs brief completeness check:
   - All mandatory fields filled
   - No conflicts в data
   - All roles confirmed readiness
2. Account reviews with client:
   - Show filled brief
   - Confirm accuracy
   - Get final approval
3. Brief status → "Approved"

**Результат:** Brief 95-98% complete, Approved

**Инструменты:** MRM validation tool

---

### STEP 8: Handoff to Strategy (15 мин)

**Кто:** Account → Strategist

**Действия:**
1. Account notifies Strategist
2. Brief transferred
3. Kickoff meeting scheduled
4. Process moves to Strategy Development

**Результат:** Process complete, next process started

---

## ⏱️ TIMELINE

```
Day 1:
  - Morning: Account creates project (30m)
  - Afternoon: Client fills brief (1h)
  - Evening: Brief 40% complete

Day 2:
  - Morning: Briefing call (1h)
  - Afternoon: Brief 65% complete
  - Evening: Team reviews, adds questions (2h)
  
Day 3:
  - Client answers questions
  - Brief 85% complete

Day 4 (if needed):
  - Deep dive sessions (1-2h total)
  - Brief 95% complete

Day 5:
  - Final validation (2h)
  - Client approval
  - ✅ DONE
```

---

## 🚨 ESCALATION

**If stuck:**
- Client not responding >2 days → Account escalates to PM → PM contacts client stakeholder
- Missing critical data → Can't proceed → Meeting required
- Technical access blocked → Specialist escalates → IT involvement

---

**Версия:** 2.1  
**Строк:** 149  
**Статус:** ✅ Готово


