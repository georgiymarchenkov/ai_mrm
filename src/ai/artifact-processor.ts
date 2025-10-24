/**
 * AI-агент для обработки и классификации артефактов проекта
 * 
 * Функциональность:
 * - Определение типа артефакта из файла
 * - Извлечение структурированных данных
 * - Валидация и оценка полноты данных
 */

import type { BriefData, MediaPlanData, StrategyData } from '../types/artifacts.types';

// Типы артефактов в системе
export type ArtifactType = 
  | 'brief'              // Бриф клиента
  | 'media_plan'         // Медиаплан
  | 'strategy'           // Стратегия
  | 'report'             // Отчет
  | 'utm_rules'          // Правила UTM
  | 'campaign_setup'     // Настройки кампаний
  | 'team'               // Команда проекта
  | 'budget'             // Бюджет
  | 'creative_brief'     // Креативный бриф
  | 'competitor_analysis'// Анализ конкурентов
  | 'unknown';           // Неизвестный тип

// Результат обработки файла
export interface ProcessingResult {
  // Метаданные
  file_name: string;
  file_type: string;
  processing_time_ms: number;
  
  // Классификация
  artifact_type: ArtifactType;
  confidence: number;  // 0-1, уверенность в определении типа
  
  // Извлеченные данные
  data: BriefData | MediaPlanData | StrategyData | any;
  
  // Качество извлечения
  completeness: number;  // 0-100, процент заполненности
  missing_fields: string[];
  validation_errors: string[];
  
  // Дополнительная информация
  insights: string[];
  recommendations: string[];
}

// Структура для симуляции извлечения данных из Excel
export interface ExcelData {
  sheets: Array<{
    name: string;
    rows: any[][];
    rowCount: number;
    columnCount: number;
  }>;
}

/**
 * AI-агент для обработки артефактов
 */
export class ArtifactProcessor {
  /**
   * Обработка файла с определением типа и извлечением данных
   */
  async processFile(filePath: string): Promise<ProcessingResult> {
    const startTime = Date.now();
    const fileName = filePath.split('/').pop() || filePath;
    
    console.log(`\n📄 Обработка файла: ${fileName}`);
    
    try {
      // Шаг 1: Парсинг файла (симуляция)
      const parsedData = await this.parseFile(filePath);
      
      // Шаг 2: Определение типа артефакта
      const classification = await this.classifyArtifact(fileName, parsedData);
      
      // Шаг 3: Извлечение данных в соответствии с типом
      const extractedData = await this.extractData(
        classification.artifact_type,
        parsedData
      );
      
      // Шаг 4: Валидация и оценка полноты
      const validation = this.validateData(
        classification.artifact_type,
        extractedData
      );
      
      // Шаг 5: Генерация инсайтов
      const insights = this.generateInsights(
        classification.artifact_type,
        extractedData,
        validation
      );
      
      const processingTime = Date.now() - startTime;
      
      const result: ProcessingResult = {
        file_name: fileName,
        file_type: this.getFileType(fileName),
        processing_time_ms: processingTime,
        artifact_type: classification.artifact_type,
        confidence: classification.confidence,
        data: extractedData,
        completeness: validation.completeness,
        missing_fields: validation.missing_fields,
        validation_errors: validation.errors,
        insights: insights.insights,
        recommendations: insights.recommendations,
      };
      
      return result;
    } catch (error) {
      console.error(`❌ Ошибка обработки файла ${fileName}:`, error);
      
      return {
        file_name: fileName,
        file_type: this.getFileType(fileName),
        processing_time_ms: Date.now() - startTime,
        artifact_type: 'unknown',
        confidence: 0,
        data: {},
        completeness: 0,
        missing_fields: [],
        validation_errors: [`Ошибка обработки: ${error}`],
        insights: [],
        recommendations: ['Проверьте формат файла и повторите попытку'],
      };
    }
  }
  
