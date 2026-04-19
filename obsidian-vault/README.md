# Obsidian Vault — SYSTEM V2.1

## Что это
Долговременная память проекта. Obsidian хранит заметки, решения, итоги сессий — всё, что Claude Code использует для сохранения контекста между сессиями.

## Быстрый старт

### 1. Открыть vault в Obsidian
1. Скачай Obsidian: https://obsidian.md
2. Открой → "Open folder as vault"
3. Выбери папку: `C:\Users\Syrym\Documents\SYSTEM v2.1\obsidian-vault`

### 2. Подключить к Claude Code
Vault уже описан в `CLAUDE.md` проекта. Claude Code автоматически видит его при запуске в директории проекта.

### 3. Использовать slash-команды
Скопируй файлы из `.claude-commands/` в `.claude/commands/` корня проекта:

```powershell
cd "C:\Users\Syrym\Documents\SYSTEM v2.1"
mkdir -p .claude\commands
copy obsidian-vault\.claude-commands\*.md .claude\commands\
```

После этого в Claude Code доступны:
- `/session-start` — загрузить контекст прошлой сессии
- `/session-end` — сохранить итоги
- `/recall тема` — найти информацию в vault
- `/save-decision решение` — сохранить решение

## Структура

```
obsidian-vault/
├── MOC.md                 ← Навигационный хаб (начни здесь)
├── CLAUDE.md              ← Контекст для Claude Code
├── projects/              ← Заметки по компонентам
├── daily/                 ← Итоги сессий (YYYY-MM-DD.md)
├── sessions/              ← Детальные логи (по необходимости)
├── prompts/               ← Удачные промты
├── reference/             ← Справочники
│   └── Templates/         ← Шаблоны заметок
└── .claude-commands/      ← Промты для Claude Code
```

## Рабочий цикл

```
Открыл Claude Code
    ↓
/session-start → Claude прочитал что было вчера
    ↓
Работаешь ~1 час
    ↓
/session-end → Claude сохранил итоги
    ↓
Завтра: /session-start → подхватил контекст
```

## Git
Заметки коммитятся в Git вместе с проектом. Рабочие файлы Obsidian (workspace, graph) в `.gitignore`.

## Навигация в Obsidian
- Открой `MOC.md` — это карта всего vault
- Wiki-links `[[Название]]` кликабельны
- Graph View (Ctrl+G) показывает связи между заметками
- Daily Notes (Calendar plugin) — быстрый доступ к дневнику
