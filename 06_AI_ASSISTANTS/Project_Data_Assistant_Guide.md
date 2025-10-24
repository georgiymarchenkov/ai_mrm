---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: guide
title: Project Data Assistant Guide - Руководство для AI-ассистента по данным проекта
language: ru
industry: advertising
role_apply: [ai_assistant]
period: 2025-10
version: "1.0"
source_path: 06_AI_ASSISTANTS/Project_Data_Assistant_Guide.md
effective_date: 2025-10-24
visibility: internal
security_level: medium
tags: [ai, assistant, guide, data]
---

# Project Data Assistant Guide
## Руководство для AI-ассистента по данным проекта

→ [AI Assistants](./_README.md)  
→ [Project Data Architecture](../08_ARCHITECTURE/Project_Data_Architecture.md)

---

## 🎯 ТВОЯ ГЛАВНАЯ ЗАДАЧА

**Максимально заполнить данные проекта через коммуникацию с командой**

---

## 📋 ОСНОВНЫЕ ПРИНЦИПЫ

### 1. Файлы → Структура → БД (один раз!)

```
❌ НЕПРАВИЛЬНО:
  Каждый раз читать Excel файл для получения данных

✅ ПРАВИЛЬНО:
  1. Получил файл
  2. Извлек данные AI
  3. Структурировал
  4. Записал в БД
  5. Синхронизировал с Google Sheets
  6. Файл больше НЕ читаем!
```

### 2. Мониторинг completeness - твой приоритет

```typescript
// Постоянно проверяй полноту данных
const completeness = await analyzeDataCompleteness(projectId);

if (completeness.overall < 95%) {
  // Есть недостающие данные - запроси их!
  await requestMissingData(completeness.missing_data);
}
```

### 3. Проактивность в коммуникации

```
❌ НЕПРАВИЛЬНО:
  Ждать, пока пользователь сам предоставит все данные

✅ ПРАВИЛЬНО:
  Активно запрашивать недостающую информацию:
  - "Какой бюджет на Telegram Ads?"
  - "Когда планируется запуск?"
  - "Какие KPI ожидает клиент?"
```

### 4. Контекст = Данные из БД, НЕ файлы

```typescript
// ❌ НЕПРАВИЛЬНО
const brief = await readExcelFile('brief.xlsx');

// ✅ ПРАВИЛЬНО
const brief = await db.projectArtifacts.findOne({
  project_id: projectId,
  artifact_type: 'brief'
});
```

---

## 🔄 WORKFLOW: Обработка файла

### Шаг 1: Получение файла

```typescript
// Пользователь загружает файл через чат
onFileReceived(async (file: File) => {
  // 1. Определи тип файла
  const fileType = detectFileType(file); // excel, pdf, pptx
  
  // 2. Загрузи в S3
  const uploadedFile = await uploadToS3(file);
  
  // 3. Создай запись в БД
  const projectFile = await db.projectFiles.create({
    project_id: currentProjectId,
    file_name: file.name,
    file_type: fileType,
    file_url: uploadedFile.url,
    processing_status: 'pending'
  });
  
  // 4. Запусти обработку
  await processFile(projectFile);
});
```

### Шаг 2: Анализ и извлечение данных

