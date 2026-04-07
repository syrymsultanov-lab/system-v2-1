/* ===== SYSTEM V2 — DASHBOARD JS ===== */

// ===== CLOCKS =====
function pad(n) { return String(n).padStart(2, '0'); }

function formatTime(date) {
  return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

function updateClocks() {
  const now = new Date();

  // Астана UTC+5
  const astana = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Almaty' }));
  document.getElementById('clock-astana').textContent = formatTime(astana);

  // Москва UTC+3
  const moscow = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Moscow' }));
  document.getElementById('clock-moscow').textContent = formatTime(moscow);

  // Локальное
  document.getElementById('clock-local').textContent = formatTime(now);
}

updateClocks();
setInterval(updateClocks, 1000);

// ===== TODAY DATE =====
function setTodayDate() {
  const el = document.getElementById('today-date');
  if (!el) return;
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  el.textContent = now.toLocaleDateString('ru-RU', options);
}

setTodayDate();

// ===== TAB NAVIGATION =====
function initTabs() {
  const navItems = document.querySelectorAll('.nav-item[data-tab]');
  const tabs = document.querySelectorAll('.tab-content');

  function switchTab(tabId) {
    tabs.forEach(t => t.classList.remove('active'));
    navItems.forEach(n => n.classList.remove('active'));

    const target = document.getElementById('tab-' + tabId);
    if (target) target.classList.add('active');

    const navItem = document.querySelector(`.nav-item[data-tab="${tabId}"]`);
    if (navItem) navItem.classList.add('active');

    // На мобиле закрываем сайдбар после выбора
    if (window.innerWidth <= 768) {
      document.getElementById('sidebar').classList.remove('mobile-open');
    }
  }

  navItems.forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      switchTab(item.dataset.tab);
    });
  });

  // Ссылки внутри контента
  document.querySelectorAll('[data-tab]').forEach(el => {
    if (!el.classList.contains('nav-item')) {
      el.addEventListener('click', e => {
        e.preventDefault();
        switchTab(el.dataset.tab);
      });
    }
  });
}

// ===== SIDEBAR TOGGLE =====
function initSidebar() {
  const toggle = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');

  toggle.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      sidebar.classList.toggle('mobile-open');
    } else {
      sidebar.classList.toggle('collapsed');
    }
  });

  // Клик вне сайдбара на мобиле — закрыть
  document.addEventListener('click', e => {
    if (window.innerWidth <= 768) {
      if (!sidebar.contains(e.target) && !toggle.contains(e.target)) {
        sidebar.classList.remove('mobile-open');
      }
    }
  });
}

// ===== TEMPLATES MODULE =====
const CAT_ICONS = {
  greeting:'👋', follow_up:'🔄', qualify:'🔍', conversion:'✅', rejection:'❌'
};
const CAT_LABELS = {
  greeting:'Приветствие', follow_up:'Follow-up', qualify:'Квалификация',
  conversion:'Конверсия', rejection:'Отказ'
};
const CHANNEL_ICONS = { whatsapp:'💬', telegram:'✈️', email:'📧', any:'📲' };

let templates = [
  // Системные (is_system = true — нельзя удалить/редактировать)
  { id:1,  title:'Первое приветствие',         category:'greeting',  channel:'whatsapp', language:'ru', is_active:true,  is_system:true,
    content:'Привет, {{имя}}! 👋\nМеня зовут {{партнёр}}.\nВы оставили заявку на нашем сайте.\nУдобно сейчас поговорить пару минут?' },
  { id:2,  title:'Приветствие в Telegram',      category:'greeting',  channel:'telegram', language:'ru', is_active:true,  is_system:true,
    content:'Добрый день, {{имя}}!\nЯ {{партнёр}} — партнёр InCruises.\nВижу вас заинтересовал наш проект. Расскажу подробнее — когда удобно?' },
  { id:3,  title:'Follow-up день 2',            category:'follow_up', channel:'whatsapp', language:'ru', is_active:true,  is_system:true,
    content:'{{имя}}, добрый день!\nХотел уточнить — успели ли посмотреть информацию?\nЕсть вопросы — готов ответить.' },
  { id:4,  title:'Follow-up день 5',            category:'follow_up', channel:'any',      language:'ru', is_active:true,  is_system:true,
    content:'{{имя}}, это {{партнёр}}.\nНедавно вы интересовались возможностями InCruises.\nАктуально ли ещё? Могу поделиться деталями.' },
  { id:5,  title:'Квалификация — 3 вопроса',   category:'qualify',   channel:'any',      language:'ru', is_active:true,  is_system:true,
    content:'{{имя}}, разрешите 3 коротких вопроса:\n1. Что вас привлекло в нашем проекте?\n2. Есть ли опыт в МЛМ или онлайн-бизнесе?\n3. Сколько времени готовы уделять?' },
  { id:6,  title:'Конверсия — приглашение',     category:'conversion',channel:'whatsapp', language:'ru', is_active:true,  is_system:true,
    content:'{{имя}}, на основе нашего разговора вижу — вы подходите.\nПредлагаю следующий шаг: короткая онлайн-встреча 20 мин.\nКогда удобно — завтра или послезавтра?' },
  { id:7,  title:'Мягкий отказ',               category:'rejection', channel:'any',      language:'ru', is_active:true,  is_system:true,
    content:'{{имя}}, понимаю — сейчас не подходящий момент.\nСохраню ваши контакты. Если когда-нибудь будет интерес — пишите.\nУдачи вам! 🙏' },
  { id:8,  title:'Сәлемдесу (KZ)',             category:'greeting',  channel:'whatsapp', language:'kz', is_active:true,  is_system:true,
    content:'Сәлем, {{имя}}! 👋\nМен {{партнёр}} — InCruises серіктесімін.\nСіз біздің сайтта өтінім қалдырдыңыз.\nЕкі минут сөйлесуге ыңғайлы ма?' },
  { id:9,  title:'Greeting (EN)',              category:'greeting',  channel:'telegram',  language:'en', is_active:true,  is_system:true,
    content:'Hi {{имя}}! 👋\nThis is {{партнёр}} from InCruises team.\nYou left a request on our website.\nIs now a good time to chat for a few minutes?' },
  // Личные шаблоны партнёра
  { id:10, title:'Мой личный follow-up',        category:'follow_up', channel:'whatsapp', language:'ru', is_active:true,  is_system:false,
    content:'{{имя}}, привет! Это снова {{партнёр}} 😊\nПросто хотела спросить — всё ещё думаете о нашем предложении?\nМожет, есть вопросы которые мешают решиться?' },
  { id:11, title:'Приглашение на вебинар',       category:'conversion',channel:'telegram', language:'ru', is_active:true,  is_system:false,
    content:'{{имя}}, в эту субботу проводим живой вебинар о возможностях InCruises.\nБесплатно, 45 минут. Присоединитесь?\nСсылка: {{ссылка}}' },
  { id:12, title:'После первой встречи',         category:'follow_up', channel:'whatsapp', language:'ru', is_active:false, is_system:false,
    content:'{{имя}}, рада что пообщались сегодня!\nКак я и обещала — отправляю дополнительные материалы:\n{{ссылка}}\nЖду ваших мыслей 🙂' },
];

let tplCatFilter     = 'all';
let tplChannelFilter = 'all';
let tplLangFilter    = 'all';
let editingTplId     = null;

function filterTemplates() {
  return templates.filter(t => {
    const cat  = tplCatFilter     === 'all' || t.category === tplCatFilter;
    const ch   = tplChannelFilter === 'all' || t.channel  === tplChannelFilter || t.channel === 'any';
    const lang = tplLangFilter    === 'all' || t.language === tplLangFilter;
    return cat && ch && lang;
  });
}

function renderTemplates() {
  const grid = document.getElementById('templates-grid');
  if (!grid) return;
  const list = filterTemplates();

  if (!list.length) {
    grid.innerHTML = '<div class="history-empty" style="grid-column:1/-1">Шаблонов не найдено</div>';
    return;
  }

  grid.innerHTML = list.map(t => `
    <div class="tpl-card ${t.is_system ? 'tpl-card--system' : ''} ${!t.is_active ? 'tpl-card--inactive' : ''}">
      <div class="tpl-header">
        <span class="tpl-icon">${CAT_ICONS[t.category] || '📝'}</span>
        <div class="tpl-title">${t.title}</div>
      </div>
      <div class="tpl-preview">${t.content}</div>
      <div class="tpl-tags">
        <span class="tpl-tag tpl-tag--cat-${t.category}">${CAT_LABELS[t.category]}</span>
        <span class="tpl-tag tpl-tag--channel">${CHANNEL_ICONS[t.channel] || ''} ${t.channel}</span>
        <span class="tpl-tag tpl-tag--lang">${t.language.toUpperCase()}</span>
        <span class="tpl-tag ${t.is_active ? 'tpl-tag--ai-on' : 'tpl-tag--ai-off'}">${t.is_active ? '🤖 AI вкл' : '⏹ AI выкл'}</span>
      </div>
      <div class="tpl-actions">
        <button class="btn-tpl" data-tpl-preview="${t.id}">👁 Просмотр</button>
        ${!t.is_system ? `
          <button class="btn-tpl" data-tpl-edit="${t.id}">✏️ Изменить</button>
          <button class="btn-tpl btn-tpl--delete" data-tpl-delete="${t.id}">🗑</button>
        ` : ''}
      </div>
    </div>
  `).join('');

  // Preview
  grid.querySelectorAll('[data-tpl-preview]').forEach(btn => {
    btn.addEventListener('click', () => openTplPreview(+btn.dataset.tplPreview));
  });
  // Edit
  grid.querySelectorAll('[data-tpl-edit]').forEach(btn => {
    btn.addEventListener('click', () => openTplForm(+btn.dataset.tplEdit));
  });
  // Delete
  grid.querySelectorAll('[data-tpl-delete]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (confirm('Удалить шаблон?')) {
        templates = templates.filter(t => t.id !== +btn.dataset.tplDelete);
        renderTemplates();
      }
    });
  });
}

function openTplPreview(id) {
  const t = templates.find(x => x.id === id);
  if (!t) return;
  document.getElementById('tpl-preview-title').textContent = t.title;
  document.getElementById('tpl-preview-body').innerHTML = `
    <div class="tpl-tags" style="margin-bottom:16px">
      <span class="tpl-tag tpl-tag--cat-${t.category}">${CAT_LABELS[t.category]}</span>
      <span class="tpl-tag tpl-tag--channel">${CHANNEL_ICONS[t.channel] || ''} ${t.channel}</span>
      <span class="tpl-tag tpl-tag--lang">${t.language.toUpperCase()}</span>
      <span class="tpl-tag ${t.is_active ? 'tpl-tag--ai-on' : 'tpl-tag--ai-off'}">${t.is_active ? '🤖 AI активен' : '⏹ AI отключён'}</span>
      ${t.is_system ? '<span class="tpl-tag tpl-tag--channel">системный</span>' : ''}
    </div>
    <div class="tpl-full-text">${t.content}</div>
    <div class="tpl-vars-hint">
      <strong style="color:var(--color-text)">Переменные:</strong><br>
      <code style="color:var(--color-accent)">{{имя}}</code> — имя контакта &nbsp;
      <code style="color:var(--color-accent)">{{партнёр}}</code> — ваше имя &nbsp;
      <code style="color:var(--color-accent)">{{ссылка}}</code> — реферальная ссылка
    </div>
    ${!t.is_system ? `
      <div class="modal-actions" style="padding-top:16px;border-top:1px solid var(--color-border)">
        <button class="btn-cancel" onclick="document.getElementById('modal-template-preview').classList.remove('open')">Закрыть</button>
        <button class="btn-save" onclick="openTplForm(${t.id});document.getElementById('modal-template-preview').classList.remove('open')">✏️ Редактировать</button>
      </div>
    ` : `
      <div style="text-align:right;margin-top:16px">
        <button class="btn-cancel" onclick="document.getElementById('modal-template-preview').classList.remove('open')">Закрыть</button>
      </div>
    `}
  `;
  document.getElementById('modal-template-preview').classList.add('open');
}

