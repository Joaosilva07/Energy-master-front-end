
import React from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { useDevices } from '@/hooks/useDevices';
import { useEnergyAnalysis } from '@/hooks/useEnergyAnalysis';

// Imported components
import ConsumptionEmptyState from '@/components/consumption/ConsumptionEmptyState';
import ConsumptionMetrics from '@/components/consumption/ConsumptionMetrics';
import HourlyConsumptionChart from '@/components/consumption/HourlyConsumptionChart';
import DeviceDistribution from '@/components/consumption/DeviceDistribution';
import AIRecommendations from '@/components/consumption/AIRecommendations';
import EnergyInsights from '@/components/consumption/EnergyInsights';
import ConsumptionLoading from '@/components/consumption/ConsumptionLoading';

const Consumo = () => {
  const { devices, isLoading } = useDevices();
  const { isAnalyzing } = useEnergyAnalysis();
  
  // Check if there are registered devices
  const hasDevices = devices.length > 0;

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Consumo de Energia</h1>
            <p className="text-muted-foreground">Análise detalhada do seu consumo energético</p>
          </div>

          {/* Empty state when no devices are registered */}
          {!isLoading && !hasDevices && <ConsumptionEmptyState />}

          {/* Loading state */}
          {(isLoading || isAnalyzing) && <ConsumptionLoading />}

          {/* Main content when devices are available and data is loaded */}
          {!isLoading && !isAnalyzing && hasDevices && (
            <>
              {/* Metrics cards */}
              <ConsumptionMetrics />
              
              {/* Hourly consumption chart */}
              <HourlyConsumptionChart />

              {/* Device distribution and AI recommendations */}
              <div className="grid gap-6 md:grid-cols-2">
                <DeviceDistribution />
                <AIRecommendations />
              </div>

              {/* Energy insights (alerts) */}
              <EnergyInsights />
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Consumo;
