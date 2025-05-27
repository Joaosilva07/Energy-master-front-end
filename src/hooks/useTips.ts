
import { useState, useEffect } from 'react';
import { tipsService } from '@/services/tipsService';

export interface Tip {
  id: string;
  title: string;
  description: string;
  icon: string;
  savings?: string;
  category: string;
  featured: boolean;
  created_at?: string;
}

export const useTips = () => {
  const [tips, setTips] = useState<Tip[]>([]);
  const [featuredTips, setFeaturedTips] = useState<Tip[]>([]);
  const [dailyTip, setDailyTip] = useState<Tip | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Buscar todas as dicas do banco
  const fetchTips = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await tipsService.getAllTips();
      
      if (result.success && result.tips.length > 0) {
        setTips(result.tips);
        
        // Filtrar dicas em destaque
        const featured = result.tips.filter(tip => tip.featured);
        setFeaturedTips(featured);
        
        // Selecionar dica do dia (primeira dica em destaque ou aleatória)
        if (featured.length > 0) {
          setDailyTip(featured[0]);
        } else if (result.tips.length > 0) {
          const randomIndex = Math.floor(Math.random() * result.tips.length);
          setDailyTip(result.tips[randomIndex]);
        }
      } else {
        // Se não há dicas no banco, usar dados simulados como fallback
        setTips(mockTips);
        setFeaturedTips(mockTips.filter(tip => tip.featured));
        setDailyTip(mockTips[0]);
        
        if (result.message) {
          setError(result.message);
        }
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

// Dados simulados para fallback (mantendo os existentes)
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
