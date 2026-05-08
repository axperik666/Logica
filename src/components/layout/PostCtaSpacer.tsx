/** Декоративный «пустой» блок между секцией заявки и футером — сетка в стиле сайта. */
export function PostCtaSpacer() {
  return (
    <section
      aria-hidden
      className="relative isolate min-h-[clamp(7rem,20vw,16rem)] overflow-hidden bg-[linear-gradient(180deg,#070716_0%,#110b22_48%,#070716_100%)]"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.92] [background-image:linear-gradient(rgba(0,191,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(0,191,255,0.12)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(138,43,226,0.05)] to-transparent" />
    </section>
  );
}
