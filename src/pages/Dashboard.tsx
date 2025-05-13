
import React, { useEffect, useState } from 'react';
import { LineChart, ActivitySquare, ZapIcon, Gauge } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import EnergyCard from '@/components/EnergyCard';
import EnergyConsumptionChart from '@/components/EnergyConsumptionChart';
import EnergySavingTips from '@/components/EnergySavingTips';
import DeviceMonitoring from '@/components/DeviceMonitoring';
import { useDevices } from '@/hooks/useDevices';
import { useEnergyAnalysis } from '@/hooks/useEnergyAnalysis';

const Dashboard = () => {
  const { devices, isLoading } = useDevices();
  const { analysisData, lastAnalysisTime, isAnalyzing } = useEnergyAnalysis();
  const [hasDevices, setHasDevices] = useState(false);
  
  // Format time for display
  const formattedUpdateTime = lastAnalysisTime ? new Date(lastAnalysisTime).toLocaleDateString('pt-BR', {
    day: '2-digit', 
    month: 'short', 
    hour: '2-digit', 
    minute: '2-digit'
  }) : '';
  
  useEffect(() => {
    setHasDevices(devices && devices.length > 0);
  }, [devices]);

  // Get metrics from analysis data or use defaults
  const metrics = analysisData?.metrics || {
    dailyConsumption: 0,
    peakConsumption: 0,
    averageConsumption: 0,
    estimatedMonthlyCost: 0,
    efficiency: 0
  };
  
  // Calculate total consumption (sum of all device consumptions)
  const totalConsumption = devices.reduce((sum, device) => sum + device.consumption, 0);
  
  // Find active devices count
  const activeDevices = devices.filter(d => d.powerState).length;
  
  // Define percentage change values for metrics
  // In a real app these would come from comparing with previous period data
  const efficiencyChange = analysisData?.metrics ? 5.2 : 0; // Positive change in efficiency
  const consumptionChange = analysisData?.metrics ? -3.5 : 0; // Negative change in consumption (good)
  const peakChange = analysisData?.metrics ? -2.8 : 0; // Negative change in peak consumption (good)
  const costChange = analysisData?.metrics ? -2.1 : 0; // Negative change in cost (good)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Acompanhe o consumo de energia da sua residência</p>
            {hasDevices && !isAnalyzing && (
              <div className="mt-1 text-xs text-muted-foreground text-right">
                Última atualização: {formattedUpdateTime}
              </div>
            )}
          </div>

          {hasDevices ? (
            <>
              {/* Energy Cards with improved metrics */}
              <div className="mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <EnergyCard
                  title="Consumo Total"
                  value={isAnalyzing ? '...' : Math.round(totalConsumption)}
                  unit="kWh"
                  percentageChange={consumptionChange}
                  icon={<LineChart className="h-5 w-5 text-energy-primary" />}
                />
                <EnergyCard
                  title="Consumo em Pico"
                  value={isAnalyzing ? '...' : Math.round(metrics.peakConsumption)}
                  unit="kWh"
                  percentageChange={peakChange}
                  icon={<ActivitySquare className="h-5 w-5 text-amber-500" />}
                />
                <EnergyCard
                  title="Eficiência"
                  value={isAnalyzing ? '...' : Math.round(metrics.efficiency)}
                  unit="%"
                  percentageChange={efficiencyChange}
                  icon={<Gauge className="h-5 w-5 text-green-500" />}
                />
                <EnergyCard
                  title="Custo Estimado"
                  value={isAnalyzing ? '...' : Math.round(metrics.estimatedMonthlyCost)}
                  unit="R$"
                  percentageChange={costChange}
                  icon={<ZapIcon className="h-5 w-5 text-blue-500" />}
                />
              </div>

              {/* Main Content */}
              <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-2">
                  <EnergyConsumptionChart />
                </div>
                <div>
                  <EnergySavingTips />
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 space-y-6">
              <div className="rounded-full bg-muted p-6">
                <ZapIcon className="h-12 w-12 text-muted-foreground opacity-50" />
              </div>
              <div className="text-center space-y-2">
                <h2 className="text-xl font-semibold">Sem dados de consumo</h2>
                <p className="text-muted-foreground max-w-md">
                  Você ainda não cadastrou nenhum dispositivo. Adicione dispositivos para começar a monitorar seu consumo de energia.
                </p>
              </div>
              <button 
                className="bg-energy-primary hover:bg-energy-primary/90 text-white px-4 py-2 rounded-md"
                onClick={() => window.location.href = '/dispositivos'}
              >
                Adicionar Dispositivos
              </button>
            </div>
          )}

          {/* Device Monitoring */}
          {hasDevices && (
            <div className="mt-6">
              <DeviceMonitoring />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
