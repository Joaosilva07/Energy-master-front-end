
import React from 'react';
import { CalendarDays, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import EnergyCard from '@/components/EnergyCard';
import { useDevices } from '@/hooks/useDevices';
import { useEnergyAnalysis } from '@/hooks/useEnergyAnalysis';

const ConsumptionMetrics = () => {
  const { devices } = useDevices();
  const { analysisData } = useEnergyAnalysis();

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
      <EnergyCard
        title="Consumo Hoje"
        value={analysisData?.metrics.dailyConsumption || 0}
        unit="kWh"
        percentageChange={0}
        icon={<CalendarDays className="h-4 w-4" />}
      />
      <EnergyCard
        title="Pico de Consumo"
        value={analysisData?.metrics.peakConsumption || 0}
        unit="kWh/h"
        percentageChange={0}
        icon={<TrendingUp className="h-4 w-4" />}
      />
      <EnergyCard
        title="Consumo Médio"
        value={analysisData?.metrics.averageConsumption || 0}
        unit="kWh/h"
        percentageChange={0}
        icon={<TrendingDown className="h-4 w-4" />}
      />
      <EnergyCard
        title="Dispositivos Ativos"
        value={devices.filter(d => d.powerState).length}
        percentageChange={0}
        icon={<AlertCircle className="h-4 w-4" />}
      />
    </div>
  );
};

export default ConsumptionMetrics;
