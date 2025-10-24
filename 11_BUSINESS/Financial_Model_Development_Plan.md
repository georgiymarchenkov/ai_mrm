---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: guide_doc
title: Financial Model Development Plan - План разработки финансовой модели
language: ru
industry: advertising
role_apply: [founder, cfo, investor]
period: 2025-10
version: "1.0"
source_path: 11_BUSINESS/Financial_Model_Development_Plan.md
effective_date: 2025-10-24
visibility: confidential
security_level: high
tags: [financial_model, business_plan, projections, unit_economics, saas_metrics]
synonyms: [финансовая модель, бизнес план, прогнозы, экономика]
related_docs:
  - 11_BUSINESS/Pricing_Strategy.md
  - 11_BUSINESS/Concept_Validation_Report.md
  - MVP_TECHNICAL_SPECIFICATION.md
  - 11_BUSINESS/Sales_Process_And_Demo.md
---

# Financial Model Development Plan
## План разработки финансовой модели MRM AI Platform

→ [Business Documentation](./README.md) | [Pricing Strategy](./Pricing_Strategy.md) | [MVP Spec](../MVP_TECHNICAL_SPECIFICATION.md)

---

## 🎯 Цель

Разработать полную финансовую модель для:
1. **Внутреннего планирования** - понимание unit economics, точка безубыточности, потребность в финансировании
2. **Привлечения инвестиций** - презентация инвесторам (если нужно)
3. **Бизнес-плана** - для партнеров, кредитов, грантов
4. **Операционного управления** - KPI, dashboard, tracking

---

## 📊 Структура финансовой модели

```
Financial Model (Excel/Google Sheets)
│
├── 1. ASSUMPTIONS (Входные данные)
│   ├── Market assumptions
│   ├── Pricing assumptions
│   ├── Sales assumptions
│   └── Cost assumptions
│
├── 2. REVENUE MODEL
│   ├── Customer acquisition forecast
│   ├── MRR/ARR projections
│   ├── Revenue by tier
│   └── Churn & retention
│
├── 3. COST STRUCTURE
│   ├── COGS (Cost of Goods Sold)
│   ├── R&D (Product development)
│   ├── Sales & Marketing
│   └── G&A (General & Administrative)
│
├── 4. UNIT ECONOMICS
│   ├── LTV (Lifetime Value)
│   ├── CAC (Customer Acquisition Cost)
│   ├── LTV:CAC ratio
│   └── Payback period
│
├── 5. P&L (Profit & Loss)
│   ├── Monthly P&L (Year 1-2)
│   ├── Quarterly P&L (Year 3-5)
│   └── Key metrics dashboard
│
├── 6. CASH FLOW
│   ├── Operating cash flow
│   ├── Investing cash flow
│   ├── Financing cash flow
│   └── Cash runway
│
├── 7. SCENARIOS
│   ├── Base case (realistic)
│   ├── Best case (optimistic)
│   └── Worst case (conservative)
│
└── 8. KEY METRICS & KPIs
    ├── SaaS metrics
    ├── Growth metrics
    └── Efficiency metrics
```

---

## 📋 PHASE 1: Assumptions (Входные данные) — 1-2 дня

### 1.1 Market Assumptions

**Задача:** Определить целевой рынок и долю захвата

**Исходные данные (у нас есть):**
- Рынок России: ~5,000 агентств (100+ человек), ~20,000 малых/средних агентств
- TAM (Total Addressable Market): $300M+ globally
- SAM (Serviceable Available Market): $50M Russia
- → [MRM_Market_Analysis](../12_RESEARCH/Market/MRM_Market_Analysis_Global_And_Russia.md)

**Что определить:**

```yaml
TAM (Total Addressable Market):
  Global: $300M
  Russia: $50M
  Method: Bottom-up (agencies × avg team size × price)

SAM (Serviceable Available Market):
  Initial focus: Russia + CIS
  Target: $30M (agencies 5-100 people)
  Rationale: Наш ICP (Ideal Customer Profile)

SOM (Serviceable Obtainable Market):
  Year 1: 0.5% SAM = $150K
  Year 3: 3% SAM = $900K
  Year 5: 10% SAM = $3M

ICP (Ideal Customer Profile):
  Company size: 5-50 employees
  Type: Agencies, in-house teams
  Budget: ₽10K-70K/month for tools
  Pain: Хаос в данных, 50% времени на рутину
  Geo: Russia, then CIS, then global
```

**Источники:**
- Существующее исследование рынка
- Отраслевые отчеты (АКАР, IAB Russia)
- Competitor analysis (SberMarketing MRM)

**Output:** Market Assumptions tab в Excel

---

### 1.2 Pricing Assumptions

**Задача:** Зафиксировать pricing tiers и ARPU

**Исходные данные (у нас есть):**
- ₽1,000-1,400/user/month (validated!)
- 3 тира: Team, Business, Enterprise
- → [Pricing_Strategy.md](./Pricing_Strategy.md)

**Что определить:**

