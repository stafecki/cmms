# CMMS

System do zarządzania utrzymaniem ruchu (Computerized Maintenance Management System) — zarządzanie urządzeniami, przeglądy, zlecenia serwisowe, operatorzy, dokumenty, alerty.

## Tech stack

- **Frontend:** Next.js 15, React 19, SASS
- **Backend:** Hono, Prisma, Zod
- **Bazy danych:** MySQL 8, MongoDB 7, Redis
- **Monorepo:** npm workspaces (`apps/api`, `apps/web`)

## Uruchomienie (Docker)

```bash
# skopiuj zmienne środowiskowe i uzupełnij
cp .env.example .env

# wystartuj wszystko (MySQL, Mongo, Redis, API, Web)
npm run docker:up

# uruchom migracje
npm run docker:migrate

# załaduj dane testowe
npm run docker:seed

# logi
npm run docker:logs

# zatrzymaj
npm run docker:down
```

Aplikacja będzie dostępna pod:
- **Web:** http://localhost:8080
- **API:** http://localhost:3000

## Uruchomienie lokalne (dev)

Wymaga działających instancji MySQL, MongoDB i Redis (np. z Dockera).

```bash
npm install

# oba serwisy naraz
npm run dev

# albo osobno
npm run dev:api   # API na :3000
npm run dev:web   # Web na :8080
```

## Pozostałe komendy

```bash
npm run build       # build obu aplikacji
npm run lint        # ESLint
npm run format      # Prettier
```

### Testy

```bash
# API
npm run test --workspace=apps/api
npm run test:run --workspace=apps/api

# Web
npm run test --workspace=apps/web
npm run test:run --workspace=apps/web
```
