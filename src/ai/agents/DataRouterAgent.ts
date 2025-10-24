/**
 * DataRouterAgent - Интеллектуальный агент для определения типа данных и маршрутизации по ролям
 * 
 * Принцип работы:
 * 1. Клиент загружает файл/данные
 * 2. Agent определяет тип (медиаплан/исследование/выгрузка/и т.д.)
 * 3. Agent маршрутизирует к соответствующей роли
 * 4. Agent структурирует данные по базе проекта
 * 5. Agent уведомляет роль и предлагает следующие шаги
 * 
 * НЕ КАСТОМНОЕ РЕШЕНИЕ - СЛЕДОВАНИЕ СКРИПТАМ!
 */

import { LLMClient } from '../core/LLMClient';
import { MediaLandscapeService } from '../services/MediaLandscapeService';
import { VectorDBService } from '../services/VectorDBService';

// ==================== ТИПЫ ====================

type DataType = 
  | 'media_plan'      // Медиаплан (Excel с площадками и бюджетами)
  | 'research'        // Исследование (PDF/DOCX)
  | 'export'          // Выгрузка из систем (CSV/JSON)
  | 'brief'           // Бриф (PDF/DOCX/Email)
  | 'creative'        // Креатив (PNG/JPG/MP4)
  | 'report'          // Отчет (PDF/DOCX)
  | 'unknown';        // Неизвестный тип

type Role = 
  | 'Specialist'
  | 'Strategist'
  | 'Analyst'
  | 'Account_Manager'
  | 'Creative'
  | 'Project_Manager';

interface DetectedData {
  type: DataType;
  confidence: number;
  metadata: Record<string, any>;
}

interface ProcessedData {
  type: DataType;
  role: Role;
  data: any;
  recommendations: string[];
  next_steps: string[];
}

// ==================== ГЛАВНЫЙ АГЕНТ ====================

export class DataRouterAgent {
  constructor(
    private llm: LLMClient,
    private mediaLandscape: MediaLandscapeService,
    private vectorDB: VectorDBService
  ) {}

  /**
   * ГЛАВНЫЙ МЕТОД - обработка входящих данных от клиента
   */
  async processClientInput(input: File | string): Promise<ProcessedData> {
    console.log('📥 Получены данные от клиента...');
    
    // ШАГ 1: Определение типа данных
    const detected = await this.detectDataType(input);
    console.log(`🔍 Обнаружен тип: ${detected.type} (confidence: ${detected.confidence})`);
    
    // ШАГ 2: Маршрутизация по роли
    const targetRole = this.mapTypeToRole(detected.type);
    console.log(`👤 Роль-владелец: ${targetRole}`);
    
    // ШАГ 3: Выбор и запуск обработчика
    const processor = this.getProcessor(detected.type);
    const processedData = await processor.process(input, detected.metadata);
    console.log(`✅ Данные обработаны: ${JSON.stringify(processedData).length} байт`);
    
    // ШАГ 4: Структурирование по проекту
    const structured = await this.structureByProject(processedData, targetRole);
    console.log(`💾 Данные структурированы и сохранены`);
    
    // ШАГ 5: Уведомление роли
    await this.notifyRole(targetRole, structured);
    console.log(`📧 Роль ${targetRole} уведомлена`);
    
    // ШАГ 6: AI рекомендации
    const recommendations = await this.generateRecommendations(structured, detected.type);
    console.log(`💡 Сгенерировано ${recommendations.length} рекомендаций`);
    
    // ШАГ 7: Следующие шаги
    const nextSteps = this.getNextSteps(detected.type, structured);
    
    return {
      type: detected.type,
      role: targetRole,
      data: structured,
      recommendations,
      next_steps
    };
  }

