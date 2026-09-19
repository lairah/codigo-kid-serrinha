// Linha do tempo vertical: números circulados na cor de cada etapa, ligados
// por um trilho que se preenche conforme a página rola.
//
// A altura vem do conteúdo, não de um espaçador falso: a referência que
// inspirou isto trava a tela por várias alturas de viewport, o que custa telas
// de rolagem para pouco texto.
"use client";

import * as React from "react";

import { useProgressoDeRolagem } from "@/hooks/useProgressoDeRolagem";
import { cn } from "@/lib/utils";

/**
 * Preenchimento do círculo de cada etapa. A cor não pode ser a do número:
 * amarelo e turquesa dão 2.15 e 2.12 sobre branco, abaixo dos 3:1 que texto
 * grande exige. Então a cor vira fundo e o número fica escuro ou branco por
 * cima, conforme o tom. Pior caso medido: 5.19:1.
 * Classes literais de propósito — o JIT do Tailwind precisa lê-las.
 */
export const ACENTOS_ETAPA = {
  amarelo:
    "bg-gradient-to-br from-ck-amarelo to-ck-amarelo-claro text-ck-roxo-profundo",
  coral: "bg-gradient-to-br from-ck-coral-profundo to-ck-roxo text-ck-branco",
  turquesa:
    "bg-gradient-to-br from-ck-turquesa to-ck-amarelo-claro text-ck-roxo-profundo",
  azul: "bg-gradient-to-br from-ck-azul-profundo to-ck-roxo text-ck-branco",
  roxo: "bg-gradient-to-br from-ck-roxo to-ck-roxo-profundo text-ck-branco",
} as const;

export type AcentoEtapa = keyof typeof ACENTOS_ETAPA;

/** Onde o trilho corre, no centro do círculo. */
const TRILHO = "left-6 md:left-7";

export interface LinhaDoTempoProps {
  children: React.ReactNode;
  className?: string;
}

export function LinhaDoTempo({ children, className }: LinhaDoTempoProps) {
  const raiz = React.useRef<HTMLOListElement>(null);
  const progresso = useProgressoDeRolagem(raiz);

  return (
    <ol ref={raiz} className={cn("relative", className)}>
      {/* Trilho apagado, que existe o tempo todo. */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-y-0 w-[3px] -translate-x-1/2 rounded-full bg-ck-cinza",
          TRILHO,
        )}
      />

      {/* Barra que preenche, revelada por `clip-path` e não por altura.
          Cortar pela altura reescala o degradê: com a barra pela metade, as
          três cores se espremem na metade de cima e deixam de bater com os
          círculos. O `clip-path` recorta sem redimensionar, então cada cor
          fica sempre na mesma altura do trilho.

          Coral, azul e roxo profundos porque é um traço de 3px sobre marfim, e
          ali turquesa dá 2.05 e amarelo 1.54. Estes três ficam acima de 5:1. */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-y-0 w-[3px] -translate-x-1/2 rounded-full",
          "bg-gradient-to-b from-ck-coral-profundo via-ck-azul-profundo to-ck-roxo",
          TRILHO,
        )}
        style={{ clipPath: `inset(0 0 ${(1 - progresso) * 100}% 0)` }}
      />

      {children}
    </ol>
  );
}

export interface EtapaDaLinhaProps {
  /** Posição, já formatada para exibição (`01`, `02`...). */
  numero: string;
  acento: AcentoEtapa;
  children: React.ReactNode;
  className?: string;
}

export function EtapaDaLinha({
  numero,
  acento,
  children,
  className,
}: EtapaDaLinhaProps) {
  return (
    <li className={cn("relative flex gap-5 md:gap-7", className)}>
      {/* `aria-hidden` porque a `<ol>` já anuncia a ordem: quem ouve a página
          não precisa do número lido duas vezes. */}
      <span
        aria-hidden="true"
        className={cn(
          "relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full md:h-14 md:w-14",
          "font-display text-base font-bold md:text-lg",
          // O anel na cor da seção recorta o círculo do trilho que passa atrás.
          "ring-4 ring-ck-marfim",
          ACENTOS_ETAPA[acento],
        )}
      >
        {numero}
      </span>

      <div className="min-w-0 pb-10 pt-1 md:pb-12">{children}</div>
    </li>
  );
}

export default LinhaDoTempo;
