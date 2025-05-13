
import React from 'react';
import { Tv, Laptop, Fan, ChevronRight, Radio } from 'lucide-react';
import { useDevices } from '@/hooks/useDevices';
import { useUser } from '@/contexts/UserContext';
import { Link } from 'react-router-dom';

const DeviceMonitoring = () => {
  const { devices, isLoading } = useDevices();
  const { user } = useUser();

  // If user is not logged in or devices are loading, show skeleton or placeholder
  if (!user || isLoading) {
    return (
      <div className="rounded-lg border bg-card p-5">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Dispositivos</h3>
          <p className="text-sm text-muted-foreground">Monitoramento de consumo por dispositivo</p>
        </div>
        <div className="flex items-center justify-center py-8">
          <p className="text-muted-foreground">Carregando dispositivos...</p>
        </div>
      </div>
    );
  }

  // If there are no devices, show an empty state with call to action
  if (devices.length === 0) {
    return (
      <div className="rounded-lg border bg-card p-5">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Dispositivos</h3>
          <p className="text-sm text-muted-foreground">Monitoramento de consumo por dispositivo</p>
        </div>
        <div className="flex flex-col items-center justify-center py-8 space-y-4">
          <p className="text-muted-foreground text-center">Você ainda não possui dispositivos cadastrados.</p>
          <Link to="/dispositivos" className="text-sm text-energy-primary hover:underline flex items-center">
            Adicionar dispositivos
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Dispositivos</h3>
          <p className="text-sm text-muted-foreground">Monitoramento de consumo por dispositivo</p>
        </div>
        <Link to="/dispositivos" className="text-sm text-energy-primary hover:underline">Ver todos</Link>
      </div>
      <div className="space-y-4">
        {/* Mostrar os 3 primeiros dispositivos na dashboard */}
        {devices.slice(0, 3).map((device) => (
          <div
            key={device.id}
            className="flex items-center justify-between rounded-md border p-3 hover:bg-muted/20"
          >
            <div className="flex items-center gap-3">
              <div
                className={`rounded-md p-2 ${
                  device.status === 'online' ? 'bg-green-100' : 'bg-gray-100'
                }`}
              >
                {getDeviceIcon(device.type)}
              </div>
              <div>
                <h4 className="font-medium">{device.name}</h4>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{device.consumption} kWh/mês</span>
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      device.status === 'online' ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  ></span>
                  <span className="text-xs text-muted-foreground capitalize">{device.status}</span>
                </div>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
        ))}
        
        {/* Mostrar link para ver mais se houver mais de 3 dispositivos */}
        {devices.length > 3 && (
          <Link 
            to="/dispositivos" 
            className="text-center block w-full text-sm text-energy-primary hover:underline pt-2"
          >
            Ver mais {devices.length - 3} dispositivos
          </Link>
        )}
      </div>
    </div>
  );
};

// Helper function to get the icon based on device type
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
      return <Tv className="h-5 w-5" />;
  }
};

export default DeviceMonitoring;
