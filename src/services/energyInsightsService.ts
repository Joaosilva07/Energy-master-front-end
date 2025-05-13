
import { Device } from '@/types/device.types';
import { ConsumptionInsight } from '@/types/energyAnalysis.types';
import { simulatedDataset } from '@/data/energyConsumptionDataset';

export const energyInsightsService = {
  // Generate insights based on device usage patterns
  generateInsights(devices: Device[], localDate: Date = new Date()): ConsumptionInsight[] {
    if (!devices || devices.length === 0) {
      return [];
    }

    const insights: ConsumptionInsight[] = [];
    const currentHour = localDate.getHours();
    
    // Generate different insights based on device analysis
    const highConsumptionDevices = devices.filter(d => d.consumption > 100);
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
    
    const activeDevices = devices.filter(d => d.powerState);
    const inactiveButOnDevices = activeDevices.filter(d => d.lastActivity !== 'Agora');
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
    
    // Efficiency insight
    const efficiencyScore = 100 - (highConsumptionDevices.length * 5) - (inactiveButOnDevices.length * 10);
    if (efficiencyScore > 80) {
      insights.push({
        type: 'success',
        title: 'Boa Eficiência Energética',
        description: 'Seu consumo está otimizado! Continue assim.'
      });
    }

    return insights;
  },

  // Generate recommendations based on device usage patterns
  generateRecommendations(devices: Device[], localDate: Date = new Date()): string[] {
    if (!devices || devices.length === 0) {
      return [];
    }

    const recommendations: string[] = [];
    const currentHour = localDate.getHours();
    
    // Generate device-specific recommendations
    const highConsumptionDevices = devices.filter(d => d.consumption > 100);
    if (highConsumptionDevices.length > 0) {
      const device = highConsumptionDevices[0];
      recommendations.push(`Verifique a eficiência de ${device.name} ou considere substituí-lo por um modelo mais econômico.`);
    }
    
    const activeDevices = devices.filter(d => d.powerState);
    const inactiveButOnDevices = activeDevices.filter(d => d.lastActivity !== 'Agora');
    if (inactiveButOnDevices.length > 0) {
      recommendations.push(`Configure ${inactiveButOnDevices[0].name} para desligar automaticamente quando não estiver em uso.`);
    }
    
    // Time-based recommendations
    const peakHours = currentHour >= 18 && currentHour <= 21;
    if (peakHours) {
      recommendations.push('Considere adiar o uso de dispositivos de alta potência para fora do horário de pico (18h-21h).');
    }
    
    // Device-specific recommendations
    const acDevices = devices.filter(d => d.type === 'ac' && d.powerState);
    if (acDevices.length > 0) {
      recommendations.push('Mantenha a temperatura do ar-condicionado em 23°C para equilibrar conforto e economia.');
    }
    
    // Add general recommendations
    recommendations.push('Programe seus dispositivos para desligar durante a madrugada.');
    recommendations.push('Evite o uso simultâneo de múltiplos dispositivos de alto consumo.');

    return recommendations;
  }
};
