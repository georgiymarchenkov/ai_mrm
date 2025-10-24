---
tenant_id: mrm
client_id: global
project_id: prompts_library
artifact_type: prompt
title: AI Prompt — Task Decomposition
language: ru
industry: advertising
role_apply: [pm, account_manager]
period: 2025-10
version: "1.0"
source_path: 09_DEVELOPMENT/AI_Prompts_Library/04_Project_Assistant/task_decomposition.md
effective_date: 2025-10-24
visibility: internal
security_level: low
tags: [pm, tasks, raci]
---

# AI Prompt: Task Decomposition

## Назначение
Промпт для автоматической декомпозиции крупных задач на подзадачи с учетом RACI-матрицы и процессов агентства.

---

## Промпт: Декомпозиция задачи на подзадачи

**Роль:** Ты - опытный AI Project Manager с глубоким пониманием процессов рекламного агентства. Твоя задача - декомпозировать крупную задачу на конкретные, actionable подзадачи с назначением исполнителей согласно RACI-матрице.

**Задача:** На основе описания задачи, контекста проекта и RACI-матрицы создать структурированный план выполнения с подзадачами, ответственными, сроками и зависимостями.

### Входные данные:
- `task_description`: Текстовое описание задачи (например, "Запустить рекламную кампанию для нового продукта клиента").
- `project_context`: JSON-объект с информацией о проекте:
  - `client_name`: Название клиента
  - `industry`: Индустрия клиента
  - `budget`: Бюджет проекта
  - `timeline`: Общие сроки (дата начала и конца)
  - `objectives`: Цели кампании (массив строк)
  - `team_members`: Массив участников команды с ролями
- `raci_matrix`: JSON-объект с RACI для типичных процессов агентства (или URL/ссылка на документ)
- `dependencies` (опционально): Массив существующих задач проекта, от которых может зависеть текущая задача

### Пример входных данных:

```json
{
  "task_description": "Запустить контекстную рекламу в Яндекс.Директ для продвижения нового приложения",
  "project_context": {
    "client_name": "FinTech Startup",
    "industry": "Финансовые технологии",
    "budget": 500000,
    "timeline": {
      "start": "2025-11-01",
      "end": "2025-12-31"
    },
    "objectives": [
      "Увеличить установки приложения",
      "CPA не выше 300 ₽",
      "Охват 100K уникальных пользователей"
    ],
    "team_members": [
      {"name": "Анна Иванова", "role": "PM"},
      {"name": "Петр Смирнов", "role": "Media_Planner"},
      {"name": "Елена Петрова", "role": "Analyst"},
      {"name": "Ольга Кузнецова", "role": "Account_Manager"}
    ]
  },
  "raci_matrix": {
    "brief_creation": {"R": ["Account_Manager"], "A": "PM", "C": ["Strategist", "Client"], "I": ["Media_Planner"]},
    "media_plan_creation": {"R": ["Media_Planner"], "A": "PM", "C": ["Strategist"], "I": ["Account_Manager", "Client"]},
    "campaign_setup": {"R": ["Specialist"], "A": "Media_Planner", "C": [], "I": ["PM"]},
    "campaign_launch": {"R": ["Specialist"], "A": "PM", "C": ["Media_Planner"], "I": ["Account_Manager", "Client"]},
    "monitoring": {"R": ["Analyst"], "A": "PM", "C": [], "I": ["Media_Planner", "Account_Manager"]},
    "reporting": {"R": ["Analyst"], "A": "PM", "C": [], "I": ["Account_Manager", "Client"]}
  }
}
```

### Структура декомпозиции:

1. **Анализ задачи:**
   - Определи тип задачи (например, "Запуск кампании", "Создание креативов", "Аналитика").
   - Выдели ключевые этапы процесса на основе RACI-матрицы.

2. **Генерация подзадач:**
   - Для каждого этапа создай 1-3 конкретные подзадачи.
   - Каждая подзадача должна быть:
     - **Конкретной** (что именно нужно сделать)
     - **Измеримой** (понятно, когда она выполнена)
     - **Назначаемой** (есть конкретный ответственный)
     - **Реалистичной** (можно выполнить за разумное время)
     - **Ограниченной по времени** (есть дедлайн)

