/** Опциональный webhook при ошибке доставки лида (Slack / n8n / свой endpoint). */
export async function alertLeadDeliveryFailure(payload: {
  channel: "webhook" | "telegram";
  source?: string;
}): Promise<void> {
  const url = process.env.LEAD_FAILURE_WEBHOOK_URL?.trim();
  if (!url) return;

  const body = JSON.stringify({
    type: "lead_delivery_failed",
    ...payload,
    at: new Date().toISOString()
  });

  try {
    const ac = new AbortController();
    const t = setTimeout(() => ac.abort(), 5000);
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      signal: ac.signal
    });
    clearTimeout(t);
  } catch {
    /* ignore — не блокируем ответ клиенту */
  }
}
