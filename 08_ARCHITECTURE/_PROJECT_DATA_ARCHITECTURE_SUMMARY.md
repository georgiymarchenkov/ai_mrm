---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: summary
title: Project Data Architecture - Summary & Index
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: 08_ARCHITECTURE/_PROJECT_DATA_ARCHITECTURE_SUMMARY.md
effective_date: 2025-10-24
visibility: internal
security_level: low
tags: [architecture, summary, index]
---

# Project Data Architecture - Summary & Index
## Резюме и навигация по архитектуре данных проекта

**Дата создания:** 24 октября 2025  
**Статус:** ✅ Утверждено

---

## 🎯 ЦЕНТРАЛЬНАЯ КОНЦЕПЦИЯ

> **MRM - это Living Database проекта, где AI-ассистент выступает в роли "data collector", который через коммуникацию с командой постоянно дополняет и актуализирует структурированную информацию о проекте, синхронизируя ее с удобным интерфейсом (Google Sheets).**

### Ключевая формула:

```
ПРОЕКТ = Структурированная БД + Google Sheets интерфейс
```

### Главная метрика успеха:

```
Completeness (полнота данных проекта) → 100%
```

---

## 📚 ДОКУМЕНТАЦИЯ (создана 24.10.2025)

### 1. 📖 [Project Data Architecture](./Project_Data_Architecture.md)
**Объем:** 1,492 строки  
**Назначение:** Полная документация архитектуры

**Содержание:**
- Центральная концепция платформы
- Структура БД (projects, periods, artifacts, files, changes)
- Процесс обработки данных (файлы → структура → БД)
- Google Sheets как интерфейс
- Двусторонняя синхронизация БД ↔ Sheets
- Роль AI-ассистента
- Месячные итерации
- Примеры кода (TypeScript)
- Метрики эффективности
- Безопасность и конфиденциальность
- API endpoints
- Чеклисты
- Глоссарий

**Для кого:** Developers, Architects, PM

---

### 2. 📊 [Project Lifecycle Diagram](./Project_Lifecycle_Diagram.md)
**Объем:** 679 строк  
**Назначение:** Визуальные диаграммы и flow-схемы

**Содержание:**
- Полный жизненный цикл проекта (9 шагов)
- Детальный flow обработки файла (10 шагов)
- Схема синхронизации БД ↔ Google Sheets
- Dashboard полноты данных (completeness)
- ASCII-art диаграммы для документации

**Для кого:** All roles (визуальное представление)

---

### 3. ⚡ [Project Data Quick Reference](./Project_Data_Quick_Reference.md)
**Объем:** ~600 строк  
**Назначение:** Быстрая памятка для разработчиков

**Содержание:**
- Суть в одном предложении
- Ключевые принципы (5 правил)
- Структура БД (core tables)
- Data flow (упрощенно)
- AI-ассистент: основные задачи
- Google Sheets: структура
- Синхронизация: БД ↔ Sheets
- Completeness: расчет и мониторинг
- Метрики успеха
- API endpoints (основные)
- Важные правила (DO's & DON'Ts)
- Troubleshooting
- Примеры кода
- Чеклисты
- Глоссарий

**Для кого:** Developers (daily reference)

---

### 4. 🤖 [Project Data Assistant Guide](../06_AI_ASSISTANTS/Project_Data_Assistant_Guide.md)
**Объем:** ~1,200 строк  
**Назначение:** Руководство для AI-ассистента

**Содержание:**
- Главная задача AI
- Основные принципы работы
- Workflow: обработка файла (4 шага)
- Мониторинг completeness
- Запрос недостающих данных
- Обработка ответов
- Google Sheets sync
- Примеры коммуникации
- Важные правила
- Метрики успеха
- Чеклисты
- Troubleshooting
- Best practices

**Для кого:** AI/ML Engineers, Prompt Engineers

---

### 5. 🚀 [Implementation Roadmap](./Implementation_Roadmap.md)
**Объем:** ~1,400 строк  
**Назначение:** План имплементации (12 недель)

**Содержание:**
- **Phase 0:** Подготовка (1 неделя)
- **Phase 1:** Database & Backend Core (2 недели)
- **Phase 2:** File Processing & AI Extraction (2 недели)
- **Phase 3:** Google Sheets Integration (2 недели)
- **Phase 4:** AI Assistant Communication (2 недели)
- **Phase 5:** Completeness Monitoring & Dashboard (1 неделя)
- **Phase 6:** Testing & Refinement (2 недели)
- Metrics & Success Criteria
- Deployment Plan
- Documentation Deliverables

