"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { HERO, HERO_STATS } from "@/lib/content";
import { Reveal } from "@/components/primitives/reveal";

/* three.js pesa. Se carga en cliente y después del primer pintado, así el
   LCP lo marca el titular (texto, instantáneo) y no la escena WebGL. */
const TabletDissolve = dynamic(
  () => import("@/components/ui/tablet-dissolve").then((m) => m.TabletDissolve),
  { ssr: false },
);

export function Hero() {
  const [reduced, setReduced] = useState(false);
  const [mountCanvas, setMountCanvas] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);

    // La preferencia se lee dentro del callback diferido, junto con el
    // montaje del canvas, y no de forma síncrona en el efecto: así no se
    // encadena un render extra antes del primer pintado.
    const startCanvas = () => {
      setReduced(mq.matches);
      setMountCanvas(true);
    };

    // Se monta en el primer hueco de inactividad, para no competir con
    // el pintado del texto del hero. El `timeout` no es opcional: sin él,
    // requestIdleCallback puede quedar postergado para siempre (por ejemplo
    // si la pestaña carga en segundo plano) y el canvas no monta nunca.
    let idleId: number | undefined;
    let timerId: ReturnType<typeof setTimeout> | undefined;

    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(startCanvas, { timeout: 1200 });
    } else {
      timerId = setTimeout(startCanvas, 400);
    }

    return () => {
      mq.removeEventListener("change", onChange);
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timerId !== undefined) clearTimeout(timerId);
    };
  }, []);

  return (
    <section id="top" className="relative min-h-[100dvh] overflow-hidden pt-[68px]">
      <div className="lab-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />

      {/* Split asimétrico: texto a la izquierda, producto a la derecha.
          Nada de hero centrado, que es el default de todo sitio generado. */}
      <div className="shell relative grid min-h-[calc(100dvh-68px)] grid-cols-1 items-center gap-8 pt-16 pb-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-12 lg:pt-24 lg:pb-24">
        <div className="relative z-10 max-w-[38rem]">
          <Reveal>
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-chlor">
              {HERO.kicker}
            </p>
          </Reveal>

          <Reveal delay={90}>
            <h1
              className="font-display mt-6 text-[clamp(2.5rem,6.2vw,4.25rem)] leading-[1.02] tracking-[-0.035em]"
              style={{ fontWeight: 700 }}
            >
              {HERO.title[0]}
              <br />
              <span className="text-chlor">{HERO.title[1]}</span>
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-7 max-w-[34rem] text-[1.0625rem] leading-relaxed text-fg-2">
              {HERO.lead}
            </p>
          </Reveal>

          <Reveal delay={270}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href={HERO.ctaPrimary.href} className="btn btn--primary">
                {HERO.ctaPrimary.label}
                <ArrowRight size={17} weight="bold" />
              </a>
              <a href={HERO.ctaSecondary.href} className="btn btn--ghost">
                {HERO.ctaSecondary.label}
              </a>
            </div>
          </Reveal>
        </div>

        {/* La tableta disolviéndose. Motivo de la animación: narrativa.
            Es el mecanismo del producto, mostrado antes de explicarlo. */}
        <div
          className="relative h-[42vh] min-h-[300px] w-full lg:h-[68vh]"
          aria-hidden="true"
        >
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(circle at 52% 46%, rgba(95,224,205,0.16) 0%, transparent 62%)",
            }}
          />
          {mountCanvas && <TabletDissolve reduced={reduced} />}
        </div>
      </div>
    </section>
  );
}

/* Franja de cifras: vive DEBAJO del hero, no dentro. El hero es la
   propuesta de valor y el CTA, nada más. */
export function HeroStats() {
  return (
    <section className="border-y border-rule bg-ink-800">
      <div className="shell grid grid-cols-1 divide-y divide-rule sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
        {HERO_STATS.map((s, i) => (
          <Reveal
            key={s.value}
            delay={i * 80}
            className="py-8 sm:px-6 lg:py-10 lg:first:pl-0 lg:last:pr-0"
          >
            <p
              className="font-display tnum text-[clamp(1.75rem,3.2vw,2.5rem)] leading-none tracking-[-0.03em] text-chlor"
              style={{ fontWeight: 700 }}
            >
              {s.value}
            </p>
            <p className="mt-3 max-w-[22ch] text-[0.875rem] leading-snug text-fg-2">
              {s.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
