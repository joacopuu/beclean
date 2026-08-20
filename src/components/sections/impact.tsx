"use client";

import { IMPACT } from "@/lib/content";
import { SectionHeader } from "@/components/primitives/section-header";
import { Reveal } from "@/components/primitives/reveal";
import { Counter } from "@/components/primitives/counter";

export function Impact() {
  return (
    <section id="sustentabilidad" className="shell py-24 lg:py-32">
      <SectionHeader title={IMPACT.title} lead={IMPACT.lead} />

      {/* Cifras al aire, sin caja. A esta densidad la tarjeta no aporta
          jerarquía, solo ruido: alcanza con una línea divisoria. */}
      <div className="mt-16 grid grid-cols-1 gap-10 border-t border-rule pt-12 md:grid-cols-3 md:gap-8">
        {IMPACT.stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 110}>
            <p
              className="font-display text-[clamp(3rem,7vw,4.75rem)] leading-[0.86] tracking-[-0.05em] text-chlor"
              style={{ fontWeight: 700 }}
            >
              {"display" in s && s.display ? (
                s.display
              ) : (
                <>
                  <Counter to={s.value} />
                  {s.suffix}
                </>
              )}
            </p>
            <h3
              className="font-display mt-5 text-[1.0625rem] tracking-[-0.015em]"
              style={{ fontWeight: 600 }}
            >
              {s.label}
            </h3>
            <p className="mt-2 max-w-[30ch] text-[0.875rem] leading-relaxed text-fg-2">
              {s.body}
            </p>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <p className="mt-14 max-w-[52rem] border-t border-rule pt-6 text-[0.8125rem] leading-relaxed text-fg-3">
          {IMPACT.note}
        </p>
      </Reveal>
    </section>
  );
}
