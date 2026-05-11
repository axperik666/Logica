/** Простой лимит по IP (один инстанс / warm lambda). При масштабе — Redis / Upstash. */
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 20;

const buckets = new Map<string, number[]>();

export function getClientIp(headers: Headers): string {
  const xff = headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  return headers.get("x-real-ip")?.trim() || "unknown";
}

export function checkLeadRateLimit(ip: string): boolean {
  const now = Date.now();
  const times = (buckets.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (times.length >= MAX_REQUESTS) return false;
  times.push(now);
  buckets.set(ip, times);
  if (buckets.size > 8000) buckets.clear();
  return true;
}
