# BeClean

Dossier institucional de BeClean, la línea de limpieza y desinfección en tabletas
efervescentes de Laboratorio Pyam S.A.

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · GSAP · react-three-fiber

```bash
npm install
npm run dev
```

---

## Lectura de diseño

Esto no es una landing de producto de consumo. Es un dossier técnico cuyo lector es
un panel de compras hospitalario o un evaluador de licitación pública. Cada decisión
visual está subordinada a eso: **el dato es el producto**, y la animación solo se
justifica si ordena la lectura o cuenta el mecanismo.

Dials aplicados: `VARIANCE 7 · MOTION 6 · DENSITY 6`.

## Sistema

**Tema bloqueado en oscuro.** Una sola familia de superficies (`ink-900` a `ink-500`).
Ninguna sección se invierte a claro: la separación entre bandas se hace con elevación,
no cambiando de tema a mitad del scroll.

**Un solo acento**, `--chlor #5FE0CD`, en toda la página. `--legacy #C07A52` no es un
segundo acento de marca: es color funcional para "la vía tradicional" en las tablas
comparativas.

**Contraste medido** sobre `--ink-900`, todo por encima de AA:

| Token  | Ratio    | Uso                              |
| ------ | -------- | -------------------------------- |
| `fg-1` | 16,95:1  | Titulares y dato principal       |
| `fg-2` | 6,92:1   | Cuerpo de texto                  |
| `fg-3` | 5,64:1   | Notas al pie y etiquetas mono    |
| Botón primario | 11,97:1 | Tinta sobre cloro        |

**Tipografía.** Tres familias, cada una con un trabajo:

- **Archivo** (display): grotesca industrial de asta ancha. Sostiene las cifras grandes.
- **Geist** (cuerpo): aguanta párrafo técnico largo sin cansar.
- **JetBrains Mono** (dato): protocolos, ppm, UFC/carrier, registros. Cifras tabulares
  reales, que es lo que la tabla del ensayo necesita para no bailar.

Las tres se auto-hospedan vía `next/font`. Cero pedidos a servidores externos.

**Forma:** radio 2px en todo. Instrumento de precisión, no burbuja.

## Los dos componentes integrados

### `src/components/ui/tablet-dissolve.tsx`

Adaptación del componente `jelly-fish`. Se conservó el motor completo (react-three-fiber
+ GLSL propio, geometría generada en código, canvas transparente, uniform de tiempo
compartido, fresnel iridiscente, núcleo aditivo, anillo rígido que la cámara orbita) y
se cambió el sujeto: donde había una medusa magenta hay un comprimido efervescente
disolviéndose, con textura de polvo compactado, borde erosionado y una nube de 420
burbujas ascendentes resuelta con `Points` en vez de mallas.

El anillo de palabras del original se conservó como anillo de **etiquetas técnicas
chicas** (`NaDCC`, `+ H₂O → HOCl`, `EN 13697`, `5 min`, `300 ppm`, `3 años`), no como
tipografía display de 28vh: en un hero con titular, palabras gigantes orbitando compiten
con el mensaje.

Se carga con `next/dynamic` en el primer hueco de inactividad, para que el LCP lo marque
el titular en texto y no la escena WebGL.

### `src/components/sections/evidence.tsx`

Adaptación de la coreografía del `CinematicHero`: el protocolo de la UBA llega como
documento físico, subiendo desde abajo y enderezándose en perspectiva.

**Diferencia deliberada con el original:** no se hace `pin` de la sección. El componente
original secuestra 7000 px de scroll, y acá adentro hay una tabla de resultados que un
evaluador necesita poder leer y copiar. Secuestrar el scroll sobre datos que el usuario
vino a leer es hostil, así que la coreografía se gasta solo en la entrada.

El mockup de iPhone y los botones de App Store del original se descartaron: BeClean no
tiene aplicación, y una UI falsa construida con `<div>` es el tell más reconocible de
página generada.

## Animación

Toda animación de la página se puede justificar en una frase:

| Dónde        | Qué hace                             | Por qué                                    |
| ------------ | ------------------------------------ | ------------------------------------------ |
| Hero         | Tableta disolviéndose en WebGL       | Muestra el mecanismo antes de explicarlo   |
| Tesis        | Sticky-stack de tres cargos          | El problema se apila literalmente          |
| Rendimiento  | Barras que crecen al entrar en vista | Comparar longitudes es más legible que ×50 |
| Evidencia    | El documento llega y asienta         | La prueba central del sitio                |
| Respaldo     | La línea se dibuja de 1991 a 2025    | Recorre los treinta y cuatro años          |
| Impacto      | Contadores                           | Detiene el ojo en la cifra                 |
| Certificados | Marquee (el único de la página)      | Amplitud sin pedir lectura individual      |

Nada usa `window.addEventListener("scroll")`: todo va por `IntersectionObserver` o
ScrollTrigger. Todo colapsa bajo `prefers-reduced-motion`.

## Contenido

Toda la copia vive en `src/lib/content.ts`, tipada y en un solo lugar. Está portada
literal del sitio anterior: es la voz institucional del cliente y cada número está
respaldado por ensayo, registro o pliego. Los IDs de sección (`#tesis`, `#mecanismo`,
`#evidencia`...) se mantuvieron para no romper enlaces que ya circulan.

## Medios

`MEDIA.md` documenta la biblioteca completa con licencias. Las seis imágenes en
`public/media/` son Pexels License (uso comercial libre, sin atribución obligatoria) y
están auto-hospedadas. `next/image` las sirve en WebP/AVIF: la foto del ensayo pasa de
343 KB en JPEG a 54 KB a 1200px de ancho.

## Lo que falta y no se puede resolver con banco de imágenes

1. **Fotografía de producto.** Es el hueco más grande: hoy no hay una sola foto de los
   potes de 80/100/140 tabletas ni de la tableta suelta. Hay que producirla.
2. **Planta de Gualeguaychú** para la sección de respaldo.
3. **Certificados** ANMAT, ISO 9001 UKAS y GMP como documento fotografiado.
4. **Logos institucionales** (UNICEF, Ministerio de Salud, Unilever, Diversey, Ecolab).
   Son marcas de terceros: nombrarlos en texto es seguro, mostrar sus logos requiere
   autorización. Por eso hoy están como texto y no como muro de logos.
5. **Formulario de contacto real.** El cierre usa `mailto:` y `tel:`, igual que la
   versión anterior. Un formulario de verdad necesita un endpoint, que es una decisión
   de infraestructura, no de diseño.
6. **Video de hero.** `MEDIA.md` lista el clip de Pexels 4482096 (tableta efervescente
   disolviéndose). Hoy el hero usa la escena WebGL, que pesa menos y no necesita
   descarga; el video queda como alternativa si se prefiere imagen real.

## Verificación

```bash
npm run lint      # limpio
npx tsc --noEmit  # limpio
npm run build     # prerenderizado estático
```

Medido en el navegador: sin scroll horizontal a 375px, CTA del hero visible sin
scrollear, todos los objetivos táctiles ≥44px, nav en una línea a 68px de alto, cero
guiones largos en texto visible.

`legacy/index.html` conserva la versión anterior en HTML plano como referencia de
contenido.
