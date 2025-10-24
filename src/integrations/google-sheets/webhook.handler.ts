import {
  transformSheetToBrief,
  transformSheetToMediaPlan,
  transformSheetToStrategy,
} from './transformer';

/**
 * Обработчик вебхуков от Google Sheets.
 * Эта функция будет вызываться вашим веб-сервером при получении POST-запроса
 * от Google Apps Script.
 */
async function handleGoogleSheetsWebhook(req: any, res: any) {
  try {
    const { spreadsheetId, sheetName } = req.body;

    console.log(`Received update from sheet ${spreadsheetId}/${sheetName}`);

    // Placeholder: db object for database interactions
    const db = {
        projects: { findOne: async (query: any) => ({ id: 'project-123' }) },
        projectArtifacts: { 
            findOne: async (query: any) => ({ id: 'artifact-456', artifact_type: sheetName.toLowerCase() }),
            update: async (id: string, data: any) => console.log('Updating artifact', id, data)
        },
        artifactChanges: { create: async (data: any) => console.log('Logging change', data) }
    };

    // 1. Найти проект по spreadsheetId
    const project = await db.projects.findOne({ sheets_id: spreadsheetId });
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    // 2. Найти артефакт по sheetName
    const artifact = await db.projectArtifacts.findOne({
      project_id: project.id,
      sheets_tab_name: sheetName, // Assuming this mapping exists
    });
    if (!artifact) {
      return res.status(404).json({ success: false, message: 'Artifact not found for this sheet' });
    }

    // 3. Прочитать все данные с листа, чтобы получить полный контекст
    // const sheetDataResponse = await sheets.spreadsheets.values.get({
    //     spreadsheetId,
    //     range: `${sheetName}!A1:Z1000`,
    // });
    // const sheetData = sheetDataResponse.data.values;
    const sheetData = [[]]; // MOCK DATA for now

    if (!sheetData) {
        return res.status(200).json({ success: true, message: 'No data in sheet, nothing to sync.'});
    }

    // 4. Преобразовать данные из формата Sheets в структуру БД
    let dbData;
    switch (artifact.artifact_type) {
        case 'brief':
            dbData = transformSheetToBrief(sheetData);
            break;
        case 'media_plan':
            dbData = transformSheetToMediaPlan(sheetData);
            break;
        case 'strategy':
            dbData = transformSheetToStrategy(sheetData);
            break;
        default:
            console.warn(`Reverse transformation for ${artifact.artifact_type} not implemented.`);
            return res.status(400).json({ success: false, message: `Unsupported artifact type: ${artifact.artifact_type}` });
    }

    // 5. Обновить артефакт в БД
    await db.projectArtifacts.update(artifact.id, { data: dbData, updated_at: new Date() });

    // 6. Логировать изменение
    await db.artifactChanges.create({
        artifact_id: artifact.id,
        change_source: 'sheets_webhook',
        // ... more details about the change
    });

    res.status(200).json({ success: true, message: 'Update processed' });
  } catch (error) {
    console.error('Error processing Google Sheets webhook:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
