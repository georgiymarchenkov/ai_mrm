---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: architecture_doc
title: Project Data Architecture - Архитектура данных проекта
language: ru
industry: advertising
role_apply: [developer, architect, pm]
period: 2025-10
version: "1.0"
source_path: 08_ARCHITECTURE/Project_Data_Architecture.md
effective_date: 2025-10-24
visibility: internal
security_level: high
tags: [architecture, project, data, core_concept]
---

# Project Data Architecture - Архитектура данных проекта

→ [Architecture](./Overview.md)

---

## 🎯 ЦЕНТРАЛЬНАЯ КОНЦЕПЦИЯ ПЛАТФОРМЫ

**Проект в MRM = Структурированная база данных + Google Sheets интерфейс**

Когда появляется новый клиент и создается проект, система автоматически:
1. ✅ Создает структуру БД для всех артефактов проекта
2. ✅ Создает Google Sheets с вкладками для каждого артефакта
3. ✅ Настраивает месячные итерации для сбора данных
4. ✅ Активирует AI-ассистента для заполнения данных

---

## 🏗️ СТРУКТУРА ПРОЕКТА

### Lifecycle проекта

```
1. Новый клиент
   ↓
2. Создание проекта
   ↓
3. Инициализация структуры БД
   ↓
4. Создание Google Sheets
   ↓
5. Активация AI-ассистента
   ↓
6. Сбор данных через коммуникацию
   ↓
7. Наполнение структуры данных
   ↓
8. Месячные итерации
```

---

## 📊 СТРУКТУРА БД ПРОЕКТА

### 1. Основная таблица проекта

```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  
  -- Основная информация
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(20) DEFAULT 'draft',
  
  -- Бюджет
  budget_total DECIMAL(15, 2),
  budget_spent DECIMAL(15, 2) DEFAULT 0,
  budget_currency VARCHAR(3) DEFAULT 'RUB',
  
  -- Даты
  start_date DATE,
  end_date DATE,
  
  -- Google Sheets интеграция
  sheets_url TEXT,                    -- URL главного Google Sheets
  sheets_id VARCHAR(255),             -- ID Google Sheets
  sheets_template_id VARCHAR(255),    -- ID шаблона (если используется)
  
  -- Визуальный стиль клиента
  visual_settings JSONB DEFAULT '{}',  -- {brand_colors, logo_url, fonts}
  
  -- Метаданные
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Индексы
CREATE INDEX idx_projects_client ON projects(client_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_dates ON projects(start_date, end_date);
CREATE INDEX idx_projects_sheets ON projects(sheets_id);
```

### 2. Месячные итерации проекта

```sql
CREATE TABLE project_periods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  
  -- Период
  period_month INT NOT NULL,           -- 1-12
  period_year INT NOT NULL,            -- 2025, 2026, etc.
  period_name VARCHAR(50),             -- "Январь 2025"
  
  -- Статус
  status VARCHAR(20) DEFAULT 'planning', -- 'planning', 'active', 'completed', 'archived'
  
  -- Бюджет на период
  budget_allocated DECIMAL(15, 2),
  budget_spent DECIMAL(15, 2) DEFAULT 0,
  
  -- Google Sheets для периода
  sheets_range VARCHAR(100),           -- Диапазон в главном Sheets
  
  -- Даты
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  
  -- Метаданные
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(project_id, period_year, period_month)
);

-- Индексы
CREATE INDEX idx_periods_project ON project_periods(project_id);
CREATE INDEX idx_periods_status ON project_periods(status);
CREATE INDEX idx_periods_dates ON project_periods(period_year, period_month);
```

### 3. Структура данных проекта (артефакты)

```sql
CREATE TABLE project_artifacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  period_id UUID REFERENCES project_periods(id) ON DELETE CASCADE,
  
  -- Тип артефакта
  artifact_type VARCHAR(50) NOT NULL,  -- 'brief', 'media_plan', 'strategy', 'report', etc.
  artifact_name VARCHAR(255),
  
  -- Статус
  status VARCHAR(20) DEFAULT 'draft',  -- 'draft', 'in_progress', 'completed', 'approved'
  completeness DECIMAL(5, 2) DEFAULT 0, -- % заполненности (0-100)
  
  -- Структурированные данные
  data JSONB NOT NULL DEFAULT '{}',    -- Основные данные артефакта
  metadata JSONB DEFAULT '{}',         -- Мета-информация
  
  -- Связь с Google Sheets
  sheets_tab_name VARCHAR(100),        -- Название вкладки в Sheets
  sheets_range VARCHAR(100),           -- Диапазон ячеек
  
  -- Версионирование
  version INT DEFAULT 1,
  parent_artifact_id UUID REFERENCES project_artifacts(id),
  
  -- Источник данных
  source_type VARCHAR(50),             -- 'excel_import', 'chat', 'api', 'manual'
  source_file_url TEXT,                -- URL исходного файла (если был)
  source_file_name VARCHAR(255),
  
  -- AI обработка
  ai_extracted BOOLEAN DEFAULT FALSE,  -- Данные извлечены AI?
  ai_confidence DECIMAL(5, 2),         -- Уверенность AI в извлеченных данных
  
  -- Метаданные
  created_by UUID REFERENCES users(id),
  approved_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  approved_at TIMESTAMP
);

-- Индексы
CREATE INDEX idx_artifacts_project ON project_artifacts(project_id);
CREATE INDEX idx_artifacts_period ON project_artifacts(period_id);
CREATE INDEX idx_artifacts_type ON project_artifacts(artifact_type);
CREATE INDEX idx_artifacts_status ON project_artifacts(status);
CREATE INDEX idx_artifacts_completeness ON project_artifacts(completeness);
```

