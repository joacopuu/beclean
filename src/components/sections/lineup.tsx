import { LINEUP } from "@/lib/content";
import { SectionHeader } from "@/components/primitives/section-header";
import { Reveal } from "@/components/primitives/reveal";
import { cn } from "@/lib/utils";

type Product = {
  badge: string;
  name: string;
  body: string;
  specs: readonly (readonly [string, string])[];
};

function ProductCard({
  p,
  featured = false,
}: {
  p: Product;
  featured?: boolean;
}) {
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-sharp border p-6 lg:p-7",
        featured
          ? "border-chlor/30 bg-chlor/6"
          : "border-rule bg-ink-800",
      )}
    >
      <p
        className={cn(
          "font-mono text-[0.625rem] uppercase tracking-[0.16em]",
          featured ? "text-chlor" : "text-fg-3",
        )}
      >
        {p.badge}
      </p>
      <h3
        className="font-display mt-4 text-[1.25rem] leading-snug tracking-[-0.02em]"
        style={{ fontWeight: 600 }}
      >
        {p.name}
      </h3>
      <p className="mt-3 flex-1 text-[0.875rem] leading-relaxed text-fg-2">
        {p.body}
      </p>
      <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-rule pt-5">
        {p.specs.map(([k, v]) => (
          <div key={k}>
            <dt className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-fg-3">
              {k}
            </dt>
            <dd className="tnum mt-1 text-[0.875rem] text-fg-1">{v}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

export function Lineup() {
  return (
    <section id="linea" className="shell py-24 lg:py-32">
      <SectionHeader title={LINEUP.title} lead={LINEUP.lead} />

      {/* Limpieza cotidiana: cuatro productos, cuatro celdas. */}
      <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {LINEUP.cleaners.map((p, i) => (
          <Reveal key={p.name} delay={i * 80} className="h-full">
            <ProductCard p={p as Product} />
          </Reveal>
        ))}
      </div>

      {/* Desinfección hospitalaria: tres productos destacados, más el
          bloque de composición. Cuatro celdas, cuatro contenidos: la
          grilla no queda con un hueco vacío al final. */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-4">
        {LINEUP.disinfectants.map((p, i) => (
          <Reveal key={p.name} delay={i * 80} className="h-full">
            <ProductCard p={p as Product} featured />
          </Reveal>
        ))}

        <Reveal delay={240} className="h-full">
          <article className="flex h-full flex-col rounded-sharp border border-rule bg-ink-800 p-6 lg:p-7">
            <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-fg-3">
              {LINEUP.formula.title}
            </p>
            <h3
              className="font-display mt-4 text-[1.25rem] leading-snug tracking-[-0.02em]"
              style={{ fontWeight: 600 }}
            >
              {LINEUP.formula.label}
            </h3>
            <p className="mt-3 flex-1 text-[0.875rem] leading-relaxed text-fg-2">
              {LINEUP.formula.body}
            </p>
            <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-rule pt-5">
              {LINEUP.formula.specs.map(([k, v]) => (
                <div key={k}>
                  <dt className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-fg-3">
                    {k}
                  </dt>
                  <dd className="mt-1 text-[0.875rem] text-fg-1">{v}</dd>
                </div>
              ))}
            </dl>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
