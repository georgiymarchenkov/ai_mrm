---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: testing_plan
title: Data Transformation Testing Plan - План тестирования трансформации данных
language: ru
industry: advertising
role_apply: [developer, architect, qa, ai_engineer]
period: 2025-10
version: "1.0"
source_path: 08_ARCHITECTURE/Data_Transformation_Testing_Plan.md
effective_date: 2025-10-24
visibility: internal
security_level: high
tags: [architecture, testing, data_transformation, validation]
---

# Data Transformation Testing Plan
## План тестирования трансформации данных в MRM

→ [Project Data Architecture](./Project_Data_Architecture.md)

---

## 🎯 ЦЕЛЬ ТЕСТИРОВАНИЯ

**Валидировать способность системы преобразовывать разнообразные входные данные в эталонную структуру артефактов MRM с сохранением полноты и точности информации.**

### Ключевые вопросы, на которые отвечаем:
1. ✅ Может ли AI правильно определить тип артефакта?
2. ✅ Насколько точно извлекаются данные из различных форматов?
3. ✅ Как система справляется с нестандартными структурами?
4. ✅ Какой % полноты данных достигается автоматически?
5. ✅ Что требует ручной коррекции?
6. ✅ Какие паттерны ошибок есть?
7. ✅ Как масштабируется обработка?

---

## 📋 SCOPE ТЕСТИРОВАНИЯ

### 1. Трансформации (основные)

```
┌─────────────────────────────────────────────────────────────┐
│                    ВХОДНЫЕ ДАННЫЕ                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. Тендерный заказ         → Бриф (эталонный)            │
│  2. Медиаплан (различные)   → Медиаплан (эталонный)        │
│  3. Стратегия (презентация) → Стратегия (структура)        │
│  4. Отчет площадки          → Отчет (эталонный)            │
│  5. Правила UTM             → UTM-структура медиаплана      │
│  6. Данные API площадок     → Структура кампаний           │
│  7. Выгрузки площадок       → Структура метрик             │
│  8. Email-коммуникация      → Извлечение данных            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 2. Артефакты (эталонные структуры)

```typescript
// Что тестируем:
const ARTIFACT_TYPES = [
  'brief',              // Бриф клиента
  'media_plan',         // Медиаплан
  'strategy',           // Стратегия
  'report',             // Отчет
  'utm_rules',          // Правила UTM
  'campaign_setup',     // Настройки кампаний
  'team',               // Команда проекта
  'budget',             // Бюджет
  'creative_brief',     // Креативный бриф
  'competitor_analysis' // Анализ конкурентов
];
```

### 3. Форматы входных данных

```
Excel:
  - .xlsx (различные версии)
  - .xls (legacy)
  - .csv

PDF:
  - Текстовый (extractable text)
  - Сканированный (OCR required)
  - Таблицы в PDF

PowerPoint:
  - .pptx
  - .ppt (legacy)

Word:
  - .docx
  - .doc

Email:
  - Plain text
  - HTML
  - С вложениями

JSON/XML:
  - API responses
  - Экспорты из других систем

Google Sheets:
  - Прямой доступ по API
