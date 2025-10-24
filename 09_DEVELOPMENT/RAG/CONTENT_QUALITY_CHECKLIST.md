---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: rag_doc
title: Content Quality Checklist for RAG
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: 09_DEVELOPMENT/RAG/CONTENT_QUALITY_CHECKLIST.md
effective_date: 2025-10-24
visibility: internal
security_level: low
tags: [rag, quality, checklist]
---

# Content Quality Checklist for RAG

## 🎯 Цель

Обеспечить высокое качество retrieval в RAG-системе через нормализацию и оптимизацию контента.

---

## ✅ Критерии RAG-готовности

### 1. Metadata (Frontmatter YAML)

**Обязательные поля**:
```yaml
✅ tenant_id: mrm
✅ client_id: global | {client_name}
✅ project_id: platform_docs | {project_id}
✅ artifact_type: {из таксономии}
✅ title: {полное название}
✅ language: ru | en
✅ role_apply: [{список ролей}]
✅ tags: [{ключевые слова}]
✅ source_path: {относительный путь для citations}
```

**Рекомендуемые поля**:
```yaml
⭐ period: YYYY-MM (для time-sensitive данных)
⭐ version: "X.Y" (для версионированных артефактов)
⭐ effective_date: YYYY-MM-DD
⭐ visibility: internal | client_shared
⭐ security_level: low | medium | high
```

**Проверка**:
```bash
# Файлы без frontmatter
grep -L "^---" *.md

# Файлы с неполным frontmatter (отсутствует artifact_type)
grep -L "artifact_type:" *.md
```

---

### 2. Структура (Chunking-Friendly)

**Целевые параметры**:
- ✅ **Chunk size**: 300-1200 токенов (~150-600 слов)
- ✅ **Splitting boundary**: H2/H3 заголовки
- ✅ **Overlap**: 50-100 токенов (автоматически)
- ✅ **Self-contained**: Каждый chunk понятен без глобального контекста

**Правила**:

1. **Один H1** - только заголовок документа
2. **H2 для основных секций** - boundary для chunking
3. **H3 для подсекций** - дополнительная структура
4. **Не пропускать уровни** - H1 → H2 → H3 (не H1 → H3)

**Проверка**:
```markdown
# ✅ Хорошо
## Секция A
Контент 300-500 слов...

### Подсекция A.1
Детали...

## Секция B
Контент 300-500 слов...

# ❌ Плохо
## Секция C
Контент 10 слов (слишком короткая)

## Секция D
Контент 2000 слов (слишком длинная, разбить)

### Подсекция без H2 (пропущен уровень)
```

**Action items**:
- Короткие секции (<100 слов) → объединить с соседними
- Длинные секции (>1000 слов) → разбить на H3 подсекции
- Добавить context в начало секции, если она не self-contained

---

### 3. Cross-Links (Навигация)

**Требования**:
- ✅ **Относительные пути**: `../FOLDER/file.md`, не абсолютные
- ✅ **Работающие ссылки**: все ссылки должны вести на существующие файлы
- ✅ **Навигация вверх**: В начале файла ссылки на parent/related
- ✅ **Связи вниз**: В overview ссылки на детальные документы

**Примеры**:
```markdown
# ✅ Хорошо
→ [Tools Overview](../_README.md) | [Formula](./Formula.md) | [Examples](./Examples.md)

See also: [Media Planning Process](../../05_PROCESSES/03_Media_Planning/Overview.md)

# ❌ Плохо
См. файл Formula.md (нет ссылки)
[Formula](/absolute/path/Formula.md) (абсолютный путь)
[Broken](./NonExistent.md) (битая ссылка)
```

**Проверка**:
```bash
# Найти битые ссылки
npx markdown-link-check **/*.md
```

**Action items**:
- Исправить битые ссылки
- Конвертировать абсолютные пути в относительные
- Добавить navigation header в файлы без ссылок

---

### 4. Content Quality (Полезность для Retrieval)

#### 4.1 Конкретность

**Требования**:
- ✅ **Факты и цифры**: "Экономит 5 часов в неделю" вместо "Экономит много времени"
- ✅ **Примеры**: Реальные кейсы, не абстрактные описания
- ✅ **Термины**: Единообразие (не "канал"/"площадка" вперемешку)

```markdown
# ✅ Хорошо
Reach Calculator рассчитывает охват по формуле:
Reach% = GRP / Frequency

Пример: GRP=200, Frequency=4 → Reach=50%

# ❌ Плохо
Калькулятор рассчитывает метрики кампании. Он использует специальную формулу.
```

