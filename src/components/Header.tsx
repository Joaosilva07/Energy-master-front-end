
import React from 'react';
import { Bell, Search } from 'lucide-react';

const Header = () => {
  return (
    <header className="flex h-14 items-center justify-between border-b px-6">
      <div className="flex items-center gap-2 lg:w-2/5">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Pesquisar..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>
      <div className="flex items-center gap-4">
        <button className="relative rounded-full bg-muted p-2 hover:bg-muted/80">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-energy-primary"></span>
        </button>
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-purple-100 p-2">
            <span className="text-xs font-medium text-purple-600">JS</span>
          </div>
          <div className="hidden text-sm sm:block">
            <div className="font-medium">João Silva</div>
            <div className="text-xs text-muted-foreground">Administrador</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
