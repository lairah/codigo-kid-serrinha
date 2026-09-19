// Faixa horizontal que desliza em looping contínuo, emendando cópias do conteúdo.
// Duração e espaçamento vêm das variáveis --duration e --gap, sobrescritíveis por classe.
"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Inverte o sentido do deslize. */
  reverse?: boolean;
  /** Pausa a animação enquanto o ponteiro está sobre a faixa. */
  pauseOnHover?: boolean;
  /** Cópias emendadas do conteúdo: quanto mais, menos visível é a emenda. */
  repeat?: number;
  children: React.ReactNode;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  repeat = 4,
  children,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden [--duration:40s] [--gap:0.75rem] [gap:var(--gap)]",
        className,
      )}
    >
      {Array.from({ length: repeat }, (_, indice) => (
        <div
          key={indice}
          // Só a primeira cópia é anunciada: as outras existem para o loop.
          aria-hidden={indice > 0 ? "true" : undefined}
          className={cn(
            "flex shrink-0 flex-row items-center justify-around [gap:var(--gap)]",
            "animate-marquee motion-reduce:animate-none",
            reverse && "[animation-direction:reverse]",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}

export default Marquee;
