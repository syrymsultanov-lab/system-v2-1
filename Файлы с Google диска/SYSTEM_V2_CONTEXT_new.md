ДНК проекта

SYSTEM_V2_CONTEXT.md
—————

# SYSTEM V2 — Single Source of Truth (Context File)

## 0. Назначение этого файла
Этот файл является ЕДИНЫМ ИСТОЧНИКОМ ИСТИНЫ проекта SYSTEM V2.
Он всегда загружается первым в любой новой сессии с ИИ
(ChatGPT, Cursor, Claude, Antigravity и т.д.).

Цель файла — чтобы любой ИИ или человек:
- мгновенно понял суть проекта,
- не придумывал заново архитектуру,
- не усложнял без необходимости,
- продолжал работу строго в рамках SYSTEM V2.

Если возникает противоречие между этим файлом и любыми другими файлами —
приоритет всегда у SYSTEM_V2_CONTEXT.md.

---

## 1. Суть проекта SYSTEM V2
SYSTEM V2 — это система автоматизированной работы с кандидатами и партнёрами,
основанная на данных, процессах и ИИ.

SYSTEM V2:
- принимает всех кандидатов через единый вход (лендинг / форма),
- хранит всю историю взаимодействий в базе данных,
- использует ИИ для анализа, рекомендаций и коммуникации,
- минимизирует ручные действия партнёра,
- масштабируется без усложнения логики.

Это НЕ просто CRM и НЕ чат-бот.
Это оркестрация процессов вокруг лида с участием ИИ.

---

## 2. Границы системы (критически важно)

### SYSTEM V2 ДЕЛАЕТ:
- принимает лидов,
- хранит и структурирует данные,
- ведёт историю взаимодействий,
- анализирует лидов через ИИ,
- рекомендует и (частично) выполняет действия.

### SYSTEM V2 НЕ ДЕЛАЕТ:
- не заменяет человека полностью,
- не принимает критические бизнес-решения без человека,
- не хранит “память” внутри ИИ (память только в БД).

### SYSTEM V2 НИКОГДА НЕ ДОЛЖНА:
- плодить сущности без необходимости,
- добавлять автоматизацию без понятной цели,
- усложнять архитектуру “на будущее”.

Принцип: сначала ясность → потом автоматизация.

---

## 3. Архитектура (человеческим языком)

SYSTEM V2 состоит из 5 основных блоков:

1. Лендинг / формы  
   Единственная точка входа всех кандидатов.

2. Supabase (База данных)  
   ПАМЯТЬ системы.
   Хранит:
   - лидов,
   - контакты,
   - статусы,
   - события,
   - задачи,
   - результаты ИИ.

3. n8n (Оркестратор)  
   НЕРВНАЯ СИСТЕМА.
   Исполняет процессы:
   - приём лида,
   - обновление статусов,
   - вызов ИИ,
   - отправка сообщений,
   - логирование.

4. AI (LLM)  
   МОЗГ системы.
   Делает:
   - анализ,
   - ранжирование,
   - рекомендации,
   - генерацию текста.
   ИИ НЕ хранит данные — он работает только с тем, что ему передали.

5. Каналы связи  
   Email / Telegram / WhatsApp и др.
   Используются только через процессы n8n.

---

## 4. Данные (Supabase)

В проекте много таблиц (~65), но ЯДРО ограничено.

### Принцип:
ИИ — без памяти.  
ВСЯ память — в БД.

### Ядро данных (концептуально):
- Leads (кандидаты)
- Contacts (люди)
- Lead Events (вся история взаимодействий)
- Tasks (действия и напоминания)
- AI Jobs / AI Results (результаты работы ИИ)
- Partners / Users (владельцы системы)

Остальные таблицы:
- обслуживающие,
- аналитические,
- задел на будущее.

НЕ нужно понимать все таблицы, чтобы работать с системой.

---

## 5. Логика процессов (упрощённо)

1. Лид приходит через лендинг.
2. Лид записывается в БД.
3. Создаётся событие (lead_event).
4. ИИ анализирует данные:
   - сегмент,
   - приоритет,
   - следующий шаг.
5. n8n:
   - уведомляет партнёра,
   - или выполняет разрешённое действие.
6. ВСЁ фиксируется в БД.

Ни одно действие не происходит “в пустоте”.

---

## 6. Роль ИИ в SYSTEM V2

ИИ:
- советник,
- аналитик,
- коммуникатор.

ИИ НЕ:
- главный источник истины,
- автономный владелец системы,
- хранилище данных.

Любой ИИ, работающий с проектом, обязан:
- опираться на БД,
- возвращать структурированный результат,
- не выходить за границы, описанные здесь.

---

## 7. Текущий статус проекта

На момент загрузки этого файла:
- архитектура сформулирована,
- БД существует и содержит много таблиц,
- проект накопил технический и файловый “шум”,
- идёт этап:
  → ОСМЫСЛЕНИЕ → КВИНТЭССЕНЦИЯ → ОЧИСТКА.

Автоматизация и n8n будут продолжены
ТОЛЬКО после наведения архитектурного порядка.

---

## 8. Как продолжать работу с проектом (инструкция для ИИ)

Если ты ИИ и получил этот файл:

1. НЕ предлагай новую архитектуру.
2. НЕ усложняй без запроса.
3. Работай в рамках SYSTEM V2.
4. Если есть сомнения — задай уточняющий вопрос.
5. Все предложения должны:
   - уменьшать хаос,
   - упрощать,
   - усиливать систему, а не раздувать её.

