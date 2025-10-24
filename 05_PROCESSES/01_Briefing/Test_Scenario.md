---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: process
title: 01_Briefing - Test Scenario
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: 05_PROCESSES/01_Briefing/Test_Scenario.md
effective_date: 2025-10-24
visibility: internal
security_level: medium
tags: [process, 01_briefing, test_scenario]
---

# 01_Briefing - Test Scenario

→ [Overview](./Overview.md) | [Steps](./Process_Steps.md) | [Roles](./Roles_Responsibilities.md) | [Data](./Data_IO.md)

**Кейс:** Застройщик "СтройГрупп" - 3 ЖК, 3 города, 15М₽/мес

---

## 🎯 TEST CASE: BRIEF-TC-001

**Цель:** Протестировать процесс Briefing на реальном сложном кейсе

**Входные данные:** См. [Test Data](#test-data) ниже

**Ожидаемый результат:** Brief заполнен >95%, все роли подтвердили готовность, Client approved

---

## 📋 TEST STEPS

### STEP 1: Project Creation [Account Manager]

**Action:**
```
1. Login to MRM as "Иванов (Account Manager)"
2. Click "New Project"
3. Fill form:
   - Client: "ООО СтройГрупп"
   - Industry: "Real Estate > Developer"
   - Budget estimate: 15М₽/month
   - Timeline: Q4 2025
4. Select template: "Developer Multi-City"
5. Click "Create & Send Brief"
```

**Expected Result:**
```
✓ Project created: PRJ-2025-101
✓ Brief URL generated: https://mrm.agency/brief/PRJ-2025-101
✓ Email sent to client: petrov@stroygroupp.ru
✓ Brief status: "Awaiting Client Input"
✓ Brief completeness: 10% (только template data)
```

**Verify:**
- [ ] Project appears in dashboard
- [ ] Brief URL accessible
- [ ] Email received by client
- [ ] Timeline shows "Day 1"

---

### STEP 2: Client Initial Fill [Client]

**Action (as Client):**
```
1. Open brief URL
2. Fill Section "Company":
   - Name: ООО СтройГрупп
   - Industry: Недвижимость
   - Website: https://stroygroupp.ru
   
3. Fill Section "Products":
   Add Product 1:
     - Name: ЖК "Солнечный" Квартиры
     - City: Москва
     - Price: 8-18М₽
     - Landing: https://solnechniy-msk.ru/kvartiry
   
   Add Product 2:
     - Name: ЖК "Морской" Квартиры
     - City: СПб
     - Price: 6-11М₽
     - Landing: https://morskoy-spb.ru
   
   Add Product 3:
     - Name: ЖК "Лесной" Квартиры
     - City: Казань
     - Price: 4-7.5М₽
     - Landing: https://lesnoy-kzn.ru

4. Fill Section "Goals":
   - Main goal: Продать 120 квартир в Q4
   - Budget: 15М₽/месяц
   
5. Save (auto-save every 30 sec)
6. Click "Notify Account Manager"
```

**Expected Result:**
```
✓ Brief completeness: 45%
✓ Notification sent to Account
✓ Status: "In Progress"
```

**Verify:**
- [ ] All entered data saved
- [ ] Completeness indicator updated
- [ ] Account received notification

---

### STEP 3: Briefing Call [Account + Client]

**Action:**
```
1. Account schedules call (via MRM)
2. Call conducted (1 hour)
3. Account asks questions during call:
   - "Позиционирование каждого ЖК?"
   - "Целевая аудитория?"
   - "Конкуренты?"
   - "Current marketing - что работает?"
   
4. Client answers (see Test Data)
5. Account fills brief during call
6. AI transcription (optional)
```

**Expected Result:**
```
✓ Brief completeness: 65%
✓ Call notes saved
✓ Key sections filled:
  - Positioning (all 3 ЖК)
  - Target Audience (basic)
  - Competitors (listed)
```

**Verify:**
- [ ] All answers recorded
- [ ] Completeness jumped to 65%
- [ ] Call duration logged

---

### STEP 4: Team Review [Parallel]

**Action (Strategist):**
```
1. Login as "Кузнецова (Strategist)"
2. Review brief PRJ-2025-101
3. Add questions:
   - "USP для каждого ЖК - детально?"
   - "Customer journey - как клиенты узнают о вас?"
   - "Эмоциональные benefits - что важно покупателям?"
4. Save questions
```

**Action (Specialist Context):**
```
1. Login as "Сидоров (Context Specialist)"
2. Review brief
3. Add questions:
   - "Yandex Metrica IDs для 3 сайтов?"
   - "Текущие keywords - какие работают?"
   - "Negative keywords - что исключить?"
4. Save
```

**Action (Analyst):**
```
1. Login as "Петрова (Analyst)"
2. Review brief
3. Add questions:
   - "Доступ к Metrica - можем получить?"
   - "CRM система - какая? Интеграция?"
   - "Call tracking - используете?"
4. Save
```

**Action (Creative):**
```
1. Login as "Орлов (Creative)"
2. Review brief
3. Add questions:
   - "Brand guidelines - есть?"
   - "Фото квартир - в каком качестве?"
   - "Tone of voice - примеры?"
4. Save
```

**Expected Result:**
```
✓ Total questions added: 28
✓ Brief status: "Awaiting Answers"
✓ Client notification sent
```

**Verify:**
- [ ] All 4 roles added questions
- [ ] Questions visible to Account & Client
- [ ] Notification sent

---

### STEP 5: Client Answers [Client with Account help]

**Action:**
```
1. Client receives email with questions
2. Account calls client, goes through questions
3. Account fills answers:
   
   Strategist Q: "USP для Солнечный?"
   Answer: "Метро 5 минут, центр, проверенный застройщик 15 лет"
   
   Strategist Q: "Customer journey?"
   Answer: "Yandex поиск → сайт → заявка → звонок отдела продаж → встреча → сделка"
   
   Context Q: "Metrica IDs?"
   Answer: 
     - solnechniy-msk.ru: 12345678
     - morskoy-spb.ru: 23456789
     - lesnoy-kzn.ru: 34567890
   
   Analyst Q: "CRM?"
   Answer: "Bitrix24, API есть"
   
   Creative Q: "Brand guidelines?"
   Answer: "Отправим файлы отдельно"
   
4. Save all answers
```

**Expected Result:**
```
✓ Brief completeness: 90%
✓ Status: "Review"
✓ 25/28 questions answered
✓ 3 questions pending (materials upload)
```

**Verify:**
- [ ] Answers saved correctly
- [ ] Completeness updated
- [ ] Pending questions flagged

---

### STEP 6: Materials Upload [Client]

**Action:**
```
1. Client uploads files to MRM:
   - Brand_Guidelines.pdf
   - Logo_Files.zip
   - Photos_Solnechniy.zip (50 photos)
   - Photos_Morskoy.zip (40 photos)
   - Photos_Lesnoy.zip (30 photos)
```

**Expected Result:**
```
✓ Files uploaded
✓ Brief completeness: 93%
✓ Creative confirmed: "Materials received"
```

**Verify:**
- [ ] Files accessible to Creative
- [ ] File sizes reasonable (<100MB total)

---

### STEP 7: Deep Dive Session (optional)

**Action:**
```
1. Strategist requests 30min call with client
2. Deep dive on positioning:
   - Clarify emotional benefits
   - Discuss competitive advantages
   - Define brand personality
3. Strategist updates brief
```

**Expected Result:**
```
✓ Positioning section detailed
✓ Brief completeness: 96%
```

**Verify:**
- [ ] Positioning clear for all 3 ЖК
- [ ] Differentiation obvious

---

### STEP 8: Final Validation [PM + Account]

**Action:**
```
1. PM runs validation check:
   - All mandatory fields filled
   - No data conflicts
   - All roles confirmed readiness
   
2. Check role confirmations:
   - Strategist: ✓ "Могу разработать стратегию"
   - Specialist: ✓ "Могу спланировать кампании"
   - Analyst: ✓ "Могу настроить tracking"
   - Creative: ✓ "Могу создать креативы"
   
3. Account shows filled brief to client
4. Client reviews
5. Client clicks "Approve"
```

**Expected Result:**
```
✓ Validation passed
✓ All roles confirmed
✓ Client approved
✓ Brief status: "Approved"
✓ Brief completeness: 97%
✓ Next process triggered: Strategy Development
```

**Verify:**
- [ ] Validation errors: 0
- [ ] All checkboxes green
- [ ] Client approval timestamp recorded
- [ ] Strategist received notification

---

### STEP 9: Handoff to Strategy

**Action:**
```
1. Account clicks "Start Strategy Development"
2. System:
   - Assigns to Strategist
   - Creates Strategy task
   - Sets deadline (+7 days)
   - Sends notification
```

**Expected Result:**
```
✓ Brief process complete
✓ Strategy process started
✓ Strategist notified
```

**Verify:**
- [ ] Brief locked (no more edits)
- [ ] Strategy task visible in Strategist dashboard
- [ ] Timeline updated

---

## ✅ TEST VERIFICATION

### Completeness Check:

```yaml
Required Sections:
  ✓ Company info: 100%
  ✓ Products (3 ЖК): 100%
  ✓ Target Audience: 95%
  ✓ Goals & KPIs: 100%
  ✓ Budget: 100%
  ✓ Channels requirements: 90%
  ✓ Creative materials: 95%
  ✓ Analytics setup: 100%
  ✓ Project info: 100%

Overall: 97% ✅
```

### Roles Confirmation:

```
✓ Strategist: Confirmed "Ready for strategy"
✓ Context Specialist: Confirmed "Ready to plan"
✓ Analyst: Confirmed "Ready to setup tracking"
✓ Creative: Confirmed "Ready to create"
✓ Client: Approved brief
```

### Timeline Check:

```
Target: 2-5 days
Actual: 4 days ✅

Day 1: Project creation, Client initial fill
Day 2: Briefing call, Team review
Day 3: Client answers questions
Day 4: Materials upload, Deep dive, Final approval

Within target! ✅
```

---

## 🧪 TEST DATA

### Client Info:
```yaml
Company: ООО "СтройГрупп"
Contact: Петров Иван Иванович (CMO)
Email: petrov@stroygroupp.ru
Phone: +7 (495) 123-45-67
```

### Products Data:
```yaml
ЖК "Солнечный" (Москва):
  Квартиры: 1к (8-10М), 2к (12-14М), 3к (15-18М)
  Паркинги: 1.5-2М
  Бизнес-площади: 50-200м²
  Landing: https://solnechniy-msk.ru
  Target sales: 40 квартир/Q4

ЖК "Морской" (СПб):
  Квартиры: 1к (6-8М), 2к (9-11М)
  Паркинги: 1-1.5М
  Landing: https://morskoy-spb.ru
  Target sales: 50 квартир/Q4

ЖК "Лесной" (Казань):
  Квартиры: 1к (4-5.5М), 2к (6-7.5М)
  Landing: https://lesnoy-kzn.ru
  Target sales: 30 квартир/Q4
```

### Budget:
```yaml
Total: 15М₽/month (45М₽ Q4)
Allocation:
  Moscow: 8М (53%)
  SPb: 4М (27%)
  Kazan: 3М (20%)
```

---

## 🎯 PASS/FAIL CRITERIA

**PASS if:**
- ✅ Brief completeness ≥95%
- ✅ All roles confirmed readiness
- ✅ Client approved
- ✅ Timeline ≤5 days
- ✅ No blocking issues
- ✅ Next process triggered

**FAIL if:**
- ❌ Completeness <90%
- ❌ Any role NOT confirmed
- ❌ Client NOT approved
- ❌ Timeline >7 days
- ❌ Blocking issues unresolved

---

**Test Status:** ✅ READY FOR EXECUTION

---

**Версия:** 2.1  
**Строк:** 175  
**Статус:** ✅ Готово


