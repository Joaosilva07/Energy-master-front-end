
import React from 'react';
import { useNavigate } from 'react-router-dom';
import HomeHeader from '@/components/home/HomeHeader';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import TestimonialSection from '@/components/home/TestimonialSection';
import CTASection from '@/components/home/CTASection';
import HomeFooter from '@/components/home/HomeFooter';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

const Home = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  
  // We're showing different content based on logged-in status
  // but still allowing users to view the home page when logged in

  const LoggedInBanner = () => (
    <div className="relative bg-blue-50 dark:bg-blue-900/20 border-b border-blue-100 dark:border-blue-800 px-6 py-3">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
            Olá, {user?.name}! Você está conectado.
          </span>
        </div>
        <Button 
          variant="default" 
          size="sm"
          onClick={() => navigate('/dashboard')}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Ir para o Dashboard
        </Button>
      </div>
    </div>
  );

  const LoggedInFeatures = () => (
    <div className="bg-gradient-to-b from-blue-50 to-white dark:from-blue-900/10 dark:to-background py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Ações Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all hover:shadow-lg">
            <h3 className="text-lg font-semibold mb-3">Adicionar Dispositivo</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Registre um novo dispositivo para monitorar seu consumo energético.
            </p>
            <Button 
              variant="outline" 
              onClick={() => navigate('/dispositivos')}
              className="w-full"
            >
              Gerenciar Dispositivos
            </Button>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all hover:shadow-lg">
            <h3 className="text-lg font-semibold mb-3">Definir Nova Meta</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Estabeleça uma nova meta de economia de energia para sua residência.
            </p>
            <Button 
              variant="outline" 
              onClick={() => navigate('/metas')}
              className="w-full"
            >
              Ver Metas
            </Button>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all hover:shadow-lg">
            <h3 className="text-lg font-semibold mb-3">Enviar Feedback</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Compartilhe sua experiência ou sugira melhorias para a plataforma.
            </p>
            <Button 
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              Enviar Comentário
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <HomeHeader />
      {user && <LoggedInBanner />}
      <HeroSection />
      {user && <LoggedInFeatures />}
      <FeaturesSection />
      <TestimonialSection />
      <CTASection />
      <HomeFooter />
    </div>
  );
};

export default Home;