```

---

## 🧪 СТРАТЕГИЯ ТЕСТИРОВАНИЯ

### Phase 1: Unit Testing (Component Level)
**Сроки:** 2 недели  
**Ответственные:** AI/ML Engineers

#### 1.1. Тестирование парсеров

```typescript
describe('File Parsers', () => {
  describe('ExcelParser', () => {
    it('should parse standard Excel file', async () => {
      const file = loadTestFile('briefs/sberbank_brief_standard.xlsx');
      const data = await excelParser.parse(file);
      
      expect(data).toHaveProperty('sheets');
      expect(data.sheets.length).toBeGreaterThan(0);
      expect(data.sheets[0].rows).toBeDefined();
    });
    
    it('should handle merged cells', async () => {
      const file = loadTestFile('briefs/merged_cells.xlsx');
      const data = await excelParser.parse(file);
      
      // Проверяем, что merged cells правильно обработаны
      expect(data.sheets[0].mergedCells).toBeDefined();
    });
    
    it('should handle multi-sheet workbook', async () => {
      const file = loadTestFile('media_plans/multi_sheet.xlsx');
      const data = await excelParser.parse(file);
      
      expect(data.sheets.length).toBeGreaterThan(1);
    });
    
    it('should handle Russian text correctly', async () => {
      const file = loadTestFile('briefs/cyrillic.xlsx');
      const data = await excelParser.parse(file);
      
      expect(data.sheets[0].rows[0][0]).toMatch(/[а-яА-Я]/);
    });
  });
  
  describe('PDFParser', () => {
    it('should extract text from text-based PDF', async () => {
      const file = loadTestFile('strategies/strategy.pdf');
      const text = await pdfParser.parse(file);
      
      expect(text.length).toBeGreaterThan(0);
    });
    
    it('should handle scanned PDF with OCR', async () => {
      const file = loadTestFile('reports/scanned_report.pdf');
      const text = await pdfParser.parse(file);
      
      expect(text.length).toBeGreaterThan(0);
    });
  });
});
```

#### 1.2. Тестирование AI extraction

```typescript
describe('AI Data Extractor', () => {
  describe('Brief Extraction', () => {
    it('should extract brief from standard Excel', async () => {
      const file = loadTestFile('briefs/sberbank_brief.xlsx');
      const extracted = await aiExtractor.extractBrief(file);
      
      expect(extracted).toMatchObject({
        client_name: expect.any(String),
        campaign_objective: expect.any(String),
        budget: expect.objectContaining({
          total: expect.any(Number),
          currency: expect.stringMatching(/RUB|USD|EUR/)
        }),
        target_audience: expect.any(Object),
        geography: expect.any(Array)
      });
    });
    
    it('should handle missing fields gracefully', async () => {
      const file = loadTestFile('briefs/incomplete_brief.xlsx');
      const extracted = await aiExtractor.extractBrief(file);
      
      // Проверяем, что пропущенные поля = null
      expect(extracted).toHaveProperty('geography', null);
    });
    
    it('should provide confidence scores', async () => {
      const file = loadTestFile('briefs/ambiguous_brief.xlsx');
      const extracted = await aiExtractor.extractBrief(file);
      
      expect(extracted).toHaveProperty('_confidence');
      expect(extracted._confidence).toBeGreaterThan(0);
      expect(extracted._confidence).toBeLessThanOrEqual(1);
    });
  });
  
  describe('Media Plan Extraction', () => {
    it('should extract from standard media plan', async () => {
      const file = loadTestFile('media_plans/standard.xlsx');
      const extracted = await aiExtractor.extractMediaPlan(file);
      
      expect(extracted).toHaveProperty('channels');
      expect(extracted.channels).toBeInstanceOf(Array);
      expect(extracted.channels[0]).toMatchObject({
        name: expect.any(String),
        budget: expect.any(Number),
        formats: expect.any(Array)
      });
    });
    
    it('should handle non-standard column names', async () => {
      // "Канал" vs "Площадка" vs "Channel"
      const file = loadTestFile('media_plans/non_standard_columns.xlsx');
      const extracted = await aiExtractor.extractMediaPlan(file);
      
      expect(extracted.channels.length).toBeGreaterThan(0);
    });
  });
});
```

#### 1.3. Тестирование валидации

```typescript
describe('Data Validator', () => {
  it('should validate complete brief', () => {
    const brief = createCompleteBrief();
    const validation = validator.validate(brief, 'brief');
    
    expect(validation.isValid).toBe(true);
    expect(validation.completeness).toBe(100);
    expect(validation.missing).toHaveLength(0);
  });
  
  it('should detect missing required fields', () => {
    const brief = createIncompleteBrief(); // без geography
    const validation = validator.validate(brief, 'brief');
    
    expect(validation.isValid).toBe(false);
    expect(validation.completeness).toBeLessThan(100);
    expect(validation.missing).toContain('geography');
  });
  
  it('should calculate correct completeness', () => {
    const brief = {
      client_name: 'Сбербанк',
      budget: { total: 1000000, currency: 'RUB' },
      // остальные поля отсутствуют
    };
    
    const validation = validator.validate(brief, 'brief');
    
    // 2 из 8 обязательных полей = ~25%
    expect(validation.completeness).toBeCloseTo(25, 0);
  });
});
```

---

### Phase 2: Integration Testing (End-to-End)
**Сроки:** 3 недели  
**Ответственные:** QA Engineers + AI Engineers

#### 2.1. Тестирование полного цикла

```typescript
describe('Full Data Processing Pipeline', () => {
  it('should process file end-to-end', async () => {
    // 1. Загрузка файла
    const file = loadTestFile('briefs/sberbank_brief.xlsx');
    const uploaded = await uploadFile(file, projectId);
    
    expect(uploaded.processing_status).toBe('pending');
    
    // 2. Ожидание обработки
    await waitForProcessing(uploaded.id, { timeout: 300000 }); // 5 минут
    
    // 3. Проверка результата
    const projectFile = await db.projectFiles.findById(uploaded.id);
    expect(projectFile.processing_status).toBe('completed');
    
    // 4. Проверка артефакта
    const artifacts = await db.projectArtifacts.findAll({
      project_id: projectId,
      source_file_id: uploaded.id
    });
    
    expect(artifacts.length).toBeGreaterThan(0);
    
    const artifact = artifacts[0];
    expect(artifact.artifact_type).toBe('brief');
    expect(artifact.data).toBeDefined();
    expect(artifact.completeness).toBeGreaterThan(70);
    
    // 5. Проверка синхронизации с Sheets
    const sheetsData = await getFromSheets(projectId, 'Бриф');
    expect(sheetsData).toBeDefined();
  });
  
  it('should handle file processing failure gracefully', async () => {
    const corruptedFile = loadTestFile('corrupted.xlsx');
    const uploaded = await uploadFile(corruptedFile, projectId);
    
    await waitForProcessing(uploaded.id);
    
    const projectFile = await db.projectFiles.findById(uploaded.id);
    expect(projectFile.processing_status).toBe('failed');
    expect(projectFile.error).toBeDefined();
  });
});
```

#### 2.2. Тестирование трансформаций

```typescript
describe('Data Transformations', () => {
  describe('Tender → Brief', () => {
    it('should transform tender document to brief', async () => {
      const tender = loadTestFile('tenders/sberbank_tender.xlsx');
      const brief = await transformTenderToBrief(tender);
      
      // Проверяем маппинг полей
      expect(brief.client_name).toBeDefined();
      expect(brief.budget).toBeDefined();
      expect(brief.campaign_objective).toBeDefined();
      
      // Проверяем корректность трансформации
      const validation = validator.validate(brief, 'brief');
      expect(validation.completeness).toBeGreaterThan(60);
    });
    
    it('should handle different tender formats', async () => {
      const formats = [
        'tenders/format_a.xlsx',
        'tenders/format_b.xlsx',
        'tenders/format_c.docx'
      ];
      
      for (const format of formats) {
        const tender = loadTestFile(format);
        const brief = await transformTenderToBrief(tender);
        
        expect(brief).toBeDefined();
        expect(brief.client_name).toBeDefined();
      }
    });
  });
  
  describe('Various Media Plans → Standard Media Plan', () => {
    it('should transform agency A media plan format', async () => {
      const plan = loadTestFile('media_plans/agency_a_format.xlsx');
      const standardPlan = await transformToStandardMediaPlan(plan);
      
      expect(standardPlan.channels).toBeInstanceOf(Array);
      expect(standardPlan.channels[0]).toMatchObject({
        name: expect.any(String),
        budget: expect.any(Number),
        formats: expect.any(Array),
        kpis: expect.any(Object)
      });
    });
    
    it('should transform agency B media plan format', async () => {
      const plan = loadTestFile('media_plans/agency_b_format.xlsx');
      const standardPlan = await transformToStandardMediaPlan(plan);
      
      expect(standardPlan.channels).toBeDefined();
    });
    
    it('should preserve budget totals', async () => {
      const plan = loadTestFile('media_plans/with_totals.xlsx');
      const standardPlan = await transformToStandardMediaPlan(plan);
      
      const totalBudget = standardPlan.channels.reduce(
        (sum, ch) => sum + ch.budget, 
        0
      );
      
      // Бюджет должен сойтись с точностью до 1%
      expect(totalBudget).toBeCloseTo(standardPlan.total_budget, -2);
    });
  });
  
  describe('UTM Rules → Media Plan Structure', () => {
    it('should map UTM rules to campaigns', async () => {
      const utmRules = loadTestFile('utm/utm_rules.xlsx');
      const mediaPlan = loadTestFile('media_plans/standard.xlsx');
      
      const mapped = await mapUTMToMediaPlan(utmRules, mediaPlan);
      
      expect(mapped.campaigns).toBeInstanceOf(Array);
      expect(mapped.campaigns[0].utm_template).toBeDefined();
    });
  });
  
  describe('Platform Data → Campaign Structure', () => {
    it('should transform Yandex Direct export', async () => {
      const yandexData = loadTestFile('platforms/yandex_export.xlsx');
      const campaigns = await transformPlatformData(yandexData, 'yandex_direct');
      
      expect(campaigns).toBeInstanceOf(Array);
      expect(campaigns[0]).toMatchObject({
        external_id: expect.any(String),
        platform: 'yandex_direct',
        name: expect.any(String),
        budget_spent: expect.any(Number)
      });
    });
    
    it('should transform VK Ads export', async () => {
      const vkData = loadTestFile('platforms/vk_export.csv');
      const campaigns = await transformPlatformData(vkData, 'vk_ads');
      
      expect(campaigns).toBeDefined();
    });
  });
});
```

---

### Phase 3: Stress Testing (Scale & Performance)
**Сроки:** 1 неделя  
**Ответственные:** QA Engineers

#### 3.1. Volume testing

```typescript
describe('Volume Testing', () => {
  it('should handle 100 files in parallel', async () => {
    const files = generateTestFiles(100);
    
    const startTime = Date.now();
    const results = await Promise.all(
      files.map(file => processFile(file))
    );
    const endTime = Date.now();
    
    const successRate = results.filter(r => r.status === 'completed').length / 100;
    const avgTime = (endTime - startTime) / 100;
    
    expect(successRate).toBeGreaterThan(0.95); // 95%+ success
    expect(avgTime).toBeLessThan(60000); // <1 минута на файл в среднем
  });
  
  it('should handle large files (>10MB)', async () => {
    const largeFile = generateLargeFile(15); // 15 MB
    
    const result = await processFile(largeFile);
    
    expect(result.status).toBe('completed');
  });
});
```

---

### Phase 4: Accuracy Testing (Data Quality)
**Сроки:** 2 недели  
**Ответственные:** AI Engineers + Domain Experts

#### 4.1. Ground Truth Testing

```typescript
describe('Accuracy Testing', () => {
  // Для каждого тестового файла есть ground truth (правильный результат)
  const testCases = [
    {
      file: 'briefs/sberbank_brief.xlsx',
      groundTruth: {
        client_name: 'Сбербанк',
        campaign_objective: 'Продвижение премиум карты',
        budget: { total: 15000000, currency: 'RUB' },
        geography: ['Москва', 'Санкт-Петербург', 'Екатеринбург'],
        // ... все поля
      }
    },
    // ... еще 50+ test cases
  ];
  
  testCases.forEach(({ file, groundTruth }) => {
    it(`should accurately extract from ${file}`, async () => {
      const testFile = loadTestFile(file);
      const extracted = await aiExtractor.extract(testFile);
      
      // Сравниваем с ground truth
      const accuracy = calculateAccuracy(extracted, groundTruth);
      
      expect(accuracy.overall).toBeGreaterThan(0.90); // 90%+ accuracy
      expect(accuracy.criticalFields).toBe(1.0); // 100% для критичных полей
    });
  });
});

