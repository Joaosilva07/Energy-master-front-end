
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ZapIcon, Info, Users, ArrowLeft, Heart, Award, Target, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const SobreNos = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="fixed w-full z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto py-3 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ZapIcon className="h-5 w-5 text-energy-primary" />
            <span className="font-semibold">EnergyMaster</span>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/')}
            >
              Home
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/faq')}
            >
              FAQ
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto pt-24 px-4 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 text-center">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-energy-primary/10 flex items-center justify-center">
                <Info className="h-8 w-8 text-energy-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4">Sobre o EnergyMaster</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Conheça nossa história, missão e como estamos transformando a maneira como as pessoas gerenciam seu consumo de energia.
            </p>
          </div>

          {/* Nossa História */}
          <div className="grid gap-12">
            <Card className="overflow-hidden border-none shadow-lg bg-white dark:bg-gray-800">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="p-8 flex flex-col justify-center">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Heart className="h-5 w-5 text-energy-primary" />
                    Nossa História
                  </h2>
                  <p className="mb-4 text-muted-foreground">
                    O <strong>EnergyMaster</strong> nasceu em 2023 da visão de um grupo de engenheiros e especialistas em sustentabilidade que acreditavam que a tecnologia poderia transformar a maneira como consumimos energia.
                  </p>
                  <p className="text-muted-foreground">
                    Com anos de experiência no setor energético, nossa equipe fundadora identificou que muitas residências desperdiçavam energia simplesmente por falta de informações claras e ferramentas adequadas para monitoramento.
                  </p>
                </div>
                <div className="bg-gradient-to-r from-energy-primary to-energy-secondary h-full">
                  <AspectRatio ratio={4/3}>
                    <img 
                      src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9"
                      alt="Energia sustentável" 
                      className="object-cover w-full h-full mix-blend-overlay opacity-60" 
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ZapIcon className="h-24 w-24 text-white" />
                    </div>
                  </AspectRatio>
                </div>
              </div>
            </Card>

            {/* Nossa Missão */}
            <Card className="overflow-hidden border-none shadow-lg bg-white dark:bg-gray-800">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-full order-last md:order-first">
                  <AspectRatio ratio={4/3}>
                    <img 
                      src="https://images.unsplash.com/photo-1721322800607-8c38375eef04"
                      alt="Casa inteligente" 
                      className="object-cover w-full h-full mix-blend-overlay opacity-60" 
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Target className="h-24 w-24 text-white" />
                    </div>
                  </AspectRatio>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Award className="h-5 w-5 text-energy-primary" />
                    Nossa Missão
                  </h2>
                  <p className="mb-4 text-muted-foreground">
                    Acreditamos que pequenas mudanças podem gerar grandes impactos. Nossa missão é capacitar os usuários com informações precisas e ferramentas eficientes para tomar decisões mais conscientes sobre o uso de energia.
                  </p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mt-1">
                        <div className="h-2 w-2 rounded-full bg-green-600"></div>
                      </div>
                      <span>Reduzir o desperdício de energia em residências</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mt-1">
                        <div className="h-2 w-2 rounded-full bg-green-600"></div>
                      </div>
                      <span>Diminuir custos com contas de eletricidade</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mt-1">
                        <div className="h-2 w-2 rounded-full bg-green-600"></div>
                      </div>
                      <span>Promover hábitos mais sustentáveis</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Como Funcionamos */}
            <Card className="overflow-hidden border-none shadow-lg bg-white dark:bg-gray-800">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="p-8 flex flex-col justify-center">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-energy-primary" />
                    Como Funcionamos
                  </h2>
                  <p className="mb-4 text-muted-foreground">
                    Nossa plataforma se conecta com os dispositivos da sua residência para coletar dados de consumo em tempo real. Através de algoritmos avançados e inteligência artificial, processamos essas informações para oferecer insights valiosos e recomendações personalizadas.
                  </p>
                  <p className="mb-4 text-muted-foreground">
                    O EnergyMaster permite:
                  </p>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                        <ZapIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="text-sm">Monitoramento em tempo real</span>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                        <Target className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="text-sm">Metas de economia</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-teal-500 to-green-500 h-full">
                  <AspectRatio ratio={4/3}>
                    <img 
                      src="https://images.unsplash.com/photo-1487958449943-2429e8be8625"
                      alt="Tecnologia sustentável" 
                      className="object-cover w-full h-full mix-blend-overlay opacity-60" 
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Users className="h-24 w-24 text-white" />
                    </div>
                  </AspectRatio>
                </div>
              </div>
            </Card>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-4">Pronto para economizar energia?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de usuários que estão economizando energia e reduzindo suas contas de eletricidade com o EnergyMaster.
            </p>
            <Button 
              size="lg" 
              className="bg-energy-primary hover:bg-energy-primary/90"
              onClick={() => navigate('/signup')}
            >
              Começar agora
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SobreNos;
