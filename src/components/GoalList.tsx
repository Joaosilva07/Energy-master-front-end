
import React from 'react';
import { Goal } from '@/hooks/useGoals';
import GoalCard from './GoalCard';

interface GoalListProps {
  goals: Goal[];
  onUpdateProgress: (goalId: string, newProgress: number) => void;
  onRemoveGoal: (goalId: string) => void;
}

const GoalList = ({ goals, onUpdateProgress, onRemoveGoal }: GoalListProps) => {
  return (
    <div className="space-y-6">
      {goals.map((goal) => (
        <GoalCard 
          key={goal.id} 
          goal={goal} 
          onUpdateProgress={onUpdateProgress} 
          onRemoveGoal={onRemoveGoal} 
        />
      ))}
    </div>
  );
};

export default GoalList;
