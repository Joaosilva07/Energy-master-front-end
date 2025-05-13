
import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";

export interface Device {
  id: string;
  name: string;
  type: string;
  consumption: number;
  status: 'online' | 'offline';
  lastActivity: string;
  powerState: boolean;
  location?: string;
}

// Dispositivos iniciais para demonstração
const initialDevices: Device[] = [
  {
    id: '1',
    name: 'Televisão - Sala',
    type: 'tv',
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
    consumption: 60,
    status: 'offline',
    lastActivity: 'Há 2 horas',
    powerState: false,
    location: 'Escritório'
  }
];

export function useDevices() {
  const { toast } = useToast();
  const [devices, setDevices] = useState<Device[]>(() => {
    const savedDevices = localStorage.getItem('devices');
    return savedDevices ? JSON.parse(savedDevices) : initialDevices;
  });

  // Salvar dispositivos no localStorage sempre que houver alterações
  useEffect(() => {
    localStorage.setItem('devices', JSON.stringify(devices));
  }, [devices]);

  const addDevice = (newDevice: Device) => {
    setDevices([...devices, newDevice]);
  };

  const toggleDevicePower = (deviceId: string) => {
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

  const removeDevice = (deviceId: string) => {
    setDevices(devices.filter(device => device.id !== deviceId));
    toast({
      title: "Dispositivo removido",
      description: "O dispositivo foi removido com sucesso.",
      variant: "destructive"
    });
  };

  return {
    devices,
    addDevice,
    toggleDevicePower,
    removeDevice
  };
}
