
import React, { useState } from 'react';
import { LightbulbIcon, Loader2 } from 'lucide-react';
import { useEnergyAnalysis } from '@/hooks/useEnergyAnalysis';
import { useToast } from '@/hooks/use-toast';
import { energyInsightsService } from '@/services/energyInsightsService';
import { useDevices } from '@/hooks/useDevices';

const EnergySavingTips = () => {
  const { toast } = useToast();
  const { analysisData, refreshAnalysis } = useEnergyAnalysis();
  const { devices } = useDevices();
  const [isGenerating, setIsGenerating] = useState(false);

  // Function to request AI-generated tips based on the user's data
  const generateAITips = () => {
    setIsGenerating(true);
    
    // In a real implementation, we would call an AI service API
    // Here we use our existing service to generate recommendations
    setTimeout(() => {
      try {
        // Generate new recommendations based on current device data
        const newRecommendations = energyInsightsService.generateRecommendations(devices, new Date());
        
        // Trigger a refresh of the analysis data to incorporate the new recommendations
        refreshAnalysis();
        
        toast({
          title: "Dicas personalizadas geradas",
          description: "Novas recomendações baseadas no seu consumo foram criadas",
          duration: 3000,
        });
      } catch (error) {
        console.error("Erro ao gerar dicas:", error);
        toast({
          title: "Erro ao gerar dicas",
          description: "Não foi possível gerar novas recomendações",
          variant: "destructive",
          duration: 3000,
        });
      } finally {
        setIsGenerating(false);
      }
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
