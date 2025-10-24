---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: roadmap
title: Project Data Architecture - Implementation Roadmap
language: ru
industry: advertising
role_apply: [developer, architect, pm]
period: 2025-10
version: "1.0"
source_path: 08_ARCHITECTURE/Implementation_Roadmap.md
effective_date: 2025-10-24
visibility: internal
security_level: medium
tags: [architecture, implementation, roadmap]
---

# Project Data Architecture - Implementation Roadmap
## План имплементации архитектуры данных проекта

→ [Architecture Overview](./Overview.md)  
→ [Project Data Architecture](./Project_Data_Architecture.md)

---

## 🎯 ЦЕЛЬ

Реализовать архитектуру **"Проект = БД + Google Sheets"** с AI-ассистентом для сбора данных.

**Результат:** Платформа, где AI автоматически превращает файлы в структурированные данные и активно запрашивает недостающую информацию для достижения 100% полноты проекта.

---

## 📋 ФАЗЫ РЕАЛИЗАЦИИ

```
Phase 0: Подготовка и проектирование         (1 неделя)
Phase 1: Database & Backend Core             (2 недели)
Phase 2: File Processing & AI Extraction     (2 недели)
Phase 3: Google Sheets Integration           (2 недели)
Phase 4: AI Assistant Communication          (2 недели)
Phase 5: Completeness Monitoring & Dashboard (1 неделя)
Phase 6: Testing & Refinement                (2 недели)

Итого: 12 недель (3 месяца)
```

---

## 🚀 PHASE 0: ПОДГОТОВКА (Week 1)

### Цели:
- ✅ Детальное проектирование схемы БД
- ✅ Определение API endpoints
- ✅ Подготовка инфраструктуры

### Задачи:

#### 0.1. Database Schema Design
```sql
-- Финализировать схемы:
✓ projects
✓ project_periods
✓ project_artifacts
✓ project_files
✓ artifact_changes
✓ project_team
✓ project_permissions

-- Индексы для производительности
-- Constraints для целостности
-- Triggers для автоматизации
```

**Deliverable:** SQL migration files

#### 0.2. API Design
```typescript
// Определить все endpoints:
POST   /api/projects
POST   /api/projects/:id/periods
POST   /api/projects/:id/files
POST   /api/artifacts/:id
GET    /api/projects/:id/completeness
...

// OpenAPI specification
```

**Deliverable:** API specification (OpenAPI/Swagger)

#### 0.3. Infrastructure Setup
```bash
# AWS/Cloud resources:
- PostgreSQL RDS (или managed PostgreSQL)
- S3 bucket для файлов
- Redis для кэша
- ClickHouse для аналитики (optional на этом этапе)

# CI/CD:
- GitHub Actions или GitLab CI
- Staging и Production environments
```

**Deliverable:** Infrastructure as Code (Terraform/CloudFormation)

#### 0.4. Tech Stack Confirmation
```typescript
// Backend:
- Node.js + TypeScript + Express
  ИЛИ
- Python + FastAPI

// Database:
- PostgreSQL 14+
- Prisma ORM (Node.js) или SQLAlchemy (Python)

// AI/ML:
- Claude API (Anthropic)
- OpenAI API (для embeddings, optional)

// Google Integration:
- Google Sheets API v4
- Google Apps Script (для webhooks)

// File Processing:
- ExcelJS (для Excel)
- PDF-parse (для PDF)
- PPTX-parser (для PowerPoint)
```

**Deliverable:** Tech stack document + package.json/requirements.txt

---

## 🗄️ PHASE 1: DATABASE & BACKEND CORE (Weeks 2-3)

### Цели:
- ✅ Создать базовую структуру БД
- ✅ Реализовать CRUD операции для проектов и артефактов
- ✅ Настроить ORM и миграции

### Задачи:

#### 1.1. Database Setup
```bash
# Создать миграции:
npx prisma migrate dev --name init_project_structure

# Основные таблицы:
- 001_create_projects.sql
- 002_create_project_periods.sql
- 003_create_project_artifacts.sql
- 004_create_project_files.sql
- 005_create_artifact_changes.sql

# Seed данные для тестирования
```

**Deliverable:** Working database with migrations

