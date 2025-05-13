
import { useUser } from '@/contexts/UserContext';
import { Device } from '@/types/device.types';
import { 
  updateDeviceInSupabase, 
  saveDevicesToLocalStorage 
} from '@/lib/deviceUtils';
import { useToast } from "@/components/ui/use-toast";

export const useToggleDevicePower = (
  devices: Device[], 
  setDevices: React.Dispatch<React.SetStateAction<Device[]>>
) => {
  const { user } = useUser();
  const { toast } = useToast();

  const toggleDevicePower = async (id: string) => {
    if (!user) return;

    const deviceIndex = devices.findIndex(d => d.id === id);
    if (deviceIndex === -1) return;
    
    // Get current state and toggle it
    const currentDevice = devices[deviceIndex];
    const newPowerState = !currentDevice.powerState;
    
    const updatedDevice = {
      ...currentDevice,
      powerState: newPowerState,
      lastActivity: 'Agora',
      // Update activation timestamp when turning on
      activatedAt: newPowerState ? new Date().toISOString() : null,
      // Updating status to reflect power change
      status: newPowerState ? 'online' : 'offline'
    };
    
    const updatedDevices = [...devices];
    updatedDevices[deviceIndex] = updatedDevice;
    
    // Update state first for immediate UI feedback
    setDevices(updatedDevices);
    
    // Show a toast but don't wait for it
    toast({
      title: updatedDevice.powerState ? "Dispositivo ligado" : "Dispositivo desligado",
      description: `${updatedDevice.name} foi ${updatedDevice.powerState ? 'ligado' : 'desligado'} com sucesso.`,
      duration: 2000, // Reduce duration to 2 seconds
    });
    
    try {
      // Only include fields we're sure exist in the database schema
      const updateData: Record<string, any> = { 
        powerState: updatedDevice.powerState,
        lastActivity: 'Agora',
        status: updatedDevice.status
      };
      
      // Try to update with activatedAt field
      const { error } = await updateDeviceInSupabase(id, user.id, updateData);

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
