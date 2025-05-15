
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import Header from '@/components/Header';
import HomeFooter from '@/components/home/HomeFooter';
import { Button } from '@/components/ui/button';
import { MessageSquare, Zap, Settings, BarChart3, Calendar, Target, Heart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import ScheduleMonitoring from '@/components/scheduling/ScheduleMonitoring';
import FeedbackDialog from '@/components/feedback/FeedbackDialog';

const UserHome = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const textarea = form.querySelector('textarea');
    
    if (textarea && textarea.value.trim()) {
      toast({
        title: "Comentário enviado",
        description: "Obrigado por compartilhar sua experiência!",
      });
      textarea.value = '';
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="relative bg-blue-50 dark:bg-blue-900/20 border-b border-blue-100 dark:border-blue-800 px-6 py-3">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Olá, {user?.name}! Bem-vindo de volta ao EnergyMaster!
            </span>
          </div>
          <Button 
            variant="default" 
            size="sm"
            onClick={() => navigate('/dashboard')}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Ir para o Dashboard
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Área do Usuário</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="shadow-lg hover:shadow-xl transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                Resumo do Seu Consumo
              </CardTitle>
              <CardDescription>Veja um resumo rápido do seu consumo de energia</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>Seu consumo médio diário está <span className="text-green-600 font-medium">5% abaixo</span> do mês passado.</p>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/consumo')}
                  className="w-full"
                >
                  Ver Detalhes de Consumo
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg hover:shadow-xl transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-purple-600" />
                Suas Metas
              </CardTitle>
              <CardDescription>Progresso das suas metas de economia</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Meta mensal de economia:</span>
                  <span className="font-medium">75% concluída</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/metas')}
                  className="w-full"
                >
                  Gerenciar Metas
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Schedule Monitoring Section */}
        <div className="mb-12">
          <ScheduleMonitoring />
        </div>
        
        <h2 className="text-2xl font-bold mb-6 text-center">Ações Rápidas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          <Card className="shadow-md hover:shadow-lg transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-500" />
                Adicionar Dispositivo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline" 
                onClick={() => navigate('/dispositivos')}
                className="w-full"
              >
                Gerenciar Dispositivos
              </Button>
            </CardContent>
          </Card>
          
          <Card className="shadow-md hover:shadow-lg transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-500" />
                Agendar Monitoramento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline" 
                onClick={() => navigate('#schedule')}
                className="w-full"
              >
                Configurar Horários
              </Button>
            </CardContent>
          </Card>
          
          <Card className="shadow-md hover:shadow-lg transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Settings className="h-4 w-4 text-gray-500" />
                Perfil & Preferências
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline" 
                onClick={() => navigate('/configuracoes')}
                className="w-full"
              >
                Configurações
              </Button>
            </CardContent>
          </Card>
          
          <Card className="shadow-md hover:shadow-lg transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-green-500" />
                Feedback & Suporte
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline"
                onClick={() => setFeedbackDialogOpen(true)}
                className="w-full"
              >
                Enviar Feedback Detalhado
              </Button>
            </CardContent>
          </Card>
          
          <Card className="shadow-md hover:shadow-lg transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Heart className="h-4 w-4 text-red-500" />
                Dicas Personalizadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline"
                onClick={() => navigate('/dicas')}
                className="w-full"
              >
                Ver Dicas
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="max-w-2xl mx-auto mb-12 bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-bold mb-4">Compartilhe sua experiência</h3>
          <form onSubmit={handleCommentSubmit}>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Como o EnergyMaster tem ajudado você a economizar energia? Compartilhe sua experiência com outros usuários!
            </p>
            <Textarea 
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-3 mb-4 bg-white dark:bg-gray-700" 
              rows={4} 
              placeholder="Escreva seu comentário aqui..."
              required
            />
            <div className="flex justify-end space-x-3">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setFeedbackDialogOpen(true)}
              >
                Deseja nos dar mais detalhes?
              </Button>
              <Button type="submit">Enviar Comentário</Button>
            </div>
          </form>
        </div>

        {/* Feedback Dialog */}
        <FeedbackDialog 
          open={feedbackDialogOpen} 
          onOpenChange={setFeedbackDialogOpen} 
        />
      </div>
      
      <HomeFooter />
    </div>
  );
};

export default UserHome;
