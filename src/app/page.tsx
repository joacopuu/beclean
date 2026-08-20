import { SiteNav } from "@/components/sections/site-nav";
import { Hero, HeroStats } from "@/components/sections/hero";
import { Thesis } from "@/components/sections/thesis";
import { Mechanism } from "@/components/sections/mechanism";
import { Performance } from "@/components/sections/performance";
import { Evidence } from "@/components/sections/evidence";
import { Protocols } from "@/components/sections/protocols";
import { Lineup } from "@/components/sections/lineup";
import { Comparison } from "@/components/sections/comparison";
import { Logistics } from "@/components/sections/logistics";
import { Impact } from "@/components/sections/impact";
import { Backing } from "@/components/sections/backing";
import { Institutional } from "@/components/sections/institutional";
import { Faq } from "@/components/sections/faq";
import { SiteFooter } from "@/components/sections/site-footer";

/* Orden del dossier: problema, mecanismo, prueba, catálogo, operación,
   respaldo, cierre. Los IDs de sección son los mismos que la versión
   anterior, así los enlaces que ya circulan siguen resolviendo. */
export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <HeroStats />
        <Thesis />
        <Mechanism />
        <Performance />
        <Evidence />
        <Protocols />
        <Lineup />
        <Comparison />
        <Logistics />
        <Impact />
        <Backing />
        <Institutional />
        <Faq />
      </main>
      <SiteFooter />
    </>
  );
}
