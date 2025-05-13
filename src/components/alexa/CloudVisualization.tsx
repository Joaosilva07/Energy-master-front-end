
import React from 'react';
import { Cloud } from 'lucide-react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Device } from '@/types/device.types';

interface CloudVisualizationProps {
  devices: Device[];
}

const CloudVisualization: React.FC<CloudVisualizationProps> = ({
  devices
}) => {
  return (
    <AspectRatio ratio={16/9} className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
      <div className="flex items-center justify-center h-full">
        <div className="text-center p-4">
          <Cloud className="h-10 w-10 mx-auto mb-2 text-green-500" />
          <p className="text-sm font-medium">Dispositivos conectados à nuvem</p>
          <p className="text-xs text-muted-foreground mt-1">
            {devices.length} {devices.length === 1 ? 'dispositivo' : 'dispositivos'} ativos
          </p>
        </div>
      </div>
    </AspectRatio>
  );
};

export default CloudVisualization;
