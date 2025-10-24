---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: ai_principles
title: Принципы работы AI агентов - Определение роли и действия по скрипту
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: 06_AI_ASSISTANTS/_AI_AGENTS_PRINCIPLES.md
effective_date: 2025-10-24
visibility: internal
security_level: high
tags: [ai, agents, principles, automation]
---

# 🤖 ПРИНЦИПЫ РАБОТЫ AI АГЕНТОВ MRM

**Миссия платформы:** Помогать быстро внести данные по проекту и найти способы решения, следуя ролям, принципам работы и наработанным файлам.

---

## 🎯 КЛЮЧЕВОЙ ПРИНЦИП

```
❌ НЕ КАСТОМНОЕ РЕШЕНИЕ КАЖДЫЙ РАЗ
✅ СЛЕДОВАНИЕ СКРИПТАМ И РОЛЯМ

Клиент присылает данные → AI определяет тип → Маршрутизирует по роли → Структурирует по базе проекта
```

---

## 📋 АВТОМАТИЧЕСКОЕ ОПРЕДЕЛЕНИЕ ТИПА ДАННЫХ

### Когда клиент присылает файл, AI агент:

```typescript
async function processClientFile(file: File) {
  // 1. Определить тип данных
  const dataType = await detectDataType(file);
  
  // 2. Определить роль-владельца
  const targetRole = mapDataTypeToRole(dataType);
  
  // 3. Структурировать по проекту
  const structured = await structureData(file, dataType);
  
  // 4. Занести в базу проекта
  await saveToProjectDatabase(structured, targetRole);
  
  // 5. Уведомить роль
  await notifyRole(targetRole, structured);
}
```

---

## 🔍 ТИПЫ ВХОДЯЩИХ ДАННЫХ И РОЛИ

### 1️⃣ **Медиапланы** (Excel/Google Sheets)

**Признаки:**
- Столбцы: Площадка, Формат, Бюджет, CPM, Показы
- Строки: 50-200
- Числовые данные о размещениях

**Роль-владелец:** Specialist / Media Planner

**Действия по скрипту:**
```yaml
1. Распознать структуру:
   - Извлечь площадки
   - Извлечь форматы
   - Извлечь бюджеты и метрики
   
2. Сопоставить с медиаландшафтом:
   - Найти площадки в 10_PLATFORMS_DATABASE/
   - Сравнить CPM с бенчмарками
   - Выявить отклонения
   
3. Структурировать:
   → Сохранить как Media_Plan artifact
   → Путь: 02_ARTIFACTS/Media_Plan/Data/
   → Формат: JSON + таблица
   
4. Обогатить данными:
   - Добавить данные из медиаландшафта
   - Рассчитать метрики (reach, frequency)
   - Проверить корректность
   
5. Уведомить:
   → Specialist: "Медиаплан загружен и структурирован"
   → PM: "Доступен для review"
```

**Пример:**
```typescript
// Клиент прислал: "Медиаплан_Q4_2025.xlsx"

async function processMediaPlan(file: File) {
  // 1. Извлечь данные
  const data = await parseExcel(file);
  
  // 2. Определить структуру
  const structure = {
    lines: data.map(row => ({
      platform: row['Площадка'],
      format: row['Формат'],
      budget: row['Бюджет'],
      cpm: row['CPM'],
      impressions: row['Показы']
    }))
  };
  
  // 3. Обогатить из медиаландшафта
  for (const line of structure.lines) {
    const platform = await findInMediaLandscape(line.platform);
    line.benchmark_cpm = platform?.source_data.cpm;
    line.contact = platform?.source_data.contacts.email;
    line.deviation = ((line.cpm - line.benchmark_cpm) / line.benchmark_cpm) * 100;
  }
  
  // 4. Сохранить
  const mediaPlan = {
    id: generateId(),
    source_file: file.name,
    uploaded_at: new Date(),
    lines: structure.lines,
    total_budget: sumBudgets(structure.lines),
    platforms_count: unique(structure.lines.map(l => l.platform)).length
  };
  
  await saveArtifact('Media_Plan', mediaPlan);
  
  // 5. Уведомить
  await notify({
    role: 'Specialist',
    message: `Медиаплан загружен: ${mediaPlan.platforms_count} площадок, ₽${mediaPlan.total_budget}`
  });
  
  return mediaPlan;
}
```

---

### 2️⃣ **Исследования** (PDF/DOCX/PPT)

**Признаки:**
- Market research
- Конкурентный анализ
- Аудиторные данные
- Тренды рынка

**Роль-владелец:** Analyst / Strategist