function openTplForm(id = null) {
  editingTplId = id;
  const form = document.getElementById('form-template');
  const title = document.getElementById('tpl-form-title');
  if (!form) return;

  if (id) {
    const t = templates.find(x => x.id === id);
    if (!t) return;
    title.textContent = 'Редактировать шаблон';
    form.title.value    = t.title;
    form.category.value = t.category;
    form.channel.value  = t.channel;
    form.language.value = t.language;
    form.content.value  = t.content;
    form.is_active.checked = t.is_active;
    document.getElementById('tpl-edit-id').value = id;
  } else {
    title.textContent = 'Новый шаблон';
    form.reset();
    form.is_active.checked = true;
    document.getElementById('tpl-edit-id').value = '';
  }
  document.getElementById('modal-template-form').classList.add('open');
}

window.openTplForm = openTplForm;

function initTemplates() {
  renderTemplates();

  // Category filter
  document.querySelectorAll('[data-tcat]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-tcat]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      tplCatFilter = btn.dataset.tcat;
      renderTemplates();
    });
  });

  // Channel filter
  document.querySelectorAll('[data-tchannel]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-tchannel]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      tplChannelFilter = btn.dataset.tchannel;
      renderTemplates();
    });
  });

  // Lang filter
  document.querySelectorAll('[data-tlang]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-tlang]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      tplLangFilter = btn.dataset.tlang;
      renderTemplates();
    });
  });

  // Open add form
  document.getElementById('btn-add-template')?.addEventListener('click', () => openTplForm(null));

  // Close preview
  document.getElementById('modal-close-tpl-preview')?.addEventListener('click', () => {
    document.getElementById('modal-template-preview').classList.remove('open');
  });
  document.getElementById('modal-template-preview')?.addEventListener('click', e => {
    if (e.target === document.getElementById('modal-template-preview'))
      document.getElementById('modal-template-preview').classList.remove('open');
  });

  // Close form
  ['modal-close-tpl-form','tpl-form-cancel'].forEach(id => {
    document.getElementById(id)?.addEventListener('click', () => {
      document.getElementById('modal-template-form').classList.remove('open');
    });
  });
  document.getElementById('modal-template-form')?.addEventListener('click', e => {
    if (e.target === document.getElementById('modal-template-form'))
      document.getElementById('modal-template-form').classList.remove('open');
  });

  // Save template
  document.getElementById('form-template')?.addEventListener('submit', e => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const editId = +document.getElementById('tpl-edit-id').value || null;

    if (editId) {
      const t = templates.find(x => x.id === editId);
      if (t) {
        t.title    = fd.get('title').trim();
        t.category = fd.get('category');
        t.channel  = fd.get('channel');
        t.language = fd.get('language');
        t.content  = fd.get('content').trim();
        t.is_active = fd.get('is_active') === 'on';
      }
    } else {
      templates.unshift({
        id: Date.now(),
        title:     fd.get('title').trim(),
        category:  fd.get('category'),
        channel:   fd.get('channel'),
        language:  fd.get('language'),
        content:   fd.get('content').trim(),
        is_active: fd.get('is_active') === 'on',
        is_system: false,
      });
    }
    renderTemplates();
    document.getElementById('modal-template-form').classList.remove('open');
  });
}

// ===== LEARNING MODULE =====
const learningModules = [
  {
    id: 1, emoji: '🚀', tag: 'Старт', status: 'completed',
    title: 'Первые шаги в MLM',
    desc: 'Базовые принципы сетевого маркетинга. Дон Файла — 10 уроков.',
    lessons: [
      { id:1,  title:'Что такое сетевой маркетинг',          duration:'5 мин',  done:true,  locked:false },
      { id:2,  title:'Кто ваш целевой партнёр',              duration:'7 мин',  done:true,  locked:false },
      { id:3,  title:'Список знакомых — ваш первый актив',   duration:'10 мин', done:true,  locked:false },
      { id:4,  title:'Первый разговор без давления',         duration:'8 мин',  done:true,  locked:false },
      { id:5,  title:'Как приглашать на презентацию',        duration:'12 мин', done:true,  locked:false },
    ]
  },
  {
    id: 2, emoji: '🔍', tag: 'Лиды', status: 'active',
    title: 'Работа с лидами',
    desc: 'Как квалифицировать, вести и конвертировать входящие заявки.',
    lessons: [
      { id:1,  title:'Что такое лид и чем он отличается от контакта', duration:'6 мин',  done:true,  locked:false },
      { id:2,  title:'Воронка: новый → в работе → конвертирован',      duration:'8 мин',  done:true,  locked:false },
      { id:3,  title:'Первое касание в течение 24 часов',              duration:'5 мин',  done:false, locked:false },
      { id:4,  title:'Как передать лида AI агенту',                    duration:'7 мин',  done:false, locked:false },
      { id:5,  title:'Конвертация лида в контакт',                     duration:'6 мин',  done:false, locked:true  },
    ]
  },
  {
    id: 3, emoji: '🔁', tag: 'Дупликация', status: 'active',
    title: 'Дупликация по Шрайтеру',
    desc: 'Система которая работает без вас. Глубина важнее ширины.',
    lessons: [
      { id:1,  title:'Принцип дупликации — что это',          duration:'8 мин',  done:true,  locked:false },
      { id:2,  title:'3 серьёзных партнёра на 3 уровня',      duration:'10 мин', done:false, locked:false },
      { id:3,  title:'Обучение нового партнёра за 48 часов',  duration:'15 мин', done:false, locked:false },
      { id:4,  title:'Система работает — человек отдыхает',   duration:'7 мин',  done:false, locked:true  },
    ]
  },
  {
    id: 4, emoji: '🤖', tag: 'AI агент', status: 'active',
    title: 'Работа с AI агентом',
    desc: 'Как настроить и использовать AI для автоматизации рутины.',
    lessons: [
      { id:1,  title:'Что умеет и чего не умеет AI агент',    duration:'6 мин',  done:true,  locked:false },
      { id:2,  title:'Шаблоны сообщений — основа AI работы',  duration:'8 мин',  done:false, locked:false },
      { id:3,  title:'Передача контакта AI агенту',           duration:'5 мин',  done:false, locked:false },
      { id:4,  title:'Читаем отчёт AI — что делать дальше',   duration:'10 мин', done:false, locked:true  },
    ]
  },
  {
    id: 5, emoji: '🧠', tag: 'Психология', status: 'locked',
    title: 'Психология рекрутинга',
    desc: 'Рэнди Гейдж о том как думает успешный сетевик.',
    lessons: [
      { id:1,  title:'Не убеждай — сортируй',                 duration:'8 мин',  done:false, locked:true },
      { id:2,  title:'Работа с возражениями без споров',       duration:'10 мин', done:false, locked:true },
      { id:3,  title:'Энергия притяжения vs давления',        duration:'7 мин',  done:false, locked:true },
      { id:4,  title:'Атмосфера успеха — как её создать',     duration:'12 мин', done:false, locked:true },
    ]
  },
  {
    id: 6, emoji: '📊', tag: 'Аналитика', status: 'locked',
    title: 'Аналитика и рост',
    desc: 'Читаем цифры дашборда. Что измерять и как расти.',
    lessons: [
      { id:1,  title:'Метрики которые важны в MLM',           duration:'8 мин',  done:false, locked:true },
      { id:2,  title:'Конверсия — как её улучшить',           duration:'10 мин', done:false, locked:true },
      { id:3,  title:'Еженедельный ритуал аналитики',         duration:'6 мин',  done:false, locked:true },
    ]
  },
];

const checklists = [
  {
    id: 1, title: '✅ Чек-лист первого дня',
    items: [
      { text:'Заполнить профиль в настройках',               done:true  },
      { text:'Настроить реферальную ссылку',                 done:true  },
      { text:'Добавить первые 10 контактов вручную',         done:true  },
      { text:'Импортировать телефонную книгу (VCF)',         done:false },
      { text:'Пройти модуль "Первые шаги в MLM"',           done:false },
      { text:'Настроить AI агента (выбрать шаблоны)',        done:false },
      { text:'Создать первую задачу',                        done:false },
    ]
  },
  {
    id: 2, title: '📞 Чек-лист работы с лидом',
    items: [
      { text:'Связаться в течение 24 часов после заявки',    done:false },
      { text:'Выяснить мессенджер и удобное время',          done:false },
      { text:'Отправить приветственное сообщение по шаблону',done:false },
      { text:'Задать 3 квалифицирующих вопроса',             done:false },
      { text:'Определить статус: горячий / тёплый / холодный',done:false },
      { text:'Передать AI если нет времени работать сейчас', done:false },
    ]
  },
  {
    id: 3, title: '🤝 Чек-лист встречи с кандидатом',
    items: [
      { text:'Подготовить короткую личную историю (2 мин)',   done:false },
      { text:'Показать продукт InCruises — не план',         done:false },
      { text:'Рассказать о системе v2 как инструменте',      done:false },
      { text:'Не давить — дать время подумать',              done:false },
      { text:'Назначить следующий шаг или дату ответа',      done:false },
      { text:'Записать заметку в карточку контакта',         done:false },
    ]
  },
  {
    id: 4, title: '📅 Еженедельный ритуал',
    items: [
      { text:'Просмотреть аналитику за неделю',              done:false },
      { text:'Проверить просроченные задачи',                done:false },
      { text:'Написать 3 тёплым контактам лично',            done:false },
      { text:'Добавить 5 новых контактов в базу',            done:false },
      { text:'Провести мини-обучение с командой',            done:false },
      { text:'Обновить шаблоны если нужно',                  done:false },
    ]
  },
];

let currentModuleId = null;

function getLearningStats() {
  let total = 0, done = 0;
  learningModules.forEach(m => m.lessons.forEach(l => {
    if (!l.locked) { total++; if (l.done) done++; }
  }));
  return { total, done };
}

function getModuleProgress(m) {
  const lessons = m.lessons.filter(l => !l.locked);
  const done = lessons.filter(l => l.done).length;
  return lessons.length ? Math.round(done / lessons.length * 100) : 0;
}

function renderLearningProgress() {
  const { total, done } = getLearningStats();
  const pct = total ? Math.round(done / total * 100) : 0;
  const bar = document.getElementById('learn-progress-bar');
  const lbl = document.getElementById('learn-progress-label');
  if (bar) bar.style.width = pct + '%';
  if (lbl) lbl.textContent = `${done} / ${total} уроков · ${pct}%`;
}

