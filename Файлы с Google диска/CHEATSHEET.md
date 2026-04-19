# 🚀 Шпаргалка для разработчика

**Быстрая справочная информация для ежедневной работы**  
*Полная документация: см. другие файлы в `docs/`*

---

## 📋 Быстрая навигация

| Задача | Файл документации |
|--------|-------------------|
| Общая архитектура | `README.md` |
| Работа с таблицами БД | `КОНФИГУРАЦИЯ_ВСЕХ_ТАБЛИЦ.md` |
| Добавление новой таблицы | `ИНСТРУКЦИЯ_ПО_ДОБАВЛЕНИЮ_ТАБЛИЦ.md` |
| Система динамических таблиц | `DYNAMIC_TABLES_SYSTEM.md` |
| Бизнес-рекомендации | `MLM_RECOMMENDATIONS.md` |
| Инструкция для пользователей | `README_PARTNERS.md` |

---

## 🛠 Технологический стек

```
Frontend:  React + TypeScript + Vite
Routing:   react-router-dom
Backend:   Supabase (Postgres + RLS)
Auth:      Supabase Auth
AI/Auto:   n8n + OpenAI
UI:        shadcn/ui + Tailwind CSS
```

---

## 📁 Ключевые директории

```
src/
├── pages/partner/          # Страницы партнёра (LeadsPageV2, ContactsPageV2, etc.)
├── components/             # React компоненты
│   ├── ui/                # shadcn/ui компоненты
│   ├── dynamic-table/     # Динамические таблицы
│   └── layout/            # Навигация (DynamicNav, PartnerNav)
├── config/                # Конфигурации (tables-config.ts)
├── integrations/supabase/ # Supabase клиент и типы
├── hooks/                 # React хуки
└── routes/                # Маршрутизация (DynamicRoutes)
```

---

## 🔑 Основные команды

```bash
# Установка зависимостей
npm install

# Запуск dev-сервера
npm run dev

# Сборка для production
npm run build

# Проверка типов TypeScript
npm run type-check  # (если есть в package.json)
```

---

## 🗄 База данных (Supabase)

### Важные таблицы (61 всего)

**CRM:**
- `leads` - Лиды (заявки)
- `contacts` - Контакты
- `lead_events`, `contact_events` - События
- `lead_tags`, `contact_tags` - Теги

**Задачи:**
- `tasks` - Задачи
- `task_comments` - Комментарии
- `reminders` - Напоминания

**ИИ:**
- `ai_jobs` - Задачи ИИ
- `ai_job_runs` - Запуски задач
- `ai_agents` - ИИ-агенты

**Партнёры:**
- `partners` - Партнёры
- `partner_team_links` - Связи команды
- `partner_metrics_daily` - Метрики

**История:**
- `events_log` - Журнал событий

### ENUM типы (часто используемые)

**lead_status:**
```
new | in_work | handed_to_ai | thinking | rejected | converted | archived
```

**contact_status:**
```
hot | warm | cold | not_set | do_not_disturb | archived
```

**messenger_type:**
```
whatsapp | telegram | email | instagram | facebook | phone | other
```

**task_status:**
```
to_do | in_progress | completed | cancelled
```

---

## 🔐 Роли и доступ (RLS)

### Owner (создатель системы)
- ✅ Видит всю структуру
- ✅ Видит всю историю
- ❌ НЕ видит контакты партнёров

### Partner
- ✅ Свои лиды
- ✅ Свои контакты
- ✅ Свою ветку структуры
- ✅ Свою историю

**ВАЖНО:** Все контролируется RLS на уровне БД!

---

## 🎯 ИИ-логика (кратко)

1. Партнёр выбирает лиды/контакты
2. Устанавливает `selected_for_ai = true`
3. Создаётся `ai_job`
4. Агент выполняет действия (пишет, отвечает)
5. Логирует в `events_log`
6. Партнёр может подключиться в любой момент

---

## 📝 Работа с таблицами

### Добавить новую таблицу в динамическую систему

1. **Добавить конфигурацию** в `src/config/tables-config.ts`:
```typescript
createTableConfig({
  tableName: 'your_table_name',
  key: 'your-table-key',
  label: 'Ваша Таблица',
  icon: 'Users',
  route: '/partner/your-table',
  columns: [/* ... */],
  relations: [/* ... */],
})
```

2. **Маршруты и навигация** генерируются автоматически через:
   - `src/routes/DynamicRoutes.tsx`
   - `src/components/layout/DynamicNav.tsx`

### Типы колонок
```
text | number | date | boolean | select | email | phone | json
```

---

## 🚫 Что НЕ делать

❌ Не менять SQL схему без необходимости  
❌ Не добавлять поля "на всякий случай"  
❌ Не ломать RLS политики  
❌ Не давать партнёрам доступ к чужим контактам  
❌ Не создавать дублирующий функционал

---

## 🎨 Философия системы

1. **Дупликация важнее кастомизации**
2. **Простота важнее красоты**
3. **Контроль на уровне БД** (RLS)
4. **ИИ — помощник, не игрушка**

---

## 🔄 Типичные задачи

### Проверить RLS политики
```sql
-- В Supabase SQL Editor
SELECT * FROM pg_policies WHERE tablename = 'your_table';
```

### Найти все таблицы
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';
```

### Проверить типы ENUM
```sql
SELECT enumlabel 
FROM pg_enum 
WHERE enumtypid = 'lead_status'::regtype;
```

---

## 📊 Основные маршруты партнёра

```
/partner              → PartnerDashboard (Дашборд)
/partner/contacts     → ContactsPageV2 (Контакты)
/partner/leads        → LeadsPageV2 (Лиды)
/partner/tasks        → TasksPageV2 (Задачи)
/partner/structure    → MyStructurePageV2 (Структура)
/partner/history      → HistoryPage (История)
/partner/training     → TrainingPage (Обучение)
/partner/templates    → TemplatesPage (Шаблоны)
/partner/settings     → SettingsPage (Настройки)
```

---

## 🐛 Отладка

### Проблемы с Supabase

1. **Проверить .env файл:**
```env
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

2. **Проверить подключение:**
```typescript
import { supabase } from '@/integrations/supabase/client';
const { data, error } = await supabase.from('leads').select('*');
```

3. **Проверить RLS:**
   - Таблица должна иметь политики
   - Пользователь должен быть авторизован
   - Проверить роль (Owner/Partner)

### Проблемы с типами

```typescript
// Типы генерируются из Supabase
// Проверить: src/integrations/supabase/types.ts
```

---

## 💡 Полезные хуки

```typescript
// Текущий партнёр
import { useCurrentPartner } from '@/hooks/useCurrentPartner';

// Уведомления
import { useNotifications } from '@/hooks/useNotifications';

// Референсный код
import { useRefCode } from '@/hooks/useRefCode';

// События лидов
import { useLeadEvents } from '@/hooks/useLeadEvents';
```

---

## 🎯 Быстрые ссылки

- **Supabase Dashboard:** https://supabase.com/dashboard
- **React Router Docs:** https://reactrouter.com/
- **shadcn/ui:** https://ui.shadcn.com/
- **Tailwind CSS:** https://tailwindcss.com/

---

## 📌 Важные заметки

- **Контакты:** Используют `first_name`, `last_name`, `display_name` (НЕТ `full_name`)
- **Статус проекта:** SQL v.2 финальный, все вкладки готовы
- **Компоненты:** Используются kebab-case имена (my-component.tsx)
- **Серверные компоненты:** Минимизировать 'use client' до необходимого

---

**Последнее обновление:** Создано на основе docs/README.md и связанной документации

