
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Trophy, Target, TrendingDown, Plus, Check, Clock, Trash2 } from 'lucide-react';
import AddGoalForm from '@/components/AddGoalForm';
import { useToast } from "@/components/ui/use-toast";

const Metas = () => {
  const { toast } = useToast();
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);
  const [goals, setGoals] = useState(() => {
    const savedGoals = localStorage.getItem('goals');
    return savedGoals ? JSON.parse(savedGoals) : initialGoals;
  });

  // Calculate total progress for the main goal
  const totalProgress = Math.min(
    Math.round(goals.reduce((acc, goal) => acc + (goal.progress / goals.length), 0)),
    100
  );

  // Save goals to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals));
  }, [goals]);

  const handleAddGoal = (newGoal) => {
    setGoals([...goals, newGoal]);
  };

  const updateGoalProgress = (goalId, newProgress) => {
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

  const removeGoal = (goalId) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
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

          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <Card className="bg-energy-primary text-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Trophy className="h-8 w-8" />
                  <div>
                    <p className="text-sm opacity-90">Meta Principal</p>
                    <h3 className="text-2xl font-bold">Redução de 20%</h3>
                  </div>
                </div>
                <Progress value={totalProgress} className="bg-white/20 h-2" />
                <p className="text-sm mt-2">{totalProgress}% alcançado</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">Metas Concluídas</p>
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="text-3xl font-bold">{goals.filter(g => g.progress >= 100).length}</p>
                </div>
                <p className="text-sm text-muted-foreground">+{goals.filter(g => g.progress >= 100 && g.id.includes('new')).length} no último mês</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">Metas em Andamento</p>
                    <Clock className="h-5 w-5 text-yellow-500" />
                  </div>
                  <p className="text-3xl font-bold">{goals.filter(g => g.progress < 100).length}</p>
                </div>
                <p className="text-sm text-muted-foreground">Próxima conclusão em breve</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {goals.map((goal) => (
              <Card key={goal.id}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`rounded-lg p-2 ${goal.iconBg}`}>
                      {goal.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{goal.title}</h3>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm ${goal.statusColor}`}>{goal.status}</span>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => removeGoal(goal.id)}
                            className="text-red-500 hover:bg-red-50 h-8 w-8"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{goal.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span>Progresso</span>
                        <span>{goal.progress}%</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Progress value={goal.progress} className="h-2 flex-1" />
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => updateGoalProgress(goal.id, Math.min(goal.progress + 10, 100))}
                          className="h-7 text-xs"
                        >
                          Atualizar
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <AddGoalForm 
            open={isAddGoalOpen} 
            onOpenChange={setIsAddGoalOpen} 
            onAddGoal={handleAddGoal}
          />
        </main>
      </div>
    </div>
  );
};

// Initial goals data
const initialGoals = [
  {
    id: '1',
    title: "Reduzir Consumo Total",
    description: "Diminuir o consumo mensal em 20% em relação ao mês anterior",
    progress: 65,
    status: "Em Progresso",
    statusColor: "text-yellow-500",
    icon: <Target className="h-5 w-5 text-energy-primary" />,
    iconBg: "bg-energy-primary/10"
  },
  {
    id: '2',
    title: "Otimizar Ar Condicionado",
    description: "Reduzir o consumo do A/C em 30% através de programação inteligente",
    progress: 85,
    status: "Quase Concluído",
    statusColor: "text-green-500",
    icon: <TrendingDown className="h-5 w-5 text-green-500" />,
    iconBg: "bg-green-100"
  },
  {
    id: '3',
    title: "Meta de Pico",
    description: "Manter o pico de consumo abaixo de 2.5 kWh/h",
    progress: 40,
    status: "Em Andamento",
    statusColor: "text-yellow-500",
    icon: <Trophy className="h-5 w-5 text-yellow-500" />,
    iconBg: "bg-yellow-100"
  }
];

export default Metas;
