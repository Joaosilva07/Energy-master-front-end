
import { useState, useEffect } from 'react';
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
  const { devices, isLoading, fetchDevices, setDevices } = useFetchDevices();
  const { addDevice } = useAddDevice(devices, setDevices);
  const { toggleDevicePower } = useToggleDevicePower(devices, setDevices);
  const { removeDevice } = useRemoveDevice(devices, setDevices);
  const { toast } = useToast();

  // Atualiza os dispositivos globais quando os dispositivos locais mudarem
  useEffect(() => {
    if (devices && devices.length > 0) {
      globalDevices = [...devices];
    }
  }, [devices]);

  // Recupera os dispositivos globais quando o componente monta
  useEffect(() => {
    if (globalDevices.length > 0 && (!devices || devices.length === 0)) {
      setDevices(globalDevices);
    }
  }, []);

  // Adiciona função para atualizar o status em tempo real
  const updateDeviceStatus = (id: string, status: boolean) => {
    setDevices(prevDevices => {
      const updatedDevices = prevDevices.map(device => 
        device.id === id ? {...device, powerState: status, lastActivity: 'Agora'} : device
      );
      
      // Atualiza também os dispositivos globais
      globalDevices = [...updatedDevices];
      
      return updatedDevices;
    });
    
    // Notifica o usuário sobre a mudança de status
    toast({
      title: status ? "Dispositivo ligado" : "Dispositivo desligado",
      description: `O dispositivo foi ${status ? "ligado" : "desligado"} com sucesso.`
    });
  };

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