```yaml
Pricing Tiers:
  Free Trial:
    Duration: 30 days
    Features: Full Business tier
    Users: Up to 15
    Conversion rate: 60% (target)
  
  Team:
    Price: ₽990/user/month (₽842/user/month annual)
    Min users: 3
    Target: Small agencies (3-15 people)
    Features: Basic + limited AI
  
  Business ⭐:
    Price: ₽1,400/user/month (₽1,190/user/month annual)
    Min users: 5
    Target: Medium agencies (15-50 people)
    Features: Full platform + unlimited AI
  
  Enterprise:
    Price: ₽2,000+/user/month (custom)
    Min users: 20
    Target: Large agencies (50+ people)
    Features: Custom + white-label + SLA

Mix Assumptions (Year 1):
  Team: 40% of customers
  Business: 50% of customers ⭐ sweet spot
  Enterprise: 10% of customers

ARPU (Average Revenue Per User):
  Month 1-12: ₽1,200/user/month
  Year 2: ₽1,350/user/month (more Enterprise)
  Year 3+: ₽1,500/user/month

Average Team Size:
  Team tier: 8 users
  Business tier: 25 users ⭐
  Enterprise tier: 60 users
  
  Weighted average: 22 users per customer

ARPC (Average Revenue Per Customer):
  Team: ₽7,920/month (8 users × ₽990)
  Business: ₽35,000/month (25 users × ₽1,400) ⭐
  Enterprise: ₽120,000/month (60 users × ₽2,000)
  
  Weighted ARPC: ₽26,400/month

Discounts:
  Annual prepay: 15% discount (2 months free)
  Early bird (first 20): Additional 10% for 6 months
  Enterprise custom: Up to 20% for >100 users
  
  Expected annual prepay rate: 40% by Year 2

Churn Assumptions:
  Monthly churn:
    Month 1-3: 10% (early churn)
    Month 4-12: 5% (stabilized)
    Year 2+: 3% (mature)
  
  Annual retention: 85% Year 1, 90% Year 2, 95% Year 3+
```

**Output:** Pricing Assumptions tab в Excel

---

### 1.3 Sales & Marketing Assumptions

**Задача:** Определить воронку продаж и эффективность каналов

**Исходные данные (у нас есть):**
- Sales process validated (10 presentations → 100% want to try)
- → [Sales_Process_And_Demo.md](./Sales_Process_And_Demo.md)

**Что определить:**

```yaml
Sales Funnel (Steady State):
  Awareness: 1,000 people/month
    ↓ 15% conversion
  Interest: 150 people/month
    ↓ 33% conversion
  Demo requests: 50/month
    ↓ 80% show-up rate
  Demos conducted: 40/month
    ↓ 70% conversion
  Trial started: 28/month
    ↓ 60% conversion
  Paid customers: 17/month

  Overall conversion: 1.7% (awareness → paid)

Sales Cycle:
  Awareness → Demo: 7-14 days
  Demo → Trial: Same day (give access immediately)
  Trial → Paid: 30 days
  
  Total: ~45 days (1.5 months)

Marketing Channels (Year 1):
  Organic (content, SEO, PR):
    Budget: ₽50K/month
    Leads: 40/month
    Cost per lead: ₽1,250
    Conversion to paid: 2%
    CAC: ₽62,500
  
  Conferences & Events:
    Budget: ₽100K/month (avg, including travel)
    Leads: 80/month
    Cost per lead: ₽1,250
    Conversion to paid: 3%
    CAC: ₽41,667
  
  Paid Ads (LinkedIn, VK, Telegram):
    Budget: ₽150K/month
    Leads: 120/month
    Cost per lead: ₽1,250
    Conversion to paid: 1.5%
    CAC: ₽83,333
  
  Referrals (from customers):
    Budget: ₽0 (incentive: 1 month free for referrer)
    Leads: 10/month (starting Year 2)
    Conversion to paid: 5%
    CAC: ₽2,000 (cost of 1 month free)
  
  Total Marketing Budget Year 1: ₽300K/month = ₽3.6M/year
  Total Leads Year 1: 250/month = 3,000/year
  Total New Customers Year 1: 50/year (ramp up from 0 to 100/year)

Blended CAC (Year 1): ₽72,000 per customer
  (₽3.6M budget / 50 customers)

Founder-led Sales (Year 1):
  Founder does all demos personally
  Max capacity: 80 demos/month (4/day × 20 days)
  Cost: Founder salary (opportunity cost)
  
  When to hire Sales Rep: Month 6-9 (when >50 demos/month)

Sales Team Ramp (Year 2+):
  Month 9: Hire Sales Rep #1 (₽150K/month loaded)
  Month 15: Hire Sales Rep #2
  Year 3: Hire Sales Manager + 2 more reps
  
  Sales rep productivity:
    Ramp time: 3 months
    Steady state: 20 demos/month → 10 new customers/month
    Quota: ₽3M ARR/year per rep
```

**Output:** Sales & Marketing Assumptions tab в Excel

---

### 1.4 Cost Assumptions

**Задача:** Определить все категории затрат

**Исходные данные (у нас есть):**
- Tech stack defined
- Team structure outlined
- → [MVP_TECHNICAL_SPECIFICATION.md](../MVP_TECHNICAL_SPECIFICATION.md)

**Что определить:**

