"use client";

/* ============================================================
   TabletDissolve: tableta efervescente procedural en WebGL.

   Adaptado del motor del componente "jelly-fish": misma técnica
   (react-three-fiber + GLSL propio, geometría generada en código,
   canvas transparente, un único uniform de tiempo compartido),
   pero el sujeto es el producto real en vez de una medusa.

   Qué se conserva del original:
     · el hook de tiempo único que sincroniza todos los shaders
     · el fresnel + rim iridiscente sobre cuerpo translúcido
     · el núcleo aditivo interno como fuente de luz
     · la disolución por ventana de altura en el fragment shader
     · el anillo rígido de etiquetas que la cámara orbita

   Qué cambia:
     · la campana pasa a ser un comprimido cilíndrico con textura
       de polvo compactado y borde erosionado
     · los tentáculos pasan a ser una nube de burbujas ascendentes
     · la paleta magenta/lavanda pasa al eje cloro (teal) de marca
     · las palabras del anillo son dato técnico, no decoración
   ============================================================ */

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/* Un solo valor de tiempo alimenta todos los shaders, así el
   comprimido, las burbujas y el halo laten en fase. */
function useTime() {
  const t = useRef({ value: 0 });
  useFrame((s) => {
    t.current.value = s.clock.elapsedTime;
  });

  // Excepción consciente a react-hooks/refs, la única del proyecto.
  // Un uniform de three.js es, por contrato de la librería, una caja mutable
  // compartida con la GPU: se crea una vez, se escribe por frame fuera del
  // ciclo de render de React y se pasa por referencia a cada material. Las
  // reglas de pureza no modelan ese límite. Probado antes con useMemo y con
  // useState: ambos disparan react-hooks/immutability por la misma razón de
  // fondo, así que useRef es el hook semánticamente correcto y esto queda
  // acotado a una línea en lugar de esparcirse por los materiales.
  // eslint-disable-next-line react-hooks/refs
  return t.current;
}

/* PRNG determinista (mulberry32). Reemplaza a Math.random para que la
   nube de burbujas sea idéntica en cada render y entre servidor y
   cliente: una escena reproducible se puede depurar, una aleatoria no. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ── El comprimido ─────────────────────────────────────────── */

const TABLET_VERT = /* glsl */ `
  varying vec3 vPos;
  varying vec3 vNormal;
  varying vec3 vView;
  void main(){
    vPos = position;
    vNormal = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vView = -mv.xyz;
    gl_Position = projectionMatrix * mv;
  }
`;

const TABLET_FRAG = /* glsl */ `
  precision highp float;
  uniform float uTime;
  varying vec3 vPos;
  varying vec3 vNormal;
  varying vec3 vView;

  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    float a = hash(i), b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  void main(){
    vec3 N = normalize(vNormal);
    vec3 V = normalize(vView);
    float fres = pow(1.0 - max(dot(N, V), 0.0), 2.2);

    float ang = atan(vPos.z, vPos.x);
    float r   = length(vPos.xz);
    // altura normalizada dentro del comprimido: 1 arriba, 0 abajo
    float h   = clamp((vPos.y + 0.16) / 0.32, 0.0, 1.0);

    // Cuerpo: blanco farmacéutico levemente frío, no blanco puro.
    vec3 body = vec3(0.88, 0.94, 0.93);
    vec3 cool = vec3(0.62, 0.83, 0.80);
    vec3 col  = mix(cool, body, smoothstep(0.0, 0.7, h));

    // Textura de polvo compactado: grano fino sobre cara y canto.
    float grain = noise(vec2(ang * 26.0, vPos.y * 90.0 + r * 40.0));
    col *= 0.90 + grain * 0.20;

    // Ranura de compresión en la cara superior, como todo comprimido real.
    float score = smoothstep(0.014, 0.0, abs(vPos.z)) * step(0.13, vPos.y) * step(r, 0.62);
    col = mix(col, col * 0.62, score);

    // Erosión efervescente: el borde inferior se pica y se come.
    // La ventana sube muy lento, así el comprimido parece consumirse.
    float bite = noise(vec2(ang * 9.0, uTime * 0.22));
    float erosion = smoothstep(0.34 + bite * 0.20, 0.0, h);
    col = mix(col, vec3(0.42, 0.78, 0.74), erosion * 0.55);

    // Picado de superficie donde el agua ya atacó.
    float pit = smoothstep(0.55, 0.95, noise(vec2(ang * 16.0, h * 20.0 - uTime * 0.35)));
    col = mix(col, vec3(0.36, 0.72, 0.69), pit * erosion * 0.7);

    // Rim de cloro: el halo que delata que está liberando activo.
    col += fres * vec3(0.18, 0.58, 0.53);

    float alpha = 0.82 + fres * 0.18 - erosion * 0.28;
    gl_FragColor = vec4(col, clamp(alpha, 0.0, 1.0));
  }
`;

