
import React from 'react';
import { ZapIcon } from 'lucide-react';

const HomeFooter = () => {
  return (
    <footer className="py-8 px-4 border-t">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center">
            <ZapIcon className="h-6 w-6 text-energy-primary mr-2" />
            <span className="font-bold">EnergyMaster</span>
          </div>
          
          <div className="mt-4 md:mt-0">
            <p className="text-sm text-muted-foreground">
              © 2025 EnergyMaster. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
