
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const CTASection = () => {
  const navigate = useNavigate();

  return (
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
  );
};

export default CTASection;