**Действия по скрипту:**
```yaml
1. Извлечь инсайты:
   - OCR / парсинг документа
   - Выделить ключевые данные
   - Структурировать insights
   
2. Категоризировать:
   - Тип исследования (market/competitor/audience)
   - Индустрия
   - География
   - Период актуальности
   
3. Структурировать:
   → Сохранить в базу знаний
   → Путь: 03_KNOWLEDGE_BASE/Research/
   → Теги: индустрия, тип, дата
   
4. Проиндексировать:
   - Добавить в vector DB
   - Создать embeddings
   - Связать с релевантными проектами
   
5. Уведомить:
   → Strategist: "Новое исследование доступно"
   → Analyst: "Требуется review"
```

**Пример:**
```typescript
// Клиент прислал: "Исследование_рынка_недвижимости_2025.pdf"

async function processResearch(file: File) {
  // 1. Извлечь текст
  const text = await extractText(file);
  
  // 2. AI анализ
  const analysis = await llm.generate(`
    Проанализируй исследование и извлеки:
    1. Тип исследования (market/competitor/audience)
    2. Ключевые инсайты (5-10)
    3. Цифры и метрики
    4. Индустрию и географию
    5. Период актуальности
    
    Текст исследования:
    ${text}
  `);
  
  // 3. Структурировать
  const research = {
    id: generateId(),
    source_file: file.name,
    uploaded_at: new Date(),
    type: analysis.type,
    industry: analysis.industry,
    geography: analysis.geography,
    period: analysis.period,
    insights: analysis.insights,
    metrics: analysis.metrics,
    summary: analysis.summary
  };
  
  // 4. Сохранить
  await saveToKnowledgeBase('Research', research);
  
  // 5. Индексировать
  await vectorDB.addDocument({
    id: research.id,
    content: research.summary + '\n' + research.insights.join('\n'),
    metadata: {
      type: 'research',
      industry: research.industry,
      date: research.uploaded_at
    }
  });
  
  // 6. Уведомить
  await notify({
    role: 'Strategist',
    message: `Новое исследование: ${research.industry}, ${research.insights.length} инсайтов`
  });
  
  return research;
}
```

---

### 3️⃣ **Выгрузки из систем** (CSV/JSON)

**Признаки:**
- Данные из рекламных кабинетов
- Метрики кампаний
- Статистика по дням/часам

**Роль-владелец:** Analyst / Specialist

**Действия по скрипту:**
```yaml
1. Определить источник:
   - Яндекс Директ
   - VK Реклама
   - Google Analytics
   - Другие платформы
   
2. Извлечь метрики:
   - Показы, клики, конверсии
   - CTR, CR, CPA
   - Бюджет и расход
   
3. Структурировать:
   → Сохранить в базу аналитики
   → Путь: 07_ANALYTICS/Raw_Data/
   → Формат: JSON + метаданные
   
4. Обработать:
   - Рассчитать производные метрики
   - Сравнить с целевыми KPI
   - Выявить аномалии
   
5. Визуализировать:
   → Создать dashboard
   → Обновить отчеты
   
6. Уведомить:
   → Analyst: "Новые данные для анализа"
   → Specialist: "Обновлены метрики кампаний"
```

**Пример:**
```typescript
// Клиент прислал: "yandex_direct_export_2025-10.csv"

async function processExport(file: File) {
  // 1. Определить источник
  const source = detectSource(file); // "yandex_direct"
  
  // 2. Извлечь данные
  const data = await parseCSV(file);
  
  // 3. Структурировать
  const campaigns = data.map(row => ({
    campaign_id: row['ID кампании'],
    campaign_name: row['Название'],
    impressions: parseInt(row['Показы']),
    clicks: parseInt(row['Клики']),
    cost: parseFloat(row['Расход']),
    conversions: parseInt(row['Конверсии']),
    date: row['Дата']
  }));
  
  // 4. Рассчитать метрики
  for (const campaign of campaigns) {
    campaign.ctr = (campaign.clicks / campaign.impressions) * 100;
    campaign.cpc = campaign.cost / campaign.clicks;
    campaign.cpa = campaign.cost / campaign.conversions;
    campaign.cr = (campaign.conversions / campaign.clicks) * 100;
  }
  
  // 5. Сохранить
  const analyticsData = {
    id: generateId(),
    source: source,
    source_file: file.name,
    uploaded_at: new Date(),
    campaigns: campaigns,
    total_cost: sumCosts(campaigns),
    total_conversions: sumConversions(campaigns)
  };
  
  await saveToAnalytics('Raw_Data', analyticsData);
  
  // 6. Проверить аномалии
  const anomalies = detectAnomalies(campaigns);
  
  // 7. Уведомить
  await notify({
    role: 'Analyst',
    message: `Загружены данные: ${campaigns.length} кампаний, ₽${analyticsData.total_cost}`,
    anomalies: anomalies
  });
  
  return analyticsData;
}
```

