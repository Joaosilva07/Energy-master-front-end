
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

  return {
    devices,
    isLoading,
    addDevice,
    toggleDevicePower,
    removeDevice,
    fetchDevices
  };
};
