---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: assistant_spec
title: 🤖 06_AI_ASSISTANTS - Руководство по работе
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: 06_AI_ASSISTANTS/_README.md
effective_date: 2025-10-24
visibility: internal
security_level: low
tags: [ai_assistant, assistants]
---

# 🤖 06_AI_ASSISTANTS - Руководство по работе

**Назначение:** Описание всех AI ассистентов для каждой роли + Migration Assistant

---

## 📋 СОДЕРЖАНИЕ

### AI Assistants по ролям (6):
1. [PM_Assistant/](./PM_Assistant/) - Ассистент Project Manager
2. [Account_Assistant/](./Account_Assistant/) - Ассистент Account Manager
3. [Specialist_Assistant/](./Specialist_Assistant/) - Ассистент Specialist
4. [Strategist_Assistant/](./Strategist_Assistant/) - Ассистент Strategist
5. [Analyst_Assistant/](./Analyst_Assistant/) - Ассистент Analyst
6. [Creative_Assistant/](./Creative_Assistant/) - Ассистент Creative

### Специальные ассистенты (2):
7. [Migration_Assistant/](./Migration_Assistant/) - Миграция проектов в MRM
8. [Universal_Assistant/](./Universal_Assistant/) - Общий помощник

---

## 🎯 НАЗНАЧЕНИЕ ПАПКИ

### Для кого:
- 👨‍💻 **AI/ML Team** - разработка ассистентов
- 👥 **Пользователи** - как использовать AI
- 📊 **Product** - требования к AI функциям
- 🎓 **Training** - обучение работе с AI
- 📈 **Analytics** - метрики AI performance

### Что описывает:
- Архитектура AI ассистента
- Функции и возможности
- Prompt engineering
- Context optimization
- Tools и integrations
- Feedback loop
- Metrics и KPI

---

## 📁 СТРУКТУРА AI ASSISTANT

Каждый ассистент содержит **8 файлов:**

```
Assistant_Name/
├── Overview.md                [150-180 строк]
│   ├── Назначение ассистента
│   ├── Для какой роли
│   ├── Ключевые функции (5-7)
│   ├── ROI и экономия
│   ├── Архитектура (high-level)
│   └── Начало работы
│
├── Capabilities.md            [250-300 строк]
│   ├── Детальные возможности (10-15)
│   ├── Для каждой:
│   │   ├── Описание
│   │   ├── Use cases
│   │   ├── Input/Output
│   │   ├── Примеры
│   │   └── Ограничения
│   └── Roadmap функций
│
├── Architecture.md            [200-250 строк]
│   ├── Компоненты системы
│   ├── LLM модель (Claude, GPT)
│   ├── Context Manager
│   ├── Tool Registry
│   ├── Memory/Knowledge Base
│   ├── API Integrations
│   └── Диаграммы
│
├── Prompts.md                 [300-400 строк]
│   ├── System prompts
│   ├── Prompt templates
│   ├── Context structure
│   ├── Few-shot examples
│   ├── Prompt optimization
│   └── Best practices
│
├── Tools_Integration.md       [150-200 строк]
│   ├── Доступные tools
│   ├── API integrations
│   ├── External services
│   ├── Function calling
│   └── Error handling
│
├── Feedback_Loop.md           [120-150 строк]
│   ├── Сбор feedback
│   ├── Metrics tracking
│   ├── Learning mechanism
│   ├── Continuous improvement
│   └── A/B testing
│
├── Examples.md                [200-250 строк]
│   ├── 5-7 сценариев использования
│   ├── Диалоги с ассистентом
│   ├── Input/Output примеры
│   ├── Edge cases
│   └── Best vs Bad examples
│
└── API_Reference.md           [150-180 строк]
    ├── Endpoints
    ├── Authentication
    ├── Request/Response schemas
    ├── Rate limits
    ├── Error codes
    └── SDKs
```

**ИТОГО:** ~1520-1910 строк на ассистента

---

## 🔧 КАК РАБОТАТЬ С AI ASSISTANTS

### 1. ИЗУЧЕНИЕ АССИСТЕНТА

**Последовательность:**
```
1. Overview.md          [5 мин]  - Что это
2. Examples.md         [15 мин] - Как использовать
3. Capabilities.md     [20 мин] - Все функции
4. Prompts.md          [15 мин] - Как работает (AI team)
5. Architecture.md     [15 мин] - Архитектура (dev)
6. Tools_Integration   [10 мин] - Интеграции (dev)
7. Feedback_Loop       [5 мин]  - Improvement
8. API_Reference       [10 мин] - API (dev)
```

**ИТОГО:** ~95 минут на ассистента

---

### 2. СОЗДАНИЕ НОВОГО AI ASSISTANT

