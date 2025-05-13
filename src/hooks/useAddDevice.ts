
import { useCallback } from 'react';
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

  const addDevice = useCallback(async (device: Device) => {
    if (!user) return;
    
    try {
      // Generate a local ID while waiting for the DB
      const localId = `local_${Date.now()}`;
      
      // Ensure device has the correct user ID
      const newDevice = {
        ...device,
        id: localId,
        userId: user.id,
        activatedAt: device.powerState ? new Date().toISOString() : null
      };
      
      // Update state first for immediate UI feedback
      const updatedDevices = [...devices, newDevice];
      setDevices(updatedDevices);
      
      // Show success message immediately
      toast({
        title: "Dispositivo adicionado",
        description: `${device.name} foi adicionado com sucesso.`,
        duration: 2000,
      });
      
      // Try to insert into Supabase
      const { data, error } = await addDeviceToSupabase(newDevice);
      
      if (error) {
        console.error('Error adding device to Supabase:', error);
        toast({
          title: "Erro ao salvar no banco",
          description: "Dispositivo foi salvo apenas localmente.",
          variant: "destructive",
          duration: 3000,
        });
        
        // Save to localStorage anyway
        saveDevicesToLocalStorage(user.id, updatedDevices);
      } else {
        // If Supabase succeeds, replace the local device with the returned one that has a proper DB ID
        const formattedDevice = formatDeviceFromSupabase(data);
        
        setDevices(prevDevices => 
          prevDevices.map(d => d.id === localId ? formattedDevice : d)
        );
        
        // Update localStorage backup with the correct DB ID
        saveDevicesToLocalStorage(user.id, devices.map(d => 
          d.id === localId ? formattedDevice : d
        ));
      }
    } catch (err) {
      console.error('Failed to add device:', err);
    }
  }, [devices, setDevices, toast, user]);

  return { addDevice };
};