```typescript
async function processFile(projectFile: ProjectFile): Promise<void> {
  // 1. Определи тип артефакта
  const artifactType = await detectArtifactType(projectFile);
  // Возможные типы: 'brief', 'media_plan', 'strategy', 'report'
  
  // 2. Извлеки данные с помощью AI
  const extractedData = await extractDataFromFile(projectFile, artifactType);
  
  // Пример для брифа:
  // {
  //   client_name: "Сбербанк",
  //   campaign_objective: "...",
  //   budget: { total: 15000000, currency: "RUB" },
  //   target_audience: { age: [30, 40], ... },
  //   geography: null,  // ← НЕ НАЙДЕНО!
  //   kpis: null        // ← НЕ НАЙДЕНО!
  // }
  
  // 3. Валидация по схеме
  const validation = await validateData(extractedData, artifactType);
  
  // 4. Создай/обнови артефакт
  const artifact = await upsertArtifact({
    project_id: projectFile.project_id,
    artifact_type: artifactType,
    data: extractedData,
    completeness: calculateCompleteness(extractedData, validation),
    source_type: 'file_import',
    source_file_id: projectFile.id,
    ai_extracted: true,
    ai_confidence: extractedData.confidence || 0.9
  });
  
  // 5. Обнови Google Sheets
  await syncToSheets(artifact.id);
  
  // 6. Отправь feedback пользователю
  await sendMessage({
    text: formatFileProcessingResult(artifact, validation),
    project_id: projectFile.project_id
  });
  
  // 7. Если есть недостающие данные - запроси!
  if (validation.missing.length > 0) {
    await requestMissingData(artifact.id, validation.missing);
  }
}
```

### Шаг 3: Запрос недостающих данных

```typescript
async function requestMissingData(
  artifactId: string,
  missingFields: string[]
): Promise<void> {
  const artifact = await db.projectArtifacts.findById(artifactId);
  const questions = generateQuestions(artifact.artifact_type, missingFields);
  
  // Определи, кого спросить (по RACI)
  const responsibleUser = await findResponsibleUser(
    artifact.project_id,
    artifact.artifact_type
  );
  
  // Отправь вопросы
  await sendMessage({
    project_id: artifact.project_id,
    to: responsibleUser.id,
    text: formatQuestions(questions),
    context: {
      artifact_id: artifactId,
      missing_fields: missingFields
    }
  });
}

function generateQuestions(
  artifactType: string,
  missingFields: string[]
): string[] {
  const questionTemplates = {
    brief: {
      'geography': 'В каких городах/регионах планируется кампания?',
      'kpis': 'Какие KPI ожидает клиент? (CPA, ROMI, CTR, etc.)',
      'budget.total': 'Какой общий бюджет кампании?',
      'period.start': 'Когда планируется запуск кампании?',
      'target_audience.age': 'Какой возраст целевой аудитории?'
    },
    media_plan: {
      'channels[].budget': 'Как распределить бюджет по каналам?',
      'channels[].kpis': 'Какие KPI ожидаются по каждому каналу?',
      'targeting': 'Какие параметры таргетинга использовать?',
      'schedule': 'Какой график размещения?'
    },
    strategy: {
      'key_insights': 'Какие ключевые инсайты есть по аудитории/рынку?',
      'recommendations': 'Какие рекомендации по каналам и форматам?'
    }
  };
  
  return missingFields.map(field => 
    questionTemplates[artifactType]?.[field] || `Уточните значение для: ${field}`
  );
}
```

### Шаг 4: Обработка ответов

```typescript
onMessageReceived(async (message: Message) => {
  // Проверь, это ответ на твой вопрос?
  if (!message.context?.artifact_id) return;
  
  const artifactId = message.context.artifact_id;
  const artifact = await db.projectArtifacts.findById(artifactId);
  
  // Извлеки данные из ответа
  const extractedData = await extractDataFromMessage(
    message.text,
    artifact.artifact_type,
    message.context.missing_fields
  );
  
  // Пример извлечения:
  // Ответ: "География: Москва, СПб, Екатеринбург. KPI: CPA ≤ 1500, ROMI ≥ 200%"
  // Извлечено:
  // {
  //   geography: ["Москва", "Санкт-Петербург", "Екатеринбург"],
  //   kpis: { cpa: 1500, romi: 200 }
  // }
  
  // Обнови артефакт
  const updatedData = mergeData(artifact.data, extractedData);
  
  await db.projectArtifacts.update(artifactId, {
    data: updatedData,
    completeness: calculateCompleteness(updatedData),
    updated_at: new Date()
  });
  
  // Синхронизируй с Sheets
  await syncToSheets(artifactId);
  
  // Проверь, все ли данные собраны
  const newAnalysis = await analyzeArtifact(artifact);
  
  if (newAnalysis.completeness === 100) {
    // ✅ Все собрано!
    await sendMessage({
      project_id: artifact.project_id,
      text: `✅ ${artifact.artifact_name} полностью заполнен! Все данные собраны.`
    });
  } else {
    // Продолжаем запрашивать
    await requestMissingData(artifactId, newAnalysis.missing_fields);
  }
});
```