#### 1.2. Core API - Projects
```typescript
// CRUD для проектов
POST   /api/projects
GET    /api/projects/:id
PUT    /api/projects/:id
DELETE /api/projects/:id
GET    /api/projects (list with filters)

// Реализация:
class ProjectService {
  async create(data: CreateProjectInput): Promise<Project>
  async findById(id: string): Promise<Project>
  async update(id: string, data: UpdateProjectInput): Promise<Project>
  async delete(id: string): Promise<void>
  async list(filters: ProjectFilters): Promise<Project[]>
}
```

**Deliverable:** Projects CRUD API

#### 1.3. Core API - Periods
```typescript
// Управление периодами
POST   /api/projects/:id/periods
GET    /api/projects/:id/periods
GET    /api/periods/:id
PUT    /api/periods/:id

// Автоматическое создание периодов при создании проекта
async function createProjectWithPeriods(data: CreateProjectInput) {
  const project = await createProject(data);
  const periods = generateMonthlyPeriods(data.startDate, data.endDate);
  
  for (const period of periods) {
    await createPeriod(project.id, period);
  }
  
  return project;
}
```

**Deliverable:** Periods management API

#### 1.4. Core API - Artifacts
```typescript
// CRUD для артефактов
POST   /api/projects/:id/artifacts
GET    /api/artifacts/:id
PUT    /api/artifacts/:id
DELETE /api/artifacts/:id
GET    /api/projects/:id/artifacts (with filters)

// Специфичные endpoints:
GET    /api/artifacts/:id/history       // История изменений
GET    /api/artifacts/:id/completeness  // Полнота данных
```

**Deliverable:** Artifacts CRUD API

#### 1.5. Authentication & Authorization
```typescript
// JWT authentication
POST   /api/auth/login
POST   /api/auth/register
POST   /api/auth/refresh
GET    /api/auth/me

// RBAC based on RACI
middleware.requireRole(['project_manager', 'account_manager'])
middleware.checkProjectAccess(projectId, requiredPermission)
```

**Deliverable:** Auth system with RBAC

#### 1.6. Testing
```typescript
// Unit tests для services
describe('ProjectService', () => {
  it('should create project with periods', async () => {
    // ...
  });
});

// Integration tests для API
describe('POST /api/projects', () => {
  it('should create project and return 201', async () => {
    // ...
  });
});
```

**Deliverable:** Test suite with >80% coverage

---

## 📁 PHASE 2: FILE PROCESSING & AI EXTRACTION (Weeks 4-5)

### Цели:
- ✅ Реализовать загрузку файлов в S3
- ✅ Интегрировать AI для извлечения данных
- ✅ Создать pipeline обработки файлов

### Задачи:

#### 2.1. File Upload Service
```typescript
// Загрузка в S3
POST   /api/projects/:id/files

class FileUploadService {
  async upload(file: File, projectId: string): Promise<ProjectFile> {
    // 1. Валидация (тип, размер)
    validateFile(file);
    
    // 2. Загрузка в S3
    const s3Url = await s3.upload(file);
    
    // 3. Создание записи в БД
    const projectFile = await db.projectFiles.create({
      project_id: projectId,
      file_name: file.name,
      file_type: detectFileType(file),
      file_url: s3Url,
      processing_status: 'pending'
    });
    
    // 4. Запуск обработки (async)
    await queue.add('process-file', { fileId: projectFile.id });
    
    return projectFile;
  }
}
```

**Deliverable:** File upload API with S3 integration

#### 2.2. File Parsing Libraries
```typescript
// Excel parser
class ExcelParser {
  async parse(fileUrl: string): Promise<any> {
    const workbook = await ExcelJS.read(fileUrl);
    // Extract data from sheets
    return extractedData;
  }
}

// PDF parser
class PDFParser {
  async parse(fileUrl: string): Promise<string> {
    const text = await pdfParse(fileUrl);
    return text;
  }
}

// PowerPoint parser
class PPTXParser {
  async parse(fileUrl: string): Promise<Slide[]> {
    const slides = await parsePPTX(fileUrl);
    return slides;
  }
}
```

**Deliverable:** File parsing utilities

#### 2.3. AI Extraction Service
```typescript
// Интеграция с Claude API
class AIExtractor {
  async extractBrief(file: ProjectFile): Promise<BriefData> {
    // 1. Парсим файл
    const rawData = await parser.parse(file.file_url);
    
    // 2. Формируем prompt
    const prompt = `
Ты AI-ассистент для извлечения данных из брифа рекламной кампании.

Исходные данные из файла:
${JSON.stringify(rawData, null, 2)}

