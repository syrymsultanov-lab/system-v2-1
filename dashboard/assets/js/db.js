/* ===== SYSTEM V2 — SUPABASE DATA MODULE ===== */
// Этот файл загружается ПОСЛЕ dashboard.js и supabase-client.js.
// Заменяет моковые данные реальными из Supabase.

// Текущий партнёр (временная авторизация — первый в БД)
window.currentPartner = null;

// ===== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =====

// Показать ошибку в UI — не глотаем в консоль
function showDbError(msg) {
  console.error('[DB]', msg);
  const el = document.getElementById('db-error-banner');
  if (el) {
    el.textContent = '⚠️ ' + msg;
    el.style.display = 'block';
    setTimeout(() => { el.style.display = 'none'; }, 8000);
  }
}

// Получить сегодняшнюю дату в формате ISO (начало дня UTC)
function todayISO() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
}

// Разбить "Имя Фамилия" на first_name / last_name
function splitName(fullName) {
  const parts = (fullName || '').trim().split(/\s+/);
  return {
    first_name: parts[0] || '—',
    last_name:  parts.slice(1).join(' ') || '',
  };
}

// Преобразовать строку из БД leads в формат, понятный renderLeads()
function mapDbLead(row) {
  const { first_name, last_name } = splitName(row.name);
  return {
    id:               row.id,
    first_name:       first_name,
    last_name:        last_name,
    phone:            row.phone  || '',
    email:            row.email  || '',
    messenger:        '',
    messenger_handle: '',
    country:          '',
    city:             '',
    referral_code:    row.source || '',
    status:           row.status || 'new',
    created_at:       row.created_at,
    // Оригинал для операций с БД
    _partner_id:      row.partner_id,
  };
}

// Преобразовать строку из events_log в формат, понятный renderHistory()
function mapDbEvent(row) {
  const payload = row.payload || {};
  return {
    id:           row.id,
    entity_type:  row.entity_type  || 'system',
    entity_id:    row.entity_id,
    action:       row.event        || '',
    description:  payload.description || row.event || '',
    entity_name:  payload.name     || payload.entity_name || '',
    performed_by: payload.performed_by || 'system',
    created_at:   row.created_at,
  };
}

// ===== ЗАГРУЗКА ПАРТНЁРА =====

async function loadPartner() {
  try {
    const { data, error } = await window.sb
      .from('partners')
      .select('id, name, email, ref_code')
      .limit(1)
      .single();

    if (error) throw error;

    window.currentPartner = data;

    // Обновляем имя в шапке дашборда
    const nameEl = document.querySelector('.user-name');
    if (nameEl && data.name) nameEl.textContent = data.name;

    return data;
  } catch (err) {
    showDbError('Не удалось загрузить данные партнёра: ' + err.message);
    return null;
  }
}

// ===== ЗАГРУЗКА ЛИДОВ =====

async function loadLeads(partnerId) {
  try {
    const { data, error } = await window.sb
      .from('leads')
      .select('id, partner_id, name, phone, email, source, status, created_at')
      .eq('partner_id', partnerId)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) throw error;

    // Заменяем глобальный массив из dashboard.js
    leads.length = 0;
    (data || []).forEach(row => leads.push(mapDbLead(row)));

    // Перерисовываем таблицу и счётчики
    if (typeof updateLeadCounters === 'function') updateLeadCounters();
    if (typeof renderLeads       === 'function') renderLeads();

    // Обновляем бейдж в сайдбаре
    const badge = document.querySelector('.nav-item[data-tab="leads"] .nav-badge');
    if (badge) badge.textContent = leads.filter(l => l.status === 'new').length;

    return data;
  } catch (err) {
    showDbError('Не удалось загрузить лидов: ' + err.message);
    return [];
  }
}

// ===== ОБНОВЛЕНИЕ СТАТИСТИЧЕСКИХ КАРТОЧЕК =====

