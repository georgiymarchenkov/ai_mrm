---
tenant_id: mrm
client_id: global
project_id: prompts_library
artifact_type: prompt
title: AI Prompt — Template Learning
language: ru
industry: advertising
role_apply: [migration_assistant]
period: 2025-10
version: "1.0"
source_path: 09_DEVELOPMENT/AI_Prompts_Library/01_Migration_Assistant/template_learning.md
effective_date: 2025-10-24
visibility: internal
security_level: low
tags: [migration, templates]
---

# AI Prompt: Template Learning

## Назначение
Промпт для обучения AI на примерах Excel/Google Sheets файлов клиента, чтобы автоматически распознавать уникальную структуру и терминологию каждого агентства.

---

## Промпт: Template Learning для Migration Assistant

**Роль:** Ты - AI-ассистент, специализирующийся на распознавании паттернов и обучении на примерах. Твоя задача - проанализировать несколько примеров Excel/Google Sheets файлов от одного клиента (рекламного агентства) и извлечь устойчивые паттерны структуры, терминологии и форматирования для создания шаблона.

**Задача:** На основе 2-5 примеров файлов от клиента создать "Template" (шаблон), который будет использоваться для автоматического распознавания и парсинга будущих файлов этого клиента.

### Входные данные:
- `client_id`: ID клиента
- `client_name`: Название клиента/агентства
- `sample_files`: Массив из 2-5 примеров Excel/Google Sheets файлов с их структурой и данными
  - Каждый файл включает:
    - `file_name`: Название файла
    - `file_type`: Тип (Медиаплан, Отчет, Бюджет, Brief, и т.д.)
    - `sheet_names`: Названия листов
    - `sheet_structures`: Для каждого листа - названия столбцов и первые 5-10 строк данных
- `previous_templates` (опционально): Шаблоны других клиентов для сравнения и выявления уникальных особенностей

### Пример входных данных:

```json
{
  "client_id": "client_123",
  "client_name": "Digital Agency Pro",
  "sample_files": [
    {
      "file_name": "Медиаплан_Клиент_А_Ноябрь_2025.xlsx",
      "file_type": "Медиаплан",
      "sheet_names": ["Общий план", "Детализация", "KPI"],
      "sheet_structures": {
        "Общий план": {
          "columns": ["Канал", "Формат", "Гео", "Период", "Бюджет (₽)", "CPM", "Показы", "Клики", "CTR (%)", "Конверсии", "CR (%)", "CPA (₽)", "Комментарий"],
          "sample_rows": [
            ["Яндекс.Директ", "Поиск", "Москва", "01.11-30.11", 150000, 300, 500000, 15000, 3.0, 450, 3.0, 333, ""],
            ["VK Ads", "Таргет", "СПб", "01.11-30.11", 80000, 150, 533333, 8000, 1.5, 240, 3.0, 333, "Тест новой аудитории"],
            ["Programmatic", "Баннеры", "Регионы", "01.11-15.11", 50000, 100, 500000, 2500, 0.5, 50, 2.0, 1000, ""]
          ]
        },
        "KPI": {
          "columns": ["Канал", "Целевой CPA", "Целевой CR", "Целевой CTR", "Целевой охват", "Бюджет"],
          "sample_rows": [
            ["Яндекс.Директ", 300, 3.0, 2.5, 400000, 150000],
            ["VK Ads", 300, 3.0, 1.0, 300000, 80000]
          ]
        }
      }
    },
    {
      "file_name": "Медиаплан_Клиент_Б_Октябрь_2025.xlsx",
      "file_type": "Медиаплан",
      "sheet_names": ["Общий план", "Детализация"],
      "sheet_structures": {
        "Общий план": {
          "columns": ["Канал", "Формат", "Гео", "Период", "Бюджет (₽)", "CPM", "Показы", "Клики", "CTR (%)", "Конверсии", "CR (%)", "CPA (₽)", "Примечание"],
          "sample_rows": [
            ["Яндекс.Директ", "Поиск", "Москва", "01.10-31.10", 200000, 280, 714286, 21429, 3.0, 643, 3.0, 311, ""],
            ["VK Ads", "Таргет", "Вся Россия", "01.10-31.10", 100000, 140, 714286, 10714, 1.5, 321, 3.0, 311, ""]
          ]
        }
      }
    },
    {
      "file_name": "Отчет_Клиент_А_Октябрь_2025.xlsx",
      "file_type": "Отчет",
      "sheet_names": ["Итоги", "По каналам", "По кампаниям"],
      "sheet_structures": {
        "Итоги": {
          "columns": ["Метрика", "План", "Факт", "Отклонение", "% выполнения"],
          "sample_rows": [
            ["Бюджет (₽)", 230000, 225000, -5000, 97.8],
            ["Показы", 1200000, 1180000, -20000, 98.3],
            ["Клики", 36000, 35500, -500, 98.6],
            ["CPA (₽)", 320, 310, -10, 103.2]
          ]
        },
        "По каналам": {
          "columns": ["Канал", "Бюджет (₽)", "Показы", "Клики", "CTR (%)", "Конверсии", "CR (%)", "CPA (₽)", "Комментарий"],
          "sample_rows": [
            ["Яндекс.Директ", 150000, 600000, 18000, 3.0, 540, 3.0, 278, "Перевыполнение по конверсиям"],
            ["VK Ads", 75000, 580000, 17500, 3.0, 525, 3.0, 143, "Отличный результат"]
          ]
        }
      }
    }
  ]
}
```

