
import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import AddDeviceForm from '@/components/AddDeviceForm';
import { useDevices } from '@/hooks/useDevices';
import { useToast } from '@/components/ui/use-toast';
import AlexaIntegration from '@/components/AlexaIntegration';
import { useCloudConnection } from '@/hooks/useCloudConnection';
import DeviceHeader from '@/components/devices/DeviceHeader';
import DeviceTabs from '@/components/devices/DeviceTabs';

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
          <DeviceHeader 
            onRefresh={handleRefresh}
            onAddDevice={() => setIsAddDeviceOpen(true)}
            onOpenAlexa={() => setIsAlexaOpen(true)}
            lastUpdated={lastUpdated}
            cloudConnection={cloudConnection}
          />

          <DeviceTabs 
            devices={devices}
            onTogglePower={handleToggleDevice}
            onRemove={removeDevice}
            cloudConnected={cloudConnection.isConnected}
          />

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
