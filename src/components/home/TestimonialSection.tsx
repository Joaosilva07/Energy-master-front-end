
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const TestimonialSection = () => {
  return (
    <section className="py-12 md:py-20 px-4 bg-muted/50">
      <div className="container mx-auto max-w-5xl text-center">
        <h2 className="text-3xl font-bold mb-12">O que nossos usuários dizem</h2>
        
        <div className="grid gap-8 md:grid-cols-3">
          {/* First Testimonial */}
          <div className="bg-card p-8 rounded-xl shadow-md flex flex-col items-center">
            <Avatar className="h-16 w-16 mb-4 border-2 border-energy-primary">
              <AvatarImage src="https://images.unsplash.com/photo-1501286353178-1ec871214838?auto=format&fit=crop&w=150" alt="Carlos Silva" />
              <AvatarFallback>CS</AvatarFallback>
            </Avatar>
            <p className="text-lg italic mb-6">
              "Com o EnergyMaster, consegui reduzir minha conta de luz em 25% no primeiro mês de uso. 
              A interface é intuitiva e as recomendações foram muito úteis."
            </p>
            <p className="font-medium">Carlos Silva, São Paulo</p>
          </div>

          {/* Second Testimonial */}
          <div className="bg-card p-8 rounded-xl shadow-md flex flex-col items-center">
            <Avatar className="h-16 w-16 mb-4 border-2 border-energy-primary">
              <AvatarImage src="https://images.unsplash.com/photo-1485833077593-4278bba3f11f?auto=format&fit=crop&w=150" alt="Marina Oliveira" />
              <AvatarFallback>MO</AvatarFallback>
            </Avatar>
            <p className="text-lg italic mb-6">
              "Minha família conseguiu economizar mais de R$1.200 no último ano usando o EnergyMaster. 
              As análises detalhadas nos ajudaram a identificar aparelhos que consumiam muita energia."
            </p>
            <p className="font-medium">Marina Oliveira, Rio de Janeiro</p>
          </div>

          {/* Third Testimonial */}
          <div className="bg-card p-8 rounded-xl shadow-md flex flex-col items-center">
            <Avatar className="h-16 w-16 mb-4 border-2 border-energy-primary">
              <AvatarImage src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=150" alt="Rafael Mendes" />
              <AvatarFallback>RM</AvatarFallback>
            </Avatar>
            <p className="text-lg italic mb-6">
              "As dicas personalizadas do EnergyMaster transformaram completamente nossos hábitos de consumo. 
              Agora temos controle total sobre nossos gastos com eletricidade."
            </p>
            <p className="font-medium">Rafael Mendes, Belo Horizonte</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;