### 4. История изменений артефактов

```sql
CREATE TABLE artifact_changes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artifact_id UUID REFERENCES project_artifacts(id) ON DELETE CASCADE,
  
  -- Изменение
  field_path TEXT NOT NULL,            -- JSON path (e.g., 'budget.total')
  old_value JSONB,
  new_value JSONB,
  
  -- Источник изменения
  change_source VARCHAR(50) NOT NULL,  -- 'user', 'ai', 'import', 'integration'
  changed_by UUID REFERENCES users(id),
  change_reason TEXT,
  
  -- Метаданные
  created_at TIMESTAMP DEFAULT NOW()
);

-- Индексы
CREATE INDEX idx_changes_artifact ON artifact_changes(artifact_id);
CREATE INDEX idx_changes_date ON artifact_changes(created_at);
```

### 5. Файлы проекта

```sql
CREATE TABLE project_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  period_id UUID REFERENCES project_periods(id),
  
  -- Информация о файле
  file_name VARCHAR(255) NOT NULL,
  file_type VARCHAR(50) NOT NULL,      -- 'excel', 'pdf', 'pptx', 'docx'
  file_size BIGINT,
  file_url TEXT NOT NULL,              -- S3 URL
  
  -- Обработка
  processing_status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
  processed_at TIMESTAMP,
  
  -- Извлеченные данные
  extracted_data JSONB,                -- Данные, извлеченные из файла
  extraction_method VARCHAR(50),       -- 'ai', 'template', 'manual'
  
  -- Связь с артефактами
  linked_artifacts UUID[],             -- Массив ID артефактов, созданных из файла
  
  -- Метаданные
  uploaded_by UUID REFERENCES users(id),
  uploaded_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Индексы
CREATE INDEX idx_files_project ON project_files(project_id);
CREATE INDEX idx_files_period ON project_files(period_id);
CREATE INDEX idx_files_status ON project_files(processing_status);
```

---

## 🔄 ПРОЦЕСС ОБРАБОТКИ ДАННЫХ

### 1. Получение файла от клиента

```typescript
/**
 * Обработка входящего файла
 * 
 * 1. Загрузка файла в S3
 * 2. Создание записи в project_files
 * 3. Запуск AI-обработки
 * 4. Извлечение структурированных данных
 * 5. Создание/обновление артефактов
 * 6. Обновление Google Sheets
 */

interface FileProcessingPipeline {
  // 1. Загрузка
  uploadFile(file: File, projectId: string, periodId: string): Promise<ProjectFile>;
  
  // 2. Определение типа артефакта
  detectArtifactType(file: ProjectFile): Promise<ArtifactType>;
  
  // 3. Извлечение данных
  extractData(file: ProjectFile, artifactType: ArtifactType): Promise<ExtractedData>;
  
  // 4. Валидация данных
  validateData(data: ExtractedData, schema: ArtifactSchema): Promise<ValidationResult>;
  
  // 5. Создание/обновление артефакта
  upsertArtifact(data: ExtractedData, projectId: string, periodId: string): Promise<Artifact>;
  
  // 6. Обновление Google Sheets
  syncToSheets(artifact: Artifact): Promise<void>;
  
  // 7. Уведомление команды
  notifyTeam(artifact: Artifact, action: 'created' | 'updated'): Promise<void>;
}
```

### 2. Пример: Обработка брифа

```typescript
/**
 * Обработка Excel-брифа от клиента
 */
async function processBriefFile(file: File, projectId: string): Promise<void> {
  // 1. Загрузка
  const projectFile = await uploadFile(file, projectId);
  
  // 2. AI извлекает данные
  const extractedData = await aiExtractor.extractBrief(projectFile);
  
  // Пример извлеченных данных:
  // {
  //   client_name: "Сбербанк",
  //   campaign_objective: "Повышение узнаваемости бренда",
  //   target_audience: {
  //     age: [25, 45],
  //     gender: "all",
  //     interests: ["банковские услуги", "инвестиции"]
  //   },
  //   budget: {
  //     total: 5000000,
  //     currency: "RUB"
  //   },
  //   geography: ["Москва", "Санкт-Петербург"],
  //   period: {
  //     start: "2025-11-01",
  //     end: "2025-11-30"
  //   }
  // }
  
  // 3. Валидация по схеме брифа
  const validationResult = await validateBriefData(extractedData);
  
  if (!validationResult.isValid) {
    // Запросить недостающие данные через AI-ассистента
    await aiAssistant.requestMissingData(projectId, validationResult.missingFields);
    return;
  }
  
  // 4. Создание артефакта "Бриф"
  const artifact = await db.projectArtifacts.create({
    project_id: projectId,
    artifact_type: 'brief',
    artifact_name: 'Бриф клиента',
    data: extractedData,
    metadata: {
      source_file: file.name,
      extraction_confidence: 0.95
    },
    status: 'completed',
    completeness: calculateCompleteness(extractedData),
    source_type: 'excel_import',
    source_file_url: projectFile.file_url,
    ai_extracted: true,
    ai_confidence: 0.95
  });
  
  // 5. Обновление Google Sheets
  await sheetsService.updateBriefTab(projectId, extractedData);
  
  // 6. Уведомление команды
  await notifications.send({
    project_id: projectId,
    type: 'artifact_created',
    message: `Бриф обработан и добавлен в проект. Полнота: ${artifact.completeness}%`
  });
  
  // 7. ВАЖНО: Файл больше НЕ читается!
  // Все данные в БД, Google Sheets обновлен
}
```

