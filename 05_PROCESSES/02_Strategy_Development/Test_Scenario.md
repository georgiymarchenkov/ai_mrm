---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: process
title: 02_Strategy_Development - Test Scenario
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: 05_PROCESSES/02_Strategy_Development/Test_Scenario.md
effective_date: 2025-10-24
visibility: internal
security_level: medium
tags: [process, 02_strategy_development, test_scenario]
---

# 02_Strategy_Development - Test Scenario

→ [Overview](./Overview.md) | [Steps](./Process_Steps.md) | [Roles](./Roles_Responsibilities.md) | [Data](./Data_IO.md)

**Кейс:** Застройщик "СтройГрупп" - разработка стратегии для 3 ЖК

---

## TEST CASE: STRATEGY-TC-001

**Input:** Brief approved (BRF-2025-001)  
**Expected Output:** Strategy approved, team ready to execute

---

## TEST STEPS

### STEP 1: Research

**Action:** Strategist + Analyst conduct research
```
1. Market analysis для 3 городов
2. Competitive analysis (identify 5-7 competitors)
3. Benchmarks (CPL, conversion rates)
```

**Expected:**
```
✓ Market insights documented
✓ Competitors mapped (positioning, budgets)
✓ Benchmarks: CPL Moscow 1500-2500₽, SPB 800-1500₽, Kazan 500-800₽
```

**Verify:** [ ] Research report complete

---

### STEP 2: Positioning

**Action:** Strategist creates positioning for each ЖК
```
Солнечный: "Премиум-комфорт в сердце города"
  - Target: Families 35-50, high income
  - USP: Metro 5min, center, quality
  - Differentiation vs "Садовые кварталы": Closer to metro

Морской: "Дом с видом на счастье"
  - Target: Young families 28-40
  - USP: Sea view, nature, modern
  
Лесной: "Доступное качество у леса"
  - Target: First-time buyers 25-35
  - USP: Price, ecology, accessibility
```

**Expected:**
```
✓ 3 distinct positionings
✓ Each has: target, USP, differentiation
✓ Brand personality defined
```

**Verify:** [ ] Positionings clear and differentiated

---

### STEP 3: Channel Strategy

**Action:** Workshop с Specialists

**Context Specialist presents:**
```
Channel: Yandex + Google
Budget recommendation: 6M₽ (40%)
Expected: 5000 leads, CPL 1200₽
Role: Primary conversion driver
```

**Programmatic Specialist:**
```
Budget: 3.5M₽ (23%)
Expected: 5M reach, 1500 leads
Role: Awareness
```

**(Similarly for other channels)**

**Strategist synthesizes:**
```
Total: 15M₽
Channels: 6 (Context 40%, Programmatic 23%, SMM 13%, etc.)
Expected leads: 9000
Avg CPL: 1667₽
```

**Expected:**
```
✓ Channel mix justified
✓ Budget allocated by: city, product, channel
✓ Expected results realistic
```

**Verify:** [ ] Budget model balanced and realistic

---

### STEP 4: Creative Concept

**Action:** Creative develops concepts
```
Солнечный: "Свет в центре города"
  - Visual: Warm gold, premium
  - Key message: "Ваш статус заслуживает центра"
  - Formats: Static, Carousel, Video

(Similarly for Морской and Лесной)
```

**Expected:**
```
✓ 3 creative concepts aligned with positioning
✓ Visual direction clear
✓ Messaging framework defined
```

**Verify:** [ ] Creative concepts approved

---

### STEP 5: KPIs

**Action:** Define KPIs at 4 levels
```
Business: 120 sales, ROMI >3x
Marketing: 9000 leads, CPL <1667₽
Channel: Context 5000 leads CPL 1200₽, etc.
Campaign: Per ЖК targets
```

**Expected:**
```
✓ KPIs measurable
✓ Targets realistic
✓ Dashboard structure defined
```

**Verify:** [ ] KPIs clear and measurable

---

### STEP 6: Document Creation

**Action:** Strategist compiles document
```
1. AI generates Executive Summary
2. All sections compiled (30 pages)
3. Visualizations created
4. Presentation deck (28 slides)
5. Quality check passed
```

**Expected:**
```
✓ Document complete (25-35 pages)
✓ Presentation ready (25-30 slides)
✓ Professional quality
```

**Verify:** [ ] Document ready to present

---

### STEP 7: Presentation

**Action:** Present to client (90 min)
```
00-10: Brief recap
10-25: Positioning (3 ЖК)
25-40: Channel strategy
40-55: Creative concepts
55-70: Budget & KPIs
70-85: Q&A
85-90: Approval
```

**Expected:**
```
✓ Client understands strategy
✓ Questions answered
✓ Client approves
✓ Status: "Approved"
```

**Verify:** [ ] Client approval received

---

## VERIFICATION

```yaml
Strategy Quality:
  ✓ Positioning: 3 distinct, differentiated
  ✓ Channel mix: justified by data
  ✓ Budget: allocated logically
  ✓ Creative: aligned with positioning
  ✓ KPIs: measurable, realistic

Completeness:
  ✓ All sections filled
  ✓ No missing data
  ✓ Actionable

Timeline:
  Target: 5-10 дней
  Actual: [fill after test]
  
Approval:
  ✓ Client approved first time
  ✓ Team ready to execute
```

---

## PASS/FAIL

**PASS if:**
- ✅ Strategy complete and approved
- ✅ Timeline ≤10 дней
- ✅ Team confirms "ready to execute"
- ✅ Client satisfaction >4/5

**FAIL if:**
- ❌ Strategy incomplete
- ❌ Client not approved
- ❌ Timeline >12 дней

---

**Test Status:** ✅ READY

---

**Версия:** 2.1 | **Строк:** 140 | **Статус:** ✅


