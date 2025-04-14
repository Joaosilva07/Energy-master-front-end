
import React from 'react';
import { Tv, Laptop, Fan, ChevronRight, Radio } from 'lucide-react';

const devices = [
  {
    name: 'Televisão - Sala',
    icon: <Tv className="h-5 w-5" />,
    consumption: 45,
    status: 'online',
  },
  {
    name: 'Refrigerador',
    icon: <Radio className="h-5 w-5" />,
    consumption: 120,
    status: 'online',
  },
  {
    name: 'Condicionador de Ar',
    icon: <Fan className="h-5 w-5" />,
    consumption: 180,
    status: 'online',
  },
  {
    name: 'Computador',
    icon: <Laptop className="h-5 w-5" />,
    consumption: 60,
    status: 'offline',
  },
];

const DeviceMonitoring = () => {
  return (
    <div className="rounded-lg border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Dispositivos</h3>
          <p className="text-sm text-muted-foreground">Monitoramento de consumo por dispositivo</p>
        </div>
        <button className="text-sm text-energy-primary hover:underline">Ver todos</button>
      </div>
      <div className="space-y-4">
        {devices.map((device, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-md border p-3 hover:bg-muted/20"
          >
            <div className="flex items-center gap-3">
              <div
                className={`rounded-md p-2 ${
                  device.status === 'online' ? 'bg-green-100' : 'bg-gray-100'
                }`}
              >
                {device.icon}
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
      </div>
    </div>
  );
};

export default DeviceMonitoring;
