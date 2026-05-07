# Деплой LOGICA Marketing

Проект — **Next.js 15** (**`app/`** и зеркально **`src/app/`** — так надёжнее для разных хостингов), **next-intl**, прод-сборка **`output: "standalone"`**.

Если сборка пишет «не найдены `pages` или `app`» — команда запускается **не из папки с `package.json`**, либо в Git не попали папки **`app/`** / **`src/`**. В панели деплоя задайте **корень репозитория** (где лежат `package.json`, `next.config.ts`, папки `app/` и `src/`), сделайте `git add -A` и снова push.

## Перед первым деплоем

1. Положите **`public/logo.png`** (логотип для шапки, OG и JSON-LD).
2. Скопируйте `.env.example` → `.env.production` или задайте переменные в панели хостинга.
3. Обязательно в проде: **`NEXT_PUBLIC_SITE_URL=https://logicamarketing.pro`** (ваш канонический URL).

## Сборка без Docker

```bash
npm install
npm run build
npm run start
```

Слушает порт **3000** (или задайте `PORT`).

## Docker

Сборка образа (URL сайта можно переопределить):

```bash
docker build -t logica-marketing .
# или с другим доменом:
docker build --build-arg NEXT_PUBLIC_SITE_URL=https://logicamarketing.pro -t logica-marketing .
```

Запуск:

```bash
docker run -p 3000:3000 -e NEXT_PUBLIC_SITE_URL=https://logicamarketing.pro logica-marketing
```

За обратным прокси (nginx, Caddy, Traefik) пробрасывайте HTTPS и заголовки `Host` / `X-Forwarded-*`.

## GitHub Actions

В репозитории включён workflow **`.github/workflows/ci.yml`** — проверка `npm run build` при push в `main`/`master`.

## Версия Node

Рекомендуется **Node 22** (см. `.nvmrc`). В `package.json` указано `engines.node >= 20.9.0`.
