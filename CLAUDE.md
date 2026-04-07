# CLAUDE.md — SYSTEM V2 MASTER INSTRUCTION
> Версия: 2.0 ФИНАЛЬНАЯ
> Этот файл читается ПЕРВЫМ при каждом открытии проекта.
> Claude Code работает СТРОГО по этому документу.
> Не переспрашивать. Не изобретать. Не усложнять.

---

## 0. КОНТЕКСТ ПРОЕКТА

**Владелец:** Сырым Султанов (Казахстан)
**Для кого:** Саира — лидер MLM команды InCruises (250+ партнёров, рост)
**Что строим:** system v2 — AI-powered CRM платформа для MLM команды
**Миссия:** Минимизировать ручные действия партнёра. Рутину — AI агенту. Человек занимается только людьми.
**Масштаб:** От этой системы зависит благополучие 250+ реальных людей и их семей.

---

## 1. РОЛИ — ЗАПОМНИ НАВСЕГДА

| Роль | Кто | Что делает |
|------|-----|-----------|
| Владелец | Сырым | Принимает решения |
| Оркестратор | Claude (чат) | Думает, направляет, пишет промпты |
| Исполнитель | Claude Code (ты) | Пишет код, создаёт файлы, подключает БД |

**Ты — Claude Code. Исполнитель.**
Оркестратор уже всё продумал. Твоя задача — реализовать точно по инструкции.
Не предлагай альтернативную архитектуру. Не изобретай новые таблицы. Не переспрашивай по базовым вещам.

---

## 2. ДВА ПРОЕКТА SUPABASE — НЕ ПУТАТЬ НИКОГДА

| | SYSTEM V2 | system v2 |
|---|---|---|
| **Регистр** | ЗАГЛАВНЫЕ | строчные |
| **Таблиц** | 66 | 8 (макс 20) |
| **Статус** | МЁРТВ | АКТИВНЫЙ |
| **Использовать** | НИКОГДА | ВСЕГДА |

**Старый проект (66 таблиц) — закрыт навсегда. Не ссылаться. Не копировать.**

---

## 3. БАЗА ДАННЫХ — 8 ТАБЛИЦ

**Платформа:** Supabase (новый проект system v2, строчные)
**Максимум таблиц:** 20. Сейчас 8. Добавлять только с чёткой бизнес-причиной.
**RLS:** включён на всех таблицах. Партнёр видит ТОЛЬКО свои данные.

### `partners` — партнёры системы
```
id              uuid, primary key
user_id         uuid → auth.users
email           text
first_name      text
last_name       text
phone           text
role            text (partner / owner)
upline_id       uuid → partners.id
referral_code   text, уникальный
is_active       boolean
created_at      timestamptz
```

### `leads` — входная точка, только с лендинга
```
id                uuid, primary key
partner_id        uuid → partners.id
first_name        text
last_name         text
phone             text
email             text
country           text
city              text
messenger         text (whatsapp/telegram/instagram/email/viber/other)
messenger_handle  text
source            text (landing)
referral_code     text
status            text (new/in_work/handed_to_ai/converted/rejected/archived)
consent           boolean
created_at        timestamptz
updated_at        timestamptz
```

Статусы: `new → in_work → handed_to_ai → converted / rejected / archived`

### `contacts` — личная золотая база партнёра
```
id                uuid, primary key
partner_id        uuid → partners.id
first_name        text
last_name         text
phone             text
email             text
messenger         text
messenger_handle  text
city              text
country           text
status            text (hot/warm/cold/archived)
selected_for_ai   boolean
notes             text
source            text (manual/import_csv/import_vcf/import_sheets/converted_lead)
lead_id           uuid, nullable
created_at        timestamptz
updated_at        timestamptz
```

### `lead_messages` — история сообщений с лидом
```
id          uuid, primary key
lead_id     uuid → leads.id
partner_id  uuid
direction   text (outgoing/incoming)
channel     text
content     text
sent_by     text (partner/ai)
sent_at     timestamptz
```

### `lead_status_log` — лог изменений статуса
```
id          uuid, primary key
lead_id     uuid → leads.id
partner_id  uuid
from_status text
to_status   text
changed_by  text (partner/ai/system)
reason      text
created_at  timestamptz
```

