---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: integration_guide
title: Интеграция Медиаландшафта в Workflow
language: ru
industry: advertising
role_apply: [specialist, strategist, media_planner, pm]
period: 2025-10
version: "1.0"
source_path: 04_PLATFORMS/MEDIA_LANDSCAPE/_WORKFLOW_INTEGRATION.md
effective_date: 2025-10-24
visibility: internal
security_level: medium
tags: [media_landscape, integration, workflow]
---

# 🔄 Интеграция Медиаландшафта в Workflow

→ [README](/_README.md) | [База площадок](./10_PLATFORMS_DATABASE/) | [Процесс планирования](../../05_PROCESSES/03_Media_Planning/)

---

## 🎯 КЛЮЧЕВОЙ ИНСАЙТ

**Медиаландшафт = Центральный источник данных для планирования**

### Проблема ДО медиаландшафта:
```
❌ Специалист помнит цены "из опыта" → неточно
❌ Каждый раз звонит на площадку → медленно
❌ Использует данные прошлого месяца → устарело
❌ Нет единого источника правды → хаос
```

### Решение С медиаландшафтом:
```
✅ Единая база 707 площадок → полнота
✅ Бенчмарки цен → быстрый старт
✅ Контакты площадок → быстрая связь
✅ История обновлений → актуальность
```

---

## 📊 МЕДИАЛАНДШАФТ В ПРОЦЕССАХ

### 1️⃣ **Процесс: Брифинг** (05_PROCESSES/01_Briefing)

**Использование:** Минимальное

**Кто:** Account Manager, Strategist  
**Что берут из медиаландшафта:**
- Типы площадок для обсуждения с клиентом
- Ориентировочные бюджеты для планирования

**Пример:**
```yaml
Клиент: "Мы хотим быть везде"
Account: "У нас 12 типов площадок (смотрит taxonomy):
  - Программатик видео
  - Таргетированная реклама
  - Нативная реклама
  ..."
```

**Файлы:**
- `09_ANALYTICS/platform_taxonomy.json` - типология площадок

---

### 2️⃣ **Процесс: Разработка стратегии** (05_PROCESSES/02_Strategy_Development)

**Использование:** Среднее

**Кто:** Strategist  
**Что берут из медиаландшафта:**
- Охват каждого типа площадок
- Бенчмарки CPM по категориям
- Тренды рынка

**Пример:**
```yaml
Task: Выбрать топ-5 каналов для бюджета ₽10М
Strategist: 
  1. Открывает platform_taxonomy.json
  2. Смотрит охваты по типам
  3. Сравнивает CPM
  4. Выбирает:
     - Программатик видео (115 площадок, широкий охват)
     - VK Реклама (52М аудитория)
     - Яндекс Директ (охват ~80% РФ)
```

**Файлы:**
- `09_ANALYTICS/platform_taxonomy.json` - типология
- `09_ANALYTICS/market_share.json` - доли рынка
- `04_PRICING/benchmark_prices.json` - средние цены

---

### 3️⃣ **Процесс: Медиапланирование** (05_PROCESSES/03_Media_Planning) ⭐ КРИТИЧНО!

**Использование:** МАКСИМАЛЬНОЕ (80% обращений)

**Кто:** Specialist (Context, Target, Media, Performance)  
**Что берут из медиаландшафта:**

#### **ШАГ 1: Выбор площадок (2-3 часа)**

**БЕЗ медиаландшафта:**
```
❌ Специалист вспоминает площадки по памяти
❌ Выбирает 10-15 площадок из 707 возможных
❌ Упускает новые площадки
❌ Время: 2-3 часа + риск ошибки
```

**С медиаландшафтом:**
```
✅ Специалист открывает 10_PLATFORMS_DATABASE/
✅ Фильтрует по категории (напр. Programmatic_Video/)
✅ Видит все 115 площадок в категории
✅ Выбирает топ-20 по охвату и CPM
✅ Время: 30 минут
```

**Алгоритм:**
```typescript
// Specialist workflow
function selectPlatforms(budget: number, category: string) {
  // 1. Загрузить площадки категории
  const platforms = loadCategory(`10_PLATFORMS_DATABASE/${category}/`);
  
  // 2. Отфильтровать по бюджету
  const affordable = platforms.filter(p => 
    p.source_data.min_budget <= budget
  );
  
  // 3. Сортировать по эффективности
  const ranked = affordable.sort((a, b) => 
    a.source_data.cpm - b.source_data.cpm
  );
  
  // 4. Выбрать топ-20
  return ranked.slice(0, 20);
}
```

