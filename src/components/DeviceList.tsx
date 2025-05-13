
import React from 'react';
import DeviceCard from './DeviceCard';
import { Device } from '@/hooks/useDevices';

interface DeviceListProps {
  devices: Device[];
  onTogglePower: (id: string) => void;
  onRemove: (id: string) => void;
  cloudConnected?: boolean;
}

const DeviceList: React.FC<DeviceListProps> = ({ 
  devices, 
  onTogglePower, 
  onRemove,
  cloudConnected = false
}) => {
  if (devices.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">Nenhum dispositivo encontrado.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {devices.map((device) => (
        <DeviceCard 
          key={device.id} 
          device={device} 
          onTogglePower={onTogglePower}
          onRemove={onRemove}
          cloudConnected={cloudConnected}
        />
      ))}
    </div>
  );
};

export default DeviceList;