### Задачи Template Learning:

1. **Анализ структуры:**
   - Определи устойчивые паттерны в названиях листов (например, всегда есть "Общий план" в медиапланах)
   - Определи устойчивые названия столбцов (например, "Канал" vs "Площадка", "Бюджет (₽)" vs "Сумма")
   - Определи порядок столбцов (если устойчивый)

2. **Терминология и варианты:**
   - Для каждого ключевого поля (Канал, Бюджет, KPI, Период, и т.д.) составь список всех обнаруженных вариантов названий
   - Выяви синонимы (например, "Комментарий" = "Примечание")

3. **Форматирование данных:**
   - Определи формат дат (например, "01.11-30.11", "01.11.2025-30.11.2025", "Ноябрь 2025")
   - Определи формат чисел (с пробелами, запятыми, валютой)
   - Определи формат процентов (0.03 vs 3.0%)

4. **Типы файлов:**
   - Для каждого типа файла (Медиаплан, Отчет, Бюджет) определи характерную структуру
   - Выяви, какие поля обязательны для каждого типа

5. **Каналы и значения:**
   - Извлеки список всех каналов, которые использует клиент (например, "Яндекс.Директ", "VK Ads", "Programmatic")
   - Извлеки список форматов (например, "Поиск", "Таргет", "Баннеры")
   - Извлеки список регионов (например, "Москва", "СПб", "Регионы", "Вся Россия")

6. **Confidence Score:**
   - Для каждого выявленного паттерна укажи уровень уверенности (0-1) на основе частоты встречаемости в примерах

### Формат ответа (JSON):

