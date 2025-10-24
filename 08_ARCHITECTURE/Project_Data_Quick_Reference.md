---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: quick_reference
title: Project Data Architecture - Quick Reference
language: ru
industry: advertising
role_apply: [developer, architect, pm]
period: 2025-10
version: "1.0"
source_path: 08_ARCHITECTURE/Project_Data_Quick_Reference.md
effective_date: 2025-10-24
visibility: internal
security_level: medium
tags: [architecture, quick_reference, cheatsheet]
---

# Project Data Architecture - Quick Reference
## Быстрая памятка по архитектуре данных проекта

→ [Full Documentation](./Project_Data_Architecture.md)

---

## 🎯 СУТЬ В ОДНОМ ПРЕДЛОЖЕНИИ

**MRM = Living Database проекта, где AI-ассистент собирает данные через коммуникацию и синхронизирует их с Google Sheets интерфейсом.**

---

## 🔑 КЛЮЧЕВЫЕ ПРИНЦИПЫ

```
1. Файлы → Структура → БД (один раз!)
   ❌ НЕ читаем файлы каждый раз
   ✅ Извлекли данные → Записали в БД → Работаем с БД

2. Проект = БД + Google Sheets
   • PostgreSQL: структурированные данные
   • Google Sheets: интерфейс для команды
   • Real-time двусторонняя синхронизация

3. Месячные итерации
   • Каждый месяц = отдельная запись
   • Свои артефакты, бюджет, метрики

4. AI-ассистент = Data Collector
   • Обрабатывает файлы
   • Мониторит completeness
   • Запрашивает недостающее через чат
   • Цель: 100% полнота данных

5. Google Sheets = Живой интерфейс
   • Визуальный стиль клиента
   • Скрытые ненужные поля
   • Real-time обновления
```

---

## 📊 СТРУКТУРА БД (core tables)

```sql
-- 1. Проект
projects {
  id, client_id, name, budget_total,
  sheets_id, sheets_url,           -- ← Google Sheets
  visual_settings,                  -- ← Стиль клиента
  start_date, end_date
}

-- 2. Месячные периоды
project_periods {
  id, project_id,
  period_month, period_year,        -- 1-12, 2025
  budget_allocated, budget_spent,
  status                            -- planning, active, completed
}

-- 3. Артефакты (данные проекта)
project_artifacts {
  id, project_id, period_id,
  artifact_type,                    -- brief, media_plan, strategy, report
  data,                             -- ← JSONB с данными
  completeness,                     -- ← % полноты (0-100)
  sheets_tab_name,                  -- ← Вкладка в Sheets
  source_type,                      -- excel_import, chat, ai_generated
  ai_extracted, ai_confidence
}

-- 4. Файлы
project_files {
  id, project_id, period_id,
  file_name, file_type, file_url,   -- S3
  processing_status,                -- pending, processing, completed
  extracted_data,                   -- ← Что извлекли
  linked_artifacts                  -- ← Какие артефакты создали
}

-- 5. История изменений
artifact_changes {
  id, artifact_id,
  field_path, old_value, new_value,
  change_source,                    -- user, ai, sheets, import
  created_at
}
```

---

## 🔄 DATA FLOW (упрощенно)

```
┌─────────────────────┐
│ 1. Файл от клиента  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ 2. AI извлекает     │
│    данные           │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ 3. Валидация        │
│    (completeness)   │
└──────────┬──────────┘
           │
           ├─── 85% → Запросить недостающее
           └─── 100% → ✓
           │
           ▼
┌─────────────────────┐
│ 4. Запись в БД      │
│    (project_artifacts)│
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ 5. Sync Google Sheets│
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ 6. Уведомление      │
│    команды          │
└─────────────────────┘

┌─────────────────────┐
│ 7. AI запрашивает   │
│    недостающее      │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ 8. Ответ от команды │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ 9. Обновление БД    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ 10. Sync Sheets     │
└─────────────────────┘

♻️  Цикл повторяется до 100% completeness
```

---

## 🤖 AI-АССИСТЕНТ: Основные задачи

```typescript
// 1. Обработка файла
onFileReceived(file) {
  → uploadToS3()
  → detectArtifactType()
  → extractData()
  → validate()
  → createArtifact()
  → syncToSheets()
  → requestMissingData()
}

// 2. Мониторинг completeness
setInterval(() => {
  → analyzeDataCompleteness()
  → if (< 90%) requestMissingData()
}, 30 * 60 * 1000); // каждые 30 мин

// 3. Обработка ответов
onMessageReceived(message) {
  → extractDataFromMessage()
  → updateArtifact()
  → syncToSheets()
  → checkCompleteness()
}

// 4. Синхронизация Sheets
onArtifactChanged(artifact) {
  → transformToSheetFormat()
  → applyVisualStyle()
  → updateSheets()
}
```

---

## 📋 GOOGLE SHEETS: Структура