function calculateAccuracy(extracted: any, groundTruth: any): AccuracyReport {
  const report = {
    overall: 0,
    criticalFields: 0,
    byField: {}
  };
  
  // Критичные поля (должны быть 100% точны)
  const criticalFields = ['client_name', 'budget', 'geography'];
  
  let totalFields = 0;
  let correctFields = 0;
  let correctCriticalFields = 0;
  
  for (const [key, value] of Object.entries(groundTruth)) {
    totalFields++;
    
    const match = deepEqual(extracted[key], value);
    if (match) correctFields++;
    
    if (criticalFields.includes(key)) {
      if (match) correctCriticalFields++;
    }
    
    report.byField[key] = match ? 1.0 : 0.0;
  }
  
  report.overall = correctFields / totalFields;
  report.criticalFields = correctCriticalFields / criticalFields.length;
  
  return report;
}
```

---

## 📊 TEST DATASET

### Структура тестовых данных

```
/test_dataset/
├── briefs/
│   ├── standard/
│   │   ├── sberbank_brief.xlsx          # Стандартный формат
│   │   ├── yandex_brief.xlsx
│   │   ├── vk_brief.xlsx
│   │   └── ... (20 файлов)
│   │
│   ├── non_standard/
│   │   ├── unusual_structure.xlsx       # Нестандартная структура
│   │   ├── merged_cells.xlsx
│   │   ├── multi_page.xlsx
│   │   └── ... (10 файлов)
│   │
│   ├── incomplete/
│   │   ├── missing_budget.xlsx          # Неполные данные
│   │   ├── missing_geo.xlsx
│   │   └── ... (10 файлов)
│   │
│   └── edge_cases/
│       ├── corrupted.xlsx               # Поврежденный файл
│       ├── empty.xlsx                   # Пустой файл
│       ├── wrong_format.pdf             # Неправильный тип
│       └── ... (5 файлов)
│
├── media_plans/
│   ├── agency_formats/
│   │   ├── realweb_format.xlsx          # Формат Realweb
│   │   ├── icontext_format.xlsx         # Формат iConText
│   │   ├── deltaplan_format.xlsx        # Формат Deltaplan
│   │   └── ... (10 агентств)
│   │
│   ├── client_formats/
│   │   ├── sberbank_format.xlsx
│   │   ├── yandex_format.xlsx
│   │   └── ... (10 клиентов)
│   │
│   └── platform_exports/
│       ├── yandex_direct_export.xlsx
│       ├── vk_ads_export.csv
│       ├── mytarget_export.xlsx
│       └── ... (10 площадок)
│
├── strategies/
│   ├── presentations/
│   │   ├── standard.pptx                # Стандартная презентация
│   │   ├── detailed.pptx
│   │   └── ... (10 файлов)
│   │
│   └── documents/
│       ├── strategy.docx
│       ├── strategy.pdf
│       └── ... (5 файлов)
│
├── reports/
│   ├── platform_reports/
│   │   ├── yandex_metrika.xlsx
│   │   ├── vk_stats.xlsx
│   │   └── ... (10 площадок)
│   │
│   └── custom_reports/
│       ├── weekly_report.xlsx
│       ├── monthly_report.xlsx
│       └── ... (5 файлов)
│
├── utm_rules/
│   ├── standard_utm.xlsx
│   ├── complex_utm.xlsx
│   └── ... (5 файлов)
│
├── tenders/
│   ├── tender_format_a.xlsx
│   ├── tender_format_b.docx
│   ├── tender_format_c.pdf
│   └── ... (10 файлов)
│
└── ground_truth/
    ├── briefs.json                      # Эталонные данные
    ├── media_plans.json
    ├── strategies.json
    └── ... (все артефакты)
