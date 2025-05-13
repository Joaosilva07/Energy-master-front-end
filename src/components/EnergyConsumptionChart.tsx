
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useDevices } from '@/hooks/useDevices';

// Tab component for time period selection
interface TabProps {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const Tab = ({ children, isActive, onClick }: TabProps) => (
  <button
    onClick={onClick}
    className={`rounded-md px-4 py-2 text-sm ${
      isActive ? 'bg-muted font-medium' : 'text-muted-foreground hover:bg-muted/50'
    }`}
  >
    {children}
  </button>
);

// Generate sample data based on time period
const generateChartData = (period: string, totalConsumption: number) => {
  let data = [];
  
  switch (period) {
    case 'daily':
      data = [
        { time: '00:00', consumption: totalConsumption * 0.05 },
        { time: '03:00', consumption: totalConsumption * 0.03 },
        { time: '06:00', consumption: totalConsumption * 0.08 },
        { time: '09:00', consumption: totalConsumption * 0.15 },
        { time: '12:00', consumption: totalConsumption * 0.20 },
        { time: '15:00', consumption: totalConsumption * 0.25 },
        { time: '18:00', consumption: totalConsumption * 0.18 },
        { time: '21:00', consumption: totalConsumption * 0.06 },
      ];
      break;
      
    case 'weekly':
      data = [
        { time: 'Dom', consumption: totalConsumption * 0.11 },
        { time: 'Seg', consumption: totalConsumption * 0.16 },
        { time: 'Ter', consumption: totalConsumption * 0.15 },
        { time: 'Qua', consumption: totalConsumption * 0.14 },
        { time: 'Qui', consumption: totalConsumption * 0.15 },
        { time: 'Sex', consumption: totalConsumption * 0.18 },
        { time: 'Sáb', consumption: totalConsumption * 0.11 },
      ];
      break;
      
    case 'monthly':
      data = [
        { time: 'Jan', consumption: totalConsumption * 0.08 },
        { time: 'Fev', consumption: totalConsumption * 0.07 },
        { time: 'Mar', consumption: totalConsumption * 0.09 },
        { time: 'Abr', consumption: totalConsumption * 0.085 },
        { time: 'Mai', consumption: totalConsumption * 0.095 },
        { time: 'Jun', consumption: totalConsumption * 0.12 },
        { time: 'Jul', consumption: totalConsumption * 0.11 },
        { time: 'Ago', consumption: totalConsumption * 0.10 },
        { time: 'Set', consumption: totalConsumption * 0.085 },
        { time: 'Out', consumption: totalConsumption * 0.075 },
        { time: 'Nov', consumption: totalConsumption * 0.08 },
        { time: 'Dez', consumption: totalConsumption * 0.10 },
      ];
      break;
      
    default:
      data = [];
  }
  
  // Round consumption values to whole numbers
  return data.map(item => ({
    ...item,
    consumption: Math.round(item.consumption)
  }));
};

const EnergyConsumptionChart = () => {
  const [activeTab, setActiveTab] = useState('daily');
  const [chartData, setChartData] = useState<Array<{time: string, consumption: number}>>([]);
  const [average, setAverage] = useState(0);
  const { devices } = useDevices();
  
  useEffect(() => {
    // Calculate total consumption from all devices
    const totalConsumption = devices?.reduce((sum, device) => sum + device.consumption, 0) || 0;
    
    // Generate chart data based on selected time period
    const data = generateChartData(activeTab, totalConsumption);
    setChartData(data);
    
    // Calculate average consumption
    if (data.length > 0) {
      const sum = data.reduce((acc, item) => acc + item.consumption, 0);
      setAverage(Math.round(sum / data.length));
    }
  }, [activeTab, devices]);

  return (
    <div className="rounded-lg border bg-card p-5">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Consumo de Energia</h3>
        <p className="text-sm text-muted-foreground">Acompanhe seu consumo de energia ao longo do tempo</p>
      </div>
      <div className="mb-4 flex space-x-1">
        <Tab isActive={activeTab === 'daily'} onClick={() => setActiveTab('daily')}>
          Diário
        </Tab>
        <Tab isActive={activeTab === 'weekly'} onClick={() => setActiveTab('weekly')}>
          Semanal
        </Tab>
        <Tab isActive={activeTab === 'monthly'} onClick={() => setActiveTab('monthly')}>
          Mensal
        </Tab>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{
              top: 5,
              right: 5,
              left: 5,
              bottom: 5,
            }}
          >
            <defs>
              <linearGradient id="colorConsumption" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#5AC4BE" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#5AC4BE" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis
              dataKey="time"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tickFormatter={(value) => `${value} kWh`}
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              width={60}
            />
            <Tooltip
              formatter={(value) => [`${value} kWh`, 'Consumo']}
              labelFormatter={(label) => {
                switch(activeTab) {
                  case 'daily':
                    return `Horário: ${label}`;
                  case 'weekly':
                    return `Dia: ${label}`;
                  case 'monthly':
                    return `Mês: ${label}`;
                  default:
                    return `${label}`;
                }
              }}
            />
            <Area
              type="monotone"
              dataKey="consumption"
              stroke="#5AC4BE"
              fillOpacity={1}
              fill="url(#colorConsumption)"
              animationDuration={500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-2 text-xs text-center text-muted-foreground">
        Média: {average} kWh
      </div>
    </div>
  );
};

export default EnergyConsumptionChart;
