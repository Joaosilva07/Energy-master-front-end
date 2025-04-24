
import React from 'react';
import { LightbulbIcon, Zap, Sun, Thermometer, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const tips = [
  {
    title: 'Desligue aparelhos em standby',
    description: 'Aparelhos em modo standby consomem até 15% da energia total.',
    icon: <Zap className="w-5 h-5 text-amber-500" />,
  },
  {
    title: 'Use iluminação natural',
    description: 'Aproveite a luz do dia e reduza o uso de lâmpadas durante o dia.',
    icon: <Sun className="w-5 h-5 text-amber-500" />,
  },
  {
    title: 'Climatização Inteligente',
    description: 'Mantenha o ar-condicionado entre 23°C e 25°C para economizar energia.',
    icon: <Thermometer className="w-5 h-5 text-blue-500" />,
  },
  {
    title: 'Invista em energia renovável',
    description: 'Painéis solares podem reduzir sua conta em até 90%.',
    icon: <LightbulbIcon className="w-5 h-5 text-green-500" />,
  },
];

const EnergySavingTips = () => {
  const navigate = useNavigate();
  
  return (
    <div className="rounded-lg border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Dicas de Economia</h3>
          <p className="text-sm text-muted-foreground">Reduza seu consumo com estas dicas</p>
        </div>
        <div className="rounded-md bg-pink-100 px-2 py-1 text-xs font-medium text-energy-primary">
          4 novas dicas
        </div>
      </div>
      <div className="space-y-4">
        {tips.map((tip, index) => (
          <div key={index} className="flex items-start gap-3 rounded-md p-2 hover:bg-muted/50">
            <div className="mt-0.5 rounded-md bg-muted p-2">{tip.icon}</div>
            <div>
              <h4 className="font-medium">{tip.title}</h4>
              <p className="text-xs text-muted-foreground">{tip.description}</p>
            </div>
          </div>
        ))}
      </div>
      <button 
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-muted p-2 text-sm font-medium hover:bg-muted/80"
        onClick={() => navigate('/dicas')}
      >
        Ver todas as dicas
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default EnergySavingTips;
