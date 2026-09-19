// Design system da Código Kid expresso como tokens do Tailwind:
// cores, tipografia, raios, sombras, alturas de header e breakpoint de navegação.
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/hooks/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        // Breakpoint dedicado: a navegação horizontal só aparece a partir de 1200px.
        nav: "1200px",
        // A partir daqui sobra espaço para links e CTA voltarem ao tamanho cheio.
        "nav-wide": "1400px",
      },
      colors: {
        // Paleta da comunicação digital: amarelo e roxo como cores de fundo
        // inteiras, turquesa e coral como acentos. Contraste verificado em AA.
        ck: {
          amarelo: "#FDC500",
          "amarelo-claro": "#FFD84D",
          "amarelo-escuro": "#E0A800",
          roxo: "#7D2A91",
          "roxo-profundo": "#3F0F52",
          /**
           * Base do fundo escuro da composição de turmas (image_02). Medida na
           * borda do arquivo já comprimido, para a imagem encostar na section
           * sem emenda visível.
           */
          noite: "#190A27",
          /** Cor de ação (CTA e links). Nomeada pelo papel, não pela cor. */
          acao: "#6B2280",
          "acao-hover": "#571A69",
          /** Decorativo: 2.1:1 sobre branco, nunca usar em texto corrido. */
          turquesa: "#2FC7B0",
          /** Acento pontual: 3.9:1 sobre branco, só título grande e UI. */
          coral: "#E8443C",
          azul: "#0187CA",
          /** Versões fundas: aguentam texto branco por cima (>= 4.5:1). */
          "azul-profundo": "#0173AC",
          "coral-profundo": "#C53A33",
          creme: "#FFF6E0",
          /** Superfície clara padrão: branco quebrado e quente. */
          marfim: "#FDFBF5",
          /** Branco puro. Reservado para texto sobre fundo escuro. */
          branco: "#FFFFFF",
          tinta: "#241230",
          "tinta-suave": "#5C4A66",
          cinza: "#E7E1EA",
        },
      },
      backgroundImage: {
        /**
         * Fundo da seção de cursos. Vertical de propósito: variando só em Y, a
         * cor à esquerda e à direita da composição é sempre a mesma, então as
         * bordas laterais dela não criam emenda. Aos 360px já chegou na base, e
         * a imagem só começa aos 412px no desktop (e bem depois no mobile).
         */
        "gradiente-noite":
          "linear-gradient(to bottom, #3F0F52 0px, #190A27 360px)",
      },
      fontFamily: {
        // Tokens fonte-display / fonte-corpo do design system.
        display: ["var(--font-display)", "ui-rounded", "system-ui", "sans-serif"],
        corpo: ["var(--font-corpo)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        botao: "14px",
        card: "24px",
        imagem: "28px",
        input: "14px",
      },
      boxShadow: {
        sombra: "0 8px 24px rgba(0,0,0,0.06)",
        "sombra-forte": "0 14px 32px rgba(0,0,0,0.10)",
      },
      // Também em `spacing` para permitir `-mt-header` / `pt-header`: seções
      // de sangria precisam passar por baixo do header sticky.
      spacing: {
        header: "72px",
        "header-md": "80px",
      },
      height: {
        header: "72px",
        "header-md": "80px",
        "header-scrolled": "68px",
        "header-md-scrolled": "76px",
      },
      transitionTimingFunction: {
        ck: "cubic-bezier(.2,.7,.3,1)",
        /** Desaceleração longa, para movimentos grandes não parecerem secos. */
        fluido: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      transitionDuration: {
        "220": "220ms",
      },
      // Suporte ao ShineBorder: o gradiente é maior que a caixa e desliza em loop.
      backgroundSize: {
        "shine-size": "300% 300%",
      },
      keyframes: {
        "shine-pulse": {
          "0%": { backgroundPosition: "0% 0%" },
          "50%": { backgroundPosition: "100% 100%" },
          "100%": { backgroundPosition: "0% 0%" },
        },
        // Faixa em looping: desliza uma cópia inteira mais o gap entre elas.
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        /**
         * Abre e fecha do acordeão. A altura vem do Radix, que mede o conteúdo
         * e publica em `--radix-accordion-content-height` — sem isso não há
         * como animar de 0 até `auto`.
         */
        "acordeao-abre": {
          from: { height: "0px" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "acordeao-fecha": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0px" },
        },
        /**
         * Halo do botão flutuante do WhatsApp: um anel que cresce e some.
         * Segura em 0 dos 70% aos 100% de propósito — sem essa pausa o pulso
         * fica ininterrupto e vira aquele piscar que cansa em três minutos.
         */
        "halo-zap": {
          "0%": { transform: "scale(1)", opacity: "0.5" },
          "70%": { transform: "scale(1.75)", opacity: "0" },
          "100%": { transform: "scale(1.75)", opacity: "0" },
        },
      },
      animation: {
        marquee: "marquee var(--duration) infinite linear",
        // A curva é a mesma do token `ease-ck`, que não pode ser referenciado
        // de dentro da string de animação. Fechar é mais rápido que abrir:
        // ninguém espera para ver algo desaparecer.
        "acordeao-abre": "acordeao-abre 260ms cubic-bezier(.2,.7,.3,1)",
        "acordeao-fecha": "acordeao-fecha 200ms cubic-bezier(.2,.7,.3,1)",
        "halo-zap": "halo-zap 2.8s cubic-bezier(0,0,.2,1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
