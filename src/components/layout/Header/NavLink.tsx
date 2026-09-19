// Item de link da navegação principal. O estado ativo é marcado pela cor
// no desktop e pelo fundo creme na gaveta mobile.
"use client";

import * as React from "react";

import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types/navigation";

export interface NavLinkProps {
  /** Item de navegação renderizado. */
  item: NavItem;
  /**
   * Destino final. Fora da home o Header prefixa a âncora com `/`, senão
   * `#cursos` viraria `/ebook#cursos` e não levaria a lugar nenhum. O tipo de
   * `NavItem.href` só admite `#...`, por isso o destino vem por fora.
   */
  href?: string;
  /** Indica se a seção correspondente está visível na viewport. */
  active: boolean;
  /** `mobile` ocupa a largura da gaveta e ganha fundo quando ativo. */
  variant?: "desktop" | "mobile";
  onClick?: () => void;
}

export function NavLink({
  item,
  href,
  active,
  variant = "desktop",
  onClick,
}: NavLinkProps) {
  const isMobile = variant === "mobile";

  return (
    <a
      href={href ?? item.href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        buttonVariants({ variant: "ghost", size: "nav" }),
        "hover:scale-100 hover:shadow-none active:scale-100",
        // Entre 1200px e 1400px os links ficam compactos para sobrar
        // respiro entre a logo e o bloco de navegação.
        !isMobile && "px-2.5 text-[0.875rem] nav-wide:px-3.5 nav-wide:text-[0.95rem]",
        isMobile && "w-full justify-start text-[1rem]",
        active && "text-ck-acao",
        // Na gaveta o ativo mantém o fundo creme: ali lê como item selecionado
        // de lista, e é o único indicador disponível.
        active && isMobile && "bg-ck-creme",
      )}
    >
      {item.label}
    </a>
  );
}

export default NavLink;
