
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import GoalSummaryCards from '@/components/GoalSummaryCards';
import GoalList from '@/components/GoalList';
import AddGoalForm from '@/components/AddGoalForm';
import { useGoals } from '@/hooks/useGoals';
import { useToast } from '@/components/ui/use-toast';

const Metas = () => {
  const { toast } = useToast();
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);
  const { 
    goals, 
    addGoal, 
    updateGoalProgress, 
    removeGoal, 
    totalProgress,
    completedGoalsCount,
    recentlyCompletedCount,
    inProgressCount
  } = useGoals();

  const handleRemoveGoal = (goalId: string) => {
    removeGoal(goalId);
    toast({
      title: "Meta removida",
      description: "A meta foi removida com sucesso.",
      variant: "destructive"
    });
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Metas de Consumo</h1>
                <p className="text-muted-foreground">Defina e acompanhe suas metas de economia</p>
              </div>
              <Button 
                className="bg-energy-primary hover:bg-energy-primary/90"
                onClick={() => setIsAddGoalOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Nova Meta
              </Button>
            </div>
          </div>

          <GoalSummaryCards 
            totalProgress={totalProgress}
            completedGoalsCount={completedGoalsCount}
            recentlyCompletedCount={recentlyCompletedCount}
            inProgressCount={inProgressCount}
          />

          <GoalList 
            goals={goals}
            onUpdateProgress={updateGoalProgress}
            onRemoveGoal={handleRemoveGoal}
          />

          <AddGoalForm 
            open={isAddGoalOpen} 
            onOpenChange={setIsAddGoalOpen} 
            onAddGoal={addGoal}
          />
        </main>
      </div>
    </div>
  );
};

export default Metas;