Извлеки и структурируй следующую информацию:
1. Название клиента (client_name)
2. Цель кампании (campaign_objective)
3. Бюджет (budget: {total, currency})
4. Целевая аудитория (target_audience: {age, gender, interests})
5. География (geography: string[])
6. Период кампании (period: {start, end})
7. KPI (kpis: {cpa?, romi?, ctr?, ...})

Верни JSON в точном формате схемы BriefData.
Если какое-то поле не найдено, используй null.
Укажи confidence (0-1) для каждого извлеченного поля.
`;
    
    // 3. Вызываем Claude
    const response = await claude.complete({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4096,
      messages: [{
        role: 'user',
        content: prompt
      }]
    });
    
    // 4. Парсим ответ
    const extractedData = JSON.parse(response.content);
    
    return extractedData;
  }
  
  async extractMediaPlan(file: ProjectFile): Promise<MediaPlanData> {
    // Аналогично для медиаплана
  }
  
  async extractStrategy(file: ProjectFile): Promise<StrategyData> {
    // Аналогично для стратегии
  }
}
```

**Deliverable:** AI extraction service with Claude integration

#### 2.4. File Processing Pipeline
```typescript
// Background job processor
queue.process('process-file', async (job) => {
  const { fileId } = job.data;
  
  try {
    // 1. Получаем файл
    const file = await db.projectFiles.findById(fileId);
    
    // 2. Обновляем статус
    await db.projectFiles.update(fileId, { 
      processing_status: 'processing' 
    });
    
    // 3. Определяем тип артефакта
    const artifactType = await detectArtifactType(file);
    
    // 4. Извлекаем данные
    const extractedData = await aiExtractor.extract(file, artifactType);
    
    // 5. Валидация
    const validation = await validator.validate(extractedData, artifactType);
    
    // 6. Создаем артефакт
    const artifact = await db.projectArtifacts.create({
      project_id: file.project_id,
      artifact_type: artifactType,
      data: extractedData,
      completeness: validation.completeness,
      source_type: 'file_import',
      source_file_id: file.id,
      ai_extracted: true,
      ai_confidence: extractedData.confidence
    });
    
    // 7. Обновляем файл
    await db.projectFiles.update(fileId, {
      processing_status: 'completed',
      processed_at: new Date(),
      extracted_data: extractedData,
      linked_artifacts: [artifact.id]
    });
    
    // 8. Уведомляем пользователя
    await notifications.send({
      project_id: file.project_id,
      type: 'file_processed',
      data: { fileId, artifactId: artifact.id }
    });
    
    // 9. Если есть недостающие данные - запрашиваем
    if (validation.missing.length > 0) {
      await aiAssistant.requestMissingData(artifact.id, validation.missing);
    }
    
  } catch (error) {
    // Error handling
    await db.projectFiles.update(fileId, {
      processing_status: 'failed',
      error: error.message
    });
    
    throw error;
  }
});
```

**Deliverable:** Background file processing system

#### 2.5. Validation Schemas
```typescript
// Zod schemas для валидации
const BriefSchema = z.object({
  client_name: z.string().min(1),
  campaign_objective: z.string().min(10),
  budget: z.object({
    total: z.number().positive(),
    currency: z.enum(['RUB', 'USD', 'EUR'])
  }),
  target_audience: z.object({
    age: z.tuple([z.number(), z.number()]),
    gender: z.enum(['male', 'female', 'all']),
    interests: z.array(z.string()).optional()
  }),
  geography: z.array(z.string()).min(1),
  period: z.object({
    start: z.string().datetime(),
    end: z.string().datetime()
  }),
  kpis: z.object({
    cpa: z.number().positive().optional(),
    romi: z.number().positive().optional(),
    ctr: z.number().positive().optional()
  }).optional()
});

// Валидатор с расчетом completeness
class ArtifactValidator {
  validate(data: any, type: ArtifactType): ValidationResult {
    const schema = this.getSchema(type);
    const result = schema.safeParse(data);
    
    if (result.success) {
      return {
        isValid: true,
        completeness: 100,
        missing: []
      };
    }
    
    // Расчет completeness по заполненным полям
    const completeness = this.calculateCompleteness(data, schema);
    const missing = this.findMissingFields(result.error);
    
    return {
      isValid: false,
      completeness,
      missing,
      errors: result.error.errors
    };
  }
}
```

**Deliverable:** Validation system with completeness calculation

