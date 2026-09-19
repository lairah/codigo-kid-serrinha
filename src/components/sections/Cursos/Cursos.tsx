// Seção #cursos: abas por faixa etária. Cada aba abre um painel com a
// progressão da turma dividida por sub-idade, e a section fecha com a tese
// do método antes do CTA.
"use client";

import * as React from "react";
import Image, { type StaticImageData } from "next/image";

import composicao12a16 from "@/images/turma-12-16.webp";
import composicao4a7 from "@/images/turma-4-7.webp";
import composicao8a11 from "@/images/turma-8-11.webp";
import { Section, SectionContainer } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  type AcentoAba,
} from "@/components/ui/Tabs";
import { cn } from "@/lib/utils";

interface Fase {
  /** Sub-idade ou momento dentro da faixa. */
  rotulo: string;
  texto: string;
}

interface Turma {
  /** Usado nos ids de aria. */
  id: string;
  /** Rótulo da aba. */
  faixa: string;
  /** Título do painel. */
  titulo: string;
  acento: AcentoAba;
  /** Chips de informação prática, na ordem em que aparecem. */
  chips: string[];
  /** Frase de abertura: o que muda no pensamento nessa fase. */
  abertura: string;
  /** Blocos internos, na ordem de progressão. */
  fases: Fase[];
  /** Frase de fecho, em destaque. */
  citacao: string;
  /** Etiquetas flutuantes sobre o bloco gráfico. */
  destaques: string[];
  /**
   * Arte da turma. Ela traz o próprio fundo, na mesma cor da section, então
   * entra solta, sem card em volta.
   */
  imagem: StaticImageData;
  /** Descrição da arte para quem não a enxerga. */
  imagemAlt: string;
}

/**
 * Conteúdo pedagógico fornecido pela direção da escola.
 *
 * TODO: só falta o dado operacional. Os chips seguem genéricos porque ainda
 * não temos duração, dias e horários de cada turma — inventar "terças e
 * quintas, 9h" passaria por informação verdadeira num site público.
 */
const TURMAS: Turma[] = [
  {
    id: "4-7",
    faixa: "4 a 7 anos",
    titulo: "Os primeiros passos no raciocínio lógico",
    acento: "amarelo",
    chips: ["Aula semanal", "Horários a confirmar"],
    abertura:
      "Nos primeiros anos, aprender e brincar ainda são a mesma coisa, e é exatamente aí que a tecnologia entra.",
    fases: [
      {
        rotulo: "4 e 5 anos",
        texto:
          "O aprendizado acontece inteiramente pelo concreto: montar, encaixar, sequenciar, testar e observar o que acontece. A programação existe sem tela e sem código, embutida nos projetos físicos que a criança comanda com o corpo e com as mãos. Cada aula termina com algo construído.",
      },
      {
        rotulo: "6 e 7 anos",
        texto:
          "Entra o tablet como ferramenta de criação, e com ele os primeiros blocos visuais de programação. É uma linguagem lógica que a criança usa antes mesmo de dominar a leitura. Começam a se desenvolver as funções executivas: manter o foco, planejar antes de agir e ajustar a rota quando algo não funciona. Surgem os primeiros experimentos de ciências.",
      },
    ],
    citacao:
      "O mais importante não é o que a criança aprende a fazer, mas o que ela descobre que é capaz de criar.",
    destaques: ["Sem tela nos primeiros anos", "Blocos visuais aos 6"],
    imagem: composicao4a7,
    imagemAlt:
      "Composição com seis fotos de crianças pequenas montando robôs de blocos coloridos, uma delas usando um tablet.",
  },
  {
    id: "8-11",
    faixa: "8 a 11 anos",
    titulo: "Do concreto para o pensamento que planeja",
    acento: "turquesa",
    chips: ["Aula semanal", "Horários a confirmar"],
    abertura:
      "O aluno começa a sustentar ideias na cabeça enquanto age no mundo, e isso abre espaço para desafios reais.",
    fases: [
      {
        rotulo: "No começo da faixa",
        texto:
          "Os projetos passam a ter mais etapas e a exigir planejamento antes da execução. Os blocos visuais ganham complexidade e começa a transição para código escrito. Eletrônica e eletricidade deixam de ser assunto de adulto: o aluno monta circuitos e entende por que a luz acende.",
      },
      {
        rotulo: "Nos anos finais",
        texto:
          "Entram os primeiros desafios reais de gestão e os primeiros exercícios de oratória: apresentar o que foi construído, explicar as escolhas feitas e comunicar uma ideia com clareza para outras pessoas.",
      },
    ],
    citacao:
      "Programação e robótica são o meio. O que se desenvolve é o pensamento, a autonomia e a capacidade de trabalhar junto.",
    destaques: ["Transição para código escrito", "Eletrônica e circuitos"],
    imagem: composicao8a11,
    imagemAlt:
      "Composição com seis fotos de crianças desenhando projetos, montando circuitos numa protoboard e programando robôs em blocos no computador.",
  },
  {
    id: "12-16",
    faixa: "12 a 16 anos",
    titulo: "Autonomia, autoria e pensamento de criador",
    acento: "azul",
    chips: ["Aula semanal", "Horários a confirmar"],
    abertura:
      "O pensamento abstrato se consolida, e com ele vem a capacidade de criar sistemas, não apenas seguir instruções.",
    fases: [
      {
        rotulo: "12 e 13 anos",
        texto:
          "As linguagens avançam em complexidade, sempre no ritmo do que o aluno já é capaz de compreender e aplicar. Eletricidade e eletrônica chegam com precisão conceitual: corrente, tensão, resistência. As ciências ganham método investigativo de verdade.",
      },
      {
        rotulo: "14 a 16 anos",
        texto:
          "Os alunos conduzem projetos de ponta a ponta, tomam decisões reais sobre o que priorizar, lideram dentro das equipes e respondem pelo resultado. A oratória passa a ser parte estrutural do processo.",
      },
    ],
    citacao:
      "Escrever código com fluência é evidência de um pensamento organizado, capaz de decompor problemas e construir soluções com método.",
    destaques: ["Ferramentas profissionais", "Projetos de ponta a ponta"],
    imagem: composicao12a16,
    imagemAlt:
      "Composição com seis fotos de adolescentes montando, ajustando e programando robôs, sozinhos e em grupo.",
  },
];

