
# Tutorial - Sistema de Monitoramento de Energia

Este tutorial explica como funciona o sistema de monitoramento de energia e como os dados são organizados no projeto.

## 1. Estrutura de Dados

### Modelos de Dispositivos
Os modelos de dispositivos são definidos em `src/utils/energyDataset.ts`. Cada dispositivo tem as seguintes propriedades:

```typescript
interface DeviceModel {
  id: string;
  manufacturer: string;
  model: string;
  type: string;
  averageConsumption: number;
  standbyConsumption: number;
  energyClass: string;
  yearReleased?: number;
}
```

### Dados de Consumo Simulados
Os padrões de consumo de energia são simulados em `src/data/energyConsumptionDataset.ts`. Estes dados incluem:
- Padrões de consumo por hora
- Fatores de consumo por dia da semana
- Variações sazonais (mensais)
- Padrões específicos por tipo de dispositivo
- Potencial de economia por tipo de dispositivo

## 2. Componentes Principais

### Página de Dispositivos
A página de dispositivos (`/dispositivos`) utiliza os seguintes componentes:

- **DeviceTabs.tsx**: Organiza os dispositivos em abas (Todos, Ativos, Inativos)
- **DeviceTabContent.tsx**: Conteúdo de cada aba com a lista de dispositivos
- **DeviceList.tsx**: Lista de cartões de dispositivo
- **DeviceCard.tsx**: Cartão individual para cada dispositivo

### Análise de Energia
A análise do consumo de energia é gerenciada por:

- **useEnergyAnalysis.ts**: Hook que fornece dados analisados de consumo
- **useEnergyData.ts**: Hook que processa os dados brutos de dispositivos
- **energyAnalysisService.ts**: Serviço que combina métricas, insights e gráficos

## 3. Fluxo de Dados

1. O usuário adiciona dispositivos através do formulário `AddDeviceForm` (ou usa dispositivos pré-carregados)
2. Os dispositivos são armazenados no estado global (ou localStorage)
3. O hook `useDevices` gerencia o acesso a estes dispositivos
4. O hook `useEnergyData` processa estes dados para análise
5. Vários serviços geram métricas, insights e recomendações com base nestes dados:
   - `energyMetricsService.ts`: Calcula métricas básicas de consumo
   - `energyInsightsService.ts`: Gera insights e recomendações
   - `energyChartService.ts`: Produz dados para visualizações gráficas

## 4. Integrando um Modelo de IA

### Para implementar um modelo de IA com dataset pronto:

1. **Localização para datasets**: 
   - Modifique `src/data/energyConsumptionDataset.ts` para incluir seus dados reais de treinamento
   - Ou adicione um novo arquivo `src/data/aiTrainingDataset.ts` específico para o modelo

2. **Implementação do modelo**:
   - Crie um novo serviço em `src/services/aiEnergyService.ts`
   - Integre seu modelo de ML/AI pré-treinado ou utilize APIs de serviços externos

3. **Conexão com o sistema existente**:
   - Atualize `energyInsightsService.ts` para utilizar seu modelo AI para previsões e recomendações
   - Modifique `energyChartService.ts` para incorporar previsões mais precisas do seu modelo

4. **Exemplos de melhorias possíveis**:
   - Previsão de consumo mais precisa
   - Detecção de anomalias em dispositivos
   - Recomendações personalizadas baseadas no perfil de uso
   - Otimização automática de horários de uso para economia

## 5. Estrutura de Arquivos Relevantes

```
src/
├── components/
│   ├── devices/
│   │   ├── DeviceTabs.tsx        # Abas de dispositivos (Todos, Ativos, Inativos)
│   │   └── DeviceTabContent.tsx  # Conteúdo de cada aba
│   ├── consumption/
│   │   ├── ConsumptionMetrics.tsx  # Métricas de consumo
│   │   └── EnergyInsights.tsx      # Insights sobre consumo
│   ├── DeviceCard.tsx            # Card individual de dispositivo
│   └── DeviceList.tsx            # Lista de dispositivos
├── data/
│   └── energyConsumptionDataset.ts  # Dataset simulado de consumo
├── hooks/
│   ├── useDevices.ts             # Hook para gerenciar dispositivos
│   └── useEnergyAnalysis.ts      # Hook para análise de energia
├── services/
│   ├── energyAnalysisService.ts  # Serviço principal de análise
│   ├── energyChartService.ts     # Geração de dados para gráficos
│   ├── energyInsightsService.ts  # Geração de insights e recomendações
│   └── energyMetricsService.ts   # Cálculo de métricas de consumo
├── types/
│   ├── device.types.ts           # Tipos para dispositivos
│   └── energyAnalysis.types.ts   # Tipos para análise de energia
└── utils/
    └── energyDataset.ts          # Dataset de modelos de dispositivos
```

## 6. Próximos Passos para Integração de IA

Para integrar um modelo de IA mais avançado, recomendamos:

1. Treinar um modelo com dados reais de dispositivos IoT
2. Implementar previsão de consumo baseada em padrões de uso
3. Criar um sistema de alertas inteligentes para anomalias
4. Desenvolver um otimizador automático de uso de energia
5. Implementar detecção de dispositivos defeituosos

---

Este tutorial cobre os fundamentos do sistema atual e como você pode integrá-lo com modelos de IA mais avançados. Para mais informações específicas sobre determinado arquivo ou componente, consulte os comentários e documentação no código-fonte.
