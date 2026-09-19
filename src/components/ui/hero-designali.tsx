// Efeitos visuais da hero: rastro de linhas em canvas, máquina de escrever e borda animada.
// Portado de `hero-designali` para os tokens da Código Kid, com tipagem estrita e cleanup.
"use client";

import * as React from "react";
import { ReactTyped } from "react-typed";

import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                           Rastro de linhas (canvas)                         */
/* -------------------------------------------------------------------------- */

export interface CanvasOptions {
  /** Id do elemento <canvas> alvo. */
  canvasId?: string;
  /** Quantidade de linhas do rastro. */
  trails?: number;
  /** Nós por linha: quanto maior, mais longa a cauda. */
  size?: number;
  friction?: number;
  dampening?: number;
  tension?: number;
  /** Espessura do traço. */
  lineWidth?: number;
  /** Opacidade de cada traço; o empilhamento das linhas faz o resto. */
  alpha?: number;
  /**
   * Mistura do traço. `lighter` (aditiva) só rende sobre fundo escuro —
   * sobre fundo claro use `source-over`.
   */
  blendMode?: GlobalCompositeOperation;
  /**
   * Cor fixa do traço. Quando ausente, a matiz oscila entre `hueOffset`
   * mais ou menos `hueAmplitude`.
   */
  color?: string;
  /** Matiz central do rastro. Padrão: 250, entre o azul e o roxo da marca. */
  hueOffset?: number;
  /** Amplitude da oscilação de matiz em torno do centro. */
  hueAmplitude?: number;
}

type Config = Required<Omit<CanvasOptions, "color">> & {
  color: string | null;
};

const PADRAO: Config = {
  canvasId: "canvas",
  trails: 60,
  size: 50,
  friction: 0.5,
  dampening: 0.025,
  tension: 0.99,
  lineWidth: 8,
  alpha: 0.06,
  blendMode: "lighter",
  color: null,
  hueOffset: 250,
  hueAmplitude: 50,
};

interface Ponto {
  x: number;
  y: number;
}

/** Oscilador senoidal usado para variar a matiz do rastro ao longo do tempo. */
class Oscilador {
  private phase: number;
  private readonly offset: number;
  private readonly frequency: number;
  private readonly amplitude: number;

  constructor(opcoes: {
    phase?: number;
    offset?: number;
    frequency?: number;
    amplitude?: number;
  }) {
    this.phase = opcoes.phase ?? 0;
    this.offset = opcoes.offset ?? 0;
    this.frequency = opcoes.frequency ?? 0.001;
    this.amplitude = opcoes.amplitude ?? 1;
  }

  update(): number {
    this.phase += this.frequency;
    return this.offset + Math.sin(this.phase) * this.amplitude;
  }
}

class No {
  x = 0;
  y = 0;
  vx = 0;
  vy = 0;
}

/** Corrente de nós ligados por molas, que persegue a posição do cursor. */
class Linha {
  private readonly spring: number;
  private readonly friction: number;
  private readonly nos: No[] = [];

  constructor(spring: number, config: Config, pos: Ponto) {
    this.spring = spring + 0.1 * Math.random() - 0.05;
    this.friction = config.friction + 0.01 * Math.random() - 0.005;

    for (let i = 0; i < config.size; i++) {
      const no = new No();
      no.x = pos.x;
      no.y = pos.y;
      this.nos.push(no);
    }
  }

