
# Tutorial - Sistema de Monitoramento de Energia

Este tutorial explica como funciona o sistema de monitoramento de energia e a organização dos dados no projeto.

## 1. Estrutura de Dados

### Modelos de Dispositivos
Os modelos de dispositivos são definidos em `src/utils/energyDataset.ts`. Cada dispositivo possui propriedades como: id, fabricante, modelo, tipo, consumo médio, etc.

### Dados de Consumo Simulados
Os padrões de consumo de energia são simulados e incluem:
- Padrões de consumo por hora
- Fatores de consumo por dia da semana
- Variações sazonais (mensais)
- Padrões específicos por tipo de dispositivo

## 2. Componentes Principais

### Página de Dispositivos
A página de dispositivos utiliza os seguintes componentes:

- **DeviceTabs.tsx**: Organiza os dispositivos em abas
- **DeviceTabContent.tsx**: Conteúdo de cada aba
- **DeviceList.tsx**: Lista de cartões de dispositivo
- **DeviceCard.tsx**: Cartão individual para cada dispositivo

### Análise de Energia
A análise do consumo de energia é gerenciada por:

- **useEnergyAnalysis.ts**: Hook para análise de dados
- **useEnergyData.ts**: Hook para processamento de dados
- **energyAnalysisService.ts**: Serviço para métricas e insights

## 3. Fluxo de Dados

1. O usuário adiciona dispositivos através do formulário
2. Os dispositivos são armazenados no estado global ou localStorage
3. O hook `useDevices` gerencia o acesso a estes dispositivos
4. O hook `useEnergyData` processa os dados para análise
5. Vários serviços geram métricas, insights e recomendações

## 4. Integração com IA

Para implementar um modelo de IA:

1. Modifique ou adicione datasets de treinamento
2. Crie um novo serviço para o modelo de IA
3. Conecte o modelo aos serviços existentes
4. Implemente melhorias como previsão de consumo e detecção de anomalias

## 5. Próximos Passos

Para uma integração de IA mais avançada, recomendamos:

1. Treinar um modelo com dados reais
2. Implementar previsão de consumo baseada em padrões
3. Criar um sistema de alertas inteligentes
4. Desenvolver um otimizador automático de energia
5. Implementar detecção de dispositivos defeituosos
