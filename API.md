
# API - Documentação

Esta documentação descreve as APIs do sistema, preparadas para futura integração com banco de dados. Atualmente, os dados são armazenados em localStorage, mas a estrutura foi planejada para facilitar a migração para uma API real.

## Sumário

- [Autenticação](#autenticação)
- [Dispositivos](#dispositivos)
- [Metas](#metas)
- [Dicas](#dicas)

## Autenticação

### Login

**Descrição**: Autentica um usuário no sistema.

**URL**: `/api/auth/login` (futura implementação)

**Método**: `POST`

**Corpo da Requisição**:
```json
{
  "email": "string",
  "password": "string"
}
```

**Resposta de Sucesso**:
```json
{
  "user": {
    "id": "string",
    "name": "string",
    "email": "string"
  },
  "token": "string"
}
```

**Implementação Atual**: 
- Arquivo: `src/pages/Login.tsx`
- Função: `handleSubmit`
- Lógica: Verifica se email = "admin" e password = "admin", armazena autenticação em localStorage.

**Preparação para Banco de Dados**:
1. Criar tabela `users` com campos `id`, `name`, `email`, `password_hash`
2. Implementar hash seguro para senhas
3. Integrar com sistema de tokens JWT

### Cadastro

**Descrição**: Registra um novo usuário no sistema.

**URL**: `/api/auth/signup` (futura implementação)

**Método**: `POST`

**Corpo da Requisição**:
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

**Resposta de Sucesso**:
```json
{
  "user": {
    "id": "string",
    "name": "string",
    "email": "string"
  },
  "token": "string"
}
```

**Implementação Atual**: 
- Arquivo: `src/pages/SignUp.tsx`
- Função: `handleSubmit`
- Lógica: Apenas registra tentativa no console e redireciona para login.

**Preparação para Banco de Dados**:
1. Aproveitar mesma tabela `users` da API de login
2. Adicionar validação de e-mail único
3. Implementar verificação de e-mail

## Dispositivos

### Listar Dispositivos

**Descrição**: Retorna a lista de dispositivos do usuário.

**URL**: `/api/devices` (futura implementação)

**Método**: `GET`

**Parâmetros de Consulta**:
```
?status=online|offline|all
```

**Resposta de Sucesso**:
```json
{
  "devices": [
    {
      "id": "string",
      "name": "string",
      "type": "string",
      "consumption": "number",
      "status": "string",
      "lastActivity": "string",
      "powerState": "boolean",
      "location": "string"
    }
  ]
}
```

**Implementação Atual**: 
- Arquivo: `src/pages/Dispositivos.tsx`
- Função: Carrega dados do localStorage na inicialização
- Lógica: Utiliza `useState` com valor inicial do localStorage ou dados de demonstração.

**Preparação para Banco de Dados**:
1. Criar tabela `devices` com campos correspondentes ao modelo
2. Adicionar campo `user_id` para relacionar dispositivos com usuários
3. Implementar filtros para status

### Adicionar Dispositivo

**Descrição**: Adiciona um novo dispositivo para o usuário.

**URL**: `/api/devices` (futura implementação)

**Método**: `POST`

**Corpo da Requisição**:
```json
{
  "name": "string",
  "type": "string",
  "consumption": "number",
  "location": "string"
}
```

**Resposta de Sucesso**:
```json
{
  "id": "string",
  "name": "string",
  "type": "string",
  "consumption": "number",
  "status": "string",
  "lastActivity": "string",
  "powerState": "boolean",
  "location": "string"
}
```

**Implementação Atual**: 
- Arquivo: `src/components/AddDeviceForm.tsx`
- Função: `handleSubmit`
- Lógica: Cria novo dispositivo com ID baseado em timestamp e adiciona ao estado local.

**Preparação para Banco de Dados**:
1. Utilizar mesma tabela `devices`
2. Gerar IDs únicos no banco
3. Registrar data de criação

### Atualizar Estado do Dispositivo

**Descrição**: Altera o estado ligado/desligado de um dispositivo.

**URL**: `/api/devices/:id/power` (futura implementação)

**Método**: `PUT`

**Corpo da Requisição**:
```json
{
  "powerState": "boolean"
}
```

**Resposta de Sucesso**:
```json
{
  "id": "string",
  "powerState": "boolean",
  "status": "string",
  "lastActivity": "string"
}
```

**Implementação Atual**: 
- Arquivo: `src/pages/Dispositivos.tsx`
- Função: `toggleDevicePower`
- Lógica: Atualiza o estado do dispositivo e salva no localStorage.

**Preparação para Banco de Dados**:
1. Adicionar campo para histórico de alterações de estado
2. Implementar registro de horário da alteração

### Remover Dispositivo

**Descrição**: Remove um dispositivo do usuário.

**URL**: `/api/devices/:id` (futura implementação)

**Método**: `DELETE`

**Resposta de Sucesso**:
```json
{
  "success": true,
  "message": "Device removed successfully"
}
```

**Implementação Atual**: 
- Arquivo: `src/pages/Dispositivos.tsx`
- Função: `removeDevice`
- Lógica: Filtra dispositivo pelo ID e atualiza o localStorage.

**Preparação para Banco de Dados**:
1. Implementar soft delete em vez de remoção permanente
2. Registrar data da remoção

## Metas

### Listar Metas

**Descrição**: Retorna a lista de metas de consumo do usuário.

**URL**: `/api/goals` (futura implementação)

**Método**: `GET`

**Resposta de Sucesso**:
```json
{
  "goals": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "progress": "number",
      "status": "string",
      "statusColor": "string",
      "iconType": "string",
      "iconBg": "string"
    }
  ]
}
```

**Implementação Atual**: 
- Arquivo: `src/pages/Metas.tsx`
- Função: Carrega dados do localStorage na inicialização
- Lógica: Utiliza `useState` com valor inicial do localStorage ou dados de demonstração.

**Preparação para Banco de Dados**:
1. Criar tabela `goals` com campos correspondentes
2. Adicionar campo `user_id` para relacionar com usuários
3. Implementar cálculo automático de status baseado em progresso

### Adicionar Meta

**Descrição**: Adiciona uma nova meta de consumo para o usuário.

**URL**: `/api/goals` (futura implementação)

**Método**: `POST`

**Corpo da Requisição**:
```json
{
  "title": "string",
  "description": "string",
  "iconType": "string"
}
```

**Resposta de Sucesso**:
```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "progress": 0,
  "status": "string",
  "statusColor": "string",
  "iconType": "string",
  "iconBg": "string"
}
```

**Implementação Atual**: 
- Arquivo: `src/components/AddGoalForm.tsx`
- Função: `handleSubmit`
- Lógica: Cria nova meta e adiciona ao estado local.

**Preparação para Banco de Dados**:
1. Utilizar mesma tabela `goals`
2. Gerar IDs únicos no banco
3. Registrar data de criação

### Atualizar Progresso da Meta

**Descrição**: Atualiza o progresso de uma meta de consumo.

**URL**: `/api/goals/:id/progress` (futura implementação)

**Método**: `PUT`

**Corpo da Requisição**:
```json
{
  "progress": "number"
}
```

**Resposta de Sucesso**:
```json
{
  "id": "string",
  "progress": "number",
  "status": "string",
  "statusColor": "string"
}
```

**Implementação Atual**: 
- Arquivo: `src/pages/Metas.tsx`
- Função: `updateGoalProgress`
- Lógica: Atualiza o progresso da meta e recalcula status baseado no novo valor.

**Preparação para Banco de Dados**:
1. Adicionar histórico de atualizações de progresso
2. Implementar cálculos automáticos baseados em dados reais de consumo

### Remover Meta

**Descrição**: Remove uma meta de consumo.

**URL**: `/api/goals/:id` (futura implementação)

**Método**: `DELETE`

**Resposta de Sucesso**:
```json
{
  "success": true,
  "message": "Goal removed successfully"
}
```

**Implementação Atual**: 
- Arquivo: `src/pages/Metas.tsx`
- Função: `removeGoal`
- Lógica: Filtra meta pelo ID e atualiza o localStorage.

**Preparação para Banco de Dados**:
1. Implementar soft delete
2. Registrar data da remoção

## Dicas

### Listar Dicas

**Descrição**: Retorna a lista de dicas de economia de energia.

**URL**: `/api/tips` (futura implementação)

**Método**: `GET`

**Parâmetros de Consulta**:
```
?category=iluminacao|eletrodomesticos|climatizacao
```

**Resposta de Sucesso**:
```json
{
  "featured": [
    {
      "icon": "string",
      "title": "string",
      "description": "string",
      "savings": "string"
    }
  ],
  "dailyTip": {
    "icon": "string",
    "title": "string",
    "description": "string"
  },
  "categories": [
    {
      "title": "string",
      "tips": ["string"]
    }
  ]
}
```

**Implementação Atual**: 
- Arquivo: `src/pages/Dicas.tsx`
- Lógica: Dados estáticos definidos no componente.

**Preparação para Banco de Dados**:
1. Criar tabelas `tips`, `tip_categories`, e `featured_tips`
2. Implementar lógica para rotação da dica diária
3. Permitir filtros por categoria
