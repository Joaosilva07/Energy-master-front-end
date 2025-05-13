
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
  const [lastAnalysisTime, setLastAnalysisTime] = useState(new Date());

  // Run analysis when devices change or after time interval
  useEffect(() => {
    if (!isLoading && devices) {
      setIsAnalyzing(true);
      
      // Process data with a slight delay to simulate AI processing
      const timer = setTimeout(() => {
        // Run enhanced analysis with simulated dataset integration
        // Pass local date/time to ensure calculations are based on user's timezone
        const localDate = new Date();
        const analysis = energyAnalysisService.analyzeConsumption(devices, localDate);
        setAnalysisData(analysis);
        
        // Generate chart data with dataset-enhanced patterns and local time
        setHourlyData(energyAnalysisService.generateHourlyData(devices, localDate));
        setDailyData(energyAnalysisService.generateDailyData(devices, localDate));
        setMonthlyData(energyAnalysisService.generateMonthlyData(devices, localDate));
        
        setIsAnalyzing(false);
        setLastAnalysisTime(new Date());
      }, 600); // Slight processing delay for UX
      
      return () => clearTimeout(timer);
    }
  }, [devices, isLoading]);

  // Set up periodic refresh (every 5 minutes)
  useEffect(() => {
    const refreshInterval = setInterval(() => {
      if (devices && devices.length > 0) {
        setIsAnalyzing(true);
        
        // Re-run analysis with current local time
        const localDate = new Date();
        const analysis = energyAnalysisService.analyzeConsumption(devices, localDate);
        setAnalysisData(analysis);
        
        setHourlyData(energyAnalysisService.generateHourlyData(devices, localDate));
        setDailyData(energyAnalysisService.generateDailyData(devices, localDate));
        setMonthlyData(energyAnalysisService.generateMonthlyData(devices, localDate));
        
        setIsAnalyzing(false);
        setLastAnalysisTime(new Date());
      }
    }, 5 * 60 * 1000); // 5 minutes
    
    return () => clearInterval(refreshInterval);
  }, [devices]);

  return {
    analysisData,
    hourlyData,
    dailyData,
    monthlyData,
    isAnalyzing,
    lastAnalysisTime
  };
};
