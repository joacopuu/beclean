import { Plus } from "@phosphor-icons/react/dist/ssr";
import { FAQ } from "@/lib/content";
import { Reveal } from "@/components/primitives/reveal";

/* Acordeón sobre <details>/<summary> nativos: navegación por teclado,
   semántica de expandido y búsqueda en página funcionan sin una línea
   de JavaScript, y sin arrastrar una dependencia de componente. */
export function Faq() {
  return (
    <section id="faq" className="border-y border-rule bg-ink-800">
      <div className="shell py-24 lg:py-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal>
            <h2
              className="font-display text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.1] tracking-[-0.03em] lg:sticky lg:top-28"
              style={{ fontWeight: 700 }}
            >
              {FAQ.title}
            </h2>
          </Reveal>

          <div className="divide-y divide-rule border-y border-rule">
            {FAQ.items.map((item, i) => (
              <Reveal key={item.q} delay={i * 55}>
                <details className="faq-item group">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-left [&::-webkit-details-marker]:hidden">
                    <span className="text-[1rem] leading-snug text-fg-1 transition-colors group-hover:text-chlor">
                      {item.q}
                    </span>
                    <Plus
                      size={18}
                      weight="bold"
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-chlor transition-transform duration-300 group-open:rotate-45"
                    />
                  </summary>
                  <div className="pb-7 pr-10">
                    <p className="max-w-[46rem] text-[0.9375rem] leading-relaxed text-fg-2">
                      {item.a}
                    </p>
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