**Для кого:** PM, Tech Lead, Developers

---

## 🔑 КЛЮЧЕВЫЕ ПРИНЦИПЫ (TOP-5)

### 1. ✅ Файлы → Структура → БД (один раз!)

```
❌ НЕПРАВИЛЬНО:
  Каждый раз читать Excel файл для получения данных

✅ ПРАВИЛЬНО:
  1. Получил файл от клиента
  2. AI извлек данные
  3. Структурировал
  4. Записал в БД
  5. Синхронизировал с Google Sheets
  6. Файл больше НЕ читаем! Все в БД.
```

### 2. ✅ Проект = БД + Google Sheets

```
PostgreSQL                    ⇄                   Google Sheets
──────────                                        ─────────────
• projects                                        📊 Spreadsheet
• project_periods                                 ├─ 📝 Бриф
• project_artifacts                               ├─ 🎯 Стратегия
• project_files                                   ├─ 📊 Медиаплан
• artifact_changes                                ├─ 💰 Бюджет
                                                  ├─ 👥 Команда
                                                  └─ 📈 Отчеты

        Real-time двусторонняя синхронизация
```

### 3. ✅ Месячные итерации

```
Проект "Сбербанк - Премиум карта Q4 2025"
├─ Октябрь 2025 (project_periods)
│  ├─ Бриф (project_artifacts)
│  ├─ Медиаплан (project_artifacts)
│  ├─ Бюджет: ₽5M
│  └─ Completeness: 100% ✅
├─ Ноябрь 2025 (project_periods)
│  ├─ Бриф (project_artifacts)
│  ├─ Медиаплан (project_artifacts)
│  ├─ Бюджет: ₽5M
│  └─ Completeness: 80% ⏳
└─ Декабрь 2025 (project_periods)
   ├─ Бриф (project_artifacts)
   ├─ Медиаплан (project_artifacts)
   ├─ Бюджет: ₽5M
   └─ Completeness: 47% ⚠️
```

### 4. ✅ AI-ассистент = Data Collector

```typescript
// Главная задача AI:
async function maintainProjectCompleteness(projectId: string) {
  while (true) {
    // 1. Мониторим полноту данных
    const report = await analyzeCompleteness(projectId);
    
    // 2. Если < 100%, запрашиваем недостающее
    if (report.overall < 100) {
      await requestMissingData(report.missing);
    }
    
    // 3. Обрабатываем ответы
    await processIncomingMessages(projectId);
    
    // 4. Обновляем артефакты
    await updateArtifacts(projectId);
    
    // 5. Синхронизируем Sheets
    await syncToSheets(projectId);
    
    await sleep(30 * 60 * 1000); // каждые 30 минут
  }
}
```

### 5. ✅ Google Sheets = Живой интерфейс

```
• Визуальный стиль клиента (brand_colors, logo, fonts)
• Скрытые поля (hidden_fields)
• Real-time sync с БД (webhook)
• Каждая вкладка = артефакт в БД
• Изменения в Sheets → автоматически в БД
• Изменения в БД → автоматически в Sheets
```

---

## 📊 СТРУКТУРА БД (core tables)

### 1. `projects` - Основная таблица проекта
```sql
{
  id, client_id, name, budget_total,
  sheets_id, sheets_url,           -- ← Google Sheets
  visual_settings,                  -- ← Стиль клиента
  start_date, end_date
}
```

### 2. `project_periods` - Месячные итерации
```sql
{
  id, project_id,
  period_month, period_year,        -- 1-12, 2025
  budget_allocated, budget_spent,
  status                            -- planning, active, completed
}
```

### 3. `project_artifacts` - Данные проекта
```sql
{
  id, project_id, period_id,
  artifact_type,                    -- brief, media_plan, strategy
  data,                             -- ← JSONB с данными
  completeness,                     -- ← % полноты (0-100)
  sheets_tab_name,                  -- ← Вкладка в Sheets
  source_type,                      -- excel_import, chat, ai
  ai_extracted, ai_confidence
}
```

