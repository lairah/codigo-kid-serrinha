// Seção #faq: as dúvidas que aparecem antes da matrícula, em acordeão.
//
// Fica depois de Matrículas de propósito: quem chegou até a chamada e não
// clicou normalmente parou numa dúvida, e é ela que precisa ser respondida.
// É também o destino do item "Dúvidas" do menu.
import * as React from "react";

import { Section, SectionContainer } from "@/components/layout/Section";
import {
  Acordeao,
  AcordeaoConteudo,
  AcordeaoGatilho,
  AcordeaoItem,
} from "@/components/ui/Acordeao";

/**
 * A resposta vem em blocos, e não numa string só, porque o conteúdo da escola
 * tem formas diferentes: a maioria é parágrafo corrido, a de condições
 * especiais traz uma lista de dois itens, e a de aprendizagem tem cinco
 * parágrafos. União discriminada em vez de "parágrafos + itens opcionais":
 * assim a posição da lista é explícita, e não uma convenção implícita que a
 * próxima revisão de texto quebra.
 */
type BlocoDaResposta =
  { tipo: "paragrafo"; texto: string } | { tipo: "lista"; itens: string[] };

interface Pergunta {
  /** Usado no `value` do item e no id de aria. */
  id: string;
  pergunta: string;
  resposta: BlocoDaResposta[];
}

const p = (texto: string): BlocoDaResposta => ({ tipo: "paragrafo", texto });

/** Conteúdo fornecido pela escola. */
const PERGUNTAS: Pergunta[] = [
  {
    id: "idade",
    pergunta: "A partir de qual idade meu filho(a) pode começar?",
    resposta: [
      p(
        "Na Código Kid Serrinha, as atividades são destinadas a crianças a partir dos 04 anos. A proposta é oferecer experiências de aprendizagem adequadas a cada faixa etária, respeitando o desenvolvimento e o ritmo de cada criança.",
      ),
    ],
  },
  {
    id: "dias-e-horarios",
    pergunta: "Em quais dias e horários acontecem as aulas?",
    resposta: [
      p(
        "As aulas acontecem de segunda a sexta-feira, das 14h às 18h, e aos sábados, das 8h às 12h. A disponibilidade de dias e horários depende das turmas e vagas disponíveis. Entre em contato com a escola para consultar as opções para seu filho(a).",
      ),
    ],
  },
  {
    id: "matriculas-abertas",
    pergunta: "As matrículas ficam abertas durante todo o ano?",
    resposta: [
      p(
        "As matrículas podem ser realizadas ao longo do ano, conforme a disponibilidade de vagas nas turmas. Entre em contato com a Código Kid Serrinha para verificar as opções e encontrar o melhor momento para seu filho(a) começar.",
      ),
    ],
  },
  {
    id: "aula-experimental",
    pergunta: "A escola oferece aula experimental?",
    resposta: [
      p(
        "Sim! A Código Kid Serrinha oferece aula experimental gratuita. É uma oportunidade para a criança conhecer o ambiente, experimentar uma atividade e ter um primeiro contato com nossa proposta de aprendizagem, sem compromisso.",
      ),
    ],
  },
  {
    id: "bolsas",
    pergunta: "A escola oferece bolsas ou condições especiais?",
    resposta: [
      p(
        "Sim! Temos condições especiais para tornar a experiência da Código Kid Serrinha ainda mais acessível para as famílias:",
      ),
      {
        tipo: "lista",
        itens: [
          "Famílias com mais de um filho matriculado: cada aluno recebe 10% de desconto na mensalidade.",
          "Clientes Nonato Gold: também têm direito a 10% de desconto na mensalidade.",
        ],
      },
      p(
        "Entre em contato com nossa equipe para saber mais sobre as condições e como aproveitar esses benefícios.",
      ),
    ],
  },
  {
    id: "o-que-aprende",
    pergunta: "O que o meu filho(a) vai aprender nas aulas?",
    resposta: [
      p(
        "Na Código Kid Serrinha, não trabalhamos com cursos padronizados. E isso é uma escolha pedagógica, não uma limitação.",
      ),
      p(
        "Cada criança que se matricula tem acesso a tudo que desenvolvemos: robótica, eletrônica, programação, criação de jogos, oratória e educação financeira. Mas o percurso de cada uma é único.",
      ),
      p(
        "Nossa abordagem é fundamentada no neurodesenvolvimento, porque entendemos que crianças aprendem de formas diferentes e em ritmos diferentes. Colocar todas no mesmo caminho pode limitar justamente o maior recurso que cada aluno tem: o próprio potencial.",
      ),
      p(
        "Por isso, o percurso do seu filho ou filha é construído junto com ele, considerando suas aptidões, seus interesses e o estágio de desenvolvimento em que se encontra.",
      ),
      p(
        "O resultado é uma experiência de aprendizado que a criança sente como sua. E quando uma criança se sente vista, ela se envolve de verdade.",
      ),
    ],
  },
];

