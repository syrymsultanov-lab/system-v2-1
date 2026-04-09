/* ===== SYSTEM V2 — MAIN JS ===== */

// ===== CONFIG =====
// Значения устанавливаются из supabase-client.js (загружается первым)
const SUPABASE_URL      = window.SUPABASE_URL      || '';
const SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || '';

// Создаём клиент Supabase (используется в checkRefAccess и initForm)
let sb = null;
if (SUPABASE_URL && SUPABASE_ANON_KEY && window.supabase) {
  sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// ===== TRANSLATIONS =====
const translations = {
  ru: {
    nav_about:       'О системе',
    nav_features:    'Возможности',
    nav_reviews:     'Отзывы',
    nav_cabinet:     'Кабинет',
    hero_label:      'AI-ПЛАТФОРМА ДЛЯ MLM КОМАНД',
    hero_title:      'Система которая\nработает пока\nты спишь',
    hero_subtitle:   'Впервые в мире MLM — полная AI автоматизация работы с лидами, контактами и командой.',
    hero_cta1:       'Запросить доступ',
    hero_cta2:       'Узнать больше',
    stat1_label:     'партнёров',
    stat2_label:     'AI workflow',
    stat3_label:     'работа агента',
    problem_title:   'Почему 80% партнёров теряют лидов?',
    p1_title:        'Рутина съедает время',
    p1_text:         'Переписки вручную — часы там где должен работать AI.',
    p2_title:        'Лиды уходят в никуда',
    p2_text:         'Без касаний горячий лид остывает за 24 часа.',
    p3_title:        'Дупликация не работает',
    p3_text:         'Новичок не знает что делать. Команда не растёт.',
    solution_label:  'НАШЕ РЕШЕНИЕ',
    solution_title:  'AI агент берёт рутину на себя. Полностью.',
    s1_title:        'AI квалификация лидов',
    s1_text:         'Система анализирует каждого кандидата автоматически.',
    s2_title:        'Многоканальные касания',
    s2_text:         'WhatsApp, Telegram, Email — правильное сообщение в нужный момент.',
    s3_title:        'Дупликация команды',
    s3_text:         'Каждый новый партнёр получает ту же систему.',
    s4_title:        'Аналитика в реальном времени',
    s4_text:         'Лиды, активность команды, эффективность — в одном месте.',
    how_title:       'Три шага к автоматизации',
    how1_title:      'Кандидат заполняет форму',
    how1_text:       'Лид автоматически попадает в систему',
    how2_title:      'AI анализирует и действует',
    how2_text:       'Квалификация, касания, задачи — без тебя',
    how3_title:      'Ты занимаешься людьми',
    how3_text:       'Система делает рутину. Ты строишь команду.',
    utp_title:       'Аналогов в мире MLM не существует',
    utp_col1:        'ВОЗМОЖНОСТЬ',
    utp_col2:        'ОБЫЧНЫЙ РЕКРУТЁР',
    utp_col3:        'SYSTEM V2',
    utp_r1:          'AI обработка лидов',
    utp_r2:          'Автоматические касания',
    utp_r3:          'Дупликация системы',
    utp_r4:          'Аналитика команды',
    utp_r5:          'Работа 24/7',
    disclaimer:      '* Результаты индивидуальны. Система не гарантирует доход.',
    rev_title:       'Реальные партнёры. Реальные результаты.',
    rev_more:        'Все отзывы →',
    join_title:      'Запросить доступ к системе',
    join_subtitle:   'Доступ предоставляется через партнёра. Заполните форму — мы свяжемся.',
    f_fname:         'Имя',
    f_lname:         'Фамилия',
    f_phone:         'Телефон',
    f_email:         'Email',
    f_country:       'Страна',
    f_city:          'Город',
    f_messenger:     'Мессенджер',
    f_handle:        'Ник / номер мессенджера',
    f_ref:           'Реферальный код партнёра',
    f_consent:       'Я соглашаюсь на обработку персональных данных согласно',
    f_consent_link:  'Политике конфиденциальности',
    f_submit:        'Отправить заявку',
    modal_title:     'Заявка принята!',
    modal_text:      'Свяжемся с вами в течение 24 часов.',
    modal_close:     'Закрыть',
  },
  en: {
    nav_about:       'About',
    nav_features:    'Features',
    nav_reviews:     'Reviews',
    nav_cabinet:     'Dashboard',
    hero_label:      'AI PLATFORM FOR MLM TEAMS',
    hero_title:      'The system that\nworks while\nyou sleep',
    hero_subtitle:   'For the first time in MLM — full AI automation of leads, contacts and team management.',
    hero_cta1:       'Request Access',
    hero_cta2:       'Learn More',
    stat1_label:     'partners',
    stat2_label:     'AI workflows',
    stat3_label:     'agent uptime',
    problem_title:   'Why do 80% of partners lose their leads?',
    p1_title:        'Routine kills time',
    p1_text:         'Manual messaging takes hours where AI should work.',
    p2_title:        'Leads disappear',
    p2_text:         'Without follow-ups a hot lead goes cold in 24 hours.',
    p3_title:        'Duplication fails',
    p3_text:         'Newbies don\'t know what to do. The team doesn\'t grow.',
    solution_label:  'OUR SOLUTION',
    solution_title:  'The AI agent handles all routine. Completely.',
    s1_title:        'AI Lead Qualification',
    s1_text:         'The system analyzes every candidate automatically.',
    s2_title:        'Multi-channel Follow-ups',
    s2_text:         'WhatsApp, Telegram, Email — the right message at the right time.',
    s3_title:        'Team Duplication',
    s3_text:         'Every new partner gets the same system.',
    s4_title:        'Real-time Analytics',
    s4_text:         'Leads, team activity, effectiveness — in one place.',
    how_title:       'Three Steps to Automation',
    how1_title:      'Candidate fills out the form',
    how1_text:       'Lead automatically enters the system',
    how2_title:      'AI analyzes and acts',
    how2_text:       'Qualification, follow-ups, tasks — without you',
    how3_title:      'You focus on people',
    how3_text:       'The system handles routine. You build the team.',
    utp_title:       'Nothing like this exists in MLM',
    utp_col1:        'FEATURE',
    utp_col2:        'REGULAR RECRUITER',
    utp_col3:        'SYSTEM V2',
    utp_r1:          'AI lead processing',
    utp_r2:          'Automated follow-ups',
    utp_r3:          'System duplication',
    utp_r4:          'Team analytics',
    utp_r5:          '24/7 operation',
    disclaimer:      '* Results are individual. The system does not guarantee income.',
    rev_title:       'Real Partners. Real Results.',
    rev_more:        'All Reviews →',
    join_title:      'Request System Access',
    join_subtitle:   'Access is granted through a partner. Fill out the form — we\'ll reach out.',
    f_fname:         'First Name',
    f_lname:         'Last Name',
    f_phone:         'Phone',
    f_email:         'Email',
    f_country:       'Country',
    f_city:          'City',
    f_messenger:     'Messenger',
    f_handle:        'Messenger handle / number',
    f_ref:           'Partner Referral Code',
    f_consent:       'I agree to the processing of personal data per the',
    f_consent_link:  'Privacy Policy',
    f_submit:        'Submit Application',
    modal_title:     'Application Received!',
    modal_text:      'We will contact you within 24 hours.',
    modal_close:     'Close',
  },
  kz: {
    nav_about:       'Жүйе туралы',
    nav_features:    'Мүмкіндіктер',
    nav_reviews:     'Пікірлер',
    nav_cabinet:     'Кабинет',
    hero_label:      'MLM КОМАНДАЛАРЫ ҮШІН AI ПЛАТФОРМА',
    hero_title:      'Сен ұйықтап жатқанда\nжұмыс істейтін\nжүйе',
    hero_subtitle:   'MLM әлемінде алғаш рет — лидтермен, контактілермен және командамен жұмысты толық AI автоматтандыру.',
    hero_cta1:       'Қол жеткізуді сұрау',
    hero_cta2:       'Көбірек білу',
    stat1_label:     'серіктес',
    stat2_label:     'AI жұмыс процесі',
    stat3_label:     'агент жұмысы',
    problem_title:   'Неге серіктестердің 80% лидтерін жоғалтады?',
    p1_title:        'Рутина уақытты жейді',
    p1_text:         'Қолмен жазысу — AI жұмыс істеуі керек жерде сағаттар.',
    p2_title:        'Лидтер жоғалып кетеді',
    p2_text:         'Жанасусыз ыстық лид 24 сағатта суып қалады.',
    p3_title:        'Дупликация жұмыс істемейді',
    p3_text:         'Жаңадан келгендер не істерін білмейді. Команда өспейді.',
    solution_label:  'БІЗДІҢ ШЕШІМ',
    solution_title:  'AI агент рутинаны өзі орындайды. Толығымен.',
    s1_title:        'AI лидтерді бағалау',
    s1_text:         'Жүйе әр үміткерді автоматты түрде талдайды.',
    s2_title:        'Көп арналы жанасулар',
    s2_text:         'WhatsApp, Telegram, Email — дұрыс сәтте дұрыс хабарлама.',
    s3_title:        'Команданы дупликациялау',
    s3_text:         'Әр жаңа серіктес сол жүйені алады.',
    s4_title:        'Нақты уақытта аналитика',
    s4_text:         'Лидтер, команда белсенділігі, тиімділік — бір жерде.',
    how_title:       'Автоматтандыруға үш қадам',
    how1_title:      'Үміткер форманы толтырады',
    how1_text:       'Лид автоматты түрде жүйеге түседі',
    how2_title:      'AI талдайды және әрекет етеді',
    how2_text:       'Бағалау, жанасулар, тапсырмалар — сенсіз',
    how3_title:      'Сен адамдармен айналысасың',
    how3_text:       'Жүйе рутинаны орындайды. Сен команда құрасың.',
    utp_title:       'MLM әлемінде ұқсасы жоқ',
    utp_col1:        'МҮМКІНДІК',
    utp_col2:        'КӘДІМГІ РЕКРУТЁР',
    utp_col3:        'SYSTEM V2',
    utp_r1:          'AI лидтерді өңдеу',
    utp_r2:          'Автоматты жанасулар',
    utp_r3:          'Жүйені дупликациялау',
    utp_r4:          'Команда аналитикасы',
    utp_r5:          'Тәулік бойы жұмыс',
    disclaimer:      '* Нәтижелер жеке. Жүйе табысты кепілдемейді.',
    rev_title:       'Нақты серіктестер. Нақты нәтижелер.',
    rev_more:        'Барлық пікірлер →',
    join_title:      'Жүйеге қол жеткізуді сұрау',
    join_subtitle:   'Қол жеткізу серіктес арқылы беріледі. Форманы толтырыңыз — хабарласамыз.',
    f_fname:         'Аты',
    f_lname:         'Тегі',
    f_phone:         'Телефон',
    f_email:         'Email',
    f_country:       'Ел',
    f_city:          'Қала',
    f_messenger:     'Мессенджер',
    f_handle:        'Лақап ат / мессенджер нөмірі',
    f_ref:           'Серіктестің реферал коды',
    f_consent:       'Жеке деректерді өңдеуге келісемін',
    f_consent_link:  'Құпиялылық саясатына сай',
    f_submit:        'Өтінімді жіберу',
    modal_title:     'Өтінім қабылданды!',
    modal_text:      '24 сағат ішінде хабарласамыз.',
    modal_close:     'Жабу',
  }
};

// ===== LANGUAGE SWITCHING =====
let currentLang = localStorage.getItem('lang') || 'ru';

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  const t = translations[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = t[key];
      } else {
        el.innerHTML = t[key].replace(/\n/g, '<br>');
      }
    }
  });
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

