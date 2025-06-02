
-- AI Feature Tables Migration

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

CREATE POLICY "Usuários podem atualizar seu próprio histórico de consumo"
  ON consumption_history
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem excluir seu próprio histórico de consumo"
  ON consumption_history
  FOR DELETE
  USING (auth.uid() = user_id);

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

-- Cria políticas para a tabela de ações de otimização
CREATE POLICY "Apenas permissões indiretas via planos de otimização"
  ON optimization_actions
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM optimization_plans op
      WHERE op.id = plan_id AND op.user_id = auth.uid()
    )
  );

-- Cria índices para melhorar a performance
CREATE INDEX consumption_history_device_id_idx ON consumption_history(device_id);
CREATE INDEX consumption_history_user_id_idx ON consumption_history(user_id);
CREATE INDEX consumption_history_timestamp_idx ON consumption_history(timestamp);
CREATE INDEX ai_insights_user_id_idx ON ai_insights(user_id);
CREATE INDEX ai_insights_device_id_idx ON ai_insights(device_id);
CREATE INDEX optimization_plans_user_id_idx ON optimization_plans(user_id);
CREATE INDEX optimization_actions_plan_id_idx ON optimization_actions(plan_id);
CREATE INDEX optimization_actions_device_id_idx ON optimization_actions(device_id);