/**
 * Achata os blocos de uma resposta em texto corrido, para o schema.
 *
 * O `FAQPage` do schema.org quer a resposta como um texto só, então a lista
 * vira itens separados por quebra de linha. Sai do MESMO `PERGUNTAS` que
 * renderiza a tela: sem segunda fonte de verdade, e sem o risco clássico de o
 * schema continuar anunciando uma resposta que o site já mudou.
 */
function respostaEmTexto(resposta: BlocoDaResposta[]): string {
  return resposta
    .map((bloco) =>
      bloco.tipo === "paragrafo" ? bloco.texto : bloco.itens.join("\n"),
    )
    .join("\n\n");
}

function dadosEstruturados() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: PERGUNTAS.map((item) => ({
      "@type": "Question",
      name: item.pergunta,
      acceptedAnswer: {
        "@type": "Answer",
        text: respostaEmTexto(item.resposta),
      },
    })),
  };
}

export function Faq() {
  return (
    <Section id="faq" variant="marfim">
      {/* Habilita as perguntas expandidas no resultado de busca. Fica dentro
          da seção porque é dela que o conteúdo vem. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(dadosEstruturados()),
        }}
      />

      <SectionContainer>
        <div className="flex flex-col items-center text-center">
          <p className="font-corpo text-sm font-semibold uppercase tracking-[0.2em] text-ck-acao">
            {/* Em expressão, senão o ESLint lê as duas barras como comentário. */}
            <span aria-hidden="true" className="text-ck-amarelo-escuro">
              {"// "}
            </span>
            Perguntas frequentes
          </p>

          <h2 className="mt-4 max-w-3xl font-display text-[2rem] font-bold leading-[1.05] tracking-tight text-ck-roxo-profundo sm:text-5xl">
            Ainda ficou alguma dúvida?
          </h2>

          <p className="mt-6 max-w-2xl font-corpo text-lg leading-relaxed text-ck-tinta-suave">
            As perguntas que mais aparecem antes da primeira aula.
          </p>
        </div>

        {/* `single` com `collapsible`: uma resposta aberta por vez mantém a
            lista de perguntas legível, e o `collapsible` deixa fechar a que
            está aberta em vez de obrigar a ter sempre uma.

            Nenhuma abre por padrão — a primeira tela precisa mostrar as
            perguntas, que é o que a pessoa vem procurar. */}
        <Acordeao
          type="single"
          collapsible
          className="mx-auto mt-14 max-w-3xl border-t border-ck-tinta/20"
        >
          {PERGUNTAS.map((item, indice) => (
            <AcordeaoItem key={item.id} value={item.id}>
              <AcordeaoGatilho>
                {/* O número é decorativo: a ordem não carrega informação, e o
                    gatilho já é anunciado pela pergunta. */}
                <span
                  aria-hidden="true"
                  className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md bg-ck-acao font-display text-xs font-bold text-ck-branco"
                >
                  {indice + 1}
                </span>

                {/* `span`, e não `h3`: o `Accordion.Header` do Radix já
                    renderiza um `<h3>` em volta do gatilho, que é o padrão
                    ARIA de acordeão (heading > button). Um `h3` aqui dentro
                    aninharia heading em heading e quebraria a hierarquia. */}
                <span className="font-corpo text-base font-semibold leading-snug text-ck-roxo-profundo md:text-lg">
                  {item.pergunta}
                </span>
              </AcordeaoGatilho>

              {/* Alinhado com a pergunta, e não com o número: a resposta
                  pertence ao texto, não à numeração. */}
              <AcordeaoConteudo className="flex flex-col gap-4 pl-11 font-corpo leading-relaxed text-ck-tinta-suave">
                {item.resposta.map((bloco, i) =>
                  bloco.tipo === "paragrafo" ? (
                    <p key={i}>{bloco.texto}</p>
                  ) : (
                    /* `<ul>` de verdade, e não parágrafos soltos: são dois
                       benefícios paralelos, e a lista é o que diz isso para
                       quem lê e para quem ouve a página. */
                    <ul key={i} className="flex flex-col gap-2">
                      {bloco.itens.map((texto) => (
                        <li key={texto} className="flex gap-3">
                          <span
                            aria-hidden="true"
                            className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-ck-acao"
                          />
                          {texto}
                        </li>
                      ))}
                    </ul>
                  ),
                )}
              </AcordeaoConteudo>
            </AcordeaoItem>
          ))}
        </Acordeao>
      </SectionContainer>
    </Section>
  );
}

export default Faq;
