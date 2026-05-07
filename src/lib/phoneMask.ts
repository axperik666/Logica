/** Цифры телефона для отправки (без маски) */
export function digitsOnly(s: string): string {
  return s.replace(/\D/g, "");
}

/**
 * Форматирование при вводе: приоритет RU/KZ (+7), иначе международный + и до 15 цифр.
 */
export function formatPhoneMask(raw: string): string {
  let d = digitsOnly(raw).slice(0, 15);
  if (!d.length) return "";

  if (d.startsWith("8") && d.length <= 11) {
    d = "7" + d.slice(1);
  }

  if (d.startsWith("7") && d.length <= 11) {
    const rest = d.slice(1);
    let out = "+7";
    if (rest.length === 0) return out;
    out += " (" + rest.slice(0, 3);
    if (rest.length <= 3) return out + (rest.length === 3 ? ")" : "");
    out += ") " + rest.slice(3, 6);
    if (rest.length <= 6) return out;
    out += "-" + rest.slice(6, 8);
    if (rest.length <= 8) return out;
    out += "-" + rest.slice(8, 10);
    return out;
  }

  return "+" + d;
}

export function isPhonePlausible(formatted: string): boolean {
  const n = digitsOnly(formatted).length;
  return n >= 10 && n <= 15;
}
