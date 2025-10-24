import { sheets } from './client';
import { VisualSettings } from './types';
import {
  transformBriefToSheet,
  transformMediaPlanToSheet,
  transformStrategyToSheet,
} from './transformer';

/**
 * Сервис для работы с Google Sheets.
 * Объединяет логику создания, стилизации и синхронизации данных.
 */
class GoogleSheetsService {
  /**
   * Создает новый Google Sheet для проекта.
   * @param projectName - Название проекта.
   * @returns {Promise<string | null | undefined>} - ID созданной таблицы.
   */
  async createSheetForProject(
    projectName: string
  ): Promise<string | null | undefined> {
    const response = await sheets.spreadsheets.create({
      requestBody: {
        properties: {
          title: `${projectName} - MRM Data Hub`,
        },
        sheets: [
          { properties: { title: 'Бриф' } },
          { properties: { title: 'Стратегия' } },
          { properties: { title: 'Медиаплан' } },
          { properties: { title: 'Бюджет' } },
          { properties: { title: 'Команда' } },
          { properties: { title: 'Отчеты' } },
          { properties: { title: 'Задачи' } },
          { properties: { title: 'Файлы' } },
        ],
      },
    });

    return response.data.spreadsheetId;
  }

  /**
   * Применяет визуальный стиль клиента к таблице.
   * @param spreadsheetId - ID таблицы.
   * @param visualSettings - Настройки визуального стиля.
   */
  async applyVisualStyle(
    spreadsheetId: string,
    visualSettings: VisualSettings
  ): Promise<void> {
    const requests = [];

    // 1. Установить цвет заголовков
    requests.push({
      repeatCell: {
        range: { sheetId: 0, startRowIndex: 0, endRowIndex: 1 },
        cell: {
          userEnteredFormat: {
            backgroundColor: this.hexToRgb(visualSettings.brand_colors.primary),
            textFormat: {
              foregroundColor: this.hexToRgb('#FFFFFF'),
              fontFamily: visualSettings.fonts.header,
              bold: true,
            },
          },
        },
        fields:
          'userEnteredFormat(backgroundColor,textFormat)',
      },
    });

    // TODO: Реализовать вставку логотипа, если Google API позволяет это напрямую.
    // Обычно это делается через Google Apps Script.

    // Реализуем скрытие столбцов и строк
    await this.applyHiddenFields(spreadsheetId, visualSettings);

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: { requests },
    });
  }

  private async applyHiddenFields(spreadsheetId: string, visualSettings: VisualSettings) {
    if (!visualSettings.hidden_fields || visualSettings.hidden_fields.length === 0) {
      return;
    }

    const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
    if (!spreadsheet.data.sheets) return;

    const requests = [];

    // Обработка для "Бриф" (скрытие строк)
    const briefSheet = spreadsheet.data.sheets.find(s => s.properties?.title === 'Бриф');
    if (briefSheet && briefSheet.properties?.sheetId != null) {
      const briefSheetId = briefSheet.properties.sheetId;
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'Бриф!A1:A',
      });
      const values = response.data.values;
      if (values) {
        values.forEach((row, index) => {
          if (row[0] && visualSettings.hidden_fields.includes(row[0])) {
            requests.push({
              updateDimensionProperties: {
                range: {
                  sheetId: briefSheetId,
                  dimension: 'ROWS',
                  startIndex: index,
                  endIndex: index + 1,
                },
                properties: { hiddenByUser: true },
                fields: 'hiddenByUser',
              },
            });
          }
        });
      }
    }
    
    // Обработка для "Медиаплан" (скрытие столбцов)
    const mediaPlanSheet = spreadsheet.data.sheets.find(s => s.properties?.title === 'Медиаплан');
    if (mediaPlanSheet && mediaPlanSheet.properties?.sheetId != null) {
        const mediaPlanSheetId = mediaPlanSheet.properties.sheetId;
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: 'Медиаплан!A1:Z1',
        });
        const headers = response.data.values?.[0];
        if (headers) {
            headers.forEach((header, index) => {
                if (visualSettings.hidden_fields.includes(header)) {
                    requests.push({
                        updateDimensionProperties: {
                            range: {
                                sheetId: mediaPlanSheetId,
                                dimension: 'COLUMNS',
                                startIndex: index,
                                endIndex: index + 1,
                            },
                            properties: { hiddenByUser: true },
                            fields: 'hiddenByUser',
                        },
                    });
                }
            });
        }
    }

    if (requests.length > 0) {
        await sheets.spreadsheets.batchUpdate({
            spreadsheetId,
            requestBody: { requests },
        });
    }
  }

  /**
   * Синхронизирует данные из артефакта в Google Sheets.
   * @param spreadsheetId - ID таблицы.
   * @param artifactType - Тип артефакта ('brief', 'media_plan', etc.).
   * @param data - Данные артефакта.
   */
  async syncToSheet(
    spreadsheetId: string,
    artifactType: string,
    data: any
  ): Promise<void> {
    let sheetData: any[][] = [];
    let tabName = '';

    switch (artifactType) {
      case 'brief':
        tabName = 'Бриф';
        sheetData = transformBriefToSheet(data);
        break;
      case 'media_plan':
        tabName = 'Медиаплан';
        sheetData = transformMediaPlanToSheet(data);
        break;
      case 'strategy':
        tabName = 'Стратегия';
        sheetData = transformStrategyToSheet(data);
        break;
      default:
        console.warn(`Unsupported artifact type for Sheets sync: ${artifactType}`);
        return;
    }

    // Очистка предыдущих данных
    await sheets.spreadsheets.values.clear({
        spreadsheetId,
        range: `${tabName}!A1:Z1000`,
    });

    // Обновление данных
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${tabName}!A1`,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: sheetData },
    });
  }

  /**
   * Вспомогательная функция для конвертации HEX в RGB формат Google API.
   */
  private hexToRgb(hex: string): object {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          red: parseInt(result[1], 16) / 255,
          green: parseInt(result[2], 16) / 255,
          blue: parseInt(result[3], 16) / 255,
        }
      : { red: 0, green: 0, blue: 0 };
  }
}

export const googleSheetsService = new GoogleSheetsService();
