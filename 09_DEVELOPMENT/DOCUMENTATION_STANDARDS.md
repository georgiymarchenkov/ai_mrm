---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: guide_doc
title: Documentation Standards - Стандарты документации
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: 09_DEVELOPMENT/DOCUMENTATION_STANDARDS.md
effective_date: 2025-10-24
visibility: internal
security_level: low
tags: [standards, documentation, guidelines]
---

# Documentation Standards
## Стандарты документации для MRM AI Platform

→ [Development](./README.md) | [Review Guidelines](./REVIEW_GUIDELINES.md) | [Quality Checklist](./RAG/CONTENT_QUALITY_CHECKLIST.md)

---

## 🎯 Назначение

Этот документ определяет единые стандарты для всей документации проекта, обеспечивая:
- **Консистентность** - одинаковый стиль и структура
- **RAG-готовность** - оптимизация для AI-индексации
- **Масштабируемость** - легко добавлять новые документы
- **Качество** - высокий стандарт контента

---

## 📋 Универсальные требования

### 1. Frontmatter (ОБЯЗАТЕЛЬНО)

**Каждый MD файл начинается с YAML frontmatter:**

```yaml
---
tenant_id: mrm                    # REQUIRED
client_id: global                 # REQUIRED (or specific client)
project_id: platform_docs         # REQUIRED
artifact_type: {type}             # REQUIRED - см. таксономию
title: {descriptive title}        # REQUIRED
language: ru                      # REQUIRED
industry: advertising             # REQUIRED
role_apply: [role1, role2]        # REQUIRED - кому релевантно
period: 2025-10                   # REQUIRED - period актуальности
version: "1.0"                    # REQUIRED
source_path: {relative_path}      # REQUIRED
effective_date: 2025-10-24        # REQUIRED
visibility: internal              # REQUIRED (internal/client_shared/public)
security_level: low               # REQUIRED (low/medium/high)
tags: [tag1, tag2, tag3]          # REQUIRED - минимум 2 тега
synonyms: [syn1, syn2]            # OPTIONAL - для RAG
---
```

### 2. Navigation Header

**После frontmatter - навигационные ссылки:**

```markdown
# Document Title

→ [Parent Category](../_README.md) | [Related Doc 1](./Doc1.md) | [Related Doc 2](./Doc2.md)

---
```

**Примеры:**
- Role: `→ [Roles](../_README.md) | [Description](./Role_Description.md) | [Functions](./Functions.md)`
- Process: `→ [Processes](../_README.md) | [Overview](./Overview.md) | [Steps](./Process_Steps.md)`
- Tool: `→ [Tools](../_README.md) | [Overview](./Overview.md) | [Formula](./Formula.md)`

### 3. Structure

**Стандартная структура документа:**

```markdown
# Title (H1 - только один!)

→ [Navigation]

---

## 🎯 Назначение (H2 - required)

Краткое описание (1-2 абзаца) - что это и зачем.

---

## 📋 Основной контент (H2)

### Подразделы (H3)

Детальная информация с примерами.

---

## 🔗 Связанные документы (H2 - recommended)

- [Doc 1](../path/to/doc1.md) - описание
- [Doc 2](../path/to/doc2.md) - описание

---

## 👥 Роли (H2 - if applicable)

**Owner:** Role  
**Uses:** Role1, Role2

---

**Версия:** 1.0  
**Статус:** ✅ Status
```

### 4. Эмодзи (рекомендуется)

**Использовать для визуального разделения:**

```markdown
🎯 Назначение/Цель
📋 Содержание/Структура
📊 Данные/Метрики
🔧 Инструменты
🔗 Связи/Интеграции
👥 Роли/Команда
📈 Результаты/Метрики
⚠️ Проблемы/Риски
✅ Чек-лист/Статус
💡 Идеи/Рекомендации
❓ FAQ/Вопросы
📚 Ресурсы/Материалы
```

---

## 📂 Стандарты по категориям

### Roles (`01_ROLES/{Role}/`)

**Обязательные файлы:**
```
Role_Description.md     - краткое описание роли
Functions.md            - детальные функции
Pain_Points.md          - боли роли
RACI_Matrix.md          - зоны ответственности
Tools_Access.md         - инструменты и доступы
AI_Assistant.md         - AI автоматизация (optional)
Artifacts.md            - создаваемые артефакты (optional)
_COMPLETE_GUIDE.md      - Hub document (recommended)
```

