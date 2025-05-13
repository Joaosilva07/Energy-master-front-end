
import React from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import { Device } from '@/types/device.types';

interface DeviceStatusListProps {
  devices: Device[];
  deviceStatus: Record<string, { online: boolean, lastSeen: string }>;
}

const DeviceStatusList: React.FC<DeviceStatusListProps> = ({
  devices,
  deviceStatus
}) => {
  if (devices.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">Nenhum dispositivo cadastrado</p>
    );
  }
  
  return (
    <ul className="space-y-2">
      {devices.map(device => (
        <li key={device.id} className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            {deviceStatus[device.id]?.online ? (
              <Wifi className="h-4 w-4 text-green-500 mr-2" />
            ) : (
              <WifiOff className="h-4 w-4 text-gray-400 mr-2" />
            )}
            <span>{device.name}</span>
          </div>
          <span className={`text-xs ${device.powerState ? 'text-green-500' : 'text-gray-500'}`}>
            {device.powerState ? 'Ligado' : 'Desligado'}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default DeviceStatusList;