```

### Требования к test dataset

```typescript
const TEST_DATASET_REQUIREMENTS = {
  // Минимальное количество файлов
  minFiles: {
    briefs: 50,
    media_plans: 50,
    strategies: 20,
    reports: 30,
    utm_rules: 10,
    tenders: 20,
    platform_exports: 30
  },
  
  // Разнообразие форматов
  formats: {
    excel: ['xlsx', 'xls', 'csv'],
    powerpoint: ['pptx', 'ppt'],
    word: ['docx', 'doc'],
    pdf: ['pdf'],
    images: ['jpg', 'png'] // для OCR
  },
  
  // Разнообразие размеров
  fileSizes: {
    small: '<100KB (30%)',
    medium: '100KB-5MB (50%)',
    large: '>5MB (20%)'
  },
  
  // Разнообразие качества
  quality: {
    clean: '70%',          // Чистые данные
    messy: '20%',          // Грязные данные (merged cells, etc)
    incomplete: '10%'      // Неполные данные
  },
  
  // Ground truth для всех файлов
  groundTruth: 'Required for all test files'
};
```

---

## 📏 МЕТРИКИ КАЧЕСТВА

### 1. Accuracy Metrics

```typescript
interface AccuracyMetrics {
  // Общая точность извлечения
  overall_accuracy: number;        // Target: >90%
  
