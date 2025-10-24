---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: guide
title: Гайд по интеграции медиаландшафта
language: ru
industry: advertising
role_apply: [developer, tech_lead]
period: 2025-10
version: "1.0"
source_path: 04_PLATFORMS/MEDIA_LANDSCAPE/_Integration_Guide.md
effective_date: 2025-10-24
visibility: internal
security_level: medium
tags: [integration, guide, api, development]
---

# Гайд по интеграции медиаландшафта

## 🎯 ОБЗОР

Этот гайд показывает, как интегрировать медиаландшафт в различные части MRM системы.

---

## 📦 УСТАНОВКА ТИПОВ

```typescript
// Импорт типов
import {
  Platform,
  Format,
  PlatformTargeting,
  PlatformPricing,
  PlatformCategory,
  FormatType,
  CampaignObjective
} from '@/types/mediaLandscape.types';
```

---

## 🔍 ПРИМЕРЫ ИСПОЛЬЗОВАНИЯ

### 1. Поиск площадок по критериям

```typescript
import { MediaLandscapeService } from '@/services/mediaLandscape';

/**
 * Пример: Найти площадки для молодой аудитории с видеоформатами
 */
async function findPlatformsForYoungAudience() {
  const service = new MediaLandscapeService();
  
  const platforms = await service.searchPlatforms({
    category: [PlatformCategory.SOCIAL_MEDIA, PlatformCategory.VIDEO],
    min_reach: 10000000,
    has_api: true,
    tags: ['молодая аудитория', 'видео']
  });
  
  console.log(`Найдено ${platforms.total} площадок`);
  return platforms;
}
```

### 2. Получение форматов площадки

```typescript
/**
 * Пример: Получить все видеоформаты VK Реклама
 */
async function getVKVideoFormats() {
  const service = new MediaLandscapeService();
  
  const formats = await service.getFormats({
    platform_id: 'plt_vk_ads_001',
    format_type: FormatType.VIDEO_INSTREAM
  });
  
  formats.formats.forEach(format => {
    console.log(`Формат: ${format.name}`);
    console.log(`CPM: ${format.performance_benchmarks.ctr_avg}%`);
    console.log(`Viewability: ${format.performance_benchmarks.viewability_avg}%`);
  });
  
  return formats;
}
```

### 3. Расчет стоимости размещения

```typescript
/**
 * Пример: Оценить стоимость кампании в VK с таргетингом на Москву
 */
async function estimateCampaignCost() {
  const service = new MediaLandscapeService();
  
  const estimate = await service.estimateCost({
    platform_id: 'plt_vk_ads_001',
    format_id: 'fmt_vk_feed_video_001',
    targeting: {
      geo: ['moscow'],
      narrow: true
    },
    volume: {
      impressions: 1000000
    },
    duration_days: 14
  });
  
  console.log('Оценка стоимости:');
  console.log(`Базовая стоимость: ${estimate.breakdown.base_cost}₽`);
  console.log(`Гео-корректировка: +${estimate.breakdown.geo_adjustment}₽`);
  console.log(`Таргетинг: +${estimate.breakdown.targeting_adjustment}₽`);
  console.log(`Скидки: -${estimate.breakdown.discounts}₽`);
  console.log(`НДС: +${estimate.breakdown.vat}₽`);
  console.log(`---`);
  console.log(`ИТОГО: ${estimate.estimated_cost}₽`);
  console.log(`Прогноз показов: ${estimate.estimated_impressions?.toLocaleString()}`);
  
  return estimate;
}
```

### 4. Рекомендация площадок для клиента