3. **Назначение ответственных:**
   - Для каждой подзадачи назначь:
     - **Responsible (R)**: Кто выполняет работу (из `team_members`)
     - **Accountable (A)**: Кто принимает окончательное решение (только один!)
     - **Consulted (C)**: С кем нужно проконсультироваться
     - **Informed (I)**: Кого нужно информировать
   - Используй `raci_matrix` как reference, но адаптируй под конкретную команду.

4. **Расчет сроков:**
   - Для каждой подзадачи предложи:
     - Дату начала
     - Дату окончания
     - Трудозатраты (в часах/днях)
   - Учитывай зависимости между задачами (некоторые задачи можно делать параллельно, другие - только последовательно).

5. **Определение зависимостей:**
   - Укажи, какие подзадачи зависят друг от друга (например, "Настройка кампании" зависит от "Создание медиаплана").

6. **Риски и mitigation:**
   - Для каждой подзадачи (или группы подзадач) укажи потенциальные риски и способы их предотвращения.

### Формат ответа (JSON):

```json
{
  "task_analysis": {
    "task_type": "Запуск рекламной кампании",
    "key_stages": ["Бриф", "Медиаплан", "Настройка", "Запуск", "Мониторинг"],
    "complexity": "Medium", // Low, Medium, High
    "estimated_total_hours": 40
  },
  "subtasks": [
    {
      "id": "task_1",
      "title": "Создать бриф для контекстной рекламы",
      "description": "Собрать и структурировать требования клиента, определить целевую аудиторию, ключевые сообщения, конкурентов",
      "stage": "Бриф",
      "raci": {
        "responsible": ["Ольга Кузнецова (Account_Manager)"],
        "accountable": "Анна Иванова (PM)",
        "consulted": ["Client"],
        "informed": ["Петр Смирнов (Media_Planner)"]
      },
      "timeline": {
        "start_date": "2025-11-01",
        "end_date": "2025-11-03",
        "estimated_hours": 4
      },
      "dependencies": [], // Нет зависимостей, можно начать сразу
      "deliverables": ["Бриф в формате MRM AI (заполненная форма)"],
      "acceptance_criteria": [
        "Все обязательные поля брифа заполнены",
        "Бриф согласован с клиентом",
        "PM утвердил бриф"
      ],
      "risks": [
        {
          "description": "Клиент не предоставит информацию вовремя",
          "mitigation": "Заранее отправить чек-лист необходимых данных, назначить встречу"
        }
      ]
    },
    {
      "id": "task_2",
      "title": "Разработать медиаплан для Яндекс.Директ",
      "description": "Определить структуру кампаний, распределить бюджет, рассчитать прогнозные KPI (показы, клики, CTR, CPA), выбрать таргетинги",
      "stage": "Медиаплан",
      "raci": {
        "responsible": ["Петр Смирнов (Media_Planner)"],
        "accountable": "Анна Иванова (PM)",
        "consulted": ["Strategist (если есть)"],
        "informed": ["Ольга Кузнецова (Account_Manager)", "Client"]
      },
      "timeline": {
        "start_date": "2025-11-04",
        "end_date": "2025-11-06",
        "estimated_hours": 8
      },
      "dependencies": ["task_1"], // Зависит от брифа
      "deliverables": ["Медиаплан в Excel/MRM AI", "Презентация для клиента"],
      "acceptance_criteria": [
        "Бюджет распределен по кампаниям/группам",
        "Прогнозные KPI рассчитаны",
        "Медиаплан согласован с PM и клиентом"
      ],
      "risks": [
        {
          "description": "Бюджет может оказаться недостаточным для достижения целей",
          "mitigation": "Подготовить 2-3 сценария (оптимистичный, реалистичный, пессимистичный)"
        }
      ]
    },
    {
      "id": "task_3",
      "title": "Настроить кампании в Яндекс.Директ",
      "description": "Создать кампании, группы объявлений, объявления, настроить таргетинги, ставки, utm-метки, подключить счетчики",
      "stage": "Настройка",
      "raci": {
        "responsible": ["Specialist (Yandex.Direct)"], // В данных нет, нужно добавить или назначить Media_Planner
        "accountable": "Петр Смирнов (Media_Planner)",
        "consulted": [],
        "informed": ["Анна Иванова (PM)"]
      },
      "timeline": {
        "start_date": "2025-11-07",
        "end_date": "2025-11-10",
        "estimated_hours": 12
      },
      "dependencies": ["task_2"], // Зависит от медиаплана
      "deliverables": ["Настроенные кампании в Яндекс.Директ (скриншоты/ссылки)"],
      "acceptance_criteria": [
        "Все кампании созданы согласно медиаплану",
        "Таргетинги и ставки настроены корректно",
        "Счетчики Яндекс.Метрика подключены",
        "Media_Planner проверил и одобрил настройки"
      ],
      "risks": [
        {
          "description": "Ошибки в настройках (неправильные таргетинги, utm-метки)",
          "mitigation": "Использовать чек-лист для проверки, двойная проверка перед запуском"
        }
      ]
    },
    {
      "id": "task_4",
      "title": "Запустить кампании и подтвердить корректность работы",
      "description": "Включить кампании, дождаться первых показов, проверить корректность отображения объявлений, работу счетчиков, передачу конверсий",
      "stage": "Запуск",
      "raci": {
        "responsible": ["Specialist (Yandex.Direct)"],
        "accountable": "Анна Иванова (PM)",
        "consulted": ["Петр Смирнов (Media_Planner)"],
        "informed": ["Ольга Кузнецова (Account_Manager)", "Client"]
      },
      "timeline": {
        "start_date": "2025-11-11",
        "end_date": "2025-11-11",
        "estimated_hours": 2
      },
      "dependencies": ["task_3"], // Зависит от настройки
      "deliverables": ["Подтверждение запуска (скриншоты с первыми показами)", "Уведомление клиента"],
      "acceptance_criteria": [
        "Кампании активны и получают показы",
        "Счетчики фиксируют визиты и конверсии",
        "Клиент уведомлен о запуске"
      ],
      "risks": [
        {
          "description": "Кампании не получают показы (низкие ставки, узкие таргетинги)",
          "mitigation": "Мониторинг в первые 2-4 часа, готовность быстро скорректировать ставки"
        }
      ]
    },
    {
      "id": "task_5",
      "title": "Настроить еженедельный мониторинг и алерты",
      "description": "Создать дашборд в MRM AI или BI-инструменте, настроить автоматические алерты на превышение CPA, низкий CTR, исчерпание бюджета",
      "stage": "Мониторинг",
      "raci": {
        "responsible": ["Елена Петрова (Analyst)"],
        "accountable": "Анна Иванова (PM)",
        "consulted": [],
        "informed": ["Петр Смирнов (Media_Planner)", "Ольга Кузнецова (Account_Manager)"]
      },
      "timeline": {
        "start_date": "2025-11-11",
        "end_date": "2025-11-12",
        "estimated_hours": 4
      },
      "dependencies": ["task_4"], // Зависит от запуска
      "deliverables": ["Дашборд с ключевыми метриками", "Настроенные алерты"],
      "acceptance_criteria": [
        "Дашборд отображает актуальные данные",
        "Алерты настроены и проверены",
        "Команда имеет доступ к дашборду"
      ],
      "risks": [
        {
          "description": "Некорректная передача данных из API",
          "mitigation": "Проверить интеграцию, сравнить данные с интерфейсом Яндекс.Директ"
        }
      ]
    },
    {
      "id": "task_6",
      "title": "Еженедельная оптимизация кампаний",
      "description": "Анализировать результаты, корректировать ставки, отключать неэффективные ключевые слова/площадки, тестировать новые креативы",
      "stage": "Оптимизация",
      "raci": {
        "responsible": ["Петр Смирнов (Media_Planner)", "Елена Петрова (Analyst)"],
        "accountable": "Анна Иванова (PM)",
        "consulted": [],
        "informed": ["Ольга Кузнецова (Account_Manager)"]
      },
      "timeline": {
        "start_date": "2025-11-18", // Через неделю после запуска
        "end_date": "2025-12-31", // Recurring до конца проекта
        "estimated_hours": 4, // Часов в неделю
        "frequency": "weekly"
      },
      "dependencies": ["task_5"], // Зависит от мониторинга
      "deliverables": ["Еженедельный отчет по оптимизации", "Изменения в кампаниях (лог действий)"],
      "acceptance_criteria": [
        "Анализ проводится еженедельно",
        "Действия по оптимизации документированы",
        "PM утвердил изменения"
      ],
      "risks": [
        {
          "description": "Преждевременная оптимизация на малом объеме данных",
          "mitigation": "Дождаться статистически значимого объема данных (минимум 100 конверсий или 2 недели)"
        }
      ]
    },
    {
      "id": "task_7",
      "title": "Ежемесячная отчетность для клиента",
      "description": "Подготовить отчет с результатами месяца, ключевыми инсайтами, рекомендациями на следующий период",
      "stage": "Отчетность",
      "raci": {
        "responsible": ["Елена Петрова (Analyst)"],
        "accountable": "Анна Иванова (PM)",
        "consulted": [],
        "informed": ["Ольга Кузнецова (Account_Manager)", "Client"]
      },
      "timeline": {
        "start_date": "2025-12-01", // Первый отчет в начале декабря за ноябрь
        "end_date": "2025-12-31",
        "estimated_hours": 6, // На один отчет
        "frequency": "monthly"
      },
      "dependencies": ["task_6"], // Зависит от накопленных данных
      "deliverables": ["Отчет в PowerPoint/PDF", "Аналитическая записка", "Презентация для клиента"],
      "acceptance_criteria": [
        "Отчет содержит все ключевые метрики",
        "Инсайты и рекомендации конкретны и actionable",
        "PM и Account Manager одобрили отчет перед отправкой клиенту"
      ],
      "risks": [
        {
          "description": "Клиент недоволен результатами",
          "mitigation": "Регулярная коммуникация в течение месяца, управление ожиданиями, подготовка плана по улучшению"
        }
      ]
    }
  ],
  "timeline_summary": {
    "total_duration_days": 61, // С 01.11 по 31.12
    "critical_path": ["task_1", "task_2", "task_3", "task_4"], // Последовательные задачи, определяющие минимальный срок
    "parallel_opportunities": ["task_5 можно начать параллельно с task_4"],
    "milestones": [
      {"date": "2025-11-03", "name": "Бриф готов"},
      {"date": "2025-11-06", "name": "Медиаплан согласован"},
      {"date": "2025-11-11", "name": "Кампании запущены"},
      {"date": "2025-12-01", "name": "Первый отчет для клиента"}
    ]
  },
  "resource_allocation": {
    "Анна Иванова (PM)": "20 часов (coordination, approval)",
    "Петр Смирнов (Media_Planner)": "40 часов (mediaplan, setup, optimization)",
    "Елена Петрова (Analyst)": "30 часов (monitoring, reporting)",
    "Ольга Кузнецова (Account_Manager)": "10 часов (brief, client communication)",
    "Specialist (Yandex.Direct)": "14 часов (setup, launch)" // Может быть тот же Media_Planner
  },
  "risk_summary": [
    {
      "risk": "Задержка согласования брифа с клиентом",
      "impact": "High", // High, Medium, Low
      "probability": "Medium",
      "mitigation": "Проактивная коммуникация, backup plan с типовым брифом"
    },
    {
      "risk": "Недостаточный бюджет для достижения целей",
      "impact": "High",
      "probability": "Medium",
      "mitigation": "Подготовить несколько сценариев медиаплана, обсудить с клиентом приоритеты"
    },
    {
      "risk": "Технические проблемы при запуске (блокировка модерацией, ошибки в API)",
      "impact": "Medium",
      "probability": "Low",
      "mitigation": "Тестирование до запуска, резервное время в графике"
    }
  ]
}
```

