
import React, { useEffect, useState } from 'react';
import { LineChart, ActivitySquare, ZapIcon, Gauge } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import EnergyCard from '@/components/EnergyCard';
import EnergyConsumptionChart from '@/components/EnergyConsumptionChart';
import EnergySavingTips from '@/components/EnergySavingTips';
import DeviceMonitoring from '@/components/DeviceMonitoring';
import { useDevices } from '@/hooks/useDevices';

const Dashboard = () => {
  const { devices, isLoading } = useDevices();
  const [hasDevices, setHasDevices] = useState(false);
  
  useEffect(() => {
    setHasDevices(devices && devices.length > 0);
  }, [devices]);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Acompanhe o consumo de energia da sua residência</p>
            {hasDevices && (
              <div className="mt-1 text-xs text-muted-foreground text-right">
                Última atualização: {new Date().toLocaleDateString('pt-BR', {day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'})}
              </div>
            )}
          </div>

          {hasDevices ? (
            <>
              {/* Energy Cards */}
              <div className="mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <EnergyCard
                  title="Consumo Total"
                  value={devices.reduce((sum, device) => sum + device.consumption, 0)}
                  unit="kWh"
                  percentageChange={0}
                  icon={<LineChart className="h-5 w-5 text-energy-primary" />}
                />
                <EnergyCard
                  title="Consumo em Pico"
                  value={Math.round(devices.reduce((sum, device) => sum + device.consumption, 0) * 0.3)}
                  unit="kWh"
                  percentageChange={0}
                  icon={<ActivitySquare className="h-5 w-5 text-amber-500" />}
                />
                <EnergyCard
                  title="Eficiência"
                  value={devices.length > 0 ? 70 : 0}
                  unit="%"
                  percentageChange={0}
                  icon={<Gauge className="h-5 w-5 text-green-500" />}
                />
                <EnergyCard
                  title="Custo Estimado"
                  value={Math.round(devices.reduce((sum, device) => sum + device.consumption, 0) * 0.7)}
                  unit="R$"
                  percentageChange={0}
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
