// Rota /ebook: apresenta o material, disponibiliza o PDF e apresenta o autor.
// Todo o conteúdo vem de `src/lib/ebook.ts`.
import * as React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BookOpen, Download, ExternalLink } from "lucide-react";

import { BotaoWhatsapp } from "@/components/layout/BotaoWhatsapp";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Section, SectionContainer } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { CapaEbook } from "@/components/ui/CapaEbook";
import { EtapaDaLinha, LinhaDoTempo } from "@/components/ui/LinhaDoTempo";
import { PadraoIcones } from "@/components/ui/PadraoIcones";
import fundoAbertura from "@/images/background-ebook.webp";
import retratoDoAutor from "@/images/retrato-diego.webp";
import { EBOOK, ebookDisponivel } from "@/lib/ebook";

/**
 * Converte `*trecho*` em ênfase. O cliente escreve a bio em texto simples, e
 * sem isto os asteriscos apareceriam literalmente na tela.
 *
 * O `<em>` já sai em itálico por padrão, que é o que o asterisco pede. O peso
 * e a cor entram porque o parágrafo é `tinta-suave`: ali o itálico sozinho
 * quase não se nota.
 */
function comEnfase(texto: string) {
  return texto.split("*").map((parte, indice) =>
    indice % 2 === 1 ? (
      <em key={indice} className="font-medium text-ck-roxo-profundo">
        {parte}
      </em>
    ) : (
      <React.Fragment key={indice}>{parte}</React.Fragment>
    ),
  );
}

export const metadata: Metadata = {
  // Sem sufixo: o `title.template` do layout raiz já acrescenta "| Código Kid".
  title: EBOOK.titulo,
  description: EBOOK.linhaDeApoio,
  alternates: { canonical: "/ebook" },
  openGraph: {
    title: EBOOK.titulo,
    description: EBOOK.linhaDeApoio,
    url: "/ebook",
  },
};

/**
 * Baixar e ler online saem do mesmo arquivo em `public/`. "Ler online" abre o
 * leitor nativo do navegador numa aba nova, em vez de um leitor embutido: um
 * `<iframe>` de PDF mostra só a primeira página no Safari do iOS, e o pdf.js
 * custaria uns 350 KB de JavaScript para entregar menos do que o leitor que o
 * visitante já tem instalado.
 */
function AcoesDoPdf() {
  if (!ebookDisponivel()) {
    return (
      <p className="mt-10 inline-flex items-center gap-3 rounded-botao border border-ck-branco/40 px-5 py-3 font-corpo text-ck-branco/90">
        <BookOpen aria-hidden="true" className="h-5 w-5 shrink-0" />
        O arquivo estará disponível em breve.
      </p>
    );
  }

  // "PDF · 4,2 MB · 28 páginas". Cada pedaço só entra quando existe.
  const detalhes = [
    "PDF",
    EBOOK.pdfTamanho,
    EBOOK.pdfPaginas > 0 ? `${EBOOK.pdfPaginas} páginas` : "",
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="mt-10">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button asChild variant="destaque">
          <a href={EBOOK.pdf} download={EBOOK.pdfNomeParaSalvar}>
            Baixar o PDF
            <Download aria-hidden="true" className="h-4 w-4" />
          </a>
        </Button>

        <Button asChild variant="invertido">
          <a href={EBOOK.pdf} target="_blank" rel="noopener noreferrer">
            Ler online
            <ExternalLink aria-hidden="true" className="h-4 w-4" />
            <span className="sr-only">(abre em uma nova aba)</span>
          </a>
        </Button>
      </div>

      <p className="mt-4 font-corpo text-sm text-ck-branco/70">{detalhes}</p>
    </div>
  );
}