### 3. Пример: Обработка медиаплана

```typescript
/**
 * Обработка медиаплана от клиента
 */
async function processMediaPlanFile(file: File, projectId: string, periodId: string): Promise<void> {
  const projectFile = await uploadFile(file, projectId, periodId);
  
  // AI извлекает структуру медиаплана
  const extractedPlan = await aiExtractor.extractMediaPlan(projectFile);
  
  // Пример извлеченных данных:
  // {
  //   channels: [
  //     {
  //       name: "Яндекс Директ",
  //       budget: 2000000,
  //       formats: ["Поиск", "РСЯ"],
  //       kpis: { impressions: 5000000, ctr: 2.5, cpa: 400 }
  //     },
  //     {
  //       name: "VK Реклама",
  //       budget: 1500000,
  //       formats: ["Лента", "Истории"],
  //       kpis: { reach: 500000, cpm: 300 }
  //     }
  //   ],
  //   targeting: {
  //     geo: ["Москва", "МО"],
  //     age: [25, 45],
  //     interests: ["финансы", "инвестиции"]
  //   },
  //   schedule: {
  //     start_date: "2025-11-01",
  //     end_date: "2025-11-30"
  //   }
  // }
  
  // Преобразование в стандартную структуру MRM
  const standardizedPlan = await transformToStandardStructure(extractedPlan);
  
  // Создание артефакта
  const artifact = await db.projectArtifacts.create({
    project_id: projectId,
    period_id: periodId,
    artifact_type: 'media_plan',
    artifact_name: 'Медиаплан Ноябрь 2025',
    data: standardizedPlan,
    status: 'draft',
    completeness: calculateCompleteness(standardizedPlan),
    source_type: 'excel_import',
    ai_extracted: true
  });
  
  // Создание медиаплана в таблице media_plans
  const mediaPlan = await db.mediaPlans.create({
    project_id: projectId,
    name: 'Медиаплан Ноябрь 2025',
    total_budget: calculateTotalBudget(standardizedPlan.channels),
    channels: standardizedPlan.channels,
    targeting: standardizedPlan.targeting,
    status: 'draft'
  });
  
  // Обновление Google Sheets с учетом визуального стиля клиента
  const project = await db.projects.findById(projectId);
  await sheetsService.updateMediaPlanTab(
    projectId,
    periodId,
    standardizedPlan,
    project.visual_settings // ← Визуальный стиль клиента!
  );
}
```

### 4. Пример: Обработка стратегии

```typescript
/**
 * Обработка презентации по стратегии
 */
async function processStrategyFile(file: File, projectId: string): Promise<void> {
  const projectFile = await uploadFile(file, projectId);
  
  // AI анализирует презентацию и извлекает ключевые инсайты
  const analysis = await aiExtractor.analyzeStrategy(projectFile);
  
  // Пример извлеченных инсайтов:
  // {
  //   key_insights: [
  //     "Целевая аудитория: молодые специалисты 25-35 лет",
  //     "Основной канал коммуникации: digital",
  //     "Ключевое сообщение: 'Твой банк нового поколения'"
  //   ],
  //   objectives: [
  //     "Увеличение узнаваемости бренда на 20%",
  //     "Рост числа открытых счетов на 15%"
  //   ],
  //   channels_recommended: ["Яндекс Директ", "VK", "Telegram"],
  //   budget_recommendations: {
  //     total: 5000000,
  //     distribution: {
  //       "digital": 70,
  //       "outdoor": 20,
  //       "other": 10
  //     }
  //   },
  //   summary: "Стратегия фокусируется на digital-каналах..."
  // }
  
  // Создание текстового документа с инсайтами
  const strategyDoc = await generateStrategyDocument(analysis);
  
  // Создание артефакта
  const artifact = await db.projectArtifacts.create({
    project_id: projectId,
    artifact_type: 'strategy',
    artifact_name: 'Стратегический анализ',
    data: analysis,
    metadata: {
      source_file: file.name,
      slides_count: analysis.slides_count,
      extraction_method: 'ai_vision'
    },
    status: 'completed',
    completeness: 100,
    source_type: 'pptx_import',
    ai_extracted: true
  });
  
  // Обновление Google Sheets (вкладка "Стратегия")
  await sheetsService.updateStrategyTab(projectId, analysis);
  
  // Сохранение документа
  const docUrl = await saveDocument(strategyDoc, projectId);
  
  await notifications.send({
    project_id: projectId,
    type: 'strategy_processed',
    message: `Стратегия обработана. Извлечено ${analysis.key_insights.length} ключевых инсайтов.`,
    document_url: docUrl
  });
}
```

---

## 📋 GOOGLE SHEETS КАК ИНТЕРФЕЙС

### Структура Google Sheets для проекта

```
📊 [Название проекта] - MRM Data Hub

┌─ Вкладки (Tabs) ────────────────────────────────────────┐
│                                                           │
│  1. 📝 Бриф              ← Данные из брифа клиента      │
│  2. 🎯 Стратегия         ← Ключевые инсайты             │
│  3. 📊 Медиаплан         ← Структура медиаплана          │
│  4. 💰 Бюджет            ← Распределение бюджета         │
│  5. 👥 Команда           ← Состав команды проекта        │
│  6. 📈 Отчеты            ← Еженедельные/месячные отчеты  │
│  7. 📋 Задачи            ← Список задач проекта          │
│  8. 🛒 Заказы            ← Заказы на площадках           │
│  9. 📞 Коммуникация      ← История общения с клиентом    │
│ 10. 📁 Файлы             ← Ссылки на все файлы проекта   │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

### Настройка визуального стиля клиента

```typescript
/**
 * Применение визуального стиля клиента к Google Sheets
 */
