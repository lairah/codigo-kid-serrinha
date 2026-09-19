// Seção #metodologia: a tecnologia como meio, não como fim.
// Título e subtítulo, perguntas dos pais em looping, frase de transição e
// os cinco pilares que a metodologia desenvolve na prática.
import * as React from "react";
import {
  Brain,
  Compass,
  Lightbulb,
  MessageCircle,
  RefreshCw,
  type LucideIcon,
} from "lucide-react";

import { Section, SectionContainer } from "@/components/layout/Section";
import { HighlightCard, type AcentoCard } from "@/components/ui/HighlightCard";
import { Marquee } from "@/components/ui/Marquee";

/** Dúvidas reais dos pais. Funcionam como ponte para a proposta da escola. */
const PERGUNTAS: string[] = [
  "Seu filho passa tempo demais nas telas?",
  "Como transformar o interesse por telas em algo mais criativo?",
  "Como encontrar uma atividade que realmente desperte a curiosidade dele?",
  "Como estimular autonomia desde cedo?",
  "Seu filho gosta de tecnologia, mas você queria que ele fizesse mais do que assistir?",
  "E se ele pudesse criar em vez de apenas consumir?",
  "Como transformar curiosidade em aprendizado?",
];

/**
 * Divide em blocos de tamanhos equilibrados (7 em 3 vira 3, 2, 2).
 * Fatiar por `ceil` deixaria a última linha com um item só, e uma faixa com
 * uma pergunta única repete de forma visível no looping.
 */
function dividirEquilibrado<T>(itens: T[], partes: number): T[][] {
  const base = Math.floor(itens.length / partes);
  const resto = itens.length % partes;
  const linhas: T[][] = [];
  let inicio = 0;

  for (let i = 0; i < partes; i++) {
    const tamanho = base + (i < resto ? 1 : 0);
    linhas.push(itens.slice(inicio, inicio + tamanho));
    inicio += tamanho;
  }

  return linhas;
}

interface Pilar {
  icone: LucideIcon;
  titulo: string;
  frase: string;
  descricao: string;
  acento: AcentoCard;
}

/**
 * Cinco pilares, não dez competências soltas: liderança está dentro de
 * autonomia, resolução de problemas dentro de pensamento crítico, e
 * colaboração e oratória dentro de comunicação.
 */
const PILARES: Pilar[] = [
  {
    icone: Lightbulb,
    titulo: "Criatividade",
    frase: "Transformar ideias em algo real.",
    descricao:
      "O aluno é incentivado a imaginar, experimentar e encontrar diferentes caminhos para transformar suas ideias em projetos concretos.",
    acento: "amarelo",
  },
  {
    icone: Compass,
    titulo: "Autonomia",
    frase: "Aprender a encontrar o próprio caminho.",
    descricao:
      "Ao longo dos projetos, o aluno toma decisões, assume responsabilidades, propõe soluções e aprende a confiar cada vez mais nas próprias escolhas.",
    acento: "azul",
  },
  {
    icone: Brain,
    titulo: "Pensamento crítico",
    frase: "Transformar desafios em soluções.",
    descricao:
      "O aluno aprende a fazer perguntas, analisar possibilidades, testar hipóteses, identificar erros e encontrar novas soluções durante a criação dos projetos.",
    acento: "roxo",
  },
  {
    icone: MessageCircle,
    titulo: "Comunicação",
    frase: "Uma boa ideia também precisa ser compartilhada.",
    descricao:
      "Ao trabalhar em equipe e apresentar seus projetos, o aluno aprende a ouvir, organizar suas ideias, se comunicar com clareza e contribuir para um objetivo comum.",
    acento: "turquesa",
  },
  {
    icone: RefreshCw,
    titulo: "Resiliência",
    frase: "Errar faz parte de criar.",
    descricao:
      "Ao testar, ajustar e tentar novamente, o aluno aprende que nem toda solução aparece na primeira tentativa, e que um erro pode ser o começo de uma nova descoberta.",
    acento: "coral",
  },
];

function Pergunta({ children }: { children: React.ReactNode }) {
  return (
    // 35% de amarelo separa a pastilha do marfim em 1.18 — o mesmo grau de
    // destaque da referência. O creme sólido ficava em 1.04, quase invisível.
    <span className="whitespace-nowrap rounded-botao border border-ck-amarelo-escuro/40 bg-ck-amarelo/35 px-4 py-2 font-corpo text-sm text-ck-tinta md:text-base">
      {children}
    </span>
  );
}

export function Metodologia() {
  const linhas = dividirEquilibrado(PERGUNTAS, 3);
  const duracoes = ["[--duration:45s]", "[--duration:52s]", "[--duration:40s]"];

  return (
    <Section id="metodologia" variant="marfim">
      <SectionContainer className="flex flex-col items-center text-center">
        <p className="font-corpo text-sm font-semibold uppercase tracking-[0.2em] text-ck-acao">
          {/* Em expressão, senão o ESLint lê as duas barras como comentário. */}
          <span aria-hidden="true" className="text-ck-amarelo-escuro">
            {"// "}
          </span>
          Metodologia
        </p>

        <h2 className="mt-4 max-w-4xl font-display text-[2rem] font-bold leading-[1.05] tracking-tight text-ck-roxo-profundo sm:text-5xl lg:text-6xl">
          Muito mais do que aprender a usar tecnologia.
        </h2>

        <p className="mt-6 max-w-2xl font-corpo text-lg leading-relaxed text-ck-tinta-suave md:text-xl">
          O nosso modelo de educação ensina crianças e famílias a se
          relacionarem com a tecnologia, tornando esse processo seguro e
          saudável enquanto a criança desperta criatividade, autonomia e
          pensamento crítico.
        </p>
      </SectionContainer>

      {/* Perguntas dos pais em looping. Sangram até as bordas da seção. */}
      <div className="relative mt-12 flex w-full flex-col gap-3">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ck-marfim md:w-32"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ck-marfim md:w-32"
        />

        {linhas.map((linha, indice) => (
          <Marquee
            key={indice}
            className={duracoes[indice]}
            reverse={indice === 1}
            pauseOnHover
            repeat={4}
          >
            {linha.map((pergunta) => (
              <Pergunta key={pergunta}>{pergunta}</Pergunta>
            ))}
          </Marquee>
        ))}
      </div>

      <SectionContainer className="mt-14 text-center">
        <p className="mx-auto max-w-2xl font-display text-xl font-semibold leading-snug text-ck-roxo-profundo md:text-2xl">
          Aqui a tecnologia é ferramenta, não objetivo final.
        </p>
      </SectionContainer>

      <SectionContainer className="mt-12">
        {/* Flex-wrap em vez de grade: com cinco cards, a última fileira fica
            centralizada em vez de sobrar encostada à esquerda. */}
        <div className="flex flex-wrap justify-center gap-6">
          {PILARES.map((pilar) => {
            const Icone = pilar.icone;

            return (
              <HighlightCard
                key={pilar.titulo}
                titulo={pilar.titulo}
                frase={pilar.frase}
                descricao={pilar.descricao}
                acento={pilar.acento}
                icone={<Icone className="h-9 w-9" strokeWidth={1.5} />}
                className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
              />
            );
          })}
        </div>
      </SectionContainer>
    </Section>
  );
}

export default Metodologia;
