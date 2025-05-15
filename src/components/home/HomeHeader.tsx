
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Home as HomeIcon, User } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const HomeHeader = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <header className="fixed w-full z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto py-3 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HomeIcon className="h-5 w-5 text-energy-primary" />
          <span className="font-semibold">EnergyMaster</span>
        </div>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/dashboard')}
              >
                Dashboard
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/consumo')}
              >
                Consumo
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/dicas')}
              >
                Dicas
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="font-medium">{user.name}</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/configuracoes')}>
                    Configurações
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>Sair</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
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
                onClick={() => navigate('/signup')}
              >
                Registrar
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/sobrenos')}
              >
                Sobre Nós
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/faq')}
              >
                FAQ
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;