function renderModules() {
  const grid = document.getElementById('learn-modules-grid');
  if (!grid) return;
  grid.innerHTML = learningModules.map(m => {
    const pct = getModuleProgress(m);
    const doneLessons = m.lessons.filter(l => l.done).length;
    const statusMap = { completed:'✅ Завершён', active:'▶ В процессе', locked:'🔒 Заблокирован' };
    const statusCls = { completed:'module-status--done', active:'module-status--progress', locked:'module-status--locked' };
    return `
      <div class="module-card module-card--${m.status}" data-module-id="${m.id}">
        <div class="module-emoji">${m.emoji}</div>
        <div class="module-tag">${m.tag}</div>
        <div class="module-title">${m.title}</div>
        <div class="module-desc">${m.desc}</div>
        <div class="module-footer">
          <span class="module-lessons-count">${doneLessons}/${m.lessons.length} уроков</span>
          <span class="module-status ${statusCls[m.status]}">${statusMap[m.status]}</span>
        </div>
        <div class="module-progress-wrap">
          <div class="module-progress-bar" style="width:${pct}%"></div>
        </div>
      </div>
    `;
  }).join('');

  grid.querySelectorAll('.module-card:not(.module-card--locked)').forEach(card => {
    card.addEventListener('click', () => openModule(+card.dataset.moduleId));
  });
}

function openModule(id) {
  const m = learningModules.find(x => x.id === id);
  if (!m) return;
  currentModuleId = id;

  document.getElementById('learn-modules-view').style.display = 'none';
  document.getElementById('learn-lesson-view').style.display = '';

  const pct = getModuleProgress(m);
  const done = m.lessons.filter(l => l.done).length;

  document.getElementById('learn-lesson-content').innerHTML = `
    <div class="card">
      <div class="lesson-detail-header">
        <div style="font-size:40px;margin-bottom:10px">${m.emoji}</div>
        <div class="lesson-detail-title">${m.title}</div>
        <div class="lesson-detail-meta">${done} из ${m.lessons.length} уроков завершено · ${pct}%</div>
        <div style="height:4px;background:rgba(168,197,188,0.08);border-radius:2px;overflow:hidden;margin-top:12px">
          <div style="height:100%;width:${pct}%;background:linear-gradient(90deg,#0B3D2E,#A8C5BC);border-radius:2px;transition:width 0.4s"></div>
        </div>
      </div>
      <div class="lessons-list">
        ${m.lessons.map((l, i) => `
          <div class="lesson-item ${l.done ? 'lesson-item--done' : ''} ${l.locked ? 'lesson-item--locked' : ''}"
               data-module="${id}" data-lesson="${l.id}">
            <span class="lesson-num">${String(i+1).padStart(2,'0')}</span>
            <div class="lesson-check ${l.done ? 'done' : l.locked ? 'locked' : ''}">
              ${l.done ? '✓' : l.locked ? '🔒' : ''}
            </div>
            <div class="lesson-title-wrap">
              <div class="lesson-title">${l.title}</div>
              <div class="lesson-duration">⏱ ${l.duration}</div>
            </div>
            <span class="lesson-tag">${l.locked ? 'заблокировано' : l.done ? 'пройдено' : 'доступно'}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // Lesson click — toggle done
  document.querySelectorAll('.lesson-item:not(.lesson-item--locked)').forEach(item => {
    item.addEventListener('click', () => {
      const mId = +item.dataset.module;
      const lId = +item.dataset.lesson;
      const mod = learningModules.find(x => x.id === mId);
      const lesson = mod?.lessons.find(x => x.id === lId);
      if (lesson) {
        lesson.done = !lesson.done;
        // Unlock next lesson
        const idx = mod.lessons.indexOf(lesson);
        if (lesson.done && mod.lessons[idx+1]) mod.lessons[idx+1].locked = false;
        renderLearningProgress();
        openModule(mId);
      }
    });
  });
}

function renderChecklists() {
  const grid = document.getElementById('checklists-grid');
  if (!grid) return;
  grid.innerHTML = checklists.map(cl => {
    const done = cl.items.filter(i => i.done).length;
    return `
      <div class="checklist-card">
        <div class="checklist-header">
          <div class="checklist-title">${cl.title}</div>
          <span class="checklist-progress">${done}/${cl.items.length}</span>
        </div>
        <div class="checklist-items">
          ${cl.items.map((item, i) => `
            <div class="checklist-item ${item.done ? 'checked' : ''}" data-cl="${cl.id}" data-item="${i}">
              <div class="cl-checkbox ${item.done ? 'checked' : ''}">${item.done ? '✓' : ''}</div>
              <span class="cl-text">${item.text}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');

  grid.querySelectorAll('.checklist-item').forEach(el => {
    el.addEventListener('click', () => {
      const cl = checklists.find(c => c.id === +el.dataset.cl);
      if (cl) {
        cl.items[+el.dataset.item].done = !cl.items[+el.dataset.item].done;
        renderChecklists();
      }
    });
  });
}

function initLearning() {
  renderLearningProgress();
  renderModules();
  renderChecklists();

  // View toggle
  document.getElementById('learn-view-modules')?.addEventListener('click', function() {
    if (currentModuleId) {
      document.getElementById('learn-lesson-view').style.display = 'none';
      document.getElementById('learn-modules-view').style.display = '';
      currentModuleId = null;
    }
    document.getElementById('learn-modules-view').style.display = '';
    document.getElementById('learn-checklists-view').style.display = 'none';
    this.classList.add('active');
    document.getElementById('learn-view-checklists').classList.remove('active');
  });

  document.getElementById('learn-view-checklists')?.addEventListener('click', function() {
    document.getElementById('learn-modules-view').style.display = 'none';
    document.getElementById('learn-lesson-view').style.display = 'none';
    document.getElementById('learn-checklists-view').style.display = '';
    this.classList.add('active');
    document.getElementById('learn-view-modules').classList.remove('active');
  });

  document.getElementById('btn-back-modules')?.addEventListener('click', () => {
    document.getElementById('learn-lesson-view').style.display = 'none';
    document.getElementById('learn-modules-view').style.display = '';
    currentModuleId = null;
    renderModules();
  });
}

// ===== STRUCTURE MODULE =====
const teamTree = {
  id: 0, first_name:'Саира', last_name:'Султанова', role:'owner', is_active:true,
  leads:0, contacts:250, referral_code:'SAIRA01',
  children: [
    {
      id:1, first_name:'Айгерим', last_name:'К.', role:'partner', is_active:true,
      leads:14, contacts:38, referral_code:'AIGK01',
      children: [
        { id:4, first_name:'Нурлан',  last_name:'Б.', role:'partner', is_active:true,  leads:5, contacts:12, referral_code:'NURB01', children:[] },
        { id:5, first_name:'Зарина',  last_name:'М.', role:'partner', is_active:true,  leads:3, contacts:8,  referral_code:'ZARM01', children:[] },
        { id:6, first_name:'Серик',   last_name:'А.', role:'partner', is_active:false, leads:1, contacts:4,  referral_code:'SERA01', children:[] },
      ]
    },
    {
      id:2, first_name:'Максим', last_name:'Р.', role:'partner', is_active:true,
      leads:9, contacts:22, referral_code:'MAX02',
      children: [
        { id:7, first_name:'Ольга',   last_name:'С.', role:'partner', is_active:true,  leads:4, contacts:9,  referral_code:'OLGS01', children:[] },
        { id:8, first_name:'Дмитрий', last_name:'В.', role:'partner', is_active:true,  leads:2, contacts:6,  referral_code:'DMIV01', children:[] },
      ]
    },
    {
      id:3, first_name:'Дана', last_name:'С.', role:'partner', is_active:true,
      leads:7, contacts:18, referral_code:'DANA03',
      children: [
        { id:9,  first_name:'Камила',  last_name:'Ж.', role:'partner', is_active:true,  leads:3, contacts:7,  referral_code:'KAMJ01', children:[] },
        { id:10, first_name:'Бауыржан',last_name:'С.', role:'partner', is_active:false, leads:0, contacts:3,  referral_code:'BAUS01', children:[] },
      ]
    },
  ]
};

const teamFlat = [
  { id:1,  name:'Айгерим К.',   level:1, sponsor:'Саира С.',   code:'AIGK01', leads:14, contacts:38, activity:94, active:true  },
  { id:2,  name:'Максим Р.',    level:1, sponsor:'Саира С.',   code:'MAX02',  leads:9,  contacts:22, activity:77, active:true  },
  { id:3,  name:'Дана С.',      level:1, sponsor:'Саира С.',   code:'DANA03', leads:7,  contacts:18, activity:66, active:true  },
  { id:4,  name:'Нурлан Б.',    level:2, sponsor:'Айгерим К.', code:'NURB01', leads:5,  contacts:12, activity:45, active:true  },
  { id:5,  name:'Зарина М.',    level:2, sponsor:'Айгерим К.', code:'ZARM01', leads:3,  contacts:8,  activity:38, active:true  },
  { id:6,  name:'Серик А.',     level:2, sponsor:'Айгерим К.', code:'SERA01', leads:1,  contacts:4,  activity:12, active:false },
  { id:7,  name:'Ольга С.',     level:2, sponsor:'Максим Р.',  code:'OLGS01', leads:4,  contacts:9,  activity:55, active:true  },
  { id:8,  name:'Дмитрий В.',   level:2, sponsor:'Максим Р.',  code:'DMIV01', leads:2,  contacts:6,  activity:30, active:true  },
  { id:9,  name:'Камила Ж.',    level:2, sponsor:'Дана С.',    code:'KAMJ01', leads:3,  contacts:7,  activity:42, active:true  },
  { id:10, name:'Бауыржан С.',  level:2, sponsor:'Дана С.',    code:'BAUS01', leads:0,  contacts:3,  activity:8,  active:false },
  { id:11, name:'Тимур А.',     level:3, sponsor:'Нурлан Б.',  code:'TIMA01', leads:2,  contacts:5,  activity:28, active:true  },
  { id:12, name:'Айдана Н.',    level:3, sponsor:'Зарина М.',  code:'AIDN01', leads:1,  contacts:3,  activity:20, active:true  },
];

function openPartnerModal(node, isOwner) {
  const level = isOwner ? 0 : (teamFlat.find(p => p.code === node.referral_code)?.level || '—');
  const sponsor = isOwner ? '—' : (teamFlat.find(p => p.code === node.referral_code)?.sponsor || '—');
  const activity = teamFlat.find(p => p.code === node.referral_code)?.activity ?? '—';
  const teamSize = node.children ? flattenTree(node).length - 1 : 0;

  document.getElementById('partner-detail-name').textContent =
    `${node.first_name} ${node.last_name}`;

  document.getElementById('partner-detail-body').innerHTML = `
    <div style="display:flex;align-items:center;gap:16px;margin-bottom:24px">
      <div class="lb-avatar ${isOwner ? 'lb-avatar--you' : ''}" style="width:56px;height:56px;font-size:22px">
        ${node.first_name[0]}${node.last_name ? node.last_name[0] : ''}
      </div>
      <div>
        <div style="font-size:13px;color:var(--color-muted);margin-bottom:4px">
          ${isOwner ? '👑 Owner' : `Уровень ${level}`} · ${node.is_active ? '<span style="color:#4CAF64">● Активен</span>' : '<span style="color:var(--color-muted)">○ Неактивен</span>'}
        </div>
        <div style="font-family:var(--font-mono);font-size:13px;color:var(--color-accent)">${node.referral_code}</div>
      </div>
    </div>

    <div class="detail-grid" style="margin-bottom:20px">
      <div class="detail-field"><label>Спонсор</label><span>${sponsor}</span></div>
      <div class="detail-field"><label>Реф. код</label><span style="font-family:var(--font-mono)">${node.referral_code}</span></div>
      <div class="detail-field"><label>Лидов всего</label><span style="font-family:var(--font-display);font-size:22px;color:var(--color-accent)">${node.leads}</span></div>
      <div class="detail-field"><label>Контактов</label><span style="font-family:var(--font-display);font-size:22px;color:var(--color-accent)">${node.contacts}</span></div>
      <div class="detail-field"><label>Команда (вглубь)</label><span style="font-family:var(--font-display);font-size:22px">${teamSize}</span></div>
      <div class="detail-field">
        <label>Активность (7 дней)</label>
        <span>
          <div style="height:6px;background:rgba(168,197,188,0.08);border-radius:3px;overflow:hidden;margin-top:4px">
            <div style="height:100%;width:${activity}%;background:linear-gradient(90deg,#0B3D2E,${activity>60?'#A8C5BC':'#C97D4E'});border-radius:3px"></div>
          </div>
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--color-muted)">${activity}/100</span>
        </span>
      </div>
    </div>

    <div style="padding:14px 16px;background:rgba(168,197,188,0.04);border:1px solid var(--color-border);border-radius:8px;margin-bottom:20px">
      <div style="font-size:11px;color:var(--color-muted);font-family:var(--font-mono);margin-bottom:6px">РЕФЕРАЛЬНАЯ ССЫЛКА</div>
      <div style="font-size:13px;color:var(--color-accent);word-break:break-all">
        https://sairateam.com/?ref=${node.referral_code}
      </div>
    </div>

    <div class="detail-actions">
      <button class="btn-detail-action">💬 Написать</button>
      <button class="btn-detail-action">📊 Статистика</button>
      ${!isOwner ? `<button class="btn-detail-action btn-detail-action--ai">🤖 AI отчёт</button>` : ''}
    </div>
  `;

  document.getElementById('modal-partner-detail').classList.add('open');
}

function flattenTree(node) {
  const result = [node];
  if (node.children) node.children.forEach(c => result.push(...flattenTree(c)));
  return result;
}

function buildNodeHTML(node, isOwner = false) {
  const initials = node.first_name[0] + (node.last_name ? node.last_name[0] : '');
  return `
    <div class="tree-node-card ${isOwner ? 'owner' : ''} ${!node.is_active ? 'inactive' : ''}"
         data-partner-id="${node.id}">
      ${node.is_active ? '<div class="tree-active-dot"></div>' : ''}
      <div class="tree-node-avatar ${isOwner ? 'owner-avatar' : ''}">${initials}</div>
      <div class="tree-node-name">${node.first_name} ${node.last_name}</div>
      <div class="tree-node-meta">${isOwner ? 'owner' : node.referral_code}</div>
    </div>
  `;
}

function buildTreeHTML(node, level = 0) {
  const isOwner = node.role === 'owner';
  const hasChildren = node.children && node.children.length > 0;

  let html = `<div class="tree-node">`;
  html += buildNodeHTML(node, isOwner);

  if (hasChildren) {
    html += `<div class="tree-connector-down"></div>`;
    html += `<div class="tree-children">`;
    node.children.forEach(child => {
      html += `<div class="tree-child">`;
      html += `<div class="tree-child-line"></div>`;
      html += buildTreeHTML(child, level + 1);
      html += `</div>`;
    });
    html += `</div>`;
  }

  html += `</div>`;
  return html;
}

function findNodeById(node, id) {
  if (node.id === id) return node;
  if (node.children) {
    for (const c of node.children) {
      const found = findNodeById(c, id);
      if (found) return found;
    }
  }
  return null;
}

function renderStructTree() {
  const el = document.getElementById('org-tree');
  if (!el) return;
  el.innerHTML = `<div class="tree-root">${buildTreeHTML(teamTree)}</div>`;

  el.querySelectorAll('.tree-node-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = +card.dataset.partnerId;
      const node = findNodeById(teamTree, id);
      if (node) openPartnerModal(node, node.role === 'owner');
    });
  });
}

