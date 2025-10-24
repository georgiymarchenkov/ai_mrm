---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: guide_doc
title: Language and Localization Audit Plan - План аудита языка и локализации
language: ru
industry: advertising
role_apply: [developer, technical_writer]
period: 2025-10
version: "1.0"
source_path: LANGUAGE_AND_LOCALIZATION_AUDIT_PLAN.md
effective_date: 2025-10-24
visibility: internal
security_level: medium
tags: [audit, localization, russian, language, cis]
---

# Language and Localization Audit Plan
## План аудита языка и локализации документации MRM AI

→ [Project Rules](./.cursorrules)

---

## 🎯 Цель аудита

Привести ВСЮ документацию проекта в соответствие с обновленными правилами:
1. **Язык:** Русский для всех описаний, комментариев, примеров
2. **География:** Примеры только из российского/СНГ рынка
3. **Компании:** Российские бренды и агентства
4. **Площадки:** Приоритет Яндекс, VK, российские платформы
5. **Валюта:** Только рубли (₽)

---

## 📊 Scope

### Категории файлов для проверки:

1. **Business Documentation (11_BUSINESS/)**
   - Sales процессы
   - Pricing
   - Validation отчеты
   - Интервью и исследования

2. **Product Design (15_PRODUCT_DESIGN/)**
   - JTBD
   - User stories
   - Примеры использования

3. **AI Assistants (06_AI_ASSISTANTS/)**
   - Промпты
   - Примеры взаимодействия
   - Use cases

4. **Artifacts (02_ARTIFACTS/)**
   - Примеры брифов
   - Примеры медиапланов
   - Примеры отчетов

5. **Tools (03_TOOLS/)**
   - Описания инструментов
   - Калькуляторы

6. **Integrations (07_INTEGRATIONS/)**
   - Описания интеграций
   - Примеры API calls

7. **Development (09_DEVELOPMENT/)**
   - Technical specifications
   - Prompts library

8. **Architecture (08_ARCHITECTURE/)**
   - System design
   - Примеры схем

---

## 🔍 Критерии проверки

### 1. Язык описаний

**Что проверять:**
- [ ] Заголовки на русском
- [ ] Описания на русском
- [ ] Комментарии в примерах кода на русском
- [ ] User stories на русском
- [ ] Примеры взаимодействия на русском

**Исключения (допустим английский):**
- Названия переменных/функций в коде
- Технические термины без русского эквивалента
- Названия технологий (Next.js, PostgreSQL и т.д.)
- API endpoints

### 2. Компании и бренды в примерах

**Заменить западные → на российские:**

| Западные (убрать) | Российские (использовать) |
|-------------------|---------------------------|
| Coca-Cola | Сбербанк, МТС, Яндекс |
| Nike | Спортмастер, Декатлон Россия |
| Apple | М.Видео, DNS |
| Walmart | X5 Retail Group, Магнит |
| Amazon | Ozon, Wildberries |
| McDonald's | Вкусно и точка |
| Starbucks | Шоколадница, Кофе Хауз |
| Bank of America | Сбербанк, ВТБ, Тинькофф |
| Salesforce, HubSpot | RetailCRM, Битрикс24, amoCRM |

### 3. Рекламные площадки

**Приоритет (в примерах использовать в этом порядке):**

1. **Контекстная реклама:**
   - ✅ Яндекс Директ (primary)
   - ⚠️ Google Ads (secondary, если упоминается)

2. **Таргетированная реклама:**
   - ✅ VK Реклама (primary)
   - ✅ myTarget
   - ✅ Telegram Ads
   - ❌ Facebook Ads (не использовать, не работает в РФ)
   - ❌ Instagram Ads (не использовать)

3. **Аналитика:**
   - ✅ Яндекс Метрика (primary)
   - ⚠️ Google Analytics (secondary)

4. **E-commerce:**
   - ✅ Ozon
   - ✅ Wildberries
   - ✅ Яндекс Маркет
   - ❌ Amazon (не использовать)

