/* ============================================
   SYSTEM V2 — DASHBOARD JS
   Clocks, navigation, header component
   ============================================ */

// ===== CLOCKS =====
function updateClocks() {
  const fmt = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
  const now = new Date();
  const el = (id) => document.getElementById(id);
  if (el('ck-local'))  el('ck-local').textContent  = now.toLocaleTimeString('ru-RU', fmt);
  if (el('ck-moscow')) el('ck-moscow').textContent = now.toLocaleTimeString('ru-RU', { ...fmt, timeZone: 'Europe/Moscow' });
  if (el('ck-astana')) el('ck-astana').textContent = now.toLocaleTimeString('ru-RU', { ...fmt, timeZone: 'Asia/Almaty' });
  if (el('ck-ny'))     el('ck-ny').textContent     = now.toLocaleTimeString('ru-RU', { ...fmt, timeZone: 'America/New_York' });
}

// ===== HEADER HTML =====
function renderHeader(activeTab) {
  const tabs = [
    { id: 'dashboard',  icon: '🧭', label: 'Дашборд',   file: 'dashboard.html', badge: 0 },
    { id: 'leads',      icon: '🎯', label: 'Заявки',    file: 'leads.html',     badge: 3 },
    { id: 'contacts',   icon: '👥', label: 'Контакты',  file: 'contacts.html',  badge: 0 },
    { id: 'tasks',      icon: '✅', label: 'Задачи',    file: 'tasks.html',     badge: 5 },
    { id: 'structure',  icon: '🌊', label: 'Структура', file: 'structure.html', badge: 0 },
    { id: 'history',    icon: '📜', label: 'История',   file: 'history.html',   badge: 0 },
    { id: 'training',   icon: '🎓', label: 'Обучение',  file: 'training.html',  badge: 0 },
    { id: 'templates',  icon: '📋', label: 'Шаблоны',   file: 'templates.html', badge: 0 },
    { id: 'settings',   icon: '⚙️', label: 'Настройки', file: 'settings.html',  badge: 0 },
  ];

  const tabsHtml = tabs.map(t => {
    const isActive = t.id === activeTab;
    const badgeHtml = t.badge > 0 ? `<span class="nb">${t.badge}</span>` : '';
    return `<a href="${t.file}" class="nt${isActive ? ' active' : ''}">
      <span class="nt-icon">${t.icon}</span>
      <span class="nt-label">${t.label}</span>
      ${badgeHtml}
    </a>`;
  }).join('');

  return `
  <header class="hbar">
    <div class="hbar-l">
      <a href="../index.html" class="hlogo" title="На лендинг">system <span>v2</span></a>
      <div class="hdiv"></div>
      <div class="ai-on"><i></i>AI-агент онлайн</div>
    </div>
    <div class="hclocks">
      <div class="hclock local"><div class="hck-t" id="ck-local">--:--:--</div><div class="hck-c">ЛОКАЛЬНО</div></div>
      <div class="hck-sep"></div>
      <div class="hclock"><div class="hck-t" id="ck-moscow">--:--:--</div><div class="hck-c">МОСКВА</div></div>
      <div class="hck-sep"></div>
      <div class="hclock"><div class="hck-t" id="ck-astana">--:--:--</div><div class="hck-c">АСТАНА</div></div>
      <div class="hck-sep"></div>
      <div class="hclock ny"><div class="hck-t" id="ck-ny">--:--:--</div><div class="hck-c">НЬЮ-ЙОРК</div></div>
    </div>
    <div class="hbar-r">
      <a href="../index.html" class="hlink-home" title="На лендинг">
        <span class="hlink-ico">🏠</span>
        <span class="hlink-tx">На лендинг</span>
      </a>
      <div class="huser"><div class="hava">СТ</div><span class="huname">Saira Team</span></div>
    </div>
  </header>
  <nav class="navbar">${tabsHtml}</nav>`;
}

// ===== INIT =====
function initDashboard(activeTab) {
  const container = document.getElementById('app-header');
  if (container) container.innerHTML = renderHeader(activeTab);
  updateClocks();
  setInterval(updateClocks, 1000);
}
