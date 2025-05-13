
-- Create devices table
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

-- Create goals table
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

-- Create tips table
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

-- Set up Row Level Security (RLS)
ALTER TABLE devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;

-- Create policies for devices
CREATE POLICY "Users can view their own devices"
  ON devices
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own devices"
  ON devices
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own devices"
  ON devices
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own devices"
  ON devices
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create policies for goals
CREATE POLICY "Users can view their own goals"
  ON goals
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own goals"
  ON goals
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own goals"
  ON goals
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own goals"
  ON goals
  FOR DELETE
  USING (auth.uid() = user_id);

-- Insert some initial tips data
INSERT INTO tips (title, description, icon, savings, category, featured)
VALUES 
  ('Otimize seu Ar Condicionado', 'Mantenha a temperatura em 23°C e faça limpeza regular dos filtros.', 'thermometerSun', '25% no consumo de A/C', 'climatizacao', true),
  ('Programe seus Dispositivos', 'Configure timers para desligar aparelhos em horários específicos.', 'timer', '15% no consumo geral', 'eletrodomesticos', true),
  ('Substitua lâmpadas antigas por LED', 'Lâmpadas LED consomem até 80% menos energia que incandescentes e duram muito mais.', 'lightbulb', '12% no consumo geral', 'iluminacao', false),
  ('Aproveite a luz natural', 'Posicione móveis próximos às janelas e mantenha as cortinas abertas durante o dia.', 'sun', '10% no consumo de iluminação', 'iluminacao', false),
  ('Evite deixar em standby', 'Desligue completamente aparelhos eletrônicos que não estão em uso.', 'power', '8% no consumo geral', 'eletrodomesticos', false),
  ('Mantenha janelas fechadas', 'Ao usar ar condicionado, verifique se janelas e portas estão bem vedadas.', 'lock', '20% no consumo de A/C', 'climatizacao', false);
