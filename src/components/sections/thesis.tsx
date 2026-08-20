"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { THESIS_STEPS, THESIS_RESOLVE } from "@/lib/content";
import { Reveal } from "@/components/primitives/reveal";

gsap.registerPlugin(ScrollTrigger);

/* Sticky-stack. Motivo de la animación: narrativa.
   Los tres cargos contra la industria no son una lista, son una acumulación:
   cada uno queda fijo mientras el siguiente se le monta encima, y el problema
   se apila literalmente delante del lector. Al final la pila cede y aparece
   la resolución. */
export function Thesis() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".thesis-card");

      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          endTrigger: cards[cards.length - 1],
          end: "top top",
          pin: true,
          pinSpacing: false,
        });
        gsap.to(card, {
          scale: 0.94,
          opacity: 0.35,
          ease: "none",
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="tesis" ref={root} className="relative">
      <div className="relative">
        {THESIS_STEPS.map((s, i) => (
          <div
            key={s.n}
            className="thesis-card sticky top-0 flex min-h-[100dvh] items-center border-t border-rule bg-ink-900"
          >
            <div className="shell grid w-full grid-cols-1 items-center gap-10 py-20 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-16">
              <p
                className="font-display tnum select-none text-[clamp(4rem,14vw,11rem)] leading-[0.8] tracking-[-0.05em] text-chlor/15"
                style={{ fontWeight: 700 }}
                aria-hidden="true"
              >
                {s.n}
              </p>
              <div className="max-w-[38rem]">
                <h2
                  className="font-display text-[clamp(1.75rem,4.4vw,3.25rem)] leading-[1.06] tracking-[-0.032em]"
                  style={{ fontWeight: 700 }}
                >
                  {s.title}
                </h2>
                <p className="mt-6 text-[1.0625rem] leading-relaxed text-fg-2">
                  {s.body}
                </p>
                {/* Barra de proporción: el 95 % de un bidón es agua. Es dato,
                    no decoración, y solo aparece en el primer cargo. */}
                {i === 0 && (
                  <div className="mt-9 max-w-[26rem]">
                    <div className="flex h-9 w-full overflow-hidden rounded-sharp border border-rule">
                      <div className="flex w-[95%] items-center justify-center bg-chlor/12 text-[0.6875rem] font-mono uppercase tracking-[0.16em] text-chlor">
                        95 % agua
                      </div>
                      <div className="flex-1 bg-chlor" />
                    </div>
                    <p className="mt-3 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-fg-3">
                      Lo blanco es lo único que limpia
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* La resolución. Cambia de superficie dentro de la misma familia
          oscura: eleva, no invierte el tema. */}
      <div className="relative border-y border-rule bg-ink-800">
        <div
          className="lab-grid pointer-events-none absolute inset-0 opacity-60"
          aria-hidden="true"
        />
        <div className="shell relative py-24 lg:py-32">
          <Reveal>
            <h2
              className="font-display max-w-[24ch] text-[clamp(2rem,5vw,3.75rem)] leading-[1.04] tracking-[-0.035em]"
              style={{ fontWeight: 700 }}
            >
              BeClean saca el agua de{" "}
              <span className="text-chlor">la ecuación.</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-7 max-w-[40rem] text-[1.0625rem] leading-relaxed text-fg-2">
              {THESIS_RESOLVE.body}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
