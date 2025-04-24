
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useToast } from "@/components/ui/use-toast";

interface ColorThemeProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

const themes = [
  { 
    name: 'default', 
    primaryColor: 'bg-[hsl(328,76%,55%)]',
    label: 'Rosa'
  },
  { 
    name: 'blue', 
    primaryColor: 'bg-[#2563eb]',
    label: 'Azul'
  },
  { 
    name: 'green', 
    primaryColor: 'bg-[#10b981]',
    label: 'Verde'
  },
  { 
    name: 'amber', 
    primaryColor: 'bg-[#f59e0b]',
    label: 'Âmbar'
  },
  { 
    name: 'purple', 
    primaryColor: 'bg-[#8b5cf6]',
    label: 'Roxo'
  },
];

const ColorThemeSelector = ({ currentTheme, onThemeChange }: ColorThemeProps) => {
  const { toast } = useToast();

  const handleThemeChange = (theme: string) => {
    if (theme === currentTheme) return;
    
    onThemeChange(theme);
    
    const selectedTheme = themes.find(t => t.name === theme);
    toast({
      title: "Tema alterado",
      description: `O tema foi alterado para ${selectedTheme?.label || theme}`,
    });
  };

  return (
    <div>
      <ToggleGroup type="single" value={currentTheme} onValueChange={handleThemeChange}>
        {themes.map((theme) => (
          <ToggleGroupItem key={theme.name} value={theme.name} aria-label={`Tema ${theme.label}`}>
            <div className="flex flex-col items-center gap-1">
              <div className={`w-6 h-6 rounded-full ${theme.primaryColor}`} />
              <span className="text-xs">{theme.label}</span>
            </div>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};

export default ColorThemeSelector;