// ===== NAVIGATION =====
function initNav() {
  const hamburger = document.querySelector('.hamburger');
  const menu = document.querySelector('.nav-menu');
  if (hamburger && menu) {
    hamburger.addEventListener('click', () => {
      menu.classList.toggle('open');
    });
    document.addEventListener('click', e => {
      if (!hamburger.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('open');
      }
    });
  }
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => applyLang(btn.dataset.lang));
  });
}

// ===== SCROLL ANIMATIONS =====
function initAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// ===== VIDEO HERO FALLBACK =====
function initVideoFallback() {
  const video = document.getElementById('hero-video');
  if (!video) return;
  video.addEventListener('error', () => {
    video.style.display = 'none';
    const fallback = document.querySelector('.hero-fallback');
    if (fallback) fallback.style.display = 'block';
  });
  if (window.matchMedia('(max-width: 768px)').matches) {
    video.style.display = 'none';
    const fallback = document.querySelector('.hero-fallback');
    if (fallback) fallback.style.display = 'block';
  }
}

// ===== GET REFERRAL CODE =====
function getReferralCode() {
  const params = new URLSearchParams(window.location.search);
  return params.get('ref') || '';
}

// ===== РЕФЕРАЛЬНАЯ ПРОВЕРКА =====
// Проверяет ?ref= против таблицы partners в Supabase.
// Если код не найден или отсутствует — скрывает форму и показывает блок "Доступ закрыт".
async function checkRefAccess() {
  const ref          = getReferralCode();
  const formWrap     = document.getElementById('join-form-wrap');
  const deniedBlock  = document.getElementById('access-denied-block');

  function denyAccess() {
    if (formWrap)    formWrap.style.display    = 'none';
    if (deniedBlock) deniedBlock.style.display = 'flex';
    // Вешаем обработчик кнопки "Войти" один раз
    initRefCodeButton();
  }

  // ===== КНОПКА "ВОЙТИ" НА СТРАНИЦЕ ДОСТУПА =====
  function initRefCodeButton() {
    const btn   = document.getElementById('ref-code-btn');
    const input = document.getElementById('ref-code-input');
    const error = document.getElementById('ref-code-error');
    if (!btn || !input) return;

    // Удаляем предыдущий listener если вдруг вызвали повторно
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);

    newBtn.addEventListener('click', async () => {
      // Чистим ввод: если пользователь вставил "?ref=TEST001" или "ref=TEST001" — берём только код
      let raw  = input.value.trim();
      let code = raw.replace(/^.*[?&]ref=/i, '').split('&')[0].trim();
      if (!code) { input.focus(); return; }
      input.value = code; // показываем очищенный код в поле

      newBtn.disabled  = true;
      newBtn.textContent = '...';
      if (error) error.style.display = 'none';

      try {
        console.log('[ВОЙТИ] Проверяем код:', code, '| sb:', !!sb);

        if (!sb) {
          // Нет клиента — просто переходим (форма откроется через grantAccess)
          window.location.href = window.location.pathname + '?ref=' + encodeURIComponent(code);
          return;
        }

        const { data, error: dbErr } = await sb
          .from('partners')
          .select('id')
          .eq('ref_code', code)
          .maybeSingle();

        console.log('[ВОЙТИ] Результат:', { data, dbErr });

        if (dbErr) throw dbErr;

        if (data) {
          // Найден — переходим на страницу с ref, форма откроется
          window.location.href = window.location.pathname + '?ref=' + encodeURIComponent(code);
          return;
        }

        // Не найден в БД
        if (error) error.style.display = 'block';

      } catch (err) {
        console.error('[ВОЙТИ] Ошибка:', err);
        // При ошибке сети — всё равно переходим (форма откроется через grantAccess)
        window.location.href = window.location.pathname + '?ref=' + encodeURIComponent(code);
      } finally {
        newBtn.disabled  = false;
        newBtn.textContent = 'Войти';
      }
    });

    // Enter в поле = клик по кнопке
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') newBtn.click();
    });
  }

  function grantAccess(partnerId, refCode) {
    if (formWrap)    formWrap.style.display    = '';
    if (deniedBlock) deniedBlock.style.display = 'none';
    // Устанавливаем partner_id в скрытое поле
    const pidInput = document.getElementById('partner-id');
    if (pidInput) pidInput.value = partnerId;
    // Сохраняем ref_code для передачи в source при отправке
    window._partnerRefCode = refCode;
  }

  // Нет ?ref= в URL → доступ запрещён
  if (!ref) {
    denyAccess();
    return;
  }

  // Ref есть в URL → сразу показываем форму (оптимистично).
  // Проверка БД нужна только для получения partner_id.
  // Если БД недоступна — форма работает, partner_id будет пустым.
  grantAccess(null, ref);
  window._debugRef = ref; // для отладки в консоли

  // Нет подключения к Supabase → форма уже показана, выходим
  if (!sb) {
    console.warn('[REF] Supabase client не инициализирован — partner_id не будет установлен');
    return;
  }

  try {
    console.log('[REF] Проверяем код:', ref);

    const { data, error } = await sb
      .from('partners')
      .select('id, ref_code')
      .eq('ref_code', ref)
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      console.warn('[REF] Код не найден в БД:', ref);
      // Код не найден — прячем форму, показываем denied
      denyAccess();
      return;
    }

    console.log('[REF] Партнёр найден:', data.id);
    // Обновляем partner_id теперь когда знаем его точно
    grantAccess(data.id, data.ref_code);

  } catch (err) {
    console.error('[REF] Ошибка проверки:', err);
    // При сетевой ошибке — форма уже показана (grantAccess был вызван выше),
    // partner_id остаётся null, ref_code сохранён в source
    window._partnerRefCode = ref;
  }
}

