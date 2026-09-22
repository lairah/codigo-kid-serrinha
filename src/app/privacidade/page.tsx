// Rota /privacidade: a Política de Privacidade, na íntegra.
//
// O texto é da escola e entra palavra por palavra — documento jurídico não se
// parafraseia nem se "melhora" na diagramação. O que este arquivo faz é dar a
// ele estrutura semântica (títulos, listas, âncoras) e largura de leitura.
import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { BotaoWhatsapp } from "@/components/layout/BotaoWhatsapp";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Section, SectionContainer } from "@/components/layout/Section";
import { ESCOLA } from "@/lib/escola";
import { IMAGEM_DE_COMPARTILHAMENTO } from "@/lib/site";

const DESCRICAO_DA_PAGINA =
  "Como a Código Kid Serrinha trata os dados pessoais de alunos, pais, responsáveis e visitantes do site.";

export const metadata: Metadata = {
  // Sem sufixo: o `title.template` do layout raiz já acrescenta "| Código Kid".
  title: "Política de Privacidade",
  description: DESCRICAO_DA_PAGINA,
  alternates: { canonical: "/privacidade" },
  openGraph: {
    // Espalhado porque declarar `openGraph` substitui o do layout inteiro.
    ...IMAGEM_DE_COMPARTILHAMENTO,
    title: "Política de Privacidade",
    description: DESCRICAO_DA_PAGINA,
    url: "/privacidade",
  },
};

const ATUALIZADA_EM = "18 de setembro de 2026";

/**
 * Blocos da política. O `email` é um tipo próprio, e não texto corrido, porque
 * o endereço aparece três vezes e precisa ser um `mailto:` clicável nas três —
 * além de vir de `escola.ts`, para nunca divergir do que o rodapé mostra.
 */
type Bloco =
  | { tipo: "paragrafo"; texto: string }
  | { tipo: "lista"; itens: string[] }
  | { tipo: "dados"; itens: { rotulo: string; valor: string }[] }
  | { tipo: "email" };

interface SecaoDaPolitica {
  /** Vira o id do título: permite linkar uma cláusula específica. */
  id: string;
  titulo: string;
  blocos: Bloco[];
}

const p = (texto: string): Bloco => ({ tipo: "paragrafo", texto });

const ABERTURA: Bloco[] = [
  p(
    `A ${ESCOLA.nomeCompleto}, mantida por ${ESCOLA.razaoSocial}, valoriza a privacidade e a proteção dos dados pessoais de seus alunos, pais, responsáveis e visitantes do nosso site.`,
  ),
  p(
    "Esta Política de Privacidade explica, de forma transparente, como os dados pessoais podem ser tratados durante a utilização do nosso site e no relacionamento com a instituição.",
  ),
];

