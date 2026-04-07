# ПРОМПТ ДЛЯ CLAUDE CODE — ЛЕНДИНГ system v2
> Скопируй этот промпт целиком в Claude Code и запусти.
> Claude Code сделает всё сам без лишних вопросов.

---

## ТВОЯ ЗАДАЧА

Ты Claude Code. Исполнитель. Создай лендинг из 3 страниц для системы system v2.
Это промоушен AI-платформы для MLM партнёров InCruises.
Не переспрашивай. Не предлагай альтернативы. Строй по этому документу.

---

## ТЕХНИЧЕСКИЙ СТЕК

- Чистый HTML5 + CSS3 + Vanilla JavaScript
- Никаких фреймворков
- Supabase JS SDK через CDN для формы
- Адаптивный дизайн (mobile first)

## СТРУКТУРА ФАЙЛОВ

```
/landing/
├── index.html
├── reviews.html
├── legal.html
├── assets/
│   ├── css/style.css
│   ├── js/main.js
│   ├── images/
│   └── video/hero-bg.mp4 (placeholder)
└── .env.example
```

---

## ДИЗАЙН-СИСТЕМА

### Цвета
```css
--color-primary: #0B3D2E;
--color-secondary: #0E1A2B;
--color-dark: #1C1F26;
--color-accent: #A8C5BC;
--color-cta: #C97D4E;
--color-text: #F2F4F3;
--color-text-muted: #8A9BA8;
--color-border: rgba(168, 197, 188, 0.15);
```

### Типографика (Google Fonts)
```
Display заголовки: 'Cormorant Garamond', serif
Основной текст: 'DM Sans', sans-serif
Технические метки: 'DM Mono', monospace
```

### Принципы
- Тёмный фон, светлый текст
- Морской стиль — глубина, навигация, интеллект
- Glassmorphism карточки
- Медленные плавные анимации
- НЕ туристический буклет — технологическая платформа

---

## СТРАНИЦА 1 — ГЛАВНАЯ (index.html)

### Навигация (фиксированная)
- Лого: "system v2" (Display шрифт)
- Меню: О системе | Возможности | Отзывы
- Кнопка: "Кабинет" → /login
- Переключатель: RU | EN | KZ
- Фон: rgba(11, 61, 46, 0.95) с blur

### Hero блок
Фон: видео `assets/video/hero-bg.mp4` + overlay rgba(11,61,46,0.7)
Fallback если нет видео: градиент от #0B3D2E к #0E1A2B

Контент по центру:
```
[Метка моноширинным] "AI-ПЛАТФОРМА ДЛЯ MLM КОМАНД"

[H1, 72px desktop / 40px mobile, Cormorant Garamond]
"Система которая
работает пока
ты спишь"

[Подзаголовок, 18px, muted]
"Впервые в мире MLM — полная AI автоматизация
работы с лидами, контактами и командой."

[Кнопки]
[CTA Primary #C97D4E] "Запросить доступ" → #join
[CTA Secondary, outlined] "Узнать больше" → #about
```

Снизу hero — 3 цифры:
```
250+ партнёров | 8 AI workflow | 24/7 работа агента
```

### Секция: Проблема (фон #0E1A2B)
Заголовок: "Почему 80% партнёров теряют лидов?"

3 карточки:
```
⏰ Рутина съедает время
Переписки вручную — часы там где должен работать AI.

📉 Лиды уходят в никуда
Без касаний горячий лид остывает за 24 часа.

🔁 Дупликация не работает
Новичок не знает что делать. Команда не растёт.
```

### Секция: Решение (фон #0B3D2E)
Метка: "НАШЕ РЕШЕНИЕ"
Заголовок: "AI агент берёт рутину на себя. Полностью."