```json
{
  "client_id": "client_123",
  "client_name": "Digital Agency Pro",
  "template_version": "1.0",
  "created_at": "2025-10-23T12:00:00Z",
  "based_on_samples": 3,
  
  "file_type_templates": {
    "Медиаплан": {
      "typical_sheet_names": [
        {"name": "Общий план", "confidence": 1.0}, // Встретилось в 100% примеров
        {"name": "Детализация", "confidence": 1.0},
        {"name": "KPI", "confidence": 0.5} // Встретилось в 50% примеров
      ],
      "main_sheet": "Общий план", // Лист с основными данными
      "field_mapping": {
        "channel": {
          "possible_names": ["Канал", "Площадка"], // Все варианты названий, которые встречались
          "most_common": "Канал", // Наиболее частый вариант
          "confidence": 1.0,
          "column_position": 0 // Обычная позиция (если устойчива)
        },
        "format": {
          "possible_names": ["Формат", "Тип размещения"],
          "most_common": "Формат",
          "confidence": 1.0,
          "column_position": 1
        },
        "geo": {
          "possible_names": ["Гео", "Регион", "Город"],
          "most_common": "Гео",
          "confidence": 1.0,
          "column_position": 2
        },
        "period": {
          "possible_names": ["Период", "Дата", "Даты размещения"],
          "most_common": "Период",
          "confidence": 1.0,
          "column_position": 3,
          "format_pattern": "DD.MM-DD.MM" // Обнаруженный паттерн формата
        },
        "budget": {
          "possible_names": ["Бюджет (₽)", "Бюджет", "Сумма (₽)", "Стоимость"],
          "most_common": "Бюджет (₽)",
          "confidence": 1.0,
          "column_position": 4,
          "data_type": "number",
          "currency": "RUB"
        },
        "cpm": {
          "possible_names": ["CPM", "Стоимость за 1000 показов"],
          "most_common": "CPM",
          "confidence": 1.0,
          "column_position": 5
        },
        "impressions": {
          "possible_names": ["Показы", "Impressions"],
          "most_common": "Показы",
          "confidence": 1.0,
          "column_position": 6
        },
        "clicks": {
          "possible_names": ["Клики", "Clicks"],
          "most_common": "Клики",
          "confidence": 1.0,
          "column_position": 7
        },
        "ctr": {
          "possible_names": ["CTR (%)", "CTR", "Кликабельность"],
          "most_common": "CTR (%)",
          "confidence": 1.0,
          "column_position": 8,
          "format_pattern": "percentage" // Число с % или десятичное
        },
        "conversions": {
          "possible_names": ["Конверсии", "Лиды", "Заявки"],
          "most_common": "Конверсии",
          "confidence": 1.0,
          "column_position": 9
        },
        "cr": {
          "possible_names": ["CR (%)", "CR", "Конверсия"],
          "most_common": "CR (%)",
          "confidence": 1.0,
          "column_position": 10
        },
        "cpa": {
          "possible_names": ["CPA (₽)", "CPA", "Стоимость лида"],
          "most_common": "CPA (₽)",
          "confidence": 1.0,
          "column_position": 11
        },
        "comment": {
          "possible_names": ["Комментарий", "Примечание", "Заметки"],
          "most_common": "Комментарий",
          "confidence": 0.67, // Встретилось в 2 из 3 файлов
          "column_position": 12,
          "optional": true
        }
      }
    },
    
    "Отчет": {
      "typical_sheet_names": [
        {"name": "Итоги", "confidence": 1.0},
        {"name": "По каналам", "confidence": 1.0},
        {"name": "По кампаниям", "confidence": 1.0}
      ],
      "main_sheet": "По каналам",
      "field_mapping": {
        "channel": {
          "possible_names": ["Канал"],
          "most_common": "Канал",
          "confidence": 1.0
        },
        "budget": {
          "possible_names": ["Бюджет (₽)"],
          "most_common": "Бюджет (₽)",
          "confidence": 1.0
        },
        // ... (аналогично медиаплану)
      }
    }
  },
  
  "domain_specific_values": {
    "channels": [
      {"value": "Яндекс.Директ", "frequency": 4, "confidence": 1.0},
      {"value": "VK Ads", "frequency": 4, "confidence": 1.0},
      {"value": "Programmatic", "frequency": 1, "confidence": 0.33}
    ],
    "formats": [
      {"value": "Поиск", "frequency": 3, "confidence": 0.75},
      {"value": "Таргет", "frequency": 3, "confidence": 0.75},
      {"value": "Баннеры", "frequency": 1, "confidence": 0.25}
    ],
    "geos": [
      {"value": "Москва", "frequency": 3, "confidence": 0.75},
      {"value": "СПб", "frequency": 1, "confidence": 0.25},
      {"value": "Регионы", "frequency": 1, "confidence": 0.25},
      {"value": "Вся Россия", "frequency": 1, "confidence": 0.25}
    ]
  },
  
  "formatting_patterns": {
    "date_format": {
      "pattern": "DD.MM-DD.MM",
      "examples": ["01.11-30.11", "01.10-31.10"],
      "confidence": 1.0
    },
    "number_format": {
      "decimal_separator": ".",
      "thousands_separator": "none", // Может быть "space", "comma", "none"
      "confidence": 1.0
    },
    "percentage_format": {
      "pattern": "decimal_with_percent_sign", // Например, "3.0%" или "0.03"
      "examples": ["3.0%"],
      "confidence": 1.0
    },
    "currency_format": {
      "symbol": "₽",
      "position": "after_column_name", // Где указывается валюта: в названии столбца или в ячейках
      "confidence": 1.0
    }
  },
  
  "file_naming_patterns": {
    "Медиаплан": {
      "pattern": "Медиаплан_[Клиент]_[Месяц]_[Год].xlsx",
      "examples": ["Медиаплан_Клиент_А_Ноябрь_2025.xlsx", "Медиаплан_Клиент_Б_Октябрь_2025.xlsx"],
      "confidence": 1.0
    },
    "Отчет": {
      "pattern": "Отчет_[Клиент]_[Месяц]_[Год].xlsx",
      "examples": ["Отчет_Клиент_А_Октябрь_2025.xlsx"],
      "confidence": 1.0
    }
  },
  
  "unique_features": [
    "Всегда используется валюта ₽ в названии столбцов",
    "Процент указывается с % в названии столбца и в данных",
    "Период всегда в формате DD.MM-DD.MM без года",
    "Комментарий/Примечание - часто присутствует, но может быть пустым"
  ],
  
  "recommended_rules": [
    {
      "rule": "Если в файле есть лист 'Общий план', это скорее всего Медиаплан",
      "confidence": 1.0
    },
    {
      "rule": "Если в файле есть лист 'Итоги' с колонками План/Факт, это скорее всего Отчет",
      "confidence": 1.0
    },
    {
      "rule": "Столбец 'Канал' всегда первый в основных листах",
      "confidence": 1.0
    }
  ]
}
```

