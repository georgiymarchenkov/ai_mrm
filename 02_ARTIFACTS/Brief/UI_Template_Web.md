---
tenant_id: mrm
client_id: global
project_id: platform_docs
artifact_type: artifact_doc
title: Brief - Web UI Template
language: ru
industry: advertising
role_apply: [all]
period: 2025-10
version: "1.0"
source_path: 02_ARTIFACTS/Brief/UI_Template_Web.md
effective_date: 2025-10-24
visibility: internal
security_level: medium
tags: [artifact, brief]
---

# Brief - Web UI Template

## 🎨 Web интерфейс для заполнения брифа

Современный, интуитивный интерфейс для заполнения брифа клиентом или Account Manager.

→ См. также: [Data_Structure.md](./Data_Structure.md) для JSON schema

---

## 📱 Общая структура

### Layout:
```
┌──────────────────────────────────────────────────────┐
│  Header: MRM AI - Создание брифа                     │
│  Progress: ████████░░░░ 60% (шаг 3 из 5)            │
├──────────────────────────────────────────────────────┤
│                                                      │
│  [Left Sidebar]          [Main Content]             │
│  - О клиенте ✅          ┌─────────────────────┐    │
│  - Цели РК ✅            │                     │    │
│  - Целевая аудитория ⏳  │ Форма заполнения    │    │
│  - Бюджет ⬜             │                     │    │
│  - Каналы ⬜             │                     │    │
│                          └─────────────────────┘    │
│                                                      │
│                        [Назад] [Далее] [Сохранить]  │
└──────────────────────────────────────────────────────┘
```

---

## 📋 Пошаговая форма (5 шагов)

### ШАГ 1: ИНФОРМАЦИЯ О КЛИЕНТЕ

```jsx
<Section title="Информация о клиенте">
  <FormGroup>
    <Label required>Название компании</Label>
    <Input 
      placeholder="ООО 'Ромашка'"
      value={brief.clientInfo.companyName}
      validation={minLength: 2}
    />
  </FormGroup>

  <FormGroup>
    <Label>Отрасль</Label>
    <Select
      options={[
        'E-commerce',
        'Финансы',
        'Недвижимость',
        'Образование',
        'HoReCa',
        // ... other industries
      ]}
      value={brief.clientInfo.industry}
    />
  </FormGroup>

  <FormGroup>
    <Label>Сайт компании</Label>
    <Input 
      type="url"
      placeholder="https://example.com"
      value={brief.clientInfo.website}
    />
  </FormGroup>

  <Divider />

  <SubsectionTitle>Контактное лицо</SubsectionTitle>

  <Row columns={2}>
    <FormGroup>
      <Label required>ФИО</Label>
      <Input 
        placeholder="Иванов Иван Иванович"
        value={brief.clientInfo.contactPerson.name}
      />
    </FormGroup>

    <FormGroup>
      <Label>Должность</Label>
      <Input 
        placeholder="Маркетинг-директор"
        value={brief.clientInfo.contactPerson.position}
      />
    </FormGroup>
  </Row>

  <Row columns={2}>
    <FormGroup>
      <Label required>Email</Label>
      <Input 
        type="email"
        placeholder="ivan@example.com"
        value={brief.clientInfo.contactPerson.email}
      />
    </FormGroup>

    <FormGroup>
      <Label>Телефон</Label>
      <Input 
        type="tel"
        placeholder="+7 (999) 123-45-67"
        value={brief.clientInfo.contactPerson.phone}
      />
    </FormGroup>
  </Row>

  {/* AI Suggestion */}
  <AIHelperCard>
    <Icon>🤖</Icon>
    <Text>У вас уже есть 3 проекта с этим клиентом. 
      Хотите скопировать данные из предыдущего брифа?
    </Text>
    <Button variant="secondary">Заполнить автоматически</Button>
  </AIHelperCard>
</Section>
```

---

### ШАГ 2: ЦЕЛИ РЕКЛАМНОЙ КАМПАНИИ

