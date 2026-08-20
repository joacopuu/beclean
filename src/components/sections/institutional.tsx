import { ArrowRight, Seal } from "@phosphor-icons/react/dist/ssr";
import { INSTITUTIONAL } from "@/lib/content";
import { Reveal } from "@/components/primitives/reveal";

/* Prueba institucional. Familia de layout propia: declaración a la
   izquierda, expediente a la derecha como ficha de registro. */
export function Institutional() {
  return (
    <section className="shell py-24 lg:py-32">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-16">
        <div className="flex flex-col justify-center">
          <Reveal>
            <h2
              className="font-display max-w-[19ch] text-[clamp(1.875rem,4.2vw,3rem)] leading-[1.06] tracking-[-0.033em]"
              style={{ fontWeight: 700 }}
            >
              {INSTITUTIONAL.title}
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-7 max-w-[38rem] text-[1.0625rem] leading-relaxed text-fg-2">
              {INSTITUTIONAL.body}
            </p>
          </Reveal>
          <Reveal delay={190}>
            <a href={INSTITUTIONAL.cta.href} className="btn btn--primary mt-9 self-start">
              {INSTITUTIONAL.cta.label}
              <ArrowRight size={17} weight="bold" />
            </a>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="rounded-sharp border border-chlor/25 bg-chlor/6 p-7 lg:p-9">
            <div className="flex items-start gap-3">
              <Seal
                size={20}
                weight="fill"
                className="mt-0.5 shrink-0 text-chlor"
                aria-hidden="true"
              />
              <div>
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-chlor">
                  {INSTITUTIONAL.docLabel}
                </p>
                <h3
                  className="font-display mt-2 text-[1.125rem] leading-snug tracking-[-0.015em]"
                  style={{ fontWeight: 600 }}
                >
                  {INSTITUTIONAL.docTitle}
                </h3>
              </div>
            </div>

            <dl className="mt-8 divide-y divide-rule-soft border-t border-rule-soft">
              {INSTITUTIONAL.meta.map((m) => (
                <div
                  key={m.k}
                  className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3.5"
                >
                  <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-fg-3">
                    {m.k}
                  </dt>
                  <dd className="tnum text-right text-[0.875rem] text-fg-1">
                    {m.v}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-6 text-[0.8125rem] leading-relaxed text-fg-3">
              {INSTITUTIONAL.note}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
