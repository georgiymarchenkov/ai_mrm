---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: artifact_doc
title: Campaign_Report - Отчет по кампании
language: ru
industry: advertising
role_apply: [analyst, specialist, client]
period: 2025-10
version: "1.0"
source_path: 02_ARTIFACTS/Campaign_Report/README.md
effective_date: 2025-10-24
visibility: internal
security_level: medium
tags: [campaign_report, artifact, mvp, analytics]
---

# 📈 Campaign_Report - Отчет по кампании

> **Результаты и аналитика:** Performance metrics, инсайты, рекомендации

**Назначение:** Автоматизированный отчет с результатами кампании: метрики, план vs факт, channel comparison, AI инсайты и рекомендации.

**Готовность:** 20% ⏳ | **Приоритет:** 🔴 P0 MVP

---

## 📁 Содержимое

| Файл | Описание | Статус |
|------|----------|--------|
| [`Data_Structure.md`](./Data_Structure.md) | JSON Schema отчета | ✅ 100% |
| `Dashboard_UI.md` | Real-time Dashboard | ⏳ TODO |
| `AI_Insights.md` | AI анализ и рекомендации | ⏳ TODO |
| `Template_PPT.md` | PowerPoint для клиента | ⏳ TODO |

---

## 🤖 AI Возможности

### Автоматический сбор данных
- ✅ Все рекламные платформы (API)
- ✅ Аналитические системы (Метрика, GA4)
- ✅ CRM данные (конверсии, продажи)

### AI Insights
- ✅ Выявление аномалий
- ✅ Сравнение с бенчмарками
- ✅ Поиск возможностей оптимизации
- ✅ Прогнозирование результатов

**Экономия времени:** 12-20 часов → 1-2 часа (90% автоматизация)

---

## 🔗 Связанные

- [`Media_Plan`](../Media_Plan/) - План vs факт
- [`Brief`](../Brief/) - Цели vs результаты
- [Платформы](../../04_PLATFORMS/) - Источники данных

---

## 👥 RACI

| Действие | Analyst | Specialist | PM | Client |
|----------|---------|-----------|-----|--------|
| **Сбор данных** | R | C | I | I |
| **Анализ** | R | C | C | I |
| **Презентация** | C | C | R | A |

---

**Форматы:** Web Dashboard (real-time), Google Sheets, PDF/PPT для клиента

