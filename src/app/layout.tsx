import type { Metadata } from "next";
import { Archivo, Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";

/* Archivo para display: grotesca industrial de asta ancha. Le da peso real
   a las cifras grandes (>99,999 %, x50, 103 países) sin caer en Inter. */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

/* Geist para cuerpo: aguanta párrafo técnico largo con buena legibilidad. */
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

/* JetBrains Mono para dato duro: protocolos, ppm, UFC/carrier, registros.
   Cifras tabulares verdaderas, que es lo que la tabla de ensayo necesita. */
const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BeClean · Limpiemos hoy, cuidando el mañana",
  description:
    "Limpieza y desinfección en tabletas efervescentes. Más del 99,999 % de reducción bacteriana en 5 minutos (EN 13697, UBA). Respaldo de Laboratorio Pyam: desde 1991, 103 países, proveedor global de UNICEF.",
  openGraph: {
    title: "BeClean · Limpiemos hoy, cuidando el mañana",
    description:
      "Limpieza y desinfección en tabletas efervescentes. Más del 99,999 % de reducción bacteriana en 5 minutos (EN 13697, UBA). Respaldo de Laboratorio Pyam.",
    type: "website",
    locale: "es_AR",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es-AR"
      className={`${archivo.variable} ${geist.variable} ${jetbrains.variable} antialiased`}
    >
      <head>
        {/* Marca que hay JS antes del primer pintado, para que el estado
            oculto de .reveal solo exista si algo puede revelarlo. Va inline
            y sin defer a propósito: si corriera después, habría un parpadeo
            del contenido apareciendo y volviéndose a ocultar. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
      </head>
      <body>
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
