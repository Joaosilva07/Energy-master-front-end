
import React from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EnergyCardProps {
  title: string;
  value: number | string;  // Updated to accept string or number
  unit?: string;
  percentageChange: number;
  icon?: React.ReactNode;
  comparePeriod?: string;
  className?: string;
}

const EnergyCard = ({
  title,
  value,
  unit = '',
  percentageChange,
  icon,
  comparePeriod = 'mês anterior',
  className,
}: EnergyCardProps) => {
  const isPositiveChange = percentageChange > 0;
  const isNegativeChange = percentageChange < 0;
  const hasChange = percentageChange !== 0;
  
  return (
    <div className={cn("rounded-lg border bg-card p-5", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {icon}
      </div>
      <div className="mt-3 flex items-baseline">
        <h2 className="text-3xl font-bold">
          {typeof value === 'number' ? value.toLocaleString('pt-BR') : value}
        </h2>
        {unit && <span className="ml-1 text-sm text-muted-foreground">{unit}</span>}
      </div>
      <div className="mt-2 flex items-center text-xs">
        {hasChange ? (
          <>
            {isPositiveChange ? (
              <ArrowUp className={`mr-1 h-3 w-3 ${title.includes('Eficiência') ? 'text-green-500' : 'text-red-500'}`} />
            ) : (
              <ArrowDown className={`mr-1 h-3 w-3 ${title.includes('Eficiência') ? 'text-red-500' : 'text-green-500'}`} />
            )}
            <span
              className={cn(
                isPositiveChange 
                  ? title.includes('Eficiência') ? 'text-green-500' : 'text-red-500' 
                  : title.includes('Eficiência') ? 'text-red-500' : 'text-green-500'
              )}
            >
              {Math.abs(percentageChange).toFixed(1)}% comparado ao {comparePeriod}
            </span>
          </>
        ) : (
          <span className="text-muted-foreground">Sem dados anteriores para comparação</span>
        )}
      </div>
    </div>
  );
};

export default EnergyCard;