  /**
   * ОПРЕДЕЛЕНИЕ ТИПА ДАННЫХ
   * Использует эвристики + AI для классификации
   */
  private async detectDataType(input: File | string): Promise<DetectedData> {
    if (input instanceof File) {
      const ext = input.name.split('.').pop()?.toLowerCase();
      const content = await this.readFile(input);
      
      // EXCEL/CSV - проверяем структуру
      if (['xlsx', 'xls', 'csv'].includes(ext || '')) {
        // Медиаплан?
        if (this.hasMediaPlanStructure(content)) {
          return {
            type: 'media_plan',
            confidence: 0.95,
            metadata: { 
              format: ext,
              rows: content.length,
              platforms_count: this.countUniquePlatforms(content)
            }
          };
        }
        
        // Выгрузка из системы?
        if (this.hasExportStructure(content)) {
          const source = this.detectExportSource(content);
          return {
            type: 'export',
            confidence: 0.90,
            metadata: { 
              format: ext,
              source: source, // 'yandex_direct' | 'vk_ads' | etc
              campaigns_count: content.length
            }
          };
        }
      }
      
      // PDF/DOCX - AI анализ
      if (['pdf', 'docx', 'doc'].includes(ext || '')) {
        const text = await this.extractText(input);
        const classification = await this.classifyDocument(text);
        
        return {
          type: classification.type as DataType,
          confidence: classification.confidence,
          metadata: {
            format: ext,
            pages: classification.pages,
            language: 'ru'
          }
        };
      }
      
      // Изображения/видео - креативы
      if (['jpg', 'jpeg', 'png', 'gif', 'mp4', 'mov', 'avi'].includes(ext || '')) {
        return {
          type: 'creative',
          confidence: 1.0,
          metadata: {
            format: ext,
            mime_type: input.type,
            size: input.size
          }
        };
      }
    }
    
    // Текст (email, сообщение)
    if (typeof input === 'string') {
      const classification = await this.classifyText(input);
      return {
        type: classification.type as DataType,
        confidence: classification.confidence,
        metadata: {
          length: input.length,
          source: 'text'
        }
      };
    }
    
    return {
      type: 'unknown',
      confidence: 0.0,
      metadata: {}
    };
  }

  /**
   * ПРОВЕРКА СТРУКТУРЫ МЕДИАПЛАНА
   */
  private hasMediaPlanStructure(data: any[]): boolean {
    if (!Array.isArray(data) || data.length === 0) return false;
    
    const firstRow = data[0];
    const requiredColumns = [
      'площадка', 'platform', 'site',
      'бюджет', 'budget',
      'cpm', 'цена'
    ];
    
    const keys = Object.keys(firstRow).map(k => k.toLowerCase());
    
    // Должно быть хотя бы 2 из требуемых колонок
    const matches = requiredColumns.filter(col => 
      keys.some(k => k.includes(col))
    );
    
    return matches.length >= 2;
  }

  /**
   * ПРОВЕРКА СТРУКТУРЫ ВЫГРУЗКИ
   */
  private hasExportStructure(data: any[]): boolean {
    if (!Array.isArray(data) || data.length === 0) return false;
    
    const firstRow = data[0];
    const exportColumns = [
      'показы', 'impressions',
      'клики', 'clicks',
      'расход', 'cost', 'spend',
      'дата', 'date'
    ];
    
    const keys = Object.keys(firstRow).map(k => k.toLowerCase());
    
    // Должно быть хотя бы 3 из метрических колонок
    const matches = exportColumns.filter(col => 
      keys.some(k => k.includes(col))
    );
    
    return matches.length >= 3;
  }

  /**
   * ОПРЕДЕЛЕНИЕ ИСТОЧНИКА ВЫГРУЗКИ
   */
  private detectExportSource(data: any[]): string {
    const firstRow = data[0];
    const keys = Object.keys(firstRow).map(k => k.toLowerCase());
    
    if (keys.some(k => k.includes('id кампании'))) return 'yandex_direct';
    if (keys.some(k => k.includes('account_id'))) return 'vk_ads';
    if (keys.some(k => k.includes('campaign_id') && k.includes('google'))) return 'google_ads';
    
    return 'unknown';
  }

