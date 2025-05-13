
import { useUser } from '@/contexts/UserContext';
import { Device } from '@/types/device.types';
import { 
  updateDeviceInSupabase, 
  saveDevicesToLocalStorage 
} from '@/lib/deviceUtils';

export const useToggleDevicePower = (
  devices: Device[], 
  setDevices: React.Dispatch<React.SetStateAction<Device[]>>
) => {
  const { user } = useUser();

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
      const { error } = await updateDeviceInSupabase(id, user.id, { 
        powerState: updatedDevice.powerState,
        lastActivity: 'Agora'
      });

      if (error) {
        console.error('Error updating device in Supabase:', error);
        // Fallback to localStorage
        saveDevicesToLocalStorage(user.id, updatedDevices);
      }
    } catch (err) {
      console.error('Failed to update device:', err);
      saveDevicesToLocalStorage(user.id, updatedDevices);
    }
  };

  return { toggleDevicePower };
};
