
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface WebhookConfigProps {
  webhookUrl: string;
  setWebhookUrl: (url: string) => void;
}

const WebhookConfig: React.FC<WebhookConfigProps> = ({ 
  webhookUrl, 
  setWebhookUrl 
}) => {
  return (
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
  );
};

export default WebhookConfig;
