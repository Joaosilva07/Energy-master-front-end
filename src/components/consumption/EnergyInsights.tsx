
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from 'lucide-react';
import { useEnergyAnalysis } from '@/hooks/useEnergyAnalysis';

const EnergyInsights = () => {
  const { analysisData } = useEnergyAnalysis();

  if (!analysisData || analysisData.insights.length === 0) {
    return null;
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Alertas Inteligentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {analysisData.insights.map((insight, index) => (
            <div key={index} className="flex items-start gap-4 p-3 rounded-lg bg-muted/50">
              <AlertCircle className={`h-5 w-5 ${
                insight.type === 'warning' ? 'text-red-500' : 
                insight.type === 'success' ? 'text-green-500' : 'text-blue-500'
              }`} />
              <div>
                <p className="font-medium">{insight.title}</p>
                <p className="text-sm text-muted-foreground">{insight.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EnergyInsights;
