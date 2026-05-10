import { NextResponse } from "next/server";
import { isPhonePlausible } from "@/lib/phoneMask";
import { postJson } from "@/lib/postJson";

const httpPost = globalThis.fetch.bind(globalThis);

function buildText(p: { [k: string]: string }): string {
  const lines: string[] = ["Source: " + (p.source || "site"), "Name: " + (p.name || "-")];
  if (p.contact) lines.push("Contact: " + p.contact);
  if (p.phone) lines.push("Phone: " + p.phone);
  if (p.email) lines.push("Email: " + p.email);
  if (p.niche) lines.push("Niche: " + p.niche);
  if (p.message) lines.push("Message:\n" + p.message);
  return lines.join("\n");
}

async function sendTelegram(text: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();
  if (!token || !chatId) return false;
  const cut = text.slice(0, 4000);
  const url = "https://api.telegram.org/bot" + token + "/sendMessage";
  const res = await httpPost(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: cut })
  });
  return res.ok;
}

async function sendWebhook(hookUrl: string, payload: object): Promise<boolean> {
  return postJson(hookUrl, payload);
}

export async function POST(req: Request) {
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "VALIDATION" }, { status: 400 });
  }

  const str = (key: string) => {
    const v = formData.get(key);
    return typeof v === "string" ? v.trim() : "";
  };

  if (str("company").length > 0) {
    return NextResponse.json({ ok: true });
  }

  const source = str("source") || "site";
  const name = str("name");
  const contact = str("contact");
  const message = str("message");
  const phone = str("phone");
  const email = str("email");
  const niche = str("niche");

  if (source === "kontakty") {
    if (!name || !contact) {
      return NextResponse.json({ ok: false, error: "VALIDATION" }, { status: 400 });
    }
  } else {
    if (!name || !email || !niche || !message) {
      return NextResponse.json({ ok: false, error: "VALIDATION" }, { status: 400 });
    }
    if (!isPhonePlausible(phone)) {
      return NextResponse.json({ ok: false, error: "VALIDATION" }, { status: 400 });
    }
  }

  const payload = { source, name, contact, phone, email, niche, message };

  const hook = process.env.LEAD_WEBHOOK_URL?.trim();
  if (hook) {
    const ok = await sendWebhook(hook, payload);
    if (!ok) {
      return NextResponse.json({ ok: false, error: "DELIVERY" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  }

  const hasTg =
    Boolean(process.env.TELEGRAM_BOT_TOKEN?.trim()) &&
    Boolean(process.env.TELEGRAM_CHAT_ID?.trim());
  if (hasTg) {
    const ok = await sendTelegram(buildText(payload));
    if (!ok) {
      return NextResponse.json({ ok: false, error: "DELIVERY" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json(
    { ok: false, error: "NOT_CONFIGURED" },
    { status: 503 }
  );
}
