---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: specification
title: Pricing Strategy - Стратегия ценообразования MRM AI Platform
language: ru
industry: advertising
role_apply: [founder, cfo, product_manager]
period: 2025-10
version: "1.0"
source_path: 11_BUSINESS/Pricing_Strategy.md
effective_date: 2025-10-24
visibility: internal
security_level: high
tags: [pricing, business_model, revenue, strategy]
synonyms: [ценообразование, pricing model, тарифы]
---

# Pricing Strategy
## Стратегия ценообразования MRM AI Platform

→ [Concept Validation](./Concept_Validation_Report.md) | [Business Model](../Business_Model_And_Financials.md)

**Версия:** 1.0  
**Дата:** 24 октября 2025  
**Статус:** Ready for Validation

---

## 🎯 Core Pricing Principle

> **~₽1,000 за пользователя в месяц**

**Философия:**
- Простая, прозрачная модель
- Per-user pricing (как Slack, Notion)
- + Usage-based для сложных инструментов
- Низкий порог входа

---

## 💰 Pricing Model

### Base Model: Per-User Subscription

```yaml
Core Principle:
  ₽1,000 per user per month
  
Includes (base):
  ✅ Доступ к платформе
  ✅ Unified Data Hub (single source of truth)
  ✅ Migration Assistant (unlimited migrations)
  ✅ Basic AI Assistants:
    - Task decomposition
    - Meeting assistant (postmeets)
    - Document generation (базовый)
  ✅ Project management tools
  ✅ Team collaboration
  ✅ Basic integrations (OAuth only)
  ✅ Basic reports
  ✅ Support (email, 24h response)
```

---

### Usage-Based Add-ons

```yaml
Category 1: Advanced Analytics (Usage-based)
  Shmatov Calculators:
    - Effective Reach Calculator
    - Budget Optimizer
    - Frequency Optimizer
    Price: Pay-per-calculation или bundled в тариф
    
  Media Plan Optimization (AI):
    - AI-powered recommendations
    - Scenario planning
    - What-if analysis
    Price: ₽500-1,000/month per project
    
  Econometrics (MMM):
    - Media Mix Modeling
    - Attribution modeling
    - ROI forecasting
    Price: ₽5,000-10,000/month (Enterprise)

Category 2: Connectors (Garpun Integration)
  Basic (Free tier):
    - Manual uploads
    - CSV import/export
    - 2-3 platforms (OAuth)
  
  Business (Bundled):
    - Auto-sync (daily)
    - All platforms via Garpun
    - Cost uploads в Метрику
    Price: Included в ₽1,200-1,500/user
  
  Enterprise (Unlimited):
    - Real-time sync
    - Custom connectors
    - BigQuery integration
    Price: Included в ₽2,000+/user

Category 3: AI Agents (Credits-based?)
  Basic AI (Included):
    - 100 AI interactions/user/month
  
  Extended AI:
    - Unlimited AI interactions
    - Advanced prompts
    - Custom AI training
    Price: +₽300-500/user/month
```

---

## 📊 Pricing Tiers

### 1. Free Tier (Trial) ⭐

```yaml
Name: "Starter" или "Trial"

Target: Команды до 15 человек для тестирования

Duration: 14 дней полный доступ

Includes:
  ✅ Все функции платформы (full access!)
  ✅ Migration Assistant (unlimited)
  ✅ All AI Assistants
  ✅ Analytics & Optimization
  ✅ Connectors (via Garpun)
  ✅ До 15 пользователей
  ✅ До 5 проектов
  ✅ Onboarding support (1 hour)

Limitations:
  ❌ Data retention: 30 days
  ❌ No export в S3/BigQuery
  ❌ Community support only

Goal:
  "Попробовать на полную катушку":
  - Быстро мигрировать проект
  - Провести аналитику
  - Подключить ассистентов
  - Организовать workflow
  - Оценить темп проекта

After 14 days:
  → Convert to paid plan
  → Extended trial (by request)
  → Downgrade to read-only
```

---

### 2. Team Plan