```yaml
1. COGS (Cost of Goods Sold) - переменные затраты на клиента

Infrastructure (per customer, 25 users avg):
  Supabase (PostgreSQL, Auth, Storage):
    Base: $25/org/month
    Usage: ~$15/month (storage, bandwidth)
    Total: $40/customer/month = ₽3,600
  
  Vercel (Frontend hosting):
    Pro plan: $20/month per team
    Total: $20/customer/month = ₽1,800
  
  Railway/Fly.io (Backend services):
    ~$30/customer/month = ₽2,700
  
  ClickHouse Cloud (Analytics DB):
    ~$50/customer/month = ₽4,500
  
  Pinecone (Vector DB for RAG):
    ~$70/customer/month (scaled) = ₽6,300
  
  Redis (Upstash):
    ~$10/customer/month = ₽900
  
  Claude API (AI costs):
    Estimate: 500 requests/month per team
    Cost: ~$50/customer/month = ₽4,500
  
  Garpun connectors:
    Cost: ₽2,000/customer/month (their pricing)
  
  CDN (Cloudflare):
    ~$5/customer/month = ₽450
  
  Monitoring (Sentry, BetterStack):
    ~$10/customer/month = ₽900

Total COGS per customer: ₽27,650/month
COGS as % of ARPC: 27,650 / 26,400 = 105% (!)

⚠️ PROBLEM: COGS > Revenue at low scale!

Solution: Negotiate volume discounts
  - Garpun: ₽2,000 → ₽1,000 at 50+ customers
  - ClickHouse: 50% discount at scale
  - Claude API: volume pricing
  
  Target COGS: ₽15,000/customer/month (Year 2)
  COGS as % of ARPC: 57% (acceptable for SaaS)

Gross Margin Target:
  Year 1: 20% (loss leader, focus on growth)
  Year 2: 45% (improved unit economics)
  Year 3+: 60% (economies of scale)

2. R&D (Product Development) - команда разработки

Team Year 1:
  - Founder/CTO: ₽300K/month (or equity/sweat)
  - Senior Fullstack Dev: ₽250K/month
  - Fullstack Dev: ₽180K/month
  - ML Engineer (AI/Agents): ₽200K/month
  - QA Engineer: ₽120K/month
  - Product Manager: ₽200K/month
  Total: ₽1,250K/month = ₽15M/year

Team Year 2 (scale):
  + 2 developers, + 1 designer: +₽500K/month
  Total: ₽1,750K/month = ₽21M/year

Team Year 3:
  + 3 developers, + 1 PM: +₽800K/month
  Total: ₽2,550K/month = ₽30.6M/year

3. Sales & Marketing

Year 1:
  - Founder (sales): ₽300K/month (or equity)
  - Marketing Manager: ₽150K/month
  - Content Creator: ₽80K/month
  - Marketing budget: ₽300K/month (ads, events)
  Total: ₽830K/month = ₽10M/year

Year 2:
  + Sales Rep #1: ₽150K/month
  + Sales Rep #2: ₽150K/month
  + Marketing budget: ₽500K/month
  Total: ₽1,630K/month = ₽19.6M/year

Year 3:
  + Sales Manager: ₽250K/month
  + 2 more Sales Reps: ₽300K/month
  + Marketing budget: ₽800K/month
  Total: ₽2,980K/month = ₽35.8M/year

4. G&A (General & Administrative)

Year 1:
  - Founder/CEO: ₽300K/month (or equity)
  - Office/Coworking: ₽100K/month (10 people)
  - Legal, Accounting: ₽50K/month
  - Software (Jira, Figma, etc): ₽30K/month
  - Insurance, taxes, misc: ₽50K/month
  Total: ₽530K/month = ₽6.4M/year

Year 2:
  + Office for 20 people: +₽100K/month
  + HR/Admin: ₽100K/month
  Total: ₽730K/month = ₽8.8M/year

Year 3:
  + Larger office: +₽150K/month
  + CFO: ₽250K/month
  Total: ₽1,130K/month = ₽13.6M/year

5. One-time CapEx (Year 0-1)

MVP Development (if outsourced partially):
  ₽0-2M (depending on founder skillset)

Legal entity setup, trademarks:
  ₽200K

Initial marketing materials (website, brand):
  ₽300K

Total CapEx: ₽500K-2.5M
```

**Output:** Cost Assumptions tab в Excel

---

## 📊 PHASE 2: Revenue Model — 2-3 дня

### 2.1 Customer Acquisition Forecast

**Задача:** Смоделировать рост клиентской базы по месяцам/кварталам

**Методология:**

```yaml
Year 1 (Months 1-12): Slow ramp-up
  Month 1-2: Beta (free) - 10 customers
  Month 3: Launch - 3 paid customers
  Month 4: 5 new (+2)
  Month 5: 8 new (+3)
  Month 6: 12 new (+4)
  Month 7-9: 20 new/month (sales process optimized)
  Month 10-12: 30 new/month (word of mouth kicks in)
  
  Total Year 1: 200 customers acquired
  Churn Year 1: 20% → Net: 160 customers end of Year 1
  
  MRR End of Year 1: 160 × ₽26,400 = ₽4.2M MRR
  ARR End of Year 1: ₽50M

Year 2 (Months 13-24): Accelerated growth
  Q1: 40 new/month (hired Sales Rep #1)
  Q2: 50 new/month
  Q3: 60 new/month (hired Sales Rep #2)
  Q4: 75 new/month
  
  Total Year 2: 675 customers acquired
  Churn Year 2: 15% → Net: +574 customers
  End of Year 2: 734 customers
  
  MRR End of Year 2: 734 × ₽26,400 = ₽19.4M MRR
  ARR End of Year 2: ₽233M

Year 3 (Months 25-36): Scale
  Q1-Q4: 100-150 new/month (full sales team)
  Total Year 3: 1,500 customers acquired
  Churn Year 3: 10% → Net: +1,350 customers
  End of Year 3: 2,084 customers
  
  MRR End of Year 3: 2,084 × ₽28,000 = ₽58.4M MRR
  ARR End of Year 3: ₽700M

Year 4-5: Mature growth (30-50% YoY)
```

**Variables to model:**
- Monthly new customer adds
- Churn rate by cohort
- ARPC increase over time (upsells, tier migrations)
- Expansion revenue (existing customers adding users)

**Output:** Customer Forecast tab в Excel с графиками

---

### 2.2 MRR/ARR Build-up

**Задача:** Построить MRR/ARR по месяцам с учетом новых клиентов, churn, expansion

**Formula:**
```
MRR(month) = MRR(month-1) + New MRR + Expansion MRR - Churned MRR

Where:
- New MRR = New customers × ARPC
- Expansion MRR = Existing customers adding users or upgrading tiers
- Churned MRR = Churned customers × ARPC
```

