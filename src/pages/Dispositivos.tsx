
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
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { deviceModels, searchDeviceModels, DeviceModel } from '@/utils/energyDataset';

const Dispositivos = () => {
  const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false);
  const [isAlexaOpen, setIsAlexaOpen] = useState(false);
  const [cloudEnabled, setCloudEnabled] = useState(false);
  const { devices, addDevice, toggleDevicePower, removeDevice, fetchDevices, updateDeviceStatus } = useDevices();
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isProcessingToggle, setIsProcessingToggle] = useState(false);
  const [showingModelSearch, setShowingModelSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredModels, setFilteredModels] = useState<DeviceModel[]>([]);
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
  
  // Update filtered models when search query changes
  useEffect(() => {
    setFilteredModels(searchDeviceModels(searchQuery));
  }, [searchQuery]);
  
  // Manual refresh function
  const handleRefresh = useCallback(() => {
    console.log("Atualizando dispositivos manualmente...");
    fetchDevices();
    setLastUpdated(new Date());
    toast({
      title: "Dados atualizados",
      description: "Os dispositivos foram atualizados com sucesso",
      duration: 2000, 
    });
  }, [fetchDevices, toast]);

  // Set up auto-refresh - with improved performance
  useEffect(() => {
    console.log("Montando componente Dispositivos, configurando refresh...");
    
    // Set initial data
    fetchDevices();
    
    // Update the last update timestamp
    setLastUpdated(new Date());
    
    // Set up periodic refresh - reduced frequency for better performance
    const refreshInterval = setInterval(() => {
      console.log("Refresh automático dos dispositivos...");
      fetchDevices();
      setLastUpdated(new Date());
    }, 60000); // Changed from 30s to 60s to reduce server load
    
    return () => {
      console.log("Desmontando componente Dispositivos, limpando interval");
      clearInterval(refreshInterval);
    };
  }, [fetchDevices]);

  // Handle device toggle with ultra-minimal delay
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
      // Ultra-fast response by releasing the lock immediately
      setIsProcessingToggle(false);
    }
  }, [devices, toggleDevicePower, cloudConnection, cloudEnabled, isProcessingToggle]);

  // Manage Alexa dialog state
  const handleAlexaDialogChange = (open: boolean) => {
    setIsAlexaOpen(open);
    if (!open && cloudConnection.isConnected) {
      setCloudEnabled(true);
    }
  };

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

          <div className="mb-6 flex items-center justify-end">
            <button 
              className={`px-3 py-1.5 text-sm font-medium rounded-md flex items-center gap-1.5 ${
                showingModelSearch ? "bg-energy-primary text-white" : "bg-muted text-muted-foreground"
              }`}
              onClick={() => setShowingModelSearch(!showingModelSearch)}
            >
              <Search className="h-4 w-4" />
              Modelos de Dispositivos
            </button>
          </div>

          {showingModelSearch && (
            <div className="mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Search className="h-5 w-5 text-energy-primary" />
                    Consultar Modelos de Dispositivos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Input 
                      placeholder="Busque por fabricante, modelo ou tipo..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="mb-4"
                    />
                    
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="py-2 text-left font-medium">Fabricante</th>
                            <th className="py-2 text-left font-medium">Modelo</th>
                            <th className="py-2 text-left font-medium">Tipo</th>
                            <th className="py-2 text-left font-medium">Consumo Médio</th>
                            <th className="py-2 text-left font-medium">Consumo em Standby</th>
                            <th className="py-2 text-left font-medium">Classe Energética</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredModels.length > 0 ? (
                            filteredModels.map((model) => (
                              <tr key={model.id} className="border-b border-gray-100">
                                <td className="py-2">{model.manufacturer}</td>
                                <td className="py-2">{model.model}</td>
                                <td className="py-2 capitalize">{model.type}</td>
                                <td className="py-2">{model.averageConsumption} W</td>
                                <td className="py-2">{model.standbyConsumption} W</td>
                                <td className="py-2">
                                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                    model.energyClass.includes('A') ? 'bg-green-100 text-green-700' : 
                                    model.energyClass.includes('B') ? 'bg-blue-100 text-blue-700' : 
                                    'bg-yellow-100 text-yellow-700'
                                  }`}>
                                    {model.energyClass}
                                  </span>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={6} className="py-4 text-center text-muted-foreground">
                                Nenhum modelo encontrado com os critérios de pesquisa.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

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
