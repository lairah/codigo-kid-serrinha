// Seção #materiais: faixa curta que leva para /ebook. Não é destino de leitura,
// é chamada. O conteúdo do ebook mora em `src/lib/ebook.ts`.
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

import { Section, SectionContainer } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { CapaEbook } from "@/components/ui/CapaEbook";
import fundoEbook from "@/images/background-ebook-page.webp";
import { EBOOK } from "@/lib/ebook";

export function Materiais() {
  return (
    <Section id="materiais" variant="marfim" espacamento="compacto">
      <SectionContainer>
        {/* Card por dentro, e não uma faixa colorida de ponta a ponta: assim
            lê como banner em vez de mais uma seção, e o bloco escuro inteiro
            continua exclusivo de Cursos, que é o peso visual da página. */}
        <div className="relative overflow-hidden rounded-card bg-ck-roxo-profundo px-6 py-10 md:px-12 md:py-12">
          <Image
            src={fundoEbook}
            alt=""
            fill
            sizes="(min-width: 768px) 90vw, 100vw"
            className="object-cover"
          />

          {/* Véu por cima da arte. A esfera amarela é clara demais para texto
              branco: sem véu o pior ponto da coluna de texto dá 1.11:1.
              O degradê escurece onde o texto fica e solta a esfera do lado
              da capa.

              Três degraus porque o gargalo é o tablet, não o desktop: em 768px
              o card é estreito e a esfera ocupa uma fatia maior do quadro, e
              qualquer véu mais leve derruba a borda do botão abaixo de 3:1. No
              desktop sobra folga, então ali o véu chega a transparente e a arte
              aparece crua. Isso devolve a saturação do terço direito de 48.7%
              para 63.3%.

              Medido no recorte real de cada tamanho, sobre a caixa inteira da
              coluna e não só onde as letras caem hoje:
              375 → 7.06:1   768 → 5.83:1   1440 → 6.83:1 (texto branco) */}
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-ck-roxo-profundo/90 via-ck-roxo-profundo/85 to-ck-roxo-profundo/70 md:via-ck-roxo-profundo/75 md:to-ck-roxo-profundo/40 lg:via-ck-roxo-profundo/60 lg:to-transparent"
          />

          <div className="relative z-10 flex flex-col items-center gap-10 text-center md:flex-row md:items-center md:gap-14 md:text-left">
            {/* A largura é travada: solta, a coluna chega aos 985px e entra na
                esfera amarela, onde o branco não tem contraste nenhum. */}
            <div className="md:max-w-xl md:flex-1">
              <p className="inline-flex items-center gap-2 rounded-botao bg-ck-branco/20 px-4 py-1.5 font-corpo text-sm font-semibold text-ck-branco">
                <BookOpen aria-hidden="true" className="h-4 w-4" />
                Material gratuito
              </p>

              <h2 className="mt-5 font-display text-[1.75rem] font-bold leading-tight tracking-tight text-ck-branco md:text-4xl">
                {EBOOK.titulo}
              </h2>

              <p className="mt-4 max-w-xl font-corpo leading-relaxed text-ck-branco/80 md:text-lg">
                {EBOOK.linhaDeApoio}
              </p>

              <Button asChild variant="destaque" className="mt-8">
                <Link href="/ebook">
                  Conhecer o ebook
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Some abaixo de `md`: empilhada, a capa dobraria a altura da
                faixa, que existe justamente para ser curta.

                `ml-auto` encosta a capa na borda: a coluna de texto é travada
                em `max-w-xl` e não consome a folga, então sem isso sobravam
                377px vazios à direita e o livro ficava boiando no meio. */}
            <div className="relative hidden shrink-0 md:ml-auto md:block md:w-48 lg:w-96">
              {/* Halo amarelo por trás do livro. Fica na camada de baixo por
                  ordem no DOM, sem z-index: o `relative z-10` do bloco de
                  conteúdo já isola esta pilha do fundo do card.
                  Não alcança o texto: com o blur de 64px ele chega no máximo a
                  841px do card, e a coluna de texto termina em 624px. */}
              <span
                aria-hidden="true"
                className="absolute inset-x-2 inset-y-8 rounded-full bg-ck-amarelo/50 blur-3xl"
              />

              <CapaEbook
                capa={EBOOK.capa}
                alt={`Capa do ebook ${EBOOK.titulo}`}
                className="relative"
              />
            </div>
          </div>
        </div>
      </SectionContainer>
    </Section>
  );
}

export default Materiais;
