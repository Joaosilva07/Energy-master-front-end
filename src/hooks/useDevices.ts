
import { useState, useEffect, useCallback } from 'react';
import { useFetchDevices } from './useFetchDevices';
import { useAddDevice } from './useAddDevice';
import { useToggleDevicePower } from './useToggleDevicePower';
import { useRemoveDevice } from './useRemoveDevice';
import { Device } from '@/types/device.types';
import { useToast } from '@/components/ui/use-toast';

export type { Device };

// Criamos um estado global para manter os dispositivos em memória entre navegações
let globalDevices: Device[] = [];

export const useDevices = () => {
  const { devices, isLoading, fetchDevices, setDevices, saveDevices } = useFetchDevices();
  const { addDevice } = useAddDevice(devices, setDevices);
  const { toggleDevicePower } = useToggleDevicePower(devices, setDevices);
  const { removeDevice } = useRemoveDevice(devices, setDevices);
  const { toast } = useToast();
  const [lastSaved, setLastSaved] = useState<number>(0);

  // Atualiza os dispositivos globais quando os dispositivos locais mudarem (menos frequentemente)
  useEffect(() => {
    if (devices && devices.length > 0 && lastSaved !== devices.length) {
      globalDevices = [...devices];
      setLastSaved(devices.length);
    }
  }, [devices.length, lastSaved]);

  // Recupera os dispositivos globais quando o componente monta
  useEffect(() => {
    if (globalDevices.length > 0 && (!devices || devices.length === 0)) {
      setDevices(globalDevices);
    }
  }, []);

  // Adiciona função para atualizar o status em tempo real - com otimização
  const updateDeviceStatus = useCallback((id: string, status: boolean) => {
    setDevices(prevDevices => {
      const updatedDevices = prevDevices.map(device => 
        device.id === id ? {
          ...device, 
          powerState: status, 
          lastActivity: 'Agora',
          activatedAt: status ? new Date().toISOString() : null,
          status: status ? 'online' : 'offline'
        } : device
      );
      
      // Atualiza também os dispositivos globais
      globalDevices = [...updatedDevices];
      
      return updatedDevices;
    });
    
    // Notifica o usuário sobre a mudança de status
    toast({
      title: status ? "Dispositivo ligado" : "Dispositivo desligado",
      description: `O dispositivo foi ${status ? "ligado" : "desligado"} com sucesso.`,
      duration: 2000,
    });
  }, [setDevices, toast]);

  return {
    devices,
    isLoading,
    addDevice,
    toggleDevicePower,
    removeDevice,
    fetchDevices,
    updateDeviceStatus
  };
};
