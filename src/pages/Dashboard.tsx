
import React from 'react';
import { LineChart, ActivitySquare, ZapIcon, Gauge } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import EnergyCard from '@/components/EnergyCard';
import EnergyConsumptionChart from '@/components/EnergyConsumptionChart';
import EnergySavingTips from '@/components/EnergySavingTips';
import DeviceMonitoring from '@/components/DeviceMonitoring';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Acompanhe o consumo de energia da sua residência</p>
            <div className="mt-1 text-xs text-muted-foreground text-right">
              Última atualização: 14 Abr, 10:45
            </div>
          </div>

          {/* Energy Cards */}
          <div className="mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <EnergyCard
              title="Consumo Total"
              value={425}
              unit="kWh"
              percentageChange={5.2}
              icon={<LineChart className="h-5 w-5 text-energy-primary" />}
            />
            <EnergyCard
              title="Consumo em Pico"
              value={120}
              unit="kWh"
              percentageChange={-2.8}
              icon={<ActivitySquare className="h-5 w-5 text-amber-500" />}
            />
            <EnergyCard
              title="Eficiência"
              value={84}
              unit="%"
              percentageChange={13.5}
              icon={<Gauge className="h-5 w-5 text-green-500" />}
            />
            <EnergyCard
              title="Custo Estimado"
              value={312}
              unit="R$"
              percentageChange={8.3}
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

          {/* Device Monitoring */}
          <div className="mt-6">
            <DeviceMonitoring />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
