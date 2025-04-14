
import React from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

const Consumo = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Consumo de Energia</h1>
            <p className="text-muted-foreground">Análise detalhada do seu consumo energético</p>
          </div>
          {/* Content will be added in future iterations */}
        </main>
      </div>
    </div>
  );
};

export default Consumo;