---

## 📊 МОНИТОРИНГ COMPLETENESS

### Регулярная проверка полноты данных

```typescript
// Каждые 30 минут проверяй полноту данных активных проектов
setInterval(async () => {
  const activeProjects = await db.projects.findAll({ status: 'active' });
  
  for (const project of activeProjects) {
    const report = await analyzeDataCompleteness(project.id);
    
    // Если полнота < 90%, напомни команде
    if (report.overall_completeness < 90) {
      await notifyLowCompleteness(project, report);
    }
  }
}, 30 * 60 * 1000); // 30 минут

async function analyzeDataCompleteness(projectId: string): Promise<CompletenessReport> {
  const artifacts = await db.projectArtifacts.findAll({
    project_id: projectId,
    status: { not: 'archived' }
  });
  
  const report: CompletenessReport = {
    overall_completeness: 0,
    artifacts: [],
    missing_data: [],
    recommendations: []
  };
  
  // Анализируй каждый артефакт
  for (const artifact of artifacts) {
    const analysis = await analyzeArtifact(artifact);
    
    report.artifacts.push({
      id: artifact.id,
      type: artifact.artifact_type,
      name: artifact.artifact_name,
      completeness: artifact.completeness,
      missing_fields: analysis.missing_fields,
      critical_missing: analysis.critical_missing
    });
    
    if (analysis.critical_missing.length > 0) {
      report.missing_data.push({
        artifact_id: artifact.id,
        artifact_type: artifact.artifact_type,
        critical_fields: analysis.critical_missing
      });
    }
  }
  
  // Общая полнота
  report.overall_completeness = 
    artifacts.reduce((sum, a) => sum + a.completeness, 0) / artifacts.length;
  
  // Рекомендации
  report.recommendations = generateRecommendations(report);
  
  return report;
}
```

### Dashboard для команды

```typescript
// Генерируй dashboard с полнотой данных
async function generateCompletenessDashboard(projectId: string): Promise<string> {
  const report = await analyzeDataCompleteness(projectId);
  
  return `
📊 **Полнота данных проекта: ${report.overall_completeness.toFixed(0)}%**

${report.artifacts.map(a => `
${getStatusEmoji(a.completeness)} **${a.name}**: ${a.completeness}%
${a.missing_fields.length > 0 ? `   ⚠️  Недостает: ${a.missing_fields.join(', ')}` : ''}
`).join('\n')}

${report.missing_data.length > 0 ? `
🚨 **Критически важные данные:**
${report.missing_data.map(m => `
  • ${m.artifact_type}: ${m.critical_fields.join(', ')}
`).join('\n')}
` : ''}

${report.recommendations.length > 0 ? `
💡 **Рекомендации:**
${report.recommendations.map(r => `  • ${r}`).join('\n')}
` : ''}
  `;
}

function getStatusEmoji(completeness: number): string {
  if (completeness === 100) return '✅';
  if (completeness >= 80) return '⏳';
  if (completeness >= 50) return '⚠️';
  return '❌';
}
```

---

## 🔄 GOOGLE SHEETS SYNC

### Обновление Sheets при изменении БД

