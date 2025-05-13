
import React from 'react';
import { Tv, Laptop, Fan, Radio, Power, Trash2 } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Device } from '@/hooks/useDevices';

// Mapeamento de tipos de dispositivos para seus ícones
export const deviceIcons = {
  tv: <Tv className="h-5 w-5" />,
  refrigerator: <Radio className="h-5 w-5" />,
  ac: <Fan className="h-5 w-5" />,
  computer: <Laptop className="h-5 w-5" />,
  washer: <Fan className="h-5 w-5" />,
  microwave: <Radio className="h-5 w-5" />,
};

type DeviceIconsKey = keyof typeof deviceIcons;

interface DeviceCardProps {
  device: Device;
  onTogglePower: (id: string) => void;
  onRemove: (id: string) => void;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ device, onTogglePower, onRemove }) => {
  const icon = deviceIcons[device.type as DeviceIconsKey] || <Tv className="h-5 w-5" />;
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`rounded-lg p-2 ${device.status === 'online' ? 'bg-green-100' : 'bg-gray-100'}`}>
              {icon}
            </div>
            <div>
              <h3 className="font-medium">{device.name}</h3>
              <div className="flex items-center gap-2">
                <span
                  className={`h-2 w-2 rounded-full ${
                    device.status === 'online' ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                />
                <span className="text-sm text-muted-foreground capitalize">{device.status}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onTogglePower(device.id)}
              className={device.powerState ? 'text-green-500' : 'text-gray-400'}
            >
              <Power className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => onRemove(device.id)}
              className="text-red-500 hover:bg-red-50"
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Consumo</span>
            <span className="font-medium">{device.consumption} kWh/mês</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Última atividade</span>
            <span>{device.lastActivity}</span>
          </div>
          {device.location && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Local</span>
              <span>{device.location}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DeviceCard;
