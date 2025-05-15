
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Home as HomeIcon } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

const HomeHeader = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  // If user is logged in, they'll be redirected to user-home, but let's handle it anyway
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
                onClick={() => navigate('/user-home')}
              >
                Área do Usuário
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/dashboard')}
              >
                Dashboard
              </Button>
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
