
import { useState, useEffect } from 'react';
import { useUser } from '@/contexts/UserContext';
import { supabase } from '@/lib/supabase';
import { useToast } from "@/components/ui/use-toast";

// Type definition for our devices
export interface Device {
  id: string;
  name: string;
  type: string;
  consumption: number;
  status: string;
  lastActivity: string;
  powerState: boolean;
  location?: string;
  userId: string;
}

export const useDevices = () => {
  const { user } = useUser();
  const { toast } = useToast();
  const [devices, setDevices] = useState<Device[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch devices from Supabase or localStorage
  const fetchDevices = async () => {
    if (!user) {
      setDevices([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      // Try to fetch from Supabase
      const { data, error } = await supabase
        .from('devices')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching devices from Supabase:', error);
        
        // Fallback to localStorage if Supabase fails
        const savedDevices = localStorage.getItem(`devices_${user.id}`);
        if (savedDevices) {
          setDevices(JSON.parse(savedDevices));
        } else {
          setDevices([]);
        }
      } else {
        // Convert Supabase data format to our Device format
        const formattedDevices = data.map(item => ({
          id: item.id,
          name: item.name,
          type: item.type,
          consumption: item.consumption,
          status: item.status,
          lastActivity: item.lastActivity,
          powerState: item.powerState,
          location: item.location,
          userId: item.user_id
        }));
        
        setDevices(formattedDevices);
        
        // Update localStorage as backup
        localStorage.setItem(`devices_${user.id}`, JSON.stringify(formattedDevices));
      }
    } catch (err) {
      console.error('Failed to fetch devices:', err);
      setDevices([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Add a new device
  const addDevice = async (device: Device) => {
    if (!user) return;
    
    try {
      // Ensure device has the correct user ID
      const newDevice = {
        ...device,
        userId: user.id
      };
      
      // Try to insert into Supabase
      const { data, error } = await supabase
        .from('devices')
        .insert({
          name: newDevice.name,
          type: newDevice.type,
          consumption: newDevice.consumption,
          status: newDevice.status,
          lastActivity: newDevice.lastActivity,
          powerState: newDevice.powerState,
          location: newDevice.location || 'Casa',
          user_id: user.id
        })
        .select('*')
        .single();

      if (error) {
        console.error('Error adding device to Supabase:', error);
        toast({
          title: "Erro ao adicionar dispositivo",
          description: "Não foi possível salvar no banco de dados, mas foi salvo localmente.",
          variant: "destructive",
        });
        
        // Fallback to localStorage
        const updatedDevices = [...devices, newDevice];
        setDevices(updatedDevices);
        localStorage.setItem(`devices_${user.id}`, JSON.stringify(updatedDevices));
      } else {
        // If Supabase succeeds, add the returned device with its DB ID
        const formattedDevice = {
          id: data.id,
          name: data.name,
          type: data.type,
          consumption: data.consumption,
          status: data.status,
          lastActivity: data.lastActivity,
          powerState: data.powerState,
          location: data.location,
          userId: data.user_id
        };
        
        setDevices(prev => [...prev, formattedDevice]);
        
        // Update localStorage backup
        localStorage.setItem(`devices_${user.id}`, JSON.stringify([...devices, formattedDevice]));
      }
    } catch (err) {
      console.error('Failed to add device:', err);
    }
  };

  // Toggle device power state
  const toggleDevicePower = async (id: string) => {
    if (!user) return;

    const deviceIndex = devices.findIndex(d => d.id === id);
    if (deviceIndex === -1) return;
    
    const updatedDevice = {
      ...devices[deviceIndex],
      powerState: !devices[deviceIndex].powerState,
      lastActivity: 'Agora'
    };
    
    const updatedDevices = [...devices];
    updatedDevices[deviceIndex] = updatedDevice;
    
    // Update state first for immediate UI feedback
    setDevices(updatedDevices);
    
    try {
      // Update in Supabase
      const { error } = await supabase
        .from('devices')
        .update({ 
          powerState: updatedDevice.powerState,
          lastActivity: 'Agora'
        })
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error updating device in Supabase:', error);
        // Fallback to localStorage
        localStorage.setItem(`devices_${user.id}`, JSON.stringify(updatedDevices));
      }
    } catch (err) {
      console.error('Failed to update device:', err);
      localStorage.setItem(`devices_${user.id}`, JSON.stringify(updatedDevices));
    }
  };

  // Remove a device
  const removeDevice = async (id: string) => {
    if (!user) return;
    
    try {
      // Delete from Supabase
      const { error } = await supabase
        .from('devices')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error removing device from Supabase:', error);
      }
      
      // Update state regardless of Supabase result
      const updatedDevices = devices.filter(device => device.id !== id);
      setDevices(updatedDevices);
      
      // Update localStorage
      localStorage.setItem(`devices_${user.id}`, JSON.stringify(updatedDevices));
    } catch (err) {
      console.error('Failed to remove device:', err);
    }
  };

  // Load devices when component mounts or user changes
  useEffect(() => {
    fetchDevices();
  }, [user?.id]);

  return {
    devices,
    isLoading,
    addDevice,
    toggleDevicePower,
    removeDevice,
    fetchDevices
  };
};
