
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface Tip {
  id: string;
  title: string;
  description: string;
  icon: string;
  savings?: string;
  category: string;
  featured: boolean;
}

export const useTips = () => {
  const [tips, setTips] = useState<Tip[]>([]);
  const [featuredTips, setFeaturedTips] = useState<Tip[]>([]);
  const [dailyTip, setDailyTip] = useState<Tip | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Buscar dicas do Supabase
  const fetchTips = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Tenta buscar dicas do Supabase
      const { data, error } = await supabase
        .from('tips')
        .select('*');

      if (error) {
        console.error('Erro ao buscar dicas do Supabase:', error);
        setError('Falha ao carregar dicas');
        
        // Por enquanto, carrega dados simulados como fallback
        setTips(mockTips);
        setFeaturedTips(mockTips.filter(tip => tip.featured));
        setDailyTip(mockTips[0]);
      } else if (data.length > 0) {
        // Formata os dados do Supabase
        const formattedTips = data.map(item => ({
          id: item.id,
          title: item.title,
          description: item.description,
          icon: item.icon,
          savings: item.savings,
          category: item.category,
          featured: item.featured
        }));
        
        setTips(formattedTips);
        setFeaturedTips(formattedTips.filter(tip => tip.featured));
        
        // Seleciona uma dica aleatória como dica do dia
        const randomIndex = Math.floor(Math.random() * formattedTips.length);
        setDailyTip(formattedTips[randomIndex]);
      } else {
        // Se não houver dados no banco, usa os dados simulados
        setTips(mockTips);
        setFeaturedTips(mockTips.filter(tip => tip.featured));
        setDailyTip(mockTips[0]);
      }
    } catch (err) {
      console.error('Falha ao buscar dicas:', err);
      setError('Erro ao carregar dicas');
      // Carrega dados simulados como fallback
      setTips(mockTips);
      setFeaturedTips(mockTips.filter(tip => tip.featured));
      setDailyTip(mockTips[0]);
    } finally {
      setIsLoading(false);
    }
  };

  // Filtrar dicas por categoria
  const getTipsByCategory = (category: string) => {
    return tips.filter(tip => tip.category === category);
  };

  // Carregar dicas quando o componente montar
  useEffect(() => {
    fetchTips();
  }, []);

  return {
    tips,
    featuredTips,
    dailyTip,
    getTipsByCategory,
    isLoading,
    error,
    fetchTips
  };
};

// Dados simulados para fallback
const mockTips: Tip[] = [
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
