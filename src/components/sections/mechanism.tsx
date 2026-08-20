import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { MECHANISM, CHEMISTRY } from "@/lib/content";
import { SectionHeader } from "@/components/primitives/section-header";
import { Reveal } from "@/components/primitives/reveal";

export function Mechanism() {
  return (
    <section id="mecanismo" className="shell py-24 lg:py-32">
      <SectionHeader title={MECHANISM.title} lead={MECHANISM.lead} />

      {/* Flujo de tres pasos con regla de continuidad. El paso no se rotula
          "Paso 1 / Paso 2": el propio contenido es la etiqueta. */}
      <ol className="mt-16 grid grid-cols-1 gap-px border border-rule bg-rule md:grid-cols-3">
        {MECHANISM.steps.map((s, i) => (
          <li key={s.title} className="bg-ink-900">
            <Reveal delay={i * 110} className="h-full p-7 lg:p-9">
              <div className="flex h-full flex-col">
                <div className="flex items-center gap-3">
                  <span
                    className="font-display tnum text-[2.5rem] leading-none tracking-[-0.04em] text-chlor"
                    style={{ fontWeight: 700 }}
                  >
                    {i + 1}
                  </span>
                  {i < MECHANISM.steps.length - 1 && (
                    <span
                      className="hidden h-px flex-1 bg-rule md:block"
                      aria-hidden="true"
                    />
                  )}
                </div>
                <h3
                  className="font-display mt-6 text-[1.375rem] tracking-[-0.02em]"
                  style={{ fontWeight: 600 }}
                >
                  {s.title}
                </h3>
                <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-fg-2">
                  {s.body}
                </p>
                <p className="mt-6 border-t border-rule-soft pt-4 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-chlor">
                  {s.meta}
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>

      {/* ── La química, en simple ─────────────────────────────
          Diagrama de transformación: sólido estable, más agua, biocida.
          Es la explicación del producto, no una ilustración. */}
      <div className="mt-24 grid grid-cols-1 gap-12 lg:mt-32 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] lg:gap-16">
        <Reveal>
          <figure className="relative aspect-[4/5] overflow-hidden rounded-sharp border border-rule">
            <Image
              src="/media/aplicacion-superficie.jpg"
              alt="Operario con guantes y equipo de protección desinfectando una superficie con solución preparada"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover opacity-85"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/25 to-transparent"
              aria-hidden="true"
            />
          </figure>
        </Reveal>

        <div className="flex flex-col justify-center">
          <Reveal>
            <h3
              className="font-display max-w-[20ch] text-[clamp(1.625rem,3.2vw,2.375rem)] leading-[1.1] tracking-[-0.03em]"
              style={{ fontWeight: 700 }}
            >
              {CHEMISTRY.title}
            </h3>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-fg-2">
              {CHEMISTRY.body}
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-10 grid grid-cols-1 items-stretch gap-4 sm:grid-cols-[1fr_auto_1fr]">
              <div className="rounded-sharp border border-rule bg-ink-800 p-6">
                <p
                  className="font-display text-[1.75rem] leading-none tracking-[-0.02em]"
                  style={{ fontWeight: 700 }}
                >
                  {CHEMISTRY.left.formula}
                </p>
                <p className="mt-4 text-[0.875rem] leading-snug text-fg-2">
                  {CHEMISTRY.left.caption}
                </p>
              </div>

              <div className="flex items-center justify-center gap-2 py-2 sm:flex-col sm:py-0">
                <span className="font-mono text-[0.75rem] text-chlor">+ H₂O</span>
                <ArrowRight
                  size={20}
                  weight="bold"
                  className="text-chlor sm:mt-1"
                  aria-hidden="true"
                />
              </div>

              <div className="rounded-sharp border border-chlor/35 bg-chlor/8 p-6">
                <p
                  className="font-display text-[1.75rem] leading-none tracking-[-0.02em] text-chlor"
                  style={{ fontWeight: 700 }}
                >
                  {CHEMISTRY.right.formula}
                </p>
                <p className="mt-4 text-[0.875rem] leading-snug text-fg-2">
                  {CHEMISTRY.right.caption}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
