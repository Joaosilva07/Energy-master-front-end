
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { ZapIcon, Info, Users } from "lucide-react";

const SobreNos = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-y-auto">
        <Header />
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                <Info className="h-6 w-6 text-energy-primary" />
                Sobre Nós
              </h1>
              <p className="text-muted-foreground">
                Conheça mais sobre o EnergyMaster e nossa missão
              </p>
            </div>

            <div className="grid gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ZapIcon className="h-5 w-5 text-energy-primary" />
                    Quem Somos
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <p className="mb-4">
                        O <strong>EnergyMaster</strong> é uma plataforma inovadora dedicada ao monitoramento e otimização do consumo de energia residencial. Nossa missão é ajudar pessoas como você a entender melhor seus padrões de consumo energético e oferecer soluções inteligentes para reduzir gastos e promover um uso mais sustentável da energia.
                      </p>
                      <p>
                        Fundada em 2023 por uma equipe de especialistas em tecnologia e sustentabilidade, nossa plataforma combina análise de dados avançada, inteligência artificial e uma interface amigável para transformar a maneira como as residências gerenciam seu consumo de energia.
                      </p>
                    </div>
                    <div>
                      <AspectRatio ratio={4/3} className="bg-muted rounded-md overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9"
                          alt="Energia sustentável" 
                          className="object-cover w-full h-full" 
                        />
                      </AspectRatio>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-energy-primary" />
                    Nossa Missão
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <AspectRatio ratio={4/3} className="bg-muted rounded-md overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1721322800607-8c38375eef04"
                          alt="Casa inteligente" 
                          className="object-cover w-full h-full" 
                        />
                      </AspectRatio>
                    </div>
                    <div className="md:col-span-2">
                      <p className="mb-4">
                        Acreditamos que pequenas mudanças podem gerar grandes impactos. Nossa missão é capacitar os usuários com informações precisas e ferramentas eficientes para tomar decisões mais conscientes sobre o uso de energia.
                      </p>
                      <p className="mb-4">
                        Através do EnergyMaster, buscamos:
                      </p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Reduzir o desperdício de energia em residências</li>
                        <li>Diminuir custos com contas de eletricidade</li>
                        <li>Promover hábitos mais sustentáveis</li>
                        <li>Contribuir para um futuro com menor impacto ambiental</li>
                        <li>Incentivar o uso de tecnologias inteligentes para gestão energética</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Como Funcionamos</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <p className="mb-4">
                        Nossa plataforma se conecta com os dispositivos da sua residência para coletar dados de consumo em tempo real. Através de algoritmos avançados e inteligência artificial, processamos essas informações para oferecer insights valiosos e recomendações personalizadas.
                      </p>
                      <p className="mb-4">
                        O EnergyMaster permite:
                      </p>
                      <ul className="list-disc pl-5 space-y-2 mb-4">
                        <li>Monitorar o consumo de energia em tempo real</li>
                        <li>Identificar dispositivos que mais consomem energia</li>
                        <li>Receber alertas sobre anomalias no consumo</li>
                        <li>Estabelecer metas de economia</li>
                        <li>Acessar dicas personalizadas para redução de consumo</li>
                        <li>Integrar com assistentes de voz como Alexa</li>
                      </ul>
                      <p>
                        Todo esse processo é desenvolvido com o mais alto padrão de segurança, garantindo a privacidade dos seus dados e oferecendo uma experiência simples e eficiente.
                      </p>
                    </div>
                    <div>
                      <AspectRatio ratio={4/3} className="bg-muted rounded-md overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1487958449943-2429e8be8625"
                          alt="Tecnologia sustentável" 
                          className="object-cover w-full h-full" 
                        />
                      </AspectRatio>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SobreNos;
