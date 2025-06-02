
import React, { useState } from 'react';
import { LightbulbIcon, Loader2, Sparkles } from 'lucide-react';
import { useEnergyAnalysis } from '@/hooks/useEnergyAnalysis';
import { useToast } from '@/hooks/use-toast';
import { tipsService } from '@/services/tipsService';
import { useTips } from '@/hooks/useTips';

const EnergySavingTips = () => {
  const { toast } = useToast();
  const { analysisData, refreshAnalysis } = useEnergyAnalysis();
  const { featuredTips, fetchTips, isLoading } = useTips();
  const [isGenerating, setIsGenerating] = useState(false);

  // Função para gerar uma nova dica personalizada
  const generateNewTip = async () => {
    setIsGenerating(true);
    
    try {
      const result = await tipsService.generateRandomTip();
      
      if (result.success) {
        toast({
          title: "✨ Nova dica gerada!",
          description: result.message,
          duration: 4000,
        });
        
        // Recarregar dicas para mostrar a nova
        fetchTips();
        
        // Atualizar análise também
        refreshAnalysis();
      } else {
        toast({
          title: "Erro ao gerar dica",
          description: result.message,
          variant: "destructive",
          duration: 4000,
        });
      }
    } catch (error) {
      console.error("Erro ao gerar nova dica:", error);
      toast({
        title: "Erro inesperado",
        description: "Não foi possível gerar nova dica",
        variant: "destructive",
        duration: 4000,
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="rounded-lg border bg-card p-5">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Dicas de Economia</h3>
          <p className="text-sm text-muted-foreground">Carregando recomendações...</p>
        </div>
        <div className="flex flex-col items-center justify-center py-8 space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Buscando suas dicas personalizadas</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="rounded-lg border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <LightbulbIcon className="h-5 w-5 text-energy-primary" />
            Dicas de Economia
          </h3>
          <p className="text-sm text-muted-foreground">Recomendações personalizadas para você</p>
        </div>
      </div>
      
      <div className="flex flex-col items-center justify-center py-4 space-y-4">
        {featuredTips && featuredTips.length > 0 ? (
          <div className="w-full space-y-3">
            {featuredTips.slice(0, 3).map((tip, index) => (
              <div key={tip.id || index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="mt-0.5 rounded-full bg-energy-primary/10 p-1.5">
                  <LightbulbIcon className="h-4 w-4 text-energy-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-foreground">{tip.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{tip.description}</p>
                  {tip.savings && (
                    <p className="text-xs text-energy-primary font-medium mt-2 flex items-center gap-1">
                      <Sparkles className="h-3 w-3" />
                      Economia: {tip.savings}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <LightbulbIcon className="h-10 w-10 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground text-center">
              Gere dicas personalizadas baseadas no seu consumo energético.
            </p>
          </>
        )}
      </div>
      
      <button 
        className={`flex w-full items-center justify-center rounded-md transition-all duration-200 ${
          isGenerating 
            ? 'bg-muted cursor-not-allowed' 
            : 'bg-energy-primary text-white hover:bg-energy-primary/90 hover:scale-[1.02] active:scale-[0.98]'
        } p-3 text-sm font-medium mt-4`}
        onClick={isGenerating ? undefined : generateNewTip}
        disabled={isGenerating}
      >
        {isGenerating ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Gerando nova dica...
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4 mr-2" />
            Gerar nova dica personalizada
          </>
        )}
      </button>
    </div>
  );
};

export default EnergySavingTips;