**Файл naming:**
- `Role_Description.md` (не `description.md`, не `role.md`)
- Всегда PascalCase + underscore

**Frontmatter:**
```yaml
artifact_type: role_doc
role_apply: [{role_tag}]
tags: [role, {role_tag}, {sub_type}]
```

---

### Processes (`05_PROCESSES/{Process}/`)

**Обязательные файлы:**
```
Overview.md                  - краткое описание процесса
Process_Steps.md             - пошаговый flow
Roles_Responsibilities.md    - RACI матрица
Data_IO.md                   - входы/выходы данных
Test_Scenario.md             - тестовый сценарий
_COMPLETE_GUIDE.md           - Hub document (recommended)
```

**Frontmatter:**
```yaml
artifact_type: process
tags: [process, {process_name}, {sub_type}]
```

**Process Steps format:**
```markdown
## Шаг 1: Название шага

**Responsible:** Role  
**Duration:** X hours/days  
**Input:** Artifact 1, Artifact 2  
**Output:** Artifact 3

**Действия:**
1. Action 1
2. Action 2
3. Action 3

**Критерии завершения:**
- [ ] Criterion 1
- [ ] Criterion 2
```

---

### Artifacts (`02_ARTIFACTS/{Artifact}/`)

**Обязательные файлы:**
```
Overview.md           - описание артефакта
Data_Structure.md     - структура данных (optional, for complex)
Examples.md           - примеры (optional)
```

**Frontmatter:**
```yaml
artifact_type: artifact_doc
tags: [artifact, {artifact_name}]
```

**Data Structure format:**
```yaml
# YAML schema
Field_Name:
  Type: String/Integer/Date/...
  Required: Yes/No
  Description: "..."
  Example: "..."
```

---

### Tools (`03_TOOLS/{Tool}/`)

**Обязательные файлы:**
```
Overview.md     - описание инструмента
Formula.md      - формулы/алгоритмы (if applicable)
Examples.md     - примеры использования (optional)
```

**Frontmatter:**
```yaml
artifact_type: tool_doc
tags: [tool, {tool_category}, {tool_name}]
```

---

### AI Assistants (`06_AI_ASSISTANTS/{Assistant}/`)

**Обязательные файлы:**
```
Overview.md     - описание ассистента
README.md       - технические детали (optional for complex)
```

**Overview structure:**
```markdown
## 🎯 Назначение
## 📋 Возможности (Features)
## 🔧 Технологии
## 💬 Примеры диалогов
## 📊 Метрики эффективности
## 🔗 Связанные промпты
```

**Frontmatter:**
```yaml
artifact_type: assistant_spec
tags: [assistant, ai, {role_apply}]
```

---

### Integrations (`07_INTEGRATIONS/{Integration}/`)

**Обязательные файлы:**
```
Overview.md     - описание интеграции
README.md       - технические детали (if complex API)
```

**Overview structure:**
```markdown
## 🎯 Назначение
## 📊 API Endpoints
## 🔑 Authentication
## 🔄 Sync Strategy
## 💾 Data Storage
## 🔗 Integration Points
## 🧪 Testing
```

**Frontmatter:**
```yaml
artifact_type: integration_spec
tags: [integration, {platform_name}]
```

---

## ✍️ Стиль написания

### Язык

**Русский:**
- Основной язык документации
- Термины на английском в скобках при первом упоминании: "Охват (Reach)"
- Code examples на английском

**Tone:**
- Профессиональный, но доступный
- Избегать жаргона без объяснения
- Короткие предложения (10-15 слов)

### Форматирование

**Заголовки:**
- H1 (`#`) - только название документа
- H2 (`##`) - основные секции
- H3 (`###`) - подсекции
- Не использовать H4+ (слишком глубокая вложенность)

**Списки:**
- Ненумерованные (`-`) для простых списков
- Нумерованные (`1.`) для последовательных шагов
- Чек-листы (`- [ ]`) для actionable items

**Код:**
````markdown
```language
code here
```
````

**Ссылки:**
- Relative paths: `[Text](../path/to/file.md)`
- Descriptive text: `[Media Plan Overview](../02_ARTIFACTS/Media_Plan/Overview.md)`
- Не использовать "здесь", "тут", "по ссылке"

