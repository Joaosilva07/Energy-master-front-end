
import React, { useState } from 'react';
import { LightbulbIcon, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEnergyAnalysis } from '@/hooks/useEnergyAnalysis';
import { useToast } from '@/hooks/use-toast';

const EnergySavingTips = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { analysisData } = useEnergyAnalysis();
  const [isGenerating, setIsGenerating] = useState(false);

  // Function to request AI-generated tips based on the user's data
  const generateAITips = () => {
    setIsGenerating(true);
    
    // Simulate AI tip generation with a timeout
    // In a real implementation, this would be an API call to an AI service
    setTimeout(() => {
      setIsGenerating(false);
      navigate('/dicas');
      toast({
        title: "Dicas personalizadas geradas",
        description: "Confira suas novas recomendações baseadas no seu consumo",
        duration: 3000,
      });
    }, 1500);
  };
  
  return (
    <div className="rounded-lg border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Dicas de Economia</h3>
          <p className="text-sm text-muted-foreground">Recomendações personalizadas para você</p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center py-8 space-y-4">
        {analysisData?.recommendedActions && analysisData.recommendedActions.length > 0 ? (
          <div className="w-full space-y-3">
            {analysisData.recommendedActions.slice(0, 2).map((tip, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="mt-0.5 rounded-full bg-energy-primary/10 p-1.5">
                  <LightbulbIcon className="h-4 w-4 text-energy-primary" />
                </div>
                <p className="text-sm">{tip}</p>
              </div>
            ))}
          </div>
        ) : (
          <>
            <LightbulbIcon className="h-10 w-10 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground text-center">Gere dicas personalizadas baseadas no seu consumo energético.</p>
          </>
        )}
      </div>
      <button 
        className={`mt-4 flex w-full items-center justify-center rounded-md ${
          isGenerating ? 'bg-muted cursor-not-allowed' : 'bg-energy-primary text-white hover:bg-energy-primary/90'
        } p-2 text-sm font-medium`}
        onClick={isGenerating ? undefined : generateAITips}
        disabled={isGenerating}
      >
        {isGenerating ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Gerando dicas...
          </>
        ) : analysisData?.recommendedActions && analysisData.recommendedActions.length > 0 ? (
          "Gerar novas dicas"
        ) : (
          "Gerar dicas da IA"
        )}
      </button>
    </div>
  );
};

export default EnergySavingTips;
