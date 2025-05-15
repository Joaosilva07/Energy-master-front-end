import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ZapIcon, LightbulbIcon, BarChart3, Target, ArrowRight, Home as HomeIcon } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="fixed w-full z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto py-3 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HomeIcon className="h-5 w-5 text-energy-primary" />
            <span className="font-semibold">EnergyMaster</span>
          </div>
          <div className="flex items-center gap-3">
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
              onClick={() => navigate('/signup')}
            >
              Registrar
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/sobrenos')}
            >
              Sobre Nós
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
      
      {/* Hero Section with Background Image */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24">
        {/* Background overlay with reduced opacity */}
        <div className="absolute inset-0 z-0 bg-black/30"></div>
        
        {/* Background image with improved z-index and styling */}
        <div 
          className="absolute inset-0 z-[-1] bg-cover bg-center bg-fixed" 
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80)',
            backgroundSize: 'cover',
          }}
        ></div>
        
        <div className="container relative z-10 mx-auto max-w-5xl">
          <div className="flex flex-col items-center text-center">
            <div className="flex justify-center mb-6">
              <div className="rounded-full bg-gradient-to-r from-energy-primary to-energy-secondary p-6">
                <ZapIcon className="h-16 w-16 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white px-4">
              EnergyMaster
            </h1>
            
            <p className="text-xl text-white mb-8 max-w-2xl px-4">
              Monitore e gerencie o consumo de energia da sua casa com inteligência e eficiência. 
              Economize energia e reduza sua conta de luz.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-energy-primary hover:bg-energy-primary/90"
                onClick={() => navigate('/login')}
              >
                Entrar na plataforma
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20"
                onClick={() => navigate('/signup')}
              >
                Criar uma conta
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Recursos principais</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Monitoramento em tempo real</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Acompanhe o consumo de energia dos seus dispositivos em tempo real com gráficos detalhados e relatórios.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-2">
                  <LightbulbIcon className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Dicas de economia</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Receba recomendações personalizadas para economizar energia baseadas no seu padrão de consumo.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Metas de consumo</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Estabeleça metas de economia e acompanhe seu progresso com ferramentas intuitivas.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Testimonial Section */}
      <section className="py-12 md:py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-12">O que nossos usuários dizem</h2>
          
          <div className="bg-card p-8 rounded-xl shadow-md">
            <p className="text-xl italic mb-6">
              "Com o EnergyMaster, consegui reduzir minha conta de luz em 25% no primeiro mês de uso. 
              A interface é intuitiva e as recomendações foram muito úteis."
            </p>
            <p className="font-medium">Carlos Silva, São Paulo</p>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-br from-energy-primary/10 to-energy-secondary/10">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-6">Comece a economizar energia hoje</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Junte-se a milhares de usuários que já economizam energia e dinheiro com o EnergyMaster.
          </p>
          
          <Button 
            size="lg" 
            className="bg-energy-primary hover:bg-energy-primary/90"
            onClick={() => navigate('/signup')}
          >
            Criar conta gratuita
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 px-4 border-t">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <ZapIcon className="h-6 w-6 text-energy-primary mr-2" />
              <span className="font-bold">EnergyMaster</span>
            </div>
            
            <div className="mt-4 md:mt-0">
              <p className="text-sm text-muted-foreground">
                © 2025 EnergyMaster. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