```jsx
<Section title="Цели кампании">
  <FormGroup>
    <Label required>Основная цель</Label>
    <RadioGroup value={brief.campaignGoals.primaryGoal}>
      <Radio value="brand_awareness">
        <Icon>👁️</Icon>
        <Title>Brand Awareness</Title>
        <Description>Узнаваемость бренда, охват аудитории</Description>
      </Radio>

      <Radio value="lead_generation">
        <Icon>📝</Icon>
        <Title>Лидогенерация</Title>
        <Description>Сбор контактов потенциальных клиентов</Description>
      </Radio>

      <Radio value="sales">
        <Icon>💰</Icon>
        <Title>Продажи</Title>
        <Description>Прямые продажи товаров или услуг</Description>
      </Radio>

      <Radio value="traffic">
        <Icon>🚀</Icon>
        <Title>Трафик на сайт</Title>
        <Description>Увеличение посещаемости сайта</Description>
      </Radio>

      <Radio value="engagement">
        <Icon>❤️</Icon>
        <Title>Вовлечение</Title>
        <Description>Взаимодействие с контентом</Description>
      </Radio>
    </RadioGroup>
  </FormGroup>

  <FormGroup>
    <Label>Дополнительные цели</Label>
    <CheckboxGroup>
      <Checkbox value="increase_brand_recall">
        Повысить запоминаемость бренда
      </Checkbox>
      <Checkbox value="product_launch">
        Запуск нового продукта
      </Checkbox>
      <Checkbox value="competitor_awareness">
        Переключение от конкурентов
      </Checkbox>
    </CheckboxGroup>
  </FormGroup>

  <FormGroup>
    <Label required>Описание бизнес-задачи</Label>
    <Textarea 
      placeholder="Подробно опишите, что вы хотите достичь этой кампанией..."
      minLength={50}
      maxLength={2000}
      value={brief.campaignGoals.description}
      showCounter
    />
    <Hint>Минимум 50 символов, осталось: {50 - length}</Hint>
  </FormGroup>

  <Divider />

  <SubsectionTitle>
    Ключевые метрики успеха (KPI)
    <Tooltip>Какие показатели будут свидетельствовать об успехе?</Tooltip>
  </SubsectionTitle>

  <DynamicList>
    {brief.campaignGoals.kpis.map((kpi, index) => (
      <Card key={index}>
        <Row columns={3}>
          <FormGroup>
            <Label>Метрика</Label>
            <Select
              options={[
                {value: 'reach', label: 'Охват (Reach)'},
                {value: 'impressions', label: 'Показы'},
                {value: 'clicks', label: 'Клики'},
                {value: 'ctr', label: 'CTR'},
                {value: 'conversions', label: 'Конверсии'},
                {value: 'cpa', label: 'CPA'},
                {value: 'roas', label: 'ROAS'},
              ]}
              value={kpi.metric}
            />
          </FormGroup>

          <FormGroup>
            <Label>Целевое значение</Label>
            <Input 
              type="number"
              placeholder="1000"
              value={kpi.target}
            />
          </FormGroup>

          <FormGroup>
            <Label>Единица</Label>
            <Input 
              placeholder="%"
              value={kpi.unit}
            />
          </FormGroup>
        </Row>

        <Button 
          variant="danger-outline" 
          size="small"
          onClick={() => removeKPI(index)}
        >
          Удалить
        </Button>
      </Card>
    ))}

    <Button 
      variant="secondary" 
      onClick={addKPI}
    >
      + Добавить KPI
    </Button>
  </DynamicList>

  {/* AI Suggestion */}
  <AIHelperCard>
    <Icon>💡</Icon>
    <Text>На основе вашей цели "Продажи" рекомендуем отслеживать:
      CPA (≤1500₽), ROAS (≥3.0), Конверсии (≥500/мес)
    </Text>
    <Button variant="link">Применить рекомендации</Button>
  </AIHelperCard>
</Section>
```

---

### ШАГ 3: ЦЕЛЕВАЯ АУДИТОРИЯ

