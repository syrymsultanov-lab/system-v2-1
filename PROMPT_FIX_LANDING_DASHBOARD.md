# CLAUDE CODE — ЕДИНЫЙ ПРОМТ: СВЯЗКА ЛЕНДИНГА И ДАШБОРДА

## КОНТЕКСТ
Проект: system v2 (lowercase) — AI-powered CRM для MLM команды.
Путь: `C:\Users\Syrym\Documents\SYSTEM v2.1`
Структура: `landing/` (HTML лендинг) + `dashboard/` (HTML дашборд) + Supabase БД.
Supabase URL: `https://huhwkryymkqeyilpvxlx.supabase.co`
У тебя есть доступ к БД через CLI или Supabase Management API.

## ВАЖНО: Старая БД мертва
URL `https://ujtjclrvanonwcwtiequ.supabase.co` — это МЁРТВЫЙ проект. 
Все ссылки на него должны быть заменены на `https://huhwkryymkqeyilpvxlx.supabase.co`.

---

## ЗАДАЧА: 5 ШАГОВ (выполняй последовательно)

### ШАГ 1: ALTER TABLE — добавить недостающие поля в `leads`

Выполни SQL в Supabase:

```sql
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS last_name text,
  ADD COLUMN IF NOT EXISTS country text,
  ADD COLUMN IF NOT EXISTS city text,
  ADD COLUMN IF NOT EXISTS messenger text,
  ADD COLUMN IF NOT EXISTS messenger_handle text,
  ADD COLUMN IF NOT EXISTS consent boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS consent_at timestamptz;
```

После выполнения проверь:
```sql
SELECT column_name, data_type FROM information_schema.columns 
WHERE table_name = 'leads' AND table_schema = 'public'
ORDER BY ordinal_position;
```

---

### ШАГ 2: ИСПРАВИТЬ ФОРМУ ЛЕНДИНГА — `landing/assets/js/main.js`

В функции `initForm()`, найди блок формирования `payload` и замени его.

**Найди** (примерно строка с `const payload = {`):
```javascript
    const payload = {
      name:       [firstName, lastName].filter(Boolean).join(' '),
      phone:      data.get('phone')?.trim() || null,
      email:      data.get('email')?.trim() || null,
      source:     window._partnerRefCode || getReferralCode() || 'landing',
      status:     'new',
      partner_id: partnerId || null,
    };
```

**Замени на:**
```javascript
    const payload = {
      name:             [firstName, lastName].filter(Boolean).join(' '),
      last_name:        lastName || null,
      phone:            data.get('phone')?.trim() || null,
      email:            data.get('email')?.trim() || null,
      country:          data.get('country')?.trim() || null,
      city:             data.get('city')?.trim() || null,
      messenger:        data.get('messenger')?.trim() || null,
      messenger_handle: data.get('messenger_handle')?.trim() || null,
      consent:          !!data.get('consent'),
      consent_at:       data.get('consent') ? new Date().toISOString() : null,
      source:           window._partnerRefCode || getReferralCode() || 'landing',
      status:           'new',
      partner_id:       partnerId || null,
    };
```

---

### ШАГ 3: ИСПРАВИТЬ ДАШБОРД — `dashboard/assets/js/db.js`

#### 3a. Исправить функцию `mapDbLead()`:

**Найди:**
```javascript
function mapDbLead(row) {
  const { first_name, last_name } = splitName(row.name);
  return {
    id:               row.id,
    first_name:       first_name,
    last_name:        last_name,
    phone:            row.phone  || '',
    email:            row.email  || '',
    messenger:        '',
    messenger_handle: '',
    country:          '',
    city:             '',
    referral_code:    row.source || '',
    status:           row.status || 'new',
    created_at:       row.created_at,
    _partner_id:      row.partner_id,
  };
}
```

**Замени на:**
```javascript
function mapDbLead(row) {
  const { first_name, last_name: splitLast } = splitName(row.name);
  return {
    id:               row.id,
    first_name:       first_name,
    last_name:        row.last_name || splitLast,
    phone:            row.phone  || '',
    email:            row.email  || '',
    messenger:        row.messenger || '',
    messenger_handle: row.messenger_handle || '',
    country:          row.country || '',
    city:             row.city || '',
    referral_code:    row.source || '',
    status:           row.status || 'new',
    created_at:       row.created_at,
    _partner_id:      row.partner_id,
  };
}
```

#### 3b. Исправить функцию `loadLeads()` — добавить новые поля в select:

**Найди:**
```javascript
    const { data, error } = await window.sb
      .from('leads')
      .select('id, partner_id, name, phone, email, source, status, created_at')
```

**Замени на:**
```javascript
    const { data, error } = await window.sb
      .from('leads')
      .select('id, partner_id, name, last_name, phone, email, country, city, messenger, messenger_handle, source, status, created_at')
```

---

### ШАГ 4: ИСПРАВИТЬ LOGIN.HTML — указывает на мёртвую БД

Файл: `landing/login.html`

**Найди:**
```javascript
  const SUPABASE_URL = 'https://ujtjclrvanonwcwtiequ.supabase.co'
  const SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || ''
```

**Замени на:**
```javascript
  const SUPABASE_URL = 'https://huhwkryymkqeyilpvxlx.supabase.co'
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1aHdrcnl5bWtxZXlpbHB2eGx4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1MDE2NTUsImV4cCI6MjA4MjA3NzY1NX0.j_OlHxmqVzY7CP8NaJ4u0lMBGZyd28GAbkYyvKaQuNU'
```

---

### ШАГ 5: НАСТРОИТЬ RLS на таблице `leads`

Выполни SQL:

```sql
-- Включить RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Политика: анонимные пользователи могут INSERT (форма лендинга)
CREATE POLICY "Anon can insert leads" ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Политика: авторизованные пользователи видят лиды своего партнёра
-- (временно — все авторизованные видят всё, пока нет связки auth.uid → partner_id)
CREATE POLICY "Authenticated can read all leads" ON leads
  FOR SELECT
  TO authenticated
  USING (true);

-- Политика: авторизованные могут обновлять статус
CREATE POLICY "Authenticated can update leads" ON leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
```

Также убедись что RLS включён на `events_log` и `lead_status_log`:

```sql
ALTER TABLE events_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anon and auth can insert events" ON events_log
  FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Auth can read events" ON events_log
  FOR SELECT TO authenticated USING (true);

ALTER TABLE lead_status_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Auth can insert status log" ON lead_status_log
  FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Auth can read status log" ON lead_status_log
  FOR SELECT TO authenticated USING (true);
```

---

## ПРОВЕРКА ПОСЛЕ ВЫПОЛНЕНИЯ

1. Открой лендинг с `?ref=TEST001` (или реальный ref_code из таблицы partners)
2. Заполни форму и отправь
3. Проверь в Supabase: `SELECT * FROM leads ORDER BY created_at DESC LIMIT 1;`
4. Убедись что ВСЕ поля заполнены: name, last_name, phone, email, country, city, messenger, messenger_handle, consent, partner_id
5. Открой дашборд — лид должен появиться во вкладке "Лиды" с полными данными

---

## ЧЕГО НЕ ДЕЛАТЬ
- НЕ менять структуру таблиц кроме указанного ALTER TABLE
- НЕ добавлять новые таблицы
- НЕ трогать CSS
- НЕ переделывать архитектуру
- НЕ использовать URL `ujtjclrvanonwcwtiequ` — это мёртвый проект
