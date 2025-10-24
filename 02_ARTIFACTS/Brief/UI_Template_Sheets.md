---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: artifact_doc
title: Brief - Google Sheets Template
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: 02_ARTIFACTS/Brief/UI_Template_Sheets.md
effective_date: 2025-10-24
visibility: internal
security_level: medium
tags: [artifact, brief]
---

# Brief - Google Sheets Template

→ [Overview](./Overview.md) | [Data Structure](./Data_Structure.md) | [Web UI](./UI_Template_Web.md) | [Validation](./Validation_Rules.md) | [Examples](./Examples.md)

---

## 🎯 НАЗНАЧЕНИЕ

Google Sheets шаблон для быстрого заполнения брифа в знакомом интерфейсе.

---

## 📊 СТРУКТУРА SHEETS

### Лист 1: COMPANY

| A | B | C |
|---|---|---|
| **Название поля** | **Значение** | **Комментарий** |
| Компания | ООО "СтройГрупп" | Полное название |
| Индустрия | Недвижимость | Выбор из списка |
| Сайт | https://stroygroupp.ru | URL |
| Позиционирование | Премиум-жилье в центре | Кратко |

---

### Лист 2: PRODUCTS

| A | B | C | D | E | F |
|---|---|---|---|---|---|
| **ID** | **Название** | **Тип** | **Город** | **Цена от** | **Цена до** |
| PROD-001 | ЖК Солнечный | Квартиры | Москва | 8 000 000 | 18 000 000 |
| PROD-002 | ЖК Морской | Квартиры | СПб | 6 000 000 | 11 000 000 |

---

### Лист 3: TARGET_AUDIENCE

| A | B | C | D | E |
|---|---|---|---|---|
| **Segment** | **Возраст от** | **Возраст до** | **Доход/мес** | **Интересы** |
| Семьи | 35 | 55 | 200 000+ | Недвижимость, комфорт |

---

### Лист 4: GOALS_KPIS

| A | B | C |
|---|---|---|
| **Цель** | **Значение** | **Срок** |
| Продажи квартир | 120 шт | Q4 2025 |
| Лиды | 9000 шт | 3 месяца |
| Целевой CPL | 1667 ₽ | - |

---

### Лист 5: BUDGET

| A | B | C |
|---|---|---|
| **Параметр** | **Значение** | **% от total** |
| **Total бюджет** | **15 000 000** | **100%** |
| По месяцам: | | |
| Октябрь | 4 000 000 | 27% |
| Ноябрь | 5 000 000 | 33% |
| Декабрь | 6 000 000 | 40% |
| По городам: | | |
| Москва | 8 000 000 | 53% |
| СПб | 4 000 000 | 27% |
| Казань | 3 000 000 | 20% |

---

### Лист 6: CHANNELS

| A | B | C | D |
|---|---|---|---|
| **Канал** | **Бюджет** | **Expected Leads** | **Target CPL** |
| Яндекс Директ | 3 000 000 | 2500 | 1200 |
| VK Реклама | 3 000 000 | 2500 | 1200 |
| Programmatic | 3 500 000 | 1500 | 2333 |
| SMM | 2 000 000 | 800 | 2500 |
| Другие | 3 500 000 | 1700 | 2059 |

---

### Лист 7: CREATIVE

| A | B |
|---|---|
| **Параметр** | **Значение** |
| Brand guidelines | Да, прикреплены |
| Цвета | #FF6B00, #FFFFFF |
| Шрифты | Montserrat, Open Sans |
| Tone of voice | Confident, premium, warm |
| Ограничения | ФЗ-214 обязательно |

---

### Лист 8: ANALYTICS

| A | B | C |
|---|---|---|
| **Система** | **ID/Параметр** | **Доступ** |
| Yandex Metrica | 12345678 (solnechniy-msk.ru) | Запрошен |
| Yandex Metrica | 23456789 (morskoy-spb.ru) | Запрошен |
| Google Analytics | G-XXXXXXX | Запрошен |
| CRM | Bitrix24, API доступен | Есть |

---

## 🎨 ФОРМАТИРОВАНИЕ

### Цветовая схема:
- **Заголовки:** Темно-серый фон, белый текст
- **Обязательные поля:** Светло-желтый фон
- **Заполненные:** Белый фон
- **Незаполненные:** Светло-красный фон

### Validation (Data Validation):
- **Индустрия:** Dropdown (Real Estate, Retail, E-commerce, etc.)
- **Тип продукта:** Dropdown (Квартиры, Дома, Коммерция, etc.)
- **Города:** Dropdown (Москва, СПб, Казань, etc.)
- **Бюджет:** Number format (0 000 000 ₽)

---

## 📝 ФОРМУЛЫ

### Автоматические расчеты:

**Лист BUDGET:**
```
C2: =B2/$B$2 (% от total)
```

**Лист CHANNELS:**
```
C2: =B2/D2 (Expected leads = Budget / CPL)
```

**Лист SUMMARY (авто-генерация):**
```
Total Budget: =BUDGET!B2
Total Leads: =SUM(CHANNELS!C:C)
Avg CPL: =BUDGET!B2/SUM(CHANNELS!C:C)
```

---

## 🔗 ИНТЕГРАЦИЯ

### Export to JSON:
```javascript
// Google Apps Script
function exportToJSON() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const brief = {
    company: getSheetData('COMPANY'),
    products: getSheetData('PRODUCTS'),
    target_audience: getSheetData('TARGET_AUDIENCE'),
    // ...
  };
  return JSON.stringify(brief);
}
```

### Import from MRM:
```javascript
function importFromMRM(briefData) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  fillSheet('COMPANY', briefData.company);
  fillSheet('PRODUCTS', briefData.products);
  // ...
}
```

---

## 📥 ШАБЛОН

**Ссылка на template:** `https://docs.google.com/spreadsheets/d/TEMPLATE_ID/copy`

**Инструкция:**
1. File → Make a copy
2. Rename: "Brief - {Client Name}"
3. Заполнить листы (желтые поля обязательно)
4. Проверить completeness (>95%)
5. Share с командой
6. Export → MRM Platform

---

**Версия:** 2.1 | **Строк:** 148 | **Статус:** ✅


