---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: artifact_doc
title: Project Passport - Паспорт проекта
language: ru
industry: advertising
role_apply: [pm, account_manager]
period: 2025-10
version: "1.0"
source_path: 02_ARTIFACTS/Project_Passport/Overview.md
effective_date: 2025-10-24
visibility: internal
security_level: high
tags: [artifact, project, passport, metadata]
---

# Project Passport - Паспорт проекта

→ [Artifacts](../_README.md)

---

## 🎯 Назначение

**Project Passport** - центральный документ с ключевой информацией о проекте.

**Содержит:**
- Метаданные проекта (ID, название, клиент)
- Команда и роли
- Сроки и бюджет
- Контакты
- История изменений

---

## 📋 Структура

### 1. Основная информация

```yaml
Project_ID: PRJ_2025_001
Project_Name: "Осенняя кампания 2025 - Банк XYZ"
Client: Банк XYZ
Client_ID: CLIENT_123

Status: Active
Start_Date: 2025-10-01
End_Date: 2025-12-31
Duration: 3 месяца

Total_Budget: 10,000,000 ₽
Currency: RUB
```

### 2. Команда

```yaml
Team:
  PM:
    Name: Иванов Иван
    Email: ivanov@agency.ru
    Phone: +7-999-123-4567
  
  Account:
    Name: Петрова Мария
    Email: petrova@agency.ru
  
  Specialist:
    Name: Сидоров Петр
    Email: sidorov@agency.ru
  
  Client_Contact:
    Name: Козлов Алексей
    Role: Marketing Director
    Email: kozlov@bankxyz.ru
    Phone: +7-999-765-4321
```

### 3. Ключевые даты (Milestones)

```yaml
Milestones:
  - Date: 2025-10-15
    Event: Kickoff Meeting
    Status: Done
  
  - Date: 2025-10-25
    Event: Strategy Approval
    Status: Done
  
  - Date: 2025-11-01
    Event: Campaign Launch
    Status: Planned
  
  - Date: 2025-12-31
    Event: Campaign End + Final Report
    Status: Planned
```

### 4. Документы и артефакты

```yaml
Documents:
  - Brief: /artifacts/brief_prj001.xlsx
  - Strategy: /artifacts/strategy_prj001.pdf
  - Media_Plan: /artifacts/mediaplan_prj001.xlsx
  - Reports: /artifacts/reports/prj001/
```

### 5. Каналы и площадки

```yaml
Channels:
  - Yandex Direct: Budget 4M₽ (40%)
  - VK Ads: Budget 3M₽ (30%)
  - Programmatic: Budget 2M₽ (20%)
  - Google Ads: Budget 1M₽ (10%)
```

---

## 🔗 Связь с процессами

**Создается:** В процессе [01_Briefing](../../05_PROCESSES/01_Briefing/)  
**Обновляется:** На каждом этапе проекта  
**Используется:** Всеми ролями для быстрого доступа к info

---

## 👥 Доступ

**Owner:** PM  
**Edit:** PM, Account  
**View:** Вся команда + Client

---

## 📊 Интеграции

**Bitrix24 CRM:**
- Автосоздание Project Passport при создании Deal
- Синхронизация контактов и сроков
- Автоматическое обновление статусов

**MRM Platform:**
- Центральный hub для всех артефактов проекта
- Dashboard с key metrics
- Timeline визуализация

---

## ✅ Чек-лист заполнения

```markdown
- [ ] Project ID присвоен
- [ ] Клиент и контакты заполнены
- [ ] Команда назначена
- [ ] Бюджет утвержден
- [ ] Milestones определены
- [ ] Каналы выбраны
- [ ] Все документы прилинкованы
```

---

**Версия:** 1.0  
**Статус:** ✅ Defined

