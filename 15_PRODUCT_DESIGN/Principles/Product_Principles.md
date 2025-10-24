---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: overview
title: Product Principles - Принципы продукта
language: ru
industry: advertising
role_apply: [pm, product_manager]
period: 2025-10
version: "1.0"
source_path: 15_PRODUCT_DESIGN/Principles/Product_Principles.md
effective_date: 2025-10-24
visibility: internal
security_level: low
tags: [principles, product_design]
---

# Product Principles - Принципы продукта

→ [Product Design](../_README.md)

---

## 🎯 CORE PRODUCT PRINCIPLES

### 1. **AI-FIRST, NOT AI-ONLY**

**Принцип:** AI должен усиливать человека, а не заменять его полностью.

**Почему:**
- Рекламные проекты требуют expertise и контекста
- AI может ошибаться, особенно на креативных задачах
- Trust building: пользователи должны чувствовать контроль

**Как применяем:**
- AI генерирует → Человек проверяет и утверждает
- AI предлагает варианты → Человек выбирает лучший
- AI автоматизирует рутину → Человек фокусируется на стратегии
- Всегда показываем confidence score AI
- Всегда даём возможность edit/override

**Анти-паттерн:**
❌ AI сразу публикует кампанию без проверки  
❌ AI принимает финансовые решения автономно  
❌ Нельзя отключить AI suggestions

---

### 2. **REDUCE TIME, NOT QUALITY**

**Принцип:** Ускоряем процессы, но НЕ в ущерб качеству результата.

**Почему:**
- Быстрый плохой план хуже медленного хорошего
- Клиенты платят за результат, не за скорость
- Reputation agency зависит от качества

**Как применяем:**
- Brief: 2ч → 30мин, но все поля заполнены качественно
- Media Plan: 4ч → 1ч, но с бенчмарками и обоснованием
- Не экономим на validation и проверках
- Quality gates на каждом этапе процесса

**Метрики:**
- Time saved: ✅ измеряем
- Quality score: ✅ измеряем (AI acceptance rate >75%)
- Error rate: ✅ мониторим (<5% errors)

**Анти-паттерн:**
❌ Auto-approve без review  
❌ Skip validation для скорости  
❌ Жертвуем точностью ради быстроты

---

### 3. **DATA-INFORMED, NOT DATA-DICTATED**

**Принцип:** Используем данные для insights, но не игнорируем intuition и опыт.

**Почему:**
- Не все можно измерить (креатив, brand fit)
- Данные показывают прошлое, не будущее
- Human judgment важен в креативных решениях

**Как применяем:**
- Показываем бенчмарки, но не блокируем отклонения
- AI предлагает channel mix на основе данных, но PM может override
- Warning вместо error при отклонении от нормы
- Collect feedback для улучшения моделей

**Пример:**
```
AI: "Рекомендуем CPL 1500₽ (средний по рынку)"
PM: "Хочу CPL 1000₽" ← OK!
System: ⚠️ "На 33% ниже среднего. Уверены?" ← Предупреждаем, но разрешаем
```

**Анти-паттерн:**
❌ Блокировать действия, не соответствующие бенчмаркам  
❌ Игнорировать опыт пользователя

---

### 4. **PROGRESSIVE DISCLOSURE**

**Принцип:** Показываем сложность постепенно. Простое - на поверхности, детали - по запросу.

**Почему:**
- Медиапланирование - сложная область (100+ полей)
- Новички не должны пугаться
- Эксперты должны иметь доступ к деталям

**Как применяем:**
- Brief: Basic mode (20 полей) → Advanced mode (100+ полей)
- Media Plan: Summary view → Detailed view → Expert mode
- AI suggestions: Top 3 recommendations → See all 10 options
- Collapsed sections by default, expand on demand

**Уровни пользователей:**
1. **Новичок** (30 дней): Guided mode, подсказки, AI помощь
2. **Intermediate** (3-6 мес): Больше контроля, меньше подсказок
3. **Expert** (6+ мес): Полный контроль, shortcuts, bulk operations