```typescript
/**
 * Пример: AI ассистент рекомендует площадки на основе брифа
 */
async function recommendPlatforms(clientBrief: ClientBrief) {
  const service = new MediaLandscapeService();
  
  const recommendations = await service.recommendPlatforms({
    targetAudience: {
      age: [25, 45],
      gender: 'any',
      geo: ['moscow', 'spb'],
      interests: clientBrief.targetInterests
    },
    budget: clientBrief.budget,
    objectives: [CampaignObjective.AWARENESS, CampaignObjective.CONVERSIONS],
    preferredFormats: [FormatType.VIDEO_INSTREAM, FormatType.DISPLAY_BANNER],
    industry: clientBrief.industry
  });
  
  console.log('Рекомендуемые площадки:');
  recommendations.platforms.forEach((platform, index) => {
    console.log(`${index + 1}. ${platform.name}`);
    console.log(`   Охват: ${platform.audience.monthly_reach.toLocaleString()} уникальных/мес`);
    console.log(`   Минимальный бюджет: ${platform.commercial.minimum_budget}₽`);
    console.log(`   Релевантность: ${platform.relevance_score}%`);
  });
  
  return recommendations;
}
```

### 5. Получение возможностей таргетинга

```typescript
/**
 * Пример: Проверить, поддерживает ли площадка нужный таргетинг
 */
async function checkTargetingCapabilities(platformId: string) {
  const service = new MediaLandscapeService();
  
  const targeting = await service.getTargeting(platformId);
  
  console.log(`Таргетинг для ${platformId}:`);
  console.log(`Возраст: ${targeting.demographic_targeting.age.available ? '✅' : '❌'}`);
  console.log(`География: ${targeting.geo_targeting.available ? '✅' : '❌'}`);
  console.log(`Интересы: ${targeting.behavioral_targeting.interests.available ? '✅' : '❌'}`);
  console.log(`Ретаргетинг: ${targeting.audience_targeting.retargeting.available ? '✅' : '❌'}`);
  console.log(`Lookalike: ${targeting.audience_targeting.lookalike.available ? '✅' : '❌'}`);
  
  // Детали
  if (targeting.demographic_targeting.age.available) {
    console.log(`Возрастной диапазон: ${targeting.demographic_targeting.age.min_age}-${targeting.demographic_targeting.age.max_age} лет`);
  }
  
  return targeting;
}
```

### 6. Сравнение площадок

```typescript
/**
 * Пример: Сравнить несколько площадок по ключевым метрикам
 */
async function comparePlatforms(platformIds: string[]) {
  const service = new MediaLandscapeService();
  
  const comparison = await service.comparePlatforms(platformIds, {
    metrics: ['reach', 'cpm_avg', 'ctr_avg', 'min_budget']
  });
  
  console.log('Сравнение площадок:');
  console.log('---');
  
  comparison.forEach(item => {
    console.log(`${item.platform.name}:`);
    console.log(`  Охват: ${item.metrics.reach.toLocaleString()}`);
    console.log(`  Средний CPM: ${item.metrics.cpm_avg}₽`);
    console.log(`  Средний CTR: ${item.metrics.ctr_avg}%`);
    console.log(`  Мин. бюджет: ${item.metrics.min_budget}₽`);
    console.log(`---`);
  });
  
  return comparison;
}
```

---

## 🤖 ИНТЕГРАЦИЯ С AI АССИСТЕНТАМИ

### AI Media Planner

