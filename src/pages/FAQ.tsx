
import React from 'react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { MessageSquare, ZapIcon, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const FAQ = () => {
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <header className="fixed w-full z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto py-3 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ZapIcon className="h-5 w-5 text-energy-primary" />
            <span className="font-semibold">EnergyMaster</span>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/')}
            >
              Home
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/sobrenos')}
            >
              Sobre Nós
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto pt-24 px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <MessageSquare className="h-8 w-8 text-energy-primary" />
            <h1 className="text-4xl font-bold">Perguntas Frequentes</h1>
          </div>

          <div className="grid gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
              <p className="text-lg mb-6">
                Encontre respostas para as perguntas mais comuns sobre o EnergyMaster e como ele pode ajudar você a economizar energia.
              </p>
              
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200 dark:border-gray-700">
                    <AccordionTrigger className="text-left py-4 font-medium">{item.question}</AccordionTrigger>
                    <AccordionContent className="pb-4 text-muted-foreground">{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Ainda tem dúvidas?</h2>
              <p className="mb-6 text-muted-foreground">
                Se você não encontrou a resposta para sua pergunta, entre em contato com nossa equipe de suporte.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="bg-energy-primary hover:bg-energy-primary/90"
                  onClick={() => window.location.href = 'mailto:suporte@energymaster.com'}
                >
                  Enviar e-mail
                </Button>
                <Button
                  variant="outline"
                >
                  Chat com suporte
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FAQ;
