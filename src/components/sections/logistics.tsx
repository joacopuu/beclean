import Image from "next/image";
import { LOGISTICS } from "@/lib/content";
import { Reveal } from "@/components/primitives/reveal";

/* Franja a sangre con la fotografía de fondo. Familia de layout distinta
   a todo lo anterior: acá el dato se apoya sobre el mundo real. */
export function Logistics() {
  return (
    <section className="relative overflow-hidden">
      <Image
        src="/media/logistica-pallets.jpg"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="object-cover"
      />
      {/* Scrim fuerte: sin esto el texto no llega a contraste AA sobre foto. */}
      <div
        className="absolute inset-0 bg-ink-900/88"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/85 to-ink-900/60"
        aria-hidden="true"
      />

      <div className="shell relative py-24 lg:py-32">
        <Reveal>
          <h2
            className="font-display max-w-[20ch] text-[clamp(1.875rem,4vw,3rem)] leading-[1.08] tracking-[-0.032em]"
            style={{ fontWeight: 700 }}
          >
            {LOGISTICS.title}
          </h2>
        </Reveal>
        <Reveal delay={90}>
          <p className="mt-6 max-w-[40rem] text-[1.0625rem] leading-relaxed text-fg-2">
            {LOGISTICS.lead}
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-px border border-rule bg-rule lg:grid-cols-4">
          {LOGISTICS.stats.map((s, i) => (
            <div key={s.value} className="bg-ink-900/92 backdrop-blur-sm">
              <Reveal delay={i * 90} className="p-6 lg:p-7">
                <p
                  className="font-display tnum text-[clamp(1.5rem,3vw,2.25rem)] leading-none tracking-[-0.035em] text-chlor"
                  style={{ fontWeight: 700 }}
                >
                  {s.value}
                </p>
                <p className="mt-3 text-[0.8125rem] leading-snug text-fg-2">
                  {s.label}
                </p>
              </Reveal>
            </div>
          ))}
        </div>

        <Reveal>
          <p className="mt-10 max-w-[48rem] text-[0.8125rem] leading-relaxed text-fg-3">
            {LOGISTICS.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
