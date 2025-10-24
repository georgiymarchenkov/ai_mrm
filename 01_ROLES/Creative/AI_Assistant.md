---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: role_doc
title: AI Assistant для Creative
language: ru
industry: advertising
role_apply: [creative]
period: 2025-10
version: "1.0"
source_path: 01_ROLES/Creative/AI_Assistant.md
effective_date: 2025-10-24
visibility: internal
security_level: low
tags: [role, creative, ai_assistant]
---

# AI Assistant для Creative

→ [Role](./Role_Description.md) | [Pain Points](./Pain_Points.md)

---

## 🤖 CREATIVE AI ASSISTANT

**Назначение:** Автоматизация адаптаций и рутины

**Экономия:** 30ч/месяц  
**ROI:** 500%+  
**Focus:** Концепция, не рутина

---

## 🎯 ВОЗМОЖНОСТИ

### 1. CONCEPT GENERATION

**AI помогает с идеями:**
```
Input:
- Brief: "Банк, молодая аудитория, цель: привлечение"
- Brand: Modern, friendly, digital-first

AI suggests 3 концепции:
1. "Твои деньги, твои правила"
   Visual: Молодые люди в городе, мобайл
   Tone: Свободный, энергичный
   
2. "Банк без очередей"
   Visual: Digital lifestyle, приложение
   Tone: Практичный, умный
   
3. "Начни с малого, добейся большого"
   Visual: Growth journey, achievement
   Tone: Мотивационный, вдохновляющий
```

---

### 2. AUTO-ADAPTATION (15ч → 3ч)

**AI адаптирует автоматически:**
```python
# Upload master creative (1920x1080)
ai.adapt_creative({
  'master': 'key_visual.psd',
  'platforms': [
    'vk_ads',      # 10 форматов
    'instagram',   # 8 форматов
    'google_ads',  # 15 форматов
    'yandex'       # 12 форматов
  ],
  'options': {
    'smart_crop': true,
    'maintain_focal_point': true,
    'adjust_text': true
  }
})

# Output через 5 минут:
# 45 адаптаций готовы для review
```

**Экономия:** 12ч на адаптации

---

### 3. SMART EXPORT

**AI экспортирует правильно:**
```
Для каждого формата:
- Correct size (px)
- Correct file format (JPG/PNG/HTML5)
- Correct file size (<150KB)
- Color profile (sRGB)
- Naming convention (platform standard)

QA check автоматически:
✅ Size: 1080x1920 (correct)
✅ Format: JPG (correct)
✅ File size: 142KB (within limit)
✅ Text readable: Yes
✅ Logo visible: Yes
✅ CTA clear: Yes
```

**Экономия:** 3-4ч на QA

---

### 4. VISUAL APPROVAL WORKFLOW

**Streamlined process:**
```
1. Creative uploads креативы
2. AI уведомляет stakeholders
3. Feedback directly на креативе:
   💬 "CTA кнопку сделать крупнее"
   💬 "Логотип светлее"
   
4. Creative видит все comments
5. Вносит правки
6. Upload new version (v2)
7. AI tracks changes
8. Approve → передача Specialist
```

**Экономия:** 5-6ч на approvals

---

### 5. BRAND COMPLIANCE CHECK

**AI проверяет:**
```
Analyzing creative against brand guidelines...

✅ Logo: Correct version, size OK
✅ Colors: Brand palette used
✅ Fonts: Approved fonts only
⚠️ Spacing: Logo clearspace 8px (min 10px)
⚠️ CTA: "Узнать больше" not in approved list
✅ Disclaimer: Present and readable

Issues found: 2
Auto-fix available: Yes
```

---

### 6. PERFORMANCE PREDICTION

**AI предсказывает CTR:**
```
AI analyzing creative...

Predicted CTR: 2.8-3.2%
Benchmark for industry: 2.5%

Strengths:
✅ Clear CTA (+0.3% CTR)
✅ Human face (+0.2% CTR)
✅ Contrast colors (+0.2% CTR)

Improvements:
⚠️ Text amount: High (-0.2% CTR)
💡 Suggestion: Reduce text by 30%
💡 Expected: +0.3% CTR boost
```

---

## 📊 ROI

### Инвестиции:
```yaml
Стоимость: 10k руб/месяц
Обучение: 2-3 часа
```

### Возврат:
```yaml
Экономия:
  - Адаптации: 48ч/мес
  - Approvals: 24ч/мес
  - Specs: 16ч/мес
  - Versions: 6ч/мес
  
  ИТОГО: 94ч/мес

Деньги: 94ч × 2000₽ = 188k ₽/мес
ROI = (188k - 10k) / 10k = 1780%
```

---

## 🚀 НАЧАЛО

### Week 1:
1. Upload brand assets
2. Setup templates
3. First auto-adaptations

### Week 2:
1. Team training
2. Approval workflow setup
3. First project

### Week 3+:
1. Full automation
2. Quality improvement
3. Performance tracking

---

## 💡 BEST PRACTICES

### DO:
- ✅ Review AI adaptations
- ✅ Maintain brand library
- ✅ Use performance predictions
- ✅ Iterate based on data

### DON'T:
- ❌ Skip manual review
- ❌ Игнорировать AI suggestions
- ❌ Forget about creativity

---

## 🔗 Связанные

- [Role_Description.md](./Role_Description.md)
- [Pain_Points.md](./Pain_Points.md)
- [../../06_AI_ASSISTANTS/Creative_Assistant/](../../06_AI_ASSISTANTS/Creative_Assistant/)

---

**Версия:** 1.0 | **Дата:** 2025-10-23 | **Статус:** ✅


