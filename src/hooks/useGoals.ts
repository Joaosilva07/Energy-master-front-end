
import { useState, useEffect } from 'react';
import { Target, TrendingDown, Activity, Trophy } from "lucide-react";

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
}

// Initial goals data
const initialGoals: Goal[] = [
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
  const [goals, setGoals] = useState<Goal[]>(() => {
    const savedGoals = localStorage.getItem('goals');
    return savedGoals ? JSON.parse(savedGoals) : initialGoals;
  });
  
  // Save goals to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals));
  }, [goals]);
  
  const addGoal = (newGoal: Goal) => {
    setGoals([...goals, newGoal]);
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
  
  // Calculate total progress for the main goal
  const totalProgress = Math.min(
    Math.round(goals.reduce((acc, goal) => acc + (goal.progress / goals.length), 0)),
    100
  );
  
  return { 
    goals, 
    addGoal, 
    updateGoalProgress, 
    removeGoal,
    totalProgress,
    completedGoalsCount: goals.filter(g => g.progress >= 100).length,
    recentlyCompletedCount: goals.filter(g => g.progress >= 100 && g.id.includes('new')).length,
    inProgressCount: goals.filter(g => g.progress < 100).length
  };
};
