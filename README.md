
# EnergyMaster - Sistema de Monitoramento Inteligente de Energia

![EnergyMaster](https://img.shields.io/badge/EnergyMaster-v1.0-green.svg)
![React](https://img.shields.io/badge/React-18.3.1-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)
![Supabase](https://img.shields.io/badge/Supabase-2.49.4-green.svg)

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Características Principais](#características-principais)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Arquitetura do Sistema](#arquitetura-do-sistema)
- [Instalação e Configuração](#instalação-e-configuração)
- [Documentação](#documentação)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Contribuição](#contribuição)
- [Licença](#licença)

## 🎯 Sobre o Projeto

O EnergyMaster é uma aplicação web avançada para monitoramento e otimização do consumo de energia residencial. O sistema oferece insights inteligentes, alertas automatizados e planos de otimização baseados em IA para ajudar usuários a reduzir custos e melhorar a eficiência energética.

### Principais Funcionalidades

- 📊 **Dashboard Interativo**: Visualização em tempo real do consumo energético
- 🏠 **Gerenciamento de Dispositivos**: Controle e monitoramento de aparelhos domésticos
- 🤖 **IA Integrada**: Alertas inteligentes e planos de otimização automáticos
- 📈 **Análise Avançada**: Gráficos detalhados de consumo por hora, dia e mês
- 🎯 **Sistema de Metas**: Definição e acompanhamento de objetivos de economia
- 💡 **Dicas Personalizadas**: Recomendações baseadas no perfil de consumo
- 🔔 **Alertas Inteligentes**: Notificações sobre anomalias e oportunidades de economia

## ⭐ Características Principais

### Interface do Usuário
- Design responsivo e moderno
- Temas claro/escuro
- Animações suaves e interações intuitivas
- Componentes acessíveis (WCAG 2.1)

### Funcionalidades Avançadas
- Análise preditiva de consumo
- Detecção de padrões anômalos
- Otimização automática de energia
- Integração com dispositivos IoT (simulada)
- Sistema de alertas inteligentes

### Tecnologia e Performance
- SPA (Single Page Application) com React
- Estado global gerenciado com hooks customizados
- Persistência de dados com Supabase
- Cache inteligente para melhor performance
- PWA ready (Progressive Web App)

## 🛠 Tecnologias Utilizadas

### Frontend
- **React 18.3.1** - Biblioteca para interfaces de usuário
- **TypeScript** - Superset tipado do JavaScript
- **Vite** - Build tool e dev server de alta performance
- **Tailwind CSS** - Framework de CSS utilitário
- **Shadcn/ui** - Biblioteca de componentes baseada em Radix UI

### Backend & Database
- **Supabase** - Backend as a Service (BaaS)
- **PostgreSQL** - Banco de dados relacional
- **Row Level Security (RLS)** - Segurança a nível de linha

### Bibliotecas e Ferramentas
- **React Router Dom** - Roteamento do lado do cliente
- **React Query** - Gerenciamento de estado do servidor
- **Recharts** - Biblioteca de gráficos para React
- **Lucide React** - Biblioteca de ícones
- **React Hook Form** - Formulários performáticos
- **Zod** - Validação de esquemas TypeScript

### Desenvolvimento e Deploy
- **ESLint** - Linter para JavaScript/TypeScript
- **Prettier** - Formatador de código
- **Husky** - Git hooks
- **Render** - Plataforma de deploy

## 🏗 Arquitetura do Sistema

### Arquitetura Frontend
```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes base do design system
│   ├── consumption/    # Componentes específicos de consumo
│   ├── devices/        # Componentes de dispositivos
│   └── ...
├── pages/              # Páginas da aplicação
├── hooks/              # Hooks customizados
├── services/           # Camada de serviços
├── types/              # Definições de tipos TypeScript
├── lib/                # Utilitários e helpers
└── data/               # Dados mockados e datasets
```

### Padrões Arquiteturais
- **Component-Based Architecture**: Componentização modular
- **Custom Hooks Pattern**: Lógica reutilizável
- **Service Layer Pattern**: Separação de responsabilidades
- **Repository Pattern**: Abstração de acesso a dados

## 🚀 Instalação e Configuração

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Conta no Supabase (para produção)

### Instalação Local

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/energymaster.git
cd energymaster
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
```

4. **Configure o Supabase**
- Crie um projeto no [Supabase](https://supabase.com)
- Execute as migrações em `src/ai-processing/database/`
- Configure as variáveis no arquivo `.env`

5. **Execute o projeto**
```bash
npm run dev
# ou
yarn dev
```

### Deploy em Produção

O projeto está configurado para deploy automático no Render:

1. Conecte seu repositório GitHub ao Render
2. Configure as variáveis de ambiente no dashboard do Render
3. O deploy será automático a cada push na branch main

## 📚 Documentação

- [📖 Documentação Técnica Completa](./docs/TECHNICAL_DOCUMENTATION.md)
- [👤 Manual do Usuário](./docs/USER_MANUAL.md)
- [🔧 Guia de Desenvolvimento](./docs/DEVELOPMENT_GUIDE.md)
- [📊 API Documentation](./API.md)
- [🏗 Arquitetura de Banco de Dados](./src/ai-processing/database/schema.md)

## 📁 Estrutura do Projeto

```
energymaster/
├── public/                 # Arquivos estáticos
├── src/
│   ├── components/         # Componentes React
│   │   ├── ui/            # Design system
│   │   ├── consumption/   # Componentes de consumo
│   │   ├── devices/       # Componentes de dispositivos
│   │   └── ...
│   ├── pages/             # Páginas da aplicação
│   ├── hooks/             # Hooks customizados
│   ├── services/          # Camada de serviços
│   ├── types/             # Tipos TypeScript
│   ├── lib/               # Utilitários
│   ├── data/              # Datasets e dados mockados
│   └── ai-processing/     # Módulos de IA
├── server/                # Servidor backend (Node.js)
├── docs/                  # Documentação
└── tests/                 # Testes automatizados
```

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia o servidor de desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview do build de produção

# Qualidade de Código
npm run lint         # Executa o ESLint
npm run type-check   # Verificação de tipos TypeScript

# Servidor Backend
npm run server       # Inicia o servidor backend
npm start           # Inicia em modo produção
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Guidelines de Contribuição
- Siga os padrões de código estabelecidos
- Escreva testes para novas funcionalidades
- Mantenha a documentação atualizada
- Use conventional commits

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 📞 Suporte

- 📧 Email: suporte@energymaster.com
- 🐛 Issues: [GitHub Issues](https://github.com/seu-usuario/energymaster/issues)
- 📖 Documentação: [Wiki do Projeto](https://github.com/seu-usuario/energymaster/wiki)

---

**EnergyMaster** - Transformando o futuro do consumo energético residencial 🌱⚡
