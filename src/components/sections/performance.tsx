"use client";

import { PERFORMANCE } from "@/lib/content";
import { SectionHeader } from "@/components/primitives/section-header";
import { Reveal, useInView } from "@/components/primitives/reveal";
import { Counter } from "@/components/primitives/counter";

/* Barra de proporción SIN pista de fondo rellena.
   Motivo de la animación: jerarquía. La barra crece al entrar en vista
   para que el ojo compare longitudes, que es lo que hace legible un ×50
   mucho mejor que dos cifras sueltas una al lado de la otra. */
function Ratio({
  usLabel,
  usValue,
  usN,
  themLabel,
  themValue,
  themN,
}: {
  usLabel: string;
  usValue: string;
  usN: number;
  themLabel: string;
  themValue: string;
  themN: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.4);
  // Escala en raíz: un ×1000 lineal dejaría la barra rival invisible.
  const max = Math.max(usN, themN);
  const w = (n: number) => `${Math.max(Math.sqrt(n / max) * 100, 3)}%`;

  return (
    <div ref={ref} className="space-y-3">
      <div>
        <div className="flex items-baseline justify-between gap-4">
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-chlor">
            {usLabel}
          </span>
          <span className="tnum text-[0.875rem] text-fg-1">{usValue}</span>
        </div>
        <div
          className="mt-2 h-2 rounded-sharp bg-chlor transition-[width] duration-1000 ease-out"
          style={{ width: inView ? w(usN) : "0%" }}
        />
      </div>
      <div>
        <div className="flex items-baseline justify-between gap-4">
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-fg-3">
            {themLabel}
          </span>
          <span className="tnum text-[0.875rem] text-fg-2">{themValue}</span>
        </div>
        <div
          className="mt-2 h-2 rounded-sharp bg-legacy transition-[width] duration-1000 ease-out"
          style={{ width: inView ? w(themN) : "0%", transitionDelay: "120ms" }}
        />
      </div>
    </div>
  );
}

export function Performance() {
  return (
    <section id="rendimiento" className="border-y border-rule bg-ink-800">
      <div className="shell py-24 lg:py-32">
        <SectionHeader title={PERFORMANCE.title} lead={PERFORMANCE.lead} />

        <div className="mt-16 divide-y divide-rule border-y border-rule">
          {PERFORMANCE.rows.map((r, i) => (
            <Reveal key={r.product} delay={i * 70}>
              <div className="grid grid-cols-1 items-center gap-6 py-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.3fr)_auto] lg:gap-12">
                <div>
                  <h3
                    className="font-display text-[1.125rem] tracking-[-0.015em]"
                    style={{ fontWeight: 600 }}
                  >
                    {r.product}
                  </h3>
                  <p className="mt-1 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-fg-3">
                    {r.meta}
                  </p>
                </div>

                <Ratio
                  usLabel={r.us.label}
                  usValue={r.us.value}
                  usN={r.us.n}
                  themLabel={r.them.label}
                  themValue={r.them.value}
                  themN={r.them.n}
                />

                <p
                  className="font-display tnum text-[clamp(2rem,4vw,2.75rem)] leading-none tracking-[-0.04em] text-chlor lg:text-right"
                  style={{ fontWeight: 700 }}
                >
                  {r.factor}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* El salto de escala: de la góndola al camión. */}
        <div className="mt-20 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-end lg:gap-16">
          <Reveal>
            <p className="max-w-[34rem] text-[1.0625rem] leading-relaxed text-fg-2">
              {PERFORMANCE.truck.lead}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="lg:text-right">
              <p
                className="font-display text-[clamp(3rem,9vw,6.5rem)] leading-[0.86] tracking-[-0.05em] text-chlor"
                style={{ fontWeight: 700 }}
              >
                <Counter to={PERFORMANCE.truck.value} duration={2000} />
              </p>
              <p className="mt-4 font-mono text-[0.75rem] uppercase tracking-[0.16em] text-fg-1">
                {PERFORMANCE.truck.label}
              </p>
              <p className="mt-2 text-[0.875rem] text-fg-3">
                {PERFORMANCE.truck.compare}
              </p>
              <p className="mt-4 inline-block rounded-sharp border border-chlor/35 bg-chlor/8 px-3 py-1.5 font-mono text-[0.75rem] uppercase tracking-[0.14em] text-chlor">
                {PERFORMANCE.truck.factor}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