```jsx
<Section title="Целевая аудитория">
  <FormGroup>
    <Label required>Описание ЦА</Label>
    <Textarea 
      placeholder="Опишите вашу целевую аудиторию: кто они, чем занимаются, какие у них потребности..."
      minLength={50}
      value={brief.targetAudience.description}
    />
  </FormGroup>

  <Divider />

  <SubsectionTitle>Демография</SubsectionTitle>

  <FormGroup>
    <Label>Пол</Label>
    <CheckboxGroup inline>
      <Checkbox value="male">Мужской</Checkbox>
      <Checkbox value="female">Женский</Checkbox>
      <Checkbox value="all">Все</Checkbox>
    </CheckboxGroup>
  </FormGroup>

  <FormGroup>
    <Label>Возраст</Label>
    <RangeSlider 
      min={0}
      max={100}
      value={[brief.targetAudience.demographics.ageRange.min, 
              brief.targetAudience.demographics.ageRange.max]}
      onChange={updateAgeRange}
    />
    <RangeDisplay>
      {ageRange.min} - {ageRange.max} лет
    </RangeDisplay>
  </FormGroup>

  <FormGroup>
    <Label>Доход</Label>
    <Select
      options={[
        'Любой',
        'Низкий',
        'Ниже среднего',
        'Средний',
        'Выше среднего',
        'Высокий',
      ]}
      value={brief.targetAudience.demographics.income}
    />
  </FormGroup>

  <Divider />

  <SubsectionTitle>География</SubsectionTitle>

  <DynamicList>
    {brief.targetAudience.demographics.geography.map((geo, index) => (
      <Card key={index}>
        <Row columns={3}>
          <FormGroup>
            <Label>Тип</Label>
            <Select
              options={[
                {value: 'country', label: 'Страна'},
                {value: 'region', label: 'Регион'},
                {value: 'city', label: 'Город'},
              ]}
              value={geo.type}
            />
          </FormGroup>

          <FormGroup>
            <Label>Название</Label>
            <Autocomplete
              placeholder="Начните вводить..."
              options={geoSuggestions}
              value={geo.name}
            />
          </FormGroup>

          <FormGroup>
            <Label>Приоритет</Label>
            <RadioGroup inline>
              <Radio value="primary">Основной</Radio>
              <Radio value="secondary">Доп.</Radio>
            </RadioGroup>
          </FormGroup>
        </Row>

        <Button variant="danger-outline" onClick={() => removeGeo(index)}>
          Удалить
        </Button>
      </Card>
    ))}

    <Button variant="secondary" onClick={addGeo}>
      + Добавить регион
    </Button>
  </DynamicList>

  <Divider />

  <SubsectionTitle>Интересы и поведение</SubsectionTitle>

  <FormGroup>
    <Label>Интересы аудитории</Label>
    <TagInput
      placeholder="Введите интерес и нажмите Enter"
      tags={brief.targetAudience.interests}
      onAddTag={addInterest}
      onRemoveTag={removeInterest}
    />
    <Hint>Например: спорт, технологии, путешествия</Hint>
  </FormGroup>

  <FormGroup>
    <Label>Поведенческие характеристики</Label>
    <TagInput
      placeholder="Введите характеристику"
      tags={brief.targetAudience.behaviors}
    />
    <Hint>Например: онлайн-шоппинг, активные в соцсетях</Hint>
  </FormGroup>

  {/* AI Suggestion */}
  <AIHelperCard>
    <Icon>🎯</Icon>
    <Text>На основе описания вашей ЦА мы определили:
      <ul>
        <li>Возраст: 25-45 лет</li>
        <li>Интересы: Технологии, карьерный рост</li>
        <li>Поведение: B2B покупатели, decision makers</li>
      </ul>
    </Text>
    <Button variant="link">Применить</Button>
  </AIHelperCard>
</Section>
```

---

### ШАГ 4: БЮДЖЕТ И СРОКИ

