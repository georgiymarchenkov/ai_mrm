---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: process
title: 05_Campaign_Preparation - Test Scenario
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: 05_PROCESSES/05_Campaign_Preparation/Test_Scenario.md
effective_date: 2025-10-24
visibility: internal
security_level: medium
tags: [process, 05_campaign_preparation, test_scenario]
---

# 05_Campaign_Preparation - Test Scenario

→ [Overview](./Overview.md) | [Steps](./Process_Steps.md) | [Roles](./Roles_Responsibilities.md) | [Data](./Data_IO.md)

---

## TEST CASE: PREP-TC-001

**Input:** Media Plan 142 lines  
**Output:** 142 campaigns ready + 240+ creatives

---

## TEST STEPS

### STEP 1: Creative Production

**Action:** Creative produces creatives

**Expected:**
```
✓ Text ads: 50+ variants (3 ЖК)
✓ Banners: 120+ (sizes/ЖК)
✓ Video: 15+ variants
✓ Carousel: 25+ ads
✓ Total: 240+ creatives
```

**Verify:** [ ] Creatives meet requirements, brand compliant

---

### STEP 2: Campaign Setup

**Action:** Specialists setup 142 campaigns

**Context (45 campaigns):**
```
✓ Yandex: 25 campaigns configured
✓ Google: 20 campaigns configured
✓ Creatives uploaded
✓ Tracking configured
```

**(Similarly for all channels)**

**Expected:** ✓ 142 campaigns status "ready"

**Verify:** [ ] All campaigns configured correctly

---

### STEP 3: QA

**Action:** Test sample (42 campaigns = 30%)

**Expected:**
```
✓ Tested: 42 campaigns
✓ Issues found: 8
✓ Issues fixed: 8
✓ Pass rate: 100%
```

**Verify:** [ ] QA passed

---

### STEP 4: Pre-Launch

**Action:** Final checklist

**Expected:**
```
✓ 142 campaigns ready
✓ Budgets correct
✓ Schedules set
✓ Approved for launch
```

---

## VERIFICATION

```yaml
Creatives: 240+
Campaigns: 142 ready
Timeline: ≤14 дней
QA: Passed
```

---

**PASS:** All ready, timeline ≤14 days  
**FAIL:** Not all ready OR timeline >20 days

---

**Версия:** 2.1 | **Строк:** 70 | **Статус:** ✅


