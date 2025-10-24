---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: overview
title: 03_TOOLS - Руководство по работе с инструментами
language: ru
industry: advertising
role_apply: [specialist, analyst, media_planner, developer]
period: 2025-10
version: "1.0"
source_path: 03_TOOLS/_README.md
effective_date: 2025-10-24
visibility: internal
security_level: low
tags: [tools, calculators, shmatov, overview]
---

# 🔧 03_TOOLS - Руководство по работе

**Назначение:** Описание всех инструментов и калькуляторов MRM системы

---

## 📋 СОДЕРЖАНИЕ

### Калькуляторы Шматова (7):
1. **Media Calculators:**
   - Reach Calculator - Расчет охвата
   - Group Reach - Суммарный охват
   - Coverage Spectrum - Спектр покрытия
   - Effective Reach - Эффективный охват
   - Effective Placements - Эффективные размещения
   - Ad Silence Duration - Длительность рекламной тишины
   - Cost of Reach - Стоимость охвата

2. **Research Calculators:**
   - Sample Size - Размер выборки
   - Critical Sample Size - Критический размер
   - Measurement Error - Погрешность измерения

### Аналитические инструменты (5):
- Attribution Modeling - Атрибуция
- Media Mix Modeling (MMM) - Медиа микс
- Incrementality Testing - Инкрементальность
- Econometrics - Эконометрика
- A/B Testing Framework

### Прочие инструменты:
- UTM Builder
- Pixel Manager
- Budget Optimizer
- Campaign Planner

---

## 🎯 НАЗНАЧЕНИЕ ПАПКИ

### Для кого:
- 📊 **Специалисты** - использование калькуляторов
- 📈 **Аналитики** - математические модели
- 👨‍💻 **Разработчики** - реализация формул
- 🎓 **Обучение** - методология Шматова
- 📚 **Стратеги** - теория медиапланирования

### Что описывает:
- Формулы и алгоритмы
- Input/Output параметры
- UI интерфейсы
- Примеры расчетов
- API endpoints
- Научное обоснование

---

## 📁 СТРУКТУРА ИНСТРУМЕНТА

Каждый инструмент содержит **5 файлов:**

```
Tool_Name/
├── Theory.md                  [150-200 строк]
│   ├── Назначение и применение
│   ├── Научное обоснование
│   ├── Когда использовать
│   ├── Ограничения
│   └── Источники (Шматов и др.)
│
├── Formula.md                 [100-150 строк]
│   ├── Математическая формула
│   ├── Переменные и параметры
│   ├── Единицы измерения
│   ├── Примеры расчетов
│   └── Edge cases
│
├── UI_Implementation.md       [150-180 строк]
│   ├── Интерфейс калькулятора
│   ├── Input fields
│   ├── Output visualization
│   ├── Real-time calculation
│   └── Export results
│
├── API_Specification.md       [100-120 строк]
│   ├── Endpoint description
│   ├── Request schema
│   ├── Response schema
│   ├── Error handling
│   └── Rate limits
│
└── Examples.md                [120-150 строк]
    ├── 3-5 практических примеров
    ├── Step-by-step решение
    ├── Интерпретация результатов
    └── Common mistakes
```

**ИТОГО:** ~620-800 строк на инструмент

---

## 🔧 КАК РАБОТАТЬ С ИНСТРУМЕНТАМИ

### 1. ИЗУЧЕНИЕ ИНСТРУМЕНТА

**Последовательность:**
```
1. Theory.md          [10 мин] - Что это и зачем
2. Examples.md        [15 мин] - Как использовать
3. Formula.md         [10 мин] - Математика
4. UI_Implementation  [10 мин] - Интерфейс
5. API_Specification  [5 мин] - API (для dev)
```

**ИТОГО:** ~50 минут на инструмент

---

### 2. СОЗДАНИЕ НОВОГО ИНСТРУМЕНТА

