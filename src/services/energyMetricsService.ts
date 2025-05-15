import { Device } from '@/types/device.types';
import { ConsumptionMetrics } from '@/types/energyAnalysis.types';

export const energyMetricsService = {
  // Calculate basic energy consumption metrics
  calculateMetrics(devices: Device[], localDate: Date = new Date()): ConsumptionMetrics {
    // If no devices, return default values
    if (!devices || devices.length === 0) {
      return {
        dailyConsumption: 0,
        peakConsumption: 0,
        averageConsumption: 0,
        estimatedMonthlyCost: 0,
        efficiency: 0
      };
    }

    // Basic calculation for daily consumption
    const totalMonthlyConsumption = devices.reduce((sum, device) => {
      if (device.powerState) {
        return sum + device.consumption;
      }
      return sum;
    }, 0);
    
    // Simplified calculations
    const daysInMonth = 30;
    const dailyConsumption = Math.round(totalMonthlyConsumption / daysInMonth);
    const peakHoursConsumption = Math.round(dailyConsumption * 0.4); // Simplified peak hour calculation
    const averageConsumption = Math.round(dailyConsumption / 24); // Simple hourly average
    
    // Basic cost calculation
    const averageTariff = 0.7; // R$/kWh simplified rate
    const estimatedMonthlyCost = Math.round(totalMonthlyConsumption * averageTariff);
    
    // Simple efficiency calculation
    const efficiency = devices.length > 0 ? 
      Math.round(100 - (devices.filter(d => d.powerState && d.consumption > 100).length * 10)) : 0;

    return {
      dailyConsumption,
      peakConsumption: peakHoursConsumption,
      averageConsumption,
      estimatedMonthlyCost,
      efficiency: Math.max(0, Math.min(100, efficiency)) // Ensure between 0-100
    };
  },

  // Simple efficiency score calculation for future AI model integration
  calculateEfficiencyScore(devices: Device[], currentHour: number): number {
    if (!devices || devices.length === 0) {
      return 0;
    }

    // Placeholder for future AI-based efficiency calculation
    // Currently using a very simple calculation based on device count and states
    const activeDevices = devices.filter(d => d.powerState);
    const baseScore = 100;
    const penaltyPerActiveDevice = 5;
    
    const score = baseScore - (activeDevices.length * penaltyPerActiveDevice);
    
    // Ensure score is between 0 and 100
    return Math.max(0, Math.min(100, score));
  }
};