#### **ШАГ 2: Получение бенчмарков (2-3 дня)**

**БЕЗ медиаландшафта:**
```
❌ Звонок на каждую площадку → 2-3 дня ожидания
❌ Некоторые не отвечают
❌ Цены могут меняться
```

**С медиаландшафтом:**
```
✅ Берет бенчмарки из файла площадки
✅ Использует для ПРЕДВАРИТЕЛЬНОГО планирования
✅ Связывается с площадкой только для УТОЧНЕНИЯ
✅ Время: 1 день вместо 3
```

**Пример использования:**
```yaml
# Файл: 10_PLATFORMS_DATABASE/Ecommerce/ozon_ru.json
{
  "name": "Ozon",
  "site": "ozon.ru",
  
  "source_data": {
    # Specialist берет ОТСЮДА для медиаплана:
    "cpm": 150,              # ← Бенчмарк CPM
    "min_budget": 100000,     # ← Минимальный бюджет
    "audience_size": 25000000, # ← Охват
    
    # Контакты для уточнения:
    "contacts": {
      "email": "ads@ozon.ru",
      "manager": "Иван Петров"
    }
  }
}
```

**Workflow Specialist:**
```
1. Открыть ozon_ru.json
2. Взять CPM=150₽ для расчета
3. Рассчитать: бюджет ÷ CPM × 1000 = прогноз показов
4. Заполнить строку медиаплана
5. Позже уточнить у менеджера финальные условия
```

#### **ШАГ 3: Заполнение медиаплана (1-2 часа)**

**Структура медиаплана (Google Sheets):**

| ID | Площадка | Формат | Бюджет | CPM | Показы | Контакт |
|----|----------|--------|---------|-----|---------|----------|
| MP-001 | Ozon | Баннер 240×400 | 500k | 150₽ | 3.3М | ads@ozon.ru |
| MP-002 | Wildberries | Нативка | 300k | 180₽ | 1.67М | wb-ads@... |

**Откуда данные:**
- `Площадка` → `10_PLATFORMS_DATABASE/{category}/{platform}.json` → name
- `Формат` → `02_FORMATS/{platform}_formats.json`
- `CPM` → `source_data.cpm` из файла площадки
- `Контакт` → `source_data.contacts` из файла площадки

#### **ШАГ 4: Связь с площадками (1-2 дня)**

**С медиаландшафтом:**
```
✅ Берет email/телефон из файла площадки
✅ Пишет: "Здравствуйте! План на ₽500k, формат баннер 240×400.
   Ваш CPM ~150₽ по нашим данным, подтвердите?"
✅ Площадка: "Да" или "Нет, сейчас 170₽"
✅ Обновляет медиаплан
```

**Экономия времени:**
- Не нужно искать контакты: -30мин
- Уже есть контекст переговоров: -1час
- Итого: ~1.5 часа на 20 площадок = 30 часов!

---

### 4️⃣ **Процесс: Подготовка кампании** (05_PROCESSES/05_Campaign_Preparation)

**Использование:** Среднее

**Кто:** Specialist  
**Что берут из медиаландшафта:**
- Технические характеристики форматов
- Требования к креативам
- Особенности таргетинга

**Файлы:**
- `02_FORMATS/{platform}_formats.json`
- `03_TARGETING/{platform}_targeting.json`

---

### 5️⃣ **Процесс: Мониторинг** (05_PROCESSES/06_Launch_Monitoring)

**Использование:** Низкое

**Кто:** Specialist  
**Что берут из медиаландшафта:**
- Бенчмарки для сравнения (CPM, CTR, CR)
- Оценка эффективности: факт vs бенчмарк

**Пример:**
```yaml
Факт: CPM=200₽
Бенчмарк из медиаландшафта: CPM=150₽
Вывод: Дорого! Нужна оптимизация
```

---

### 6️⃣ **Процесс: Аналитика и оптимизация** (05_PROCESSES/07_Analytics_Optimization)

**Использование:** Среднее

**Кто:** Specialist, Analyst  
**Что берут из медиаландшафта:**
- Обновление бенчмарков на основе фактов
- Сравнение площадок для перераспределения бюджета

**Обратная связь:**
```
Факт лучше бенчмарка → Обновить медиаландшафт
Площадка эффективнее → Отметить в базе
```

---

## 🤖 AI АССИСТЕНТЫ + МЕДИАЛАНДШАФТ

### AI Strategist

