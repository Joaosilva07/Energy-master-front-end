
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, ThermometerSun, Timer, Zap } from 'lucide-react';
import { useTips, Tip } from '@/hooks/useTips';
import { renderIcon } from '@/utils/iconRenderer';

const Dicas = () => {
  const { featuredTips, dailyTip, getTipsByCategory, isLoading } = useTips();
  const [activeCategory, setActiveCategory] = useState("todos");

  const categories = [
    { value: "todos", label: "Todos" },
    { value: "iluminacao", label: "Iluminação" },
    { value: "climatizacao", label: "Climatização" },
    { value: "eletrodomesticos", label: "Eletrodomésticos" }
  ];

  const getTipsByActiveCategory = () => {
    if (activeCategory === "todos") return featuredTips;
    return getTipsByCategory(activeCategory);
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Dicas de Economia</h1>
            <p className="text-muted-foreground">Recomendações para economizar energia</p>
          </div>

          {isLoading ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">Carregando dicas...</p>
            </div>
          ) : (
            <>
              {/* Dica do dia */}
              {dailyTip && (
                <Card className="mb-6 border-2 border-energy-primary/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-energy-primary" />
                      Dica do Dia
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg p-2 bg-energy-primary/10">
                        {renderIcon(dailyTip.icon)}
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">{dailyTip.title}</h3>
                        <p className="text-muted-foreground">{dailyTip.description}</p>
                        {dailyTip.savings && (
                          <p className="mt-2 text-sm font-medium text-energy-primary">
                            Economia potencial: {dailyTip.savings}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Categorias de dicas */}
              <Tabs defaultValue="todos" className="w-full" 
                value={activeCategory}
                onValueChange={setActiveCategory}
              >
                <TabsList>
                  {categories.map(cat => (
                    <TabsTrigger key={cat.value} value={cat.value}>
                      {cat.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value={activeCategory} className="mt-6">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {getTipsByActiveCategory().length > 0 ? (
                      getTipsByActiveCategory().map(tip => (
                        <TipCard key={tip.id} tip={tip} />
                      ))
                    ) : (
                      <div className="col-span-full text-center py-10">
                        <p className="text-muted-foreground">
                          Nenhuma dica encontrada para esta categoria.
                        </p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

// Componente de cartão de dica
interface TipCardProps {
  tip: Tip;
}

const TipCard: React.FC<TipCardProps> = ({ tip }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="rounded-lg p-2 bg-energy-primary/10">
            {renderIcon(tip.icon)}
          </div>
          <div>
            <h3 className="font-semibold mb-2">{tip.title}</h3>
            <p className="text-muted-foreground text-sm">{tip.description}</p>
            {tip.savings && (
              <p className="mt-2 text-sm font-medium text-energy-primary">
                Economia: {tip.savings}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Dicas;
