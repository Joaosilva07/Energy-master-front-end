
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ZapIcon } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl text-center">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-energy-primary/10 p-6">
            <ZapIcon className="h-16 w-16 text-energy-primary" />
          </div>
        </div>
        
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">
          Bem-vindo ao EnergyMaster
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8">
          Monitore e gerencie o consumo de energia da sua casa com inteligência e eficiência.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            size="lg" 
            className="bg-energy-primary hover:bg-energy-primary/90"
            onClick={handleLoginRedirect}
          >
            Entrar na plataforma
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => navigate('/signup')}
          >
            Criar uma conta
          </Button>
        </div>
        
        <div className="mt-16">
          <p className="text-sm text-muted-foreground">
            © 2025 EnergyMaster. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