**Breakdown by tier:**
```yaml
Month 1:
  Team: 2 customers × ₽7,920 = ₽15,840
  Business: 1 customer × ₽35,000 = ₽35,000
  Enterprise: 0
  Total MRR: ₽50,840

Month 3 (Launch):
  New: 3 customers (1 Team, 2 Business)
  MRR: ₽85,840 → ₽135,680 (+₽49,840)

Month 12:
  160 customers:
    - 64 Team (40%) × ₽7,920 = ₽506,880
    - 80 Business (50%) × ₽35,000 = ₽2,800,000
    - 16 Enterprise (10%) × ₽120,000 = ₽1,920,000
  Total MRR: ₽5,226,880
  ARR: ₽62.7M
```

**Expansion revenue assumptions:**
```yaml
Existing customers growth:
  10% add more users each year (+2.5 users avg)
  5% upgrade tier each year
  
  Net expansion: 115% (for every ₽100 MRR, becomes ₽115 next year)
```

**Output:** MRR Build-up tab в Excel, с breakdown по тирам и когортам

---

### 2.3 Revenue Recognition

**Задача:** Определить, как признавать выручку (важно для accounting)

**SaaS Revenue Recognition:**
```yaml
Monthly subscriptions:
  - Recognize revenue in the month of service
  - Bill in advance (1st of month)
  - Revenue recognized over 30 days

Annual subscriptions (15% discount):
  - Bill in advance (upfront payment)
  - Recognize revenue ratably over 12 months
  - Deferred revenue = unrecognized portion
  
  Example:
    Customer pays ₽250K for annual (₽300K with discount)
    Month 1: Recognize ₽25K, Deferred revenue ₽225K
    Month 2: Recognize ₽25K, Deferred revenue ₽200K
    ...

Mix:
  Year 1: 90% monthly, 10% annual
  Year 2: 60% monthly, 40% annual
  Year 3+: 50% monthly, 50% annual

Cash vs Revenue:
  - Cash received upfront (for annual)
  - Revenue recognized over time
  - Creates positive cash flow (good for SaaS!)
```

**Output:** Revenue Recognition tab в Excel

---

## 💰 PHASE 3: Unit Economics — 1 день

### 3.1 LTV (Lifetime Value)

**Задача:** Рассчитать, сколько выручки приносит один клиент за всё время

**Formula:**
```
LTV = ARPC × Gross Margin % × (1 / Churn Rate)

Where:
- ARPC = Average Revenue Per Customer per month
- Gross Margin = (Revenue - COGS) / Revenue
- Churn Rate = Monthly churn rate
```

**Calculation (Year 2, steady state):**
```yaml
ARPC: ₽26,400/month
Gross Margin: 45% (improved from Year 1)
Monthly Churn: 3%

LTV = ₽26,400 × 0.45 × (1 / 0.03)
    = ₽26,400 × 0.45 × 33.3
    = ₽395,640

Or simplified:
Average customer lifetime: 33 months (1 / 0.03)
Total revenue: ₽26,400 × 33 = ₽871,200
Total cost (COGS): ₽871,200 × 55% = ₽479,160
Net profit per customer: ₽392,040
```

**LTV evolution:**
```yaml
Year 1:
  ARPC: ₽26,400
  Gross Margin: 20%
  Churn: 5%
  LTV: ₽105,600

Year 2:
  ARPC: ₽28,000
  Gross Margin: 45%
  Churn: 3%
  LTV: ₽420,000

Year 3+:
  ARPC: ₽30,000
  Gross Margin: 60%
  Churn: 2%
  LTV: ₽900,000
```

---

### 3.2 CAC (Customer Acquisition Cost)

**Задача:** Рассчитать, сколько стоит привлечь одного клиента

**Formula:**
```
CAC = (Sales + Marketing Expenses) / New Customers Acquired
```

**Calculation (Year 1):**
```yaml
Sales & Marketing Expenses:
  Sales team: ₽300K/month (founder) = ₽3.6M/year
  Marketing team: ₽230K/month = ₽2.76M/year
  Marketing budget: ₽300K/month = ₽3.6M/year
  Total: ₽10M/year

New Customers: 200 customers

CAC = ₽10M / 200 = ₽50,000 per customer
```

**CAC evolution:**
```yaml
Year 1: ₽50,000 (learning, inefficient)
Year 2: ₽40,000 (optimized process)
Year 3: ₽30,000 (economies of scale, referrals)
Year 4+: ₽25,000 (mature, strong brand)
```

**CAC by channel (Year 2):**
```yaml
Organic (SEO, content): ₽20,000
Conferences: ₽35,000
Paid Ads: ₽60,000
Referrals: ₽5,000 (cost of incentive)

Blended CAC: ₽40,000
```

---

### 3.3 LTV:CAC Ratio

**Задача:** Оценить эффективность бизнес-модели

**Benchmark (for healthy SaaS):**
```
LTV:CAC > 3:1 (good)
LTV:CAC > 5:1 (excellent)
LTV:CAC < 1:1 (unsustainable)
```

**Our Ratios:**
```yaml
Year 1:
  LTV: ₽105,600
  CAC: ₽50,000
  Ratio: 2.1:1 (acceptable for early stage)

Year 2:
  LTV: ₽420,000
  CAC: ₽40,000
  Ratio: 10.5:1 (excellent!)

Year 3+:
  LTV: ₽900,000
  CAC: ₽30,000
  Ratio: 30:1 (world-class)

Conclusion: Очень сильная unit economics к Year 2!
```

---

### 3.4 Payback Period

**Задача:** Определить, за сколько месяцев окупаются затраты на привлечение клиента

**Formula:**
```
Payback Period (months) = CAC / (ARPC × Gross Margin)
```

**Calculation:**
```yaml
Year 1:
  CAC: ₽50,000
  ARPC: ₽26,400
  Gross Margin: 20%
  
  Payback = ₽50,000 / (₽26,400 × 0.20)
          = ₽50,000 / ₽5,280
          = 9.5 months

Year 2:
  CAC: ₽40,000
  ARPC: ₽28,000
  Gross Margin: 45%
  
  Payback = ₽40,000 / (₽28,000 × 0.45)
          = ₽40,000 / ₽12,600
          = 3.2 months (excellent!)

Year 3+:
  Payback = 1.7 months (world-class!)
```