### 4. География

**Города в примерах (использовать):**
- Москва
- Санкт-Петербург
- Екатеринбург
- Новосибирск
- Казань
- Нижний Новгород
- Краснодар
- Ростов-на-Дону

**НЕ использовать:**
- New York, Los Angeles, Chicago
- London, Paris, Berlin
- Tokyo, Singapore

### 5. Валюта

**Заменить:**
- ❌ `$`, `USD`, `dollars` → ✅ `₽`, `руб`, `рублей`
- ❌ `€`, `EUR`, `euros` → ✅ `₽`, `руб`, `рублей`
- ❌ `$50,000` → ✅ `₽5,000,000`

**Курс для пересчета (примерный):**
- $1 = ₽100
- €1 = ₽110

### 6. Имена людей в примерах

**Использовать русские имена:**
- Иван Иванов, Мария Петрова, Алексей Смирнов
- Елена Козлова, Дмитрий Волков

**НЕ использовать:**
- John Smith, Jane Doe, Bob Johnson

### 7. Названия компаний в примерах

**Использовать реальные российские агентства:**
- Realweb
- iConText
- Deltaplan
- Red Keds
- Grape
- Adventum
- iProspect Russia

---

## 📋 Файлы для проверки (Prioritized)

### Priority 1: Customer-Facing Documentation (высший приоритет)