**Выделение:**
- **Bold** - важные термины, роли, статусы
- *Italic* - акценты, примеры
- `Code` - tech terms, file names, commands

---

## 📏 Размеры файлов

**Оптимальные:**
- Overview files: 200-500 lines (~800-2000 tokens)
- Detail files: 300-800 lines (~1200-3200 tokens)
- Hub documents: 500-1500 lines (~2000-6000 tokens)

**Проблемные:**
- <50 lines - слишком поверхностно, возможно объединить
- >2000 lines - слишком монолитно, нужно разбить

**Chunking-friendly:**
- Секции H2: 100-400 lines
- Секции H3: 30-150 lines
- Каждая секция должна быть self-contained

---

## 🔗 Cross-linking Rules

### Обязательные ссылки

**Role documents → связанные:**
- Functions → Pain Points, RACI
- Pain Points → AI Assistant (solution)
- RACI → Processes (где участвует)
- Tools_Access → actual Tools

**Process documents → связанные:**
- Overview → Roles (кто участвует)
- Process_Steps → Artifacts (input/output)
- Roles_Responsibilities → Role RACI matrices

**Artifact documents → связанные:**
- Overview → Processes (где создается/используется)
- Data_Structure → related Artifacts

### Формат ссылок

```markdown
## 🔗 Связанные документы

**Input from:**
- [Brief](../02_ARTIFACTS/Brief/) - исходные требования

**Output to:**
- [Media Plan](../02_ARTIFACTS/Media_Plan/) - детальный план

**Uses:**
- [Shmatov Calculators](../03_TOOLS/Media_Planning_Tools/Shmatov_Calculators/) - расчет reach
```

---

## 🎓 Best Practices

### DO ✅

1. **Всегда добавляйте frontmatter** - без него файл не индексируется RAG
2. **Используйте относительные пути** - портабельность
3. **Добавляйте примеры** - конкретика помогает понимаю
4. **Короткие параграфы** - 3-5 предложений max
5. **Визуальные разделители** - `---`, эмодзи, блоки
6. **Обновляйте version** - при значимых изменениях

### DON'T ❌

1. **Не дублируйте контент** - используйте ссылки
2. **Не используйте абсолютные пути** - ломаются при перемещении
3. **Не создавайте orphan files** - всегда линкуйте из родителя
4. **Не пишите монолитные файлы** - разбивайте >1000 lines
5. **Не используйте вложенность H4+** - сложно читать
6. **Не забывайте про navigation header** - ключ к навигации

---

## 📝 Checklist для нового документа

```markdown
- [ ] Frontmatter заполнен (все required поля)
- [ ] Navigation header добавлен
- [ ] H1 title соответствует filename
- [ ] Структура: Назначение → Content → Related → Footer
- [ ] Есть минимум 1 cross-link к related docs
- [ ] File size: 200-1500 lines
- [ ] No orphan document (linked from parent README)
- [ ] Эмодзи использованы для секций
- [ ] Code examples отформатированы
- [ ] Версия и статус указаны в footer
```

---

## 🔄 Процесс обновления

### Минорные обновления (typos, clarifications)
- Исправить content
- Обновить `effective_date` в frontmatter
- No version bump

### Мажорные обновления (structure changes, new sections)
- Обновить content
- Bump `version` (1.0 → 1.1)
- Обновить `effective_date`
- Add note в конце: "**Changelog:** что изменилось"

### Deprecated документы
- Добавить в начало:
  ```markdown
  > ⚠️ **DEPRECATED:** This document is outdated.  
  > See [New Document](./path/to/new.md) instead.
  ```
- Обновить frontmatter: `visibility: internal` → `archived`

---

## 📚 Related Documents

- [REVIEW_GUIDELINES.md](./REVIEW_GUIDELINES.md) - правила ревью документов
- [CONTENT_QUALITY_CHECKLIST.md](./RAG/CONTENT_QUALITY_CHECKLIST.md) - чек-лист RAG-готовности
- [RAG README](./RAG/README.md) - архитектура RAG системы

---

**Версия:** 1.0  
**Дата:** 24 октября 2025  
**Статус:** ✅ Active Standard  
**Применяется:** Ко всем новым и обновляемым документам