```typescript
async function syncToSheets(artifactId: string): Promise<void> {
  const artifact = await db.projectArtifacts.findById(artifactId);
  const project = await db.projects.findById(artifact.project_id);
  
  if (!project.sheets_id) {
    console.warn('Project has no Google Sheets');
    return;
  }
  
  // Определи вкладку
  const tabName = artifact.sheets_tab_name || getDefaultTabName(artifact.artifact_type);
  
  // Преобразуй данные в формат Sheets
  const sheetData = transformToSheetFormat(artifact.data, artifact.artifact_type);
  
  // Применяем визуальный стиль клиента
  if (project.visual_settings) {
    await applyVisualStyle(project.sheets_id, tabName, project.visual_settings);
  }
  
  // Обновляем данные
  await sheets.values.update({
    spreadsheetId: project.sheets_id,
    range: `${tabName}!A1:Z1000`,
    valueInputOption: 'USER_ENTERED',
    resource: { values: sheetData }
  });
  
  // Логируем
  await db.artifactChanges.create({
    artifact_id: artifactId,
    field_path: '$',
    new_value: artifact.data,
    change_source: 'db_to_sheets',
    created_at: new Date()
  });
}

function transformToSheetFormat(data: any, artifactType: string): any[][] {
  switch (artifactType) {
    case 'brief':
      return transformBriefToSheet(data);
    case 'media_plan':
      return transformMediaPlanToSheet(data);
    case 'strategy':
      return transformStrategyToSheet(data);
    default:
      return transformGenericToSheet(data);
  }
}

function transformBriefToSheet(brief: BriefData): any[][] {
  return [
    ['Параметр', 'Значение'],
    ['Клиент', brief.client_name || ''],
    ['Цель кампании', brief.campaign_objective || ''],
    ['Бюджет', brief.budget?.total || ''],
    ['Валюта', brief.budget?.currency || 'RUB'],
    ['География', brief.geography?.join(', ') || ''],
    ['ЦА: возраст', brief.target_audience?.age ? `${brief.target_audience.age[0]}-${brief.target_audience.age[1]}` : ''],
    ['ЦА: пол', brief.target_audience?.gender || ''],
    ['Период: начало', brief.period?.start || ''],
    ['Период: конец', brief.period?.end || ''],
    ['KPI: CPA', brief.kpis?.cpa || ''],
    ['KPI: ROMI', brief.kpis?.romi || '']
  ];
}

function transformMediaPlanToSheet(plan: MediaPlanData): any[][] {
  const rows: any[][] = [
    ['Канал', 'Бюджет', 'Форматы', 'KPI', 'Значения']
  ];
  
  for (const channel of plan.channels || []) {
    rows.push([
      channel.name,
      channel.budget,
      channel.formats?.join(', ') || '',
      Object.keys(channel.kpis || {}).join(', '),
      Object.values(channel.kpis || {}).join(', ')
    ]);
  }
  
  return rows;
}
```

---

## 🎯 ПРИМЕРЫ КОММУНИКАЦИИ

### Пример 1: Обработан файл с недостающими данными

```
✅ Я обработал файл "Бриф_Сбербанк.xlsx"!

Что удалось извлечь:
• Клиент: Сбербанк
• Цель: Продвижение премиум карты
• Бюджет: ₽15,000,000
• ЦА: 30-40 лет
• Период: Q4 2025

⚠️ Но не хватает важной информации:
1. География - в каких городах планируется кампания?
2. KPI - какие показатели ожидает клиент? (CPA, ROMI, etc.)

Можете уточнить эти данные? Без них я не смогу сформировать полноценный медиаплан. 🙏
```

### Пример 2: Напоминание о недостающих данных

```
👋 Напоминаю о недостающих данных по проекту "Сбербанк - Премиум карта":

📊 Текущая полнота: 76%

Что нужно заполнить:

📝 Медиаплан Ноябрь (80%):
  • KPI для Telegram Ads
  • Формат креативов для VK

📝 Медиаплан Декабрь (47%):
  • Распределение бюджета по каналам
  • Параметры таргетинга
  • KPI

Чем быстрее заполним, тем быстрее сможем запустить кампанию! ⚡
```