---

### 4️⃣ **Брифы** (PDF/DOCX/Email)

**Признаки:**
- Информация о клиенте
- Цели и задачи
- Бюджет и сроки
- Целевая аудитория

**Роль-владелец:** Account Manager / Strategist

**Действия по скрипту:**
```yaml
1. Извлечь поля брифа:
   - Название проекта
   - Клиент (название, контакты)
   - Цели и задачи
   - Бюджет
   - Сроки
   - Целевая аудитория
   - География
   
2. Структурировать:
   → Создать Brief artifact
   → Путь: 02_ARTIFACTS/Brief/Data/
   → Формат: JSON по схеме Brief
   
3. Создать проект:
   - Инициализировать Project
   - Назначить роли
   - Создать timeline
   
4. Запустить процесс:
   → Начать 01_Briefing процесс
   → Уведомить команду
   
5. AI помощь:
   - Предложить стратегию
   - Подобрать площадки из медиаландшафта
   - Оценить бюджет
```

**Пример:**
```typescript
// Клиент прислал email с брифом

async function processBrief(content: string) {
  // 1. AI извлечение полей
  const brief = await llm.generate(`
    Извлеки поля брифа из текста:
    - client_name
    - project_name
    - objectives
    - budget
    - timeline
    - target_audience
    - geography
    
    Текст:
    ${content}
  `);
  
  // 2. Структурировать
  const briefData = {
    id: generateId(),
    created_at: new Date(),
    source: 'email',
    
    client: {
      name: brief.client_name,
      industry: await detectIndustry(brief.client_name)
    },
    
    project: {
      name: brief.project_name,
      objectives: brief.objectives,
      budget: parseBudget(brief.budget),
      timeline: parseTimeline(brief.timeline)
    },
    
    targeting: {
      audience: brief.target_audience,
      geography: brief.geography
    }
  };
  
  // 3. Создать проект
  const project = await createProject({
    name: briefData.project.name,
    client: briefData.client,
    budget: briefData.project.budget
  });
  
  // 4. Сохранить бриф
  await saveArtifact('Brief', briefData, project.id);
  
  // 5. AI рекомендации
  const recommendations = await generateRecommendations(briefData);
  
  // 6. Уведомить команду
  await notify({
    roles: ['Account_Manager', 'Strategist', 'PM'],
    message: `Новый проект: ${project.name}, бюджет ₽${briefData.project.budget}`,
    recommendations: recommendations
  });
  
  return { project, brief: briefData, recommendations };
}
```

---

### 5️⃣ **Креативы** (PNG/JPG/MP4)

**Признаки:**
- Изображения/видео
- Баннеры, видеоролики
- Текстовые макеты

**Роль-владелец:** Creative / Specialist

**Действия по скрипту:**
```yaml
1. Анализ креатива:
   - Размер и формат
   - Соответствие требованиям площадок
   - Наличие текста (OCR)
   
2. Категоризировать:
   - Тип (баннер/видео/текст)
   - Формат (300×250, 16:9 и т.д.)
   - Назначение (awareness/performance)
   
3. Структурировать:
   → Сохранить в креативную базу
   → Путь: 08_CREATIVES/
   → Метаданные: формат, размер, площадки
   
4. Проверить:
   - Технические требования
   - Ограничения по площадкам
   - Compliance
   
5. Уведомить:
   → Creative: "Креатив готов к review"
   → Specialist: "Доступен для использования"
```

---

## 🔄 ОБЩИЙ WORKFLOW ОБРАБОТКИ