**Benchmark:**
```
< 12 months: good
< 6 months: excellent
< 3 months: exceptional
```

**Output:** Unit Economics summary tab в Excel

---

## 📈 PHASE 4: P&L (Profit & Loss) — 2-3 дня

### 4.1 Monthly P&L (Year 1-2)

**Задача:** Построить детальный P&L помесячно

**Structure:**
```yaml
REVENUE
  Subscription Revenue (MRR × customers)
  - Discounts (annual prepay, promotions)
  = Net Revenue

COST OF REVENUE (COGS)
  Infrastructure costs
  Third-party services (Garpun)
  = Total COGS

GROSS PROFIT
  = Net Revenue - COGS
  Gross Margin %

OPERATING EXPENSES
  R&D (Product Development)
    Salaries & benefits
    Software & tools
    Contractors
  
  Sales & Marketing
    Salaries & benefits
    Marketing spend (ads, events)
    Sales tools (CRM, etc)
  
  G&A (General & Administrative)
    Management salaries
    Office & facilities
    Legal, accounting
    Insurance
    Other

  = Total OpEx

EBITDA (Earnings Before Interest, Tax, Depreciation, Amortization)
  = Gross Profit - OpEx
  EBITDA Margin %

Depreciation & Amortization
  (minimal for SaaS)

EBIT (Operating Profit)
  = EBITDA - D&A

Interest
  (if debt)

TAX
  (corporate tax, 20% in Russia)

NET PROFIT
  = EBIT - Interest - Tax
  Net Margin %
```

**Example Month 12:**
```yaml
REVENUE: ₽5,226,880 (160 customers)
COGS: ₽4,424,000 (₽27,650 × 160)
GROSS PROFIT: ₽802,880 (15% margin - low in Year 1)

OPEX:
  R&D: ₽1,250,000
  S&M: ₽830,000
  G&A: ₽530,000
  Total: ₽2,610,000

EBITDA: -₽1,807,120 (negative - burning cash in Year 1)
NET PROFIT: -₽1,807,120

Cumulative Year 1 Net Profit: -₽18M (expected loss)
```

---

### 4.2 Path to Profitability

**Задача:** Определить, когда бизнес станет прибыльным

**Projections:**
```yaml
Year 1:
  Revenue: ₽30M
  COGS: ₽25M
  OpEx: ₽32M
  Net Profit: -₽27M (loss)
  Cash burn: ₽27M

Year 2:
  Revenue: ₽150M
  COGS: ₽82M (55% gross margin improving)
  OpEx: ₽50M
  Net Profit: ₽18M (profitable!)
  Cash generation: +₽18M

Year 3:
  Revenue: ₽500M
  COGS: ₽200M (60% gross margin)
  OpEx: ₽80M
  Net Profit: ₽220M (35% net margin)
  Cash generation: +₽220M

Break-even point: Month 18-20 (Q2 Year 2)
  When: ~400 customers, ₽10.5M MRR
```

**Key Drivers:**
1. COGS improvement (negotiate volume discounts)
2. OpEx leverage (revenue grows faster than costs)
3. Sales efficiency (lower CAC, higher LTV)

---

### 4.3 Sensitivity Analysis

**Задача:** Понять, как изменения key assumptions влияют на результат

**Variables to test:**
```yaml
1. ARPC (pricing)
   -10%: Delay profitability by 6 months
   +10%: Accelerate profitability by 4 months

2. CAC (marketing efficiency)
   +20%: More cash burn Year 1, but manageable
   -20%: Earlier profitability (Month 16)

3. Churn Rate
   5% instead of 3%: LTV drops 40%, need to raise prices or cut costs
   2% instead of 3%: LTV increases 50%, excellent margins

4. Growth Rate (new customers/month)
   50% slower: Profitability delayed 12 months, need less funding
   50% faster: Profitability earlier, but need more funding upfront

5. Gross Margin (COGS optimization)
   40% instead of 45% (Year 2): Profitability delayed 3 months
   50% instead of 45%: Profitability Month 17, stronger margins
```

**Output:** Sensitivity tab в Excel with scenarios

---

## 💵 PHASE 5: Cash Flow — 1-2 дня

### 5.1 Operating Cash Flow

**Задача:** Понять реальное движение денег (отличается от P&L!)

**Key Differences from P&L:**
```yaml
P&L (accrual accounting):
  - Revenue recognized when earned (ratably for annual)
  - Expenses recognized when incurred

Cash Flow (cash accounting):
  - Cash in when received (upfront for annual!)
  - Cash out when paid

Example:
  Customer pays ₽300K annual subscription upfront (Month 1)
  
  P&L: Recognize ₽25K/month × 12 months
  Cash Flow: ₽300K in Month 1, then ₽0 for 11 months
  
  → This creates positive cash flow but "hides" in deferred revenue
```

**Operating Cash Flow Calculation:**
```yaml
Net Profit (from P&L)
+ Depreciation & Amortization (non-cash expense)
+ Increase in Deferred Revenue (annual prepayments)
- Increase in Accounts Receivable (customers paying late)
+/- Changes in Working Capital
= Operating Cash Flow
```

**Year 1 Example:**
```yaml
Net Profit: -₽27M
Deferred Revenue increase: +₽5M (annual subs)
A/R increase: -₽2M
Operating Cash Flow: -₽24M (better than P&L loss!)
```

---

### 5.2 Investing & Financing Cash Flow

**Investing:**
```yaml
CapEx (Year 0-1): -₽2M (initial development, setup)
Year 2+: -₽500K/year (servers, equipment)
```