  /**
   * Парсинг файла (симуляция извлечения данных из Excel)
   */
  private async parseFile(filePath: string): Promise<ExcelData> {
    const fileName = filePath.split('/').pop()?.toLowerCase() || '';
    
    // Симуляция: возвращаем структуру на основе имени файла
    // В реальности здесь будет использоваться библиотека для чтения Excel
    
    if (fileName.includes('медиаплан') || fileName.includes('мп')) {
      return {
        sheets: [{
          name: 'Медиаплан',
          rows: [
            ['Канал', 'Бюджет', 'Форматы', 'Показы', 'Клики'],
            ['Яндекс Директ', 500000, 'Поиск, РСЯ', 100000, 2500],
            ['VK Реклама', 300000, 'Лента, Истории', 150000, 4500],
            ['myTarget', 200000, 'Баннеры', 80000, 1600],
          ],
          rowCount: 4,
          columnCount: 5,
        }],
      };
    }
    
    if (fileName.includes('бриф') || fileName.includes('паспорт')) {
      return {
        sheets: [{
          name: 'Бриф',
          rows: [
            ['Параметр', 'Значение'],
            ['Клиент', 'Сбербанк'],
            ['Цель кампании', 'Продвижение премиум карты'],
            ['Бюджет', '15000000'],
            ['География', 'Москва, Санкт-Петербург, Екатеринбург'],
            ['Период', '01.11.2025 - 31.12.2025'],
          ],
          rowCount: 6,
          columnCount: 2,
        }],
      };
    }
    
    if (fileName.includes('отчет') || fileName.includes('report')) {
      return {
        sheets: [{
          name: 'Отчет',
          rows: [
            ['Метрика', 'Значение', 'План', 'Отклонение'],
            ['Показы', 1500000, 1200000, '+25%'],
            ['Клики', 45000, 40000, '+12.5%'],
            ['CTR', '3.0%', '3.3%', '-9%'],
            ['Расход', '4500000', '5000000', '-10%'],
          ],
          rowCount: 5,
          columnCount: 4,
        }],
      };
    }
    
    // Дефолтная структура
    return {
      sheets: [{
        name: 'Sheet1',
        rows: [
          ['A1', 'B1', 'C1'],
          ['A2', 'B2', 'C2'],
        ],
        rowCount: 2,
        columnCount: 3,
      }],
    };
  }
  
  /**
   * Классификация артефакта с помощью AI
   */
  private async classifyArtifact(
    fileName: string,
    parsedData: ExcelData
  ): Promise<{ artifact_type: ArtifactType; confidence: number }> {
    console.log('🔍 Определение типа артефакта...');
    
    const lowerFileName = fileName.toLowerCase();
    
    // Анализ имени файла
    if (lowerFileName.includes('медиаплан') || 
        lowerFileName.includes('мп') ||
        lowerFileName.includes('media') && lowerFileName.includes('plan')) {
      return { artifact_type: 'media_plan', confidence: 0.95 };
    }
    
    if (lowerFileName.includes('бриф') || 
        lowerFileName.includes('brief') ||
        lowerFileName.includes('паспорт')) {
      return { artifact_type: 'brief', confidence: 0.90 };
    }
    
    if (lowerFileName.includes('отчет') || 
        lowerFileName.includes('report') ||
        lowerFileName.includes('daily') ||
        lowerFileName.includes('weekly')) {
      return { artifact_type: 'report', confidence: 0.92 };
    }
    
    if (lowerFileName.includes('стратег') || 
        lowerFileName.includes('strategy')) {
      return { artifact_type: 'strategy', confidence: 0.88 };
    }
    
    if (lowerFileName.includes('utm')) {
      return { artifact_type: 'utm_rules', confidence: 0.93 };
    }
    
    if (lowerFileName.includes('бюджет') || 
        lowerFileName.includes('budget')) {
      return { artifact_type: 'budget', confidence: 0.89 };
    }
    
    if (lowerFileName.includes('регламент') || 
        lowerFileName.includes('roadmap')) {
      return { artifact_type: 'campaign_setup', confidence: 0.85 };
    }
    
    // Анализ содержимого
    const firstSheet = parsedData.sheets[0];
    const headers = firstSheet.rows[0]?.map(h => String(h).toLowerCase()) || [];
    
    if (headers.some(h => h.includes('канал') || h.includes('площадка'))) {
      return { artifact_type: 'media_plan', confidence: 0.85 };
    }
    
    if (headers.some(h => h.includes('параметр') && h.includes('значение'))) {
      return { artifact_type: 'brief', confidence: 0.80 };
    }
    
    if (headers.some(h => h.includes('метрика') || h.includes('факт') || h.includes('план'))) {
      return { artifact_type: 'report', confidence: 0.82 };
    }
    
    return { artifact_type: 'unknown', confidence: 0.5 };
  }
  
