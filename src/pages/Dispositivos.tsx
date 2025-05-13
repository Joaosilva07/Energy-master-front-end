
import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AddDeviceForm from '@/components/AddDeviceForm';
import { useDevices } from '@/hooks/useDevices';
import DeviceList from '@/components/DeviceList';
import { useToast } from '@/components/ui/use-toast';
import AlexaIntegration from '@/components/AlexaIntegration';
import { useCloudConnection } from '@/hooks/useCloudConnection';

const Dispositivos = () => {
  const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false);
  const [isAlexaOpen, setIsAlexaOpen] = useState(false);
  const [cloudEnabled, setCloudEnabled] = useState(false);
  const { devices, addDevice, toggleDevicePower, removeDevice, fetchDevices, updateDeviceStatus } = useDevices();
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const { toast } = useToast();
  
  // Integração com a nuvem
  const cloudConnection = useCloudConnection(devices, {
    enabled: cloudEnabled,
    refreshInterval: 60000, // 1 minuto
    onDeviceUpdate: (deviceId, newPowerState) => {
      console.log(`Atualizando dispositivo ${deviceId} para ${newPowerState ? "ligado" : "desligado"} via nuvem`);
      updateDeviceStatus(deviceId, newPowerState);
    }
  });
  
  // Função para atualizar dados manualmente
  const handleRefresh = useCallback(() => {
    console.log("Atualizando dispositivos manualmente...");
    fetchDevices();
    setLastUpdated(new Date());
    toast({
      title: "Dados atualizados",
      description: "Os dispositivos foram atualizados com sucesso",
    });
  }, [fetchDevices, toast]);

  // Refresh data periodically (every 30 seconds)
  useEffect(() => {
    console.log("Montando componente Dispositivos, configurando refresh...");
    
    // Set initial data
    fetchDevices();
    
    // Update the last update timestamp
    setLastUpdated(new Date());
    
    // Set up periodic refresh
    const refreshInterval = setInterval(() => {
      console.log("Refresh automático dos dispositivos...");
      fetchDevices();
      setLastUpdated(new Date());
    }, 30000); // 30 seconds
    
    return () => {
      console.log("Desmontando componente Dispositivos, limpando interval");
      clearInterval(refreshInterval);
    };
  }, [fetchDevices]);

  // Função para ligar/desligar dispositivo com integração à nuvem
  const handleToggleDevice = useCallback(async (deviceId: string) => {
    // Encontra o dispositivo
    const device = devices.find(d => d.id === deviceId);
    if (!device) return;
    
    // Se a nuvem estiver habilitada, envia o comando pela nuvem
    if (cloudConnection.isConnected && cloudEnabled) {
      const newState = !device.powerState;
      const success = await cloudConnection.updateDeviceInCloud(deviceId, newState);
      
      // Se o comando na nuvem foi bem-sucedido, o callback onDeviceUpdate já atualizará o estado
      if (!success) {
        // Se falhou na nuvem, usa o método local como fallback
        toggleDevicePower(deviceId);
      }
    } else {
      // Usa o método local
      toggleDevicePower(deviceId);
    }
  }, [devices, toggleDevicePower, cloudConnection, cloudEnabled]);

  // Quando a integração com Alexa for fechada
  const handleAlexaDialogChange = (open: boolean) => {
    setIsAlexaOpen(open);
    // Se o diálogo foi fechado e a conexão estava ativa, mantém cloudEnabled
    if (!open && cloudConnection.isConnected) {
      setCloudEnabled(true);
    }
  };

  console.log("Dispositivos renderizando com", devices.length, "dispositivos", 
              "Nuvem:", cloudConnection.isConnected ? "conectada" : "desconectada");

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
              <div className="flex gap-2">
                <Button 
                  variant="outline"
                  onClick={handleRefresh}
                  className="flex items-center gap-1"
                >
                  <RefreshCw className="h-4 w-4" />
                  Atualizar
                </Button>
                <Button 
                  variant={cloudConnection.isConnected ? "secondary" : "outline"}
                  onClick={() => setIsAlexaOpen(true)}
                  className={cloudConnection.isConnected 
                    ? "bg-purple-600 text-white hover:bg-purple-700" 
                    : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                  }
                >
                  {cloudConnection.isConnected ? "Alexa Conectada" : "Conectar Alexa"}
                </Button>
                <Button 
                  className="bg-energy-primary hover:bg-energy-primary/90"
                  onClick={() => setIsAddDeviceOpen(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Dispositivo
                </Button>
              </div>
            </div>
            
            {cloudConnection.isConnected && (
              <div className="mt-2 p-2 bg-green-50 border border-green-100 rounded-md text-sm text-green-700 flex items-center">
                <Cloud className="h-4 w-4 mr-2" />
                Monitoramento em nuvem ativo | Última sincronização: {cloudConnection.lastSyncTime?.toLocaleTimeString() || 'N/A'}
              </div>
            )}
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
                onTogglePower={handleToggleDevice}
                onRemove={removeDevice}
                cloudConnected={cloudConnection.isConnected}
              />
            </TabsContent>
            
            <TabsContent value="ativos">
              <DeviceList 
                devices={devices.filter(d => d.powerState)}
                onTogglePower={handleToggleDevice}
                onRemove={removeDevice}
                cloudConnected={cloudConnection.isConnected}
              />
            </TabsContent>
            
            <TabsContent value="inativos">
              <DeviceList 
                devices={devices.filter(d => !d.powerState)}
                onTogglePower={handleToggleDevice}
                onRemove={removeDevice}
                cloudConnected={cloudConnection.isConnected}
              />
            </TabsContent>
          </Tabs>

          <AddDeviceForm 
            open={isAddDeviceOpen} 
            onOpenChange={setIsAddDeviceOpen} 
            onAddDevice={addDevice}
          />
          
          <AlexaIntegration 
            open={isAlexaOpen} 
            onOpenChange={handleAlexaDialogChange} 
          />
        </main>
      </div>
    </div>
  );
};

export default Dispositivos;
