
// Define all energy analysis-related types in a central location
export interface ConsumptionMetrics {
  dailyConsumption: number;
  peakConsumption: number;
  averageConsumption: number;
  estimatedMonthlyCost: number;
  efficiency: number;
}

export interface ConsumptionInsight {
  type: 'warning' | 'info' | 'success';
  title: string;
  description: string;
  deviceId?: string;
}

export interface EnergyAnalysis {
  metrics: ConsumptionMetrics;
  insights: ConsumptionInsight[];
  recommendedActions: string[];
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