function renderStructTable() {
  const tbody = document.getElementById('struct-tbody');
  if (!tbody) return;
  tbody.innerHTML = teamFlat.map(p => `
    <tr>
      <td>
        <div class="contact-name-cell">
          <div class="contact-avatar" style="background:linear-gradient(135deg,#0B3D2E,${p.level===1?'#C97D4E':p.level===2?'#A8C5BC':'#6495ED'})">${p.name[0]}</div>
          <div>
            <div class="contact-fullname">${p.name}</div>
            <div class="contact-source">${p.active ? '● активен' : '○ неактивен'}</div>
          </div>
        </div>
      </td>
      <td style="font-family:var(--font-mono);font-size:12px;color:var(--color-muted)">Уровень ${p.level}</td>
      <td style="font-size:13px;color:var(--color-muted)">${p.sponsor}</td>
      <td style="font-family:var(--font-mono);font-size:11px;color:var(--color-muted)">${p.code}</td>
      <td style="font-family:var(--font-display);font-size:18px;color:var(--color-text)">${p.leads}</td>
      <td style="font-family:var(--font-display);font-size:18px;color:var(--color-text)">${p.contacts}</td>
      <td>
        <div style="display:flex;align-items:center;gap:8px">
          <div style="flex:1;height:4px;background:rgba(168,197,188,0.08);border-radius:2px;overflow:hidden">
            <div style="height:100%;width:${p.activity}%;background:linear-gradient(90deg,#0B3D2E,${p.activity>60?'#A8C5BC':'#C97D4E'});border-radius:2px"></div>
          </div>
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--color-muted)">${p.activity}</span>
        </div>
      </td>
      <td><span class="status-badge ${p.active?'status-badge--converted':'status-badge--archived'}">${p.active?'Активен':'Пауза'}</span></td>
    </tr>
  `).join('');
}

// Calculator
let calcLevels = [3, 3, 3];

function updateCalc() {
  calcLevels.forEach((v, i) => {
    const el = document.getElementById(`calc-l${i+1}`);
    if (el) el.textContent = v;
  });
  const l1 = calcLevels[0];
  const l2 = l1 * calcLevels[1];
  const l3 = l2 * calcLevels[2];
  const total = l1 + l2 + l3;
  const el = document.getElementById('calc-result');
  if (!el) return;
  el.innerHTML = `
    <div class="calc-levels">
      <div class="calc-level-row">
        <span class="calc-level-label">1-й уровень</span>
        <span class="calc-level-num">${l1}</span>
      </div>
      <div class="calc-level-row">
        <span class="calc-level-label">2-й уровень (×${calcLevels[1]})</span>
        <span class="calc-level-num">${l2}</span>
      </div>
      <div class="calc-level-row">
        <span class="calc-level-label">3-й уровень (×${calcLevels[2]})</span>
        <span class="calc-level-num">${l3}</span>
      </div>
    </div>
    <div class="calc-total-wrap">
      <div class="calc-total-num">${total}</div>
      <div class="calc-total-label">человек в структуре</div>
    </div>
  `;
}

function initStructure() {
  renderStructTree();
  renderStructTable();
  updateCalc();

  // View toggle
  document.getElementById('view-tree')?.addEventListener('click', function() {
    document.getElementById('struct-tree-view').style.display = '';
    document.getElementById('struct-table-view').style.display = 'none';
    this.classList.add('active');
    document.getElementById('view-table').classList.remove('active');
  });

  document.getElementById('view-table')?.addEventListener('click', function() {
    document.getElementById('struct-tree-view').style.display = 'none';
    document.getElementById('struct-table-view').style.display = '';
    this.classList.add('active');
    document.getElementById('view-tree').classList.remove('active');
  });

  // Partner modal close
  document.getElementById('modal-close-partner')?.addEventListener('click', () => {
    document.getElementById('modal-partner-detail').classList.remove('open');
  });
  document.getElementById('modal-partner-detail')?.addEventListener('click', e => {
    if (e.target === document.getElementById('modal-partner-detail'))
      document.getElementById('modal-partner-detail').classList.remove('open');
  });

  // Calculator buttons
  document.querySelectorAll('.calc-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const level = +btn.dataset.level - 1;
      const dir   = +btn.dataset.dir;
      calcLevels[level] = Math.max(1, Math.min(10, calcLevels[level] + dir));
      updateCalc();
    });
  });
}

// ===== HISTORY MODULE =====
const EVENT_ICONS = {
  lead:    { new:'🆕', status_changed:'🔄', handed_to_ai:'🤖', converted:'✅', rejected:'❌' },
  contact: { created:'👤', updated:'✏️', ai_enabled:'🤖', ai_disabled:'⏹' },
  task:    { created:'📋', completed:'✅', created_by_ai:'🤖' },
  ai_job:  { started:'▶️', completed:'✅', failed:'❌', message_sent:'💬', qualified:'🔍' },
  system:  { login:'🔑', logout:'🚪', settings_changed:'⚙️' },
};

// Лог событий — заменяется реальными из Supabase через db.js
var eventsLog = [
  { id:1,  entity_type:'lead',    action:'new',             performed_by:'system',  entity_name:'Арман Касенов',      description:'Новый лид с лендинга',                                   created_at:'2026-04-05T11:42:00' },
  { id:2,  entity_type:'ai_job',  action:'qualified',       performed_by:'ai',      entity_name:'Арман Касенов',      description:'AI квалифицировал лида — статус: горячий',               created_at:'2026-04-05T11:43:30' },
  { id:3,  entity_type:'task',    action:'created_by_ai',   performed_by:'ai',      entity_name:'',                   description:'AI создал задачу: связаться с Арманом Касеновым сегодня',created_at:'2026-04-05T11:44:00' },
  { id:4,  entity_type:'ai_job',  action:'message_sent',    performed_by:'ai',      entity_name:'Гульнара Маратова',  description:'AI отправил приветственное сообщение',                   created_at:'2026-04-05T10:15:00' },
  { id:5,  entity_type:'lead',    action:'converted',       performed_by:'partner', entity_name:'Асель Нурова',       description:'Лид конвертирован в контакт',                            created_at:'2026-04-05T09:30:00' },
  { id:6,  entity_type:'contact', action:'created',         performed_by:'partner', entity_name:'Асель Нурова',       description:'Создан новый контакт из лида',                           created_at:'2026-04-05T09:30:10' },
  { id:7,  entity_type:'task',    action:'created',         performed_by:'ai',      entity_name:'Дмитрий Романов',    description:'AI создал задачу: позвонить до 18:00',                   created_at:'2026-04-05T09:00:00' },
  { id:8,  entity_type:'system',  action:'login',           performed_by:'partner', entity_name:'',                   description:'Вход в систему',                                         created_at:'2026-04-05T08:55:00' },
  { id:9,  entity_type:'lead',    action:'new',             performed_by:'system',  entity_name:'Зарина Бекова',      description:'Новый лид с лендинга',                                   created_at:'2026-04-04T22:18:00' },
  { id:10, entity_type:'ai_job',  action:'started',         performed_by:'ai',      entity_name:'',                   description:'AI запустил ежедневную квалификацию лидов',              created_at:'2026-04-04T21:00:00' },
  { id:11, entity_type:'ai_job',  action:'completed',       performed_by:'ai',      entity_name:'',                   description:'AI квалифицировал 3 лидов, расставил приоритеты',        created_at:'2026-04-04T21:02:15' },
  { id:12, entity_type:'contact', action:'ai_enabled',      performed_by:'partner', entity_name:'Нурлан Байжанов',    description:'Контакт передан AI агенту',                              created_at:'2026-04-04T18:30:00' },
  { id:13, entity_type:'task',    action:'completed',       performed_by:'partner', entity_name:'Айгерим Касымова',   description:'Задача выполнена: звонок Айгерим',                       created_at:'2026-04-04T17:10:00' },
  { id:14, entity_type:'ai_job',  action:'message_sent',    performed_by:'ai',      entity_name:'Айдана Нурланова',   description:'AI отправил follow-up (день 3)',                         created_at:'2026-04-04T15:00:00' },
  { id:15, entity_type:'lead',    action:'status_changed',  performed_by:'partner', entity_name:'Гульнара Маратова',  description:'Статус изменён: новый → в работе',                       created_at:'2026-04-04T14:20:00' },
  { id:16, entity_type:'contact', action:'created',         performed_by:'partner', entity_name:'Тимур Ахметов',      description:'Контакт добавлен вручную',                               created_at:'2026-04-04T11:00:00' },
  { id:17, entity_type:'system',  action:'settings_changed',performed_by:'partner', entity_name:'',                   description:'Обновлены настройки AI агента',                          created_at:'2026-04-04T10:05:00' },
  { id:18, entity_type:'lead',    action:'new',             performed_by:'system',  entity_name:'Дмитрий Волков',     description:'Новый лид с лендинга',                                   created_at:'2026-04-03T18:30:00' },
  { id:19, entity_type:'lead',    action:'handed_to_ai',    performed_by:'partner', entity_name:'Айдана Нурланова',   description:'Лид передан AI агенту',                                  created_at:'2026-04-03T09:15:00' },
  { id:20, entity_type:'contact', action:'updated',         performed_by:'partner', entity_name:'Максим Романов',     description:'Обновлена заметка контакта',                             created_at:'2026-04-03T08:40:00' },
  { id:21, entity_type:'lead',    action:'converted',       performed_by:'partner', entity_name:'Иван Петров',        description:'Лид конвертирован в контакт',                            created_at:'2026-04-01T16:45:00' },
  { id:22, entity_type:'ai_job',  action:'message_sent',    performed_by:'ai',      entity_name:'Бауыржан Сейткали',  description:'AI отправил приветственное сообщение',                   created_at:'2026-04-02T09:00:00' },
];