```yaml
Name: "Team"

Price: ₽990/user/month (при оплате за год)
       ₽1,200/user/month (месячная оплата)

Minimum: 3 users (₽2,970/month annual)

Target: Малые агентства, in-house команды (3-15 человек)

Includes:
  ✅ Все функции Free tier
  ✅ Data retention: unlimited
  ✅ До 50 проектов
  ✅ Basic AI (100 interactions/user/month)
  ✅ Basic connectors:
    - Yandex Direct
    - Yandex Metrika
    - VK Ads
    - Manual uploads (CSV, Excel)
  ✅ Basic analytics:
    - Standard reports
    - Campaign analytics
    - Simple calculators
  ✅ Email support (24h response)
  ✅ Community access

Limitations:
  ❌ No advanced analytics (MMM, attribution)
  ❌ No auto-sync (manual daily sync)
  ❌ No BigQuery export
  ❌ No custom integrations

Best for:
  - Малые агентства (5-15 человек)
  - Небольшие in-house команды
  - Стартапы в маркетинге
```

---

### 3. Business Plan ⭐ (Sweet Spot)

```yaml
Name: "Business"

Price: ₽1,400/user/month (при оплате за год)
       ₽1,700/user/month (месячная оплата)

Minimum: 5 users (₽7,000/month annual)

Target: Средние агентства, активные in-house команды (15-50 человек)

Includes:
  ✅ Все функции Team plan
  ✅ Unlimited projects
  ✅ Extended AI (unlimited interactions)
  ✅ Garpun auto-sync (daily): ⭐
    - Все рекламные платформы
    - Auto cost uploads в Метрику
    - Audience sync
    - Lead notifications
  ✅ Advanced analytics: ⭐
    - Shmatov Calculators (unlimited)
    - Media Plan Optimizer (AI-powered)
    - Scenario planning
    - Predictive analytics
  ✅ Advanced AI Assistants:
    - Brief Generator
    - Strategy Assistant
    - Advanced Report Generator
  ✅ Google Sheets export
  ✅ Priority support (4h response)
  ✅ Weekly office hours
  ✅ Dedicated success manager (10+ users)

Add-ons (optional):
  + Econometrics (MMM): ₽10,000/month per client
  + White-label: ₽50,000/month
  + Custom integrations: by request

Best for:
  - Средние агентства (15-50 человек)
  - Активные in-house команды
  - Агентства с 10+ клиентами
  - Performance agencies
```

---

### 4. Enterprise Plan

```yaml
Name: "Enterprise"

Price: Custom (от ₽2,000/user/month)

Minimum: 20 users (₽40,000/month)

Target: Крупные агентства, холдинги, enterprise клиенты (50+ человек)

Includes:
  ✅ Все функции Business plan
  ✅ Unlimited everything
  ✅ Real-time data sync (via Garpun)
  ✅ BigQuery integration
  ✅ ClickHouse (dedicated instance)
  ✅ Econometrics (MMM) included
  ✅ Multi-Touch Attribution
  ✅ White-label (опционально)
  ✅ Custom AI training
  ✅ Custom integrations
  ✅ API access (full)
  ✅ SSO/SAML
  ✅ Dedicated infrastructure
  ✅ SLA 99.9%
  ✅ 24/7 support (1h response)
  ✅ Dedicated CSM
  ✅ Quarterly business reviews
  ✅ Training & onboarding (unlimited)

Add-ons (optional):
  + On-premise deployment: Custom
  + Custom AI development: Custom
  + Managed services: Custom

Best for:
  - Крупные агентства (50+ человек)
  - Холдинги (Dentsu, Publicis, etc)
  - Enterprise clients (Сбербанк, МТС, etc)
  - International agencies
```

---

## 💡 Pricing Strategy Rationale

### Why ₽1,000/user/month?

```yaml
Benchmark Analysis:

CRM Systems:
  AmoCRM: ₽500-1,500/user/month
  Bitrix24: ₽1,200-2,500/user/month
  RetailCRM: ₽800-2,000/user/month

Project Management:
  Asana: ₽1,000-2,500/user/month
  Monday.com: ₽800-1,600/user/month
  Jira: ₽700-1,400/user/month

Marketing Tools:
  Carrot quest: ₽3,000-12,000/month (зависит от трафика)
  GetResponse: ₽1,500-5,000/month (не per-user)

Our Positioning:
  ₽1,000-1,400/user/month
  
  = Similar to PM tools (Monday, Asana)
  + Гораздо дешевле специализированных marketing platforms
  + Comparable to CRM (AmoCRM, Bitrix24)
  
Value:
  We deliver:
    PM + AI + Analytics + Integrations
  
  = 3-4 tools в одном
  = ₽1,400/user vs ₽5,000+ for separate tools
  
  ROI: 3-4x minimum
```

---

### Value-Based Pricing Validation

