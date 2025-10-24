import {
  transformBriefToSheet,
  transformSheetToBrief,
  transformMediaPlanToSheet,
  transformSheetToMediaPlan,
  transformStrategyToSheet,
  transformSheetToStrategy,
} from './transformer';
import { BriefData, MediaPlanData, StrategyData } from '../types/artifacts.types';

describe('Data Transformer', () => {
  describe('Brief transformations', () => {
    const briefData: BriefData = {
      client_name: 'Сбербанк',
      campaign_objective: 'Продвижение',
      budget: { total: 1000000, currency: 'RUB' },
      geography: ['Москва', 'Санкт-Петербург'],
      target_audience: { age: [25, 45], gender: 'all' },
      period: { start: '2025-11-01', end: '2025-11-30' },
      kpis: { cpa: 1500, romi: 200 },
    };

    const briefSheetData = [
      ['Параметр', 'Значение'],
      ['Клиент', 'Сбербанк'],
      ['Цель кампании', 'Продвижение'],
      ['Бюджет', '1000000'],
      ['Валюта', 'RUB'],
      ['География', 'Москва, Санкт-Петербург'],
      ['ЦА: возраст', '25-45'],
      ['ЦА: пол', 'all'],
      ['Период: начало', '2025-11-01'],
      ['Период: конец', '2025-11-30'],
      ['KPI: CPA', '1500'],
      ['KPI: ROMI', '200'],
    ];

    it('should transform BriefData to Sheet format', () => {
      const result = transformBriefToSheet(briefData);
      expect(result).toEqual(briefSheetData);
    });

    it('should transform Sheet format to BriefData', () => {
      const result = transformSheetToBrief(briefSheetData);
      expect(result.client_name).toEqual(briefData.client_name);
      expect(result.budget?.total).toEqual(briefData.budget?.total);
      expect(result.geography).toEqual(briefData.geography);
      expect(result.target_audience?.age).toEqual(briefData.target_audience?.age);
    });
  });

  describe('MediaPlan transformations', () => {
    const mediaPlanData: MediaPlanData = {
      channels: [
        {
          name: 'Яндекс Директ',
          budget: 500000,
          formats: ['Поиск', 'РСЯ'],
          kpis: { impressions: 1000000, clicks: 5000 },
        },
        {
          name: 'VK Реклама',
          budget: 300000,
          formats: ['Лента'],
          kpis: { reach: 500000, cpm: 600 },
        },
      ],
    };

    const mediaPlanSheetData = [
      ['Канал', 'Бюджет', 'Форматы', 'KPI', 'Значения'],
      ['Яндекс Директ', 500000, 'Поиск, РСЯ', 'impressions, clicks', '1000000, 5000'],
      ['VK Реклама', 300000, 'Лента', 'reach, cpm', '500000, 600'],
    ];

    it('should transform MediaPlanData to Sheet format', () => {
      const result = transformMediaPlanToSheet(mediaPlanData);
      expect(result).toEqual(mediaPlanSheetData);
    });

    it('should transform Sheet format to MediaPlanData', () => {
      const result = transformSheetToMediaPlan(mediaPlanSheetData);
      expect(result.channels).toHaveLength(2);
      expect(result.channels?.[0].name).toEqual('Яндекс Директ');
      expect(result.channels?.[0].kpis).toEqual({ impressions: 1000000, clicks: 5000 });
      expect(result.channels?.[1].name).toEqual('VK Реклама');
    });
  });

  describe('Strategy transformations', () => {
    const strategyData: StrategyData = {
        key_insights: ['Инсайт 1', 'Инсайт 2'],
        recommendations: ['Рекомендация 1']
    };

    const strategySheetData = [
        ['Ключевые инсайты'],
        ['Инсайт 1'],
        ['Инсайт 2'],
        [],
        ['Рекомендации'],
        ['Рекомендация 1']
    ];

    it('should transform StrategyData to Sheet format', () => {
        const result = transformStrategyToSheet(strategyData);
        expect(result).toEqual(strategySheetData);
    });

    it('should transform Sheet format to StrategyData', () => {
        const result = transformSheetToStrategy(strategySheetData);
        expect(result).toEqual(strategyData);
    });
  });
});
