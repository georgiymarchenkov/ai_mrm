---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: role_doc
title: Account Manager - Артефакты
language: ru
industry: advertising
role_apply: [account_manager]
period: 2025-10
version: "1.0"
source_path: 01_ROLES/Account_Manager/Artifacts.md
effective_date: 2025-10-24
visibility: internal
security_level: low
tags: [role, account_manager, artifacts]
---

# Account Manager - Артефакты

→ [Описание роли](./Role_Description.md) | [Функции](./Functions.md)

---

## 📋 АРТЕФАКТЫ С КОТОРЫМИ РАБОТАЕТ ACCOUNT

---

## ВХОДЯЩИЕ (от клиента)

### 1. [Brief](../../02_ARTIFACTS/Brief/)
**От:** Client  
**Действия Account:**
- ✅ Помогает клиенту заполнить
- ✅ Проверяет completeness
- ✅ Уточняет unclear моменты
- ✅ Передает команде

**Важность:** 🔴 Critical - основа проекта

---

## СОЗДАВАЕМЫЕ ACCOUNT

### 2. [Commercial_Proposal](../../02_ARTIFACTS/Commercial_Proposal/)
**Назначение:** Оценка стоимости услуг

**Account делает:**
- ✅ Разработка scope
- ✅ Расчет стоимости (с AI)
- ✅ Оформление КП
- ✅ Презентация клиенту
- ✅ Переговоры

**Частота:** 4-6 КП в месяц  
**Время:** 1ч с AI (было 6-10ч)

→ См. [Commercial_Proposal/](../../02_ARTIFACTS/Commercial_Proposal/)

---

### 3. [Campaign_Report](../../02_ARTIFACTS/Campaign_Report/)
**Назначение:** Отчеты клиенту

**Account делает:**
- ✅ Сбор данных (AI автоматически)
- ✅ Анализ и insights (AI помогает)
- ✅ Оформление отчета
- ✅ Презентация клиенту

**Частота:**
- Weekly: 1 раз в неделю
- Monthly: 1 раз в месяц
- Final: В конце проекта

**Время:** 30мин с AI (было 3-6ч)

→ См. [Campaign_Report/](../../02_ARTIFACTS/Campaign_Report/)

---

### 4. [Communication](../../02_ARTIFACTS/Communication/)
**Назначение:** История общения с клиентом

**Account создает:**
- Meeting minutes
- Email threads
- Decisions log
- Approvals

**Важность:** 🟡 Medium - для transparency

---

## ИСПОЛЬЗУЕМЫЕ (от команды)

### 5. [Strategy_Document](../../02_ARTIFACTS/Strategy_Document/)
**От:** Strategist  
**Действия Account:**
- ✅ Review стратегии
- ✅ Презентация клиенту
- ✅ Сбор feedback
- ✅ Согласование

---

### 6. [Media_Plan](../../02_ARTIFACTS/Media_Plan/)
**От:** Specialist  
**Действия Account:**
- ✅ Review медиаплана
- ✅ Презентация клиенту
- ✅ Согласование бюджета
- ✅ Финальное approve

---

### 7. [Technical_Specification](../../02_ARTIFACTS/Technical_Specification/)
**От:** Specialist  
**Действия Account:**
- ✅ Review completeness
- ✅ Информирование клиента
- ✅ Approve для запуска

---

### 8. [Project_Passport](../../02_ARTIFACTS/Project_Passport/)
**От:** PM (автоматически)  
**Использование:**
- ✅ Мониторинг статуса
- ✅ Tracking бюджета
- ✅ Timeline контроль
- ✅ Быстрые ответы клиенту

**Важность:** 🔴 Critical - single source of truth

---

## 📊 МАТРИЦА ВЗАИМОДЕЙСТВИЯ

| Артефакт | Account роль | Частота | Время |
|----------|--------------|---------|-------|
| Brief | Помощь в заполнении | 1 раз/проект | 1-2ч |
| Commercial_Proposal | **Создает** | 4-6/месяц | 1ч (с AI) |
| Strategy_Document | Презентует | 1 раз/проект | 2-3ч |
| Media_Plan | Презентует + Approve | 1 раз/проект | 1-2ч |
| Technical_Specification | Review | 1 раз/канал | 30мин |
| Campaign_Report | **Создает** | Weekly/Monthly | 30мин (с AI) |
| Project_Passport | Использует | Ежедневно | 15мин |
| Communication | **Ведет** | Постоянно | - |

---

## 🤖 AI ПОМОЩЬ С АРТЕФАКТАМИ

### Автогенерация:
- ✅ **Commercial_Proposal** - 90% AI генерация
- ✅ **Campaign_Report** - 95% AI генерация
- ✅ Meeting minutes - 100% AI транскрипция

### Помощь в презентации:
- ✅ Slides generation
- ✅ Talking points
- ✅ FAQ preparation
- ✅ Objection handling

### Экономия:
- **КП:** 40ч/мес → 6ч/мес
- **Отчеты:** 20ч/мес → 2ч/мес
- **Презентации:** 12ч/мес → 3ч/мес

**ИТОГО:** 62ч/мес экономии = 155k ₽

---

## 🔗 Связанные документы

- [Role_Description.md](./Role_Description.md) - Роль
- [Functions.md](./Functions.md) - Функции
- [AI_Assistant.md](./AI_Assistant.md) - AI помощник
- [../../02_ARTIFACTS/](../../02_ARTIFACTS/) - Все артефакты
- [../../05_PROCESSES/](../../05_PROCESSES/) - Процессы работы с артефактами

---

**Версия:** 1.0 | **Дата:** 2025-10-23 | **Статус:** ✅ Готово

