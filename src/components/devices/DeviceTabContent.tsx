
import React from 'react';
import DeviceList from '@/components/DeviceList';
import { Device } from '@/types/device.types';

interface DeviceTabContentProps {
  devices: Device[];
  onTogglePower: (id: string) => void;
  onRemove: (id: string) => void;
  cloudConnected: boolean;
  filter?: (device: Device) => boolean;
}

const DeviceTabContent: React.FC<DeviceTabContentProps> = ({
  devices,
  onTogglePower,
  onRemove,
  cloudConnected,
  filter
}) => {
  // Apply filter if provided, otherwise use all devices
  const filteredDevices = filter ? devices.filter(filter) : devices;
  
  return (
    <DeviceList 
      devices={filteredDevices}
      onTogglePower={onTogglePower}
      onRemove={onRemove}
      cloudConnected={cloudConnected}
    />
  );
};

export default DeviceTabContent;