// ===== FORM SUBMISSION =====
function initForm() {
  const form = document.getElementById('join-form');
  if (!form) return;

  const refInput = form.querySelector('[name="referral_code"]');
  if (refInput) refInput.value = getReferralCode();

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit');
    btn.disabled = true;
    const original = btn.textContent;
    btn.textContent = '...';

    const data = new FormData(form);

    // Маппинг полей формы → РЕАЛЬНАЯ схема таблицы leads в Supabase
    // leads: id, partner_id, name(NOT NULL), last_name, phone, email,
    //        source, status, country, city, messenger, messenger_handle,
    //        consent, consent_at, created_at
    const firstName  = data.get('first_name')?.trim() || '';
    const lastName   = data.get('last_name')?.trim()  || '';
    const partnerId  = data.get('partner_id')?.trim()  || null;

    const payload = {
      name:             firstName || '—',
      last_name:        lastName || null,
      phone:            data.get('phone')?.trim() || null,
      email:            data.get('email')?.trim() || null,
      country:          data.get('country')?.trim() || null,
      city:             data.get('city')?.trim() || null,
      messenger:        data.get('messenger')?.trim() || null,
      messenger_handle: data.get('messenger_handle')?.trim() || null,
      source:           window._partnerRefCode || getReferralCode() || 'landing',
      status:           'new',
      consent:          true,
      consent_at:       new Date().toISOString(),
      partner_id:       partnerId || null,
    };

    try {
      if (sb) {
        const { error } = await sb.from('leads').insert([payload]);
        if (error) throw error;
      } else {
        // Dev-режим (нет ключей): логируем и эмулируем задержку
        console.log('[DEV] Form payload:', payload);
        await new Promise(r => setTimeout(r, 800));
      }
      showModal();
      form.reset();
      if (refInput) refInput.value = getReferralCode();
    } catch (err) {
      console.error('Submit error:', err);
      alert('Произошла ошибка при отправке. Попробуйте ещё раз.\n' + (err.message || ''));
    } finally {
      btn.disabled = false;
      btn.textContent = original;
    }
  });
}