```yaml
Value Generated (per user per month):

Time Saved:
  - Data collection: 10h × ₽2,000/h = ₽20,000
  - Analytical notes: 5h × ₽2,000/h = ₽10,000
  - Meeting postmeets: 8h × ₽2,000/h = ₽16,000
  - Task management: 5h × ₽2,000/h = ₽10,000
  
  Total: 28h = ₽56,000/month per user

Quality Improvements:
  - Better decisions (data-driven)
  - Faster execution (automation)
  - Higher team efficiency
  
  Value: +₽20,000-50,000/month

Price: ₽1,400/user/month

ROI: ₽56,000 / ₽1,400 = 40x (4,000%)

Even at 10% adoption: 4x ROI

Conclusion: Price is VERY attractive!
```

---

## 🎁 Discounts & Promotions

### Launch Pricing (First 100 Customers)

```yaml
Beta Founding Members (First 20):
  - 2 months free
  - 50% discount for 6 months
  - Lifetime 20% discount
  - Founding Member badge
  - Priority support forever

Early Adopters (Next 80):
  - 1 month free
  - 30% discount for 6 months
  - Lifetime 10% discount
  - Early Adopter badge

Public Launch (After 100):
  - 14-day free trial
  - Standard pricing
```

---

### Volume Discounts

```yaml
Users:
  5-10 users: 0% discount
  10-20 users: 10% discount
  20-50 users: 15% discount
  50-100 users: 20% discount
  100+ users: 25% discount (custom)

Annual Commitment:
  Monthly billing: 0% discount
  Annual billing: 15% discount (2 months free)
  2-year billing: 25% discount (6 months free)

Example:
  Business plan: ₽1,700/user/month (monthly)
  Business plan: ₽1,400/user/month (annual) ← 17.6% discount
```

---

### Referral Program

```yaml
Refer a Customer:
  - They get: 1 month free
  - You get: ₽5,000 credit per referral
  - Or: 1 month free per 3 referrals

Affiliate Program (Agencies):
  - 20% commission on first year
  - 10% commission on renewals
  - Co-marketing support
  - Dedicated partner manager (5+ referrals)
```

---

## 🧪 Pricing Experiments (Beta)

### Test #1: Feature-Based vs Per-User

```yaml
Hypothesis:
  Per-user is simpler and more predictable
  
Test:
  - 50% beta users: per-user (₽1,400/user)
  - 50% beta users: feature-based (₽9,900 flat + add-ons)
  
Measure:
  - Conversion rate
  - ARPU (average revenue per user)
  - Customer satisfaction
  - Ease of understanding

Expected result:
  Per-user wins (simpler, scalable)
```

---

### Test #2: Price Points

```yaml
Hypothesis:
  ₽1,400/user is optimal (not too high, not too low)
  
Test (Van Westendorp):
  - Too cheap: ₽500/user
  - Cheap: ₽1,000/user
  - Expensive: ₽2,000/user
  - Too expensive: ₽3,000/user
  
Survey 50+ prospects

Find:
  - Optimal Price Point (OPP)
  - Indifference Price Point (IPP)
  - Point of Marginal Cheapness (PMC)
  - Point of Marginal Expensiveness (PME)

Hypothesis:
  OPP = ₽1,200-1,500/user
```

---

## 📈 Revenue Projections

### Year 1 (Conservative)

```yaml
Month 1-2 (Beta):
  - 5 beta customers
  - 10 users average
  - ₽0 revenue (free beta)

Month 3-4 (Beta → Paid):
  - 10 paying customers
  - 15 users average
  - ARPU: ₽1,400/user × 15 = ₽21,000/customer
  - MRR: ₽210,000

Month 5-8 (Growth):
  - +10 customers/month
  - 50 total customers
  - MRR: ₽1,050,000

Month 9-12 (Scale):
  - +15 customers/month
  - 110 total customers
  - MRR: ₽2,310,000

Year 1 Total:
  - 110 клиентов
  - ₽2,310,000 MRR
  - ₽27,720,000 ARR
```

---

### Year 2 (Aggressive)

```yaml
Target:
  - 300 клиентов
  - 20 пользователей в среднем
  - ARPU: ₽25,000/клиент (с учетом enterprise)
  - MRR: ₽7,500,000
  - ARR: ₽90,000,000

Breakdown:
  - Team (200 customers × ₽12,000/mo): ₽2,400,000
  - Business (80 customers × ₽25,000/mo): ₽2,000,000
  - Enterprise (20 customers × ₽150,000/mo): ₽3,000,000
  
  Total: ₽7,400,000/month
```