#### 4.2 Self-Contained секции

Каждая секция должна быть понятна без чтения всего документа.

**Техники**:
1. **Дублировать ключевой context** в начале секции
2. **Расшифровывать акронимы** при первом упоминании
3. **Добавлять mini-intro** для сложных секций

```markdown
# ✅ Хорошо
## Cost Per Reach Calculator

**Назначение**: Рассчитывает стоимость охвата 1% целевой аудитории.

**Формула**: Cost_Per_Reach = Total_Budget / Reach%

**Применение**: Используется media planner для сравнения эффективности каналов...

# ❌ Плохо
## Cost Per Reach

Формула описана выше. См. секцию "Методология Шматова" для деталей.
(требует читать другие секции)
```

#### 4.3 Keyword Density

**Требования**:
- ✅ **Ключевые термины** в заголовках, первых абзацах
- ✅ **Синонимы** для улучшения recall (напр: "медиаплан" = "media plan")
- ✅ **Тэги** в frontmatter для фильтрации

**Проверка**:
Для документа о "Reach Calculator":
- Заголовок содержит "Reach"? ✅
- Первый абзац объясняет "охват"? ✅
- Теги включают "reach", "охват", "calculators"? ✅

---

### 5. Таблицы и структурированные данные

#### 5.1 Markdown таблицы

**Требования**:
- ✅ **Нормализованные** - no merged cells
- ✅ **Читаемые** - выравнивание
- ✅ **Подписи** - что показывает таблица

```markdown
# ✅ Хорошо
**Сравнение каналов:**

| Канал | CPM (₽) | CTR (%) | CPC (₽) |
|-------|---------|---------|---------|
| Яндекс Директ | 180 | 1.5 | 12 |
| VK Реклама | 320 | 2.1 | 15 |

# ❌ Плохо
|Канал|CPM|CTR|CPC|
|-|-|-|-|
|ЯД|180|1.5|12|
(нет подписи, непонятные сокращения)
```

#### 5.2 Excel/CSV → JSON

Для больших таблиц (>20 строк):
- Хранить в CSV/Excel
- Создать JSON schema
- Индексировать как JSON documents

**Пример schema**:
```json
{
  "channel": "Yandex Direct",
  "format": "Text-Graphic",
  "budget": 500000,
  "impressions": 5500000,
  "clicks": 82500,
  "ctr": 1.5,
  "cpm": 180
}
```

---

### 6. Языковые требования

#### 6.1 Русский язык

**Для**:
- Бизнес-контент (процессы, роли, JTBD)
- Описания инструментов
- Примеры и кейсы
- Коммуникация с клиентами

#### 6.2 Английский язык

**Для**:
- Код (TypeScript, Python)
- API endpoints и schemas
- Технические термины (не переводить: "embedding", "chunking", "retrieval")
- Git commit messages

#### 6.3 Смешанный (Осторожно!)

```markdown
# ✅ Допустимо
RAG (Retrieval-Augmented Generation) - система извлечения контекста для LLM.

# ❌ Избегать
Нам нужно сделать retrieval для нашего генератора отчетов.
(либо "извлечение контекста", либо полностью английский)
```

---

### 7. Versioning & Freshness

**Требования**:
- ✅ **Версия в конце файла**: `**Версия:** X.Y | **Статус:** ✅`
- ✅ **Дата в frontmatter**: `effective_date: YYYY-MM-DD`
- ✅ **Changelog** (опционально для сложных документов)

**Статусы**:
- ✅ Готово / Production Ready
- ⏳ В работе / In Progress
- 🚧 Черновик / Draft
- 🔄 Требует обновления / Needs Update
- ❌ Устарело / Deprecated

**Проверка**:
```bash
# Файлы без версии
grep -L "Версия:" *.md

# Файлы старше 6 месяцев
find . -name "*.md" -mtime +180
```

---

### 8. Security & PII

**Проверять**:
- ❌ API keys, tokens, passwords
- ❌ Email адреса (кроме info@)
- ❌ Телефоны
- ❌ Реальные названия клиентов (использовать "Клиент А", "Клиент Б")

**Допустимо**:
- ✅ Роли (Account Manager, Specialist)
- ✅ Общие термины (Яндекс Директ, VK Реклама)
- ✅ Демо-данные (demo@example.com, +7-XXX-XXX-XXXX)