```jsx
<Section title="Бюджет и сроки">
  <SubsectionTitle>Бюджет</SubsectionTitle>

  <Row columns={2}>
    <FormGroup>
      <Label required>Общий бюджет</Label>
      <InputGroup>
        <Input 
          type="number"
          placeholder="1000000"
          value={brief.budget.total}
        />
        <InputAddon>₽</InputAddon>
      </InputGroup>
    </FormGroup>

    <FormGroup>
      <Label>Период</Label>
      <Select
        options={[
          {value: 'month', label: 'Месяц'},
          {value: 'quarter', label: 'Квартал'},
          {value: 'year', label: 'Год'},
          {value: 'total', label: 'Весь проект'},
        ]}
        value={brief.budget.period}
      />
    </FormGroup>
  </Row>

  <FormGroup>
    <Label>Гибкость бюджета</Label>
    <RadioGroup>
      <Radio value="strict">
        <Strong>Строгий</Strong> - нельзя превышать
      </Radio>
      <Radio value="flexible">
        <Strong>Гибкий</Strong> - возможны отклонения ±10%
      </Radio>
      <Radio value="very_flexible">
        <Strong>Очень гибкий</Strong> - если есть результаты
      </Radio>
    </RadioGroup>
  </FormGroup>

  <Divider />

  <SubsectionTitle>Распределение бюджета (опционально)</SubsectionTitle>

  <FormGroup>
    <PieChartInput
      total={brief.budget.total}
      segments={[
        {label: 'Медийный бюджет', value: brief.budget.distribution.media, color: '#4CAF50'},
        {label: 'Производство', value: brief.budget.distribution.production, color: '#2196F3'},
        {label: 'Агентское', value: brief.budget.distribution.agency, color: '#FF9800'},
      ]}
      onChange={updateDistribution}
    />
  </FormGroup>

  <Divider />

  <SubsectionTitle>Сроки</SubsectionTitle>

  <Row columns={2}>
    <FormGroup>
      <Label required>Дата начала</Label>
      <DatePicker 
        value={brief.timeline.startDate}
        minDate={today}
      />
    </FormGroup>

    <FormGroup>
      <Label required>Дата окончания</Label>
      <DatePicker 
        value={brief.timeline.endDate}
        minDate={brief.timeline.startDate}
      />
    </FormGroup>
  </Row>

  <FormGroup>
    <Checkbox value={brief.timeline.isFlexible}>
      Даты гибкие и могут быть скорректированы
    </Checkbox>
  </FormGroup>

  <Divider />

  <SubsectionTitle>Ключевые этапы (опционально)</SubsectionTitle>

  <DynamicList>
    {brief.timeline.milestones.map((milestone, index) => (
      <Card key={index}>
        <Row columns={2}>
          <FormGroup>
            <Label>Название этапа</Label>
            <Input 
              placeholder="Запуск кампании"
              value={milestone.name}
            />
          </FormGroup>

          <FormGroup>
            <Label>Дата</Label>
            <DatePicker value={milestone.date} />
          </FormGroup>
        </Row>

        <FormGroup>
          <Label>Описание</Label>
          <Input 
            placeholder="Краткое описание этапа"
            value={milestone.description}
          />
        </FormGroup>

        <Button variant="danger-outline" onClick={() => removeMilestone(index)}>
          Удалить
        </Button>
      </Card>
    ))}

    <Button variant="secondary" onClick={addMilestone}>
      + Добавить этап
    </Button>
  </DynamicList>

  {/* Budget Forecast */}
  <InfoCard>
    <Icon>📊</Icon>
    <Title>Прогноз по бюджету</Title>
    <Text>
      На основе похожих проектов рекомендуем:
      <ul>
        <li>Медийный бюджет: 70% (700k ₽)</li>
        <li>Производство: 15% (150k ₽)</li>
        <li>Агентское: 15% (150k ₽)</li>
      </ul>
    </Text>
  </InfoCard>
</Section>
```

---

### ШАГ 5: КАНАЛЫ И ДОПОЛНИТЕЛЬНО