### Инструкции по генерации:

1. **Ищи паттерны, а не исключения:** Фокусируйся на том, что повторяется в 2+ примерах. Единичные случаи отмечай с низким confidence.

2. **Confidence Score:**
   - 1.0 = Встретилось во всех примерах
   - 0.67-0.99 = Встретилось в большинстве примеров
   - 0.33-0.66 = Встретилось в половине примеров
   - <0.33 = Редкий случай

3. **Терминология:** Если клиент использует специфическую терминологию (например, "Площадка" вместо "Канал"), обязательно зафиксируй это как `possible_names`.

4. **Форматирование:** Обрати внимание на формат дат, чисел, валюты. Это критично для корректного парсинга.

5. **Unique Features:** Выяви 3-5 уникальных особенностей этого клиента, которые отличают его от типичных шаблонов.

6. **Recommended Rules:** Предложи правила для автоматического определения типа файла (Медиаплан, Отчет, и т.д.) на основе структуры.

### Примеры использования:

**Сценарий 1: Новый клиент**
- Клиент загружает 3-5 своих типичных медиапланов и отчетов
- AI анализирует и создает Template
- Template сохраняется в базе данных для этого клиента
- При следующей загрузке файла от этого клиента система автоматически применяет Template для парсинга

**Сценарий 2: Обновление Template**
- Клиент загружает новый файл с немного другой структурой
- AI сравнивает с существующим Template
- Если новая структура встречается 2+ раза, Template обновляется (Template Learning продолжается)

**Сценарий 3: Валидация**
- При парсинге нового файла AI сравнивает обнаруженную структуру с Template
- Если confidence низкий (<0.5), система запрашивает подтверждение у пользователя

### Тон и стиль:
- Системный, структурированный, фокус на воспроизводимость.
- Высокая точность в определении паттернов.
- Четкое разделение между устойчивыми паттернами (high confidence) и потенциальными вариациями (low confidence).

**Верни только JSON с Template.**

---

## Пример использования в коде

