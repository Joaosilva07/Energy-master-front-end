
import React from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

const Dispositivos = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Dispositivos</h1>
            <p className="text-muted-foreground">Gerencie seus dispositivos conectados</p>
          </div>
          {/* Content will be added in future iterations */}
        </main>
      </div>
    </div>
  );
};

export default Dispositivos;
