---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: process
title: 05_Campaign_Preparation - Overview
language: ru
industry: advertising
role_apply: [specialist, creative]
period: 2025-10
version: "1.0"
source_path: 05_PROCESSES/05_Campaign_Preparation/Overview.md
effective_date: 2025-10-24
visibility: internal
security_level: medium
tags: [campaign_preparation, process, launch]
---

# 05_Campaign_Preparation - Overview

→ [Processes](../_README.md) | [Steps](./Process_Steps.md) | [Roles](./Roles_Responsibilities.md) | [Data](./Data_IO.md) | [Test](./Test_Scenario.md)

---

## 🎯 ЦЕЛЬ

Подготовить **креативы** и **настроить кампании** в кабинетах площадок согласно медиаплану.

---

## ⚡ ТРИГГЕРЫ

**Старт:** Contracts signed  
**Завершение:** Campaigns configured, ready to launch

---

## 📊 ПАРАМЕТРЫ

```yaml
Длительность: 7-14 дней
Участники: Creative, Specialists
Креативов: 240+ вариантов
Кампаний: 142 (по строкам медиаплана)
```

---

## 🔄 ПРОЦЕСС

```
1. Creative Production (5-7д, parallel) → 240+ creatives
2. Campaign Setup (3-5д, parallel) → 142 campaigns
3. QA Testing (1-2д) → Check all
4. Pre-Launch Check (1д) → Final verify
```

---

## 📁 ВХОДЫ / ВЫХОДЫ

**IN:** [Media_Plan](../../02_ARTIFACTS/Media_Plan/) + [Creative_Concept](../../02_ARTIFACTS/Strategy_Document/)  
**OUT:** Campaigns configured (status: "Ready")

---

## 👥 УЧАСТНИКИ

| Роль | Time |
|------|------|
| **Creative** | 30-40ч |
| **Specialists** | 15-25ч each |
| **QA** | 8-12ч |

---

## ✅ КРИТЕРИИ

- ☑ All creatives produced (240+)
- ☑ All campaigns configured (142)
- ☑ QA passed
- ☑ Tracking setup

---

**Версия:** 2.1 | **Строк:** 58 | **Статус:** ✅