```jsx
<Section title="Каналы и дополнительная информация">
  <SubsectionTitle>Предпочитаемые каналы</SubsectionTitle>

  <CheckboxGroup grid columns={3}>
    <Checkbox value="yandex_direct">
      <Icon>🔍</Icon>
      <Label>Яндекс Директ</Label>
    </Checkbox>

    <Checkbox value="vk_ads">
      <Icon>🔵</Icon>
      <Label>VK Реклама</Label>
    </Checkbox>

    <Checkbox value="mytarget">
      <Icon>🎯</Icon>
      <Label>MyTarget</Label>
    </Checkbox>

    <Checkbox value="telegram_ads">
      <Icon>✈️</Icon>
      <Label>Telegram Ads</Label>
    </Checkbox>

    <Checkbox value="programmatic">
      <Icon>📊</Icon>
      <Label>Программатик</Label>
    </Checkbox>

    <Checkbox value="youtube">
      <Icon>▶️</Icon>
      <Label>YouTube</Label>
    </Checkbox>

    {/* ... more channels */}
  </CheckboxGroup>

  <FormGroup>
    <Label>Исключенные каналы</Label>
    <TagInput
      placeholder="Укажите каналы, которые НЕ хотите использовать"
      tags={brief.channels.excluded}
    />
  </FormGroup>

  <FormGroup>
    <Label>Комментарии по каналам</Label>
    <Textarea 
      placeholder="Дополнительные пожелания или ограничения..."
      value={brief.channels.notes}
    />
  </FormGroup>

  <Divider />

  <SubsectionTitle>Креативные требования</SubsectionTitle>

  <FormGroup>
    <Label>Брендбук</Label>
    <FileUpload 
      accept=".pdf"
      placeholder="Загрузите брендбук или дайте ссылку"
      value={brief.creativeRequirements.brandGuidelines}
    />
  </FormGroup>

  <FormGroup>
    <Label>Тон коммуникации</Label>
    <Select
      options={[
        {value: 'formal', label: 'Формальный'},
        {value: 'friendly', label: 'Дружелюбный'},
        {value: 'playful', label: 'Игривый'},
        {value: 'authoritative', label: 'Авторитетный'},
        {value: 'inspirational', label: 'Вдохновляющий'},
      ]}
      value={brief.creativeRequirements.tone}
    />
  </FormGroup>

  <FormGroup>
    <Label>Ограничения и табу</Label>
    <TagInput
      placeholder="Что нельзя использовать в креативах"
      tags={brief.creativeRequirements.restrictions}
    />
    <Hint>Например: конкуренты, определенные слова, образы</Hint>
  </FormGroup>

  <FormGroup>
    <Label>Референсы</Label>
    <DynamicList>
      {brief.creativeRequirements.references.map((ref, index) => (
        <Card key={index}>
          <FormGroup>
            <Label>Ссылка</Label>
            <Input 
              type="url"
              placeholder="https://example.com/creative"
              value={ref.url}
            />
          </FormGroup>

          <FormGroup>
            <Label>Что понравилось?</Label>
            <Textarea 
              placeholder="Опишите, что именно вам понравилось в этом примере"
              value={ref.description}
            />
          </FormGroup>

          <Button variant="danger-outline" onClick={() => removeReference(index)}>
            Удалить
          </Button>
        </Card>
      ))}

      <Button variant="secondary" onClick={addReference}>
        + Добавить референс
      </Button>
    </DynamicList>
  </FormGroup>

  <Divider />

  <SubsectionTitle>Дополнительная информация</SubsectionTitle>

  <FormGroup>
    <Label>Комментарии и пожелания</Label>
    <Textarea 
      placeholder="Любая дополнительная информация, которая может быть полезна..."
      value={brief.additionalInfo.notes}
    />
  </FormGroup>

  {/* Final AI Suggestions */}
  <AIHelperCard variant="success">
    <Icon>✨</Icon>
    <Title>Бриф готов к отправке!</Title>
    <Text>
      AI проверил ваш бриф и выявил:
      <ul>
        <li>✅ Все обязательные поля заполнены</li>
        <li>✅ Бюджет соответствует целям</li>
        <li>⚠️ Рекомендуем добавить Telegram в список каналов (высокий ROI для вашей ЦА)</li>
      </ul>
    </Text>
  </AIHelperCard>
</Section>
```

---

## 🎨 UI Components

### Стилистика:
```css
/* Color Palette */
--primary: #2196F3;
--success: #4CAF50;
--warning: #FF9800;
--danger: #F44336;
--text: #333333;
--text-secondary: #757575;
--background: #FFFFFF;
--background-secondary: #F5F5F5;
--border: #E0E0E0;

/* Typography */
--font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
--font-size-xs: 12px;
--font-size-sm: 14px;
--font-size-base: 16px;
--font-size-lg: 18px;
--font-size-xl: 24px;

/* Spacing */
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 24px;
--spacing-xl: 32px;
```

### Key Features:
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Auto-save каждые 3 секунды
- ✅ Валидация в реальном времени
- ✅ AI подсказки и автозаполнение
- ✅ Progress indicator
- ✅ Keyboard navigation
- ✅ Accessibility (ARIA labels, screen reader support)

---

## 🔗 Связанные документы

- [Data_Structure.md](./Data_Structure.md) - JSON schema
- [Validation_Rules.md](./Validation_Rules.md) - Правила валидации
- [Examples.md](./Examples.md) - Примеры заполнения
- [API_Endpoints.md](./API_Endpoints.md) - API для работы с брифом

---

**Версия:** 1.0 | **Дата:** 2025-10-23 | **Статус:** ✅ Завершено

