"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "@phosphor-icons/react";
import { EVIDENCE, SPECTRUM } from "@/lib/content";
import { SectionHeader } from "@/components/primitives/section-header";
import { Reveal } from "@/components/primitives/reveal";

gsap.registerPlugin(ScrollTrigger);

/* Entrada cinematográfica del protocolo, adaptada del CinematicHero.
   Motivo de la animación: narrativa. El ensayo de la UBA es la prueba
   central del sitio, así que el panel LLEGA como un documento físico:
   sube desde abajo, se endereza en perspectiva y asienta.

   Diferencia deliberada con el componente original: NO se hace pin de
   la sección. El original secuestra 7000 px de scroll, y acá adentro hay
   una tabla que un evaluador de licitación necesita poder leer y copiar.
   Secuestrar el scroll sobre datos que el usuario vino a leer es hostil,
   así que la coreografía se gasta solo en la entrada. */
export function Evidence() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".doc-panel",
        { y: 140, scale: 0.94, rotateX: 14, autoAlpha: 0 },
        {
          y: 0,
          scale: 1,
          rotateX: 0,
          autoAlpha: 1,
          ease: "power3.out",
          duration: 1.1,
          scrollTrigger: {
            trigger: ".doc-panel",
            start: "top 88%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".doc-row",
        { y: 18, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          stagger: 0.05,
          ease: "power2.out",
          duration: 0.5,
          scrollTrigger: { trigger: ".doc-table", start: "top 85%", once: true },
        },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="evidencia" ref={root} className="shell py-24 lg:py-32">
      <SectionHeader
        eyebrow="Ensayo de tercero independiente"
        title={
          <>
            No es una promesa. <span className="text-chlor">Está medido.</span>
          </>
        }
        lead={EVIDENCE.lead}
      />

      {/* El documento */}
      <div className="mt-16" style={{ perspective: "1400px" }}>
        <div className="doc-panel overflow-hidden rounded-sharp border border-rule bg-ink-800">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)]">
            {/* Carátula */}
            <div className="relative border-b border-rule p-8 lg:border-b-0 lg:border-r lg:p-10">
              <Image
                src="/media/evidencia-ensayo.jpg"
                alt="Dos profesionales con equipo de protección realizando un análisis químico en laboratorio"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover opacity-20"
              />
              <div
                className="absolute inset-0 bg-gradient-to-br from-ink-800 via-ink-800/85 to-ink-800/55"
                aria-hidden="true"
              />
              <div className="relative">
                <h3
                  className="font-display max-w-[18ch] text-[1.375rem] leading-tight tracking-[-0.02em]"
                  style={{ fontWeight: 600 }}
                >
                  {EVIDENCE.docTitle}
                </h3>
                <dl className="mt-8 space-y-0 divide-y divide-rule-soft border-t border-rule-soft">
                  {EVIDENCE.meta.map((m) => (
                    <div
                      key={m.k}
                      className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3"
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
              </div>
            </div>

            {/* Resultados */}
            <div className="p-8 lg:p-10">
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-chlor">
                {EVIDENCE.tableCaption}
              </p>

              <div className="doc-table mt-6 -mx-2 overflow-x-auto px-2">
                <table className="w-full min-w-[34rem] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-rule">
                      {EVIDENCE.columns.map((c) => (
                        <th
                          key={c}
                          scope="col"
                          className="pb-3 pr-4 font-mono text-[0.625rem] font-medium uppercase tracking-[0.12em] text-fg-3 last:pr-0"
                        >
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-rule-soft">
                    {EVIDENCE.rows.map((r) => (
                      <tr key={r[0]} className="doc-row">
                        <td className="py-4 pr-4 text-[0.875rem] italic text-fg-1">
                          {r[0]}
                        </td>
                        <td className="tnum py-4 pr-4 text-[0.875rem] text-fg-2">
                          {r[1]}
                        </td>
                        <td className="tnum py-4 pr-4 text-[0.875rem] text-fg-2">
                          {r[2]}
                        </td>
                        <td className="tnum py-4 text-[0.875rem] font-semibold text-chlor">
                          {r[3]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="mt-8 border-t border-rule pt-6 text-[0.9375rem] leading-relaxed text-fg-2">
                {EVIDENCE.conclusion}
              </p>

              <a href={EVIDENCE.cta.href} className="btn btn--ghost mt-8">
                {EVIDENCE.cta.label}
                <ArrowRight size={16} weight="bold" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <Reveal>
        <p className="mt-6 max-w-[52rem] text-[0.8125rem] leading-relaxed text-fg-3">
          {EVIDENCE.disclaimer}
        </p>
      </Reveal>

      {/* Espectro y registros: tres grupos lógicos, no una lista de 17 ítems
          con una línea debajo de cada fila. */}
      <div className="mt-20 grid grid-cols-1 gap-px border border-rule bg-rule md:grid-cols-3">
        {[SPECTRUM.bacteria, SPECTRUM.virus, SPECTRUM.registries].map(
          (group, gi) => (
            <div key={group.title} className="bg-ink-900">
              <Reveal delay={gi * 100} className="h-full p-7">
                <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-chlor">
                  {group.title}
                </h3>
                <ul className="mt-5 space-y-2.5">
                  {group.items.map((it) => (
                    <li
                      key={it}
                      className="text-[0.875rem] leading-snug text-fg-2"
                    >
                      {it}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          ),
        )}
      </div>
    </section>
  );
}
