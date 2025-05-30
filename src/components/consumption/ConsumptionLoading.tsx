
import React from 'react';

const ConsumptionLoading = () => {
  return (
    <div className="flex items-center justify-center h-64 flex-col">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-energy-primary mx-auto mb-2"></div>
        <p className="text-muted-foreground">Processando dados de consumo...</p>
      </div>
      <p className="text-xs text-muted-foreground mt-2">Isso pode levar alguns segundos</p>
    </div>
  );
};

export default ConsumptionLoading;
