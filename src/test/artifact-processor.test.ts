/**
 * Тестовый скрипт для обработки артефактов
 * 
 * Запускает обработку реальных файлов из проекта и формирует отчет
 */

import { ArtifactProcessor, ProcessingResult } from '../ai/artifact-processor';

// Тестовые файлы для обработки
const TEST_FILES = [
  // Медиапланы
  '/Users/MGV/Documents/MRM/ОРИГИНАЛ Апельсин __ Тендер __ Медиаплан.xlsx',
  '/Users/MGV/Documents/MRM/Планирование  Апрель 2024 ГПБ-УА (ААА Управление Капиталом).xlsx',
  '/Users/MGV/Documents/MRM/НН МП.xlsx',
  '/Users/MGV/Documents/MRM/b2c_Медийка_мобилка_март2024.xlsx',
  '/Users/MGV/Documents/MRM/Медиакалькулятор_Пример.xlsx',
  
  // Брифы и паспорта
  '/Users/MGV/Documents/MRM/Clarins _ Паспорт проекта.xlsx',
  '/Users/MGV/Documents/MRM/Realweb_Регламент_запуска_нового_клиента.xlsx',
  '/Users/MGV/Documents/MRM/Roadmap_L\'oreal.xlsx',
  
  // Отчеты
  '/Users/MGV/Documents/MRM/Clarins_SEM_Еженедельный отчет_01.07.25-31.07.25.xlsx',
  '/Users/MGV/Documents/MRM/CaseGuru__Еженедельный отчёт_29.09.xlsx',
  '/Users/MGV/Documents/MRM/REALWEB B2C __ Daily по кластерам.xlsx',
  
  // Другие
  '/Users/MGV/Documents/MRM/Учет_пересечения_аудиторий (1).xlsx',
  '/Users/MGV/Documents/MRM/AI и автоматизация (3).xlsx',
];

/**
 * Отчет о результатах тестирования
 */
interface TestReport {
  summary: {
    total_files: number;
    processed_successfully: number;
    failed: number;
    avg_processing_time_ms: number;
    avg_confidence: number;
    avg_completeness: number;
  };
  by_artifact_type: Record<string, {
    count: number;
    avg_confidence: number;
    avg_completeness: number;
  }>;
  results: ProcessingResult[];
  insights: string[];
  recommendations: string[];
}

/**
 * Основная функция тестирования
 */