let historyTypeFilter = 'all';
let historyByFilter   = 'all';
let historySearch     = '';

function getEventIcon(e) {
  return EVENT_ICONS[e.entity_type]?.[e.action] || '📌';
}

function filterEvents() {
  return eventsLog.filter(e => {
    const matchType = historyTypeFilter === 'all' || e.entity_type === historyTypeFilter;
    const matchBy   = historyByFilter   === 'all' || e.performed_by === historyByFilter;
    const q = historySearch.toLowerCase();
    const matchSearch = !q || e.description.toLowerCase().includes(q) ||
      (e.entity_name || '').toLowerCase().includes(q);
    return matchType && matchBy && matchSearch;
  });
}

function groupByDay(events) {
  const groups = {};
  events.forEach(e => {
    const day = e.created_at.slice(0, 10);
    if (!groups[day]) groups[day] = [];
    groups[day].push(e);
  });
  return groups;
}

function formatDayHeader(dateStr) {
  const d = new Date(dateStr + 'T12:00:00');
  const t = new Date(); t.setHours(0,0,0,0);
  const diff = Math.round((t - new Date(dateStr + 'T00:00:00')) / 86400000);
  if (diff === 0) return 'Сегодня';
  if (diff === 1) return 'Вчера';
  return d.toLocaleDateString('ru-RU', { weekday:'long', day:'numeric', month:'long' });
}

function renderHistory() {
  const filtered = filterEvents();
  const timeline = document.getElementById('history-timeline');
  if (!timeline) return;

  if (filtered.length === 0) {
    timeline.innerHTML = '<div class="history-empty">Событий не найдено</div>';
    renderHistoryStats(filtered);
    return;
  }

  const groups = groupByDay(filtered);
  const days = Object.keys(groups).sort((a,b) => b.localeCompare(a));

  timeline.innerHTML = days.map(day => `
    <div class="timeline-day">
      <div class="timeline-day-header">
        <span>${formatDayHeader(day)}</span>
        <span class="timeline-day-count">${groups[day].length} событий</span>
      </div>
      <div class="timeline-events">
        ${groups[day].map(e => `
          <div class="hlog-item hlog-item--${e.entity_type}">
            <div class="hlog-icon">${getEventIcon(e)}</div>
            <div class="hlog-body">
              <div class="hlog-text">
                ${e.description}
                ${e.entity_name ? ` — <strong>${e.entity_name}</strong>` : ''}
              </div>
              <div class="hlog-meta">
                <span class="hlog-time">${new Date(e.created_at).toLocaleTimeString('ru-RU', {hour:'2-digit',minute:'2-digit'})}</span>
                <span class="hlog-who hlog-who--${e.performed_by}">${
                  e.performed_by === 'partner' ? '👤 Партнёр' :
                  e.performed_by === 'ai'      ? '🤖 AI' : '⚙️ Система'
                }</span>
                <span class="hlog-entity">${e.entity_type}</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');

  renderHistoryStats(filtered);
}

function renderHistoryStats(filtered) {
  const el = document.getElementById('history-stats');
  if (!el) return;
  const byType = {};
  filtered.forEach(e => { byType[e.entity_type] = (byType[e.entity_type] || 0) + 1; });
  const labels = { lead:'Лидов', contact:'Контактов', task:'Задач', ai_job:'AI действий', system:'Системных' };
  el.innerHTML = `
    <div class="hstat"><span class="hstat-num">${filtered.length}</span><span class="hstat-label">всего событий</span></div>
    ${Object.entries(byType).map(([type, cnt]) => `
      <div class="hstat"><span class="hstat-num">${cnt}</span><span class="hstat-label">${labels[type] || type}</span></div>
    `).join('')}
  `;
}

function initHistory() {
  renderHistory();

  document.querySelectorAll('[data-htype]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-htype]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      historyTypeFilter = btn.dataset.htype;
      renderHistory();
    });
  });

  document.querySelectorAll('[data-hby]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-hby]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      historyByFilter = btn.dataset.hby;
      renderHistory();
    });
  });

  document.getElementById('history-search')?.addEventListener('input', e => {
    historySearch = e.target.value;
    renderHistory();
  });

  document.getElementById('btn-export-log')?.addEventListener('click', () => {
    const filtered = filterEvents();
    const rows = [
      ['Дата','Время','Тип','Действие','Описание','Объект','Кто'],
      ...filtered.map(e => [
        e.created_at.slice(0,10),
        new Date(e.created_at).toLocaleTimeString('ru-RU',{hour:'2-digit',minute:'2-digit'}),
        e.entity_type, e.action, e.description, e.entity_name, e.performed_by
      ])
    ];
    const csv = rows.map(r => r.map(v => `"${v}"`).join(',')).join('\n');
    const blob = new Blob(['\ufeff' + csv], { type:'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `events_log_${todayStr}.csv`;
    a.click(); URL.revokeObjectURL(url);
  });
}

// ===== TASKS MODULE =====
const today = new Date();
const todayStr = today.toISOString().slice(0, 10);

let tasks = [
  { id:1,  title:'Позвонить Арману Касенову',         due_date:'2026-04-05', due_time:'14:00', priority:'high',   related_to:'Арман Касенов',     notes:'Интересуется InCruises. Обсудить детали партнёрства.', source:'partner', done:false },
  { id:2,  title:'Отправить презентацию Гульнаре',     due_date:'2026-04-05', due_time:'16:00', priority:'normal', related_to:'Гульнара Маратова',  notes:'Запросила PDF с условиями.',                          source:'partner', done:false },
  { id:3,  title:'Follow-up Дмитрий Волков (3-й день)',due_date:'2026-04-05', due_time:'18:00', priority:'normal', related_to:'Дмитрий Волков',     notes:'3-й день без ответа. Попробовать другой канал.',      source:'ai',      done:false },
  { id:4,  title:'Провести онлайн-встречу с Даной',    due_date:'2026-04-05', due_time:'20:00', priority:'high',   related_to:'Дана Сейткали',      notes:'Zoom 20:00 по Астане.',                               source:'partner', done:false },
  { id:5,  title:'Квалифицировать новых лидов',        due_date:'2026-04-05', due_time:'',      priority:'normal', related_to:'',                   notes:'3 новых лида с лендинга сегодня.',                    source:'ai',      done:false },
  { id:6,  title:'Обновить шаблон приветствия',        due_date:'2026-04-06', due_time:'',      priority:'low',    related_to:'',                   notes:'Добавить казахский язык.',                            source:'partner', done:false },
  { id:7,  title:'Связаться с Нурланом Байжановым',    due_date:'2026-04-06', due_time:'11:00', priority:'normal', related_to:'Нурлан Байжанов',    notes:'Не выходил на связь 2 дня.',                          source:'ai',      done:false },
  { id:8,  title:'Проверить аналитику недели',         due_date:'2026-04-04', due_time:'',      priority:'low',    related_to:'',                   notes:'',                                                    source:'partner', done:false },
  { id:9,  title:'Позвонить Айгерим Касымовой',        due_date:'2026-04-05', due_time:'12:00', priority:'high',   related_to:'Айгерим Касымова',   notes:'Готова к разговору. Не пропустить.',                  source:'partner', done:true  },
  { id:10, title:'Отправить welcome-сообщение Асель',  due_date:'2026-04-05', due_time:'09:00', priority:'normal', related_to:'Асель Нурова',       notes:'Конвертирована вчера.',                               source:'ai',      done:true  },
];

let activeTaskFilter = 'all';

function isOverdue(t) {
  if (t.done) return false;
  if (!t.due_date) return false;
  const due = new Date(t.due_date + (t.due_time ? 'T' + t.due_time : 'T23:59'));
  return due < new Date();
}

function isToday(t) {
  return t.due_date === todayStr;
}

function getFilteredTasks(filter) {
  switch (filter) {
    case 'today':   return tasks.filter(t => isToday(t) && !t.done);
    case 'overdue': return tasks.filter(t => isOverdue(t));
    case 'ai':      return tasks.filter(t => t.source === 'ai' && !t.done);
    case 'done':    return tasks.filter(t => t.done);
    default:        return tasks;
  }
}

function formatTaskTime(t) {
  if (!t.due_date) return '';
  const due = new Date(t.due_date + (t.due_time ? 'T' + t.due_time : 'T12:00'));
  const over = isOverdue(t);
  const tod  = isToday(t);
  const cls  = over ? 'task-time--overdue' : tod ? 'task-time--today' : '';
  const prefix = over ? '🔴 ' : tod ? '📅 ' : '';
  const label = tod
    ? (t.due_time || 'сегодня')
    : due.toLocaleDateString('ru-RU', { day:'2-digit', month:'2-digit' }) + (t.due_time ? ' ' + t.due_time : '');
  return `<span class="task-time ${cls}">${prefix}${label}</span>`;
}

function buildTaskCard(t) {
  const overdue = isOverdue(t);
  const cls = [
    'task-card',
    overdue ? 'task-card--overdue' : '',
    t.source === 'ai' ? 'task-card--ai' : '',
    t.done ? 'task-card--done' : '',
  ].filter(Boolean).join(' ');

  return `
    <div class="${cls}" data-task-id="${t.id}">
      <div class="task-header">
        <div class="task-checkbox ${t.done ? 'checked' : ''}" data-check="${t.id}"></div>
        <div class="task-title">${t.title}</div>
      </div>
      <div class="task-meta">
        ${formatTaskTime(t)}
        ${t.related_to ? `<span class="task-related">👤 ${t.related_to}</span>` : ''}
        ${t.priority === 'high' ? `<span class="task-priority--high">↑ Высокий</span>` : ''}
        ${t.source === 'ai' ? `<span class="task-source-ai">🤖 AI</span>` : ''}
      </div>
      ${t.notes ? `<div class="task-notes">${t.notes}</div>` : ''}
    </div>
  `;
}

function renderTasks() {
  const filtered = getFilteredTasks(activeTaskFilter);
  const pending  = filtered.filter(t => !t.done);
  const done     = filtered.filter(t => t.done);

  const pendingEl = document.getElementById('tasks-pending');
  const doneEl    = document.getElementById('tasks-done');
  if (!pendingEl || !doneEl) return;

  pendingEl.innerHTML = pending.length
    ? pending.map(buildTaskCard).join('')
    : '<div class="tasks-empty">Нет задач</div>';

  doneEl.innerHTML = done.length
    ? done.map(buildTaskCard).join('')
    : '<div class="tasks-empty">Пусто</div>';

  document.getElementById('tasks-pending-count').textContent = pending.length;
  document.getElementById('tasks-done-count').textContent    = done.length;

  // Checkbox toggle
  document.querySelectorAll('[data-check]').forEach(el => {
    el.addEventListener('click', e => {
      e.stopPropagation();
      const t = tasks.find(x => x.id === +el.dataset.check);
      if (t) { t.done = !t.done; updateTaskCounters(); renderTasks(); }
    });
  });
}

function updateTaskCounters() {
  document.getElementById('tcnt-all').textContent     = tasks.length;
  document.getElementById('tcnt-today').textContent   = tasks.filter(t => isToday(t) && !t.done).length;
  document.getElementById('tcnt-overdue').textContent = tasks.filter(t => isOverdue(t)).length;
  document.getElementById('tcnt-ai').textContent      = tasks.filter(t => t.source === 'ai' && !t.done).length;
  document.getElementById('tcnt-done').textContent    = tasks.filter(t => t.done).length;
}

function initTasks() {
  // Set default date in form
  const dateInput = document.getElementById('task-due-date');
  if (dateInput) dateInput.value = todayStr;

  updateTaskCounters();
  renderTasks();

  document.querySelectorAll('[data-task-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-task-filter]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeTaskFilter = btn.dataset.taskFilter;
      renderTasks();
    });
  });

  document.getElementById('btn-add-task')?.addEventListener('click', () => {
    document.getElementById('modal-add-task').classList.add('open');
  });

  ['modal-close-task', 'task-cancel'].forEach(id => {
    document.getElementById(id)?.addEventListener('click', () => {
      document.getElementById('modal-add-task').classList.remove('open');
    });
  });

  document.getElementById('modal-add-task')?.addEventListener('click', e => {
    if (e.target === document.getElementById('modal-add-task'))
      document.getElementById('modal-add-task').classList.remove('open');
  });

  document.getElementById('form-add-task')?.addEventListener('submit', e => {
    e.preventDefault();
    const fd = new FormData(e.target);
    tasks.unshift({
      id:         Date.now(),
      title:      fd.get('title').trim(),
      due_date:   fd.get('due_date'),
      due_time:   fd.get('due_time'),
      priority:   fd.get('priority'),
      related_to: fd.get('related_to').trim(),
      notes:      fd.get('notes').trim(),
      source:     'partner',
      done:       false,
    });
    updateTaskCounters();
    renderTasks();
    document.getElementById('modal-add-task').classList.remove('open');
    e.target.reset();
    document.getElementById('task-due-date').value = todayStr;
  });

  // Update tasks-date label
  const el = document.getElementById('tasks-date');
  if (el) el.textContent = today.toLocaleDateString('ru-RU', { weekday:'long', day:'numeric', month:'long' });
}

