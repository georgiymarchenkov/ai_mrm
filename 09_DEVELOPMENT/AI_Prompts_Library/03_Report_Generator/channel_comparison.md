---
tenant_id: mrm
client_id: global
project_id: prompts_library
artifact_type: prompt
title: AI Prompt — Channel Performance Comparison
language: ru
industry: advertising
role_apply: [analyst, media_planner]
period: 2025-10
version: "1.0"
source_path: 09_DEVELOPMENT/AI_Prompts_Library/03_Report_Generator/channel_comparison.md
effective_date: 2025-10-24
visibility: internal
security_level: low
tags: [reporting, channel_comparison]
---

# AI Prompt: Channel Performance Comparison

## Назначение
Промпт для автоматического сравнения эффективности разных рекламных каналов и генерации рекомендаций по перераспределению бюджета.

---

## Промпт: Сравнительный анализ каналов

**Роль:** Ты - AI-аналитик, специализирующийся на performance-анализе рекламных кампаний. Твоя задача - сравнить эффективность разных каналов, выявить лидеров и аутсайдеров, и дать рекомендации по оптимизации бюджета.

**Задача:** На основе данных о performance каналов за отчетный период создать структурированный сравнительный анализ с визуализацией и конкретными рекомендациями.

### Входные данные:

```json
{
  "reporting_period": {
    "start_date": "2025-10-01",
    "end_date": "2025-10-31",
    "period_name": "Октябрь 2025"
  },
  
  "campaign_context": {
    "client_name": "FinTech Startup",
    "campaign_name": "InvestSmart App Launch",
    "primary_objective": "App Installs",
    "total_budget": 4000000,
    "target_cpa": 300
  },
  
  "channels_performance": [
    {
      "channel_name": "Яндекс.Директ",
      "format": "Поиск + РСЯ",
      "budget": {
        "planned": 1800000,
        "spent": 1750000,
        "spent_percentage": 97.2
      },
      "performance": {
        "impressions": 5200000,
        "clicks": 156000,
        "ctr": 3.0,
        "conversions": 5833, // Установки
        "cr": 3.74,
        "cpa": 300,
        "cpc": 11.22
      },
      "breakdown_by_format": [
        {
          "format": "Поиск",
          "budget_spent": 1200000,
          "impressions": 2400000,
          "clicks": 96000,
          "ctr": 4.0,
          "conversions": 4000,
          "cpa": 300
        },
        {
          "format": "РСЯ",
          "budget_spent": 550000,
          "impressions": 2800000,
          "clicks": 60000,
          "ctr": 2.14,
          "conversions": 1833,
          "cpa": 300
        }
      ]
    },
    {
      "channel_name": "VK Ads",
      "format": "Таргет + Stories",
      "budget": {
        "planned": 1400000,
        "spent": 1380000,
        "spent_percentage": 98.6
      },
      "performance": {
        "impressions": 8600000,
        "clicks": 129000,
        "ctr": 1.5,
        "conversions": 3870,
        "cr": 3.0,
        "cpa": 357,
        "cpc": 10.70
      },
      "breakdown_by_format": [
        {
          "format": "Таргет (Фид)",
          "budget_spent": 900000,
          "impressions": 5400000,
          "clicks": 81000,
          "ctr": 1.5,
          "conversions": 2430,
          "cpa": 370
        },
        {
          "format": "Stories",
          "budget_spent": 480000,
          "impressions": 3200000,
          "clicks": 48000,
          "ctr": 1.5,
          "conversions": 1440,
          "cpa": 333
        }
      ]
    },
    {
      "channel_name": "Influencer Marketing",
      "format": "YouTube + Telegram",
      "budget": {
        "planned": 800000,
        "spent": 800000,
        "spent_percentage": 100.0
      },
      "performance": {
        "impressions": 1500000, // Reach блогеров
        "clicks": 30000, // Переходы по ссылкам
        "ctr": 2.0,
        "conversions": 2667,
        "cr": 8.89,
        "cpa": 300,
        "cpc": 26.67
      },
      "breakdown_by_format": [
        {
          "format": "YouTube",
          "budget_spent": 500000,
          "impressions": 1000000,
          "clicks": 20000,
          "ctr": 2.0,
          "conversions": 1667,
          "cpa": 300
        },
        {
          "format": "Telegram",
          "budget_spent": 300000,
          "impressions": 500000,
          "clicks": 10000,
          "ctr": 2.0,
          "conversions": 1000,
          "cpa": 300
        }
      ]
    }
  ],
  
  "previous_period_comparison": { // Опционально
    "period_name": "Сентябрь 2025",
    "channels_performance": [
      {"channel_name": "Яндекс.Директ", "cpa": 320, "conversions": 5000},
      {"channel_name": "VK Ads", "cpa": 380, "conversions": 3500}
    ]
  },
  
  "benchmarks": { // Опционально: бенчмарки по индустрии
    "industry": "FinTech / Mobile Apps",
    "average_cpa": 350,
    "average_ctr": 2.0,
    "average_cr": 3.5
  }
}
```

