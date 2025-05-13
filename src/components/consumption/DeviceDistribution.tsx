
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Fan, Radio, Tv, Laptop } from 'lucide-react';
import { useDevices } from '@/hooks/useDevices';
import { Device } from '@/types/device.types';

const DeviceDistribution = () => {
  const { devices } = useDevices();
  
  const generateDeviceDistribution = (devices: Device[]) => {
    if (!devices.length) return [];
    
    const totalConsumption = devices.reduce((sum, device) => sum + device.consumption, 0);
    
    return devices.map(device => {
      const percentage = Math.round((device.consumption / totalConsumption) * 100);
      return {
        name: device.name,
        percentage: percentage,
        type: device.type,
      };
    }).sort((a, b) => b.percentage - a.percentage).slice(0, 4); // Top 4 dispositivos
  };
  
  // Function to get the icon based on device type
  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'tv':
        return <Tv className="h-5 w-5" />;
      case 'refrigerator':
        return <Radio className="h-5 w-5" />;
      case 'ac':
        return <Fan className="h-5 w-5" />;
      case 'computer':
        return <Laptop className="h-5 w-5" />;
      default:
        return <Fan className="h-5 w-5" />;
    }
  };
  
  const deviceDistribution = generateDeviceDistribution(devices);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribuição por Dispositivo</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {deviceDistribution.map((device, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getDeviceIcon(device.type)}
                <span>{device.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">{device.percentage}%</span>
                <div className="w-32 h-2 rounded-full bg-muted overflow-hidden">
                  <div 
                    className="h-full bg-energy-primary"
                    style={{ width: `${device.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DeviceDistribution;
