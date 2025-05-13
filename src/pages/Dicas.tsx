
import React from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, ThermometerSun, Timer, Zap } from 'lucide-react';
import { useTips, Tip } from '@/hooks/useTips';
import { iconRenderer } from '@/utils/iconRenderer';

const Dicas = () => {
  const { featuredTips, dailyTip, getTipsByCategory, isLoading } = useTips();
  
  const categories = [
    { title: "Iluminação", id: "iluminacao" },
    { title: "Eletrodomésticos", id: "eletrodomesticos" },
    { title: "Climatização", id: "climatizacao" }
  ];

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
          
          {isLoading ? (
            <div className="flex items-center justify-center h-40">
              <p>Carregando dicas...</p>
            </div>
          ) : (
            <>
              <div className="grid gap-6 md:grid-cols-2 mb-8">
                {featuredTips.map((tip, index) => (
                  <Card key={tip.id} className="border-l-4 border-l-energy-primary">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="rounded-lg p-2 bg-energy-primary/10">
                          {iconRenderer(tip.icon)}
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">{tip.title}</h3>
                          <p className="text-sm text-muted-foreground">{tip.description}</p>
                          {tip.savings && (
                            <p className="text-sm font-medium text-energy-primary mt-2">
                              Economia potencial: {tip.savings}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {dailyTip && (
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>Dica do Dia</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center text-center p-6 bg-muted/50 rounded-lg">
                      <Lightbulb className="h-12 w-12 text-yellow-500 mb-4" />
                      <h3 className="text-xl font-semibold mb-2">{dailyTip.title}</h3>
                      <p className="text-muted-foreground max-w-2xl">
                        {dailyTip.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="grid gap-6 md:grid-cols-3">
                {categories.map((category) => {
                  const categoryTips = getTipsByCategory(category.id);
                  return (
                    <Card key={category.id}>
                      <CardHeader>
                        <CardTitle className="text-lg">{category.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-4">
                          {categoryTips.map((tip) => (
                            <li key={tip.id} className="flex items-start gap-3">
                              <div className="rounded-full p-1 bg-energy-primary/10">
                                <div className="h-2 w-2 rounded-full bg-energy-primary" />
                              </div>
                              <span className="text-sm">{tip.title}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dicas;
