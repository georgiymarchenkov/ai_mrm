/**
 * Типы для работы с медиаландшафтом
 * 
 * @module mediaLandscape.types
 * @version 1.0
 * @description TypeScript типы для базы данных рекламных площадок
 */

// ============================================================================
// ENUMS
// ============================================================================

/**
 * Категории рекламных площадок
 */
export enum PlatformCategory {
  SOCIAL_MEDIA = 'social_media',
  SEARCH = 'search',
  VIDEO = 'video',
  DISPLAY = 'display',
  PROGRAMMATIC = 'programmatic',
  NATIVE = 'native',
  AUDIO = 'audio',
  ECOM = 'ecom',
  CONTENT = 'content',
  MOBILE = 'mobile',
  OOH = 'ooh',
  CPA = 'cpa',
  TARGETED_ADVERTISING = 'targeted_advertising'
}

/**
 * Типы площадок
 */
export enum PlatformType {
  SELF_SERVICE = 'self_service',
  MANAGED = 'managed',
  HYBRID = 'hybrid'
}

/**
 * Статусы площадок
 */
export enum PlatformStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ARCHIVED = 'archived',
  BETA = 'beta'
}

/**
 * Доступность площадки
 */
export enum PlatformAvailability {
  RUSSIA = 'russia',
  INTERNATIONAL = 'international',
  LIMITED = 'limited'
}

/**
 * Типы форматов
 */
export enum FormatType {
  DISPLAY_BANNER = 'display_banner',
  VIDEO_INSTREAM = 'video_instream',
  VIDEO_OUTSTREAM = 'video_outstream',
  NATIVE = 'native',
  AUDIO = 'audio',
  RICH_MEDIA = 'rich_media',
  CAROUSEL = 'carousel',
  STORIES = 'stories',
  REWARDED = 'rewarded'
}

/**
 * Типы размещения
 */
export enum PlacementType {
  FEED = 'feed',
  SIDEBAR = 'sidebar',
  PREROLL = 'preroll',
  MIDROLL = 'midroll',
  POSTROLL = 'postroll',
  OVERLAY = 'overlay',
  INTERSTITIAL = 'interstitial',
  NATIVE = 'native',
  STORIES = 'stories',
  SEARCH = 'search'
}

/**
 * Типы устройств
 */
export enum DeviceType {
  DESKTOP = 'desktop',
  MOBILE = 'mobile',
  TABLET = 'tablet',
  SMART_TV = 'smart_tv',
  CONNECTED_TV = 'connected_tv'
}

/**
 * Модели ценообразования
 */
export enum PricingModel {
  CPM = 'cpm',
  CPC = 'cpc',
  CPV = 'cpv',
  CPA = 'cpa',
  CPL = 'cpl',
  CPI = 'cpi',
  CPE = 'cpe',
  FIXED = 'fixed',
  HYBRID = 'hybrid'
}

/**
 * Цели кампаний
 */
export enum CampaignObjective {
  AWARENESS = 'awareness',
  CONSIDERATION = 'consideration',
  CONVERSIONS = 'conversions',
  TRAFFIC = 'traffic',
  ENGAGEMENT = 'engagement',
  APP_INSTALLS = 'app_installs',
  LEAD_GENERATION = 'lead_generation',
  SALES = 'sales'
}

/**
 * Уровни географии
 */
export enum GeoLevel {
  COUNTRY = 'country',
  REGION = 'region',
  CITY = 'city',
  DISTRICT = 'district',
  RADIUS = 'radius',
  POSTAL_CODE = 'postal_code'
}

/**
 * Условия оплаты
 */
export enum PaymentTerms {
  PREPAY_100 = 'prepay_100',
  PREPAY_50 = 'prepay_50',
  POSTPAY_7 = 'postpay_7',
  POSTPAY_14 = 'postpay_14',
  POSTPAY_30 = 'postpay_30',
  CREDIT_LINE = 'credit_line'
}

/**
 * Типы контактов
 */
