
import React from 'react';
import { LightbulbIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EnergySavingTips = () => {
  const navigate = useNavigate();
  
  return (
    <div className="rounded-lg border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Dicas de Economia</h3>
          <p className="text-sm text-muted-foreground">Adicione dicas para economizar energia</p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center py-8 space-y-4">
        <LightbulbIcon className="h-10 w-10 text-muted-foreground opacity-50" />
        <p className="text-muted-foreground text-center">Ainda não há dicas disponíveis.</p>
      </div>
      <button 
        className="mt-4 flex w-full items-center justify-center rounded-md bg-muted p-2 text-sm font-medium hover:bg-muted/80"
        onClick={() => navigate('/dicas')}
      >
        Adicionar dicas
      </button>
    </div>
  );
};

export default EnergySavingTips;
