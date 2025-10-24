---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: role_doc
title: Specialist - Полное руководство
language: ru
industry: advertising
role_apply: [specialist]
period: 2025-10
version: "1.0"
source_path: 01_ROLES/Specialist/_COMPLETE_GUIDE.md
effective_date: 2025-10-24
visibility: internal
security_level: low
tags: [role, specialist, complete_guide, hub]
---

# Specialist - Полное руководство

**Роль:** Specialist (Media Buyer/Planner) - Специалист по площадкам  
**Назначение:** Полный контекст о роли для single-retrieval AI-агентами

→ [Roles Overview](../_README.md) | [Role Description](./Role_Description.md) | [Functions](./Functions.md) | [Pain Points](./Pain_Points.md)

---

## 🎯 Описание роли

### Что делает Specialist

**Specialist (Специалист по площадкам)** - ключевая операционная роль в рекламном агентстве.

**Основные обязанности:**
- **Медиапланирование** - создание детальных медиапланов (строки размещений)
- **Закупка медиа** - настройка и запуск кампаний на площадках (Яндекс.Директ, VK, Google Ads, Programmatic)
- **Оптимизация** - ежедневный мониторинг и оптимизация кампаний
- **Аналитика** - сбор данных, анализ эффективности, отчеты

**Зоны ответственности** (RACI: Responsible):
- Создание медиаплана (100-150 строк)
- Настройка рекламных кампаний
- Управление бюджетом
- Сбор статистики и отчетность
- Коммуникация с площадками

**Подотчетен**: Project Manager (PM)  
**Работает с**: Strategist, Analyst, Account Manager, Client

---

## 📋 Детальные функции

### 1. Медиапланирование (5-7 дней)

**Input:**
- [Strategy Document](../../02_ARTIFACTS/Strategy_Document/) от Strategist
- Бюджет и KPI от Client
- Бриф от Account Manager

**Process:**
- Анализ ЦА и конкурентов
- Выбор каналов и форматов
- Расчет GRP, Reach, Frequency (используя [Shmatov Calculators](../../03_TOOLS/Media_Planning_Tools/Shmatov_Calculators/))
- Распределение бюджета по каналам
- Создание детального [Media Plan](../../02_ARTIFACTS/Media_Plan/) (Excel, 100-150 строк)

**Output:**
- Media Plan с детализацией: канал, формат, период, бюджет, prognose (impressions, clicks, CTR, CPC)

**Tools используемые:**
- [Reach Calculator](../../03_TOOLS/Reach_Calculator/) - расчет охвата
- [Effective Reach Calculator](../../03_TOOLS/Effective_Reach_Calculator/) - эффективный охват
- [Cost of Reach Calculator](../../03_TOOLS/Cost_Of_Reach_Calculator/) - стоимость охвата
- [Group Reach Calculator](../../03_TOOLS/Group_Reach_Calculator/) - суммарный охват каналов

---

### 2. Настройка кампаний (2-5 дней)

**Input:**
- Approved Media Plan
- Креативы от Creative
- Технические требования площадок

**Process:**
- Создание рекламных кампаний в интерфейсах площадок
- Настройка таргетингов (гео, демография, интересы, lookalike)
- Загрузка креативов
- Настройка ставок (CPM, CPC, CPA)
- Установка пикселей/счетчиков аналитики

**Platforms:**
- [Yandex Direct](../../07_INTEGRATIONS/Yandex_Direct/) - контекст, РСЯ
- [VK Ads](../../07_INTEGRATIONS/VK_Ads/) - таргетированная реклама
- [Google Ads](../../07_INTEGRATIONS/Google_Ads/) - контекст, медийка
- Telegram Ads - таргет в Telegram
- Programmatic (Яндекс Display, Soloway, etc.)

---

### 3. Мониторинг и оптимизация (ежедневно)

**Frequency**: Ежедневно утром + вечером

**Metrics отслеживаемые:**
- **Volume:** Impressions, Clicks, Budget spent
- **Efficiency:** CTR, CPC, CPM, CPA, ROMI
- **Quality:** Bounce rate, Time on site, Conversions

**Действия:**
- Проверка корректности показа объявлений
- Анализ отклонений от плана (budget pacing, CPC drift)
- Корректировка ставок (повышение/понижение)
- Паузирование неэффективных площадок/форматов
- Перераспределение бюджета между каналами