  /**
   * AI КЛАССИФИКАЦИЯ ДОКУМЕНТА
   */
  private async classifyDocument(text: string) {
    const prompt = `
Определи тип документа на основе содержания:

Типы:
- "brief" - бриф клиента (цели, задачи, бюджет, сроки)
- "research" - исследование рынка (анализ, инсайты, данные)
- "report" - отчет по кампании (метрики, результаты)

Текст документа:
${text.substring(0, 2000)}

Ответ в JSON:
{
  "type": "brief" | "research" | "report",
  "confidence": 0.0-1.0,
  "pages": количество страниц,
  "reason": "почему этот тип"
}
`;

    const response = await this.llm.generate(prompt, { format: 'json' });
    return JSON.parse(response);
  }

  /**
   * AI КЛАССИФИКАЦИЯ ТЕКСТА
   */
  private async classifyText(text: string) {
    const prompt = `
Определи тип сообщения:

Типы:
- "brief" - клиент присылает бриф
- "question" - вопрос клиента
- "request" - запрос на действие
- "feedback" - обратная связь

Текст:
${text}

Ответ в JSON:
{
  "type": "brief" | "question" | "request" | "feedback",
  "confidence": 0.0-1.0,
  "reason": "почему"
}
`;

    const response = await this.llm.generate(prompt, { format: 'json' });
    return JSON.parse(response);
  }

  /**
   * МАРШРУТИЗАЦИЯ ТИП → РОЛЬ
   */
  private mapTypeToRole(type: DataType): Role {
    const mapping: Record<DataType, Role> = {
      'media_plan': 'Specialist',
      'research': 'Strategist',
      'export': 'Analyst',
      'brief': 'Account_Manager',
      'creative': 'Creative',
      'report': 'Analyst',
      'unknown': 'Project_Manager'
    };
    
    return mapping[type];
  }

  /**
   * ПОЛУЧЕНИЕ ОБРАБОТЧИКА ДЛЯ ТИПА
   */
  private getProcessor(type: DataType): DataProcessor {
    const processors = {
      'media_plan': new MediaPlanProcessor(this.llm, this.mediaLandscape),
      'research': new ResearchProcessor(this.llm, this.vectorDB),
      'export': new ExportProcessor(this.llm),
      'brief': new BriefProcessor(this.llm),
      'creative': new CreativeProcessor(this.llm),
      'report': new ReportProcessor(this.llm)
    };
    
    return processors[type] || new GenericProcessor(this.llm);
  }

  /**
   * СТРУКТУРИРОВАНИЕ ПО ПРОЕКТУ
   */
  private async structureByProject(data: any, role: Role): Promise<any> {
    // Определяем путь сохранения в зависимости от роли
    const paths = {
      'Specialist': 'Media_Plans/',
      'Strategist': 'Strategy/',
      'Analyst': 'Analytics/Raw_Data/',
      'Account_Manager': 'Brief/',
      'Creative': 'Creatives/',
      'Project_Manager': 'Misc/'
    };
    
    const savePath = paths[role];
    
    // Структурируем данные
    const structured = {
      id: this.generateId(),
      created_at: new Date().toISOString(),
      role: role,
      path: savePath,
      data: data
    };
    
    // Сохраняем в базу проекта
    await this.saveToProjectDB(structured);
    
    return structured;
  }

  /**
   * УВЕДОМЛЕНИЕ РОЛИ
   */
  private async notifyRole(role: Role, data: any): Promise<void> {
    console.log(`📧 Отправка уведомления роли: ${role}`);
    
    // Здесь будет реальная отправка уведомлений
    // Email, Slack, in-app notification и т.д.
    
    await this.sendNotification({
      recipient: role,
      type: 'new_data',
      data: {
        type: data.data.type || 'unknown',
        summary: this.generateSummary(data),
        path: data.path
      }
    });
  }

