---
project: system-v2
component: referral
status: implemented
updated: 2026-04-17
---

# Referral System

## Статус: Реализована

## Логика
1. Landing page требует `?ref=` URL параметр
2. Параметр проверяется по `partners.ref_code`
3. Если ref_code валидный → привязка лида к партнёру
4. Если нет `?ref=` → показывается поле ввода кода вручную
5. Если партнёр без upline → `placement_status = unplaced` (ручное назначение админом)

## Генерация ref_code
```sql
substr(md5(id::text), 1, 8)
```
- Поле: `partners.ref_code` (text, UNIQUE)
- Тестовый код: `TEST001`

## RLS
- Anon reads разрешены для проверки ref_code
- Policy: `CREATE POLICY ... FOR SELECT TO anon USING (true)`

## Верификация (TODO)
- [ ] Тест: `sairateam.com?ref=TEST001` → запись в `leads`

## Связи
- [[Landing Page]]
- [[SYSTEM V2]]