**Tools:**
- [Yandex Metrika](../../07_INTEGRATIONS/Yandex_Metrika/) - веб-аналитика
- [Google Analytics 4](../../07_INTEGRATIONS/GA4/) - веб-аналитика
- Dashboard платформ (Яндекс.Директ, VK, Google Ads)

---

### 4. Отчетность (еженедельно/ежемесячно)

**Frequency:**
- Weekly: краткий отчет для PM
- Monthly: полный отчет для Client

**Content:**
- Факт vs План по бюджету, показам, кликам
- Эффективность каналов (CPM, CTR, CPC, CPA, ROMI)
- Insights и рекомендации
- Learnings для следующего периода

**Output:**
- [Campaign Report](../../02_ARTIFACTS/Campaign_Report/) (Excel/PDF)
- Аналитические записки (генерируются [Report Generator AI](../../06_AI_ASSISTANTS/))

---

## 😣 Pain Points (Боли роли)

### Критичные боли

#### 1. Рутинные операции (70% времени)

**Проблема:**
- Ручной сбор статистики с 5-10 площадок ежедневно
- Copy-paste данных из интерфейсов в Excel
- Ручной расчет показателей (CTR, CPC, ROMI)

**Impact:**
- 2-3 часа/день тратится на сбор данных
- Риск ошибок (опечатки, формулы)
- Нет времени на анализ и оптимизацию

**AI Solution:**
- [Specialist Assistant](../../06_AI_ASSISTANTS/Specialist_Assistant/) - автоматический сбор данных
- Интеграции с [Yandex Direct API](../../07_INTEGRATIONS/Yandex_Direct/), [VK API](../../07_INTEGRATIONS/VK_Ads/)
- Auto-generated reports

**Time saved:** 2 часа/день → 30 минут/день (75% экономия)

---

#### 2. Создание медиаплана (5-7 дней)

**Проблема:**
- Медиаплан на 100-150 строк создается вручную
- Нужно учесть пересечения аудиторий, сезонность, бюджетные ограничения
- Расчет GRP, Reach, Frequency вручную

**Impact:**
- 5-7 дней на создание плана
- Высокий риск ошибок в расчетах
- Сложно просчитать альтернативные сценарии (What-if analysis)

**AI Solution:**
- [Media Plan Analyzer AI](../../06_AI_ASSISTANTS/Media_Planner_Assistant/) - генерация draft плана
- Автоматический расчет GRP, Reach используя [Shmatov Calculators](../../03_TOOLS/Media_Planning_Tools/Shmatov_Calculators/)
- [Scenario Planning Tool](../../03_TOOLS/Scenario_Planning_Tool/) - What-if анализ

**Time saved:** 5 дней → 2 дня (60% экономия)

---

#### 3. Коммуникация с множеством площадок

**Проблема:**
- 5-10 площадок с разными интерфейсами, требованиями, форматами
- Каждая площадка требует отдельного логина, настройки, креативов
- Нет единого интерфейса

**Impact:**
- Сложность обучения новых Specialists
- Ошибки из-за разных требований площадок
- Медленный запуск кампаний

**AI Solution:**
- Унифицированный интерфейс MRM AI Platform
- Централизованное управление кампаниями
- Auto-sync с площадками через API

---

## 🗺️ RACI Matrix

### Где Specialist = Responsible (R)

| Процесс | Specialist | PM | Account | Client | Strategist |
|---------|------------|-----|---------|--------|-----------|
| **Медиапланирование** | **R** | A | C | C | C |
| **Настройка кампаний** | **R** | A | I | - | - |
| **Мониторинг** | **R** | I | I | - | - |
| **Оптимизация** | **R** | A | I | - | C |
| **Отчетность** | **R** | A | C | I | - |
| **Сбор статистики** | **R** | I | I | - | - |

**Legend:**
- **R** - Responsible (выполняет работу)
- **A** - Accountable (принимает решение, один!)
- **C** - Consulted (консультирует, даёт input)
- **I** - Informed (информируется о результате)

### Где Specialist = Consulted (C)

