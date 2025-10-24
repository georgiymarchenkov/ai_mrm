---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: process
title: 06_Launch_Monitoring - Process Steps
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: 05_PROCESSES/06_Launch_Monitoring/Process_Steps.md
effective_date: 2025-10-24
visibility: internal
security_level: medium
tags: [process, 06_launch_monitoring, process_steps]
---

# 06_Launch_Monitoring - Process Steps

→ [Overview](./Overview.md) | [Roles](./Roles_Responsibilities.md) | [Data](./Data_IO.md) | [Test](./Test_Scenario.md)

---

## STEP 1: Launch (1 день)

**Кто:** Specialists

**Действия:**
1. Set campaigns status "live" (142 campaigns)
2. Monitor first hours (критично!)
3. Check: ads showing, clicks coming, leads flowing

**Результат:** All 142 live

---

## STEP 2: API Setup (1-2 дня)

**Кто:** Analyst

**Действия:**
1. Configure API connectors:
   - Ad platforms: Yandex Direct, Google Ads, VK, etc. (6-8)
   - Analytics: Yandex Metrica, GA4 (2)
   - CRM: Bitrix24 (1)
2. Test data flow
3. Schedule auto-updates (every 1-4 hours)

**Результат:** Data flowing into MRM

---

## STEP 3: Dashboards (2-3 дня)

**Кто:** Analyst

**Действия:**
1. Build dashboards:
   - Real-time overview (spend, leads, CPL)
   - By channel/city/product
   - Campaign-level details
2. Setup alerts (budget overspend, CPL too high, etc.)

**Результат:** Dashboards live

---

## STEP 4: Reports (automated)

**Кто:** System (AI)

**Действия:**
1. Daily report: Yesterday's results
2. Weekly summary: Week performance
3. Alerts: Issues detected

**Результат:** Automated reports sent

---

## STEP 5: Monitoring (ongoing)

**Кто:** Specialists + Analyst

**Действия:**
1. Check dashboards daily
2. Respond to alerts
3. Fix issues (pause bad campaigns, adjust bids, etc.)

**Результат:** Campaigns optimized

---

**Версия:** 2.1 | **Строк:** 62 | **Статус:** ✅