interface VisualSettings {
  brand_colors: {
    primary: string;      // #FF0000
    secondary: string;    // #00FF00
    accent: string;       // #0000FF
  };
  logo_url: string;
  fonts: {
    header: string;       // "Arial Bold"
    body: string;         // "Arial Regular"
  };
  hidden_fields: string[]; // Поля, которые клиент не использует
}

async function applyVisualStyle(
  sheetsId: string,
  visualSettings: VisualSettings
): Promise<void> {
  // 1. Установить цвета заголовков
  await sheets.batchUpdate(sheetsId, [
    {
      updateCells: {
        range: { sheetId: 0, startRowIndex: 0, endRowIndex: 1 },
        fields: 'userEnteredFormat.backgroundColor',
        rows: [{
          values: [{
            userEnteredFormat: {
              backgroundColor: hexToRgb(visualSettings.brand_colors.primary)
            }
          }]
        }]
      }
    }
  ]);
  
  // 2. Добавить логотип
  await sheets.addImage(sheetsId, {
    url: visualSettings.logo_url,
    position: { row: 0, col: 0 }
  });
  
  // 3. Скрыть неиспользуемые поля
  for (const field of visualSettings.hidden_fields) {
    const colIndex = await findColumnByName(sheetsId, field);
    if (colIndex !== -1) {
      await sheets.hideColumn(sheetsId, colIndex);
    }
  }
  
  // 4. Настроить шрифты
  await sheets.setFonts(sheetsId, {
    headerFont: visualSettings.fonts.header,
    bodyFont: visualSettings.fonts.body
  });
}
```

### Синхронизация данных: БД ↔ Google Sheets

```typescript
/**
 * Двусторонняя синхронизация
 */
class ProjectDataSync {
  /**
   * БД → Google Sheets
   * Обновляет Sheets при изменении данных в БД
   */
  async syncToSheets(artifactId: string): Promise<void> {
    const artifact = await db.projectArtifacts.findById(artifactId);
    const project = await db.projects.findById(artifact.project_id);
    
    // Определяем вкладку и диапазон
    const tabName = artifact.sheets_tab_name || this.getDefaultTabName(artifact.artifact_type);
    const range = artifact.sheets_range || `${tabName}!A1:Z1000`;
    
    // Преобразуем данные в формат для Sheets
    const sheetData = this.transformToSheetFormat(artifact.data, artifact.artifact_type);
    
    // Обновляем Sheets
    await sheets.values.update({
      spreadsheetId: project.sheets_id,
      range: range,
      valueInputOption: 'USER_ENTERED',
      resource: { values: sheetData }
    });
    
    // Логируем изменение
    await db.artifactChanges.create({
      artifact_id: artifactId,
      field_path: '$',
      new_value: artifact.data,
      change_source: 'db_to_sheets',
      created_at: new Date()
    });
  }
  
  /**
   * Google Sheets → БД
   * Обновляет БД при изменении данных в Sheets (через webhook)
   */
  async syncFromSheets(projectId: string, tabName: string, range: string): Promise<void> {
    const project = await db.projects.findById(projectId);
    
    // Читаем данные из Sheets
    const response = await sheets.values.get({
      spreadsheetId: project.sheets_id,
      range: `${tabName}!${range}`
    });
    
    const sheetData = response.data.values;
    
    // Находим соответствующий артефакт
    const artifact = await db.projectArtifacts.findOne({
      project_id: projectId,
      sheets_tab_name: tabName
    });
    
    if (!artifact) {
      console.warn(`Artifact not found for tab: ${tabName}`);
      return;
    }
    
    // Преобразуем данные из Sheets в структуру БД
    const dbData = this.transformFromSheetFormat(sheetData, artifact.artifact_type);
    
    // Обновляем артефакт
    await db.projectArtifacts.update(artifact.id, {
      data: dbData,
      updated_at: new Date()
    });
    
    // Логируем изменение
    await db.artifactChanges.create({
      artifact_id: artifact.id,
      field_path: '$',
      old_value: artifact.data,
      new_value: dbData,
      change_source: 'sheets_to_db',
      created_at: new Date()
    });
  }
  
  /**
   * Преобразование данных для конкретного типа артефакта
   */
  private transformToSheetFormat(data: any, artifactType: string): any[][] {
    switch (artifactType) {
      case 'brief':
        return this.briefToSheet(data);
      case 'media_plan':
        return this.mediaPlanToSheet(data);
      case 'strategy':
        return this.strategyToSheet(data);
      default:
        return this.genericToSheet(data);
    }
  }
  
  private briefToSheet(brief: BriefData): any[][] {
    return [
      ['Параметр', 'Значение'],
      ['Клиент', brief.client_name],
      ['Цель кампании', brief.campaign_objective],
      ['Бюджет', brief.budget.total],
      ['Валюта', brief.budget.currency],
      ['География', brief.geography.join(', ')],
      ['Целевая аудитория: возраст', `${brief.target_audience.age[0]}-${brief.target_audience.age[1]}`],
      ['Целевая аудитория: пол', brief.target_audience.gender],
      ['Период: начало', brief.period.start],
      ['Период: конец', brief.period.end]
    ];
  }
  
