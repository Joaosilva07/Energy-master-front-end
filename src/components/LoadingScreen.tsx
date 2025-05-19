
import React from 'react';
import { useLoading } from '@/contexts/LoadingContext';
import { ZapIcon } from 'lucide-react';

const LoadingScreen = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center transition-opacity duration-300"
         style={{ opacity: isLoading ? 1 : 0 }}
    >
      <div className="flex flex-col items-center">
        <ZapIcon className="h-10 w-10 text-energy-primary animate-bounce mb-2" />
        <p className="text-sm text-muted-foreground">Carregando...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
