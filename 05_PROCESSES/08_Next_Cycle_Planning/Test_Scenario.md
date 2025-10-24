---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: process
title: 08_Next_Cycle_Planning - Test Scenario
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: 05_PROCESSES/08_Next_Cycle_Planning/Test_Scenario.md
effective_date: 2025-10-24
visibility: internal
security_level: medium
tags: [process, 08_next_cycle_planning, test_scenario]
---

# 08_Next_Cycle_Planning - Test Scenario

→ [Overview](./Overview.md) | [Steps](./Process_Steps.md) | [Roles](./Roles_Responsibilities.md) | [Data](./Data_IO.md)

---

## TEST CASE: CYCLE-TC-001

**Input:** Month 1 results (8200 leads, 98 sales)  
**Output:** Updated brief for Month 2

---

## TEST STEPS

### STEP 1: Results Review

**Action:** Compile results

**Expected:**
```
✓ Report: 8200 leads vs 9000 plan (91%)
✓ Sales: 98 vs 120 plan (82%)
✓ ROMI: 2.8x (target 3.0x)
✓ Top channel: Context (performed +15% vs plan)
✓ Worst: Banner Network X (-80% vs plan)
```

**Verify:** [ ] Results accurate

---

### STEP 2: Learnings

**Action:** Extract insights

**Expected:**
```
✓ Context advertising: Keep, increase budget
✓ Banner Network X: Remove completely
✓ Age 30-35: Strong performers, expand targeting
✓ Moscow: Overperformed, allocate more
✓ Video creatives: CTR +40% vs static
```

**Verify:** [ ] 8-12 actionable learnings

---

### STEP 3: Brief Update

**Action:** Update brief with learnings

**Expected:**
```
✓ Budget: 16M (was 15M)
✓ Context: +8% budget
✓ Banner removed
✓ Target age: [30, 50] (was [35, 55])
✓ KPIs: Leads 9500 (more realistic)
```

**Verify:** [ ] Brief updated logically

---

### STEP 4: Client Review

**Action:** Present to client

**Expected:**
```
✓ Client sees: results, learnings, recommendations
✓ Client approves updated brief
✓ Status: "Approved for Month 2"
✓ → Start Strategy Development for M2
```

**Verify:** [ ] Client approved

---

## VERIFICATION

```yaml
Results: Documented
Learnings: 12 extracted
Brief: Updated
Client: Approved
Next cycle: Started
```

---

**PASS:** Cycle complete, next started  
**FAIL:** Not approved OR learnings not applied

---

**Версия:** 2.1 | **Строк:** 72 | **Статус:** ✅