**Анти-паттерн:**
❌ Показывать все 100 полей брифа сразу  
❌ Скрывать важные детали от экспертов  
❌ Одинаковый UI для новичков и экспертов

---

### 5. **COLLABORATIVE BY DEFAULT**

**Принцип:** Все артефакты - collaborative, с версионированием и правами доступа.

**Почему:**
- Рекламные проекты - это командная работа (PM, Specialist, Strategist, Client)
- Нужна прозрачность: кто что изменил и когда
- Конфликты при одновременном редактировании

**Как применяем:**
- Real-time collaboration (Google Docs style)
- Comments & mentions (@user)
- Version history (кто, что, когда изменил)
- Approval workflows (PM → Client)
- Notifications (Slack, Email, Telegram)
- Role-based permissions (RACI matrix)

**Функции:**
- See who's online and editing
- Lock sections during editing
- Conflict resolution (merge changes)
- Activity feed (changelog)

**Анти-паттерн:**
❌ Один человек редактирует, остальные ждут  
❌ Нет истории изменений  
❌ Нельзя оставить комментарий

---

### 6. **MOBILE-AWARE, NOT MOBILE-FIRST**

**Принцип:** Desktop - primary, mobile - для review и approvals.

**Почему:**
- Медиапланирование - это работа с таблицами, графиками, деталями
- Desktop лучше для сложных задач
- Mobile нужен для согласований, комментариев, notifications

**Как применяем:**
- Desktop: Full functionality (create, edit, analyze)
- Tablet: Mid functionality (review, light edits)
- Mobile: View, approve, comment, notifications

**Mobile use cases:**
- ✅ Посмотреть бриф перед встречей
- ✅ Одобрить медиаплан на ходу
- ✅ Оставить комментарий
- ✅ Получить alert о проблеме
- ❌ Создать медиаплан на 100 строк (делай на desktop!)

**Анти-паттерн:**
❌ Пытаться сделать full-featured mobile app  
❌ Игнорировать mobile полностью

---

### 7. **FAIL GRACEFULLY**

**Принцип:** Когда что-то ломается, система должна деградировать элегантно.

**Почему:**
- AI может быть недоступен (rate limits, outages)
- Интеграции падают (Yandex API down)
- Пользователь не должен блокироваться

**Как применяем:**
- AI недоступен → Fallback to templates
- Integration fail → Show cached data + warning
- Network issue → Offline mode (local storage)
- Always provide manual override

**Levels of degradation:**
1. **Optimal:** AI + Real-time data
2. **Degraded:** Templates + Cached data
3. **Manual:** User enters everything manually

**Примеры:**
```
AI Generator down:
  ✅ "AI временно недоступен. Используйте шаблон брифа."
  ❌ "Ошибка 500. Попробуйте позже." (бесполезно!)

Yandex API down:
  ✅ "Данные за вчера. Обновление через 2 часа."
  ❌ Белый экран (недопустимо!)
```

**Анти-паттерн:**
❌ Полная блокировка при сбое одного компонента  
❌ Cryptic error messages  
❌ Нет альтернативных путей

---

### 8. **METRICS-DRIVEN ITERATION**

**Принцип:** Каждая feature измеряется. Не работает → улучшаем или удаляем.

**Почему:**
- Product должен развиваться на основе данных
- Features без usage - это waste
- Continuous improvement culture

**Что измеряем:**
- **Adoption:** % users who tried feature
- **Retention:** % users who use it regularly
- **Time saved:** Before vs After
- **AI acceptance rate:** % of AI suggestions accepted
- **NPS:** User satisfaction
- **Churn rate:** Why users leave

**Cadence:**
- Weekly: Feature usage dashboard review
- Monthly: Deep dive в 1-2 features
- Quarterly: Product health metrics

