
import React from 'react';
import { Device } from '@/types/device.types';
import DeviceStatusList from './DeviceStatusList';

interface ConnectedDevicesProps {
  devices: Device[];
  deviceStatus: Record<string, { online: boolean, lastSeen: string }>;
}

const ConnectedDevices: React.FC<ConnectedDevicesProps> = ({
  devices,
  deviceStatus
}) => {
  return (
    <div className="mt-4 border rounded-lg p-3">
      <p className="text-sm font-medium mb-2">Dispositivos conectados</p>
      <div className="max-h-40 overflow-y-auto">
        <DeviceStatusList devices={devices} deviceStatus={deviceStatus} />
      </div>
    </div>
  );
};

export default ConnectedDevices;
