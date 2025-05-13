
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useEnergyAnalysis } from '@/hooks/useEnergyAnalysis';

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

const EnergyConsumptionChart = () => {
  const [activeTab, setActiveTab] = useState('daily');
  const [chartData, setChartData] = useState<Array<{time: string, consumption: number}>>([]);
  const [average, setAverage] = useState(0);
  const { hourlyData, dailyData, monthlyData, isAnalyzing } = useEnergyAnalysis();
  
  useEffect(() => {
    // Format data based on selected time period
    let data: any[] = [];
    
    switch (activeTab) {
      case 'daily':
        data = hourlyData.map(item => ({ 
          time: item.hour, 
          consumption: item.consumption 
        }));
        break;
      case 'weekly':
        data = dailyData.map(item => ({ 
          time: item.day, 
          consumption: item.consumption 
        }));
        break;
      case 'monthly':
        data = monthlyData.map(item => ({ 
          time: item.month, 
          consumption: item.consumption 
        }));
        break;
      default:
        data = [];
    }
    
    setChartData(data);
    
    // Calculate average consumption
    if (data.length > 0) {
      const sum = data.reduce((acc, item) => acc + item.consumption, 0);
      setAverage(Math.round(sum / data.length));
    }
  }, [activeTab, hourlyData, dailyData, monthlyData]);

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
        {isAnalyzing ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-energy-primary mx-auto mb-2"></div>
              <p className="text-sm text-muted-foreground">Analisando dados de consumo...</p>
            </div>
          </div>
        ) : (
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
        )}
      </div>
      <div className="mt-2 text-xs text-center text-muted-foreground">
        Média: {average} kWh
      </div>
    </div>
  );
};

export default EnergyConsumptionChart;
