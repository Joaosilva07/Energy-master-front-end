
import { Device } from '@/hooks/useDevices';

// Types for energy analysis
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

// Simulated dataset values based on smart home energy consumption patterns
// This simulates data that would come from a real dataset like Kaggle's smart home energy dataset
const simulatedDataset = {
  // Average consumption patterns by hour (kWh) based on statistical analysis
  hourlyPatterns: [
    0.31, 0.25, 0.22, 0.20, 0.19, 0.23, 
    0.35, 0.58, 0.71, 0.65, 0.60, 0.59, 
    0.58, 0.56, 0.52, 0.54, 0.61, 0.75, 
    0.82, 0.79, 0.71, 0.62, 0.48, 0.38
  ],
  
  // Consumption by day of week (multiplier)
  dayOfWeekFactors: [1.15, 0.95, 0.92, 0.93, 0.96, 1.05, 1.25], // Sun to Sat
  
  // Seasonal variations (multiplier)
  monthlyFactors: [1.21, 1.18, 1.10, 0.96, 0.88, 0.85, 0.87, 0.89, 0.92, 1.03, 1.12, 1.20],
  
  // Device-specific insights derived from dataset analysis
  devicePatterns: {
    ac: { peakFactor: 2.3, offPeakFactor: 0.3, standbyConsumption: 8 },
    refrigerator: { peakFactor: 1.2, offPeakFactor: 0.8, standbyConsumption: 12 },
    tv: { peakFactor: 1.8, offPeakFactor: 0.2, standbyConsumption: 5 },
    computer: { peakFactor: 1.9, offPeakFactor: 0.1, standbyConsumption: 3 },
    lamp: { peakFactor: 1.0, offPeakFactor: 0.0, standbyConsumption: 0 },
    shower: { peakFactor: 2.5, offPeakFactor: 0.0, standbyConsumption: 0 },
    microwave: { peakFactor: 2.2, offPeakFactor: 0.1, standbyConsumption: 2 },
    washer: { peakFactor: 2.0, offPeakFactor: 0.1, standbyConsumption: 3 },
    dryer: { peakFactor: 2.3, offPeakFactor: 0.0, standbyConsumption: 0 },
    iron: { peakFactor: 2.2, offPeakFactor: 0.0, standbyConsumption: 0 },
    dishwasher: { peakFactor: 1.8, offPeakFactor: 0.1, standbyConsumption: 2 },
    waterheater: { peakFactor: 1.9, offPeakFactor: 0.2, standbyConsumption: 5 },
    other: { peakFactor: 1.5, offPeakFactor: 0.2, standbyConsumption: 4 }
  },
  
  // Energy saving potential by device type (percentage)
  savingPotential: {
    ac: 22,
    refrigerator: 15,
    tv: 18,
    computer: 25,
    lamp: 12,
    shower: 30,
    microwave: 10,
    washer: 20,
    dryer: 25,
    iron: 15,
    dishwasher: 18,
    waterheater: 20,
    other: 10
  }
};

