// Gaveta de navegação mobile (<1200px): abre abaixo do header com fade + slide,
// repetindo os links da navegação principal e o CTA de matrícula.
"use client";

import * as React from "react";

import { Button } from "@/components/ui/Button";
import { ESCOLA } from "@/lib/escola";
import { cn } from "@/lib/utils";
import type { NavItems } from "@/types/navigation";

import { NavLink } from "./NavLink";

export interface MobileMenuProps {
  /** Id do elemento — referenciado por `aria-controls` no botão hambúrguer. */
  id: string;
  /** Estado de abertura controlado pelo Header. */
  open: boolean;
  /** Itens de navegação exibidos na gaveta. */
  items: NavItems;
  /** Âncora da seção atualmente visível. */
  activeHref: string;
  /** Prefixo dos destinos: vazio na home, `/` nas outras rotas. */
  prefixo: string;
  /** Chamado ao clicar em qualquer link/CTA, para fechar a gaveta. */
  onNavigate: () => void;
}

export function MobileMenu({
  id,
  open,
  items,
  activeHref,
  prefixo,
  onNavigate,
}: MobileMenuProps) {
  return (
    <div
      id={id}
      className={cn(
        "absolute inset-x-0 top-full nav:hidden",
        "bg-ck-marfim",
        "border-b border-ck-cinza shadow-sombra-forte",
        "transition-[opacity,transform,visibility] duration-220 ease-ck motion-reduce:transition-none",
        open
          ? "visible translate-y-0 opacity-100"
          : "invisible pointer-events-none -translate-y-2.5 opacity-0",
      )}
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-1 px-5 pb-6 pt-4 md:px-8 lg:px-12">
        {items.map((item) => (
          <NavLink
            key={item.href}
            item={item}
            href={`${prefixo}${item.href}`}
            variant="mobile"
            active={activeHref === item.href}
            onClick={onNavigate}
          />
        ))}

        <Button
          asChild
          variant="destaque"
          className="mt-3 w-full font-display"
        >
          {/* Mesmo destino do CTA do header: o formulário. */}
          <a
            href={ESCOLA.formularioDeMatricula}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onNavigate}
          >
            Matricule seu filho
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
        </Button>
      </div>
    </div>
  );
}

export default MobileMenu;
