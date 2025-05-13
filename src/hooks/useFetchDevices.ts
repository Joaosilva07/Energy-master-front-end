
import { useState, useEffect } from 'react';
import { useUser } from '@/contexts/UserContext';
import { Device } from '@/types/device.types';
import { 
  fetchDevicesFromSupabase, 
  formatDeviceFromSupabase, 
  loadDevicesFromLocalStorage, 
  saveDevicesToLocalStorage 
} from '@/lib/deviceUtils';

export const useFetchDevices = () => {
  const { user } = useUser();
  const [devices, setDevices] = useState<Device[]>(() => {
    // Inicializar do localStorage durante a montagem do componente
    if (user) {
      return loadDevicesFromLocalStorage(user.id);
    }
    return [];
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchDevices = async () => {
    if (!user) {
      setDevices([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      // Try to fetch from Supabase
      const { data, error } = await fetchDevicesFromSupabase(user.id);

      if (error) {
        console.error('Error fetching devices from Supabase:', error);
        
        // Fallback to localStorage if Supabase fails
        const localDevices = loadDevicesFromLocalStorage(user.id);
        setDevices(localDevices);
      } else {
        // Convert Supabase data format to our Device format
        const formattedDevices = data.map(formatDeviceFromSupabase);
        setDevices(formattedDevices);
        
        // Update localStorage as backup
        saveDevicesToLocalStorage(user.id, formattedDevices);
      }
    } catch (err) {
      console.error('Failed to fetch devices:', err);
      // Em caso de erro, tente usar dados do localStorage
      if (user) {
        const localDevices = loadDevicesFromLocalStorage(user.id);
        setDevices(localDevices);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Load devices when component mounts or user changes
  useEffect(() => {
    if (user) {
      fetchDevices();
    }
  }, [user?.id]);

  // Sempre que os dispositivos mudarem, salve no localStorage
  useEffect(() => {
    if (user && devices.length > 0) {
      saveDevicesToLocalStorage(user.id, devices);
    }
  }, [devices, user]);

  return {
    devices,
    isLoading,
    fetchDevices,
    setDevices
  };
};
