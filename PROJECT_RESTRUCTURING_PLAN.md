---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: overview
title: План реструктуризации MRM AI проекта
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: PROJECT_RESTRUCTURING_PLAN.md
effective_date: 2025-10-24
visibility: internal
security_level: low
tags: [documentation]
---

# План реструктуризации MRM AI проекта

## 📊 Текущее состояние

**Проблемы:**
- Файлы слишком большие (1000-1500 строк)
- Информация не структурирована по доменам
- Сложно навигироваться
- Отсутствует модульность

**Большие файлы для разделения:**
- `Roles_And_RACI_Analysis.md` - 1471 строка → разделить по ролям
- `Platform_Tools_And_Instruments.md` - 1344 строки → разделить по инструментам
- `MRM_Market_Analysis_Global_And_Russia.md` - 1350 строк → вынести в отдельную папку
- `Brief_UI_UX_Analysis.md` - 1108 строк → в папку артефактов

---

## 🏗️ Новая структура проекта

```
MRM/
│
├── 📁 00_PROJECT_OVERVIEW/
│   ├── README.md                              # Главная страница проекта
│   ├── Project_Vision.md                      # Видение и миссия
│   ├── Value_Proposition.md                   # Ценностное предложение
│   └── Quick_Start_Guide.md                   # Быстрый старт
│
├── 📁 01_ROLES/                                # РОЛИ В СИСТЕМЕ
│   ├── _Roles_Overview.md                     # Обзор всех ролей
│   │
│   ├── 📁 Client/                             # Клиент
│   │   ├── Role_Description.md                # Описание роли
│   │   ├── Functions.md                       # Функции и задачи
│   │   ├── Artifacts.md                       # Артефакты (брифы, approvals)
│   │   ├── Processes.md                       # Процессы с участием
│   │   ├── RACI_Matrix.md                     # RACI для клиента
│   │   └── Tools_Access.md                    # Доступные инструменты
│   │
│   ├── 📁 Account_Manager/
│   │   ├── Role_Description.md
│   │   ├── Functions.md
│   │   ├── Artifacts.md                       # КП, отчеты, коммуникация
│   │   ├── Processes.md                       # Процесс подготовки КП, отчетность
│   │   ├── RACI_Matrix.md
│   │   ├── Tools_Access.md                    # CRM, Email, Calendar, AI Assistant
│   │   └── AI_Assistant.md                    # Описание AI помощника
│   │
│   ├── 📁 Specialist/                         # Специалист по площадкам
│   │   ├── Role_Description.md
│   │   ├── Functions.md
│   │   ├── Artifacts.md                       # Медиапланы, настройки кампаний
│   │   ├── Processes.md
│   │   ├── RACI_Matrix.md
│   │   ├── Tools_Access.md                    # Рекламные кабинеты, калькуляторы
│   │   └── AI_Assistant.md
│   │
│   ├── 📁 Project_Manager/
│   │   ├── Role_Description.md
│   │   ├── Functions.md
│   │   ├── Artifacts.md                       # Таймлайны, бюджеты, статусы
│   │   ├── Processes.md
│   │   ├── RACI_Matrix.md
│   │   ├── Tools_Access.md
│   │   └── AI_Assistant.md
│   │
│   ├── 📁 Strategist/
│   │   ├── Role_Description.md
│   │   ├── Functions.md
│   │   ├── Artifacts.md                       # Стратегии, бенчмарки, insights
│   │   ├── Processes.md
│   │   ├── RACI_Matrix.md
│   │   ├── Tools_Access.md                    # MMM, аналитика, research tools
│   │   └── AI_Assistant.md
│   │
│   ├── 📁 Analyst/
│   │   └── ...
│   │
│   └── 📁 Creative/
│       └── ...
│
├── 📁 02_ARTIFACTS/                            # АРТЕФАКТЫ СИСТЕМЫ
│   ├── _Artifacts_Overview.md
│   │
│   ├── 📁 Brief/                              # Бриф клиента
│   │   ├── Data_Structure.md                  # Структура данных (JSON schema)
│   │   ├── UI_Template_Web.md                 # Web интерфейс
│   │   ├── UI_Template_Sheets.md              # Google Sheets шаблон
│   │   ├── Validation_Rules.md                # Правила валидации
│   │   ├── Examples.md                        # Примеры заполнения
│   │   └── API_Endpoints.md                   # API для работы с брифом
│   │
│   ├── 📁 Commercial_Proposal/                # Коммерческое предложение
│   │   ├── Data_Structure.md
│   │   ├── UI_Template_Web.md
│   │   ├── UI_Template_Sheets.md
│   │   ├── Calculation_Logic.md               # Логика расчетов
│   │   └── Examples.md
│   │
│   ├── 📁 Media_Plan/                         # Медиаплан
│   │   ├── Data_Structure.md
│   │   ├── UI_Template_Web.md
│   │   ├── UI_Template_Sheets.md
│   │   ├── Calculation_Logic.md
│   │   └── Examples.md
│   │
│   ├── 📁 Campaign_Report/                    # Отчет по кампании
│   │   └── ...
│   │
│   ├── 📁 Strategy_Document/                  # Стратегический документ
│   │   └── ...
│   │
│   └── 📁 Technical_Specification/            # ТЗ на запуск
│       └── ...
│
├── 📁 03_TOOLS/                                # ИНСТРУМЕНТЫ
│   ├── _Tools_Overview.md
│   │
│   ├── 📁 Media_Planning_Tools/               # Инструменты медиапланирования
│   │   ├── _Overview.md
│   │   │
│   │   ├── 📁 Shmatov_Calculators/           # Калькуляторы Шматова
│   │   │   ├── Overview.md                    # Обзор методологии
│   │   │   ├── Calculator_01_Media_Reach.md   # Охват медиа
│   │   │   ├── Calculator_02_Effective_Reach.md # Эффективный охват
│   │   │   ├── Calculator_03_Reach_Spectrum.md  # Спектр охвата
│   │   │   ├── Calculator_04_Multi_Media_Reach.md # Охват группы медиа
│   │   │   ├── Calculator_05_Flight_Gap.md    # Длительность паузы
│   │   │   ├── Calculator_06_Cost_Per_Reach.md # Стоимость охвата
│   │   │   ├── Calculator_07_Effective_Frequency.md # Эффективная частота
│   │   │   ├── Formulas_Reference.md          # Справочник формул
│   │   │   └── Implementation_Guide.md        # Руководство по внедрению
│   │   │
│   │   └── 📁 Budget_Optimizers/
│   │       ├── Budget_Allocation_Tool.md
│   │       ├── ROI_Calculator.md
│   │       └── Scenario_Planning_Tool.md
│   │
│   ├── 📁 Analytics_Tools/                    # Инструменты аналитики
│   │   ├── _Overview.md
│   │   │
│   │   ├── 📁 Media_Analytics/                # Аналитика медийной рекламы
│   │   │   ├── Overview.md
│   │   │   ├── Creative_Analysis_AI.md        # AI анализ креативов
│   │   │   ├── Attribution_Models.md          # Модели атрибуции
│   │   │   ├── Viewability_Tracking.md        # Отслеживание видимости
│   │   │   └── Performance_Dashboard.md       # Дашборд эффективности
│   │   │
│   │   ├── 📁 Econometrics/                   # Эконометрика
│   │   │   ├── Overview.md
│   │   │   ├── MMM_Model.md                   # Media Mix Modeling
│   │   │   ├── CUBE_Methodology.md            # CUBE моделирование
│   │   │   ├── Incrementality_Testing_PIE.md  # PIE метод
│   │   │   └── Demand_Forecasting.md          # Прогнозирование спроса
│   │   │
│   │   └── 📁 Reporting/
│   │       ├── Automated_Reports_Generator.md
│   │       ├── Custom_Dashboards.md
│   │       └── Data_Visualization.md
│   │
│   ├── 📁 Campaign_Management_Tools/          # Управление кампаниями
│   │   ├── Campaign_Optimizer.md
│   │   ├── Bid_Management.md
│   │   ├── Audience_Overlap_Analyzer.md
│   │   └── Multi_Campaign_Coordinator.md
│   │
│   └── 📁 Integration_Tools/                  # Интеграции
│       ├── API_Connectors.md
│       ├── Data_Import_Export.md
│       └── Platform_Integrations.md
│
├── 📁 04_PLATFORMS/                            # РЕКЛАМНЫЕ ПЛОЩАДКИ
│   ├── _Platforms_Overview.md
│   │
│   ├── 📁 Context_Advertising/                # Контекстная реклама
│   │   ├── Overview.md
│   │   ├── Roles.md                           # Роли для работы
│   │   ├── Platforms_List.md                  # Яндекс Директ, Google Ads
│   │   ├── Processes.md                       # Процессы запуска и управления
│   │   ├── Tools.md                           # Специфичные инструменты
│   │   ├── Instructions.md                    # Инструкции по работе
│   │   ├── RACI_Matrix.md                     # RACI для контекста
│   │   └── Best_Practices.md
│   │
│   ├── 📁 Targeted_Advertising/               # Таргетированная реклама
│   │   ├── Overview.md
│   │   ├── Roles.md
│   │   ├── Platforms_List.md                  # VK, MyTarget, Telegram
│   │   ├── Processes.md
│   │   ├── Tools.md
│   │   ├── Instructions.md
│   │   ├── RACI_Matrix.md
│   │   └── Best_Practices.md
│   │
│   ├── 📁 Programmatic/                       # Программатик
│   │   ├── Overview.md
│   │   ├── Roles.md
│   │   ├── Platforms_List.md                  # Yandex Display, Soloway, Getintent
│   │   ├── Processes.md
│   │   ├── Tools.md
│   │   ├── Instructions.md
│   │   ├── RACI_Matrix.md
│   │   └── Best_Practices.md
│   │
│   ├── 📁 RTB/                                # RTB
│   │   └── ...
│   │
│   ├── 📁 Content_Platforms/                  # Контентные платформы
│   │   ├── Platforms_List.md                  # Дзен, Промо-страницы
│   │   └── ...
│   │
│   ├── 📁 ECOM/                               # E-commerce
│   │   ├── Platforms_List.md                  # Ozon, Yandex Market
│   │   └── ...
│   │
│   ├── 📁 CPA_Networks/                       # CPA сети
│   │   └── ...
│   │
│   └── 📁 Social_Media/                       # Соцсети
│       └── ...
│
├── 📁 05_PROCESSES/                            # ПРОЦЕССЫ
│   ├── _Processes_Overview.md
│   │
│   ├── 📁 Client_Onboarding/                  # Онбординг клиента
│   │   ├── Process_Flow.md                    # Блок-схема процесса
│   │   ├── Steps_Detailed.md                  # Детальные шаги
│   │   ├── RACI_Matrix.md                     # RACI для процесса
│   │   ├── Artifacts_Input_Output.md          # Входы и выходы
│   │   ├── Automation_Opportunities.md        # Где можно автоматизировать
│   │   └── Metrics.md                         # Метрики процесса
│   │
│   ├── 📁 Commercial_Proposal_Preparation/    # Подготовка КП
│   │   ├── Process_Flow.md
│   │   ├── Steps_Detailed.md
│   │   ├── RACI_Matrix.md
│   │   ├── Artifacts_Input_Output.md
│   │   ├── Automation_Opportunities.md
│   │   └── Metrics.md
│   │
│   ├── 📁 Campaign_Launch/                    # Запуск кампании
│   │   └── ...
│   │
│   ├── 📁 Campaign_Optimization/              # Оптимизация кампании
│   │   └── ...
│   │
│   ├── 📁 Reporting/                          # Отчетность
│   │   └── ...
│   │
│   └── 📁 Campaign_Closeout/                  # Закрытие кампании
│       └── ...
│
├── 📁 06_AI_ASSISTANTS/                        # AI АССИСТЕНТЫ
│   ├── _Assistants_Overview.md
│   │
│   ├── 📁 Account_Manager_Assistant/
│   │   ├── Overview.md                        # Описание ассистента
│   │   ├── Use_Cases.md                       # Сценарии использования
│   │   ├── Capabilities.md                    # Возможности
│   │   ├── Prompts_Library.md                 # Библиотека промптов
│   │   ├── Context_Requirements.md            # Требования к контексту
│   │   ├── Tools_Integration.md               # Интеграция инструментов
│   │   ├── Performance_Metrics.md             # Метрики эффективности
│   │   └── Implementation_Guide.md
│   │
│   ├── 📁 Specialist_Assistant/
│   │   └── ...
│   │
│   ├── 📁 PM_Assistant/
│   │   └── ...
│   │
│   ├── 📁 Strategist_Assistant/
│   │   └── ...
│   │
│   └── 📁 Migration_Assistant/                # Ассистент миграции
│       ├── Overview.md
│       ├── Migration_Process.md               # Процесс миграции проекта
│       ├── Data_Extraction.md                 # Извлечение данных
│       ├── Data_Mapping.md                    # Маппинг данных
│       └── Validation.md                      # Валидация после миграции
│
├── 📁 07_INTEGRATIONS/                         # ИНТЕГРАЦИИ
│   ├── _Integrations_Overview.md
│   │
│   ├── 📁 Advertising_Platforms/              # Рекламные платформы
│   │   ├── Yandex_Direct_API.md
│   │   ├── VK_Ads_API.md
│   │   ├── MyTarget_API.md
│   │   ├── Telegram_Ads_API.md
│   │   └── ...
│   │
│   ├── 📁 Analytics_Systems/                  # Системы аналитики
│   │   ├── Yandex_Metrika_API.md
│   │   ├── Google_Analytics_API.md
│   │   ├── Adriver_API.md
│   │   └── ...
│   │
│   ├── 📁 CRM_Systems/
│   │   └── ...
│   │
│   └── 📁 Project_Management/
│       ├── Jira_Integration.md
│       ├── Google_Sheets_Integration.md
│       └── Slack_Integration.md
│
├── 📁 08_ARCHITECTURE/                         # АРХИТЕКТУРА
│   ├── System_Architecture.md                 # Общая архитектура
│   ├── Data_Architecture.md                   # Архитектура данных
│   ├── AI_Architecture.md                     # Архитектура AI
│   ├── Integration_Architecture.md            # Архитектура интеграций
│   ├── Security_Architecture.md               # Архитектура безопасности
│   └── Deployment_Architecture.md             # Архитектура развертывания
│
├── 📁 09_DEVELOPMENT/                          # РАЗРАБОТКА
│   ├── Tech_Stack.md                          # Технологический стек
│   ├── Development_Guidelines.md              # Руководства разработки
│   ├── AI_Development_Best_Practices.md       # Best practices AI
│   ├── Code_Style_Guide.md                    # Стиль кода
│   ├── Testing_Strategy.md                    # Стратегия тестирования
│   └── CI_CD_Pipeline.md                      # CI/CD
│
├── 📁 10_SPRINTS/                              # СПРИНТЫ
│   ├── Sprint_Plan_Overview.md
│   ├── Sprint_00_Preparation.md
│   ├── Sprint_01_Foundation.md
│   ├── Sprint_02_04_MVP.md
│   └── ...
│
├── 📁 11_BUSINESS/                             # БИЗНЕС
│   ├── Business_Model.md                      # Бизнес-модель
│   ├── Pricing_Strategy.md                    # Ценообразование
│   ├── Market_Analysis.md                     # Анализ рынка
│   ├── Competitive_Analysis.md                # Конкурентный анализ
│   ├── Go_To_Market_Strategy.md               # GTM стратегия
│   └── Financial_Projections.md               # Финансовые прогнозы
│
├── 📁 12_RESEARCH/                             # ИССЛЕДОВАНИЯ
│   ├── Scientific_Research_ML.md
│   ├── User_Interviews.md
│   ├── Market_Research.md
│   └── Best_Practices_Analysis.md
│
└── 📁 13_DOCUMENTATION/                        # ДОКУМЕНТАЦИЯ
    ├── User_Guide.md                          # Руководство пользователя
    ├── Admin_Guide.md                         # Руководство администратора
    ├── API_Documentation.md                   # API документация
    ├── FAQ.md                                 # Часто задаваемые вопросы
    └── Glossary.md                            # Глоссарий терминов
```

