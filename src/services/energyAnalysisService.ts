
import { Device } from '@/types/device.types';
import { EnergyAnalysis } from '@/types/energyAnalysis.types';
import { energyMetricsService } from './energyMetricsService';
import { energyInsightsService } from './energyInsightsService';
import { energyChartService } from './energyChartService';

// Re-export the types from our types file for backward compatibility
export type { ConsumptionMetrics, ConsumptionInsight, EnergyAnalysis } from '@/types/energyAnalysis.types';

// Main energy analysis service that combines all specialized services
export const energyAnalysisService = {
  // Analyze device data and return consumption metrics and insights
  analyzeConsumption(devices: Device[], localDate: Date = new Date()): EnergyAnalysis {
    // If no devices, return default values
    if (!devices || devices.length === 0) {
      return {
        metrics: {
          dailyConsumption: 0,
          peakConsumption: 0,
          averageConsumption: 0,
          estimatedMonthlyCost: 0,
          efficiency: 0
        },
        insights: [],
        recommendedActions: []
      };
    }

    // Calculate metrics using the metrics service
    const metrics = energyMetricsService.calculateMetrics(devices, localDate);
    
    // Generate insights using the insights service
    const insights = energyInsightsService.generateInsights(devices, localDate);
    
    // Generate recommendations using the insights service
    const recommendedActions = energyInsightsService.generateRecommendations(devices, localDate);

    return {
      metrics,
      insights,
      recommendedActions
    };
  },

  // Forward chart data generation methods from the chart service
  generateHourlyData: energyChartService.generateHourlyData,
  generateDailyData: energyChartService.generateDailyData,
  generateMonthlyData: energyChartService.generateMonthlyData
};
