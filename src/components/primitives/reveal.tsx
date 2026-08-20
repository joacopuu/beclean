"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/* IntersectionObserver, nunca un listener de scroll: el observer no
   corre en cada frame y el navegador lo agrupa por su cuenta. */
export function useInView<T extends HTMLElement>(amount = 0.25) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // No hace falta un atajo por reduced-motion acá: globals.css ya deja
    // `.reveal` en opacidad 1 y sin transform bajo esa preferencia, así que
    // el contenido se ve aunque el observer nunca dispare.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: amount },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [amount]);

  return { ref, inView };
}

/* Revelado escalonado de entrada. Motivo: jerarquía. Ordena la lectura
   de una sección densa, para que el ojo entre por el titular y no por
   la fila 7 de una tabla. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.18);
  return (
    <div
      ref={ref}
      className={cn("reveal", inView && "is-in", className)}
      style={{ "--d": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
