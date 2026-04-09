# ДЕПЛОЙ system-v2-1 на sairateam.com (Hostinger)

---

## ШАГ 1: Загрузи исправленные файлы в GitHub

На компьютере (или через GitHub web):

```bash
# Если через компьютер:
cd путь/к/system-v2-1
# Распакуй system-v2-1-fixed.zip ПОВЕРХ текущих файлов (заменить)
# Затем:
git add -A
git commit -m "fix: Supabase URL + leads mapping + login auth"
git push origin main
```

**Через GitHub web (если нет git):**
1. Открой github.com/syrymsultanov-lab/system-v2-1
2. Для каждого файла: нажми на файл → карандаш (Edit) → замени содержимое → Commit

**Файлы которые изменились (только 4):**
- `landing/assets/js/supabase-client.js`
- `landing/assets/js/main.js`
- `landing/login.html`
- `dashboard/assets/js/supabase-client.js`
- `dashboard/assets/js/db.js`
- `landing/.env.example`

---

## ШАГ 2: Подключи GitHub к Hostinger

1. Зайди в **hpanel.hostinger.com**
2. Выбери домен **sairateam.com**
3. В меню слева: **Websites → Git** (или **Advanced → Git**)
4. Нажми **Create repository** или **Manage**
5. Вставь URL репозитория: `https://github.com/syrymsultanov-lab/system-v2-1.git`
6. Branch: `main`
7. Папка деплоя: `public_html`
8. Нажми **Create / Deploy**

**Если Git уже подключён** — просто нажми **Pull** чтобы обновить.

---

## ШАГ 3: Настрой структуру папок

Hostinger отдаёт файлы из `public_html/`.
Проект имеет папки `landing/` и `dashboard/`.

**Вариант А — Лендинг на главной (рекомендую):**

Через **File Manager** в Hostinger:
1. Открой `public_html/`
2. Если там появились папки `landing/` и `dashboard/` — всё правильно
3. Создай файл `public_html/index.html` с редиректом:

```html
<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="refresh" content="0;url=landing/index.html">
</head>
<body>
  <a href="landing/index.html">Перейти на сайт</a>
</body>
</html>
```

**Или через .htaccess** (если Apache):
```
RewriteEngine On
RewriteRule ^$ /landing/index.html [L,R=301]
```

Теперь:
- `sairateam.com` → лендинг
- `sairateam.com/landing/login.html` → логин
- `sairateam.com/dashboard/` → дашборд

---

## ШАГ 4: SSL (HTTPS)

1. В Hostinger: **Security → SSL**
2. Включи **Free SSL** для sairateam.com
3. Включи **Force HTTPS**

Без HTTPS Supabase откажет в запросах.

---

## ШАГ 5: Проверка

Открой в браузере:
1. `https://sairateam.com` — должен показать лендинг
2. Заполни форму → нажми "Отправить"
3. Зайди в Supabase → Table Editor → `leads` → проверь новую запись
4. `https://sairateam.com/landing/login.html` — страница логина

---

## ЕСЛИ ЧТО-ТО НЕ РАБОТАЕТ

**Белый экран:** Ctrl+Shift+J (консоль) → смотри ошибки
**Форма не отправляет:** Проверь что SSL включён (https://)
**Supabase ошибка 403:** В Supabase → Authentication → URL Config → добавь `https://sairateam.com` в Site URL и Redirect URLs
**Git не тянет:** Проверь что репозиторий Public или добавь Deploy Key в Hostinger

---

## ПОСЛЕ ДЕПЛОЯ — СЛЕДУЮЩИЕ ШАГИ

1. Создать партнёра Сайру в Supabase (таблица `partners`)
2. Создать Auth пользователя в Supabase Auth
3. Настроить RLS политики
4. Подключить контент-завод (n8n → посты с CTA на sairateam.com?ref=КОД)

---

*Подготовлено: 8 апреля 2026 | Opus для Сырыма*
