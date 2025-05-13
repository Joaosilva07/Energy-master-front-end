
import { useState, useEffect } from 'react';
import { useUser } from '@/contexts/UserContext';
import { supabase } from '@/lib/supabase';
import { useToast } from "@/components/ui/use-toast";

// Goal interface to better type our data
export interface Goal {
  id: string;
  title: string;
  description: string;
  progress: number;
  status: string;
  statusColor: string;
  iconType: string;
  iconBg: string;
  target?: number;
  targetDate?: string;
  type?: string;
  userId: string;
}

// Initial goals data
const initialGoals: Omit<Goal, 'userId'>[] = [
  {
    id: '1',
    title: "Reduzir Consumo Total",
    description: "Diminuir o consumo mensal em 20% em relação ao mês anterior",
    progress: 65,
    status: "Em Progresso",
    statusColor: "text-yellow-500",
    iconType: "target",
    iconBg: "bg-energy-primary/10"
  },
  {
    id: '2',
    title: "Otimizar Ar Condicionado",
    description: "Reduzir o consumo do A/C em 30% através de programação inteligente",
    progress: 85,
    status: "Quase Concluído",
    statusColor: "text-green-500",
    iconType: "trendingDown",
    iconBg: "bg-green-100"
  },
  {
    id: '3',
    title: "Meta de Pico",
    description: "Manter o pico de consumo abaixo de 2.5 kWh/h",
    progress: 40,
    status: "Em Andamento",
    statusColor: "text-yellow-500",
    iconType: "trophy",
    iconBg: "bg-yellow-100"
  }
];

