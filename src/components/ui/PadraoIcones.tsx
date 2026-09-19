// Textura de fundo da marca: glifos de tecnologia em contorno, repetidos em grade.
// É o elemento gráfico que aparece em todas as peças de comunicação da escola.
"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export interface PadraoIconesProps {
  className?: string;
}

/** Traço herda `currentColor`, então a cor vem da classe de texto do pai. */
export function PadraoIcones({ className }: PadraoIconesProps) {
  const id = React.useId();
  const patternId = `padrao-ck-${id}`;

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    >
      <defs>
        <pattern
          id={patternId}
          width="180"
          height="180"
          patternUnits="userSpaceOnUse"
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Chevrons de código */}
            <path d="M32 26 L22 36 L32 46" />
            <path d="M52 26 L62 36 L52 46" />

            {/* Lâmpada */}
            <circle cx="126" cy="32" r="11" />
            <path d="M121 47 h10" />
            <path d="M123 52 h6" />

            {/* Chaves */}
            <path d="M28 96 c-6 0 -6 6 -6 10 c0 4 -4 4 -4 4 c4 0 4 4 4 8 c0 4 0 8 6 8" />
            <path d="M48 96 c6 0 6 6 6 10 c0 4 4 4 4 4 c-4 0 -4 4 -4 8 c0 4 0 8 -6 8" />

            {/* Monitor */}
            <rect x="108" y="100" width="42" height="30" rx="4" />
            <path d="M122 138 h14" />
            <path d="M129 130 v8" />

            {/* Engrenagem */}
            <circle cx="90" cy="66" r="9" />
            <circle cx="90" cy="66" r="3" />
            <path d="M90 51 v5 M90 76 v5 M75 66 h5 M100 66 h5" />

            {/* Cursor */}
            <path d="M156 62 L156 88 L163 81 L168 92 L173 89 L168 78 L177 77 Z" />
          </g>
        </pattern>
      </defs>

      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}

export default PadraoIcones;