const SECOES: SecaoDaPolitica[] = [
  {
    id: "quem-somos",
    titulo: "1. Quem somos",
    blocos: [
      {
        tipo: "dados",
        itens: [
          { rotulo: "Razão social", valor: ESCOLA.razaoSocial },
          { rotulo: "CNPJ", valor: ESCOLA.cnpj },
        ],
      },
      p("E-mail para contato:"),
      { tipo: "email" },
    ],
  },
  {
    id: "dados-coletados",
    titulo: "2. Quais dados podemos coletar",
    blocos: [
      p(
        "Por meio do nosso site, podemos coletar informações fornecidas pelos usuários, especialmente por meio do formulário destinado ao processo de matrícula.",
      ),
      p("Essas informações podem incluir dados como:"),
      {
        tipo: "lista",
        itens: [
          "nome completo do aluno;",
          "data de nascimento;",
          "nome e dados de contato dos pais ou responsáveis;",
          "outras informações necessárias ao processo de matrícula e relacionamento com a família.",
        ],
      },
      p(
        "Também podem ser coletadas informações relacionadas à navegação no site por meio de ferramentas de análise, como o Google Analytics.",
      ),
      p(
        "A coleta de dados é realizada de acordo com as finalidades informadas e com a legislação aplicável.",
      ),
    ],
  },
  {
    id: "finalidades",
    titulo: "3. Para que utilizamos os dados",
    blocos: [
      p("Os dados pessoais coletados podem ser utilizados para:"),
      {
        tipo: "lista",
        itens: [
          "realizar e dar andamento a processos de matrícula;",
          "entrar em contato com pais e responsáveis;",
          "atender solicitações e dúvidas;",
          "manter o relacionamento com alunos e suas famílias;",
          "prestar os serviços educacionais oferecidos pela instituição;",
          "cumprir obrigações legais e regulatórias, quando aplicável;",
          "compreender o desempenho e a utilização do nosso site;",
          "melhorar a experiência de navegação e o funcionamento das páginas.",
        ],
      },
      p(
        "Os dados não devem ser utilizados para finalidades incompatíveis com aquelas informadas ao titular.",
      ),
    ],
  },
  {
    id: "criancas-e-adolescentes",
    titulo: "4. Dados de crianças e adolescentes",
    blocos: [
      p(
        `A ${ESCOLA.nomeCompleto} atende crianças e adolescentes e reconhece a importância de proteger seus dados pessoais.`,
      ),
      p(
        "O tratamento de dados pessoais de crianças e adolescentes será realizado observando a Lei Geral de Proteção de Dados Pessoais (LGPD), especialmente as disposições aplicáveis a esse público, sempre considerando seu melhor interesse.",
      ),
      p(
        "As informações solicitadas no processo de matrícula devem estar relacionadas às finalidades necessárias para o atendimento e a prestação dos serviços da instituição.",
      ),
    ],
  },
  {
    id: "imagens-e-videos",
    titulo: "5. Uso de imagens e vídeos",
    blocos: [
      p(
        `A ${ESCOLA.nomeCompleto} pode utilizar fotografias e vídeos produzidos em atividades e eventos institucionais para apresentar as experiências realizadas pela escola e divulgar suas atividades.`,
      ),
      p(
        "O site contém, por exemplo, registros de atividades realizadas pela instituição, incluindo um campeonato de lançamento de foguetes, no qual aparecem alunos e pais ou responsáveis em depoimentos.",
      ),
      p(
        "A utilização dessas imagens e vídeos ocorre mediante as autorizações aplicáveis, respeitando os direitos de imagem, privacidade e demais direitos previstos na legislação.",
      ),
    ],
  },
  {
    id: "cookies",
    titulo: "6. Cookies e Google Analytics",
    blocos: [
      p(
        "Nosso site utiliza o Google Analytics para compreender como os visitantes utilizam as páginas e acompanhar informações relacionadas ao desempenho do site, como métricas de acesso e audiência.",
      ),
      p(
        "Essas informações nos ajudam a compreender o funcionamento do site e identificar oportunidades de melhoria na experiência dos visitantes.",
      ),
      p(
        "A utilização de cookies e tecnologias semelhantes será realizada de acordo com as configurações implementadas no site e com a legislação aplicável.",
      ),
    ],
  },
  {
    id: "compartilhamento",
    titulo: "7. Compartilhamento de dados",
    blocos: [
      p(
        "Os dados pessoais poderão ser compartilhados quando isso for necessário para a execução de atividades relacionadas aos serviços da instituição, para utilização de ferramentas necessárias ao funcionamento do site e da escola ou para cumprimento de obrigações legais.",
      ),
      p(
        "Quando houver utilização de fornecedores ou serviços de terceiros que tenham acesso a dados pessoais, o tratamento deverá observar as finalidades aplicáveis e as responsabilidades previstas na legislação.",
      ),
    ],
  },
  {
    id: "seguranca",
    titulo: "8. Segurança das informações",
    blocos: [
      p(
        `A ${ESCOLA.nomeCompleto} busca adotar medidas técnicas e administrativas adequadas para proteger os dados pessoais contra acessos não autorizados, perda, alteração, divulgação ou outras formas inadequadas de tratamento.`,
      ),
      p(
        "As medidas de segurança são consideradas de acordo com a natureza dos dados tratados, as finalidades do tratamento e os riscos envolvidos.",
      ),
    ],
  },
  {
    id: "direitos",
    titulo: "9. Direitos dos titulares",
    blocos: [
      p(
        "Nos termos da LGPD e observadas as condições previstas na legislação, os titulares de dados pessoais podem exercer direitos relacionados ao tratamento de suas informações, incluindo aqueles previstos no artigo 18 da Lei nº 13.709/2018.",
      ),
      p(
        "Para solicitações relacionadas aos dados pessoais, dúvidas ou informações sobre privacidade, o titular ou seu responsável legal poderá entrar em contato conosco pelo e-mail:",
      ),
      { tipo: "email" },
      p(
        "As solicitações serão analisadas de acordo com a legislação aplicável e poderão exigir a confirmação da identidade do solicitante.",
      ),
    ],
  },
  {
    id: "atualizacoes",
    titulo: "10. Atualizações desta Política",
    blocos: [
      p(
        "Esta Política de Privacidade poderá ser atualizada para refletir alterações nas atividades da instituição, nos serviços utilizados, nas tecnologias empregadas ou na legislação aplicável.",
      ),
      p(
        "Recomendamos que os visitantes consultem esta página periodicamente para acompanhar eventuais atualizações.",
      ),
    ],
  },
  {
    id: "contato",
    titulo: "11. Contato",
    blocos: [
      p(
        "Para dúvidas, solicitações ou informações relacionadas à privacidade e ao tratamento de dados pessoais:",
      ),
      {
        tipo: "dados",
        itens: [
          { rotulo: "Razão social", valor: ESCOLA.razaoSocial },
          { rotulo: "CNPJ", valor: ESCOLA.cnpj },
        ],
      },
      p("E-mail:"),
      { tipo: "email" },
    ],
  },
];

