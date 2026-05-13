import { isPhonePlausible } from "@/lib/phoneMask";
import { postJson } from "@/lib/postJson";
import { alertLeadDeliveryFailure } from "@/lib/leadFailureAlert";

export type LeadIngestResult =
  | { outcome: "accepted" }
  | { outcome: "reject"; reason: "VALIDATION" | "DELIVERY" | "NOT_CONFIGURED" };

function field(fd: FormData, key: string): string {
  const v = fd.get(key);
  return typeof v === "string" ? v.trim() : "";
}

function formatNotifyBody(p: { [k: string]: string }): string {
  const lines: string[] = [
    "Source: " + (p.source || "site"),
    "Name: " + (p.name || "-")
  ];
  if (p.contact) lines.push("Contact: " + p.contact);
  if (p.phone) lines.push("Phone: " + p.phone);
  if (p.email) lines.push("Email: " + p.email);
  if (p.niche) lines.push("Niche: " + p.niche);
  if (p.message) lines.push("Message:\n" + p.message);
  return lines.join("\n");
}

async function notifyViaEnvChannel(
  plainText: string,
  payload: { [k: string]: string }
): Promise<LeadIngestResult> {
  const hook = process.env.LEAD_WEBHOOK_URL?.trim();
  if (hook) {
    const ok = await postJson(hook, payload);
    if (!ok) {
      console.error("[lead] webhook delivery failed", {
        source: payload.source
      });
      void alertLeadDeliveryFailure({
        channel: "webhook",
        source: payload.source
      });
    }
    return ok ? { outcome: "accepted" } : { outcome: "reject", reason: "DELIVERY" };
  }

  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();
  if (token && chatId) {
    const base = "https://api.telegram.org/bot";
    const endpoint = base + token + "/sendMessage";
    const ok = await postJson(endpoint, {
      chat_id: chatId,
      text: plainText.slice(0, 4000)
    });
    if (!ok) {
      console.error("[lead] telegram delivery failed", {
        source: payload.source
      });
      void alertLeadDeliveryFailure({
        channel: "telegram",
        source: payload.source
      });
    }
    return ok ? { outcome: "accepted" } : { outcome: "reject", reason: "DELIVERY" };
  }

  return { outcome: "reject", reason: "NOT_CONFIGURED" };
}

/** Server-side lead intake from multipart form (contact page + CTA). */
export async function ingestLeadForm(formData: FormData): Promise<LeadIngestResult> {
  if (field(formData, "company").length > 0) {
    return { outcome: "accepted" };
  }

  const source = field(formData, "source") || "site";
  const name = field(formData, "name");
  const contact = field(formData, "contact");
  const message = field(formData, "message");
  const phone = field(formData, "phone");
  const email = field(formData, "email");
  const niche = field(formData, "niche");

  if (
    source === "kontakty" ||
    source === "kontakty-hero" ||
    source === "roi-calculator" ||
    source === "sections-ds-lead"
  ) {
    if (!name || !contact) {
      return { outcome: "reject", reason: "VALIDATION" };
    }
  } else {
    if (!name || !email || !niche || !message) {
      return { outcome: "reject", reason: "VALIDATION" };
    }
    if (!isPhonePlausible(phone)) {
      return { outcome: "reject", reason: "VALIDATION" };
    }
  }

  const payload = { source, name, contact, phone, email, niche, message };
  const plainText = formatNotifyBody(payload);
  return notifyViaEnvChannel(plainText, payload);
}