  private mediaPlanToSheet(plan: MediaPlanData): any[][] {
    const rows: any[][] = [
      ['Канал', 'Бюджет', 'Форматы', 'KPI', 'Показатели']
    ];
    
    for (const channel of plan.channels) {
      rows.push([
        channel.name,
        channel.budget,
        channel.formats.join(', '),
        Object.keys(channel.kpis).join(', '),
        Object.values(channel.kpis).join(', ')
      ]);
    }
    
    return rows;
  }
}
```

---

## 🤖 РОЛЬ AI-АССИСТЕНТА

### Главная задача: Максимально заполнить данные проекта

```typescript
/**
 * AI-ассистент организует работу так, чтобы все данные были заполнены
 */
class ProjectDataAssistant {
  /**
   * Анализ полноты данных проекта
   */
  async analyzeDataCompleteness(projectId: string, periodId: string): Promise<CompletenessReport> {
    // Получаем все артефакты проекта за период
    const artifacts = await db.projectArtifacts.findAll({
      project_id: projectId,
      period_id: periodId
    });
    
    const report: CompletenessReport = {
      overall_completeness: 0,
      artifacts: [],
      missing_data: [],
      recommendations: []
    };
    
    // Анализируем каждый артефакт
    for (const artifact of artifacts) {
      const analysis = await this.analyzeArtifact(artifact);
      
      report.artifacts.push({
        type: artifact.artifact_type,
        name: artifact.artifact_name,
        completeness: artifact.completeness,
        missing_fields: analysis.missing_fields,
        critical_missing: analysis.critical_missing
      });
      
      // Если есть критически важные недостающие данные
      if (analysis.critical_missing.length > 0) {
        report.missing_data.push({
          artifact_id: artifact.id,
          artifact_type: artifact.artifact_type,
          critical_fields: analysis.critical_missing
        });
      }
    }
    
    // Общая полнота
    report.overall_completeness = this.calculateOverallCompleteness(report.artifacts);
    
    // Рекомендации по заполнению
    report.recommendations = await this.generateRecommendations(report);
    
    return report;
  }
  
  /**
   * Запрос недостающих данных через коммуникацию
   */
  async requestMissingData(
    projectId: string,
    missingData: MissingDataItem[]
  ): Promise<void> {
    const project = await db.projects.findById(projectId);
    const team = await db.projectTeam.findAll({ project_id: projectId });
    
    // Для каждого недостающего элемента формируем вопрос
    for (const item of missingData) {
      const questions = await this.generateQuestionsForMissingData(item);
      
      // Определяем, кого спросить (по RACI)
      const responsibleUser = this.findResponsibleUser(team, item.artifact_type);
      
      // Отправляем вопросы в чат команды
      await chatService.sendMessage({
        project_id: projectId,
        from: 'ai_assistant',
        to: responsibleUser.id,
        message: this.formatQuestions(questions),
        context: {
          artifact_id: item.artifact_id,
          missing_fields: item.critical_fields
        }
      });
    }
  }
  
  /**
   * Формирование вопросов для получения недостающих данных
   */
  private async generateQuestionsForMissingData(
    item: MissingDataItem
  ): Promise<string[]> {
    const artifact = await db.projectArtifacts.findById(item.artifact_id);
    
    const questions: string[] = [];
    
    // Пример для брифа
    if (artifact.artifact_type === 'brief') {
      for (const field of item.critical_fields) {
        switch (field) {
          case 'budget.total':
            questions.push('Какой общий бюджет кампании?');
            break;
          case 'target_audience.age':
            questions.push('Какой возраст целевой аудитории?');
            break;
          case 'geography':
            questions.push('В каких городах/регионах планируется кампания?');
            break;
          case 'period.start':
            questions.push('Когда планируется запуск кампании?');
            break;
        }
      }
    }
    
    // Пример для медиаплана
    if (artifact.artifact_type === 'media_plan') {
      for (const field of item.critical_fields) {
        switch (field) {
          case 'channels[].budget':
            questions.push('Как распределить бюджет по каналам?');
            break;
          case 'channels[].kpis':
            questions.push('Какие KPI ожидаются по каждому каналу?');
            break;
          case 'targeting':
            questions.push('Какие параметры таргетинга использовать?');
            break;
        }
      }
    }
    
    return questions;
  }
  
  /**
   * Обработка ответов от пользователя
   */
  async processUserResponse(
    projectId: string,
    artifactId: string,
    userResponse: string
  ): Promise<void> {
    // 1. AI извлекает данные из ответа
    const extractedData = await this.extractDataFromResponse(userResponse);
    
    // 2. Обновляем артефакт
    const artifact = await db.projectArtifacts.findById(artifactId);
    const updatedData = this.mergeData(artifact.data, extractedData);
    
    await db.projectArtifacts.update(artifactId, {
      data: updatedData,
      completeness: this.calculateCompleteness(updatedData),
      updated_at: new Date()
    });
    
    // 3. Синхронизируем с Google Sheets
    await syncService.syncToSheets(artifactId);
    
    // 4. Проверяем, остались ли недостающие данные
    const newAnalysis = await this.analyzeArtifact(artifact);
    
    if (newAnalysis.critical_missing.length > 0) {
      // Продолжаем задавать вопросы
      await this.requestMissingData(projectId, [{
        artifact_id: artifactId,
        artifact_type: artifact.artifact_type,
        critical_fields: newAnalysis.critical_missing
      }]);
    } else {
      // Все данные собраны!
      await notifications.send({
        project_id: projectId,
        type: 'artifact_completed',
        message: `${artifact.artifact_name} полностью заполнен! ✅`
      });
    }
  }
}
```

---

## 🔁 МЕСЯЧНЫЕ ИТЕРАЦИИ

### Структура месячной итерации

```typescript
/**
 * Месячная итерация проекта
 */