export enum ContactType {
  ACCOUNT_MANAGER = 'account_manager',
  SALES = 'sales',
  SUPPORT = 'support',
  BILLING = 'billing',
  TECHNICAL = 'technical',
  CREATIVE = 'creative',
  EXECUTIVE = 'executive'
}

// ============================================================================
// INTERFACES
// ============================================================================

/**
 * Площадка
 */
export interface Platform {
  // Идентификация
  id: string;
  code: string;
  name: string;
  name_en: string;
  
  // Классификация
  category: PlatformCategory;
  subcategory?: string;
  type: PlatformType;
  tags: string[];
  
  // Статус
  status: PlatformStatus;
  availability: PlatformAvailability;
  is_active: boolean;
  
  // Метаданные
  description: string;
  logo_url?: string;
  website_url?: string;
  media_kit_url?: string;
  
  // Охваты
  audience: {
    monthly_reach: number;
    daily_reach?: number;
    registered_users?: number;
    active_users?: number;
  };
  
  // Демография
  demographics: {
    age_distribution: Record<string, number>;
    gender_distribution: Record<string, number>;
    geo_distribution: Record<string, number>;
  };
  
  // Технические возможности
  capabilities: {
    has_api: boolean;
    api_version?: string;
    supports_rtb: boolean;
    supports_programmatic: boolean;
    tracking_capabilities: string[];
    attribution_window: number;
  };
  
  // Коммерческие условия
  commercial: {
    minimum_budget: number;
    minimum_campaign_duration?: number;
    payment_terms: string[];
    vat_included: boolean;
    agency_discount?: number;
  };
  
  // Временные метки
  created_at: string;
  updated_at: string;
  last_verified_at: string;
  
  // Связи
  parent_platform_id?: string;
  related_platform_ids: string[];
}

/**
 * Формат размещения
 */
export interface Format {
  id: string;
  platform_id: string;
  code: string;
  name: string;
  
  format_type: FormatType;
  placement_type: PlacementType;
  
  specs: {
    dimensions?: {
      width: number;
      height: number;
      unit: 'px' | 'dp';
    };
    
    video?: {
      min_duration: number;
      max_duration: number;
      aspect_ratio: string;
      is_skippable: boolean;
      skip_after?: number;
      required_codecs: string[];
      max_file_size_mb: number;
      resolutions: string[];
      fps?: number[];
      bitrate_kbps?: {
        min?: number;
        max?: number;
        recommended: number;
      };
      audio_required: boolean;
      audio_codecs?: string[];
    };
    
    audio?: {
      duration: number;
      format: string[];
      bitrate_kbps: number;
      max_file_size_mb: number;
    };
    
    native?: {
      title_max_length?: number;
      description_max_length?: number;
      image_required: boolean;
      image_specs?: {
        width: number;
        height: number;
        formats: string[];
      };
    };
  };
  
  placement: {
    location: string;
    position?: string;
    device_types: DeviceType[];
  };
  
  performance_benchmarks: {
    ctr_avg: number;
    ctr_range: [number, number];
    vtr_15s?: number;
    vtr_complete?: number;
    viewability_avg: number;
    ivt_avg: number;
    engagement_rate?: number;
  };
  
  features: {
    supports_animation: boolean;
    supports_html5: boolean;
    supports_interactive: boolean;
    allows_clickthrough: boolean;
    requires_moderation: boolean;
    moderation_time_hours?: number;
  };
  
  is_active: boolean;
  is_beta: boolean;
  
  created_at: string;
  updated_at: string;
  deprecated_at?: string;
}

/**
 * Таргетинг площадки
 */
export interface PlatformTargeting {
  id: string;
  platform_id: string;
  
  geo_targeting: {
    available: boolean;
    levels: GeoLevel[];
    min_radius_km?: number;
    supports_exclusion: boolean;
  };
  
