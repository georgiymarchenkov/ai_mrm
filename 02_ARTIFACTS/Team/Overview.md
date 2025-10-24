---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: artifact_doc
title: Team - Команда проекта
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: 02_ARTIFACTS/Team/Overview.md
effective_date: 2025-10-24
visibility: internal
security_level: medium
tags: [artifact, team, hr, resources]
---

# Team - Команда проекта

→ [Artifacts](../_README.md)

---

## 🎯 Назначение

**Team** - структура команды проекта с ролями, контактами и загрузкой.

**Содержит:**
- Состав команды (Team Members)
- Роли и обязанности
- Контактные данные
- Загрузка (Capacity Planning)
- История изменений команды

---

## 📋 Структура Team

### Team Member Card

```yaml
Member_ID: TM_001
Name: Иванов Иван Иванович
Role: Project Manager
Level: Senior

Contact:
  Email: ivanov@agency.ru
  Phone: +7-999-123-4567
  Telegram: @ivanov_pm
  Available: Mon-Fri 9-18 (GMT+3)

Skills:
  - Project Management (Expert)
  - Agile/Scrum (Advanced)
  - Bitrix24 (Advanced)
  - Jira (Intermediate)

Current_Projects:
  - Project_A: 50% (20h/week)
  - Project_B: 30% (12h/week)
  - Available: 20% (8h/week)

Performance:
  Projects_Completed: 15
  Avg_Rating: 4.8/5
  On_Time_Rate: 95%
```

---

## 👥 Team Structure

### Core Team (Full-time на проекте)

```
Project Manager (PM)
├── Account Manager
├── Specialist (Media Buyer)
│   └── Junior Specialist (optional)
└── Strategist
```

### Support Team (Part-time/On-demand)

```
- Analyst (аналитика и отчеты)
- Creative (креативы и дизайн)
- Developer (лендинги и технические интеграции)
- Copywriter (тексты объявлений)
```

### External (Клиент)

```
- Client Contact (Marketing Director)
- Client Approver (CMO)
```

---

## 📊 Capacity Planning

### Weekly Capacity Matrix

| Role | Total h/week | Project A | Project B | Available |
|------|--------------|-----------|-----------|-----------|
| PM | 40h | 20h (50%) | 12h (30%) | 8h (20%) |
| Account | 40h | 30h (75%) | - | 10h (25%) |
| Specialist | 40h | 40h (100%) | - | - |
| Strategist | 40h | 10h (25%) | 15h (38%) | 15h (37%) |

**Utilization:**
- Target: 75-85% (оптимальная загрузка)
- Current: 68% (нормально)
- Overload: >90% (риск burnout)

---

## 🔄 Team Lifecycle

### Onboarding (Новый член команды)

```markdown
Day 1:
- [ ] Access к системам (Bitrix, Drive, Email)
- [ ] Intro call с PM и командой
- [ ] Review Project Passport

Week 1:
- [ ] Training по процессам
- [ ] Shadowing текущих задач
- [ ] First task (simple)

Month 1:
- [ ] Full involvement
- [ ] Feedback session с PM
```

### Offboarding (Уход из проекта)

```markdown
- [ ] Handover tasks → new owner
- [ ] Knowledge transfer (документация)
- [ ] Revoke access
- [ ] Retrospective feedback
```

---

## 🔗 Связанные артефакты

- [Project_Passport](../Project_Passport/) - метаданные команды
- [RIM](../RIM/) - матрица ответственности
- [Tasks](../Tasks/) - кто что делает
- [Roles](../../01_ROLES/) - описание ролей

---

## 📈 Team Metrics

### Performance Indicators

```yaml
Team_Size: 4 core + 3 support
Avg_Experience: 3.5 years
Retention_Rate: 85% (последний год)
Team_Velocity: 40 tasks/month
Quality_Score: 4.6/5 (client satisfaction)

Risks:
  - Specialist 100% loaded → no backup
  - Analyst part-time → может быть bottleneck
```

### Team Health

```
Engagement: 8.2/10
Work-Life Balance: 7.5/10
Communication: 9.0/10
Tools Satisfaction: 8.5/10
```

---

## 👥 Управление командой

**Managed by:** PM  
**HR Support:** HR Manager  
**Escalation:** Department Head

### Regular Meetings

- **Daily Standup:** 15min, 10:00 (Mon-Fri)
- **Weekly Sync:** 1h, Friday 16:00
- **Monthly Retro:** 2h, last Friday of month
- **1-on-1:** PM ↔ каждый member, bi-weekly

---

## 🎯 Best Practices

1. **Clear roles** - каждый знает свою зону ответственности
2. **Capacity planning** - не перегружать team members
3. **Knowledge sharing** - документировать все для новых членов
4. **Regular feedback** - 1-on-1 и retro для улучшений
5. **Team building** - раз в квартал team event

---

**Версия:** 1.0  
**Статус:** ✅ Defined

