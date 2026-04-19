---
project: system-v2
component: n8n
status: deferred
hosting: hostinger-vps
updated: 2026-04-17
---

# n8n Workflows

## Статус: Отложен до стабилизации landing + dashboard

## Хостинг
- Hostinger VPS
- n8n self-hosted

## 6 ядерных workflows (план)
1. **Lead Intake** — webhook → validate → create lead → create event → notify
2. **Lead Qualification** — AI scoring → segmentation → assign status
3. **Follow-up Campaign** — timer → check status → send message → log
4. **AI Conversation** — incoming message → AI process → respond → log
5. **Status Change** — lead status changed → trigger actions → notify partner
6. **Daily Digest** — morning summary → partner notification

## Принципы
- Каждый workflow начинается событием
- Каждый workflow заканчивается логом
- Error handling на каждом шаге
- Subagents — после стабилизации основных

## Связи
- [[AI Agent]]
- [[SYSTEM V2]]
