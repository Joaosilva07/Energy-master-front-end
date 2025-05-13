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

// AI Energy Analysis Service
export const energyAnalysisService = {
  // Analyze device data and return consumption metrics and insights
  analyzeConsumption(devices: Device[]): EnergyAnalysis {
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

    // Calculate basic metrics
    const totalMonthlyConsumption = devices.reduce((sum, device) => sum + device.consumption, 0);
    const dailyConsumption = totalMonthlyConsumption / 30;
    const averageConsumption = dailyConsumption / 24; // kWh/h
    
    // AI-simulated calculations
    const peakConsumption = averageConsumption * 2.1; // Simulate peak consumption
    const estimatedMonthlyCost = totalMonthlyConsumption * 0.7; // R$ 0.70 per kWh
    
    // Calculate efficiency based on device types and power states
    const activeDevices = devices.filter(d => d.powerState);
    const highConsumptionDevices = devices.filter(d => d.consumption > 100);
    const inactiveButOnDevices = activeDevices.filter(d => d.lastActivity !== 'Agora');
    
    // Efficiency score (0-100)
    let efficiencyScore = 100;
    
    if (devices.length > 0) {
      // Decrease score for each high consumption device
      efficiencyScore -= highConsumptionDevices.length * 5;
      
      // Decrease score for each inactive but on device
      efficiencyScore -= inactiveButOnDevices.length * 10;
      
      // Adjust based on ratio of active to total devices
      const activeRatio = activeDevices.length / devices.length;
      if (activeRatio > 0.7) {
        efficiencyScore -= 10;
      }
    }
    
    // Ensure score is between 0 and 100
    efficiencyScore = Math.max(0, Math.min(100, efficiencyScore));

    // Generate insights based on the data
    const insights: ConsumptionInsight[] = [];
    
    // Generate different insights based on device analysis
    if (highConsumptionDevices.length > 0) {
      insights.push({
        type: 'warning',
        title: 'Alto Consumo Detectado',
        description: `${highConsumptionDevices[0].name} está consumindo acima da média.`,
        deviceId: highConsumptionDevices[0].id
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
    
    if (efficiencyScore > 80) {
      insights.push({
        type: 'success',
        title: 'Boa Eficiência Energética',
        description: 'Seu consumo está otimizado! Continue assim.'
      });
    }

    // Generate AI recommendations
    const recommendedActions: string[] = [];
    
    if (highConsumptionDevices.length > 0) {
      recommendedActions.push(`Verifique a eficiência de ${highConsumptionDevices[0].name} ou considere substituí-lo por um modelo mais econômico.`);
    }
    
    if (inactiveButOnDevices.length > 0) {
      recommendedActions.push(`Configure ${inactiveButOnDevices[0].name} para desligar automaticamente quando não estiver em uso.`);
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

  // Generate hourly consumption data for charts
  generateHourlyData(devices: Device[]) {
    if (!devices || devices.length === 0) return [];
    
    const baseConsumption = this.analyzeConsumption(devices).metrics.averageConsumption;
    
    return Array.from({ length: 24 }, (_, i) => {
      // Create a more realistic consumption pattern throughout the day
      let hourFactor = 1;
      
      // Early morning (lowest)
      if (i >= 1 && i <= 5) hourFactor = 0.4;
      // Morning peak
      else if (i >= 7 && i <= 9) hourFactor = 1.7;
      // Midday moderate
      else if (i >= 10 && i <= 15) hourFactor = 1.2;
      // Evening peak (highest)
      else if (i >= 18 && i <= 21) hourFactor = 1.9;
      // Late night decline
      else if (i >= 22) hourFactor = 0.8;
      
      // Add some randomness for realism
      const randomVariation = 0.9 + Math.random() * 0.2;
      
      return {
        hour: `${String(i).padStart(2, '0')}:00`,
        consumption: parseFloat((baseConsumption * hourFactor * randomVariation).toFixed(2)),
      };
    });
  },

  // Generate daily consumption data for charts
  generateDailyData(devices: Device[]) {
    if (!devices || devices.length === 0) return [];
    
    const baseConsumption = this.analyzeConsumption(devices).metrics.dailyConsumption;
    const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    
    return daysOfWeek.map((day, i) => {
      // Weekend vs weekday pattern
      let dayFactor = 1;
      
      // Weekends higher consumption (people at home)
      if (i === 0 || i === 6) dayFactor = 1.3;
      // Midweek lower 
      else if (i === 2 || i === 3) dayFactor = 0.9;
      // Other days normal
      else dayFactor = 1.1;
      
      // Add some randomness
      const randomVariation = 0.9 + Math.random() * 0.2;
      
      return {
        day,
        consumption: parseFloat((baseConsumption * dayFactor * randomVariation).toFixed(2)),
      };
    });
  },

  // Generate monthly consumption data for charts
  generateMonthlyData(devices: Device[]) {
    if (!devices || devices.length === 0) return [];
    
    const totalConsumption = devices.reduce((sum, device) => sum + device.consumption, 0);
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    
    return months.map((month, i) => {
      // Seasonal patterns
      let monthFactor = 1;
      
      // Summer months (higher AC usage)
      if (i >= 0 && i <= 2) monthFactor = 1.3;
      // Winter months (more heating)
      else if (i >= 5 && i <= 7) monthFactor = 1.2;
      // Spring/Fall (moderate)
      else monthFactor = 0.9;
      
      // Simulating a trend of improvement over the year (energy saving efforts)
      const yearProgress = 1 - (i * 0.01);
      
      // Add some randomness
      const randomVariation = 0.95 + Math.random() * 0.1;
      
      return {
        month,
        consumption: parseFloat((totalConsumption * monthFactor * yearProgress * randomVariation / 12).toFixed(2)),
      };
    });
  }
};
