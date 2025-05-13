
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
  const [isProcessingToggle, setIsProcessingToggle] = useState(false);
  const { toast } = useToast();
  
  // Cloud integration
  const cloudConnection = useCloudConnection(devices, {
    enabled: cloudEnabled,
    refreshInterval: 60000, // 1 minute
    onDeviceUpdate: (deviceId, newPowerState) => {
      console.log(`Atualizando dispositivo ${deviceId} para ${newPowerState ? "ligado" : "desligado"} via nuvem`);
      updateDeviceStatus(deviceId, newPowerState);
    }
  });
  
  // Manual refresh function
  const handleRefresh = useCallback(() => {
    console.log("Atualizando dispositivos manualmente...");
    fetchDevices();
    setLastUpdated(new Date());
    toast({
      title: "Dados atualizados",
      description: "Os dispositivos foram atualizados com sucesso",
    });
  }, [fetchDevices, toast]);

  // Set up auto-refresh
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

  // Handle device toggle with minimal delay
  const handleToggleDevice = useCallback(async (deviceId: string) => {
    // Prevent rapid clicks, but with minimal delay
    if (isProcessingToggle) return;
    
    setIsProcessingToggle(true);
    
    try {
      // If cloud is connected, try to use it
      const device = devices.find(d => d.id === deviceId);
      if (!device) return;
      
      if (cloudConnection.isConnected && cloudEnabled) {
        const newState = !device.powerState;
        const success = await cloudConnection.updateDeviceInCloud(deviceId, newState);
        
        if (!success) {
          // Fallback to local toggle
          await toggleDevicePower(deviceId);
        }
      } else {
        // Use local toggle
        await toggleDevicePower(deviceId);
      }
    } finally {
      // Release processing lock with minimal delay
      setTimeout(() => setIsProcessingToggle(false), 100);
    }
  }, [devices, toggleDevicePower, cloudConnection, cloudEnabled, isProcessingToggle]);

  // Manage Alexa dialog state
  const handleAlexaDialogChange = (open: boolean) => {
    setIsAlexaOpen(open);
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
