
-- Este script cria as tabelas necessárias para o sistema
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