```typescript
class MRMIntelligentAgent {
  async processClientInput(input: File | string | Email) {
    // ШАГ 1: ОПРЕДЕЛЕНИЕ ТИПА
    const dataType = await this.detectDataType(input);
    
    console.log(`Обнаружен тип: ${dataType.type}`);
    // → "media_plan" | "research" | "export" | "brief" | "creative"
    
    // ШАГ 2: МАРШРУТИЗАЦИЯ ПО РОЛИ
    const targetRole = this.mapTypeToRole(dataType.type);
    
    console.log(`Роль-владелец: ${targetRole}`);
    // → "Specialist" | "Strategist" | "Analyst" | "Account" | "Creative"
    
    // ШАГ 3: ВЫБОР СКРИПТА ОБРАБОТКИ
    const processor = this.getProcessor(dataType.type);
    
    // ШАГ 4: ОБРАБОТКА ПО СКРИПТУ
    const result = await processor.process(input);
    
    // ШАГ 5: СТРУКТУРИРОВАНИЕ
    const structured = await this.structureByProject(result);
    
    // ШАГ 6: СОХРАНЕНИЕ В БАЗУ
    await this.saveToProjectDatabase(structured, targetRole);
    
    // ШАГ 7: УВЕДОМЛЕНИЕ РОЛИ
    await this.notifyRole(targetRole, structured);
    
    // ШАГ 8: AI РЕКОМЕНДАЦИИ
    const recommendations = await this.generateRecommendations(structured);
    
    return {
      type: dataType.type,
      role: targetRole,
      data: structured,
      recommendations: recommendations,
      next_steps: this.getNextSteps(dataType.type)
    };
  }
  
  // ОПРЕДЕЛЕНИЕ ТИПА ДАННЫХ
  private async detectDataType(input: any): Promise<DataType> {
    if (input instanceof File) {
      const ext = input.name.split('.').pop();
      const content = await this.readFile(input);
      
      // Excel/CSV - проверяем структуру
      if (['xlsx', 'xls', 'csv'].includes(ext)) {
        if (this.hasMediaPlanStructure(content)) {
          return { type: 'media_plan', confidence: 0.95 };
        }
        if (this.hasExportStructure(content)) {
          return { type: 'export', confidence: 0.90 };
        }
      }
      
      // PDF/DOCX - AI анализ
      if (['pdf', 'docx', 'doc'].includes(ext)) {
        const text = await this.extractText(input);
        const classification = await this.llm.classify(text, [
          'research', 'brief', 'report', 'contract'
        ]);
        return { type: classification.type, confidence: classification.confidence };
      }
      
      // Изображения/видео
      if (['jpg', 'png', 'mp4', 'mov'].includes(ext)) {
        return { type: 'creative', confidence: 1.0 };
      }
    }
    
    // Email или текст
    if (typeof input === 'string') {
      const classification = await this.llm.classify(input, [
        'brief', 'request', 'question', 'feedback'
      ]);
      return { type: classification.type, confidence: classification.confidence };
    }
    
    return { type: 'unknown', confidence: 0.0 };
  }
  
  // МАРШРУТИЗАЦИЯ ПО РОЛИ
  private mapTypeToRole(type: string): Role {
    const mapping = {
      'media_plan': 'Specialist',
      'research': 'Strategist',
      'export': 'Analyst',
      'brief': 'Account_Manager',
      'creative': 'Creative',
      'report': 'Analyst'
    };
    
    return mapping[type] || 'Project_Manager';
  }
  
  // ПОЛУЧЕНИЕ ПРОЦЕССОРА
  private getProcessor(type: string): DataProcessor {
    const processors = {
      'media_plan': new MediaPlanProcessor(),
      'research': new ResearchProcessor(),
      'export': new ExportProcessor(),
      'brief': new BriefProcessor(),
      'creative': new CreativeProcessor()
    };
    
    return processors[type] || new GenericProcessor();
  }
  
  // СЛЕДУЮЩИЕ ШАГИ
  private getNextSteps(type: string): string[] {
    const nextSteps = {
      'media_plan': [
        'Проверить соответствие с медиаландшафтом',
        'Уточнить условия с площадками',
        'Запустить процесс 05_Campaign_Preparation'
      ],
      'research': [
        'Review исследования Strategist-ом',
        'Использовать в следующей стратегии',
        'Добавить в knowledge base'
      ],
      'export': [
        'Рассчитать performance метрики',
        'Сравнить с KPI',
        'Создать отчет для клиента'
      ],
      'brief': [
        'Запустить процесс 01_Briefing',
        'Назначить роли на проект',
        'AI сгенерирует первичную стратегию'
      ],
      'creative': [
        'Проверить compliance',
        'Добавить к кампании',
        'Загрузить на площадки'
      ]
    };
    
    return nextSteps[type] || ['Требуется ручная обработка'];
  }
}
```

---

## 📊 СТРУКТУРА БАЗЫ ПРОЕКТА

### Куда сохраняются данные:

