
import { Device } from '@/types/device.types';
import { OptimizationPlan, OptimizationDeviceAction } from '@/types/energyAnalysis.types';
import { v4 as uuidv4 } from '@/lib/utils';

export const energyOptimizerService = {
  /**
   * Gera planos de otimização de energia baseados em dados de dispositivos
   * Esta é a estrutura básica que será expandida com ML quando integrada com IA real
   */
  generateOptimizationPlans(devices: Device[]): OptimizationPlan[] {
    if (!devices || devices.length === 0) {
      return [];
    }

    const plans: OptimizationPlan[] = [];
    
    // Plano: Desligar dispositivos ociosos
    const idleDevices = devices.filter(d => 
      d.powerState && 
      d.lastActivity !== 'Agora' && 
      d.consumption > 30
    );
    
    if (idleDevices.length > 0) {
      const deviceActions: OptimizationDeviceAction[] = idleDevices.map(device => ({
        deviceId: device.id,
        deviceName: device.name,
        action: 'turn_off',
        parameters: {},
        estimatedImpact: device.consumption
      }));
      
      const totalSavings = deviceActions.reduce((sum, action) => sum + action.estimatedImpact, 0);
      
      plans.push({
        id: uuidv4(),
        name: 'Economia Imediata: Desligar Dispositivos Ociosos',
        description: 'Desliga dispositivos que estão ligados sem uso ativo',
        estimatedSavings: totalSavings,
        devices: deviceActions,
        scheduleType: 'immediate'
      });
    }
    
    // Plano: Otimização noturna
    const highNightConsumers = devices.filter(d => 
      d.powerState && 
      ['tv', 'entertainment', 'computer'].includes(d.type)
    );
    
    if (highNightConsumers.length > 0) {
      const deviceActions: OptimizationDeviceAction[] = highNightConsumers.map(device => ({
        deviceId: device.id,
        deviceName: device.name,
        action: 'turn_off',
        parameters: {},
        estimatedImpact: device.consumption * 0.33 // Estimativa de economia noturna
      }));
      
      const totalSavings = deviceActions.reduce((sum, action) => sum + action.estimatedImpact, 0);
      
      plans.push({
        id: uuidv4(),
        name: 'Economia Noturna',
        description: 'Desliga dispositivos de entretenimento automaticamente durante a noite',
        estimatedSavings: totalSavings,
        devices: deviceActions,
        scheduleType: 'recurring',
        scheduleConfig: {
          startTime: '23:00',
          endTime: '06:00',
          daysOfWeek: [0, 1, 2, 3, 4, 5, 6], // Todos os dias
          active: false // Precisa ser ativado pelo usuário
        }
      });
    }
    
    // Plano: Redução de consumo em horário de pico
    const highConsumptionDevices = devices.filter(d => 
      d.powerState && 
      d.consumption > 100
    );
    
    if (highConsumptionDevices.length > 0) {
      const deviceActions: OptimizationDeviceAction[] = highConsumptionDevices.map(device => ({
        deviceId: device.id,
        deviceName: device.name,
        action: 'reduce_power',
        parameters: {
          targetReduction: 0.2 // Redução de 20% no consumo
        },
        estimatedImpact: device.consumption * 0.2
      }));
      
      const totalSavings = deviceActions.reduce((sum, action) => sum + action.estimatedImpact, 0);
      
      plans.push({
        id: uuidv4(),
        name: 'Economia em Horário de Pico',
        description: 'Reduz o consumo de dispositivos de alto consumo durante horários de pico',
        estimatedSavings: totalSavings,
        devices: deviceActions,
        scheduleType: 'recurring',
        scheduleConfig: {
          startTime: '18:00',
          endTime: '21:00',
          daysOfWeek: [1, 2, 3, 4, 5], // Segunda a sexta
          active: false
        }
      });
    }
    
    return plans;
  },

  /**
   * Executa um plano de otimização
   * Na implementação final com integração IoT, isso controlaria realmente os dispositivos
   */
  executePlan(plan: OptimizationPlan, devices: Device[]): { 
    success: boolean, 
    modifiedDevices: Device[], 
    message: string 
  } {
    if (!plan || !devices || devices.length === 0) {
      return { 
        success: false, 
        modifiedDevices: [], 
        message: 'Plano ou dispositivos inválidos' 
      };
    }
    
    // Aqui apenas simulamos a execução do plano
    // Na implementação real, integraria com controle real dos dispositivos
    const modifiedDevices = [...devices];
    
    // Aplicamos as ações aos dispositivos
    plan.devices.forEach(action => {
      const deviceIndex = modifiedDevices.findIndex(d => d.id === action.deviceId);
      if (deviceIndex === -1) return;
      
      switch (action.action) {
        case 'turn_off':
          modifiedDevices[deviceIndex] = {
            ...modifiedDevices[deviceIndex],
            powerState: false,
            status: 'offline'
          };
          break;
          
        case 'reduce_power':
          // Simulação de redução de consumo 
          // (na implementação real, dependeria da integração IoT)
          const reduction = action.parameters?.targetReduction || 0.1;
          modifiedDevices[deviceIndex] = {
            ...modifiedDevices[deviceIndex],
            consumption: modifiedDevices[deviceIndex].consumption * (1 - reduction)
          };
          break;
          
        default:
          // Outros tipos de ação seriam implementados aqui
          break;
      }
    });
    
    return {
      success: true,
      modifiedDevices,
      message: `Plano "${plan.name}" executado com sucesso`
    };
  }
};
