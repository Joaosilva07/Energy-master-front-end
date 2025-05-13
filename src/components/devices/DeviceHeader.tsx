
import React from 'react';
import { Plus, RefreshCw, Cloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCloudConnection } from '@/hooks/useCloudConnection';

interface DeviceHeaderProps {
  onRefresh: () => void;
  onAddDevice: () => void;
  onOpenAlexa: () => void;
  lastUpdated: Date;
  cloudConnection: {
    isConnected: boolean;
    lastSyncTime?: Date;
  };
}

const DeviceHeader: React.FC<DeviceHeaderProps> = ({
  onRefresh,
  onAddDevice,
  onOpenAlexa,
  lastUpdated,
  cloudConnection
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dispositivos</h1>
          <p className="text-muted-foreground">
            Gerencie seus dispositivos conectados
            <span className="text-xs ml-2">
              Última atualização: {lastUpdated.toLocaleTimeString()}
            </span>
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={onRefresh}
            className="flex items-center gap-1"
          >
            <RefreshCw className="h-4 w-4" />
            Atualizar
          </Button>
          <Button 
            variant={cloudConnection.isConnected ? "secondary" : "outline"}
            onClick={onOpenAlexa}
            className={cloudConnection.isConnected 
              ? "bg-purple-600 text-white hover:bg-purple-700" 
              : "bg-purple-100 text-purple-700 hover:bg-purple-200"
            }
          >
            {cloudConnection.isConnected ? "Alexa Conectada" : "Conectar Alexa"}
          </Button>
          <Button 
            className="bg-energy-primary hover:bg-energy-primary/90"
            onClick={onAddDevice}
          >
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Dispositivo
          </Button>
        </div>
      </div>
      
      {cloudConnection.isConnected && (
        <div className="mt-2 p-2 bg-green-50 border border-green-100 rounded-md text-sm text-green-700 flex items-center">
          <Cloud className="h-4 w-4 mr-2" />
          Monitoramento em nuvem ativo | Última sincronização: {cloudConnection.lastSyncTime?.toLocaleTimeString() || 'N/A'}
        </div>
      )}
    </div>
  );
};

export default DeviceHeader;
