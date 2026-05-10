import { NextResponse } from "next/server";
import { ingestLeadForm } from "@/lib/leadIngest";

export async function POST(req: Request) {
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "VALIDATION" }, { status: 400 });
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
