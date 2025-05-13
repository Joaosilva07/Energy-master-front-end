
import { useUser } from '@/contexts/UserContext';
import { Device } from '@/types/device.types';
import { useToast } from "@/components/ui/use-toast";
import { 
  addDeviceToSupabase, 
  formatDeviceFromSupabase, 
  saveDevicesToLocalStorage 
} from '@/lib/deviceUtils';

export const useAddDevice = (
  devices: Device[], 
  setDevices: React.Dispatch<React.SetStateAction<Device[]>>
) => {
  const { user } = useUser();
  const { toast } = useToast();

  const addDevice = async (device: Device) => {
    if (!user) return;
    
    try {
      // Ensure device has the correct user ID
      const newDevice = {
        ...device,
        userId: user.id
      };
      
      // Try to insert into Supabase
      const { data, error } = await addDeviceToSupabase(newDevice);

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
        saveDevicesToLocalStorage(user.id, updatedDevices);
      } else {
        // If Supabase succeeds, add the returned device with its DB ID
        const formattedDevice = formatDeviceFromSupabase(data);
        
        const updatedDevices = [...devices, formattedDevice];
        setDevices(updatedDevices);
        
        // Update localStorage backup
        saveDevicesToLocalStorage(user.id, updatedDevices);
      }
    } catch (err) {
      console.error('Failed to add device:', err);
    }
  };

  return { addDevice };
};
