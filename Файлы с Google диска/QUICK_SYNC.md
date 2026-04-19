# ⚡ Быстрая синхронизация с GitHub

## ✅ Что уже сделано:
- ✅ Git репозиторий инициализирован
- ✅ Создан .gitignore файл

## 🚀 Что нужно сделать СЕЙЧАС:

### Шаг 1: Подключите ваш репозиторий на GitHub

**Если у вас УЖЕ есть репозиторий на GitHub:**

Выполните в терминале (замените URL на ваш):
```bash
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
```

**Если репозитория НЕТ - создайте его:**
1. Откройте https://github.com
2. Нажмите "+" → "New repository"
3. Название: `System.v2`
4. НЕ добавляйте README, .gitignore, лицензию
5. Нажмите "Create repository"
6. Скопируйте HTTPS URL
7. Выполните: `git remote add origin [ВАШ_URL]`

---

### Шаг 2: Добавьте все файлы

```bash
git add .
```

---

### Шаг 3: Создайте первый коммит

```bash
git commit -m "Initial commit: System v2 - универсальная CRM с ИИ-агентом"
```

---

### Шаг 4: Отправьте на GitHub

```bash
# Если на GitHub ветка называется main:
git branch -M main
git push -u origin main

# Или если master:
git push -u origin master
```

---

## 🔄 После этого: синхронизация между устройствами

### Загрузить изменения с другого устройства:
```bash
git pull origin main
```

### Отправить изменения:
```bash
git add .
git commit -m "Описание изменений"
git push origin main
```

---

## ❓ Как узнать URL репозитория?

1. Откройте ваш репозиторий на GitHub.com
2. Нажмите зелёную кнопку "Code"
3. Скопируйте HTTPS URL

---

**Выполните эти команды по порядку, и всё заработает!** 🚀