```
📊 [Название проекта] - MRM Data Hub

Вкладки:
├─ 📝 Бриф              (artifact_type: 'brief')
├─ 🎯 Стратегия         (artifact_type: 'strategy')
├─ 📊 Медиаплан Окт     (artifact_type: 'media_plan', period: Oct)
├─ 📊 Медиаплан Ноя     (artifact_type: 'media_plan', period: Nov)
├─ 📊 Медиаплан Дек     (artifact_type: 'media_plan', period: Dec)
├─ 💰 Бюджет            (сводка по бюджету)
├─ 👥 Команда           (project_team)
├─ 📈 Отчеты            (artifact_type: 'report')
├─ 📋 Задачи            (tasks)
└─ 📁 Файлы             (project_files, ссылки)

Настройки:
• Визуальный стиль клиента (brand_colors, logo, fonts)
• Скрытые поля (hidden_fields из visual_settings)
• Real-time sync с БД (webhook)
```

---

## 🔄 СИНХРОНИЗАЦИЯ: БД ↔ SHEETS

```typescript
// БД → Sheets
db.projectArtifacts.on('update', async (artifact) => {
  await syncToSheets(artifact.id);
});

// Sheets → БД (webhook)
app.post('/api/webhooks/sheets', async (req) => {
  const { sheetId, range, newValues } = req.body;
  await syncFromSheets(sheetId, range, newValues);
});

// Conflict resolution
if (dbUpdatedAt > sheetsUpdatedAt) {
  source = 'db'; // БД новее
} else {
  source = 'sheets'; // Sheets новее
}
```

---

## 📊 COMPLETENESS: Расчет и мониторинг

```typescript
// Пример расчета для брифа
const briefSchema = {
  client_name: { required: true, weight: 10 },
  campaign_objective: { required: true, weight: 10 },
  budget: { required: true, weight: 15 },
  target_audience: { required: true, weight: 15 },
  geography: { required: true, weight: 15 },
  period: { required: true, weight: 10 },
  kpis: { required: true, weight: 15 },
  brand_guidelines: { required: false, weight: 5 },
  competitors: { required: false, weight: 5 }
};

// Completeness = (filled_weight / total_required_weight) * 100
// Пример: заполнено 70 из 90 → 77.7%

// Dashboard
{
  overall: 76%,
  artifacts: [
    { type: 'brief', completeness: 100%, status: '✅' },
    { type: 'media_plan_oct', completeness: 100%, status: '✅' },
    { type: 'media_plan_nov', completeness: 80%, status: '⏳' },
    { type: 'media_plan_dec', completeness: 47%, status: '⚠️' }
  ]
}
```

---

## 🎯 МЕТРИКИ УСПЕХА

```
1. Полнота данных (Data Completeness)
   Цель: >95% по всем проектам
   
2. Время до полноты (Time to Complete)
   Цель: <3 дня от создания проекта
   
3. Качество извлечения (Extraction Quality)
   Цель: >90% AI confidence
   
4. Скорость обработки файлов
   Цель: <5 минут
   
5. Активность AI-ассистента
   Цель: >80% response rate от команды
```

---

## 🛠️ API ENDPOINTS (основные)

```typescript
// Проекты
POST   /api/projects                    // Создать
GET    /api/projects/:id                // Получить
POST   /api/projects/:id/periods        // Создать период

// Артефакты
POST   /api/projects/:id/artifacts      // Создать
GET    /api/artifacts/:id               // Получить
PUT    /api/artifacts/:id               // Обновить
GET    /api/artifacts/:id/completeness  // Полнота

// Файлы
POST   /api/projects/:id/files          // Загрузить
POST   /api/files/:id/process           // Обработать

// Синхронизация
POST   /api/projects/:id/sync/to-sheets // БД → Sheets
POST   /api/webhooks/sheets             // Sheets → БД

// Анализ
GET    /api/projects/:id/completeness   // Отчет о полноте
GET    /api/projects/:id/missing-data   // Недостающие данные
```

---

## ⚠️ ВАЖНЫЕ ПРАВИЛА

```
✅ DO:
• Один раз извлечь файл → записать в БД → больше не читать
• Всегда синхронизировать БД ↔ Sheets после изменений
• Мониторить completeness постоянно
• Запрашивать конкретные данные, не абстрактно
• Применять визуальный стиль клиента к Sheets
• Логировать все изменения в artifact_changes

❌ DON'T:
• Читать файлы повторно
• Забывать синхронизировать Sheets
• Запрашивать данные без контекста
• Игнорировать низкую completeness
• Хранить данные в файлах вместо БД
• Терять историю изменений
```

---

## 🔍 TROUBLESHOOTING

```typescript
// Проблема: Файл не обрабатывается
→ Проверить тип файла (supported?)
→ Проверить размер (<10MB?)
→ Проверить формат (corrupted?)

// Проблема: Низкая completeness
→ Проверить validation schema
→ Запросить недостающие данные
→ Уведомить команду

// Проблема: Конфликт данных
→ Сравнить timestamps
→ Взять более свежие
→ Уведомить об изменении

// Проблема: Sheets не синхронизируется
→ Проверить sheets_id проекта
→ Проверить права доступа
→ Проверить webhook настройку
```

---

## 📚 ПРИМЕРЫ КОДА

### Создание проекта с инициализацией

