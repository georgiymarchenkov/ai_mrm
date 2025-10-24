------


# AI Assistant для Project Manager

→ [Roles](../_README.md) | [Description](./Role_Description.md) | [Functions](./Functions.md)


## 🤖 PM AI Assistant - Ваш второй мозг

**Назначение:** Автоматизация рутинных задач PM и помощь в принятии решений

**Экономия времени:** 120 часов/месяц  
**ROI:** 800%+  
**Capacity увеличение:** +150-200%

---

## 🎯 Ключевые возможности

### 1. АВТОМАТИЧЕСКАЯ ГЕНЕРАЦИЯ ОТЧЕТОВ

#### Status Reports (Еженедельные)
**Было:** 3-4 часа вручную  
**Стало:** 10-15 минут с AI

**Процесс:**
```
1. AI собирает данные из всех источников
   - Jira/Asana (статусы задач)
   - Google Sheets (бюджеты)
   - Рекламные кабинеты (performance)
   - Communication channels (updates)

2. AI анализирует прогресс
   - Сравнение план vs факт
   - Выявление delays и blockers
   - Trend analysis
   - Risk identification

3. AI генерирует отчет
   - Executive summary
   - Key achievements
   - Issues and risks
   - Next week plans
   - Budget status
   - Visual dashboards

4. PM review и отправка (10 минут)
```

**Пример промпта:**
```
"Generate weekly status report for Project X:
- Period: Oct 16-22, 2025
- Include: progress, achievements, risks, next steps
- Format: Executive summary + detailed sections
- Tone: Professional, data-driven
- Audience: Client stakeholders"
```

**Результат:**
- ✅ Экономия: 2.5-3 часа на отчет
- ✅ Качество: Consistent, data-driven
- ✅ Частота: Можно делать чаще (daily если нужно)

---

### 2. PREDICTIVE ANALYTICS

#### Предсказание рисков срыва дедлайнов

**Как работает:**
```python
# AI анализирует исторические данные + текущий статус

factors = {
    "velocity": team_velocity / planned_velocity,  # 0.85 = риск
    "dependencies": blocked_tasks_count,           # >3 = риск
    "resource_availability": team_capacity,        # <80% = риск
    "complexity": task_complexity_score,           # >7/10 = риск
    "history": similar_projects_delays             # паттерны
}

risk_score = AI_model.predict(factors)

if risk_score > 0.7:
    alert = {
        "severity": "HIGH",
        "task": "Feature X development",
        "probability": "85% риск срыва",
        "impact": "Сдвиг запуска на 1-2 недели",
        "recommendations": [
            "Добавить ресурсы (1 developer на 2 недели)",
            "Пересмотреть scope (упростить функционал)",
            "Escalate клиенту для переноса дедлайна"
        ]
    }
```

**Алерты:**
- 🔴 Критический риск (>80%) - уведомление сразу
- 🟡 Средний риск (50-80%) - daily digest
- 🟢 Низкий риск (<50%) - weekly summary

**Экономия времени:** 5-8 часов/неделю на раннее выявление проблем

---

### 3. SMART TASK PRIORITIZATION

#### Автоматическая приоритизация задач

**Критерии AI:**
```yaml
Priority Score = 
  + Client Impact (1-10)
  + Urgency (deadline proximity)
  + Dependencies (сколько задач блокирует)
  + Resource Availability
  + Risk Level
  + Strategic Importance
```

**Пример:**
```
Задача A: "Запуск VK кампании"
  Client Impact: 9/10 (критично для KPI)
  Urgency: 8/10 (дедлайн через 2 дня)
  Dependencies: 5 задач блокирует
  Resource: Specialist доступен
  Risk: Низкий
  → PRIORITY: P0 (Критично, делать сейчас!)

Задача B: "Оптимизация старой кампании"
  Client Impact: 5/10
  Urgency: 3/10 (можно отложить)
  Dependencies: 0
  Resource: Specialist занят
  Risk: Средний
  → PRIORITY: P2 (Можно на следующую неделю)
```

**Результат:**
- ✅ Правильные приоритеты (не пропускаем важное)
- ✅ Оптимальное использование ресурсов
- ✅ Меньше stress для команды

---

### 4. AUTOMATED MEETING SUMMARIES

#### Post-meeting processing

**Процесс:**
```
1. Meeting recording (Zoom, Google Meet)
2. AI transcription (речь в текст)
3. AI анализ:
   - Ключевые решения
   - Action items с owners
   - Вопросы без ответов
   - Risks mentioned
   - Next steps

4. Генерация:
   - Meeting minutes
   - Task creation в Jira
   - Follow-up reminders
```

