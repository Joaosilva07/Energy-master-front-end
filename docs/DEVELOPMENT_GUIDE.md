
# 🔧 Guia de Desenvolvimento - EnergyMaster

## Índice

- [Configuração do Ambiente](#configuração-do-ambiente)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Padrões de Código](#padrões-de-código)
- [Componentes e Hooks](#componentes-e-hooks)
- [Estado e Gerenciamento de Dados](#estado-e-gerenciamento-de-dados)
- [Testes](#testes)
- [Performance](#performance)
- [Deploy e CI/CD](#deploy-e-cicd)
- [Contribuição](#contribuição)

## Configuração do Ambiente

### Pré-requisitos

```bash
# Verificar versões necessárias
node --version  # >= 18.0.0
npm --version   # >= 8.0.0
git --version   # >= 2.0.0
```

### Setup Inicial

```bash
# 1. Clonar repositório
git clone https://github.com/user/energymaster.git
cd energymaster

# 2. Instalar dependências
npm install

# 3. Configurar ambiente
cp .env.example .env

# 4. Executar em desenvolvimento
npm run dev
```

### Variáveis de Ambiente

```bash
# .env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_APP_URL=http://localhost:5173
NODE_ENV=development
```

### Extensões Recomendadas (VS Code)

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

## Estrutura do Projeto

### Organização de Arquivos

```
src/
├── components/           # Componentes reutilizáveis
│   ├── ui/              # Design system base
│   ├── consumption/     # Componentes de consumo
│   ├── devices/         # Componentes de dispositivos
│   └── ...
├── pages/               # Páginas da aplicação
├── hooks/               # Hooks customizados
├── services/            # Camada de serviços
├── types/               # Definições TypeScript
├── lib/                 # Utilitários e helpers
├── data/                # Dados mockados
└── ai-processing/       # Módulos de IA
```

### Convenções de Nomenclatura

#### Arquivos e Pastas
```bash
# PascalCase para componentes
ComponentName.tsx
ComponentName.test.tsx

# camelCase para hooks, services e utils
useCustomHook.ts
serviceFunction.ts
utilityHelper.ts

# kebab-case para páginas
consumption-page.tsx
device-management.tsx
```

#### Componentes
```typescript
// ✅ Bom - PascalCase, nome descritivo
export const DeviceConsumptionChart = () => {};

// ❌ Ruim - camelCase, nome genérico
export const chart = () => {};
```

#### Hooks
```typescript
// ✅ Bom - prefix 'use', camelCase
export const useDeviceManagement = () => {};

// ❌ Ruim - sem prefix 'use'
export const deviceManagement = () => {};
```

## Padrões de Código

### TypeScript

#### Definição de Tipos
```typescript
// ✅ Interfaces para objetos
interface Device {
  id: string;
  name: string;
  consumption: number;
  powerState: boolean;
}

// ✅ Types para unions e primitivos
type DeviceType = 'ac' | 'tv' | 'refrigerator';
type Status = 'online' | 'offline';

// ✅ Generics quando necessário
interface ApiResponse<T> {
  data: T;
  error?: string;
}
```

#### Props de Componentes
```typescript
// ✅ Interface para props complexas
interface DeviceCardProps {
  device: Device;
  onToggle: (id: string) => void;
  isLoading?: boolean;
}

// ✅ Inline para props simples
const Button = ({ children, onClick }: { 
  children: React.ReactNode; 
  onClick: () => void; 
}) => {};
```

### React Patterns

#### Componente Funcional Padrão
```typescript
import React from 'react';

interface ComponentProps {
  title: string;
  children?: React.ReactNode;
}

export const Component = ({ title, children }: ComponentProps) => {
  return (
    <div className="component-wrapper">
      <h2>{title}</h2>
      {children}
    </div>
  );
};

export default Component;
```

#### Hook Personalizado
```typescript
import { useState, useEffect, useCallback } from 'react';

export const useCustomHook = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);

  const updateValue = useCallback((newValue: string) => {
    setIsLoading(true);
    // Lógica assíncrona
    setValue(newValue);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Setup effect
    return () => {
      // Cleanup
    };
  }, []);

  return {
    value,
    isLoading,
    updateValue
  };
};
```

### Styling com Tailwind

#### Classes Organizadas
```typescript
// ✅ Bom - classes agrupadas logicamente
<div className={`
  flex items-center justify-between
  p-4 border rounded-lg
  bg-white hover:bg-gray-50
  transition-colors duration-200
`}>

// ❌ Ruim - classes desordenadas
<div className="p-4 bg-white flex transition-colors rounded-lg border items-center justify-between hover:bg-gray-50 duration-200">
```

#### Variáveis CSS Customizadas
```css
/* globals.css */
:root {
  --energy-primary: #10b981;
  --energy-secondary: #f59e0b;
  --energy-accent: #3b82f6;
}

/* Tailwind config */
module.exports = {
  theme: {
    extend: {
      colors: {
        'energy-primary': 'var(--energy-primary)',
        'energy-secondary': 'var(--energy-secondary)',
        'energy-accent': 'var(--energy-accent)',
      }
    }
  }
}
```

## Componentes e Hooks

### Estrutura de Componente

```typescript
// DeviceCard.tsx
import React, { memo } from 'react';
import { Device } from '@/types/device.types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface DeviceCardProps {
  device: Device;
  onToggle: (id: string) => void;
  isLoading?: boolean;
}

export const DeviceCard = memo(({ 
  device, 
  onToggle, 
  isLoading = false 
}: DeviceCardProps) => {
  const handleToggle = () => {
    if (!isLoading) {
      onToggle(device.id);
    }
  };

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">{device.name}</h3>
          <p className="text-sm text-muted-foreground">
            {device.consumption}W
          </p>
        </div>
        
        <Button
          variant={device.powerState ? "default" : "outline"}
          size="sm"
          onClick={handleToggle}
          disabled={isLoading}
        >
          {device.powerState ? "Ligado" : "Desligado"}
        </Button>
      </div>
    </Card>
  );
});

DeviceCard.displayName = 'DeviceCard';

export default DeviceCard;
```

### Hook Personalizado Avançado

```typescript
// useDeviceManagement.ts
import { useState, useEffect, useCallback } from 'react';
import { Device } from '@/types/device.types';
import { useToast } from '@/hooks/use-toast';

interface UseDeviceManagementOptions {
  autoRefresh?: boolean;
  refreshInterval?: number;
}

export const useDeviceManagement = (
  options: UseDeviceManagementOptions = {}
) => {
  const { autoRefresh = false, refreshInterval = 30000 } = options;
  const { toast } = useToast();
  
  const [devices, setDevices] = useState<Device[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch devices
  const fetchDevices = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // API call logic here
      const response = await fetch('/api/devices');
      const data = await response.json();
      
      setDevices(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      
      toast({
        title: "Erro ao carregar dispositivos",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // Toggle device power
  const toggleDevice = useCallback(async (deviceId: string) => {
    try {
      const device = devices.find(d => d.id === deviceId);
      if (!device) return;

      // Optimistic update
      setDevices(prev => prev.map(d => 
        d.id === deviceId 
          ? { ...d, powerState: !d.powerState }
          : d
      ));

      // API call
      await fetch(`/api/devices/${deviceId}/toggle`, {
        method: 'POST'
      });

      toast({
        title: `Dispositivo ${device.powerState ? 'desligado' : 'ligado'}`,
        description: device.name,
      });
    } catch (err) {
      // Revert optimistic update
      fetchDevices();
      
      toast({
        title: "Erro ao alterar dispositivo",
        description: "Tente novamente",
        variant: "destructive",
      });
    }
  }, [devices, fetchDevices, toast]);

  // Auto refresh effect
  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(fetchDevices, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, refreshInterval, fetchDevices]);

  // Initial fetch
  useEffect(() => {
    fetchDevices();
  }, [fetchDevices]);

  return {
    devices,
    isLoading,
    error,
    refetch: fetchDevices,
    toggleDevice
  };
};
```

## Estado e Gerenciamento de Dados

### Context Pattern

```typescript
// DeviceContext.tsx
import React, { createContext, useContext, useReducer } from 'react';
import { Device } from '@/types/device.types';

interface DeviceState {
  devices: Device[];
  isLoading: boolean;
  error: string | null;
}

type DeviceAction = 
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_DEVICES'; payload: Device[] }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'UPDATE_DEVICE'; payload: Device };

const deviceReducer = (state: DeviceState, action: DeviceAction): DeviceState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'SET_DEVICES':
      return { ...state, devices: action.payload, error: null };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    
    case 'UPDATE_DEVICE':
      return {
        ...state,
        devices: state.devices.map(device =>
          device.id === action.payload.id ? action.payload : device
        )
      };
    
    default:
      return state;
  }
};

const DeviceContext = createContext<{
  state: DeviceState;
  dispatch: React.Dispatch<DeviceAction>;
} | null>(null);

export const DeviceProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(deviceReducer, {
    devices: [],
    isLoading: false,
    error: null
  });

  return (
    <DeviceContext.Provider value={{ state, dispatch }}>
      {children}
    </DeviceContext.Provider>
  );
};

export const useDeviceContext = () => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error('useDeviceContext must be used within DeviceProvider');
  }
  return context;
};
```

### Service Layer

```typescript
// deviceService.ts
import { Device } from '@/types/device.types';
import { supabase } from '@/lib/supabase';

export class DeviceService {
  static async getDevices(userId: string): Promise<Device[]> {
    const { data, error } = await supabase
      .from('devices')
      .select('*')
      .eq('user_id', userId);

    if (error) throw new Error(error.message);
    
    return data.map(this.formatDevice);
  }

  static async createDevice(device: Omit<Device, 'id'>): Promise<Device> {
    const { data, error } = await supabase
      .from('devices')
      .insert([device])
      .select()
      .single();

    if (error) throw new Error(error.message);
    
    return this.formatDevice(data);
  }

  static async updateDevice(id: string, updates: Partial<Device>): Promise<Device> {
    const { data, error } = await supabase
      .from('devices')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    
    return this.formatDevice(data);
  }

  static async deleteDevice(id: string): Promise<void> {
    const { error } = await supabase
      .from('devices')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
  }

  private static formatDevice(raw: any): Device {
    return {
      id: raw.id,
      name: raw.name,
      type: raw.type,
      consumption: raw.consumption,
      status: raw.status,
      lastActivity: raw.lastActivity || raw.last_activity,
      powerState: raw.powerState ?? raw.power_state,
      location: raw.location,
      userId: raw.userId || raw.user_id,
      activatedAt: raw.activatedAt || raw.activated_at
    };
  }
}
```

## Testes

### Setup de Testes

```bash
# Instalar dependências de teste
npm install -D @testing-library/react @testing-library/jest-dom vitest jsdom
```

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts']
  }
});
```

### Testes de Componente

```typescript
// DeviceCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DeviceCard } from './DeviceCard';

const mockDevice = {
  id: '1',
  name: 'TV Sala',
  type: 'tv',
  consumption: 150,
  status: 'online',
  lastActivity: 'Agora',
  powerState: true,
  userId: 'user1'
};

describe('DeviceCard', () => {
  it('renders device information correctly', () => {
    const onToggle = vi.fn();
    
    render(
      <DeviceCard 
        device={mockDevice} 
        onToggle={onToggle} 
      />
    );

    expect(screen.getByText('TV Sala')).toBeInTheDocument();
    expect(screen.getByText('150W')).toBeInTheDocument();
    expect(screen.getByText('Ligado')).toBeInTheDocument();
  });

  it('calls onToggle when button is clicked', () => {
    const onToggle = vi.fn();
    
    render(
      <DeviceCard 
        device={mockDevice} 
        onToggle={onToggle} 
      />
    );

    fireEvent.click(screen.getByText('Ligado'));
    
    expect(onToggle).toHaveBeenCalledWith('1');
  });

  it('disables button when loading', () => {
    const onToggle = vi.fn();
    
    render(
      <DeviceCard 
        device={mockDevice} 
        onToggle={onToggle} 
        isLoading={true}
      />
    );

    const button = screen.getByText('Ligado');
    expect(button).toBeDisabled();
  });
});
```

### Testes de Hook

```typescript
// useDeviceManagement.test.ts
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useDeviceManagement } from './useDeviceManagement';

// Mock fetch
global.fetch = vi.fn();

describe('useDeviceManagement', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches devices on mount', async () => {
    const mockDevices = [mockDevice];
    
    (fetch as any).mockResolvedValueOnce({
      json: () => Promise.resolve(mockDevices)
    });

    const { result } = renderHook(() => useDeviceManagement());

    expect(result.current.isLoading).toBe(true);

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.devices).toEqual(mockDevices);
    expect(result.current.isLoading).toBe(false);
  });

  it('toggles device power state', async () => {
    const { result } = renderHook(() => useDeviceManagement());

    (fetch as any).mockResolvedValueOnce({
      json: () => Promise.resolve([mockDevice])
    });

    await act(async () => {
      await result.current.refetch();
    });

    (fetch as any).mockResolvedValueOnce({ ok: true });

    await act(async () => {
      await result.current.toggleDevice('1');
    });

    const updatedDevice = result.current.devices.find(d => d.id === '1');
    expect(updatedDevice?.powerState).toBe(false);
  });
});
```

## Performance

### Otimizações React

#### Memo e Callback
```typescript
// ✅ Memo para componentes pesados
export const ExpensiveComponent = memo(({ data }: Props) => {
  return <div>{/* rendering logic */}</div>;
});

