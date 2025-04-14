
import React from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, ThermometerSun, Timer, Zap } from 'lucide-react';

const Dicas = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Dicas de Economia</h1>
            <p className="text-muted-foreground">Aprenda como economizar energia</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 mb-8">
            {featuredTips.map((tip, index) => (
              <Card key={index} className="border-l-4 border-l-energy-primary">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg p-2 bg-energy-primary/10">
                      {tip.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{tip.title}</h3>
                      <p className="text-sm text-muted-foreground">{tip.description}</p>
                      <p className="text-sm font-medium text-energy-primary mt-2">
                        Economia potencial: {tip.savings}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Dica do Dia</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center text-center p-6 bg-muted/50 rounded-lg">
                <Lightbulb className="h-12 w-12 text-yellow-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Use Luz Natural</h3>
                <p className="text-muted-foreground max-w-2xl">
                  Aproveite a luz natural durante o dia. Posicione móveis próximos às janelas e 
                  mantenha as cortinas abertas. Isso pode reduzir o uso de iluminação artificial 
                  em até 60% durante o dia.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-3">
            {categories.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {category.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start gap-3">
                        <div className="rounded-full p-1 bg-energy-primary/10">
                          <div className="h-2 w-2 rounded-full bg-energy-primary" />
                        </div>
                        <span className="text-sm">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

const featuredTips = [
  {
    icon: <ThermometerSun className="h-6 w-6 text-energy-primary" />,
    title: "Otimize seu Ar Condicionado",
    description: "Mantenha a temperatura em 23°C e faça limpeza regular dos filtros.",
    savings: "25% no consumo de A/C"
  },
  {
    icon: <Timer className="h-6 w-6 text-energy-primary" />,
    title: "Programe seus Dispositivos",
    description: "Configure timers para desligar aparelhos em horários específicos.",
    savings: "15% no consumo geral"
  }
];

const categories = [
  {
    title: "Iluminação",
    tips: [
      "Substitua lâmpadas antigas por LED",
      "Aproveite a luz natural",
      "Use sensores de movimento",
      "Pinte paredes com cores claras"
    ]
  },
  {
    title: "Eletrodomésticos",
    tips: [
      "Evite deixar em standby",
      "Faça manutenção regular",
      "Prefira aparelhos eficientes",
      "Use no horário adequado"
    ]
  },
  {
    title: "Climatização",
    tips: [
      "Mantenha janelas fechadas",
      "Limpe filtros regularmente",
      "Use temperatura adequada",
      "Evite sol direto"
    ]
  }
];

export default Dicas;
