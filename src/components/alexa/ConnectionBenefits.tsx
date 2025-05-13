
import React from 'react';

const ConnectionBenefits: React.FC = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
      <h3 className="text-sm font-medium mb-2">Benefícios da conexão com a Alexa:</h3>
      <ul className="text-xs space-y-1 text-muted-foreground">
        <li>• Controle por voz de todos os seus dispositivos</li>
        <li>• Monitoramento do consumo em tempo real</li>
        <li>• Sugestões personalizadas de economia</li>
        <li>• Alertas de consumo excessivo</li>
      </ul>
    </div>
  );
};

export default ConnectionBenefits;
