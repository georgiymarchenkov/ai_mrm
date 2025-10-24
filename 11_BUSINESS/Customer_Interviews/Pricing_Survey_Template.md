---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: guide_doc
title: Pricing Survey Template - Шаблон опроса по ценообразованию
language: ru
industry: advertising
role_apply: [founder, pm, product_manager]
period: 2025-10
version: "1.0"
source_path: 11_BUSINESS/Customer_Interviews/Pricing_Survey_Template.md
effective_date: 2025-10-24
visibility: internal
security_level: medium
tags: [pricing, survey, validation, willingness_to_pay]
synonyms: [ценообразование, pricing research, van westendorp]
---

# Pricing Survey Template
## Опрос для валидации ценообразования MRM AI Platform

→ [Product Gaps Analysis](../../PRODUCT_GAPS_ANALYSIS.md) | [Interview Guide](./Interview_Guide_Template.md)

---

## 🎯 Цель опроса

**Основные задачи:**
1. ✅ Определить optimal price point (Van Westendorp)
2. ✅ Понять feature value (conjoint analysis)
3. ✅ Валидировать pricing tiers
4. ✅ Оценить willingness to pay по сегментам

**Target:**
- Минимум 50 ответов (больше = лучше)
- Mix сегментов: small/medium agencies, inhouse teams

**Method:**
- Google Forms / Typeform / SurveyMonkey
- Длительность: 7-10 минут
- Incentive: шанс выиграть $100 Amazon gift card (3 winners)

---

## 📋 Survey Flow

### Section 1: Screener (фильтр респондентов)

**Цель:** Убедиться, что опрос заполняют целевые пользователи

---

**Q1. Вы работаете в рекламном агентстве или inhouse marketing team?**
- [ ] Да, в рекламном агентстве
- [ ] Да, в inhouse marketing team
- [ ] Нет (→ завершить опрос: "Спасибо, но этот опрос для другой аудитории")

---

**Q2. Какова ваша роль?**
- [ ] Project Manager / Account Manager
- [ ] Media Planner / Specialist
- [ ] Analyst / Data Specialist
- [ ] Strategist
- [ ] Creative / Designer
- [ ] Руководитель (Head of, Director)
- [ ] Другое: ___________

---

**Q3. Размер вашей команды/агентства?**
- [ ] 1-5 человек (freelancer/micro)
- [ ] 5-15 человек (small)
- [ ] 15-50 человек (medium)
- [ ] 50+ человек (large)

---

**Q4. Участвуете ли вы в принятии решений о покупке software для команды?**
- [ ] Да, я принимаю решение
- [ ] Да, я влияю на решение (recommender)
- [ ] Нет, но я пользователь (→ продолжить, но note)
- [ ] Нет (→ завершить опрос)

---

### Section 2: Current State (текущая ситуация)

**Цель:** Понять baseline и контекст

---

**Q5. Сколько вы сейчас тратите на software для управления проектами и аналитики в месяц?**

*Включите все tools: project management (Asana, Monday), analytics (Supermetrics), collaboration (Slack), etc.*

- [ ] $0 (используем бесплатные версии)
- [ ] $1-50
- [ ] $50-100
- [ ] $100-200
- [ ] $200-500
- [ ] $500-1000
- [ ] $1000+

---

**Q6. Какие инструменты используете для управления рекламными проектами?** (multiple choice)

- [ ] Excel / Google Sheets
- [ ] Asana
- [ ] Monday.com
- [ ] Trello
- [ ] Jira
- [ ] ClickUp
- [ ] Notion
- [ ] Smartsheet
- [ ] Bitrix24
- [ ] Другое: ___________
- [ ] Не используем никакие tools

---

**Q7. Насколько вы довольны текущими инструментами?**

*1 = очень недоволен, 10 = полностью доволен*

[1] [2] [3] [4] [5] [6] [7] [8] [9] [10]

---

**Q8. Какая проблема в работе с рекламными проектами беспокоит вас больше всего?** (open-ended)

[Text area: 2-3 sentences]

---

### Section 3: Value Proposition (знакомство с продуктом)

**Цель:** Представить MRM AI Platform

---

**Описание продукта:**

