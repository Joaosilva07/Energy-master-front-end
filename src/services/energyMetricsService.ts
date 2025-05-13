import { Device } from '@/types/device.types';
import { ConsumptionMetrics } from '@/types/energyAnalysis.types';
import { simulatedDataset } from '@/data/energyConsumptionDataset';

export const energyMetricsService = {
  // Calculate energy consumption metrics with improved formulas based on the provided spec
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

    // 1. CONSUMO TOTAL: soma de todos os consumos medidos em kWh
    const totalMonthlyConsumption = devices.reduce((sum, device) => sum + device.consumption, 0);
    
    // Calculate daily consumption (total ÷ 30 days)
    const dailyConsumption = totalMonthlyConsumption / 30;
    
    // 2. CONSUMO EM PICO: consumo durante horários de pico (18h-21h)
    // For peak consumption, use hourly patterns from dataset to calculate peak hours (18h-21h)
    const peakHours = [18, 19, 20]; // Peak hours 18h-21h
    const peakHourlyFactors = peakHours.map(hour => simulatedDataset.hourlyPatterns[hour]);
    const avgPeakFactor = peakHourlyFactors.reduce((sum, factor) => sum + factor, 0) / peakHourlyFactors.length;
    const peakHoursConsumption = (dailyConsumption / 24) * 3 * avgPeakFactor * 1.2; // 3 hours with peak factor
    
    // Calculate average hourly consumption
    const currentHour = localDate.getHours();
    const hourlyPattern = simulatedDataset.hourlyPatterns[currentHour];
    const averageConsumption = (dailyConsumption / 24) * hourlyPattern;
    
    // 4. CUSTO ESTIMADO: Based on tariff bands
    // Define tariffs based on consumption bands
    const tarifaVerde = 0.62;  // R$/kWh normal hours
    const tarifaAmarela = 0.72; // R$/kWh intermediate hours
    const tarifaVermelha = 0.85; // R$/kWh peak hours
    
    // Calculate consumption by tariff band
    const verdeHoursConsumption = totalMonthlyConsumption * 0.65; // 65% during green hours
    const amarelaHoursConsumption = totalMonthlyConsumption * 0.2; // 20% during yellow hours
    const vermelhaHoursConsumption = totalMonthlyConsumption * 0.15; // 15% during red hours
    
    const estimatedMonthlyCost = 
      (verdeHoursConsumption * tarifaVerde) + 
      (amarelaHoursConsumption * tarifaAmarela) + 
      (vermelhaHoursConsumption * tarifaVermelha);
    
    // 3. EFICIÊNCIA ENERGÉTICA: Calculate based on optimal vs. actual consumption
    // Define benchmark optimal consumption values based on device types
    const optimalConsumptionByType: {[key: string]: number} = {
      tv: 30,
      refrigerator: 45,
      ac: 120, 
      computer: 20,
      other: 15
    };
    
    // Calculate optimal consumption for current device mix
    const optimalTotalConsumption = devices.reduce((sum, device) => {
      const deviceType = device.type as keyof typeof optimalConsumptionByType;
      const optimalForType = optimalConsumptionByType[deviceType] || optimalConsumptionByType.other;
      return sum + optimalForType;
    }, 0);
    
    // Efficiency formula: (optimal / actual) × 100, capped at 100%
    const rawEfficiency = Math.min(100, (optimalTotalConsumption / totalMonthlyConsumption) * 100);
    
    // Adjust efficiency based on usage patterns
    let efficiencyScore = rawEfficiency;
    
    // Decrease score for each device left on but inactive
    const inactiveButOnDevices = devices.filter(d => d.powerState && d.lastActivity !== 'Agora');
    efficiencyScore -= inactiveButOnDevices.length * 5;
    
    // Decrease for high consumption devices running in off-peak hours
    const highConsumptionDevices = devices.filter(d => d.consumption > 100 && d.powerState);
    const isOffPeakHour = currentHour >= 22 || currentHour <= 6;
    if (isOffPeakHour && highConsumptionDevices.length > 0) {
      efficiencyScore -= highConsumptionDevices.length * 3;
    }
    
    // Ensure efficiency is between 0 and 100
    const efficiency = Math.max(0, Math.min(100, efficiencyScore));

    return {
      dailyConsumption: parseFloat(dailyConsumption.toFixed(2)),
      peakConsumption: parseFloat(peakHoursConsumption.toFixed(2)),
      averageConsumption: parseFloat(averageConsumption.toFixed(2)),
      estimatedMonthlyCost: parseFloat(estimatedMonthlyCost.toFixed(2)),
      efficiency: Math.round(efficiency)
    };
  },

  // Calculate efficiency score based on device usage patterns
  calculateEfficiencyScore(devices: Device[], currentHour: number): number {
    if (!devices || devices.length === 0) {
      return 0;
    }

    // Enhanced efficiency calculation based on device types and power states
    const activeDevices = devices.filter(d => d.powerState);
    const highConsumptionDevices = devices.filter(d => d.consumption > 100);
    const inactiveButOnDevices = activeDevices.filter(d => d.lastActivity !== 'Agora');
    
    // Calculate efficiency score with more parameters (0-100)
    let efficiencyScore = 100;
    
    // Decrease score for each high consumption device
    efficiencyScore -= highConsumptionDevices.length * 5;
    
    // Decrease score for each inactive but on device
    efficiencyScore -= inactiveButOnDevices.length * 10;
    
    // Adjust based on ratio of active to total devices
    const activeRatio = activeDevices.length / devices.length;
    if (activeRatio > 0.7) efficiencyScore -= 10;
    
    // Adjust based on time of day
    const isOffHours = currentHour >= 23 || currentHour <= 5;
    if (isOffHours && activeDevices.length > 2) {
      efficiencyScore -= 15;
    }
    
    // Adjust based on device mix (AC tends to consume a lot)
    const acDevices = devices.filter(d => d.type === 'ac' && d.powerState);
    if (acDevices.length > 0) {
      efficiencyScore -= acDevices.length * 8;
    }
    
    // Ensure score is between 0 and 100
    return Math.max(0, Math.min(100, efficiencyScore));
  }
};
