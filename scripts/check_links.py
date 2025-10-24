#!/usr/bin/env python3
"""
Скрипт для проверки битых ссылок в MD файлах проекта MRM.

Использование:
    python scripts/check_links.py
    python scripts/check_links.py --fix  # Попытка автоисправления
    python scripts/check_links.py --report output.md  # Создать отчет
"""

import os
import re
import sys
from pathlib import Path
from typing import List, Dict, Tuple
from collections import defaultdict

# Цвета для вывода
class Colors:
    RED = '\033[91m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    RESET = '\033[0m'

def find_md_files(root_dir: Path, exclude_patterns: List[str] = None) -> List[Path]:
    """Находит все MD файлы, исключая указанные паттерны."""
    if exclude_patterns is None:
        exclude_patterns = ['.git', '_REPORTS', '_RESEARCH', '_WORK_FILES', '_MEDIA', 'mediakit', 'node_modules']
    
    md_files = []
    for md_file in root_dir.rglob('*.md'):
        if not any(pattern in str(md_file) for pattern in exclude_patterns):
            md_files.append(md_file)
    
    return md_files

def extract_links(content: str) -> List[Tuple[str, str]]:
    """Извлекает все относительные ссылки из markdown файла."""
    # Pattern для markdown ссылок: [text](path)
    pattern = r'\[([^\]]+)\]\((\.\./[^\)]+)\)'
    return re.findall(pattern, content)

def check_link(source_file: Path, link_path: str) -> Tuple[bool, Path]:
    """Проверяет, существует ли файл по ссылке."""
    # Resolve относительный путь от source_file
    target = (source_file.parent / link_path).resolve()
    
    # Убираем якоря (#section)
    if '#' in str(target):
        target = Path(str(target).split('#')[0])
    
    return target.exists(), target

def find_broken_links(root_dir: Path) -> Dict[str, List[Dict]]:
    """Находит все битые ссылки в проекте."""
    md_files = find_md_files(root_dir)
    broken_links = defaultdict(list)
    total_links = 0
    total_broken = 0
    
    print(f"{Colors.BLUE}🔍 Сканирование {len(md_files)} MD файлов...{Colors.RESET}\n")
    
    for md_file in md_files:
        try:
            content = md_file.read_text(encoding='utf-8')
            links = extract_links(content)
            
            for link_text, link_path in links:
                total_links += 1
                exists, target = check_link(md_file, link_path)
                
                if not exists:
                    total_broken += 1
                    broken_links[str(md_file.relative_to(root_dir))].append({
                        'text': link_text,
                        'path': link_path,
                        'target': str(target)
                    })
        except Exception as e:
            print(f"{Colors.YELLOW}⚠️  Ошибка при обработке {md_file}: {e}{Colors.RESET}")
    
    return dict(broken_links), total_links, total_broken

def print_report(broken_links: Dict, total_links: int, total_broken: int):
    """Выводит отчет о битых ссылках."""
    print(f"\n{'='*70}")
    print(f"{Colors.BLUE}📊 РЕЗУЛЬТАТЫ ПРОВЕРКИ ССЫЛОК{Colors.RESET}")
    print(f"{'='*70}\n")
    
    print(f"Всего проверено ссылок: {Colors.GREEN}{total_links}{Colors.RESET}")
    
    if total_broken == 0:
        print(f"Битых ссылок: {Colors.GREEN}{total_broken} ✅{Colors.RESET}")
        print(f"\n{Colors.GREEN}🎉 Отлично! Все ссылки работают!{Colors.RESET}\n")
        return
    
    percentage = (total_broken / total_links * 100) if total_links > 0 else 0
    color = Colors.RED if percentage > 10 else Colors.YELLOW if percentage > 5 else Colors.GREEN
    
    print(f"Битых ссылок: {color}{total_broken} ({percentage:.1f}%){Colors.RESET}")
    print(f"Файлов с проблемами: {Colors.YELLOW}{len(broken_links)}{Colors.RESET}\n")
    
    print(f"{Colors.RED}❌ БИТЫЕ ССЫЛКИ:{Colors.RESET}\n")
    
    for file_path, links in sorted(broken_links.items()):
        print(f"{Colors.YELLOW}📄 {file_path}{Colors.RESET}")
        for link in links:
            print(f"   ❌ [{link['text']}]({link['path']})")
            print(f"      → Целевой файл не найден: {link['target']}")
        print()

def save_report(broken_links: Dict, total_links: int, total_broken: int, output_file: str):
    """Сохраняет отчет в MD файл."""
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("# 🔗 Отчет о битых ссылках\n\n")
        f.write(f"**Дата:** {Path().resolve()}\n")
        f.write(f"**Проверено ссылок:** {total_links}\n")
        f.write(f"**Битых ссылок:** {total_broken} ({total_broken/total_links*100:.1f}%)\n\n")
        
        if total_broken == 0:
            f.write("## ✅ Все ссылки работают!\n\n")
            return
        
        f.write("## ❌ Битые ссылки по файлам\n\n")
        
        for file_path, links in sorted(broken_links.items()):
            f.write(f"### `{file_path}`\n\n")
            for link in links:
                f.write(f"- ❌ `[{link['text']}]({link['path']})`\n")
                f.write(f"  - Целевой файл: `{link['target']}`\n\n")
    
    print(f"\n{Colors.GREEN}✅ Отчет сохранен: {output_file}{Colors.RESET}\n")

def suggest_fixes(broken_links: Dict, root_dir: Path) -> Dict[str, List[Dict]]:
    """Предлагает возможные исправления для битых ссылок."""
    suggestions = defaultdict(list)
    
    # Получаем список всех существующих MD файлов
    all_files = {f.name: f for f in find_md_files(root_dir)}
    
    for file_path, links in broken_links.items():
        for link in links:
            # Извлекаем имя файла из пути
            target_name = Path(link['path']).name
            
            # Ищем файлы с похожим именем
            if target_name in all_files:
                suggestions[file_path].append({
                    'broken_link': link['path'],
                    'suggested': all_files[target_name].relative_to(root_dir),
                    'confidence': 'high'
                })
    
    return dict(suggestions)

def main():
    """Основная функция."""
    root_dir = Path(__file__).parent.parent
    
    # Проверка аргументов
    create_report = '--report' in sys.argv
    report_file = sys.argv[sys.argv.index('--report') + 1] if create_report else None
    suggest_fix = '--fix' in sys.argv
    
    # Поиск битых ссылок
    broken_links, total_links, total_broken = find_broken_links(root_dir)
    
    # Вывод результатов
    print_report(broken_links, total_links, total_broken)
    
    # Сохранение отчета
    if create_report and report_file:
        save_report(broken_links, total_links, total_broken, report_file)
    
    # Предложение исправлений
    if suggest_fix and broken_links:
        print(f"{Colors.BLUE}🔧 Поиск возможных исправлений...{Colors.RESET}\n")
        suggestions = suggest_fixes(broken_links, root_dir)
        
        if suggestions:
            print(f"{Colors.GREEN}💡 ПРЕДЛОЖЕНИЯ ПО ИСПРАВЛЕНИЮ:{Colors.RESET}\n")
            for file_path, fixes in suggestions.items():
                print(f"{Colors.YELLOW}📄 {file_path}{Colors.RESET}")
                for fix in fixes:
                    print(f"   {fix['broken_link']}")
                    print(f"   → Возможно: {fix['suggested']} ({fix['confidence']} confidence)")
                print()
    
    # Exit code
    sys.exit(1 if total_broken > 0 else 0)

if __name__ == '__main__':
    main()