```
MRM AI Platform — это единая платформа для управления рекламными проектами, 
специально созданная для агентств и маркетинговых команд.

✅ AI-ассистенты для разных ролей (PM, Analyst, Media Planner)
   - Генерация медиапланов за минуты
   - Автоматическая аналитика и инсайты
   - Декомпозиция задач и RACI-матрицы

✅ Миграция за минуты
   - AI распознает ваши Excel/Google Sheets
   - Автоматически импортирует проекты, медиапланы, отчеты
   - Сохраняет структуру и историю

✅ Встроенная аналитика
   - Автоматический сбор данных из всех ad platforms
   - Отчеты для клиентов за 1 клик
   - Интеграция с Yandex Metrika, Google Ads, VK Ads, и др.

✅ Научные калькуляторы для медиапланирования
   - Расчет эффективного охвата (Effective Reach)
   - Оптимизация budget allocation
   - Frequency optimization

Результат: экономия 10-15 часов в неделю на рутине.
```

---

**Q9. Насколько это решение было бы ценно для вас?**

*1 = совсем не ценно, 10 = критически ценно*

[1] [2] [3] [4] [5] [6] [7] [8] [9] [10]

---

**Q10. Какая функция наиболее ценна для вас?** (rank top 3)

- [ ] AI-генерация медиапланов
- [ ] Автоматический сбор данных из рекламных платформ
- [ ] AI-ассистенты для команды (PM, Analyst, Media Planner)
- [ ] Миграция из Excel/Sheets за минуты
- [ ] Отчеты для клиентов (auto-generated)
- [ ] Научные калькуляторы (Effective Reach, etc)
- [ ] Интеграция с ad platforms (Yandex, Google, VK)
- [ ] Collaboration tools (задачи, коммуникация)
- [ ] Analytics dashboards

**Rank:**
1. ___________
2. ___________
3. ___________

---

### Section 4: Van Westendorp Price Sensitivity Meter (КЛЮЧЕВАЯ СЕКЦИЯ)

**Цель:** Определить optimal price point

---

**Intro:**
```
Следующие 4 вопроса помогут нам понять, как правильно оценить продукт.
Здесь нет правильных или неправильных ответов — мы хотим узнать ваше мнение.

Представьте, что вы рассматриваете MRM AI Platform для вашей команды.
```

---

**Q11. При какой цене (₽/месяц) вы бы сказали: "Слишком дорого, я точно не куплю"?**

*Too Expensive — цена, при которой продукт становится неприемлемым*

[Number input] ₽ в месяц

---

**Q12. При какой цене (₽/месяц) вы бы сказали: "Дорого, но оно того стоит"?**

*Expensive but worth it — цена, которая кажется высокой, но вы все равно купите из-за ценности*

[Number input] ₽ в месяц

---

**Q13. При какой цене (₽/месяц) вы бы сказали: "Отличная цена, выгодно!"?**

*Bargain — цена, при которой вы чувствуете, что это отличная сделка*

[Number input] ₽ в месяц

---

**Q14. При какой цене (₽/месяц) вы бы усомнились в качестве: "Слишком дешево, что-то не так"?**

*Too Cheap — цена настолько низкая, что вызывает подозрения о качестве*

[Number input] ₽ в месяц

---

### Section 5: Feature Value Analysis (conjoint lite)

**Цель:** Понять относительную ценность features

---

**Q15. Если бы вам нужно было выбрать только 3 функции (остальные недоступны), что бы вы выбрали?**

*Select exactly 3*

- [ ] AI Media Plan Generator (генерация медиапланов за минуты)
- [ ] Auto Data Collection (автосбор данных из ad platforms)
- [ ] AI Assistants (помощники для PM, Analyst, Media Planner)
- [ ] Migration Assistant (импорт из Excel за минуты)
- [ ] Report Generator (отчеты для клиентов за 1 клик)
- [ ] Analytics Dashboard (real-time metrics)
- [ ] Scientific Calculators (Effective Reach, etc)
- [ ] Collaboration Tools (tasks, communication, RACI)
- [ ] Integrations (Yandex, Google, VK APIs)

---

**Q16. Сколько бы вы заплатили за каждую функцию отдельно?**

*Представьте, что можете купить функции по отдельности (à la carte)*