  /**
   * Извлечение данных в зависимости от типа артефакта
   */
  private async extractData(
    artifactType: ArtifactType,
    parsedData: ExcelData
  ): Promise<any> {
    console.log(`📊 Извлечение данных для типа: ${artifactType}...`);
    
    switch (artifactType) {
      case 'media_plan':
        return this.extractMediaPlan(parsedData);
      case 'brief':
        return this.extractBrief(parsedData);
      case 'report':
        return this.extractReport(parsedData);
      case 'strategy':
        return this.extractStrategy(parsedData);
      default:
        return { raw_data: parsedData };
    }
  }
  
  /**
   * Извлечение данных медиаплана
   */
  private extractMediaPlan(data: ExcelData): MediaPlanData {
    const sheet = data.sheets[0];
    const [headers, ...rows] = sheet.rows;
    
    const channels = rows.map(row => ({
      name: String(row[0] || ''),
      budget: Number(row[1] || 0),
      formats: row[2] ? String(row[2]).split(',').map(f => f.trim()) : [],
      kpis: {
        impressions: Number(row[3] || 0),
        clicks: Number(row[4] || 0),
      },
    }));
    
    return { channels };
  }
  
  /**
   * Извлечение данных брифа
   */
  private extractBrief(data: ExcelData): BriefData {
    const sheet = data.sheets[0];
    const dataMap = new Map(
      sheet.rows.filter(row => row[0]).map(row => [String(row[0]), row[1]])
    );
    
    const budget = dataMap.get('Бюджет');
    const geography = dataMap.get('География');
    const period = dataMap.get('Период');
    
    return {
      client_name: String(dataMap.get('Клиент') || ''),
      campaign_objective: String(dataMap.get('Цель кампании') || ''),
      budget: {
        total: budget ? Number(budget) : undefined,
        currency: 'RUB',
      },
      geography: geography ? String(geography).split(',').map(g => g.trim()) : [],
      period: period ? this.parsePeriod(String(period)) : undefined,
      target_audience: {
        age: [25, 45],  // Значения по умолчанию
        gender: 'all',
      },
      kpis: {},
    };
  }
  
  /**
   * Извлечение данных отчета
   */
  private extractReport(data: ExcelData): any {
    const sheet = data.sheets[0];
    const [headers, ...rows] = sheet.rows;
    
    const metrics: Record<string, any> = {};
    rows.forEach(row => {
      const metricName = String(row[0] || '').toLowerCase();
      metrics[metricName] = {
        value: row[1],
        plan: row[2],
        deviation: row[3],
      };
    });
    
    return { metrics, summary: 'Отчет обработан' };
  }
  
  /**
   * Извлечение данных стратегии
   */
  private extractStrategy(data: ExcelData): StrategyData {
    return {
      key_insights: ['Инсайт извлечен из файла'],
      recommendations: ['Рекомендация создана'],
    };
  }
  
