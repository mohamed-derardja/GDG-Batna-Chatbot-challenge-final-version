


# GDG Batna Chatbot

What is this project?

- A simple web chat UI built with React + Vite for the GDG Batna Chatbot challenge.
- A small Node (Express) API that calls Gemini and stores chat logs in PostgreSQL.

## How to run locally

Prerequisites:

- Node.js (recommended v18+) and `npm` installed.
- A PostgreSQL database (local or hosted).

Steps:

1. Install dependencies:

```bash
npm install
```

2. Configure env vars (create a local `.env` file):

Use [.env.example](.env.example) as a template.

Required:

- `GEMINI_API_KEY` (server-side)
- `DATABASE_URL` (PostgreSQL connection string)

Optional:

- `PORT` (API server port, default `8787`)
- `CORS_ORIGIN` (default `http://localhost:8080`)

3. Start the backend + frontend together:

```bash
npm run dev:all
```

4. Open the app in your browser:

- http://localhost:8080

Build and preview (optional):

```bash
npm run build
npm run preview
```

When you send a message, the API will create a `chat_logs` table (if needed) and insert each chat there.

## Bot core logic (Gemini)

The UI does **not** call Gemini directly. It calls a local Node API endpoint:

- `POST /api/chat`

The backend implementation is in `server/index.js`.

### Important security note

Do **not** put your Gemini API key in a `VITE_...` env var (those are exposed to the browser). Keep `GEMINI_API_KEY` server-side.

### Run backend + frontend together

- `npm run dev:all`

This starts:

- the API server on `http://localhost:8787`
- Vite on `http://localhost:8080` (with a dev proxy from `/api/*` -> `http://localhost:8787`)

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Express
- PostgreSQL