| Feature | Price (₽/mo) |
|---------|--------------|
| AI Media Plan Generator | _____ ₽ |
| Auto Data Collection | _____ ₽ |
| AI Assistants | _____ ₽ |
| Migration Assistant | _____ ₽ |
| Report Generator | _____ ₽ |
| Analytics Dashboard | _____ ₽ |
| Scientific Calculators | _____ ₽ |
| Collaboration Tools | _____ ₽ |
| Integrations | _____ ₽ |

---

### Section 6: Packaging & Tiers (валидация тарифов)

**Цель:** Понять, какой tier наиболее привлекателен

---

**Intro:**
```
Мы рассматриваем 3 тарифа:
```

**Tier 1: TEAM — ₽4,900/месяц**
```
✓ До 15 пользователей
✓ До 10 активных проектов
✓ AI Media Plan Analyzer
✓ Report Generator
✓ Basic AI assistants (PM only)
✓ Интеграции: 5 платформ
✓ Email support
✓ 30-day history
```

**Tier 2: BUSINESS — ₽9,900/месяц** ⭐ Most Popular
```
✓ До 50 пользователей
✓ Неограниченные проекты
✓ Все AI assistants (PM, Analyst, Media Planner, Strategist)
✓ Advanced analytics & dashboards
✓ Все интеграции
✓ Priority support (4h response)
✓ 90-day history
✓ API access
```

**Tier 3: ENTERPRISE — Custom (от ₽29,900/месяц)**
```
✓ Неограниченные пользователи
✓ Marketing Mix Modeling (MMM)
✓ White-label option
✓ SSO (SAML, OAuth)
✓ Dedicated account manager
✓ SLA 99.9% uptime
✓ Custom integrations
✓ Unlimited history
✓ Advanced permissions & audit logs
```

---

**Q17. Какой тариф наиболее привлекателен для вас?**

- [ ] Team (₽4,900/мес)
- [ ] Business (₽9,900/мес) ⭐
- [ ] Enterprise (от ₽29,900/мес)
- [ ] Ни один из них (слишком дорого)
- [ ] Нужен бесплатный tier

---

**Q18. Почему вы выбрали этот тариф?** (open-ended)

[Text area]

---

**Q19. Если бы был Free tier с ограничениями, вы бы его попробовали?**

**Free Plan:**
```
✓ 1 проект
✓ 3 пользователя
✓ Базовые артефакты (Brief, Tasks)
✓ 10 AI запросов/месяц
```

- [ ] Да, попробовал бы Free и, возможно, апгрейдился
- [ ] Да, попробовал бы Free, но вряд ли заплачу
- [ ] Нет, не буду тратить время на Free tier
- [ ] Предпочитаю сразу платную версию с trial

---

**Q20. Какая длительность trial была бы оптимальной?**

- [ ] 7 дней
- [ ] 14 дней
- [ ] 30 дней
- [ ] Не нужен trial, готов сразу платить (если убедит demo)

---

### Section 7: Purchase Intent & Barriers

**Цель:** Понять намерение купить и барьеры

---

**Q21. Насколько вероятно, что вы купите MRM AI Platform в ближайшие 3 месяца?**

*0 = точно не куплю, 10 = куплю обязательно*

[0] [1] [2] [3] [4] [5] [6] [7] [8] [9] [10]

---

**Q22. Что может помешать вам купить этот продукт?** (multiple choice)

- [ ] Слишком дорого
- [ ] Нет бюджета на новые tools
- [ ] Не уверен, что это решит мои проблемы
- [ ] Нужно согласование с руководством
- [ ] Уже используем другой инструмент и не хотим менять
- [ ] Опасения по поводу безопасности данных
- [ ] Нет времени на внедрение и обучение команды
- [ ] Не доверяю AI (боюсь ошибок)
- [ ] Другое: ___________

---

**Q23. Что бы вас убедило попробовать?** (multiple choice)

- [ ] Бесплатный trial (14-30 дней)
- [ ] Кейс-стадии от похожих агентств
- [ ] Live demo с нашими данными
- [ ] Гарантия возврата денег
- [ ] Помощь с миграцией (onboarding)
- [ ] Рекомендация от коллег
- [ ] Скидка для ранних adopters
- [ ] Другое: ___________

---

### Section 8: Demographics & Follow-up

**Цель:** Segmentation и контакт для дальнейшего взаимодействия

---

