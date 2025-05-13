
import React from 'react';
import { Button } from "@/components/ui/button";

interface VoiceCommandTesterProps {
  onTestCommand: (command: string) => void;
}

const VoiceCommandTester: React.FC<VoiceCommandTesterProps> = ({
  onTestCommand
}) => {
  return (
    <div className="border rounded-lg p-3 mt-2">
      <p className="text-sm font-medium mb-2">Testar comando de voz</p>
      <div className="grid grid-cols-2 gap-2">
        <Button 
          variant="outline" 
          onClick={() => onTestCommand("ligar")}
          className="text-sm"
        >
          "Alexa, ligar dispositivo"
        </Button>
        <Button 
          variant="outline"
          onClick={() => onTestCommand("desligar")}
          className="text-sm"
        >
          "Alexa, desligar dispositivo"
        </Button>
      </div>
    </div>
  );
};

export default VoiceCommandTester;