4 возможности (2x2 grid):
```
🤖 AI квалификация лидов
Система анализирует каждого кандидата автоматически.

📱 Многоканальные касания
WhatsApp, Telegram, Email — правильное сообщение в нужный момент.

👥 Дупликация команды
Каждый новый партнёр получает ту же систему.

📊 Аналитика в реальном времени
Лиды, активность команды, эффективность — в одном месте.
```

### Секция: Как работает
Заголовок: "Три шага к автоматизации"

Timeline вертикальный:
```
01 → Кандидат заполняет форму
     Лид автоматически попадает в систему

02 → AI анализирует и действует
     Квалификация, касания, задачи — без тебя

03 → Ты занимаешься людьми
     Система делает рутину. Ты строишь команду.
```

### Секция: УТП (тёмный фон с сеткой-линиями)
Заголовок: "Аналогов в мире MLM не существует"

Сравнительная таблица:
```
                         Обычный рекрутёр    system v2
AI обработка лидов              ❌               ✅
Автоматические касания          ❌               ✅
Дупликация системы              ❌               ✅
Аналитика команды               ❌               ✅
Работа 24/7                     ❌               ✅
```

Дисклеймер мелким текстом:
"* Результаты индивидуальны. Система не гарантирует доход."

### Секция: Отзывы preview (3 карточки)
Заголовок: "Реальные партнёры. Реальные результаты."
3 glassmorphism карточки — placeholder тексты.
Кнопка: "Все отзывы →" → /reviews

### Секция: Форма (id="join")
Заголовок: "Запросить доступ к системе"
Подзаголовок: "Доступ предоставляется через партнёра. Заполните форму — мы свяжемся."

Поля формы:
```
Имя *                    [text, required]
Фамилия                  [text]
Телефон *                [tel, required, placeholder: +7XXXXXXXXXX]
Email *                  [email, required]
Страна *                 [select, required: Казахстан/Россия/Беларусь/Украина/Германия/США/Другая]
Город                    [text]
Мессенджер *             [select, required: WhatsApp/Telegram/Instagram/Email/Viber/Другое]
Ник/номер мессенджера *  [text, required]
Реферальный код          [text, placeholder: Код партнёра]
☐ Согласие на обработку данных * [не предзаполнен, ссылка на /legal]

[Button CTA] "Отправить заявку"
```

Скрытые поля:
```html
<input type="hidden" name="source" value="landing">
<input type="hidden" name="status" value="new">
```

Supabase вставка при отправке:
```javascript
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

await supabase.from('leads').insert([{
  first_name, last_name, phone, email,
  country, messenger, messenger_handle,
  source: 'landing', status: 'new', consent: true
}])
```

После отправки — модальное окно:
"Заявка принята! Свяжемся в течение 24 часов."

### Footer
```
Лого | Навигация | Контакты | Правовая информация

Дисклеймер:
"Сайт не является публичной офертой.
Система не гарантирует доход.
Результаты зависят от индивидуальных усилий.
© 2026 system v2"
```

---

## СТРАНИЦА 2 — ОТЗЫВЫ (reviews.html)

Та же навигация и footer.

Hero (компактный):
```
"Реальные люди. Реальные истории."
"Партнёры команды о работе с system v2"
```

Grid карточек (3 колонки desktop, 1 mobile):
Каждая карточка:
```
[Круглое фото]
[Имя, город, страна]
[★★★★★]
[Текст отзыва]
[Дата]
```

Создай 6 placeholder карточек с реалистичными именами из СНГ.
Тексты — без гарантий дохода, нейтральные.

Внизу CTA:
```
"Готовы присоединиться?"
[Кнопка] "Запросить доступ" → index.html#join
```

---

## СТРАНИЦА 3 — ЮРИДИЧЕСКАЯ (legal.html)

Та же навигация и footer. Белый текст на тёмном фоне.

