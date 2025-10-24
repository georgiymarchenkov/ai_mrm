/**
 * Типы данных для артефактов проекта
 */

// Placeholder: Определить полную структуру на основе схемы БД
export interface BriefData {
  client_name?: string;
  campaign_objective?: string;
  budget?: {
    total?: number;
    currency?: string;
  };
  geography?: string[];
  target_audience?: {
    age?: [number, number];
    gender?: string;
  };
  period?: {
    start?: string;
    end?: string;
  };
  kpis?: {
    cpa?: number;
    romi?: number;
  };
}

export interface MediaPlanData {
  channels?: Array<{
    name?: string;
    budget?: number;
    formats?: string[];
    kpis?: Record<string, any>;
  }>;
}

export interface StrategyData {
  key_insights?: string[];
  recommendations?: string[];
}

// Общий тип для всех артефактов
export type ArtifactData = BriefData | MediaPlanData | StrategyData;
