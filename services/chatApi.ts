// services/chatApi.ts
const BASE_URL = "https://klonit-testing-klonit.oielpj.easypanel.host";

type GetPromptOK = {
  message: string;
  transcript: string;
  bot_reply: string;
  ans_voice?: string;
  chat_id: string;
};

export async function postPrompt({
  prompt,
  chatbotId,
  sessionType,
  lang = "en",
  voiceType = "female",
}: {
  prompt: string;
  chatbotId: string | number;
  sessionType: string;
  lang?: string;
  voiceType?: "male" | "female";
}) {
  const payload = {
    prompt: String(prompt),
    voice_type: String(voiceType),
    chatbot_id: String(chatbotId),
    lang_type: String(lang),
    session_type: String(sessionType),
  };

  console.log("[get-prompt] POST json", payload);

  const res = await fetch(`${BASE_URL}/get-prompt`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const raw = await res.text().catch(() => "");
  console.log("[get-prompt] status", res.status);
  console.log("[get-prompt] raw", raw);

  if (!res.ok) {
    let detail = raw;
    try {
      const j = JSON.parse(raw);
      detail = j?.message || j?.error || raw;
    } catch {}
    throw new Error(`get-prompt failed: ${res.status} — ${detail}`);
  }

  try {
    return JSON.parse(raw) as GetPromptOK;
  } catch {
    throw new Error("get-prompt returned non-JSON body");
  }
}
