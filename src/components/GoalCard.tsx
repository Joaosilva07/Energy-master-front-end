
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Trash2 } from 'lucide-react';
import { renderIcon } from '@/utils/iconRenderer';
import { Goal } from '@/hooks/useGoals';

interface GoalCardProps {
  goal: Goal;
  onUpdateProgress: (goalId: string, newProgress: number) => void;
  onRemoveGoal: (goalId: string) => void;
}

const GoalCard = ({ goal, onUpdateProgress, onRemoveGoal }: GoalCardProps) => {
  return (
    <Card key={goal.id}>
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className={`rounded-lg p-2 ${goal.iconBg}`}>
            {renderIcon(goal.iconType)}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">{goal.title}</h3>
              <div className="flex items-center gap-2">
                <span className={`text-sm ${goal.statusColor}`}>{goal.status}</span>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => onRemoveGoal(goal.id)}
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
                onClick={() => onUpdateProgress(goal.id, Math.min(goal.progress + 10, 100))}
                className="h-7 text-xs"
              >
                Atualizar
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalCard;
