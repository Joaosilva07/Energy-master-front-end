
import React from 'react';
import { ThermometerSun, Timer, Lightbulb, Lock, Sun, Power, Target, TrendingDown, Activity, Zap } from 'lucide-react';

export const renderIcon = (iconName: string) => {
  switch (iconName) {
    case 'thermometerSun':
      return <ThermometerSun className="h-5 w-5 text-energy-primary" />;
    case 'timer':
      return <Timer className="h-5 w-5 text-green-500" />;
    case 'lightbulb':
      return <Lightbulb className="h-5 w-5 text-yellow-500" />;
    case 'lock':
      return <Lock className="h-5 w-5 text-blue-500" />;
    case 'sun':
      return <Sun className="h-5 w-5 text-yellow-500" />;
    case 'power':
      return <Power className="h-5 w-5 text-red-500" />;
    case 'target':
      return <Target className="h-5 w-5 text-blue-500" />;
    case 'trendingDown':
      return <TrendingDown className="h-5 w-5 text-energy-primary" />;
    case 'activity':
      return <Activity className="h-5 w-5 text-yellow-500" />;
    case 'zap':
      return <Zap className="h-5 w-5 text-green-500" />;
    default:
      return <Lightbulb className="h-5 w-5 text-energy-primary" />;
  }
};