  demographic_targeting: {
    age: {
      available: boolean;
      min_age?: number;
      max_age?: number;
      granularity: 'year' | 'range';
    };
    gender: {
      available: boolean;
      options: string[];
    };
    education: {
      available: boolean;
      levels: string[];
    };
    income: {
      available: boolean;
      levels: string[];
    };
  };
  
  behavioral_targeting: {
    interests: {
      available: boolean;
      categories_count: number;
      supports_custom: boolean;
    };
    online_behavior: {
      available: boolean;
      types: string[];
    };
    purchase_behavior: {
      available: boolean;
      categories: string[];
    };
  };
  
  contextual_targeting: {
    keywords: {
      available: boolean;
      max_keywords?: number;
    };
    topics: {
      available: boolean;
      taxonomy: string;
    };
    placements: {
      available: boolean;
      can_select_sites: boolean;
      can_exclude_sites: boolean;
    };
  };
  
  audience_targeting: {
    retargeting: {
      available: boolean;
      pixel_tracking: boolean;
      list_upload: boolean;
      max_list_size?: number;
      min_list_size?: number;
    };
    lookalike: {
      available: boolean;
      similarity_ranges: number[];
      min_source_size?: number;
    };
    custom_audiences: {
      available: boolean;
      types: string[];
    };
  };
  
  device_targeting: {
    device_types: {
      available: boolean;
      types: DeviceType[];
    };
    os: {
      available: boolean;
      systems: string[];
    };
    browsers: {
      available: boolean;
      browsers: string[];
    };
    connection_type: {
      available: boolean;
      types: string[];
    };
  };
  
  time_targeting: {
    day_parting: {
      available: boolean;
      granularity: 'hour' | 'half_hour';
    };
    day_of_week: {
      available: boolean;
    };
    seasonality: {
      available: boolean;
    };
  };
  
  frequency_capping: {
    available: boolean;
    levels: string[];
    time_windows: string[];
  };
}

/**
 * Ценообразование
 */
export interface PlatformPricing {
  id: string;
  platform_id: string;
  format_id?: string;
  platform_name: string;
  format_name?: string;
  
  pricing_models: PricingModel[];
  
  prices: {
    cpm?: PriceRange;
    cpc?: PriceRange;
    cpv?: PriceRangeWithDefinition;
    cpa?: PriceRangeWithAction;
    cpl?: PriceRange;
    cpi?: PriceRangeWithPlatform;
    fixed?: FixedPrice;
  };
  
  multipliers: {
    geo_multipliers?: Record<string, number>;
    time_multipliers?: {
      prime_time?: number;
      weekends?: number;
      holidays?: number;
    };
    targeting_multipliers?: {
      narrow_targeting?: number;
      lookalike?: number;
      retargeting?: number;
    };
    format_multipliers?: Record<string, number>;
  };
  
  discounts: {
    volume_discounts?: VolumeDiscount[];
    duration_discounts?: DurationDiscount[];
    agency_discount?: number;
    promotions?: Promotion[];
  };
  
  minimums: {
    min_daily_budget?: number;
    min_campaign_budget?: number;
    min_bid?: number;
  };
  
  fees: {
    platform_fee_percent?: number;
    tech_fee_percent?: number;
    vat_percent: number;
  };
  
  effective_from: string;
  effective_until?: string;
  source: string;
  last_updated: string;
  verified_by?: string;
}

/**
 * Диапазон цен
 */
export interface PriceRange {
  min: number;
  avg: number;
  max: number;
  currency: 'RUB';
}

/**
 * Диапазон цен с определением просмотра
 */
export interface PriceRangeWithDefinition extends PriceRange {
  view_definition: string;
}

/**
 * Диапазон цен с типом действия
 */
export interface PriceRangeWithAction extends PriceRange {
  action_type: string;
}

/**
 * Диапазон цен с платформой
 */
export interface PriceRangeWithPlatform extends PriceRange {
  platform: 'ios' | 'android' | 'both';
}

/**
 * Фиксированная цена
 */
export interface FixedPrice {
  amount: number;
  currency: 'RUB';
  period: 'day' | 'week' | 'month';
}