---

## 🔄 План миграции данных

### Этап 1: Создание структуры папок (30 мин)
```bash
# Создать всю структуру папок
mkdir -p 00_PROJECT_OVERVIEW
mkdir -p 01_ROLES/{Client,Account_Manager,Specialist,Project_Manager,Strategist,Analyst,Creative}
mkdir -p 02_ARTIFACTS/{Brief,Commercial_Proposal,Media_Plan,Campaign_Report,Strategy_Document,Technical_Specification}
mkdir -p 03_TOOLS/{Media_Planning_Tools,Analytics_Tools,Campaign_Management_Tools,Integration_Tools}
# ... и т.д.
```

### Этап 2: Распределение существующего контента

#### Из `Roles_And_RACI_Analysis.md` (1471 строка)
→ Разделить на:
- `01_ROLES/*/Role_Description.md` - описания ролей
- `01_ROLES/*/RACI_Matrix.md` - RACI матрицы
- `05_PROCESSES/*/RACI_Matrix.md` - RACI по процессам
- `04_PLATFORMS/*/RACI_Matrix.md` - RACI по площадкам

#### Из `Platform_Tools_And_Instruments.md` (1344 строки)
→ Разделить на:
- `03_TOOLS/Media_Planning_Tools/Shmatov_Calculators/*` - калькуляторы
- `03_TOOLS/Analytics_Tools/Media_Analytics/*` - аналитика
- `03_TOOLS/Analytics_Tools/Econometrics/*` - эконометрика
- `06_AI_ASSISTANTS/*` - описания ассистентов

