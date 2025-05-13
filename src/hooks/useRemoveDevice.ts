
import { useUser } from '@/contexts/UserContext';
import { Device } from '@/types/device.types';
import { 
  removeDeviceFromSupabase, 
  saveDevicesToLocalStorage 
} from '@/lib/deviceUtils';
import { useToast } from '@/components/ui/use-toast';

export const useRemoveDevice = (
  devices: Device[], 
  setDevices: React.Dispatch<React.SetStateAction<Device[]>>
) => {
  const { user } = useUser();
  const { toast } = useToast();

  const removeDevice = async (id: string) => {
    if (!user) return;
    
    try {
      // Delete from Supabase
      const { error } = await removeDeviceFromSupabase(id, user.id);

      if (error) {
        console.error('Error removing device from Supabase:', error);
      }
      
      // Update state regardless of Supabase result
      const deviceToRemove = devices.find(d => d.id === id);
      const updatedDevices = devices.filter(device => device.id !== id);
      setDevices(updatedDevices);
      
      // Update localStorage
      saveDevicesToLocalStorage(user.id, updatedDevices);
      
      // Notificar o usuário
      toast({
        title: "Dispositivo removido",
        description: deviceToRemove ? 
          `O dispositivo "${deviceToRemove.name}" foi removido com sucesso.` : 
          "O dispositivo foi removido com sucesso."
      });
    } catch (err) {
      console.error('Failed to remove device:', err);
      toast({
        title: "Erro ao remover dispositivo",
        description: "Ocorreu um erro ao remover o dispositivo. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  return { removeDevice };
};
