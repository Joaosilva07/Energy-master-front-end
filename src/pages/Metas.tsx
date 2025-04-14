
import React from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Trophy, Target, TrendingDown, Plus, Check, Clock } from 'lucide-react';

const Metas = () => {
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
              <Button className="bg-energy-primary hover:bg-energy-primary/90">
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
                <Progress value={65} className="bg-white/20 h-2" indicatorClassName="bg-white" />
                <p className="text-sm mt-2">13% alcançado</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">Metas Concluídas</p>
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="text-3xl font-bold">4</p>
                </div>
                <p className="text-sm text-muted-foreground">+2 no último mês</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">Metas em Andamento</p>
                    <Clock className="h-5 w-5 text-yellow-500" />
                  </div>
                  <p className="text-3xl font-bold">3</p>
                </div>
                <p className="text-sm text-muted-foreground">Próxima conclusão em 5 dias</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {goals.map((goal, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`rounded-lg p-2 ${goal.iconBg}`}>
                      {goal.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{goal.title}</h3>
                        <span className={`text-sm ${goal.statusColor}`}>{goal.status}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{goal.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span>Progresso</span>
                        <span>{goal.progress}%</span>
                      </div>
                      <Progress value={goal.progress} className="h-2 mt-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

const goals = [
  {
    title: "Reduzir Consumo Total",
    description: "Diminuir o consumo mensal em 20% em relação ao mês anterior",
    progress: 65,
    status: "Em Progresso",
    statusColor: "text-yellow-500",
    icon: <Target className="h-5 w-5 text-energy-primary" />,
    iconBg: "bg-energy-primary/10"
  },
  {
    title: "Otimizar Ar Condicionado",
    description: "Reduzir o consumo do A/C em 30% através de programação inteligente",
    progress: 85,
    status: "Quase Concluído",
    statusColor: "text-green-500",
    icon: <TrendingDown className="h-5 w-5 text-green-500" />,
    iconBg: "bg-green-100"
  },
  {
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