  // По типам артефактов
  by_artifact_type: {
    [type: string]: number;
  };
  
  // По полям (критичные vs некритичные)
  critical_fields_accuracy: number;  // Target: 100%
  optional_fields_accuracy: number;  // Target: >80%
  
  // По форматам файлов
  by_file_format: {
    [format: string]: number;
  };
  
  // Field-level accuracy
  by_field: {
    [field: string]: {
      accuracy: number;
      false_positives: number;
      false_negatives: number;
    };
  };
}

// Пример расчета accuracy
function calculateAccuracy(testResults: TestResult[]): AccuracyMetrics {
  return {
    overall_accuracy: 0.92,  // 92%
    
    by_artifact_type: {
      brief: 0.95,           // 95% для брифов
      media_plan: 0.89,      // 89% для медиапланов
      strategy: 0.91         // 91% для стратегий
    },
    
    critical_fields_accuracy: 0.98,  // 98% для критичных полей
    optional_fields_accuracy: 0.85,  // 85% для опциональных
    
    by_file_format: {
      xlsx: 0.93,
      pdf: 0.87,
      pptx: 0.90
    },
    
    by_field: {
      'client_name': { accuracy: 0.99, false_positives: 1, false_negatives: 0 },
      'budget.total': { accuracy: 0.97, false_positives: 2, false_negatives: 1 },
      'geography': { accuracy: 0.92, false_positives: 5, false_negatives: 3 }
    }
  };
}
```

### 2. Completeness Metrics

```typescript
interface CompletenessMetrics {
  // Средняя полнота извлеченных данных
  avg_completeness: number;          // Target: >85%
  