**Чек-лист:**
```
☐ 1. Определить цель
   ☐ - Для какой роли?
   ☐ - Какие задачи автоматизирует?
   ☐ - Какой ROI ожидается?
   
☐ 2. Создать Overview.md
   ☐ - Назначение
   ☐ - Ключевые функции (5-7)
   ☐ - ROI расчеты
   ☐ - Quick start
   
☐ 3. Создать Capabilities.md
   ☐ - Список всех функций (10-15)
   ☐ - Детальное описание каждой
   ☐ - Use cases
   ☐ - Примеры
   ☐ - Roadmap
   
☐ 4. Создать Architecture.md
   ☐ - High-level архитектура
   ☐ - Компоненты
   ☐ - Data flow
   ☐ - Integrations
   ☐ - Диаграммы (Mermaid)
   
☐ 5. Создать Prompts.md
   ☐ - System prompt
   ☐ - Prompt templates (5-10)
   ☐ - Context structure
   ☐ - Few-shot examples
   ☐ - Optimization tips
   
☐ 6. Создать Tools_Integration.md
   ☐ - Список tools (API, DB, etc.)
   ☐ - Function calling examples
   ☐ - Error handling
   ☐ - Rate limits
   
☐ 7. Создать Feedback_Loop.md
   ☐ - Metrics определены
   ☐ - Feedback механизм
   ☐ - Learning process
   ☐ - A/B testing план
   
☐ 8. Создать Examples.md
   ☐ - 5-7 реальных сценариев
   ☐ - Полные диалоги
   ☐ - Edge cases
   ☐ - Dos and Don'ts
   
☐ 9. Создать API_Reference.md
   ☐ - REST API документация
   ☐ - OpenAPI spec
   ☐ - Code examples (Python, TS)
   ☐ - SDKs
   
☐ 10. Тестирование
   ☐ - Unit tests
   ☐ - Integration tests
   ☐ - User testing
   ☐ - Performance testing
   
☐ 11. Deployment
   ☐ - Staging environment
   ☐ - Production rollout
   ☐ - Monitoring setup
   ☐ - Alerts configuration
```

---

## ✅ ЧЕК-ЛИСТ КАЧЕСТВА

### Функциональность:
```
☐ 5-7 ключевых функций
☐ 10-15 детальных capabilities
☐ Use cases описаны
☐ Edge cases обработаны
☐ Error handling есть
☐ Feedback loop настроен
```

### Промпты:
```
☐ System prompt оптимизирован
☐ Context structure defined
☐ Few-shot examples добавлены
☐ Prompt templates созданы
☐ Token optimization done
☐ Тестирование на разных сценариях
```

### Интеграции:
```
☐ API integrations работают
☐ Tools доступны
☐ Function calling корректен
☐ Error handling robust
☐ Rate limiting implemented
☐ Retries настроены
```

### Метрики:
```
☐ KPI определены
☐ Tracking настроен
☐ Dashboards созданы
☐ Alerts работают
☐ A/B testing possible
```

---

## 🔗 СВЯЗИ С ДРУГИМИ РАЗДЕЛАМИ

### Связи:
- **01_ROLES/** ↔ Ассистент для каждой роли
- **02_ARTIFACTS/** ← AI генерирует артефакты
- **05_PROCESSES/** ← AI автоматизирует процессы
- **08_ARCHITECTURE/** ← AI архитектура
- **09_DEVELOPMENT/** ← Реализация AI

---

## 📊 МЕТРИКИ AI ASSISTANTS

### Performance:
```yaml
Response Time: <2 seconds (p95)
Availability: >99.5%
Error Rate: <1%
Token Usage: оптимизировано
```

### Quality:
```yaml
Acceptance Rate: >75% (% принятых предложений)
Edit Distance: <25% (сколько редактируют AI output)
User Satisfaction: 4.5+/5
```

### Business Impact:
```yaml
Time Saved: часы/месяц на роль
ROI: % или кратность
Adoption Rate: % пользователей
NPS: Net Promoter Score
```

---

## 💡 BEST PRACTICES

### Prompt Engineering:
```
DO ✅:
- Будь specific и detailed
- Давай context и examples
- Структурируй output format
- Используй few-shot learning
- Оптимизируй token usage

DON'T ❌:
- Не делай vague prompts
- Не перегружай контекстом
- Не забывай про edge cases
- Не игнорируй feedback
```

### Context Optimization:
```
Priority Levels:
1. Critical (current task)
2. High (recent context)
3. Medium (relevant history)
4. Low (general knowledge)

Max Context: 100K tokens
Cache: frequently used context
```

### Human-in-the-Loop:
```
AI autonomy для:
✅ Рутинные задачи
✅ Data collection
✅ Report generation
✅ Suggestions

Human review для:
🤝 Creative decisions
🤝 Strategic choices
🤝 Client communication
🤝 Financial decisions
```

---

## 🚀 БЫСТРЫЙ СТАРТ

### Пользователь:
```
1. Overview.md → понять возможности
2. Examples.md → посмотреть примеры
3. Начать использовать
4. Давать feedback
```

### AI Engineer:
```
1. Architecture.md → понять систему
2. Prompts.md → изучить промпты
3. Tools_Integration → настроить tools
4. Feedback_Loop → настроить learning
```

### Product Manager:
```
1. Capabilities.md → все функции
2. Roadmap → планирование
3. Metrics → tracking success
4. User research → улучшения
```

---

## 🔄 CONTINUOUS IMPROVEMENT

### Процесс:
```
1. Collect Data
   - User interactions
   - Acceptance/rejection
   - Edit patterns
   - Feedback

2. Analyze
   - What works well?
   - What needs improvement?
   - Common failures?
   - Feature requests?

3. Improve
   - Optimize prompts
   - Add examples
   - Fine-tune models
   - Update tools

4. Deploy & Monitor
   - A/B test changes
   - Monitor metrics
   - Gather feedback
   - Iterate
```

---

**Версия:** 1.0  
**Дата:** 2025-10-23  
**Статус:** ✅ Актуально

→ [Вернуться к главному README](../README.md)  
→ [AI Development Guidelines](../09_DEVELOPMENT/AI_Development.md)


