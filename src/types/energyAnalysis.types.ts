
// Define all energy analysis-related types in a central location
export interface ConsumptionMetrics {
  dailyConsumption: number;
  peakConsumption: number;
  averageConsumption: number;
  estimatedMonthlyCost: number;
  efficiency: number;
}

// Enhanced insight type for AI-powered alerts
export interface ConsumptionInsight {
  type: 'warning' | 'info' | 'success' | 'critical';
  title: string;
  description: string;
  deviceId?: string;
  confidence?: number;
  source?: 'rule-based' | 'ai-prediction' | 'pattern-detection';
  timestamp?: string;
  actions?: RecommendedAction[];
}

// New type for suggested actions that can be taken
export interface RecommendedAction {
  actionId: string;
  title: string; 
  description: string;
  impact?: {
    savingsPercent?: number;
    savingsAmount?: number;
    environmentalImpact?: string;
  };
  automated?: boolean;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface EnergyAnalysis {
  metrics: ConsumptionMetrics;
  insights: ConsumptionInsight[];
  recommendedActions: string[];
}

// Smart Optimizer types
export interface OptimizationPlan {
  id: string;
  name: string;
  description: string;
  estimatedSavings: number;
  devices: OptimizationDeviceAction[];
  scheduleType: 'immediate' | 'scheduled' | 'recurring';
  scheduleConfig?: {
    startTime?: string;
    endTime?: string;
    daysOfWeek?: number[];
    active: boolean;
  };
}

export interface OptimizationDeviceAction {
  deviceId: string;
  deviceName: string;
  action: 'turn_off' | 'reduce_power' | 'reschedule' | 'maintenance';
  parameters?: Record<string, any>;
  estimatedImpact: number;
}

// Chart data types
export interface HourlyDataPoint {
  hour: string;
  consumption: number;
}

export interface DailyDataPoint {
  day: string;
  consumption: number;
}

export interface MonthlyDataPoint {
  month: string;
  consumption: number;
}