  // Распределение по completeness
  distribution: {
    '90-100%': number;  // % файлов с высокой полнотой
    '70-89%': number;
    '50-69%': number;
    '<50%': number;
  };
  
  // Какие поля чаще всего пропущены
  most_missing_fields: Array<{
    field: string;
    missing_rate: number;
  }>;
}

// Пример
const completenessReport: CompletenessMetrics = {
  avg_completeness: 87.5,  // 87.5% в среднем
  
  distribution: {
    '90-100%': 65,  // 65% файлов заполнены на 90%+
    '70-89%': 25,
    '50-69%': 8,
    '<50%': 2
  },
  
  most_missing_fields: [
    { field: 'kpis.romi', missing_rate: 0.35 },      // 35% файлов без ROMI
    { field: 'target_audience.interests', missing_rate: 0.28 },
    { field: 'geography', missing_rate: 0.15 }
  ]
};
```

### 3. Performance Metrics

```typescript
interface PerformanceMetrics {
  // Время обработки
  avg_processing_time: number;        // Target: <5 минут
  p95_processing_time: number;        // Target: <10 минут
  p99_processing_time: number;
  
  // По размеру файла
  by_file_size: {
    small: number;   // <100KB
    medium: number;  // 100KB-5MB
    large: number;   // >5MB
  };
  
  // Success rate
  success_rate: number;               // Target: >95%
  failure_rate: number;
  
  // Причины ошибок
  error_breakdown: {
    [error_type: string]: number;
  };
}
```

### 4. AI Confidence Metrics

```typescript
interface ConfidenceMetrics {
  // Средняя уверенность AI
  avg_confidence: number;             // Target: >0.85
  
  // Корреляция между confidence и accuracy
  confidence_accuracy_correlation: number;  // Target: >0.8
  
  // Calibration: насколько AI уверенность соответствует реальной точности
  calibration_score: number;          // Target: >0.9
  
  // По порогам confidence
  by_confidence_threshold: {
    'high (>0.9)': { count: number; accuracy: number };
    'medium (0.7-0.9)': { count: number; accuracy: number };
    'low (<0.7)': { count: number; accuracy: number };
  };
}
```

---

## ✅ SUCCESS CRITERIA

### Пороговые значения для production readiness

```typescript
const PRODUCTION_READINESS_CRITERIA = {
  // Точность извлечения
  accuracy: {
    overall: '>90%',
    critical_fields: '100%',
    optional_fields: '>80%'
  },
  
  // Полнота данных
  completeness: {
    avg: '>85%',
    files_with_90plus: '>60%'
  },
  
  // Производительность
  performance: {
    avg_time: '<5 минут',
    p95_time: '<10 минут',
    success_rate: '>95%'
  },
  
  // AI уверенность
  confidence: {
    avg: '>0.85',
    calibration: '>0.85'
  },
  
  // Охват форматов
  format_support: {
    excel: '>95% success',
    pdf: '>85% success',
    pptx: '>90% success'
  },
  
  // Трансформации
  transformations: {
    tender_to_brief: '>85% accuracy',
    various_media_plans: '>90% accuracy',
    utm_mapping: '>95% accuracy',
    platform_exports: '>90% accuracy'
  }
};
```

---

## 🔄 TEST EXECUTION PLAN

### Week 1-2: Preparation
```
□ Собрать test dataset (минимум 200 файлов)
□ Создать ground truth для всех файлов
□ Настроить test environment
□ Написать test framework
□ Подготовить metrics dashboard
```

### Week 3-4: Unit Testing
```
□ Тестирование парсеров (Excel, PDF, PPTX)
□ Тестирование AI extraction
□ Тестирование валидации
□ Фиксация базовых метрик
```

### Week 5-7: Integration Testing
```
□ End-to-end тестирование
□ Тестирование трансформаций
□ Тестирование синхронизации с Sheets
□ Тестирование обработки ошибок
```

### Week 8: Stress Testing
```
□ Volume testing (100+ файлов)
□ Large file testing (>10MB)
□ Concurrent processing
□ Memory leak testing
```

### Week 9-10: Accuracy Testing
```
□ Ground truth validation (все 200+ файлов)
□ Field-level accuracy analysis
□ Error pattern analysis
□ Calibration testing
```

### Week 11: Analysis & Optimization
```
□ Анализ результатов
□ Идентификация слабых мест
□ Оптимизация промптов
□ Улучшение парсеров
□ Повторное тестирование
```

### Week 12: Final Validation
```
□ Финальный прогон всех тестов
□ Проверка success criteria
□ Документация результатов
□ Go/No-Go decision для production
```

---

## 📊 REPORTING DASHBOARD

### Real-time metrics dashboard

```typescript
// Dashboard показывает:
interface TestingDashboard {
  // Общий прогресс
  overall_progress: {
    files_tested: number;
    files_total: number;
    percentage: number;
  };
  
