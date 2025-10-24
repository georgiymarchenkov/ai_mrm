# Google Sheets Integration Module

Этот модуль отвечает за всю логику интеграции с Google Sheets в соответствии с [архитектурной документацией](./../../08_ARCHITECTURE/Project_Data_Architecture.md).

## 🎯 Назначение

- **Создание Google Sheets** для новых проектов.
- **Применение визуального стиля** клиента к таблицам.
- **Двусторонняя синхронизация данных** между PostgreSQL и Google Sheets.

## 📁 Структура модуля

```
google-sheets/
├── client.ts         # Настройка клиента Google API (auth, credentials)
├── service.ts        # Основной сервис (создание, стилизация, синхронизация)
├── transformer.ts    # Функции для преобразования данных (DB ↔ Sheets)
├── webhook.handler.ts# Логика обработки входящих вебхуков от Sheets
├── types.ts          # Специфичные для модуля типы (e.g., VisualSettings)
└── index.ts          # Экспорт всех компонентов модуля
```

## ⚙️ Настройка

### 1. Google API Credentials

1.  Перейдите в [Google Cloud Console](https://console.cloud.google.com/).
2.  Создайте новый проект или выберите существующий.
3.  Включите **Google Sheets API**.
4.  Создайте **OAuth 2.0 Client ID** в разделе "Credentials":
    -   Application type: **Web application**
    -   Authorized redirect URIs: добавьте URI вашего бэкенда (e.g., `http://localhost:3000/api/auth/google/callback`).
5.  Скачайте JSON файл с credentials.
6.  Добавьте `client_id`, `client_secret` и `redirect_uri` в переменные окружения (`.env`):
    ```
    GOOGLE_CLIENT_ID=...
    GOOGLE_CLIENT_SECRET=...
    GOOGLE_REDIRECT_URI=...
    ```

### 2. Аутентификация пользователя

- Необходимо реализовать OAuth 2.0 flow для получения `access_token` и `refresh_token` от пользователя.
- Полученные токены нужно безопасно сохранить в базе данных, привязав к аккаунту пользователя.
- В файле `client.ts` логика получения токенов (`USER_TOKEN`) должна быть заменена на чтение из БД.

### 3. Google Apps Script (для вебхуков)

Для реализации синхронизации **Sheets → DB** необходимо настроить триггер в Google Sheets:

1.  Откройте созданную таблицу.
2.  Перейдите в `Extensions > Apps Script`.
3.  Вставьте следующий код:

    ```javascript
    function onEdit(e) {
      // Получаем информацию о событии
      const sheet = e.source.getActiveSheet();
      const range = e.range;
      
      // Формируем payload для webhook
      const payload = {
        spreadsheetId: e.source.getId(),
        sheetName: sheet.getName(),
        rangeA1: range.getA1Notation(),
        newValue: e.value,
        oldValue: e.oldValue,
        user: Session.getActiveUser().getEmail()
      };
      
      // URL вашего бэкенд-эндпоинта
      const webhookUrl = 'https://your-backend.com/api/webhooks/sheets';
      
      // Настраиваем запрос
      const options = {
        'method': 'post',
        'contentType': 'application/json',
        'payload': JSON.stringify(payload),
        'muteHttpExceptions': true
      };
      
      // Отправляем webhook
      try {
        UrlFetchApp.fetch(webhookUrl, options);
      } catch (error) {
        Logger.log('Webhook failed: ' + error.toString());
      }
    }

    function createTrigger() {
      // Удаляем старые триггеры, чтобы избежать дублирования
      const triggers = ScriptApp.getProjectTriggers();
      for (const trigger of triggers) {
        if (trigger.getHandlerFunction() === 'onEdit') {
          ScriptApp.deleteTrigger(trigger);
        }
      }
      
      // Создаем новый триггер на событие 'onEdit'
      ScriptApp.newTrigger('onEdit')
        .forSpreadsheet(SpreadsheetApp.getActive())
        .onEdit()
        .create();
    }
    ```

4.  Сохраните скрипт.
5.  Запустите функцию `createTrigger()` один раз для установки триггера. Вам потребуется выдать разрешения скрипту на доступ к вашим таблицам.

## 🚀 Использование

```typescript
import { googleSheetsService } from './src/integrations/google-sheets';

// 1. Создание новой таблицы для проекта
const newSheetId = await googleSheetsService.createSheetForProject('Проект Сбербанк');

if (newSheetId) {
  // 2. Применение визуального стиля
  const visualSettings = {
    brand_colors: { primary: '#21A038', ... },
    ...
  };
  await googleSheetsService.applyVisualStyle(newSheetId, visualSettings);
  
  // 3. Синхронизация данных из БД в Sheets
  const briefData = await db.artifacts.find({ type: 'brief' });
  await googleSheetsService.syncToSheet(newSheetId, 'brief', briefData);
}
```

## ⚠️ TODOs & Улучшения

-   [ ] Реализовать полную логику OAuth 2.0 для получения и обновления токенов.
-   [ ] Добавить обработку ошибок и retry-логику для API запросов.
-   [ ] Реализовать логику скрытия столбцов в `applyVisualStyle`.
-   [ ] Реализовать обратные трансформации (`fromSheetTo...`) в `transformer.ts`.
-   [ ] Реализовать полную логику в `webhook.handler.ts` для синхронизации Sheets → DB.
-   [ ] Добавить тесты (unit, integration).
-   [ ] Рассмотреть использование batch-запросов для оптимизации производительности.