```typescript
/**
 * AI Media Planner использует медиаландшафт для подбора площадок
 */
class AIMediaPlannerAssistant {
  private mediaLandscape: MediaLandscapeService;
  
  constructor() {
    this.mediaLandscape = new MediaLandscapeService();
  }
  
  /**
   * Генерация медиаплана на основе брифа
   */
  async generateMediaPlan(brief: ClientBrief): Promise<MediaPlan> {
    // 1. Получить рекомендованные площадки
    const platforms = await this.mediaLandscape.recommendPlatforms({
      targetAudience: brief.targetAudience,
      budget: brief.budget,
      objectives: brief.objectives,
      industry: brief.industry
    });
    
    // 2. Для каждой площадки получить форматы и цены
    const platformsWithFormats = await Promise.all(
      platforms.platforms.map(async (platform) => {
        const formats = await this.mediaLandscape.getFormats({
          platform_id: platform.id,
          is_active: true
        });
        
        const pricing = await this.mediaLandscape.getPricing({
          platform_id: platform.id
        });
        
        return {
          platform,
          formats: formats.formats,
          pricing: pricing.prices
        };
      })
    );
    
    // 3. Распределить бюджет
    const allocation = this.allocateBudget(
      platformsWithFormats,
      brief.budget,
      brief.objectives
    );
    
    // 4. Рассчитать прогноз KPI
    const forecast = await this.forecastKPI(allocation);
    
    // 5. Создать медиаплан
    const mediaPlan: MediaPlan = {
      client_id: brief.client_id,
      platforms: allocation,
      total_budget: brief.budget,
      forecast: forecast,
      created_at: new Date().toISOString()
    };
    
    return mediaPlan;
  }
  
  /**
   * Распределение бюджета между площадками
   */
  private allocateBudget(
    platforms: any[],
    totalBudget: number,
    objectives: CampaignObjective[]
  ) {
    // Логика распределения на основе целей и эффективности площадок
    // Для awareness - больше на охватные площадки
    // Для conversions - больше на performance-площадки
    
    const weights = platforms.map(p => 
      this.calculatePlatformWeight(p, objectives)
    );
    
    const totalWeight = weights.reduce((sum, w) => sum + w, 0);
    
    return platforms.map((platform, index) => ({
      platform_id: platform.platform.id,
      platform_name: platform.platform.name,
      budget: Math.round(totalBudget * (weights[index] / totalWeight)),
      formats: platform.formats.filter((f: Format) => 
        this.isFormatSuitableForObjectives(f, objectives)
      )
    }));
  }
  
  /**
   * Расчет веса площадки для распределения бюджета
   */
  private calculatePlatformWeight(
    platform: any,
    objectives: CampaignObjective[]
  ): number {
    let weight = 1;
    
    // Учитываем охват
    weight *= Math.log(platform.platform.audience.monthly_reach) / 10;
    
    // Учитываем цели
    if (objectives.includes(CampaignObjective.AWARENESS)) {
      // Для awareness важен охват
      weight *= platform.platform.audience.monthly_reach / 10000000;
    }
    
    if (objectives.includes(CampaignObjective.CONVERSIONS)) {
      // Для conversions важен CTR и CVR
      const avgCTR = platform.formats.reduce((sum: number, f: Format) => 
        sum + f.performance_benchmarks.ctr_avg, 0
      ) / platform.formats.length;
      weight *= avgCTR;
    }
    
    return weight;
  }
  
  /**
   * Проверка, подходит ли формат для целей кампании
   */
  private isFormatSuitableForObjectives(
    format: Format,
    objectives: CampaignObjective[]
  ): boolean {
    // Логика выбора форматов под цели
    if (objectives.includes(CampaignObjective.AWARENESS)) {
      // Для awareness хороши видео и display
      return [
        FormatType.VIDEO_INSTREAM,
        FormatType.DISPLAY_BANNER,
        FormatType.NATIVE
      ].includes(format.format_type);
    }
    
    if (objectives.includes(CampaignObjective.CONVERSIONS)) {
      // Для conversions нужны кликабельные форматы
      return format.performance_benchmarks.ctr_avg > 1.0;
    }
    
    return true;
  }
  
  /**
   * Прогноз KPI для медиаплана
   */
  private async forecastKPI(allocation: any[]): Promise<MediaPlanForecast> {
    const forecasts = await Promise.all(
      allocation.map(async (item) => {
        const benchmarks = await this.mediaLandscape.getBenchmarks({
          platform_id: item.platform_id
        });
        
        // Простой прогноз на основе бенчмарков
        const avgCPM = benchmarks.costs.avg_cpm;
        const avgCTR = benchmarks.engagement.ctr;
        
        const impressions = (item.budget / avgCPM) * 1000;
        const clicks = impressions * (avgCTR / 100);
        const reach = impressions * 0.7; // Примерно 70% уникального охвата
        
        return {
          platform_id: item.platform_id,
          impressions,
          clicks,
          reach
        };
      })
    );
    
    // Суммируем прогнозы
    const totalForecast = forecasts.reduce((acc, f) => ({
      total_impressions: acc.total_impressions + f.impressions,
      total_clicks: acc.total_clicks + f.clicks,
      total_reach: acc.total_reach + f.reach
    }), {
      total_impressions: 0,
      total_clicks: 0,
      total_reach: 0
    });
    
    return {
      ...totalForecast,
      avg_ctr: (totalForecast.total_clicks / totalForecast.total_impressions) * 100,
      by_platform: forecasts
    };
  }
}
```

