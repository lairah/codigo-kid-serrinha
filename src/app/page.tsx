// Página principal da landing page: Header + seções.
// As seções seguintes entram no <main> na ordem dos links de navegação.
import { BotaoWhatsapp } from "@/components/layout/BotaoWhatsapp";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { Cursos } from "@/components/sections/Cursos";
import { Faq } from "@/components/sections/Faq";
import { Ferramentas } from "@/components/sections/Ferramentas";
import { Materiais } from "@/components/sections/Materiais";
import { Matriculas } from "@/components/sections/Matriculas";
import { Metodologia } from "@/components/sections/Metodologia";
import { Projetos } from "@/components/sections/Projetos";

export default function Home() {
  return (
    <>
      <Header />

      <main id="conteudo">
        <Hero />
        <Ferramentas />
        <Metodologia />
        <Cursos />
        <Projetos />
        <Materiais />
        <Matriculas />
        <Faq />

        {/* Próximas etapas da migração entram aqui: */}
        {/* <Contato />       -> seção #contato */}
        {/* <Footer /> */}
      </main>

      <Footer />

      <BotaoWhatsapp />
    </>
  );
}
