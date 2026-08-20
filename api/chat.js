export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages, systemPrompt } = req.body;

  if (!Array.isArray(messages) || messages.length === 0 || !systemPrompt) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "API key no configurada" });
  }

  const formattedMessages = messages
    .filter((m) => m?.content?.trim())
    .map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content.trim() }]
    }));

  const lastRole = formattedMessages[formattedMessages.length - 1]?.role;
  if (lastRole !== "user") {
    return res.status(400).json({ error: "El último mensaje debe ser del usuario" });
  }

  const geminiBody = {
    system_instruction: {
      parts: [{ text: systemPrompt }]
    },
    contents: formattedMessages
  };

  // Si el modelo principal está saturado (503), probamos con uno de respaldo
  // en vez de reintentar una y otra vez sobre el mismo modelo lleno.
  const MODELS = ["gemini-flash-latest", "gemini-2.5-flash"];
  const RETRY_DELAY_MS = 900;

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  let lastErrorPayload = { status: 500, error: "Error desconocido" };

  for (let i = 0; i < MODELS.length; i++) {
    const model = MODELS[i];
    const isLastModel = i === MODELS.length - 1;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(geminiBody)
      });

      const data = await response.json();

      if (!response.ok) {
        lastErrorPayload = {
          status: response.status,
          error: data?.error?.message || "Error en Gemini",
          debug: data
        };

        // 503 = saturado: probamos el siguiente modelo (si queda alguno)
        if (response.status === 503 && !isLastModel) {
          await sleep(RETRY_DELAY_MS);
          continue;
        }

        return res.status(lastErrorPayload.status).json({
          error: lastErrorPayload.error,
          debug: lastErrorPayload.debug
        });
      }

      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!reply) {
        return res.status(500).json({ error: "Gemini no devolvió texto", debug: data });
      }

      return res.status(200).json({ reply });

    } catch (error) {
      lastErrorPayload = { status: 500, error: "Error al conectar con Gemini" };
      if (!isLastModel) {
        await sleep(RETRY_DELAY_MS);
        continue;
      }
      return res.status(500).json({ error: "Error al conectar con Gemini" });
    }
  }

  return res.status(lastErrorPayload.status || 500).json({
    error: lastErrorPayload.error
  });
}