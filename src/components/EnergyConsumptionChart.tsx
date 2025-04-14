
import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: '00:00', consumption: 25 },
  { time: '03:00', consumption: 20 },
  { time: '06:00', consumption: 35 },
  { time: '09:00', consumption: 45 },
  { time: '12:00', consumption: 65 },
  { time: '15:00', consumption: 85 },
  { time: '18:00', consumption: 75 },
  { time: '21:00', consumption: 50 },
];

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

const EnergyConsumptionChart = () => {
  const [activeTab, setActiveTab] = useState('daily');

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
            data={data}
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
              labelFormatter={(label) => `Horário: ${label}`}
            />
            <Area
              type="monotone"
              dataKey="consumption"
              stroke="#5AC4BE"
              fillOpacity={1}
              fill="url(#colorConsumption)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-2 text-xs text-center text-muted-foreground">
        Média: 62 kWh
      </div>
    </div>
  );
};

export default EnergyConsumptionChart;
