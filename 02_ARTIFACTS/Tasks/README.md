---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: artifact_doc
title: Tasks - Задачи команды
language: ru
industry: advertising
role_apply: [pm, all]
period: 2025-10
version: "1.0"
source_path: 02_ARTIFACTS/Tasks/README.md
effective_date: 2025-10-24
visibility: internal
security_level: medium
tags: [tasks, artifact, mvp, project_management]
---

# ✅ Tasks - Задачи команды

> **Управление задачами:** Kanban board, workflow, time tracking

**Назначение:** Система управления задачами проекта с автогенерацией из процессов, RACI матрицами, зависимостями и time tracking.

**Готовность:** 5% 📝 | **Приоритет:** 🔴 P0 MVP

---

## 📁 Содержимое

- `Data_Structure.md` ⏳ TODO
- `Workflow_States.md` ⏳ TODO  
- `Auto_Generation_Rules.md` ⏳ TODO
- `Integrations.md` ⏳ TODO (Jira, Asana, ClickUp)

---

## ⚙️ Ключевые возможности

### Автогенерация задач
- ✅ Из шаблонов процессов
- ✅ На основе RACI матриц
- ✅ С учетом зависимостей
- ✅ Автоназначение исполнителей

### Tracking
- Priority (P0-P3)
- Status (Todo, In Progress, Done, Blocked)
- Time estimates & logged hours
- Dependencies & blockers

**Экономия времени:** 5-8 часов/неделю (автосоздание задач)

---

## 🔗 Интеграции

- [Jira](../../07_INTEGRATIONS/) - Двусторонняя синхронизация
- [Asana](../../07_INTEGRATIONS/) - Import/Export
- [Slack](../../07_INTEGRATIONS/) - Уведомления
- [Telegram Bot](../../07_INTEGRATIONS/Telegram_Bot/) - Quick updates

---

## 👥 RACI

| Действие | PM | Team | All |
|----------|-----|------|-----|
| **Создание** | R/A | C | I |
| **Выполнение** | C | R | R |
| **Monitoring** | R | R | R |

