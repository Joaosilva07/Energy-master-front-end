
# 📋 Documentação Técnica - EnergyMaster

## Índice

- [Visão Geral da Arquitetura](#visão-geral-da-arquitetura)
- [Tecnologias e Dependências](#tecnologias-e-dependências)
- [Estrutura de Dados](#estrutura-de-dados)
- [Arquitetura Frontend](#arquitetura-frontend)
- [Arquitetura Backend](#arquitetura-backend)
- [Sistema de IA](#sistema-de-ia)
- [Banco de Dados](#banco-de-dados)
- [APIs e Serviços](#apis-e-serviços)
- [Segurança](#segurança)
- [Performance](#performance)
- [Deploy e DevOps](#deploy-e-devops)

## Visão Geral da Arquitetura

### Arquitetura Geral do Sistema

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│                 │    │                 │    │                 │
│   React Client  │───▶│  Supabase API   │───▶│   PostgreSQL    │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│                 │    │                 │    │                 │
│  Local Storage  │    │  Edge Functions │    │      RLS        │
│                 │    │                 │    │   Policies      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Fluxo de Dados

1. **Interface do Usuário** → React Components
2. **Gerenciamento de Estado** → Custom Hooks + React Query
3. **Camada de Serviços** → Service Classes
4. **Persistência** → Supabase + Local Storage (fallback)
5. **Processamento IA** → Service Classes + Algorithms

## Tecnologias e Dependências

### Core Dependencies

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| React | 18.3.1 | Interface do usuário |
| TypeScript | 5.0+ | Type safety |
| Vite | 5.0+ | Build tool e dev server |
| Tailwind CSS | 3.4+ | Estilização |
| Supabase | 2.49.4 | Backend as a Service |

### UI Components e Utilities

| Biblioteca | Versão | Propósito |
|------------|--------|-----------|
| Radix UI | Latest | Componentes acessíveis |
| Shadcn/ui | Latest | Design system |
| Lucide React | 0.462.0 | Ícones |
| Recharts | 2.12.7 | Gráficos e visualizações |
| React Hook Form | 7.53.0 | Formulários |
| Zod | 3.23.8 | Validação de schemas |

### State Management e Data Fetching

| Biblioteca | Versão | Propósito |
|------------|--------|-----------|
| @tanstack/react-query | 5.56.2 | Server state management |
| Custom Hooks | - | Client state management |
| React Context | - | Global state |

## Estrutura de Dados

### Modelos de Dados Principais

#### Device (Dispositivo)
```typescript
interface Device {
  id: string;
  name: string;
  type: string;              // 'ac', 'tv', 'refrigerator', etc.
  consumption: number;       // Consumo em watts
  status: string;           // 'online', 'offline'
  lastActivity: string;     // Timestamp da última atividade
  powerState: boolean;      // Ligado/desligado
  location?: string;        // Localização do dispositivo
  userId: string;           // ID do usuário proprietário
  activatedAt?: string;     // Timestamp de ativação
}
```

#### EnergyAnalysis (Análise de Energia)
```typescript
interface EnergyAnalysis {
  metrics: ConsumptionMetrics;
  insights: ConsumptionInsight[];
  recommendedActions: string[];
}

interface ConsumptionMetrics {
  dailyConsumption: number;
  peakConsumption: number;
  averageConsumption: number;
  estimatedMonthlyCost: number;
  efficiency: number;
}
```

#### AI Types (Tipos de IA)
```typescript
interface ConsumptionInsight {
  type: 'warning' | 'info' | 'success' | 'critical';
  title: string;
  description: string;
  deviceId?: string;
  confidence?: number;
  source?: 'rule-based' | 'ai-prediction';
  actions?: RecommendedAction[];
}

interface OptimizationPlan {
  id: string;
  name: string;
  description: string;
  estimatedSavings: number;
  devices: OptimizationDeviceAction[];
  scheduleType: 'immediate' | 'scheduled' | 'recurring';
}
```

## Arquitetura Frontend

### Estrutura de Componentes

```
src/components/
├── ui/                    # Design System Base
│   ├── button.tsx
│   ├── card.tsx
│   ├── dialog.tsx
│   └── ...
├── consumption/           # Funcionalidades de Consumo
│   ├── ConsumptionMetrics.tsx
│   ├── HourlyConsumptionChart.tsx
│   ├── DeviceDistribution.tsx
│   └── AIRecommendations.tsx
├── devices/              # Gerenciamento de Dispositivos
│   ├── DeviceCard.tsx
│   ├── DeviceList.tsx
│   ├── AddDeviceForm.tsx
│   └── DeviceMonitoring.tsx
└── ai-processing/        # Componentes de IA
    ├── SmartAlerts.tsx
    └── EnergyOptimizer.tsx
```

### Custom Hooks

#### Core Hooks
- `useDevices()` - Gerenciamento de dispositivos
- `useEnergyAnalysis()` - Análise de energia
- `useAIEnergy()` - Funcionalidades de IA
- `useTips()` - Sistema de dicas
- `useGoals()` - Sistema de metas

#### Implementação de Hook Exemplo

```typescript
// useDevices.ts
export const useDevices = () => {
  const { devices, isLoading, fetchDevices, setDevices } = useFetchDevices();
  const { addDevice } = useAddDevice(devices, setDevices);
  const { toggleDevicePower } = useToggleDevicePower(devices, setDevices);
  const { removeDevice } = useRemoveDevice(devices, setDevices);

  const updateDeviceStatus = useCallback((id: string, status: boolean) => {
    setDevices(prevDevices => {
      return prevDevices.map(device => 
        device.id === id ? {
          ...device, 
          powerState: status,
          lastActivity: 'Agora',
          status: status ? 'online' : 'offline'
        } : device
      );
    });
  }, [setDevices]);

  return {
    devices,
    isLoading,
    addDevice,
    toggleDevicePower,
    removeDevice,
    updateDeviceStatus
  };
};
```

### Service Layer

#### Serviços Principais

1. **energyAnalysisService** - Análise principal de energia
2. **energyMetricsService** - Cálculo de métricas
3. **energyInsightsService** - Geração de insights
4. **energyChartService** - Dados para gráficos
5. **energyOptimizerService** - Otimização de energia
6. **smartAlertService** - Alertas inteligentes

#### Implementação de Serviço Exemplo

```typescript
// energyAnalysisService.ts
export const energyAnalysisService = {
  analyzeConsumption(devices: Device[], localDate: Date = new Date()): EnergyAnalysis {
    if (!devices || devices.length === 0) {
      return {
        metrics: defaultMetrics,
        insights: [],
        recommendedActions: []
      };
    }

    const metrics = energyMetricsService.calculateMetrics(devices, localDate);
    const insights = energyInsightsService.generateInsights(devices, localDate);
    const recommendedActions = energyInsightsService.generateRecommendations(devices, localDate);

    return { metrics, insights, recommendedActions };
  }
};
```

## Arquitetura Backend

### Supabase Configuration

#### Tabelas Principais
- `devices` - Dispositivos dos usuários
- `goals` - Metas de consumo
- `tips` - Dicas de economia
- `consumption_history` - Histórico de consumo (IA)
- `ai_insights` - Insights gerados por IA
- `optimization_plans` - Planos de otimização

#### Row Level Security (RLS)

```sql
-- Política para tabela devices
CREATE POLICY "Usuários podem ver seus próprios dispositivos"
  ON devices
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem inserir seus próprios dispositivos"
  ON devices
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

### Server.js - Backend Node.js

```typescript
// Estrutura básica do servidor
import express from 'express';
import cors from 'cors';
import pool from './config/db.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas de autenticação
app.post('/api/auth/register', async (req, res) => {
  // Implementação de registro
});

app.post('/api/auth/login', async (req, res) => {
  // Implementação de login
});
```

## Sistema de IA

### Componentes de IA

#### 1. Smart Alert Service
- Detecta padrões anômalos de consumo
- Identifica dispositivos com potencial falha
- Gera alertas preventivos

```typescript
export const smartAlertService = {
  generateSmartAlerts(devices: Device[]): ConsumptionInsight[] {
    const alerts: ConsumptionInsight[] = [];
    
    // Detecta alto consumo
    const highConsumptionDevices = devices.filter(d => d.consumption > 150);
    
    // Detecta dispositivos inativos
    const inactiveDevices = devices.filter(d => 
      d.powerState && d.lastActivity !== 'Agora'
    );
    
    return alerts;
  }
};
```

#### 2. Energy Optimizer Service
- Gera planos de otimização automáticos
- Agenda ações de economia
- Calcula economia potencial

```typescript
export const energyOptimizerService = {
  generateOptimizationPlans(devices: Device[]): OptimizationPlan[] {
    const plans: OptimizationPlan[] = [];
    
    // Plano: Desligar dispositivos ociosos
    const idleDevices = devices.filter(d => 
      d.powerState && d.lastActivity !== 'Agora'
    );
    
    if (idleDevices.length > 0) {
      plans.push({
        id: uuidv4(),
        name: 'Economia Imediata',
        description: 'Desliga dispositivos ociosos',
        estimatedSavings: calculateSavings(idleDevices),
        devices: idleDevices.map(toDeviceAction),
        scheduleType: 'immediate'
      });
    }
    
    return plans;
  }
};
```

### Algoritmos de IA

#### 1. Detecção de Padrões
- Análise de consumo por horário
- Identificação de picos anômalos
- Predição de falhas em dispositivos

#### 2. Sistema de Recomendações
- Baseado em regras heurísticas
- Análise de padrões de uso
- Otimização de horários de funcionamento

#### 3. Métricas de Eficiência
- Cálculo de eficiência energética
- Comparação com benchmarks
- Score de sustentabilidade

## Banco de Dados

### Schema Principal

```sql
-- Tabela de dispositivos
CREATE TABLE devices (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  consumption INTEGER NOT NULL,
  status TEXT NOT NULL,
  lastActivity TEXT NOT NULL,
  powerState BOOLEAN NOT NULL DEFAULT false,
  location TEXT,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Índices para Performance

```sql
-- Índices principais
CREATE INDEX devices_user_id_idx ON devices(user_id);
CREATE INDEX devices_consumption_idx ON devices(consumption);
CREATE INDEX devices_type_idx ON devices(type);

-- Índices compostos
CREATE INDEX devices_user_power_idx ON devices(user_id, powerState);
```

### Backup e Recovery

- Backup automático diário via Supabase
- Point-in-time recovery disponível
- Replicação para múltiplas regiões

## APIs e Serviços

### API Endpoints

#### Autenticação
```
POST /api/auth/register - Registro de usuário
POST /api/auth/login    - Login de usuário
POST /api/auth/logout   - Logout de usuário
```

#### Dispositivos
```
GET    /api/devices     - Listar dispositivos
POST   /api/devices     - Criar dispositivo
PUT    /api/devices/:id - Atualizar dispositivo
DELETE /api/devices/:id - Remover dispositivo
```

### Supabase APIs

#### Real-time Subscriptions
```typescript
// Exemplo de subscription
const subscription = supabase
  .channel('devices')
  .on('postgres_changes', {
    event: '*',
    schema: 'public',
    table: 'devices'
  }, (payload) => {
    // Handle real-time updates
  })
  .subscribe();
```

## Segurança

### Autenticação e Autorização

#### Supabase Auth
- JWT tokens para autenticação
- Row Level Security (RLS) no banco
- Políticas de acesso granulares

#### Frontend Security
```typescript
// Proteção de rotas
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};
```

### Validação de Dados

#### Input Validation com Zod
```typescript
const deviceSchema = z.object({
  name: z.string().min(1).max(50),
  type: z.enum(['ac', 'tv', 'refrigerator']),
  consumption: z.number().min(0).max(5000),
  location: z.string().optional()
});
```

### Content Security Policy
```typescript
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy', 
    "default-src 'self'; media-src 'self' data:;"
  );
  next();
});
```

## Performance

### Otimizações Frontend

#### 1. Code Splitting
- Lazy loading de páginas
- Dynamic imports para componentes pesados
- Bundle splitting por rotas

#### 2. Memoization
```typescript
// React.memo para componentes
export const DeviceCard = React.memo(({ device }: DeviceCardProps) => {
  // Component implementation
});

// useMemo para cálculos pesados
const expensiveCalculation = useMemo(() => {
  return calculateComplexMetrics(devices);
}, [devices]);
```

#### 3. Virtual Scrolling
- Lista virtualizada para muitos dispositivos
- Paginação inteligente
- Infinite scrolling

### Otimizações Backend

#### 1. Database Queries
- Índices otimizados
- Query optimization
- Connection pooling

#### 2. Caching Strategy
- Local Storage para dados offline
- React Query cache
- Service Worker para recursos estáticos

### Monitoramento de Performance

#### Métricas Principais
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- Time to Interactive (TTI)

## Deploy e DevOps

### Estratégia de Deploy

#### Ambiente de Desenvolvimento
```bash
npm run dev     # Servidor local
npm run build   # Build de produção
npm run preview # Preview do build
```

#### Pipeline CI/CD
1. **Commit** → GitHub Repository
2. **Build** → Render Build Service
3. **Test** → Automated Tests
4. **Deploy** → Render Production

### Configuração do Render

#### Build Settings
```yaml
# render.yaml
services:
  - type: web
    name: energymaster-frontend
    env: node
    buildCommand: npm run build
    startCommand: npm run preview
    envVars:
      - key: NODE_ENV
        value: production
```

### Monitoramento e Logs

#### Error Tracking
- Console logs para desenvolvimento
- Error boundaries para React
- Crash reporting

#### Performance Monitoring
- Real User Monitoring (RUM)
- Core Web Vitals tracking
- API response time monitoring

### Backup e Disaster Recovery

#### Estratégia de Backup
- Backup automático do Supabase
- Versionamento de código no Git
- Backup de configurações

#### Recovery Plan
1. Identificar o problema
2. Restaurar último backup válido
3. Verificar integridade dos dados
4. Comunicar usuários se necessário

## Troubleshooting

### Problemas Comuns

#### 1. Problemas de Build
```bash
# Limpar cache
rm -rf node_modules package-lock.json
npm install

# Verificar versões
node --version
npm --version
```

#### 2. Problemas de Database
```sql
-- Verificar conexões
SELECT * FROM pg_stat_activity;

-- Verificar políticas RLS
SELECT * FROM pg_policies WHERE tablename = 'devices';
```

#### 3. Problemas de Performance
- Verificar bundle size com `npm run analyze`
- Profiling com React DevTools
- Monitorar memory leaks

### Logs e Debug

#### Debug Frontend
```typescript
// Environment-based logging
const debug = process.env.NODE_ENV === 'development';

if (debug) {
  console.log('Debug info:', data);
}
```

#### Debug Backend
```javascript
// Structured logging
console.log('INFO:', {
  timestamp: new Date().toISOString(),
  action: 'device_update',
  userId: user.id,
  deviceId: device.id
});
```

---

Esta documentação deve ser mantida atualizada conforme o projeto evolui. Para contribuições, siga os guidelines estabelecidos no README principal.