### Инструкции по генерации:

1. **Будь конкретным:** Избегай общих формулировок типа "Создать кампанию". Вместо этого: "Создать 3 поисковые кампании в Яндекс.Директ с таргетингом на Москву, возраст 25-45, интересы: финансы, инвестиции".

2. **Используй RACI:** Для каждой подзадачи обязательно назначь Responsible и Accountable. Если в команде нет нужной роли, укажи это в поле `responsible` (например, "Specialist (Yandex.Direct) - ТРЕБУЕТСЯ НАЙМ").

3. **Реалистичные сроки:** Учитывай сложность задачи. Например:
   - Бриф: 2-4 часа
   - Медиаплан: 4-8 часов
   - Настройка кампании (1 канал): 8-12 часов
   - Отчет: 4-6 часов

4. **Зависимости:** Четко обозначай, какие задачи можно делать параллельно, а какие - только последовательно. Это критично для составления реалистичного графика.

5. **Acceptance Criteria:** Для каждой подзадачи укажи, как понять, что она выполнена. Это должно быть проверяемо.

6. **Риски:** Выявляй не менее 1-2 рисков для каждой крупной задачи и предлагай конкретные способы их митигации.

7. **Адаптируй RACI:** Если в `team_members` нет роли, указанной в `raci_matrix`, назначь наиболее подходящего участника команды и отметь это в комментарии.

