export async function verifyTurnstileToken(
  token: string,
  secret: string
): Promise<boolean> {
  const t = token?.trim();
  if (!t) return false;
  const body = new URLSearchParams();
  body.set("secret", secret);
  body.set("response", t);
  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      }
    );
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}
