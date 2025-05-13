import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/contexts/UserContext";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Cloud, CloudOff, Wifi, WifiOff } from "lucide-react";
import { useDevices } from '@/hooks/useDevices';
import { Input } from "@/components/ui/input";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ScrollArea } from "@/components/ui/scroll-area";

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

        <ScrollArea className="flex-grow pr-4">
          <div className="grid gap-4 py-4">
            {connected ? (
              <>
                <div className="flex items-center justify-center p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <Cloud className="h-8 w-8 text-green-600 dark:text-green-400" />
                  <span className="ml-2 font-medium text-green-600 dark:text-green-400">Conectado à nuvem</span>
                </div>

                <div className="flex flex-col space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="cloud-monitoring">Monitoramento em tempo real</Label>
                    <Switch 
                      id="cloud-monitoring" 
                      checked={cloudEnabled}
                      onCheckedChange={handleEnableCloud}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {cloudEnabled 
                      ? "Os dispositivos estão sendo monitorados em tempo real" 
                      : "O monitoramento em tempo real está desativado"}
                  </p>
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label>Status da conexão</Label>
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Ativo</span>
                  </div>
                </div>
                
                <div className="border rounded-lg p-3 mt-2">
                  <p className="text-sm font-medium mb-2">Testar comando de voz</p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => handleTestAlexaCommand("ligar")}
                      className="text-sm"
                    >
                      "Alexa, ligar dispositivo"
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => handleTestAlexaCommand("desligar")}
                      className="text-sm"
                    >
                      "Alexa, desligar dispositivo"
                    </Button>
                  </div>
                </div>
                
                <div className="mt-4 border rounded-lg p-3">
                  <p className="text-sm font-medium mb-2">Dispositivos conectados</p>
                  <div className="max-h-40 overflow-y-auto">
                    {devices.length === 0 ? (
                      <p className="text-sm text-muted-foreground">Nenhum dispositivo cadastrado</p>
                    ) : (
                      <ul className="space-y-2">
                        {devices.map(device => (
                          <li key={device.id} className="flex items-center justify-between text-sm">
                            <div className="flex items-center">
                              {deviceStatus[device.id]?.online ? (
                                <Wifi className="h-4 w-4 text-green-500 mr-2" />
                              ) : (
                                <WifiOff className="h-4 w-4 text-gray-400 mr-2" />
                              )}
                              <span>{device.name}</span>
                            </div>
                            <span className={`text-xs ${device.powerState ? 'text-green-500' : 'text-gray-500'}`}>
                              {device.powerState ? 'Ligado' : 'Desligado'}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                
                <div className="border rounded-lg p-3">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="webhook-url">URL de Webhook (Alexa Skill)</Label>
                    <Input
                      id="webhook-url"
                      placeholder="https://hooks.zapier.com/..."
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Webhook configurado para receber comandos da Alexa via Railway
                    </p>
                  </div>
                </div>
                
                <div className="mt-3">
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
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <CloudOff className="h-8 w-8 text-gray-600 dark:text-gray-400" />
                  <span className="ml-2 font-medium text-gray-600 dark:text-gray-400">Desconectado da nuvem</span>
                </div>
                
                {isConnecting && (
                  <div className="flex flex-col space-y-2">
                    <Label>Conectando...</Label>
                    <Progress value={progress} />
                    <p className="text-xs text-muted-foreground text-center">
                      {progress}% completo
                    </p>
                  </div>
                )}
                
                <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
                  <h3 className="text-sm font-medium mb-2">Benefícios da conexão com a Alexa:</h3>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    <li>• Controle por voz de todos os seus dispositivos</li>
                    <li>• Monitoramento do consumo em tempo real</li>
                    <li>• Sugestões personalizadas de economia</li>
                    <li>• Alertas de consumo excessivo</li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </ScrollArea>

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
