import React from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Tv, Laptop, Fan, Radio, Power, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Dispositivos = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Dispositivos</h1>
                <p className="text-muted-foreground">Gerencie seus dispositivos conectados</p>
              </div>
              <Button className="bg-energy-primary hover:bg-energy-primary/90">
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Dispositivo
              </Button>
            </div>
          </div>

          <Tabs defaultValue="todos" className="w-full">
            <TabsList>
              <TabsTrigger value="todos">Todos</TabsTrigger>
              <TabsTrigger value="ativos">Ativos</TabsTrigger>
              <TabsTrigger value="inativos">Inativos</TabsTrigger>
            </TabsList>

            <TabsContent value="todos" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {devices.map((device, index) => (
                  <DeviceCard key={index} {...device} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="ativos">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {devices.filter(d => d.status === 'online').map((device, index) => (
                  <DeviceCard key={index} {...device} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="inativos">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {devices.filter(d => d.status === 'offline').map((device, index) => (
                  <DeviceCard key={index} {...device} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

const devices = [
  {
    name: 'Televisão - Sala',
    icon: <Tv className="h-5 w-5" />,
    consumption: 45,
    status: 'online',
    lastActivity: 'Há 5 minutos',
    powerState: true
  },
  {
    name: 'Refrigerador',
    icon: <Radio className="h-5 w-5" />,
    consumption: 120,
    status: 'online',
    lastActivity: 'Agora',
    powerState: true
  },
  {
    name: 'Condicionador de Ar',
    icon: <Fan className="h-5 w-5" />,
    consumption: 180,
    status: 'online',
    lastActivity: 'Há 2 minutos',
    powerState: true
  },
  {
    name: 'Computador',
    icon: <Laptop className="h-5 w-5" />,
    consumption: 60,
    status: 'offline',
    lastActivity: 'Há 2 horas',
    powerState: false
  }
];

const DeviceCard = ({ name, icon, consumption, status, lastActivity, powerState }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`rounded-lg p-2 ${status === 'online' ? 'bg-green-100' : 'bg-gray-100'}`}>
              {icon}
            </div>
            <div>
              <h3 className="font-medium">{name}</h3>
              <div className="flex items-center gap-2">
                <span
                  className={`h-2 w-2 rounded-full ${
                    status === 'online' ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                />
                <span className="text-sm text-muted-foreground capitalize">{status}</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" className={powerState ? 'text-green-500' : 'text-gray-400'}>
            <Power className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Consumo</span>
            <span className="font-medium">{consumption} kWh/mês</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Última atividade</span>
            <span>{lastActivity}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Dispositivos;
