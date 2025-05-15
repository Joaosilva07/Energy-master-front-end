
import React from 'react';

const TestimonialSection = () => {
  return (
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
  );
};

export default TestimonialSection;
