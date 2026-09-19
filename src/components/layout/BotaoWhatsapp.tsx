// Botão flutuante do WhatsApp, no canto inferior direito.
//
// Sem mensagem pré-escrita, pela mesma razão do telefone no rodapé: quem clica
// num botão genérico de conversa pode querer qualquer coisa, e abrir o chat com
// "gostaria de agendar uma aula experimental" já digitado seria decidir pela
// pessoa. Só o CTA de Matrículas, que é declaradamente sobre agendar, leva
// texto junto.
"use client";

import * as React from "react";

import { IconeWhatsapp } from "@/components/ui/IconesDeMarca";
import { useScrolled } from "@/hooks/useScrolled";
import { linkDoWhatsapp } from "@/lib/escola";
import { cn } from "@/lib/utils";

/**
 * Só aparece depois de uma tela de rolagem. Na primeira dobra ele disputaria
 * atenção com o CTA da hero e cobriria parte da arte; e quem acabou de chegar
 * ainda não sabe o que quer perguntar.
 */
const LIMIAR_DE_ROLAGEM = 500;

export function BotaoWhatsapp() {
  const visivel = useScrolled(LIMIAR_DE_ROLAGEM);
  const destino = linkDoWhatsapp();

  // Sem número não há botão. Um flutuante que não leva a lugar nenhum é pior
  // do que flutuante nenhum.
  if (!destino) return null;

  return (
    <div
      className={cn(
        // Abaixo do header (z-100), que precisa passar por cima quando a
        // gaveta mobile abre.
        "fixed bottom-5 right-5 z-[90] md:bottom-8 md:right-8",
        "transition-[opacity,transform] duration-220 ease-ck",
        "motion-reduce:transition-none",
        visivel
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <div className="relative">
        {/* O halo. Fica atrás por ordem no DOM e é `aria-hidden`: é decoração,
            e quem ouve a página não ganha nada com ele.

            `motion-reduce:hidden` e não só `animate-none`: parado, o anel
            viraria um aro estático de 50% de opacidade em volta do botão, que
            não é o desenho pretendido — é melhor sumir. */}
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-0 rounded-full bg-[#25D366]",
            "animate-halo-zap motion-reduce:hidden",
          )}
        />

        <a
          href={destino}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "relative grid h-14 w-14 place-items-center rounded-full",
            // Verde primário do WhatsApp com glifo branco: o desenho que a
            // escola pediu, e o que o mundo inteiro reconhece.
            //
            // Registrando o número, porque ele é contraintuitivo: branco sobre
            // #25D366 dá 1.98:1. A regra de contraste de não-texto (WCAG
            // 1.4.11) abre exceção explícita para logotipos, e é exatamente
            // isso que o glifo é — a marca do WhatsApp. O controle não depende
            // dele para ser identificado: tem 56px, nome acessível próprio,
            // posição fixa e o anel abaixo dando a forma.
            "bg-[#25D366] text-ck-branco",
            // O anel não é enfeite, e nenhum tom de verde o dispensa: medi a
            // rampa inteira do #25D366 e, para o glifo branco chegar aos 3:1,
            // o verde precisa escurecer até ~80% — onde a borda contra o
            // amarelo de Matrículas ainda fica em 1.92. Escurecendo mais, ela
            // só alcança 2.60.
            //
            // O #075E54 é o teal escuro da própria WhatsApp: lê como borda do
            // botão, não como elemento estranho, e resolve os fundos claros
            // (4.81 no pior deles). Nos escuros quem separa é o verde do
            // preenchimento, de 7.55 a 9.50.
            "ring-2 ring-[#075E54]",
            "shadow-sombra-forte",
            "transition-transform duration-220 ease-ck hover:scale-105",
            "motion-reduce:transform-none motion-reduce:transition-none",
            // O foco fica ancorado nas cores do próprio botão, e não nas da
            // página, porque o `--ck-focus` global mudaria de eficácia
            // conforme a seção que estivesse passando atrás.
            //
            // É `outline`, e não um segundo `ring`: o `ring` do Tailwind é
            // box-shadow, então `focus-visible:ring-*` SUBSTITUIRIA o anel
            // escuro em vez de somar — e aí o botão perderia justamente a
            // separação que ele dá nos fundos claros. Com `outline-offset-0`
            // a linha branca nasce colada no anel #075E54: 7.67:1, e em
            // qualquer seção, porque não depende do que está atrás.
            "focus-visible:outline-ck-branco focus-visible:outline-offset-0",
          )}
        >
          <IconeWhatsapp className="h-7 w-7" />
          <span className="sr-only">
            Falar com a Código Kid no WhatsApp (abre em nova aba)
          </span>
        </a>
      </div>
    </div>
  );
}

export default BotaoWhatsapp;
