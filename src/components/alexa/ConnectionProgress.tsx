
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";

interface ConnectionProgressProps {
  progress: number;
  isConnecting: boolean;
}

const ConnectionProgress: React.FC<ConnectionProgressProps> = ({
  progress,
  isConnecting
}) => {
  if (!isConnecting) return null;
  
  return (
    <div className="flex flex-col space-y-2">
      <Label>Conectando...</Label>
      <Progress value={progress} />
      <p className="text-xs text-muted-foreground text-center">
        {progress}% completo
      </p>
    </div>
  );
};

export default ConnectionProgress;