| Процесс | Responsible | Accountable | Specialist | 
|---------|-------------|-------------|-----------|
| **Strategy Development** | Strategist | PM | **C** |
| **Brief Creation** | Account | PM | **C** |
| **Budget Allocation** | PM | Client | **C** |

---

## 🔧 Инструменты Specialist

### Калькуляторы (Обязательные)

1. **[Reach Calculator](../../03_TOOLS/Reach_Calculator/)** - расчет охвата
   - Formula: `Reach% = GRP / Frequency`
   - Использование: Планирование reach goals

2. **[Effective Reach Calculator](../../03_TOOLS/Effective_Reach_Calculator/)** - эффективный охват
   - Formula: `Effective_Reach = % with frequency ≥ 3`
   - Использование: Оценка качества охвата

3. **[Cost of Reach Calculator](../../03_TOOLS/Cost_Of_Reach_Calculator/)** - стоимость охвата
   - Formula: `CPR = Budget / Reach%`
   - Использование: Сравнение эффективности каналов

4. **[Group Reach Calculator](../../03_TOOLS/Group_Reach_Calculator/)** - суммарный охват
   - Formula: Учет пересечений аудиторий
   - Использование: Multi-channel планирование

### Интеграции (API)

- [Yandex Direct API](../../07_INTEGRATIONS/Yandex_Direct/) - контекстная реклама
- [VK Ads API](../../07_INTEGRATIONS/VK_Ads/) - таргетированная реклама ВК
- [Yandex Metrika API](../../07_INTEGRATIONS/Yandex_Metrika/) - веб-аналитика
- [Google Ads API](../../07_INTEGRATIONS/Google_Ads/) - Google реклама
- [GA4 API](../../07_INTEGRATIONS/GA4/) - Google Analytics

### AI Assistants

- **[Specialist Assistant](../../06_AI_ASSISTANTS/Specialist_Assistant/)** - основной помощник
  - Auto data collection
  - Performance alerts
  - Optimization suggestions

- **[Media Plan Analyzer](../../06_AI_ASSISTANTS/Media_Planner_Assistant/)** - анализ плана
  - Plan validation
  - Recommendations
  - What-if scenarios

---

## 📊 Артефакты создаваемые Specialist

### Input артефакты (читает)

1. **[Brief](../../02_ARTIFACTS/Brief/)** - от Account Manager
2. **[Strategy Document](../../02_ARTIFACTS/Strategy_Document/)** - от Strategist
3. **Budget Model** - бюджет от Client/PM

### Output артефакты (создает)

1. **[Media Plan](../../02_ARTIFACTS/Media_Plan/)** - детальный медиаплан
   - 100-150 строк размещений
   - Канал, формат, период, бюджет, прогноз

2. **[Campaign Report](../../02_ARTIFACTS/Campaign_Report/)** - отчет о кампании
   - Weekly/Monthly
   - Факт vs План, эффективность, insights

3. **Technical Specification** - техзадание для площадок
   - Креативные требования
   - Таргетинги
   - Tracking setup

---

## 🔗 Связанные процессы

### Где участвует Specialist

1. **[03_Media_Planning](../../05_PROCESSES/03_Media_Planning/)** - **Responsible**
   - Создание детального медиаплана
   - 5-7 дней

2. **[05_Campaign_Preparation](../../05_PROCESSES/05_Campaign_Preparation/)** - **Responsible**
   - Настройка кампаний на площадках
   - 2-5 дней

3. **[06_Launch_Monitoring](../../05_PROCESSES/06_Launch_Monitoring/)** - **Responsible**
   - Ежедневный мониторинг
   - Ongoing

4. **[07_Analytics_Optimization](../../05_PROCESSES/07_Analytics_Optimization/)** - **Responsible**
   - Анализ и оптимизация
   - Weekly

5. **[02_Strategy_Development](../../05_PROCESSES/02_Strategy_Development/)** - **Consulted**
   - Консультирует Strategist по медийным возможностям

---

## 💡 AI-автоматизация для Specialist

### Приоритет 1: Auto Data Collection

**Проблема:** 2-3 часа/день на ручной сбор статистики

