
import React, { useState } from 'react';
import { Bell, Search, Settings, LogOut, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from 'react-router-dom';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from './ui/button';
import { useToast } from "@/components/ui/use-toast";

const Header = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    // Remove auth token
    localStorage.removeItem('isAuthenticated');
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso",
    });
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      toast({
        title: "Pesquisa realizada",
        description: `Pesquisando por: ${searchTerm}`,
      });
    }
  };

  return (
    <header className="flex h-14 items-center justify-between border-b px-6">
      <div className="flex items-center gap-2 lg:w-2/5">
        <form onSubmit={handleSearch} className="w-full flex items-center">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Pesquisar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground ml-2"
          />
        </form>
      </div>
      <div className="flex items-center gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="relative rounded-full p-2">
              <Bell className="h-4 w-4" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-energy-primary"></span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Notificações</h4>
                <Button variant="ghost" className="text-xs">Marcar todas como lidas</Button>
              </div>
              <div className="grid gap-2">
                <div className="grid gap-1">
                  <p className="text-sm font-medium">Consumo alto detectado</p>
                  <p className="text-xs text-muted-foreground">Há 5 minutos</p>
                </div>
                <div className="grid gap-1">
                  <p className="text-sm font-medium">Nova dica de economia disponível</p>
                  <p className="text-xs text-muted-foreground">Há 2 horas</p>
                </div>
                <div className="grid gap-1">
                  <p className="text-sm font-medium">Meta mensal atingida!</p>
                  <p className="text-xs text-muted-foreground">Há 1 dia</p>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-purple-100 p-2">
                <span className="text-xs font-medium text-purple-600">JS</span>
              </div>
              <div className="hidden text-sm sm:block">
                <div className="font-medium">João Silva</div>
                <div className="text-xs text-muted-foreground">Administrador</div>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/configuracoes')}>
              <User className="mr-2 h-4 w-4" />
              Perfil
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/configuracoes')}>
              <Settings className="mr-2 h-4 w-4" />
              Configurações
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