**Q24. Размер рекламного бюджета, которым управляет ваша команда в месяц?**

- [ ] < 500K ₽
- [ ] 500K - 1M ₽
- [ ] 1M - 5M ₽
- [ ] 5M - 10M ₽
- [ ] > 10M ₽

---

**Q25. География (где находится ваша компания)?**

- [ ] Россия (Москва)
- [ ] Россия (СПб)
- [ ] Россия (другие города)
- [ ] Другие страны: ___________

---

**Q26. Хотите ли вы:**

- [ ] Участвовать в бета-тестировании (early access)
- [ ] Получить результаты исследования (pricing insights report)
- [ ] Участвовать в розыгрыше $100 Amazon gift card (3 winners)
- [ ] Все вышеперечисленное

---

**Q27. Email для связи (опционально):**

*Нужен только если вы выбрали опции выше*

[Email input]

---

**Финал:**
```
🎉 Спасибо за участие!

Ваши ответы очень ценны для нас.

Что дальше:
✅ Мы проанализируем результаты и оптимизируем продукт
✅ Если вы оставили email, мы отправим:
   - Результаты исследования (через 2 недели)
   - Приглашение на beta (если выбрали)
   - Результаты розыгрыша (через 1 неделю)

Хотите узнать больше о MRM AI Platform?
[Перейти на landing page] или [Запросить demo]

Еще раз спасибо! 🚀
```

---

## 📊 Analysis Guide (после сбора ответов)

### 1. Van Westendorp Analysis

**Steps:**

1. **Сортировка данных по каждому вопросу:**
   - Too Expensive (Q11)
   - Expensive but worth it (Q12)
   - Bargain (Q13)
   - Too Cheap (Q14)

2. **Построить кумулятивные кривые:**
   - Too Expensive: % respondents who say price X is "too expensive"
   - Too Cheap: % respondents who say price X is "too cheap"
   - Expensive: % who say "expensive but worth it"
   - Bargain: % who say "bargain"

3. **Найти ключевые точки:**
   - **OPP (Optimal Price Point):** пересечение "Too Expensive" и "Too Cheap"
   - **IPP (Indifference Price Point):** пересечение "Expensive" и "Bargain"
   - **PMC (Point of Marginal Cheapness):** пересечение "Too Cheap" и "Bargain"
   - **PME (Point of Marginal Expensiveness):** пересечение "Too Expensive" и "Expensive"

4. **Acceptable Price Range:** между PMC и PME

**Example Output:**
```
Van Westendorp Results:
- Optimal Price Point (OPP): ₽7,500/mo
- Indifference Price Point (IPP): ₽6,800/mo
- Point of Marginal Cheapness (PMC): ₽3,500/mo
- Point of Marginal Expensiveness (PME): ₽12,000/mo

Acceptable Price Range: ₽3,500 - ₽12,000/mo
Recommended Price: ₽7,000 - ₽8,000/mo (around OPP)
```

### 2. Feature Value Analysis

**From Q15-Q16:**

| Feature | Top 3 selection rate | Avg ₽ value | Priority |
|---------|----------------------|-------------|----------|
| AI Media Plan Generator | 78% | ₽4,200 | P0 (MVP) |
| Auto Data Collection | 65% | ₽3,500 | P0 (MVP) |
| AI Assistants | 52% | ₽3,000 | P1 |
| ... | ... | ... | ... |

**Insights:**
- Features with >60% selection rate = must-have for MVP
- Features with <30% = nice-to-have, post-MVP

### 3. Tier Preference (Q17)

**Example:**
```
Tier preferences:
- Team (₽4,900): 35% 
- Business (₽9,900): 50% ← Most popular
- Enterprise (₽29,900+): 10%
- None / Need free: 5%

Insight: Business tier is sweet spot. Consider making it default.
```

### 4. Segmentation Analysis

**By company size:**
```
Small agencies (5-15 people):
- Optimal Price: ₽5,000/mo
- Prefer: Team tier
- Top features: Migration, Report Generator

Medium agencies (15-50):
- Optimal Price: ₽9,000/mo
- Prefer: Business tier
- Top features: AI Assistants, Analytics

Large agencies (50+):
- Optimal Price: ₽20,000+/mo
- Prefer: Enterprise tier
- Top features: MMM, White-label, SSO
```

### 5. Purchase Intent (Q21)

