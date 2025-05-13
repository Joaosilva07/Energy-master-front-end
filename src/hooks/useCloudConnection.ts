
import { useState, useEffect } from 'react';
import { Device } from '@/types/device.types';
import { useToast } from '@/components/ui/use-toast';

interface CloudConnectionOptions {
  enabled: boolean;
  refreshInterval?: number;
  onDeviceUpdate?: (deviceId: string, newPowerState: boolean) => void;
}

export function useCloudConnection(devices: Device[], options: CloudConnectionOptions) {
  const [isConnected, setIsConnected] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
  const [deviceStates, setDeviceStates] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  // Inicializa os estados dos dispositivos
  useEffect(() => {
    if (devices.length > 0) {
      const states: Record<string, boolean> = {};
      devices.forEach(device => {
        states[device.id] = device.powerState;
      });
      setDeviceStates(states);
    }
  }, [devices]);

  // Conectar à nuvem quando habilitado
  useEffect(() => {
    if (!options.enabled) {
      setIsConnected(false);
      return;
    }

    const connectToCloud = async () => {
      console.log("Conectando à nuvem...");
      
      try {
        // Simula um delay de conexão
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setIsConnected(true);
        setLastSyncTime(new Date());
        
        toast({
          title: "Conexão com a nuvem estabelecida",
          description: "Seus dispositivos estão sendo monitorados em tempo real",
        });
      } catch (error) {
        console.error("Erro ao conectar à nuvem:", error);
        setIsConnected(false);
        
        toast({
          title: "Erro de conexão",
          description: "Não foi possível conectar à nuvem. Tente novamente.",
          variant: "destructive",
        });
      }
    };

    connectToCloud();

    return () => {
      console.log("Desconectando da nuvem...");
      setIsConnected(false);
    };
  }, [options.enabled, toast]);

  // Sincronização periódica com a nuvem
  useEffect(() => {
    if (!isConnected || !options.enabled) return;
    
    const intervalTime = options.refreshInterval || 60000; // Padrão: 1 minuto
    
    const syncInterval = setInterval(() => {
      console.log("Sincronizando estados com a nuvem...");
      setLastSyncTime(new Date());
    }, intervalTime);
    
    return () => clearInterval(syncInterval);
  }, [isConnected, options.enabled, options.refreshInterval]);

  // Função para atualizar o estado de um dispositivo na nuvem
  const updateDeviceInCloud = async (deviceId: string, powerState: boolean) => {
    if (!isConnected) {
      toast({
        title: "Sem conexão",
        description: "Conecte-se à nuvem para controlar dispositivos remotamente",
        variant: "destructive",
      });
      return false;
    }

    try {
      console.log(`Enviando comando para dispositivo ${deviceId}: ${powerState ? "Ligar" : "Desligar"}`);
      
      // Simula um delay de comunicação
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Atualiza o estado local
      setDeviceStates(prev => ({ ...prev, [deviceId]: powerState }));
      
      // Notifica o callback se fornecido
      if (options.onDeviceUpdate) {
        options.onDeviceUpdate(deviceId, powerState);
      }
      
      toast({
        title: powerState ? "Dispositivo ligado" : "Dispositivo desligado",
        description: `O comando foi executado com sucesso pela nuvem`,
      });
      
      return true;
    } catch (error) {
      console.error("Erro ao enviar comando:", error);
      toast({
        title: "Falha no comando",
        description: "Não foi possível controlar o dispositivo",
        variant: "destructive",
      });
      return false;
    }
  };

  // Simula recebimento de comando por webhook (para Alexa)
  const processWebhookCommand = async (command: { deviceId: string; action: 'on' | 'off' }) => {
    if (!isConnected) {
      console.log("Comando recebido mas sem conexão ativa");
      return false;
    }
    
    const newPowerState = command.action === 'on';
    console.log(`Comando recebido via webhook para dispositivo ${command.deviceId}: ${command.action}`);
    
    return await updateDeviceInCloud(command.deviceId, newPowerState);
  };

  return {
    isConnected,
    lastSyncTime,
    deviceStates,
    updateDeviceInCloud,
    processWebhookCommand,
  };
}