### 4. `project_files` - Файлы от клиента
```sql
{
  id, project_id, period_id,
  file_name, file_type, file_url,   -- S3
  processing_status,                -- pending, processing, completed
  extracted_data,                   -- ← Что извлекли
  linked_artifacts                  -- ← Какие артефакты создали
}
```

### 5. `artifact_changes` - История изменений
```sql
{
  id, artifact_id,
  field_path, old_value, new_value,
  change_source,                    -- user, ai, sheets, import
  created_at
}
```

---

## 🔄 DATA FLOW (основной)

```
1. Клиент отправляет файл (Excel, PDF, PPTX)
   ↓
2. Загрузка в S3 + запись в project_files
   ↓
3. AI извлекает данные (Claude API)
   ↓
4. Валидация по schema + расчет completeness
   ↓
5. Создание/обновление artifact в БД
   ↓
6. Синхронизация с Google Sheets
   ↓
7. Уведомление команды
   ↓
8. Если completeness < 100%:
   AI запрашивает недостающие данные через чат
   ↓
9. Пользователь отвечает
   ↓
10. AI извлекает данные из ответа
   ↓
11. Обновление artifact
   ↓
12. Синхронизация Sheets
   ↓
13. Если completeness = 100%:
    ✅ Артефакт готов!
    Иначе: повторить шаги 8-12
```

---

## 🎯 МЕТРИКИ УСПЕХА

### Технические:
```
✅ Полнота данных: >95% (average по всем проектам)
✅ Время обработки файла: <5 минут
✅ API response time: <500ms (p95)
✅ Sheets sync latency: <2 секунды
✅ Test coverage: >80%
```

### Бизнес:
```
✅ Time to 100% completeness: <3 дня от создания проекта
✅ AI extraction accuracy: >90%
✅ User adoption: >80% команды использует AI-ассистента
✅ Time saved: >20 часов/неделю на команду
✅ User satisfaction: >8/10
```

---

## 🛠️ TECH STACK

### Backend:
```
• Node.js + TypeScript + Express
  ИЛИ
• Python + FastAPI

• PostgreSQL 14+ (primary DB)
• Redis (cache, queue)
• ClickHouse (analytics, optional)
```

### AI/ML:
```
• Claude 3.5 Sonnet (Anthropic API)
• OpenAI API (embeddings, optional)
• Vector DB (Pinecone/Weaviate, optional для RAG)
```

### Integrations:
```
• Google Sheets API v4
• Google Apps Script (webhooks)
• AWS S3 (file storage)
```

### File Processing:
```
• ExcelJS (Excel parsing)
• PDF-parse (PDF parsing)
• PPTX-parser (PowerPoint parsing)
```

---

## 📋 API ENDPOINTS (основные)

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
POST   /api/webhooks/sheets             // Sheets → БД (webhook)

// Анализ
GET    /api/projects/:id/completeness   // Отчет о полноте
GET    /api/projects/:id/missing-data   // Недостающие данные

