# CLAUDE.md — SYSTEM V2.1

## Проект
SYSTEM V2.1 — AI-powered lead pipeline для MLM команды InCruises (250+ партнёров).
Домен: sairateam.com | Supabase ref: `njwraxmlzglmofxiwmxs` | 15 таблиц (max 20)

## Роли
- Сырым = owner, decision-maker
- Claude Code = имплементация (ты)
- Claude Chat = стратегия
- Сайра = team leader, конечный пользователь

## Стек
- Landing: static HTML/CSS/JS → Hostinger `public_html`
- DB: Supabase PostgreSQL + RLS
- Automation: n8n на Hostinger VPS
- Dashboard: Antigravity → Hostinger

## 15 таблиц (после обкатки 2026-04-19)

**Ядро (8 из первоначальных, `contacts` переосмыслена):**
- `partners` — партнёры (19 кол.): +user_id→auth.users, bio, city, country, timezone, language, avatar_url, upline_id, rank, is_active, personal_volume, group_volume
- `leads` — заявки (21): +priority, notes, budget, tags jsonb, assigned_at, updated_at
- `lead_messages` — сообщения лидам (6)
- `lead_status_log` — история статусов (6)
- `lead_channels` — **переименованная старая contacts** — каналы связи лида (tg/wa/email/phone/value)
- `ai_jobs` — задачи AI (7)
- `templates` — шаблоны сообщений (16): +title, category (8 cat), channel (5 ch), author, active, ai_enabled, vars jsonb, uses_count, last_used_at, partner_id, updated_at
- `events_log` — журнал событий (8): +actor, actor_id

**Новые (7 созданы 2026-04-19):**
- `contacts` — **новая** «телефонная книга партнёра» (14): partner_id, name, phone, email, messenger, tag, notes, source, imported_from, invited_at
- `tasks` — to-do партнёра (15): title, type, source, priority, due_at, done, lead_id?, contact_id?, ai_job_id?
- `partner_settings` — 1:1 с partners (18): AI-режим, тон, язык, quiet hours, 6 флагов уведомлений, канал, marketing consent
- `partner_integrations` — N:1 (8): provider (wa/tg/ig/email/n8n/supabase), connected, config jsonb
- `training_modules` (10), `training_lessons` (9), `training_progress` (4)

**Триггеры:**
- `auth.users INSERT → partners` (auto-create partner row, backfill готов)
- `partners INSERT → partner_settings` (дефолты создаются автоматом)

**RLS:** все 15 таблиц own-only через `partner_id IN (SELECT id FROM partners WHERE user_id = auth.uid())`. Исключение: `partners` SELECT открыт всем authenticated (для структуры/ref). `templates` с `partner_id IS NULL` — системные, видны всем.

## Критические правила
1. Contact ≠ Lead. Лиды только через форму. Контакты = телефонная книга
2. Никаких гарантий дохода (InCruises policy + Meta/WABA)
3. Один запрос = один выход. Не расширять scope
4. DB first — всегда проверяй реальную схему Supabase перед генерацией
5. RLS: пустые результаты anon → проверь политики, не данные
6. Lovable `types.ts` НЕ описывает реальную БД
7. Старый проект (66 таблиц, ap-southeast-2) — мёртв

## Дизайн
Premium Marine: Deep Emerald `#0B3D2E`, Midnight Navy `#0E1A2B`, Base Dark `#1C1F26`, Pale Aqua `#A8C5BC`, CTA Copper `#C97D4E`. Video hero: `hero-bg.mp4`

## Локальная разработка
```bash
npx http-server . -p 3000
# Открывать: http://127.0.0.1:3000/landing/?ref=TEST001
# НЕ через file:// (CORS)
```

## Build Plan (порядок)
1. ✅ Финализировать CLAUDE.md
2. Claude Code prompt для лендинга (3 страницы: main+form, testimonials, legal)
3. Claude Code prompt для дашборда (9 вкладок)
4. AI agent + n8n (после стабилизации)

## Obsidian Vault (долговременная память)

Путь: `./obsidian-vault/`

### Структура
```
obsidian-vault/
├── projects/          # Заметки по компонентам системы
│   ├── SYSTEM V2.md   # Главная заметка (читай первой)
│   ├── Landing Page.md
│   ├── Dashboard.md
│   ├── Referral System.md
│   ├── AI Agent.md
│   └── n8n Workflows.md
├── daily/             # Итоги сессий (YYYY-MM-DD.md)
├── sessions/          # Детальные логи (по необходимости)
├── prompts/           # Сохранённые промты для повторного использования
├── reference/         # Справочники
│   ├── Design System.md
│   ├── Business Rules.md
│   ├── Tech Stack.md
│   └── InCruises Compensation Plan.md
└── .claude-commands/  # Промты для slash-команд
    ├── session-start.md
    ├── session-end.md
    ├── recall.md
    └── save-decision.md
```

### Правила работы с vault
1. В начале сессии — прочитай последний файл из `daily/`
2. В конце сессии — создай/обнови daily note с итогами
3. Новые решения и инсайты — сохраняй в `projects/` или `reference/`
4. Промты, которые хорошо сработали — в `prompts/`
5. Используй `[[wiki-links]]` для связей между заметками
6. Перед ответом на вопрос о проекте — ищи в vault через grep

### Slash-команды
Файлы в `.claude-commands/` содержат промты. Копируй в `.claude/commands/` если нужны slash-команды:
- `session-start` — загрузка контекста
- `session-end` — сохранение итогов
- `recall` — поиск по vault
- `save-decision` — сохранение решения
