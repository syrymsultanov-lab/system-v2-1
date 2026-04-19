---
tags: [tech, stack, reference]
project: system-v2
updated: 2026-04-17
---

# Tech Stack

## Hosting
- **Domain**: sairateam.com
- **Web**: Hostinger (`public_html`)
- **VPS**: Hostinger (n8n)
- **DB**: Supabase (ref: `njwraxmlzglmofxiwmxs`)

## Frontend
- Static HTML / CSS / JS (НЕ React/Vite)
- Dashboard: Antigravity → Hostinger

## Backend
- Supabase: PostgreSQL + Auth + RLS
- 15 таблиц, max 20

## Automation
- n8n (self-hosted на Hostinger VPS)

## Dev Tools
- **Claude Code** — имплементация (path: `C:\Users\Syrym\Documents\SYSTEM v2.1`)
- **Claude Chat** — стратегия и оркестрация
- **GitHub** — version control
- **nanobanana MCP** — генерация изображений (`@ycse/nanobanana-mcp`, env: `GOOGLE_AI_API_KEY`)

## Ключевые файлы проекта
```
C:\Users\Syrym\Documents\SYSTEM v2.1\
├── CLAUDE.md              # Контекст для Claude Code
├── CONTEXT_LOAD.md        # Загрузка контекста
├── COPYWRITING.md         # Утверждённые тексты
├── PROMPT_LANDING.md      # Промт для лендинга
├── PROMPT_DASHBOARD.md    # Промт для дашборда
├── PROMPTS_MEDIA.md       # Промты для медиа
├── landing/               # Файлы лендинга
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   └── assets/
│       ├── suite.png
│       ├── restaurant.png
│       ├── pool.png
│       ├── port.png
│       └── hero-bg.mp4
└── obsidian-vault/        # Долговременная память
```

## Supabase
- URL: `https://njwraxmlzglmofxiwmxs.supabase.co`
- MCP: подключён через OAuth в Claude Code
- Anon key: есть (см. конфиг)

## Ограничения nanobanana
- Промты лучше на английском
- Дневной лимит квоты — при исчерпании сохранять промт для retry
- Нет поддержки видео генерации
