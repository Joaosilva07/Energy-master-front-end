
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Check, Clock } from 'lucide-react';

interface GoalSummaryCardsProps {
  totalProgress: number;
  completedGoalsCount: number;
  recentlyCompletedCount: number;
  inProgressCount: number;
}

const GoalSummaryCards = ({ 
  totalProgress,
  completedGoalsCount,
  recentlyCompletedCount,
  inProgressCount
}: GoalSummaryCardsProps) => {
  return (
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
            <p className="text-3xl font-bold">{completedGoalsCount}</p>
          </div>
          <p className="text-sm text-muted-foreground">+{recentlyCompletedCount} no último mês</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <p className="font-medium">Metas em Andamento</p>
              <Clock className="h-5 w-5 text-yellow-500" />
            </div>
            <p className="text-3xl font-bold">{inProgressCount}</p>
          </div>
          <p className="text-sm text-muted-foreground">Próxima conclusão em breve</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default GoalSummaryCards;
