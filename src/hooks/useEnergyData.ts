
import { useState, useEffect } from 'react';
import { Device } from '@/types/device.types';
import { energyAnalysisService, EnergyAnalysis } from '@/services/energyAnalysisService';
import { HourlyDataPoint, DailyDataPoint, MonthlyDataPoint } from '@/types/energyAnalysis.types';
import { useToast } from '@/components/ui/use-toast';

export const useEnergyData = (devices: Device[], isLoading: boolean) => {
  const [analysisData, setAnalysisData] = useState<EnergyAnalysis | null>(null);
  const [hourlyData, setHourlyData] = useState<HourlyDataPoint[]>([]);
  const [dailyData, setDailyData] = useState<DailyDataPoint[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyDataPoint[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [lastAnalysisTime, setLastAnalysisTime] = useState(new Date());
  const { toast } = useToast();

  // Function to perform energy analysis
  const performAnalysis = () => {
    console.log("Realizando análise de energia com", devices?.length || 0, "dispositivos");
    
    if (!devices || devices.length === 0) {
      setAnalysisData(null);
      setHourlyData([]);
      setDailyData([]);
      setMonthlyData([]);
      setIsAnalyzing(false);
      return;
    }

    setIsAnalyzing(true);
    
    // Run enhanced analysis with current local time - with no artificial delay
    const localDate = new Date();
    
    try {
      // Generate chart data immediately without delays
      const analysis = energyAnalysisService.analyzeConsumption(devices, localDate);
      setAnalysisData(analysis);
      
      setHourlyData(energyAnalysisService.generateHourlyData(devices, localDate));
      setDailyData(energyAnalysisService.generateDailyData(devices, localDate));
      setMonthlyData(energyAnalysisService.generateMonthlyData(devices, localDate));
      
      console.log("Análise de energia concluída com sucesso");
    } catch (error) {
      console.error("Erro ao analisar dados de energia:", error);
      toast({
        title: "Erro na análise",
        description: "Ocorreu um problema ao analisar seus dados de consumo",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
      setLastAnalysisTime(new Date());
    }
  };

  // Manually trigger analysis refresh
  const refreshAnalysis = () => {
    console.log("Atualizando análise de energia manualmente");
    performAnalysis();
    toast({
      title: "Análise atualizada",
      description: "Os dados de consumo foram atualizados",
    });
  };

  // Run analysis when devices change
  useEffect(() => {
    if (!isLoading) {
      console.log("Dispositivos mudaram, atualizando análise...");
      // Process data immediately without artificial delay
      performAnalysis();
    }
  }, [devices, isLoading]);

  // Add loading timeout to prevent endless loading
  useEffect(() => {
    if (isAnalyzing) {
      // Set a timeout for loading state to prevent it from getting stuck
      const timeoutId = setTimeout(() => {
        if (isAnalyzing) {
          console.log("Timeout de análise atingido, finalizando estado de loading");
          setIsAnalyzing(false);
          toast({
            title: "Análise concluída",
            description: "O processamento de dados demorou mais que o esperado",
            variant: "default",
          });
        }
      }, 3000); // 3 seconds max loading time
      
      return () => clearTimeout(timeoutId);
    }
  }, [isAnalyzing]);

  // Set up periodic refresh (every 10 minutes instead of 5 for less processing overhead)
  useEffect(() => {
    console.log("Configurando refresh periódico da análise de energia");
    const refreshInterval = setInterval(() => {
      console.log("Refresh automático da análise de energia");
      performAnalysis();
    }, 10 * 60 * 1000); // Changed from 5 to 10 minutes
    
    return () => {
      console.log("Limpando intervalo de refresh da análise");
      clearInterval(refreshInterval);
    };
  }, [devices]);

  return {
    analysisData,
    hourlyData,
    dailyData,
    monthlyData,
    isAnalyzing,
    lastAnalysisTime,
    refreshAnalysis
  };
};
