
import React from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CalendarDays, TrendingUp, TrendingDown, AlertCircle, Fan, Radio, Tv, Laptop, Plus } from 'lucide-react';
import { useDevices } from '@/hooks/useDevices';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import EnergyCard from '@/components/EnergyCard';

const Consumo = () => {
  const { devices, isLoading } = useDevices();
  
  // Verifica se existem dispositivos cadastrados
  const hasDevices = devices.length > 0;

  // Estado vazio - sem dispositivos cadastrados
  if (!isLoading && !hasDevices) {
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
            
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-6 mb-4">
                <TrendingUp className="h-10 w-10 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Nenhum dado de consumo disponível</h2>
              <p className="text-muted-foreground max-w-md mb-6">
                Você ainda não tem dispositivos cadastrados. Adicione dispositivos para começar a monitorar seu consumo de energia.
              </p>
              <Link to="/dispositivos">
                <Button className="bg-energy-primary hover:bg-energy-primary/90">
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Dispositivo
                </Button>
              </Link>
            </div>
          </main>
        </div>
      </div>
    );
  }

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

          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-muted-foreground">Carregando dados de consumo...</p>
            </div>
          ) : (
            <>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
                <EnergyCard
                  title="Consumo Hoje"
                  value={calculateDailyConsumption(devices)}
                  unit="kWh"
                  percentageChange={0}
                  icon={<CalendarDays className="h-4 w-4" />}
                />
                <EnergyCard
                  title="Pico de Consumo"
                  value={calculatePeakConsumption(devices)}
                  unit="kWh/h"
                  percentageChange={0}
                  icon={<TrendingUp className="h-4 w-4" />}
                />
                <EnergyCard
                  title="Consumo Médio"
                  value={calculateAverageConsumption(devices)}
                  unit="kWh/h"
                  percentageChange={0}
                  icon={<TrendingDown className="h-4 w-4" />}
                />
                <EnergyCard
                  title="Dispositivos Ativos"
                  value={getActiveDevicesCount(devices)}
                  percentageChange={0}
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
                      <LineChart data={generateHourlyData(devices)}>
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
                      {generateDeviceDistribution(devices).map((device, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {getDeviceIcon(device.type)}
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
                    {generateAlerts(devices).length > 0 ? (
                      <div className="space-y-4">
                        {generateAlerts(devices).map((alert, index) => (
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
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-muted-foreground">Nenhum alerta disponível</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

// Funções auxiliares para calcular valores com base nos dispositivos
const calculateDailyConsumption = (devices) => {
  if (!devices.length) return 0;
  // Cálculo simplificado - na vida real seria baseado em dados reais
  return parseFloat((devices.reduce((sum, device) => sum + (device.consumption / 30), 0)).toFixed(1));
};

const calculatePeakConsumption = (devices) => {
  if (!devices.length) return 0;
  // Simplificação: pico é 20% acima da média
  return parseFloat((calculateAverageConsumption(devices) * 1.2).toFixed(1));
};

const calculateAverageConsumption = (devices) => {
  if (!devices.length) return 0;
  // Consumo médio por hora
  return parseFloat((calculateDailyConsumption(devices) / 24).toFixed(1));
};

const getActiveDevicesCount = (devices) => {
  return devices.filter(d => d.powerState).length;
};

const generateHourlyData = (devices) => {
  if (!devices.length) return [];
  
  const baseConsumption = calculateAverageConsumption(devices);
  return Array.from({ length: 24 }, (_, i) => {
    // Criar um padrão de consumo que varia ao longo do dia
    let hourFactor = 1;
    if (i >= 7 && i <= 9) hourFactor = 1.5; // Pico da manhã
    else if (i >= 18 && i <= 21) hourFactor = 1.8; // Pico da noite
    else if (i >= 0 && i <= 5) hourFactor = 0.4; // Madrugada
    
    return {
      hour: `${String(i).padStart(2, '0')}:00`,
      consumption: parseFloat((baseConsumption * hourFactor * (0.9 + Math.random() * 0.2)).toFixed(2)),
    };
  });
};

const generateDeviceDistribution = (devices) => {
  if (!devices.length) return [];
  
  const totalConsumption = devices.reduce((sum, device) => sum + device.consumption, 0);
  
  return devices.map(device => {
    const percentage = Math.round((device.consumption / totalConsumption) * 100);
    return {
      name: device.name,
      percentage: percentage,
      type: device.type,
    };
  }).sort((a, b) => b.percentage - a.percentage).slice(0, 4); // Top 4 dispositivos
};

const generateAlerts = (devices) => {
  const alerts = [];
  
  // Identifica dispositivos com alto consumo
  const highConsumptionDevices = devices.filter(d => d.consumption > 100);
  if (highConsumptionDevices.length > 0) {
    alerts.push({
      title: 'Consumo Elevado',
      description: `${highConsumptionDevices[0].name} está com consumo acima da média.`,
      time: 'Agora',
      color: 'text-red-500'
    });
  }
  
  // Dispositivos ligados por muito tempo
  const alwaysOnDevices = devices.filter(d => d.powerState && d.lastActivity !== 'Agora');
  if (alwaysOnDevices.length > 0) {
    alerts.push({
      title: 'Dispositivo Inativo',
      description: `${alwaysOnDevices[0].name} está ligado sem uso há algum tempo.`,
      time: 'Há 2 horas',
      color: 'text-yellow-500'
    });
  }
  
  return alerts;
};

// Função para pegar o ícone baseado no tipo do dispositivo
const getDeviceIcon = (type) => {
  switch (type) {
    case 'tv':
      return <Tv className="h-5 w-5" />;
    case 'refrigerator':
      return <Radio className="h-5 w-5" />;
    case 'ac':
      return <Fan className="h-5 w-5" />;
    case 'computer':
      return <Laptop className="h-5 w-5" />;
    default:
      return <Fan className="h-5 w-5" />;
  }
};

export default Consumo;
