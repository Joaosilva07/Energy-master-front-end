
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BarChart3, ZapIcon, Settings, Cpu, LightbulbIcon, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const menuItems = [
    { icon: BarChart3, label: 'Dashboard', path: '/' },
    { icon: ZapIcon, label: 'Consumo', path: '/consumo' },
    { icon: Cpu, label: 'Dispositivos', path: '/dispositivos' },
    { icon: LightbulbIcon, label: 'Dicas', path: '/dicas' },
    { icon: Target, label: 'Metas', path: '/metas' },
    { icon: Settings, label: 'Configurações', path: '/configuracoes' },
  ];

  // Get stored device data
  const getDevicesData = () => {
    try {
      const savedDevices = localStorage.getItem('devices');
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

  // Get goals data
  const getGoalsData = () => {
    try {
      const savedGoals = localStorage.getItem('goals');
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
    <div className="h-screen w-56 border-r bg-sidebar">
      <div className="flex h-14 items-center border-b px-4">
        <Link to="/" className="flex items-center gap-2 font-semibold text-energy-primary">
          <ZapIcon className="h-5 w-5" />
          <span>EnergyMaster</span>
        </Link>
      </div>
      <div className="px-2 py-4">
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
      <div className="absolute bottom-4 left-4 right-4">
        <div className="rounded-md bg-muted p-3">
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
          <button 
            onClick={() => navigate('/dicas')}
            className="w-full rounded-md border border-input bg-background px-2 py-1 text-xs"
          >
            Detalhes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