**Action**:
- Заменить PII на placeholders: `{client_name}`, `{account_id}`
- Для примеров использовать синтетические данные

---

## 📊 Scoring System

### Оценка файла (0-100)

```yaml
Frontmatter (20 points):
  - Присутствует: +10
  - Все обязательные поля: +10

Structure (20 points):
  - H1/H2/H3 корректны: +10
  - Chunking-friendly (300-1200 токенов): +10

Content (30 points):
  - Конкретность (факты, цифры): +10
  - Self-contained секции: +10
  - Keyword density: +10

Links (15 points):
  - Навигация вверх/вниз: +5
  - Все ссылки работают: +10

Freshness (10 points):
  - Обновлено в текущем квартале: +10
  - Обновлено в текущем году: +5
  - Старше года: 0

Security (5 points):
  - Нет PII: +5
  - Есть PII: -10 (критично!)
```

### Категории

- **90-100**: A (Отлично) - RAG-ready
- **70-89**: B (Хорошо) - Minor fixes needed
- **50-69**: C (Удовлетворительно) - Требует доработки
- **<50**: D (Плохо) - Требует переписывания

---

## 🔧 Automation Tools

### Pre-commit checks

```bash
#!/bin/bash
# .git/hooks/pre-commit

# 1. Проверить frontmatter
for file in $(git diff --cached --name-only | grep "\.md$"); do
  if ! head -5 "$file" | grep -q "^---"; then
    echo "❌ $file: Missing frontmatter"
    exit 1
  fi
done

# 2. Проверить битые ссылки
npx markdown-link-check $(git diff --cached --name-only | grep "\.md$")

# 3. Lint markdown
npx markdownlint $(git diff --cached --name-only | grep "\.md$")
```

### Batch processing

```bash
# Добавить frontmatter ко всем файлам без него
find . -name "*.md" -exec grep -L "^---" {} \; | while read file; do
  # Generate frontmatter based on file path
  ./scripts/add-frontmatter.sh "$file"
done

# Нормализовать таблицы
find . -name "*.md" -exec ./scripts/normalize-tables.py {} \;

# Fix relative links
find . -name "*.md" -exec ./scripts/fix-links.sh {} \;
```

---

## 📋 Review Process

### Per-file checklist

```markdown
File: _______________________
Reviewer: ___________________
Date: _______________________

Frontmatter:
[ ] Присутствует
[ ] artifact_type корректен
[ ] role_apply заполнен
[ ] tags релевантны
[ ] source_path правильный

Structure:
[ ] Один H1
[ ] H2/H3 иерархия
[ ] Секции 300-1200 токенов
[ ] Self-contained секции

Content:
[ ] Конкретные примеры
[ ] Факты и цифры
[ ] Термины единообразны
[ ] Нет дубликатов

Links:
[ ] Navigation header
[ ] Все ссылки работают
[ ] Относительные пути

Security:
[ ] Нет API keys
[ ] Нет PII
[ ] Нет паролей

Freshness:
[ ] Версия актуальна
[ ] Дата обновления <6 мес

Score: ___/100
Grade: A | B | C | D
Actions: ________________
```

---

## 🎯 Priority Tiers

### Tier 1 (Критично для RAG) - Review First

Файлы, которые будут часто запрашиваться AI-агентами:

1. `03_TOOLS/**/*.md` - Калькуляторы и инструменты
2. `09_DEVELOPMENT/AI_Prompts_Library/**/*.md` - Промпты
3. `05_PROCESSES/**/*.md` - Процессы
4. `01_ROLES/**/*.md` - Роли
5. `02_ARTIFACTS/**/*.md` - Артефакты

### Tier 2 (Важно) - Review Second

6. `06_AI_ASSISTANTS/**/*.md` - Спецификации ассистентов
7. `07_INTEGRATIONS/**/*.md` - Интеграции
8. `08_ARCHITECTURE/**/*.md` - Архитектура
9. `15_PRODUCT_DESIGN/JTBD/**/*.md` - Jobs To Be Done

### Tier 3 (Полезно) - Review Last

10. `00_PROJECT_OVERVIEW/**/*.md` - Обзоры
11. `12_RESEARCH/**/*.md` - Исследования
12. `13_DOCUMENTATION/**/*.md` - Общая документация

---

**Версия:** 1.0  
**Дата:** 24 октября 2025  
**Применимо к:** Весь Markdown-контент проекта  
**Статус:** ✅ Готово к использованию

