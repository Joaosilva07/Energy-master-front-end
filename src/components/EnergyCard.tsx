
import React from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EnergyCardProps {
  title: string;
  value: number;
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
  
  return (
    <div className={cn("rounded-lg border bg-card p-5", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {icon}
      </div>
      <div className="mt-3 flex items-baseline">
        <h2 className="text-3xl font-bold">{value}</h2>
        {unit && <span className="ml-1 text-sm text-muted-foreground">{unit}</span>}
      </div>
      <div className="mt-2 flex items-center text-xs">
        {isPositiveChange ? (
          <ArrowUp className="mr-1 h-3 w-3 text-red-500" />
        ) : isNegativeChange ? (
          <ArrowDown className="mr-1 h-3 w-3 text-green-500" />
        ) : null}
        <span
          className={cn(
            isPositiveChange ? 'text-red-500' : isNegativeChange ? 'text-green-500' : 'text-muted-foreground'
          )}
        >
          {Math.abs(percentageChange)}% comparado ao {comparePeriod}
        </span>
      </div>
    </div>
  );
};

export default EnergyCard;
