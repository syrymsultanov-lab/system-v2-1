ПОЛНЫЙ “паспорт проекта” в формате Markdown (.md).

Это именно тот файл, который ты сможешь:
	•	хранить у себя,
	•	вставлять первым сообщением в любой новой беседе (ChatGPT / Cursor),
	•	отправлять разработчику, Сайре, команде,
	•	использовать как единый источник истины, без повторных объяснений.

Я писал его так, будто это внутренний документ франшизы, а не чат.

# SYSTEM V2 — PROJECT PASSPORT (FULL)

SYSTEM_V2::SAIRA::PASSPORT::v2.3  
Author: Syrym Sultanov (Kazakhstan)  
Purpose: Internal franchise CRM + AI operational agent for MLM partners  
Status: Active development, core tabs implemented

---

## 1. WHAT THIS SYSTEM IS

SYSTEM v2 is NOT:
- a chatbot,
- a motivational tool,
- a generic CRM,
- a SaaS demo.

SYSTEM v2 IS:
- a **franchise-grade CRM** for MLM,
- a **duplication system**,
- a **controlled operational environment**,
- a platform where **AI reduces human error and bias**.

The key business idea:
> Most MLM partners fail not because of lack of people,  
> but because they **do not work through their contact list objectively**.  
> SYSTEM v2 removes this human bias via structure + AI.

---

## 2. CORE PHILOSOPHY

1. Every person deserves a chance.
2. Partners must NOT decide for others.
3. System > emotions.
4. Structure > improvisation.
5. AI assists execution, not strategy.
6. Everything must be:
   - logged,
   - traceable,
   - reversible.

---

## 3. TECH STACK (FIXED)

### Frontend
- Vite + React
- Unified CSS (single design system)
- Tabs-based interface

### Backend
- Supabase (Postgres + Auth + RLS)
- ONE SQL schema file
- **61 tables** already created

### Automation / AI
- n8n for workflows
- AI-agent is NOT autonomous
- AI works only through explicit workflows

---

## 4. DATABASE — SINGLE SOURCE OF TRUTH

### Important facts
- 61 tables already exist.
- Tables must NOT be changed or invented without discussion.
- RLS is enabled everywhere.

### Ownership rules
- Every operational row belongs to a `partner_id`.
- Partner sees ONLY own data.
- OWNER role:
  - sees everything EXCEPT Contacts domain.
  - Contacts are strictly private assets.

### Key domains
- partners / partner_settings / partner_roles
- leads (entry point)
- contacts (personal gold of partner)
- tasks
- templates
- campaigns
- ai_jobs / ai_job_runs / ai_job_messages
- events_log (system memory)

---

## 5. TAB STRUCTURE & PURPOSE (FIXED)

### DASHBOARD
- Operational overview for TODAY.
- Numbers, reminders, recent actions.
- Displays company News.
- NO editing, only navigation.

### CONTACTS
- Partner’s personal contact list.
- Status: hot / warm / cold / archived.
- Imported or manually added.
- Can be marked `selected_for_ai`.
- AI may work ONLY after explicit consent.

### LEADS
- Entry point of the system.
- All new people arrive here:
  - forms,
  - manual,
  - import,
  - AI discovery.
- Leads are qualified.
- Leads may be handed to AI.
- Leads may be converted to Contacts.
- Leads drive growth.

### TASKS
- Execution layer.
- Tasks may be created by AI.
- Tasks explain WHY they exist.
- Linked to leads or contacts.

### MY STRUCTURE
- Partner hierarchy visualization.
- Read-only for most roles.
- No operational actions here.

### HISTORY
- Read-only system memory.
- Shows:
  - what happened,
  - when,
  - by whom (partner / AI / system).
- Based on `events_log`.
- NO editing, NO analytics.

### TRAINING
- Internal education system.
- Modules → lessons → quizzes.
- Built for duplication.
- Controlled by owner/admins.
- Partners consume, not edit.

### TEMPLATES
- Central content library.
- Message templates only.
- Used by partners and AI.
- Categorized, versioned.
- Strategic asset.

### SETTINGS
- Configuration only.
- Roles & access.
- AI enablement & limits.
- Integrations.
- NO operational work.

### NEWS
- Internal official communication.
- Only admins/owners can publish.
- Displayed on Dashboard.
- Principle:
  - negative information flows UP,
  - positive information flows DOWN.

---

## 6. AI-AGENT — ROLE & LIMITS

### What AI is
- Operational agent.
- Workflow executor.
- Recommendation engine.

### What AI is NOT
- Chatbot.
- Coach.
- Strategist.
- Decision-maker.

### AI may:
- read leads/contacts/tasks,
- suggest next actions,
- send messages via templates,
- create tasks,
- log everything.

### AI may NOT:
- invent data,
- message without consent,
- bypass RLS,
- change strategy,
- act silently.

### Mandatory conditions
AI can act ONLY if:
- `selected_for_ai = true`
- partner settings allow AI
- daily limits not exceeded

---

## 7. KEY IDEA — CONTACT LIST AUTOMATION

Problem:
- Partners emotionally filter their contact list.
- They decide:
  “this person won’t be interested”.

Solution:
- AI ranks contacts objectively.
- AI selects small batches (5–10).
- AI sends neutral, respectful messages.
- Partner gives **explicit consent button**:
  “I allow AI to work with my contacts”.

Result:
- No bias.
- No shame.
- No missed opportunities.
- Higher duplication rate.

---

## 8. WORKFLOWS (n8n CONCEPT)

Examples:
- New lead → status set → task created
- Contact selected_for_ai → AI job queued
- AI message sent → logged → next action scheduled
- No response → reminder or pause
- Any error → stop + log + notify partner

AI never works outside workflows.

---

## 9. DESIGN & DEVELOPMENT RULES

ABSOLUTE RULES:
- No UI redesign.
- No new tables.
- No new statuses.
- No tab merging.
- No “smart guesses”.

If something seems missing:
- STOP.
- ASK.

---

## 10. HOW TO USE THIS FILE

This file is the **passport of the project**.

In any new conversation:
1. Paste this file FIRST.
2. Then write:
   “Continue SYSTEM v2. Current task: …”

This avoids:
- re-explaining,
- contradictions,
- wasted time.

---

## FINAL PRINCIPLE

SYSTEM stability > speed  
Business trust > automation  
Structure > motivation  
Duplication > genius ideas