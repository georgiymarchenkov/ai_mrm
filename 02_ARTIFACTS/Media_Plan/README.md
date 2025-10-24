---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: artifact_doc
title: Media_Plan - Медиаплан
language: ru
industry: advertising
role_apply: [specialist, strategist, pm]
period: 2025-10
version: "1.0"
source_path: 02_ARTIFACTS/Media_Plan/README.md
effective_date: 2025-10-24
visibility: internal
security_level: medium
tags: [media_plan, artifact, mvp]
---

# 📊 Media_Plan - Медиаплан

> **Распределение бюджета по каналам:** Оптимальная стратегия размещения рекламы

---

## 🎯 Назначение

Медиаплан — это детальный план распределения рекламного бюджета по каналам, площадкам и временным периодам. Включает прогнозы охвата, частоты, GRP и ожидаемых результатов.

**Ключевые функции:**
- 💰 Оптимальное распределение бюджета
- 📅 Flight schedule (календарь размещений)
- 📊 Прогноз охвата и частоты
- 🎯 CPM/CPC/CPA расчеты
- 🔄 Что-если сценарии

---

## 📁 Содержимое

| Файл | Описание | Статус |
|------|----------|--------|
| [`Data_Structure.md`](./Data_Structure.md) | JSON Schema медиаплана | ✅ 100% |
| [`Platform_Field_Compatibility_Matrix.md`](./Platform_Field_Compatibility_Matrix.md) | Соответствие полей и платформ | ✅ 100% |
| [`Prototype_Specification.md`](./Prototype_Specification.md) | ТЗ на прототип таблицы | ✅ 100% |
| [`Examples.md`](./Examples.md) | Примеры медиапланов | ⏳ 50% |
| `UI_Template_Sheets.md` | Google Sheets шаблон | ⏳ TODO |
| `AI_Optimization.md` | AI оптимизация бюджета | ⏳ TODO |

**Готовность:** 60% ✅

---

## 🚀 Быстрый старт

### Создание медиаплана
1. Получите утвержденный Brief и Strategy_Document
2. Определите каналы на основе стратегии
3. Используйте AI для первичного распределения бюджета
4. Настройте flight schedule
5. Запустите оптимизацию с учетом reach/frequency

### Работа с таблицей
- **12+ колонок:** Город, Бренд, Канал, Площадка, Формат, Период, Бюджет, CPM, Охват, Частота, GRP, Прогноз
- **Inline editing:** Изменяйте значения прямо в таблице
- **Auto-calculation:** Формулы рассчитываются автоматически
- **AI suggestions:** Предложения по оптимизации

---

## 💰 AI Оптимизация

### Автоматическое распределение бюджета
- ✅ На основе целей из Brief
- ✅ Исторические данные аналогичных кампаний
- ✅ Сезонность и тренды
- ✅ Пересечение аудиторий (deduplication)

### Оптимизация охвата
- ✅ Effective Reach расчеты
- ✅ Frequency capping рекомендации
- ✅ Optimal GRP distribution
- ✅ Cost of Reach optimization

**Экономия времени:** 6-10 часов → 2-3 часа (70%)

---

## 🔗 Связанные документы

### Создается из
- [`Brief`](../Brief/) - Бюджет и цели
- [`Strategy_Document`](../Strategy_Document/) - Выбор каналов

### Порождает
- [`Technical_Specification`](../Technical_Specification/) - ТЗ на запуск
- [`Campaign_Report`](../Campaign_Report/) - План vs факт сравнение

### Инструменты
- [Калькуляторы Шматова](../../03_TOOLS/Reach_Calculator/)
- [Медиаландшафт](../../04_PLATFORMS/MEDIA_LANDSCAPE/)
- [MMM модели](../../03_TOOLS/Econometrics_Tool/)

---

## 👥 RACI

| Действие | Specialist | Strategist | PM | Client |
|----------|-----------|------------|-----|--------|
| **Создание** | R | C | A | I |
| **Оптимизация** | R | C | C | I |
| **Утверждение** | I | C | R | A |

---

## 💡 Best Practices

- 💡 **Начните с AI:** Автооптимизация дает хорошую базу
- 💡 **Учитывайте пересечения:** Дедупликация аудиторий критична
- 💡 **Сохраняйте сценарии:** Что-если анализ помогает найти оптимум
- ⚠️ **Проверьте минимумы:** У платформ есть минимальные бюджеты

---

**Версия:** 1.0  
**Готовность:** 60%  
**Приоритет:** 🔴 P0 MVP

