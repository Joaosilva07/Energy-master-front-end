
# API - Documentação

Esta documentação descreve as APIs do sistema. Atualmente, os dados são armazenados em localStorage, mas a estrutura foi planejada para migração para uma API real.

## Sumário

- [Autenticação](#autenticação)
- [Dispositivos](#dispositivos)
- [Metas](#metas)
- [Dicas](#dicas)

## Autenticação

### Login

**Descrição**: Autentica um usuário no sistema.

**URL**: `/api/auth/login` (implementação futura)

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
Verifica credenciais e armazena autenticação em localStorage.

### Cadastro

**Descrição**: Registra um novo usuário no sistema.

**URL**: `/api/auth/signup` (implementação futura)

**Método**: `POST`

**Corpo da Requisição**:
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

## Dispositivos

### Listar Dispositivos

**Descrição**: Retorna a lista de dispositivos do usuário.

**URL**: `/api/devices` (implementação futura)

**Método**: `GET`

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

### Adicionar Dispositivo

**Descrição**: Adiciona um novo dispositivo para o usuário.

**URL**: `/api/devices` (implementação futura)

**Método**: `POST`

### Atualizar Estado do Dispositivo

**Descrição**: Altera o estado ligado/desligado de um dispositivo.

**URL**: `/api/devices/:id/power` (implementação futura)

**Método**: `PUT`

### Remover Dispositivo

**Descrição**: Remove um dispositivo do usuário.

**URL**: `/api/devices/:id` (implementação futura)

**Método**: `DELETE`

## Metas

### Listar Metas

**Descrição**: Retorna a lista de metas de consumo do usuário.

**URL**: `/api/goals` (implementação futura)

**Método**: `GET`

### Adicionar Meta

**Descrição**: Adiciona uma nova meta de consumo para o usuário.

**URL**: `/api/goals` (implementação futura)

**Método**: `POST`

### Atualizar Progresso da Meta

**Descrição**: Atualiza o progresso de uma meta de consumo.

**URL**: `/api/goals/:id/progress` (implementação futura)

**Método**: `PUT`

### Remover Meta

**Descrição**: Remove uma meta de consumo.

**URL**: `/api/goals/:id` (implementação futura)

**Método**: `DELETE`

## Dicas

### Listar Dicas

**Descrição**: Retorna a lista de dicas de economia de energia.

**URL**: `/api/tips` (implementação futura)

**Método**: `GET`

**Implementação para Banco de Dados**:
1. Criar tabelas `tips`, `tip_categories` e `featured_tips`
2. Implementar lógica para rotação da dica diária
3. Permitir filtros por categoria