#### Из `Brief_UI_UX_Analysis.md` (1108 строк)
→ Переместить в:
- `02_ARTIFACTS/Brief/Data_Structure.md` - структура данных
- `02_ARTIFACTS/Brief/UI_Template_Web.md` - UI шаблон
- `02_ARTIFACTS/Brief/Validation_Rules.md` - правила
- `02_ARTIFACTS/Brief/Examples.md` - примеры

#### Из `Commercial_Proposal_Preparation_RACI.md` (557 строк)
→ Переместить в:
- `05_PROCESSES/Commercial_Proposal_Preparation/*` - процесс КП
- `01_ROLES/*/Processes.md` - добавить в процессы ролей
- `02_ARTIFACTS/Commercial_Proposal/*` - артефакт КП

#### Из `Technical_Architecture.md` (898 строк)
→ Разделить на:
- `08_ARCHITECTURE/System_Architecture.md`
- `08_ARCHITECTURE/Data_Architecture.md`
- `08_ARCHITECTURE/AI_Architecture.md`
- `08_ARCHITECTURE/Integration_Architecture.md`

#### Из `MRM_AI_SaaS_Project_Plan.md` (938 строк)
→ Разделить на:
- `00_PROJECT_OVERVIEW/Project_Vision.md`
- `10_SPRINTS/*` - по спринтам
- `11_BUSINESS/Go_To_Market_Strategy.md`

