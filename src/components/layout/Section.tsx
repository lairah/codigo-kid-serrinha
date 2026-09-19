// Primitivo de seção: fundo, cor de texto padrão e cor do anel de foco.
// É o que dá o ritmo de cor alternado da página (amarelo → branco → roxo → ...).
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const sectionVariants = cva("relative isolate w-full", {
  variants: {
    variant: {
      branco: "bg-ck-branco text-ck-tinta",
      /** Superfície clara padrão das seções: branco quebrado e quente. */
      marfim: "bg-ck-marfim text-ck-tinta",
      creme: "bg-ck-creme text-ck-tinta",
      amarelo: "bg-ck-amarelo text-ck-tinta",
      // Fundos escuros: texto branco e anel de foco amarelo.
      roxo: "bg-ck-roxo text-ck-branco [--ck-focus:var(--ck-focus-em-escuro)]",
      "roxo-profundo":
        "bg-ck-roxo-profundo text-ck-branco [--ck-focus:var(--ck-focus-em-escuro)]",
      /**
       * Roxo profundo no topo, descendo até a base da composição de turmas.
       * A cor sólida vai como propriedade arbitrária, e não como `bg-ck-noite`:
       * o `twMerge` trata as duas classes `bg-*` como conflitantes e descarta
       * uma delas, deixando a seção sem cor por trás do gradiente.
       */
      noite:
        "bg-gradiente-noite [background-color:theme(colors.ck.noite)] text-ck-branco [--ck-focus:var(--ck-focus-em-escuro)]",
    },
    espacamento: {
      padrao: "py-20 md:py-28",
      compacto: "py-12 md:py-16",
      nenhum: "",
    },
  },
  defaultVariants: {
    variant: "branco",
    espacamento: "padrao",
  },
});

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  /** Elemento raiz. Padrão `section`. */
  as?: "section" | "div" | "header" | "footer";
}

/**
 * Envelope de seção. Renderiza só o fundo — o conteúdo normalmente vai dentro
 * de um `<SectionContainer>`, e decorações de sangria ficam fora dele.
 */
export function Section({
  as: Comp = "section",
  variant,
  espacamento,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <Comp
      className={cn(sectionVariants({ variant, espacamento }), className)}
      {...props}
    >
      {children}
    </Comp>
  );
}

export type SectionContainerProps = React.HTMLAttributes<HTMLDivElement>;

/** Faixa de conteúdo centralizada, alinhada com o container do header. */
export function SectionContainer({
  className,
  children,
  ...props
}: SectionContainerProps) {
  return (
    <div
      className={cn(
        "relative z-10 mx-auto w-full max-w-[1440px] px-5 md:px-8 lg:px-12",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default Section;
