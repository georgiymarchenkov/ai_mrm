---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: process
title: 03_Media_Planning - Test Scenario
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: 05_PROCESSES/03_Media_Planning/Test_Scenario.md
effective_date: 2025-10-24
visibility: internal
security_level: medium
tags: [process, 03_media_planning, test_scenario]
---

# 03_Media_Planning - Test Scenario

→ [Overview](./Overview.md) | [Steps](./Process_Steps.md) | [Roles](./Roles_Responsibilities.md) | [Data](./Data_IO.md)

**Кейс:** Создать медиаплан для 3 ЖК, 15М₽

---

## TEST CASE: MP-TC-001

**Input:** Strategy approved (STR-2025-001)  
**Output:** Media Plan approved (100-150 lines)

---

## TEST STEPS

### STEP 1: Specialists Plan

**Action:** Each Specialist creates their lines

**Context Specialist (6M₽):**
```
Creates 45 lines:
  - Yandex: 25 lines (Search, RSA, by city/product)
  - Google: 20 lines (Search, Display)
Total: 6M₽
```

**Programmatic (3.5M₽):** Creates 18 lines  
**SMM (2M₽):** Creates 12 lines  
**(etc for all channels)**

**Expected:**
```
✓ Total lines: ~142
✓ Total budget: 15M₽
```

**Verify:** [ ] All Specialists created their lines

---

### STEP 2: Negotiations

**Action:** Specialists get benchmarks

**Context calls Yandex:**
```
Request: CPC estimate for "квартиры москва центр"
Response: CPC 120-180₽, forecast 50k impressions/day
Update line MP-001: CPC 120₽, expected clicks 4200
```

**Expected:**
```
✓ Benchmarks получены для всех main lines
✓ Lines updated with real data
```

**Verify:** [ ] Estimates realistic

---

### STEP 3: Internal Review

**Action:** PM checks

```
Check 1: Sum = 15M? ✓ 14.98M (98.9%, acceptable)
Check 2: Duplicates? ✓ None
Check 3: All fields filled? ✓ Yes
```

**Expected:** ✓ Validation passed

**Verify:** [ ] No errors

---

### STEP 4: Line-by-Line

**Action:** Review meeting

```
PM: "Line MP-015: Google Display 300k - why?"
Specialist: "Minimum budget for quality inventory"
PM: "OK, approved"

(Review 10-15 key lines, not all 142)
```

**Expected:** ✓ Key lines justified

**Verify:** [ ] Team aligned

---

### STEP 5: Client Presentation

**Action:** Account presents

```
Summary:
  - Total: 15M₽
  - By channel: Context 40%, Programmatic 23%, etc.
  - Expected: 9000 leads, avg CPL 1667₽

Client: "Approved"
```

**Expected:** ✓ Client approved

**Verify:** [ ] Approval received

---

## VERIFICATION

```yaml
Media Plan Quality:
  ✓ 142 lines created
  ✓ Budget 14.98M (98.9% of plan)
  ✓ Expected leads: 9000
  ✓ All lines realistic

Timeline:
  Target: 5-7 дней
  Actual: [fill]

Approval:
  ✓ Client approved
```

---

## PASS/FAIL

**PASS:** Plan approved, budget ±5%, timeline ≤7 days  
**FAIL:** Not approved OR budget off >5% OR timeline >10 days

---

**Версия:** 2.1 | **Строк:** 95 | **Статус:** ✅


