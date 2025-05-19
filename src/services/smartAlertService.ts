
import { Device } from '@/types/device.types';
import { ConsumptionInsight, RecommendedAction } from '@/types/energyAnalysis.types';

export const smartAlertService = {
  /**
   * Analisa os dispositivos e gera alertas inteligentes baseados em padrões de consumo
   * Quando integrado com IA, esta função será expandida para usar o modelo treinado
   */
  generateSmartAlerts(devices: Device[]): ConsumptionInsight[] {
    if (!devices || devices.length === 0) {
      return [];
    }

    const insights: ConsumptionInsight[] = [];
    const now = new Date();
    
    // Esta é a estrutura básica que será expandida com IA real
    // Por enquanto, usamos regras básicas como exemplo
    
    // Detecção de consumo anormalmente alto
    const highConsumptionDevices = devices.filter(d => d.consumption > 150);
    if (highConsumptionDevices.length > 0) {
      const device = highConsumptionDevices[0];
      insights.push({
        type: 'warning',
        title: 'Consumo Anormal Detectado',
        description: `${device.name} está consumindo significativamente mais energia que o normal.`,
        deviceId: device.id,
        confidence: 0.85,
        source: 'pattern-detection',
        timestamp: now.toISOString(),
        actions: [
          {
            actionId: 'check_device',
            title: 'Verificar Dispositivo',
            description: 'Inspecione o dispositivo para garantir que está funcionando corretamente',
            difficulty: 'easy'
          },
          {
            actionId: 'schedule_maintenance',
            title: 'Agendar Manutenção',
            description: 'Agende uma manutenção para verificar possíveis problemas',
            difficulty: 'medium'
          }
        ]
      });
    }
    
    // Detecção de dispositivos ociosos
    const idleDevices = devices.filter(d => 
      d.powerState && 
      d.lastActivity !== 'Agora' && 
      d.consumption > 50
    );
    
    if (idleDevices.length > 0) {
      const device = idleDevices[0];
      insights.push({
        type: 'info',
        title: 'Dispositivo em Standby Desnecessário',
        description: `${device.name} está ligado sem uso ativo, consumindo energia desnecessariamente.`,
        deviceId: device.id,
        confidence: 0.92,
        source: 'rule-based',
        timestamp: now.toISOString(),
        actions: [
          {
            actionId: 'turn_off',
            title: 'Desligar Dispositivo',
            description: 'Desligue o dispositivo para economizar energia',
            impact: {
              savingsPercent: 100,
              environmentalImpact: 'Redução na emissão de carbono'
            },
            automated: true,
            difficulty: 'easy'
          }
        ]
      });
    }

    return insights;
  },

  /**
   * Analisa os dispositivos para detectar possíveis falhas
   * Esta função será expandida com análise de ML quando integrada com IA real
   */
  detectPotentialFailures(devices: Device[]): ConsumptionInsight[] {
    if (!devices || devices.length === 0) {
      return [];
    }

    const insights: ConsumptionInsight[] = [];
    const now = new Date();
    
    // Dispositivos com padrões de consumo irregular
    const irregularDevices = devices.filter(d => {
      // Na implementação real, isso usará análise de padrões com ML
      const hasIrregularConsumption = d.consumption > 80 && d.type === 'refrigerator';
      return hasIrregularConsumption;
    });
    
    if (irregularDevices.length > 0) {
      const device = irregularDevices[0];
      insights.push({
        type: 'critical',
        title: 'Possível Falha no Dispositivo',
        description: `${device.name} mostra padrões de consumo anormais que podem indicar falha iminente.`,
        deviceId: device.id,
        confidence: 0.78,
        source: 'ai-prediction',
        timestamp: now.toISOString(),
        actions: [
          {
            actionId: 'immediate_check',
            title: 'Verificação Imediata',
            description: 'Verifique o dispositivo imediatamente para evitar danos maiores',
            difficulty: 'medium'
          },
          {
            actionId: 'contact_support',
            title: 'Contatar Suporte',
            description: 'Entre em contato com o suporte técnico do fabricante',
            difficulty: 'easy'
          }
        ]
      });
    }

    return insights;
  }
};
