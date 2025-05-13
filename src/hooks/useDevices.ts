
import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { useUser } from '@/contexts/UserContext';
import { supabase } from '@/lib/supabase';

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
const initialDevices: Omit<Device, 'userId'>[] = [
  {
    id: '1',
    name: 'Televisão - Sala',
    type: 'tv',
    consumption: 45,
    status: 'online',
    lastActivity: 'Há 5 minutos',
    powerState: true,
    location: 'Sala',
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
  }
];

export function useDevices() {
  const { toast } = useToast();
  const { user } = useUser();
  const userId = user?.id || 'anonymous';
  
  const [devices, setDevices] = useState<Device[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [tableExists, setTableExists] = useState<boolean>(true);

  // Check if devices table exists
  useEffect(() => {
    async function checkTable() {
      if (!user) return;
      
      try {
        await supabase.from('devices').select('count', { count: 'exact', head: true });
        setTableExists(true);
      } catch (error: any) {
        if (error.message && error.message.includes('does not exist')) {
          console.log('Devices table does not exist yet');
          setTableExists(false);
          
          // Set local fallback devices
          const fallbackDevices = initialDevices.map(device => ({ 
            ...device, 
            userId 
          }));
          setDevices(fallbackDevices);
          setIsLoading(false);
          
          // Show notice to user
          toast({
            title: "Banco de dados não configurado",
            description: "Usando dados locais temporariamente. Por favor, crie as tabelas no Supabase.",
          });
        }
      }
    }
    
    checkTable();
  }, [user, userId, toast]);

  // Fetch devices from Supabase
  useEffect(() => {
    if (!user || !tableExists) {
      setIsLoading(false);
      return;
    }

    async function fetchDevices() {
      try {
        setIsLoading(true);
        
        const { data, error } = await supabase
          .from('devices')
          .select('*')
          .eq('user_id', userId);
          
        if (error) {
          throw error;
        }
        
        if (data) {
          // Map from Supabase format to our Device format
          const formattedDevices = data.map(device => ({
            id: device.id,
            name: device.name,
            type: device.type,
            consumption: device.consumption,
            status: device.status as 'online' | 'offline',
            lastActivity: device.lastActivity,
            powerState: device.powerState,
            location: device.location,
            userId: device.user_id
          }));
          
          setDevices(formattedDevices);
          
          // If user has no devices in database, use initial ones
          if (formattedDevices.length === 0) {
            await Promise.all(initialDevices.map(device => 
              addInitialDevice({...device, userId})
            ));
            
            // Then fetch them again
            const { data: newData } = await supabase
              .from('devices')
              .select('*')
              .eq('user_id', userId);
              
            if (newData) {
              const newFormattedDevices = newData.map(device => ({
                id: device.id,
                name: device.name,
                type: device.type,
                consumption: device.consumption,
                status: device.status as 'online' | 'offline',
                lastActivity: device.lastActivity,
                powerState: device.powerState,
                location: device.location,
                userId: device.user_id
              }));
              
              setDevices(newFormattedDevices);
            }
          }
        }
      } catch (err) {
        console.error('Error fetching devices:', err);
        setError(err as Error);
        
        // Fallback to localStorage if Supabase fails
        const savedDevices = localStorage.getItem(`devices_${userId}`);
        if (savedDevices) {
          setDevices(JSON.parse(savedDevices));
        } else {
          // Use initial devices as fallback
          const fallbackDevices = initialDevices.map(device => ({ 
            ...device, 
            userId 
          }));
          setDevices(fallbackDevices);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchDevices();
  }, [userId, user, tableExists, toast]);

  // Helper function to add initial device
  const addInitialDevice = async (device: Device) => {
    if (!tableExists) return;
    
    try {
      await supabase
        .from('devices')
        .insert([{
          name: device.name,
          type: device.type,
          consumption: device.consumption,
          status: device.status,
          lastActivity: device.lastActivity,
          powerState: device.powerState,
          location: device.location,
          user_id: device.userId
        }]);
    } catch (error) {
      console.error('Error adding initial device:', error);
    }
  };

  // Add a device to Supabase
  const addDevice = async (newDevice: Device) => {
    try {
      if (!tableExists) {
        // Just add to local state if table doesn't exist
        setDevices(prev => [...prev, newDevice]);
        
        toast({
          title: "Dispositivo adicionado (modo local)",
          description: "O dispositivo foi adicionado localmente. Configure o banco de dados para persistência.",
        });
        return;
      }
      
      const { data, error } = await supabase
        .from('devices')
        .insert([{
          name: newDevice.name,
          type: newDevice.type,
          consumption: newDevice.consumption,
          status: newDevice.status,
          lastActivity: newDevice.lastActivity,
          powerState: newDevice.powerState,
          location: newDevice.location,
          user_id: userId
        }])
        .select();
        
      if (error) {
        throw error;
      }
      
      if (data && data[0]) {
        const formattedDevice = {
          id: data[0].id,
          name: data[0].name,
          type: data[0].type,
          consumption: data[0].consumption,
          status: data[0].status as 'online' | 'offline',
          lastActivity: data[0].lastActivity,
          powerState: data[0].powerState,
          location: data[0].location,
          userId: data[0].user_id
        };
        
        setDevices(prev => [...prev, formattedDevice]);
        
        toast({
          title: "Dispositivo adicionado",
          description: "O novo dispositivo foi adicionado com sucesso.",
        });
      }
    } catch (err) {
      console.error('Error adding device:', err);
      toast({
        title: "Erro ao adicionar dispositivo",
        description: "Ocorreu um erro ao adicionar o dispositivo.",
        variant: "destructive"
      });
    }
  };

  // Toggle device power state
  const toggleDevicePower = async (deviceId: string) => {
    try {
      // Find the device to toggle
      const deviceToUpdate = devices.find(device => device.id === deviceId);
      
      if (!deviceToUpdate) return;
      
      const newPowerState = !deviceToUpdate.powerState;
      
      if (tableExists) {
        // Update in Supabase
        const { error } = await supabase
          .from('devices')
          .update({ 
            powerState: newPowerState,
            status: newPowerState ? 'online' : 'offline',
            lastActivity: 'Agora'
          })
          .eq('id', deviceId);
          
        if (error) {
          throw error;
        }
      }
      
      // Update local state
      setDevices(devices.map(device => 
        device.id === deviceId 
          ? { 
              ...device, 
              powerState: newPowerState,
              status: newPowerState ? 'online' : 'offline',
              lastActivity: 'Agora'
            } 
          : device
      ));
      
      toast({
        title: "Estado alterado",
        description: "O estado do dispositivo foi alterado.",
      });
    } catch (err) {
      console.error('Error toggling device power:', err);
      toast({
        title: "Erro ao alterar estado",
        description: "Ocorreu um erro ao alterar o estado do dispositivo.",
        variant: "destructive"
      });
    }
  };

  // Remove a device
  const removeDevice = async (deviceId: string) => {
    try {
      if (tableExists) {
        const { error } = await supabase
          .from('devices')
          .delete()
          .eq('id', deviceId);
          
        if (error) {
          throw error;
        }
      }
      
      setDevices(devices.filter(device => device.id !== deviceId));
      
      toast({
        title: "Dispositivo removido",
        description: "O dispositivo foi removido com sucesso.",
        variant: "destructive"
      });
    } catch (err) {
      console.error('Error removing device:', err);
      toast({
        title: "Erro ao remover dispositivo",
        description: "Ocorreu um erro ao remover o dispositivo.",
        variant: "destructive"
      });
    }
  };

  return {
    devices,
    addDevice,
    toggleDevicePower,
    removeDevice,
    isLoading,
    error
  };
}