// AI Energy Analysis Service
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
    
    // Enhanced efficiency calculation based on device types and power states
    const activeDevices = devices.filter(d => d.powerState);
    const highConsumptionDevices = devices.filter(d => d.consumption > 100);
    const inactiveButOnDevices = activeDevices.filter(d => d.lastActivity !== 'Agora');
    
    // Calculate efficiency score with more parameters (0-100)
    let efficiencyScore = 100;
    
    if (devices.length > 0) {
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
    }
    
    // Ensure score is between 0 and 100
    efficiencyScore = Math.max(0, Math.min(100, efficiencyScore));

    // Generate enhanced insights based on the data and simulated dataset
    const insights: ConsumptionInsight[] = [];
    
    // Generate different insights based on device analysis
    if (highConsumptionDevices.length > 0) {
      const device = highConsumptionDevices[0];
      const deviceType = device.type || 'other';
      const savingPotential = simulatedDataset.savingPotential[deviceType as keyof typeof simulatedDataset.savingPotential] || 10;
      
      insights.push({
        type: 'warning',
        title: 'Alto Consumo Detectado',
        description: `${device.name} está consumindo acima da média. Potencial de economia: ${savingPotential}%.`,
        deviceId: device.id
      });
    }
    
    if (inactiveButOnDevices.length > 0) {
      insights.push({
        type: 'info',
        title: 'Dispositivo Ligado sem Uso',
        description: `${inactiveButOnDevices[0].name} está ligado sem atividade recente.`,
        deviceId: inactiveButOnDevices[0].id
      });
    }
    
    // Time-based insight using local time
    const peakHours = currentHour >= 18 && currentHour <= 21;
    if (peakHours && activeDevices.length > 3) {
      insights.push({
        type: 'warning',
        title: 'Consumo em Horário de Pico',
        description: 'Você está usando vários dispositivos durante o horário de tarifa elevada.'
      });
    }
    
    if (efficiencyScore > 80) {
      insights.push({
        type: 'success',
        title: 'Boa Eficiência Energética',
        description: 'Seu consumo está otimizado! Continue assim.'
      });
    }

    // Generate enhanced AI recommendations
    const recommendedActions: string[] = [];
    
    if (highConsumptionDevices.length > 0) {
      const device = highConsumptionDevices[0];
      recommendedActions.push(`Verifique a eficiência de ${device.name} ou considere substituí-lo por um modelo mais econômico.`);
    }
    
    if (inactiveButOnDevices.length > 0) {
      recommendedActions.push(`Configure ${inactiveButOnDevices[0].name} para desligar automaticamente quando não estiver em uso.`);
    }
    
    // Time-based recommendations
    if (peakHours) {
      recommendedActions.push('Considere adiar o uso de dispositivos de alta potência para fora do horário de pico (18h-21h).');
    }
    
    // Device-specific recommendations
    const acDevices = devices.filter(d => d.type === 'ac' && d.powerState);
    if (acDevices.length > 0) {
      recommendedActions.push('Mantenha a temperatura do ar-condicionado em 23°C para equilibrar conforto e economia.');
    }
    
    // Add general recommendations
    recommendedActions.push('Programe seus dispositivos para desligar durante a madrugada.');
    recommendedActions.push('Evite o uso simultâneo de múltiplos dispositivos de alto consumo.');

    return {
      metrics: {
        dailyConsumption: parseFloat(dailyConsumption.toFixed(2)),
        peakConsumption: parseFloat(peakConsumption.toFixed(2)),
        averageConsumption: parseFloat(averageConsumption.toFixed(2)),
        estimatedMonthlyCost: parseFloat(estimatedMonthlyCost.toFixed(2)),
        efficiency: Math.round(efficiencyScore)
      },
      insights,
      recommendedActions
    };
  },

  // Generate hourly consumption data for charts with enhanced dataset patterns
  generateHourlyData(devices: Device[], localDate: Date = new Date()) {
    if (!devices || devices.length === 0) return [];
    
    const baseConsumption = this.analyzeConsumption(devices, localDate).metrics.averageConsumption;
    const currentHour = localDate.getHours();
    
    return Array.from({ length: 24 }, (_, i) => {
      // Use dataset hourly patterns for more realistic consumption
      const hourPattern = simulatedDataset.hourlyPatterns[i];
      
      // Add some randomness for realism
      const randomVariation = 0.9 + Math.random() * 0.2;
      
      // Make current hour value the most accurate
      const hourAdjustment = i === currentHour ? 1 : (Math.abs(i - currentHour) < 3 ? 0.98 : 0.95);
      
      return {
        hour: `${String(i).padStart(2, '0')}:00`,
        consumption: parseFloat((baseConsumption * hourPattern * randomVariation * hourAdjustment).toFixed(2)),
      };
    });
  },

  // Generate daily consumption data for charts with enhanced dataset patterns
  generateDailyData(devices: Device[], localDate: Date = new Date()) {
    if (!devices || devices.length === 0) return [];
    
    const baseConsumption = this.analyzeConsumption(devices, localDate).metrics.dailyConsumption;
    const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const currentDayIdx = localDate.getDay(); // 0 = Sunday, 6 = Saturday
    
    return daysOfWeek.map((day, i) => {
      // Use dataset day-of-week patterns for more realistic consumption
      const dayFactor = simulatedDataset.dayOfWeekFactors[i];
      
      // Add some randomness
      const randomVariation = 0.95 + Math.random() * 0.1;
      
      // Today's consumption is actual, others are predictions
      const isToday = i === currentDayIdx;
      const todayFactor = isToday ? 1 : (i > currentDayIdx ? 0.98 : 1.02); // Slight past/future adjustment
      
      return {
        day,
        consumption: parseFloat((baseConsumption * dayFactor * randomVariation * todayFactor).toFixed(2)),
      };
    });
  },

  // Generate monthly consumption data for charts with enhanced dataset patterns
  generateMonthlyData(devices: Device[], localDate: Date = new Date()) {
    if (!devices || devices.length === 0) return [];
    
    const totalConsumption = devices.reduce((sum, device) => sum + device.consumption, 0);
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const currentMonth = localDate.getMonth(); // 0 = January, 11 = December
    
    return months.map((month, i) => {
      // Use dataset monthly patterns for more realistic seasonal consumption
      const monthFactor = simulatedDataset.monthlyFactors[i];
      
      // Current month is actual, others are predictions or historical
      const isCurrentMonth = i === currentMonth;
      const monthAdjustment = isCurrentMonth ? 1 : (i > currentMonth ? 0.97 : 1.03); // Past/future adjustment
      
      // Add some randomness
      const randomVariation = 0.95 + Math.random() * 0.1;
      
      return {
        month,
        consumption: parseFloat((totalConsumption * monthFactor * randomVariation * monthAdjustment / 12).toFixed(2)),
      };
    });
  }
};
