"use client";

import { useEffect, useRef, useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { NAV } from "@/lib/content";
import { cn } from "@/lib/utils";

/* Nav de una sola línea en desktop, altura 68px (tope del sistema: 80px).
   En móvil colapsa a hamburguesa: seis secciones no entran en 375px sin
   romper la línea, y un nav de dos líneas es diseño roto. */
export function SiteNav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);

  // El fondo del nav se opaca al salir del hero. Sin listener de scroll:
  // un centinela de 1px al tope de la página y un observer.
  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setSolid(!e.isIntersecting), {
      rootMargin: "-80px 0px 0px 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Escape cierra el menú móvil, y se bloquea el scroll de fondo.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div ref={sentinel} aria-hidden="true" className="absolute top-0 h-px w-full" />

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 h-[68px] transition-colors duration-300",
          solid
            ? "border-b border-rule bg-ink-900/85 backdrop-blur-xl"
            : "border-b border-transparent",
        )}
      >
        <div className="shell flex h-full items-center justify-between gap-6">
          <a
            href="#top"
            className="font-display -mx-2 inline-flex h-11 items-center px-2 text-[1.0625rem] tracking-tight"
            style={{ fontWeight: 700 }}
          >
            Be<span className="text-chlor">Clean</span>
          </a>

          <nav aria-label="Secciones" className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-[0.875rem] text-fg-2 transition-colors hover:text-fg-1"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a href="#contacto" className="btn btn--primary hidden sm:inline-flex">
              Solicitar cotización
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Abrir menú de secciones"
              aria-expanded={open}
              className="grid size-11 place-items-center rounded-sharp border border-rule text-fg-1 lg:hidden"
            >
              <List size={20} weight="bold" />
            </button>
          </div>
        </div>
      </header>

      {/* Menú móvil */}
      {open && (
        <div className="fixed inset-0 z-[60] bg-ink-900 lg:hidden">
          <div className="shell flex h-[68px] items-center justify-between">
            <span
              className="font-display text-[1.0625rem]"
              style={{ fontWeight: 700 }}
            >
              Be<span className="text-chlor">Clean</span>
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar menú"
              className="grid size-11 place-items-center rounded-sharp border border-rule"
            >
              <X size={20} weight="bold" />
            </button>
          </div>
          <nav aria-label="Secciones" className="shell mt-6">
            <ul className="flex flex-col">
              {NAV.map((n) => (
                <li key={n.href} className="border-b border-rule-soft">
                  <a
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="font-display block py-5 text-[1.75rem] tracking-tight"
                    style={{ fontWeight: 600 }}
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#contacto"
              onClick={() => setOpen(false)}
              className="btn btn--primary mt-8 w-full"
            >
              Solicitar cotización
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