// ===== MODAL =====
function showModal() {
  const overlay = document.getElementById('success-modal');
  if (overlay) overlay.classList.add('active');
}

function initModal() {
  const overlay = document.getElementById('success-modal');
  if (!overlay) return;
  const closeBtn = overlay.querySelector('.modal-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => overlay.classList.remove('active'));
  }
  overlay.addEventListener('click', e => {
    if (e.target === overlay) overlay.classList.remove('active');
  });
}

// ===== REVIEWS SLIDER =====
function startSlider(track, dotsContainer) {
  const slides = track.querySelectorAll('.slide');
  const dots = dotsContainer.querySelectorAll('.dot');
  let current = 0;
  let autoplay;

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach(d => d.classList.remove('active'));
    if (dots[current]) dots[current].classList.add('active');
  }

  function resetAutoplay() {
    clearInterval(autoplay);
    autoplay = setInterval(() => goTo(current + 1), 5000);
  }

  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');

  if (prevBtn) prevBtn.addEventListener('click', () => { goTo(current - 1); resetAutoplay(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { goTo(current + 1); resetAutoplay(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); resetAutoplay(); }));

  autoplay = setInterval(() => goTo(current + 1), 5000);

  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { goTo(diff > 0 ? current + 1 : current - 1); resetAutoplay(); }
  });
}

