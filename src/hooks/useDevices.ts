
import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { useUser } from '@/contexts/UserContext';

export interface Device {
  id: string;
  name: string;
  type: string;
  consumption: number;
  status: 'online' | 'offline';
  lastActivity: string;
  powerState: boolean;
  location?: string;
  userId: string;
}

// Initial devices for demonstration
const initialDevices: Device[] = [
  {
    id: '1',
    name: 'Televisão - Sala',
    type: 'tv',
    consumption: 45,
    status: 'online',
    lastActivity: 'Há 5 minutos',
    powerState: true,
    location: 'Sala',
    userId: 'default'
  },
  {
    id: '2',
    name: 'Refrigerador',
    type: 'refrigerator',
    consumption: 120,
    status: 'online',
    lastActivity: 'Agora',
    powerState: true,
    location: 'Cozinha',
    userId: 'default'
  },
  {
    id: '3',
    name: 'Condicionador de Ar',
    type: 'ac',
    consumption: 180,
    status: 'online',
    lastActivity: 'Há 2 minutos',
    powerState: true,
    location: 'Quarto',
    userId: 'default'
  },
  {
    id: '4',
    name: 'Computador',
    type: 'computer',
    consumption: 60,
    status: 'offline',
    lastActivity: 'Há 2 horas',
    powerState: false,
    location: 'Escritório',
    userId: 'default'
  }
];

export function useDevices() {
  const { toast } = useToast();
  const { user } = useUser();
  const userId = user?.id || 'anonymous';
  
  const [devices, setDevices] = useState<Device[]>(() => {
    const savedDevices = localStorage.getItem(`devices_${userId}`);
    
    if (savedDevices) {
      return JSON.parse(savedDevices);
    } else if (user) {
      // If the user exists but has no devices, give them the initial set
      const userDevices = initialDevices.map(device => ({
        ...device,
        userId: userId
      }));
      return userDevices;
    }
    
    return [];
  });

  // Save devices to localStorage whenever they change
  useEffect(() => {
    if (userId) {
      localStorage.setItem(`devices_${userId}`, JSON.stringify(devices));
    }
  }, [devices, userId]);

  const addDevice = (newDevice: Omit<Device, 'userId'>) => {
    const deviceWithUserId = {
      ...newDevice,
      userId
    } as Device;
    
    setDevices([...devices, deviceWithUserId]);
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
    devices: devices.filter(device => device.userId === userId),
    addDevice,
    toggleDevicePower,
    removeDevice
  };
}
