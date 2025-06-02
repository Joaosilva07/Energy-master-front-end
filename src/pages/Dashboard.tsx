
import React, { useEffect, useState } from 'react';
import { LineChart, ActivitySquare, ZapIcon, Gauge, Plus } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import EnergyCard from '@/components/EnergyCard';
import EnergyConsumptionChart from '@/components/EnergyConsumptionChart';
import EnergySavingTips from '@/components/EnergySavingTips';
import DeviceMonitoring from '@/components/DeviceMonitoring';
import { useDevices } from '@/hooks/useDevices';
import { useEnergyAnalysis } from '@/hooks/useEnergyAnalysis';
import { Button } from '@/components/ui/button';

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
  const totalConsumption = Math.round(devices.reduce((sum, device) => sum + device.consumption, 0));
  
  // Find active devices count
  const activeDevices = devices.filter(d => d.powerState).length;
  
  // Define percentage change values for metrics
  const efficiencyChange = analysisData?.metrics ? 5.2 : 0;
  const consumptionChange = analysisData?.metrics ? -3.5 : 0;
  const peakChange = analysisData?.metrics ? -2.8 : 0;
  const costChange = analysisData?.metrics ? -2.1 : 0;

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
                  value={isAnalyzing ? '...' : totalConsumption}
                  unit="kWh"
                  percentageChange={consumptionChange}
                  icon={<LineChart className="h-5 w-5 text-energy-primary" />}
                />
                <EnergyCard
                  title="Consumo em Pico"
                  value={isAnalyzing ? '...' : metrics.peakConsumption}
                  unit="kWh"
                  percentageChange={peakChange}
                  icon={<ActivitySquare className="h-5 w-5 text-amber-500" />}
                />
                <EnergyCard
                  title="Eficiência"
                  value={isAnalyzing ? '...' : metrics.efficiency}
                  unit="%"
                  percentageChange={efficiencyChange}
                  icon={<Gauge className="h-5 w-5 text-green-500" />}
                />
                <EnergyCard
                  title="Custo Estimado"
                  value={isAnalyzing ? '...' : metrics.estimatedMonthlyCost}
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
              <div className="rounded-full bg-gradient-to-br from-energy-primary/10 to-energy-primary/20 p-8">
                <ZapIcon className="h-16 w-16 text-energy-primary" />
              </div>
              <div className="text-center space-y-3 max-w-md">
                <h2 className="text-2xl font-semibold">Bem-vindo ao EnergyMaster!</h2>
                <p className="text-muted-foreground">
                  Comece adicionando seus dispositivos para monitorar o consumo de energia, 
                  receber insights inteligentes e economizar na conta de luz.
                </p>
                <div className="pt-4 space-y-3">
                  <Button 
                    className="bg-energy-primary hover:bg-energy-primary/90 text-white px-6 py-3 text-base font-medium"
                    onClick={() => window.location.href = '/dispositivos'}
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Adicionar Primeiro Dispositivo
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Adicione dispositivos como TV, geladeira, ar-condicionado e mais
                  </p>
                </div>
              </div>
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
