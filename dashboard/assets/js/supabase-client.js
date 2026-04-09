/* ===== SYSTEM V2 — SUPABASE CLIENT (ДАШБОРД) ===== */

// Конфигурация подключения к Supabase (проект system v2, строчные)
window.SUPABASE_URL     = 'https://njwraxmlzglmofxiwmxs.supabase.co';
window.SUPABASE_ANON_KEY = 'sb_publishable_iATLaUgVdGL6VjuBLQhKDw_UgxxfQcs';

// Создаём клиент сразу — используется в db.js
const { createClient } = window.supabase;
window.sb = createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