#### Из `Business_Model_And_Financials.md` (910 строк)
→ Переместить в:
- `11_BUSINESS/Business_Model.md`
- `11_BUSINESS/Pricing_Strategy.md`
- `11_BUSINESS/Financial_Projections.md`

#### Из `MRM_Market_Analysis_Global_And_Russia.md` (1350 строк)
→ Переместить в:
- `11_BUSINESS/Market_Analysis.md`
- `11_BUSINESS/Competitive_Analysis.md`

#### Из `Team_Audit_AI_Automation_Opportunities.md` (1091 строка)
→ Переместить в:
- `12_RESEARCH/User_Interviews.md`
- `06_AI_ASSISTANTS/*/Use_Cases.md` - use cases автоматизации

#### Из `AI_Agent_Development_Best_Practices.md` (526 строк)
→ Переместить в:
- `09_DEVELOPMENT/AI_Development_Best_Practices.md`
- `09_DEVELOPMENT/Code_Style_Guide.md`

---

## 📋 Приоритеты реструктуризации

### Фаза 1 (критическая): Роли и Артефакты (2-3 часа)
**Цель:** Разделить самые большие файлы

1. ✅ Создать структуру папок `01_ROLES/` и `02_ARTIFACTS/`
2. ✅ Разделить `Roles_And_RACI_Analysis.md` по ролям
3. ✅ Разделить `Brief_UI_UX_Analysis.md` на артефакт Brief
4. ✅ Создать основные роли: Client, Account Manager, Specialist, PM, Strategist

