---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: overview
title: Best Practices для AI Agent разработки в MRM проекте
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: AI_Agent_Development_Best_Practices.md
effective_date: 2025-10-24
visibility: internal
security_level: low
tags: [documentation]
---

# Best Practices для AI Agent разработки в MRM проекте

## 📋 Источники
**Презентации для анализа:**
- 🔄 `AI Dev - Feedback Loop [Refat Ametov] - t.me_nobilix.pdf` - Feedback Loop в AI разработке
- 🔄 `14_10_2025_Кунг_фу_контекстной_инженерии.pdf` - Оптимизация контекста
- 🔄 `etechlead_Роль_архитектуры_в_мире_вайбкодинга.pdf` - Архитектура в vibe coding
- 🔄 `Kak_podgotovit_MCP_chtoby_reshat_zadachi_a_ne_sozdavat_problemy.pdf` - MCP подготовка
- 🔄 `Тимур_Хахалев_AI_Coding_Без_Боли_Как_Начать.pdf` - AI Coding без боли

**Статус:** 🔄 Требуется конвертация PDF или скриншоты для анализа

---

## 🎯 Ожидаемые Best Practices

### 1. FEEDBACK LOOP (Рефат Аметов)

**Что ожидается:**
- Организация циклов обратной связи при работе с AI
- Итеративный подход к разработке
- Метрики качества AI-generated кода
- Процесс валидации и улучшения промптов
- Continuous improvement workflow

**Применение в MRM:**
```yaml
Feedback Loop для AI-ассистентов:
  1. Generate: AI создает первый вариант (стратегия, медиаплан, отчет)
  2. Review: Специалист проверяет и дает feedback
  3. Learn: AI учитывает замечания для следующей итерации
  4. Improve: Промпты и модели улучшаются на основе данных
  5. Measure: Метрики качества отслеживаются
```

---

### 2. ОПТИМИЗАЦИЯ КОНТЕКСТА (Кунг-фу контекстной инженерии)

**Что ожидается:**
- Приоритизация информации в контексте
- Структурирование промптов для максимальной эффективности
- Управление размером контекста (token management)
- Динамическая загрузка релевантной информации
- Техники сжатия и суммаризации

**Применение в MRM:**
```python
class ContextOptimizer:
    """
    Оптимизация контекста для AI-ассистентов
    """
    def prioritize_context(self, full_context, task):
        """
        Приоритизация информации по релевантности
        
        Уровни приоритета:
        1. Critical: Бриф клиента, текущая задача
        2. High: RACI матрица, регламент для данного типа медиа
        3. Medium: Исторические данные похожих проектов
        4. Low: Общие best practices, документация платформ
        """
        pass
    
    def manage_token_budget(self, context, max_tokens=100000):
        """
        Управление бюджетом токенов
        
        Стратегии:
        - Summarize: Суммаризация длинных документов
        - Chunk: Разбивка на релевантные чанки
        - Cache: Кэширование часто используемых блоков
        - Prune: Удаление наименее релевантной информации
        """
        pass
```

---

### 3. АРХИТЕКТУРА В VIBE CODING

**Что ожидается:**
- Роль архитектуры при работе с AI-генерацией кода
- Паттерны и принципы для AI-friendly кода
- Модульность и переиспользование
- Документирование для AI
- Code review в контексте AI

**Применение в MRM:**
```yaml
Архитектурные принципы:
  1. Модульность:
     - Каждый AI-ассистент - отдельный модуль
     - Четкие интерфейсы между компонентами
     - Независимое тестирование
  
  2. Переиспользование:
     - Библиотека промптов (prompt library)
     - Общие утилиты (parsers, validators)
     - Shared context (клиент, проект, метрики)
  
  3. Документирование:
     - README для каждого AI модуля
     - Примеры использования (examples/)
     - API документация (inline + external)
  
  4. Тестирование:
     - Unit тесты для AI-функций
     - Integration тесты для workflows
     - E2E тесты для пользовательских сценариев
```

---

### 4. MODEL CONTEXT PROTOCOL (MCP)

**Что ожидается:**
- Подготовка и настройка MCP для AI-агентов
- Избежание типичных проблем
- Best practices конфигурации
- Интеграция с различными инструментами
- Debugging и troubleshooting

**Применение в MRM:**
```json
// MCP Configuration для MRM AI
{
  "version": "1.0",
  "agents": {
    "account_assistant": {
      "model": "claude-3-5-sonnet",
      "max_tokens": 100000,
      "tools": [
        "client_database",
        "project_templates",
        "email_composer",
        "calendar_scheduler"
      ],
      "context_sources": [
        "client_history",
        "active_projects",
        "communication_log"
      ]
    },
    "specialist_assistant": {
      "model": "claude-3-5-sonnet",
      "max_tokens": 150000,
      "tools": [
        "ad_platforms_api",
        "analytics_dashboards",
        "budget_calculator",
        "reporting_generator"
      ],
      "context_sources": [
        "campaign_data",
        "platform_docs",
        "best_practices_library"
      ]
    }
  },
  "shared_context": {
    "company_knowledge": "knowledge_base/",
    "project_templates": "templates/",
    "historical_data": "data_lake/"
  }
}
```

