
-- Initial Database Schema Creation

-- Habilita a extensão UUID se ainda não estiver habilitada
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Cria a tabela de dispositivos
CREATE TABLE IF NOT EXISTS devices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  consumption INTEGER NOT NULL,
  status TEXT NOT NULL,
  "lastActivity" TEXT NOT NULL,
  "powerState" BOOLEAN NOT NULL,
  location TEXT,
  user_id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT fk_user
    FOREIGN KEY(user_id)
    REFERENCES auth.users(id)
    ON DELETE CASCADE
);

-- Cria a tabela de metas
CREATE TABLE IF NOT EXISTS goals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  progress INTEGER NOT NULL,
  status TEXT NOT NULL,
  "statusColor" TEXT NOT NULL,
  "iconType" TEXT NOT NULL,
  "iconBg" TEXT NOT NULL,
  target INTEGER,
  "targetDate" TEXT,
  type TEXT,
  user_id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT fk_user
    FOREIGN KEY(user_id)
    REFERENCES auth.users(id)
    ON DELETE CASCADE
);

-- Cria a tabela de dicas
CREATE TABLE IF NOT EXISTS tips (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  savings TEXT,
  category TEXT NOT NULL,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Configura o controle de acesso Row Level Security (RLS)
ALTER TABLE devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;

-- Cria políticas para a tabela de dispositivos
CREATE POLICY "Usuários podem ver seus próprios dispositivos"
  ON devices
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem inserir seus próprios dispositivos"
  ON devices
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar seus próprios dispositivos"
  ON devices
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem excluir seus próprios dispositivos"
  ON devices
  FOR DELETE
  USING (auth.uid() = user_id);

-- Cria políticas para a tabela de metas
CREATE POLICY "Usuários podem ver suas próprias metas"
  ON goals
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem inserir suas próprias metas"
  ON goals
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar suas próprias metas"
  ON goals
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem excluir suas próprias metas"
  ON goals
  FOR DELETE
  USING (auth.uid() = user_id);

-- Insere dados iniciais para dicas
INSERT INTO tips (title, description, icon, savings, category, featured)
VALUES 
  ('Otimize seu Ar Condicionado', 'Mantenha a temperatura em 23°C e faça limpeza regular dos filtros.', 'thermometerSun', '25% no consumo de A/C', 'climatizacao', true),
  ('Programe seus Dispositivos', 'Configure timers para desligar aparelhos em horários específicos.', 'timer', '15% no consumo geral', 'eletrodomesticos', true),
  ('Substitua lâmpadas antigas por LED', 'Lâmpadas LED consomem até 80% menos energia que incandescentes e duram muito mais.', 'lightbulb', '12% no consumo geral', 'iluminacao', false),
  ('Aproveite a luz natural', 'Posicione móveis próximos às janelas e mantenha as cortinas abertas durante o dia.', 'sun', '10% no consumo de iluminação', 'iluminacao', false),
  ('Evite deixar em standby', 'Desligue completamente aparelhos eletrônicos que não estão em uso.', 'power', '8% no consumo geral', 'eletrodomesticos', false),
  ('Mantenha janelas fechadas', 'Ao usar ar condicionado, verifique se janelas e portas estão bem vedadas.', 'lock', '20% no consumo de A/C', 'climatizacao', false);

-- AI Feature Tables (For future implementation)

-- Tabela para armazenar histórico de consumo
CREATE TABLE IF NOT EXISTS consumption_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  device_id UUID NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  consumption NUMERIC NOT NULL,
  user_id UUID NOT NULL,
  CONSTRAINT fk_device
    FOREIGN KEY(device_id)
    REFERENCES devices(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_user
    FOREIGN KEY(user_id)
    REFERENCES auth.users(id)
    ON DELETE CASCADE
);

-- Tabela para armazenar insights de IA
CREATE TABLE IF NOT EXISTS ai_insights (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  device_id UUID,
  confidence NUMERIC,
  source TEXT NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  user_id UUID NOT NULL,
  actions JSONB,
  CONSTRAINT fk_device
    FOREIGN KEY(device_id)
    REFERENCES devices(id)
    ON DELETE SET NULL,
  CONSTRAINT fk_user
    FOREIGN KEY(user_id)
    REFERENCES auth.users(id)
    ON DELETE CASCADE
);

-- Tabela para armazenar planos de otimização
CREATE TABLE IF NOT EXISTS optimization_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  estimated_savings NUMERIC NOT NULL,
  schedule_type TEXT NOT NULL,
  schedule_config JSONB,
  user_id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  active BOOLEAN NOT NULL DEFAULT TRUE,
  CONSTRAINT fk_user
    FOREIGN KEY(user_id)
    REFERENCES auth.users(id)
    ON DELETE CASCADE
);

-- Tabela para armazenar ações de otimização
CREATE TABLE IF NOT EXISTS optimization_actions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  plan_id UUID NOT NULL,
  device_id UUID NOT NULL,
  action TEXT NOT NULL,
  parameters JSONB,
  estimated_impact NUMERIC NOT NULL,
  executed BOOLEAN NOT NULL DEFAULT FALSE,
  executed_at TIMESTAMPTZ,
  CONSTRAINT fk_plan
    FOREIGN KEY(plan_id)
    REFERENCES optimization_plans(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_device
    FOREIGN KEY(device_id)
    REFERENCES devices(id)
    ON DELETE CASCADE
);

-- Configura o controle de acesso Row Level Security (RLS) para as novas tabelas
ALTER TABLE consumption_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE optimization_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE optimization_actions ENABLE ROW LEVEL SECURITY;

-- Cria políticas para a tabela de histórico de consumo
CREATE POLICY "Usuários podem ver seu próprio histórico de consumo"
  ON consumption_history
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem inserir seu próprio histórico de consumo"
  ON consumption_history
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Cria políticas para a tabela de insights de IA
CREATE POLICY "Usuários podem ver seus próprios insights"
  ON ai_insights
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem inserir seus próprios insights"
  ON ai_insights
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar seus próprios insights"
  ON ai_insights
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem excluir seus próprios insights"
  ON ai_insights
  FOR DELETE
  USING (auth.uid() = user_id);

-- Cria políticas para a tabela de planos de otimização
CREATE POLICY "Usuários podem ver seus próprios planos de otimização"
  ON optimization_plans
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem inserir seus próprios planos de otimização"
  ON optimization_plans
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar seus próprios planos de otimização"
  ON optimization_plans
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem excluir seus próprios planos de otimização"
  ON optimization_plans
  FOR DELETE
  USING (auth.uid() = user_id);

-- Cria índices para melhorar a performance
CREATE INDEX devices_user_id_idx ON devices(user_id);
CREATE INDEX goals_user_id_idx ON goals(user_id);
CREATE INDEX devices_consumption_idx ON devices(consumption);
CREATE INDEX devices_type_idx ON devices(type);
CREATE INDEX consumption_history_device_id_idx ON consumption_history(device_id);
CREATE INDEX consumption_history_user_id_idx ON consumption_history(user_id);
CREATE INDEX consumption_history_timestamp_idx ON consumption_history(timestamp);
CREATE INDEX ai_insights_user_id_idx ON ai_insights(user_id);
CREATE INDEX optimization_plans_user_id_idx ON optimization_plans(user_id);
