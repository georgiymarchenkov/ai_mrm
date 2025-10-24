---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: artifact_doc
title: RIM - Responsible, Informed Matrix
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: 02_ARTIFACTS/RIM/Overview.md
effective_date: 2025-10-24
visibility: internal
security_level: low
tags: [artifact, rim, responsibility, matrix]
---

# RIM - Responsible, Informed Matrix

→ [Artifacts](../_README.md)

---

## 🎯 Назначение

**RIM (Responsible, Informed Matrix)** - матрица ответственности для отслеживания кто за что отвечает в проекте.

**Аналог RACI**, но упрощенная версия с двумя ролями:
- **R (Responsible)** - кто выполняет задачу
- **I (Informed)** - кто должен знать о результате

---

## 📋 Структура RIM

### Формат

```yaml
Task: Создание медиаплана

Responsible:
  - Specialist (primary)
  - PM (approves)

Informed:
  - Account Manager
  - Client
  - Strategist

Deadline: 2025-10-25
Status: In Progress
```

### Matrix View

| Задача | Specialist | PM | Account | Client | Strategist |
|--------|------------|-----|---------|--------|-----------|
| Briefing | I | R | R | R | I |
| Strategy | I | I | I | I | R |
| Media Plan | R | I | I | I | I |
| Launch | R | R | I | I | - |
| Reporting | R | R | I | R | - |

---

## 🔄 Связь с RACI

RIM - упрощенная версия [RACI Matrix](../../01_ROLES/*/RACI_Matrix.md):

```
RACI → RIM mapping:
- R (Responsible) → R (Responsible)
- A (Accountable) → R (Responsible) 
- C (Consulted) → I (Informed)
- I (Informed) → I (Informed)
```

**Когда использовать RIM:**
- Простые проекты с небольшой командой
- Быстрое согласование ответственности
- Визуализация для клиента

**Когда использовать RACI:**
- Сложные проекты с многоуровневой структурой
- Нужна четкая accountability (кто принимает решение)
- Compliance требования

---

## 🔗 Связанные документы

- [RACI Matrix](../../01_ROLES/*/RACI_Matrix.md) - детальные матрицы по ролям
- [Project_Passport](../Project_Passport/) - команда проекта
- [Processes](../../05_PROCESSES/) - процессы с RACI/RIM

---

## 👥 Использование

**Создается:** PM в начале проекта  
**Обновляется:** При изменении команды или scope  
**Используется:** Всеми для понимания ответственности

---

**Версия:** 1.0  
**Статус:** ✅ Defined