---

### 5. AI CODING БЕЗ БОЛИ (Тимур Хахалев)

**Что ожидается:**
- Как начать работу с AI coding правильно
- Избежание типичных ошибок
- Workflow и лучшие практики
- Инструментарий и настройки
- Градиентный вход в AI-разработку

**Применение в MRM:**
```yaml
Onboarding команды на AI-разработку:
  
  Этап 1 (1-2 недели): Знакомство
    - Введение в AI-ассистенты (Claude, Cursor, GitHub Copilot)
    - Базовые промпты для типичных задач
    - Практика на простых задачах (рефакторинг, документация)
  
  Этап 2 (2-4 недели): Интеграция
    - Использование AI для создания компонентов
    - Работа с контекстом проекта
    - Code review AI-generated кода
  
  Этап 3 (1-2 месяца): Масштабирование
    - Разработка AI-ассистентов для проекта
    - Создание библиотеки промптов
    - Оптимизация workflow команды
  
  Этап 4 (ongoing): Continuous Improvement
    - Мониторинг метрик (скорость, качество)
    - Обмен best practices в команде
    - Обновление промптов и инструментов
```

---

## 🔧 Конфигурация проекта с Best Practices

### .cursorrules (для Cursor IDE)

```markdown
# MRM AI Project - Cursor Rules

## Project Context
This is a Marketing Resource Management (MRM) platform with AI-first approach.
Tech stack: Next.js 14, TypeScript, PostgreSQL, ClickHouse, Vector DB, Claude API.

## Code Style
- TypeScript strict mode
- Functional components with hooks (React)
- API routes following REST conventions
- Comprehensive JSDoc comments for all functions
- Descriptive variable names (no single letters except loops)

## AI Assistance Guidelines
1. Always provide context: What feature/module you're working on
2. Reference existing code patterns from the codebase
3. Ask for clarification if requirements are ambiguous
4. Generate tests alongside implementation
5. Document AI-generated code thoroughly

## Prompting Best Practices
### When requesting code generation:
- Provide user stories or acceptance criteria
- Reference similar existing components
- Specify error handling requirements
- Include accessibility requirements

### When debugging:
- Share full error stack trace
- Describe expected vs actual behavior
- Include relevant code context (not just the failing function)

## Project-Specific Patterns
### AI Assistants Structure
```typescript
// Each AI assistant follows this pattern:
class AIAssistant {
  constructor(
    private llm: LLMClient,
    private context: AssistantContext,
    private tools: ToolRegistry
  ) {}
  
  async processRequest(input: UserInput): Promise<AssistantResponse> {
    // 1. Gather context
    const relevantContext = await this.context.gather(input);
    
    // 2. Generate prompt
    const prompt = this.buildPrompt(input, relevantContext);
    
    // 3. Call LLM
    const response = await this.llm.generate(prompt);
    
    // 4. Post-process
    return this.postProcess(response);
  }
}
```

### RACI Implementation
- All tasks must have clear RACI assignments
- Use TypeScript enums for RACI roles
- Document role decisions in code comments

### Integration Patterns
- Use adapter pattern for external APIs
- Implement circuit breaker for reliability
- Log all external API calls for debugging

## Feedback Loop Implementation
1. Every AI-generated artifact goes through human review
2. Feedback is stored in vector DB for future improvements
3. Prompts are versioned and iterated based on feedback
4. Metrics are tracked: acceptance rate, edit distance, time saved

## Context Optimization
### For AI prompts:
- Prioritize: Current task > Project context > Historical data
- Keep prompts under 10K tokens when possible
- Use RAG (Retrieval Augmented Generation) for large knowledge bases
- Cache frequently used context (client info, project templates)

### For code generation:
- Provide interface definitions
- Include error types
- Reference existing similar code
- Specify testing requirements

## Testing Requirements
- Unit tests for all AI assistant functions
- Integration tests for workflows
- E2E tests for critical user journeys
- Performance tests for AI response times

## Documentation Standards
- Every AI module has a README
- Inline JSDoc for all public functions
- Architecture decisions recorded in ADRs
- API docs auto-generated from OpenAPI spec

## Common Pitfalls to Avoid
1. Don't generate code without context - always load relevant files first
2. Don't skip error handling - AI should generate try/catch blocks
3. Don't ignore TypeScript errors - fix them immediately
4. Don't commit without review - even AI-generated code needs human eyes
5. Don't over-optimize prematurely - focus on working code first

## Workflow
1. Read user story / task description
2. Search codebase for similar patterns
3. Gather relevant context (max 100K tokens)
4. Generate code with tests
5. Run linters and tests
6. Human review and iterate
7. Commit with descriptive message

## When to Ask for Human Help
- Ambiguous requirements
- Architectural decisions
- Breaking changes to public APIs
- Security-sensitive code
- Performance-critical sections
```

---

## 📊 Метрики для Feedback Loop

