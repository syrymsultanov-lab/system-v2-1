# 🚀 БЫСТРЫЙ СТАРТ: Что делать дальше?

## ✅ ШАГ 1: Регенерировать типы (15 минут)

### Вариант A: Если Supabase CLI уже установлен

```bash
# 1. Войдите в Supabase
supabase login

# 2. Свяжите проект (найдите project-ref в URL Supabase Dashboard)
supabase link --project-ref ваш-project-ref

# 3. Регенерируйте типы
# Если CLI установлен локально:
npx supabase gen types typescript --linked > src/integrations/supabase/types.ts
# ИЛИ используйте скрипт (после установки локально):
npm run types:generate

# 4. Проверьте результат
npm run types:count
# Должно показать число > 0 (если есть таблицы)
```

### Вариант B: Если Supabase CLI не установлен

**Для Windows (РЕКОМЕНДУЕТСЯ):**

```bash
# 1. Установите Supabase CLI локально в проект
npm install supabase --save-dev

# 2. Используйте через npx
npx supabase login
npx supabase link --project-ref ваш-project-ref
npx supabase gen types typescript --linked > src/integrations/supabase/types.ts
```

**Альтернатива (если есть Scoop):**

```bash
# Установка через Scoop
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase

# Затем используйте как обычно
supabase login
supabase link --project-ref ваш-project-ref
supabase gen types typescript --linked > src/integrations/supabase/types.ts
```

**⚠️ ВАЖНО:** Глобальная установка через `npm install -g supabase` НЕ ПОДДЕРЖИВАЕТСЯ!

### Проверка результата:

```bash
# Проверьте размер файла (должен быть большой)
wc -l src/integrations/supabase/types.ts

# Проверьте наличие таблиц
grep -c "Tables:" src/integrations/supabase/types.ts
```

**Ожидаемый результат:** Файл должен содержать все 61 таблицу из вашей БД.

---

## ✅ ШАГ 2: Применить SQL миграцию (5 минут)

1. Откройте **Supabase Dashboard** → **SQL Editor**
2. Скопируйте SQL из `docs/FULL_TECHNICAL_AUDIT.md` (раздел "ФИНАЛЬНЫЙ SQL / CODE PATCH")
3. Вставьте в SQL Editor
4. Нажмите **Run**

**Что делает миграция:**
- ✅ Добавляет поля `score`, `stage`, `temperature`, `next_action` в `leads`
- ✅ Создаёт индексы для дедупликации
- ✅ Включает RLS для `leads`, `contacts`, `lead_events`
- ✅ Создаёт функцию `create_lead_unified()` для единого приёма лидов
- ✅ Добавляет Foreign Keys

---

## ✅ ШАГ 3: Обновить код (30 минут)

### 3.1. Исправить `LeadForm.tsx`

Файл уже обновлён для использования `create_lead_unified()`, но проверьте:

```typescript
// Должно быть:
const { data, error } = await supabase.rpc('create_lead_unified', {
  p_partner_id: effectivePartnerId,
  p_phone: phone || null,
  p_email: email || null,
  p_full_name: fullName || null,
  p_source: defaultSource,
  p_messenger: null,
  p_messenger_handle: null
});
```

### 3.2. Убрать захардкоженный ключ из `client.ts`

Откройте `src/integrations/supabase/client.ts` и удалите строку 47 (захардкоженный ключ).

---

## ✅ ШАГ 4: Проверить работу (10 минут)

```bash
# 1. Запустите приложение
npm run dev

# 2. Проверьте:
# - Вход в систему работает
# - Создание лида с лендинга работает
# - Нет ошибок в консоли браузера
```

---

## 📋 ЧТО ДАЛЬШЕ?

После выполнения шагов 1-4, переходите к:

1. **Убрать `as any`** (111 использований) — см. `docs/ACTION_PLAN.md` → Приоритет 1
2. **Добавить RLS для остальных таблиц** — см. `docs/ACTION_PLAN.md` → Приоритет 2
3. **Вынести бизнес-логику** — см. `docs/ACTION_PLAN.md` → Приоритет 3
4. **Создать AI Agent** — см. `docs/ACTION_PLAN.md` → Приоритет 4

---

## ❓ ПРОБЛЕМЫ?

### Ошибка: "supabase: command not found"
```bash
# Для Windows используйте локальную установку:
npm install supabase --save-dev

# Затем используйте через npx:
npx supabase --help
```

### Ошибка: "Project not linked"
```bash
# Если CLI установлен локально:
npx supabase link --project-ref ваш-project-ref

# Если установлен через Scoop:
supabase link --project-ref ваш-project-ref
```

### Ошибка при выполнении SQL миграции
- Проверьте, что все `partner_id` в `leads`, `contacts`, `lead_events` ссылаются на существующие записи в `partners`
- Если есть "висячие" записи, удалите их или исправьте `partner_id`

### Типы не обновились
```bash
# Убедитесь, что проект связан
supabase projects list

# Проверьте, что вы в правильной директории
pwd
# Должно быть: .../System.v2
```

---

## 📚 ДОПОЛНИТЕЛЬНЫЕ РЕСУРСЫ

- **Полный аудит:** `docs/FULL_TECHNICAL_AUDIT.md`
- **План действий:** `docs/ACTION_PLAN.md`
- **Как регенерировать типы:** `docs/HOW_TO_REGENERATE_TYPES.md`

---

**Готовы начать?** Выполните ШАГ 1 прямо сейчас! 🚀