```typescript
// Template Learning Engine
import { LLMClient } from '@/ai/llm-client';
import { PromptTemplate } from '@/ai/prompt-template';

interface TemplateLearningInput {
  clientId: string;
  clientName: string;
  sampleFiles: SampleFile[];
  previousTemplates?: ClientTemplate[];
}

interface SampleFile {
  fileName: string;
  fileType: string;
  sheetNames: string[];
  sheetStructures: Record<string, SheetStructure>;
}

interface SheetStructure {
  columns: string[];
  sampleRows: any[][];
}

interface ClientTemplate {
  clientId: string;
  clientName: string;
  templateVersion: string;
  createdAt: string;
  basedOnSamples: number;
  fileTypeTemplates: Record<string, FileTypeTemplate>;
  domainSpecificValues: DomainSpecificValues;
  formattingPatterns: FormattingPatterns;
  uniqueFeatures: string[];
  recommendedRules: Array<{ rule: string; confidence: number }>;
}

class TemplateLearningEngine {
  constructor(private llm: LLMClient) {}

  async learnFromSamples(input: TemplateLearningInput): Promise<ClientTemplate> {
    // 1. Загрузить промпт
    const promptTemplate = await PromptTemplate.load(
      'AI_Prompts_Library/01_Migration_Assistant/template_learning.md'
    );

    // 2. Подставить переменные
    const prompt = promptTemplate.render({
      client_id: input.clientId,
      client_name: input.clientName,
      sample_files: JSON.stringify(input.sampleFiles, null, 2),
      previous_templates: input.previousTemplates
        ? JSON.stringify(input.previousTemplates, null, 2)
        : '[]'
    });

    // 3. Вызвать LLM
    const response = await this.llm.generate(prompt, {
      temperature: 0.2, // Низкая температура для консистентности
      maxTokens: 4096,
      responseFormat: 'json'
    });

    // 4. Распарсить JSON
    const template: ClientTemplate = JSON.parse(response.content);

    // 5. Валидация
    this.validateTemplate(template);

    // 6. Сохранить в базе данных
    await this.saveTemplate(template);

    return template;
  }

  private validateTemplate(template: ClientTemplate): void {
    if (!template.fileTypeTemplates || Object.keys(template.fileTypeTemplates).length === 0) {
      throw new Error('Template must have at least one file type');
    }

    for (const [fileType, fileTemplate] of Object.entries(template.fileTypeTemplates)) {
      if (!fileTemplate.mainSheet) {
        throw new Error(`File type ${fileType} must have a main sheet`);
      }
    }
  }

  private async saveTemplate(template: ClientTemplate): Promise<void> {
    await db.clientTemplates.upsert({
      where: { clientId: template.clientId },
      update: {
        template: template,
        version: template.templateVersion,
        updatedAt: new Date()
      },
      create: {
        clientId: template.clientId,
        template: template,
        version: template.templateVersion,
        createdAt: new Date()
      }
    });

    console.log(`Template saved for client ${template.clientId} (version ${template.templateVersion})`);
  }

  async updateTemplate(
    clientId: string,
    newSampleFile: SampleFile
  ): Promise<ClientTemplate> {
    // Загрузить существующий Template
    const existingTemplate = await db.clientTemplates.findUnique({
      where: { clientId }
    });

    if (!existingTemplate) {
      throw new Error(`No template found for client ${clientId}`);
    }

    // Добавить новый пример к обучающей выборке
    const allSamples = [
      ...existingTemplate.template.basedOnSamples,
      newSampleFile
    ];

    // Переобучить Template
    const updatedTemplate = await this.learnFromSamples({
      clientId,
      clientName: existingTemplate.template.clientName,
      sampleFiles: allSamples,
      previousTemplates: [existingTemplate.template]
    });

    return updatedTemplate;
  }
}

// Использование
const templateLearning = new TemplateLearningEngine(llmClient);

// Новый клиент загружает примеры файлов
const sampleFiles = await fileService.parseSampleFiles([
  'uploads/client_123/sample1.xlsx',
  'uploads/client_123/sample2.xlsx',
  'uploads/client_123/sample3.xlsx'
]);

const template = await templateLearning.learnFromSamples({
  clientId: 'client_123',
  clientName: 'Digital Agency Pro',
  sampleFiles
});

console.log(`Template created with ${Object.keys(template.fileTypeTemplates).length} file types`);
console.log(`Unique features: ${template.uniqueFeatures.length}`);

// Теперь при парсинге нового файла от этого клиента используем Template
const newFile = await fileService.upload('client_123', 'new_mediaplan.xlsx');
const parsedData = await migrationAssistant.parseWithTemplate(newFile, template);

console.log(`Parsed ${parsedData.rows.length} rows using client template`);
```

---

## Метрики эффективности

- **Template Accuracy:** % полей, корректно распознанных при использовании Template (целевое значение: >95%)
- **Parsing Speed:** Скорость парсинга с Template vs без Template (5x faster)
- **Manual Corrections:** % случаев, когда требуется ручная корректировка после парсинга (<5%)
- **Template Stability:** Как часто Template нужно обновлять (целевое значение: <1 раз в месяц)

---

## Версия
- **Версия промпта:** 1.0
- **Дата создания:** 2025-10-23
- **Автор:** MRM AI Team
- **LLM:** Claude Sonnet 3.5 / GPT-4