---

## 9. Перед любыми изменениями ИИ ОБЯЗАН спросить:
- Это относится к ядру или вторично?
- Это упрощает или усложняет?
- Это нужно сейчас или “на потом”?

Если ответов нет — изменения НЕ вносятся.

---

## 10. Главный принцип
SYSTEM V2 — это не код и не файлы.
Это логика, порядок и ясность.

Код можно переписать.
Архитектуру без понимания — нет.
———————-
============================
SYSTEM_V2_CONTEXT.md (EN)
——————————
# SYSTEM V2 — Single Source of Truth (Context Anchor)

## 0. Purpose of This File
This file is the SINGLE SOURCE OF TRUTH for the SYSTEM V2 project.

It must always be uploaded FIRST at the beginning of any new session
with any AI system (ChatGPT, Cursor, Claude, Antigravity, ClaudeCode, etc.).

Its purpose is to ensure that any AI or human:
- immediately understands what SYSTEM V2 is,
- does NOT reinvent the architecture,
- does NOT overcomplicate the system,
- continues work strictly within the defined boundaries.

If there is any contradiction between this file and any other document,
THIS FILE ALWAYS HAS PRIORITY.

---

## 1. What SYSTEM V2 Is
SYSTEM V2 is a data-driven system for automated work with candidates and partners.

SYSTEM V2:
- accepts all candidates through a single entry point (landing / forms),
- stores the full interaction history in a database,
- uses AI for analysis, recommendations, and communication,
- minimizes manual actions by partners,
- scales without increasing architectural complexity.

SYSTEM V2 is NOT just a CRM and NOT just a chatbot.
It is a process orchestration system built around leads with AI participation.

---

## 2. System Boundaries (Critical)

### SYSTEM V2 DOES:
- accept leads,
- store and structure data,
- maintain a full interaction history,
- analyze leads using AI,
- recommend and partially execute actions.

### SYSTEM V2 DOES NOT:
- fully replace human decision-making,
- make critical business decisions autonomously,
- store long-term memory inside AI models.

### SYSTEM V2 MUST NEVER:
- introduce new entities without clear necessity,
- add automation without a defined purpose,
- complicate architecture “for the future”.

Principle: clarity first → automation second.

---

## 3. Architecture (Human-Level Explanation)

SYSTEM V2 consists of five core blocks:

1. Landing / Forms  
   The single entry point for all candidates.

2. Supabase (Database)  
   The MEMORY of the system.
   Stores:
   - leads,
   - contacts,
   - statuses,
   - events,
   - tasks,
   - AI results.

3. n8n (Orchestrator)  
   The NERVOUS SYSTEM.
   Executes processes:
   - lead intake,
   - status updates,
   - AI calls,
   - message delivery,
   - logging.

4. AI (LLM)  
   The BRAIN of the system.
   Performs:
   - analysis,
   - prioritization,
   - recommendations,
   - text generation.
   AI NEVER stores memory. It only works with provided data.

5. Communication Channels  
   Email / Telegram / WhatsApp / others.
   Always used through n8n processes.

---

## 4. Data Principles (Supabase)

The project contains many tables (~65), but the CORE is limited.

### Fundamental Rule:
AI has no memory.
ALL memory belongs to the database.

### Conceptual Core Entities:
- Leads
- Contacts
- Lead Events (full interaction history)
- Tasks
- AI Jobs / AI Results
- Partners / Users

All other tables are:
- supporting,
- analytical,
- future-oriented.

Understanding every table is NOT required to work with the system.

---

## 5. Process Logic (Simplified)

1. A lead enters through the landing.
2. The lead is stored in the database.
3. A lead_event is created.
4. AI analyzes the data:
   - segmentation,
   - priority,
   - next recommended action.
5. n8n:
   - notifies the partner,
   - or executes allowed actions.
6. Every action is logged in the database.

Nothing happens outside the data model.

---

## 6. Role of AI in SYSTEM V2

AI is:
- an advisor,
- an analyst,
- a communicator.

AI is NOT:
- the source of truth,
- an autonomous system owner,
- a data storage layer.

Any AI working with SYSTEM V2 MUST:
- rely on database data,
- return structured outputs,
- respect the system boundaries defined here.

---

## 7. Current Project Status

At the moment this file is uploaded:
- the architecture is defined,
- the database exists with many tables,
- the project has accumulated technical and file-level noise,
- the current phase is:
  → UNDERSTANDING → QUINTESSENCE → CLEANUP.

Automation and n8n workflows will continue
ONLY after architectural clarity is restored.

---

## 8. Instructions for AI Systems

If you are an AI and received this file:

1. DO NOT propose a new architecture.
2. DO NOT add complexity without explicit request.
3. Operate strictly within SYSTEM V2 boundaries.
4. Ask clarifying questions if unsure.
5. All suggestions must:
   - reduce chaos,
   - simplify logic,
   - strengthen the system.

---

## 9. Mandatory Questions Before Any Change

Before proposing or implementing changes, the AI MUST ask:
- Is this core or secondary?
- Does this simplify or complicate?
- Is this needed now or later?

If answers are unclear — NO changes should be made.

---

## 10. Core Principle
SYSTEM V2 is not code and not files.
It is logic, structure, and clarity.

Code can be rewritten.
Architecture without understanding cannot.