/**
 * Cores decorativas de cada turma sobre o fundo escuro. Usa as versões
 * vibrantes (`ck-azul`, não `ck-azul-profundo`): num traço fino sobre roxo
 * profundo, a versão funda não teria contraste. Literais para o JIT.
 */
const ACENTOS_TURMA: Record<AcentoAba, { linha: string; marca: string }> = {
  amarelo: { linha: "border-ck-amarelo", marca: "text-ck-amarelo" },
  turquesa: { linha: "border-ck-turquesa", marca: "text-ck-turquesa" },
  azul: { linha: "border-ck-azul", marca: "text-ck-azul" },
  coral: { linha: "border-ck-coral", marca: "text-ck-coral" },
};

function Chip({ children }: { children: React.ReactNode }) {
  return (
    // 40% de branco: a borda precisa de 3:1 contra o painel para o chip ser
    // percebido como um elemento delimitado.
    <span className="rounded-botao border border-ck-branco/40 px-4 py-2 font-corpo text-sm text-ck-branco">
      {children}
    </span>
  );
}

/**
 * A composição sangra conteúdo nas quatro bordas: o arco magenta encosta no
 * topo, os arcos claros no rodapé e o brilho roxo chega na lateral direita.
 * Encostada crua no fundo, ela leria como um retângulo. Duas máscaras
 * aninhadas resolvem sem depender de `mask-composite`: a de fora esmaece na
 * horizontal, a de dentro na vertical, e o recorte final é a interseção.
 * As faixas são estreitas de propósito, para não comerem os arcos.
 *
 * A transparência total chega em 1% e 99%, e não em 0% e 100%: no extremo
 * exato o último pixel renderizado cai a meio caminho da rampa e sobra um
 * degrau de ~11/255 onde um arco claro encosta na borda.
 */
const ESMAECE_LATERAIS =
  "[-webkit-mask-image:linear-gradient(to_right,transparent_1%,#000_7%,#000_93%,transparent_99%)] [mask-image:linear-gradient(to_right,transparent_1%,#000_7%,#000_93%,transparent_99%)]";
const ESMAECE_TOPO_E_BASE =
  "[-webkit-mask-image:linear-gradient(to_bottom,transparent_1%,#000_6%,#000_94%,transparent_99%)] [mask-image:linear-gradient(to_bottom,transparent_1%,#000_6%,#000_94%,transparent_99%)]";

function BlocoDaTurma({ turma }: { turma: Turma }) {
  // A etiqueta é branca. Sobre o roxo da section ela se destaca sozinha, mas
  // cai em cima de um arco claro da composição, e branco sobre o arco amarelo
  // dá 1.60:1. O contorno é o que a delimita ali, e some sobre o roxo.
  const etiqueta = cn(
    "absolute rounded-botao bg-ck-branco px-4 py-2 ring-1 ring-ck-roxo-profundo/70",
    "font-corpo text-sm font-semibold text-ck-roxo-profundo shadow-sombra-forte",
  );

  return (
    <div className="relative mx-auto w-full max-w-lg lg:max-w-none lg:self-start">
      {/* Sem card e sem cantos arredondados: o fundo da arte é a mesma cor da
          section, e as bordas esmaecem, então ela se dissolve no fundo em vez
          de virar um retângulo. Sem recorte também, senão o corte comeria
          crianças inteiras das pontas. As etiquetas ficam fora da máscara. */}
      <div className={ESMAECE_LATERAIS}>
        <Image
          src={turma.imagem}
          alt={turma.imagemAlt}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className={cn("h-auto w-full", ESMAECE_TOPO_E_BASE)}
        />
      </div>

      {/* Etiquetas flutuantes, como na referência. */}
      <span className={cn(etiqueta, "-left-2 top-5 -rotate-3 md:-left-4")}>
        {turma.destaques[0]}
      </span>
      <span className={cn(etiqueta, "-right-2 bottom-5 rotate-2 md:-right-4")}>
        {turma.destaques[1]}
      </span>
    </div>
  );
}

