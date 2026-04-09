-- ============================================================
-- SYSTEM v2 — SCHEMA BACKUP
-- Дата: 2026-04-09
-- Проект: system v2 (строчные, активный)
-- Причина: ротация скомпрометированных ключей Supabase
-- ============================================================
-- Применять в новом проекте Supabase через SQL Editor
-- ============================================================


-- ============================================================
-- 1. ТАБЛИЦЫ
-- ============================================================

-- partners — партнёры системы
CREATE TABLE IF NOT EXISTS public.partners (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  email       text,
  phone       text,
  telegram_id text,
  ref_code    text UNIQUE,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- leads — лиды с лендинга
CREATE TABLE IF NOT EXISTS public.leads (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id       uuid REFERENCES public.partners(id),
  name             text NOT NULL,
  last_name        text,
  phone            text,
  email            text,
  country          text,
  city             text,
  messenger        text,
  messenger_handle text,
  source           text,
  status           text NOT NULL DEFAULT 'new',
  consent          boolean DEFAULT false,
  consent_at       timestamptz,
  created_at       timestamptz NOT NULL DEFAULT now()
);

-- lead_messages — история сообщений с лидом
CREATE TABLE IF NOT EXISTS public.lead_messages (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id    uuid NOT NULL REFERENCES public.leads(id),
  direction  text NOT NULL CHECK (direction = ANY (ARRAY['in', 'out'])),
  channel    text NOT NULL CHECK (channel = ANY (ARRAY['telegram', 'whatsapp', 'email'])),
  message    text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- lead_status_log — лог изменений статуса лида
CREATE TABLE IF NOT EXISTS public.lead_status_log (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id    uuid NOT NULL REFERENCES public.leads(id),
  old_status text,
  new_status text NOT NULL,
  changed_by text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- contacts — контактные каналы лида (telegram/whatsapp/email/phone)
CREATE TABLE IF NOT EXISTS public.contacts (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id    uuid NOT NULL REFERENCES public.leads(id),
  channel    text NOT NULL CHECK (channel = ANY (ARRAY['telegram', 'whatsapp', 'email', 'phone'])),
  value      text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ai_jobs — задачи для AI агента
CREATE TABLE IF NOT EXISTS public.ai_jobs (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id    uuid NOT NULL REFERENCES public.leads(id),
  job_type   text NOT NULL CHECK (job_type = ANY (ARRAY['qualify', 'present'])),
  status     text NOT NULL DEFAULT 'pending'
               CHECK (status = ANY (ARRAY['pending', 'running', 'done', 'failed'])),
  result     jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- templates — шаблоны сообщений для AI
CREATE TABLE IF NOT EXISTS public.templates (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name       text NOT NULL,
  type       text NOT NULL CHECK (type = ANY (ARRAY['qualification', 'presentation', 'notification'])),
  content    text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- events_log — чёрный ящик системы (только запись)
CREATE TABLE IF NOT EXISTS public.events_log (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type text NOT NULL,
  entity_id   uuid,
  event       text NOT NULL,
  payload     jsonb,
  created_at  timestamptz NOT NULL DEFAULT now()
);


-- ============================================================
-- 2. ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE public.partners       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_messages   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_status_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_jobs         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.templates       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events_log      ENABLE ROW LEVEL SECURITY;


-- ============================================================
-- 3. RLS ПОЛИТИКИ
-- ============================================================

-- partners
CREATE POLICY "anon_read_partners_for_ref_check"
  ON public.partners FOR SELECT
  TO anon
  USING (true);

-- leads
CREATE POLICY "Anon can insert leads"
  ON public.leads FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated can read all leads"
  ON public.leads FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can update leads"
  ON public.leads FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- lead_status_log
CREATE POLICY "Auth can insert status log"
  ON public.lead_status_log FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Auth can read status log"
  ON public.lead_status_log FOR SELECT
  TO authenticated
  USING (true);

-- events_log
CREATE POLICY "Anon and auth can insert events"
  ON public.events_log FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Auth can read events"
  ON public.events_log FOR SELECT
  TO authenticated
  USING (true);


-- ============================================================
-- 4. ДОПОЛНИТЕЛЬНЫЕ ИНДЕКСЫ
-- ============================================================

-- partners_ref_code_key уже создан через UNIQUE на колонке
-- Остальные PK-индексы создаются автоматически

-- Рекомендуемые индексы для производительности:
CREATE INDEX IF NOT EXISTS idx_leads_partner_id    ON public.leads(partner_id);
CREATE INDEX IF NOT EXISTS idx_leads_status        ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_ai_jobs_lead_id     ON public.ai_jobs(lead_id);
CREATE INDEX IF NOT EXISTS idx_ai_jobs_status      ON public.ai_jobs(status);
CREATE INDEX IF NOT EXISTS idx_events_log_entity   ON public.events_log(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_lead_messages_lead  ON public.lead_messages(lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_status_lead    ON public.lead_status_log(lead_id);
CREATE INDEX IF NOT EXISTS idx_contacts_lead       ON public.contacts(lead_id);


-- ============================================================
-- ГОТОВО. 8 таблиц, RLS, политики, индексы.
-- После применения — обновить ключи в .env и supabase-client.js
-- ============================================================
