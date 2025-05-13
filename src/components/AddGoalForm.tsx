import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Target, TrendingDown, Activity, Zap } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Goal } from '@/hooks/useGoals';
import { useUser } from '@/contexts/UserContext';

interface AddGoalFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddGoal: (goal: Goal) => void;
}

const goalTypes = [
  { value: 'reduction', label: 'Redução de Consumo', icon: <TrendingDown className="h-5 w-5 text-energy-primary" />, bgColor: 'bg-energy-primary/10', iconType: 'trendingDown' },
  { value: 'optimization', label: 'Otimização de Dispositivo', icon: <Zap className="h-5 w-5 text-green-500" />, bgColor: 'bg-green-100', iconType: 'zap' },
  { value: 'peak', label: 'Controle de Pico', icon: <Activity className="h-5 w-5 text-yellow-500" />, bgColor: 'bg-yellow-100', iconType: 'activity' },
  { value: 'custom', label: 'Meta Personalizada', icon: <Target className="h-5 w-5 text-blue-500" />, bgColor: 'bg-blue-100', iconType: 'target' },
];

const AddGoalForm = ({ open, onOpenChange, onAddGoal }: AddGoalFormProps) => {
  const { toast } = useToast();
  const { user } = useUser();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goalType, setGoalType] = useState('');
  const [targetValue, setTargetValue] = useState('20');
  const [targetDate, setTargetDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedGoalType = goalTypes.find(type => type.value === goalType);
    const userId = user?.id || 'anonymous';

    const newGoal: Goal = {
      id: 'new-' + Date.now().toString(),
      title,
      description,
      type: goalType,
      progress: 0,
      target: parseInt(targetValue),
      targetDate,
      status: "Em Progresso",
      statusColor: "text-yellow-500",
      iconType: selectedGoalType?.iconType || "target",
      iconBg: selectedGoalType?.bgColor || "bg-energy-primary/10",
      userId: userId
    };
    
    onAddGoal(newGoal);
    toast({
      title: "Meta adicionada",
      description: `${title} foi adicionada com sucesso.`,
    });
    
    // Clear form
    setTitle('');
    setDescription('');
    setGoalType('');
    setTargetValue('20');
    setTargetDate('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Criar Nova Meta</DialogTitle>
          <DialogDescription>
            Defina uma nova meta de economia de energia para sua residência.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Título
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3"
                required
                placeholder="Ex: Reduzir Consumo Total"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Descrição
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3"
                required
                placeholder="Descreva sua meta"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Tipo
              </Label>
              <Select value={goalType} onValueChange={setGoalType} required>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione o tipo de meta" />
                </SelectTrigger>
                <SelectContent>
                  {goalTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        {type.icon}
                        <span>{type.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="target" className="text-right">
                Meta ({targetValue}%)
              </Label>
              <div className="col-span-3">
                <Slider
                  id="target"
                  defaultValue={[20]}
                  max={100}
                  step={5}
                  onValueChange={(value) => setTargetValue(value[0].toString())}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Data Alvo
              </Label>
              <Input
                id="date"
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-energy-primary hover:bg-energy-primary/90">
              Criar Meta
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddGoalForm;