// Цвета аватаров по порядку
const AVATAR_GRADIENTS = [
  '135deg, #0B3D2E, #A8C5BC',
  '135deg, #0E1A2B, #C97D4E',
  '135deg, #1C1F26, #A8C5BC',
  '135deg, #0B3D2E, #C97D4E',
  '135deg, #0E1A2B, #A8C5BC',
  '135deg, #1C1F26, #C97D4E',
];

async function initSlider() {
  const track = document.querySelector('.slider-track');
  const dotsContainer = document.querySelector('.slider-dots');
  if (!track || !dotsContainer) return;

  // Загружаем index.json
  let entries = [];
  try {
    const res = await fetch('reviews/index.json');
    const all = await res.json();
    entries = all.filter(e => e.active);
  } catch {
    // Если fetch не работает (file://) — слайды уже в HTML, просто запускаем
    startSlider(track, dotsContainer);
    return;
  }

  if (entries.length === 0) return;

  // Загружаем все тексты параллельно
  const reviews = await Promise.all(entries.map(async (entry, i) => {
    try {
      const res = await fetch(`reviews/texts/${entry.id}.json`);
      const data = await res.json();
      return { ...data, id: entry.id, index: i };
    } catch {
      return null;
    }
  }));

  const valid = reviews.filter(Boolean);
  if (valid.length === 0) return;

  // Строим слайды
  track.innerHTML = '';
  dotsContainer.innerHTML = '';

  valid.forEach((r, i) => {
    const initial = r.name ? r.name[0] : '?';
    const gradient = AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length];
    const photoPath = `reviews/photos/${r.id}.jpg`;

    const slide = document.createElement('div');
    slide.className = 'slide review-card';
    slide.innerHTML = `
      <div class="review-avatar-wrap">
        <img
          class="review-avatar-img"
          src="${photoPath}"
          alt="${r.name}"
          onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"
        >
        <div class="review-avatar" style="background: linear-gradient(${gradient}); display: none">${initial}</div>
      </div>
      <div class="review-name">${r.name}</div>
      <div class="review-location">${r.location}</div>
      <div class="review-stars">★★★★★</div>
      <p class="review-text">${r.text}</p>
      <div class="review-date">${r.date}</div>
    `;
    track.appendChild(slide);

    const dot = document.createElement('span');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dotsContainer.appendChild(dot);
  });

  startSlider(track, dotsContainer);
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initAnimations();
  initVideoFallback();
  initForm();
  initModal();
  initSlider();
  applyLang(currentLang);
  // Реферальная проверка (асинхронная — работает параллельно с остальным)
  checkRefAccess();
});
