// Header sticky da Código Kid: logo, navegação principal, CTA de matrícula,
// gaveta mobile e destaque do link ativo via IntersectionObserver.
"use client";

import * as React from "react";

import { Button } from "@/components/ui/Button";
import { usePrefixoDeAncora } from "@/hooks/usePrefixoDeAncora";
import { ESCOLA } from "@/lib/escola";
import { useScrolled } from "@/hooks/useScrolled";
import { cn } from "@/lib/utils";
import type { NavItems } from "@/types/navigation";

import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { NavLink } from "./NavLink";

const NAV_ITEMS: NavItems = [
  { label: "Início", href: "#inicio" },
  { label: "Metodologia", href: "#metodologia" },
  { label: "Cursos", href: "#cursos" },
  { label: "Projetos", href: "#projetos" },
  { label: "Materiais", href: "#materiais" },
  { label: "Matrículas", href: "#matriculas" },
  { label: "Dúvidas", href: "#faq" },
];

const MOBILE_MENU_ID = "menu-principal";
const DESKTOP_QUERY = "(min-width: 1200px)";

export function Header() {
  const scrolled = useScrolled(8);
  // O prefixo das âncoras vive num hook porque o rodapé precisa da mesma
  // regra. O scroll-spy não precisa de guarda: ele já filtra as seções
  // presentes no documento e retorna cedo quando a lista fica vazia.
  const prefixo = usePrefixoDeAncora();
  const naHome = prefixo === "";
  const [menuOpen, setMenuOpen] = React.useState<boolean>(false);
  const [activeHref, setActiveHref] = React.useState<string>(NAV_ITEMS[0].href);
  const headerRef = React.useRef<HTMLElement>(null);

  const closeMenu = React.useCallback((): void => {
    setMenuOpen(false);
  }, []);

  // Trava o scroll do body enquanto a gaveta estiver aberta.
  React.useEffect(() => {
    if (!menuOpen) return;

    const anterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = anterior;
    };
  }, [menuOpen]);

  // Fecha ao clicar fora do header ou ao pressionar Escape.
  React.useEffect(() => {
    if (!menuOpen) return;

    const onPointerDown = (event: PointerEvent): void => {
      const target = event.target as Node | null;
      if (target && !headerRef.current?.contains(target)) closeMenu();
    };

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") closeMenu();
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen, closeMenu]);

  // Fecha automaticamente ao redimensionar para o layout desktop (>= 1200px).
  React.useEffect(() => {
    const media = window.matchMedia(DESKTOP_QUERY);

    const onChange = (event: MediaQueryListEvent): void => {
      if (event.matches) closeMenu();
    };

    media.addEventListener("change", onChange);

    return () => {
      media.removeEventListener("change", onChange);
    };
  }, [closeMenu]);

  // Marca como ativo o link da seção visível na viewport.
  React.useEffect(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.querySelector<HTMLElement>(item.href),
    ).filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visivel = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0];

        if (visivel && visivel.target.id) {
          setActiveHref(`#${visivel.target.id}`);
        }
      },
      { rootMargin: "-96px 0px -55% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-[100] w-full bg-ck-marfim",
        "transition-shadow duration-220 ease-ck",
        // Sem `border-b`: uma borda somaria 1px à altura e abriria uma fresta
        // acima da hero, que sobe por baixo do header.
        scrolled ? "shadow-sombra" : "shadow-none",
      )}
    >
      <a
        href="#conteudo"
        className={cn(
          "sr-only focus:not-sr-only",
          "focus:absolute focus:left-4 focus:top-3 focus:z-[110]",
          "focus:inline-flex focus:min-h-11 focus:items-center focus:rounded-botao",
          "focus:bg-ck-acao focus:px-5 focus:py-2 focus:font-semibold focus:text-ck-branco",
        )}
      >
        Pular para o conteúdo
      </a>

      <div
        className={cn(
          "mx-auto flex w-full max-w-[1440px] items-center gap-4 px-5 md:px-8 lg:px-12",
          "transition-[height] duration-220 ease-ck",
          scrolled
            ? "h-header-scrolled md:h-header-md-scrolled"
            : "h-header md:h-header-md",
        )}
      >
        <Logo onClick={closeMenu} href={naHome ? "#inicio" : "/"} />

        {/* Bloco à direita: links e CTA agrupados e afastados da logo. */}
        <div className="ml-auto flex items-center gap-3 md:gap-6 nav:gap-10">
          <nav
            aria-label="Navegação principal"
            className="hidden items-center gap-1 nav:flex nav-wide:gap-2"
          >
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.href}
                item={item}
                href={`${prefixo}${item.href}`}
                active={naHome && activeHref === item.href}
              />
            ))}
          </nav>

          <Button
            asChild
            variant="primario"
            className="hidden font-display md:inline-flex px-6 nav-wide:px-8"
          >
            {/* Vai direto para o formulário, e não mais para a âncora
                `#matriculas`: o rótulo promete matrícula, e é isso que ele
                entrega. */}
            <a
              href={ESCOLA.formularioDeMatricula}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
            >
              Matricule seu filho
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
          </Button>

          <button
            type="button"
            onClick={() => setMenuOpen((aberto) => !aberto)}
            aria-expanded={menuOpen}
            aria-controls={MOBILE_MENU_ID}
            aria-label="Abrir menu"
            className={cn(
              "grid h-12 w-12 shrink-0 place-items-center nav:hidden",
              "rounded-input border border-ck-cinza bg-transparent",
              "transition-colors duration-220 ease-ck hover:bg-ck-creme",
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "col-start-1 row-start-1 h-0.5 w-5 rounded-full bg-ck-tinta",
                "transition-transform duration-220 ease-ck motion-reduce:transition-none",
                menuOpen ? "rotate-45" : "-translate-y-[7px]",
              )}
            />
            <span
              aria-hidden="true"
              className={cn(
                "col-start-1 row-start-1 h-0.5 w-5 rounded-full bg-ck-tinta",
                "transition-opacity duration-220 ease-ck motion-reduce:transition-none",
                menuOpen ? "opacity-0" : "opacity-100",
              )}
            />
            <span
              aria-hidden="true"
              className={cn(
                "col-start-1 row-start-1 h-0.5 w-5 rounded-full bg-ck-tinta",
                "transition-transform duration-220 ease-ck motion-reduce:transition-none",
                menuOpen ? "-rotate-45" : "translate-y-[7px]",
              )}
            />
          </button>
        </div>
      </div>

      <MobileMenu
        id={MOBILE_MENU_ID}
        open={menuOpen}
        items={NAV_ITEMS}
        activeHref={naHome ? activeHref : ""}
        prefixo={prefixo}
        onNavigate={closeMenu}
      />
    </header>
  );
}

export default Header;
