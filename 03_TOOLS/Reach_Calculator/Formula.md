---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: tool_doc
title: Reach Calculator - Формула
language: ru
industry: advertising
role_apply: [strategist, media_planner, analyst]
period: 2025-10
version: "2.1"
source_path: 03_TOOLS/Reach_Calculator/Formula.md
effective_date: 2025-10-24
visibility: internal
security_level: low
tags: [reach, formula, calculators, shmatov]
---

# Reach Calculator - Формула

→ [Overview](./Overview.md) | [Usage](./Usage.md) | [Examples](./Examples.md)

---

## 📐 БАЗОВАЯ ФОРМУЛА

```
Reach% = GRP / Frequency
```

Где:
- **Reach%** - охват аудитории (% от target audience)
- **GRP** - Gross Rating Points (сумма рейтингов всех размещений)
- **Frequency** - средняя частота контакта

---

## 🔬 РАСШИРЕННАЯ ФОРМУЛА

### Учет насыщения (Saturation Effect)

```
Reach% = 100 × (1 - e^(-GRP / 100))
```

Эта формула учитывает, что **охват растет нелинейно** - каждый следующий GRP добавляет меньше охвата.

---

## 📊 РАСПРЕДЕЛЕНИЕ ЧАСТОТЫ

### Binomial Distribution

```
P(k) = C(n,k) × p^k × (1-p)^(n-k)
```

Где:
- **P(k)** - вероятность k контактов
- **n** - максимум контактов
- **p** - reach% / 100
- **C(n,k)** - биномиальный коэффициент

---

## 🎯 EFFECTIVE REACH

Reach с учетом эффективной частоты:

```
Effective_Reach% = ∑(P(k)) для k >= k_effective
```

Где **k_effective** - минимальная эффективная частота (обычно 3-5).

---

## 📈 ПРИМЕР РАСЧЕТА

**Дано:**
- GRP = 200
- Target audience = 10,000,000 чел
- Frequency = 4.0

**Расчет:**
```
Reach% = 200 / 4.0 = 50%
Reach_absolute = 10,000,000 × 0.50 = 5,000,000 чел
```

**С учетом насыщения:**
```
Reach% = 100 × (1 - e^(-200/100))
       = 100 × (1 - e^(-2))
       = 100 × (1 - 0.135)
       = 86.5%
```

---

## 🔍 ФАКТОРЫ ВЛИЯНИЯ

1. **Пересечения аудиторий** - между площадками
2. **Частотность площадок** - разная audience duplication
3. **Временной фактор** - decay rate (забывание)
4. **Насыщение** - diminishing returns при высоком GRP

---

**Версия:** 2.1 | **Статус:** ✅


