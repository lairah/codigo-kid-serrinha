// Seção #inicio: título com máquina de escrever, subtítulo e CTA principal,
// sobre o fundo 3D da marca, com rastro do cursor por cima.
"use client";

import * as React from "react";
import Image from "next/image";

import { Section, SectionContainer } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import {
  ShineBorder,
  TypeWriter,
  renderCanvas,
} from "@/components/ui/hero-designali";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

import { PadraoIcones } from "@/components/ui/PadraoIcones";
import heroFundo from "@/images/hero_image.png";

const PALAVRAS: string[] = [
  "criar.",
  "imaginar.",
  "descobrir.",
  "inovar.",
  "questionar.",
  "experimentar.",
  "transformar.",
  "pensar.",
  "resolver.",
];

/**
 * A mesma lista, corrida, para quem usa leitor de tela — a máquina de
 * escrever não tem como ser lida em voz alta.
 *
 * Derivada de `PALAVRAS` e não escrita à mão: a versão manual tinha ficado
 * para trás em "pensar" e "resolver", e quem ouvia a página recebia sete das
 * nove palavras. O ponto de cada palavra sai aqui, porque numa lista falada
 * ele viraria nove pausas de frase.
 */
const PALAVRAS_FALADAS =
  PALAVRAS.map((palavra) => palavra.replace(/\.$/, "")).join(", ") + ".";

export function Hero() {
  const reduzirMovimento = usePrefersReducedMotion();

  React.useEffect(() => {
    if (reduzirMovimento) return;

    // Sobre fundo claro a mistura aditiva some: traço branco em source-over.
    return renderCanvas({
      canvasId: "canvas-hero",
      blendMode: "source-over",
      color: "#FFFFFF",
      alpha: 0.07,
      lineWidth: 10,
    });
  }, [reduzirMovimento]);

  return (
    <Section
      id="inicio"
      variant="amarelo"
      espacamento="nenhum"
      // Sobe por baixo do header sticky para o fundo sangrar até o topo.
      className="-mt-header overflow-hidden md:-mt-header-md"
    >
      {/* Render 3D da marca. Decorativo: as peças ficam nas bordas. */}
      <Image
        src={heroFundo}
        alt=""
        priority
        fill
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Zona limpa: lavagem no próprio amarelo da imagem, para o texto nunca
          cair sobre um objeto roxo quando o corte muda de proporção. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 [background:radial-gradient(48%_58%_at_50%_46%,#FDC930_0%,rgba(253,201,48,0.82)_42%,transparent_72%)]"
      />

      {/* No mobile o corte da imagem mostra quase só o miolo liso: a textura
          de ícones compensa. No desktop a própria imagem já traz os objetos. */}
      <PadraoIcones className="text-ck-amarelo-escuro/40 md:hidden" />

      {/* Rastro que segue o cursor. Puramente decorativo. */}
      <canvas
        id="canvas-hero"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
      />

      <SectionContainer className="flex flex-col items-center pb-20 pt-32 text-center md:pb-28 md:pt-40">
        <h1 className="font-display text-[2.25rem] font-bold leading-[1.02] tracking-tight text-ck-roxo-profundo sm:text-5xl md:text-6xl lg:text-[4.25rem]">
          <span className="block">O futuro precisa de quem sabe</span>

          {/* A palavra troca sozinha: leitores de tela recebem a lista completa. */}
          <span className="mt-2 block text-ck-acao">
            <span className="sr-only">{PALAVRAS_FALADAS}</span>
            <span aria-hidden="true">
              {reduzirMovimento ? (
                PALAVRAS[0]
              ) : (
                <TypeWriter strings={PALAVRAS} />
              )}
            </span>
          </span>
        </h1>

        <p className="mt-6 max-w-3xl font-corpo text-lg leading-relaxed text-ck-tinta md:text-xl">
          Uma experiência de aprendizagem que une tecnologia, criatividade e
          prática para preparar crianças e adolescentes para um mundo em
          constante transformação.
        </p>

        <ShineBorder
          borderWidth={3}
          duration={12}
          color={["#FFFFFF", "#2FC7B0", "#FFD84D"]}
          className="mt-10 bg-ck-branco/25 backdrop-blur-sm"
        >
          <Button asChild variant="primario">
            <a href="#metodologia">Conheça a Código Kid</a>
          </Button>
        </ShineBorder>
      </SectionContainer>
    </Section>
  );
}

export default Hero;
