
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from 'lucide-react';
import { useEnergyAnalysis } from '@/hooks/useEnergyAnalysis';

const AIRecommendations = () => {
  const { analysisData } = useEnergyAnalysis();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recomendações da IA</CardTitle>
      </CardHeader>
      <CardContent>
        {analysisData && analysisData.recommendedActions.length > 0 ? (
          <div className="space-y-4">
            {analysisData.recommendedActions.map((action, index) => (
              <div key={index} className="flex items-start gap-4 p-3 rounded-lg bg-muted/50">
                <Lightbulb className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="text-sm">{action}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-muted-foreground">Nenhuma recomendação disponível</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIRecommendations;