export const useGoals = () => {
  const { user } = useUser();
  const { toast } = useToast();
  const userId = user?.id || 'anonymous';
  
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  // Fetch goals from Supabase
  useEffect(() => {
    if (!user) {
      setGoals([]);
      setIsLoading(false);
      return;
    }

    async function fetchGoals() {
      try {
        setIsLoading(true);
        
        const { data, error } = await supabase
          .from('goals')
          .select('*')
          .eq('user_id', userId);
          
        if (error) {
          throw error;
        }
        
        if (data) {
          // Map from Supabase format to our Goal format
          const formattedGoals = data.map(goal => ({
            id: goal.id,
            title: goal.title,
            description: goal.description,
            progress: goal.progress,
            status: goal.status,
            statusColor: goal.statusColor,
            iconType: goal.iconType,
            iconBg: goal.iconBg,
            target: goal.target,
            targetDate: goal.targetDate,
            type: goal.type,
            userId: goal.user_id
          }));
          
          setGoals(formattedGoals);
        } else if (data && data.length === 0) {
          // If user has no goals, create initial ones
          await Promise.all(initialGoals.map(goal => 
            addInitialGoal({...goal, userId})
          ));
          
          // Then fetch them again
          const { data: newData } = await supabase
            .from('goals')
            .select('*')
            .eq('user_id', userId);
            
          if (newData) {
            const formattedGoals = newData.map(goal => ({
              id: goal.id,
              title: goal.title,
              description: goal.description,
              progress: goal.progress,
              status: goal.status,
              statusColor: goal.statusColor,
              iconType: goal.iconType,
              iconBg: goal.iconBg,
              target: goal.target,
              targetDate: goal.targetDate,
              type: goal.type,
              userId: goal.user_id
            }));
            
            setGoals(formattedGoals);
          }
        }
      } catch (err) {
        console.error('Error fetching goals:', err);
        setError(err as Error);
        
        // Fallback to localStorage if Supabase fails
        const savedGoals = localStorage.getItem(`goals_${userId}`);
        if (savedGoals) {
          setGoals(JSON.parse(savedGoals));
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchGoals();
  }, [userId, user]);
  
  // Helper function to add initial goals
  const addInitialGoal = async (goal: Goal) => {
    await supabase
      .from('goals')
      .insert([{
        title: goal.title,
        description: goal.description,
        progress: goal.progress,
        status: goal.status,
        statusColor: goal.statusColor,
        iconType: goal.iconType,
        iconBg: goal.iconBg,
        target: goal.target,
        targetDate: goal.targetDate,
        type: goal.type,
        user_id: goal.userId
      }]);
  };
  
  // Add a goal to Supabase
  const addGoal = async (newGoal: Goal) => {
    try {
      const { data, error } = await supabase
        .from('goals')
        .insert([{
          title: newGoal.title,
          description: newGoal.description,
          progress: newGoal.progress,
          status: newGoal.status,
          statusColor: newGoal.statusColor,
          iconType: newGoal.iconType,
          iconBg: newGoal.iconBg,
          target: newGoal.target,
          targetDate: newGoal.targetDate,
          type: newGoal.type,
          user_id: userId
        }])
        .select();
        
      if (error) {
        throw error;
      }
      
      if (data && data[0]) {
        const formattedGoal = {
          id: data[0].id,
          title: data[0].title,
          description: data[0].description,
          progress: data[0].progress,
          status: data[0].status,
          statusColor: data[0].statusColor,
          iconType: data[0].iconType,
          iconBg: data[0].iconBg,
          target: data[0].target,
          targetDate: data[0].targetDate,
          type: data[0].type,
          userId: data[0].user_id
        };
        
        setGoals(prev => [...prev, formattedGoal]);
        
        toast({
          title: "Meta adicionada",
          description: "A nova meta foi adicionada com sucesso.",
        });
      }
    } catch (err) {
      console.error('Error adding goal:', err);
      toast({
        title: "Erro ao adicionar meta",
        description: "Ocorreu um erro ao adicionar a meta.",
        variant: "destructive"
      });
    }
  };
  
  // Update goal progress
  const updateGoalProgress = async (goalId: string, newProgress: number) => {
    try {
      // Calculate new status based on progress
      const newStatus = newProgress >= 100 
        ? "Concluído" 
        : newProgress > 75 
        ? "Quase Concluído" 
        : "Em Progresso";
        
      const newStatusColor = newProgress >= 100 
        ? "text-green-500" 
        : newProgress > 75
        ? "text-green-500" 
        : "text-yellow-500";
      
      // Update in Supabase
      const { error } = await supabase
        .from('goals')
        .update({ 
          progress: newProgress,
          status: newStatus,
          statusColor: newStatusColor
        })
        .eq('id', goalId);
        
      if (error) {
        throw error;
      }
      
      // Update local state
      setGoals(goals.map(goal => 
        goal.id === goalId 
          ? { 
              ...goal, 
              progress: newProgress,
              status: newStatus,
              statusColor: newStatusColor
            } 
          : goal
      ));
      
      toast({
        title: "Progresso atualizado",
        description: "O progresso da meta foi atualizado com sucesso.",
      });
    } catch (err) {
      console.error('Error updating goal progress:', err);
      toast({
        title: "Erro ao atualizar progresso",
        description: "Ocorreu um erro ao atualizar o progresso da meta.",
        variant: "destructive"
      });
    }
  };
  
  // Remove a goal
  const removeGoal = async (goalId: string) => {
    try {
      const { error } = await supabase
        .from('goals')
        .delete()
        .eq('id', goalId);
        
      if (error) {
        throw error;
      }
      
      setGoals(goals.filter(goal => goal.id !== goalId));
      
      toast({
        title: "Meta removida",
        description: "A meta foi removida com sucesso.",
        variant: "destructive"
      });
    } catch (err) {
      console.error('Error removing goal:', err);
      toast({
        title: "Erro ao remover meta",
        description: "Ocorreu um erro ao remover a meta.",
        variant: "destructive"
      });
    }
  };
  
  // Calculate metrics
  const completedGoalsCount = goals.filter(g => g.progress >= 100).length;
  const recentlyCompletedCount = goals.filter(g => g.progress >= 100 && g.id.includes('new')).length;
  const inProgressCount = goals.filter(g => g.progress < 100).length;
  
  // Calculate total progress for the main goal
  const totalProgress = goals.length > 0
    ? Math.min(
        Math.round(goals.reduce((acc, goal) => acc + (goal.progress / goals.length), 0)),
        100
      )
    : 0;
  
  return { 
    goals, 
    addGoal, 
    updateGoalProgress, 
    removeGoal,
    totalProgress,
    completedGoalsCount,
    recentlyCompletedCount,
    inProgressCount,
    isLoading,
    error
  };
};