interface MonthlyIteration {
  id: string;
  project_id: string;
  period: {
    month: number;       // 1-12
    year: number;        // 2025
    name: string;        // "Ноябрь 2025"
  };
  
  // Артефакты периода
  artifacts: {
    brief: Artifact | null;
    media_plan: Artifact | null;
    strategy: Artifact | null;
    reports: Artifact[];
    orders: Artifact[];
  };
  
  // Данные периода
  budget: {
    allocated: number;
    spent: number;
    remaining: number;
  };
  
  // Метрики периода
  metrics: {
    impressions: number;
    clicks: number;
    conversions: number;
    cost: number;
    revenue: number;
    romi: number;
  };
  
  // Статус
  status: 'planning' | 'active' | 'completed' | 'archived';
  completeness: number; // % заполненности данных
}

/**
 * Создание новой месячной итерации
 */
async function createMonthlyIteration(
  projectId: string,
  month: number,
  year: number
): Promise<MonthlyIteration> {
  // 1. Создаем период
  const period = await db.projectPeriods.create({
    project_id: projectId,
    period_month: month,
    period_year: year,
    period_name: formatMonthName(month, year),
    status: 'planning',
    start_date: new Date(year, month - 1, 1),
    end_date: new Date(year, month, 0)
  });
  
  // 2. Создаем структуру артефактов для периода
  const artifactTemplates = [
    { type: 'brief', name: `Бриф ${period.period_name}` },
    { type: 'media_plan', name: `Медиаплан ${period.period_name}` },
    { type: 'strategy', name: `Стратегия ${period.period_name}` }
  ];
  
  for (const template of artifactTemplates) {
    await db.projectArtifacts.create({
      project_id: projectId,
      period_id: period.id,
      artifact_type: template.type,
      artifact_name: template.name,
      data: {},
      status: 'draft',
      completeness: 0
    });
  }
  
  // 3. Добавляем вкладку в Google Sheets для этого периода
  const project = await db.projects.findById(projectId);
  await sheetsService.addPeriodTab(project.sheets_id, period);
  
  // 4. Уведомляем команду
  await notifications.send({
    project_id: projectId,
    type: 'period_created',
    message: `Создан новый период: ${period.period_name}`
  });
  
  return {
    id: period.id,
    project_id: projectId,
    period: {
      month,
      year,
      name: period.period_name
    },
    artifacts: {
      brief: null,
      media_plan: null,
      strategy: null,
      reports: [],
      orders: []
    },
    budget: {
      allocated: 0,
      spent: 0,
      remaining: 0
    },
    metrics: {
      impressions: 0,
      clicks: 0,
      conversions: 0,
      cost: 0,
      revenue: 0,
      romi: 0
    },
    status: 'planning',
    completeness: 0
  };
}
```

---

## 📊 ПРИМЕР: ПОЛНЫЙ ЦИКЛ ПРОЕКТА

### Шаг 1: Создание проекта

```typescript
// Новый клиент: Сбербанк
const client = await db.clients.create({
  name: 'Сбербанк',
  type: 'direct_advertiser',
  industry: 'Финансы',
  website: 'https://www.sberbank.ru'
});

// Создаем проект
const project = await db.projects.create({
  client_id: client.id,
  name: 'Сбербанк - Премиум карта Q4 2025',
  description: 'Продвижение премиальной карты для состоятельных клиентов',
  budget_total: 15000000,
  budget_currency: 'RUB',
  start_date: '2025-10-01',
  end_date: '2025-12-31',
  visual_settings: {
    brand_colors: {
      primary: '#21A038', // Зеленый Сбербанка
      secondary: '#FFFFFF',
      accent: '#FFD700'
    },
    logo_url: 'https://example.com/sber-logo.png',
    fonts: {
      header: 'SBSansDisplay Bold',
      body: 'SBSansText Regular'
    },
    hidden_fields: ['internal_notes', 'profit_margin']
  }
});

// Создаем Google Sheets для проекта
const sheetsId = await sheetsService.createProjectSheet(project);

await db.projects.update(project.id, {
  sheets_id: sheetsId,
  sheets_url: `https://docs.google.com/spreadsheets/d/${sheetsId}`
});

// Формируем команду проекта
await db.projectTeam.createMany([
  { project_id: project.id, user_id: 'pm-123', role: 'project_manager', raci: 'A' },
  { project_id: project.id, user_id: 'acc-456', role: 'account_manager', raci: 'R' },
  { project_id: project.id, user_id: 'strat-789', role: 'strategist', raci: 'C' },
  { project_id: project.id, user_id: 'spec-101', role: 'specialist', raci: 'R' }
]);
```

### Шаг 2: Клиент отправляет бриф (Excel)

```typescript
// Клиент загружает бриф через чат с AI-ассистентом
const briefFile = {
  name: 'Бриф_Сбербанк_Премиум_карта.xlsx',
  type: 'excel',
  size: 125000,
  buffer: '...'
};

// AI-ассистент обрабатывает файл
const processedBrief = await processBriefFile(briefFile, project.id);

// Результат:
// ✅ Данные извлечены из Excel
// ✅ Создан артефакт "Бриф" с completeness: 85%
// ✅ Google Sheets обновлен (вкладка "Бриф")
// ✅ Команда уведомлена

// AI видит, что 15% данных не хватает
const completenessReport = await aiAssistant.analyzeDataCompleteness(project.id);