export function Cursos() {
  return (
    <Section id="cursos" variant="noite">
      <SectionContainer>
        <div className="flex flex-col items-center text-center">
          <p className="font-corpo text-sm font-semibold uppercase tracking-[0.2em] text-ck-amarelo">
            {/* Em expressão, senão o ESLint lê as duas barras como comentário. */}
            <span aria-hidden="true" className="text-ck-branco/50">
              {"// "}
            </span>
            Cursos e turmas
          </p>

          <h2 className="mt-4 max-w-4xl font-display text-[2rem] font-bold leading-[1.05] tracking-tight text-ck-branco sm:text-5xl lg:text-6xl">
            Uma turma para cada fase.
          </h2>

          <p className="mt-6 max-w-2xl font-corpo text-lg leading-relaxed text-ck-branco/80 md:text-xl">
            As turmas são organizadas por faixa etária, para que cada aluno
            encontre desafios do tamanho da sua curiosidade.
          </p>
        </div>

        <Tabs defaultValue={TURMAS[0].id} className="mt-12">
          <TabsList aria-label="Turmas por faixa etária">
            {TURMAS.map((turma) => (
              <TabsTrigger
                key={turma.id}
                value={turma.id}
                acento={turma.acento}
              >
                {turma.faixa}
              </TabsTrigger>
            ))}
          </TabsList>

          {TURMAS.map((turma) => {
            const acento = ACENTOS_TURMA[turma.acento];

            return (
              <TabsContent key={turma.id} value={turma.id}>
                <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14">
                  {/* Painel de detalhes. A borda do topo amarra o painel à aba. */}
                  <div
                    className={cn(
                      "rounded-card border-t-4 bg-ck-branco/5 p-7 md:p-9",
                      acento.linha,
                    )}
                  >
                    <div className="flex flex-wrap gap-2">
                      {turma.chips.map((chip) => (
                        <Chip key={chip}>{chip}</Chip>
                      ))}
                    </div>

                    <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-ck-branco md:text-3xl">
                      {turma.titulo}
                    </h3>

                    <p className="mt-4 font-corpo text-lg leading-relaxed text-ck-branco/90">
                      {turma.abertura}
                    </p>

                    {/* A progressão dentro da própria faixa: o conteúdo muda
                        conforme a criança avança dentro da mesma turma. */}
                    <div className="mt-7 flex flex-col gap-6">
                      {turma.fases.map((fase) => (
                        <div
                          key={fase.rotulo}
                          className={cn("border-l-2 pl-5", acento.linha)}
                        >
                          {/* Rótulo em branco, não na cor do acento: em texto
                              de 12px o azul dá 3.35:1, abaixo dos 4.5 exigidos.
                              A cor da turma fica na régua e na aspa. */}
                          <p className="font-corpo text-xs font-semibold uppercase tracking-[0.16em] text-ck-branco/70">
                            {fase.rotulo}
                          </p>
                          <p className="mt-2 font-corpo leading-relaxed text-ck-branco/80">
                            {fase.texto}
                          </p>
                        </div>
                      ))}
                    </div>

                    <blockquote className="mt-8 flex gap-3">
                      <span
                        aria-hidden="true"
                        className={cn(
                          "font-display text-4xl leading-none",
                          acento.marca,
                        )}
                      >
                        &ldquo;
                      </span>
                      <p className="font-display text-lg font-medium leading-snug text-ck-branco md:text-xl">
                        {turma.citacao}
                      </p>
                    </blockquote>
                  </div>

                  <BlocoDaTurma turma={turma} />
                </div>
              </TabsContent>
            );
          })}
        </Tabs>

        {/* Fecho da section: vale para as três faixas, por isso fica fora das
            abas. Termina na frase mais forte do material, e então o CTA. */}
        <div className="mx-auto mt-16 flex max-w-3xl flex-col items-center border-t border-ck-branco/15 pt-12 text-center">
          <p className="font-corpo text-lg leading-relaxed text-ck-branco/80">
            Cada conteúdo, em cada faixa etária, é escolhido porque o cérebro
            dessa criança está pronto para recebê-lo, processá-lo e transformá-lo
            em habilidade real.
          </p>

          <p className="mt-6 font-display text-2xl font-bold leading-tight tracking-tight text-ck-amarelo md:text-3xl">
            Não é apenas aprender algo novo, mas se tornar capaz de usar o
            aprendizado para resolver problemas reais.
          </p>

          <Button asChild variant="destaque" className="mt-10">
            <a href="#matriculas">Quero saber mais</a>
          </Button>
        </div>
      </SectionContainer>
    </Section>
  );
}

export default Cursos;
