---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: artifact_doc
title: 📋 02_ARTIFACTS - Руководство по работе
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: 02_ARTIFACTS/_README.md
effective_date: 2025-10-24
visibility: internal
security_level: medium
tags: [artifact, artifacts]
---

# 📋 02_ARTIFACTS - Руководство по работе

**Назначение:** Описание всех артефактов MRM системы - документов, данных и deliverables

---

## 📋 СОДЕРЖАНИЕ

### MVP Артефакты (8):
1. [Brief/](./Brief/) - Бриф от клиента
2. [Commercial_Proposal/](./Commercial_Proposal/) - Коммерческое предложение
3. [Strategy_Document/](./Strategy_Document/) - Стратегия кампании
4. [Media_Plan/](./Media_Plan/) - Медиаплан
5. [Technical_Specification/](./Technical_Specification/) - Техническое задание
6. [Campaign_Report/](./Campaign_Report/) - Отчет по кампании
7. [Project_Passport/](./Project_Passport/) - Паспорт проекта
8. [Communication/](./Communication/) - История коммуникации

### Post-MVP (4):
9. [Budget_Tracker/](./Budget_Tracker/) - Трекер бюджета
10. [Timeline/](./Timeline/) - График проекта
11. [Risk_Register/](./Risk_Register/) - Реестр рисков
12. [Lessons_Learned/](./Lessons_Learned/) - База знаний

### Специальные:
- [_Artifacts_Overview.md](./_Artifacts_Overview.md) - Обзор всех артефактов
- [_README.md](./_README.md) - Этот документ

---

## 🎯 НАЗНАЧЕНИЕ ПАПКИ

### Для кого:
- 👨‍💻 **Разработчики** - структура данных и API
- 🎨 **Дизайнеры** - UI/UX шаблоны
- 👥 **Пользователи** - понимание артефактов
- 📊 **Аналитики** - данные для анализа
- 🔧 **QA** - правила валидации

### Что описывает:
- Структура данных каждого артефакта
- UI шаблоны (Web + Google Sheets)
- Правила валидации
- Примеры заполнения
- API endpoints
- Связи между артефактами

---

## 📁 СТРУКТУРА АРТЕФАКТА

Каждый артефакт содержит **6 стандартных файлов:**

```
Artifact_Name/
├── Data_Structure.md          [150-200 строк]
│   ├── Назначение артефакта
│   ├── Основные поля (20-40)
│   ├── Типы данных
│   ├── Обязательность
│   ├── Связи с другими артефактами
│   └── JSON Schema
│
├── UI_Template_Web.md         [200-250 строк]
│   ├── Макет интерфейса
│   ├── Секции и группы полей
│   ├── UX patterns
│   ├── Валидация в реальном времени
│   ├── Прогресс-бары
│   └── Responsive design
│
├── UI_Template_Sheets.md      [150-200 строк]
│   ├── Структура Google Sheets
│   ├── Вкладки и таблицы
│   ├── Формулы и расчеты
│   ├── Условное форматирование
│   ├── Data validation
│   └── Защита ячеек
│
├── Validation_Rules.md        [180-220 строк]
│   ├── Правила валидации полей
│   ├── Required/Optional
│   ├── Форматы (email, phone, URL)
│   ├── Диапазоны (min/max)
│   ├── Dependencies (если A, то B)
│   ├── Business rules
│   └── Error messages
│
├── Examples.md                [150-180 строк]
│   ├── 2-3 полных примера
│   ├── Разные сценарии
│   ├── Good vs Bad примеры
│   ├── Edge cases
│   └── Комментарии
│
└── API_Endpoints.md           [120-150 строк]
    ├── REST API endpoints
    ├── Request/Response примеры
    ├── Status codes
    ├── Rate limits
    ├── Authentication
    └── Webhooks (если есть)
```

**ИТОГО:** ~950-1200 строк на артефакт

---

## 🔧 КАК РАБОТАТЬ С АРТЕФАКТАМИ

### 1. ИЗУЧЕНИЕ АРТЕФАКТА

**Последовательность:**
```
1. Data_Structure.md      [10 мин] - Что это и какие поля
2. Examples.md            [10 мин] - Как выглядит заполненным
3. Validation_Rules.md    [10 мин] - Правила заполнения
4. UI_Template_Web.md     [15 мин] - Веб-интерфейс
5. UI_Template_Sheets.md  [10 мин] - Google Sheets версия
6. API_Endpoints.md       [10 мин] - API для разработки
```

**ИТОГО:** ~65 минут на артефакт

---

### 2. СОЗДАНИЕ НОВОГО АРТЕФАКТА