// Чат
GET    /api/projects/:id/messages       // История
POST   /api/projects/:id/messages       // Отправить
WS     /ws                               // WebSocket для real-time
```

---

## ⚠️ ВАЖНЫЕ ПРАВИЛА

### ✅ DO:
```
• Один раз извлечь файл → записать в БД → больше не читать
• Всегда синхронизировать БД ↔ Sheets после изменений
• Мониторить completeness постоянно (каждые 30 мин)
• Запрашивать конкретные данные, не абстрактно
• Применять визуальный стиль клиента к Sheets
• Логировать все изменения в artifact_changes
• Использовать JSONB для хранения гибких структур
• Индексировать часто запрашиваемые поля
```

### ❌ DON'T:
```
• Читать файлы повторно из S3
• Забывать синхронизировать Sheets после обновления БД
• Запрашивать данные без контекста ("Заполните данные")
• Игнорировать низкую completeness (<90%)
• Хранить данные в файлах вместо БД
• Терять историю изменений
• Использовать `any` типы в TypeScript
• Делать N+1 queries без batching
```

---

## 🎯 ЧЕКЛИСТЫ

### Чеклист: Новый проект
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

### Чеклист: Обработка файла
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
| **Project** | Контейнер данных для работы с клиентом (таблица `projects`) |
| **Period** | Месячная итерация проекта (таблица `project_periods`) |
| **Artifact** | Любой документ/данные проекта: бриф, медиаплан, отчет (таблица `project_artifacts`) |
| **Completeness** | % заполненности данных артефакта (0-100), хранится в поле `completeness` |
| **Sheets Tab** | Вкладка в Google Sheets, соответствующая артефакту |
| **Source Type** | Откуда пришли данные: `file_import`, `chat`, `ai_generated`, `manual` |
| **Visual Settings** | Настройки стиля клиента (цвета, логотип, шрифты), JSONB поле `visual_settings` |
| **Sync** | Синхронизация между БД и Google Sheets (двусторонняя) |
| **AI Confidence** | Уверенность AI в извлеченных данных (0-1), хранится в `ai_confidence` |
| **Data Collector** | Роль AI-ассистента - собирать данные до 100% completeness |
| **Living Database** | Концепция проекта как постоянно обновляемой структуры данных |

---

## 🔗 НАВИГАЦИЯ

### Основная документация:
- [📖 Full Documentation](./Project_Data_Architecture.md) - Полное описание (1,492 строки)
- [📊 Lifecycle Diagrams](./Project_Lifecycle_Diagram.md) - Визуальные схемы (679 строк)
- [⚡ Quick Reference](./Project_Data_Quick_Reference.md) - Быстрая памятка (~600 строк)

### Имплементация:
- [🚀 Implementation Roadmap](./Implementation_Roadmap.md) - План на 12 недель (~1,400 строк)
- [🗄️ Data Models](./Data_Models.md) - Схемы БД
- [🔌 API Specification](./API_Specification.md) - API endpoints

### AI-ассистент:
- [🤖 AI Assistant Guide](../06_AI_ASSISTANTS/Project_Data_Assistant_Guide.md) - Руководство (~1,200 строк)
- [📝 AI Prompts Library](../06_AI_ASSISTANTS/Prompts/) - Библиотека промптов

### Другое:
- [🏗️ Architecture Overview](./Overview.md) - Общий обзор архитектуры
- [📚 README](../_README.md) - Главная страница документации

---

## 📊 СТАТИСТИКА ДОКУМЕНТАЦИИ

```
Создано документов:      5
Общий объем:             ~5,000 строк
Время создания:          24 октября 2025
Язык:                    Русский (комментарии) + English (code)
Формат:                  Markdown + TypeScript examples + SQL schemas
Статус:                  ✅ Утверждено
```

---

## 🎯 СЛЕДУЮЩИЕ ШАГИ

### Немедленно (сегодня):
1. ✅ Ревью документации с командой
2. ✅ Обсуждение tech stack
3. ✅ Назначение ответственных за фазы

### На этой неделе:
1. ⏳ Kick-off meeting по имплементации
2. ⏳ Финализация database schema
3. ⏳ Setup инфраструктуры (AWS, PostgreSQL, S3)
4. ⏳ Создание репозитория и CI/CD

### Через 2 недели:
1. ⏳ Phase 1 завершена (Database & Backend Core)
2. ⏳ Первые API endpoints работают
3. ⏳ Unit tests написаны

### Через 1 месяц:
1. ⏳ Phase 2 завершена (File Processing & AI Extraction)
2. ⏳ Можем загрузить Excel и получить структурированные данные
3. ⏳ AI extraction работает

### Через 2 месяца:
1. ⏳ Phase 3-4 завершены (Google Sheets + AI Communication)
2. ⏳ Полный цикл работает end-to-end
3. ⏳ Готовы к internal beta testing

### Через 3 месяца:
1. ⏳ Phase 5-6 завершены (Monitoring + Testing)
2. ⏳ Production-ready
3. ⏳ Готовы к запуску MVP

---

## 💬 КОНТАКТЫ

**Tech Lead:** [имя]  
**Architect:** [имя]  
**PM:** [имя]  

**Slack канал:** #mrm-project-data-architecture  
**Документация:** `/docs/08_ARCHITECTURE/`  
**Репозиторий:** [URL]

---

## 📝 ИСТОРИЯ ИЗМЕНЕНИЙ

| Дата | Версия | Изменения | Автор |
|------|--------|-----------|-------|
| 24.10.2025 | 1.0 | Initial version - полная документация создана | AI Assistant |

---

**🎉 Документация завершена и готова к использованию!**

**Версия:** 1.0  
**Статус:** ✅ Утверждено  
**Дата:** 24 октября 2025