  /**
   * Валидация извлеченных данных
   */
  private validateData(
    artifactType: ArtifactType,
    data: any
  ): { completeness: number; missing_fields: string[]; errors: string[] } {
    console.log('✓ Валидация данных...');
    
    const missing: string[] = [];
    const errors: string[] = [];
    
    if (artifactType === 'brief') {
      const brief = data as BriefData;
      if (!brief.client_name) missing.push('client_name');
      if (!brief.campaign_objective) missing.push('campaign_objective');
      if (!brief.budget?.total) missing.push('budget.total');
      if (!brief.geography?.length) missing.push('geography');
      
      const totalFields = 8;  // Общее количество важных полей
      const filledFields = totalFields - missing.length;
      const completeness = Math.round((filledFields / totalFields) * 100);
      
      return { completeness, missing_fields: missing, errors };
    }
    
    if (artifactType === 'media_plan') {
      const plan = data as MediaPlanData;
      if (!plan.channels || plan.channels.length === 0) {
        missing.push('channels');
        return { completeness: 0, missing_fields: missing, errors };
      }
      
      let totalFields = plan.channels.length * 4;  // name, budget, formats, kpis
      let filledFields = 0;
      
      plan.channels.forEach((ch, idx) => {
        if (ch.name) filledFields++;
        if (ch.budget) filledFields++;
        if (ch.formats?.length) filledFields++;
        if (ch.kpis && Object.keys(ch.kpis).length > 0) filledFields++;
      });
      
      const completeness = Math.round((filledFields / totalFields) * 100);
      return { completeness, missing_fields: missing, errors };
    }
    
    // Для остальных типов - базовая валидация
    const hasData = Object.keys(data).length > 0;
    return {
      completeness: hasData ? 75 : 0,
      missing_fields: missing,
      errors,
    };
  }
  
  /**
   * Генерация инсайтов и рекомендаций
   */
  private generateInsights(
    artifactType: ArtifactType,
    data: any,
    validation: { completeness: number; missing_fields: string[] }
  ): { insights: string[]; recommendations: string[] } {
    console.log('💡 Генерация инсайтов...');
    
    const insights: string[] = [];
    const recommendations: string[] = [];
    
    // Инсайт о полноте данных
    if (validation.completeness >= 90) {
      insights.push(`✅ Высокая полнота данных: ${validation.completeness}%`);
    } else if (validation.completeness >= 70) {
      insights.push(`⚠️ Средняя полнота данных: ${validation.completeness}%`);
      recommendations.push(`Заполните недостающие поля: ${validation.missing_fields.join(', ')}`);
    } else {
      insights.push(`❌ Низкая полнота данных: ${validation.completeness}%`);
      recommendations.push(`Критически важно заполнить: ${validation.missing_fields.slice(0, 3).join(', ')}`);
    }
    
    // Специфичные инсайты по типу
    if (artifactType === 'media_plan') {
      const plan = data as MediaPlanData;
      if (plan.channels) {
        insights.push(`📊 Обнаружено каналов: ${plan.channels.length}`);
        
        const totalBudget = plan.channels.reduce((sum, ch) => sum + (ch.budget || 0), 0);
        insights.push(`💰 Общий бюджет: ${totalBudget.toLocaleString('ru-RU')} ₽`);
        
        const topChannel = plan.channels.reduce((max, ch) => 
          (ch.budget || 0) > (max.budget || 0) ? ch : max
        );
        insights.push(`🏆 Крупнейший канал: ${topChannel.name} (${((topChannel.budget || 0) / totalBudget * 100).toFixed(1)}%)`);
        
        recommendations.push('Проверьте соответствие бюджетов целям кампании');
        recommendations.push('Убедитесь, что все каналы имеют KPI');
      }
    }
    
    if (artifactType === 'brief') {
      const brief = data as BriefData;
      if (brief.budget?.total) {
        insights.push(`💰 Бюджет кампании: ${brief.budget.total.toLocaleString('ru-RU')} ${brief.budget.currency}`);
      }
      if (brief.geography) {
        insights.push(`🌍 Регионы: ${brief.geography.join(', ')}`);
      }
      
      recommendations.push('Согласуйте бриф с клиентом перед началом планирования');
      recommendations.push('Убедитесь, что указаны все KPI');
    }
    
    return { insights, recommendations };
  }
  
  /**
   * Вспомогательные методы
   */
  private getFileType(fileName: string): string {
    const ext = fileName.split('.').pop()?.toLowerCase();
    return ext || 'unknown';
  }
  
  private parsePeriod(periodStr: string): { start?: string; end?: string } {
    const dates = periodStr.split('-').map(d => d.trim());
    return {
      start: dates[0] || undefined,
      end: dates[1] || undefined,
    };
  }
}