```typescript
async function createProjectWithStructure(data: CreateProjectInput) {
  // 1. Создать проект
  const project = await db.projects.create({
    client_id: data.clientId,
    name: data.name,
    budget_total: data.budget,
    visual_settings: data.visualSettings
  });
  
  // 2. Создать Google Sheets
  const sheetsId = await sheets.create({
    title: `${data.name} - MRM Data Hub`,
    tabs: ['Бриф', 'Стратегия', 'Медиаплан', 'Бюджет', 'Команда']
  });
  
  await db.projects.update(project.id, { sheets_id: sheetsId });
  
  // 3. Создать месячные периоды
  const periods = generateMonthlyPeriods(data.startDate, data.endDate);
  for (const period of periods) {
    await db.projectPeriods.create({
      project_id: project.id,
      ...period
    });
  }
  
  // 4. Создать пустые артефакты
  const artifactTypes = ['brief', 'media_plan', 'strategy'];
  for (const type of artifactTypes) {
    await db.projectArtifacts.create({
      project_id: project.id,
      artifact_type: type,
      data: {},
      completeness: 0
    });
  }
  
  return project;
}
```

### Обработка файла

```typescript
async function processUploadedFile(fileId: string) {
  const file = await db.projectFiles.findById(fileId);
  
  // 1. Извлечь данные
  const extractedData = await aiExtractor.extract(file);
  
  // 2. Определить тип артефакта
  const artifactType = detectType(extractedData);
  
  // 3. Валидация
  const validation = validate(extractedData, artifactType);
  
  // 4. Создать артефакт
  const artifact = await db.projectArtifacts.create({
    project_id: file.project_id,
    artifact_type: artifactType,
    data: extractedData,
    completeness: validation.completeness,
    source_file_id: file.id,
    ai_extracted: true
  });
  
  // 5. Sync Sheets
  await syncToSheets(artifact.id);
  
  // 6. Запросить недостающее
  if (validation.missing.length > 0) {
    await requestMissingData(artifact.id, validation.missing);
  }
  
  return artifact;
}
```

### Мониторинг completeness

```typescript
async function monitorProjectCompleteness(projectId: string) {
  const artifacts = await db.projectArtifacts.findAll({ project_id: projectId });
  
  const report = {
    overall: 0,
    artifacts: [],
    missing: []
  };
  
  for (const artifact of artifacts) {
    const analysis = analyzeArtifact(artifact);
    
    report.artifacts.push({
      type: artifact.artifact_type,
      completeness: artifact.completeness,
      missing: analysis.missing
    });
    
    if (analysis.critical_missing.length > 0) {
      report.missing.push(...analysis.critical_missing);
    }
  }
  
  report.overall = 
    artifacts.reduce((sum, a) => sum + a.completeness, 0) / artifacts.length;
  
  // Если < 90%, уведомить
  if (report.overall < 90) {
    await notifyTeam(projectId, report);
  }
  
  return report;
}
```

---

## 🎯 ЧЕКЛИСТ: Новый проект

```
□ 1. Создать запись в projects
□ 2. Создать Google Sheets
□ 3. Применить визуальный стиль клиента
□ 4. Создать месячные периоды (project_periods)
□ 5. Создать пустые артефакты (project_artifacts)
□ 6. Добавить команду (project_team)
□ 7. Настроить права доступа
□ 8. Активировать AI-ассистента
□ 9. Настроить webhook от Sheets
□ 10. Отправить welcome message команде
```

---

## 🎯 ЧЕКЛИСТ: Обработка файла

```
□ 1. Загрузить в S3
□ 2. Создать запись в project_files
□ 3. Определить тип артефакта
□ 4. Извлечь данные AI
□ 5. Валидировать по schema
□ 6. Создать/обновить artifact
□ 7. Синхронизировать с Sheets
□ 8. Уведомить команду
□ 9. Запросить недостающие данные (если < 100%)
□ 10. Логировать в artifact_changes
```

---

## 📖 ГЛОССАРИЙ

| Термин | Значение |
|--------|----------|
| **Project** | Контейнер данных для работы с клиентом |
| **Period** | Месячная итерация проекта |
| **Artifact** | Любой документ/данные (бриф, медиаплан, отчет) |
| **Completeness** | % заполненности данных (0-100) |
| **Sheets Tab** | Вкладка в Google Sheets для артефакта |
| **Source Type** | Откуда пришли данные (file, chat, ai, manual) |
| **Visual Settings** | Настройки стиля клиента (цвета, логотип, шрифты) |
| **Sync** | Синхронизация между БД и Google Sheets |
| **AI Confidence** | Уверенность AI в извлеченных данных (0-1) |

---

## 🔗 ССЫЛКИ

- [Full Documentation](./Project_Data_Architecture.md)
- [Lifecycle Diagrams](./Project_Lifecycle_Diagram.md)
- [AI Assistant Guide](../06_AI_ASSISTANTS/Project_Data_Assistant_Guide.md)
- [Data Models](./Data_Models.md)

---

**Версия:** 1.0  
**Дата:** 24.10.2025  
**Для печати:** A4, 2-sided


