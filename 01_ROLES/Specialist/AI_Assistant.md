---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: role_doc
title: AI Assistant для Specialist
language: ru
industry: advertising
role_apply: [specialist]
period: 2025-10
version: "1.0"
source_path: 01_ROLES/Specialist/AI_Assistant.md
effective_date: 2025-10-24
visibility: internal
security_level: low
tags: [role, specialist, ai_assistant]
---

# AI Assistant для Specialist

→ [Role](./Role_Description.md) | [Pain Points](./Pain_Points.md) | [Tools](./Tools_Access.md)

---

## 🤖 SPECIALIST AI ASSISTANT

**Назначение:** Автоматизация рутины, focus на стратегию и оптимизацию

**Экономия:** 60ч/месяц  
**ROI:** 700%+  
**Capacity:** +100% (20 → 40 кампаний)

---

## 🎯 КЛЮЧЕВЫЕ ВОЗМОЖНОСТИ

### 1. AI МЕДИАПЛАНИРОВАНИЕ ⭐ С МЕДИАЛАНДШАФТОМ!

**Процесс (НОВЫЙ с медиаландшафтом):**
```
1. Input: Brief + Strategy

2. AI загружает медиаландшафт:
   → 707 площадок, 50 категорий
   → Бенчмарки CPM, охваты, контакты
   → Типология площадок
   
3. AI анализирует и фильтрует:
   - Площадки по категориям (из taxonomy)
   - По бюджету (min_budget <= budget)
   - По гео (доступность в РФ)
   - По целям (objectives match)
   → Результат: 20-30 подходящих площадок
   
4. AI предлагает channel mix:
   - Топ-10 площадок с обоснованием
   - Budget allocation
   - CPM и прогноз показов (из медиаландшафта!)
   - Reach & Frequency forecast
   
5. AI рассчитывает метрики:
   - GRP, TRP (калькуляторы Шматова)
   - Coverage, Effective reach
   - ROI прогноз
   
6. AI генерирует медиаплан:
   - 100-150 строк
   - С бенчмарками из медиаландшафта
   - С контактами для уточнения
   
7. Specialist review (30мин) + adjustments
8. Export to Google Sheets / presentation
```

**Код интеграции:**
```typescript
class AIMediaPlannerWithLandscape {
  async generateMediaPlan(brief: Brief, strategy: Strategy) {
    // 1. Загрузить медиаландшафт
    const landscape = await this.loadMediaLandscape();
    
    // 2. Определить подходящие категории
    const categories = await this.selectCategories(
      brief.objectives,
      landscape.taxonomy
    );
    
    // 3. Загрузить площадки из категорий
    const platforms = await this.loadPlatforms(categories);
    
    // 4. Фильтровать по критериям
    const suitable = platforms.filter(p => {
      return p.source_data.min_budget <= strategy.budget &&
             p.availability === 'russia' &&
             p.source_data.objectives.includes(brief.objective);
    });
    
    // 5. Ранжировать по эффективности
    const ranked = suitable.sort((a, b) => {
      const effA = a.source_data.audience_size / a.source_data.cpm;
      const effB = b.source_data.audience_size / b.source_data.cpm;
      return effB - effA;
    });
    
    // 6. LLM генерирует план с контекстом
    const prompt = `
      Создай медиаплан для:
      - Бюджет: ${strategy.budget}₽
      - Цели: ${brief.objectives}
      - Гео: ${brief.geo}
      
      Топ площадок из медиаландшафта:
      ${ranked.slice(0, 20).map(p => 
        `${p.name}: CPM ${p.source_data.cpm}₽, охват ${p.source_data.audience_size}`
      ).join('\n')}
      
      Распределяй бюджет оптимально по этим площадкам.
    `;
    
    const plan = await this.llm.generate(prompt);
    
    // 7. Обогатить данными из медиаландшафта
    return this.enrichWithLandscapeData(plan, ranked);
  }
  
  async loadMediaLandscape() {
    return {
      taxonomy: await loadJSON('09_ANALYTICS/platform_taxonomy.json'),
      platforms: await loadAllPlatforms('10_PLATFORMS_DATABASE/'),
      benchmarks: await loadJSON('04_PRICING/benchmark_prices.json')
    };
  }
}
```