```
PROJECT_{ID}/
├── Brief/
│   └── brief.json                  ← Брифы
│
├── Strategy/
│   └── strategy.json               ← Стратегии
│
├── Media_Plans/
│   ├── draft_v1.json              ← Медиапланы
│   ├── approved_v2.json
│   └── final.json
│
├── Analytics/
│   ├── Raw_Data/
│   │   ├── yandex_export.json     ← Выгрузки
│   │   ├── vk_export.json
│   │   └── ...
│   └── Reports/
│       ├── weekly_report.json     ← Отчеты
│       └── ...
│
├── Research/
│   ├── market_analysis.json       ← Исследования
│   ├── competitor_analysis.json
│   └── ...
│
├── Creatives/
│   ├── banners/                   ← Креативы
│   ├── videos/
│   └── metadata.json
│
└── Timeline/
    └── events.json                ← История проекта
```

---

## ✅ КРИТЕРИИ КАЧЕСТВА ОБРАБОТКИ

### Для каждого типа данных:

**1. Полнота извлечения:**
- ✅ Все ключевые поля извлечены
- ✅ Метаданные заполнены
- ✅ Связи установлены

**2. Корректность структуры:**
- ✅ Соответствует схеме артефакта
- ✅ Типы данных валидны
- ✅ Обязательные поля заполнены

**3. Обогащение данными:**
- ✅ Добавлены данные из медиаландшафта
- ✅ Рассчитаны производные метрики
- ✅ Проставлены теги и категории

**4. Уведомления:**
- ✅ Роль-владелец уведомлена
- ✅ Связанные роли информированы
- ✅ Рекомендации предоставлены

---

## 🎯 ПРИМЕРЫ ИСПОЛЬЗОВАНИЯ

### Пример 1: Клиент прислал медиаплан

```
Клиент → Upload "Медиаплан_Q4.xlsx"
  ↓
AI Agent определяет: тип = "media_plan"
  ↓
Маршрутизация: роль = "Specialist"
  ↓
Обработка:
  - Извлечение 120 строк
  - Сопоставление с медиаландшафтом
  - Обогащение бенчмарками
  ↓
Сохранение: PROJECT_123/Media_Plans/draft_v1.json
  ↓
Уведомление:
  → Specialist: "Медиаплан загружен, 120 строк, 45 площадок"
  → PM: "Доступен для review"
  ↓
Рекомендации:
  - 5 площадок с отклонением CPM >20%
  - 3 новые площадки для рассмотрения
  - Предложение оптимизации бюджета
```

### Пример 2: Клиент прислал исследование

```
Клиент → Upload "Market_Research_2025.pdf"
  ↓
AI Agent определяет: тип = "research"
  ↓
Маршрутизация: роль = "Strategist"
  ↓
Обработка:
  - OCR извлечение текста
  - AI анализ инсайтов
  - Категоризация
  ↓
Сохранение: PROJECT_123/Research/market_analysis.json
  ↓
Индексирование: Vector DB для поиска
  ↓
Уведомление:
  → Strategist: "Новое исследование: 12 инсайтов, рынок недвижимости"
  → Analyst: "Требуется review"
  ↓
Рекомендации:
  - Использовать инсайт #3 в стратегии
  - Сравнить с прошлым годом
  - Актуализировать целевую аудиторию
```

---

## 🔗 ИНТЕГРАЦИЯ С СУЩЕСТВУЮЩИМИ КОМПОНЕНТАМИ

### С медиаландшафтом:
```typescript
// При обработке медиаплана
for (const line of mediaPlan.lines) {
  const platform = await findInMediaLandscape(line.platform);
  if (platform) {
    line.benchmark_cpm = platform.source_data.cpm;
    line.contact = platform.source_data.contacts;
  }
}
```

### С процессами:
```typescript
// Автозапуск процесса после загрузки данных
if (dataType === 'brief') {
  await startProcess('01_Briefing', project.id);
}

if (dataType === 'media_plan' && status === 'approved') {
  await startProcess('05_Campaign_Preparation', project.id);
}
```

### С ролями:
```typescript
// Уведомление роли с контекстом
await notifyRole({
  role: 'Specialist',
  context: {
    project_id: project.id,
    artifact_type: 'Media_Plan',
    data: mediaPlan,
    next_steps: ['Review', 'Negotiate', 'Launch']
  }
});
```

---

## 📚 СВЯЗАННЫЕ ДОКУМЕНТЫ

- [Медиаландшафт](../04_PLATFORMS/MEDIA_LANDSCAPE/_README.md) - база площадок
- [Роли](../01_ROLES/) - определение ролей и функций
- [Процессы](../05_PROCESSES/) - workflow проектов
- [Артефакты](../02_ARTIFACTS/) - структура данных

---

**Версия:** 1.0  
**Дата:** 2025-10-24  
**Статус:** ✅ Production Ready  

**🤖 AI агенты следуют принципам, а не изобретают каждый раз новое решение! 🤖**