**Financing:**
```yaml
Option 1: Bootstrapped
  Founder investment: ₽5M (Year 0)
  No external funding
  
Option 2: Seed Round
  Founders: ₽5M (Year 0)
  Angel/Seed: ₽20M (Month 3)
  Series A: ₽100M (Year 2, if needed)

Option 3: Revenue-based Financing
  Borrow: ₽15M (Year 1)
  Repay: 5% of revenue until 1.5x repaid
```

---

### 5.3 Cash Runway

**Задача:** Определить, на сколько месяцев хватит cash

**Formula:**
```
Cash Runway (months) = Current Cash / Monthly Cash Burn
```

**Scenario 1: Bootstrapped**
```yaml
Starting Cash: ₽5M (founder investment)
Monthly Cash Burn (avg Year 1): ₽2.25M
Cash Runway: 2.2 months (!)

Problem: Run out of cash Month 3
Solution: 
  - Reduce burn (cut team, marketing)
  - Raise seed round
  - Faster revenue ramp (aggressive sales)
```

**Scenario 2: Seed Round**
```yaml
Starting Cash: ₽25M (₽5M founders + ₽20M seed)
Monthly Cash Burn: ₽2.25M (Year 1)
Cash Runway: 11 months

With revenue ramp:
  Month 1-6: Burn ₽2M/month = -₽12M
  Month 7-12: Burn ₽1M/month (revenue growing) = -₽6M
  End of Year 1 cash: ₽25M - ₽18M = ₽7M

Year 2: Profitable Month 18 → no more burn
```

**Recommendation:** Raise ₽20-30M seed to reach profitability comfortably

---

## 🎯 PHASE 6: Scenarios — 1 день

### 6.1 Base Case (Realistic)

**Assumptions:**
```yaml
Growth: As modeled (200 customers Year 1)
Churn: 3% monthly (steady state)
CAC: ₽50K Year 1, ₽40K Year 2
ARPC: ₽26.4K
Gross Margin: 20% → 45% → 60%

Results:
  Year 1 Revenue: ₽30M
  Year 2 Revenue: ₽150M
  Year 3 Revenue: ₽500M
  
  Profitability: Month 19
  Cash needed: ₽25M
```

---

### 6.2 Best Case (Optimistic)

**Assumptions:**
```yaml
Growth: 50% faster (viral growth, strong referrals)
Churn: 2% (product love!)
CAC: ₽30K (efficient channels)
ARPC: ₽30K (more enterprise, upsells)
Gross Margin: 30% → 55% → 70%

Results:
  Year 1 Revenue: ₽45M
  Year 2 Revenue: ₽250M
  Year 3 Revenue: ₽900M
  
  Profitability: Month 14
  Cash needed: ₽20M (less burn, faster to profit)
```

---

### 6.3 Worst Case (Conservative)

**Assumptions:**
```yaml
Growth: 50% slower (market resistance, competition)
Churn: 5% (product issues, poor fit)
CAC: ₽70K (expensive acquisition)
ARPC: ₽22K (price pressure)
Gross Margin: 10% → 30% → 45%

Results:
  Year 1 Revenue: ₽15M
  Year 2 Revenue: ₽70M
  Year 3 Revenue: ₽250M
  
  Profitability: Month 30
  Cash needed: ₽40M (longer runway)
```

---

### 6.4 Scenario Comparison

| Metric | Worst Case | Base Case | Best Case |
|--------|------------|-----------|-----------|
| Year 3 Revenue | ₽250M | ₽500M | ₽900M |
| Year 3 Customers | 700 | 2,000 | 4,000 |
| Profitability | Month 30 | Month 19 | Month 14 |
| Cash Needed | ₽40M | ₽25M | ₽20M |
| Year 3 Valuation | ₽2B | ₽5B | ₽10B+ |

**Output:** Scenarios tab в Excel с side-by-side comparison

---

## 📊 PHASE 7: Key Metrics & KPIs — 1 день

### 7.1 SaaS Metrics Dashboard

**Metrics to track monthly:**

```yaml
Growth Metrics:
  - MRR (Monthly Recurring Revenue)
  - ARR (Annual Recurring Revenue)
  - MRR Growth Rate (% MoM)
  - New MRR
  - Expansion MRR
  - Churned MRR
  - Net MRR Growth

Customer Metrics:
  - Total Customers
  - New Customers
  - Churned Customers
  - Net New Customers
  - Customer Growth Rate (% MoM)

Revenue Metrics:
  - ARPC (Average Revenue Per Customer)
  - ARPU (Average Revenue Per User)
  - Total Users
  - Revenue by Tier (Team, Business, Enterprise)
  - Revenue by Channel (Direct, Partner, etc)

Efficiency Metrics:
  - LTV (Lifetime Value)
  - CAC (Customer Acquisition Cost)
  - LTV:CAC Ratio
  - Payback Period (months)
  - Magic Number (New MRR / S&M Spend)

Retention Metrics:
  - Gross MRR Retention (%)
  - Net MRR Retention (%) - with expansion
  - Customer Retention Rate
  - Churn Rate (Monthly, Annual)
  - Logo Retention (% of customers)

Profitability Metrics:
  - Gross Margin (%)
  - EBITDA
  - EBITDA Margin (%)
  - Net Profit
  - Net Margin (%)
  - Rule of 40 (Growth Rate + Profit Margin)

Cash Flow Metrics:
  - Operating Cash Flow
  - Free Cash Flow
  - Cash Balance
  - Cash Runway (months)
```

---

### 7.2 Target KPIs by Stage

**Year 1 (Growth Focus):**
```yaml
Priority:
  1. New Customer Acquisition: 200+ customers
  2. Product-Market Fit: NPS > 50
  3. MRR Growth: 30%+ MoM
  4. Churn: < 5% monthly

Acceptable:
  - Negative EBITDA (investing in growth)
  - High CAC (learning & optimization)
  - Low Gross Margin (infrastructure fixed costs)
```

