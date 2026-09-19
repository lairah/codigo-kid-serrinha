// Lockup da marca Código Kid usado no header (e reaproveitável no rodapé).
// A arte vem de `src/images/logo_ck.png` via import estático do next/image.
"use client";

import * as React from "react";
import Image from "next/image";

import logoCodigoKid from "@/images/logo_ck.png";
import { cn } from "@/lib/utils";

export interface LogoProps {
  className?: string;
  onClick?: () => void;
  /**
   * `branca` transforma o wordmark em silhueta branca via filtro, para uso
   * sobre fundo colorido — o ouro da logo some sobre o amarelo da marca.
   */
  variante?: "cor" | "branca";
  /** Fora da home a logo deixa de ser âncora e passa a levar de volta para `/`. */
  href?: string;
}

export function Logo({
  className,
  onClick,
  variante = "cor",
  href = "#inicio",
}: LogoProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn("flex shrink-0 items-center rounded-input", className)}
    >
      <Image
        src={logoCodigoKid}
        alt="Código Kid"
        priority
        sizes="(min-width: 768px) 176px, 144px"
        className={cn(
          "h-9 w-auto transition-[filter] duration-220 ease-ck md:h-11",
          "motion-reduce:transition-none",
          variante === "branca" && "brightness-0 invert",
        )}
      />
    </a>
  );
}

export default Logo;
