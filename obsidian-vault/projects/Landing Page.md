---
project: system-v2
component: landing
status: live
url: https://sairateam.com
hosting: hostinger
stack: static HTML/CSS/JS
updated: 2026-04-18
---

# Landing Page

## Статус: LIVE на sairateam.com (в процессе восстановления фич после переноса)

## Структура файлов (обновлено 2026-04-18)
Лендинг переехал из `landing/` в **корень репо**:
- `index.html`, `legal.html`, `reviews.html`, `login.html` — в корне
- `assets/` — в корне (css, images, js, video)
- URL теперь `sairateam.com/` (не `/landing/`)
- Локально: `http://127.0.0.1:3000/?ref=TEST001`

## Деплой
Настроен прямой FTP (`.env` с кредами):
- Host: `145.79.25.241`, user: `u848244871`, port 21
- Remote path: `domains/sairateam.com/public_html`
- Подключение: `source .env && curl -u "$FTP_USER:$FTP_PASS" "ftp://$FTP_HOST/$FTP_PATH/"`

## Страницы (план)
1. **Главная + Форма** — hero с video bg, ценностное предложение, форма регистрации
2. **Отзывы/Testimonials** — социальное доказательство
3. **Legal** — privacy policy, terms, disclaimers

## Hero
- Video background: `hero-bg.mp4`
- Три ключевые фразы:
  - *«Технология, которая работает, пока ты спишь»*
  - *«Первая MLM-команда с собственным ИИ»*
  - *«Система не забывает. Никогда.»*

## Форма → Supabase `leads`
- Поля: first_name, last_name, email, phone, country, messenger, messenger_handle, consent
- source = 'landing'
- Обязательный `?ref=` параметр (проверяется по `partners.ref_code`)
- Без ref_code → поле ввода кода вручную
- Без спонсора → `placement_status = unplaced`

## Технические детали
- Деплой: Hostinger `public_html`
- Локальная разработка: `npx http-server . -p 3000`
- Путь: `http://127.0.0.1:3000/landing/?ref=TEST001`
- НЕ открывать через `file://` (CORS)

## Язык
- RU primary
- EN и KZ как switchers

## Запрещено в копирайтинге
- Гарантии дохода
- Scarcity tactics ("мест ограничено")
- Прямое название MLM компании на лендинге
- Всё, что нарушает Meta/WABA политики

## Связи
- [[Design System]] — цвета и стиль
- [[Referral System]] — логика ref_code
- [[Business Rules]] — ограничения
