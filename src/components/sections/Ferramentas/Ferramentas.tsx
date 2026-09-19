// Seção #ferramentas: faixa de credibilidade logo abaixo do Hero. Texto à
// esquerda e as plataformas usadas em sala deslizando na mesma linha, saindo
// pela borda. Sem "use client": nada aqui usa estado nem efeito.
import * as React from "react";
import Image, { type StaticImageData } from "next/image";

import { Section } from "@/components/layout/Section";
import { Marquee } from "@/components/ui/Marquee";
import { cn } from "@/lib/utils";
import logoArduino from "@/images/logo-arduino.webp";
import logoClinicaNonato from "@/images/logo-clinica-nonato.webp";
import logoEducarte from "@/images/logo-educarte.webp";
import logoLegoEducation from "@/images/logo-lego-education.webp";
import logoMakeblock from "@/images/logo-makeblock.webp";
import logoMicrobit from "@/images/logo-microbit.webp";
import logoScratch from "@/images/logo-scratch.webp";
import logoTinkercad from "@/images/logo-tinkercad.webp";

interface Ferramenta {
  /** Nome da marca. Vai para o `alt`: a logo informa, não decora. */
  nome: string;
  logo: StaticImageData;
  /**
   * Escala óptica. 1 é a altura base; abaixo disso a marca é larga demais e
   * precisa encolher para não dominar a faixa.
   *
   * Os originais vêm em proporções que vão de 1.23 a 6.61. Com altura
   * uniforme, a Clínica Nonato sairia com 291px de largura e o Scratch com 54,
   * mais de 5x de diferença. O ponto de partida de cada fator veio de igualar
   * a área de tinta, e depois micro:bit, Makeblock e Nonato foram ajustados a
   * olho: preto sólido pesa mais do que a área sozinha prevê.
   */
  escala: number;
}

const FERRAMENTAS: Ferramenta[] = [
  { nome: "Tinkercad", logo: logoTinkercad, escala: 1.03 },
  { nome: "Scratch", logo: logoScratch, escala: 1.5 },
  { nome: "LEGO Education", logo: logoLegoEducation, escala: 0.8 },
  { nome: "Arduino", logo: logoArduino, escala: 1.19 },
  { nome: "micro:bit", logo: logoMicrobit, escala: 0.63 },
  { nome: "Makeblock", logo: logoMakeblock, escala: 0.78 },
  { nome: "Clínica Médica Nonato", logo: logoClinicaNonato, escala: 0.72 },
  // Ao lado da Nonato de propósito: as duas são parceiras institucionais, e as
  // seis anteriores são ferramentas de sala. Agrupadas, a faixa conta duas
  // histórias em vez de embaralhar as duas.
  //
  // 1.6 e não 1.45, que é o que a conta de tinta dava. Esta logo empilha três
  // camadas — globo, "COLÉGIO" e o wordmark —, então o mesmo peso de tinta das
  // outras a comprime num borrão: aos 1.45 o "COLÉGIO" some. Aos 1.6 ela lê e
  // fica com 64px de altura, contra os 60 do Scratch, que era a mais alta.
  { nome: "Colégio EducArte", logo: logoEducarte, escala: 1.6 },
];

function Logo({ ferramenta }: { ferramenta: Ferramenta }) {
  return (
    <Image
      src={ferramenta.logo}
      alt={ferramenta.nome}
      // A altura sai de uma variável só, definida no contêiner, multiplicada
      // pelo fator da marca. Por `style` porque o JIT do Tailwind precisaria de
      // uma classe literal por valor, e são seis alturas em dois breakpoints.
      style={{
        height: `calc(var(--altura-logo) * ${ferramenta.escala})`,
        width: "auto",
      }}
      // O reset global aplica `max-w-full` em toda imagem, o que dentro de uma
      // linha flex dimensionada pelo conteúdo espremeria as logos mais largas.
      className="max-w-none"
    />
  );
}

export function Ferramentas() {
  return (
    <Section id="ferramentas" variant="marfim" espacamento="compacto">
      {/* Sem `SectionContainer` em volta de tudo: o padding lateral fica só na
          coluna de texto, para a faixa de logos alcançar a borda do container
          e sair da tela em vez de parar num limite visível. */}
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 lg:flex-row lg:items-center lg:gap-14">
        <div className="shrink-0 px-5 md:px-8 lg:w-[340px] lg:pl-12 lg:pr-0">
          <h2 className="font-display text-2xl font-bold leading-tight tracking-tight text-ck-roxo-profundo md:text-3xl">
            Nossos parceiros
          </h2>
        </div>

        {/* `min-w-0` para a coluna aceitar encolher: sem isso o conteúdo do
            marquee define a largura mínima e empurra o texto para fora. */}
        <div className="min-w-0 flex-1 [--altura-logo:36px] md:[--altura-logo:40px]">
          <Marquee
            pauseOnHover
            repeat={4}
            className={cn(
              "[--duration:36s] [--gap:3rem] md:[--gap:4rem]",
              // Esmaece nas duas pontas: à esquerda para as logos não brotarem
              // coladas no texto, à direita para a faixa parecer continuar.
              "[mask-image:linear-gradient(to_right,transparent_0%,#000_5%,#000_94%,transparent_100%)]",
              // Com o deslize parado por `prefers-reduced-motion`, o que está
              // fora da tela nunca chegaria ao visitante. A rolagem manual
              // devolve o acesso sem trocar o layout, que é o que uma troca por
              // grade estática faria: o hook de movimento reduzido renderiza
              // `true` no servidor, então a grade viria no primeiro paint para
              // todo mundo e desabaria na hidratação.
              "motion-reduce:overflow-x-auto",
            )}
          >
            {FERRAMENTAS.map((ferramenta) => (
              <Logo key={ferramenta.nome} ferramenta={ferramenta} />
            ))}
          </Marquee>
        </div>
      </div>
    </Section>
  );
}

export default Ferramentas;
