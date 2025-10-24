---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: process
title: Project Review Guidelines - Правила ревью проекта
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: 09_DEVELOPMENT/REVIEW_GUIDELINES.md
effective_date: 2025-10-24
visibility: internal
security_level: low
tags: [review, guidelines, quality, rag]
---

# Project Review Guidelines

## 🎯 Цель

Обеспечить единое качество всех документов проекта для:
1. **RAG-индексации** - чтобы AI-агенты могли эффективно находить информацию
2. **Человеческого чтения** - чтобы команда могла быстро ориентироваться
3. **MVP-готовности** - чтобы документация была достаточна для разработки

---

## 📋 Универсальные правила для ВСЕХ файлов

### ✅ Обязательные элементы

```yaml
# 1. Frontmatter YAML (в начале каждого .md файла)
---
tenant_id: mrm
client_id: global | {client_name}
project_id: platform_docs | {project_id}
artifact_type: {см. таксономию ниже}
title: {полное название}
language: ru | en
industry: advertising
role_apply: [{список ролей}]
period: YYYY-MM
version: "X.Y"
source_path: {относительный путь}
effective_date: YYYY-MM-DD
visibility: internal | client_shared
security_level: low | medium | high
tags: [{ключевые слова}]
---

# 2. Заголовок H1 (только один!)
# 3. Навигация (для Overview/README)
→ [Parent](../README.md) | [Related](./Related.md)

# 4. Структура с заголовками H2/H3
## Секция 1
### Подсекция 1.1

# 5. Версия и статус в конце
**Версия:** X.Y | **Статус:** ✅/⏳/🚧
```

### 📐 Правила структуры

1. **Один H1** - только заголовок документа
2. **H2 для основных секций** - не пропускать уровни (H1→H2→H3, НЕ H1→H3)
3. **Длина секций**: 300-1200 токенов (~150-600 слов)
   - Короткие (<100 слов) объединять
   - Длинные (>1000 слов) разбивать
4. **Якоря для ссылок** - каждый H2/H3 должен быть linkable
5. **Относительные пути** - всегда использовать относительные ссылки

### 🔤 Правила контента

1. **Язык**: Русский для бизнес-контента, английский для кода
2. **Термины**: Единообразие (не "канал"/"площадка" вперемешку)
3. **Примеры**: Конкретные, не абстрактные
4. **Даты**: Формат YYYY-MM-DD
5. **Цифры**: С единицами измерения (5000₽, 3 дня, 85%)

### 🚫 Что удалять

- Дубликаты информации
- Устаревшие статусы без дат
- TODO без assignee и срока
- Пустые секции и шаблоны
- Неработающие ссылки

---

## 📂 Правила по категориям

### 1️⃣ `00_PROJECT_OVERVIEW/*` - Обзор проекта

**Тип артефакта**: `overview`

**Обязательные файлы**:
- `README.md` - главный обзор
- `Vision_Mission.md` - видение и миссия
- `Target_Users.md` - целевая аудитория
- `Roadmap.md` - дорожная карта
- `MVP_IMPLEMENTATION_PLAN.md` - план MVP

**Требования**:
- ✅ Executive summary (3-5 предложений)
- ✅ Актуальные метрики и даты
- ✅ Ссылки на все ключевые разделы
- ✅ Статус проекта и прогресс
- ⚠️ Избегать глубоких технических деталей (для этого есть 08_ARCHITECTURE)

**Критерии качества**:
```yaml
Completeness: 95%+ (все секции заполнены)
Clarity: Executive может понять за 5 минут
Links: Все ссылки работают
Freshness: Обновлено в текущем месяце
```

---

### 2️⃣ `01_ROLES/*` - Роли

**Тип артефакта**: `role_doc`

**Обязательная структура**:
```markdown
## Название роли
### Описание (1 абзац)
### Ключевые обязанности (список 5-7)
### Pain Points (проблемы роли)
### Jobs To Be Done (задачи)
### Инструменты (что использует)
### RACI Matrix (где Responsible/Accountable)
### Метрики успеха
```

