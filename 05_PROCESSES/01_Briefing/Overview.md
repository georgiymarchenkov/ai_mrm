---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: process
title: 01_Briefing - Overview
language: ru
industry: advertising
role_apply: [account_manager, pm, client]
period: 2025-10
version: "1.0"
source_path: 05_PROCESSES/01_Briefing/Overview.md
effective_date: 2025-10-24
visibility: internal
security_level: medium
tags: [briefing, process, client]
---

# 01_Briefing - Overview

→ [Processes](../_README.md) | [Steps](./Process_Steps.md) | [Roles](./Roles_Responsibilities.md) | [Data](./Data_IO.md) | [Test](./Test_Scenario.md)

---

## 🎯 ЦЕЛЬ

Собрать **структурированные данные** для запуска рекламной кампании от всех участников процесса.

---

## ⚡ ТРИГГЕРЫ

**Старт:**
- Клиент готов запустить кампанию
- Договор подписан (или в процессе)
- Бюджет определен

**Завершение:**
- Brief completeness >95%
- Все роли подтвердили достаточность данных
- Client approved

---

## 📊 ОСНОВНЫЕ ПАРАМЕТРЫ

```yaml
Длительность: 2-5 дней
Участники: 6 ролей
Этапов: 4
Итераций: обычно 2-3
```

---

## 🔄 ПРОЦЕСС (кратко)

```
1. Account создает проект → отправляет brief client
2. Client заполняет brief (30-60%)
3. Account + Team дополняют через звонки/встречи
4. Client утверждает финальный brief
```

---

## 📁 ВХОДЫ / ВЫХОДЫ

**IN:**
- Client request
- Initial brief data
- Historical data (if exists)

**OUT:**
- **[Brief](../../02_ARTIFACTS/Brief/)** - Structured data (>95% complete)
- All roles confirmed readiness

---

## 👥 УЧАСТНИКИ

| Роль | Ответственность | Вклад |
|------|----------------|-------|
| **Account Manager** | Lead [R/A] | Координация, звонки, заполнение |
| **Strategist** | Reviewer [C] | Определяет требования к стратегии |
| **Specialist** | Reviewer [C] | Технические требования по каналам |
| **Analyst** | Reviewer [C] | Требования к tracking, analytics |
| **Creative** | Reviewer [C] | Brand materials, креативные требования |
| **PM** | Controller [I] | Мониторинг сроков |

---

## 🔧 ИНСТРУМЕНТЫ

- **MRM Platform:** Brief form (web/sheets/telegram)
- **AI Assistant:** Auto-fill, suggestions, validation
- **CRM:** Lead data, history
- **Communication:** Calls, emails, meetings

---

## 📈 МЕТРИКИ

```yaml
Time to Complete: <5 дней
Brief Completeness: >95%
Client Satisfaction: >4.5/5
First Time Right: >70%
```

---

## ⚠️ КРИТИЧНЫЕ ТОЧКИ

**Bottlenecks:**
- Client response time (ожидание ответов)
- Multiple stakeholders (разные мнения)
- Technical data (доступы к системам)

**Mitigation:**
- Четкие deadlines
- Single point of contact (client side)
- Checklist для technical data

---

## ✅ КРИТЕРИИ ГОТОВНОСТИ

Brief готов если:
- ☑ Все секции заполнены >90%
- ☑ Strategist: "Могу разработать стратегию"
- ☑ Specialist: "Могу спланировать кампании"
- ☑ Analyst: "Могу настроить tracking"
- ☑ Creative: "Могу создать креативы"
- ☑ Client: "Approved"

---

## 🔗 СВЯЗИ

**Предыдущий:** - (первый в lifecycle)  
**Следующий:** [02_Strategy_Development](../02_Strategy_Development/Overview.md)

**Артефакты:** [Brief](../../02_ARTIFACTS/Brief/)  
**Роли:** [Account](../../01_ROLES/Account_Manager/), [Strategist](../../01_ROLES/Strategist/)

---

**Версия:** 2.1  
**Строк:** 78  
**Статус:** ✅ Готово