**NPS-style scoring:**
```
Promoters (9-10): 25% — likely to buy
Passives (7-8): 40% — interested but need convincing
Detractors (0-6): 35% — unlikely to buy

Focus on converting Passives to Promoters.
```

### 6. Barriers & Enablers (Q22-23)

**Top barriers:**
1. Price (40%) → solution: show ROI calculator
2. Not sure it solves problems (35%) → solution: free trial + demo
3. No budget (25%) → solution: highlight time saved = cost saved

**Top enablers:**
1. Free trial (70%) → must-have
2. Case studies (55%) → create from beta
3. Live demo (50%) → sales demo process

---

## 📋 Deliverable: Pricing Research Report

**After analyzing 50+ responses, create:**

```markdown
# Pricing Research Report

## Executive Summary
- **Optimal Price Point:** ₽7,500/mo (based on Van Westendorp)
- **Acceptable Range:** ₽3,500 - ₽12,000/mo
- **Recommended Tiers:**
  - Team: ₽4,900/mo (below OPP, acquisition tier)
  - Business: ₽9,900/mo (sweet spot, most popular)
  - Enterprise: ₽29,900+/mo (custom, high-value)

## Key Findings
1. **Feature Value:**
   - AI Media Plan Generator: ₽4,200 (highest value)
   - Auto Data Collection: ₽3,500
   - AI Assistants: ₽3,000
   
2. **Willingness to Pay by Segment:**
   - Small agencies: ₽5,000/mo
   - Medium agencies: ₽9,000/mo
   - Large agencies: ₽20,000+/mo

3. **Tier Preferences:**
   - Business tier (₽9,900) = 50% preference (winner!)
   - Team tier (₽4,900) = 35%
   - Enterprise (₽29,900+) = 10%

4. **Purchase Intent:**
   - 25% "likely to buy" (score 9-10)
   - 40% "interested" (score 7-8)
   - Need: trial, case studies, ROI proof

5. **Barriers:**
   - Price concerns (40%) → show ROI
   - Uncertainty (35%) → offer trial
   - Budget (25%) → highlight savings

## Recommendations
1. ✅ Keep Team at ₽4,900 (acquisition)
2. ✅ Position Business at ₽9,900 (optimal)
3. ✅ Offer 14-day free trial (70% want it)
4. ✅ Create ROI calculator (address #1 barrier)
5. ✅ Build case studies from beta (address #2 enabler)

## Next Steps
- Update pricing page
- Create ROI calculator tool
- Prepare trial onboarding
- Develop case study tracking for beta
```

---

## 🚀 Launch Plan

### Week 1: Create survey
- [ ] Customize questions for your product
- [ ] Set up in Google Forms / Typeform
- [ ] Test with 3-5 internal people
- [ ] Prepare incentive (gift cards)

### Week 2-3: Distribute
- [ ] Send to email list (if any)
- [ ] Post in industry communities (LinkedIn, Telegram)
- [ ] Paid promotion ($50-100 Facebook/LinkedIn ads)
- [ ] Personal outreach to target customers
- **Target: 50+ responses**

### Week 4: Analyze
- [ ] Van Westendorp analysis (Excel template available online)
- [ ] Feature value ranking
- [ ] Segment analysis (by size, role)
- [ ] Write Pricing Research Report

### Week 5: Apply learnings
- [ ] Adjust pricing if needed
- [ ] Update MVP feature prioritization
- [ ] Refine tier packaging
- [ ] Update marketing copy

---

## 📚 Resources

### Tools:
- **Survey:** Google Forms (free), Typeform ($), SurveyMonkey ($)
- **Analysis:** Excel Van Westendorp template (search online), Python/R
- **Incentives:** Tremendous.com, Amazon gift cards
- **Distribution:** LinkedIn ads, Facebook ads, industry Slack/Telegram

### Further Reading:
- [Van Westendorp Guide](https://conjointly.com/guides/price-sensitivity-meter/)
- [Pricing Strategy Guide](https://www.priceintelligently.com/blog)
- [SaaS Pricing Best Practices](https://openviewpartners.com/blog/saas-pricing/)

---

**Версия:** 1.0  
**Дата:** 24 октября 2025  
**Автор:** Product Team  
**Статус:** ✅ Ready to Launch