// ===== LEADS MODULE =====
const LEAD_STATUS_LABELS = {
  new:           '🆕 Новый',
  in_work:       '⚡ В работе',
  handed_to_ai:  '🤖 У AI',
  converted:     '✅ Конвертирован',
  rejected:      '❌ Отклонён',
  archived:      '📦 Архив',
};

const LEAD_STATUS_FLOW = ['new', 'in_work', 'handed_to_ai', 'converted'];

// Данные лидов — заменяются реальными из Supabase через db.js
var leads = [
  { id:1,  first_name:'Арман',    last_name:'Касенов',     phone:'+7 701 123 45 67', email:'arman@mail.ru',   country:'Казахстан', city:'Алматы',    messenger:'whatsapp', messenger_handle:'+77011234567', referral_code:'SAIRA01', status:'new',          created_at:'2026-04-05T11:42:00' },
  { id:2,  first_name:'Зарина',   last_name:'Бекова',      phone:'+7 708 234 56 78', email:'',                country:'Казахстан', city:'Актобе',    messenger:'telegram', messenger_handle:'@zarina_b',    referral_code:'SAIRA01', status:'new',          created_at:'2026-04-04T22:18:00' },
  { id:3,  first_name:'Гульнара', last_name:'Маратова',    phone:'+7 706 345 67 89', email:'gulnara@list.ru', country:'Казахстан', city:'Алматы',    messenger:'whatsapp', messenger_handle:'+77063456789', referral_code:'SAIRA01', status:'in_work',      created_at:'2026-04-04T10:05:00' },
  { id:4,  first_name:'Дмитрий',  last_name:'Волков',      phone:'+7 999 456 78 90', email:'dima@gmail.com',  country:'Россия',    city:'Москва',    messenger:'telegram', messenger_handle:'@dmitry_v',    referral_code:'',        status:'in_work',      created_at:'2026-04-03T18:30:00' },
  { id:5,  first_name:'Айдана',   last_name:'Нурланова',   phone:'+7 702 567 89 01', email:'',                country:'Казахстан', city:'Астана',    messenger:'instagram',messenger_handle:'@aidana_n',    referral_code:'SAIRA01', status:'handed_to_ai', created_at:'2026-04-03T09:15:00' },
  { id:6,  first_name:'Ольга',    last_name:'Смирнова',    phone:'+375 29 678 90 12',email:'olga@mail.ru',    country:'Беларусь',  city:'Минск',     messenger:'viber',    messenger_handle:'+375296789012',referral_code:'MAX02',   status:'handed_to_ai', created_at:'2026-04-02T14:20:00' },
  { id:7,  first_name:'Бауыржан', last_name:'Сейткали',    phone:'+7 705 789 01 23', email:'',                country:'Казахстан', city:'Шымкент',   messenger:'whatsapp', messenger_handle:'+77057890123', referral_code:'SAIRA01', status:'handed_to_ai', created_at:'2026-04-02T08:00:00' },
  { id:8,  first_name:'Асель',    last_name:'Нурова',      phone:'+7 702 890 12 34', email:'asel@mail.ru',    country:'Казахстан', city:'Астана',    messenger:'whatsapp', messenger_handle:'+77028901234', referral_code:'SAIRA01', status:'converted',    created_at:'2026-04-01T16:45:00' },
  { id:9,  first_name:'Иван',     last_name:'Петров',      phone:'+7 911 901 23 45', email:'ivan@yandex.ru',  country:'Россия',    city:'СПб',       messenger:'telegram', messenger_handle:'@ivan_p',      referral_code:'',        status:'converted',    created_at:'2026-03-31T11:00:00' },
  { id:10, first_name:'Камила',   last_name:'Жумабаева',   phone:'+7 707 012 34 56', email:'',                country:'Казахстан', city:'Алматы',    messenger:'instagram',messenger_handle:'@kamila_zh',   referral_code:'DANA03',  status:'converted',    created_at:'2026-03-30T09:30:00' },
  { id:11, first_name:'Сергей',   last_name:'Романов',     phone:'+7 916 123 45 67', email:'sergey@gmail.com',country:'Россия',    city:'Казань',    messenger:'telegram', messenger_handle:'@sergey_r',    referral_code:'MAX02',   status:'rejected',     created_at:'2026-03-29T15:10:00' },
  { id:12, first_name:'Марина',   last_name:'Ковалёва',    phone:'+380 67 234 56 78',email:'marina@ukr.net',  country:'Украина',   city:'Киев',      messenger:'viber',    messenger_handle:'+380672345678',referral_code:'',        status:'rejected',     created_at:'2026-03-28T12:00:00' },
];

let activeLeadFilter = 'all';
let leadSearchQuery  = '';

function getLeadStatusBadge(status) {
  const cls = `status-badge status-badge--${status}`;
  return `<span class="${cls}">${LEAD_STATUS_LABELS[status] || status}</span>`;
}

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('ru-RU', { day:'2-digit', month:'2-digit' }) +
    ' ' + d.toLocaleTimeString('ru-RU', { hour:'2-digit', minute:'2-digit' });
}

function renderLeads() {
  const tbody = document.getElementById('leads-tbody');
  if (!tbody) return;

  const filtered = leads.filter(l => {
    const matchFilter = activeLeadFilter === 'all' || l.status === activeLeadFilter;
    const q = leadSearchQuery.toLowerCase();
    const matchSearch = !q || (
      (l.first_name + ' ' + l.last_name).toLowerCase().includes(q) ||
      l.phone.includes(q) ||
      l.country.toLowerCase().includes(q) ||
      l.city.toLowerCase().includes(q)
    );
    return matchFilter && matchSearch;
  });

  document.getElementById('leads-shown').textContent = filtered.length;

  tbody.innerHTML = filtered.map(l => `
    <tr data-lead-id="${l.id}" style="cursor:pointer">
      <td>
        <div class="contact-name-cell">
          <div class="contact-avatar" style="background:linear-gradient(135deg,#0B3D2E,#6495ED)">${l.first_name[0]}</div>
          <div>
            <div class="contact-fullname">${l.first_name} ${l.last_name}</div>
            <div class="contact-source">${l.email || '—'}</div>
          </div>
        </div>
      </td>
      <td style="color:var(--color-muted);font-size:12px;font-family:var(--font-mono)">${l.phone}</td>
      <td>
        <div class="messenger-badge">
          ${MESSENGER_ICONS[l.messenger] || '—'}
          <span style="font-size:11px">${l.messenger_handle || '—'}</span>
        </div>
      </td>
      <td style="font-size:13px;color:var(--color-muted)">${l.country}<br><span style="font-size:11px">${l.city}</span></td>
      <td>${getLeadStatusBadge(l.status)}</td>
      <td style="font-family:var(--font-mono);font-size:11px;color:var(--color-muted)">${l.referral_code || '—'}</td>
      <td style="font-family:var(--font-mono);font-size:11px;color:var(--color-muted)">${formatDate(l.created_at)}</td>
      <td>
        <button class="btn-row-action" data-lead-id="${l.id}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
          </svg>
        </button>
      </td>
    </tr>
  `).join('');

  tbody.querySelectorAll('tr[data-lead-id]').forEach(row => {
    row.addEventListener('click', e => {
      if (e.target.closest('.btn-row-action')) return;
      openLeadDetail(+row.dataset.leadId);
    });
  });
  tbody.querySelectorAll('.btn-row-action[data-lead-id]').forEach(btn => {
    btn.addEventListener('click', () => openLeadDetail(+btn.dataset.leadId));
  });
}

function updateLeadCounters() {
  const statuses = ['new','in_work','handed_to_ai','converted','rejected'];
  document.getElementById('lcnt-all').textContent = leads.length;
  statuses.forEach(s => {
    const el = document.getElementById(`lcnt-${s}`);
    if (el) el.textContent = leads.filter(l => l.status === s).length;
  });
}

