// Abas sobre os primitivos do Radix, que já entregam o padrão WAI-ARIA:
// roving tabindex, setas para navegar, Home/End e o par aria-controls/labelledby.
"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

/**
 * Acentos das abas sobre fundo escuro. A cor do texto de cada uma foi escolhida
 * por contraste medido: roxo-profundo sobre amarelo (9.39) e turquesa (7.08),
 * branco sobre azul-profundo (5.19) e coral-profundo (5.21).
 * Classes literais de propósito — o JIT do Tailwind precisa lê-las.
 */
const ACENTOS_ABA = {
  amarelo:
    "data-[state=active]:bg-ck-amarelo data-[state=active]:text-ck-roxo-profundo",
  turquesa:
    "data-[state=active]:bg-ck-turquesa data-[state=active]:text-ck-roxo-profundo",
  azul: "data-[state=active]:bg-ck-azul-profundo data-[state=active]:text-ck-branco",
  coral:
    "data-[state=active]:bg-ck-coral-profundo data-[state=active]:text-ck-branco",
} as const;

export type AcentoAba = keyof typeof ACENTOS_ABA;

export const Tabs = TabsPrimitive.Root;

export type TabsListProps = React.ComponentPropsWithoutRef<
  typeof TabsPrimitive.List
>;

export function TabsList({ className, ...props }: TabsListProps) {
  return (
    <TabsPrimitive.List
      // Quebra em mais de uma linha no mobile em vez de rolar na horizontal:
      // aba fora da tela é aba que ninguém encontra.
      className={cn("flex flex-wrap items-center gap-2", className)}
      {...props}
    />
  );
}

export interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  acento: AcentoAba;
}

export function TabsTrigger({
  className,
  acento,
  ...props
}: TabsTriggerProps) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "inline-flex min-h-11 items-center justify-center whitespace-nowrap",
        "rounded-botao px-5 py-2.5 font-corpo text-sm font-semibold md:text-base",
        "bg-ck-branco/10 text-ck-branco/75",
        // O contorno é o que dá 3:1 contra o fundo da seção e faz a aba inativa
        // ler como um controle. Só o preenchimento chegaria lá a 40% de branco,
        // e aí a aba inativa competiria com a ativa.
        "data-[state=inactive]:ring-1 data-[state=inactive]:ring-ck-branco/40",
        "transition-colors duration-220 ease-ck",
        "hover:bg-ck-branco/20 hover:text-ck-branco",
        "motion-reduce:transition-none",
        ACENTOS_ABA[acento],
        className,
      )}
      {...props}
    />
  );
}

export type TabsContentProps = React.ComponentPropsWithoutRef<
  typeof TabsPrimitive.Content
>;

export function TabsContent({ className, ...props }: TabsContentProps) {
  return (
    <TabsPrimitive.Content
      className={cn("mt-8 focus-visible:outline-none", className)}
      {...props}
    />
  );
}

export default Tabs;
