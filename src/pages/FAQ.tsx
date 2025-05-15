
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { 
  MessageSquareQuestion, 
  HelpCircle, 
  Settings, 
  User, 
  Book 
} from "lucide-react";

const FAQ = () => {
  const faqSections = [
    {
      title: "Geral",
      icon: HelpCircle,
      questions: [
        {
          question: "O que é o EnergyMaster?",
          answer: "O EnergyMaster é uma plataforma de monitoramento e otimização do consumo de energia residencial. Nós ajudamos você a entender e gerenciar seu consumo de energia de forma mais eficiente e econômica."
        },
        {
          question: "Como o EnergyMaster funciona?",
          answer: "Nossa plataforma se conecta aos dispositivos da sua residência para coletar dados de consumo em tempo real. Através de análise de dados e inteligência artificial, transformamos essas informações em insights e recomendações personalizadas para ajudar você a economizar energia."
        },
        {
          question: "Quais são os benefícios de usar o EnergyMaster?",
          answer: "Os principais benefícios incluem: redução no consumo de energia, economia financeira nas contas de luz, monitoramento de dispositivos em tempo real, criação de metas de economia, acesso a dicas personalizadas e integração com assistentes de voz."
        }
      ]
    },
    {
      title: "Dispositivos",
      icon: Settings,
      questions: [
        {
          question: "Quais dispositivos são compatíveis com o EnergyMaster?",
          answer: "O EnergyMaster é compatível com a maioria dos dispositivos inteligentes do mercado, incluindo tomadas inteligentes, lâmpadas, termostatos, eletrodomésticos com Wi-Fi e medidores de energia. Consulte nossa lista completa de compatibilidade em 'Configurações > Dispositivos'."
        },
        {
          question: "Como adicionar um novo dispositivo?",
          answer: "Para adicionar um novo dispositivo, acesse a página 'Dispositivos', clique em 'Adicionar Dispositivo' e siga as instruções para conectar seu dispositivo à plataforma. O processo geralmente leva menos de 5 minutos."
        },
        {
          question: "O que fazer se um dispositivo não estiver se conectando?",
          answer: "Se um dispositivo não estiver se conectando, verifique se ele está ligado e dentro do alcance da sua rede Wi-Fi. Certifique-se de que suas credenciais Wi-Fi estão corretas e tente reiniciar o dispositivo. Se o problema persistir, consulte nosso guia de solução de problemas em 'Configurações > Suporte'."
        }
      ]
    },
    {
      title: "Conta e Privacidade",
      icon: User,
      questions: [
        {
          question: "Como criar uma conta no EnergyMaster?",
          answer: "Para criar uma conta, clique em 'Cadastrar' na página inicial e preencha o formulário com seu e-mail e uma senha. Após verificar seu e-mail, você poderá começar a configurar sua casa no EnergyMaster."
        },
        {
          question: "O EnergyMaster é seguro? Como vocês protegem meus dados?",
          answer: "Sim, o EnergyMaster é seguro. Utilizamos criptografia de ponta a ponta para proteger seus dados e não compartilhamos suas informações com terceiros sem sua permissão explícita. Nossa política de privacidade detalha como coletamos, usamos e protegemos seus dados."
        },
        {
          question: "Como excluir minha conta?",
          answer: "Para excluir sua conta, acesse 'Configurações > Conta > Excluir Conta'. Ao excluir sua conta, todos os seus dados serão permanentemente removidos dos nossos servidores após 30 dias."
        }
      ]
    },
    {
      title: "Recursos e Funcionalidades",
      icon: Book,
      questions: [
        {
          question: "Como funciona o sistema de metas?",
          answer: "O sistema de metas permite que você estabeleça objetivos de redução de consumo. Você pode criar metas específicas para dispositivos ou para toda a casa. O EnergyMaster monitora seu progresso e oferece dicas para ajudá-lo a alcançar suas metas."
        },
        {
          question: "Como a integração com Alexa funciona?",
          answer: "A integração com Alexa permite que você controle seus dispositivos e acesse informações sobre seu consumo de energia através de comandos de voz. Para configurar, acesse 'Configurações > Integrações > Alexa' e siga as instruções."
        },
        {
          question: "Como obter suporte técnico?",
          answer: "Para obter suporte técnico, você pode acessar nossa base de conhecimento em 'Configurações > Suporte', enviar um e-mail para suporte@energymaster.com ou utilizar nosso chat ao vivo disponível de segunda a sexta, das 9h às 18h."
        }
      ]
    }
  ];

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-y-auto">
        <Header />
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                <MessageSquareQuestion className="h-6 w-6 text-energy-primary" />
                Perguntas Frequentes
              </h1>
              <p className="text-muted-foreground">
                Encontre respostas para as dúvidas mais comuns sobre o EnergyMaster
              </p>
            </div>

            <div className="space-y-8">
              {faqSections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Icon className="h-5 w-5 text-energy-primary" />
                        {section.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {section.questions.map((item, qIndex) => (
                          <div key={qIndex}>
                            <h3 className="font-medium text-lg mb-2">{item.question}</h3>
                            <p className="text-muted-foreground">{item.answer}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FAQ;
