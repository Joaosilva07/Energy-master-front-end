
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Tv, Laptop, Fan, Radio, Power, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AddDeviceForm from '@/components/AddDeviceForm';
import { useToast } from "@/components/ui/use-toast";

// Map device types to their icons
const deviceIcons = {
  tv: <Tv className="h-5 w-5" />,
  refrigerator: <Radio className="h-5 w-5" />,
  ac: <Fan className="h-5 w-5" />,
  computer: <Laptop className="h-5 w-5" />,
  washer: <Fan className="h-5 w-5" />,
  microwave: <Radio className="h-5 w-5" />,
};

const Dispositivos = () => {
  const { toast } = useToast();
  const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false);
  const [devices, setDevices] = useState(() => {
    const savedDevices = localStorage.getItem('devices');
    return savedDevices ? JSON.parse(savedDevices) : initialDevices;
  });

  // Save devices to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('devices', JSON.stringify(devices));
  }, [devices]);

  const handleAddDevice = (newDevice) => {
    setDevices([...devices, newDevice]);
  };

  const toggleDevicePower = (deviceId) => {
    setDevices(devices.map(device => 
      device.id === deviceId 
        ? { 
            ...device, 
            powerState: !device.powerState,
            status: !device.powerState ? 'online' : 'offline',
            lastActivity: 'Agora'
          } 
        : device
    ));
    
    toast({
      title: "Estado alterado",
      description: "O estado do dispositivo foi alterado.",
    });
  };

  const removeDevice = (deviceId) => {
    setDevices(devices.filter(device => device.id !== deviceId));
    toast({
      title: "Dispositivo removido",
      description: "O dispositivo foi removido com sucesso.",
      variant: "destructive"
    });
  };

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
              <Button 
                className="bg-energy-primary hover:bg-energy-primary/90"
                onClick={() => setIsAddDeviceOpen(true)}
              >
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
                  <DeviceCard 
                    key={device.id || index} 
                    device={device} 
                    onTogglePower={toggleDevicePower}
                    onRemove={removeDevice}
                    icons={deviceIcons}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="ativos">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {devices.filter(d => d.status === 'online').map((device, index) => (
                  <DeviceCard 
                    key={device.id || index} 
                    device={device} 
                    onTogglePower={toggleDevicePower}
                    onRemove={removeDevice}
                    icons={deviceIcons}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="inativos">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {devices.filter(d => d.status === 'offline').map((device, index) => (
                  <DeviceCard 
                    key={device.id || index} 
                    device={device} 
                    onTogglePower={toggleDevicePower}
                    onRemove={removeDevice}
                    icons={deviceIcons}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <AddDeviceForm 
            open={isAddDeviceOpen} 
            onOpenChange={setIsAddDeviceOpen} 
            onAddDevice={handleAddDevice}
          />
        </main>
      </div>
    </div>
  );
};

const DeviceCard = ({ device, onTogglePower, onRemove, icons }) => {
  const icon = icons[device.type] || <Tv className="h-5 w-5" />;
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`rounded-lg p-2 ${device.status === 'online' ? 'bg-green-100' : 'bg-gray-100'}`}>
              {icon}
            </div>
            <div>
              <h3 className="font-medium">{device.name}</h3>
              <div className="flex items-center gap-2">
                <span
                  className={`h-2 w-2 rounded-full ${
                    device.status === 'online' ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                />
                <span className="text-sm text-muted-foreground capitalize">{device.status}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onTogglePower(device.id)}
              className={device.powerState ? 'text-green-500' : 'text-gray-400'}
            >
              <Power className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => onRemove(device.id)}
              className="text-red-500 hover:bg-red-50"
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Consumo</span>
            <span className="font-medium">{device.consumption} kWh/mês</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Última atividade</span>
            <span>{device.lastActivity}</span>
          </div>
          {device.location && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Local</span>
              <span>{device.location}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Initialize with some demo devices
const initialDevices = [
  {
    id: '1',
    name: 'Televisão - Sala',
    type: 'tv',
    icon: <Tv className="h-5 w-5" />,
    consumption: 45,
    status: 'online',
    lastActivity: 'Há 5 minutos',
    powerState: true,
    location: 'Sala'
  },
  {
    id: '2',
    name: 'Refrigerador',
    type: 'refrigerator',
    icon: <Radio className="h-5 w-5" />,
    consumption: 120,
    status: 'online',
    lastActivity: 'Agora',
    powerState: true,
    location: 'Cozinha'
  },
  {
    id: '3',
    name: 'Condicionador de Ar',
    type: 'ac',
    icon: <Fan className="h-5 w-5" />,
    consumption: 180,
    status: 'online',
    lastActivity: 'Há 2 minutos',
    powerState: true,
    location: 'Quarto'
  },
  {
    id: '4',
    name: 'Computador',
    type: 'computer',
    icon: <Laptop className="h-5 w-5" />,
    consumption: 60,
    status: 'offline',
    lastActivity: 'Há 2 horas',
    powerState: false,
    location: 'Escritório'
  }
];

export default Dispositivos;