### AI Strategist

```typescript
/**
 * AI Strategist использует медиаландшафт для стратегических рекомендаций
 */
class AIStrategistAssistant {
  private mediaLandscape: MediaLandscapeService;
  
  constructor() {
    this.mediaLandscape = new MediaLandscapeService();
  }
  
  /**
   * Анализ конкурентов: какие площадки используют
   */
  async analyzeCompetitorPlatforms(
    industry: string,
    competitors: string[]
  ): Promise<CompetitorAnalysis> {
    // Получить данные о том, где размещаются конкуренты
    const industryBenchmarks = await this.mediaLandscape.getIndustryBenchmarks(industry);
    
    // Топ площадок по индустрии
    const topPlatforms = industryBenchmarks
      .sort((a, b) => b.usage_percent - a.usage_percent)
      .slice(0, 10);
    
    return {
      industry,
      top_platforms: topPlatforms,
      recommendations: this.generateStrategicRecommendations(topPlatforms)
    };
  }
  
  /**
   * Генерация стратегических рекомендаций
   */
  private generateStrategicRecommendations(platforms: any[]): string[] {
    const recommendations: string[] = [];
    
    // Анализ трендов
    const videoShare = platforms
      .filter(p => p.category === PlatformCategory.VIDEO)
      .reduce((sum, p) => sum + p.usage_percent, 0);
    
    if (videoShare > 40) {
      recommendations.push(
        'Высокая доля видео в индустрии - рекомендуется увеличить бюджет на видеоплощадки'
      );
    }
    
    const socialShare = platforms
      .filter(p => p.category === PlatformCategory.SOCIAL_MEDIA)
      .reduce((sum, p) => sum + p.usage_percent, 0);
    
    if (socialShare > 50) {
      recommendations.push(
        'Соцсети доминируют в индустрии - ключевой канал коммуникации'
      );
    }
    
    return recommendations;
  }
}
```

---

## 📊 ИНТЕГРАЦИЯ С ДАШБОРДАМИ

### Отображение данных в UI

```typescript
/**
 * Компонент: Карточка площадки
 */
function PlatformCard({ platformId }: { platformId: string }) {
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [pricing, setPricing] = useState<PlatformPricing | null>(null);
  
  useEffect(() => {
    async function loadData() {
      const service = new MediaLandscapeService();
      
      const platformData = await service.getPlatform(platformId);
      const pricingData = await service.getPricing({ platform_id: platformId });
      
      setPlatform(platformData);
      setPricing(pricingData[0]);
    }
    
    loadData();
  }, [platformId]);
  
  if (!platform || !pricing) {
    return <Skeleton />;
  }
  
  return (
    <Card>
      <CardHeader>
        <img src={platform.logo_url} alt={platform.name} />
        <h3>{platform.name}</h3>
        <Badge status={platform.status} />
      </CardHeader>
      
      <CardBody>
        <p>{platform.description}</p>
        
        <Stats>
          <Stat>
            <Label>Месячный охват</Label>
            <Value>{platform.audience.monthly_reach.toLocaleString()}</Value>
          </Stat>
          
          <Stat>
            <Label>Средний CPM</Label>
            <Value>{pricing.prices.cpm?.avg}₽</Value>
          </Stat>
          
          <Stat>
            <Label>Мин. бюджет</Label>
            <Value>{platform.commercial.minimum_budget}₽</Value>
          </Stat>
        </Stats>
        
        <Tags>
          {platform.tags.map(tag => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </Tags>
      </CardBody>
      
      <CardFooter>
        <Button onClick={() => addToPlan(platform)}>
          Добавить в медиаплан
        </Button>
      </CardFooter>
    </Card>
  );
}
```

