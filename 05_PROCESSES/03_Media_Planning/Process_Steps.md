---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: process
title: 03_Media_Planning - Process Steps
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: 05_PROCESSES/03_Media_Planning/Process_Steps.md
effective_date: 2025-10-24
visibility: internal
security_level: medium
tags: [process, 03_media_planning, process_steps]
---

# 03_Media_Planning - Process Steps

→ [Overview](./Overview.md) | [Roles](./Roles_Responsibilities.md) | [Data](./Data_IO.md) | [Test](./Test_Scenario.md)

---

## STEP 1: Planning (2-3 дня → 4-6 часов с медиаландшафтом ⭐)

**Кто:** Specialists (каждый свой канал)

**Действия каждого Specialist:**

### 1.1 Получение данных из Strategy
- Получить budget allocation из Strategy
- Понять цели: awareness / performance / branding
- Определить гео и целевую аудиторию

### 1.2 Выбор площадок из Медиаландшафта ⭐ НОВОЕ!
```yaml
# Открыть медиаландшафт
cd 04_PLATFORMS/MEDIA_LANDSCAPE/

# Выбрать категорию (например Programmatic_Video)
ls 10_PLATFORMS_DATABASE/Programmatic_Video/
# → Видит 115 площадок

# Отфильтровать по критериям:
- min_budget <= мой бюджет
- geo = нужная география  
- objectives = мои цели

# Результат: список 15-20 подходящих площадок
```

**Источники данных:**
- `10_PLATFORMS_DATABASE/{category}/` - площадки по категориям
- `09_ANALYTICS/platform_taxonomy.json` - типология
- `04_PRICING/benchmark_prices.json` - бенчмарки цен

### 1.3 Получение бенчмарков ⭐ НОВОЕ!
```yaml
# Для каждой выбранной площадки открыть JSON файл
# Пример: 10_PLATFORMS_DATABASE/Ecommerce/ozon_ru.json

Извлечь:
  - CPM (бенчмарк цены)
  - min_budget (минимальный бюджет)
  - audience_size (охват)
  - contacts (для уточнения)

# Время: 5 минут вместо 2-3 дней ожидания ответа!
```

### 1.4 Заполнение строк медиаплана
- Разбить на строки: 1 строка = 1 площадка + 1 формат + 1 бренд
- Для каждой строки заполнить: budget, CPM (из медиаландшафта!), прогноз показов
- Рассчитать: impressions = (budget / CPM) × 1000

**Пример (Context Specialist):**
```
Budget: 6M₽
Строк: 40-50

# Данные берутся из медиаландшафта:
MP-001: Яндекс Поиск, Солнечный Квартиры, Москва, 500k₽
        CPM=200₽ (из файла), прогноз 2.5М показов
        Контакт: direct@yandex.ru
        
MP-002: Яндекс РСЯ, Солнечный Квартиры, Москва, 300k₽
        CPM=150₽ (из файла), прогноз 2М показов
        Контакт: direct@yandex.ru
...
```

**Результат:** Draft медиаплана (100-150 строк) с бенчмарками и контактами

**Экономия времени:** 
- БЕЗ медиаландшафта: 10-15 часов
- С медиаландшафтом: 4-6 часов  
- **Экономия: 70%!**

---

## STEP 2: Platform Negotiations (2-3 дня → 1 день с медиаландшафтом ⭐)

**Кто:** Specialists

**Действия:**

### 2.1 Уточнение условий (не запрос с нуля!) ⭐ ИЗМЕНЕНИЕ!
```yaml
# РАНЬШЕ: "Здравствуйте, какой у вас CPM?"
# → Ждем 2-3 дня ответа

# СЕЙЧАС: "Здравствуйте! План на ₽500k.
# Ваш CPM ~150₽ по нашим данным (медиаландшафт), подтвердите?
# Минбюджет 100k подходит?"
# → Ответ за 1-2 часа!
```

**Источник контактов:** Медиаландшафт!
- `source_data.contacts.email` - email менеджера
- `source_data.contacts.phone` - телефон
- `source_data.contacts.manager` - имя менеджера

### 2.2 Получение подтверждений
1. ✅ Подтвердить CPM (или узнать актуальный)
2. ✅ Подтвердить минимальный бюджет
3. ✅ Forecast traffic/reach (если нужно)
4. ✅ Узнать restrictions (если есть)

### 2.3 Обновление медиаплана
- Обновить строки с ФИНАЛЬНЫМИ данными (если отличаются от бенчмарков)
- Пометить: "Подтверждено площадкой ✓"

### 2.4 Обновление медиаландшафта ⭐ ВАЖНО!
```yaml
# Если цены изменились - обновить медиаландшафт:
Было: CPM=150₽
Площадка ответила: CPM=170₽
→ Обновить файл площадки в медиаландшафте

# Это поможет следующим проектам!
```

**Результат:** Медиаплан с подтвержденными данными

**Экономия времени:**
- БЕЗ медиаландшафта: 2-3 дня (поиск контактов + ожидание ответов)
- С медиаландшафтом: 1 день (быстрое уточнение)
- **Экономия: 50-66%!**

---

## STEP 3: Internal Review (1 день)

**Кто:** PM + Account

**Действия:**
1. Проверить сумму бюджетов = strategy total (±2%)
2. Проверить нет дублей
3. Проверить expected results realistic
4. Проверить все поля заполнены

**Результат:** Validated медиаплан

---

## STEP 4: Line-by-Line (1 день)

**Кто:** PM + Specialists + Account

**Действия:**
1. Meeting: проходим по строкам медиаплана
2. Specialist объясняет каждую строку
3. Обсуждаем если вопросы
4. Корректируем если нужно

**Результат:** Finalized медиаплан

---

## STEP 5: Client Presentation (1 день)

**Кто:** Account + PM → Client

**Действия:**
1. Показать summary (budget by channel/city/product)
2. Показать детальный план (Google Sheets)
3. Explain expected results
4. Client approve

**Результат:** Approved медиаплан → Go to Documentation

---

**Версия:** 2.1 | **Строк:** 75 | **Статус:** ✅