  // Текущие метрики
  current_metrics: {
    accuracy: AccuracyMetrics;
    completeness: CompletenessMetrics;
    performance: PerformanceMetrics;
    confidence: ConfidenceMetrics;
  };
  
  // Тренды (по дням/неделям)
  trends: {
    accuracy_trend: number[];
    completeness_trend: number[];
    performance_trend: number[];
  };
  
  // Топ проблем
  top_issues: Array<{
    issue: string;
    frequency: number;
    impact: 'high' | 'medium' | 'low';
    artifact_types: string[];
  }>;
  
  // Рекомендации
  recommendations: Array<{
    category: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
  }>;
}
```

---

## 🎯 TEST SCENARIOS (примеры)

### Scenario 1: Тендер → Бриф

```typescript
describe('Scenario: Tender to Brief Transformation', () => {
  const scenario = {
    name: 'Тендер Сбербанка → Бриф',
    input: {
      file: 'tenders/sberbank_tender_2025_q4.xlsx',
      type: 'tender',
      description: 'Тендерный документ на продвижение премиум карты'
    },
    expected_output: {
      artifact_type: 'brief',
      completeness: '>80%',
      critical_fields: {
        client_name: 'Сбербанк',
        campaign_objective: expect.stringContaining('премиум'),
        budget: { total: expect.any(Number), currency: 'RUB' },
        geography: expect.arrayContaining(['Москва']),
        period: expect.any(Object)
      }
    }
  };
  
  it('should transform tender to brief', async () => {
    const result = await runScenario(scenario);
    
    expect(result.artifact_type).toBe(scenario.expected_output.artifact_type);
    expect(result.completeness).toBeGreaterThan(80);
    expect(result.data).toMatchObject(scenario.expected_output.critical_fields);
  });
});
```

### Scenario 2: Нестандартный медиаплан → Эталонный

```typescript
describe('Scenario: Non-standard Media Plan Transformation', () => {
  const scenario = {
    name: 'Медиаплан агентства Realweb → Эталонный формат MRM',
    input: {
      file: 'media_plans/realweb_sberbank_oct_2025.xlsx',
      challenges: [
        'Нестандартные названия столбцов',
        'Merged cells в заголовках',
        'Несколько вкладок с разными каналами',
        'Бюджет в тысячах рублей (нужно умножить на 1000)'
      ]
    },
    expected_output: {
      artifact_type: 'media_plan',
      completeness: '>90%',
      channels_count: '>5',
      budget_sum_matches: true
    }
  };
  
  it('should handle Realweb format', async () => {
    const result = await runScenario(scenario);
    
    expect(result.data.channels.length).toBeGreaterThan(5);
    
    // Бюджет должен сойтись
    const totalBudget = result.data.channels.reduce(
      (sum, ch) => sum + ch.budget,
      0
    );
    expect(totalBudget).toBeCloseTo(result.data.total_budget, -2);
  });
});
```

### Scenario 3: Выгрузка Яндекс Директ → Структура кампаний

```typescript
describe('Scenario: Yandex Direct Export Processing', () => {
  const scenario = {
    name: 'Выгрузка из Яндекс Директ → Структура кампаний',
    input: {
      file: 'platforms/yandex_direct_sberbank_oct_stats.xlsx',
      format: 'Стандартная выгрузка Яндекс Директ',
      contains: [
        'ID кампании',
        'Название кампании',
        'Показы',
        'Клики',
        'CTR',
        'Расход'
      ]
    },
    expected_output: {
      campaigns_parsed: '>10',
      all_metrics_present: true,
      mapping_to_media_plan: 'successful'
    }
  };
  
  it('should parse Yandex Direct export', async () => {
    const result = await runScenario(scenario);
    
    expect(result.campaigns.length).toBeGreaterThan(10);
    expect(result.campaigns[0]).toMatchObject({
      external_id: expect.any(String),
      platform: 'yandex_direct',
      name: expect.any(String),
      metrics: {
        impressions: expect.any(Number),
        clicks: expect.any(Number),
        ctr: expect.any(Number),
        cost: expect.any(Number)
      }
    });
  });
});
```

---

## 🔍 ERROR PATTERN ANALYSIS

### Типичные паттерны ошибок

```typescript
interface ErrorPattern {
  pattern: string;
  frequency: number;
  impact: 'high' | 'medium' | 'low';
  affected_fields: string[];
  root_cause: string;
  fix: string;
}