**Результат:** 5-6 файлов → 30-40 файлов, каждый 50-200 строк

---

### Фаза 2 (высокая): Инструменты и Площадки (2-3 часа)
**Цель:** Структурировать инструменты и платформы

1. ✅ Создать структуру `03_TOOLS/` и `04_PLATFORMS/`
2. ✅ Разделить `Platform_Tools_And_Instruments.md` по инструментам
3. ✅ Выделить калькуляторы Шматова (7 файлов)
4. ✅ Выделить инструменты аналитики и эконометрики
5. ✅ Создать файлы для групп площадок (Context, Target, Programmatic, RTB, etc.)

**Результат:** Четкая классификация всех инструментов и площадок

---

### Фаза 3 (средняя): Процессы и AI (1-2 часа)
**Цель:** Описать процессы и AI ассистентов

1. ✅ Создать структуру `05_PROCESSES/` и `06_AI_ASSISTANTS/`
2. ✅ Выделить ключевые процессы (6-8 процессов)
3. ✅ Создать файлы для AI ассистентов (5 ролей)
4. ✅ Добавить Migration Assistant

**Результат:** Понятная структура процессов и AI

---

### Фаза 4 (низкая): Архитектура и Бизнес (1 час)
**Цель:** Организовать техническую и бизнес документацию