### Developer Productivity
```yaml
Метрики эффективности AI-assisted разработки:
  
  Speed Metrics:
    - Time to complete feature (with AI vs without)
    - Lines of code generated per hour
    - Time saved on boilerplate/repetitive tasks
  
  Quality Metrics:
    - Bug rate in AI-generated vs human-written code
    - Code review iterations count
    - Test coverage percentage
  
  Adoption Metrics:
    - % of commits with AI assistance
    - % of team using AI tools actively
    - Prompts library usage stats
  
  Satisfaction Metrics:
    - Developer satisfaction surveys
    - AI acceptance rate (% of AI suggestions accepted)
    - Frustration incidents (AI generated wrong code)
```

### AI Assistant Performance
```yaml
Метрики AI-ассистентов для бизнес-пользователей:
  
  Accuracy Metrics:
    - Briefs generated without edits: >70%
    - Media plans requiring <20% edits
    - Reports generated with correct data: >95%
  
  Efficiency Metrics:
    - Time saved per task (hours)
    - Tasks automated (count per week)
    - User satisfaction score (1-5)
  
  Learning Metrics:
    - Improvement rate over time
    - Feedback incorporation rate
    - User adoption growth
```

---

## 🎯 Внедрение в MRM проект

### Phase 1: Setup (Sprint 0-1)

**Задачи:**
- [ ] Настроить .cursorrules для проекта
- [ ] Создать библиотеку промптов (prompts/)
- [ ] Настроить MCP конфигурацию
- [ ] Создать контекст для AI (context/)
- [ ] Документировать архитектурные решения

**Структура проекта:**
```
mrm-ai/
├── .cursorrules              # AI coding guidelines
├── prompts/                  # Prompt library
│   ├── account_assistant/
│   ├── specialist_assistant/
│   ├── pm_assistant/
│   └── shared/
├── context/                  # Context для AI
│   ├── company_knowledge/
│   ├── project_templates/
│   └── best_practices/
├── config/
│   └── mcp.json             # MCP configuration
└── docs/
    ├── adr/                 # Architecture Decision Records
    └── ai_guidelines/       # AI development guides
```

---

### Phase 2: Implementation (Sprint 2-4)

**Задачи:**
- [ ] Реализовать ContextOptimizer
- [ ] Создать FeedbackLoop систему
- [ ] Настроить метрики и мониторинг
- [ ] Обучить команду best practices
- [ ] Провести первые итерации feedback loop

---

### Phase 3: Optimization (Sprint 5+)

**Задачи:**
- [ ] Анализ метрик и bottlenecks
- [ ] Оптимизация промптов
- [ ] Улучшение контекста
- [ ] Масштабирование на всю команду
- [ ] Документирование lessons learned

---

## 💡 Антипаттерны (чего избегать)

### ❌ Плохие практики:

1. **Blind AI Trust**
   - Не принимать AI-generated код без ревью
   - Не пропускать тесты для "простого" кода
   - Не игнорировать warnings и linter errors

2. **Context Overload**
   - Не загружать весь codebase в контекст
   - Не дублировать информацию
   - Не забывать чистить устаревший контекст

3. **Prompt Chaos**
   - Не писать ad-hoc промпты каждый раз
   - Не забывать версионировать промпты
   - Не игнорировать feedback для улучшения

4. **Integration Hell**
   - Не интегрировать AI во все процессы сразу
   - Не забывать про fallback механизмы
   - Не игнорировать latency и costs

5. **Documentation Debt**
   - Не забывать документировать AI-generated код
   - Не пропускать ADRs для архитектурных решений
   - Не игнорировать обновление README

---

## 🔄 Continuous Improvement Process

```yaml
Еженедельный ритм:
  Monday:
    - Review метрик прошлой недели
    - Планирование improvements
  
  Daily:
    - Сбор feedback от команды
    - Quick wins в промптах
  
  Friday:
    - Retrospective: Что работает, что нет
    - Обновление документации
    - Sharing best practices
  
  Monthly:
    - Глубокий анализ metrics
    - Обновление .cursorrules
    - Team training sessions
    - Celebrate wins 🎉
```

---

## 📚 Полезные ресурсы

### Промпт-библиотеки:
- [Anthropic Prompt Library](https://docs.anthropic.com/claude/prompt-library)
- [OpenAI Cookbook](https://cookbook.openai.com/)
- [LangChain Prompts](https://python.langchain.com/docs/modules/model_io/prompts/)

### Инструменты:
- Cursor IDE - AI-first code editor
- GitHub Copilot - AI pair programmer
- Claude API - для custom AI assistants
- LangChain - фреймворк для AI apps
- Weights & Biases - для tracking experiments

### Статьи и курсы:
- [Prompt Engineering Guide](https://www.promptingguide.ai/)
- [AI for Software Development](https://github.com/features/copilot)
- [Building AI Agents](https://python.langchain.com/docs/modules/agents/)

---

**Статус:** 🔄 Документ требует заполнения после анализа презентаций  
**Следующие шаги:** 
1. Конвертировать PDF или сделать скриншоты
2. Заполнить секции конкретными практиками
3. Создать конфигурационные файлы (.cursorrules, mcp.json)
4. Интегрировать в Sprint Plan

