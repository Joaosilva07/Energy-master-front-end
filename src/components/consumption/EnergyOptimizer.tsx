
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Zap, Clock, Info, CheckCircle2, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAIEnergy } from '@/hooks/useAIEnergy';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const EnergyOptimizer = () => {
  const { 
    optimizationPlans, 
    isOptimizing, 
    executePlan,
    generateOptimizationPlans
  } = useAIEnergy();

  if (isOptimizing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Otimizador de Energia</CardTitle>
          <CardDescription>Opções inteligentes para economizar energia</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2].map(i => (
            <div key={i} className="p-4 rounded-lg border border-muted">
              <div className="flex items-start gap-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-3 w-full mb-1" />
                  <Skeleton className="h-8 w-24 mt-4" />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (!optimizationPlans || optimizationPlans.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Otimizador de Energia</CardTitle>
          <CardDescription>Opções inteligentes para economizar energia</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Zap className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-muted-foreground mb-4">Nenhum plano de otimização disponível</p>
            <Button onClick={generateOptimizationPlans} className="bg-energy-primary hover:bg-energy-primary/90">
              <Zap className="h-4 w-4 mr-2" />
              Gerar Planos de Economia
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-energy-primary" />
            Otimizador de Energia
          </CardTitle>
          <CardDescription>Opções inteligentes para economizar energia</CardDescription>
        </div>
        <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded-full">
          ✨ Potenciado por IA
        </span>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Otimização Inteligente</AlertTitle>
          <AlertDescription>
            Selecione uma das opções abaixo para economizar energia automaticamente.
          </AlertDescription>
        </Alert>
        
        {optimizationPlans.map((plan, index) => {
          const isScheduled = plan.scheduleConfig?.active || plan.name.includes('(Agendado)');
          
          return (
            <div key={index} className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
              isScheduled 
                ? 'border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-900/20' 
                : 'border-muted bg-card hover:border-energy-primary/30'
            }`}>
              <div className="flex items-start gap-3">
                {plan.scheduleType === 'immediate' ? (
                  <Zap className="h-6 w-6 text-blue-500 mt-1" />
                ) : isScheduled ? (
                  <CheckCircle2 className="h-6 w-6 text-green-500 mt-1" />
                ) : (
                  <Calendar className="h-6 w-6 text-amber-500 mt-1" />
                )}
                
                <div className="flex-1">
                  <h4 className="font-medium mb-1 flex items-center gap-2">
                    {plan.name}
                    {isScheduled && (
                      <span className="text-xs bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 px-2 py-0.5 rounded-full">
                        Ativo
                      </span>
                    )}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">{plan.description}</p>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Economia estimada</span>
                      <span className="font-medium text-green-600 dark:text-green-400">
                        {plan.estimatedSavings.toFixed(1)} kWh
                      </span>
                    </div>
                    <Progress value={Math.min(plan.estimatedSavings, 200) / 2} className="h-2" />
                  </div>
                  
                  {plan.scheduleConfig && (
                    <div className="text-xs text-muted-foreground mb-3 flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      Horário: {plan.scheduleConfig.startTime} - {plan.scheduleConfig.endTime}
                      {plan.scheduleType === 'recurring' && ' (recorrente)'}
                    </div>
                  )}
                  
                  <div className="mt-2">
                    {isScheduled ? (
                      <Button 
                        variant="outline"
                        size="sm"
                        disabled
                        className="text-green-600 border-green-200"
                      >
                        <CheckCircle2 className="h-4 w-4 mr-1" />
                        {plan.scheduleType === 'immediate' ? 'Executado' : 'Agendado'}
                      </Button>
                    ) : (
                      <Button 
                        variant={plan.scheduleType === 'immediate' ? "default" : "outline"}
                        size="sm"
                        onClick={() => executePlan(plan.id)}
                        className={plan.scheduleType === 'immediate' ? 'bg-energy-primary hover:bg-energy-primary/90' : ''}
                      >
                        {plan.scheduleType === 'immediate' ? (
                          <>
                            <Zap className="h-4 w-4 mr-1" />
                            Aplicar Agora
                          </>
                        ) : (
                          <>
                            <Calendar className="h-4 w-4 mr-1" />
                            Agendar
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default EnergyOptimizer;
