// Botão reutilizável do design system, com variantes/tamanhos via CVA.
// Suporta `asChild` (Radix Slot) para renderizar âncoras mantendo o mesmo estilo.
"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  cn(
    "inline-flex select-none items-center justify-center gap-2 whitespace-nowrap",
    "rounded-botao font-corpo font-semibold leading-none",
    "transition-[transform,box-shadow,background-color,color] duration-220 ease-ck",
    "hover:scale-[1.03] hover:shadow-sombra-forte active:scale-[0.99]",
    "disabled:pointer-events-none disabled:opacity-50",
    "motion-reduce:transform-none motion-reduce:transition-none",
  ),
  {
    variants: {
      variant: {
        primario: "bg-ck-acao text-ck-branco hover:bg-ck-acao-hover",
        secundario:
          "border-2 border-ck-acao bg-transparent text-ck-acao hover:bg-ck-acao hover:text-ck-branco",
        destaque:
          "bg-ck-amarelo text-ck-roxo-profundo hover:bg-ck-amarelo-claro",
        ghost: "bg-transparent text-ck-tinta hover:bg-ck-creme",
        /** Para CTA sobre seção escura (roxo / roxo-profundo). */
        invertido:
          "bg-ck-branco text-ck-roxo-profundo hover:bg-ck-amarelo hover:text-ck-roxo-profundo",
        /**
         * Contorno sobre fundo escuro, para a opção secundária ao lado de um
         * `destaque` ou `invertido`.
         *
         * `secundario` não serve aqui: ele é roxo #6B2280 sobre roxo-profundo
         * #3F0F52 e simplesmente some. E `invertido`, sendo branco sólido,
         * rouba a atenção de quem deveria tê-la.
         *
         * Borda a 40% de branco porque foi o que a medição permitiu: 3.45:1
         * sobre `roxo-profundo`, o primeiro passo que limpa os 3:1 que a WCAG
         * 1.4.11 exige de limite de componente de interface. 35% dá 2.95 e
         * reprova. O texto é branco puro, 14.98:1.
         */
        "contorno-claro":
          "border-2 border-ck-branco/40 bg-transparent text-ck-branco hover:bg-ck-branco hover:text-ck-roxo-profundo",
      },
      size: {
        /** Tamanho padrão do design system: 48px de altura, 16px/32px de padding. */
        padrao: "min-h-12 px-8 py-4 text-base",
        /** Compacto para itens de navegação: mantém o alvo de toque de 44px. */
        nav: "min-h-11 px-4 py-2 text-[0.95rem]",
        /**
         * Clímax de página, para o CTA que fecha o discurso. Medido: 56px de
         * altura no telefone — igual a todos os outros botões do site — e 68px
         * a partir de `sm`.
         *
         * Cresce só a partir de `sm` porque em 320px um rótulo longo com ícone
         * a 18px e padding de 40px não cabe de jeito nenhum.
         *
         * E solta o `whitespace-nowrap` da base: rótulo de clímax é mais longo
         * que rótulo de navegação, e num botão de largura cheia o `nowrap`
         * corta em vez de quebrar. Medido em 320px, "Agendar aula experimental"
         * pedia exatamente os 280px disponíveis — cabia com zero de folga, o
         * que é uma aposta contra a fonte de fallback e contra a próxima
         * revisão de copy. Quebrando, o pior caso é uma segunda linha.
         */
        grande:
          "min-h-12 whitespace-normal px-8 py-4 text-base sm:min-h-14 sm:px-10 sm:py-5 sm:text-lg",
      },
    },
    defaultVariants: {
      variant: "primario",
      size: "padrao",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Renderiza o filho como raiz (ex.: `<a>`), preservando os estilos do botão. */
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { className, variant, size, asChild = false, type, ...props },
    ref,
  ) {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...(asChild ? {} : { type: type ?? "button" })}
        {...props}
      />
    );
  },
);

export default Button;