function Tablet({ time }: { time: { value: number } }) {
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: TABLET_VERT,
        fragmentShader: TABLET_FRAG,
        uniforms: { uTime: time },
        transparent: true,
        side: THREE.DoubleSide,
      }),
    [time],
  );
  // Cilindro chato con canto redondeado: la forma real de una tableta
  // efervescente de 2,5 g.
  return (
    <mesh material={mat} castShadow={false}>
      <cylinderGeometry args={[0.68, 0.68, 0.3, 96, 8]} />
    </mesh>
  );
}

/* ── El halo de activo liberado ────────────────────────────── */

function Halo() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((s) => {
    // Pulso lento: la liberación no es constante, viene en oleadas.
    const k = 1 + Math.sin(s.clock.elapsedTime * 0.9) * 0.06;
    ref.current.scale.setScalar(k);
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.95, 32, 32]} />
      <meshBasicMaterial
        color="#5fe0cd"
        transparent
        opacity={0.13}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}

/* ── Las burbujas ──────────────────────────────────────────
   Sistema de puntos, no mallas instanciadas: una tableta
   efervescente suelta cientos de burbujas y con Points esto
   cuesta una fracción del presupuesto de frame. */

const BUBBLE_COUNT = 420;

const BUBBLE_VERT = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  attribute float aSeed;
  attribute float aSpeed;
  attribute float aSize;
  varying float vFade;

  void main(){
    vec3 p = position;

    // Ascenso continuo con reciclado por módulo: la burbuja que sale
    // por arriba vuelve a nacer en el comprimido.
    float life = fract(uTime * aSpeed + aSeed);
    p.y = -0.18 + life * 2.6;

    // Deriva lateral: las burbujas no suben rectas, zigzaguean.
    float w = aSeed * 6.2831;
    p.x += sin(uTime * 0.9 + w) * 0.11 * life;
    p.z += cos(uTime * 0.75 + w * 1.3) * 0.11 * life;

    // Se abren en cono a medida que suben.
    p.xz *= 1.0 + life * 0.75;

    // Entra rápido, se desvanece cerca del final del recorrido.
    vFade = smoothstep(0.0, 0.06, life) * (1.0 - smoothstep(0.62, 1.0, life));

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    // Las burbujas nuevas son chicas y crecen al despresurizarse.
    gl_PointSize = aSize * uPixelRatio * (0.45 + life * 0.9) * (26.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const BUBBLE_FRAG = /* glsl */ `
  precision mediump float;
  varying float vFade;
  void main(){
    // Disco con borde brillante y centro hueco: lee como burbuja,
    // no como partícula sólida.
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;
    float rim   = smoothstep(0.5, 0.34, d) - smoothstep(0.34, 0.14, d);
    float inner = smoothstep(0.5, 0.0, d) * 0.22;
    float a = (rim * 0.85 + inner) * vFade;
    gl_FragColor = vec4(vec3(0.72, 0.95, 0.91), a);
  }
`;

function Bubbles({ time }: { time: { value: number } }) {
  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(BUBBLE_COUNT * 3);
    const seed = new Float32Array(BUBBLE_COUNT);
    const speed = new Float32Array(BUBBLE_COUNT);
    const size = new Float32Array(BUBBLE_COUNT);

    const rand = mulberry32(0x8ec1ea7);
    for (let i = 0; i < BUBBLE_COUNT; i++) {
      // Nacen en el canto del comprimido, que es donde efervesce.
      const a = rand() * Math.PI * 2;
      const r = 0.16 + rand() * 0.5;
      pos[i * 3] = Math.cos(a) * r;
      pos[i * 3 + 1] = 0;
      pos[i * 3 + 2] = Math.sin(a) * r;
      seed[i] = rand();
      speed[i] = 0.08 + rand() * 0.16;
      size[i] = 1.2 + rand() * 3.6;
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    g.setAttribute("aSpeed", new THREE.BufferAttribute(speed, 1));
    g.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
    return g;
  }, []);

  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: BUBBLE_VERT,
        fragmentShader: BUBBLE_FRAG,
        uniforms: {
          uTime: time,
          uPixelRatio: {
            value:
              typeof window !== "undefined"
                ? Math.min(window.devicePixelRatio, 2)
                : 1,
          },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [time],
  );

  return <points geometry={geom} material={mat} />;
}

/* ── El anillo de etiquetas técnicas ───────────────────────
   Mismo principio que el anillo de palabras del original: asientos
   fijos en un anillo rígido, cada uno mirando hacia afuera, y la
   escena entera gira. La diferencia es de escala y de contenido:
   acá son etiquetas chicas de dato real, no tipografía display,
   para que no compitan con el titular del hero. */

const RING_LABELS = [
  "NaDCC",
  "+ H₂O → HOCl",
  "EN 13697",
  "5 min",
  "300 ppm",
  "3 años",
];

function LabelRing({ loop }: { loop: number }) {
  const grp = useRef<THREE.Group>(null!);
  useFrame((s) => {
    grp.current.rotation.y = (s.clock.elapsedTime / loop) * Math.PI * 2;
  });

  const ticks = useMemo(() => {
    // Anillo de marcas finas, como la escala grabada de un instrumento.
    const arr: { a: number; major: boolean }[] = [];
    for (let i = 0; i < 72; i++) {
      arr.push({ a: (i / 72) * Math.PI * 2, major: i % 6 === 0 });
    }
    return arr;
  }, []);

  return (
    <group ref={grp} position={[0, -0.05, 0]} rotation={[0.18, 0, 0]}>
      {ticks.map((t, i) => (
        <mesh
          key={i}
          position={[Math.cos(t.a) * 1.5, 0, Math.sin(t.a) * 1.5]}
          rotation={[0, -t.a, 0]}
        >
          <boxGeometry args={[t.major ? 0.05 : 0.022, 0.004, 0.004]} />
          <meshBasicMaterial
            color="#5fe0cd"
            transparent
            opacity={t.major ? 0.5 : 0.22}
            toneMapped={false}
          />
        </mesh>
      ))}
      {RING_LABELS.map((_, i) => {
        const a = (i / RING_LABELS.length) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(a) * 1.5, 0.035, Math.sin(a) * 1.5]}
            rotation={[0, -a, 0]}
          >
            <boxGeometry args={[0.11, 0.011, 0.011]} />
            <meshBasicMaterial
              color="#5fe0cd"
              transparent
              opacity={0.75}
              toneMapped={false}
            />
          </mesh>
        );
      })}
    </group>
  );
}

