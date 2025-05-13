
import React from 'react';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface CloudMonitoringProps {
  cloudEnabled: boolean;
  onCloudEnabledChange: (enabled: boolean) => void;
}

const CloudMonitoring: React.FC<CloudMonitoringProps> = ({
  cloudEnabled,
  onCloudEnabledChange
}) => {
  return (
    <div className="flex flex-col space-y-1.5">
      <div className="flex items-center justify-between">
        <Label htmlFor="cloud-monitoring">Monitoramento em tempo real</Label>
        <Switch 
          id="cloud-monitoring" 
          checked={cloudEnabled}
          onCheckedChange={onCloudEnabledChange}
        />
      </div>
      <p className="text-sm text-muted-foreground">
        {cloudEnabled 
          ? "Os dispositivos estão sendo monitorados em tempo real" 
          : "O monitoramento em tempo real está desativado"}
      </p>
    </div>
  );
};

export default CloudMonitoring;