---

## 🔄 ОБНОВЛЕНИЕ ДАННЫХ

### Импорт новых данных

```typescript
/**
 * Скрипт для импорта медиакитов
 */
import { parse } from 'csv-parse/sync';
import { readFileSync } from 'fs';

async function importMediaKit(csvPath: string, platformId: string) {
  const service = new MediaLandscapeService();
  
  // Читаем CSV
  const content = readFileSync(csvPath, 'utf-8');
  const records = parse(content, {
    columns: true,
    skip_empty_lines: true
  });
  
  // Преобразуем в форматы
  const formats: Partial<Format>[] = records.map((record: any) => ({
    platform_id: platformId,
    code: `${platformId}_${record.Формат.toLowerCase().replace(/\s+/g, '_')}`,
    name: record.Формат,
    format_type: detectFormatType(record['Тип рекламы']),
    placement_type: detectPlacementType(record['В какой контент встраивается?']),
    // ... остальные поля
  }));
  
  // Сохраняем в БД
  for (const format of formats) {
    await service.createFormat(format);
  }
  
  console.log(`Импортировано ${formats.length} форматов`);
}

// Запуск импорта
importMediaKit('./mediakit\'s/VK_Media_Kit_Formats.csv', 'plt_vk_ads_001');
```

---

## ⚡ ОПТИМИЗАЦИЯ И КЭШИРОВАНИЕ

### Кэширование часто используемых данных

```typescript
/**
 * Сервис с кэшированием
 */
class MediaLandscapeService {
  private cache: Map<string, any> = new Map();
  private cacheTTL = 3600000; // 1 час
  
  /**
   * Получить площадку с кэшированием
   */
  async getPlatform(platformId: string): Promise<Platform> {
    const cacheKey = `platform_${platformId}`;
    
    // Проверяем кэш
    const cached = this.getFromCache(cacheKey);
    if (cached) {
      return cached;
    }
    
    // Загружаем из БД
    const platform = await this.db.platforms.findById(platformId);
    
    // Сохраняем в кэш
    this.setCache(cacheKey, platform);
    
    return platform;
  }
  
  private getFromCache(key: string): any | null {
    const item = this.cache.get(key);
    if (!item) return null;
    
    // Проверяем TTL
    if (Date.now() - item.timestamp > this.cacheTTL) {
      this.cache.delete(key);
      return null;
    }
    
    return item.data;
  }
  
  private setCache(key: string, data: any): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }
}
```

---

## 🧪 ТЕСТИРОВАНИЕ

### Unit тесты

```typescript
import { describe, it, expect } from 'vitest';
import { MediaLandscapeService } from './mediaLandscape';

describe('MediaLandscapeService', () => {
  it('should find platforms by category', async () => {
    const service = new MediaLandscapeService();
    
    const platforms = await service.searchPlatforms({
      category: [PlatformCategory.SOCIAL_MEDIA]
    });
    
    expect(platforms.total).toBeGreaterThan(0);
    expect(platforms.platforms[0].category).toBe(PlatformCategory.SOCIAL_MEDIA);
  });
  
  it('should calculate cost estimate correctly', async () => {
    const service = new MediaLandscapeService();
    
    const estimate = await service.estimateCost({
      platform_id: 'plt_vk_ads_001',
      volume: { impressions: 1000000 }
    });
    
    expect(estimate.estimated_cost).toBeGreaterThan(0);
    expect(estimate.breakdown.vat).toBe(estimate.estimated_cost * 0.2 / 1.2);
  });
});
```

---

## 📚 ДОПОЛНИТЕЛЬНЫЕ РЕСУРСЫ

- [Database Schema](./_Database_Schema.md) - Схема БД
- [Data Dictionary](./_Data_Dictionary.md) - Словарь данных
- [TypeScript Types](../../src/types/mediaLandscape.types.ts) - Типы
- [API Documentation (планируется)](./_API_Documentation.md) - API

---

**Версия:** 1.0  
**Дата:** 2025-10-24  
**Авторы:** MRM Dev Team

