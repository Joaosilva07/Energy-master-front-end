
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AddDeviceForm from '@/components/AddDeviceForm';
import { useDevices } from '@/hooks/useDevices';
import DeviceList from '@/components/DeviceList';

const Dispositivos = () => {
  const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false);
  const { devices, addDevice, toggleDevicePower, removeDevice, fetchDevices } = useDevices();
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Refresh data periodically (every 60 seconds)
  useEffect(() => {
    // Set initial data
    fetchDevices();
    
    // Update the last update timestamp
    setLastUpdated(new Date());
    
    // Set up periodic refresh
    const refreshInterval = setInterval(() => {
      fetchDevices();
      setLastUpdated(new Date());
    }, 60000); // 60 seconds
    
    return () => clearInterval(refreshInterval);
  }, [fetchDevices]);

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
                <p className="text-muted-foreground">
                  Gerencie seus dispositivos conectados
                  <span className="text-xs ml-2">
                    Última atualização: {lastUpdated.toLocaleTimeString()}
                  </span>
                </p>
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
              <DeviceList 
                devices={devices}
                onTogglePower={toggleDevicePower}
                onRemove={removeDevice}
              />
            </TabsContent>
            
            <TabsContent value="ativos">
              <DeviceList 
                devices={devices.filter(d => d.status === 'online')}
                onTogglePower={toggleDevicePower}
                onRemove={removeDevice}
              />
            </TabsContent>
            
            <TabsContent value="inativos">
              <DeviceList 
                devices={devices.filter(d => d.status === 'offline')}
                onTogglePower={toggleDevicePower}
                onRemove={removeDevice}
              />
            </TabsContent>
          </Tabs>

          <AddDeviceForm 
            open={isAddDeviceOpen} 
            onOpenChange={setIsAddDeviceOpen} 
            onAddDevice={addDevice}
          />
        </main>
      </div>
    </div>
  );
};

export default Dispositivos;
