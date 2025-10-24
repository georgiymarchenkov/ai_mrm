---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: integration_spec
title: Интеграции MRM AI Platform
language: ru
industry: advertising
role_apply: [specialist, developer]
period: 2025-10
version: "1.0"
source_path: 07_INTEGRATIONS/README.md
effective_date: 2025-10-24
visibility: internal
security_level: medium
tags: [integration, integration, integrations]
---

# Интеграции MRM AI Platform

## Обзор

Платформа MRM AI интегрируется с ключевыми рекламными и аналитическими платформами для автоматизации процессов медиапланирования, запуска кампаний и отчетности.

---

## Архитектура интеграций

### Общие принципы

1. **API-First подход:** Все интеграции работают через официальные API платформ
2. **Асинхронная обработка:** Большие объемы данных обрабатываются асинхронно через очереди (Bull/Redis)
3. **Rate Limiting:** Соблюдение лимитов API платформ, автоматический retry с exponential backoff
4. **Error Handling:** Graceful degradation, подробное логирование ошибок
5. **Caching:** Кэширование редко меняющихся данных (словари, справочники)
6. **Webhooks:** Использование webhooks для real-time обновлений (где поддерживается)

### Уровни интеграции

#### Level 1: Read-Only (Data Collection)
- Чтение данных о кампаниях, статистики, настроек
- Автоматическая синхронизация метрик
- Генерация отчетов

#### Level 2: Write (Campaign Management)
- Создание и редактирование кампаний
- Управление ставками
- Обновление креативов

#### Level 3: Bidirectional Sync
- Полная синхронизация между MRM AI и внешней платформой
- Конфликт-резолюшн
- Real-time updates через webhooks

---

## Приоритетные интеграции (MVP)

### 🔴 Critical (Must-Have для MVP)

1. **Yandex Direct API v5**
   - Статус: В разработке
   - Уровень: Level 2 (Read + Write)
   - Приоритет: #1
   - [Детали →](./Yandex_Direct/README.md)

2. **VK Ads API**
   - Статус: В разработке
   - Уровень: Level 2 (Read + Write)
   - Приоритет: #2
   - [Детали →](./VK_Ads/README.md)

3. **Yandex Metrika API**
   - Статус: В разработке
   - Уровень: Level 1 (Read-Only)
   - Приоритет: #3
   - [Детали →](./Yandex_Metrika/README.md)

### 🟡 Important (Post-MVP, within 3 months)

4. **Google Ads API**
   - Статус: Планируется
   - Уровень: Level 2
   - Приоритет: #4

5. **MyTarget API**
   - Статус: Планируется
   - Уровень: Level 2
   - Приоритет: #5

6. **Telegram Ads API**
   - Статус: Планируется
   - Уровень: Level 2
   - Приоритет: #6

7. **Google Analytics 4 API**
   - Статус: Планируется
   - Уровень: Level 1
   - Приоритет: #7

### 🟢 Nice-to-Have (6+ months)

8. **Bitrix24 API** (CRM интеграция)
9. **1C API** (финансовая интеграция)
10. **Slack API** (уведомления)
11. **Telegram Bot API** (уведомления)

---

## Технический стек

### Backend
- **NestJS** — фреймворк для микросервисной архитектуры
- **TypeScript** — для type-safe кода
- **Bull** — очереди для асинхронной обработки
- **Redis** — кэширование и очереди
- **PostgreSQL** — хранение конфигураций интеграций
- **ClickHouse** — хранение статистических данных

### Библиотеки
- `axios` — HTTP-клиент для API-запросов
- `node-cron` — планирование регулярных синхронизаций
- `joi` — валидация данных из API
- `winston` — логирование

### Аутентификация
- **OAuth 2.0** — для большинства платформ (Yandex, VK, Google)
- **API Keys** — для некоторых платформ (Telegram Ads)
- **JWT** — для внутренней аутентификации

---

## Архитектура кода

```
07_INTEGRATIONS/
├── README.md (этот файл)
├── _shared/
│   ├── base-api-client.ts          # Базовый класс для всех API-клиентов
│   ├── rate-limiter.ts              # Rate limiting
│   ├── retry-policy.ts              # Retry logic с exponential backoff
│   ├── error-handler.ts             # Обработка ошибок API
│   └── cache-manager.ts             # Управление кэшированием
├── Yandex_Direct/
│   ├── README.md
│   ├── api-client.ts                # Yandex Direct API client
│   ├── types.ts                     # TypeScript types
│   ├── mappers/                     # Маппинг данных между MRM AI и Yandex Direct
│   ├── sync-service.ts              # Сервис синхронизации
│   └── webhooks.ts                  # Обработка webhooks (если поддерживается)
├── VK_Ads/
│   ├── README.md
│   ├── api-client.ts
│   ├── types.ts
│   ├── mappers/
│   ├── sync-service.ts
│   └── webhooks.ts
├── Yandex_Metrika/
│   ├── README.md
│   ├── api-client.ts
│   ├── types.ts
│   └── reports-service.ts
└── ...
```

---

## Общий интерфейс интеграций

Все интеграции должны реализовывать общий интерфейс для унификации работы с ними:

