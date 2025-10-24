---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: role_doc
title: AI Assistant для Strategist
language: ru
industry: advertising
role_apply: [strategist]
period: 2025-10
version: "1.0"
source_path: 01_ROLES/Strategist/AI_Assistant.md
effective_date: 2025-10-24
visibility: internal
security_level: low
tags: [role, strategist, ai_assistant]
---

# AI Assistant для Strategist

→ [Role](./Role_Description.md) | [Pain Points](./Pain_Points.md)

---

## 🤖 STRATEGIST AI ASSISTANT

**Назначение:** Ускорение research и strategy development

**Экономия:** 40ч/месяц  
**ROI:** 600%+  
**Quality:** +30%

---

## 🎯 ВОЗМОЖНОСТИ

### 1. AI RESEARCH (10ч → 1.5ч) ⭐ С МЕДИАЛАНДШАФТОМ!

**Процесс (НОВЫЙ с медиаландшафтом):**
```
1. Strategist задает параметры:
   - Industry
   - Competitors
   - Target audience
   - Geography

2. AI загружает медиаландшафт:
   → 707 площадок, 12 типов, бенчмарки
   → Фильтрует по индустрии и гео
   → Результат: 50-100 релевантных площадок
   
3. AI автоматически:
   - Анализирует конкурентов (где размещаются)
   - Собирает market data из медиаландшафта
   - Выявляет trends по типам площадок
   - Находит benchmarks (CPM, охваты, минбюджеты)
   - Оценивает долю рынка по категориям

4. Output через 10 минут:
   - Competitive landscape (с площадками из медиаландшафта)
   - Market opportunities (новые площадки)
   - Audience insights (охваты по типам)
   - Recommended channels (топ-10 по эффективности)
   - Budget allocation (на основе бенчмарков)
```

**Код интеграции:**
```typescript
class AIStrategistWithLandscape {
  async generateResearch(brief: Brief) {
    // 1. Загрузить медиаландшафт
    const landscape = await this.loadMediaLandscape();
    
    // 2. Фильтровать по критериям
    const relevant = landscape.platforms.filter(p => {
      return p.source_data.industry?.includes(brief.industry) &&
             p.availability === 'russia';
    });
    
    // 3. Проанализировать типы площадок
    const typesAnalysis = landscape.taxonomy.map(type => ({
      name: type.name,
      platforms_count: relevant.filter(p => p.category === type.name).length,
      avg_cpm: this.calculateAvgCPM(relevant, type.name),
      total_reach: this.calculateTotalReach(relevant, type.name),
      min_budget: this.getMinBudget(relevant, type.name)
    }));
    
    // 4. LLM генерирует insights
    const prompt = `
      Проанализируй медиаландшафт для клиента:
      - Индустрия: ${brief.industry}
      - Бюджет: ${brief.budget}₽
      - Гео: ${brief.geo}
      
      Доступные типы площадок:
      ${typesAnalysis.map(t => 
        `${t.name}: ${t.platforms_count} площадок, средний CPM ${t.avg_cpm}₽, охват ${t.total_reach}`
      ).join('\n')}
      
      Рекомендации:
      1. Топ-3 типа площадок для этого клиента
      2. Ориентировочное распределение бюджета
      3. Ожидаемые метрики (охват, частота)
      4. Риски и возможности
    `;
    
    return await this.llm.generate(prompt);
  }
}
```

**Экономия:** 
- БЕЗ медиаландшафта: 10ч
- С медиаландшафтом: 1.5ч (**↓85%!**)

---

### 2. STRATEGY GENERATOR (15ч → 3ч) ⭐ С МЕДИАЛАНДШАФТОМ!

**AI генерирует (с данными из медиаландшафта):**
```markdown
# Strategy Document (Draft)

## Executive Summary
[AI generated based on brief + медиаландшафт data]

## Target Audience
- Segments analysis
- Pain points
- Motivations
- Охваты по площадкам (из медиаландшафта!) ⭐

## Channel Strategy ⭐ КЛЮЧЕВОЕ УЛУЧШЕНИЕ!
- Recommended mix (на основе 707 площадок)
  → VK Реклама (52М аудитория)
  → Яндекс Директ (80% охват РФ)
  → Программатик видео (115 площадок)
  
- Budget allocation (с бенчмарками CPM)
  → VK: ₽3М (CPM ~150₽, 20М показов)
  → Яндекс: ₽5М (CPM ~200₽, 25М показов)
  → Programmatic: ₽2М (CPM ~100₽, 20М показов)
  
- Обоснование выбора (данные из медиаландшафта)
- Контакты площадок для согласования ⭐
- Rationale

## Messaging Framework
- Key messages
- Tone of voice
- USP

## KPI Framework
- Primary metrics
- Benchmarks
- Success criteria
```

**Strategist:** Review + enrich (4-5ч)

**Экономия:** 10-11ч на проект

---

### 3. KNOWLEDGE BASE SEARCH

**AI находит:**
```python
# Query
ai.find_similar_cases({
  'industry': 'finance',
  'goal': 'lead_generation',
  'budget': '500k-1M'
})

# Results
similar_cases = [
  {
    'client': 'Bank X',
    'strategy': '...',
    'results': 'CPA -25%, Leads +40%',
    'learnings': '...'
  },
  # ... more cases
]
```

**Экономия:** 4-6ч на research

---

### 4. BENCHMARKS & INSIGHTS

**AI предоставляет:**
- Industry benchmarks (CTR, CPA, ROAS)
- Best practices для индустрии
- Seasonal trends
- Competitive intel

**Экономия:** 3-5ч на анализ

---

### 5. PRESENTATION AUTO-GEN

**AI создает:**
```
1. Strategist выбирает template
2. AI заполняет slides:
   - Market analysis
   - Strategy overview
   - Channel mix
   - Timeline
   - Budget
   
3. Auto-formatting + charts
4. Export to PPT/PDF
```

**Экономия:** 5-7ч на презентацию

---

## 📊 ROI

### Инвестиции:
```yaml
Стоимость: 15k руб/месяц
Обучение: 4-5 часов
```

### Возврат:
```yaml
Экономия:
  - Research: 32ч/мес
  - Strategy: 44ч/мес
  - Презентации: 24ч/мес
  
  ИТОГО: 100ч/мес

Деньги: 100ч × 2500₽ = 250k ₽/мес
ROI = (250k - 15k) / 15k = 1567%
```

---

## 🚀 НАЧАЛО

### Шаг 1: Setup (2-3ч)
1. Настройка предпочтений
2. Загрузка past strategies
3. Training AI на вашем стиле

### Шаг 2: First Project
1. AI генерирует draft strategy
2. Review и корректировки
3. Feedback для AI

### Шаг 3: Scale
1. Использование на всех проектах
2. Continuous improvement

---

## 💡 BEST PRACTICES

### DO:
- ✅ Review AI outputs
- ✅ Enrichments своими инсайтами
- ✅ Feedback AI
- ✅ Использовать knowledge base

### DON'T:
- ❌ Слепо копировать AI
- ❌ Игнорировать AI recommendations
- ❌ Забывать про creativity

---

## 🔗 Связанные

- [Role_Description.md](./Role_Description.md)
- [Pain_Points.md](./Pain_Points.md)
- [../../06_AI_ASSISTANTS/Strategist_Assistant/](../../06_AI_ASSISTANTS/Strategist_Assistant/)

---

**Версия:** 1.0 | **Дата:** 2025-10-23 | **Статус:** ✅