async function updateStatCards(partnerId) {
  try {
    const today = todayISO();

    // Все лиды партнёра
    const { count: total } = await window.sb
      .from('leads')
      .select('id', { count: 'exact', head: true })
      .eq('partner_id', partnerId);

    // Новых сегодня
    const { count: newToday } = await window.sb
      .from('leads')
      .select('id', { count: 'exact', head: true })
      .eq('partner_id', partnerId)
      .gte('created_at', today);

    // В работе
    const { count: inWork } = await window.sb
      .from('leads')
      .select('id', { count: 'exact', head: true })
      .eq('partner_id', partnerId)
      .eq('status', 'in_work');

    // Конвертировано
    const { count: converted } = await window.sb
      .from('leads')
      .select('id', { count: 'exact', head: true })
      .eq('partner_id', partnerId)
      .eq('status', 'converted');

    // Обновляем карточки
    const s = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val !== null ? val : '—';
    };
    s('stat-total',     total     ?? 0);
    s('stat-new-today', newToday  ?? 0);
    s('stat-in-work',   inWork    ?? 0);
    s('stat-converted', converted ?? 0);

    // Обновляем тренды
    const trend = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val > 0 ? `+${val} ↑` : val === 0 ? '= 0' : `${val}`;
    };
    trend('trend-new-today', newToday ?? 0);
    trend('trend-in-work',   inWork   ?? 0);
    trend('trend-converted', converted ?? 0);

  } catch (err) {
    showDbError('Не удалось загрузить статистику: ' + err.message);
  }
}

// ===== ЗАГРУЗКА ИСТОРИИ СОБЫТИЙ =====

async function loadHistory() {
  try {
    const { data, error } = await window.sb
      .from('events_log')
      .select('id, entity_type, entity_id, event, payload, created_at')
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) throw error;

    if (data && data.length > 0) {
      // Заменяем глобальный массив из dashboard.js
      eventsLog.length = 0;
      data.forEach(row => eventsLog.push(mapDbEvent(row)));

      // Перерисовываем историю
      if (typeof renderHistory === 'function') renderHistory();
    }
  } catch (err) {
    showDbError('Не удалось загрузить историю: ' + err.message);
  }
}

// ===== ЗАПИСЬ В EVENTS_LOG =====

async function logEvent(entityType, entityId, event, payload = {}) {
  try {
    await window.sb.from('events_log').insert([{
      entity_type: entityType,
      entity_id:   entityId,
      event:       event,
      payload:     {
        ...payload,
        performed_by: 'partner',
      },
      created_at:  new Date().toISOString(),
    }]);
  } catch (err) {
    console.error('[DB] events_log insert error:', err.message);
  }
}

// ===== ПАТЧ СМЕНЫ СТАТУСА ЛИДА =====
// Перехватываем window.setLeadStatus, добавляем запись в БД

function patchSetLeadStatus() {
  const original = window.setLeadStatus;

  window.setLeadStatus = async function(id, newStatus) {
    // 1. Находим лид в локальном массиве
    const lead = leads.find(l => l.id === id);
    if (!lead) return;

    const oldStatus = lead.status;

    // 2. Оптимистично обновляем UI через оригинальную функцию
    original(id, newStatus);

    // 3. Обновляем в Supabase
    try {
      const { error: updateErr } = await window.sb
        .from('leads')
        .update({ status: newStatus })
        .eq('id', id);

      if (updateErr) throw updateErr;

      // 4. Пишем в lead_status_log
      await window.sb.from('lead_status_log').insert([{
        lead_id:    id,
        old_status: oldStatus,
        new_status: newStatus,
        changed_by: 'partner',
        created_at: new Date().toISOString(),
      }]);

      // 5. Логируем в events_log
      await logEvent('lead', id, 'status_changed', {
        name:        (lead.first_name + ' ' + lead.last_name).trim(),
        from_status: oldStatus,
        to_status:   newStatus,
        description: `Статус лида изменён: ${oldStatus} → ${newStatus}`,
      });

      // 6. Обновляем статистику
      if (window.currentPartner) {
        updateStatCards(window.currentPartner.id);
      }

    } catch (err) {
      showDbError('Ошибка обновления статуса: ' + err.message);
      // Откат UI — возвращаем старый статус
      lead.status = oldStatus;
      if (typeof updateLeadCounters === 'function') updateLeadCounters();
      if (typeof renderLeads       === 'function') renderLeads();
    }
  };
}

// ===== ИНИЦИАЛИЗАЦИЯ =====

document.addEventListener('DOMContentLoaded', async () => {
  // Ждём, чтобы dashboard.js успел отработать свой DOMContentLoaded
  // (они выполняются в порядке регистрации — этот идёт вторым)

  // 1. Загружаем партнёра
  const partner = await loadPartner();
  if (!partner) return; // Нет партнёра — стоп

  // 2. Параллельно грузим лиды + историю + статистику
  await Promise.all([
    loadLeads(partner.id),
    updateStatCards(partner.id),
    loadHistory(),
  ]);

  // 3. Патчим смену статуса лида
  patchSetLeadStatus();
});
