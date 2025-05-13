
import { useState, useEffect } from 'react';
import { useFetchDevices } from './useFetchDevices';
import { useAddDevice } from './useAddDevice';
import { useToggleDevicePower } from './useToggleDevicePower';
import { useRemoveDevice } from './useRemoveDevice';
import { Device } from '@/types/device.types';

export type { Device };

export const useDevices = () => {
  const { devices, isLoading, fetchDevices, setDevices } = useFetchDevices();
  const { addDevice } = useAddDevice(devices, setDevices);
  const { toggleDevicePower } = useToggleDevicePower(devices, setDevices);
  const { removeDevice } = useRemoveDevice(devices, setDevices);

  // Adiciona função para atualizar o status em tempo real
  const updateDeviceStatus = (id: string, status: boolean) => {
    setDevices(prevDevices => 
      prevDevices.map(device => 
        device.id === id ? {...device, powerState: status, lastActivity: 'Agora'} : device
      )
    );
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
