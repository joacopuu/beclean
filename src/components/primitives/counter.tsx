"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "./reveal";
import { cn } from "@/lib/utils";

/* Contador de entrada. Motivo: jerarquía. Las cifras de impacto
   (98 % menos CO₂, 3.072.000 usos por camión) son el argumento de la
   sección; el conteo obliga al ojo a detenerse en el número.
   Corre una sola vez, con rAF, y jamás toca estado por frame fuera
   del propio valor mostrado. */
export function Counter({
  to,
  duration = 1600,
  className,
  format = (n: number) => n.toLocaleString("es-AR"),
}: {
  to: number;
  duration?: number;
  className?: string;
  format?: (n: number) => string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.5);
  const [value, setValue] = useState(0);
  const raf = useRef<number>(0);

  useEffect(() => {
    if (!inView) return;

    // Con reduced-motion la duración es cero: el primer frame ya escribe el
    // valor final. Así no hay un setState síncrono dentro del efecto, que
    // dispara renders en cascada, y el número igual aparece completo.
    const dur = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? 0
      : duration;

    const start = performance.now();
    const tick = (now: number) => {
      const p = dur === 0 ? 1 : Math.min((now - start) / dur, 1);
      // easeOutExpo: arranca rápido y asienta, no frena de golpe.
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setValue(Math.round(to * eased));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={cn("tnum", className)}>
      {format(value)}
    </span>
  );
}
