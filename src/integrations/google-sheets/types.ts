/**
 * Типы данных для модуля интеграции с Google Sheets
 */

/**
 * Настройки визуального стиля клиента для применения в Google Sheets
 */
export interface VisualSettings {
  brand_colors: {
    primary: string; // e.g., '#FF0000'
    secondary: string;
    accent: string;
  };
  logo_url: string;
  fonts: {
    header: string; // e.g., "Arial Bold"
    body: string;
  };
  hidden_fields: string[]; // Поля, которые нужно скрыть
}
