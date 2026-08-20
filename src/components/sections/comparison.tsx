import { Check, X } from "@phosphor-icons/react/dist/ssr";
import { COMPARISON } from "@/lib/content";
import { Reveal } from "@/components/primitives/reveal";

export function Comparison() {
  return (
    <section className="border-y border-rule bg-ink-800">
      <div className="shell py-24 lg:py-32">
        <Reveal>
          <h2
            className="font-display max-w-[22ch] text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.08] tracking-[-0.03em]"
            style={{ fontWeight: 700 }}
          >
            {COMPARISON.title}
          </h2>
        </Reveal>

        {/* Comparativa a dos columnas. Una sola dirección de línea entre
            filas, no marco completo en cada una. La columna Mediclean va
            tintada para que se lea de un vistazo cuál es cuál. */}
        <Reveal delay={100}>
          <div className="mt-12 -mx-2 overflow-x-auto px-2">
            <table className="w-full min-w-[38rem] border-collapse text-left">
              <caption className="sr-only">
                Comparación entre Mediclean en tableta y lavandina líquida de
                primera marca
              </caption>
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="w-[38%] pb-4 pr-6 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-fg-3"
                  >
                    {COMPARISON.columns[0]}
                  </th>
                  <th
                    scope="col"
                    className="w-[31%] border-x border-chlor/25 bg-chlor/8 px-6 pb-4 pt-4 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-chlor"
                  >
                    {COMPARISON.columns[1]}
                  </th>
                  <th
                    scope="col"
                    className="w-[31%] px-6 pb-4 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-fg-3"
                  >
                    {COMPARISON.columns[2]}
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.rows.map(([criterio, us, them]) => (
                  <tr key={criterio} className="border-t border-rule-soft">
                    <th
                      scope="row"
                      className="py-4 pr-6 text-[0.875rem] font-normal text-fg-2"
                    >
                      {criterio}
                    </th>
                    <td className="border-x border-chlor/25 bg-chlor/8 px-6 py-4">
                      <span className="flex items-start gap-2 text-[0.875rem] text-fg-1">
                        <Check
                          size={15}
                          weight="bold"
                          className="mt-1 shrink-0 text-chlor"
                          aria-hidden="true"
                        />
                        {us}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-start gap-2 text-[0.875rem] text-fg-2">
                        <X
                          size={15}
                          weight="bold"
                          className="mt-1 shrink-0 text-legacy"
                          aria-hidden="true"
                        />
                        {them}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        {/* Sin CTA propio a propósito: la sección de evidencia, apenas más
            arriba, ya ofrece la documentación técnica, y repetir el mismo
            pedido con otra etiqueta solo diluye la intención. */}
      </div>
    </section>
  );
}