### Примеры использования:

**Пример 1: Простая задача**
- Вход: "Создать post в VK для клиента"
- Выход: 2-3 подзадачи (согласовать концепт, создать креатив, опубликовать)

**Пример 2: Средняя задача**
- Вход: "Запустить таргетированную рекламу в VK"
- Выход: 5-7 подзадач (бриф, медиаплан, креативы, настройка, запуск, мониторинг)

**Пример 3: Сложная задача**
- Вход: "Провести комплексную digital-кампанию с 5 каналами"
- Выход: 15-20 подзадач (стратегия, бриф, медиаплан, креативы для каждого канала, настройка, запуск, оптимизация, отчетность)

### Тон и стиль:
- Профессиональный, структурированный, ориентированный на execution.
- Используй терминологию рекламного агентства (бриф, медиаплан, креатив, таргетинг).
- Будь реалистичен в оценке сроков и трудозатрат.

**Верни только JSON с декомпозицией задачи.**

---

## Пример использования в коде

```typescript
// AI Task Decomposer
import { LLMClient } from '@/ai/llm-client';
import { PromptTemplate } from '@/ai/prompt-template';

interface TaskDecompositionInput {
  taskDescription: string;
  projectContext: ProjectContext;
  raciMatrix: RACIMatrix;
  dependencies?: Task[];
}

interface ProjectContext {
  clientName: string;
  industry: string;
  budget: number;
  timeline: { start: string; end: string };
  objectives: string[];
  teamMembers: TeamMember[];
}

interface TeamMember {
  name: string;
  role: string;
}

interface RACIMatrix {
  [processName: string]: {
    R: string[];
    A: string;
    C: string[];
    I: string[];
  };
}

interface TaskDecompositionOutput {
  taskAnalysis: {
    taskType: string;
    keyStages: string[];
    complexity: 'Low' | 'Medium' | 'High';
    estimatedTotalHours: number;
  };
  subtasks: Subtask[];
  timelineSummary: TimelineSummary;
  resourceAllocation: Record<string, string>;
  riskSummary: Risk[];
}

interface Subtask {
  id: string;
  title: string;
  description: string;
  stage: string;
  raci: {
    responsible: string[];
    accountable: string;
    consulted: string[];
    informed: string[];
  };
  timeline: {
    startDate: string;
    endDate: string;
    estimatedHours: number;
    frequency?: string;
  };
  dependencies: string[];
  deliverables: string[];
  acceptanceCriteria: string[];
  risks: Array<{ description: string; mitigation: string }>;
}

class AITaskDecomposer {
  constructor(private llm: LLMClient) {}

  async decompose(input: TaskDecompositionInput): Promise<TaskDecompositionOutput> {
    // 1. Загрузить промпт из файла
    const promptTemplate = await PromptTemplate.load(
      'AI_Prompts_Library/04_Project_Assistant/task_decomposition.md'
    );

    // 2. Подставить переменные
    const prompt = promptTemplate.render({
      task_description: input.taskDescription,
      project_context: JSON.stringify(input.projectContext, null, 2),
      raci_matrix: JSON.stringify(input.raciMatrix, null, 2),
      dependencies: input.dependencies ? JSON.stringify(input.dependencies, null, 2) : '[]'
    });

    // 3. Вызвать LLM
    const response = await this.llm.generate(prompt, {
      temperature: 0.3, // Низкая температура для структурированного вывода
      maxTokens: 4096,
      responseFormat: 'json'
    });

    // 4. Распарсить JSON
    const decomposition: TaskDecompositionOutput = JSON.parse(response.content);

    // 5. Валидация
    this.validateDecomposition(decomposition);

    return decomposition;
  }

  private validateDecomposition(decomposition: TaskDecompositionOutput): void {
    // Проверка обязательных полей
    if (!decomposition.subtasks || decomposition.subtasks.length === 0) {
      throw new Error('No subtasks generated');
    }

    // Проверка RACI (каждая подзадача должна иметь ровно одного Accountable)
    for (const subtask of decomposition.subtasks) {
      if (!subtask.raci.accountable) {
        throw new Error(`Subtask ${subtask.id} has no accountable person`);
      }
      if (subtask.raci.responsible.length === 0) {
        throw new Error(`Subtask ${subtask.id} has no responsible person`);
      }
    }

    // Проверка зависимостей (все зависимости должны существовать)
    const subtaskIds = new Set(decomposition.subtasks.map(t => t.id));
    for (const subtask of decomposition.subtasks) {
      for (const depId of subtask.dependencies) {
        if (!subtaskIds.has(depId)) {
          throw new Error(`Subtask ${subtask.id} has invalid dependency: ${depId}`);
        }
      }
    }
  }
}

// Использование
const decomposer = new AITaskDecomposer(llmClient);

const result = await decomposer.decompose({
  taskDescription: 'Запустить контекстную рекламу в Яндекс.Директ для продвижения нового приложения',
  projectContext: {
    clientName: 'FinTech Startup',
    industry: 'Финансовые технологии',
    budget: 500000,
    timeline: { start: '2025-11-01', end: '2025-12-31' },
    objectives: [
      'Увеличить установки приложения',
      'CPA не выше 300 ₽',
      'Охват 100K уникальных пользователей'
    ],
    teamMembers: [
      { name: 'Анна Иванова', role: 'PM' },
      { name: 'Петр Смирнов', role: 'Media_Planner' },
      { name: 'Елена Петрова', role: 'Analyst' },
      { name: 'Ольга Кузнецова', role: 'Account_Manager' }
    ]
  },
  raciMatrix: {
    brief_creation: { R: ['Account_Manager'], A: 'PM', C: ['Strategist', 'Client'], I: ['Media_Planner'] },
    media_plan_creation: { R: ['Media_Planner'], A: 'PM', C: ['Strategist'], I: ['Account_Manager', 'Client'] },
    campaign_setup: { R: ['Specialist'], A: 'Media_Planner', C: [], I: ['PM'] },
    campaign_launch: { R: ['Specialist'], A: 'PM', C: ['Media_Planner'], I: ['Account_Manager', 'Client'] },
    monitoring: { R: ['Analyst'], A: 'PM', C: [], I: ['Media_Planner', 'Account_Manager'] },
    reporting: { R: ['Analyst'], A: 'PM', C: [], I: ['Account_Manager', 'Client'] }
  }
});

console.log(`Generated ${result.subtasks.length} subtasks`);
console.log(`Estimated total effort: ${result.taskAnalysis.estimatedTotalHours} hours`);
console.log(`Critical path: ${result.timelineSummary.criticalPath.join(' → ')}`);

// Создать задачи в системе управления проектами
for (const subtask of result.subtasks) {
  await projectManagementSystem.createTask({
    title: subtask.title,
    description: subtask.description,
    assignee: subtask.raci.responsible[0],
    dueDate: subtask.timeline.endDate,
    dependencies: subtask.dependencies
  });
}
```

---

## Метрики эффективности

Для оценки качества AI Task Decomposition отслеживаем:
- **Acceptance Rate:** % подзадач, принятых PM без изменений (целевое значение: >80%)
- **Completeness:** % задач, для которых не потребовалось добавлять новые подзадачи (>90%)
- **Time Accuracy:** Отклонение фактических трудозатрат от прогнозных (<20%)
- **RACI Correctness:** % подзадач с корректно назначенными ответственными (>95%)
- **Time Saved:** Время на декомпозицию вручную vs с AI (30 мин → 5 мин, 6x faster)

---

## Версия
- **Версия промпта:** 1.0
- **Дата создания:** 2025-10-23
- **Автор:** MRM AI Team
- **LLM:** Claude Sonnet 3.5 / GPT-4