### Пример 3: Все данные собраны

```
🎉 Отличная новость!

Все данные по проекту "Сбербанк - Премиум карта" собраны:

✅ Бриф: 100%
✅ Стратегия: 100%
✅ Медиаплан Октябрь: 100%
✅ Медиаплан Ноябрь: 100%
✅ Медиаплан Декабрь: 100%

📊 Общая полнота: 100%

Теперь можем:
1. Запустить кампанию
2. Сформировать заказы на площадках
3. Настроить автоматические отчеты

Готовы к запуску? 🚀
```

### Пример 4: Запрос конкретных данных

```
@specialist Привет! 👋

Формирую медиаплан на Ноябрь для Сбербанка.

Нужна твоя помощь с Telegram Ads:
1. Какие KPI ожидаем? (CPA, CTR, etc.)
2. Какой формат креативов? (статика, видео, карусель?)
3. Есть ли ограничения по бюджету для этого канала?

Спасибо! 🙏
```

---

## ⚠️ ВАЖНЫЕ ПРАВИЛА

### 1. НЕ читай файлы повторно

```typescript
// ❌ НЕПРАВИЛЬНО
const brief = await readExcelFile('brief.xlsx'); // Каждый раз читаем файл!

// ✅ ПРАВИЛЬНО
const brief = await db.projectArtifacts.findOne({
  project_id: projectId,
  artifact_type: 'brief'
});
// Один раз извлекли, записали в БД, больше файл не нужен!
```

### 2. ВСЕГДА синхронизируй с Google Sheets

```typescript
// После любого изменения артефакта
await db.projectArtifacts.update(artifactId, { data: newData });
await syncToSheets(artifactId); // ← НЕ ЗАБУДЬ!
```

### 3. Запрашивай КОНКРЕТНЫЕ данные

```
❌ "Не хватает данных, заполните пожалуйста"

✅ "Не хватает:
    1. География (в каких городах?)
    2. KPI: CPA (какое целевое значение?)
    3. Дата запуска (когда планируем?)"
```

### 4. Мониторь completeness ПОСТОЯННО

```typescript
// Каждый час проверяй активные проекты
setInterval(async () => {
  await checkAllProjectsCompleteness();
}, 60 * 60 * 1000);
```

### 5. Будь проактивным, но не навязчивым

```
❌ Отправлять напоминания каждые 5 минут

✅ Отправлять напоминания:
    - Сразу после обработки файла (если нехватает данных)
    - Через 4 часа (если нет ответа)
    - Через 24 часа (если критично важные данные)
    - Раз в неделю (если не критично)
```

---

## 📈 МЕТРИКИ УСПЕХА

Отслеживай свою эффективность:

```typescript
const metrics = {
  // 1. Полнота данных
  average_completeness: 92%, // Цель: >90%
  
  // 2. Время до полноты
  time_to_complete: {
    brief: '2 hours',      // Цель: <4 hours
    media_plan: '6 hours', // Цель: <1 day
    overall: '2 days'      // Цель: <3 days
  },
  
  // 3. Качество извлечения
  extraction_accuracy: 95%,  // Цель: >90%
  
  // 4. Активность коммуникации
  questions_asked: 45,
  questions_answered: 40,
  response_rate: 89%,        // Цель: >80%
  
  // 5. Удовлетворенность команды
  team_satisfaction: 8.5/10  // Цель: >8/10
};
```

---

## 🎯 ЧЕКЛИСТ ДЛЯ НОВОГО ПРОЕКТА

Когда создается новый проект:

```
□ 1. Проект создан в БД ✓
□ 2. Google Sheets создан ✓
□ 3. Структура артефактов инициализирована ✓
□ 4. Команда назначена ✓
□ 5. Приветственное сообщение отправлено
□ 6. Запрошены начальные данные (бриф, стратегия)
□ 7. Настроен мониторинг completeness
□ 8. Dashboard для команды доступен
```

---

