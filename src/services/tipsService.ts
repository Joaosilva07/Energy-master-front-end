
import { supabase } from '@/lib/supabase';
import { energyTipsDatabase, TipData } from '@/data/tipsDatabase';
import { useToast } from '@/hooks/use-toast';

export const tipsService = {
  /**
   * Popula o banco de dados com todas as 100 dicas pré-definidas
   */
  async populateDatabase(): Promise<{ success: boolean; message: string; count?: number }> {
    try {
      // Verificar se já existem dicas no banco
      const { data: existingTips, error: checkError } = await supabase
        .from('tips')
        .select('id')
        .limit(10);

      if (checkError) {
        console.error('Erro ao verificar dicas existentes:', checkError);
        return { success: false, message: 'Erro ao acessar banco de dados' };
      }

      // Se já tiver muitas dicas, não adiciona novamente
      if (existingTips && existingTips.length >= 50) {
        return { 
          success: true, 
          message: `Banco já possui ${existingTips.length} dicas. Operação cancelada para evitar duplicatas.`,
          count: existingTips.length 
        };
      }

      // Inserir todas as dicas em lotes para melhor performance
      const batchSize = 20;
      let totalInserted = 0;

      for (let i = 0; i < energyTipsDatabase.length; i += batchSize) {
        const batch = energyTipsDatabase.slice(i, i + batchSize);
        
        const { error: insertError } = await supabase
          .from('tips')
          .insert(batch.map(tip => ({
            title: tip.title,
            description: tip.description,
            icon: tip.icon,
            savings: tip.savings,
            category: tip.category,
            featured: tip.featured
          })));

        if (insertError) {
          console.error(`Erro ao inserir lote ${i / batchSize + 1}:`, insertError);
          break;
        } else {
          totalInserted += batch.length;
        }
      }

      return {
        success: true,
        message: `${totalInserted} dicas adicionadas com sucesso ao banco de dados!`,
        count: totalInserted
      };

    } catch (error) {
      console.error('Erro ao popular banco de dados:', error);
      return { success: false, message: 'Erro inesperado ao popular banco de dados' };
    }
  },

  /**
   * Gera uma nova dica aleatória e salva no banco
   */
  async generateRandomTip(): Promise<{ success: boolean; message: string; tip?: any }> {
    try {
      // Buscar dicas que ainda não foram mostradas recentemente
      const { data: allTips, error: fetchError } = await supabase
        .from('tips')
        .select('*')
        .order('created_at', { ascending: true });

      if (fetchError) {
        console.error('Erro ao buscar dicas:', fetchError);
        return { success: false, message: 'Erro ao acessar banco de dados' };
      }

      if (!allTips || allTips.length === 0) {
        // Se não há dicas no banco, popular primeiro
        const populateResult = await this.populateDatabase();
        if (!populateResult.success) {
          return populateResult;
        }
        
        // Tentar buscar novamente
        const { data: newTips, error: refetchError } = await supabase
          .from('tips')
          .select('*')
          .order('created_at', { ascending: true });

        if (refetchError || !newTips || newTips.length === 0) {
          return { success: false, message: 'Não foi possível carregar dicas do banco' };
        }

        allTips.splice(0, 0, ...newTips);
      }

      // Selecionar uma dica aleatória
      const randomIndex = Math.floor(Math.random() * allTips.length);
      const selectedTip = allTips[randomIndex];

      // Criar uma "nova" dica personalizada baseada na selecionada
      const personalizedTip = {
        title: `💡 ${selectedTip.title}`,
        description: `${selectedTip.description} (Dica personalizada gerada em ${new Date().toLocaleDateString()})`,
        icon: selectedTip.icon,
        savings: selectedTip.savings,
        category: 'ai-generated',
        featured: true // Marcar como em destaque para aparecer
      };

      // Salvar a dica personalizada no banco
      const { data: insertedTip, error: insertError } = await supabase
        .from('tips')
        .insert(personalizedTip)
        .select()
        .single();

      if (insertError) {
        console.error('Erro ao salvar dica personalizada:', insertError);
        return { success: false, message: 'Erro ao salvar nova dica' };
      }

      return {
        success: true,
        message: 'Nova dica personalizada gerada com sucesso!',
        tip: insertedTip
      };

    } catch (error) {
      console.error('Erro ao gerar nova dica:', error);
      return { success: false, message: 'Erro inesperado ao gerar dica' };
    }
  },

  /**
   * Busca todas as dicas do banco
   */
  async getAllTips(): Promise<{ success: boolean; tips: any[]; message?: string }> {
    try {
      const { data: tips, error } = await supabase
        .from('tips')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao buscar dicas:', error);
        return { success: false, tips: [], message: 'Erro ao carregar dicas' };
      }

      return { success: true, tips: tips || [] };
    } catch (error) {
      console.error('Erro ao buscar dicas:', error);
      return { success: false, tips: [], message: 'Erro inesperado ao carregar dicas' };
    }
  },

  /**
   * Busca dicas em destaque
   */
  async getFeaturedTips(): Promise<{ success: boolean; tips: any[]; message?: string }> {
    try {
      const { data: tips, error } = await supabase
        .from('tips')
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Erro ao buscar dicas em destaque:', error);
        return { success: false, tips: [], message: 'Erro ao carregar dicas em destaque' };
      }

      return { success: true, tips: tips || [] };
    } catch (error) {
      console.error('Erro ao buscar dicas em destaque:', error);
      return { success: false, tips: [], message: 'Erro inesperado ao carregar dicas em destaque' };
    }
  }
};