/**
 * Объемная скидка
 */
export interface VolumeDiscount {
  min_budget: number;
  discount_percent: number;
}

/**
 * Скидка за длительность
 */
export interface DurationDiscount {
  min_days: number;
  discount_percent: number;
}

/**
 * Промо-акция
 */
export interface Promotion {
  name: string;
  description: string;
  discount_percent: number;
  valid_from: string;
  valid_until: string;
  conditions?: string;
}

/**
 * Бенчмарк производительности
 */
export interface PerformanceBenchmark {
  id: string;
  platform_id: string;
  format_id?: string;
  
  segment: {
    industry?: string;
    objective?: CampaignObjective;
    audience_type?: string;
    period: string;
  };
  
  impressions: {
    avg_impressions: number;
    viewability_rate: number;
    ivt_rate: number;
    completion_rate?: number;
  };
  
  engagement: {
    ctr: number;
    ctr_range: [number, number];
    vtr_15s?: number;
    vtr_complete?: number;
    avg_watch_time?: number;
    interaction_rate?: number;
    engagement_rate?: number;
  };
  
  conversions: {
    cvr?: number;
    cpa_avg?: number;
    roas?: number;
    ltv?: number;
  };
  
  quality: {
    bounce_rate?: number;
    avg_session_duration?: number;
    pages_per_session?: number;
    brand_safety_score?: number;
  };
  
  reach: {
    avg_reach: number;
    avg_frequency: number;
    unique_reach_rate?: number;
  };
  
  costs: {
    avg_cpm: number;
    avg_cpc?: number;
    avg_cpv?: number;
    avg_cpa?: number;
  };
  
  sample_size: {
    campaigns_count: number;
    total_budget: number;
    total_impressions: number;
  };
  
  calculated_at: string;
  data_source: string;
}

/**
 * Коммерческие условия
 */
export interface CommercialTerms {
  id: string;
  platform_id: string;
  
  terms: {
    contract_type: 'io' | 'msa' | 'direct';
    minimum_budget: number;
    minimum_duration?: number;
    billing_currency: 'RUB';
  };
  
  payment: {
    payment_terms: PaymentTerms[];
    prepayment_percent?: number;
    payment_due_days?: number;
    accepts_agency_model: boolean;
    supports_credit_line: boolean;
    credit_limit?: number;
  };
  
  agency: {
    agency_discount_percent: number;
    requires_agency_contract: boolean;
    min_monthly_spend?: number;
    volume_tiers?: VolumeDiscount[];
  };
  
  refunds: {
    allows_refunds: boolean;
    refund_conditions: string;
    compensation_policy: string;
    sla?: {
      guaranteed_viewability?: number;
      guaranteed_delivery?: boolean;
      compensation_if_missed: string;
    };
  };
  
  documentation: {
    requires_io: boolean;
    io_template_url?: string;
    reporting_frequency: string[];
    report_formats: string[];
    acts_reconciliation: boolean;
  };
  
  support: {
    account_manager_included: boolean;
    dedicated_manager_threshold?: number;
    support_channels: string[];
    support_hours: string;
    response_time_sla?: string;
  };
  
  additional_services: {
    creative_production: boolean;
    campaign_strategy: boolean;
    analytics_support: boolean;
    training: boolean;
  };
  
  valid_from: string;
  valid_until?: string;
  last_negotiated: string;
  negotiated_by?: string;
  notes?: string;
}

/**
 * Контакт площадки
 */
export interface PlatformContact {
  id: string;
  platform_id: string;
  
  contact_type: ContactType;
  
  person: {
    first_name: string;
    last_name: string;
    position: string;
    department?: string;
    email: string;
    phone?: string;
    telegram?: string;
    whatsapp?: string;
  };
  
  responsibilities: {
    is_primary: boolean;
    handles: string[];
    regions?: string[];
    industries?: string[];
  };
  
  communication: {
    preferred_channel: 'email' | 'phone' | 'telegram';
    working_hours: string;
    timezone: string;
    language: string[];
    response_time: string;
  };
  
