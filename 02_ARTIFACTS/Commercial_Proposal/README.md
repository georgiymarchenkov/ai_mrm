---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: artifact_doc
title: Commercial_Proposal - Коммерческое предложение
language: ru
industry: advertising
role_apply: [pm, account_manager, client]
period: 2025-10
version: "1.0"
source_path: 02_ARTIFACTS/Commercial_Proposal/README.md
effective_date: 2025-10-24
visibility: internal
security_level: high
tags: [commercial_proposal, artifact, mvp]
---

# 💼 Commercial_Proposal - Коммерческое предложение

> **Оценка стоимости проекта:** Услуги, бюджет breakdown, условия оплаты

---

## 🎯 Назначение

Коммерческое предложение — это официальный документ с оценкой стоимости проекта, описанием услуг, бюджетным breakdown и условиями сотрудничества.

**Ключевые функции:**
- 💰 Budget breakdown (media + production + agency fee)
- 📋 Services list & descriptions
- 📅 Timeline estimate
- 💳 Payment terms & schedule
- ✅ SLA & guarantees

---

## 📁 Содержимое

| Файл | Описание | Статус |
|------|----------|--------|
| `Data_Structure.md` | JSON Schema КП | ⏳ TODO |
| `Template_PDF.md` | PDF шаблон для клиента | ⏳ TODO |
| `Calculation_Rules.md` | Правила расчета стоимости | ⏳ TODO |
| `Examples.md` | Примеры КП | ⏳ TODO |

**Готовность:** 10% 📝

---

## 🚀 Быстрый старт

### Создание КП
1. PM + Account Manager получают Brief и Media_Plan
2. AI рассчитывает базовую стоимость
3. Добавляются production costs
4. Рассчитывается agency fee
5. Формируется PDF для клиента

**Структура КП:**
- Executive Summary
- Services Description
- Budget Breakdown (таблица)
- Timeline & Milestones
- Payment Terms
- SLA & Guarantees
- Appendices (team, case studies)

---

## 🤖 AI Расчет

### Автоматически рассчитывается
- ✅ Media costs из Media_Plan
- ✅ Production estimates на основе требований
- ✅ Agency fee (% от media или fixed)
- ✅ Benchmark цены из индустрии

**Экономия времени:** 6-8 часов → 1-2 часа (80%)

---

## 🔗 Связанные документы

### Создается из
- [`Brief`](../Brief/) - Требования
- [`Media_Plan`](../Media_Plan/) - Media costs
- [`Strategy_Document`](../Strategy_Document/) - Scope of work

### Порождает
- [`Project_Passport`](../Project_Passport/) - Утвержденный бюджет

---

## 👥 RACI

| Действие | PM | Account Mgr | Client | Finance |
|----------|-----|-------------|--------|---------|
| **Расчет** | R | R | I | C |
| **Подготовка** | R | R | I | I |
| **Презентация** | C | R | A | I |
| **Утверждение** | I | R | A | I |

---

**Версия:** 1.0  
**Готовность:** 10%  
**Приоритет:** 🔴 P0 MVP

