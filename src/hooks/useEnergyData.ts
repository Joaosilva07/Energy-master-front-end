
import { useState, useEffect, useCallback, useRef } from 'react';
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
  const refreshIntervalRef = useRef<number | null>(null);

  // Function to perform energy analysis - optimized with useCallback
  const performAnalysis = useCallback(() => {
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
    
    // Run enhanced analysis with current local time
    const localDate = new Date();
    
    try {
      // Generate analysis data
      const analysis = energyAnalysisService.analyzeConsumption(devices, localDate);
      setAnalysisData(analysis);
      
      // Generate chart data - use cached data when possible
      setHourlyData(prev => {
        const newData = energyAnalysisService.generateHourlyData(devices, localDate);
        // Only update if data has changed significantly
        const hasChanged = !prev.length || 
          prev.some((item, i) => Math.abs(item.consumption - (newData[i]?.consumption || 0)) > 0.5);
        return hasChanged ? newData : prev;
      });
      
      setDailyData(prev => {
        const newData = energyAnalysisService.generateDailyData(devices, localDate);
        const hasChanged = !prev.length || 
          prev.some((item, i) => Math.abs(item.consumption - (newData[i]?.consumption || 0)) > 0.5);
        return hasChanged ? newData : prev;
      });
      
      setMonthlyData(prev => {
        const newData = energyAnalysisService.generateMonthlyData(devices, localDate);
        const hasChanged = !prev.length || 
          prev.some((item, i) => Math.abs(item.consumption - (newData[i]?.consumption || 0)) > 0.5);
        return hasChanged ? newData : prev;
      });
      
      console.log("Análise de energia concluída com sucesso");
    } catch (error) {
      console.error("Erro ao analisar dados de energia:", error);
      toast({
        title: "Erro na análise",
        description: "Ocorreu um problema ao analisar seus dados de consumo",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsAnalyzing(false);
      setLastAnalysisTime(new Date());
    }
  }, [devices, toast]);

  // Manually trigger analysis refresh
  const refreshAnalysis = useCallback(() => {
    console.log("Atualizando análise de energia manualmente");
    performAnalysis();
    toast({
      title: "Análise atualizada",
      description: "Os dados de consumo foram atualizados",
      duration: 2000,
    });
  }, [performAnalysis, toast]);

  // Run analysis when devices change
  useEffect(() => {
    if (!isLoading && devices.length > 0) {
      console.log("Dispositivos mudaram, atualizando análise...");
      performAnalysis();
    }
  }, [devices, isLoading, performAnalysis]);

  // Add loading timeout to prevent endless loading
  useEffect(() => {
    if (isAnalyzing) {
      // Set a timeout for loading state to prevent it from getting stuck
      const timeoutId = setTimeout(() => {
        if (isAnalyzing) {
          console.log("Timeout de análise atingido, finalizando estado de loading");
          setIsAnalyzing(false);
        }
      }, 2000); // 2 seconds max loading time (reduced from 3 seconds)
      
      return () => clearTimeout(timeoutId);
    }
  }, [isAnalyzing]);

  // Set up periodic refresh (every hour instead of 10 minutes)
  useEffect(() => {
    console.log("Configurando refresh periódico da análise de energia");
    
    // Clear any existing interval
    if (refreshIntervalRef.current) {
      clearInterval(refreshIntervalRef.current);
    }
    
    // Set up a new hourly interval
    refreshIntervalRef.current = window.setInterval(() => {
      console.log("Refresh automático da análise de energia");
      performAnalysis();
    }, 60 * 60 * 1000); // Every hour
    
    return () => {
      console.log("Limpando intervalo de refresh da análise");
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, [devices, performAnalysis]);

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