**Пример:**
```
Input: 1-часовой митинг с клиентом

Output (через 5 минут):

MEETING SUMMARY
Client: ABC Corp
Date: Oct 23, 2025
Attendees: PM, Client CEO, Marketing Director

KEY DECISIONS:
1. ✅ Approve media plan v2 with adjustments
2. ✅ Increase budget by 20% for Q4
3. ✅ Add TikTok to channel mix

ACTION ITEMS:
- [PM] Update media plan - Due: Oct 25
- [Specialist] Prepare TikTok setup - Due: Oct 27
- [Account] Send revised contract - Due: Oct 24

OPEN QUESTIONS:
- Creative guidelines for TikTok?
- Target CPA for new channels?

NEXT MEETING: Oct 30, 2025
```

**Экономия времени:** 1-2 часа/встречу на написание notes + создание задач

---

### 5. BUDGET FORECASTING

#### Прогнозирование бюджета

**AI модель учитывает:**
```python
forecast = {
    "spent_to_date": actual_spend,
    "burn_rate": daily_average_spend,
    "remaining_days": days_to_end,
    "planned_activities": upcoming_campaigns,
    "seasonality": historical_patterns,
    "risks": potential_overruns
}

prediction = {
    "forecast_total": 1250000,  # руб
    "budget_allocated": 1000000,
    "variance": +250000,  # Overrun!
    "confidence": 85%,
    "recommendation": "Need additional 250k or reduce scope"
}
```

**Алерты:**
- 🔴 Прогноз overrun >10% - уведомление PM и finance
- 🟡 Прогноз overrun 5-10% - warning
- 🟢 В рамках бюджета - no action

**Экономия:** Раннее выявление перерасходов → возможность скорректировать

---

### 6. DECISION SUPPORT

#### Помощь в принятии решений

**Сценарии:**

#### Сценарий 1: Запрос на изменение scope
```
Клиент просит: Добавить YouTube в медиаплан

AI анализ:
Вход:
  - Текущий scope
  - Доступный бюджет
  - Команда и их загрузка
  - Timeline

Выход:
Impact Analysis:
  + Timeline: +1-2 недели (настройка, креативы)
  + Budget: +150k руб (производство + media)
  + Resources: Нужен specialist (2 дня) + designer (3 дня)
  + Risks: Может повлиять на запуск основных каналов

Recommendations:
  Option A: Accept - но сдвинуть дедлайн на 2 недели
  Option B: Accept - но убрать Telegram (swap)
  Option C: Decline - focus on core channels

AI Recommendation: Option B (swap)
Reasoning: Сохраняет timeline, similar audience reach
```

**Экономия времени:** 1-2 часа на анализ каждого change request

---

### 7. AUTOMATED REMINDERS & NUDGES

#### Умные напоминания

**AI знает:**
- Кто что должен сделать и когда
- Кто обычно опаздывает
- Какие задачи критичны
- Какое время лучше напомнить

**Примеры:**
```
🔴 URGENT: @Specialist - Deadline для настройки VK через 2 часа!
   Task: Setup VK campaign for Client X
   Status: In Progress (85% done)
   Action: Final review and launch needed

🟡 REMINDER: @Designer - Креативы для approval завтра
   Task: Design banner set for Programmatic
   Status: Not Started
   Suggestion: Start today to avoid rush tomorrow

🟢 FYI: @Analyst - Weekly report due in 2 days
   Task: Q4 Performance Report
   Status: 60% done
   Note: On track, no action needed
```

**Результат:**
- ✅ Меньше пропущенных дедлайнов
- ✅ Команда в курсе приоритетов
- ✅ PM не нужно manually следить за всем

---

### 8. TEAM WORKLOAD OPTIMIZATION

#### Балансировка загрузки команды

**AI мониторит:**
```yaml
Team Member: Specialist A
Current Load:
  - Active tasks: 8
  - Hours this week: 42 (overloaded!)
  - Capacity: 40 hours
  - Upcoming: 3 new tasks next week

AI Action:
  ⚠️ Alert to PM: "Specialist A overloaded"
  
  Recommendations:
    1. Reassign task X to Specialist B (has capacity)
    2. Delay non-critical task Y by 1 week
    3. Consider adding temp resource
    
  Auto-action (if PM approves):
    - Reassign task X
    - Update timeline
    - Notify team
```

**Экономия:** Предотвращение burnout → меньше delays и ошибок

---

### 9. CLIENT COMMUNICATION HELPER

#### Помощь в коммуникации с клиентом

**Функции:**

