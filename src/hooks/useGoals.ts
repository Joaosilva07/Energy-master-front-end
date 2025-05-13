
import { useState, useEffect } from 'react';
import { useUser } from '@/contexts/UserContext';

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
  const userId = user?.id || 'anonymous';
  
  const [goals, setGoals] = useState<Goal[]>(() => {
    const savedGoals = localStorage.getItem(`goals_${userId}`);
    
    if (savedGoals) {
      return JSON.parse(savedGoals);
    } else if (user) {
      // If the user exists but has no goals, give them the initial set
      const userGoals = initialGoals.map(goal => ({
        ...goal,
        userId
      })) as Goal[];
      return userGoals;
    }
    
    return [];
  });
  
  // Save goals to localStorage whenever they change
  useEffect(() => {
    if (userId) {
      localStorage.setItem(`goals_${userId}`, JSON.stringify(goals));
    }
  }, [goals, userId]);
  
  const addGoal = (newGoal: Omit<Goal, 'userId'>) => {
    const goalWithUserId = {
      ...newGoal,
      userId
    } as Goal;
    
    setGoals([...goals, goalWithUserId]);
  };
  
  const updateGoalProgress = (goalId: string, newProgress: number) => {
    setGoals(goals.map(goal => 
      goal.id === goalId 
        ? { 
            ...goal, 
            progress: newProgress,
            status: newProgress >= 100 
                    ? "Concluído" 
                    : newProgress > 75 
                    ? "Quase Concluído" 
                    : "Em Progresso",
            statusColor: newProgress >= 100 
                        ? "text-green-500" 
                        : newProgress > 75
                        ? "text-green-500" 
                        : "text-yellow-500"
          } 
        : goal
    ));
  };
  
  const removeGoal = (goalId: string) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
  };
  
  // Filter goals for the current user
  const userGoals = goals.filter(goal => goal.userId === userId);
  
  // Calculate total progress for the main goal
  const totalProgress = userGoals.length > 0
    ? Math.min(
        Math.round(userGoals.reduce((acc, goal) => acc + (goal.progress / userGoals.length), 0)),
        100
      )
    : 0;
  
  return { 
    goals: userGoals, 
    addGoal, 
    updateGoalProgress, 
    removeGoal,
    totalProgress,
    completedGoalsCount: userGoals.filter(g => g.progress >= 100).length,
    recentlyCompletedCount: userGoals.filter(g => g.progress >= 100 && g.id.includes('new')).length,
    inProgressCount: userGoals.filter(g => g.progress < 100).length
  };
};