const COMMON_ERROR_PATTERNS: ErrorPattern[] = [
  {
    pattern: 'Merged cells misread',
    frequency: 15,  // 15% файлов
    impact: 'high',
    affected_fields: ['channel names', 'budget values'],
    root_cause: 'Excel parser не обрабатывает merged cells корректно',
    fix: 'Улучшить логику обработки merged cells в ExcelParser'
  },
  
  {
    pattern: 'Currency confusion (тыс. руб. vs руб.)',
    frequency: 22,  // 22% файлов
    impact: 'high',
    affected_fields: ['budget.total', 'channels[].budget'],
    root_cause: 'AI не определяет единицы измерения бюджета',
    fix: 'Добавить в prompt явную проверку единиц ("тыс. руб." → *1000)'
  },
  
  {
    pattern: 'City name variations',
    frequency: 18,  // 18% файлов
    impact: 'medium',
    affected_fields: ['geography'],
    root_cause: 'Разные написания городов (СПб, Санкт-Петербург, С-Петербург)',
    fix: 'Добавить справочник городов с вариантами написания'
  },
  
  {
    pattern: 'Date format confusion',
    frequency: 12,
    impact: 'medium',
    affected_fields: ['period.start', 'period.end'],
    root_cause: 'Разные форматы дат (DD.MM.YYYY, MM/DD/YYYY, etc)',
    fix: 'Унифицировать парсинг дат с учетом русских форматов'
  },
  
  {
    pattern: 'Missing KPIs',
    frequency: 35,
    impact: 'low',
    affected_fields: ['kpis.*'],
    root_cause: 'KPI часто не указаны в тендерах/брифах',
    fix: 'AI должен явно запрашивать KPI у пользователя'
  }
];
```

---

## 📈 CONTINUOUS IMPROVEMENT

### Feedback loop после тестирования

```typescript
interface ImprovementPlan {
  // Что улучшать
  area: string;
  
  // Текущая метрика
  current_value: number;
  
  // Целевая метрика
  target_value: number;
  
  // Приоритет
  priority: 'high' | 'medium' | 'low';
  
  // План действий
  actions: string[];
  
  // Ожидаемый impact
  expected_impact: string;
}

const IMPROVEMENT_BACKLOG: ImprovementPlan[] = [
  {
    area: 'Brief extraction accuracy',
    current_value: 0.87,  // 87%
    target_value: 0.95,   // 95%
    priority: 'high',
    actions: [
      'Улучшить prompt для извлечения географии',
      'Добавить fallback на дополнительные вопросы',
      'Обучить на большем количестве примеров'
    ],
    expected_impact: '+8% accuracy'
  },
  
  {
    area: 'Media plan transformation (various formats)',
    current_value: 0.83,
    target_value: 0.92,
    priority: 'high',
    actions: [
      'Создать library типовых форматов медиапланов',
      'Добавить auto-detection формата',
      'Улучшить обработку merged cells'
    ],
    expected_impact: '+9% accuracy'
  },
  
  {
    area: 'Processing time for large files',
    current_value: 8.5,   // 8.5 минут
    target_value: 5.0,    // 5 минут
    priority: 'medium',
    actions: [
      'Оптимизировать парсинг больших Excel',
      'Добавить chunking для PDF',
      'Параллельная обработка листов'
    ],
    expected_impact: '-40% processing time'
  }
];
```

---

## 🎯 NEXT STEPS

### Immediate (эта неделя):
```
1. □ Создать структуру test_dataset/
2. □ Начать сбор реальных файлов (50+ брифов, 50+ медиапланов)
3. □ Написать ground truth для первых 20 файлов
4. □ Настроить test environment
5. □ Написать базовый test framework
```

### Short-term (2-4 недели):
```
1. □ Завершить сбор test dataset (200+ файлов)
2. □ Запустить Phase 1-2 testing (Unit + Integration)
3. □ Создать metrics dashboard
4. □ Проанализировать первые результаты
5. □ Начать оптимизацию на основе feedback
```

### Medium-term (2-3 месяца):
```
1. □ Завершить все 6 фаз тестирования
2. □ Достичь production readiness criteria
3. □ Документировать все error patterns
4. □ Создать improvement backlog
5. □ Go/No-Go decision для production
```

---

**Версия:** 1.0  
**Дата:** 24.10.2025  
**Ответственный:** QA Lead + AI/ML Lead  
**Статус:** ✅ План готов к execution

**Следующий шаг:** Kick-off meeting с QA и AI командой для начала сбора test dataset.


