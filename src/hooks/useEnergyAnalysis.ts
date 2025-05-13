
import { useState, useEffect } from 'react';
import { useDevices } from './useDevices';
import { energyAnalysisService, EnergyAnalysis } from '@/services/energyAnalysisService';

export const useEnergyAnalysis = () => {
  const { devices, isLoading } = useDevices();
  const [analysisData, setAnalysisData] = useState<EnergyAnalysis | null>(null);
  const [hourlyData, setHourlyData] = useState<Array<{hour: string, consumption: number}>>([]);
  const [dailyData, setDailyData] = useState<Array<{day: string, consumption: number}>>([]);
  const [monthlyData, setMonthlyData] = useState<Array<{month: string, consumption: number}>>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  useEffect(() => {
    if (!isLoading && devices) {
      setIsAnalyzing(true);
      
      // Simulate AI processing time (as if we were querying an external dataset)
      const timer = setTimeout(() => {
        // Run enhanced analysis with simulated dataset integration
        const analysis = energyAnalysisService.analyzeConsumption(devices);
        setAnalysisData(analysis);
        
        // Generate chart data with dataset-enhanced patterns
        setHourlyData(energyAnalysisService.generateHourlyData(devices));
        setDailyData(energyAnalysisService.generateDailyData(devices));
        setMonthlyData(energyAnalysisService.generateMonthlyData(devices));
        
        setIsAnalyzing(false);
      }, 800); // Simulate processing delay
      
      return () => clearTimeout(timer);
    }
  }, [devices, isLoading]);

  return {
    analysisData,
    hourlyData,
    dailyData,
    monthlyData,
    isAnalyzing
  };
};
