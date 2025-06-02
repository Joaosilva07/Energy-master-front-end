
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, LightbulbOff, Info, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAIEnergy } from '@/hooks/useAIEnergy';
import { Skeleton } from '@/components/ui/skeleton';

const SmartAlerts = () => {
  const { 
    insights, 
    deviceFailureAlerts,
    isGeneratingInsights, 
    executeInsightAction 
  } = useAIEnergy();

  // Combinamos todos os insights para exibição
  const allInsights = [...insights, ...deviceFailureAlerts];

  // Função para renderizar o ícone baseado no tipo
  const renderIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'critical':
        return <LightbulbOff className="h-5 w-5 text-red-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  if (isGeneratingInsights) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Alertas Inteligentes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2].map(i => (
            <div key={i} className="flex items-start gap-4 p-3 rounded-lg bg-muted/50">
              <Skeleton className="h-5 w-5 rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
                <div className="mt-3 space-x-2">
                  <Skeleton className="h-8 w-24 inline-block" />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (!allInsights || allInsights.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Alertas Inteligentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3 opacity-50" />
            <p className="text-muted-foreground">Nenhum alerta detectado nos seus dispositivos</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Alertas Inteligentes</CardTitle>
        <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded-full">
          Potenciado por IA
        </span>
      </CardHeader>
      <CardContent className="space-y-4">
        {allInsights.map((insight, index) => (
          <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 border border-muted">
            <div className="mt-1">{renderIcon(insight.type)}</div>
            <div className="flex-1">
              <p className="font-medium mb-1">{insight.title}</p>
              <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
              
              {insight.actions && insight.actions.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {insight.actions.map(action => (
                    <Button
                      key={action.actionId}
                      variant="outline"
                      size="sm"
                      onClick={() => executeInsightAction(insight.deviceId || insight.title, action.actionId)}
                    >
                      {action.title}
                    </Button>
                  ))}
                </div>
              )}
              
              {insight.confidence && (
                <p className="text-xs text-muted-foreground mt-2">
                  Confiança: {Math.round(insight.confidence * 100)}%
                </p>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SmartAlerts;