function openLeadDetail(id) {
  const l = leads.find(x => x.id === id);
  if (!l) return;

  document.getElementById('lead-detail-name').textContent = `${l.first_name} ${l.last_name}`;

  const flowHTML = LEAD_STATUS_FLOW.map(s => `
    <span class="flow-step ${l.status === s ? 'current' : ''}">${LEAD_STATUS_LABELS[s]}</span>
    ${s !== 'converted' ? '<span class="flow-arrow">→</span>' : ''}
  `).join('');

  // Кнопки действий в зависимости от статуса
  let actionsHTML = '';
  if (l.status === 'new') {
    actionsHTML = `
      <button class="btn-lead-action" onclick="setLeadStatus(${l.id},'in_work')">⚡ Взять в работу</button>
      <button class="btn-lead-action btn-lead-action--ai" onclick="setLeadStatus(${l.id},'handed_to_ai')">🤖 Передать AI</button>
      <button class="btn-lead-action btn-lead-action--reject" onclick="setLeadStatus(${l.id},'rejected')">❌ Отклонить</button>
    `;
  } else if (l.status === 'in_work') {
    actionsHTML = `
      <button class="btn-lead-action btn-lead-action--ai" onclick="setLeadStatus(${l.id},'handed_to_ai')">🤖 Передать AI</button>
      <button class="btn-lead-action btn-lead-action--convert" onclick="convertLead(${l.id})">✅ Конвертировать в контакт</button>
      <button class="btn-lead-action btn-lead-action--reject" onclick="setLeadStatus(${l.id},'rejected')">❌ Отклонить</button>
    `;
  } else if (l.status === 'handed_to_ai') {
    actionsHTML = `
      <button class="btn-lead-action btn-lead-action--convert" onclick="convertLead(${l.id})">✅ Конвертировать в контакт</button>
      <button class="btn-lead-action btn-lead-action--reject" onclick="setLeadStatus(${l.id},'rejected')">❌ Отклонить</button>
    `;
  } else if (l.status === 'converted') {
    actionsHTML = `<span style="font-size:13px;color:#4CAF64">✅ Лид конвертирован в контакт</span>`;
  } else if (l.status === 'rejected') {
    actionsHTML = `
      <button class="btn-lead-action" onclick="setLeadStatus(${l.id},'archived')">📦 В архив</button>
      <button class="btn-lead-action" onclick="setLeadStatus(${l.id},'in_work')">↩ Вернуть в работу</button>
    `;
  }

  document.getElementById('lead-detail-body').innerHTML = `
    <div class="lead-status-flow">${flowHTML}</div>
    <div class="detail-grid">
      <div class="detail-field"><label>Телефон</label><span>${l.phone}</span></div>
      <div class="detail-field"><label>Email</label><span>${l.email || '—'}</span></div>
      <div class="detail-field"><label>Мессенджер</label><span>${MESSENGER_ICONS[l.messenger] || ''} ${l.messenger_handle || '—'}</span></div>
      <div class="detail-field"><label>Страна / Город</label><span>${l.country}, ${l.city}</span></div>
      <div class="detail-field"><label>Реф. код</label><span style="font-family:var(--font-mono)">${l.referral_code || '—'}</span></div>
      <div class="detail-field"><label>Дата заявки</label><span style="font-family:var(--font-mono)">${formatDate(l.created_at)}</span></div>
    </div>
    <div class="lead-actions" id="lead-actions-${l.id}">${actionsHTML}</div>
  `;

  document.getElementById('modal-lead-detail').classList.add('open');
}

window.setLeadStatus = function(id, status) {
  const l = leads.find(x => x.id === id);
  if (l) {
    l.status = status;
    updateLeadCounters();
    renderLeads();
    openLeadDetail(id);
  }
};

window.convertLead = function(id) {
  const l = leads.find(x => x.id === id);
  if (!l) return;
  l.status = 'converted';
  // Добавляем в контакты
  contacts.unshift({
    id: Date.now(),
    first_name: l.first_name,
    last_name:  l.last_name,
    phone:      l.phone,
    email:      l.email,
    messenger:  l.messenger,
    messenger_handle: l.messenger_handle,
    city:       l.city,
    country:    l.country,
    status:     'warm',
    selected_for_ai: false,
    notes:      'Конвертирован из лида',
    source:     'converted_lead',
    lead_id:    l.id,
  });
  updateLeadCounters();
  updateCounters();
  renderLeads();
  openLeadDetail(id);
};

function initLeads() {
  updateLeadCounters();
  renderLeads();

  document.querySelectorAll('[data-lead-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-lead-filter]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeLeadFilter = btn.dataset.leadFilter;
      renderLeads();
    });
  });

  document.getElementById('lead-search')?.addEventListener('input', e => {
    leadSearchQuery = e.target.value;
    renderLeads();
  });

  document.getElementById('modal-close-lead')?.addEventListener('click', () => {
    document.getElementById('modal-lead-detail').classList.remove('open');
  });

  document.getElementById('modal-lead-detail')?.addEventListener('click', e => {
    if (e.target === document.getElementById('modal-lead-detail'))
      document.getElementById('modal-lead-detail').classList.remove('open');
  });
}

// ===== CONTACTS MODULE =====
const MESSENGER_ICONS = {
  whatsapp: '💬', telegram: '✈️', instagram: '📷',
  viber: '📞', email: '📧', other: '💬', '': '—'
};

const STATUS_LABELS = {
  hot: '🔥 Горячий', warm: '🌡 Тёплый',
  cold: '❄ Холодный', archived: '📦 Архив'
};

const SOURCE_LABELS = {
  manual: 'вручную', import_csv: 'CSV',
  import_vcf: 'VCF', import_sheets: 'Sheets',
  converted_lead: 'из лида'
};

// Mock contacts
let contacts = [
  { id:1,  first_name:'Айгерим',  last_name:'Касымова',   phone:'+7 701 111 22 33', email:'aigerim@mail.ru',   messenger:'whatsapp', messenger_handle:'+77011112233', city:'Алматы',    country:'Казахстан', status:'hot',      selected_for_ai:true,  notes:'Знакомы 5 лет. Интересуется путешествиями. Готова к разговору.', source:'manual' },
  { id:2,  first_name:'Максим',   last_name:'Романов',    phone:'+7 916 222 33 44', email:'',                  messenger:'telegram', messenger_handle:'@maxromanov',   city:'Москва',     country:'Россия',    status:'warm',     selected_for_ai:true,  notes:'Коллега по старой работе. Хочет дополнительный доход.',          source:'import_csv' },
  { id:3,  first_name:'Дана',     last_name:'Сейткали',   phone:'+7 702 333 44 55', email:'dana@gmail.com',    messenger:'instagram',messenger_handle:'@dana_s',       city:'Астана',     country:'Казахстан', status:'hot',      selected_for_ai:false, notes:'Подруга. Сама спросила про InCruises.',                          source:'manual' },
  { id:4,  first_name:'Нурлан',   last_name:'Байжанов',   phone:'+7 705 444 55 66', email:'',                  messenger:'whatsapp', messenger_handle:'+77054445566', city:'Шымкент',   country:'Казахстан', status:'warm',     selected_for_ai:true,  notes:'Предприниматель. Ищет пассивный доход.',                         source:'manual' },
  { id:5,  first_name:'Елена',    last_name:'Ковалёва',   phone:'+375 29 555 66 77',email:'elena@yandex.ru',   messenger:'viber',    messenger_handle:'+375295556677',city:'Минск',     country:'Беларусь',  status:'cold',     selected_for_ai:false, notes:'Познакомились на конференции. Пока не готова.',                  source:'import_vcf' },
  { id:6,  first_name:'Тимур',    last_name:'Ахметов',    phone:'+7 707 666 77 88', email:'timur@mail.ru',     messenger:'telegram', messenger_handle:'@timur_a',      city:'Алматы',    country:'Казахстан', status:'hot',      selected_for_ai:true,  notes:'Активно интересуется. Просил перезвонить в пятницу.',            source:'converted_lead' },
  { id:7,  first_name:'Зарина',   last_name:'Бекова',     phone:'+7 708 777 88 99', email:'',                  messenger:'whatsapp', messenger_handle:'+77087778899', city:'Актобе',    country:'Казахстан', status:'warm',     selected_for_ai:false, notes:'Мама двоих детей. Ищет работу из дома.',                        source:'manual' },
  { id:8,  first_name:'Дмитрий',  last_name:'Романов',    phone:'+7 999 888 77 66', email:'dima@gmail.com',    messenger:'telegram', messenger_handle:'@dima_r',       city:'Казань',    country:'Россия',    status:'warm',     selected_for_ai:true,  notes:'Друг мужа. Скептически настроен, но слушает.',                  source:'manual' },
  { id:9,  first_name:'Гульнара', last_name:'Маратова',   phone:'+7 706 999 00 11', email:'',                  messenger:'whatsapp', messenger_handle:'+77069990011', city:'Алматы',    country:'Казахстан', status:'hot',      selected_for_ai:true,  notes:'Уже смотрела презентацию. Думает.',                             source:'manual' },
  { id:10, first_name:'Арман',    last_name:'Касенов',    phone:'+7 701 000 11 22', email:'arman@mail.ru',     messenger:'instagram',messenger_handle:'@arman_k',      city:'Алматы',    country:'Казахстан', status:'warm',     selected_for_ai:false, notes:'Молодой. Интересует сам продукт круизов.',                       source:'import_sheets' },
  { id:11, first_name:'Асель',    last_name:'Нурова',     phone:'+7 702 111 22 33', email:'asel@mail.ru',      messenger:'whatsapp', messenger_handle:'+77021112233', city:'Нур-Султан',country:'Казахстан', status:'warm',     selected_for_ai:false, notes:'Конвертирована из лида. Рассматривает партнёрство.',             source:'converted_lead' },
  { id:12, first_name:'Иван',     last_name:'Петров',     phone:'+7 911 222 33 44', email:'ivan@yandex.ru',    messenger:'telegram', messenger_handle:'@ivan_p',       city:'Санкт-Петербург', country:'Россия', status:'cold', selected_for_ai:false, notes:'Пока не интересует. Связаться через 3 месяца.',                 source:'import_csv' },
  { id:13, first_name:'Айнур',    last_name:'Джаксыбекова',phone:'+7 705 333 44 55',email:'',                  messenger:'whatsapp', messenger_handle:'+77053334455', city:'Тараз',     country:'Казахстан', status:'cold',     selected_for_ai:false, notes:'Осторожная. Много вопросов. Пусть подумает.',                    source:'manual' },
  { id:14, first_name:'Сергей',   last_name:'Волков',     phone:'+7 916 444 55 66', email:'sergey@gmail.com',  messenger:'telegram', messenger_handle:'@sergey_v',     city:'Москва',    country:'Россия',    status:'cold',     selected_for_ai:false, notes:'Отказался. Возможно позже.',                                     source:'import_vcf' },
  { id:15, first_name:'Назгуль',  last_name:'Ермекова',   phone:'+7 707 555 66 77', email:'',                  messenger:'whatsapp', messenger_handle:'+77075556677', city:'Алматы',    country:'Казахстан', status:'archived', selected_for_ai:false, notes:'Переехала. Недоступна.',                                         source:'manual' },
];

let activeFilter = 'all';
let searchQuery  = '';