```typescript
interface PlatformIntegration {
  // Аутентификация
  authenticate(credentials: OAuth2Credentials | APIKeyCredentials): Promise<AuthToken>;
  refreshToken(refreshToken: string): Promise<AuthToken>;
  
  // Campaigns Management
  getCampaigns(filters: CampaignFilters): Promise<Campaign[]>;
  getCampaign(campaignId: string): Promise<Campaign>;
  createCampaign(campaign: CampaignCreate): Promise<Campaign>;
  updateCampaign(campaignId: string, updates: CampaignUpdate): Promise<Campaign>;
  deleteCampaign(campaignId: string): Promise<void>;
  
  // Statistics
  getStatistics(params: StatisticsParams): Promise<Statistics>;
  
  // Sync
  syncCampaigns(): Promise<SyncResult>;
  
  // Health Check
  healthCheck(): Promise<HealthStatus>;
}
```

---

## Rate Limiting

Каждая платформа имеет свои лимиты:

| Платформа | Requests per second | Requests per day | Примечание |
|-----------|---------------------|------------------|------------|
| Yandex Direct | 10 RPS | 100,000 | По токену |
| VK Ads | 3 RPS | 100,000 | По токену |
| Yandex Metrika | 5 RPS | Unlimited | По счетчику |
| Google Ads | Varies | 15,000 operations | По customer account |

**Реализация:**
- Rate limiter на уровне каждого API-клиента
- Token bucket algorithm
- Автоматический retry при 429 (Too Many Requests)

---

## Error Handling

### Типы ошибок

1. **Authentication Errors (401, 403)**
   - Действие: Попытка обновить токен, уведомление админа

2. **Rate Limit Errors (429)**
   - Действие: Exponential backoff, повтор через N секунд

3. **Validation Errors (400)**
   - Действие: Логирование, уведомление разработчика

4. **Server Errors (500-503)**
   - Действие: Retry с exponential backoff (до 3 попыток)

5. **Network Errors (Timeout, Connection)**
   - Действие: Retry с exponential backoff

### Retry Policy

```typescript
interface RetryPolicy {
  maxRetries: 3,
  initialDelay: 1000, // ms
  maxDelay: 60000,    // ms
  backoffMultiplier: 2,
  retryableStatusCodes: [429, 500, 502, 503, 504]
}
```

---

## Мониторинг и логирование

### Метрики

Для каждой интеграции отслеживаем:
- **API Calls:** Количество запросов в минуту/час/день
- **Success Rate:** % успешных запросов
- **Error Rate:** % ошибочных запросов (с разбивкой по типам ошибок)
- **Latency:** P50, P95, P99 время ответа API
- **Sync Status:** Статус последней синхронизации, время последнего успешного sync

### Логирование

```typescript
// Пример структурированного лога
{
  timestamp: '2025-10-23T12:00:00Z',
  level: 'info',
  integration: 'yandex_direct',
  action: 'sync_campaigns',
  clientId: 'client_123',
  duration: 1234, // ms
  result: 'success',
  details: {
    campaignsSynced: 5,
    errorsCount: 0
  }
}
```

---

## Безопасность

1. **Хранение токенов:**
   - OAuth токены шифруются в базе данных (AES-256)
   - Refresh tokens хранятся отдельно от access tokens
   - Rotation токенов каждые 30 дней (или по истечении срока действия)

2. **Передача данных:**
   - Все API-запросы через HTTPS
   - Валидация SSL-сертификатов

3. **Доступ:**
   - RBAC (Role-Based Access Control) для управления интеграциями
   - Audit log для всех операций с токенами

---

## Roadmap

### Sprint 0-1 (Недели 1-4)
- ✅ Базовая архитектура интеграций
- ✅ Shared utilities (rate limiter, retry, error handler)
- 🔄 Yandex Direct: Read-Only (статистика кампаний)
- 🔄 VK Ads: Read-Only (статистика кампаний)
- 🔄 Yandex Metrika: Read-Only (базовая статистика)

### Sprint 2-3 (Недели 5-8)
- Yandex Direct: Write (создание/редактирование кампаний)
- VK Ads: Write (создание/редактирование кампаний)
- Автоматическая синхронизация (cron jobs)

### Sprint 4+ (Недели 9-12)
- Bidirectional sync для Yandex Direct и VK Ads
- Webhooks для real-time updates
- Google Ads integration (MVP)
- Dashboards для мониторинга интеграций

---

## Тестирование

### Unit Tests
- Тестирование каждого метода API-клиента с mock-данными
- Тестирование rate limiter, retry policy, error handler

### Integration Tests
- Тестирование реальных API-запросов в staging environment
- Использование sandbox аккаунтов платформ (где доступно)

### E2E Tests
- Полный цикл: создание кампании в MRM AI → sync → создание в платформе → получение статистики → отображение в MRM AI

---

## Полезные ссылки

- [Yandex Direct API v5 Docs](https://yandex.ru/dev/direct/doc/start/intro.html)
- [VK Ads API Docs](https://dev.vk.com/ru/ads)
- [Yandex Metrika API Docs](https://yandex.ru/dev/metrika/doc/api2/intro.html)
- [Google Ads API Docs](https://developers.google.com/google-ads/api/docs/start)

---

**Версия:** 1.0  
**Дата:** 23.10.2025  
**Команда:** MRM AI Development Team

