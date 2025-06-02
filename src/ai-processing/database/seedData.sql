
-- Seed data para fins de demonstração e teste
-- Nota: Este script deve ser executado apenas em ambientes de desenvolvimento e teste

-- Limpa dados existentes (só use em ambiente de desenvolvimento!)
-- TRUNCATE TABLE devices CASCADE;
-- TRUNCATE TABLE goals CASCADE;
-- TRUNCATE TABLE tips CASCADE;

-- Insere dispositivos de exemplo (substitua user_id pelo ID real do usuário)
INSERT INTO devices (id, name, type, consumption, status, "lastActivity", "powerState", location, user_id)
VALUES 
  (uuid_generate_v4(), 'Ar-condicionado Sala', 'ac', 1200, 'online', 'Agora', true, 'Sala', 'USER_ID_HERE'),
  (uuid_generate_v4(), 'Smart TV 55"', 'tv', 120, 'online', 'Agora', true, 'Sala', 'USER_ID_HERE'),
  (uuid_generate_v4(), 'Geladeira', 'fridge', 350, 'online', 'Agora', true, 'Cozinha', 'USER_ID_HERE'),
  (uuid_generate_v4(), 'Iluminação - Quarto', 'light', 40, 'offline', '2h atrás', false, 'Quarto', 'USER_ID_HERE'),
  (uuid_generate_v4(), 'Máquina de Lavar', 'washer', 500, 'offline', '5h atrás', false, 'Área de Serviço', 'USER_ID_HERE'),
  (uuid_generate_v4(), 'Computador', 'computer', 200, 'online', 'Agora', true, 'Escritório', 'USER_ID_HERE'),
  (uuid_generate_v4(), 'Ar-condicionado Quarto', 'ac', 950, 'offline', '8h atrás', false, 'Quarto', 'USER_ID_HERE'),
  (uuid_generate_v4(), 'Ventilador', 'fan', 65, 'online', 'Agora', true, 'Sala', 'USER_ID_HERE'),
  (uuid_generate_v4(), 'Micro-ondas', 'microwave', 800, 'offline', '3h atrás', false, 'Cozinha', 'USER_ID_HERE'),
  (uuid_generate_v4(), 'Carregador de Celular', 'charger', 10, 'online', 'Agora', true, 'Quarto', 'USER_ID_HERE');

-- Insere metas de exemplo para o usuário
INSERT INTO goals (id, title, description, progress, status, "statusColor", "iconType", "iconBg", target, "targetDate", type, user_id)
VALUES 
  (uuid_generate_v4(), 'Reduzir Consumo em 15%', 'Diminuir o consumo total de energia da residência em 15% este mês', 60, 'Em andamento', 'amber', 'lightningBolt', 'amber', 15, '2025-06-30', 'reduction', 'USER_ID_HERE'),
  (uuid_generate_v4(), 'Otimizar uso do Ar-condicionado', 'Reduzir o uso do ar-condicionado durante horários de pico', 25, 'Em andamento', 'blue', 'thermometerSnowflake', 'blue', 100, '2025-06-15', 'device', 'USER_ID_HERE'),
  (uuid_generate_v4(), 'Migrar para Iluminação LED', 'Substituir todas as lâmpadas da casa por modelos LED', 75, 'Em andamento', 'green', 'lightbulb', 'green', 100, '2025-05-30', 'upgrade', 'USER_ID_HERE'),
  (uuid_generate_v4(), 'Implementar automação', 'Configurar desligamento automático de dispositivos não utilizados', 10, 'Não iniciado', 'slate', 'timer', 'slate', 100, '2025-07-15', 'automation', 'USER_ID_HERE');

-- Insere dados de histórico de consumo (apenas se a tabela já existir)
DO $$
DECLARE
  device_record RECORD;
  current_date DATE := CURRENT_DATE;
  hourly_date TIMESTAMP;
  user_id_val UUID := 'USER_ID_HERE'::UUID;
BEGIN
  -- Verifica se a tabela existe
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'consumption_history') THEN
    -- Para cada dispositivo
    FOR device_record IN SELECT id FROM devices WHERE user_id = user_id_val LOOP
      -- Gera dados das últimas 48 horas
      FOR hour_offset IN 0..47 LOOP
        hourly_date := (current_date - interval '2 days') + (interval '1 hour' * hour_offset);
        
        -- Insere um registro de consumo por hora
        INSERT INTO consumption_history (device_id, timestamp, consumption, user_id)
        VALUES (
          device_record.id,
          hourly_date,
          -- Gera um valor aleatório de consumo entre 0 e 1000
          (random() * 1000)::NUMERIC,
          user_id_val
        );
      END LOOP;
    END LOOP;
  END IF;
END $$;