**Чек-лист:**
```
☐ 1. Определить необходимость
   ☐ - Какую задачу решает?
   ☐ - Кто будет использовать?
   ☐ - Как часто?
   ☐ - Есть ли аналоги?
   
☐ 2. Изучить теорию
   ☐ - Научные источники
   ☐ - Методология Шматова
   ☐ - Industry best practices
   
☐ 3. Создать Theory.md
   ☐ - Назначение
   ☐ - Научное обоснование
   ☐ - Применение
   ☐ - Ограничения
   ☐ - Источники
   
☐ 4. Создать Formula.md
   ☐ - Математическая формула
   ☐ - Все переменные описаны
   ☐ - Единицы измерения
   ☐ - Примеры расчетов
   ☐ - Edge cases
   
☐ 5. Создать Examples.md
   ☐ - 3-5 практических примеров
   ☐ - Разные сценарии
   ☐ - Step-by-step
   ☐ - Интерпретация
   
☐ 6. Создать UI_Implementation.md
   ☐ - Макет интерфейса
   ☐ - Input fields с подсказками
   ☐ - Output visualization
   ☐ - Валидация
   
☐ 7. Создать API_Specification.md
   ☐ - POST /calculate endpoint
   ☐ - Request/Response schemas
   ☐ - Error handling
   
☐ 8. Тестирование
   ☐ - Unit tests для формул
   ☐ - Integration tests для API
   ☐ - Проверка на реальных данных
   
☐ 9. Документация
   ☐ - Добавить в _README.md
   ☐ - Перелинковки
   
☐ 10. Обучение
   ☐ - Создать tutorial
   ☐ - Провести демо для команды
```

---

## ✅ ЧЕК-ЛИСТ КАЧЕСТВА

### Теория:
```
☐ Научное обоснование есть
☐ Источники указаны (Шматов, etc.)
☐ Применение описано
☐ Ограничения указаны
☐ Примеры использования
```

### Формула:
```
☐ Математика корректна
☐ Все переменные описаны
☐ Единицы измерения указаны
☐ Edge cases обработаны
☐ Примеры расчетов верны
```

### UI:
```
☐ Интерфейс интуитивный
☐ Подсказки для полей
☐ Валидация в реальном времени
☐ Визуализация результатов
☐ Export функция
```

### API:
```
☐ Endpoint documented
☐ Schema validation
☐ Error handling
☐ Performance acceptable (<500ms)
☐ Rate limiting implemented
```

---

## 🔗 СВЯЗИ С ДРУГИМИ РАЗДЕЛАМИ

### Связи:
- **01_ROLES/Specialist/** → Основные пользователи
- **01_ROLES/Analyst/** → Аналитические инструменты
- **02_ARTIFACTS/Media_Plan/** ← Используется для расчетов
- **09_DEVELOPMENT/** ← Реализация
- **12_RESEARCH/** ← Научная база

---

## 📚 МЕТОДОЛОГИЯ ШМАТОВА

### Ключевые принципы:
1. **Эффективный охват** - не просто охват, а охват с нужной частотой
2. **Effective Frequency** - концепция Россайтера-Перси
3. **Recency theory** - теория напоминающей рекламы
4. **Cost efficiency** - оптимизация затрат

### Основные калькуляторы:
```
Reach → Group Reach → Effective Reach → Cost optimization
```

### Источники:
- "Эффективное медиапланирование" (Шматов)
- Россайтер-Перси методология
- Эренберг теория Recency

---

## 💡 BEST PRACTICES

### DO ✅:
- Валидируй формулы на реальных данных
- Добавляй подсказки в UI
- Показывай intermediate results
- Экспортируй результаты
- Версионируй калькуляторы
- Собирай feedback от пользователей

### DON'T ❌:
- Не усложняй UI
- Не скрывай формулы (transparency)
- Не игнорируй edge cases
- Не забывай про единицы измерения
- Не делай сложные вычисления на фронте

---

## 🚀 БЫСТРЫЙ СТАРТ

### Specialist:
```
1. Theory.md → понять когда использовать
2. Examples.md → посмотреть примеры
3. Использовать в работе
```

### Developer:
```
1. Formula.md → понять математику
2. API_Specification.md → реализовать endpoint
3. Unit tests → проверить корректность
```

### Analyst:
```
1. Theory.md → научное обоснование
2. Formula.md → верификация формул
3. Examples.md → валидация на данных
```

---

## 📊 ROADMAP

### Phase 1: Калькуляторы Шматова
```
☐ Reach Calculator
☐ Group Reach
☐ Coverage Spectrum
☐ Effective Reach
☐ Effective Placements
☐ Ad Silence Duration
☐ Cost of Reach
☐ Sample Size calculators
```

### Phase 2: Advanced Analytics
```
☐ Attribution Modeling
☐ Media Mix Modeling
☐ Incrementality Testing
☐ Econometrics
```

### Phase 3: Automation
```
☐ Budget Optimizer (AI)
☐ Campaign Planner (AI)
☐ Scenario Modeling
```

---

**Версия:** 1.0  
**Дата:** 2025-10-23  
**Статус:** ✅ Актуально

→ [Вернуться к главному README](../README.md)  
→ [Методология Шматова](../12_RESEARCH/Shmatov_Methodology.md)


