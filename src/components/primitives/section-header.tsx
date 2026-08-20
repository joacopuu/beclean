import { Reveal } from "./reveal";
import { cn } from "@/lib/utils";

/* Encabezado de sección: titular y bajada APILADOS en vertical.
   Nada de "titular grande a la izquierda, párrafo chico flotando en la
   esquina derecha": ese patrón es el tell más repetido de página generada.

   El `eyebrow` es opcional y está racionado a propósito. En toda la página
   se usa en dos secciones nada más, además del hero. */
export function SectionHeader({
  eyebrow,
  title,
  lead,
  className,
  align = "left",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: string;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "max-w-[46rem]",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-chlor">
            {eyebrow}
          </p>
        </Reveal>
      )}
      <Reveal delay={eyebrow ? 80 : 0}>
        <h2
          className="font-display text-[clamp(1.875rem,4vw,3rem)] leading-[1.08] tracking-[-0.032em]"
          style={{ fontWeight: 700, marginTop: eyebrow ? "1.25rem" : 0 }}
        >
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={eyebrow ? 160 : 80}>
          <p className="mt-5 max-w-[42rem] text-[1.0625rem] leading-relaxed text-fg-2">
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}