  update(config: Config, pos: Ponto): void {
    let spring = this.spring;
    let no = this.nos[0];

    no.vx += (pos.x - no.x) * spring;
    no.vy += (pos.y - no.y) * spring;

    for (let i = 0; i < this.nos.length; i++) {
      no = this.nos[i];

      if (i > 0) {
        const anterior = this.nos[i - 1];
        no.vx += (anterior.x - no.x) * spring;
        no.vy += (anterior.y - no.y) * spring;
        no.vx += anterior.vx * config.dampening;
        no.vy += anterior.vy * config.dampening;
      }

      no.vx *= this.friction;
      no.vy *= this.friction;
      no.x += no.vx;
      no.y += no.vy;
      spring *= config.tension;
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    let x = this.nos[0].x;
    let y = this.nos[0].y;

    ctx.beginPath();
    ctx.moveTo(x, y);

    let i = 1;
    const limite = this.nos.length - 2;

    for (; i < limite; i++) {
      const atual = this.nos[i];
      const proximo = this.nos[i + 1];
      x = 0.5 * (atual.x + proximo.x);
      y = 0.5 * (atual.y + proximo.y);
      ctx.quadraticCurveTo(atual.x, atual.y, x, y);
    }

    const atual = this.nos[i];
    const proximo = this.nos[i + 1];
    ctx.quadraticCurveTo(atual.x, atual.y, proximo.x, proximo.y);
    ctx.stroke();
    ctx.closePath();
  }
}

/**
 * Inicia o rastro de linhas no canvas indicado.
 * Retorna a função de limpeza — chame-a no unmount para remover os listeners
 * e cancelar o requestAnimationFrame.
 */
export function renderCanvas(opcoes: CanvasOptions = {}): () => void {
  const config: Config = { ...PADRAO, ...opcoes };
  const elemento = document.getElementById(config.canvasId);

  if (!(elemento instanceof HTMLCanvasElement)) return () => {};

  const ctx = elemento.getContext("2d");
  if (!ctx) return () => {};

  const canvas = elemento;
  const pos: Ponto = { x: 0, y: 0 };
  const matiz = new Oscilador({
    phase: Math.random() * 2 * Math.PI,
    amplitude: config.hueAmplitude,
    frequency: 0.0015,
    offset: config.hueOffset,
  });

  let linhas: Linha[] = [];
  let rodando = true;
  let iniciado = false;
  let rafId = 0;

  const redimensionar = (): void => {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
  };

  // Converte coordenadas de viewport para coordenadas internas do canvas.
  const posicionar = (clientX: number, clientY: number): void => {
    const rect = canvas.getBoundingClientRect();
    pos.x = clientX - rect.left;
    pos.y = clientY - rect.top;
  };

  const desenhar = (): void => {
    if (!rodando) return;

    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = config.blendMode;
    ctx.globalAlpha = config.alpha;
    ctx.strokeStyle =
      config.color ?? `hsl(${Math.round(matiz.update())},100%,50%)`;
    ctx.lineWidth = config.lineWidth;

    for (const linha of linhas) {
      linha.update(config, pos);
      linha.draw(ctx);
    }

    rafId = window.requestAnimationFrame(desenhar);
  };

  const iniciar = (): void => {
    if (iniciado) return;
    iniciado = true;

    linhas = [];
    for (let i = 0; i < config.trails; i++) {
      linhas.push(new Linha(0.45 + (i / config.trails) * 0.025, config, pos));
    }

    rafId = window.requestAnimationFrame(desenhar);
  };

  const onMouseMove = (event: MouseEvent): void => {
    posicionar(event.clientX, event.clientY);
    iniciar();
  };

  const onTouchMove = (event: TouchEvent): void => {
    const toque = event.touches[0];
    if (!toque) return;
    posicionar(toque.clientX, toque.clientY);
    iniciar();
  };

  // Pausa fora de foco para não gastar bateria numa aba em segundo plano.
  const onBlur = (): void => {
    rodando = false;
    window.cancelAnimationFrame(rafId);
  };

  const onFocus = (): void => {
    if (rodando) return;
    // Reabilita sempre: se a aba perdeu o foco antes do primeiro movimento do
    // mouse, o loop precisa poder arrancar quando o cursor finalmente se mexer.
    rodando = true;
    if (iniciado) rafId = window.requestAnimationFrame(desenhar);
  };

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("touchmove", onTouchMove, { passive: true });
  document.addEventListener("touchstart", onTouchMove, { passive: true });
  window.addEventListener("resize", redimensionar);
  window.addEventListener("orientationchange", redimensionar);
  window.addEventListener("focus", onFocus);
  window.addEventListener("blur", onBlur);

  redimensionar();

  return () => {
    rodando = false;
    window.cancelAnimationFrame(rafId);
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("touchmove", onTouchMove);
    document.removeEventListener("touchstart", onTouchMove);
    window.removeEventListener("resize", redimensionar);
    window.removeEventListener("orientationchange", redimensionar);
    window.removeEventListener("focus", onFocus);
    window.removeEventListener("blur", onBlur);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
}

/* -------------------------------------------------------------------------- */
/*                              Máquina de escrever                            */
/* -------------------------------------------------------------------------- */

export interface TypeWriterProps {
  strings: string[];
  className?: string;
}

export function TypeWriter({ strings, className }: TypeWriterProps) {
  return (
    <ReactTyped
      className={className}
      loop
      typeSpeed={80}
      backSpeed={20}
      strings={strings}
      smartBackspace
      backDelay={1000}
      loopCount={0}
      showCursor
      cursorChar="|"
    />
  );
}

/* -------------------------------------------------------------------------- */
/*                                 Shine Border                                */
/* -------------------------------------------------------------------------- */

export interface ShineBorderProps {
  /** Raio da borda em px. Padrão alinhado ao token `r-botao`. */
  borderRadius?: number;
  borderWidth?: number;
  /** Duração da volta completa do brilho, em segundos. */
  duration?: number;
  color?: string | string[];
  className?: string;
  children: React.ReactNode;
}

/**
 * Borda animada: um gradiente radial gira pela moldura do elemento.
 * O brilho é puramente decorativo e some com `prefers-reduced-motion`.
 */
export function ShineBorder({
  borderRadius = 14,
  borderWidth = 1,
  duration = 14,
  color = "#000000",
  className,
  children,
}: ShineBorderProps) {
  return (
    <div
      style={
        {
          "--border-radius": `${borderRadius}px`,
        } as React.CSSProperties
      }
      className={cn(
        "relative grid place-items-center rounded-[--border-radius] p-1",
        className,
      )}
    >
      <div
        aria-hidden="true"
        style={
          {
            "--border-width": `${borderWidth}px`,
            "--border-radius": `${borderRadius}px`,
            "--shine-pulse-duration": `${duration}s`,
            "--mask-linear-gradient": `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
            "--background-radial-gradient": `radial-gradient(transparent,transparent, ${
              Array.isArray(color) ? color.join(",") : color
            },transparent,transparent)`,
          } as React.CSSProperties
        }
        className='pointer-events-none absolute inset-0 before:absolute before:inset-0 before:size-full before:rounded-[--border-radius] before:bg-shine-size before:p-[--border-width] before:content-[""] before:will-change-[background-position] before:[background-image:--background-radial-gradient] before:[mask:--mask-linear-gradient] before:![-webkit-mask-composite:xor] before:![mask-composite:exclude] motion-safe:before:animate-[shine-pulse_var(--shine-pulse-duration)_infinite_linear]'
      />
      {children}
    </div>
  );
}
