/** Простой лимит по IP (один инстанс / warm lambda). При заданных `UPSTASH_REDIS_REST_*` — Upstash Redis по HTTP. */
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

function checkLeadRateLimitMemory(ip: string): boolean {
  const now = Date.now();
  const times = (buckets.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (times.length >= MAX_REQUESTS) return false;
  times.push(now);
  buckets.set(ip, times);
  if (buckets.size > 8000) buckets.clear();
  return true;
}

async function upstashIncrWithExpire(
  key: string,
  expireSeconds: number
): Promise<number | null> {
  const base = process.env.UPSTASH_REDIS_REST_URL?.trim().replace(/\/+$/, "");
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (!base || !token) return null;

  const headers = { Authorization: `Bearer ${token}` };

  const incRes = await fetch(`${base}/incr/${encodeURIComponent(key)}`, {
    headers,
    cache: "no-store"
  });
  if (!incRes.ok) return null;
  const incJson = (await incRes.json()) as { result?: number };
  const count = typeof incJson.result === "number" ? incJson.result : 0;

  if (count === 1) {
    await fetch(`${base}/expire/${encodeURIComponent(key)}/${expireSeconds}`, {
      headers,
      cache: "no-store"
    });
  }

  return count;
}

/**
 * Лимит по IP: при заданных `UPSTASH_REDIS_REST_URL` и `UPSTASH_REDIS_REST_TOKEN` — Redis,
 * иначе in-memory (один процесс).
 */
export async function checkLeadRateLimit(ip: string): Promise<boolean> {
  const base = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (base && token) {
    const bucket = Math.floor(Date.now() / WINDOW_MS);
    const key = `leadrl:${ip}:${bucket}`;
    const count = await upstashIncrWithExpire(
      key,
      Math.ceil(WINDOW_MS / 1000) * 2
    );
    if (count === null) return checkLeadRateLimitMemory(ip);
    return count <= MAX_REQUESTS;
  }
  return checkLeadRateLimitMemory(ip);
}
