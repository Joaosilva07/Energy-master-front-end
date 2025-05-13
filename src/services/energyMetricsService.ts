
import { Device } from '@/types/device.types';
import { ConsumptionMetrics } from '@/types/energyAnalysis.types';
import { simulatedDataset } from '@/data/energyConsumptionDataset';

export const energyMetricsService = {
  // Calculate energy consumption metrics
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

    // Enhanced AI calculation using simulated dataset patterns
    const totalMonthlyConsumption = devices.reduce((sum, device) => sum + device.consumption, 0);
    const deviceFactor = Math.min(1.2, Math.max(0.8, devices.length / 10)); // Adjust based on number of devices
    
    // More accurate daily consumption based on device types
    const dailyConsumption = (totalMonthlyConsumption / 30) * deviceFactor;
    
    // Calculate average hourly consumption with dataset patterns
    const baseHourlyConsumption = dailyConsumption / 24;
    const currentHour = localDate.getHours();
    const hourlyPattern = simulatedDataset.hourlyPatterns[currentHour];
    const averageConsumption = baseHourlyConsumption * hourlyPattern;
    
    // Calculate peak consumption using dataset patterns
    const peakHourPattern = Math.max(...simulatedDataset.hourlyPatterns);
    const peakConsumption = baseHourlyConsumption * peakHourPattern * 1.1; // Add 10% for safety margin
    
    // Enhanced cost calculation with variable tariff
    const peakHoursTariff = 0.85; // R$ per kWh during peak hours
    const offPeakTariff = 0.62; // R$ per kWh during off-peak
    
    const peakHoursConsumption = totalMonthlyConsumption * 0.35; // 35% consumed during peak hours
    const offPeakConsumption = totalMonthlyConsumption * 0.65; // 65% during off-peak
    
    const estimatedMonthlyCost = (peakHoursConsumption * peakHoursTariff) + 
                              (offPeakConsumption * offPeakTariff);
    
    // Calculate efficiency score
    const efficiencyScore = this.calculateEfficiencyScore(devices, currentHour);

    return {
      dailyConsumption: parseFloat(dailyConsumption.toFixed(2)),
      peakConsumption: parseFloat(peakConsumption.toFixed(2)),
      averageConsumption: parseFloat(averageConsumption.toFixed(2)),
      estimatedMonthlyCost: parseFloat(estimatedMonthlyCost.toFixed(2)),
      efficiency: Math.round(efficiencyScore)
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