**Требования**:
- ✅ Связь с `15_PRODUCT_DESIGN/JTBD/`
- ✅ Конкретные примеры pain points из интервью
- ✅ Количественные метрики (5 часов → 30 минут)
- ✅ Ссылки на процессы из `05_PROCESSES/`

---

### 3️⃣ `02_ARTIFACTS/*` - Артефакты проекта

**Тип артефакта**: `artifact_doc`

**Обязательная структура**:
```markdown
## Название артефакта
### Что это
### Кто создает (role)
### Когда создается (процесс)
### Формат (Excel/PDF/JSON)
### Обязательные поля (schema)
### Шаблон (ссылка или inline)
### Примеры
```

**Требования**:
- ✅ Actual schema (JSON Schema для структурированных данных)
- ✅ Образец заполненного артефакта
- ✅ Связь с процессами (`05_PROCESSES/`)
- ✅ Правила валидации

---

### 4️⃣ `03_TOOLS/*` - Инструменты и калькуляторы

**Тип артефакта**: `tool_doc`

**Обязательная структура**:
```markdown
## 🎯 НАЗНАЧЕНИЕ (зачем)
## 📊 ЧТО СЧИТАЕТ (формула кратко)
## 📋 МЕТОДОЛОГИЯ (научная база)
## 🔧 ВХОДНЫЕ ДАННЫЕ (input schema)
## 📈 ВЫХОДНЫЕ ДАННЫЕ (output schema)
## 👥 РОЛИ (кто использует)
## 🔗 СВЯЗИ (процессы, другие инструменты)
## 📐 ФОРМУЛА (детально, если есть Formula.md)
## 💡 ПРИМЕРЫ (1-3 реальных кейса)
```

**Требования**:
- ✅ Формулы в LaTeX или понятном виде
- ✅ Реальные примеры с цифрами
- ✅ Ссылки на научные источники (Shmatov, Rossiter-Percy)
- ✅ Для каждого калькулятора: Overview.md + Formula.md + Examples.md

---

### 5️⃣ `05_PROCESSES/*` - Процессы

**Тип артефакта**: `process`

**Обязательная структура**:
```markdown
## Название процесса
### Описание (что делаем, зачем)
### Входные данные (artifacts, prerequisites)
### Выходные данные (deliverables)
### Этапы (шаги 1-N)
### RACI Matrix (для каждого этапа)
### Инструменты (что используется)
### Критерии качества (DoD)
### Метрики (time, quality)
### Риски и mitigation
```

**Требования**:
- ✅ RACI для каждого шага (R/A/C/I)
- ✅ Диаграмма процесса (Mermaid/PNG)
- ✅ Связь с ролями (`01_ROLES/`)
- ✅ Связь с артефактами (`02_ARTIFACTS/`)
- ✅ SLA/таймлайн

---

### 6️⃣ `06_AI_ASSISTANTS/*` - AI Ассистенты

**Тип артефакта**: `assistant_spec`

**Обязательная структура**:
```markdown
## Название ассистента
### Purpose (зачем нужен)
### Key Capabilities (что умеет)
### Input/Output (интерфейс)
### Context Requirements (какой контекст нужен, max tokens)
### Tools & Integrations (API, DB)
### Prompts (ссылки на 09_DEVELOPMENT/AI_Prompts_Library/)
### Evaluation Metrics (accuracy, acceptance rate, time saved)
### Architecture (диаграмма)
### Implementation Plan (roadmap)
```

**Требования**:
- ✅ Ссылки на промпты в `09_DEVELOPMENT/AI_Prompts_Library/`
- ✅ Метрики: acceptance rate, edit distance, time saved
- ✅ Примеры input/output (golden set)
- ✅ Feedback loop механизм

---

### 7️⃣ `07_INTEGRATIONS/*` - Интеграции

**Тип артефакта**: `integration_spec`