#### Генерация ответов на сложные вопросы
```
Client Question:
"Почему CPA вырос на 15% в последнюю неделю?"

AI Analysis:
- Анализ данных кампаний
- Сравнение с прошлыми периодами
- Выявление причин
- Подготовка recommendations

AI Generated Response:
"Добрый день!

Рост CPA на 15% связан с несколькими факторами:

1. Сезонность: Конкуренция в октябре выросла на 20%
   (Halloween campaigns)
   
2. Исчерпание "горячей" аудитории: После 3 недель 
   перешли к похожим аудиториям (CPL выше)
   
3. Внешний фактор: VK повысил минимальные ставки на 10%

Рекомендации для снижения CPA:
✅ Обновить креативы (текущие 'выгорели')
✅ Протестировать новые аудитории (lookalike 5-10%)
✅ Перераспределить 20% бюджета в Telegram (CPA ниже)

Прогноз: С этими изменениями CPA вернется к норме 
через 5-7 дней.

Готов обсудить детали. Встреча?"
```

**Экономия времени:** 30-60 минут на подготовку ответа

---

### 10. RETROSPECTIVE INSIGHTS

#### AI анализ ретроспектив

**После завершения проекта:**
```python
AI анализирует:
  - Что работало хорошо?
  - Что можно улучшить?
  - Какие были bottlenecks?
  - Где потеряли время?
  - Lessons learned

Генерирует:
  - Structured retrospective report
  - Actionable recommendations
  - Templates for future projects
  - Process improvements

Сохраняет в knowledge base для других PM
```

**Результат:** Continuous improvement, лучше с каждым проектом

---

## 📊 ROI AI Assistant для PM

### Инвестиции:
```yaml
Стоимость AI Assistant: 12k руб/месяц (включено в PM лицензию)
Время на setup: 2-3 часа (one-time)
Обучение: 4-5 часов (one-time)
```

### Возврат:
```yaml
Экономия времени:
  - Отчетность: 16 часов/месяц
  - Координация: 20 часов/месяц
  - Analysis & decision making: 16 часов/месяц
  - Admin tasks: 32 часов/месяц
  - Meetings processing: 16 часов/месяц
  
  ИТОГО: 100-120 часов/месяц

Денежный эквивалент:
  120 часов × 2500 руб/час = 300k руб/месяц

ROI = (300k - 12k) / 12k = 2400% (!!)

Payback period: < 1 день
```

### Качественные улучшения:
- ✅ Меньше ошибок (автоматизация)
- ✅ Быстрее принятие решений (data-driven)
- ✅ Лучше клиентский опыт (faster response)
- ✅ Меньше stress для PM
- ✅ Capacity +150% (можем вести больше проектов)

---

## 🎯 Начало работы с AI Assistant

### Шаг 1: Onboarding (2-3 часа)
1. Подключение к MRM платформе
2. Интеграция инструментов (Jira, Slack, etc.)
3. Настройка уведомлений
4. Загрузка проектных данных

### Шаг 2: Обучение (4-5 часов)
1. Просмотр tutorials
2. Практика на тестовом проекте
3. Изучение промптов
4. Q&A session

### Шаг 3: Pilot (1 проект, 2-4 недели)
1. Использование на одном проекте
2. Feedback и корректировки
3. Оптимизация workflow

### Шаг 4: Rollout (все проекты)
1. Применение на всех проектах
2. Делимся best practices с командой
3. Continuous improvement

---

## 💡 Best Practices

### DO:
- ✅ Начните с простого (автоотчеты)
- ✅ Review AI outputs перед отправкой клиенту
- ✅ Давайте feedback AI (улучшает со временем)
- ✅ Используйте templates для повторяющихся задач
- ✅ Доверяйте, но проверяйте

### DON'T:
- ❌ Не отправляйте AI outputs без review
- ❌ Не игнорируйте AI recommendations (они data-driven)
- ❌ Не пытайтесь использовать сразу все функции
- ❌ Не забывайте обучать AI на своих проектах

---

## 🔗 Связанные документы

- [Role_Description.md](./Role_Description.md) - Роль PM
- [Functions.md](./Functions.md) - Что делает PM
- [Pain_Points.md](./Pain_Points.md) - Проблемы которые решает AI
- [Tools_Access.md](./Tools_Access.md) - Интеграции AI
- [06_AI_ASSISTANTS/PM_Assistant/](../../06_AI_ASSISTANTS/PM_Assistant/) - Детальная документация

---

**Версия:** 1.0 | **Дата:** 2025-10-23 | **Статус:** ✅ Завершено

