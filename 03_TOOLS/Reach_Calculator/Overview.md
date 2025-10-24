---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: tool_doc
title: Reach Calculator - Калькулятор охвата
language: ru
industry: advertising
role_apply: [strategist, media_planner, analyst]
period: 2025-10
version: "2.1"
source_path: 03_TOOLS/Reach_Calculator/Overview.md
effective_date: 2025-10-24
visibility: internal
security_level: low
tags: [reach, calculators, shmatov]
---

# Reach Calculator - Калькулятор охвата

→ [Tools](../_README.md) | [Formula](./Formula.md) | [Usage](./Usage.md) | [Examples](./Examples.md)

---

## 🎯 НАЗНАЧЕНИЕ

**Калькулятор охвата (Reach Calculator)** - рассчитывает общий охват рекламной кампании с учетом частоты и пересечений.

---

## 📊 ЧТО СЧИТАЕТ

```
Reach = f(GRP, Frequency)
```

Зная **GRP** и **среднюю частоту контакта**, можно рассчитать **охват** аудитории.

---

## 📋 МЕТОДОЛОГИЯ

Основано на методологии Шматова (Effective Media Planning).

**Базовая формула:**
```
Reach% = GRP / Frequency
```

**Реальность сложнее:**
- Учет пересечений аудиторий
- Распределение частоты контактов
- Насыщение охвата (diminishing returns)

---

## 🔧 ВХОДНЫЕ ДАННЫЕ

```yaml
GRP: Gross Rating Points (сумма рейтингов)
Frequency: Средняя частота контакта
Distribution: Распределение частоты (optional)
```

---

## 📈 ВЫХОДНЫЕ ДАННЫЕ

```yaml
Reach%: Охват аудитории (%)
Reach_absolute: Охват (чел)
Frequency_distribution: Распределение по частоте [1+, 2+, 3+, ...]
```

---

## 👥 РОЛИ

| Роль | Использование |
|------|---------------|
| **Strategist** | Планирование reach goals |
| **Specialist** | Расчет охвата по каналам |
| **Analyst** | Анализ фактического reach |

---

## 🔗 СВЯЗИ

**Процессы:**  
→ [02_Strategy_Development](../../05_PROCESSES/02_Strategy_Development/Overview.md)  
→ [03_Media_Planning](../../05_PROCESSES/03_Media_Planning/Overview.md)

**Другие калькуляторы:**  
→ [Effective_Reach_Calculator](../Effective_Reach_Calculator/Overview.md)  
→ [Cost_Of_Reach_Calculator](../Cost_Of_Reach_Calculator/Overview.md)

---

**Версия:** 2.1 | **Статус:** ✅


