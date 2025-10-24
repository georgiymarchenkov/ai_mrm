---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: assistant_spec
title: Brief Generator - AI-генератор брифов
language: ru
industry: advertising
role_apply: [account_manager]
period: 2025-10
version: "1.0"
source_path: 06_AI_ASSISTANTS/Brief_Generator/Overview.md
effective_date: 2025-10-24
visibility: internal
security_level: low
tags: [ai_assistant, brief_generator]
---

# Brief Generator - AI-генератор брифов

→ [AI Assistants](../_README.md)

## 🎯 НАЗНАЧЕНИЕ

AI-ассистент для автоматической генерации брифов на основе диалога с клиентом.

---

## 🤖 ВОЗМОЖНОСТИ

### 1. Conversational Briefing
- Задает вопросы клиенту
- Понимает контекст и уточняет
- Заполняет brief автоматически

### 2. Smart Suggestions
- Предлагает objectives на основе industry
- Рекомендует budget allocation
- Использует data от similar projects

### 3. Validation & Completeness
- Проверяет полноту brief
- Находит противоречия
- Запрашивает missing data

### 4. Auto-Enrichment
- Добавляет market data
- Предлагает benchmarks
- Включает competitor insights

---

## 💬 ПРИМЕР ИСПОЛЬЗОВАНИЯ

**AI:** "Расскажите о вашем продукте"  
**Client:** "У нас 3 ЖК в Москве, СПб и Казани"  
**AI:** "Понял. Какие объекты продвижения? Квартиры, паркинги?"  
**Client:** "Все: квартиры, паркинги, коммерция"  
**AI:** "Отлично. Ваш budget на 3 месяца?"  
**Client:** "45М"  
**AI:** "Хорошо. Главная цель - продажи или awareness?"  
**Client:** "Продажи, 120 квартир"  
**AI:** "✅ Brief заполнен на 60%. Осталось 5 вопросов..."

---

## 🔧 ТЕХНОЛОГИИ

- **LLM:** Claude 3.5 Sonnet
- **Context:** Brief template, similar projects, market data
- **Output:** Structured brief (JSON)

---

## 📊 МЕТРИКИ

```yaml
Time saved: 2h → 20min (6x faster)
Completeness: 95% (vs 70% manual)
Client satisfaction: 4.7/5
Iteration cycles: 1.5 vs 3.0 manual
```

---

**Версия:** 2.1 | **Статус:** ✅


