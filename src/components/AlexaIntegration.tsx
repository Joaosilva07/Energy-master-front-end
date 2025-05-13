
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/contexts/UserContext";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Cloud, CloudOff } from "lucide-react";

interface AlexaIntegrationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AlexaIntegration: React.FC<AlexaIntegrationProps> = ({ open, onOpenChange }) => {
  const { toast } = useToast();
  const { user } = useUser();
  const [isConnecting, setIsConnecting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [connected, setConnected] = useState(false);
  const [cloudEnabled, setCloudEnabled] = useState(true);

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
    toast({
      title: "Desconectado",
      description: "Conexão com Alexa Skills encerrada",
    });
  };

  const handleEnableCloud = (enabled: boolean) => {
    setCloudEnabled(enabled);
    toast({
      title: enabled ? "Monitoramento na nuvem ativado" : "Monitoramento na nuvem desativado",
      description: enabled 
        ? "Seus dispositivos serão monitorados em tempo real" 
        : "O monitoramento em tempo real foi desativado",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Integração com Alexa Skills</DialogTitle>
          <DialogDescription>
            Conecte seus dispositivos à Alexa para controle por voz e monitoramento em tempo real.
          </DialogDescription>
        </DialogHeader>

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
            </>
          )}
        </div>

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