**Обязательная структура**:
```markdown
## Платформа (Yandex Direct, VK Ads, etc)
### Purpose (зачем интеграция)
### API Version
### Authentication (OAuth/API Key)
### Endpoints (список используемых)
### Data Models (что тянем)
### Rate Limits (квоты)
### Error Handling (retry logic)
### Cost (стоимость вызовов)
### Implementation Status
```

**Требования**:
- ✅ API documentation ссылки
- ✅ Code examples (TypeScript)
- ✅ Error codes и handling
- ✅ Rate limit strategy
- ✅ Webhooks (если есть)

---

### 8️⃣ `08_ARCHITECTURE/*` - Архитектура

**Тип артефакта**: `architecture_doc`

**Обязательные файлы**:
- `README.md` - обзор архитектуры
- `Data_Models.md` - схемы данных (PostgreSQL, ClickHouse, Redis)
- `API_Specification.md` - REST API
- `Deployment.md` - инфраструктура

**Требования**:
- ✅ Диаграммы (C4 Model: Context → Container → Component)
- ✅ Database schemas (DDL)
- ✅ API specs (OpenAPI 3.0)
- ✅ Security considerations
- ✅ Scalability plan

---

### 9️⃣ `09_DEVELOPMENT/*` - Разработка

**Подкатегории**:

#### `AI_Prompts_Library/` - Библиотека промптов

**Тип артефакта**: `prompt`

**Обязательная структура**:
```markdown
## Название промпта
### Назначение (задача)
### System Prompt (инструкции для AI)
### User Prompt Template (с переменными)
### Variables (описание каждой)
### Output Schema (TypeScript/JSON)
### Test Examples (input → expected output)
### Performance Metrics (accuracy, acceptance rate)
### Changelog (версии)
```

**Требования**:
- ✅ Работающие примеры (golden set)
- ✅ Версионирование (v1.0, v1.1, etc)
- ✅ Метрики производительности
- ✅ Known issues и planned improvements

#### `RAG/` - RAG-система

**Тип артефакта**: `rag_doc`

**Требования**:
- ✅ Архитектура ingestion + retrieval
- ✅ Metadata schema (актуальный)
- ✅ Chunking policy
- ✅ Quality metrics (recall@k, nDCG)
- ✅ Runbook для операций

---

### 🔟 `15_PRODUCT_DESIGN/*` - Дизайн продукта

**Подкатегории**:

#### `JTBD/` - Jobs To Be Done

**Тип артефакта**: `jtbd_doc`

**Обязательная структура**:
```markdown
## Job Story
When [situation], I want to [motivation], So I can [outcome]

## 4 Forces
- Push (что заставляет искать решение)
- Pull (что привлекает в новом решении)
- Anxiety (что пугает в новом)
- Habit (что держит в старом)

## Success Metrics
## MVP Features (что решает job)
```

**Требования**:
- ✅ Связь с ролями (`01_ROLES/`)
- ✅ Приоритизация (high/medium/low)
- ✅ Validation status (validated/hypothesis)

---

## 🔍 RAG-специфичные требования

### Frontmatter обязателен для индексации

Каждый `.md` файл должен иметь YAML frontmatter с полями:
- `artifact_type` - из таксономии
- `role_apply` - для фильтрации по ролям
- `tags` - ключевые слова
- `source_path` - для citations

### Таксономия artifact_type

```yaml
Categories:
  - overview          # Обзорные документы
  - role_doc          # Описание ролей
  - artifact_doc      # Артефакты проекта
  - tool_doc          # Инструменты/калькуляторы
  - process           # Процессы
  - assistant_spec    # Спецификации AI-ассистентов
  - integration_spec  # Интеграции
  - architecture_doc  # Архитектура
  - prompt            # Промпты для AI
  - rag_doc           # RAG документация
  - jtbd_doc          # Jobs To Be Done
  - meeting_notes     # Протоколы встреч
  - media_plan        # Медиапланы
  - report            # Отчеты
  - research_doc      # NEW: Исследования, анализы рынка, команды
  - guide_doc         # NEW: Руководства, чек-листы, методологии
  - test_scenario     # NEW: Тестовые сценарии
  - changelog         # NEW: История изменений
  - specification     # NEW: Технические спецификации
```