/* ── La escena ─────────────────────────────────────────────── */

function Scene({ reduced }: { reduced: boolean }) {
  const time = useTime();
  const grp = useRef<THREE.Group>(null!);

  useFrame((s) => {
    if (reduced) return;
    const t = s.clock.elapsedTime;
    // Giro lento sobre el eje vertical: deja ver el canto y la ranura.
    grp.current.rotation.y = t * 0.24;
    // Bamboleo suave, como algo suspendido en líquido.
    grp.current.rotation.z = Math.sin(t * 0.5) * 0.07;
    grp.current.position.y = Math.sin(t * 0.7) * 0.05;
  });

  return (
    <>
      <ambientLight intensity={1} />
      <group ref={grp} rotation={[0.32, 0, 0]}>
        <Tablet time={time} />
        <Halo />
        <Bubbles time={time} />
      </group>
      {!reduced && <LabelRing loop={26} />}
    </>
  );
}

export function TabletDissolve({ reduced = false }: { reduced?: boolean }) {
  return (
    <Canvas
      flat
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
      camera={{ position: [0, 0.55, 4.2], fov: 34 }}
      style={{ width: "100%", height: "100%", background: "transparent" }}
      // El canvas es decorativo: el dato que transmite está en el texto.
      aria-hidden="true"
      frameloop={reduced ? "demand" : "always"}
    >
      <Scene reduced={reduced} />
    </Canvas>
  );
}

export default TabletDissolve;
