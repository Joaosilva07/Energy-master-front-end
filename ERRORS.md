
# Erros Conhecidos - Documentação

Esta documentação lista os erros conhecidos no aplicativo, seus impactos e potenciais soluções.

## Erros React

### 1. Erro ao Renderizar Componentes React como Children

**Descrição**: 
Erro ao renderizar objetos React diretamente como filhos em vez de seus valores renderizados.

```
Uncaught Error: Objects are not valid as a React child (found: object with keys {type, key, ref, props, _owner, _store}). If you meant to render a collection of children, use an array instead.
```

**Localização**: 
- Afeta principalmente: `src/pages/Metas.tsx`
- Linhas específicas com problema: 
  ```typescript
  // Problema nas linhas 74-76
  const componentName = iconElement.type.displayName || iconElement.type.name;
  ```

**Solução**:
O erro ocorre porque estamos tentando acessar propriedades React diretamente em elementos que podem ser strings. Para corrigir:

```typescript
// Código corrigido
const getIconTypeFromComponent = (iconComponent: React.ReactNode) => {
  if (!iconComponent) return 'target';
  
  try {
    // Verificamos se o iconComponent é um elemento React válido
    const iconElement = iconComponent as React.ReactElement;
    if (typeof iconElement.type === 'function' || typeof iconElement.type === 'object') {
      const typeAny = iconElement.type as any;
      const componentName = typeAny.displayName || typeAny.name || '';
      
      if (componentName.includes('TrendingDown')) return 'trendingDown';
      if (componentName.includes('Trophy')) return 'trophy';
    }
    return 'target'; // Default
  } catch (error) {
    return 'target'; // Fallback para qualquer erro
  }
};
```

**Impacto**: 
Este erro causa falha na renderização da página Metas, resultando em tela branca.

## Erros de Tipo TypeScript

### 1. Erro em Propriedades de Tipo Não Existentes

**Descrição**: 
Erro ao acessar propriedades que não existem em tipos string.

```
error TS2339: Property 'displayName' does not exist on type 'string | JSXElementConstructor<any>'.
Property 'displayName' does not exist on type 'string'.
error TS2339: Property 'name' does not exist on type 'string | JSXElementConstructor<any>'.
Property 'name' does not exist on type 'string'.
```

**Localização**: 
- `src/pages/Metas.tsx` - linha 74
- Específico para a função `getIconTypeFromComponent`

**Solução**:
Implementar verificação de tipo adequada antes de acessar propriedades:

```typescript
const getIconTypeFromComponent = (iconComponent: React.ReactNode) => {
  if (!iconComponent) return 'target';
  
  // Verificar se é um elemento React válido
  const iconElement = iconComponent as React.ReactElement;
  if (
    iconElement && 
    typeof iconElement.type === 'function'
  ) {
    const typeAny = iconElement.type as any;
    const componentName = typeAny.displayName || typeAny.name || '';
    
    if (componentName.includes('TrendingDown')) return 'trendingDown';
    if (componentName.includes('Trophy')) return 'trophy';
  }
  return 'target'; // Default
};
```

**Impacto**: 
Embora seja um erro de tipo durante a compilação, pode causar comportamento inesperado em tempo de execução, resultando em renderização incorreta de ícones.

## Otimizações Recomendadas

### 1. Arquivos Muito Grandes

**Descrição**:
Alguns arquivos estão muito extensos, o que dificulta a manutenção.

**Localização**:
- `src/pages/Dispositivos.tsx` (262 linhas)
- `src/pages/Metas.tsx` (267 linhas)

**Solução Recomendada**:
Refatorar esses arquivos, extraindo componentes menores:

1. Para `Dispositivos.tsx`:
   - Extrair `DeviceCard` para um componente separado
   - Mover lógica de gerenciamento de estado para hooks personalizados

2. Para `Metas.tsx`:
   - Extrair componentes para cartões individuais de meta
   - Criar hook personalizado para lógica de gerenciamento de metas

**Impacto**:
Melhoraria a manutenibilidade e legibilidade do código, facilitando futuras alterações.

### 2. Inconsistência em Armazenamento Local

**Descrição**:
O uso do `localStorage` está espalhado por vários componentes sem uma abordagem unificada.

**Localização**:
- `src/pages/Dispositivos.tsx`
- `src/pages/Metas.tsx`
- `src/pages/Login.tsx`

**Solução Recomendada**:
Criar um serviço centralizado para gerenciar o armazenamento local:

```typescript
// src/services/storage.ts
export const StorageService = {
  getItem: (key: string, defaultValue: any = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error getting item ${key} from localStorage`, error);
      return defaultValue;
    }
  },
  setItem: (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting item ${key} in localStorage`, error);
    }
  },
  removeItem: (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item ${key} from localStorage`, error);
    }
  }
};
```

**Impacto**:
Facilitaria a manutenção e futura migração para APIs reais de banco de dados.