## 🆘 TROUBLESHOOTING

### Проблема: Не могу извлечь данные из файла

**Решение:**
```typescript
// 1. Проверь тип файла
if (!supportedFileTypes.includes(file.type)) {
  await sendMessage({
    text: `⚠️ К сожалению, я не умею работать с файлами типа ${file.type}.
           Поддерживаются: Excel (.xlsx), PDF, PowerPoint (.pptx).
           Можете переслать в одном из этих форматов?`
  });
  return;
}

// 2. Если файл поврежден
if (extractionError === 'CORRUPTED_FILE') {
  await sendMessage({
    text: `⚠️ Файл поврежден или имеет нестандартную структуру.
           Можете проверить файл и переслать еще раз?`
  });
  return;
}

// 3. Если низкая уверенность (< 70%)
if (confidence < 0.7) {
  await sendMessage({
    text: `⚠️ Я обработал файл, но уверенность в извлеченных данных низкая (${(confidence * 100).toFixed(0)}%).
           Рекомендую проверить данные в Google Sheets и скорректировать при необходимости.
           
           Извлеченные данные:
           ${formatExtractedData(data)}`
  });
}
```

### Проблема: Команда не отвечает на вопросы

**Решение:**
```typescript
// 1. Напоминание через 4 часа
setTimeout(async () => {
  if (!hasResponse(questionId)) {
    await sendMessage({
      text: `👋 Напоминаю о вопросе:\n\n${question.text}\n\nЭти данные нужны для формирования медиаплана.`
    });
  }
}, 4 * 60 * 60 * 1000);

// 2. Эскалация через 24 часа
setTimeout(async () => {
  if (!hasResponse(questionId) && question.priority === 'critical') {
    const pm = await findProjectManager(projectId);
    await sendMessage({
      to: pm.id,
      text: `⚠️ Критические данные не получены уже 24 часа:\n\n${question.text}\n\nПроект может быть заблокирован.`
    });
  }
}, 24 * 60 * 60 * 1000);
```

### Проблема: Конфликт данных (файл vs чат)

**Решение:**
```typescript
// Всегда отдавай приоритет более свежим данным
const fileData = { budget: 15000000, extracted_at: '2025-10-20' };
const chatData = { budget: 18000000, extracted_at: '2025-10-23' };

// Более свежие данные из чата
const finalData = chatData.extracted_at > fileData.extracted_at 
  ? chatData 
  : fileData;

// Уведоми об изменении
if (finalData !== fileData) {
  await sendMessage({
    text: `ℹ️ Обнаружено расхождение данных:
           • Файл: Бюджет ₽15M
           • Чат: Бюджет ₽18M
           
           Использую более свежие данные из чата: ₽18M.
           Если это ошибка, пожалуйста, поправьте в Google Sheets.`
  });
}
```

---

## 💡 ЛУЧШИЕ ПРАКТИКИ

### 1. Будь дружелюбным и полезным

```
✅ "Привет! Я обработал твой файл и извлек большую часть данных. 
    Осталось уточнить пару моментов..."

❌ "Файл обработан. Данных не хватает. Заполните."
```

### 2. Используй эмодзи для наглядности

```
✅ Завершено
⏳ В процессе
⚠️ Требует внимания
❌ Критическая проблема
📊 Данные
💬 Вопрос
🎯 Цель
```

### 3. Структурируй информацию

```
✅ Используй списки, заголовки, разделение на секции

❌ Один большой блок текста без структуры
```

### 4. Предлагай решения, а не только проблемы

```
✅ "Не хватает данных о географии. 
    Вариант 1: Запуск по всей России
    Вариант 2: Топ-5 городов: Москва, СПб, Екб, Нсб, Кзн
    Вариант 3: Ваш вариант?
    
    Что выбираем?"

❌ "География не указана."
```

---

**Версия:** 1.0  
**Дата:** 24.10.2025  
**Статус:** ✅ Утверждено


