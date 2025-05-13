
import { useState, useEffect } from 'react';
import { Device } from '@/types/device.types';
import { energyAnalysisService, EnergyAnalysis } from '@/services/energyAnalysisService';
import { HourlyDataPoint, DailyDataPoint, MonthlyDataPoint } from '@/types/energyAnalysis.types';

export const useEnergyData = (devices: Device[], isLoading: boolean) => {
  const [analysisData, setAnalysisData] = useState<EnergyAnalysis | null>(null);
  const [hourlyData, setHourlyData] = useState<HourlyDataPoint[]>([]);
  const [dailyData, setDailyData] = useState<DailyDataPoint[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyDataPoint[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [lastAnalysisTime, setLastAnalysisTime] = useState(new Date());

  // Function to perform energy analysis
  const performAnalysis = () => {
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
    const analysis = energyAnalysisService.analyzeConsumption(devices, localDate);
    setAnalysisData(analysis);
    
    // Generate chart data
    setHourlyData(energyAnalysisService.generateHourlyData(devices, localDate));
    setDailyData(energyAnalysisService.generateDailyData(devices, localDate));
    setMonthlyData(energyAnalysisService.generateMonthlyData(devices, localDate));
    
    setIsAnalyzing(false);
    setLastAnalysisTime(new Date());
  };

  // Manually trigger analysis refresh
  const refreshAnalysis = () => {
    performAnalysis();
  };

  // Run analysis when devices change
  useEffect(() => {
    if (!isLoading) {
      // Process data with a slight delay to simulate AI processing
      const timer = setTimeout(performAnalysis, 600);
      return () => clearTimeout(timer);
    }
  }, [devices, isLoading]);

  // Set up periodic refresh (every 5 minutes)
  useEffect(() => {
    const refreshInterval = setInterval(performAnalysis, 5 * 60 * 1000);
    return () => clearInterval(refreshInterval);
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
