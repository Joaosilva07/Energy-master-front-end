
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, ThermometerSun, Timer, Zap, Search } from 'lucide-react';
import { useTips, Tip } from '@/hooks/useTips';
import { renderIcon } from '@/utils/iconRenderer';
import { Input } from '@/components/ui/input';
import { deviceModels, searchDeviceModels, DeviceModel } from '@/utils/energyDataset';

const Dicas = () => {
  const { featuredTips, dailyTip, getTipsByCategory, isLoading } = useTips();
  const [activeCategory, setActiveCategory] = useState("todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredModels, setFilteredModels] = useState<DeviceModel[]>([]);
  const [showingModelSearch, setShowingModelSearch] = useState(false);

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

  // Update filtered models when search query changes
  useEffect(() => {
    setFilteredModels(searchDeviceModels(searchQuery));
  }, [searchQuery]);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Dicas de Economia</h1>
              <p className="text-muted-foreground">Recomendações para economizar energia</p>
            </div>
            <div className="flex gap-2">
              <button 
                className={`px-3 py-1.5 text-sm font-medium rounded-md flex items-center gap-1.5 ${
                  showingModelSearch ? "bg-energy-primary text-white" : "bg-muted text-muted-foreground"
                }`}
                onClick={() => setShowingModelSearch(!showingModelSearch)}
              >
                <Search className="h-4 w-4" />
                Modelos de Dispositivos
              </button>
            </div>
          </div>

          {showingModelSearch && (
            <div className="mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Search className="h-5 w-5 text-energy-primary" />
                    Consultar Modelos de Dispositivos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Input 
                      placeholder="Busque por fabricante, modelo ou tipo..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="mb-4"
                    />
                    
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="py-2 text-left font-medium">Fabricante</th>
                            <th className="py-2 text-left font-medium">Modelo</th>
                            <th className="py-2 text-left font-medium">Tipo</th>
                            <th className="py-2 text-left font-medium">Consumo Médio</th>
                            <th className="py-2 text-left font-medium">Consumo em Standby</th>
                            <th className="py-2 text-left font-medium">Classe Energética</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredModels.length > 0 ? (
                            filteredModels.map((model) => (
                              <tr key={model.id} className="border-b border-gray-100">
                                <td className="py-2">{model.manufacturer}</td>
                                <td className="py-2">{model.model}</td>
                                <td className="py-2 capitalize">{model.type}</td>
                                <td className="py-2">{model.averageConsumption} W</td>
                                <td className="py-2">{model.standbyConsumption} W</td>
                                <td className="py-2">
                                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                    model.energyClass.includes('A') ? 'bg-green-100 text-green-700' : 
                                    model.energyClass.includes('B') ? 'bg-blue-100 text-blue-700' : 
                                    'bg-yellow-100 text-yellow-700'
                                  }`}>
                                    {model.energyClass}
                                  </span>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={6} className="py-4 text-center text-muted-foreground">
                                Nenhum modelo encontrado com os critérios de pesquisa.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

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
