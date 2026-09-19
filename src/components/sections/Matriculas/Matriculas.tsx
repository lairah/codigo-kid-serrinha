// Seção #matriculas: a chamada que fecha o discurso da página.
//
// Só dois caminhos e nada mais. Formulário, endereço e telefone são de
// #contato, a seção seguinte — dois formulários seguidos encerrariam a página
// pedindo duas vezes a mesma coisa.
//
// Ela é o destino dos dois CTAs mais fortes que já estavam no ar: o "Matricule
// seu filho" do header (quem já decidiu) e o "Quero saber mais" do fecho de
// Cursos (quem ainda avalia). Os dois botões existem por causa disso: são dois
// públicos aterrissando no mesmo lugar, não simetria de composição.
import * as React from "react";
import Image from "next/image";
import { CalendarCheck, ClipboardList } from "lucide-react";

import { Section, SectionContainer } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { ShineBorder } from "@/components/ui/hero-designali";
import fundoMatricula from "@/images/fundo-matricula.webp";
import {
  ESCOLA,
  MENSAGEM_DE_AGENDAMENTO,
  linkDoWhatsapp,
} from "@/lib/escola";

/**
 * Marcador provisório dos dois botões. É a mesma âncora que `Projetos.tsx` já
 * usa, e deixa de ser marcador quando a seção de Contato entrar.
 */
const ANCORA_PROVISORIA = "#contato";

