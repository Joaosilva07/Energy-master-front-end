
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ZapIcon } from 'lucide-react';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24">
      {/* Background image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-fixed" 
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
          opacity: 0.8,
        }}
      ></div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-br from-blue-500/40 to-purple-600/40"></div>
      
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
  );
};

export default HeroSection;