### Chunking-friendly структура

1. **Секции 300-1200 токенов**
2. **Самодостаточность** - каждая секция понятна без контекста
3. **Внутренние ссылки** - markdown links работают
4. **Таблицы** - нормализованные (не merged cells)

---

## ✅ Чек-лист ревью файла

```yaml
[ ] Frontmatter присутствует и заполнен
[ ] Один H1 заголовок
[ ] Структура H2/H3 логична
[ ] Секции 300-1200 токенов
[ ] Нет дубликатов
[ ] Нет пустых секций
[ ] Все ссылки работают
[ ] Примеры конкретные, не абстрактные
[ ] Термины единообразные
[ ] Версия и дата актуальны
[ ] Связи с другими документами (cross-links)
[ ] Для процессов: RACI присутствует
[ ] Для инструментов: формулы и примеры
[ ] Для промптов: test examples и метрики
[ ] Для интеграций: API version и endpoints
```

---

## 📊 Метрики качества документации

### Критерии A (Отлично)
```yaml
Completeness: 95%+ секций заполнено
Freshness: Обновлено в текущем квартале
Links: 100% работают
Structure: H1/H2/H3 корректны
RAG-ready: Frontmatter + chunking-friendly
```

### Критерии B (Хорошо)
```yaml
Completeness: 80-95%
Freshness: Обновлено в текущем году
Links: 90%+ работают
Structure: Минимальные проблемы
RAG-ready: Frontmatter есть
```

### Критерии C (Требует доработки)
```yaml
Completeness: <80%
Freshness: Старше года
Links: <90% работают
Structure: Проблемы с иерархией
RAG-ready: Frontmatter отсутствует
```

---

## 🚀 Процесс глобального ревью

### Фаза 1: Preparation (Day 1)
1. Создать `REVIEW_GUIDELINES.md` ✅
2. Создать `CONTENT_QUALITY_CHECKLIST.md`
3. Сформировать список всех файлов

### Фаза 2:批量 Review (Days 2-5)
4. Пройти по каждой папке (`00_*` → `15_*`)
5. Применить чек-лист к каждому файлу
6. Исправить критичные проблемы (frontmatter, ссылки)
7. Нормализовать структуру (H2/H3, chunking)

### Фаза 3: RAG Optimization (Days 6-7)
8. Добавить frontmatter ко всем `.md`
9. Нормализовать таблицы
10. Проверить cross-links

### Фаза 4: Validation (Day 8)
11. Запустить автоматические проверки:
    - `find . -name "*.md" -exec grep -L "^---" {} \;` (файлы без frontmatter)
    - Link checker
    - Markdown linter
12. Создать финальный отчет

### Фаза 5: Report (Day 9)
13. Сформировать `PROJECT_REVIEW_REPORT.md`:
    - Статистика по категориям
    - Список исправлений
    - Оценка качества (A/B/C)
    - Рекомендации

---

## 🛠 Инструменты

### Автоматические проверки

```bash
# 1. Найти файлы без frontmatter
find . -name "*.md" -not -path "*/node_modules/*" -exec grep -L "^---" {} \;

# 2. Найти битые ссылки (markdown-link-check)
npx markdown-link-check **/*.md

# 3. Проверить markdown (markdownlint)
npx markdownlint **/*.md

# 4. Посчитать статистику
find . -name "*.md" | wc -l  # всего файлов
grep -r "^---" --include="*.md" | wc -l  # с frontmatter
```

### Ручные проверки

- Читаемость и clarity
- Актуальность дат и метрик
- Полнота примеров
- Качество cross-links

---

**Версия:** 1.0  
**Дата:** 24 октября 2025  
**Применимо к:** Всем файлам проекта MRM AI Platform  
**Статус:** ✅ Готово к использованию