  /**
   * ГЕНЕРАЦИЯ РЕКОМЕНДАЦИЙ
   */
  private async generateRecommendations(data: any, type: DataType): Promise<string[]> {
    const prompt = `
На основе данных типа "${type}" предложи 3-5 рекомендаций по дальнейшей работе.

Данные:
${JSON.stringify(data.data, null, 2).substring(0, 1000)}

Рекомендации должны быть:
- Конкретными и actionable
- Связанными с ролью ${data.role}
- Учитывающими наши процессы и принципы

Ответ в JSON массиве строк:
["рекомендация 1", "рекомендация 2", ...]
`;

    const response = await this.llm.generate(prompt, { format: 'json' });
    return JSON.parse(response);
  }

  /**
   * СЛЕДУЮЩИЕ ШАГИ
   */
  private getNextSteps(type: DataType, data: any): string[] {
    const steps: Record<DataType, string[]> = {
      'media_plan': [
        'Проверить соответствие площадок с медиаландшафтом',
        'Сравнить CPM с бенчмарками',
        'Уточнить условия с площадками',
        'Запустить процесс 05_Campaign_Preparation'
      ],
      'research': [
        'Review исследования Strategist-ом',
        'Извлечь ключевые инсайты для стратегии',
        'Добавить в knowledge base',
        'Использовать в следующем брифинге'
      ],
      'export': [
        'Рассчитать производные метрики (CTR, CPA, ROI)',
        'Сравнить с целевыми KPI',
        'Выявить аномалии и отклонения',
        'Создать dashboard и отчет для клиента'
      ],
      'brief': [
        'Запустить процесс 01_Briefing',
        'Назначить роли на проект',
        'AI сгенерирует первичную стратегию',
        'Подобрать площадки из медиаландшафта'
      ],
      'creative': [
        'Проверить технические требования',
        'Проверить compliance',
        'Добавить к кампании',
        'Подготовить к загрузке на площадки'
      ],
      'report': [
        'Review аналитиком',
        'Отправить клиенту',
        'Обновить дашборды'
      ],
      'unknown': [
        'Требуется ручная классификация',
        'Связаться с Project Manager'
      ]
    };
    
    return steps[type] || [];
  }

  // ==================== ВСПОМОГАТЕЛЬНЫЕ МЕТОДЫ ====================

  private async readFile(file: File): Promise<any[]> {
    // Реализация чтения файла (Excel/CSV/JSON)
    // Возвращает массив объектов
    return [];
  }

  private async extractText(file: File): Promise<string> {
    // Реализация извлечения текста (PDF/DOCX)
    return '';
  }

  private countUniquePlatforms(data: any[]): number {
    const platforms = new Set(
      data.map(row => row['площадка'] || row['platform'] || row['site'])
    );
    return platforms.size;
  }

