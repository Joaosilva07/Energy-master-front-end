
import React from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CalendarDays, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

const Consumo = () => {
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

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <QuickStatCard
              title="Consumo Hoje"
              value="12.5 kWh"
              change={+15}
              icon={<CalendarDays className="h-4 w-4" />}
            />
            <QuickStatCard
              title="Pico de Consumo"
              value="2.8 kWh/h"
              change={-8}
              icon={<TrendingUp className="h-4 w-4" />}
            />
            <QuickStatCard
              title="Consumo Médio"
              value="1.2 kWh/h"
              change={+5}
              icon={<TrendingDown className="h-4 w-4" />}
            />
            <QuickStatCard
              title="Alertas Ativos"
              value="2"
              change={0}
              icon={<AlertCircle className="h-4 w-4" />}
            />
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Consumo por Hora</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={hourlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="consumption" 
                      stroke="#8B5CF6" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Distribuição por Dispositivo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deviceDistribution.map((device, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {device.icon}
                        <span>{device.name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">{device.percentage}%</span>
                        <div className="w-32 h-2 rounded-full bg-muted overflow-hidden">
                          <div 
                            className="h-full bg-energy-primary"
                            style={{ width: `${device.percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alertas Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alerts.map((alert, index) => (
                    <div key={index} className="flex items-start gap-4 p-3 rounded-lg bg-muted/50">
                      <AlertCircle className={`h-5 w-5 ${alert.color}`} />
                      <div>
                        <p className="font-medium">{alert.title}</p>
                        <p className="text-sm text-muted-foreground">{alert.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

const QuickStatCard = ({ title, value, change, icon }) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-muted-foreground">{title}</span>
        {icon}
      </div>
      <div className="flex items-baseline justify-between">
        <span className="text-2xl font-bold">{value}</span>
        {change !== 0 && (
          <span className={`text-sm ${change > 0 ? 'text-red-500' : 'text-green-500'}`}>
            {change > 0 ? '+' : ''}{change}%
          </span>
        )}
      </div>
    </CardContent>
  </Card>
);

const hourlyData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${String(i).padStart(2, '0')}:00`,
  consumption: Math.random() * 2 + 0.5,
}));

const deviceDistribution = [
  { name: 'Ar Condicionado', percentage: 35, icon: <Fan className="h-4 w-4" /> },
  { name: 'Refrigerador', percentage: 25, icon: <Radio className="h-4 w-4" /> },
  { name: 'Televisão', percentage: 20, icon: <Tv className="h-4 w-4" /> },
  { name: 'Computador', percentage: 15, icon: <Laptop className="h-4 w-4" /> },
];

const alerts = [
  {
    title: 'Pico de Consumo Detectado',
    description: 'O consumo está 30% acima da média para este horário.',
    time: 'Há 5 minutos',
    color: 'text-red-500'
  },
  {
    title: 'Dispositivo Inativo',
    description: 'O computador está em modo de espera há mais de 2 horas.',
    time: 'Há 2 horas',
    color: 'text-yellow-500'
  }
];

export default Consumo;
