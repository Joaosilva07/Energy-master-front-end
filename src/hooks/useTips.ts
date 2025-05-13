
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from "@/components/ui/use-toast";

export interface Tip {
  id: string;
  title: string;
  description: string;
  icon: string;
  savings?: string;
  category: string;
  featured: boolean;
}

export function useTips() {
  const { toast } = useToast();
  const [tips, setTips] = useState<Tip[]>([]);
  const [featuredTips, setFeaturedTips] = useState<Tip[]>([]);
  const [dailyTip, setDailyTip] = useState<Tip | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchTips() {
      try {
        setIsLoading(true);
        
        // Fetch all tips
        const { data, error } = await supabase
          .from('tips')
          .select('*');
          
        if (error) {
          throw error;
        }
        
        if (data) {
          const allTips = data as Tip[];
          setTips(allTips);
          
          // Filter featured tips
          const featured = allTips.filter(tip => tip.featured);
          setFeaturedTips(featured);
          
          // Set a random tip as daily tip
          const randomIndex = Math.floor(Math.random() * allTips.length);
          setDailyTip(allTips[randomIndex]);
        }
      } catch (err) {
        console.error('Error fetching tips:', err);
        setError(err as Error);
        
        // Fallback to static tips if Supabase fails
        setTips(staticTips);
        setFeaturedTips(staticTips.filter(tip => tip.featured));
        setDailyTip(staticTips[0]);
        
        toast({
          title: "Erro ao carregar dicas",
          description: "Usando dados locais como fallback.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchTips();
  }, [toast]);
  
  const getTipsByCategory = (category: string) => {
    return tips.filter(tip => tip.category === category);
  };
  
  return {
    tips,
    featuredTips,
    dailyTip,
    getTipsByCategory,
    isLoading,
    error
  };
}

// Static tips for fallback
const staticTips: Tip[] = [
  {
    id: '1',
    title: 'Otimize seu Ar Condicionado',
    description: 'Mantenha a temperatura em 23°C e faça limpeza regular dos filtros.',
    icon: 'thermometerSun',
    savings: '25% no consumo de A/C',
    category: 'climatizacao',
    featured: true
  },
  {
    id: '2',
    title: 'Programe seus Dispositivos',
    description: 'Configure timers para desligar aparelhos em horários específicos.',
    icon: 'timer',
    savings: '15% no consumo geral',
    category: 'eletrodomesticos',
    featured: true
  },
  {
    id: '3',
    title: 'Substitua lâmpadas antigas por LED',
    description: 'Lâmpadas LED consomem até 80% menos energia que incandescentes e duram muito mais.',
    icon: 'lightbulb',
    savings: '12% no consumo geral',
    category: 'iluminacao',
    featured: false
  }
];
