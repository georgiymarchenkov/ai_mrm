/**
 * Настройка клиента для работы с Google Sheets API
 */
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

// TODO: Заменить на реальные credentials из .env
const GOOGLE_API_CREDENTIALS = {
  client_id: process.env.GOOGLE_CLIENT_ID,
  client_secret: process.env.GOOGLE_CLIENT_SECRET,
  redirect_uri: process.env.GOOGLE_REDIRECT_URI,
};

// TODO: Получать и сохранять токены для каждого пользователя
const USER_TOKEN = {
  access_token: 'user-access-token',
  refresh_token: 'user-refresh-token',
  scope: 'https://www.googleapis.com/auth/spreadsheets',
  token_type: 'Bearer',
  expiry_date: 1672531199,
};

/**
 * Создает и настраивает аутентифицированный клиент OAuth2
 * @returns {OAuth2Client}
 */
function createOAuth2Client(): OAuth2Client {
  const oAuth2Client = new google.auth.OAuth2(
    GOOGLE_API_CREDENTIALS.client_id,
    GOOGLE_API_CREDENTIALS.client_secret,
    GOOGLE_API_CREDENTIALS.redirect_uri
  );
  oAuth2Client.setCredentials(USER_TOKEN);
  return oAuth2Client;
}

export const oAuth2Client = createOAuth2Client();

export const sheets = google.sheets({
  version: 'v4',
  auth: oAuth2Client,
});
