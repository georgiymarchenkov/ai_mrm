---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: tool_doc
title: Media Planning Tools - Инструменты медиапланирования
language: ru
industry: advertising
role_apply: [specialist, strategist]
period: 2025-10
version: "1.0"
source_path: 03_TOOLS/Media_Planning_Tools/Overview.md
effective_date: 2025-10-24
visibility: internal
security_level: low
tags: [tool, media_planning, optimization]
---

# Media Planning Tools - Инструменты медиапланирования

→ [Tools](../_README.md)

---

## 🎯 Назначение

**Media Planning Tools** - инструменты для создания и оптимизации медиапланов.

**Включает:**
- [Shmatov Calculators](./Shmatov_Calculators/) - научное медиапланирование
- [Budget Optimizers](./Budget_Optimizers/) - оптимизация распределения бюджета

---

## 📊 Компоненты

### 1. Shmatov Calculators

**Цель:** Научно обоснованное медиапланирование

**Основатель:** Михаил Шматов (MediaGuru, Manzana Group)

**Методология:**
- Расчет эффективного охвата (3+ контакта)
- Оптимальная частота контакта
- Учет пересечений аудиторий
- ROI-ориентированное планирование

**Калькуляторы:**
- Reach Calculator - базовый расчет охвата
- Effective Reach Calculator - эффективный охват
- Cost Per Reach - стоимость охвата
- Group Reach - суммарный охват каналов
- Removal Effect - эффект сезонности

**Подробнее:** [Shmatov_Calculators/Overview.md](./Shmatov_Calculators/Overview.md)

---

### 2. Budget Optimizers

**Цель:** Оптимальное распределение бюджета между каналами

**Методы:**
- Linear Programming (LP) optimization
- Gradient Descent optimization
- Monte Carlo simulation
- Machine Learning models (future)

**Input:**
- Бюджет total
- Каналы (с историческими CPA/ROMI)
- Constraints (минимум/максимум по каналу)
- Goal (maximize Reach или minimize CPA)

**Output:**
- Оптимальное распределение бюджета
- Expected Reach/Conversions
- Sensitivity analysis

**Подробнее:** [Budget_Optimizers/Overview.md](./Budget_Optimizers/Overview.md)

---

## 🔄 Workflow

```
1. Strategist определяет цели кампании
   ↓
2. Specialist использует Shmatov Calculators
   - Рассчитывает reach goals
   - Определяет optimal frequency
   ↓
3. Budget Optimizer распределяет бюджет
   - По каналам
   - По неделям
   ↓
4. Specialist детализирует медиаплан
   - Форматы, площадки, креативы
   ↓
5. Validation через Scenario Planning Tool
   - What-if анализ
   ↓
6. Final Media Plan → утверждение PM/Client
```

---

## 🔗 Связанные инструменты

- [Reach Calculator](../Reach_Calculator/) - базовый расчет охвата
- [Effective Reach Calculator](../Effective_Reach_Calculator/) - эффективный охват
- [Scenario Planning Tool](../Scenario_Planning_Tool/) - what-if анализ
- [Analytics Tools](../Analytics_Tools/) - оценка результатов

---

## 👥 Используется ролями

- **Specialist** - основной пользователь (создание медиаплана)
- **Strategist** - стратегическое планирование (цели, бюджеты)
- **PM** - validation и approval
- **Analyst** - post-campaign analysis

---

## 📚 Материалы

### Книги и статьи
- М. Шматов "Подход к эффективному медиапланированию" ([PDF](../../Подход_к_эффективному_медиапланированию_1.pdf))
- М. Шматов "Теория вычисления охвата СМИ" ([PDF](../../teoriya-vychisleniya-ohvata-smi.pdf))

### Внутренние материалы
- [Effective_Media_Planning_Shmatov_Summary.md](../../Effective_Media_Planning_Shmatov_Summary.md) - детальное резюме методологии

---

**Версия:** 1.0  
**Статус:** ✅ Defined