### Структура анализа:

1. **Executive Summary**
2. **Общий performance всех каналов**
3. **Сравнение каналов по ключевым метрикам**
4. **Анализ эффективности (Cost Efficiency)**
5. **Quality Score (качество трафика)**
6. **Тренды и динамика** (если есть данные за предыдущие периоды)
7. **Лидеры и аутсайдеры**
8. **Рекомендации по оптимизации**

### Формат ответа (JSON + Markdown):

```json
{
  "summary": {
    "total_spent": 3930000,
    "total_conversions": 12370,
    "average_cpa": 318,
    "vs_target_cpa": "+6.0%", // CPA выше целевого на 6%
    "best_channel": "Influencer Marketing", // По CPA
    "worst_channel": "VK Ads", // По CPA
    "key_insight": "Яндекс.Директ (Поиск) и Influencer Marketing достигли целевого CPA 300 ₽, VK Ads перерасход на 19%"
  },
  
  "channels_comparison": {
    "by_volume": {
      "leader": {
        "channel": "Яндекс.Директ",
        "conversions": 5833,
        "share": 47.1 // % от total conversions
      },
      "top3": [
        {"channel": "Яндекс.Директ", "conversions": 5833, "share": 47.1},
        {"channel": "VK Ads", "conversions": 3870, "share": 31.3},
        {"channel": "Influencer Marketing", "conversions": 2667, "share": 21.6}
      ]
    },
    
    "by_efficiency": {
      "leader": {
        "channel": "Influencer Marketing",
        "cpa": 300,
        "vs_target": "0%",
        "quality_score": 9.2 // Из 10
      },
      "ranking": [
        {"channel": "Influencer Marketing", "cpa": 300, "efficiency_index": 1.00},
        {"channel": "Яндекс.Директ", "cpa": 300, "efficiency_index": 1.00},
        {"channel": "VK Ads", "cpa": 357, "efficiency_index": 0.84}
      ]
    },
    
    "by_scale_potential": {
      "leader": {
        "channel": "VK Ads",
        "reason": "Highest impressions (8.6M), room to optimize CPA and scale",
        "potential_additional_conversions": 1500
      },
      "ranking": [
        {"channel": "VK Ads", "scale_score": 8.5},
        {"channel": "Яндекс.Директ", "scale_score": 7.0},
        {"channel": "Influencer Marketing", "scale_score": 6.0}
      ]
    }
  },
  
  "detailed_comparison_table": [
    {
      "channel": "Яндекс.Директ",
      "budget_spent": 1750000,
      "budget_share": 44.5,
      "conversions": 5833,
      "conversions_share": 47.1,
      "cpa": 300,
      "vs_target_cpa": 0.0,
      "ctr": 3.0,
      "cr": 3.74,
      "cpc": 11.22,
      "efficiency_index": 1.00, // Target CPA / Actual CPA
      "quality_score": 8.5,
      "grade": "A" // A, B, C, D, F
    },
    {
      "channel": "VK Ads",
      "budget_spent": 1380000,
      "budget_share": 35.1,
      "conversions": 3870,
      "conversions_share": 31.3,
      "cpa": 357,
      "vs_target_cpa": 19.0,
      "ctr": 1.5,
      "cr": 3.0,
      "cpc": 10.70,
      "efficiency_index": 0.84,
      "quality_score": 6.8,
      "grade": "C"
    },
    {
      "channel": "Influencer Marketing",
      "budget_spent": 800000,
      "budget_share": 20.4,
      "conversions": 2667,
      "conversions_share": 21.6,
      "cpa": 300,
      "vs_target_cpa": 0.0,
      "ctr": 2.0,
      "cr": 8.89, // Highest CR!
      "cpc": 26.67,
      "efficiency_index": 1.00,
      "quality_score": 9.2, // Highest quality
      "grade": "A+"
    }
  ],
  
  "cost_efficiency_analysis": {
    "most_cost_effective": {
      "channel": "Influencer Marketing",
      "reason": "Lowest CPA (300 ₽) with highest CR (8.89%)",
      "cost_per_1000_impressions": 533 // Budget / (Impressions / 1000)
    },
    "least_cost_effective": {
      "channel": "VK Ads",
      "reason": "CPA 19% above target, lowest CR (3.0%)",
      "cost_per_1000_impressions": 160
    },
    "breakdown": [
      {
        "channel": "Яндекс.Директ",
        "cpm_equivalent": 337,
        "cost_per_click": 11.22,
        "cost_per_conversion": 300,
        "value_score": 8.0 // Из 10
      },
      {
        "channel": "VK Ads",
        "cpm_equivalent": 160,
        "cost_per_click": 10.70,
        "cost_per_conversion": 357,
        "value_score": 6.5
      },
      {
        "channel": "Influencer Marketing",
        "cpm_equivalent": 533,
        "cost_per_click": 26.67,
        "cost_per_conversion": 300,
        "value_score": 9.5 // Высокое качество трафика компенсирует высокий CPC
      }
    ]
  },
  
  "quality_score_analysis": {
    "methodology": "Quality Score = weighted average of CTR (30%), CR (40%), CPA vs Target (30%)",
    "channels": [
      {
        "channel": "Influencer Marketing",
        "quality_score": 9.2,
        "components": {
          "ctr_score": 8.0, // 2.0% vs benchmark 2.0%
          "cr_score": 10.0, // 8.89% vs benchmark 3.5% - значительно выше!
          "cpa_score": 10.0 // CPA = Target
        },
        "interpretation": "Excellent quality. Best converting traffic."
      },
      {
        "channel": "Яндекс.Директ",
        "quality_score": 8.5,
        "components": {
          "ctr_score": 10.0, // 3.0% vs benchmark 2.0%
          "cr_score": 8.5, // 3.74% vs benchmark 3.5%
          "cpa_score": 10.0
        },
        "interpretation": "High quality. Strong performance across metrics."
      },
      {
        "channel": "VK Ads",
        "quality_score": 6.8,
        "components": {
          "ctr_score": 5.0, // 1.5% vs benchmark 2.0%
          "cr_score": 6.0, // 3.0% vs benchmark 3.5%
          "cpa_score": 4.2 // CPA 19% above target
        },
        "interpretation": "Medium quality. Needs optimization to improve conversion rate and lower CPA."
      }
    ]
  },
  
  "trends_and_dynamics": { // Если есть данные за предыдущий период
    "Яндекс.Директ": {
      "cpa_change": -20, // ₽
      "cpa_change_percentage": -6.25, // % (было 320, стало 300)
      "conversions_change": 833,
      "conversions_change_percentage": 16.66,
      "trend": "Improving", // Improving, Stable, Declining
      "note": "CPA снизился на 6.25%, volume вырос на 16.66%. Оптимизация работает."
    },
    "VK Ads": {
      "cpa_change": -23,
      "cpa_change_percentage": -6.05,
      "conversions_change": 370,
      "conversions_change_percentage": 10.57,
      "trend": "Improving",
      "note": "CPA снижается, но все еще выше target. Требуется дальнейшая оптимизация."
    }
  },
  
  "leaders_and_laggards": {
    "leaders": [
      {
        "channel": "Influencer Marketing",
        "why": "Лучший Quality Score (9.2), CPA на уровне target, высочайший CR (8.89%)",
        "strength": "Качество трафика",
        "recommendation": "Увеличить бюджет на +30-50%"
      },
      {
        "channel": "Яндекс.Директ (Поиск)",
        "why": "CPA на target (300 ₽), высокий CTR (4.0%), стабильная конверсия",
        "strength": "High intent трафик",
        "recommendation": "Продолжить текущую стратегию, тестировать новые ключевики"
      }
    ],
    "laggards": [
      {
        "channel": "VK Ads (Таргет)",
        "why": "CPA 23% выше target (370 ₽), низкий CTR (1.5%), низкий CR (3.0%)",
        "weakness": "Низкое качество трафика, неоптимальный таргетинг",
        "recommendation": "Пересмотреть аудитории, отключить неэффективные сегменты, тестировать новые креативы"
      },
      {
        "channel": "Яндекс.Директ (РСЯ)",
        "why": "CPA на target, но низкий CTR (2.14%) и CR по сравнению с Поиском",
        "weakness": "Менее релевантный трафик",
        "recommendation": "Ограничить бюджет РСЯ, перераспределить в Поиск"
      }
    ]
  },
  
  "optimization_recommendations": [
    {
      "priority": "High",
      "action": "Увеличить бюджет Influencer Marketing на 400K ₽ (с 800K до 1.2M)",
      "rationale": "Лучший Quality Score (9.2) и CR (8.89%), CPA на target. Есть потенциал масштабирования.",
      "expected_impact": {
        "additional_conversions": 1333,
        "total_conversions_from_channel": 4000,
        "overall_cpa_improvement": "-3.5%"
      },
      "source_of_budget": "Снизить VK Ads Таргет на 200K, Директ РСЯ на 200K"
    },
    {
      "priority": "High",
      "action": "Оптимизировать VK Ads: отключить 30% худших аудиторий, перераспределить бюджет в Stories",
      "rationale": "Stories показывает лучший CPA (333 ₽) vs Таргет (370 ₽). Отключение худших сегментов снизит общий CPA.",
      "expected_impact": {
        "cpa_improvement": "-10% (357 → 321 ₽)",
        "conversions_change": "-5% (но CPA ближе к target)"
      }
    },
    {
      "priority": "Medium",
      "action": "Перераспределить бюджет внутри Яндекс.Директ: +200K в Поиск, -200K из РСЯ",
      "rationale": "Поиск имеет CTR 4.0% vs РСЯ 2.14%, и более качественный трафик.",
      "expected_impact": {
        "additional_conversions": 133,
        "overall_cpa_improvement": "-1.2%"
      }
    },
    {
      "priority": "Low",
      "action": "A/B тест новых креативов для VK Ads (фокус на обучающий контент и низкий порог входа)",
      "rationale": "Текущий CR (3.0%) ниже Influencer (8.89%), возможно креативы недостаточно убедительные.",
      "expected_impact": {
        "potential_cr_improvement": "+0.5-1.0%",
        "cpa_improvement": "-5 to -10%"
      }
    }
  ],
  
  "reallocation_scenario": {
    "current_allocation": {
      "Яндекс.Директ": 1750000,
      "VK Ads": 1380000,
      "Influencer Marketing": 800000
    },
    "optimized_allocation": {
      "Яндекс.Директ": 1750000, // Без изменений (перераспределение внутри Поиск/РСЯ)
      "VK Ads": 1180000, // -200K
      "Influencer Marketing": 1200000 // +400K
    },
    "expected_results": {
      "current_total_conversions": 12370,
      "optimized_total_conversions": 13703, // +1333 conversions (+10.8%)
      "current_average_cpa": 318,
      "optimized_average_cpa": 287, // -9.7% (closer to target 300 ₽)
    }
  },
  
  "summary_markdown": "..." // См. ниже
}
```