**Решение:**
```yaml
Автоматический сбор через API:
  - Yandex Direct: campaigns, ads, keywords stats
  - VK Ads: campaigns, ads, targeting stats
  - Google Ads: campaigns, ad groups, keywords
  - Metrika/GA4: sessions, conversions, goals

Periodicity: Каждые 6 часов
Storage: ClickHouse (time-series data)
Output: Auto-updated dashboard
```

**Impact:** 2 часа/день → 0 (100% автоматизация)

---

### Приоритет 2: AI Media Plan Generator

**Проблема:** 5-7 дней на создание медиаплана

**Решение:**
```yaml
AI генерирует draft план:
  Input: Strategy, Budget, KPIs, Historical data
  Process:
    1. Анализ ЦА и каналов
    2. Расчет GRP, Reach (Shmatov)
    3. Распределение бюджета
    4. Генерация 100-150 строк
  Output: Draft Media Plan (Excel)
  Human review: Specialist проверяет и корректирует
```

**Impact:** 5 дней → 2 дня (60% экономия)

---

### Приоритет 3: Auto Optimization Suggestions

**Проблема:** Сложно выявить оптимальные действия среди 10+ каналов

**Решение:**
```yaml
AI анализирует данные и предлагает:
  - Pause underperforming: "Канал X: CPA 2000₽ vs target 1500₽ → Pause"
  - Increase budget: "Канал Y: ROMI 5x, spend 60% → +20% budget"
  - Adjust bids: "Campaign Z: CTR 0.5% vs avg 2% → Lower CPC bid"
  - Reallocate: "Shift 50k₽ from Context to Programmatic (+30% efficiency)"

Specialist review и apply предложения
```

**Impact:** Повышение ROMI на 15-25%

---

## ❓ FAQ для Specialist

### Q: Сколько времени занимает создание медиаплана?

**A:** 5-7 дней вручную. С AI-помощником: 2 дня (60% экономия).

См.: [03_Media_Planning Process](../../05_PROCESSES/03_Media_Planning/)

---

### Q: Какие инструменты обязательны для Specialist?

**A:** 
- [Reach Calculator](../../03_TOOLS/Reach_Calculator/) - расчет охвата
- [Shmatov Calculators](../../03_TOOLS/Media_Planning_Tools/Shmatov_Calculators/) - научное планирование
- [Yandex Direct API](../../07_INTEGRATIONS/Yandex_Direct/) - автоматизация контекста
- [VK Ads API](../../07_INTEGRATIONS/VK_Ads/) - автоматизация таргета

---

### Q: Кто утверждает медиаплан?

**A:** 
- **Responsible**: Specialist (создает)
- **Accountable**: PM (утверждает)
- **Consulted**: Strategist, Client
- **Informed**: Account Manager

См.: RACI Matrix выше

---

### Q: Как часто нужно мониторить кампании?

**A:** Ежедневно утром (9-10am) и вечером (6-7pm).

См.: [06_Launch_Monitoring Process](../../05_PROCESSES/06_Launch_Monitoring/)

---

### Q: Что делать если CPA выше target?

**A:**
1. Проверить качество трафика (bounce rate, time on site)
2. Pause неэффективные площадки/форматы
3. Снизить ставки CPC/CPM
4. Улучшить креативы (A/B test)
5. Пересмотреть таргетинги

AI Assistant автоматически предложит оптимизации.

---

## 📈 Success Metrics для Specialist

### KPIs

**Эффективность планирования:**
- Plan accuracy: Факт budget ±10% от План
- GRP delivery: ±5% от Plan
- Reach goal achievement: >90%

**Эффективность кампаний:**
- CPA ≤ Target CPA
- ROMI ≥ Target ROMI (обычно 3x-5x)
- CTR ≥ Industry benchmark

**Операционная эффективность:**
- Time to launch: ≤5 days (от approved plan до live)
- Reporting on-time: 100%
- Budget utilization: 95-100%

---

**Версия:** 1.0  
**Дата:** 24 октября 2025  
**Статус:** ✅ Complete Guide

---

**Для быстрого доступа:**
- [Description](./Role_Description.md) - краткое описание
- [Functions](./Functions.md) - детальные функции
- [Pain Points](./Pain_Points.md) - боли роли
- [RACI Matrix](./RACI_Matrix.md) - зоны ответственности
- [Tools Access](./Tools_Access.md) - инструменты и доступы

