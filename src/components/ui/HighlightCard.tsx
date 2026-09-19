// Card de destaque: um círculo de acento no canto que se expande no hover e
// inunda o card inteiro, com o texto invertendo de cor junto.
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Cada acento é um gradiente entre duas cores da paleta, e o texto por cima da
 * inundação assume branco ou escuro conforme o tom. Todas as paradas do
 * gradiente foram medidas: a pior fica em 5.19:1.
 *
 * Círculo e pastilha usam o mesmo gradiente em sentidos opostos — é isso que
 * cria uma diferença de tom na área onde as duas esferas se encostam.
 * As classes são literais de propósito: o JIT do Tailwind precisa lê-las.
 */
const ACENTOS = {
  amarelo: {
    circulo: "bg-gradient-to-br from-ck-amarelo to-ck-amarelo-claro",
    chip: "bg-gradient-to-tl from-ck-amarelo to-ck-amarelo-claro text-ck-roxo-profundo",
    chipHover:
      "group-hover:bg-none group-hover:bg-ck-branco group-hover:text-ck-roxo-profundo",
    texto: "group-hover:text-ck-roxo-profundo",
  },
  azul: {
    circulo: "bg-gradient-to-br from-ck-azul-profundo to-ck-roxo",
    chip: "bg-gradient-to-tl from-ck-azul-profundo to-ck-roxo text-ck-branco",
    chipHover:
      "group-hover:bg-none group-hover:bg-ck-branco group-hover:text-ck-azul-profundo",
    texto: "group-hover:text-ck-branco",
  },
  roxo: {
    circulo: "bg-gradient-to-br from-ck-roxo to-ck-roxo-profundo",
    chip: "bg-gradient-to-tl from-ck-roxo to-ck-roxo-profundo text-ck-branco",
    chipHover:
      "group-hover:bg-none group-hover:bg-ck-branco group-hover:text-ck-roxo",
    texto: "group-hover:text-ck-branco",
  },
  turquesa: {
    circulo: "bg-gradient-to-br from-ck-turquesa to-ck-amarelo-claro",
    chip: "bg-gradient-to-tl from-ck-turquesa to-ck-amarelo-claro text-ck-roxo-profundo",
    chipHover:
      "group-hover:bg-none group-hover:bg-ck-branco group-hover:text-ck-turquesa",
    texto: "group-hover:text-ck-roxo-profundo",
  },
  coral: {
    circulo: "bg-gradient-to-br from-ck-coral-profundo to-ck-roxo",
    chip: "bg-gradient-to-tl from-ck-coral-profundo to-ck-roxo text-ck-branco",
    chipHover:
      "group-hover:bg-none group-hover:bg-ck-branco group-hover:text-ck-coral-profundo",
    texto: "group-hover:text-ck-branco",
  },
} as const;

export type AcentoCard = keyof typeof ACENTOS;

export interface HighlightCardProps {
  /** Nome do pilar. */
  titulo: string;
  /** Frase curta e marcante. */
  frase: string;
  /** Como o desenvolvimento acontece na prática. */
  descricao: string;
  /** Ícone decorativo; herda a cor da pastilha via `currentColor`. */
  icone: React.ReactNode;
  acento: AcentoCard;
  className?: string;
}

export function HighlightCard({
  titulo,
  frase,
  descricao,
  icone,
  acento,
  className,
}: HighlightCardProps) {
  const cores = ACENTOS[acento];
  const transicaoTexto =
    "transition-colors duration-700 ease-fluido motion-reduce:transition-none";

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-card bg-ck-branco",
        "px-7 pb-10 pt-12 shadow-sombra ring-1 ring-ck-cinza",
        "transition-[transform,box-shadow] duration-700 ease-fluido",
        "hover:-translate-y-1 hover:shadow-sombra-forte",
        "motion-reduce:transform-none motion-reduce:transition-none",
        className,
      )}
    >
      {/* Círculo de acento. Em repouso aparece só a ponta no canto; no hover
          cresce até cobrir o card. O fator 14 cobre a diagonal com folga. */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute -left-8 -top-8 z-0 h-28 w-28 rounded-full",
          "transition-transform duration-700 ease-fluido group-hover:scale-[14]",
          "motion-reduce:transition-none motion-reduce:group-hover:scale-100",
          cores.circulo,
        )}
      />

      <div className="relative z-10 flex flex-col gap-4">
        {/* O anel branco recorta a pastilha do círculo atrás dela. */}
        <span
          aria-hidden="true"
          className={cn(
            "grid h-20 w-20 shrink-0 place-items-center rounded-full",
            "shadow-sombra ring-4 ring-ck-branco",
            transicaoTexto,
            cores.chip,
            cores.chipHover,
          )}
        >
          {icone}
        </span>

        <h3
          className={cn(
            "mt-2 font-display text-2xl font-semibold tracking-tight text-ck-roxo-profundo",
            transicaoTexto,
            cores.texto,
          )}
        >
          {titulo}
        </h3>

        <p
          className={cn(
            "font-corpo text-lg font-semibold leading-snug text-ck-acao",
            transicaoTexto,
            cores.texto,
          )}
        >
          {frase}
        </p>

        <p
          className={cn(
            "font-corpo leading-relaxed text-ck-tinta-suave",
            transicaoTexto,
            cores.texto,
          )}
        >
          {descricao}
        </p>
      </div>
    </article>
  );
}

export default HighlightCard;
