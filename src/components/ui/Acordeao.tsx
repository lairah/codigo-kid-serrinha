// Acordeão sobre os primitivos do Radix, que já entregam o padrão WAI-ARIA:
// o par aria-expanded/aria-controls, a região rotulada pelo gatilho e a
// navegação por setas, Home e End entre os itens.
//
// Mesma escolha que foi feita nas abas de Cursos: o comportamento acessível
// vem do primitivo, e aqui em cima fica só a aparência.
"use client";

import * as React from "react";
import * as AcordeaoPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

export const Acordeao = AcordeaoPrimitive.Root;

export type AcordeaoItemProps = React.ComponentPropsWithoutRef<
  typeof AcordeaoPrimitive.Item
>;

export function AcordeaoItem({ className, ...props }: AcordeaoItemProps) {
  return (
    <AcordeaoPrimitive.Item
      /**
       * O divisor é `tinta/20`, e não o `ck-cinza` que o resto do projeto usa:
       * sobre marfim o cinza dá 1.24:1 e simplesmente não aparece. A 20% a
       * tinta chega a 1.53:1 — visível sem virar grade.
       */
      className={cn("border-b border-ck-tinta/20", className)}
      {...props}
    />
  );
}

export type AcordeaoGatilhoProps = React.ComponentPropsWithoutRef<
  typeof AcordeaoPrimitive.Trigger
>;

/** A linha inteira é o botão: alvo grande é o que faz acordeão funcionar no dedo. */
export function AcordeaoGatilho({
  className,
  children,
  ...props
}: AcordeaoGatilhoProps) {
  return (
    // O `Header` do Radix renderiza um `<h3>`, que é o heading do padrão
    // ARIA de acordeão. O nível 3 é o certo aqui: a seção abre com um `h2`.
    <AcordeaoPrimitive.Header className="flex">
      <AcordeaoPrimitive.Trigger
        className={cn(
          "group flex flex-1 items-start gap-4 py-5 text-left",
          // Alvo de toque com folga: a linha toda passa dos 44px por conta do
          // padding, mesmo com a pergunta em uma única linha.
          "min-h-11",
          "transition-colors duration-220 ease-ck hover:text-ck-acao",
          "motion-reduce:transition-none",
          className,
        )}
        {...props}
      >
        {children}

        {/* `aria-hidden` porque o estado já é anunciado pelo `aria-expanded`
            que o primitivo põe no gatilho: quem ouve a página não precisa do
            ícone lido. */}
        <ChevronDown
          aria-hidden="true"
          className={cn(
            "ml-auto mt-0.5 h-5 w-5 shrink-0 text-ck-acao",
            "transition-transform duration-220 ease-ck",
            "group-data-[state=open]:rotate-180",
            "motion-reduce:transition-none",
          )}
        />
      </AcordeaoPrimitive.Trigger>
    </AcordeaoPrimitive.Header>
  );
}

export type AcordeaoConteudoProps = React.ComponentPropsWithoutRef<
  typeof AcordeaoPrimitive.Content
>;

export function AcordeaoConteudo({
  className,
  children,
  ...props
}: AcordeaoConteudoProps) {
  return (
    <AcordeaoPrimitive.Content
      className={cn(
        "overflow-hidden",
        "data-[state=open]:animate-acordeao-abre",
        "data-[state=closed]:animate-acordeao-fecha",
        // Quem pede menos movimento recebe a resposta já aberta, sem deslize.
        "motion-reduce:animate-none",
      )}
      {...props}
    >
      {/* O espaçamento vive num filho, nunca no `Content`: a altura dele é o
          que a animação interpola, e padding ali entraria na conta e faria a
          resposta pular no fim do movimento. */}
      <div className={cn("pb-6", className)}>{children}</div>
    </AcordeaoPrimitive.Content>
  );
}

export default Acordeao;