// AI запрашивает недостающие данные:
await chatService.sendMessage({
  project_id: project.id,
  from: 'ai_assistant',
  to: 'acc-456', // Account Manager
  message: `
Привет! Я обработал бриф от клиента. Отлично! 🎉

Но есть пара уточнений:
1. Не указан конкретный возраст ЦА (есть только "25-45", но нужен приоритет)
2. Не указаны города (география) - планируется вся Россия или конкретные регионы?
3. Какие конкретные KPI ожидает клиент? (CPA, ROMI, etc.)

Можешь уточнить у клиента? 🙏
  `
});
```

### Шаг 3: Account Manager отвечает

```typescript
// Account Manager отвечает в чате:
const userResponse = `
Уточнил у клиента:
1. Приоритет ЦА: 30-40 лет (ядро аудитории)
2. География: Москва, Санкт-Петербург, Екатеринбург, Новосибирск, Казань
3. KPI: CPA ≤ 1500 руб, ROMI ≥ 200%
`;

// AI извлекает данные из ответа и обновляет бриф
await aiAssistant.processUserResponse(project.id, briefArtifact.id, userResponse);

// Результат:
// ✅ Бриф обновлен с completeness: 100% ✅
// ✅ Google Sheets синхронизирован
// ✅ Теперь можно формировать медиаплан!
```

### Шаг 4: AI генерирует медиаплан

```typescript
// Теперь, когда бриф полностью заполнен, AI может генерировать медиаплан
const mediaPlan = await aiAssistant.generateMediaPlan({
  project_id: project.id,
  brief: briefData,
  budget: 5000000, // За месяц (октябрь)
  period: { month: 10, year: 2025 }
});

// AI создает артефакт "Медиаплан"
const mediaPlanArtifact = await db.projectArtifacts.create({
  project_id: project.id,
  period_id: octoberPeriod.id,
  artifact_type: 'media_plan',
  artifact_name: 'Медиаплан Октябрь 2025',
  data: mediaPlan,
  status: 'pending_approval',
  completeness: 100,
  source_type: 'ai_generated'
});

// Обновляем Google Sheets (вкладка "Медиаплан")
await sheetsService.updateMediaPlanTab(
  project.id,
  octoberPeriod.id,
  mediaPlan,
  project.visual_settings // ← С учетом стиля Сбербанка!
);

// Уведомляем команду для ревью
await notifications.send({
  project_id: project.id,
  type: 'media_plan_ready',
  message: 'Медиаплан сгенерирован AI. Требуется ревью! 👀',
  assigned_to: ['pm-123', 'strat-789']
});
```

### Шаг 5: Команда корректирует и утверждает

```typescript
// PM вносит правки в Google Sheets
// Синхронизация Sheets → БД происходит автоматически (webhook)

await syncService.syncFromSheets(project.id, 'Медиаплан', 'A1:Z100');

// PM утверждает медиаплан
await db.projectArtifacts.update(mediaPlanArtifact.id, {
  status: 'approved',
  approved_by: 'pm-123',
  approved_at: new Date()
});

// ✅ Проект готов к запуску!
```

---

## 🎯 КЛЮЧЕВЫЕ ПРИНЦИПЫ

### 1. **Один раз извлечь - больше не читать**
```
❌ НЕПРАВИЛЬНО:
  Каждый раз читать Excel → Медленно, дорого, неэффективно

✅ ПРАВИЛЬНО:
  Один раз извлечь → Структурировать → Записать в БД → Работать с БД
```

### 2. **Структурированные данные - основа**
```
Все данные проекта хранятся в структурированном виде:
  - PostgreSQL: основные данные
  - ClickHouse: аналитика, метрики
  - Google Sheets: интерфейс для команды
```

### 3. **AI-ассистент - заполнитель данных**
```
Главная задача AI:
  1. Анализировать полноту данных
  2. Запрашивать недостающее через коммуникацию
  3. Обновлять структуру при получении данных
  4. Стремиться к 100% completeness
```

### 4. **Google Sheets - живой интерфейс**
```
Не статический отчет, а живой интерфейс:
  - Синхронизация БД ↔ Sheets
  - Визуальный стиль клиента
  - Скрытие неиспользуемых полей
  - Real-time обновления
```

### 5. **Месячные итерации**
```
Проект живет месячными циклами:
  - Каждый месяц = новая итерация
  - Своя структура артефактов
  - Свои данные, бюджет, метрики
  - Вкладка в Google Sheets
```

---

## 📈 МЕТРИКИ ЭФФЕКТИВНОСТИ

### 1. Полнота данных (Data Completeness)
```typescript
// Целевые показатели
const targets = {
  brief: 100%,          // Бриф должен быть полностью заполнен
  media_plan: 100%,     // Медиаплан должен быть полностью заполнен
  strategy: 80%,        // Стратегия может быть на 80% (не все поля обязательны)
  reports: 95%,         // Отчеты должны быть почти полными
  overall: 95%          // Общая полнота проекта
};