**Чек-лист:**
```
☐ 1. Определить назначение
   ☐ - Какую проблему решает?
   ☐ - Кто создает? Кто использует?
   ☐ - Как часто обновляется?
   
☐ 2. Создать Data_Structure.md
   ☐ - Название и описание
   ☐ - 20-40 основных полей
   ☐ - Типы данных (string, number, date, etc.)
   ☐ - Required/Optional
   ☐ - Связи с другими артефактами
   ☐ - JSON Schema
   
☐ 3. Создать Validation_Rules.md
   ☐ - Правила для каждого поля
   ☐ - Business logic
   ☐ - Error messages (RU/EN)
   ☐ - Warning messages
   
☐ 4. Создать Examples.md
   ☐ - Минимум 2 полных примера
   ☐ - Разные сценарии использования
   ☐ - Edge cases
   
☐ 5. Создать UI_Template_Web.md
   ☐ - Layout структура
   ☐ - Группировка полей
   ☐ - UX patterns
   ☐ - Responsive design
   
☐ 6. Создать UI_Template_Sheets.md
   ☐ - Структура вкладок
   ☐ - Таблицы и формулы
   ☐ - Форматирование
   
☐ 7. Создать API_Endpoints.md
   ☐ - CRUD endpoints
   ☐ - Request/Response schemas
   ☐ - Error handling
   
☐ 8. Добавить перелинковки
   ☐ - На роли (кто работает)
   ☐ - На процессы (где используется)
   ☐ - На другие артефакты (связи)
   
☐ 9. Обновить _Artifacts_Overview.md
☐ 10. Проверка качества
```

---

## ✅ ЧЕК-ЛИСТ КАЧЕСТВА

### Контент:
```
☐ Все 6 файлов созданы
☐ Data Structure полная (20-40 полей)
☐ Validation Rules детальные
☐ Минимум 2 Examples
☐ UI Templates детальные
☐ API документация полная
☐ Перелинковки добавлены
```

### Данные:
```
☐ Типы данных указаны
☐ Required/Optional определены
☐ Форматы указаны (email, phone, etc.)
☐ Диапазоны указаны (min/max)
☐ Default values определены
☐ Связи с другими артефактами
```

### UI:
```
☐ Web UI: макет описан
☐ Sheets UI: структура описана
☐ Группировка полей логичная
☐ UX patterns применены
☐ Валидация в реальном времени
☐ Error messages понятные
```

### API:
```
☐ Все CRUD endpoints описаны
☐ Request schemas есть
☐ Response schemas есть
☐ Error codes описаны
☐ Authentication указана
☐ Rate limits определены
```

---

## 🔗 СВЯЗИ С ДРУГИМИ РАЗДЕЛАМИ

### Связи:
- **01_ROLES/** ↔ Кто работает с артефактами
- **05_PROCESSES/** → Где используются артефакты
- **06_AI_ASSISTANTS/** ← AI генерация артефактов
- **08_ARCHITECTURE/** ← Data models
- **09_DEVELOPMENT/** ← Реализация API

---

## 📊 МЕТРИКИ

### Текущее состояние:
- ✅ Brief: 3/6 файлов
- ⏳ Остальные: 0/6 файлов

### Цель MVP:
- 8 артефактов × 6 файлов = 48 файлов
- ~9,500 строк контента

---

## 💡 BEST PRACTICES

### DO ✅:
- Детализируй поля (тип, формат, пример)
- Указывай связи между артефактами
- Давай реальные примеры
- Продумай UX для заполнения
- Валидируй на фронте и бэке
- Версионируй артефакты
- Храни историю изменений

### DON'T ❌:
- Не создавай >40 полей в артефакте
- Не забывай про валидацию
- Не игнорируй связи
- Не делай сложные UI
- Не забывай про API
- Не дублируй данные

---

## 🚀 БЫСТРЫЙ СТАРТ

### Developer:
```
1. Data_Structure.md → понять структуру
2. API_Endpoints.md → реализовать API
3. Validation_Rules.md → добавить валидацию
```

### Designer:
```
1. UI_Template_Web.md → дизайн интерфейса
2. Examples.md → понять контент
3. Validation_Rules.md → UX для ошибок
```

### QA:
```
1. Validation_Rules.md → тест-кейсы
2. Examples.md → тестовые данные
3. API_Endpoints.md → API тестирование
```

---

**Версия:** 1.0  
**Дата:** 2025-10-23  
**Статус:** ✅ Актуально

→ [Вернуться к главному README](../README.md)  
→ [Обзор артефактов](./_Artifacts_Overview.md)


