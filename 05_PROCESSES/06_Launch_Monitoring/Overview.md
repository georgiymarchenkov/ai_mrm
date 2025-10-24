---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: process
title: 06_Launch_Monitoring - Overview
language: ru
industry: advertising
role_apply: [specialist, analyst, pm]
period: 2025-10
version: "1.0"
source_path: 05_PROCESSES/06_Launch_Monitoring/Overview.md
effective_date: 2025-10-24
visibility: internal
security_level: medium
tags: [launch, monitoring, process]
---

# 06_Launch_Monitoring - Overview

→ [Processes](../_README.md) | [Steps](./Process_Steps.md) | [Roles](./Roles_Responsibilities.md) | [Data](./Data_IO.md) | [Test](./Test_Scenario.md)

---

## 🎯 ЦЕЛЬ

Запустить кампании и собирать данные в реальном времени через API коннекторы.

---

## ⚡ ТРИГГЕРЫ

**Старт:** Campaigns ready  
**Завершение:** Ongoing (continuous)

---

## 📊 ПАРАМЕТРЫ

```yaml
Длительность: Ongoing (24/7)
Кампаний: 142 live
API коннекторов: 10+ (Yandex, Google, VK, Metrica, GA4, CRM)
Обновление данных: каждые 1-4 часа
```

---

## 🔄 ПРОЦЕСС

```
1. Launch (1д) → Activate 142 campaigns
2. Data Collection (ongoing) → API connectors pull data
3. Real-time Dashboards (ongoing) → Show metrics
4. Daily Reports (automated) → Email/Telegram
5. Issue Response (as needed) → Fix problems
```

---

## 📁 ВХОДЫ / ВЫХОДЫ

**IN:** Campaigns configured  
**OUT:** Campaign data stream, Reports

---

## 👥 УЧАСТНИКИ

| Роль | Time |
|------|------|
| **Specialists** | 5-8ч (launch + monitor) |
| **Analyst** | 10-15ч/week (dashboards) |
| **PM** | 2-3ч/week (review) |

---

## ✅ КРИТЕРИИ

- ☑ All 142 campaigns live
- ☑ Data flowing (API connectors work)
- ☑ Dashboards working
- ☑ No critical issues

---

**Версия:** 2.1 | **Строк:** 56 | **Статус:** ✅
