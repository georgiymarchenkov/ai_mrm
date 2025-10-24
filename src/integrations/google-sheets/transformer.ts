import {
  BriefData,
  MediaPlanData,
  StrategyData,
} from '../../types/artifacts.types';

/**
 * Преобразует данные брифа в формат для Google Sheets.
 * @param data - Данные брифа.
 * @returns Двумерный массив для записи в таблицу.
 */
export function transformBriefToSheet(data: BriefData): any[][] {
  return [
    ['Параметр', 'Значение'],
    ['Клиент', data.client_name || ''],
    ['Цель кампании', data.campaign_objective || ''],
    ['Бюджет', data.budget?.total || ''],
    ['Валюта', data.budget?.currency || 'RUB'],
    ['География', data.geography?.join(', ') || ''],
    [
      'ЦА: возраст',
      data.target_audience?.age
        ? `${data.target_audience.age[0]}-${data.target_audience.age[1]}`
        : '',
    ],
    ['ЦА: пол', data.target_audience?.gender || ''],
    ['Период: начало', data.period?.start || ''],
    ['Период: конец', data.period?.end || ''],
    ['KPI: CPA', data.kpis?.cpa || ''],
    ['KPI: ROMI', data.kpis?.romi || ''],
  ];
}

/**
 * Преобразует данные медиаплана в формат для Google Sheets.
 * @param data - Данные медиаплана.
 * @returns Двумерный массив для записи в таблицу.
 */
export function transformMediaPlanToSheet(data: MediaPlanData): any[][] {
  const rows: any[][] = [['Канал', 'Бюджет', 'Форматы', 'KPI', 'Значения']];

  for (const channel of data.channels || []) {
    rows.push([
      channel.name,
      channel.budget,
      channel.formats?.join(', ') || '',
      Object.keys(channel.kpis || {}).join(', '),
      Object.values(channel.kpis || {}).join(', '),
    ]);
  }

  return rows;
}

/**
 * Преобразует данные стратегии в формат для Google Sheets.
 * @param data - Данные стратегии.
 * @returns Двумерный массив для записи в таблицу.
 */
export function transformStrategyToSheet(data: StrategyData): any[][] {
    const rows: any[][] = [];

    if (data.key_insights && data.key_insights.length > 0) {
        rows.push(['Ключевые инсайты']);
        data.key_insights.forEach(insight => rows.push([insight]));
        rows.push([]); // Пустая строка для разделения
    }

    if (data.recommendations && data.recommendations.length > 0) {
        rows.push(['Рекомендации']);
        data.recommendations.forEach(rec => rows.push([rec]));
    }

    return rows;
}

/**
 * Преобразует данные из формата Google Sheets в объект BriefData.
 * @param sheetData - Двумерный массив данных с листа.
 * @returns Объект BriefData.
 */
export function transformSheetToBrief(sheetData: any[][]): BriefData {
  const dataMap = new Map(sheetData.filter(row => row[0]).map((row) => [row[0], row[1]]));

  const ageMatch = dataMap.get('ЦА: возраст')?.match(/(\d+)-(\d+)/);
  const budgetTotal = dataMap.get('Бюджет');
  const kpaCpa = dataMap.get('KPI: CPA');
  const kpiRomi = dataMap.get('KPI: ROMI');

  return {
    client_name: dataMap.get('Клиент'),
    campaign_objective: dataMap.get('Цель кампании'),
    budget: {
      total: budgetTotal ? parseFloat(budgetTotal) : undefined,
      currency: dataMap.get('Валюта'),
    },
    geography: dataMap.get('География')?.split(', ').map(s => s.trim()),
    target_audience: {
      age: ageMatch ? [parseInt(ageMatch[1]), parseInt(ageMatch[2])] : undefined,
      gender: dataMap.get('ЦА: пол'),
    },
    period: {
      start: dataMap.get('Период: начало'),
      end: dataMap.get('Период: конец'),
    },
    kpis: {
      cpa: kpaCpa ? parseFloat(kpaCpa) : undefined,
      romi: kpiRomi ? parseFloat(kpiRomi) : undefined,
    },
  };
}

/**
 * Преобразует данные из формата Google Sheets в объект MediaPlanData.
 * @param sheetData - Двумерный массив данных с листа.
 * @returns Объект MediaPlanData.
 */
export function transformSheetToMediaPlan(sheetData: any[][]): MediaPlanData {
  if (sheetData.length < 1) return { channels: [] };
  
  const [headers, ...rows] = sheetData;
  const headerMap = new Map(headers.map((header, index) => [header.trim(), index]));

  const channels = rows.map((row) => {
    const kpiKeys = (row[headerMap.get('KPI')!] || '').split(', ');
    const kpiValues = (row[headerMap.get('Значения')!] || '').split(', ');
    const kpis = kpiKeys.reduce((acc, key, index) => {
        const trimmedKey = key.trim();
        if (trimmedKey) {
            const value = kpiValues[index] ? kpiValues[index].trim() : '';
            acc[trimmedKey] = !isNaN(parseFloat(value)) ? parseFloat(value) : value;
        }
        return acc;
    }, {} as Record<string, any>);

    return {
      name: row[headerMap.get('Канал')!],
      budget: parseFloat(row[headerMap.get('Бюджет')!]),
      formats: (row[headerMap.get('Форматы')!] || '').split(', ').map(s => s.trim()),
      kpis,
    };
  });

  return { channels };
}

/**
 * Преобразует данные из формата Google Sheets в объект StrategyData.
 * @param sheetData - Двумерный массив данных с листа.
 * @returns Объект StrategyData.
 */
export function transformSheetToStrategy(sheetData: any[][]): StrategyData {
    const data: StrategyData = { key_insights: [], recommendations: [] };
    let currentSection: 'insights' | 'recommendations' | null = null;

    for (const row of sheetData) {
        const cellValue = row[0];
        if (!cellValue) {
            currentSection = null; // Пустая строка сбрасывает секцию
            continue;
        };
        if (cellValue === 'Ключевые инсайты') {
            currentSection = 'insights';
            continue;
        }
        if (cellValue === 'Рекомендации') {
            currentSection = 'recommendations';
            continue;
        }
        
        if (currentSection === 'insights') {
            data.key_insights?.push(cellValue);
        } else if (currentSection === 'recommendations') {
            data.recommendations?.push(cellValue);
        }
    }
    return data;
}

// TODO: Реализовать обратные трансформации (fromSheetToBrief, etc.)
// для обработки данных, поступающих из вебхуков Google Sheets.
