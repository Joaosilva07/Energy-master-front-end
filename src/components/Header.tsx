
import React from 'react';
import { Bell, Moon, Sun, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useTheme } from 'next-themes';
import { useUser } from '@/contexts/UserContext';

const Header = () => {
  const { theme, setTheme } = useTheme();
  const { user, logout } = useUser();
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <header className="h-14 border-b bg-background px-6 flex items-center justify-between">
      <div>
        {/* Search or left-side content can go here */}
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Bell className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
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
            <DropdownMenuItem onClick={() => window.location.href = '/configuracoes'}>
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
