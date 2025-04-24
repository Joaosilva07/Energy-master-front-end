
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Moon, Sun, Palette, Lock, Bell, Eye, EyeOff } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import ColorThemeSelector from '@/components/ui/color-theme-selector';
import { useTheme } from '@/components/ThemeProvider';

const Configuracoes = () => {
  const { toast } = useToast();
  const { theme, setTheme, isDark, setIsDark } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    toast({
      title: "Modo alterado",
      description: `Modo ${!isDark ? 'escuro' : 'claro'} ativado`,
    });
  };

  const handlePasswordChange = () => {
    if (!currentPassword) {
      toast({
        title: "Erro",
        description: "Senha atual é obrigatória",
        variant: "destructive",
      });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Senha alterada",
      description: "Sua senha foi atualizada com sucesso",
    });
    
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

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

            <TabsContent value="conta" className="mt-6 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Perfil</CardTitle>
                  <CardDescription>
                    Gerencie suas informações pessoais
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-purple-100 p-8">
                        <span className="text-2xl font-medium text-purple-600">JS</span>
                      </div>
                      <Button>Alterar foto</Button>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="name">Nome</Label>
                      <Input id="name" defaultValue="João Silva" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="joao@exemplo.com" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notificacoes" className="mt-6 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Preferências de Notificação</CardTitle>
                  <CardDescription>
                    Escolha como deseja receber as notificações
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Alertas de consumo alto</Label>
                      <p className="text-sm text-muted-foreground">
                        Receba notificações quando seu consumo estiver acima do normal
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Relatórios semanais</Label>
                      <p className="text-sm text-muted-foreground">
                        Receba um resumo semanal do seu consumo
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Dicas de economia</Label>
                      <p className="text-sm text-muted-foreground">
                        Receba dicas para economizar energia
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="aparencia" className="mt-6 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Personalização</CardTitle>
                  <CardDescription>
                    Personalize a aparência do sistema
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                      <div>
                        <Label>Modo escuro</Label>
                        <p className="text-sm text-muted-foreground">
                          Alterne entre o tema claro e escuro
                        </p>
                      </div>
                    </div>
                    <Switch checked={isDark} onCheckedChange={toggleDarkMode} />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Palette className="h-4 w-4" />
                      <div>
                        <Label>Cor do Tema</Label>
                        <p className="text-sm text-muted-foreground">
                          Escolha a cor principal do sistema
                        </p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <ColorThemeSelector currentTheme={theme} onThemeChange={handleThemeChange} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="seguranca" className="mt-6 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Segurança</CardTitle>
                  <CardDescription>
                    Gerencie suas configurações de segurança
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="current-password">Senha atual</Label>
                    <div className="relative">
                      <Input 
                        id="current-password" 
                        type={showPassword ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="new-password">Nova senha</Label>
                    <div className="relative">
                      <Input 
                        id="new-password" 
                        type={showPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirm-password">Confirme a nova senha</Label>
                    <div className="relative">
                      <Input 
                        id="confirm-password" 
                        type={showPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button onClick={handlePasswordChange} className="w-full">
                    <Lock className="mr-2 h-4 w-4" />
                    Alterar senha
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Configuracoes;
