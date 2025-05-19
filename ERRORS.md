
# Erros Conhecidos - Documentação

Esta documentação lista os erros conhecidos no aplicativo e suas possíveis soluções.

## Erros React

### 1. Erro ao Renderizar Componentes React como Children

**Descrição**: 
Erro ao renderizar objetos React diretamente como filhos.

```
Uncaught Error: Objects are not valid as a React child (found: object with keys {type, key, ref, props, _owner, _store}).
```

**Solução**:
```typescript
const getIconTypeFromComponent = (iconComponent: React.ReactNode) => {
  if (!iconComponent) return 'target';
  
  try {
    const iconElement = iconComponent as React.ReactElement;
    if (typeof iconElement.type === 'function' || typeof iconElement.type === 'object') {
      const typeAny = iconElement.type as any;
      const componentName = typeAny.displayName || typeAny.name || '';
      
      if (componentName.includes('TrendingDown')) return 'trendingDown';
      if (componentName.includes('Trophy')) return 'trophy';
    }
    return 'target';
  } catch (error) {
    return 'target';
  }
};
```

**Impacto**: 
Este erro causa falha na renderização da página Metas.

## Otimizações Recomendadas

### 1. Arquivos Muito Grandes

**Descrição**:
Alguns arquivos estão muito extensos, dificultando a manutenção.

**Localização**:
- `src/pages/Dispositivos.tsx` (262 linhas)
- `src/pages/Metas.tsx` (267 linhas)

**Solução Recomendada**:
Refatorar esses arquivos, extraindo componentes menores.

### 2. Inconsistência em Armazenamento Local

**Descrição**:
O uso do `localStorage` está espalhado por vários componentes.

**Solução Recomendada**:
Criar um serviço centralizado para gerenciar o armazenamento local.
