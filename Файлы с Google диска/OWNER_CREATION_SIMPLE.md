# 🎯 ПРОСТАЯ инструкция: Как создать Owner

## Самый простой способ (если вы уже партнёр)

1. Откройте **Supabase Dashboard** → **SQL Editor**
2. Скопируйте и выполните этот запрос (замените email):

```sql
UPDATE partners
SET role = 'owner'
WHERE email = 'ваш-email@example.com';
```

3. Проверьте результат:

```sql
SELECT id, email, full_name, role 
FROM partners 
WHERE email = 'ваш-email@example.com';
```

**Готово!** Теперь вы owner. Войдите в систему заново.

---

## Если вы НЕ зарегистрированы как партнёр

### Шаг 1: Создайте пользователя (если его нет)

1. Откройте **Supabase Dashboard** → **Authentication** → **Users**
2. Нажмите **Add User**
3. Введите:
   - Email: ваш email
   - Password: ваш пароль
4. Сохраните и **скопируйте User ID** (UUID, например: `a1b2c3d4-...`)

### Шаг 2: Создайте owner партнёра

1. Откройте **Supabase Dashboard** → **SQL Editor**
2. Выполните запрос (замените значения):

```sql
INSERT INTO partners (user_id, email, full_name, role, is_active)
VALUES (
  'ВАШ_USER_ID_СЮДА'::uuid,  -- Вставьте User ID из шага 1
  'ваш-email@example.com',   -- Ваш email
  'Ваше Имя',                -- Ваше имя
  'owner',
  true
);
```

3. Проверьте результат:

```sql
SELECT id, email, full_name, role 
FROM partners 
WHERE email = 'ваш-email@example.com';
```

**Готово!** Теперь вы owner. Войдите в систему.

---

## Быстрый SQL файл

В файле `supabase/create_owner_simple.sql` есть готовые запросы.
Просто откройте его, скопируйте нужный вариант и выполните в SQL Editor.

---

## Проверка

После создания owner:

1. Войдите в систему под этим аккаунтом
2. Откройте консоль браузера (F12)
3. Перейдите на вкладку "Моя структура"
4. Вы должны увидеть ВСЕХ партнёров в системе

