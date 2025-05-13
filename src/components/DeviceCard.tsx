
import React from 'react';
import { Tv, Laptop, Fan, Radio, Power, Trash2, CloudOff, Cloud } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Device } from '@/hooks/useDevices';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
  cloudConnected?: boolean;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ 
  device, 
  onTogglePower, 
  onRemove,
  cloudConnected = false
}) => {
  const icon = deviceIcons[device.type as DeviceIconsKey] || <Tv className="h-5 w-5" />;
  
  // Calcula um tempo ativo aleatório para demonstração (em uma aplicação real, isso viria do backend)
  const getActiveTime = () => {
    if (!device.powerState) return null;
    
    const hours = Math.floor(Math.random() * 5) + 1;
    const minutes = Math.floor(Math.random() * 60);
    return { hours, minutes };
  };
  
  const activeTime = getActiveTime();
  
  // Calcula o consumo estimado baseado no tempo ativo
  const calculateEstimatedUsage = () => {
    if (!activeTime || !device.powerState) return null;
    
    // Consumo mensal dividido por 30 dias e 24 horas para obter consumo por hora
    const hourlyConsumption = device.consumption / (30 * 24);
    
    // Consumo baseado no tempo ativo
    const consumption = hourlyConsumption * (activeTime.hours + activeTime.minutes / 60);
    
    return consumption.toFixed(2);
  };
  
  const estimatedUsage = calculateEstimatedUsage();
  
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
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className={`h-8 w-8 rounded-full border-none ${
                      cloudConnected ? 'bg-green-50' : 'bg-gray-50'
                    }`}
                  >
                    {cloudConnected ? 
                      <Cloud className="h-4 w-4 text-green-500" /> : 
                      <CloudOff className="h-4 w-4 text-gray-400" />
                    }
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{cloudConnected ? 'Monitoramento Alexa ativo' : 'Sem integração com Alexa'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
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
          {device.powerState && (
            <>
              <div className="mt-3 pt-2 border-t border-gray-100">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tempo ativo</span>
                  <span className="font-medium text-green-600">
                    {activeTime?.hours}h {activeTime?.minutes} min
                  </span>
                </div>
              </div>
              {estimatedUsage && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Consumo atual</span>
                  <span className="font-medium text-amber-600">
                    {estimatedUsage} kWh
                  </span>
                </div>
              )}
              {cloudConnected && (
                <div className="mt-2 bg-green-50 p-2 rounded-md text-xs text-green-600 flex items-center justify-center">
                  <Cloud className="h-3 w-3 mr-1" />
                  Monitorando em tempo real
                </div>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DeviceCard;
