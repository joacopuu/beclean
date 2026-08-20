import { ArrowRight, EnvelopeSimple, Phone } from "@phosphor-icons/react/dist/ssr";
import { CONTACT } from "@/lib/content";
import { Reveal } from "@/components/primitives/reveal";

export function SiteFooter() {
  return (
    <footer id="contacto" className="relative overflow-hidden">
      <div
        className="lab-grid pointer-events-none absolute inset-0 opacity-60"
        aria-hidden="true"
      />

      <div className="shell relative py-24 lg:py-32">
        <Reveal>
          <h2
            className="font-display max-w-[16ch] text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.02] tracking-[-0.04em]"
            style={{ fontWeight: 700 }}
          >
            Revolucionemos la limpieza{" "}
            <span className="text-chlor">juntos.</span>
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <p className="mt-7 max-w-[38rem] text-[1.0625rem] leading-relaxed text-fg-2">
            {CONTACT.body}
          </p>
        </Reveal>

        <Reveal delay={190}>
          <div className="mt-11 flex flex-col gap-3 sm:flex-row">
            <a
              href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(
                "Consulta comercial BeClean",
              )}`}
              className="btn btn--primary"
            >
              Solicitar cotización
              <ArrowRight size={17} weight="bold" />
            </a>
            <a href={`tel:${CONTACT.phoneHref}`} className="btn btn--ghost">
              <Phone size={17} weight="bold" aria-hidden="true" />
              {CONTACT.phone}
            </a>
          </div>
        </Reveal>

        {/* Datos de contacto */}
        <div className="mt-20 grid grid-cols-1 gap-10 border-t border-rule pt-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p
              className="font-display text-[1.125rem] tracking-tight"
              style={{ fontWeight: 700 }}
            >
              Be<span className="text-chlor">Clean</span>
            </p>
            <p className="mt-4 max-w-[28ch] text-[0.8125rem] leading-relaxed text-fg-3">
              {CONTACT.footer}
            </p>
          </div>

          <div>
            <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-chlor">
              Contacto
            </h3>
            <address className="mt-4 space-y-1 text-[0.875rem] not-italic leading-relaxed text-fg-2">
              {CONTACT.address.map((l) => (
                <p key={l}>{l}</p>
              ))}
            </address>
          </div>

          <div>
            <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-chlor">
              Directo
            </h3>
            {/* min-h-11 (44px) en cada enlace: son los dos objetivos táctiles
                más chicos de la página y en móvil quedaban en 23px. */}
            <ul className="mt-2 text-[0.875rem] text-fg-2">
              <li>
                <a
                  href={`tel:${CONTACT.phoneHref}`}
                  className="inline-flex min-h-11 items-center gap-2 py-1 transition-colors hover:text-chlor"
                >
                  <Phone size={14} weight="bold" aria-hidden="true" />
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="inline-flex min-h-11 items-center gap-2 break-all py-1 transition-colors hover:text-chlor"
                >
                  <EnvelopeSimple size={14} weight="bold" aria-hidden="true" />
                  {CONTACT.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-chlor">
              Planta
            </h3>
            <p className="mt-4 max-w-[26ch] text-[0.875rem] leading-relaxed text-fg-2">
              {CONTACT.plant}
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-rule pt-6 text-[0.75rem] text-fg-3 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Laboratorio Pyam S.A. Todos los derechos
            reservados.
          </p>
          <p>Registros ANMAT vigentes. Productos de venta profesional.</p>
        </div>
      </div>
    </footer>
  );
}