  private generateId(): string {
    return `data_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateSummary(data: any): string {
    // Генерация краткого описания для уведомления
    return `Обработаны данные типа ${data.data.type}`;
  }

  private async saveToProjectDB(data: any): Promise<void> {
    // Сохранение в базу проекта
    console.log(`💾 Сохранение: ${data.path}${data.id}.json`);
  }

  private async sendNotification(notification: any): Promise<void> {
    // Отправка уведомления
    console.log(`📧 Уведомление: ${JSON.stringify(notification)}`);
  }
}

// ==================== ИНТЕРФЕЙС ОБРАБОТЧИКА ====================

abstract class DataProcessor {
  constructor(protected llm: LLMClient) {}
  
  abstract process(input: File | string, metadata: any): Promise<any>;
}

// ==================== ОБРАБОТЧИК МЕДИАПЛАНОВ ====================

class MediaPlanProcessor extends DataProcessor {
  constructor(
    llm: LLMClient,
    private mediaLandscape: MediaLandscapeService
  ) {
    super(llm);
  }

  async process(input: File, metadata: any): Promise<any> {
    console.log('📊 Обработка медиаплана...');
    
    // 1. Извлечь данные
    const data = await this.parseMediaPlan(input);
    
    // 2. Обогатить из медиаландшафта
    for (const line of data.lines) {
      const platform = await this.mediaLandscape.findPlatform(line.platform);
      
      if (platform) {
        line.benchmark_cpm = platform.source_data.cpm;
        line.min_budget = platform.source_data.min_budget;
        line.contact = platform.source_data.contacts?.email;
        line.deviation = this.calculateDeviation(line.cpm, line.benchmark_cpm);
      }
    }
    
    // 3. Рассчитать метрики
    data.total_budget = data.lines.reduce((sum, l) => sum + l.budget, 0);
    data.platforms_count = new Set(data.lines.map(l => l.platform)).size;
    data.avg_cpm = data.lines.reduce((sum, l) => sum + l.cpm, 0) / data.lines.length;
    
    return {
      type: 'media_plan',
      source_file: input.name,
      ...data
    };
  }

  private async parseMediaPlan(file: File): Promise<any> {
    // Парсинг Excel/CSV
    return {
      lines: []
    };
  }

  private calculateDeviation(actual: number, benchmark: number): number {
    return ((actual - benchmark) / benchmark) * 100;
  }
}

// ==================== ОБРАБОТЧИК ИССЛЕДОВАНИЙ ====================

class ResearchProcessor extends DataProcessor {
  constructor(
    llm: LLMClient,
    private vectorDB: VectorDBService
  ) {
    super(llm);
  }

  async process(input: File, metadata: any): Promise<any> {
    console.log('🔬 Обработка исследования...');
    
    // 1. Извлечь текст
    const text = await this.extractText(input);
    
    // 2. AI анализ
    const analysis = await this.analyzeResearch(text);
    
    // 3. Индексировать в Vector DB
    await this.vectorDB.addDocument({
      id: this.generateId(),
      content: analysis.summary,
      metadata: {
        type: 'research',
        industry: analysis.industry,
        date: new Date().toISOString()
      }
    });
    
    return {
      type: 'research',
      source_file: input.name,
      ...analysis
    };
  }

  private async extractText(file: File): Promise<string> {
    // OCR / парсинг PDF
    return '';
  }

  private async analyzeResearch(text: string): Promise<any> {
    const prompt = `
Проанализируй исследование и извлеки:

1. Тип исследования (market/competitor/audience)
2. Индустрия
3. География
4. Период актуальности
5. Ключевые инсайты (5-10)
6. Цифры и метрики
7. Краткое резюме (2-3 предложения)

Текст исследования:
${text.substring(0, 3000)}

Ответ в JSON:
{
  "type": "market" | "competitor" | "audience",
  "industry": "индустрия",
  "geography": "география",
  "period": "период",
  "insights": ["инсайт 1", "инсайт 2", ...],
  "metrics": {"метрика": значение},
  "summary": "краткое резюме"
}
`;

    const response = await this.llm.generate(prompt, { format: 'json' });
    return JSON.parse(response);
  }

  private generateId(): string {
    return `research_${Date.now()}`;
  }
}

// ==================== ДРУГИЕ ОБРАБОТЧИКИ ====================

class ExportProcessor extends DataProcessor {
  async process(input: File, metadata: any): Promise<any> {
    console.log('📤 Обработка выгрузки...');
    // Реализация
    return { type: 'export' };
  }
}

class BriefProcessor extends DataProcessor {
  async process(input: File | string, metadata: any): Promise<any> {
    console.log('📋 Обработка брифа...');
    // Реализация
    return { type: 'brief' };
  }
}

class CreativeProcessor extends DataProcessor {
  async process(input: File, metadata: any): Promise<any> {
    console.log('🎨 Обработка креатива...');
    // Реализация
    return { type: 'creative' };
  }
}

class ReportProcessor extends DataProcessor {
  async process(input: File, metadata: any): Promise<any> {
    console.log('📊 Обработка отчета...');
    // Реализация
    return { type: 'report' };
  }
}

class GenericProcessor extends DataProcessor {
  async process(input: any, metadata: any): Promise<any> {
    console.log('❓ Обработка неизвестного типа...');
    return { type: 'unknown' };
  }
}

