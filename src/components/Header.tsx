
import React, { useState } from 'react';
import { Bell, Moon, Sun, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useUser } from '@/contexts/UserContext';
import { useTheme } from '@/components/ThemeProvider';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, logout } = useUser();
  const { isDark, setIsDark } = useTheme();
  const navigate = useNavigate();
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    return localStorage.getItem('notifications-enabled') === 'true';
  });
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const toggleNotifications = () => {
    const newState = !notificationsEnabled;
    setNotificationsEnabled(newState);
    localStorage.setItem('notifications-enabled', String(newState));
    toast({
      title: newState ? "Notificações ativadas" : "Notificações desativadas",
      description: newState ? "Você receberá alertas sobre seu consumo energético" : "Você não receberá mais alertas",
      duration: 3000,
    });
  };

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  return (
    <header className="h-14 border-b bg-background px-6 flex items-center justify-between">
      <div className="flex items-center gap-2">
        {user && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/user-home')}
          >
            Área do Usuário
          </Button>
        )}
      </div>
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8"
          onClick={toggleNotifications}
        >
          <Bell className="h-4 w-4" />
          {notificationsEnabled && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></span>
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={toggleDarkMode}
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 rounded-full">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                {user?.name ? (
                  <span className="text-xs font-medium">{getInitials(user.name)}</span>
                ) : (
                  <User className="h-4 w-4" />
                )}
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {user && <DropdownMenuItem className="font-medium">{user.name}</DropdownMenuItem>}
            <DropdownMenuItem onClick={() => navigate('/configuracoes')}>
              Configurações
            </DropdownMenuItem>
            <DropdownMenuItem onClick={logout}>Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
