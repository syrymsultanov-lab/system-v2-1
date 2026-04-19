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
