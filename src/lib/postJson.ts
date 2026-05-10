/** POST JSON helper (keeps route handlers small). */
export async function postJson(url: string, data: unknown): Promise<boolean> {
  const send = globalThis.fetch.bind(globalThis);
  const res = await send(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.ok;
}
