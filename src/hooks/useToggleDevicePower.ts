
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
    
    const updatedDevice = {
      ...devices[deviceIndex],
      powerState: !devices[deviceIndex].powerState,
      lastActivity: 'Agora',
      // Atualizando o status para refletir a mudança de energia
      status: !devices[deviceIndex].powerState ? 'online' : 'offline'
    };
    
    const updatedDevices = [...devices];
    updatedDevices[deviceIndex] = updatedDevice;
    
    // Update state first for immediate UI feedback
    setDevices(updatedDevices);
    
    toast({
      title: updatedDevice.powerState ? "Dispositivo ligado" : "Dispositivo desligado",
      description: `${updatedDevice.name} foi ${updatedDevice.powerState ? 'ligado' : 'desligado'} com sucesso.`,
    });
    
    try {
      // Update in Supabase
      const { error } = await updateDeviceInSupabase(id, user.id, { 
        powerState: updatedDevice.powerState,
        lastActivity: 'Agora',
        status: updatedDevice.status
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
