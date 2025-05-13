
import { useState } from 'react';
import { useDevices } from './useDevices';
import { useEnergyData } from './useEnergyData';
import { EnergyAnalysis } from '@/types/energyAnalysis.types';

export const useEnergyAnalysis = () => {
  const { devices, isLoading } = useDevices();
  const { 
    analysisData,
    hourlyData,
    dailyData,
    monthlyData,
    isAnalyzing,
    lastAnalysisTime,
    refreshAnalysis
  } = useEnergyData(devices, isLoading);

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
