
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DeviceTabContent from './DeviceTabContent';
import { Device } from '@/types/device.types';

interface DeviceTabsProps {
  devices: Device[];
  onTogglePower: (id: string) => void;
  onRemove: (id: string) => void;
  cloudConnected: boolean;
}

const DeviceTabs: React.FC<DeviceTabsProps> = ({
  devices,
  onTogglePower,
  onRemove,
  cloudConnected
}) => {
  return (
    <Tabs defaultValue="todos" className="w-full">
      <TabsList>
        <TabsTrigger value="todos">Todos</TabsTrigger>
        <TabsTrigger value="ativos">Ativos</TabsTrigger>
        <TabsTrigger value="inativos">Inativos</TabsTrigger>
      </TabsList>

      <TabsContent value="todos" className="mt-6">
        <DeviceTabContent 
          devices={devices}
          onTogglePower={onTogglePower}
          onRemove={onRemove}
          cloudConnected={cloudConnected}
        />
      </TabsContent>
      
      <TabsContent value="ativos">
        <DeviceTabContent 
          devices={devices}
          onTogglePower={onTogglePower}
          onRemove={onRemove}
          cloudConnected={cloudConnected}
          filter={(device) => device.powerState}
        />
      </TabsContent>
      
      <TabsContent value="inativos">
        <DeviceTabContent 
          devices={devices}
          onTogglePower={onTogglePower}
          onRemove={onRemove}
          cloudConnected={cloudConnected}
          filter={(device) => !device.powerState}
        />
      </TabsContent>
    </Tabs>
  );
};

export default DeviceTabs;