### `events_log` — чёрный ящик системы (только запись)
```
id            uuid, primary key
partner_id    uuid
entity_type   text (lead/contact/task/ai_job/system)
entity_id     uuid
action        text
performed_by  text (partner/ai/system)
metadata      jsonb
created_at    timestamptz
```

### `ai_jobs` — задачи для AI агента
```
id            uuid, primary key
partner_id    uuid
entity_type   text (lead/contact)
entity_id     uuid
job_type      text (qualify/message/follow_up/analyze)
status        text (pending/running/done/failed)
payload       jsonb
result        jsonb
error         text
created_at    timestamptz
updated_at    timestamptz
```

### `templates` — шаблоны сообщений (AI использует только их)
```
id          uuid, primary key
partner_id  uuid, nullable (null = системный)
title       text
content     text
category    text (greeting/follow_up/qualify/rejection/conversion)
channel     text (whatsapp/telegram/email/any)
language    text (ru/en/kz)
is_active   boolean
created_at  timestamptz
```

---

## 4. КЛЮЧЕВАЯ БИЗНЕС-ЛОГИКА

### Контакт НЕ РАВНО Лид — фундаментальное правило

```
КОНТАКТ = личная телефонная книга партнёра (золото MLM)
          Добавляется вручную или импортируется.

ЛИД     = только тот кто САМ заполнил форму на лендинге.
          Никак иначе.
```

- Партнёр НЕ МОЖЕТ создать лид вручную
- Партнёр НЕ МОЖЕТ перенести контакт в лиды
- Только одно направление: `Лендинг → Лид → конвертация → Контакт`
- В дашборде нет кнопки "Создать лид" — это не баг, это правило

### Импорт контактов
- CSV файлы
- VCF (телефонная книга телефона)
- Google Sheets (публичная ссылка)
- Ручной ввод

### Запрет гарантий дохода — АБСОЛЮТНЫЙ
Нигде в системе нельзя писать гарантии дохода.
Везде где упоминается заработок — дисклеймер:
`* Результаты индивидуальны. Система не гарантирует доход.`

### MLM логика (Шрайтер, Гейдж, Дон Файла)
- Не убеждай — сортируй. AI сортирует, человек закрывает.
- Глубина важнее ширины. 5 серьёзных партнёров на 3 уровня.
- Дупликация. Система работает одинаково у любого партнёра.
- Математика: 3×3×3 = 39 человек. Показывать в дашборде.

---

## 5. AI АГЕНТ — ПРАВИЛА

### Может:
- Читать лиды/контакты где `selected_for_ai = true`
- Анализировать и расставлять приоритеты
- Отправлять сообщения ТОЛЬКО по шаблонам из `templates`
- Создавать задачи для партнёра
- Логировать каждое действие в `events_log`

### Не может:
- Писать без разрешения (`selected_for_ai = true`)
- Придумывать тексты — только шаблоны
- Менять данные без записи в лог
- Обещать доход
- Действовать вне n8n workflow

---

## 6. ЛЕНДИНГ — 3 СТРАНИЦЫ

**Стек:** HTML5 + CSS3 + Vanilla JS (без фреймворков)
**Языки:** RU основной, EN и KZ переключатели
**Тексты:** использовать файл COPYWRITING.md — не придумывать самостоятельно

### Дизайн:
```css
--color-primary:   #0B3D2E;   /* Deep Emerald */
--color-secondary: #0E1A2B;   /* Midnight Navy */
--color-dark:      #1C1F26;   /* Graphite */
--color-accent:    #A8C5BC;   /* Pale Aqua */
--color-cta:       #C97D4E;   /* Copper */
--color-text:      #F2F4F3;   /* Fog White */

--font-display: 'Cormorant Garamond', serif;
--font-body:    'DM Sans', sans-serif;
--font-mono:    'DM Mono', monospace;
```

### Страницы:
1. `index.html` — Hero + промоушен + форма → пишет в `leads`
2. `reviews.html` — Реальные отзывы партнёров
3. `legal.html` — Политика, условия, отказ от гарантий дохода