export function Matriculas() {
  const agendamento =
    linkDoWhatsapp(MENSAGEM_DE_AGENDAMENTO) || ANCORA_PROVISORIA;
  const matricula = ESCOLA.formularioDeMatricula || ANCORA_PROVISORIA;

  // Enquanto o número não chega, o botão cai numa âncora desta mesma página, e
  // aí `target="_blank"` abriria o site em cima do site.
  const agendamentoSaiDoSite = agendamento !== ANCORA_PROVISORIA;
  // O formulário mora no Tally, então este também sai do site. Quando a rota
  // `/matricula` existir, isto volta a ser navegação interna.
  const matriculaSaiDoSite = matricula.startsWith("http");

  const conteudoDaMatricula = (
    <>
      <ClipboardList aria-hidden="true" className="h-5 w-5" />
      Fazer matrícula
    </>
  );

  return (
    <Section id="matriculas" variant="amarelo">
      {/* A bancada da escola: robô, Arduino, LEGO, protoboard e projeto no
          papel. Entra como fundo da seção inteira porque a composição já
          reserva o miolo — 0 a 1% de pixels escuros na coluna central, contra
          25 a 37% nas laterais. É a foto que diz o que a criança vai construir,
          logo abaixo do convite para vir ver.

          Sem `priority`: a seção é a penúltima da página e nunca está na
          primeira tela. */}
      <Image
        src={fundoMatricula}
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />

      {/* Véu de contraste. Quatro decisões, todas medidas:

          1. A COR é o amarelo limpo amostrado do centro da própria imagem
             (#FDCE6B), não o `ck-amarelo` do token (#FDC500). Assim o véu é
             invisível como véu: no miolo ele cai sobre a mesma cor que já está
             lá, e só aparece onde a foto escurece — que é exatamente onde ele
             precisa aparecer. Com o token haveria emenda de tom entre o centro
             velado e as bordas cruas.

          2. O EIXO é horizontal e uniforme na vertical. Os objetos ocupam as
             bordas esquerda e direita em toda a altura, e a faixa de baixo
             também precisa de cobertura — um radial deixaria o rodapé
             descoberto.

          3. A BORDA DO PLANALTO vem em PIXELS, não em porcentagem, e é a mesma
             conta que posiciona o texto: `max(padding, (100% - largura
             máxima)/2)`. Em porcentagem isso quebra, e quebrou: o texto tem
             largura máxima fixa, então quanto mais estreita a tela, maior a
             fração que ele ocupa. Com o planalto em 15-85% o título ia de 6% a
             94% aos 1024 e caía na rampa, onde o véu chegava a 29% — dava
             1.41:1 ali. Em pixels o planalto acompanha o texto sozinho, em
             qualquer largura, sem breakpoint para isso.

             58rem em vez dos 56rem do `max-w-4xl` deixa 16px de margem entre o
             fim do planalto e a primeira letra.

          4. A FORÇA cai conforme sobra largura, porque a necessidade cai. O
             mínimo medido para 20% de folga sobre o piso: 67% entre 560 e
             1024px, 59% aos 1280, 53% aos 1440 e 36% aos 1920 — quanto mais
             larga a tela, menos o texto encosta nas bordas escuras. Então o véu
             segue em 68% onde ele é estrutural e alivia nas telas grandes, que
             é justamente onde a foto tem o que mostrar.

             Abaixo de 480px o mínimo cai para 19%, mas ali não vale
             breakpoint: o recorte mostra só o miolo limpo, e o véu tem a mesma
             cor do que está embaixo — aliviar não revelaria nada. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 [--borda-veu:max(0.75rem,(100%-58rem)/2)] [background:linear-gradient(to_right,transparent_0,#FDCE6BAD_var(--borda-veu),#FDCE6BAD_calc(100%-var(--borda-veu)),transparent_100%)] xl:[background:linear-gradient(to_right,transparent_0,#FDCE6B99_var(--borda-veu),#FDCE6B99_calc(100%-var(--borda-veu)),transparent_100%)] 2xl:[background:linear-gradient(to_right,transparent_0,#FDCE6B85_var(--borda-veu),#FDCE6B85_calc(100%-var(--borda-veu)),transparent_100%)]"
      />

      <SectionContainer className="flex flex-col items-center text-center">
        <p className="font-corpo text-sm font-semibold uppercase tracking-[0.2em] text-ck-acao">
          {/* Em expressão, senão o ESLint lê as duas barras como comentário.
              Aqui a cor foge do `amarelo-escuro` das outras seções: sobre este
              amarelo ele dá 1.35:1 e simplesmente não aparece. `acao/40` dá
              1.97:1, o mesmo peso que o marcador tem hoje sobre marfim. */}
          <span aria-hidden="true" className="text-ck-acao/40">
            {"// "}
          </span>
          Matrículas
        </p>

        <h2 className="mt-4 max-w-4xl font-display text-[2rem] font-bold leading-[1.05] tracking-tight text-ck-roxo-profundo sm:text-5xl lg:text-6xl">
          A curiosidade de hoje pode criar o amanhã.
        </h2>

        {/* Corpo em `tinta` e não em `tinta-suave` como nas outras seções: elas
            vivem sobre marfim, onde o suave dá ~7:1. Sobre este amarelo ele cai
            para 5.01:1, e some abaixo de AA na hora que a foto passa por
            baixo. */}
        <p className="mt-6 max-w-2xl font-corpo text-lg leading-relaxed text-ck-tinta md:text-xl">
          Na Código Kid, seu filho explora, cria e desenvolve novas habilidades
          enquanto aprende tecnologia na prática. Agende uma aula experimental e
          descubra essa experiência de perto.
        </p>

        {/* Empilhados e de largura cheia no telefone, com o principal em cima.
            O botão preenchido é o do WhatsApp de propósito: é o caminho de
            menor atrito, então a hierarquia visual e o esforço real de cada
            caminho apontam para o mesmo lado. */}
        <div className="mt-10 flex w-full max-w-md flex-col items-stretch gap-4 sm:w-auto sm:max-w-none sm:flex-row sm:items-center">
          <Button
            asChild
            variant="primario"
            size="grande"
            className="w-full sm:w-auto"
          >
            <a
              href={agendamento}
              {...(agendamentoSaiDoSite
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              <CalendarCheck aria-hidden="true" className="h-5 w-5" />
              Agendar aula experimental
              {/* Link que troca de aplicativo tem que dizer que troca. */}
              {agendamentoSaiDoSite ? (
                <span className="sr-only"> (abre o WhatsApp)</span>
              ) : null}
            </a>
          </Button>

          {/* O contornado ganha fundo próprio, no mesmo amarelo do véu. Botão
              de fundo transparente sobre fotografia herda o que estiver
              atrás, e aqui isso reprovava: aos 768 ele cai em cima da
              protoboard, os fios passam por dentro dele e a borda `acao`
              dava 2.53:1 contra o piso de 3:1. Com o fundo opaco ele para de
              depender do recorte e fica em 6.56:1 em qualquer tamanho.

              Continua lendo como botão contornado, e não como botão cheio: a
              cor é a mesma do miolo da foto, então o fundo é invisível como
              fundo. O `hover` do variante segue valendo, porque a
              pseudoclasse vence na cascata.

              O brilho é o mesmo `ShineBorder` do CTA da hero, com três
              diferenças obrigatórias:

              - AS CORES não podem ser as da hero. Lá o trio é branco,
                turquesa e amarelo-claro, que sobre este amarelo dão 1.48, 1.43
                e 1.07:1 — média de 1.33 e brilho invisível. Entram `acao`,
                `coral-profundo` e `azul-profundo`: média de 4.54:1, e são as
                mesmas três do trilho da linha do tempo em /ebook, já medidas
                para traço fino sobre fundo claro.

              - O RAIO é 18 e não 14. O `p-1` do wrapper afasta a moldura 4px
                do botão, então o raio de fora precisa ser o de dentro mais 4
                para os cantos ficarem concêntricos. Com 14 nos dois o vão
                fecha nas quinas.

              - O BRILHO FICA FORA DO BOTÃO, que é o motivo de manter o `p-1`.
                Com o wrapper sem padding a moldura animada passaria por cima
                da borda `acao` de 2px, e é ela que identifica o controle:
                a cada volta o brilho derrubaria o contraste da borda no
                trecho que estivesse cobrindo. */}
          <ShineBorder
            borderRadius={18}
            borderWidth={3}
            duration={12}
            color={["#6B2280", "#C53A33", "#0173AC"]}
            /* A moldura cresce para FORA do slot, em vez de comer o botão.
               O `p-1` do ShineBorder afasta o botão 4px de cada lado, e
               medido no mobile isso deixava o de matrícula com 327px contra
               335px do outro, desalinhado em 4px — dois botões empilhados em
               largura cheia, um mais estreito que o outro, lê como degrau.

               Com 8px a mais de largura e -4px de margem, o miolo do wrapper
               cai exatamente sobre o slot e o botão volta aos 335px. A mesma
               margem negativa resolve o `sm`: sem ela o vão entre os dois
               botões viraria 20px, porque a moldura ocuparia 4px do gap. */
            className="-mx-1 w-[calc(100%+0.5rem)] sm:w-auto"
          >
            <Button
              asChild
              variant="secundario"
              size="grande"
              className="w-full bg-[#FDCE6B] sm:w-auto"
            >
              <a
                href={matricula}
                {...(matriculaSaiDoSite
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {conteudoDaMatricula}
                {matriculaSaiDoSite ? (
                  <span className="sr-only"> (abre em nova aba)</span>
                ) : null}
              </a>
            </Button>
          </ShineBorder>
        </div>
      </SectionContainer>
    </Section>
  );
}

export default Matriculas;