---

## 🎯 Pricing vs Competition

### vs Other MRM/PM Tools

```yaml
Project Management Tools (доступные в РФ):
  - Wrike: ₽1,000-2,500/user/month
  - Monday.com: ₽800-1,600/user/month  
  - Asana: ₽1,000-2,500/user/month
  - Jira: ₽700-1,400/user/month

Our Position:
  ₽1,000-1,400/user/month
  
  = Средний ценовой сегмент
  + Гораздо больше ценности (AI, интеграции, аналитика)
  + Specific for advertising (not generic PM)

Competitive Advantage:
  - Lower cost than enterprise MRM (Aprimo)
  - More features than PM tools (Monday, Wrike)
  - AI-native (no one else has this)
  - Advertising-specific (vs generic)
```

---

### vs In-House Solutions

```yaml
Build Your Own:
  - 1 full-time dev × 6 months = ₽900,000
  - Infrastructure: ₽50,000/month
  - Maintenance: ₽200,000/month
  - Total Year 1: ₽3,900,000

  For 20 users: ₽3,900,000 / 20 = ₽195,000/user/year
  = ₽16,250/user/month

Our Price: ₽1,400/user/month

Savings: ₽16,250 - ₽1,400 = ₽14,850/user/month
       = 92% cheaper!

Conclusion:
  Buy vs Build = no-brainer (buy!)
```

---

## 🚨 Pricing Risks & Mitigation

### Risk 1: Too Low (Underpriced)

```yaml
Symptoms:
  - 100% conversion from trial
  - No price objections
  - Customers say "this is too cheap!"

Mitigation:
  - Gradual price increases (10-20%/year)
  - Premium tiers (Enterprise)
  - Usage-based add-ons

Action:
  Monitor conversion rates in beta
  Survey "would you pay 2x?"
```

---

### Risk 2: Too High (Overpriced)

```yaml
Symptoms:
  - <20% conversion from trial
  - "Too expensive" objections
  - Churning after 1-2 months

Mitigation:
  - Discounts (volume, annual)
  - Lower tier (₽800-900/user)
  - Freemium (limited features)

Action:
  A/B test price points in beta
  Van Westendorp survey
```

---

### Risk 3: Complex Model (Confusion)

```yaml
Symptoms:
  - "I don't understand pricing" feedback
  - Long sales cycles (confusion)
  - Support tickets about billing

Mitigation:
  - Simplify model (per-user only)
  - Transparent pricing page
  - Calculator tool
  - Clear examples

Action:
  Test with beta users
  Iterate based on feedback
```

---

## ✅ Next Steps

### This Week:

1. **Van Westendorp Survey**
   - Use template: `Pricing_Survey_Template.md`
   - Send to 50+ prospects
   - Validate ₽1,000-1,400/user range

2. **Beta Pricing Setup**
   - Implement free trial (14 days, 15 users)
   - Set up billing (Stripe, YooKassa)
   - Create pricing page

3. **Competitive Analysis**
   - Benchmark all competitors
   - Positioning matrix
   - Value prop vs price

### Week 2-3:

4. **Beta Feedback Collection**
   - "Would you pay for this?"
   - "How much would you pay?"
   - "What features justify price?"

5. **Pricing Page A/B Test**
   - Version A: ₽990/user
   - Version B: ₽1,400/user
   - Measure conversion

6. **Finalize Pricing**
   - Analyze all data
   - Make final decision
   - Lock for public launch

---

## 📚 Related Documents

- [Concept Validation Report](./Concept_Validation_Report.md)
- [Pricing Survey Template](./Customer_Interviews/Pricing_Survey_Template.md)
- [Beta Candidates Action Plan](./Beta_Candidates_Action_Plan.md)
- [Business Model](../Business_Model_And_Financials.md)
- [Competitive Analysis](../Competitive_Analysis_SberMarketing_MRM.md)

---

**Key Takeaway:**

> **₽1,000-1,400/user/month** — это optimal price point:
> - Доступно для малых агентств
> - Прибыльно для нас
> - 40x ROI для клиентов
> - Simpler, чем feature-based pricing

**Free trial для команд до 15 человек** — критично для "попробовать на полную катушку"!

---

**Версия:** 1.0  
**Дата:** 24 октября 2025  
**Статус:** Ready for Validation  
**Next Review:** After pricing survey (Week 1)

