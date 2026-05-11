import { NextResponse } from "next/server";
import { ingestLeadForm } from "@/lib/leadIngest";
import { checkLeadRateLimit, getClientIp } from "@/lib/leadRateLimit";
import { verifyTurnstileToken } from "@/lib/turnstile";

function field(fd: FormData, key: string): string {
  const v = fd.get(key);
  return typeof v === "string" ? v.trim() : "";
}

export async function POST(req: Request) {
  const ip = getClientIp(req.headers);
  if (!(await checkLeadRateLimit(ip))) {
    return NextResponse.json({ ok: false, error: "RATE_LIMIT" }, { status: 429 });
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "VALIDATION" }, { status: 400 });
  }

  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (turnstileSecret) {
    const token = field(formData, "cf-turnstile-response");
    const ok = await verifyTurnstileToken(token, turnstileSecret);
    if (!ok) {
      return NextResponse.json({ ok: false, error: "CAPTCHA" }, { status: 400 });
    }
  }

  const result = await ingestLeadForm(formData);

  if (result.outcome === "accepted") {
    return NextResponse.json({ ok: true });
  }

  const { reason } = result;
  const status =
    reason === "VALIDATION" ? 400 : reason === "NOT_CONFIGURED" ? 503 : 502;
  return NextResponse.json({ ok: false, error: reason }, { status });
}
