---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: assistant_spec
title: PM Assistant - AI-ассистент для Project Manager
language: ru
industry: advertising
role_apply: [pm]
period: 2025-10
version: "1.0"
source_path: 06_AI_ASSISTANTS/PM_Assistant/Overview.md
effective_date: 2025-10-24
visibility: internal
security_level: low
tags: [ai_assistant, pm_assistant]
---

# PM Assistant - AI-ассистент для Project Manager

→ [AI Assistants](../_README.md)

## 🎯 НАЗНАЧЕНИЕ

AI-ассистент для Project Manager: мониторинг проектов, выявление bottlenecks, предложение решений.

---

## 🤖 ВОЗМОЖНОСТИ

### 1. Project Health Monitoring
- Анализирует состояние всех проектов
- Выявляет риски (delays, budget overrun)
- Alerts на critical issues

### 2. Bottleneck Detection
- Находит узкие места в процессах
- Определяет перегруженные роли
- Предлагает перераспределение задач

### 3. Resource Optimization
- Анализирует загрузку команды
- Предлагает оптимальное распределение
- Прогнозирует capacity planning

### 4. Reporting Automation
- Генерирует executive summaries
- Создает client reports
- Формирует team updates

---

## 💬 ПРИМЕРЫ ВЗАИМОДЕЙСТВИЯ

**PM:** "Какие проекты в зоне риска?"  
**AI:** "3 проекта с delays: Проект A (5 дней delay), Проект B (budget +15%), Проект C (3 overdue tasks)"

**PM:** "Где bottleneck в Проекте A?"  
**AI:** "Bottleneck: Creative роль. 12 tasks pending, avg wait time 3.5 дня. Рекомендация: привлечь freelance креатора"

---

## 🔧 ТЕХНОЛОГИИ

- **LLM:** Claude 3.5 Sonnet
- **Context:** Project data, team workload, historical patterns
- **Tools:** Project API, Analytics API, Team API

---

## 📊 МЕТРИКИ

```yaml
Time saved: 15h/week (reporting + monitoring)
Bottleneck detection: 90% accuracy
Risk prediction: 85% accuracy
User satisfaction: 4.5/5
```

---

**Версия:** 2.1 | **Статус:** ✅


