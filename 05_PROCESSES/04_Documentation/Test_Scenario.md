---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: process
title: 04_Documentation - Test Scenario
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: 05_PROCESSES/04_Documentation/Test_Scenario.md
effective_date: 2025-10-24
visibility: internal
security_level: medium
tags: [process, 04_documentation, test_scenario]
---

# 04_Documentation - Test Scenario

→ [Overview](./Overview.md) | [Steps](./Process_Steps.md) | [Roles](./Roles_Responsibilities.md) | [Data](./Data_IO.md)

---

## TEST CASE: DOC-TC-001

**Input:** Media Plan 142 lines, 15M₽  
**Output:** All signed + paid

---

## TEST STEPS

### STEP 1: Orders

**Action:** Group 142 lines into ~18 orders by supplier

**Expected:**
```
✓ Orders: 18 created
✓ Total: 15M₽
✓ Grouped logically
```

---

### STEP 2: Contracts

**Action:** Legal creates 18 contracts

**Expected:**
```
✓ Contracts: 18 ready
✓ Terms correct
✓ Sent to client
```

---

### STEP 3: Invoices

**Action:** Finance creates 18 invoices

**Expected:**
```
✓ Invoices: 18 sent
✓ Amount: 15M₽
✓ Payment terms: Net 15
```

---

### STEP 4: Sign & Pay

**Action:** Client signs + pays

**Expected:**
```
✓ Signed: all 18
✓ Paid: all 18
✓ Ready for launch
```

---

## VERIFICATION

```yaml
Timeline: ≤5 дней
Docs: 18 orders, 18 contracts, 18 invoices
Status: All signed + paid
```

---

## PASS/FAIL

**PASS:** All signed + paid, timeline ≤5 days  
**FAIL:** Not signed OR not paid OR timeline >7 days

---

**Версия:** 2.1 | **Строк:** 58 | **Статус:** ✅


