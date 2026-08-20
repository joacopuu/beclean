"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BACKING, CERT_MARQUEE } from "@/lib/content";
import { SectionHeader } from "@/components/primitives/section-header";
import { Reveal } from "@/components/primitives/reveal";

gsap.registerPlugin(ScrollTrigger);

export function Backing() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Motivo de la animación: narrativa. La línea se dibuja de 1991 a
      // 2025 a medida que el lector recorre los treinta y cuatro años.
      gsap.fromTo(
        ".tl-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: ".tl-track",
            start: "top 72%",
            end: "bottom 72%",
            scrub: 0.6,
          },
        },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="respaldo" ref={root} className="border-t border-rule bg-ink-800">
      <div className="shell py-24 lg:py-32">
        <SectionHeader
          eyebrow="Laboratorio Pyam S.A."
          title={BACKING.title}
          lead={BACKING.lead}
        />

        {/* Línea de tiempo */}
        <div className="tl-track relative mt-16 pl-10 sm:pl-14">
          <div
            className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-rule sm:left-[11px]"
            aria-hidden="true"
          />
          <div
            className="tl-line absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-chlor sm:left-[11px]"
            aria-hidden="true"
          />

          <ol className="space-y-10">
            {BACKING.timeline.map((t, i) => (
              <li key={t.year} className="relative">
                <span
                  className="absolute -left-10 top-1.5 size-[15px] rounded-full border border-chlor bg-ink-800 sm:-left-14 sm:size-[23px]"
                  aria-hidden="true"
                />
                <Reveal delay={i * 60}>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-[6rem_minmax(0,1fr)] sm:gap-8">
                    <p
                      className="font-display tnum text-[1.25rem] leading-none tracking-[-0.02em] text-chlor"
                      style={{ fontWeight: 700 }}
                    >
                      {t.year}
                    </p>
                    <div className="max-w-[42rem]">
                      <h3
                        className="font-display text-[1.0625rem] tracking-[-0.015em]"
                        style={{ fontWeight: 600 }}
                      >
                        {t.title}
                      </h3>
                      <p className="mt-2 text-[0.9375rem] leading-relaxed text-fg-2">
                        {t.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        {/* Credenciales: dos columnas de pares clave/valor, no una lista
            de dieciséis filas con línea debajo de cada una. */}
        <div className="mt-20 grid grid-cols-1 gap-x-12 gap-y-6 border-t border-rule pt-12 md:grid-cols-2">
          {BACKING.credentials.map((c, i) => (
            <Reveal key={c.k} delay={i * 45}>
              <div className="grid grid-cols-1 gap-1 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-6">
                <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-chlor">
                  {c.k}
                </dt>
                <dd className="text-[0.875rem] leading-snug text-fg-2">{c.v}</dd>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Único marquee de la página. Motivo: amplitud. Son ocho credenciales
          que suman peso institucional pero no piden lectura individual. */}
      <div className="cert-marquee relative overflow-hidden border-y border-rule bg-ink-900 py-4">
        <div className="cert-track flex w-max gap-10 pr-10">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              className="flex shrink-0 items-center gap-10"
              aria-hidden={copy === 1}
            >
              {CERT_MARQUEE.map((c) => (
                <li
                  key={c}
                  className="whitespace-nowrap font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-fg-3"
                >
                  {c}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes cert-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .cert-track { animation: cert-scroll 46s linear infinite; }
        .cert-marquee:hover .cert-track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .cert-track { animation: none; }
          .cert-marquee { overflow-x: auto; }
        }
      `}</style>
    </section>
  );
}
