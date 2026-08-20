import Image from "next/image";
import { PROTOCOLS } from "@/lib/content";
import { SectionHeader } from "@/components/primitives/section-header";
import { Reveal } from "@/components/primitives/reveal";

export function Protocols() {
  return (
    <section className="border-y border-rule bg-ink-800">
      <div className="shell py-24 lg:py-32">
        <SectionHeader title={PROTOCOLS.title} lead={PROTOCOLS.lead} />

        {/* Trío asimétrico: el riesgo crece de izquierda a derecha y la
            tarjeta crece con él. La escala refuerza la jerarquía clínica. */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3 md:items-end">
          {PROTOCOLS.levels.map((l, i) => (
            <Reveal
              key={l.level}
              delay={i * 120}
              className={i === 2 ? "md:-mb-6" : i === 1 ? "md:-mb-3" : ""}
            >
              <article className="flex h-full flex-col overflow-hidden rounded-sharp border border-rule bg-ink-900">
                <figure className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={l.img}
                    alt={l.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover opacity-70"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-ink-900 to-transparent"
                    aria-hidden="true"
                  />
                </figure>

                <div className="flex flex-1 flex-col p-6">
                  <h3
                    className="font-display text-[1.125rem] leading-snug tracking-[-0.015em]"
                    style={{ fontWeight: 600 }}
                  >
                    {l.level}
                  </h3>
                  <p className="mt-2 flex-1 text-[0.875rem] leading-snug text-fg-2">
                    {l.examples}
                  </p>

                  {/* Dosis contada en tabletas: el protocolo se ve, no se calcula. */}
                  <div className="mt-6 border-t border-rule pt-5">
                    <div
                      className="flex flex-wrap items-center gap-1"
                      aria-hidden="true"
                    >
                      {Array.from({ length: l.tablets }).map((_, t) => (
                        <span
                          key={t}
                          className="size-2.5 rounded-full border border-chlor bg-chlor/45"
                        />
                      ))}
                    </div>
                    <p
                      className="font-display mt-4 text-[1.5rem] leading-none tracking-[-0.025em] text-chlor"
                      style={{ fontWeight: 700 }}
                    >
                      {l.dose}
                    </p>
                    <p className="tnum mt-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-fg-3">
                      {l.concentration}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-12 max-w-[52rem] text-[0.8125rem] leading-relaxed text-fg-3">
            {PROTOCOLS.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
