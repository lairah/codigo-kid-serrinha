// Quanto de um elemento já passou pela tela, de 0 a 1.
//
// A medida é pelo CENTRO da viewport, não pelo topo: 0 quando o centro está na
// borda de cima do elemento, 1 quando chega na de baixo. É isso que faz um
// indicador de progresso acompanhar onde a pessoa está lendo, em vez de onde o
// elemento começou.
"use client";

import * as React from "react";

export function useProgressoDeRolagem(
  alvo: React.RefObject<HTMLElement | null>,
): number {
  const [progresso, setProgresso] = React.useState(0);

  React.useEffect(() => {
    const elemento = alvo.current;
    if (!elemento) return;

    // Movimento reduzido decidido aqui dentro, e não pelo
    // `usePrefersReducedMotion`: aquele hook devolve `true` no servidor, e o
    // HTML sairia com a barra cheia só para esvaziar na hidratação. Aqui, quem
    // pediu menos movimento recebe a barra pronta e nenhum listener.
    const consulta = window.matchMedia("(prefers-reduced-motion: reduce)");
    let pedido = 0;

    const medir = () => {
      pedido = 0;

      if (consulta.matches) {
        setProgresso(1);
        return;
      }

      const caixa = elemento.getBoundingClientRect();
      if (caixa.height === 0) return;

      const centro = window.innerHeight / 2;
      const bruto = (centro - caixa.top) / caixa.height;
      setProgresso(Math.min(1, Math.max(0, bruto)));
    };

    // Um quadro por rolagem, não um cálculo por evento: `scroll` dispara
    // dezenas de vezes por segundo e `getBoundingClientRect` força layout.
    // A primeira medição também passa por aqui, para nenhuma escrita de estado
    // acontecer de forma síncrona durante o efeito.
    const agendar = () => {
      if (pedido) return;
      pedido = window.requestAnimationFrame(medir);
    };

    agendar();

    if (consulta.matches) {
      return () => {
        if (pedido) window.cancelAnimationFrame(pedido);
      };
    }

    // `passive` porque não vamos cancelar o gesto, e sem isso a rolagem do
    // celular espera o listener antes de pintar.
    window.addEventListener("scroll", agendar, { passive: true });
    window.addEventListener("resize", agendar, { passive: true });
    // Em aba oculta o navegador suspende o `requestAnimationFrame`, então a
    // rolagem feita ali não chega a ser medida. Ao voltar, remede uma vez.
    document.addEventListener("visibilitychange", agendar);

    return () => {
      if (pedido) window.cancelAnimationFrame(pedido);
      window.removeEventListener("scroll", agendar);
      window.removeEventListener("resize", agendar);
      document.removeEventListener("visibilitychange", agendar);
    };
  }, [alvo]);

  return progresso;
}

export default useProgressoDeRolagem;