// Мониторинг
async function monitorDataCompleteness(projectId: string): Promise<Report> {
  const artifacts = await db.projectArtifacts.findAll({ project_id: projectId });
  
  const report = {
    overall: calculateAverage(artifacts.map(a => a.completeness)),
    by_type: groupBy(artifacts, 'artifact_type').map(group => ({
      type: group.key,
      completeness: calculateAverage(group.items.map(a => a.completeness)),
      target: targets[group.key],
      status: group.completeness >= targets[group.key] ? '✅' : '⚠️'
    }))
  };
  
  return report;
}
```

### 2. Время до полного заполнения (Time to Complete)
```typescript
// Измеряем, сколько времени уходит на заполнение данных проекта
const metrics = {
  brief: {
    target: '2 hours',    // Цель: 2 часа с момента получения файла
    current: '1.5 hours'  // Текущее среднее
  },
  media_plan: {
    target: '1 day',
    current: '6 hours'
  },
  overall_project: {
    target: '3 days',     // От создания проекта до 95% полноты
    current: '2 days'
  }
};
```

### 3. Качество извлеченных данных (Extraction Quality)
```typescript
// AI-confidence в извлеченных данных
const qualityMetrics = {
  ai_confidence_avg: 0.92,     // Средняя уверенность AI: 92%
  human_edit_rate: 0.08,       // Люди правят 8% извлеченных данных
  error_rate: 0.02             // Ошибок: 2%
};
```

---

## 🔒 БЕЗОПАСНОСТЬ И КОНФИДЕНЦИАЛЬНОСТЬ

### 1. Разделение доступа
```sql
-- У каждого участника команды свои права доступа
CREATE TABLE project_permissions (
  id UUID PRIMARY KEY,
  project_id UUID REFERENCES projects(id),
  user_id UUID REFERENCES users(id),
  can_view BOOLEAN DEFAULT TRUE,
  can_edit BOOLEAN DEFAULT FALSE,
  can_approve BOOLEAN DEFAULT FALSE,
  can_delete BOOLEAN DEFAULT FALSE,
  artifacts_access TEXT[] DEFAULT '{}', -- Список типов артефактов, к которым есть доступ
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 2. Шифрование данных
```typescript
// Чувствительные данные шифруются
interface EncryptedData {
  encrypted: boolean;
  algorithm: 'AES-256-GCM';
  fields: string[]; // Какие поля зашифрованы
}

// Например, бюджетные данные
const budget = {
  total: encrypt(5000000),      // Шифруем значение
  currency: 'RUB',
  encrypted: true
};
```

### 3. Аудит изменений
```typescript
// Все изменения логируются
const auditLog = await db.artifactChanges.findAll({
  artifact_id: artifactId,
  order: 'created_at DESC'
});

// Можем восстановить любую версию
async function restoreVersion(artifactId: string, timestamp: Date): Promise<void> {
  const changes = await db.artifactChanges.findAll({
    artifact_id: artifactId,
    created_at: { lte: timestamp }
  });
  
  // Применяем изменения в обратном порядке
  const restoredData = applyChanges(changes);
  
  await db.projectArtifacts.update(artifactId, {
    data: restoredData
  });
}
```

---

## 📚 ДОКУМЕНТАЦИЯ ДЛЯ РАЗРАБОТЧИКОВ

### API Endpoints

```typescript
// Проекты
POST   /api/projects                    // Создать проект
GET    /api/projects/:id                // Получить проект
PUT    /api/projects/:id                // Обновить проект
DELETE /api/projects/:id                // Удалить проект

// Периоды
POST   /api/projects/:id/periods        // Создать период
GET    /api/projects/:id/periods        // Получить все периоды
GET    /api/periods/:id                 // Получить период

// Артефакты
POST   /api/projects/:id/artifacts      // Создать артефакт
GET    /api/projects/:id/artifacts      // Получить все артефакты проекта
GET    /api/artifacts/:id               // Получить артефакт
PUT    /api/artifacts/:id               // Обновить артефакт
DELETE /api/artifacts/:id               // Удалить артефакт

// Файлы
POST   /api/projects/:id/files          // Загрузить файл
GET    /api/projects/:id/files          // Получить файлы проекта
POST   /api/files/:id/process           // Обработать файл

// Синхронизация с Google Sheets
POST   /api/projects/:id/sync/to-sheets // Синхронизировать БД → Sheets
POST   /api/projects/:id/sync/from-sheets // Синхронизировать Sheets → БД

// Анализ данных
GET    /api/projects/:id/completeness   // Отчет о полноте данных
GET    /api/projects/:id/missing-data   // Недостающие данные
```

---

## 🎯 ЧЕКЛИСТ ДЛЯ СОЗДАНИЯ НОВОГО ПРОЕКТА

```
□ 1. Создать клиента (если новый)
□ 2. Создать проект в БД
□ 3. Создать Google Sheets для проекта
□ 4. Применить визуальный стиль клиента к Sheets
□ 5. Создать структуру артефактов (пустые)
□ 6. Сформировать команду проекта
□ 7. Настроить права доступа
□ 8. Создать первый месячный период
□ 9. Активировать AI-ассистента
□ 10. Отправить приглашения команде
□ 11. Начать сбор данных через коммуникацию
```

---

## 📖 ГЛОССАРИЙ

| Термин | Определение |
|--------|-------------|
| **Проект** | Структура данных для работы с клиентом, включает БД + Google Sheets |
| **Артефакт** | Любой документ/данные проекта (бриф, медиаплан, отчет, etc.) |
| **Период** | Месячная итерация проекта |
| **Completeness** | % заполненности данных артефакта/проекта |
| **Sheets Tab** | Вкладка в Google Sheets, соответствующая артефакту |
| **Source Type** | Откуда пришли данные (excel_import, chat, ai_generated, etc.) |
| **Visual Settings** | Визуальный стиль клиента (цвета, логотип, шрифты) |
| **Hidden Fields** | Поля, которые скрыты в Google Sheets для клиента |

---

**Версия:** 1.0  
**Дата:** 24.10.2025  
**Статус:** ✅ Утверждено