-- Insere insights de exemplo (apenas se a tabela já existir)
DO $$
BEGIN
  -- Verifica se a tabela existe
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'ai_insights') THEN
    -- Insere alguns insights de exemplo
    INSERT INTO ai_insights (type, title, description, device_id, confidence, source, user_id, actions)
    SELECT 
      unnest(ARRAY['warning', 'info', 'success', 'critical']) as type,
      unnest(ARRAY[
        'Consumo Elevado Detectado', 
        'Padrão de Uso Incomum', 
        'Economia Significativa Alcançada', 
        'Dispositivo com Possível Problema'
      ]) as title,
      unnest(ARRAY[
        'Seu ar-condicionado está consumindo 30% mais energia do que o normal.',
        'Sua geladeira está com padrão de consumo diferente do habitual.',
        'Suas mudanças de hábito resultaram em 15% de economia este mês!',
        'A TV da sala apresenta consumo anormal quando em standby.'
      ]) as description,
      (SELECT id FROM devices WHERE user_id = 'USER_ID_HERE' ORDER BY RANDOM() LIMIT 1) as device_id,
      unnest(ARRAY[0.85, 0.70, 0.95, 0.80]) as confidence,
      unnest(ARRAY['ai-prediction', 'pattern-detection', 'rule-based', 'ai-prediction']) as source,
      'USER_ID_HERE'::UUID as user_id,
      unnest(ARRAY[
        '[{"actionId":"check_device","title":"Verificar Dispositivo","description":"Inspecione o dispositivo","difficulty":"medium"}]'::JSONB,
        '[{"actionId":"monitor","title":"Monitorar Padrão","description":"Continue monitorando o dispositivo","difficulty":"easy"}]'::JSONB,
        '[{"actionId":"share_success","title":"Compartilhar Sucesso","description":"Compartilhe suas estratégias com amigos","difficulty":"easy"}]'::JSONB,
        '[{"actionId":"maintenance","title":"Agendar Manutenção","description":"O dispositivo pode precisar de manutenção","difficulty":"hard"}]'::JSONB
      ]) as actions;
  END IF;
END $$;

-- Insere planos de otimização de exemplo (apenas se a tabela já existir)
DO $$
DECLARE
  new_plan_id UUID;
  user_id_val UUID := 'USER_ID_HERE'::UUID;
  device_ids UUID[];
BEGIN
  -- Verifica se as tabelas existem
  IF EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_name = 'optimization_plans' AND 
          EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'optimization_actions')
  ) THEN
    -- Obtém IDs de dispositivos do usuário
    SELECT ARRAY_AGG(id) INTO device_ids FROM devices WHERE user_id = user_id_val;
    
    -- Se existem dispositivos
    IF device_ids IS NOT NULL AND array_length(device_ids, 1) > 0 THEN
      -- Cria um plano de otimização
      INSERT INTO optimization_plans (
        name, description, estimated_savings, schedule_type, schedule_config, user_id, active
      ) VALUES (
        'Plano Noturno de Economia',
        'Reduz automaticamente o consumo de energia durante a madrugada',
        12.5,
        'recurring',
        '{"startTime": "23:00", "endTime": "06:00", "daysOfWeek": [0,1,2,3,4,5,6], "active": true}'::JSONB,
        user_id_val,
        true
      ) RETURNING id INTO new_plan_id;
      
      -- Adiciona ações para o plano
      INSERT INTO optimization_actions (plan_id, device_id, action, parameters, estimated_impact, executed)
      VALUES 
        (new_plan_id, device_ids[1], 'turn_off', '{"delay_minutes": 30}'::JSONB, 5.2, false),
        (new_plan_id, device_ids[2], 'reduce_power', '{"target_level": 50}'::JSONB, 3.8, false),
        (new_plan_id, device_ids[3], 'reschedule', '{"start_time": "04:00"}'::JSONB, 2.5, false);
      
      -- Cria outro plano de otimização
      INSERT INTO optimization_plans (
        name, description, estimated_savings, schedule_type, schedule_config, user_id, active
      ) VALUES (
        'Modo Econômico para Dias Quentes',
        'Ajusta os aparelhos para máxima eficiência em dias de calor',
        8.3,
        'scheduled',
        '{"startTime": "10:00", "endTime": "16:00", "active": true}'::JSONB,
        user_id_val,
        false
      ) RETURNING id INTO new_plan_id;
      
      -- Adiciona ações para o segundo plano
      INSERT INTO optimization_actions (plan_id, device_id, action, parameters, estimated_impact, executed)
      SELECT 
        new_plan_id,
        device_id,
        action,
        parameters,
        estimated_impact,
        false
      FROM (
        VALUES 
          (device_ids[array_length(device_ids, 1)], 'maintenance', '{"reminder": true}'::JSONB, 1.5),
          (device_ids[1], 'reduce_power', '{"target_temp": 24}'::JSONB, 4.2),
          (device_ids[2], 'turn_off', NULL::JSONB, 2.6)
      ) AS values_table(device_id, action, parameters, estimated_impact);
    END IF;
  END IF;
END $$;

-- Nota: Este script deve ser adaptado substituindo 'USER_ID_HERE' pelo ID real do usuário
-- antes da execução em um ambiente de produção ou desenvolvimento.