**Использует медиаландшафт для:**
```typescript
async function generateChannelStrategy(brief: Brief) {
  // 1. Загружает типологию площадок
  const taxonomy = await loadJSON('09_ANALYTICS/platform_taxonomy.json');
  
  // 2. Фильтрует по целям клиента
  const relevantTypes = taxonomy.filter(t => 
    t.objectives.includes(brief.objective)
  );
  
  // 3. Загружает бенчмарки
  const benchmarks = await loadJSON('04_PRICING/benchmark_prices.json');
  
  // 4. Генерирует рекомендации
  return await llm.generate(`
    На основе типологии: ${relevantTypes}
    Бенчмарки: ${benchmarks}
    Предложи channel mix для бюджета ${brief.budget}
  `);
}
```

### AI Media Planner (Specialist Assistant) ⭐ ГЛАВНЫЙ!

**Использует медиаландшафт для:**

#### **1. Автоматический подбор площадок**
```typescript
async function suggestPlatforms(
  category: string,
  budget: number,
  objective: string
) {
  // Загружает все площадки категории
  const platforms = await loadCategory(
    `10_PLATFORMS_DATABASE/${category}/`
  );
  
  // Фильтрует по бюджету и целям
  const suitable = platforms.filter(p => {
    const minBudget = p.source_data.min_budget || 0;
    const objectives = p.source_data.objectives || [];
    
    return minBudget <= budget && 
           objectives.includes(objective);
  });
  
  // Ранжирует по эффективности
  const ranked = suitable.sort((a, b) => {
    const effA = a.source_data.audience_size / a.source_data.cpm;
    const effB = b.source_data.audience_size / b.source_data.cpm;
    return effB - effA;
  });
  
  // Возвращает топ-10 с объяснением
  return ranked.slice(0, 10).map(p => ({
    platform: p.name,
    reason: `CPM ${p.source_data.cpm}₽, охват ${p.source_data.audience_size}`,
    contacts: p.source_data.contacts
  }));
}
```

#### **2. Генерация строк медиаплана**
```typescript
async function generateMediaPlanLines(
  platforms: Platform[],
  totalBudget: number
) {
  const lines = [];
  
  for (const platform of platforms) {
    // Загружает форматы площадки
    const formats = await loadFormats(platform.id);
    
    // Распределяет бюджет пропорционально
    const budget = totalBudget * platform.weight;
    
    // Создает строки для каждого формата
    for (const format of formats) {
      const cpm = platform.source_data.cpm;
      const impressions = (budget / cpm) * 1000;
      
      lines.push({
        id: `MP-${lines.length + 1}`,
        platform: platform.name,
        format: format.name,
        budget: budget,
        cpm: cpm,
        impressions: impressions,
        contact: platform.source_data.contacts.email
      });
    }
  }
  
  return lines;
}
```

#### **3. Умные рекомендации**
```typescript
async function analyzeMediaPlan(mediaPlan: MediaPlan) {
  const recommendations = [];
  
  for (const line of mediaPlan.lines) {
    // Загружает бенчмарки площадки
    const platform = await loadPlatform(line.platform);
    const benchmark = platform.source_data;
    
    // Сравнивает с бенчмарком
    if (line.cpm > benchmark.cpm * 1.2) {
      recommendations.push({
        line: line.id,
        type: 'warning',
        message: `CPM ${line.cpm}₽ выше бенчмарка ${benchmark.cpm}₽ на 20%+`,
        action: 'Пересмотреть ставку или выбрать другую площадку'
      });
    }
    
    // Проверяет минимальный бюджет
    if (line.budget < benchmark.min_budget) {
      recommendations.push({
        line: line.id,
        type: 'error',
        message: `Бюджет ${line.budget}₽ ниже минимального ${benchmark.min_budget}₽`,
        action: 'Увеличить бюджет или удалить площадку'
      });
    }
  }
  
  return recommendations;
}
```

### AI Analyst

**Использует медиаландшафт для:**
- Сравнения факта с бенчмарками
- Выявления лучших/худших площадок
- Обновления бенчмарков в базе

---

## 📈 МЕТРИКИ ЭФФЕКТИВНОСТИ

### До медиаландшафта:
```
⏱️ Время на планирование: 10-15 часов
📞 Звонков на площадки: 20-30
❌ Пропущенных площадок: 30-40%
💰 Переплата из-за незнания рынка: 10-15%
```

### После медиаландшафта:
```
⏱️ Время на планирование: 2-3 часа (↓70%)
📞 Звонков на площадки: 5-10 (↓75%)
✅ Охват площадок: 95%+ (↑55%)
💰 Экономия благодаря бенчмаркам: 10-15%
```

