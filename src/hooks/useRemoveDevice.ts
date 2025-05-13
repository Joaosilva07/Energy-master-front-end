
import { useUser } from '@/contexts/UserContext';
import { Device } from '@/types/device.types';
import { 
  removeDeviceFromSupabase, 
  saveDevicesToLocalStorage 
} from '@/lib/deviceUtils';

export const useRemoveDevice = (
  devices: Device[], 
  setDevices: React.Dispatch<React.SetStateAction<Device[]>>
) => {
  const { user } = useUser();

  const removeDevice = async (id: string) => {
    if (!user) return;
    
    try {
      // Delete from Supabase
      const { error } = await removeDeviceFromSupabase(id, user.id);

      if (error) {
        console.error('Error removing device from Supabase:', error);
      }
      
      // Update state regardless of Supabase result
      const updatedDevices = devices.filter(device => device.id !== id);
      setDevices(updatedDevices);
      
      // Update localStorage
      saveDevicesToLocalStorage(user.id, updatedDevices);
    } catch (err) {
      console.error('Failed to remove device:', err);
    }
  };

  return { removeDevice };
};