**Экономия:** 
- БЕЗ медиаландшафта: 6-8ч
- С медиаландшафтом: 1-1.5ч (**↓80%!**)
- Качество: +50% охват площадок

---

### 2. UNIFIED DASHBOARD

**Все кампании в одном месте:**
- Real-time метрики со всех платформ
- Cross-platform comparison
- AI insights по каждой кампании
- Quick actions (pause, adjust, scale)

**Экономия:** 2-3ч/день на мониторинг

---

### 3. PREDICTIVE ALERTS

**AI предсказывает проблемы:**
```
🔴 ALERT: Campaign X performance drop
- CPA +35% за 2 дня
- CTR -20%
- Quality Score упал с 8 до 6

AI Diagnosis:
- Creative fatigue (показы >1M)
- Audience exhaustion (frequency 7.2)

Recommendations:
1. Refresh creatives (priority)
2. Add lookalike audiences
3. Reduce frequency cap to 5
```

**Результат:** Быстрая реакция, меньше потерь

---

### 4. AUTO-OPTIMIZATION

**AI автоматически:**
- Корректирует ставки (в пределах заданных)
- Перераспределяет бюджет к winners
- Останавливает неэффективные объявления
- Масштабирует лучшие

**Specialist:** Approve changes или manual override

**Результат:** ROMI +15-30%

---

### 5. CAMPAIGN SETUP ASSISTANT

**AI помогает настроить:**
```python
# Input
campaign = {
  'platform': 'vk_ads',
  'goal': 'conversions',
  'budget': 500000,
  'duration': 30
}

# AI generates
recommendations = {
  'targeting': [...],
  'bid_strategy': 'max_conversions',
  'creatives': 'A/B test 3 variants',
  'utm': 'auto_generated',
  'pixels': 'configured'
}
```

**Экономия:** 2-3ч на настройку

---

### 6. AUTOMATED REPORTING

**AI собирает и анализирует:**
- Data from all platforms
- Performance trends
- Anomaly detection
- Recommendations

**Output:** Ready report за 30 секунд

**Экономия:** 8-10ч/неделю

---

## 📊 ROI

### Инвестиции:
```yaml
Стоимость: 12k руб/месяц
Обучение: 3-4 часа
```

### Возврат:
```yaml
Экономия:
  - Медиаплан: 18ч/мес
  - Мониторинг: 50ч/мес
  - Настройка: 12ч/мес
  - Отчеты: 36ч/мес
  
  ИТОГО: 116ч/мес

Деньги: 116ч × 2500₽ = 290k ₽/мес
ROI = (290k - 12k) / 12k = 2317%
```

---

## 🚀 НАЧАЛО РАБОТЫ

### Шаг 1: Setup (2-3ч)
1. Подключение рекламных кабинетов
2. Настройка goals и conversions
3. Import существующих кампаний

### Шаг 2: First Week
1. AI учится на текущих данных
2. Первые recommendations
3. Pilot auto-optimization

### Шаг 3: Scale
1. Full automation
2. Increase capacity
3. Continuous improvement

---

## 💡 BEST PRACTICES

### DO:
- ✅ Review AI recommendations
- ✅ Test auto-optimization на части бюджета
- ✅ Давать feedback AI
- ✅ Использовать templates

### DON'T:
- ❌ Полная автоматизация сразу
- ❌ Игнорировать AI alerts
- ❌ Отключать learning period

---

## 🔗 Связанные

- [Role_Description.md](./Role_Description.md)
- [Pain_Points.md](./Pain_Points.md)
- [../../06_AI_ASSISTANTS/Specialist_Assistant/](../../06_AI_ASSISTANTS/Specialist_Assistant/)

---

**Версия:** 1.0 | **Дата:** 2025-10-23 | **Статус:** ✅ Готово