**11_BUSINESS/**
- [ ] Sales_Process_And_Demo.md (1826 строк)
- [ ] Pricing_Strategy.md (717 строк)
- [ ] Concept_Validation_Report.md (588 строк)
- [ ] Beta_Candidates_Action_Plan.md (498 строк)
- [ ] Financial_Model_Development_Plan.md (только что создан)
- [ ] Customer_Interviews/*.md

### Priority 2: Product Documentation

**15_PRODUCT_DESIGN/**
- [ ] JTBD/JTBD_Analysis.md
- [ ] JTBD/JTBD_Framework.md
- [ ] Principles/*.md

**02_ARTIFACTS/**
- [ ] Brief/Examples.md
- [ ] Media_Plan/Examples.md
- [ ] Campaign_Report/*.md
- [ ] Strategy_Document/Examples.md
- [ ] Commercial_Proposal/*.md

### Priority 3: AI Prompts & Assistants

**06_AI_ASSISTANTS/**
- [ ] Migration_Assistant/README.md
- [ ] Media_Planner_Assistant/*.md
- [ ] Report_Generator/*.md
- [ ] PM_Assistant/*.md
- [ ] Account_Assistant/*.md

**09_DEVELOPMENT/AI_Prompts_Library/**
- [ ] 01_Migration_Assistant/*.md
- [ ] 02_Media_Plan_Analyzer/*.md
- [ ] 03_Report_Generator/*.md
- [ ] 04_Project_Assistant/*.md
- [ ] 05_Brief_Generator/*.md

### Priority 4: Technical Documentation

**08_ARCHITECTURE/**
- [ ] API_Specification.md
- [ ] Data_Models.md
- [ ] Deployment.md
- [ ] *.md

**09_DEVELOPMENT/**
- [ ] Tech_Stack.md
- [ ] AI_Development_Best_Practices.md
- [ ] RAG/README.md

### Priority 5: Integrations & Tools

**07_INTEGRATIONS/**
- [ ] README.md
- [ ] Yandex_Direct/README.md
- [ ] VK_Ads/README.md
- [ ] Yandex_Metrika/README.md
- [ ] Garpun_Partnership/README.md

**03_TOOLS/**
- [ ] Media_Planning_Tools/Shmatov_Calculators/*.md
- [ ] Analytics_Tools/*.md

---

## 🔧 Процесс исправления

### Для каждого файла:

1. **Прочитать файл**
2. **Найти проблемы:**
   - Английские описания → перевести на русский
   - Западные компании → заменить на российские
   - Facebook/Instagram → заменить на VK/Telegram
   - Google Ads → заменить на Яндекс Директ (или оставить как secondary)
   - Доллары/евро → пересчитать в рубли
   - Западные города → российские города
   - Западные имена → российские имена
3. **Исправить**
4. **Проверить согласованность** (если есть ссылки на другие файлы)
5. **Commit изменений**

---

## 📝 Template для исправления

### Пример 1: Компании

**БЫЛО:**
```markdown
Example client: Coca-Cola, launching new campaign in New York with $500,000 budget via Google Ads and Facebook.
```

**СТАЛО:**
```markdown
Пример клиента: Сбербанк, запуск новой кампании в Москве с бюджетом ₽50,000,000 через Яндекс Директ и VK Рекламу.
```

### Пример 2: Use Case

**БЫЛО:**
```markdown
**Use Case:** Jane from Nike uses the platform to plan Q4 campaign across Facebook, Instagram, and Google Ads with $2M budget.
```

**СТАЛО:**
```markdown
**Сценарий использования:** Мария из МТС использует платформу для планирования кампании на 4 квартал через VK Рекламу, Telegram Ads и Яндекс Директ с бюджетом ₽200,000,000.
```

### Пример 3: Demo Script

**БЫЛО:**
```markdown
"Let me show you how we migrated Coca-Cola's campaign from Excel to our platform in 10 minutes..."
```

**СТАЛО:**
```markdown
"Давайте покажу, как мы мигрировали кампанию Сбербанка из Excel в нашу платформу за 10 минут..."
```

### Пример 4: Pricing

**БЫЛО:**
```markdown
Pricing: $12/user/month
Example (15 users): $180/month = $2,160/year
```

**СТАЛО:**
```markdown
Ценообразование: ₽1,200/пользователь/месяц
Пример (15 пользователей): ₽18,000/месяц = ₽216,000/год
```

### Пример 5: Analytics Platforms

**БЫЛО:**
```markdown
Connect your analytics:
- Google Analytics (primary)
- Facebook Pixel
- Twitter Analytics
```

**СТАЛО:**
```markdown
Подключите вашу аналитику:
- Яндекс Метрика (основная)
- VK Пиксель
- Telegram Analytics
```

---

## ✅ Чеклист качества исправлений

После исправления каждого файла проверить:

- [ ] Все описания на русском языке
- [ ] Все примеры с российскими компаниями
- [ ] Все площадки — российские (или с российским приоритетом)
- [ ] Вся валюта — рубли
- [ ] Все города — российские/СНГ
- [ ] Все имена — русские
- [ ] Технические термины корректны
- [ ] Ссылки на другие файлы работают
- [ ] Frontmatter не поврежден
- [ ] Markdown syntax корректен

---

## 🎯 Expected Results

После завершения аудита:

1. **Консистентность:** Вся документация на русском языке
2. **Релевантность:** Все примеры из российского рынка
3. **Аутентичность:** Реальные компании, площадки, процессы РФ/СНГ
4. **Профессионализм:** Корректная терминология рекламного рынка РФ
5. **Готовность:** Документация готова для российских клиентов и инвесторов

---

## 📊 Tracking Progress

### Statistics to track:

- Total files audited: 0 / ~150
- Files with issues found: 0
- Files fixed: 0
- Western companies replaced: 0
- Currency conversions: 0
- Platform replacements: 0

---

## 🚀 Execution Plan

**Phase 1: Priority 1 files (2-3 hours)**
- Sales_Process_And_Demo.md
- Pricing_Strategy.md
- Concept_Validation_Report.md
- Financial_Model_Development_Plan.md

**Phase 2: Priority 2-3 files (3-4 hours)**
- JTBD documentation
- AI Assistants
- Examples in Artifacts

**Phase 3: Priority 4-5 files (2-3 hours)**
- Technical documentation
- Architecture
- Integrations

**Total estimated time: 7-10 hours**

---

**Начинаем аудит!** 🚀

---

**Версия:** 1.0  
**Дата:** 24 октября 2025  
**Статус:** 🏁 Ready to execute  
**Owner:** Development Team

