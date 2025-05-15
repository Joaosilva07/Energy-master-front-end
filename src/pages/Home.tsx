
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeHeader from '@/components/home/HomeHeader';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import TestimonialSection from '@/components/home/TestimonialSection';
import CTASection from '@/components/home/CTASection';
import HomeFooter from '@/components/home/HomeFooter';
import { useUser } from '@/contexts/UserContext';
import { verifyAuthentication } from '@/lib/utils';

const Home = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  
  // Redirecionar usuário logado para o dashboard se ele acessar a página inicial
  useEffect(() => {
    // Verificar se o usuário está autenticado usando a função do utils.ts
    if (verifyAuthentication()) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <HomeHeader />
      <HeroSection />
      <FeaturesSection />
      <TestimonialSection />
      <CTASection />
      <HomeFooter />
    </div>
  );
};

export default Home;