1. ✅ Разделить Technical Architecture
2. ✅ Разделить Business & Market Analysis
3. ✅ Создать Sprint планы
4. ✅ Организовать Research

**Результат:** Все документы в логичной структуре

---

## 🎯 Ценность новой структуры

### Для команды разработки:
- ✅ Легко найти нужную информацию
- ✅ Модульность - работа над отдельными компонентами
- ✅ Четкое разделение ответственности
- ✅ Удобно поддерживать и обновлять

### Для продукта:
- ✅ Готовая структура для документации
- ✅ Каждый модуль может быть отдельным feature
- ✅ Легко масштабировать (добавлять роли, инструменты, платформы)
- ✅ Четкая навигация для пользователей

### Для рынка:
- ✅ Профессиональная упаковка
- ✅ Легко демонстрировать возможности
- ✅ Модульная продажа (можно продавать отдельные модули)
- ✅ Готовые шаблоны и инструкции

---

## 🚀 Следующие шаги

1. **Утверждение структуры** - подтвердите, что структура соответствует видению
2. **Создание папок** - автоматически создать всю структуру
3. **Миграция контента** - фаза за фазой переносить информацию
4. **Создание index файлов** - _Overview.md для каждой категории
5. **Обновление README** - новая навигация по проекту
6. **Проверка ссылок** - убедиться, что все ссылки работают

---

**Готовы начать реструктуризацию?** 🎯

Я могу:
1. Сразу начать создавать структуру и переносить контент
2. Сначала доработать план по вашим комментариям
3. Показать пример одной роли/инструмента в новой структуре для утверждения

Какой вариант предпочтете?

