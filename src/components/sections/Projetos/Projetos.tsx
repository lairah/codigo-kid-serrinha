// Seção #projetos: um projeto em destaque com vídeo.
// O player só carrega no clique (ver VideoYoutube).
import * as React from "react";
import { ArrowRight } from "lucide-react";

import { Section, SectionContainer } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { IconeWhatsapp } from "@/components/ui/IconesDeMarca";
import { VideoYoutube } from "@/components/ui/VideoYoutube";
import { linkDoWhatsapp } from "@/lib/escola";

interface Projeto {
  /** Selo acima do título: a trilha ou o tipo de projeto. */
  categoria: string;
  titulo: string;
  /** Parágrafos curtos, para o bloco respirar ao lado do vídeo. */
  descricao: string[];
  /**
   * Id do vídeo no YouTube: o trecho final da URL curta (youtu.be/<id>) ou o
   * que vem depois de `v=` na longa. Sem ele, o card mostra "Vídeo em breve".
   */
  videoId?: string;
}

const DESTAQUE: Projeto = {
  categoria: "Robótica e ciências",
  titulo: "Competição de Lançamento de Foguetes",
  descricao: [
    "Nossos alunos projetaram, construíram e lançaram seus próprios foguetes, aplicando na prática conceitos de física, engenharia e trabalho em equipe.",
    "Um projeto que mostra como a aprendizagem acontece de verdade: com desafio, experimentação e muita comemoração a cada lançamento.",
  ],
  // https://youtu.be/Vq5c_krGDsk
  videoId: "Vq5c_krGDsk",
};

/** Vai pré-escrita no `?text=`, para a escola saber de onde veio a conversa. */
const MENSAGEM_SOBRE_PROJETOS =
  "Olá! Vi os projetos no site da Código Kid e gostaria de saber mais.";

export function Projetos() {
  const whatsapp = linkDoWhatsapp(MENSAGEM_SOBRE_PROJETOS);

  return (
    <Section id="projetos" variant="marfim">
      <SectionContainer>
        <div className="flex flex-col items-center text-center">
          <p className="font-corpo text-sm font-semibold uppercase tracking-[0.2em] text-ck-acao">
            {/* Em expressão, senão o ESLint lê as duas barras como comentário. */}
            <span aria-hidden="true" className="text-ck-amarelo-escuro">
              {"// "}
            </span>
            Projetos
          </p>

          {/* Filete de gradiente sob o rótulo, como na referência. */}
          <span
            aria-hidden="true"
            className="mt-4 h-[3px] w-24 rounded-full bg-gradient-to-r from-ck-acao to-ck-amarelo"
          />

          <h2 className="mt-6 max-w-4xl font-display text-[2rem] font-bold leading-[1.05] tracking-tight text-ck-roxo-profundo sm:text-5xl lg:text-6xl">
            Cada projeto conta uma história de aprendizado.
          </h2>

          <p className="mt-6 max-w-2xl font-corpo text-lg leading-relaxed text-ck-tinta-suave md:text-xl">
            Veja de perto como nossos alunos colocam a mão na massa.
          </p>
        </div>

        {/* Sem contêiner: o vídeo flutua com um brilho na cor da marca e o
            texto respira direto sobre o fundo. Um card por cima daria pouco
            mais de 1:1 de contraste e só encaixotaria a composição. */}
        <div className="mt-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <VideoYoutube
            videoId={DESTAQUE.videoId}
            titulo={DESTAQUE.titulo}
            className="shadow-2xl shadow-ck-roxo/30"
          />

          <div className="flex flex-col items-start">
            <span className="rounded-botao bg-ck-amarelo px-4 py-1.5 font-corpo text-sm font-semibold text-ck-roxo-profundo">
              {DESTAQUE.categoria}
            </span>

            <h3 className="mt-5 font-display text-2xl font-semibold leading-tight tracking-tight text-ck-roxo-profundo md:text-3xl">
              {DESTAQUE.titulo}
            </h3>

            <div className="mt-5 flex flex-col gap-4">
              {DESTAQUE.descricao.map((paragrafo) => (
                <p
                  key={paragrafo}
                  className="font-corpo leading-relaxed text-ck-tinta-suave"
                >
                  {paragrafo}
                </p>
              ))}
            </div>

            {/* Leva direto para a conversa, e não mais para `#contato` — que
                nunca existiu e deixava este botão sem resposta ao clique.

                Aqui a mensagem VAI pré-escrita, diferente do telefone do
                rodapé: quem clica num botão que diz "conheça nossos projetos"
                já declarou o assunto, e chegar com ele digitado poupa a pessoa
                de formular a primeira frase. */}
            {/* `whitespace-normal` porque a base do `buttonVariants` traz
                `nowrap`, e este rótulo tem 37 caracteres: medido, o botão
                ficava com 391px num container de 280px aos 320 de tela, e
                fazia o DOCUMENTO INTEIRO rolar de lado. O problema é anterior
                ao glifo do WhatsApp — ele só piorou 28px o que já estourava
                por 93. Quebrando em duas linhas, o pior caso é uma linha a
                mais. */}
            <Button
              asChild
              variant="primario"
              className="mt-8 whitespace-normal text-center"
            >
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconeWhatsapp className="h-5 w-5" />
                Fale conosco e conheça nossos projetos
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </SectionContainer>
    </Section>
  );
}

export default Projetos;
