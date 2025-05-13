
import React from 'react';
import { Target, TrendingDown, Activity, Zap, Trophy } from 'lucide-react';

export const renderIcon = (iconType: string) => {
  switch (iconType) {
    case 'target':
      return <Target className="h-5 w-5 text-energy-primary" />;
    case 'trendingDown':
      return <TrendingDown className="h-5 w-5 text-green-500" />;
    case 'activity':
      return <Activity className="h-5 w-5 text-yellow-500" />;
    case 'zap':
      return <Zap className="h-5 w-5 text-green-500" />;
    case 'trophy':
      return <Trophy className="h-5 w-5 text-yellow-500" />;
    default:
      return <Target className="h-5 w-5 text-energy-primary" />;
  }
};

export const getIconTypeFromComponent = (iconComponent: React.ReactNode) => {
  if (!iconComponent) return 'target';
  
  try {
    const iconElement = iconComponent as React.ReactElement;
    if (typeof iconElement.type === 'function' || typeof iconElement.type === 'object') {
      const typeAny = iconElement.type as any;
      const componentName = typeAny.displayName || typeAny.name || '';
      
      if (componentName.includes('TrendingDown')) return 'trendingDown';
      if (componentName.includes('Trophy')) return 'trophy';
      if (componentName.includes('Activity')) return 'activity';
      if (componentName.includes('Zap')) return 'zap';
    }
    return 'target';
  } catch (error) {
    return 'target';
  }
};