#### 2.6. Testing
```typescript
// Unit tests
describe('AIExtractor', () => {
  it('should extract brief from Excel file', async () => {
    const file = mockExcelFile();
    const brief = await extractor.extractBrief(file);
    expect(brief.client_name).toBe('Сбербанк');
  });
});

// Integration tests
describe('File processing pipeline', () => {
  it('should process uploaded file end-to-end', async () => {
    // Upload → Process → Create Artifact
  });
});
```

**Deliverable:** Test suite for file processing

---

## 📊 PHASE 3: GOOGLE SHEETS INTEGRATION (Weeks 6-7)

### Цели:
- ✅ Создание Google Sheets при создании проекта
- ✅ Двусторонняя синхронизация БД ↔ Sheets
- ✅ Применение визуального стиля клиента

### Задачи:

#### 3.1. Google Sheets API Setup
```typescript
// Настройка Google API credentials
import { google } from 'googleapis';

const sheets = google.sheets({
  version: 'v4',
  auth: oAuth2Client
});

// Service для работы с Sheets
class GoogleSheetsService {
  async create(projectId: string, projectName: string): Promise<string> {
    // Создаем Spreadsheet
    const response = await sheets.spreadsheets.create({
      requestBody: {
        properties: {
          title: `${projectName} - MRM Data Hub`
        },
        sheets: [
          { properties: { title: 'Бриф' } },
          { properties: { title: 'Стратегия' } },
          { properties: { title: 'Медиаплан' } },
          { properties: { title: 'Бюджет' } },
          { properties: { title: 'Команда' } },
          { properties: { title: 'Отчеты' } },
          { properties: { title: 'Задачи' } },
          { properties: { title: 'Файлы' } }
        ]
      }
    });
    
    const sheetsId = response.data.spreadsheetId;
    
    // Сохраняем ID в БД
    await db.projects.update(projectId, {
      sheets_id: sheetsId,
      sheets_url: `https://docs.google.com/spreadsheets/d/${sheetsId}`
    });
    
    return sheetsId;
  }
}
```

**Deliverable:** Google Sheets creation service

#### 3.2. Visual Style Application
```typescript
// Применение стиля клиента к Sheets
class SheetsStylingService {
  async applyStyle(sheetsId: string, visualSettings: VisualSettings) {
    const requests = [];
    
    // 1. Цвета заголовков
    requests.push({
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
    });
    
    // 2. Логотип (как изображение)
    if (visualSettings.logo_url) {
      requests.push({
        addImage: {
          url: visualSettings.logo_url,
          anchorCell: { sheetId: 0, rowIndex: 0, columnIndex: 0 }
        }
      });
    }
    
    // 3. Шрифты
    requests.push({
      repeatCell: {
        range: { sheetId: 0, startRowIndex: 0, endRowIndex: 1 },
        cell: {
          userEnteredFormat: {
            textFormat: {
              fontFamily: visualSettings.fonts.header,
              bold: true
            }
          }
        },
        fields: 'userEnteredFormat.textFormat'
      }
    });
    
    // 4. Скрытие столбцов
    for (const field of visualSettings.hidden_fields) {
      const colIndex = await this.findColumnIndex(sheetsId, field);
      if (colIndex !== -1) {
        requests.push({
          updateDimensionProperties: {
            range: {
              sheetId: 0,
              dimension: 'COLUMNS',
              startIndex: colIndex,
              endIndex: colIndex + 1
            },
            properties: { hiddenByUser: true },
            fields: 'hiddenByUser'
          }
        });
      }
    }
    
    // Применяем все изменения
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: sheetsId,
      requestBody: { requests }
    });
  }
}
```

**Deliverable:** Sheets styling service

#### 3.3. Data Sync: DB → Sheets
```typescript
// Синхронизация артефакта в Sheets
class DataSyncService {
  async syncToSheets(artifactId: string): Promise<void> {
    const artifact = await db.projectArtifacts.findById(artifactId);
    const project = await db.projects.findById(artifact.project_id);
    
    if (!project.sheets_id) {
      console.warn('Project has no Google Sheets');
      return;
    }
    
    // Определяем вкладку
    const tabName = this.getTabName(artifact.artifact_type);
    
    // Преобразуем данные в формат Sheets
    const sheetData = this.transformToSheetFormat(
      artifact.data,
      artifact.artifact_type
    );
    
    // Обновляем Sheets
    await sheets.spreadsheets.values.update({
      spreadsheetId: project.sheets_id,
      range: `${tabName}!A1:Z1000`,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: sheetData }
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
  
  private transformToSheetFormat(data: any, type: ArtifactType): any[][] {
    switch (type) {
      case 'brief':
        return this.briefToSheet(data);
      case 'media_plan':
        return this.mediaPlanToSheet(data);
      case 'strategy':
        return this.strategyToSheet(data);
      default:
        return [];
    }
  }
  
  private briefToSheet(brief: BriefData): any[][] {
    return [
      ['Параметр', 'Значение'],
      ['Клиент', brief.client_name || ''],
      ['Цель кампании', brief.campaign_objective || ''],
      ['Бюджет', brief.budget?.total || ''],
      ['Валюта', brief.budget?.currency || 'RUB'],
      ['География', brief.geography?.join(', ') || ''],
      ['ЦА: возраст', brief.target_audience?.age ? 
        `${brief.target_audience.age[0]}-${brief.target_audience.age[1]}` : ''],
      ['Период: начало', brief.period?.start || ''],
      ['Период: конец', brief.period?.end || '']
    ];
  }
}
```

**Deliverable:** DB → Sheets sync service

#### 3.4. Data Sync: Sheets → DB (Webhook)
```typescript
// Google Apps Script (на стороне Sheets)
function onEdit(e) {
  const sheet = e.source.getActiveSheet();
  const range = e.range;
  
  // Отправляем webhook на наш backend
  UrlFetchApp.fetch('https://api.mrm.com/api/webhooks/sheets', {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({
      spreadsheetId: e.source.getId(),
      sheetName: sheet.getName(),
      range: range.getA1Notation(),
      oldValue: e.oldValue,
      newValue: e.value
    })
  });
}

// Backend endpoint
app.post('/api/webhooks/sheets', async (req, res) => {
  const { spreadsheetId, sheetName, range, newValue } = req.body;
  
  // 1. Найти проект по sheets_id
  const project = await db.projects.findOne({ sheets_id: spreadsheetId });
  
  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }
  
  // 2. Найти артефакт по имени вкладки
  const artifact = await db.projectArtifacts.findOne({
    project_id: project.id,
    sheets_tab_name: sheetName
  });
  
  if (!artifact) {
    return res.status(404).json({ error: 'Artifact not found' });
  }
  
  // 3. Прочитать все данные из Sheets
  const sheetData = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!A1:Z1000`
  });
  
  // 4. Преобразовать в структуру БД
  const dbData = transformFromSheetFormat(
    sheetData.data.values,
    artifact.artifact_type
  );
  
  // 5. Обновить артефакт
  await db.projectArtifacts.update(artifact.id, {
    data: dbData,
    completeness: calculateCompleteness(dbData),
    updated_at: new Date()
  });
  
  // 6. Логировать
  await db.artifactChanges.create({
    artifact_id: artifact.id,
    field_path: range,
    old_value: req.body.oldValue,
    new_value: newValue,
    change_source: 'sheets_to_db',
    created_at: new Date()
  });
  
  res.json({ success: true });
});
```

**Deliverable:** Sheets → DB webhook handler

#### 3.5. Conflict Resolution
```typescript
// Разрешение конфликтов при одновременном редактировании
class ConflictResolver {
  async resolve(artifactId: string, sheetsData: any, dbData: any): Promise<any> {
    // Стратегия: "Last Write Wins"
    const artifact = await db.projectArtifacts.findById(artifactId);
    const lastChange = await db.artifactChanges.findLast({ artifact_id: artifactId });
    
    // Сравниваем timestamps
    if (lastChange.change_source === 'sheets_to_db') {
      // Последнее изменение было из Sheets → приоритет Sheets
      return sheetsData;
    } else {
      // Последнее изменение было из БД → приоритет БД
      return dbData;
    }
  }
}
```

**Deliverable:** Conflict resolution system

#### 3.6. Testing
```typescript
describe('GoogleSheetsService', () => {
  it('should create spreadsheet for project', async () => {
    const sheetsId = await service.create(projectId, 'Test Project');
    expect(sheetsId).toBeTruthy();
  });
  
  it('should sync artifact data to sheets', async () => {
    await service.syncToSheets(artifactId);
    // Verify data in Sheets
  });
});
```

**Deliverable:** Test suite for Sheets integration

---

## 🤖 PHASE 4: AI ASSISTANT COMMUNICATION (Weeks 8-9)

### Цели:
- ✅ Реализовать чат-систему для коммуникации с командой
- ✅ AI-ассистент запрашивает недостающие данные
- ✅ AI обрабатывает ответы и обновляет артефакты

### Задачи:

#### 4.1. Chat System
```typescript
// Real-time чат (WebSocket)
import { Server as SocketIO } from 'socket.io';

class ChatService {
  io: SocketIO;
  
  async sendMessage(data: SendMessageInput): Promise<Message> {
    // 1. Создаем сообщение в БД
    const message = await db.messages.create({
      project_id: data.projectId,
      from: data.from,
      to: data.to,
      text: data.text,
      context: data.context
    });
    
    // 2. Отправляем через WebSocket
    this.io.to(`project:${data.projectId}`).emit('message', message);
    
    // 3. Push notification (если пользователь оффлайн)
    const user = await db.users.findById(data.to);
    if (!user.online) {
      await pushNotification.send(user.id, {
        title: 'Новое сообщение',
        body: data.text
      });
    }
    
    return message;
  }
}

// REST API для истории
GET    /api/projects/:id/messages
POST   /api/projects/:id/messages
```

**Deliverable:** Chat system with WebSocket

#### 4.2. AI Question Generator
```typescript
// Генерация вопросов для недостающих данных
class AIQuestionGenerator {
  async generateQuestions(
    artifactType: ArtifactType,
    missingFields: string[]
  ): Promise<Question[]> {
    const prompt = `
Ты AI-ассистент для рекламного агентства.

Тип артефакта: ${artifactType}
Недостающие поля: ${missingFields.join(', ')}

Сгенерируй дружелюбные вопросы на русском языке для запроса этих данных.
Вопросы должны быть:
1. Конкретными и понятными
2. С контекстом (зачем нужны данные)
3. С примерами ответов, если уместно

Верни JSON массив вопросов:
[
  {
    field: "geography",
    question: "В каких городах планируется кампания?",
    context: "Эти данные нужны для настройки геотаргетинга",
    examples: ["Москва, Санкт-Петербург", "Вся Россия"]
  },
  ...
]
`;
    
    const response = await claude.complete({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2048,
      messages: [{ role: 'user', content: prompt }]
    });
    
    return JSON.parse(response.content);
  }
}
```

**Deliverable:** Question generation system

#### 4.3. Missing Data Request Flow
```typescript
// Запрос недостающих данных
class AIAssistant {
  async requestMissingData(
    artifactId: string,
    missingFields: string[]
  ): Promise<void> {
    const artifact = await db.projectArtifacts.findById(artifactId);
    const project = await db.projects.findById(artifact.project_id);
    
    // 1. Генерируем вопросы
    const questions = await questionGenerator.generate(
      artifact.artifact_type,
      missingFields
    );
    
    // 2. Определяем, кому задать вопросы (по RACI)
    const responsibleUser = await this.findResponsibleUser(
      project.id,
      artifact.artifact_type
    );
    
    // 3. Формируем сообщение
    const message = this.formatMessage(artifact, questions);
    
    // 4. Отправляем в чат
    await chatService.sendMessage({
      projectId: project.id,
      from: 'ai_assistant',
      to: responsibleUser.id,
      text: message,
      context: {
        artifact_id: artifactId,
        missing_fields: missingFields,
        questions: questions
      }
    });
  }
  
  private formatMessage(artifact: Artifact, questions: Question[]): string {
    return `
👋 Привет! Я обработал "${artifact.artifact_name}".

${artifact.completeness < 100 ? 
  `⚠️ Полнота данных: ${artifact.completeness}%. Не хватает важной информации:` :
  `✅ Все данные собраны!`
}

${questions.map((q, i) => `
${i + 1}. **${q.field}**: ${q.question}
   ${q.context ? `ℹ️ ${q.context}` : ''}
   ${q.examples ? `💡 Примеры: ${q.examples.join(', ')}` : ''}
`).join('\n')}

Можешь уточнить эти данные? 🙏
    `.trim();
  }
}
```

**Deliverable:** Missing data request system

#### 4.4. Answer Processing
```typescript
// Обработка ответов от пользователей
class AnswerProcessor {
  async processAnswer(message: Message): Promise<void> {
    // Проверяем, это ответ на наш вопрос?
    if (!message.context?.artifact_id) return;
    
    const artifactId = message.context.artifact_id;
    const artifact = await db.projectArtifacts.findById(artifactId);
    
    // 1. Извлекаем данные из ответа с помощью AI
    const extractedData = await this.extractFromAnswer(
      message.text,
      artifact.artifact_type,
      message.context.missing_fields
    );
    
    // 2. Обновляем артефакт
    const updatedData = this.mergeData(artifact.data, extractedData);
    
    await db.projectArtifacts.update(artifactId, {
      data: updatedData,
      completeness: calculateCompleteness(updatedData),
      updated_at: new Date()
    });
    
    // 3. Синхронизируем с Sheets
    await dataSyncService.syncToSheets(artifactId);
    
    // 4. Проверяем, все ли данные собраны
    const validation = await validator.validate(updatedData, artifact.artifact_type);
    
    if (validation.completeness === 100) {
      // ✅ Все собрано!
      await chatService.sendMessage({
        projectId: artifact.project_id,
        from: 'ai_assistant',
        to: message.from,
        text: `✅ Отлично! Все данные по "${artifact.artifact_name}" собраны. Спасибо! 🎉`
      });
    } else {
      // Продолжаем запрашивать
      await aiAssistant.requestMissingData(artifactId, validation.missing);
    }
  }
  
  private async extractFromAnswer(
    answerText: string,
    artifactType: ArtifactType,
    expectedFields: string[]
  ): Promise<any> {
    const prompt = `
Извлеки данные из ответа пользователя.

Тип артефакта: ${artifactType}
Ожидаемые поля: ${expectedFields.join(', ')}

Ответ пользователя:
"${answerText}"

Извлеки данные и верни JSON в формате артефакта.
Используй только информацию из ответа.
Если какое-то поле не упомянуто, используй null.
`;
    
    const response = await claude.complete({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2048,
      messages: [{ role: 'user', content: prompt }]
    });
    
    return JSON.parse(response.content);
  }
}
```

**Deliverable:** Answer processing system

#### 4.5. Testing
```typescript
describe('AIAssistant', () => {
  it('should request missing data via chat', async () => {
    await aiAssistant.requestMissingData(artifactId, ['geography', 'kpis']);
    // Verify message sent
  });
  
  it('should process answer and update artifact', async () => {
    const message = {
      text: 'География: Москва, СПб. KPI: CPA ≤ 1500',
      context: { artifact_id: artifactId }
    };
    
    await answerProcessor.processAnswer(message);
    
    const artifact = await db.projectArtifacts.findById(artifactId);
    expect(artifact.data.geography).toEqual(['Москва', 'Санкт-Петербург']);
  });
});
```

**Deliverable:** Test suite for AI communication

---

## 📊 PHASE 5: COMPLETENESS MONITORING & DASHBOARD (Week 10)

### Цели:
- ✅ Real-time мониторинг полноты данных
- ✅ Dashboard для команды
- ✅ Автоматические напоминания

### Задачи:

#### 5.1. Completeness Analysis Service
```typescript
class CompletenessAnalyzer {
  async analyzeProject(projectId: string): Promise<CompletenessReport> {
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
    
    for (const artifact of artifacts) {
      const analysis = await this.analyzeArtifact(artifact);
      
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
    
    report.overall_completeness = 
      artifacts.reduce((sum, a) => sum + a.completeness, 0) / artifacts.length;
    
    report.recommendations = this.generateRecommendations(report);
    
    return report;
  }
}

// API endpoint
GET /api/projects/:id/completeness
```

**Deliverable:** Completeness analysis API

#### 5.2. Dashboard Frontend
```typescript
// React component
function ProjectCompletenessDashboard({ projectId }: Props) {
  const { data: report } = useQuery(
    ['completeness', projectId],
    () => api.getCompleteness(projectId),
    { refetchInterval: 30000 } // каждые 30 сек
  );
  
  return (
    <div className="dashboard">
      <h2>Полнота данных проекта: {report.overall_completeness}%</h2>
      
      <ProgressBar value={report.overall_completeness} />
      
      <div className="artifacts">
        {report.artifacts.map(artifact => (
          <ArtifactCard key={artifact.id} artifact={artifact} />
        ))}
      </div>
      
      {report.missing_data.length > 0 && (
        <Alert severity="warning">
          <h3>Критически важные данные:</h3>
          <ul>
            {report.missing_data.map(item => (
              <li key={item.artifact_id}>
                {item.artifact_type}: {item.critical_fields.join(', ')}
              </li>
            ))}
          </ul>
        </Alert>
      )}
      
      <RecommendationsList recommendations={report.recommendations} />
    </div>
  );
}
```

**Deliverable:** Dashboard UI

#### 5.3. Automated Reminders
```typescript
// Cron job для напоминаний
cron.schedule('0 */4 * * *', async () => { // Каждые 4 часа
  const activeProjects = await db.projects.findAll({ status: 'active' });
  
  for (const project of activeProjects) {
    const report = await completenessAnalyzer.analyzeProject(project.id);
    
    // Если полнота < 90%, отправляем напоминание
    if (report.overall_completeness < 90) {
      const pm = await findProjectManager(project.id);
      
      await chatService.sendMessage({
        projectId: project.id,
        from: 'ai_assistant',
        to: pm.id,
        text: `
⚠️ Напоминаю о недостающих данных по проекту "${project.name}":

Текущая полнота: ${report.overall_completeness.toFixed(0)}%

Что нужно заполнить:
${report.missing_data.map(item => 
  `• ${item.artifact_type}: ${item.critical_fields.join(', ')}`
).join('\n')}

Чем быстрее заполним, тем быстрее сможем запустить кампанию! ⚡
        `.trim()
      });
    }
  }
});
```

**Deliverable:** Automated reminder system

---

## 🧪 PHASE 6: TESTING & REFINEMENT (Weeks 11-12)

### Задачи:

#### 6.1. E2E Testing
```typescript
// Cypress tests
describe('Project Data Flow', () => {
  it('should create project and process file end-to-end', () => {
    // 1. Создание проекта
    cy.visit('/projects/new');
    cy.fillProjectForm({ name: 'Test Project', budget: 1000000 });
    cy.click('[data-testid="submit"]');
    
    // 2. Загрузка файла
    cy.uploadFile('brief.xlsx');
    cy.wait('@fileProcessing');
    
    // 3. Проверка артефакта
    cy.contains('Бриф обработан');
    cy.get('[data-testid="completeness"]').should('contain', '85%');
    
    // 4. Ответ на вопрос AI
    cy.get('[data-testid="chat"]').type('География: Москва, СПб');
    cy.click('[data-testid="send"]');
    
    // 5. Проверка обновления
    cy.wait('@artifactUpdate');
    cy.get('[data-testid="completeness"]').should('contain', '100%');
  });
});
```

#### 6.2. Load Testing
```bash
# k6 load test
k6 run --vus 100 --duration 30s load-test.js

# Цели:
- 100 одновременных пользователей
- < 500ms response time
- < 1% error rate
```

#### 6.3. Security Audit
```bash
# npm audit
npm audit --production

# Penetration testing
- SQL injection
- XSS
- CSRF
- JWT vulnerabilities
```

#### 6.4. Performance Optimization
```typescript
// Кэширование частых запросов
@Cache({ ttl: 300 }) // 5 минут
async getProjectCompleteness(projectId: string) {
  // ...
}

// Database query optimization
- Добавить индексы
- Оптимизировать N+1 queries
- Connection pooling
```

#### 6.5. Documentation
```markdown
# API Documentation (OpenAPI/Swagger)
# Architecture diagrams (draw.io)
# Developer guide
# Deployment guide
# User manual
```

---

## 📈 METRICS & SUCCESS CRITERIA

### Технические метрики:
```
✅ API response time: <500ms (p95)
✅ File processing time: <5 minutes
✅ Sheets sync latency: <2 seconds
✅ Test coverage: >80%
✅ Uptime: >99.9%
```

### Бизнес-метрики:
```
✅ Average project completeness: >90%
✅ Time to 100% completeness: <3 days
✅ AI extraction accuracy: >90%
✅ User adoption: >80% of team uses AI assistant
✅ Time saved: >20 hours/week per team
```

---

## 🚀 DEPLOYMENT PLAN

### Staging (Week 10)
```bash
# Deploy to staging environment
git push staging main

# Run smoke tests
npm run test:smoke

# Manual QA testing
```

### Production (Week 12)
```bash
# Staged rollout:
1. Deploy backend
2. Run database migrations
3. Deploy frontend
4. Monitor for 24 hours
5. Full rollout

# Rollback plan ready
```

---

## 📚 DOCUMENTATION DELIVERABLES

```
✅ API Documentation (OpenAPI spec)
✅ Architecture diagrams
✅ Database schema documentation
✅ Developer setup guide
✅ Deployment runbook
✅ User manual
✅ Admin guide
✅ Troubleshooting guide
```

---

**Версия:** 1.0  
**Дата:** 24.10.2025  
**Ответственный:** Tech Lead

**Следующий шаг:** Kick-off meeting с командой разработки для обсуждения плана и назначения ответственных.