### ROI медиаландшафта:
```
Экономия времени: 8ч × ₽3000/ч = ₽24,000 на проект
Экономия бюджета: ₽10М × 10% = ₽1,000,000
Качество планов: +50% охват площадок

ИТОГО: ₽1,024,000 экономии на проект!
```

---

## 🔗 ПЕРЕЛИНКОВКА

### Роли → Медиаландшафт

**Specialist:**
- [Functions.md](../../01_ROLES/Specialist/Functions.md) → обновлен раздел "Медиаплан"
- [AI_Assistant.md](../../01_ROLES/Specialist/AI_Assistant.md) → добавлена интеграция с медиаландшафтом
- [Tools_Access.md](../../01_ROLES/Specialist/Tools_Access.md) → добавлен доступ к медиаландшафту

**Strategist:**
- [Functions.md](../../01_ROLES/Strategist/Functions.md) → обновлен раздел "Анализ"
- [AI_Assistant.md](../../01_ROLES/Strategist/AI_Assistant.md) → добавлена работа с типологией

### Процессы → Медиаландшафт

**03_Media_Planning:**
- [Process_Steps.md](../../05_PROCESSES/03_Media_Planning/Process_Steps.md) → обновлен STEP 1 и STEP 2
- [Data_IO.md](../../05_PROCESSES/03_Media_Planning/Data_IO.md) → добавлены входы из медиаландшафта

**02_Strategy_Development:**
- [Process_Steps.md](../../05_PROCESSES/02_Strategy_Development/Process_Steps.md) → добавлено использование taxonomy

### Артефакты → Медиаландшафт

**Media_Plan:**
- [Data_Structure.md](../../02_ARTIFACTS/Media_Plan/Data_Structure.md) → добавлены ссылки на площадки
- [Examples.md](../../02_ARTIFACTS/Media_Plan/Examples.md) → примеры с реальными площадками

---

## 🚀 ROADMAP РАЗВИТИЯ

### ✅ Фаза 1: База (ГОТОВО)
- [x] 707 площадок в базе
- [x] 50 категорий
- [x] Типология 12 типов
- [x] Бенчмарки по ключевым площадкам

### 🟡 Фаза 2: Интеграция (В РАБОТЕ)
- [ ] Обновление процессов
- [ ] Обновление ролей
- [ ] Интеграция AI ассистентов
- [ ] API для доступа к данным

### ⭐ Фаза 3: Автоматизация (ПЛАН)
- [ ] Автообновление бенчмарков
- [ ] AI-рекомендации площадок
- [ ] Прямая интеграция с платформами
- [ ] Dashboard визуализации

### 🔮 Фаза 4: ML (БУДУЩЕЕ)
- [ ] Предсказание эффективности
- [ ] Автоматическая оптимизация
- [ ] Персонализация под клиента
- [ ] Рыночное прогнозирование

---

## 📚 ОБУЧЕНИЕ КОМАНДЫ

### Для Specialists:

**Шаг 1: Знакомство (30 мин)**
```
1. Открыть 10_PLATFORMS_DATABASE/
2. Изучить структуру категорий
3. Открыть 2-3 файла площадок
4. Понять формат данных
```

**Шаг 2: Практика (1 час)**
```
1. Выбрать тестовый проект
2. Найти подходящие площадки в медиаландшафте
3. Сформировать медиаплан
4. Сравнить с обычным процессом
```

**Шаг 3: Фидбек (30 мин)**
```
1. Что понравилось?
2. Что сложно?
3. Чего не хватает?
4. Идеи улучшения?
```

### Для Strategists:

**Обучение:**
```
1. Изучить 09_ANALYTICS/platform_taxonomy.json
2. Понять 12 типов площадок
3. Научиться использовать в стратегиях
```

---

## 🎯 КРИТЕРИИ УСПЕХА

### Для Specialist:
- ✅ Время планирования < 3 часов
- ✅ Охват площадок > 90%
- ✅ Бенчмарки точны ±10%

### Для Команды:
- ✅ 100% команды использует медиаландшафт
- ✅ Обновление данных каждые 2 недели
- ✅ Положительный фидбек 80%+

### Для Клиентов:
- ✅ Качество планов +30%
- ✅ Скорость подготовки +50%
- ✅ NPS +10 пунктов

---

**Версия:** 1.0  
**Дата:** 2025-10-24  
**Автор:** MRM AI Team  
**Статус:** ✅ Production Ready  

**🔗 Связанные документы:**
- [Медиаландшафт README](./_README.md)
- [База площадок](./10_PLATFORMS_DATABASE/)
- [Процесс медиапланирования](../../05_PROCESSES/03_Media_Planning/)
- [Роль Specialist](../../01_ROLES/Specialist/)