function getStatusBadge(status) {
  const map = {
    hot:      '<span class="status-badge status-badge--hot">🔥 Горячий</span>',
    warm:     '<span class="status-badge status-badge--warm">🌡 Тёплый</span>',
    cold:     '<span class="status-badge status-badge--cold">❄ Холодный</span>',
    archived: '<span class="status-badge status-badge--archived">📦 Архив</span>',
  };
  return map[status] || '';
}

function renderContacts() {
  const tbody = document.getElementById('contacts-tbody');
  if (!tbody) return;

  const filtered = contacts.filter(c => {
    const matchFilter = activeFilter === 'all' || c.status === activeFilter;
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || (
      (c.first_name + ' ' + c.last_name).toLowerCase().includes(q) ||
      c.phone.includes(q) ||
      c.city.toLowerCase().includes(q)
    );
    return matchFilter && matchSearch;
  });

  document.getElementById('contacts-shown').textContent = filtered.length;

  tbody.innerHTML = filtered.map(c => `
    <tr data-id="${c.id}">
      <td>
        <div class="contact-name-cell">
          <div class="contact-avatar">${c.first_name[0]}</div>
          <div>
            <div class="contact-fullname">${c.first_name} ${c.last_name}</div>
            <div class="contact-source">${SOURCE_LABELS[c.source] || c.source}</div>
          </div>
        </div>
      </td>
      <td style="color:var(--color-muted);font-size:12px;font-family:var(--font-mono)">${c.phone}</td>
      <td>
        <div class="messenger-badge">
          ${MESSENGER_ICONS[c.messenger] || '—'}
          <span style="font-size:11px">${c.messenger_handle || '—'}</span>
        </div>
      </td>
      <td style="color:var(--color-muted);font-size:13px">${c.city}</td>
      <td>${getStatusBadge(c.status)}</td>
      <td>
        <div class="ai-toggle ${c.selected_for_ai ? 'on' : ''}" data-id="${c.id}" title="${c.selected_for_ai ? 'AI активен' : 'Передать AI'}"></div>
      </td>
      <td><div class="note-preview">${c.notes || '—'}</div></td>
      <td>
        <button class="btn-row-action" data-id="${c.id}" title="Подробнее">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
          </svg>
        </button>
      </td>
    </tr>
  `).join('');

  // AI toggle clicks
  tbody.querySelectorAll('.ai-toggle').forEach(el => {
    el.addEventListener('click', e => {
      e.stopPropagation();
      const id = +el.dataset.id;
      const c = contacts.find(x => x.id === id);
      if (c) { c.selected_for_ai = !c.selected_for_ai; renderContacts(); }
    });
  });

  // Row click → detail
  tbody.querySelectorAll('tr[data-id]').forEach(row => {
    row.addEventListener('click', e => {
      if (e.target.closest('.ai-toggle') || e.target.closest('.btn-row-action')) return;
      openDetail(+row.dataset.id);
    });
  });

  // Detail button
  tbody.querySelectorAll('.btn-row-action').forEach(btn => {
    btn.addEventListener('click', () => openDetail(+btn.dataset.id));
  });
}

function updateCounters() {
  document.getElementById('cnt-all').textContent      = contacts.length;
  document.getElementById('cnt-hot').textContent      = contacts.filter(c => c.status === 'hot').length;
  document.getElementById('cnt-warm').textContent     = contacts.filter(c => c.status === 'warm').length;
  document.getElementById('cnt-cold').textContent     = contacts.filter(c => c.status === 'cold').length;
  document.getElementById('cnt-archived').textContent = contacts.filter(c => c.status === 'archived').length;
}

function openDetail(id) {
  const c = contacts.find(x => x.id === id);
  if (!c) return;
  document.getElementById('detail-name').textContent = `${c.first_name} ${c.last_name}`;
  document.getElementById('detail-body').innerHTML = `
    <div class="detail-grid">
      <div class="detail-field"><label>Телефон</label><span>${c.phone}</span></div>
      <div class="detail-field"><label>Email</label><span>${c.email || '—'}</span></div>
      <div class="detail-field"><label>Мессенджер</label><span>${MESSENGER_ICONS[c.messenger] || ''} ${c.messenger_handle || '—'}</span></div>
      <div class="detail-field"><label>Город</label><span>${c.city}, ${c.country}</span></div>
      <div class="detail-field"><label>Статус</label><span>${getStatusBadge(c.status)}</span></div>
      <div class="detail-field"><label>Источник</label><span>${SOURCE_LABELS[c.source] || c.source}</span></div>
    </div>
    <div class="detail-field" style="margin-bottom:12px"><label>Заметка</label></div>
    <div class="detail-notes">${c.notes || 'Заметок нет'}</div>
    <div class="detail-actions">
      <button class="btn-detail-action">📞 Позвонить</button>
      <button class="btn-detail-action">${MESSENGER_ICONS[c.messenger] || '💬'} Написать</button>
      <button class="btn-detail-action btn-detail-action--ai" onclick="toggleAI(${c.id})">
        🤖 ${c.selected_for_ai ? 'AI активен' : 'Передать AI'}
      </button>
    </div>
  `;
  document.getElementById('modal-contact-detail').classList.add('open');
}

window.toggleAI = function(id) {
  const c = contacts.find(x => x.id === id);
  if (c) { c.selected_for_ai = !c.selected_for_ai; renderContacts(); openDetail(id); }
};

function initContacts() {
  updateCounters();
  renderContacts();

  // Filter buttons
  document.querySelectorAll('.cstat').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.cstat').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      renderContacts();
    });
  });

  // Search
  document.getElementById('contact-search')?.addEventListener('input', e => {
    searchQuery = e.target.value;
    renderContacts();
  });

  // Add contact modal
  document.getElementById('btn-add-contact')?.addEventListener('click', () => {
    document.getElementById('modal-add-contact').classList.add('open');
  });

  ['modal-close-add', 'modal-cancel-add'].forEach(id => {
    document.getElementById(id)?.addEventListener('click', () => {
      document.getElementById('modal-add-contact').classList.remove('open');
    });
  });

  // Close detail
  document.getElementById('modal-close-detail')?.addEventListener('click', () => {
    document.getElementById('modal-contact-detail').classList.remove('open');
  });

  // Close on overlay click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) overlay.classList.remove('open');
    });
  });

  // Import dropdown
  const importBtn  = document.getElementById('import-btn');
  const importMenu = document.getElementById('import-menu');
  importBtn?.addEventListener('click', e => {
    e.stopPropagation();
    importMenu.classList.toggle('open');
  });
  document.addEventListener('click', () => importMenu?.classList.remove('open'));
  document.querySelectorAll('.import-option').forEach(opt => {
    opt.addEventListener('click', () => {
      alert(`Импорт из ${opt.dataset.type.toUpperCase()} — будет подключён к Supabase`);
      importMenu.classList.remove('open');
    });
  });

  // Add contact form
  document.getElementById('form-add-contact')?.addEventListener('submit', e => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const newContact = {
      id: Date.now(),
      first_name:       fd.get('first_name').trim(),
      last_name:        fd.get('last_name').trim(),
      phone:            fd.get('phone').trim(),
      email:            fd.get('email').trim(),
      messenger:        fd.get('messenger'),
      messenger_handle: fd.get('messenger_handle').trim(),
      city:             fd.get('city').trim(),
      country:          fd.get('country').trim(),
      status:           fd.get('status'),
      selected_for_ai:  fd.get('selected_for_ai') === 'on',
      notes:            fd.get('notes').trim(),
      source:           'manual',
    };
    contacts.unshift(newContact);
    updateCounters();
    renderContacts();
    document.getElementById('modal-add-contact').classList.remove('open');
    e.target.reset();
  });
}

// ===== SETTINGS =====
function initSettings() {
  const REFERRAL_CODE = 'SAIRA01';
  const REFERRAL_LINK = 'https://sairateam.com/?ref=SAIRA01';

  function copyText(text, btn, original) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch(e) {}
    document.body.removeChild(ta);
    btn.textContent = '✓ Скопировано';
    setTimeout(() => { btn.textContent = original; }, 2000);
  }

  // Copy referral link
  const btnCopyRef = document.getElementById('btn-copy-ref');
  if (btnCopyRef) {
    btnCopyRef.addEventListener('click', () => copyText(REFERRAL_LINK, btnCopyRef, '📋 Копировать ссылку'));
  }

  // Copy referral code
  const btnCopyCode = document.getElementById('btn-copy-code');
  if (btnCopyCode) {
    btnCopyCode.addEventListener('click', () => copyText(REFERRAL_CODE, btnCopyCode, '🔑 Копировать код'));
  }

  // AI toggle — controls opacity of AI settings fields below
  const aiToggle = document.getElementById('ai-enabled');
  // AI settings form is the one containing ai-work-from input
  const aiSettingsForm = document.getElementById('ai-work-from')?.closest('.settings-form');
  if (aiToggle && aiSettingsForm) {
    const updateAiFields = () => {
      const on = aiToggle.checked;
      aiSettingsForm.style.opacity = on ? '1' : '0.4';
      aiSettingsForm.querySelectorAll('input, select').forEach(el => { el.disabled = !on; });
      const statusEl = document.querySelector('#ai-global-status .ai-label');
      if (statusEl) statusEl.textContent = on ? 'Активен' : 'Выключен';
      const dotEl = document.querySelector('#ai-global-status .ai-dot');
      if (dotEl) dotEl.style.background = on ? '#3fb950' : '#dc3545';
    };
    aiToggle.addEventListener('change', updateAiFields);
    updateAiFields();
  }

  // Save button
  const saveBtn = document.getElementById('btn-save-settings');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => showSettingsToast('✅ Настройки сохранены'));
  }

  // Password change button
  const pwBtn = document.querySelector('#tab-settings .settings-card:nth-child(3) .btn-tpl');
  if (pwBtn) {
    pwBtn.addEventListener('click', () => {
      const inputs = pwBtn.closest('.settings-card').querySelectorAll('input[type="password"]');
      const cur = inputs[0]?.value || '';
      const nw  = inputs[1]?.value || '';
      const cn  = inputs[2]?.value || '';
      if (!cur || !nw || !cn) {
        showSettingsToast('⚠️ Заполните все поля пароля', true); return;
      }
      if (nw !== cn) {
        showSettingsToast('⚠️ Пароли не совпадают', true); return;
      }
      if (nw.length < 8) {
        showSettingsToast('⚠️ Минимум 8 символов', true); return;
      }
      inputs.forEach(i => i.value = '');
      showSettingsToast('🔑 Пароль изменён');
    });
  }

  // Danger zone buttons
  document.querySelectorAll('.btn-danger-action').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.textContent.trim();
      if (text.includes('Очистить')) {
        if (confirm('Удалить всех архивных лидов? Это действие нельзя отменить.')) {
          showSettingsToast('🗑 Архивные лиды удалены');
        }
      } else if (text.includes('Экспортировать')) {
        showSettingsToast('📤 Экспорт запрошен — данные придут на email');
      }
    });
  });
}

function showSettingsToast(msg, isError = false) {
  const toast = document.getElementById('settings-toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.style.borderColor = isError ? '#dc3545' : 'var(--color-accent)';
  toast.style.background  = isError ? 'rgba(220,53,69,0.15)' : 'var(--color-primary)';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initSidebar();
  initTemplates();
  initLearning();
  initStructure();
  initHistory();
  initTasks();
  initLeads();
  initContacts();
  initSettings();
});