const FECHO =
  `Esta Política de Privacidade foi elaborada para apresentar de forma transparente as principais práticas relacionadas ao tratamento de dados pessoais pela ${ESCOLA.nomeCompleto}.`;

function LinkDeEmail() {
  return (
    <a
      href={`mailto:${ESCOLA.email}`}
      className="inline-flex min-h-11 items-center font-semibold text-ck-acao underline decoration-ck-acao/40 underline-offset-4 transition-colors duration-220 ease-ck hover:decoration-ck-acao motion-reduce:transition-none"
    >
      {ESCOLA.email}
    </a>
  );
}

function Blocos({ blocos }: { blocos: Bloco[] }) {
  return (
    <div className="flex flex-col gap-4">
      {blocos.map((bloco, i) => {
        if (bloco.tipo === "paragrafo") return <p key={i}>{bloco.texto}</p>;
        if (bloco.tipo === "email") return <LinkDeEmail key={i} />;

        if (bloco.tipo === "dados") {
          return (
            // `<dl>` porque são pares rótulo/valor, e não prosa: é o que faz um
            // leitor de tela anunciar "Razão social" junto com o valor.
            <dl key={i} className="flex flex-col gap-1">
              {bloco.itens.map((item) => (
                <div key={item.rotulo} className="flex flex-wrap gap-x-2">
                  <dt className="font-semibold text-ck-roxo-profundo">
                    {item.rotulo}:
                  </dt>
                  <dd>{item.valor}</dd>
                </div>
              ))}
            </dl>
          );
        }

        return (
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
        );
      })}
    </div>
  );
}

export default function PaginaDePrivacidade() {
  return (
    <>
      <Header />

      <main id="conteudo">
        <Section variant="roxo-profundo" espacamento="compacto">
          <SectionContainer>
            <Link
              href="/"
              className="inline-flex min-h-11 items-center gap-2 font-corpo text-ck-branco/75 transition-colors duration-220 ease-ck hover:text-ck-branco motion-reduce:transition-none"
            >
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
              Voltar para a Código Kid
            </Link>

            <h1 className="mt-4 font-display text-[2rem] font-bold leading-[1.05] tracking-tight text-ck-branco sm:text-5xl">
              Política de Privacidade
            </h1>

            {/* `<time>` com `dateTime` legível por máquina: a data em português
                por extenso não é interpretável sozinha. */}
            <p className="mt-4 font-corpo text-ck-branco/75">
              Última atualização:{" "}
              <time dateTime="2026-09-18">{ATUALIZADA_EM}</time>
            </p>
          </SectionContainer>
        </Section>

        <Section variant="marfim">
          {/* 68ch e não `max-w-3xl`: texto jurídico é leitura longa e corrida,
              e a faixa confortável fica entre 60 e 75 caracteres por linha —
              os 768px do resto do site dariam perto de 90.

              O limite pega a caixa inteira, padding incluído, então a coluna de
              texto acaba em 513px. Medido no render: 61 caracteres por linha no
              desktop e 40 no telefone. */}
          <SectionContainer className="mx-auto max-w-[68ch]">
            <div className="flex flex-col gap-4 font-corpo leading-relaxed text-ck-tinta-suave">
              <Blocos blocos={ABERTURA} />
            </div>

            <div className="mt-12 flex flex-col gap-10">
              {SECOES.map((secao) => (
                <section key={secao.id} aria-labelledby={secao.id}>
                  <h2
                    id={secao.id}
                    className="font-display text-xl font-bold leading-snug tracking-tight text-ck-roxo-profundo sm:text-2xl"
                  >
                    {secao.titulo}
                  </h2>

                  <div className="mt-4 font-corpo leading-relaxed text-ck-tinta-suave">
                    <Blocos blocos={secao.blocos} />
                  </div>
                </section>
              ))}
            </div>

            <p className="mt-12 border-t border-ck-tinta/20 pt-8 font-corpo leading-relaxed text-ck-tinta-suave">
              {FECHO}
            </p>
          </SectionContainer>
        </Section>
      </main>

      <Footer />

      <BotaoWhatsapp />
    </>
  );
}
