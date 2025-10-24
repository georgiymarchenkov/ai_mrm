---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: artifact_doc
title: Project_Passport - Паспорт проекта
language: ru
industry: advertising
role_apply: [pm, all]
period: 2025-10
version: "1.0"
source_path: 02_ARTIFACTS/Project_Passport/README.md
effective_date: 2025-10-24
visibility: internal
security_level: high
tags: [project_passport, artifact, mvp, dashboard]
---

# 📂 Project_Passport - Паспорт проекта

> **Центр управления проектом:** Dashboard с KPI, timeline и ссылками на все артефакты

---

## 🎯 Назначение

Паспорт проекта — это центральный Dashboard, который агрегирует всю ключевую информацию о проекте: статус, бюджет, команду, KPI, timeline и ссылки на все артефакты.

**Ключевые функции:**
- 📊 Real-time Dashboard
- 💰 Budget tracking (план vs факт)
- 📈 KPI monitoring
- 👥 Team & Roles
- 📅 Timeline & Milestones
- 🔗 Links to all artifacts

---

## 📁 Содержимое

| Файл | Описание | Статус |
|------|----------|--------|
| [`Prototype_Specification.md`](./Prototype_Specification.md) | ТЗ на прототип Dashboard | ✅ 100% |
| `Data_Structure.md` | JSON Schema паспорта | ⏳ TODO |
| `UI_Components.md` | UI компоненты Dashboard | ⏳ TODO |
| `Auto_Update_Rules.md` | Правила автообновления | ⏳ TODO |

**Готовность:** 30% ⏳

---

## 🚀 Быстрый старт

### Создание паспорта
1. PM создает паспорт при старте проекта
2. Система автоматически заполняет данные из Brief
3. Добавляется команда и роли
4. Настраиваются KPI для мониторинга
5. Dashboard становится доступен всем участникам

### Структура Dashboard
- **Header:** Project name, Client, Status
- **KPIs:** Ключевые метрики (обновляются real-time)
- **Budget:** Total, Spent, Remaining (визуализация)
- **Timeline:** Milestones и дедлайны
- **Team:** Роли и ответственные
- **Artifacts Grid:** Ссылки на все артефакты со статусами

---

## 📊 Автоматическое обновление

### Данные обновляются автоматически
- ✅ **Budget:** Из Campaign_Report (spent tracking)
- ✅ **KPIs:** Из рекламных платформ (real-time)
- ✅ **Tasks:** Из Task Management (progress)
- ✅ **Timeline:** Из календаря и дедлайнов
- ✅ **Artifacts:** Статусы всех документов

**Частота обновления:** Каждые 15 минут или real-time для критичных метрик

**Экономия времени:** 10-15 часов/месяц (автоагрегация вместо ручных отчетов)

---

## 🔗 Связанные документы

### Создается из
- [`Brief`](../Brief/) - Базовая информация
- [`Commercial_Proposal`](../Commercial_Proposal/) - Бюджет
- Все остальные артефакты (ссылки и статусы)

### Используется всеми
- [Project Manager](../../01_ROLES/Project_Manager/) - Управление
- [Account Manager](../../01_ROLES/Account_Manager/) - Клиентская коммуникация
- [Client](../../01_ROLES/Client/) - Мониторинг прогресса
- [Team](../Team/) - Понимание статуса

---

## 👥 RACI

| Действие | PM | Account Mgr | Team | Client |
|----------|-----|-------------|------|--------|
| **Создание** | R/A | C | I | I |
| **Обновление** | R | C | I | I |
| **Мониторинг** | R | R | R | R |

---

## 💡 Best Practices

- 💡 **Единая точка правды:** Вся информация в одном месте
- 💡 **Real-time доступ:** Клиент видит прогресс без запросов
- 💡 **Автоматизация:** Минимум ручной работы
- ⚠️ **Важно:** Настройте KPI tracking с самого начала

---

**Версия:** 1.0  
**Готовность:** 30%  
**Приоритет:** 🔴 P0 MVP

