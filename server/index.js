import dotenv from "dotenv";
import express from "express";
import { Pool } from "pg";

dotenv.config();

const PORT = Number.parseInt(process.env.PORT ?? "8787", 10);
const CORS_ORIGIN = process.env.CORS_ORIGIN ?? "http://localhost:8080";

const corsHeaders = {
  "Access-Control-Allow-Origin": CORS_ORIGIN,
  "Access-Control-Allow-Headers": "content-type",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
};

const app = express();
app.use(express.json({ limit: "1mb" }));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function ensureSchema() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS chat_logs (
      id BIGSERIAL PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      messages JSONB NOT NULL,
      response_text TEXT NOT NULL
    );
  `);
}

/** @typedef {{ role: 'user'|'assistant', content: string }} ChatMessage */

/** @param {ChatMessage[]} messages */
function toGeminiContents(messages) {
  return messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));
}

function sseLine(payload) {
  return `data: ${JSON.stringify(payload)}\n\n`;
}

app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true });
});

app.options("/api/chat", (_req, res) => {
  res.set(corsHeaders);
  res.status(204).end();
});

app.post("/api/chat", async (req, res) => {
  res.set(corsHeaders);

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      res.status(500).json({ error: "Missing GEMINI_API_KEY" });
      return;
    }

    const body = req.body;
    const messages = body?.messages;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ error: "Missing messages" });
      return;
    }

    const contents = toGeminiContents(messages);

    const hasAnyUser = contents.some((c) => c.role === "user");
    if (!hasAnyUser) {
      contents.unshift({
        role: "user",
        parts: [
          {
            text: "You are the GDG Batna assistant. Answer concisely and helpfully about GDG Batna events, community, and related topics.",
          },
        ],
      });
    }

    const geminiUrl =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
      encodeURIComponent(apiKey);

    const geminiResp = await fetch(geminiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 1024,
        },
      }),
    });

    if (!geminiResp.ok) {
      const errText = await geminiResp.text().catch(() => "");
      res
        .status(502)
        .json({ error: errText || `Gemini request failed with status ${geminiResp.status}` });
      return;
    }

    const data = await geminiResp.json();
    const text =
      data?.candidates?.[0]?.content?.parts
        ?.map((p) => p?.text)
        ?.filter(Boolean)
        ?.join("") ||
      "";

    // Persist to PostgreSQL (proves the app is configured to use Postgres).
    await pool.query(
      "INSERT INTO chat_logs (messages, response_text) VALUES ($1::jsonb, $2)",
      [JSON.stringify(messages), text]
    );

    // OpenAI-ish streaming payload shape expected by src/lib/chat.ts
    res.status(200);
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    res.write(
      sseLine({
        choices: [{ delta: { content: text } }],
      })
    );
    res.write("data: [DONE]\n\n");
    res.end();
  } catch (err) {
    res
      .status(500)
      .json({ error: err instanceof Error ? err.message : "Unknown error" });
  }
});

await ensureSchema();

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`API server listening on http://localhost:${PORT}`);
});
