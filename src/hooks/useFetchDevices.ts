
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
  const [devices, setDevices] = useState<Device[]>([]);
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
      setDevices([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Load devices when component mounts or user changes
  useEffect(() => {
    fetchDevices();
  }, [user?.id]);

  return {
    devices,
    isLoading,
    fetchDevices,
    setDevices
  };
};