// ✅ useMemo para cálculos pesados
const expensiveValue = useMemo(() => {
  return devices.reduce((sum, device) => sum + device.consumption, 0);
}, [devices]);

// ✅ useCallback para funções passadas como props
const handleDeviceToggle = useCallback((id: string) => {
  // toggle logic
}, [/* dependencies */]);
```

#### Code Splitting
```typescript
// ✅ Lazy loading de páginas
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Devices = lazy(() => import('@/pages/Devices'));

// ✅ Suspense wrapper
<Suspense fallback={<LoadingSpinner />}>
  <Routes>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/devices" element={<Devices />} />
  </Routes>
</Suspense>
```

### Bundle Optimization

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          charts: ['recharts']
        }
      }
    }
  }
});
```

## Deploy e CI/CD

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm run test
      
      - name: Build application
        run: npm run build
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
      
      - name: Deploy to Render
        run: |
          # Deploy commands here
```

### Dockerfile

```dockerfile
# Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Contribuição

### Git Workflow

```bash
# 1. Criar branch feature
git checkout -b feature/new-feature

# 2. Fazer commits pequenos e descritivos
git commit -m "feat: add device power toggle functionality"

# 3. Push e criar PR
git push origin feature/new-feature
```

### Conventional Commits

```bash
# Tipos de commit
feat:     # Nova funcionalidade
fix:      # Correção de bug
docs:     # Documentação
style:    # Formatação
refactor: # Refatoração
test:     # Testes
chore:    # Manutenção

# Exemplos
git commit -m "feat: add energy optimizer component"
git commit -m "fix: resolve device list loading issue"
git commit -m "docs: update API documentation"
```

### Code Review Checklist

- [ ] Código segue padrões estabelecidos
- [ ] Testes passando
- [ ] Documentação atualizada
- [ ] Performance considerada
- [ ] Acessibilidade verificada
- [ ] Responsividade testada
- [ ] Sem console.logs em produção

### Pull Request Template

```markdown
## Descrição
Breve descrição das mudanças

## Tipo de Mudança
- [ ] Bug fix
- [ ] Nova funcionalidade
- [ ] Breaking change
- [ ] Documentação

## Checklist
- [ ] Testes passando
- [ ] Código revisado
- [ ] Documentação atualizada

## Screenshots
(se aplicável)
```

---

Este guia deve ser seguido por todos os desenvolvedores do projeto para manter consistência e qualidade do código.
