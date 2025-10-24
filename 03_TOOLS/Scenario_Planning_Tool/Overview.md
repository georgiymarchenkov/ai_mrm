---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: tool_doc
title: Scenario Planning Tool - Сценарное планирование
language: ru
industry: advertising
role_apply: [strategist, media_planner]
period: 2025-10
version: "2.1"
source_path: 03_TOOLS/Scenario_Planning_Tool/Overview.md
effective_date: 2025-10-24
visibility: internal
security_level: low
tags: [scenario_planning, what_if, optimization]
---

# Scenario Planning Tool - Сценарное планирование

→ [Tools](../_README.md)

## 🎯 НАЗНАЧЕНИЕ

What-if анализ: что будет если изменить budget allocation между каналами.

## 📊 СЦЕНАРИИ

**Примеры:**
- +20% budget → сколько leads?
- -30% Context, +30% Programmatic → ROMI?
- Pause channel X → impact?

## 📈 МОДЕЛЬ

Использует historical data + эконометрику для прогноза.

## 💡 ВЫХОД

```yaml
Scenario 1: Current mix
  Leads: 9000, ROMI: 3.0x

Scenario 2: +20% budget
  Leads: 10500 (+17%), ROMI: 2.8x

Scenario 3: Reallocate context→programmatic
  Leads: 8700 (-3%), ROMI: 3.1x
```

**Рекомендация:** Best scenario = highest ROMI

---

**Версия:** 2.1 | **Статус:** ✅