  interaction_history: InteractionRecord[];
  
  is_active: boolean;
  last_contacted: string;
  
  created_at: string;
  updated_at: string;
  added_by: string;
}

/**
 * Запись взаимодействия
 */
export interface InteractionRecord {
  date: string;
  type: 'call' | 'email' | 'meeting';
  subject: string;
  notes?: string;
  next_action?: string;
}

/**
 * Технические спецификации креативов
 */
export interface CreativeSpec {
  id: string;
  format_id: string;
  
  general: {
    file_formats: string[];
    max_file_size_mb: number;
    animation_allowed: boolean;
    animation_max_duration?: number;
    loop_allowed: boolean;
  };
  
  image?: {
    dimensions: Array<{
      width: number;
      height: number;
      required: boolean;
    }>;
    aspect_ratios: string[];
    min_resolution_dpi: number;
    color_space: string[];
    transparency_allowed: boolean;
  };
  
  video?: {
    codecs: string[];
    containers: string[];
    resolutions: string[];
    fps: number[];
    bitrate_kbps: {
      min?: number;
      max?: number;
      recommended: number;
    };
    audio_required: boolean;
    audio_codecs?: string[];
  };
  
  html5?: {
    supported: boolean;
    max_file_size_mb: number;
    allowed_technologies: string[];
    restricted_apis: string[];
    clickthrough_required: boolean;
  };
  
  text?: {
    title?: {
      max_length: number;
      allowed_chars?: string;
    };
    description?: {
      max_length: number;
      allowed_chars?: string;
    };
    cta_button?: {
      max_length: number;
      predefined_options?: string[];
    };
  };
  
  restrictions: {
    prohibited_content: string[];
    requires_disclaimer: boolean;
    age_restrictions?: string;
    brand_safety_requirements: string;
  };
  
  moderation: {
    required: boolean;
    typical_review_time_hours: number;
    rejection_reasons: string[];
    appeal_process: string;
  };
}

// ============================================================================
// API QUERY TYPES
// ============================================================================

/**
 * Параметры поиска площадок
 */
export interface PlatformSearchParams {
  category?: PlatformCategory[];
  type?: PlatformType[];
  status?: PlatformStatus;
  min_reach?: number;
  max_min_budget?: number;
  tags?: string[];
  has_api?: boolean;
  query?: string;
}

/**
 * Параметры рекомендации площадок
 */
export interface PlatformRecommendationParams {
  targetAudience: {
    age?: [number, number];
    gender?: 'male' | 'female' | 'any';
    geo?: string[];
    interests?: string[];
  };
  budget: number;
  objectives: CampaignObjective[];
  preferredFormats?: FormatType[];
  industry?: string;
}

/**
 * Параметры оценки стоимости
 */
export interface CostEstimateParams {
  platform_id: string;
  format_id?: string;
  targeting: {
    geo?: string[];
    narrow?: boolean;
  };
  volume: {
    impressions?: number;
    clicks?: number;
    budget?: number;
  };
  duration_days?: number;
}

/**
 * Результат оценки стоимости
 */
export interface CostEstimate {
  platform_id: string;
  format_id?: string;
  estimated_cost: number;
  estimated_impressions?: number;
  estimated_clicks?: number;
  estimated_reach?: number;
  pricing_model: PricingModel;
  breakdown: {
    base_cost: number;
    geo_adjustment: number;
    targeting_adjustment: number;
    discounts: number;
    vat: number;
  };
  confidence: 'low' | 'medium' | 'high';
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Список платформ
 */
export interface PlatformsList {
  platforms: Platform[];
  total: number;
}

/**
 * Список форматов
 */
export interface FormatsList {
  formats: Format[];
  total: number;
}

/**
 * Бенчмарк данные
 */
export interface BenchmarkData {
  platform_id: string;
  format_id?: string;
  avg_cpm: number;
  avg_cpc?: number;
  avg_ctr: number;
  avg_viewability: number;
}

