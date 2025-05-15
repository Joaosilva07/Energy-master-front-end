
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BarChart3, ZapIcon, Settings, Cpu, LightbulbIcon, Target, Info, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUser } from '@/contexts/UserContext';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();
  
  const menuItems = [
    { icon: BarChart3, label: 'Dashboard', path: '/' },
    { icon: ZapIcon, label: 'Consumo', path: '/consumo' },
    { icon: Cpu, label: 'Dispositivos', path: '/dispositivos' },
    { icon: LightbulbIcon, label: 'Dicas', path: '/dicas' },
    { icon: Target, label: 'Metas', path: '/metas' },
    { icon: Settings, label: 'Configurações', path: '/configuracoes' },
    { icon: Info, label: 'Sobre Nós', path: '/sobrenos' },
    { icon: MessageSquare, label: 'FAQ', path: '/faq' },
  ];

  // Get stored device data for the current user
  const getDevicesData = () => {
    try {
      if (!user) return { totalDevices: 0, activeDevices: 0, totalConsumption: 0 };
      
      const savedDevices = localStorage.getItem(`devices_${user.id}`);
      if (savedDevices) {
        const devices = JSON.parse(savedDevices);
        const activeDevices = devices.filter(d => d.status === 'online');
        return {
          totalDevices: devices.length,
          activeDevices: activeDevices.length,
          totalConsumption: devices.reduce((total, device) => total + (device.powerState ? device.consumption : 0), 0)
        };
      }
      return { totalDevices: 0, activeDevices: 0, totalConsumption: 0 };
    } catch (e) {
      return { totalDevices: 0, activeDevices: 0, totalConsumption: 0 };
    }
  };

  // Get goals data for the current user
  const getGoalsData = () => {
    try {
      if (!user) return { totalGoals: 0, completedGoals: 0, averageProgress: 0 };
      
      const savedGoals = localStorage.getItem(`goals_${user.id}`);
      if (savedGoals) {
        const goals = JSON.parse(savedGoals);
        const completedGoals = goals.filter(goal => goal.progress >= 100);
        const totalProgress = goals.length > 0 
          ? Math.round(goals.reduce((acc, goal) => acc + goal.progress, 0) / goals.length) 
          : 0;
        return {
          totalGoals: goals.length,
          completedGoals: completedGoals.length,
          averageProgress: totalProgress
        };
      }
      return { totalGoals: 0, completedGoals: 0, averageProgress: 0 };
    } catch (e) {
      return { totalGoals: 0, completedGoals: 0, averageProgress: 0 };
    }
  };

  const devicesData = getDevicesData();
  const goalsData = getGoalsData();

  return (
    <div className="h-screen w-56 border-r bg-sidebar flex flex-col">
      <div className="flex h-14 items-center border-b px-4">
        <Link to="/" className="flex items-center gap-2 font-semibold text-energy-primary">
          <ZapIcon className="h-5 w-5" />
          <span>EnergyMaster</span>
        </Link>
      </div>
      <div className="px-2 py-4 flex-grow">
        {user && (
          <div className="mb-4 px-3 py-2">
            <p className="text-sm font-medium">Olá, {user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        )}
        <nav className="flex flex-col gap-1">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={index}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-energy-primary font-medium"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-3 flex flex-col">
        <Popover>
          <PopoverTrigger asChild>
            <button className="w-full rounded-md bg-muted p-3 text-left relative hover:bg-sidebar-accent/50 transition-colors">
              <div className="flex items-center justify-center mb-2">
                <div className="rounded-full bg-energy-primary p-1">
                  <LightbulbIcon className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="text-center mb-2">
                <span className="text-xs font-medium block">
                  {devicesData.activeDevices}/{devicesData.totalDevices} Dispositivos Ativos
                </span>
              </div>
              <div className="mb-2">
                <div className="flex justify-between text-xs">
                  <span>{goalsData.averageProgress}%</span>
                  <span>Meta: 20%</span>
                </div>
                <div className="mt-1 h-2 rounded-full bg-muted-foreground/20">
                  <div 
                    className="h-full rounded-full bg-energy-primary" 
                    style={{ width: `${goalsData.averageProgress}%` }}
                  />
                </div>
              </div>
              <div className="text-center text-xs text-muted-foreground">
                Clique para detalhes
              </div>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-72 p-0 m-0 border-none" sideOffset={12} align="start">
            <div className="rounded-md border bg-popover shadow-md">
              <div className="p-4">
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <ZapIcon className="h-4 w-4 text-energy-primary" />
                  Resumo de Energia
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-1">Dispositivos</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="bg-muted p-2 rounded-md">
                        <p className="text-xs text-muted-foreground">Total</p>
                        <p className="font-medium">{devicesData.totalDevices}</p>
                      </div>
                      <div className="bg-muted p-2 rounded-md">
                        <p className="text-xs text-muted-foreground">Ativos</p>
                        <p className="font-medium">{devicesData.activeDevices}</p>
                      </div>
                      <div className="col-span-2 bg-muted p-2 rounded-md">
                        <p className="text-xs text-muted-foreground">Consumo Atual</p>
                        <p className="font-medium">{devicesData.totalConsumption.toFixed(2)} W</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-1">Metas</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="bg-muted p-2 rounded-md">
                        <p className="text-xs text-muted-foreground">Total</p>
                        <p className="font-medium">{goalsData.totalGoals}</p>
                      </div>
                      <div className="bg-muted p-2 rounded-md">
                        <p className="text-xs text-muted-foreground">Concluídas</p>
                        <p className="font-medium">{goalsData.completedGoals}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-1">Meta Principal</h4>
                    <div className="bg-muted p-3 rounded-md">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Progresso: {goalsData.averageProgress}%</span>
                        <span>Objetivo: 20%</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted-foreground/20">
                        <div 
                          className="h-full rounded-full bg-energy-primary" 
                          style={{ width: `${goalsData.averageProgress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <button 
                    onClick={() => navigate('/dicas')}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs"
                  >
                    Ver Dicas de Economia
                  </button>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Sidebar;