**Year 2 (Efficiency Focus):**
```yaml
Priority:
  1. Unit Economics: LTV:CAC > 3:1
  2. Payback Period: < 12 months
  3. Gross Margin: 40%+
  4. Path to Profitability: EBITDA positive by Q4

Targets:
  - MRR: ₽15M+ by end of year
  - Customers: 700+
  - Churn: < 3% monthly
  - Magic Number: > 0.75
```

**Year 3+ (Scale & Profitability):**
```yaml
Priority:
  1. Rule of 40: Growth% + EBITDA Margin% > 40
  2. Net MRR Retention: > 100% (expansion > churn)
  3. CAC Payback: < 6 months
  4. Net Margin: 20%+

Targets:
  - ARR: ₽500M+
  - Customers: 2,000+
  - Gross Margin: 60%+
  - EBITDA Margin: 30%+
```

---

### 7.3 Cohort Analysis

**Задача:** Отслеживать retention и revenue по когортам

**Setup:**
```yaml
Cohorts by month of acquisition:
  Jan 2026 cohort: 10 customers
  Feb 2026 cohort: 12 customers
  Mar 2026 cohort: 15 customers
  ...

Track for each cohort:
  Month 0: 100% retention, ₽264K MRR
  Month 1: 95% retention, ₽251K MRR
  Month 3: 90% retention, ₽238K MRR
  Month 6: 85% retention, ₽224K MRR
  Month 12: 80% retention, ₽211K MRR
  Month 24: 75% retention, ₽198K MRR

Also track expansion:
  Month 12: +15% revenue (upsells, more users)
  Month 24: +30% revenue
  
  Net retention: 92% after expansion (excellent!)
```

**Output:** Cohort Analysis tab в Excel

---

## 🔧 PHASE 8: Build the Model — 3-5 дней

### 8.1 Excel/Google Sheets Structure

**Tabs:**
```
1. Dashboard (Summary)
2. Assumptions
3. Customer Forecast
4. MRR Build-up
5. Revenue Detail
6. COGS Detail
7. OpEx Detail
8. P&L (Monthly Year 1-2)
9. P&L (Quarterly Year 3-5)
10. Cash Flow
11. Balance Sheet
12. Unit Economics
13. Cohort Analysis
14. Scenarios
15. Charts & Graphs
```

---

### 8.2 Key Formulas & Links

**Best Practices:**
```yaml
Color Coding:
  Blue cells: Inputs (assumptions)
  Black cells: Formulas (calculations)
  Green cells: Outputs (results)

Validation:
  Check totals match (revenue = sum of all sources)
  Check P&L → Cash Flow → Balance Sheet links
  Sanity checks (e.g., churn < 100%)

Flexibility:
  Use named ranges for key assumptions
  Easy to update and scenario-test
  Link scenarios to toggle assumptions
```

---

### 8.3 Visualization

**Key Charts:**
```yaml
1. MRR Growth (line chart)
2. Customer Growth (line chart)
3. Revenue by Tier (stacked bar)
4. P&L Waterfall (revenue → costs → profit)
5. Cash Flow (line chart)
6. Unit Economics (LTV, CAC, Payback)
7. Cohort Retention Heatmap
8. Scenario Comparison (clustered bar)
```

---

## 📋 PHASE 9: Validation & Review — 1-2 дня

### 9.1 Internal Review

**Questions to answer:**
```yaml
1. Do the numbers make sense?
   - Is growth realistic?
   - Are costs complete?
   - Is profitability achievable?

2. Are assumptions validated?
   - Pricing confirmed with 10 presentations ✅
   - CAC estimated from sales process ✅
   - Churn benchmarked vs industry ✅

3. Sensitivity tested?
   - What if growth is 50% slower?
   - What if churn is 5% instead of 3%?
   - What if we can't negotiate COGS down?

4. Cash runway sufficient?
   - Do we have enough runway to profitability?
   - When do we need to raise next round?

5. Return on investment?
   - For founders (opportunity cost)
   - For investors (IRR, multiple)
```

---

### 9.2 External Review (Optional)

**Advisors to consult:**
```yaml
1. Financial Advisor / CFO
   - Review model structure
   - Validate formulas
   - Benchmark vs industry

2. Industry Expert (Agency owner, SaaS founder)
   - Reality-check growth assumptions
   - Validate cost structure
   - Sanity-check unit economics

3. Investor (if seeking funding)
   - Present model
   - Get feedback on assumptions
   - Understand what they look for
```

---

## 📊 PHASE 10: Business Plan Integration — 1-2 дня

### 10.1 Executive Summary

**Extract from model:**
```yaml
Market Opportunity:
  TAM: $300M global, $50M Russia
  SOM: 10% by Year 5 = $3M ARR

Business Model:
  SaaS, subscription-based
  3 tiers: Team, Business, Enterprise
  ARPC: ₽26,400/month

Financial Highlights:
  Year 1: ₽30M revenue, -₽27M loss
  Year 2: ₽150M revenue, ₽18M profit
  Year 3: ₽500M revenue, ₽220M profit (35% margin)
  
  LTV:CAC Ratio: 10:1 (Year 2)
  Payback Period: 3 months (Year 2)
  
  Cash needed: ₽25M (to profitability)
  Break-even: Month 19

Investment Ask:
  ₽20M Seed Round
  Use of funds:
    - R&D (50%): ₽10M
    - Sales & Marketing (35%): ₽7M
    - Operations (15%): ₽3M
  
  Milestones:
    - Month 12: 160 customers, ₽4M MRR
    - Month 18: 400 customers, ₽10M MRR, break-even
    - Month 24: 700+ customers, ₽18M+ MRR, profitable

Return:
  Year 3 Revenue: ₽500M
  Valuation (5x revenue): ₽2.5B
  Investor stake: 20% for ₽20M
  Year 3 value: ₽500M (25x return in 3 years)
```

