
import { useState, useEffect } from 'react';
import { useUser } from '@/contexts/UserContext';
import { supabase } from '@/lib/supabase';

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

export const useGoals = () => {
  const { user } = useUser();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalProgress, setTotalProgress] = useState(0);
  const [completedGoalsCount, setCompletedGoalsCount] = useState(0);
  const [recentlyCompletedCount, setRecentlyCompletedCount] = useState(0);
  const [inProgressCount, setInProgressCount] = useState(0);

  // Calculate stats from goals
  const calculateStats = (goalsData: Goal[]) => {
    if (goalsData.length === 0) {
      setTotalProgress(0);
      setCompletedGoalsCount(0);
      setRecentlyCompletedCount(0);
      setInProgressCount(0);
      return;
    }

    // Calculate average progress
    const avgProgress = Math.round(
      goalsData.reduce((acc, goal) => acc + goal.progress, 0) / goalsData.length
    );
    
    // Count completed goals
    const completed = goalsData.filter(goal => goal.progress === 100).length;
    
    // Count goals in progress (more than 0% but less than 100%)
    const inProgress = goalsData.filter(
      goal => goal.progress > 0 && goal.progress < 100
    ).length;
    
    // For recently completed, we're using a mock value for now
    // In a real app, you'd check completion dates
    const recentlyCompleted = Math.min(2, completed);

    setTotalProgress(avgProgress);
    setCompletedGoalsCount(completed);
    setRecentlyCompletedCount(recentlyCompleted);
    setInProgressCount(inProgress);
  };

  // Fetch goals from Supabase or localStorage
  const fetchGoals = async () => {
    if (!user) {
      setGoals([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      // Try to fetch from Supabase
      const { data, error } = await supabase
        .from('goals')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching goals from Supabase:', error);
        
        // Fallback to localStorage
        const savedGoals = localStorage.getItem(`goals_${user.id}`);
        if (savedGoals) {
          const parsedGoals = JSON.parse(savedGoals);
          setGoals(parsedGoals);
          calculateStats(parsedGoals);
        } else {
          setGoals([]);
          calculateStats([]);
        }
      } else {
        // Format data from Supabase
        const formattedGoals = data.map(item => ({
          id: item.id,
          title: item.title,
          description: item.description,
          progress: item.progress,
          status: item.status,
          statusColor: item.statusColor,
          iconType: item.iconType,
          iconBg: item.iconBg,
          target: item.target,
          targetDate: item.targetDate,
          type: item.type,
          userId: item.user_id
        }));
        
        setGoals(formattedGoals);
        calculateStats(formattedGoals);
        
        // Update localStorage as backup
        localStorage.setItem(`goals_${user.id}`, JSON.stringify(formattedGoals));
      }
    } catch (err) {
      console.error('Failed to fetch goals:', err);
      setGoals([]);
      calculateStats([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Add a new goal
  const addGoal = async (goal: Goal) => {
    if (!user) return;
    
    try {
      // Try to insert into Supabase
      const { data, error } = await supabase
        .from('goals')
        .insert({
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
          user_id: user.id
        })
        .select('*')
        .single();

      if (error) {
        console.error('Error adding goal to Supabase:', error);
        
        // Fallback to localStorage
        const newGoal = {
          ...goal,
          userId: user.id,
        };
        
        const updatedGoals = [...goals, newGoal];
        setGoals(updatedGoals);
        calculateStats(updatedGoals);
        localStorage.setItem(`goals_${user.id}`, JSON.stringify(updatedGoals));
      } else {
        // Add the returned goal with its DB ID
        const formattedGoal = {
          id: data.id,
          title: data.title,
          description: data.description,
          progress: data.progress,
          status: data.status,
          statusColor: data.statusColor,
          iconType: data.iconType,
          iconBg: data.iconBg,
          target: data.target,
          targetDate: data.targetDate,
          type: data.type,
          userId: data.user_id
        };
        
        const updatedGoals = [...goals, formattedGoal];
        setGoals(updatedGoals);
        calculateStats(updatedGoals);
        localStorage.setItem(`goals_${user.id}`, JSON.stringify(updatedGoals));
      }
    } catch (err) {
      console.error('Failed to add goal:', err);
    }
  };

  // Update goal progress
  const updateGoalProgress = async (id: string, progress: number) => {
    if (!user) return;

    const goalIndex = goals.findIndex(g => g.id === id);
    if (goalIndex === -1) return;
    
    // Determine new status based on progress
    let status = 'Em Progresso';
    let statusColor = 'text-yellow-500';
    
    if (progress === 0) {
      status = 'Não Iniciado';
      statusColor = 'text-gray-500';
    } else if (progress === 100) {
      status = 'Concluído';
      statusColor = 'text-green-500';
    }
    
    const updatedGoal = {
      ...goals[goalIndex],
      progress,
      status,
      statusColor
    };
    
    const updatedGoals = [...goals];
    updatedGoals[goalIndex] = updatedGoal;
    
    // Update state first for immediate UI feedback
    setGoals(updatedGoals);
    calculateStats(updatedGoals);
    
    try {
      // Update in Supabase
      const { error } = await supabase
        .from('goals')
        .update({ 
          progress,
          status,
          statusColor
        })
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error updating goal in Supabase:', error);
        // Fallback to localStorage
        localStorage.setItem(`goals_${user.id}`, JSON.stringify(updatedGoals));
      }
    } catch (err) {
      console.error('Failed to update goal:', err);
      localStorage.setItem(`goals_${user.id}`, JSON.stringify(updatedGoals));
    }
  };

  // Remove a goal
  const removeGoal = async (id: string) => {
    if (!user) return;
    
    try {
      // Delete from Supabase
      const { error } = await supabase
        .from('goals')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error removing goal from Supabase:', error);
      }
      
      // Update state regardless of Supabase result
      const updatedGoals = goals.filter(goal => goal.id !== id);
      setGoals(updatedGoals);
      calculateStats(updatedGoals);
      
      // Update localStorage
      localStorage.setItem(`goals_${user.id}`, JSON.stringify(updatedGoals));
    } catch (err) {
      console.error('Failed to remove goal:', err);
    }
  };

  // Load goals when component mounts or user changes
  useEffect(() => {
    fetchGoals();
  }, [user?.id]);

  return {
    goals,
    isLoading,
    addGoal,
    updateGoalProgress,
    removeGoal,
    totalProgress,
    completedGoalsCount,
    recentlyCompletedCount,
    inProgressCount,
    fetchGoals
  };
};
