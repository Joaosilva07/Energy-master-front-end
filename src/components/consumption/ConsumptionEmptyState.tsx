
import React from 'react';
import { TrendingUp, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ConsumptionEmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-muted p-6 mb-4">
        <TrendingUp className="h-10 w-10 text-muted-foreground" />
      </div>
      <h2 className="text-xl font-semibold mb-2">Nenhum dado de consumo disponível</h2>
      <p className="text-muted-foreground max-w-md mb-6">
        Você ainda não tem dispositivos cadastrados. Adicione dispositivos para começar a monitorar seu consumo de energia.
      </p>
      <Link to="/dispositivos">
        <Button className="bg-energy-primary hover:bg-energy-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Dispositivo
        </Button>
      </Link>
    </div>
  );
};

export default ConsumptionEmptyState;
