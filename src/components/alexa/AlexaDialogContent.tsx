
import React from 'react';
import { Device } from '@/types/device.types';
import { ScrollArea } from "@/components/ui/scroll-area";
import ConnectionStatus from './ConnectionStatus';
import ConnectionProgress from './ConnectionProgress';
import ConnectionBenefits from './ConnectionBenefits';
import CloudMonitoring from './CloudMonitoring';
import VoiceCommandTester from './VoiceCommandTester';
import ConnectedDevices from './ConnectedDevices';
import WebhookConfig from './WebhookConfig';
import CloudVisualization from './CloudVisualization';

interface AlexaDialogContentProps {
  connected: boolean;
  isConnecting: boolean;
  progress: number;
  cloudEnabled: boolean;
  devices: Device[];
  deviceStatus: Record<string, { online: boolean; lastSeen: string }>;
  webhookUrl: string;
  onCloudEnabledChange: (enabled: boolean) => void;
  onTestCommand: (command: string) => void;
  setWebhookUrl: (url: string) => void;
}

const AlexaDialogContent: React.FC<AlexaDialogContentProps> = ({
  connected,
  isConnecting,
  progress,
  cloudEnabled,
  devices,
  deviceStatus,
  webhookUrl,
  onCloudEnabledChange,
  onTestCommand,
  setWebhookUrl,
}) => {
  return (
    <ScrollArea className="flex-grow pr-4">
      <div className="grid gap-4 py-4">
        <ConnectionStatus isConnected={connected} />

        {connected ? (
          <>
            <CloudMonitoring 
              cloudEnabled={cloudEnabled}
              onCloudEnabledChange={onCloudEnabledChange}
            />

            <div className="flex flex-col space-y-1.5">
              <p className="text-sm font-medium">Status da conexão</p>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Ativo</span>
              </div>
            </div>
            
            <VoiceCommandTester onTestCommand={onTestCommand} />
            
            <ConnectedDevices 
              devices={devices}
              deviceStatus={deviceStatus}
            />
            
            <div className="border rounded-lg p-3">
              <WebhookConfig 
                webhookUrl={webhookUrl}
                setWebhookUrl={setWebhookUrl}
              />
            </div>
            
            <div className="mt-3">
              <CloudVisualization devices={devices} />
            </div>
          </>
        ) : (
          <>
            <ConnectionProgress 
              isConnecting={isConnecting} 
              progress={progress} 
            />
            
            <ConnectionBenefits />
          </>
        )}
      </div>
    </ScrollArea>
  );
};

export default AlexaDialogContent;