---

### 10.2 Supporting Sections

**Update these docs with financial model outputs:**
```yaml
1. Pricing Strategy (11_BUSINESS/Pricing_Strategy.md)
   - Add unit economics validation
   - Add ROI calculations per tier

2. Go-to-Market (Sales_Process_And_Demo.md)
   - Add CAC targets
   - Add revenue targets per sales rep

3. MVP Spec (MVP_TECHNICAL_SPECIFICATION.md)
   - Add cost breakdown
   - Validate infrastructure costs

4. Roadmap (Roadmap.md)
   - Align milestones with financial targets
   - Add hiring plan (linked to revenue)
```

---

## ✅ Deliverables Checklist

**Financial Model (Excel/Google Sheets):**
- [ ] Assumptions tab (market, pricing, sales, costs)
- [ ] Customer Forecast (monthly, by tier)
- [ ] MRR/ARR Build-up (with cohorts)
- [ ] Revenue Detail (breakdown by source)
- [ ] COGS Detail (per customer, scaled)
- [ ] OpEx Detail (R&D, S&M, G&A by month)
- [ ] P&L (monthly Year 1-2, quarterly Year 3-5)
- [ ] Cash Flow (operating, investing, financing)
- [ ] Balance Sheet (assets, liabilities, equity)
- [ ] Unit Economics (LTV, CAC, ratios, payback)
- [ ] Cohort Analysis (retention, expansion)
- [ ] Scenarios (base, best, worst)
- [ ] Charts & Dashboard (visual summary)

**Documentation (Markdown):**
- [ ] Financial Model Overview (this document updated with results)
- [ ] Unit Economics Summary (LTV, CAC, margins)
- [ ] Funding Requirements (if raising)
- [ ] Use of Funds (allocation plan)
- [ ] Financial Milestones (targets by quarter)
- [ ] Integration with existing docs (pricing, roadmap, etc)

**Presentation (Optional):**
- [ ] Investor Deck with financial slides
- [ ] 1-pager financial summary (for quick reference)

---

## 🚀 Timeline Summary

| Phase | Task | Duration | Owner |
|-------|------|----------|-------|
| 1 | Assumptions | 1-2 days | Founder + CFO |
| 2 | Revenue Model | 2-3 days | Finance Team |
| 3 | Unit Economics | 1 day | Finance Team |
| 4 | P&L | 2-3 days | Finance Team |
| 5 | Cash Flow | 1-2 days | Finance Team |
| 6 | Scenarios | 1 day | Finance Team |
| 7 | Metrics & KPIs | 1 day | Finance Team |
| 8 | Build Model | 3-5 days | Finance Team |
| 9 | Validation | 1-2 days | Founder + Advisors |
| 10 | Business Plan | 1-2 days | Founder |

**Total: 14-21 days (3-4 weeks)**

---

## 💡 Best Practices

### Do's:
✅ Start with validated assumptions (we have pricing, sales process!)
✅ Be conservative in base case (better to exceed)
✅ Model scenarios (best, base, worst)
✅ Link everything (P&L → Cash Flow → Balance Sheet)
✅ Visualize (charts for key metrics)
✅ Review with experts (financial advisor, industry)
✅ Update regularly (quarterly at minimum)

### Don'ts:
❌ Hockey stick projections without justification
❌ Ignore churn (it will happen!)
❌ Forget about COGS (SaaS has real costs!)
❌ Over-complicate (keep it simple, understandable)
❌ Set and forget (model should evolve with business)

---

## 📚 Resources & Templates

### Templates:
- SaaS Financial Model Template (Google Sheets)
- Christoph Janz SaaS Financial Model
- Baremetrics Open Startups (for benchmarking)

### Benchmarks:
- SaaS Capital: SaaS Metrics Report
- OpenView: SaaS Benchmarks
- KeyBanc: Private SaaS Company Survey

### Tools:
- Excel / Google Sheets (for model)
- ChartMogul / Baremetrics (for SaaS metrics tracking)
- ProfitWell (for retention analysis)

---

## 🎯 Success Criteria

**Financial Model is COMPLETE when:**
1. ✅ All assumptions validated and documented
2. ✅ Revenue projections realistic and achievable
3. ✅ Costs complete (no surprises later)
4. ✅ Unit economics strong (LTV:CAC > 3:1)
5. ✅ Path to profitability clear (Month 19 base case)
6. ✅ Cash needs defined (₽25M to profitability)
7. ✅ Scenarios modeled (understand risks)
8. ✅ Charts & visuals compelling
9. ✅ Reviewed by advisor/expert
10. ✅ Ready for investors/partners presentation

---

## 🚀 Next Steps

**Week 1-2: Build Model**
1. Gather all assumptions (use existing docs!)
2. Build revenue model (MRR, customers, tiers)
3. Build cost model (COGS, OpEx)
4. Link P&L, Cash Flow, Balance Sheet

**Week 3: Validate & Refine**
5. Calculate unit economics (LTV, CAC, ratios)
6. Model scenarios (best, base, worst)
7. Create dashboard & charts
8. Internal review (founder team)

**Week 4: Finalize**
9. External review (advisor, industry expert)
10. Integrate into business plan
11. Prepare investor materials (if needed)
12. Set up tracking (link to actual financials)

---

**Let's build a world-class financial model! 🚀**

---

**Версия:** 1.0  
**Дата:** 24 октября 2025  
**Статус:** ✅ Ready to execute  
**Owner:** Founder / CFO  
**Timeline:** 3-4 weeks  
**Output:** Complete Financial Model + Business Plan Integration

