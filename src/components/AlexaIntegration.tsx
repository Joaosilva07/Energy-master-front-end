
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/contexts/UserContext";
import { useDevices } from '@/hooks/useDevices';
import AlexaDialogContent from './alexa/AlexaDialogContent';

interface AlexaIntegrationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AlexaIntegration: React.FC<AlexaIntegrationProps> = ({ open, onOpenChange }) => {
  const { toast } = useToast();
  const { user } = useUser();
  const { devices, updateDeviceStatus } = useDevices();
  
  const [isConnecting, setIsConnecting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [connected, setConnected] = useState(false);
  const [cloudEnabled, setCloudEnabled] = useState(true);
  const [webhookUrl, setWebhookUrl] = useState('energymaster.up.railway.app');
  const [deviceStatus, setDeviceStatus] = useState<Record<string, { online: boolean, lastSeen: string }>>({});

  // Inicializar status dos dispositivos
  useEffect(() => {
    if (devices.length > 0) {
      const status: Record<string, { online: boolean, lastSeen: string }> = {};
      devices.forEach(device => {
        status[device.id] = { 
          online: device.status === 'online',
          lastSeen: device.lastActivity
        };
      });
      setDeviceStatus(status);
    }
  }, [devices]);

  const handleConnect = async () => {
    if (!user) return;

    setIsConnecting(true);
    setProgress(0);
    
    // Simulação de conexão com a nuvem para Alexa
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsConnecting(false);
          setConnected(true);
          
          // Atualiza o status dos dispositivos para 'online'
          const updatedStatus: Record<string, { online: boolean, lastSeen: string }> = {};
          devices.forEach(device => {
            updatedStatus[device.id] = { online: true, lastSeen: 'Agora' };
            if (device.powerState) {
              // Se o dispositivo estiver ligado, atualiza seu status
              updateDeviceStatus(device.id, true);
            }
          });
          
          setDeviceStatus(updatedStatus);
          
          toast({
            title: "Conexão estabelecida",
            description: "Seus dispositivos estão conectados à Alexa Skills",
          });
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleDisconnect = () => {
    setConnected(false);
    setProgress(0);
    
    // Atualiza o status dos dispositivos para 'offline'
    const updatedStatus: Record<string, { online: boolean, lastSeen: string }> = {};
    devices.forEach(device => {
      updatedStatus[device.id] = { 
        online: false, 
        lastSeen: new Date().toLocaleTimeString()
      };
    });
    
    setDeviceStatus(updatedStatus);
    
    toast({
      title: "Desconectado",
      description: "Conexão com Alexa Skills encerrada",
    });
  };

  const handleEnableCloud = (enabled: boolean) => {
    setCloudEnabled(enabled);
    
    if (!enabled) {
      // Desativa o monitoramento em tempo real
      const updatedStatus = { ...deviceStatus };
      Object.keys(updatedStatus).forEach(deviceId => {
        updatedStatus[deviceId].online = false;
      });
      setDeviceStatus(updatedStatus);
    } else {
      // Reativa o monitoramento
      const updatedStatus = { ...deviceStatus };
      Object.keys(updatedStatus).forEach(deviceId => {
        updatedStatus[deviceId].online = true;
        updatedStatus[deviceId].lastSeen = 'Agora';
      });
      setDeviceStatus(updatedStatus);
    }
    
    toast({
      title: enabled ? "Monitoramento na nuvem ativado" : "Monitoramento na nuvem desativado",
      description: enabled 
        ? "Seus dispositivos serão monitorados em tempo real" 
        : "O monitoramento em tempo real foi desativado",
    });
  };

  // Função para simular comando da Alexa
  const handleTestAlexaCommand = (command: string) => {
    if (!connected || !cloudEnabled) {
      toast({
        title: "Sem conexão ativa",
        description: "Conecte à nuvem para testar comandos da Alexa",
        variant: "destructive"
      });
      return;
    }
    
    // Pega um dispositivo aleatório para demonstração
    if (devices.length === 0) return;
    const randomIndex = Math.floor(Math.random() * devices.length);
    const targetDevice = devices[randomIndex];
    
    toast({
      title: "Comando de voz recebido",
      description: `"Alexa, ${command} ${targetDevice.name}"`,
    });
    
    // Espera um momento e então simula a execução do comando
    setTimeout(() => {
      const newPowerState = command.includes("ligar");
      // Atualiza o estado do dispositivo simulando comando da Alexa
      updateDeviceStatus(targetDevice.id, newPowerState);
      
      toast({
        title: newPowerState ? "Dispositivo ligado" : "Dispositivo desligado",
        description: `${targetDevice.name} foi ${newPowerState ? "ligado" : "desligado"} pela Alexa`,
      });
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Integração com Alexa Skills</DialogTitle>
          <DialogDescription>
            Conecte seus dispositivos à Alexa para controle por voz e monitoramento em tempo real.
          </DialogDescription>
        </DialogHeader>

        <AlexaDialogContent
          connected={connected}
          isConnecting={isConnecting}
          progress={progress}
          cloudEnabled={cloudEnabled}
          devices={devices}
          deviceStatus={deviceStatus}
          webhookUrl={webhookUrl}
          onCloudEnabledChange={handleEnableCloud}
          onTestCommand={handleTestAlexaCommand}
          setWebhookUrl={setWebhookUrl}
        />

        <DialogFooter>
          {connected ? (
            <Button variant="destructive" onClick={handleDisconnect}>Desconectar</Button>
          ) : (
            <Button onClick={handleConnect} disabled={isConnecting}>
              {isConnecting ? "Conectando..." : "Conectar com Alexa"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AlexaIntegration;
