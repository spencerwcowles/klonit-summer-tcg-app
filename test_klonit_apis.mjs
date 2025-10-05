// Node 18+ (global fetch)
const log = (title, obj) => { console.log(`\n=== ${title} ===`); console.dir(obj, {depth: 4}); };

async function main() {
  // 1) Marketplace (old host)
  const mkt = await fetch("https://klonit-testing-backend.oielpj.easypanel.host/marketplace/listings");
  const mktBody = await mkt.text();
  log("Marketplace Status", { status: mkt.status, ok: mkt.ok });
  try { log("Marketplace JSON", JSON.parse(mktBody)); } catch { log("Marketplace Raw", mktBody.slice(0, 500)); }

  // 2) Prompt API (new host)
  const body = {
    prompt: "who are you",
    voice_type: "FEMALE",
    chatbot_id: "ad07359e-4093-4d3d-bb76-2abb1c217964",
    lang_type: "en",
    session_type: "1234567891234567",
    timezone: "America/New_York",
  };

  const res = await fetch("https://klonit-production-klonit.rduxij.easypanel.host/get-prompt", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const txt = await res.text();
  log("Prompt API Status", { status: res.status, ok: res.ok });
  try { log("Prompt API JSON", JSON.parse(txt)); } catch { log("Prompt API Raw", txt.slice(0, 500)); }
}

main().catch(err => { console.error(err); process.exit(1); });