async function runTests(): Promise<TestReport> {
  console.log('=' .repeat(80));
  console.log('🚀 ЗАПУСК ТЕСТИРОВАНИЯ ОБРАБОТКИ АРТЕФАКТОВ');
  console.log('=' .repeat(80));
  console.log(`\n📁 Файлов для обработки: ${TEST_FILES.length}\n`);
  
  const processor = new ArtifactProcessor();
  const results: ProcessingResult[] = [];
  
  // Обрабатываем каждый файл
  for (let i = 0; i < TEST_FILES.length; i++) {
    const filePath = TEST_FILES[i];
    console.log(`\n[${ i + 1}/${TEST_FILES.length}] ` + '─'.repeat(60));
    
    try {
      const result = await processor.processFile(filePath);
      results.push(result);
      
      // Выводим краткую информацию
      console.log(`✅ Тип: ${result.artifact_type} (уверенность: ${(result.confidence * 100).toFixed(1)}%)`);
      console.log(`📊 Полнота: ${result.completeness}%`);
      console.log(`⏱️  Время: ${result.processing_time_ms}ms`);
      
      if (result.insights.length > 0) {
        console.log(`💡 Инсайты:`);
        result.insights.forEach(insight => console.log(`   ${insight}`));
      }
    } catch (error) {
      console.error(`❌ Ошибка обработки: ${error}`);
    }
    
    // Небольшая пауза между файлами
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  // Формируем отчет
  const report = generateReport(results);
  
  return report;
}

/**
 * Генерация итогового отчета
 */
function generateReport(results: ProcessingResult[]): TestReport {
  console.log('\n' + '='.repeat(80));
  console.log('📊 ФОРМИРОВАНИЕ ОТЧЕТА');
  console.log('='.repeat(80));
  
  const successful = results.filter(r => r.artifact_type !== 'unknown');
  const failed = results.filter(r => r.artifact_type === 'unknown');
  
  const avgProcessingTime = results.reduce((sum, r) => sum + r.processing_time_ms, 0) / results.length;
  const avgConfidence = successful.reduce((sum, r) => sum + r.confidence, 0) / successful.length;
  const avgCompleteness = successful.reduce((sum, r) => sum + r.completeness, 0) / successful.length;
  
  // Группировка по типам
  const byType: Record<string, ProcessingResult[]> = {};
  results.forEach(r => {
    if (!byType[r.artifact_type]) {
      byType[r.artifact_type] = [];
    }
    byType[r.artifact_type].push(r);
  });
  
  const byArtifactType: Record<string, any> = {};
  Object.entries(byType).forEach(([type, items]) => {
    byArtifactType[type] = {
      count: items.length,
      avg_confidence: items.reduce((sum, r) => sum + r.confidence, 0) / items.length,
      avg_completeness: items.reduce((sum, r) => sum + r.completeness, 0) / items.length,
    };
  });
  
  // Генерация общих инсайтов
  const insights = generateOverallInsights(results, byArtifactType);
  const recommendations = generateOverallRecommendations(results, avgCompleteness, avgConfidence);
  
  return {
    summary: {
      total_files: results.length,
      processed_successfully: successful.length,
      failed: failed.length,
      avg_processing_time_ms: Math.round(avgProcessingTime),
      avg_confidence: avgConfidence,
      avg_completeness: Math.round(avgCompleteness),
    },
    by_artifact_type: byArtifactType,
    results,
    insights,
    recommendations,
  };
}

/**
 * Генерация общих инсайтов
 */
function generateOverallInsights(
  results: ProcessingResult[],
  byType: Record<string, any>
): string[] {
  const insights: string[] = [];
  
  const successRate = ((results.length - results.filter(r => r.artifact_type === 'unknown').length) / results.length * 100);
  insights.push(`✅ Успешно обработано: ${successRate.toFixed(1)}% файлов`);
  
  const types = Object.keys(byType).filter(t => t !== 'unknown');
  insights.push(`📋 Обнаружено типов артефактов: ${types.length} (${types.join(', ')})`);
  
  const mostCommon = Object.entries(byType)
    .filter(([type]) => type !== 'unknown')
    .sort((a, b) => b[1].count - a[1].count)[0];
  
  if (mostCommon) {
    insights.push(`🏆 Самый частый тип: ${mostCommon[0]} (${mostCommon[1].count} файлов)`);
  }
  
  const highConfidence = results.filter(r => r.confidence > 0.9).length;
  insights.push(`🎯 Высокая уверенность (>90%): ${highConfidence}/${results.length} файлов`);
  
  const highCompleteness = results.filter(r => r.completeness > 85).length;
  insights.push(`📊 Высокая полнота (>85%): ${highCompleteness}/${results.length} файлов`);
  
  return insights;
}

/**
 * Генерация общих рекомендаций
 */
function generateOverallRecommendations(
  results: ProcessingResult[],
  avgCompleteness: number,
  avgConfidence: number
): string[] {
  const recommendations: string[] = [];
  
  if (avgConfidence < 0.85) {
    recommendations.push('⚠️ Улучшить алгоритм классификации типов артефактов');
  }
  
  if (avgCompleteness < 80) {
    recommendations.push('⚠️ Повысить полноту извлечения данных (текущая: ' + avgCompleteness.toFixed(1) + '%)');
  }
  
  const unknownFiles = results.filter(r => r.artifact_type === 'unknown');
  if (unknownFiles.length > 0) {
    recommendations.push(`❌ Проверить ${unknownFiles.length} неклассифицированных файлов`);
  }
  
  const lowCompleteness = results.filter(r => r.completeness < 70);
  if (lowCompleteness.length > 0) {
    recommendations.push(`⚠️ Улучшить извлечение для ${lowCompleteness.length} файлов с низкой полнотой`);
  }
  
  recommendations.push('✅ Создать ground truth датасет на основе этих файлов');
  recommendations.push('✅ Провести ручную валидацию результатов');
  recommendations.push('✅ Оптимизировать промпты для повышения точности');
  
  return recommendations;
}

/**
 * Вывод отчета в консоль
 */
function printReport(report: TestReport): void {
  console.log('\n' + '═'.repeat(80));
  console.log('📊 ИТОГОВЫЙ ОТЧЕТ О ТЕСТИРОВАНИИ');
  console.log('═'.repeat(80));
  
  console.log('\n📈 ОБЩАЯ СТАТИСТИКА:');
  console.log('─'.repeat(80));
  console.log(`   Всего файлов:           ${report.summary.total_files}`);
  console.log(`   Успешно обработано:     ${report.summary.processed_successfully} (${(report.summary.processed_successfully / report.summary.total_files * 100).toFixed(1)}%)`);
  console.log(`   Ошибок:                 ${report.summary.failed}`);
  console.log(`   Среднее время:          ${report.summary.avg_processing_time_ms}ms`);
  console.log(`   Средняя уверенность:    ${(report.summary.avg_confidence * 100).toFixed(1)}%`);
  console.log(`   Средняя полнота:        ${report.summary.avg_completeness}%`);
  
  console.log('\n📋 ПО ТИПАМ АРТЕФАКТОВ:');
  console.log('─'.repeat(80));
  Object.entries(report.by_artifact_type).forEach(([type, stats]) => {
    console.log(`\n   ${type.toUpperCase()}:`);
    console.log(`      Количество:         ${stats.count}`);
    console.log(`      Уверенность:        ${(stats.avg_confidence * 100).toFixed(1)}%`);
    console.log(`      Полнота:            ${stats.avg_completeness.toFixed(1)}%`);
  });
  
  console.log('\n💡 КЛЮЧЕВЫЕ ИНСАЙТЫ:');
  console.log('─'.repeat(80));
  report.insights.forEach(insight => {
    console.log(`   ${insight}`);
  });
  
  console.log('\n🎯 РЕКОМЕНДАЦИИ:');
  console.log('─'.repeat(80));
  report.recommendations.forEach((rec, idx) => {
    console.log(`   ${idx + 1}. ${rec}`);
  });
  
  console.log('\n' + '═'.repeat(80));
  console.log('✅ ТЕСТИРОВАНИЕ ЗАВЕРШЕНО');
  console.log('═'.repeat(80));
}

/**
 * Сохранение отчета в файл
 */
function saveReportToFile(report: TestReport): string {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const fileName = `/Users/MGV/Documents/MRM/_ARTIFACT_PROCESSING_TEST_REPORT_${timestamp}.json`;
  
  const fs = require('fs');
  fs.writeFileSync(fileName, JSON.stringify(report, null, 2), 'utf-8');
  
  console.log(`\n💾 Отчет сохранен: ${fileName}`);
  
  return fileName;
}

/**
 * Точка входа
 */
async function main() {
  try {
    const report = await runTests();
    printReport(report);
    
    // Сохраняем JSON отчет
    const reportFile = saveReportToFile(report);
    
    // Создаем Markdown отчет
    const mdReport = generateMarkdownReport(report);
    const fs = require('fs');
    const mdFileName = reportFile.replace('.json', '.md');
    fs.writeFileSync(mdFileName, mdReport, 'utf-8');
    console.log(`📝 Markdown отчет: ${mdFileName}`);
    
  } catch (error) {
    console.error('❌ Критическая ошибка:', error);
    process.exit(1);
  }
}

/**
 * Генерация Markdown отчета
 */
function generateMarkdownReport(report: TestReport): string {
  const date = new Date().toLocaleDateString('ru-RU');
  const time = new Date().toLocaleTimeString('ru-RU');
  
  let md = `# Отчет о тестировании обработки артефактов\n\n`;
  md += `**Дата:** ${date} ${time}\n\n`;
  md += `**Файлов обработано:** ${report.summary.total_files}\n\n`;
  md += `---\n\n`;
  
  md += `## 📊 Общая статистика\n\n`;
  md += `| Метрика | Значение |\n`;
  md += `|---------|----------|\n`;
  md += `| Всего файлов | ${report.summary.total_files} |\n`;
  md += `| Успешно обработано | ${report.summary.processed_successfully} (${(report.summary.processed_successfully / report.summary.total_files * 100).toFixed(1)}%) |\n`;
  md += `| Ошибок | ${report.summary.failed} |\n`;
  md += `| Среднее время обработки | ${report.summary.avg_processing_time_ms}ms |\n`;
  md += `| Средняя уверенность | ${(report.summary.avg_confidence * 100).toFixed(1)}% |\n`;
  md += `| Средняя полнота данных | ${report.summary.avg_completeness}% |\n\n`;
  
  md += `## 📋 Результаты по типам артефактов\n\n`;
  md += `| Тип | Количество | Уверенность | Полнота |\n`;
  md += `|-----|------------|-------------|----------|\n`;
  Object.entries(report.by_artifact_type).forEach(([type, stats]) => {
    md += `| ${type} | ${stats.count} | ${(stats.avg_confidence * 100).toFixed(1)}% | ${stats.avg_completeness.toFixed(1)}% |\n`;
  });
  md += `\n`;
  
  md += `## 💡 Ключевые инсайты\n\n`;
  report.insights.forEach(insight => {
    md += `- ${insight}\n`;
  });
  md += `\n`;
  
  md += `## 🎯 Рекомендации\n\n`;
  report.recommendations.forEach((rec, idx) => {
    md += `${idx + 1}. ${rec}\n`;
  });
  md += `\n`;
  
  md += `## 📄 Детальные результаты\n\n`;
  report.results.forEach((result, idx) => {
    md += `### ${idx + 1}. ${result.file_name}\n\n`;
    md += `- **Тип:** ${result.artifact_type}\n`;
    md += `- **Уверенность:** ${(result.confidence * 100).toFixed(1)}%\n`;
    md += `- **Полнота:** ${result.completeness}%\n`;
    md += `- **Время обработки:** ${result.processing_time_ms}ms\n`;
    
    if (result.missing_fields.length > 0) {
      md += `- **Пропущенные поля:** ${result.missing_fields.join(', ')}\n`;
    }
    
    if (result.insights.length > 0) {
      md += `\n**Инсайты:**\n`;
      result.insights.forEach(insight => {
        md += `- ${insight}\n`;
      });
    }
    
    if (result.recommendations.length > 0) {
      md += `\n**Рекомендации:**\n`;
      result.recommendations.forEach(rec => {
        md += `- ${rec}\n`;
      });
    }
    
    md += `\n`;
  });
  
  md += `---\n\n`;
  md += `**Статус:** ✅ Тестирование завершено\n`;
  
  return md;
}

// Запускаем тесты
if (require.main === module) {
  main();
}

export { runTests, TestReport };

