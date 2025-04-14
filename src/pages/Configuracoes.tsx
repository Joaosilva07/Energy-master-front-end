
import React from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Configuracoes = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Configurações</h1>
            <p className="text-muted-foreground">Gerencie suas preferências e configurações do sistema</p>
          </div>
          
          <Tabs defaultValue="conta" className="w-full">
            <TabsList className="w-full border-b rounded-none h-auto p-0 bg-transparent">
              <TabsTrigger value="conta" className="data-[state=active]:border-b-2 data-[state=active]:border-energy-primary rounded-none">
                Conta
              </TabsTrigger>
              <TabsTrigger value="notificacoes" className="data-[state=active]:border-b-2 data-[state=active]:border-energy-primary rounded-none">
                Notificações
              </TabsTrigger>
              <TabsTrigger value="aparencia" className="data-[state=active]:border-b-2 data-[state=active]:border-energy-primary rounded-none">
                Aparência
              </TabsTrigger>
              <TabsTrigger value="seguranca" className="data-[state=active]:border-b-2 data-[state=active]:border-energy-primary rounded-none">
                Segurança
              </TabsTrigger>
            </TabsList>

            <TabsContent value="conta" className="mt-6">
              {/* Account settings content */}
            </TabsContent>
            <TabsContent value="notificacoes" className="mt-6">
              {/* Notifications settings content */}
            </TabsContent>
            <TabsContent value="aparencia" className="mt-6">
              {/* Appearance settings content */}
            </TabsContent>
            <TabsContent value="seguranca" className="mt-6">
              {/* Security settings content */}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Configuracoes;