### Summary в Markdown:

```markdown
# Сравнительный анализ эффективности каналов
## FinTech Startup - InvestSmart App Launch | Октябрь 2025

---

## Executive Summary

**Общие результаты:**
- Потрачено: **3,930,000 ₽** (98.3% от плана 4M ₽)
- Получено: **12,370 установок**
- Средний CPA: **318 ₽** (+6.0% vs target 300 ₽)

**Ключевой инсайт:**  
Яндекс.Директ (Поиск) и Influencer Marketing достигли целевого CPA 300 ₽, VK Ads показал перерасход на 19%. **Influencer Marketing** имеет лучший Quality Score (9.2/10) и наивысший CR (8.89%), что делает его приоритетным каналом для масштабирования.

---

## Сравнение каналов: Top-3 по объему

| Канал | Бюджет | Конверсии | Доля | CPA | vs Target |
|-------|--------|-----------|------|-----|-----------|
| **Яндекс.Директ** | 1,750,000 ₽ | **5,833** | 47.1% | 300 ₽ | ✅ 0% |
| **VK Ads** | 1,380,000 ₽ | **3,870** | 31.3% | 357 ₽ | ⚠️ +19% |
| **Influencer Marketing** | 800,000 ₽ | **2,667** | 21.6% | 300 ₽ | ✅ 0% |

---

## Детальное сравнение по метрикам

| Канал | Budget | Conversions | CPA | CTR | CR | CPC | Quality Score | Grade |
|-------|--------|-------------|-----|-----|----|----|---------------|-------|
| Яндекс.Директ | 1,750K ₽ | 5,833 | **300 ₽** | 3.0% | 3.74% | 11.22 ₽ | 8.5 | **A** |
| VK Ads | 1,380K ₽ | 3,870 | **357 ₽** | 1.5% | 3.0% | 10.70 ₽ | 6.8 | **C** |
| Influencer | 800K ₽ | 2,667 | **300 ₽** | 2.0% | **8.89%** 🔥 | 26.67 ₽ | **9.2** | **A+** |

### Цветовая кодировка:
- 🟢 **A/A+:** CPA на target или ниже, высокий Quality Score
- 🟡 **B:** CPA близок к target (±10%), средний Quality Score
- 🟠 **C:** CPA выше target на 10-20%, требуется оптимизация
- 🔴 **D/F:** CPA >20% выше target, критические проблемы

---

## Анализ эффективности (Cost Efficiency)

### 🏆 Лидер: Influencer Marketing
- **CPA:** 300 ₽ (= target) ✅
- **CR:** 8.89% (в 2.4x выше среднего по индустрии!) 🔥
- **Quality Score:** 9.2 / 10
- **Вывод:** Лучшее качество трафика. Высокая конверсия компенсирует высокий CPC (26.67 ₽).

### 🥈 2-е место: Яндекс.Директ (особенно Поиск)
- **CPA:** 300 ₽ (= target) ✅
- **CR:** 3.74% (выше среднего)
- **CTR:** 3.0% (хорошо)
- **Поиск vs РСЯ:**
  - Поиск: CTR 4.0%, лучшее качество трафика
  - РСЯ: CTR 2.14%, менее релевантный трафик

### ⚠️ Отстающий: VK Ads
- **CPA:** 357 ₽ (+19% vs target) ⚠️
- **CR:** 3.0% (ниже среднего)
- **CTR:** 1.5% (низкий)
- **Проблема:** Низкое качество трафика, возможно неоптимальный таргетинг или креативы.
- **Светлое пятно:** Stories (CPA 333 ₽) лучше, чем Таргет (CPA 370 ₽).

---

## Quality Score: Качество трафика

**Методология:** Quality Score = взвешенная оценка CTR (30%), CR (40%), CPA vs Target (30%)

| Канал | Quality Score | CTR Score | CR Score | CPA Score | Интерпретация |
|-------|---------------|-----------|----------|-----------|---------------|
| **Influencer** | **9.2** | 8.0 | **10.0** 🔥 | 10.0 | Excellent quality. Best converting traffic. |
| Яндекс.Директ | 8.5 | 10.0 | 8.5 | 10.0 | High quality. Strong performance across metrics. |
| VK Ads | 6.8 | 5.0 | 6.0 | 4.2 | Medium quality. Needs optimization. |

**Вывод:** Influencer Marketing приносит самый качественный трафик с CR 8.89% (в 3x выше VK Ads!).

---

## Тренды и динамика (vs Сентябрь 2025)

| Канал | CPA (Сент) | CPA (Окт) | Изменение | Conversions Δ | Тренд |
|-------|------------|-----------|-----------|---------------|-------|
| Яндекс.Директ | 320 ₽ | **300 ₽** | **-6.25%** 📉 | +833 (+16.7%) | ✅ Improving |
| VK Ads | 380 ₽ | **357 ₽** | **-6.05%** 📉 | +370 (+10.6%) | ⚠️ Improving, но все еще выше target |

**Выводы:**
- Оба канала показывают положительную динамику (CPA снижается).
- Яндекс.Директ достиг target CPA, VK Ads еще требует оптимизации.

---

## Лидеры и аутсайдеры

### 🏆 Лидеры:

#### 1. Influencer Marketing
- **Почему:** Лучший Quality Score (9.2), CPA на уровне target, высочайший CR (8.89%)
- **Сила:** Качество трафика
- **Рекомендация:** ✅ **Увеличить бюджет на +50%** (с 800K до 1.2M ₽)

#### 2. Яндекс.Директ (Поиск)
- **Почему:** CPA на target (300 ₽), высокий CTR (4.0%), стабильная конверсия
- **Сила:** High intent трафик
- **Рекомендация:** ✅ Продолжить текущую стратегию, тестировать новые ключевики

---

### ⚠️ Аутсайдеры:

#### 1. VK Ads (Таргет)
- **Почему:** CPA 23% выше target (370 ₽), низкий CTR (1.5%), низкий CR (3.0%)
- **Слабость:** Низкое качество трафика, неоптимальный таргетинг
- **Рекомендация:** 🔧 **Пересмотреть аудитории, отключить неэффективные сегменты**

#### 2. Яндекс.Директ (РСЯ)
- **Почему:** CPA на target, но низкий CTR (2.14%) и CR по сравнению с Поиском
- **Слабость:** Менее релевантный трафик
- **Рекомендация:** 🔧 Ограничить бюджет РСЯ, перераспределить в Поиск

---

## ТОП-4 Рекомендации по оптимизации

### 1. Увеличить бюджет Influencer Marketing (**High Priority**)
**Действие:** +400K ₽ (с 800K до 1.2M ₽)  
**Обоснование:** Лучший Quality Score (9.2) и CR (8.89%), CPA на target. Есть потенциал масштабирования.  
**Ожидаемый эффект:**
- +1,333 конверсий
- Общий CPA снизится с 318 ₽ до 310 ₽ (-2.5%)

**Источник бюджета:** Снизить VK Ads Таргет на 200K ₽, Директ РСЯ на 200K ₽

---

### 2. Оптимизировать VK Ads (**High Priority**)
**Действие:** Отключить 30% худших аудиторий, перераспределить бюджет в Stories  
**Обоснование:** Stories показывает лучший CPA (333 ₽) vs Таргет (370 ₽).  
**Ожидаемый эффект:**
- CPA улучшится на 10%: 357 → 321 ₽
- Conversions могут снизиться на 5%, но CPA будет ближе к target

---

### 3. Перераспределить бюджет внутри Директ (**Medium Priority**)
**Действие:** +200K в Поиск, -200K из РСЯ  
**Обоснование:** Поиск имеет CTR 4.0% vs РСЯ 2.14%, и более качественный трафик.  
**Ожидаемый эффект:**
- +133 конверсий
- Общий CPA улучшится на 1.2%

---

### 4. A/B тест новых креативов для VK Ads (**Low Priority**)
**Действие:** Протестировать креативы с фокусом на обучающий контент и низкий порог входа (1000 ₽)  
**Обоснование:** Текущий CR (3.0%) значительно ниже Influencer (8.89%), возможно креативы недостаточно убедительные.  
**Ожидаемый эффект:**
- Потенциальное улучшение CR на 0.5-1.0%
- CPA может снизиться на 5-10%

---

## Сценарий перераспределения бюджета

### Текущее распределение:
- Яндекс.Директ: 1,750,000 ₽ (44.5%)
- VK Ads: 1,380,000 ₽ (35.1%)
- Influencer: 800,000 ₽ (20.4%)

### Оптимизированное распределение:
- Яндекс.Директ: **1,750,000 ₽** (44.5%) — без изменений, но перераспределение внутри (больше в Поиск)
- VK Ads: **1,180,000 ₽** (30.0%) — **-200K ₽** (-14.5%)
- Influencer: **1,200,000 ₽** (30.5%) — **+400K ₽** (+50%) 🚀

### Прогнозируемые результаты:

| Метрика | Текущее | Оптимизированное | Изменение |
|---------|---------|------------------|-----------|
| Total Conversions | 12,370 | **13,703** | **+1,333 (+10.8%)** 🔥 |
| Average CPA | 318 ₽ | **287 ₽** | **-31 ₽ (-9.7%)** 📉 |
| % vs Target CPA | +6.0% | **-4.3%** | **Ниже target!** ✅ |

---

## Выводы

1. **Influencer Marketing** — звезда кампании с лучшим Quality Score (9.2) и CR (8.89%). Масштабировать.
2. **Яндекс.Директ (Поиск)** — стабильный и эффективный канал. Продолжать текущую стратегию.
3. **VK Ads** — требует оптимизации. Отключить худшие аудитории, сфокусироваться на Stories.
4. **Перераспределение бюджета** может дать +10.8% conversions и снизить CPA до 287 ₽ (ниже target).

**Next Steps:**
- Согласовать с клиентом перераспределение бюджета
- Запустить оптимизацию VK Ads (отключение худших сегментов)
- Найти дополнительных блогеров для Influencer Marketing
- A/B тест новых креативов для VK

---

*Анализ подготовлен AI Channel Comparison Tool*  
*Дата: 23.10.2025*
```

### Инструкции по генерации:

1. **Будь объективным:** Не приукрашивай данные. Если канал показывает плохие результаты, четко это укажи.

2. **Используй визуальные элементы:** Эмодзи для оценок (✅, ⚠️, 🔥), цветовая кодировка (A/B/C/D/F grades).

3. **Конкретные рекомендации:** Каждая рекомендация должна включать:
   - Что делать
   - Почему это нужно
   - Ожидаемый эффект (в цифрах)

4. **Quality Score:** Используй комплексную оценку качества трафика, а не только CPA.

5. **Сравнивай:** Всегда сравнивай с target, бенчмарками, предыдущими периодами.

6. **Prioritize:** Указывай приоритет рекомендаций (High/Medium/Low).

### Тон и стиль:
- Аналитический, объективный, data-driven.
- Конкретные цифры и проценты.
- Actionable рекомендации.
- Визуально структурированный (таблицы, списки).

**Верни JSON + Markdown-отчет.**

---

## Версия
- **Версия промпта:** 1.0
- **Дата создания:** 2025-10-23
- **Автор:** MRM AI Team
- **LLM:** Claude Sonnet 3.5 / GPT-4

