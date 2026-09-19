// Prefixo dos links de âncora da landing.
//
// As seções da página vivem em `/`, então fora dela `#cursos` resolveria para
// `/ebook#cursos`, que não existe. Na home o prefixo tem que continuar vazio:
// `/#cursos` ali forçaria uma navegação de página inteira em vez de rolar.
//
// Mora num hook porque dois lugares precisam da mesma regra — o Header e o
// Footer — e duplicada ela divergiria na primeira vez que alguém criar a
// terceira rota.
"use client";

import { usePathname } from "next/navigation";

export function usePrefixoDeAncora(): string {
  return usePathname() === "/" ? "" : "/";
}

export default usePrefixoDeAncora;