### Форма → Supabase leads:
```javascript
await supabase.from('leads').insert([{
  first_name, last_name, phone, email,
  country, messenger, messenger_handle,
  source: 'landing', status: 'new', consent: true,
  referral_code  // из URL ?ref=XXXXX
}])
```

### Медиафайлы:
```
assets/video/hero-bg.mp4     — видеофон (Veo3)
assets/images/suite.jpg      — каюта люкс
assets/images/restaurant.jpg — ресторан на борту
assets/images/pool.jpg       — бассейн на палубе
assets/images/port.jpg       — лайнер в порту
```
Если нет файлов — CSS градиент как заглушка.

---

## 7. ДАШБОРД — 9 ВКЛАДОК

**Стек:** HTML5 + CSS3 + Vanilla JS, SPA (без перезагрузки)
**Auth:** Supabase Auth

| # | Вкладка | Суть |
|---|---------|------|
| 1 | Сегодня | Цифры дня, статус AI, рейтинг команды, лента событий |
| 2 | Лиды | Таблица лидов, передача AI, конвертация |
| 3 | Контакты | База партнёра, импорт CSV/VCF/Sheets |
| 4 | Задачи | Мои задачи и от AI |
| 5 | Структура | Команда, дерево, калькулятор роста 2×2 |
| 6 | История | events_log, только чтение |
| 7 | Обучение | Модули, уроки, чек-листы |
| 8 | Шаблоны | Библиотека сообщений для AI |
| 9 | Настройки | Профиль, AI настройки, реф.ссылка |

**Соревновательный блок на вкладке "Сегодня":**
- Топ-5 партнёров по активности (имя + первая буква фамилии)
- Твоя позиция выделена стрелкой →
- Только активность, никаких личных данных

---

## 8. N8N — 5 WORKFLOW

**Хостинг:** Hostinger (постоянный URL, не ngrok)

1. Приём лида с лендинга → БД → уведомление партнёру → ai_job
2. AI квалификация → LLM → задача партнёру → лог
3. Follow-up таймер → напоминание партнёру
4. Конвертация лида → создание контакта → лог
5. Ежедневная аналитика → метрики по партнёрам

---

## 9. СТРУКТУРА ПАПОК ПРОЕКТА

```
/
├── CLAUDE.md              ← этот файл, читать первым
├── COPYWRITING.md         ← все тексты RU/EN/KZ
├── PROMPT_LANDING.md      ← промпт для лендинга
├── PROMPT_DASHBOARD.md    ← промпт для дашборда
├── PROMPTS_MEDIA.md       ← промпты для nanobanana/Veo3
├── CONTEXT_LOAD.md        ← быстрая загрузка контекста
├── .env                   ← ключи (не в Git!)
├── .env.example
├── .gitignore
├── landing/
│   ├── index.html
│   ├── reviews.html
│   ├── legal.html
│   └── assets/css/ js/ images/ video/
├── dashboard/
│   ├── login.html
│   ├── index.html
│   └── assets/css/ js/
├── docs/
│   ├── shraiter.md
│   ├── gage.md
│   └── faila.md
└── n8n/workflows/
```

---

## 10. ПЕРЕМЕННЫЕ ОКРУЖЕНИЯ

```env
SUPABASE_URL=https://ваш-проект.supabase.co
SUPABASE_ANON_KEY=ваш-anon-key
N8N_WEBHOOK_URL=https://ваш-n8n.hostinger.com
```

Никогда не хардкодить ключи. Никогда не коммитить .env.

---

## 11. ЗАПРЕТЫ

- Более 20 таблиц в БД
- Ссылаться на SYSTEM V2 (66 таблиц) — он мёртв
- Создавать лид вручную из дашборда
- Переносить контакт в лиды
- Гарантии дохода где-либо в системе
- ngrok в продакшене
- Хардкодить ключи Supabase

---

## 12. ГЛАВНЫЙ ПРИНЦИП

> Система помогает партнёру строить бизнес,
> а не заставляет разбираться в технологиях.

Простота. Дупликация. Автоматизация.

---

*CLAUDE.md v2.0 | апрель 2026 | Сырым Султанов | system v2*
