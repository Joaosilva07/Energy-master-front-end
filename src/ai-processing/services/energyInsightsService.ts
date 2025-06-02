
import { Device } from '@/types/device.types';
import { ConsumptionInsight } from '@/types/energyAnalysis.types';

export const energyInsightsService = {
  // Generate simplified placeholder insights based on device data
  generateInsights(devices: Device[], localDate: Date = new Date()): ConsumptionInsight[] {
    if (!devices || devices.length === 0) {
      return [];
    }

    const insights: ConsumptionInsight[] = [];
    
    // Basic high consumption device detection
    const highConsumptionDevices = devices.filter(d => d.consumption > 100);
    if (highConsumptionDevices.length > 0) {
      insights.push({
        type: 'warning',
        title: 'Alto Consumo Detectado',
        description: `${highConsumptionDevices[0].name} está consumindo acima da média.`,
        deviceId: highConsumptionDevices[0].id,
        confidence: 0.8,
        source: 'rule-based',
        actions: [
          {
            actionId: 'check_device',
            title: 'Verificar Dispositivo',
            description: 'Inspecione o dispositivo para garantir que está funcionando corretamente',
            difficulty: 'easy'
          }
        ]
      });
    }
    
    // Basic inactive but on device detection
    const activeDevices = devices.filter(d => d.powerState);
    const inactiveButOnDevices = activeDevices.filter(d => d.lastActivity !== 'Agora');
    if (inactiveButOnDevices.length > 0) {
      insights.push({
        type: 'info',
        title: 'Dispositivo Ligado sem Uso',
        description: `${inactiveButOnDevices[0].name} está ligado sem atividade recente.`,
        deviceId: inactiveButOnDevices[0].id,
        confidence: 0.9,
        source: 'rule-based',
        actions: [
          {
            actionId: 'turn_off',
            title: 'Desligar',
            description: 'Desligue o dispositivo para economizar energia',
            automated: true,
            difficulty: 'easy'
          }
        ]
      });
    }
    
    // Add a basic success insight
    if (devices.length > 0) {
      insights.push({
        type: 'success',
        title: 'Monitoramento Ativo',
        description: 'Seus dispositivos estão sendo monitorados corretamente.',
        confidence: 1.0,
        source: 'rule-based'
      });
    }

    return insights;
  },

  // Generate simplified recommendations
  generateRecommendations(devices: Device[], localDate: Date = new Date()): string[] {
    if (!devices || devices.length === 0) {
      return [];
    }

    const recommendations: string[] = [];
    
    // Add basic recommendations that don't require complex calculations
    recommendations.push('Programe seus dispositivos para desligar durante a madrugada.');
    recommendations.push('Evite o uso simultâneo de múltiplos dispositivos de alto consumo.');
    
    // Device-specific basic recommendations
    const acDevices = devices.filter(d => d.type === 'ac' && d.powerState);
    if (acDevices.length > 0) {
      recommendations.push('Mantenha a temperatura do ar-condicionado em 23°C para equilibrar conforto e economia.');
    }
    
    // Add placeholder for future AI-based recommendations
    recommendations.push('Monitore seus padrões de consumo para identificar oportunidades de economia.');

    return recommendations;
  }
};
