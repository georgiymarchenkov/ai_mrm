---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: research_doc
title: Инструменты и возможности MRM AI платформы
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: 12_RESEARCH/Tools/Platform_Tools_And_Instruments.md
effective_date: 2025-10-24
visibility: internal
security_level: low
tags: [research, analysis]
---

# Инструменты и возможности MRM AI платформы

## 📋 Содержание
- [Аналитические инструменты](#аналитические-инструменты)
- [Инструменты медиапланирования](#инструменты-медиапланирования)
- [AI-ассистенты](#ai-ассистенты)
- [Инструменты автоматизации](#инструменты-автоматизации)
- [Интеграции](#интеграции)

---

## 📊 АНАЛИТИЧЕСКИЕ ИНСТРУМЕНТЫ

### 1. ЭКОНОМЕТРИКА И МЕДИАМИКС МОДЕЛИРОВАНИЕ (CUBE)

> **Источник:** `CUBE_моделирование.pptx`
> 
> **Статус:** 🔄 Требуется анализ презентации
> 
> **Запрос:** Пожалуйста, предоставьте скриншоты ключевых слайдов или опишите:
> - Что такое CUBE в контексте медиамикс моделирования?
> - Какие методологии используются?
> - Какие данные требуются для построения моделей?
> - Как результаты применяются для оптимизации?
> - Есть ли примеры/кейсы?

#### Концепция (предполагаемая на основе industry best practices)

**Что такое Media Mix Modeling (MMM)?**
```yaml
Определение: 
  Статистический анализ влияния различных маркетинговых каналов 
  на бизнес-метрики (продажи, лиды, brand awareness)

Цель:
  Понять, какой канал приносит какой эффект и как оптимально 
  распределить бюджет между каналами

Методология:
  - Регрессионный анализ (multiple regression)
  - Time series analysis
  - Machine Learning модели (Random Forest, XGBoost, Neural Networks)
  - Bayesian methods

Данные:
  - Исторические данные по тратам в каждом канале (2+ года)
  - Бизнес-метрики (продажи, лиды, регистрации)
  - Внешние факторы (сезонность, праздники, конкуренты, макроэкономика)
```

#### Архитектура модуля в MRM AI

```python
# Модуль: Econometric Engine
class EconometricEngine:
    """
    Медиамикс моделирование и эконометрический анализ
    """
    
    def __init__(self, client_id):
        self.client_id = client_id
        self.data_lake = DataLake()
        self.models = {}
        
    # ============================================
    # 1. DATA COLLECTION & PREPARATION
    # ============================================
    
    def collect_historical_data(self, date_range):
        """
        Сбор исторических данных по всем каналам
        """
        channels = [
            'yandex_direct', 'vk_ads', 'mytarget', 'telegram_ads',
            'programmatic', 'ooh', 'tv', 'radio', 'print', 'content'
        ]
        
        data = {
            'spend': {},      # Траты по дням/неделям
            'impressions': {},
            'clicks': {},
            'conversions': {}
        }
        
        for channel in channels:
            data['spend'][channel] = self.fetch_channel_spend(
                channel, date_range
            )
            data['impressions'][channel] = self.fetch_channel_impressions(
                channel, date_range
            )
            # ... и т.д.
        
        # Бизнес-метрики
        data['business_metrics'] = {
            'sales': self.fetch_sales(date_range),
            'leads': self.fetch_leads(date_range),
            'registrations': self.fetch_registrations(date_range)
        }
        
        # Внешние факторы
        data['external_factors'] = {
            'seasonality': self.calculate_seasonality(date_range),
            'holidays': self.get_holidays(date_range),
            'competitor_activity': self.estimate_competitor_spend(date_range),
            'macroeconomic': self.fetch_macro_indicators(date_range)
        }
        
        return data
    
    def prepare_features(self, raw_data):
        """
        Feature engineering для модели
        """
        features = pd.DataFrame()
        
        # Адстокинг (учет carry-over эффекта рекламы)
        for channel in raw_data['spend'].keys():
            features[f'{channel}_adstock'] = self.apply_adstock(
                raw_data['spend'][channel],
                decay_rate=0.5,  # Настраивается для каждого канала
                lag_periods=4     # Эффект длится 4 недели
            )
        
        # Насыщение (diminishing returns)
        for channel in raw_data['spend'].keys():
            features[f'{channel}_saturation'] = self.apply_saturation(
                features[f'{channel}_adstock'],
                saturation_point=self.estimate_saturation(channel)
            )
        
        # Лаги (delayed effect)
        for metric in ['sales', 'leads']:
            for lag in [1, 2, 3, 4]:  # 1-4 недели назад
                features[f'{metric}_lag_{lag}'] = raw_data['business_metrics'][metric].shift(lag)
        
        # Сезонность (sin/cos трансформация)
        features['seasonality_sin'] = np.sin(2 * np.pi * features.index / 52)  # 52 недели
        features['seasonality_cos'] = np.cos(2 * np.pi * features.index / 52)
        
        # Праздники (dummy variables)
        features['is_holiday'] = raw_data['external_factors']['holidays']
        
        return features
    
    # ============================================
    # 2. MODEL TRAINING
    # ============================================
    
    def train_mmm_model(self, features, target, model_type='xgboost'):
        """
        Обучение Media Mix Model
        """
        from sklearn.model_selection import TimeSeriesSplit
        from xgboost import XGBRegressor
        from sklearn.metrics import r2_score, mean_absolute_percentage_error
        
        # Time series cross-validation
        tscv = TimeSeriesSplit(n_splits=5)
        
        models = []
        scores = []
        
        for train_idx, val_idx in tscv.split(features):
            X_train, X_val = features.iloc[train_idx], features.iloc[val_idx]
            y_train, y_val = target.iloc[train_idx], target.iloc[val_idx]
            
            if model_type == 'xgboost':
                model = XGBRegressor(
                    n_estimators=1000,
                    learning_rate=0.01,
                    max_depth=6,
                    early_stopping_rounds=50
                )
                model.fit(
                    X_train, y_train,
                    eval_set=[(X_val, y_val)],
                    verbose=False
                )
            
            # Evaluate
            y_pred = model.predict(X_val)
            r2 = r2_score(y_val, y_pred)
            mape = mean_absolute_percentage_error(y_val, y_pred)
            
            models.append(model)
            scores.append({'r2': r2, 'mape': mape})
        
        # Выбираем лучшую модель
        best_idx = np.argmax([s['r2'] for s in scores])
        best_model = models[best_idx]
        
        return {
            'model': best_model,
            'scores': scores[best_idx],
            'feature_importance': self.get_feature_importance(best_model, features)
        }
    
    def get_feature_importance(self, model, features):
        """
        Интерпретация: какие каналы важнее всего
        """
        import shap
        
        # SHAP values для интерпретации
        explainer = shap.TreeExplainer(model)
        shap_values = explainer.shap_values(features)
        
        # Агрегируем SHAP values по каналам
        channel_importance = {}
        for channel in ['yandex_direct', 'vk_ads', 'mytarget', ...]:
            channel_cols = [col for col in features.columns if channel in col]
            channel_importance[channel] = np.abs(shap_values[:, channel_cols]).mean()
        
        return channel_importance
    
    # ============================================
    # 3. OPTIMIZATION & SIMULATION
    # ============================================
    
    def optimize_budget_allocation(self, total_budget, constraints=None):
        """
        Оптимизация распределения бюджета
        """
        from scipy.optimize import minimize
        
        def objective(budget_allocation):
            """
            Максимизируем predicted sales при заданном бюджете
            """
            # Создаем features с предложенным распределением
            features = self.create_features_from_budget(budget_allocation)
            # Предсказываем sales
            predicted_sales = self.models['sales'].predict(features)
            # Минимизируем -sales (максимизация)
            return -predicted_sales.sum()
        
        # Constraints
        constraints_list = [
            {'type': 'eq', 'fun': lambda x: x.sum() - total_budget}  # Сумма = total_budget
        ]
        
        if constraints:
            # Например: yandex_direct >= 20% от total_budget
            for channel, (min_pct, max_pct) in constraints.items():
                constraints_list.append({
                    'type': 'ineq',
                    'fun': lambda x, ch=channel, mn=min_pct: x[ch] - total_budget * mn
                })
                constraints_list.append({
                    'type': 'ineq',
                    'fun': lambda x, ch=channel, mx=max_pct: total_budget * mx - x[ch]
                })
        
        # Bounds (каждый канал >= 0)
        bounds = [(0, total_budget) for _ in range(len(self.channels))]
        
        # Initial guess (равномерное распределение)
        x0 = np.ones(len(self.channels)) * total_budget / len(self.channels)
        
        # Optimize
        result = minimize(
            objective,
            x0=x0,
            method='SLSQP',
            bounds=bounds,
            constraints=constraints_list
        )
        
        optimal_allocation = dict(zip(self.channels, result.x))
        expected_sales = -result.fun
        
        return {
            'allocation': optimal_allocation,
            'expected_sales': expected_sales,
            'expected_romi': expected_sales / total_budget
        }
    
    def simulate_scenarios(self, scenarios):
        """
        What-if анализ: что будет при разных сценариях бюджета
        """
        results = []
        
        for scenario in scenarios:
            features = self.create_features_from_budget(scenario['budget_allocation'])
            predicted_sales = self.models['sales'].predict(features)
            
            results.append({
                'scenario_name': scenario['name'],
                'budget_allocation': scenario['budget_allocation'],
                'total_budget': sum(scenario['budget_allocation'].values()),
                'predicted_sales': predicted_sales,
                'predicted_romi': predicted_sales / sum(scenario['budget_allocation'].values()),
                'vs_baseline': (predicted_sales / self.baseline_sales - 1) * 100  # % change
            })
        
        return results
    
    # ============================================
    # 4. REPORTING & VISUALIZATION
    # ============================================
    
    def generate_mmm_report(self):
        """
        Генерация отчета по MMM
        """
        report = {
            'model_quality': {
                'r2_score': self.models['sales']['scores']['r2'],
                'mape': self.models['sales']['scores']['mape'],
                'interpretation': self.interpret_model_quality()
            },
            
            'channel_effectiveness': {
                'importance': self.models['sales']['feature_importance'],
                'roi_by_channel': self.calculate_roi_by_channel(),
                'saturation_curves': self.plot_saturation_curves(),
                'optimal_spend': self.calculate_optimal_spend_by_channel()
            },
            
            'recommendations': {
                'budget_reallocation': self.generate_budget_recommendations(),
                'expected_impact': self.calculate_expected_impact(),
                'confidence_intervals': self.calculate_confidence_intervals()
            },
            
            'visualizations': {
                'waterfall_chart': self.create_waterfall_chart(),
                'response_curves': self.create_response_curves(),
                'scenario_comparison': self.create_scenario_comparison()
            }
        }
        
        return report
```

#### Применение в MRM AI

**Use Cases:**

1. **Оптимизация медиаплана:**
   ```yaml
   Вход: Общий бюджет на период, текущее распределение
   Процесс: MMM модель предлагает оптимальное распределение
   Выход: Рекомендации по перераспределению бюджета
   Эффект: +15-30% ROMI (по отраслевым бенчмаркам)
   ```

2. **Прогнозирование результатов:**
   ```yaml
   Вход: Предложенный медиаплан
   Процесс: MMM модель предсказывает KPI
   Выход: Прогноз продаж/лидов/регистраций
   Эффект: Снижение риска недовыполнения плана
   ```

3. **What-if анализ:**
   ```yaml
   Вопрос: "Что будет, если увеличить бюджет на контекст на 20%?"
   Процесс: MMM симуляция сценария
   Выход: Прогноз изменения KPI
   Эффект: Обоснованные решения по бюджету
   ```

4. **Incrementality testing:**
   ```yaml
   Вопрос: "Какой канал приносит реальный прирост, а какой - cannibalization?"
   Процесс: MMM разделяет baseline и incremental эффект
   Выход: Истинный вклад каждого канала
   Эффект: Выявление неэффективных каналов
   ```

---

### 2. АНАЛИТИКА МЕДИЙНОЙ РЕКЛАМЫ

> **Источник:** `Аналитика медийки (1).pptx`
> 
> **Статус:** 🔄 Требуется анализ презентации
> 
> **Запрос:** Пожалуйста, предоставьте скриншоты ключевых слайдов или опишите:
> - Какие метрики медийной рекламы анализируются?
> - Какие инструменты аналитики используются?
> - Как измеряется эффективность медийных кампаний?
> - Есть ли специфика для разных форматов (баннеры, видео, нативная)?

#### Концепция (предполагаемая)

**Ключевые метрики медийной рекламы:**

```yaml
Reach & Frequency:
  - Охват (Reach): Уникальные пользователи
  - Частота (Frequency): Среднее количество показов на пользователя
  - GRP (Gross Rating Points): Reach × Frequency
  - TRP (Target Rating Points): GRP для целевой аудитории

Engagement:
  - CTR (Click-Through Rate): Клики / Показы
  - VTR (View-Through Rate): Просмотры видео / Показы
  - Completion Rate: Досмотры видео до конца
  - Engagement Rate: Взаимодействия / Показы

Brand Metrics:
  - Brand Awareness lift: Прирост знания бренда
  - Ad Recall: Запоминаемость рекламы
  - Brand Favorability: Улучшение восприятия бренда
  - Purchase Intent lift: Прирост намерения купить

Performance:
  - CPC (Cost Per Click)
  - CPM (Cost Per Mille): Стоимость 1000 показов
  - vCPM (viewable CPM): Стоимость 1000 видимых показов
  - CPA (Cost Per Action)
  - ROAS (Return On Ad Spend)

Viewability:
  - Viewability Rate: % видимых показов (по MRC стандартам)
  - In-View Time: Среднее время в зоне видимости
  - Active View: Показы, соответствующие критериям видимости
```

#### Модуль в MRM AI

```python
# Модуль: Display Analytics Engine
class DisplayAnalyticsEngine:
    """
    Аналитика медийной рекламы
    """
    
    def analyze_campaign(self, campaign_id):
        """
        Комплексный анализ медийной кампании
        """
        # 1. Базовые метрики
        basic_metrics = self.fetch_basic_metrics(campaign_id)
        
        # 2. Анализ креативов (какие лучше работают)
        creative_analysis = self.analyze_creatives(campaign_id)
        
        # 3. Анализ таргетингов (какие сегменты эффективнее)
        targeting_analysis = self.analyze_targeting(campaign_id)
        
        # 4. Анализ площадок (где лучше размещаться)
        placement_analysis = self.analyze_placements(campaign_id)
        
        # 5. Viewability анализ
        viewability_analysis = self.analyze_viewability(campaign_id)
        
        # 6. Brand Lift (если доступно)
        brand_lift = self.fetch_brand_lift_study(campaign_id)
        
        # 7. Attribution (вклад медийки в конверсии)
        attribution = self.calculate_attribution(campaign_id)
        
        return {
            'basic_metrics': basic_metrics,
            'creative_analysis': creative_analysis,
            'targeting_analysis': targeting_analysis,
            'placement_analysis': placement_analysis,
            'viewability_analysis': viewability_analysis,
            'brand_lift': brand_lift,
            'attribution': attribution,
            'recommendations': self.generate_recommendations(campaign_id)
        }
    
    def analyze_creatives(self, campaign_id):
        """
        AI-анализ креативов: что работает, что нет
        """
        creatives = self.fetch_creatives(campaign_id)
        
        results = []
        for creative in creatives:
            # Метрики по креативу
            metrics = self.fetch_creative_metrics(creative['id'])
            
            # AI-анализ визуальных элементов
            visual_analysis = self.ai_analyze_visual(creative['image_url'])
            
            # AI-анализ текста
            text_analysis = self.ai_analyze_text(creative['headline'], creative['description'])
            
            results.append({
                'creative_id': creative['id'],
                'metrics': metrics,
                'visual_elements': visual_analysis,  # Цвета, композиция, фокус внимания
                'text_elements': text_analysis,      # Тональность, call-to-action, длина
                'performance_score': self.calculate_performance_score(metrics),
                'insights': self.ai_generate_insights(metrics, visual_analysis, text_analysis)
            })
        
        # Ранжируем креативы по эффективности
        results_sorted = sorted(results, key=lambda x: x['performance_score'], reverse=True)
        
        return {
            'top_performers': results_sorted[:3],
            'worst_performers': results_sorted[-3:],
            'best_practices': self.extract_best_practices(results_sorted[:3]),
            'recommendations': self.ai_recommend_creative_changes(results)
        }
    
    def calculate_attribution(self, campaign_id):
        """
        Multi-touch attribution для медийной рекламы
        """
        # Получаем user journeys с касаниями медийки
        journeys = self.fetch_user_journeys_with_display(campaign_id)
        
        # Применяем разные модели атрибуции
        attribution_models = {
            'last_click': self.last_click_attribution(journeys),
            'first_click': self.first_click_attribution(journeys),
            'linear': self.linear_attribution(journeys),
            'time_decay': self.time_decay_attribution(journeys),
            'position_based': self.position_based_attribution(journeys),
            'data_driven': self.data_driven_attribution(journeys)  # ML-based
        }
        
        return {
            'models': attribution_models,
            'recommended_model': 'data_driven',
            'display_contribution': self.calculate_display_contribution(attribution_models['data_driven']),
            'assisted_conversions': self.calculate_assisted_conversions(journeys),
            'view_through_conversions': self.calculate_vtc(journeys)
        }
```

**Интеграция с AI-ассистентом:**
```python
# AI Specialist Assistant дает рекомендации на основе аналитики
def ai_recommendations_for_display(campaign_analysis):
    """
    AI генерирует actionable рекомендации по медийной кампании
    """
    prompt = f"""
    Проанализируй результаты медийной кампании и дай рекомендации:
    
    Текущие метрики:
    - CTR: {campaign_analysis['basic_metrics']['ctr']}
    - Viewability: {campaign_analysis['viewability_analysis']['viewability_rate']}
    - CPC: {campaign_analysis['basic_metrics']['cpc']}
    
    Анализ креативов:
    - Лучший креатив: {campaign_analysis['creative_analysis']['top_performers'][0]}
    - Худший креатив: {campaign_analysis['creative_analysis']['worst_performers'][0]}
    
    Анализ площадок:
    - Топ-3 площадки: {campaign_analysis['placement_analysis']['top_3']}
    
    Дай 5 конкретных рекомендаций по оптимизации кампании:
    1. [Конкретное действие] → [Ожидаемый эффект]
    2. ...
    
    Приоритизируй по impact vs effort.
    """
    
    recommendations = llm.generate(prompt)
    return recommendations
```

---

### 3. ПЛАНИРОВАНИЕ И ЭФФЕКТИВНОСТЬ ПЕРИОДИЧЕСКОЙ РЕКЛАМЫ

> **Источник:** `ПЛАНИРОВАНИЕ И ЭФФЕКТИВНОСТЬ ПЕРИОДИЧЕСКОЙ РЕКЛАМЫ (1).pdf`
> 
> **Статус:** 🔄 Требуется анализ документа
> 
> **Запрос:** Пожалуйста, предоставьте скриншоты или опишите:
> - Что такое периодическая реклама в контексте документа?
> - Какие подходы к планированию описаны?
> - Как измеряется эффективность?
> - Есть ли модели/формулы для расчетов?

#### Концепция (предполагаемая)

**Периодическая реклама = регулярные кампании (weekly/monthly)**

```yaml
Примеры:
  - Еженедельные акции в retail
  - Ежемесячные промо в FMCG
  - Сезонные кампании (каждый квартал)

Особенности планирования:
  - Flighting vs Continuous: Периоды активности vs постоянное присутствие
  - Pulsing: Базовый уровень + периодические всплески
  - Frequency capping: Ограничение частоты показов
  - Recency: Показы ближе к моменту покупки

Метрики эффективности:
  - Effective Reach: % ЦА, увидевших рекламу N+ раз
  - Effective Frequency: Оптимальное количество контактов (обычно 3-7)
  - SOV (Share of Voice): Доля голоса бренда в категории
  - Sales Lift: Прирост продаж в периоды активности
```

#### Модуль в MRM AI

```python
# Модуль: Periodic Campaign Planner
class PeriodicCampaignPlanner:
    """
    Планирование периодических кампаний
    """
    
    def optimize_flighting_schedule(self, budget, duration_weeks, objective):
        """
        Оптимизация расписания flight'ов
        """
        if objective == 'reach':
            # Maximize reach: равномерное распределение
            return self.even_distribution(budget, duration_weeks)
        
        elif objective == 'sales':
            # Maximize sales: учитываем сезонность и historical data
            seasonality = self.fetch_seasonality_pattern()
            return self.seasonality_based_distribution(budget, duration_weeks, seasonality)
        
        elif objective == 'frequency':
            # Maximize effective frequency: концентрируем бюджет
            return self.pulsing_distribution(budget, duration_weeks)
    
    def calculate_effective_reach(self, plan):
        """
        Расчет Effective Reach (% ЦА с 3+ контактами)
        """
        # Модель на основе медиа-микса и GRP
        total_grp = sum([placement['grp'] for placement in plan['placements']])
        
        # Формула Metheringham для reach/frequency
        reach_1plus = 100 * (1 - np.exp(-0.05 * total_grp))  # Reach 1+
        avg_frequency = total_grp / reach_1plus                # Avg frequency
        
        # Distribution of frequency (negative binomial)
        reach_3plus = self.calculate_reach_n_plus(reach_1plus, avg_frequency, n=3)
        
        return {
            'reach_1plus': reach_1plus,
            'reach_3plus': reach_3plus,  # Effective Reach
            'avg_frequency': avg_frequency
        }
```

---

### 4. ЭФФЕКТИВНОЕ МЕДИАПЛАНИРОВАНИЕ (Методология Шматова)

> **Источники:** 
> - ✅ `Подход к эффективному медиапланированию.txt` - Полный текст методологии
> - 📚 Шматов Г.А. "Основы экономико-математической теории медиапланирования" (2021, 456 с.)
> 
> **Статус:** ✅ Полный анализ завершен
> 
> **Ключевая информация:** Научно обоснованная экономико-математическая теория медиапланирования с набором калькуляторов

#### 4.1. Что такое эффективное медиапланирование (по Шматову)

**Определение:**
```yaml
Медиапланирование = Технология эффективного и оптимального размещения рекламы

Компоненты технологии:
  1. Аналитическая теория (экономико-математическая)
  2. Система мониторинга параметров медиа и рынка
  3. Инструментарий разработки и оптимизации медиапланов

Цель: Минимизация рекламного бюджета при заданной интенсивности воздействия
```

#### 4.2. Основные концепции и метрики

**Ключевые метрики эффективности:**

1. **Эффективный охват (Gэф)**
   - Доля целевой аудитории, получившей ≥ fэф контактов с рекламой
   - Можно трактовать как вероятность эффективного контакта
   - Формула: Gэф = G(fэф+)

2. **Эффективная частота (fэф)**
   - Число контактов, достаточное для достижения коммуникативной цели
   - Определяет порог эффективности рекламы
   - Расчет по методике Росситера-Перси (см. ниже)

3. **Средняя частота контактов (fср)**
   - Среднее число контактов на 1 представителя ЦА
   - Формула: fср = TRP / G(m)
   - TRP = m × R (суммарный рейтинг)

4. **Рейтинг (R)**
   - Доля ЦА, контактировавшая с одним медиасобытием
   - Вероятность контакта случайного представителя ЦА с медиа
   - Измеряется в %

5. **Предельный охват (G∞)**
   - Доля ЦА, контактировавшая с очень большим числом размещений
   - Максимально возможный охват данного медиа
   - Зависит от структуры аудитории медиа

6. **Спектр охвата g(f)**
   - Распределение охвата по числу контактов
   - Фундамент аналитической теории
   - Позволяет вычислить все характеристики рекламы

#### 4.3. Структура эффективного медиапланирования

```yaml
Этап 1: Анализ и целеполагание
  - Анализ текущей ситуации (market share, brand health)
  - Определение целей (awareness, consideration, conversion)
  - Идентификация целевой аудитории (demographics, psychographics, behaviors)
  - Competitive analysis (SOV конкурентов)

Этап 2: Стратегия
  - Channel selection (какие каналы использовать)
  - Budget allocation (как распределить бюджет)
  - Messaging strategy (какие сообщения для каких каналов)
  - Flighting strategy (когда и как долго размещаться)

Этап 3: Тактическое планирование
  - Selection of specific media vehicles (конкретные сайты, ТВ-каналы, и т.д.)
  - Negotiation (торг с площадками)
  - Creative requirements (форматы, размеры, длительность)
  - Timeline (детальный график размещений)

Этап 4: Execution
  - Booking (бронирование площадок)
  - Trafficking (загрузка креативов)
  - Monitoring (отслеживание показов)
  - Optimization (корректировки в процессе)

Этап 5: Измерение и оптимизация
  - Performance tracking (достижение KPI)
  - Attribution analysis (какие каналы приносят результат)
  - ROI calculation
  - Learnings для следующих кампаний
```

#### AI-ассистент для медиапланирования

```python
# Модуль: AI Media Planner
class AIMediaPlanner:
    """
    AI-ассистент для создания эффективных медиапланов
    """
    
    def generate_media_plan(self, brief):
        """
        Генерация медиаплана на основе брифа
        """
        # 1. Анализ брифа
        objectives = self.extract_objectives(brief)
        target_audience = self.extract_target_audience(brief)
        budget = self.extract_budget(brief)
        
        # 2. AI рекомендации по каналам
        channel_recommendations = self.ai_recommend_channels(
            objectives=objectives,
            target_audience=target_audience,
            budget=budget,
            historical_data=self.fetch_similar_campaigns()
        )
        
        # 3. AI распределение бюджета
        budget_allocation = self.ai_allocate_budget(
            channels=channel_recommendations,
            total_budget=budget,
            objectives=objectives
        )
        
        # 4. AI прогноз результатов
        forecasted_results = self.ai_forecast_results(
            channels=channel_recommendations,
            budget_allocation=budget_allocation,
            target_audience=target_audience
        )
        
        # 5. Генерация детального плана
        detailed_plan = self.generate_detailed_plan(
            channels=channel_recommendations,
            budget_allocation=budget_allocation,
            forecasted_results=forecasted_results
        )
        
        return {
            'summary': self.generate_executive_summary(detailed_plan),
            'channel_mix': channel_recommendations,
            'budget_allocation': budget_allocation,
            'forecasted_kpis': forecasted_results,
            'detailed_plan': detailed_plan,
            'risks': self.identify_risks(detailed_plan),
            'alternative_scenarios': self.generate_alternative_scenarios(brief)
        }
    
    def ai_recommend_channels(self, objectives, target_audience, budget, historical_data):
        """
        AI рекомендует оптимальный медиа-микс
        """
        prompt = f"""
        На основе исторических данных и best practices, порекомендуй медиа-микс:
        
        Цели кампании: {objectives}
        Целевая аудитория: {target_audience}
        Бюджет: {budget}
        
        Доступные каналы:
        - Контекстная реклама (Яндекс.Директ)
        - Таргетированная реклама (VK Ads, MyTarget)
        - Медийная реклама (Programmatic)
        - Видеореклама (YouTube, VK Video)
        - Нативная реклама (Дзен, Telegram)
        - Performance-каналы (Affiliate, CPA)
        
        Похожие кампании из истории:
        {historical_data}
        
        Порекомендуй:
        1. Какие каналы использовать (и почему)
        2. Примерное распределение бюджета (%)
        3. Expected KPIs для каждого канала
        4. Риски и митигация
        
        Ответ в JSON формате.
        """
        
        recommendations = self.llm.generate(prompt, output_format='json')
        
        # Валидация рекомендаций
        validated = self.validate_recommendations(recommendations, budget)
        
        return validated
```

---

## 🤖 AI-АССИСТЕНТЫ

### 1. AI Account Assistant

**Функции:**
```yaml
Генерация документов:
  - Аналитические записки для встреч с клиентами
  - Постмиты после встреч
  - Брифы на основе обсуждений
  - Email-коммуникация с клиентами

Автоматизация рутины:
  - Декомпозиция задач после встреч
  - Назначение ответственных (RACI-based)
  - Установка дедлайнов
  - Создание задач в Jira/YouGile

Аналитика:
  - Анализ performance кампаний клиента
  - Выявление проблем и возможностей
  - Генерация recommendations
  - Прогнозирование достижения KPI

Коммуникация:
  - Ответы на типовые вопросы клиентов
  - Подготовка к встречам (brief по клиенту)
  - Формирование повесток встреч

Экономия времени: 80+ часов/месяц на аккаунта
```

### 2. AI Specialist Assistant

**Функции:**
```yaml
Оптимизация кампаний:
  - Анализ performance в реальном времени
  - Рекомендации по ставкам, бюджетам, таргетингам
  - A/B тесты (что тестировать, как анализировать)
  - Автоматические корректировки (с подтверждением)

Прогнозирование:
  - Прогноз достижения KPI до конца периода
  - Рекомендации по перераспределению бюджета
  - Risk alerts (если кампания не достигнет целей)

Креативы:
  - Анализ эффективности креативов
  - Генерация идей для новых креативов
  - Генерация текстов объявлений (на основе best performers)
  - Генерация вариаций для A/B тестов

Автоматизация:
  - Генерация автоматических правил
  - Bulk операции (массовое редактирование)
  - Импорт/экспорт кампаний
  - Синхронизация с рекламными платформами

Экономия времени: 60+ часов/месяц на специалиста
```

### 3. AI Project Manager

**Функции:**
```yaml
Планирование:
  - Автоматическое создание project timeline
  - Идентификация dependencies
  - Resource allocation (кто и когда занят)
  - Risk identification

Мониторинг:
  - Real-time tracking прогресса по задачам
  - Alerts о задержках и блокировках
  - Burndown charts и прогнозы завершения

Коммуникация:
  - Автоматические постмиты из встреч
  - Status updates для стейкхолдеров
  - Escalation при проблемах

Оптимизация:
  - Предложения по оптимизации процессов
  - Выявление bottlenecks
  - Recommendations по улучшению velocity

Экономия времени: 120+ часов/месяц на PM
```

### 4. AI Client Assistant (для клиентов агентства)

**Функции:**
```yaml
Self-service:
  - Ответы на вопросы по кампаниям 24/7
  - Доступ к отчетам и дашбордам
  - Одобрение медиапланов и креативов
  - Запросы на изменения (автоматическое создание задач)

Notifications:
  - Alerts о важных событиях (запуск кампаний, достижение целей)
  - Weekly/Monthly отчеты
  - Предупреждения о проблемах

Insights:
  - Простыми словами объясняет результаты кампаний
  - Рекомендации по оптимизации
  - Сравнение с конкурентами/бенчмарками

Value: Снижение нагрузки на аккаунтов, повышение удовлетворенности клиентов
```

---

## ⚙️ ИНСТРУМЕНТЫ АВТОМАТИЗАЦИИ

### 1. Data Collection Automation

**Что автоматизирует:**
```yaml
Сбор данных из рекламных кабинетов:
  - Яндекс.Директ API
  - VK Ads API
  - MyTarget API
  - Telegram Ads API
  - Google Ads API (если доступен)
  - Programmatic platforms (Soloway, Getintent, Hybrid)
  - OZON Ads API
  - Яндекс.Маркет API

Сбор аналитики:
  - Яндекс.Метрика API
  - Google Analytics 4 API (если доступен)
  - AppMetrica API
  - Аналитика CRM (AmoCRM, Bitrix24)

Консолидация:
  - Нормализация данных (unified schema)
  - Дедупликация
  - Data quality checks
  - Загрузка в Data Lake

Частота: Hourly для real-time optimization, Daily для reporting
```

**Экономия:** 80+ часов/месяц на отдел

### 2. Reporting Automation

**Что автоматизирует:**
```yaml
Генерация отчетов:
  - Weekly/Monthly отчеты по шаблонам клиентов
  - Custom dashboards (настраиваемые)
  - Exportable reports (PDF, Excel, Google Sheets)

AI-генерация аналитических записок:
  - Executive summary
  - Анализ трендов
  - Выявление инсайтов
  - Recommendations

Автоматическая рассылка:
  - Email клиентам по расписанию
  - Telegram notifications
  - Push notifications в мобильном приложении

Экономия: 40+ часов/месяц на аккаунта
```

### 3. Approval Workflows Automation

**Что автоматизирует:**
```yaml
Согласование медиапланов:
  - Отправка на approval через email/Telegram
  - Tracking статуса согласования
  - Reminders (если долго не отвечают)
  - Автоматическое применение после approval

Согласование креативов:
  - Загрузка креативов для review
  - Comments & annotations
  - Versioning
  - Автоматический trafficking после approval

Согласование изменений бюджетов:
  - Request → Approval → Execution flow
  - Multi-level approvals (при необходимости)

Экономия: Снижение time-to-launch на 30-50%
```

### 4. Campaign Setup Automation

**Что автоматизирует:**
```yaml
Создание кампаний:
  - Импорт медиаплана → автоматическое создание кампаний в рекламных кабинетах
  - Bulk операции (массовое создание групп объявлений)
  - Применение шаблонов (naming conventions, settings)

Настройка таргетингов:
  - Автоматическое применение таргетингов из медиаплана
  - Создание аудиторий в кабинетах
  - Настройка ретаргетинга

Настройка пикселей и целей:
  - Генерация UTM-меток
  - Установка целей в Метрике/GA
  - Проверка корректности настройки

Экономия: 20+ часов/месяц на специалиста
```

### 5. Optimization Automation

**Что автоматизирует:**
```yaml
Rule-based optimization:
  - Автоматическое изменение ставок (если CPA выше/ниже таргета)
  - Pause неэффективных объявлений/групп
  - Перераспределение бюджетов между кампаниями
  - Корректировка таргетингов

AI-driven optimization:
  - ML-модели предсказывают оптимальные ставки
  - Рекомендации по креативам (что тестировать дальше)
  - Автоматический A/B testing с анализом результатов

Human-in-the-loop:
  - AI предлагает, человек утверждает
  - Confidence scores для каждой рекомендации
  - Возможность отката (rollback)

Эффект: +15-30% улучшение KPI
```

---

## 🔌 ИНТЕГРАЦИИ

### Рекламные платформы (Российские - приоритет)

```yaml
Яндекс.Директ:
  - API v5 для управления кампаниями
  - Reports API для статистики
  - Wordstat API для подбора ключевых слов

VK Ads:
  - VK Ads API для управления кампаниями
  - Статистика и оптимизация
  - Создание аудиторий

MyTarget:
  - MyTarget API v2
  - Управление кампаниями
  - Загрузка креативов

Telegram Ads:
  - Telegram Ads API (в процессе разработки Telegram)
  - Пока: ручной implex через личный кабинет

OZON Ads:
  - OZON Performance API
  - Создание и управление РК
  - Статистика

Яндекс.Маркет:
  - API маркетплейса
  - Управление карточками и рекламой
```

### Аналитика

```yaml
Яндекс.Метрика:
  - Management API (создание целей, сегментов)
  - Stats API (получение статистики)
  - Logs API (сырые данные для глубокой аналитики)

AppMetrica:
  - Push API (отправка событий)
  - Stats API (получение статистики)
  - Export API (экспорт данных)

CRM аналитика:
  - AmoCRM API
  - Bitrix24 REST API
  - Импорт лидов и сделок для attribution
```

### Коммуникация и коллаборация

```yaml
Telegram:
  - Telegram Bot API (notifications, commands, approvals)
  - Telegram Login Widget (авторизация)
  - Webhook для real-time updates

Email:
  - SMTP для отправки отчетов
  - IMAP для приема запросов от клиентов
  - Email parsing для создания задач

Jira / YouGile:
  - REST API для синхронизации задач
  - Webhooks для real-time sync
  - Bidirectional sync (изменения в обе стороны)
```

### Финансы и учет

```yaml
1С:
  - 1С API (если доступно)
  - Импорт счетов и актов
  - Сверка сумм

Google Sheets:
  - Google Sheets API
  - Экспорт медиапланов
  - Импорт отчетов
  - "Command Center" функциональность
```

---

## 📈 ИНСТРУМЕНТЫ ПРОГНОЗИРОВАНИЯ

### 1. Budget Forecasting

```python
class BudgetForecaster:
    """
    Прогнозирование расхода бюджета и достижения KPI
    """
    
    def forecast_budget_spend(self, campaign_id, horizon_days=30):
        """
        Прогноз расхода бюджета на N дней вперед
        """
        # Получаем исторические данные
        historical = self.fetch_historical_spend(campaign_id, days=90)
        
        # Факторы, влияющие на spend
        features = self.prepare_features(historical, include=[
            'day_of_week',
            'seasonality',
            'bid_changes',
            'budget_caps',
            'competition_level'
        ])
        
        # ML модель для прогноза
        model = self.train_spend_forecast_model(features)
        
        # Прогноз
        forecast = model.predict(horizon_days)
        
        # Confidence intervals
        lower_bound, upper_bound = self.calculate_confidence_interval(forecast)
        
        return {
            'forecast': forecast,
            'lower_bound': lower_bound,  # 80% уверенности
            'upper_bound': upper_bound,
            'expected_completion_date': self.estimate_completion_date(forecast),
            'risk_of_overspend': self.calculate_overspend_risk(forecast, campaign_id)
        }
    
    def forecast_kpi_achievement(self, campaign_id, target_kpi):
        """
        Прогноз достижения целевого KPI
        """
        current_performance = self.fetch_current_performance(campaign_id)
        days_remaining = self.calculate_days_remaining(campaign_id)
        
        # ML модель для прогноза KPI
        forecast = self.ml_forecast_kpi(
            current_performance=current_performance,
            days_remaining=days_remaining,
            target_kpi=target_kpi
        )
        
        # Вероятность достижения цели
        probability_of_achievement = self.calculate_achievement_probability(
            forecast, target_kpi
        )
        
        # Рекомендации, если цель под угрозой
        if probability_of_achievement < 0.7:
            recommendations = self.ai_generate_recovery_plan(
                current_performance, target_kpi, days_remaining
            )
        else:
            recommendations = None
        
        return {
            'forecasted_kpi': forecast,
            'target_kpi': target_kpi,
            'probability_of_achievement': probability_of_achievement,
            'gap': target_kpi - forecast['expected'],
            'recommendations': recommendations
        }
```

### 2. Scenario Planning

```python
class ScenarioPlanner:
    """
    Планирование сценариев "что будет, если"
    """
    
    def simulate_scenarios(self, base_plan, variations):
        """
        Симуляция различных сценариев
        """
        scenarios = []
        
        for variation in variations:
            # Применяем изменения к базовому плану
            modified_plan = self.apply_variation(base_plan, variation)
            
            # Прогнозируем результаты
            forecasted_results = self.forecast_results(modified_plan)
            
            scenarios.append({
                'name': variation['name'],
                'description': variation['description'],
                'changes': variation['changes'],
                'forecasted_results': forecasted_results,
                'vs_baseline': self.compare_to_baseline(forecasted_results, base_plan),
                'risk_level': self.assess_risk(modified_plan),
                'confidence': self.calculate_confidence(forecasted_results)
            })
        
        # Ранжируем сценарии по expected value
        scenarios_ranked = sorted(
            scenarios,
            key=lambda x: x['forecasted_results']['expected_roi'],
            reverse=True
        )
        
        return {
            'baseline': base_plan,
            'scenarios': scenarios_ranked,
            'recommended_scenario': scenarios_ranked[0],
            'comparison_table': self.create_comparison_table(scenarios_ranked)
        }
```

---

## 🎯 КЛЮЧЕВЫЕ МЕТРИКИ ЭФФЕКТИВНОСТИ ИНСТРУМЕНТОВ

### ROI инструментов

| Инструмент | Экономия времени | Улучшение KPI | ROI |
|------------|------------------|---------------|-----|
| AI Account Assistant | 80h/month | - | 600%+ |
| AI Specialist Assistant | 60h/month | +15% ROMI | 500%+ |
| AI Project Manager | 120h/month | -30% delays | 800%+ |
| Data Collection Automation | 80h/month | - | 600%+ |
| Reporting Automation | 40h/month | - | 400%+ |
| MMM & Econometric Engine | 20h/month | +20% ROMI | 1000%+ |
| Display Analytics | 15h/month | +10% CTR | 300%+ |

---

## 📝 СЛЕДУЮЩИЕ ШАГИ

### Для завершения анализа инструментов:

- [ ] **Получить скриншоты/описание из презентаций:**
  - `CUBE_моделирование.pptx` → Детали эконометрического моделирования
  - `Аналитика медийки (1).pptx` → Специфика медийной аналитики
  - `ПЛАНИРОВАНИЕ И ЭФФЕКТИВНОСТЬ ПЕРИОДИЧЕСКОЙ РЕКЛАМЫ (1).pdf` → Модели и формулы
  - `Подход_к_эффективному_медиапланированию_1.pdf` и `1 2.pdf` → Пошаговые процессы

- [ ] **Интегрировать в Technical_Architecture.md:**
  - Добавить архитектуру каждого инструмента
  - Database schemas
  - API endpoints
  - ML models specifications

- [ ] **Обновить Sprint_0_1_Action_Plan.md:**
  - Приоритизировать разработку инструментов
  - Sprint allocation по инструментам

- [ ] **Создать документ "AI_Models_Specifications.md":**
  - Детальное описание ML-моделей
  - Training data requirements
  - Performance metrics
  - Retraining strategy

---

**Статус документа:** 🔄 40% готовности (требуется информация из презентаций) | **Версия:** 1.0 | **Дата:** 23 октября 2025

**Для пользователя:** Пожалуйста, предоставьте скриншоты ключевых слайдов из презентаций или опишите основные концепции, чтобы я мог дополнить этот документ детальной информацией.