Структура:
```
1. ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ
   — Данные которые собираем
   — Как используем
   — Право на удаление
   — Контакт для запросов

2. УСЛОВИЯ ИСПОЛЬЗОВАНИЯ
   — Доступ только через партнёра
   — Запрещено использование для спама

3. ОТКАЗ ОТ ГАРАНТИЙ ДОХОДА [крупным текстом, выделить блоком]
   "Система не гарантирует какой-либо доход.
   Финансовые результаты зависят от усилий партнёра.
   Упоминание доходов других — их личный результат."

4. GDPR / ОБРАБОТКА ДАННЫХ
   — Право на доступ, исправление, удаление
   — Как подать запрос

5. СОГЛАСИЕ НА КОММУНИКАЦИЮ
   — Как отписаться

6. КОНТАКТЫ И ДАТА ОБНОВЛЕНИЯ
```

---

## ПЕРЕКЛЮЧАТЕЛЬ ЯЗЫКОВ RU / EN / KZ

```javascript
const translations = {
  ru: { hero_title: "Система которая работает пока ты спишь", cta: "Запросить доступ" },
  en: { hero_title: "The system that works while you sleep", cta: "Request Access" },
  kz: { hero_title: "Сен ұйықтап жатқанда жұмыс істейтін жүйе", cta: "Қол жеткізуді сұрау" }
}
```

Все тексты через `data-i18n` атрибуты. Выбор сохранять в localStorage.

---

## АНИМАЦИИ

```css
.fade-in { opacity: 0; transform: translateY(30px); transition: 0.8s ease; }
.fade-in.visible { opacity: 1; transform: translateY(0); }

.hero-title { animation: fadeUp 1.2s ease 0.3s both; }
.hero-subtitle { animation: fadeUp 1.2s ease 0.6s both; }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}
```

IntersectionObserver для fade-in при скролле.

---

## ИЗОБРАЖЕНИЯ И ВИДЕО

### Видео Hero (получить через nanobanana / Veo3)
Промпт для генерации:
```
Luxury cruise ship sailing on calm ocean at golden sunset.
Slow cinematic motion. 4K quality. Dark moody atmosphere.
Deep blue and emerald ocean colors. No text. Loop-friendly.
10-15 seconds.
```

### Фото для секций (получить через nanobanana)
```
1. "Luxury cruise suite interior, panoramic ocean view,
   dark wood, soft warm lighting, cinematic quality"

2. "Fine dining restaurant on cruise ship, evening,
   ocean view, sophisticated, dark moody atmosphere"

3. "Cruise ship infinity pool, ocean horizon, golden hour"

4. "White cruise ship in tropical port, aerial view,
   crystal blue water, cinematic"
```

Пока нет изображений — CSS градиент как placeholder:
```css
background: linear-gradient(135deg, #0B3D2E 0%, #0E1A2B 100%);
```

---

## МОБИЛЬНАЯ АДАПТАЦИЯ

- 768px: tablet, 480px: mobile
- Навигация → hamburger menu на мобиле
- H1: 72px → 40px → 28px
- Grid: 3 колонки → 1 колонка
- Видео на мобиле → заменить на фото

---

## ЗАПРЕТЫ (КРИТИЧНО)

Нигде не писать:
- "гарантированный доход"
- "пассивный доход $X"
- конкретные суммы заработка как обещание

Везде где упоминается доход добавлять:
"* Результаты индивидуальны. Система не гарантирует доход."

---

## ПЕРЕМЕННЫЕ ОКРУЖЕНИЯ

Файл .env.example:
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

НЕ хардкодить ключи в коде.

---

## ФИНАЛЬНЫЙ ЧЕКЛИСТ

- [ ] Все 3 страницы открываются
- [ ] Форма пишет в Supabase таблицу leads
- [ ] RU/EN/KZ переключатель работает
- [ ] Видео или fallback градиент в hero
- [ ] Мобильная версия корректна
- [ ] Нет обещаний дохода
- [ ] Кнопка "Кабинет" → /login
- [ ] Consent не предзаполнен
- [ ] Модальное окно после отправки

*Промпт подготовлен оркестратором Claude | system v2 | 2026*
