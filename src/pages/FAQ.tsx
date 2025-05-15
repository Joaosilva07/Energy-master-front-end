
import React from 'react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { MessageSquare } from "lucide-react";
import Sidebar from '@/components/Sidebar';
import { useUser } from '@/contexts/UserContext';

const FAQ = () => {
  const { user } = useUser();

  const faqItems = [
    {
      question: "O que é o EnergyMaster?",
      answer: "O EnergyMaster é uma plataforma de monitoramento e gestão de energia que ajuda a controlar o consumo de energia de seus dispositivos e a economizar em suas contas de energia."
    },
    {
      question: "Como o EnergyMaster ajuda a economizar energia?",
      answer: "O EnergyMaster monitora o consumo de energia de seus dispositivos, fornece relatórios detalhados, recomendações personalizadas e permite definir metas de economia, ajudando você a identificar e reduzir o desperdício de energia."
    },
    {
      question: "Quais dispositivos são compatíveis com o EnergyMaster?",
      answer: "O EnergyMaster é compatível com uma ampla variedade de dispositivos inteligentes, incluindo termostatos, iluminação, eletrodomésticos e outros dispositivos IoT que podem ser conectados à internet."
    },
    {
      question: "É necessário hardware especializado para usar o EnergyMaster?",
      answer: "Para funcionalidades básicas, não é necessário hardware especializado. No entanto, para monitoramento mais detalhado, recomendamos o uso de dispositivos inteligentes compatíveis ou medidores de energia específicos que podem se integrar à nossa plataforma."
    },
    {
      question: "Como posso começar a usar o EnergyMaster?",
      answer: "Basta criar uma conta, configurar seu perfil e começar a adicionar seus dispositivos. Nossa interface intuitiva guiará você pelo processo de configuração, e você poderá começar a monitorar seu consumo de energia imediatamente."
    },
    {
      question: "O EnergyMaster funciona com assistentes de voz como Alexa e Google Assistant?",
      answer: "Sim, o EnergyMaster pode ser integrado com assistentes de voz populares, permitindo que você controle seus dispositivos e verifique informações de consumo usando comandos de voz."
    },
    {
      question: "É possível definir metas de economia de energia?",
      answer: "Sim, o EnergyMaster permite que você defina metas personalizadas de economia de energia e acompanhe seu progresso ao longo do tempo. Nossa plataforma fornecerá dicas e sugestões para ajudá-lo a atingir suas metas."
    },
    {
      question: "Como posso obter suporte técnico?",
      answer: "Oferecemos suporte técnico por meio de nosso sistema de tickets, e-mail e chat ao vivo durante o horário comercial. Também temos uma extensa base de conhecimento e fóruns da comunidade onde você pode encontrar respostas para perguntas comuns."
    }
  ];

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="container mx-auto">
          <div className="mb-8 flex items-center gap-3">
            <MessageSquare className="h-6 w-6 text-energy-primary" />
            <h1 className="text-3xl font-bold">Perguntas Frequentes</h1>
          </div>

          <div className="grid gap-8">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold">Não encontrou o que procurava?</h2>
              <p className="mb-4 text-muted-foreground">
                Entre em contato com nossa equipe de suporte e teremos prazer em ajudar.
              </p>
              <div className="flex space-x-4">
                <a href="mailto:suporte@energymaster.com" className="text-energy-primary hover:underline">
                  suporte@energymaster.com
                </a>
                <span className="text-muted-foreground">|</span>
                <a href="tel:+551199999999" className="text-energy-primary hover:underline">
                  (11) 9999-9999
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FAQ;