**Decision framework:**
```
If adoption < 20% after 3 months:
  → Investigate why (talk to users)
  → Improve onboarding / UX
  → If still low → Consider deprecation

If AI acceptance < 70%:
  → Investigate prompts / context
  → Collect negative examples
  → Improve model
```

**Анти-паттерн:**
❌ Добавлять features без measurement plan  
❌ Держать zombie features (никто не использует)  
❌ Не спрашивать пользователей почему не используют

---

### 9. **OPINIONATED, NOT DICTATORIAL**

**Принцип:** Мы предлагаем best practices, но разрешаем отклонения.

**Почему:**
- Каждое агентство уникально
- Нет one-size-fits-all решения
- Flexibility важна для adoption

**Как применяем:**
- Recommended workflows (можно customize)
- Default templates (можно создать свои)
- Best practices guidance (можно игнорировать)
- "Opinionated defaults, flexible override"

**Примеры:**
- Default: RACI matrix как мы рекомендуем
- Override: Агентство может изменить роли
- Default: Channel mix по индустрии
- Override: PM может выбрать свой mix

**Баланс:**
```
Strong opinions:
  ✅ Brief должен содержать target audience
  ✅ Media Plan должен иметь бюджет
  ✅ Версионирование обязательно

Weak opinions (flexible):
  ⚠️ Структура брифа (customize)
  ⚠️ Naming conventions (agency choice)
  ⚠️ Workflow steps order (can reorder)
```

**Анти-паттерн:**
❌ "Только наш способ, никаких отклонений"  
❌ Полная анархия (нет guidance)

---

### 10. **ACCESSIBILITY IS NOT OPTIONAL**

**Принцип:** Продукт должен быть доступен для всех, включая людей с ограничениями.

**Почему:**
- Это правильно этически
- Расширяет аудиторию
- Улучшает UX для всех

**Стандарт:** WCAG 2.1 Level AA

**Требования:**
- ✅ Keyboard navigation (без мыши)
- ✅ Screen reader support
- ✅ Contrast ratios 4.5:1
- ✅ Focus indicators
- ✅ Alt text для изображений
- ✅ ARIA labels
- ✅ Font size adjustable
- ✅ No color-only indicators

**Testing:**
- Automated: aXe, Lighthouse
- Manual: Screen reader testing (NVDA, JAWS)
- User testing с людьми с ограничениями

**Анти-паттерн:**
❌ "Accessibility - это later"  
❌ Ignore keyboard users  
❌ Low contrast colors

---

## 📊 SUMMARY

```yaml
Принципы: 10

Категории:
  AI & Automation: 3 принципа (AI-First, Data-Informed, Fail Gracefully)
  UX & Design: 4 принципа (Progressive Disclosure, Collaborative, Mobile-Aware, Accessibility)
  Product Strategy: 3 принципа (Quality over Speed, Metrics-Driven, Opinionated)

Применение:
  - Используем при design reviews
  - Используем при feature prioritization
  - Используем при conflict resolution
```

---

## ✅ CHECKLIST: "Соответствует ли feature принципам?"

Перед запуском новой фичи, задай вопросы:

1. ☐ **AI-First:** Усиливает человека или пытается заменить?
2. ☐ **Quality:** Ускоряет без потери качества?
3. ☐ **Data:** Использует данные, но не игнорирует человека?
4. ☐ **Disclosure:** Простое на поверхности, детали доступны?
5. ☐ **Collaborative:** Команда может работать вместе?
6. ☐ **Mobile:** Desktop-first, mobile для review?
7. ☐ **Fail Gracefully:** Есть fallback при сбоях?
8. ☐ **Metrics:** Как измерим успех feature?
9. ☐ **Opinionated:** Рекомендуем best practices, но flexible?
10. ☐ **Accessibility:** WCAG 2.1 AA compliant?

---

**Версия:** 1.0 | **Дата:** 2025-10-24 | **Статус:** ✅


