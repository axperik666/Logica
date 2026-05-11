import { NextResponse } from "next/server";

/** Uptime / балансировщики: без секретов, без БД. */
export function GET() {
  return NextResponse.json(
    { ok: true, service: "logica-marketing", ts: new Date().toISOString() },
    { status: 200, headers: { "Cache-Control": "no-store" } }
  );
}