export default function PaginaDoEbook() {
  const { autor } = EBOOK;

  return (
    <>
      <Header />

      <main id="conteudo">
        <Section variant="roxo-profundo">
          {/* Arte de fundo da abertura. `roxo-profundo` continua na variante
              como cor de base, então a seção nunca fica sem fundo se a imagem
              falhar. `priority` porque ela ocupa a dobra inteira desta rota. */}
          <Image
            src={fundoAbertura}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          {/* Véu. A arte tem um núcleo de brilho claro e, abaixo de `lg`, o
              texto deixa de ser uma coluna e ocupa a largura inteira, então o
              degradê precisa segurar contraste até a borda direita. O que
              manda aqui não é o título, é a linha de apoio em `branco/80`.
              Medido pixel a pixel, no recorte real de cada tamanho:
              1440 → 5.12:1   768 → 4.93:1   375 → 4.70:1
              Sem véu nenhum a linha de apoio cai para 2.10:1. */}
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-ck-roxo-profundo/80 via-ck-roxo-profundo/60 to-ck-roxo-profundo/30"
          />

          <SectionContainer>
            <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-20">
              <div>
                <p className="font-corpo text-sm font-semibold uppercase tracking-[0.2em] text-ck-amarelo">
                  {/* Em expressão, senão o ESLint lê as duas barras como comentário. */}
                  <span aria-hidden="true" className="text-ck-branco/50">
                    {"// "}
                  </span>
                  Ebook gratuito
                </p>

                <h1 className="mt-4 max-w-3xl font-display text-[2rem] font-bold leading-[1.05] tracking-tight text-ck-branco sm:text-5xl lg:text-6xl">
                  {EBOOK.titulo}
                </h1>

                <p className="mt-6 max-w-2xl font-corpo text-lg leading-relaxed text-ck-branco/80 md:text-xl">
                  {EBOOK.apresentacao}
                </p>

                <AcoesDoPdf />
              </div>

              {/* A coluna de texto é o `1fr` da grade, então alargar o mockup
                  a encolhe. Em 480px sobram 769px para o texto, e o `max-w-3xl`
                  do título é 768: é o limite antes de a quebra de linha dele
                  começar a mudar. */}
              <CapaEbook
                capa={EBOOK.capa}
                alt={`Capa do ebook ${EBOOK.titulo}`}
                className="mx-auto w-72 sm:w-96 lg:w-[30rem]"
              />
            </div>
          </SectionContainer>
        </Section>

        {/* Faixa de números entre o hero e a lista. Ela existe por dois
            motivos: quebrar a sequência de três blocos claros que vinha depois
            do roxo, e dar uma âncora para o olho parar antes de encarar o
            sumário. O ritmo da página passa a ser
            roxo-profundo → amarelo → marfim → creme → roxo. */}
        <Section variant="amarelo" espacamento="compacto">
          <SectionContainer>
            {/* Título em duas vozes. A referência faz isso com branco em
                negrito sobre amarelo, que dá 1.60:1 e some. Aqui o contraste
                vem de dois tons do mesmo roxo: 4.81:1 na linha leve e
                9.39:1 na forte. */}
            <h2 className="max-w-3xl font-display text-[1.75rem] leading-tight tracking-tight md:text-4xl">
              <span className="block font-medium text-ck-roxo-profundo/70">
                Não é sobre proibir.
              </span>
              <span className="block font-bold text-ck-roxo-profundo">
                É sobre saber o que fazer.
              </span>
            </h2>

            <dl className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-6">
              {EBOOK.numeros.map((numero) => (
                <div key={numero.valor}>
                  <dt className="font-display text-5xl font-bold leading-none tracking-tight text-ck-roxo-profundo md:text-6xl">
                    {numero.valor}
                  </dt>
                  <dd className="mt-3 max-w-[26ch] font-corpo leading-snug text-ck-tinta">
                    {numero.descricao}
                    {/* A fonte entra como linha própria e apagada, para ler
                        como citação e não como parte da frase. Só aparece
                        quando existe: o livro atribui apenas o primeiro. */}
                    {numero.fonte ? (
                      <span className="mt-1 block font-corpo text-sm text-ck-tinta-suave">
                        ({numero.fonte})
                      </span>
                    ) : null}
                  </dd>
                </div>
              ))}
            </dl>
          </SectionContainer>
        </Section>

        <Section variant="marfim">
          <SectionContainer>
            <div className="flex flex-col items-center text-center">
              <h2 className="max-w-3xl font-display text-[1.75rem] font-bold leading-tight tracking-tight text-ck-roxo-profundo md:text-4xl">
                O que você vai encontrar
              </h2>

              <span
                aria-hidden="true"
                className="mt-5 h-[3px] w-24 rounded-full bg-gradient-to-r from-ck-acao to-ck-amarelo"
              />
            </div>

            {/* Linha do tempo: número circulado na cor da etapa, ligado por
                um trilho que se preenche conforme a página rola. A altura vem
                do conteúdo, sem espaçador artificial. */}
            <LinhaDoTempo className="mx-auto mt-14 max-w-3xl">
              {EBOOK.etapas.map((etapa, indice) => (
                <EtapaDaLinha
                  key={etapa.titulo}
                  numero={String(indice + 1).padStart(2, "0")}
                  acento={etapa.acento}
                  className={indice === EBOOK.etapas.length - 1 ? "[&>div]:pb-0" : undefined}
                >
                  <h3 className="font-display text-xl font-semibold tracking-tight text-ck-roxo-profundo md:text-2xl">
                    {etapa.titulo}
                  </h3>
                  <p className="mt-2 font-corpo leading-relaxed text-ck-tinta-suave md:text-lg">
                    {etapa.resumo}
                  </p>
                </EtapaDaLinha>
              ))}
            </LinhaDoTempo>

          </SectionContainer>
        </Section>

        <Section variant="creme">
          <SectionContainer>
            <div className="grid items-start gap-12 lg:grid-cols-[auto_1fr] lg:gap-16">
              {/* Na proporção nativa 4:5, sem recorte. Um quadrado cortaria
                  140px em cima e embaixo, e em cima é onde está a cabeça.

                  O `rounded-imagem` e a sombra são os mesmos de toda imagem do
                  site, e o polo amarelo do retrato já conversa com a paleta
                  sem precisar de moldura colorida. */}
              <Image
                src={retratoDoAutor}
                alt="Diego Barreto Reis"
                sizes="(min-width: 1024px) 320px, 256px"
                className="mx-auto w-64 shrink-0 rounded-imagem shadow-sombra-forte lg:mx-0 lg:w-80"
              />

              <div>
                <p className="font-corpo text-sm font-semibold uppercase tracking-[0.2em] text-ck-acao">
                  <span aria-hidden="true" className="text-ck-amarelo-escuro">
                    {"// "}
                  </span>
                  Sobre o autor
                </p>

                <h2 className="mt-4 font-display text-[1.75rem] font-bold leading-tight tracking-tight text-ck-roxo-profundo md:text-4xl">
                  {autor.nome}
                </h2>

                <p className="mt-2 font-corpo text-lg font-semibold text-ck-acao">
                  {autor.papel}
                </p>

                <div className="mt-6 flex flex-col gap-4">
                  {autor.bio.map((paragrafo) => (
                    <p
                      key={paragrafo}
                      className="max-w-[62ch] font-corpo leading-relaxed text-ck-tinta-suave md:text-lg"
                    >
                      {comEnfase(paragrafo)}
                    </p>
                  ))}
                </div>

                {/* Só aparece quando existe link cadastrado. */}
                {autor.links.length > 0 && (
                  <ul className="mt-8 flex flex-wrap gap-3">
                    {autor.links.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-11 items-center gap-2 rounded-botao border-2 border-ck-acao px-5 py-2 font-corpo font-semibold text-ck-acao transition-colors duration-220 ease-ck hover:bg-ck-acao hover:text-ck-branco"
                        >
                          {link.rotulo}
                          <ExternalLink aria-hidden="true" className="h-4 w-4" />
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </SectionContainer>
        </Section>

        <Section variant="roxo" espacamento="compacto">
          <PadraoIcones className="text-ck-branco/10" />

          <SectionContainer>
            <div className="relative z-10 flex flex-col items-center gap-6 text-center">
              <h2 className="max-w-2xl font-display text-[1.75rem] font-bold leading-tight tracking-tight text-ck-branco md:text-3xl">
                A escola por trás do material
              </h2>

              <p className="max-w-2xl font-corpo leading-relaxed text-ck-branco/80 md:text-lg">
                Programação, robótica e tecnologia para crianças e adolescentes,
                com um método pensado para cada fase do desenvolvimento.
              </p>

              <Button asChild variant="invertido" className="mt-2">
                <Link href="/">
                  <ArrowLeft aria-hidden="true" className="h-4 w-4" />
                  Conhecer a Código Kid
                </Link>
              </Button>
            </div>
          </SectionContainer>
        </Section>
      </main>

      <Footer />

      <BotaoWhatsapp />
    </>
  );
}
