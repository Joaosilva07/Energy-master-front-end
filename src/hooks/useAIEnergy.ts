
import { useState, useEffect, useCallback } from 'react';
import { useDevices } from './useDevices';
import { smartAlertService } from '@/services/smartAlertService';
import { energyOptimizerService } from '@/services/energyOptimizerService';
import { 
  ConsumptionInsight, 
  OptimizationPlan,
  OptimizationDeviceAction
} from '@/types/energyAnalysis.types';
import { useToast } from '@/hooks/use-toast';

export const useAIEnergy = () => {
  const { devices, updateDeviceStatus } = useDevices();
  const [insights, setInsights] = useState<ConsumptionInsight[]>([]);
  const [deviceFailureAlerts, setDeviceFailureAlerts] = useState<ConsumptionInsight[]>([]);
  const [optimizationPlans, setOptimizationPlans] = useState<OptimizationPlan[]>([]);
  const [isGeneratingInsights, setIsGeneratingInsights] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const { toast } = useToast();

  // Gera insights inteligentes baseados nos dispositivos
  const generateInsights = useCallback(() => {
    if (!devices || devices.length === 0) return;
    
    setIsGeneratingInsights(true);
    
    try {
      // Gera alertas inteligentes
      const smartAlerts = smartAlertService.generateSmartAlerts(devices);
      
      // Gera alertas de falhas potenciais
      const failureAlerts = smartAlertService.detectPotentialFailures(devices);
      
      setInsights(smartAlerts);
      setDeviceFailureAlerts(failureAlerts);
      
      console.log('Insights gerados:', { smartAlerts, failureAlerts });
    } catch (error) {
      console.error('Erro ao gerar insights:', error);
      toast({
        title: "Erro ao analisar dispositivos",
        description: "Não foi possível gerar insights inteligentes",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingInsights(false);
    }
  }, [devices, toast]);

  // Gera planos de otimização
  const generateOptimizationPlans = useCallback(() => {
    if (!devices || devices.length === 0) return;
    
    setIsOptimizing(true);
    
    try {
      const plans = energyOptimizerService.generateOptimizationPlans(devices);
      setOptimizationPlans(plans);
      
      console.log('Planos de otimização gerados:', plans);
    } catch (error) {
      console.error('Erro ao gerar planos de otimização:', error);
      toast({
        title: "Erro ao criar planos",
        description: "Não foi possível gerar planos de otimização",
        variant: "destructive",
      });
    } finally {
      setIsOptimizing(false);
    }
  }, [devices, toast]);

  // Executa um plano de otimização
  const executePlan = useCallback((planId: string) => {
    const plan = optimizationPlans.find(p => p.id === planId);
    if (!plan) {
      toast({
        title: "Plano não encontrado",
        description: "O plano de otimização solicitado não existe",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const result = energyOptimizerService.executePlan(plan, devices);
      
      if (result.success) {
        // Só atualiza dispositivos se houve mudanças reais (planos imediatos)
        if (plan.scheduleType === 'immediate') {
          result.modifiedDevices.forEach(device => {
            const originalDevice = devices.find(d => d.id === device.id);
            if (originalDevice && device.powerState !== originalDevice.powerState) {
              updateDeviceStatus(device.id, device.powerState);
            }
          });
        } else {
          // Para planos agendados, atualiza o plano no estado local
          setOptimizationPlans(prevPlans => 
            prevPlans.map(p => 
              p.id === planId 
                ? { ...p, scheduleConfig: { ...p.scheduleConfig, active: true } }
                : p
            )
          );
        }
        
        toast({
          title: "Plano executado",
          description: result.message,
          variant: "default",
        });
      } else {
        toast({
          title: "Falha na execução",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Erro ao executar plano:', error);
      toast({
        title: "Erro na otimização",
        description: "Ocorreu um erro ao executar o plano de otimização",
        variant: "destructive",
      });
    }
  }, [optimizationPlans, devices, updateDeviceStatus, toast]);

  // Executa uma ação recomendada
  const executeInsightAction = useCallback((insightId: string, actionId: string) => {
    // Encontra o insight e a ação correspondentes
    const insight = [...insights, ...deviceFailureAlerts].find(i => 
      i.deviceId === insightId || i.title.includes(insightId)
    );
    
    if (!insight) {
      toast({
        title: "Alerta não encontrado",
        description: "O alerta solicitado não existe",
        variant: "destructive",
      });
      return;
    }
    
    const action = insight.actions?.find(a => a.actionId === actionId);
    
    if (!action) {
      toast({
        title: "Ação não encontrada",
        description: "A ação solicitada não existe para este alerta",
        variant: "destructive",
      });
      return;
    }
    
    // Simulação de execução da ação
    // Na implementação real, isso executaria ações concretas em dispositivos ou sistemas
    
    if (actionId === 'turn_off' && insight.deviceId) {
      // Exemplo: Se a ação for desligar, realmente desligamos o dispositivo
      updateDeviceStatus(insight.deviceId, false);
      
      toast({
        title: "Ação executada",
        description: `${action.title} para ${insight.title}`,
      });
    } else {
      // Para outras ações, apenas notificamos o usuário
      toast({
        title: action.title,
        description: action.description,
      });
    }
  }, [insights, deviceFailureAlerts, updateDeviceStatus, toast]);

  // Atualiza insights automaticamente quando os dispositivos mudam
  useEffect(() => {
    if (devices && devices.length > 0) {
      generateInsights();
      generateOptimizationPlans();
    }
  }, [devices, generateInsights, generateOptimizationPlans]);

  return {
    // Alertas inteligentes
    insights,
    deviceFailureAlerts,
    isGeneratingInsights,
    generateInsights,
    executeInsightAction,
    
    // Otimização de energia
    optimizationPlans,
    isOptimizing,
    generateOptimizationPlans,
    executePlan,
    
    // Estado combinado para carregamento
    isLoading: isGeneratingInsights || isOptimizing
  };
};
