// Vídeo do YouTube com fachada: a página carrega só a miniatura e o botão de
// play. O player só entra no clique, e por youtube-nocookie.com.
// O embed padrão baixa ~1,5 MB de JS e planta cookies do Google antes de
// qualquer interação; aqui nada sai para o Google até alguém pedir.
"use client";

import * as React from "react";
import Image, { type StaticImageData } from "next/image";
import { Play } from "lucide-react";

import { PadraoIcones } from "@/components/ui/PadraoIcones";
import { cn } from "@/lib/utils";

export interface VideoYoutubeProps {
  /** Id do vídeo no YouTube. Sem ele, o componente mostra "em breve". */
  videoId?: string;
  /** Vai para o rótulo do botão e para o `title` do iframe. */
  titulo: string;
  /**
   * Miniatura própria. Sem ela, usa a do YouTube: tenta `maxresdefault`
   * (1280x720) e, se o vídeo não tiver sido enviado em 720p ou mais, cai para
   * `hqdefault`, que sempre existe.
   */
  poster?: StaticImageData;
  className?: string;
}

export function VideoYoutube({
  videoId,
  titulo,
  poster,
  className,
}: VideoYoutubeProps) {
  const [ativo, setAtivo] = React.useState<boolean>(false);
  // `maxresdefault` devolve 404 quando o vídeo foi enviado abaixo de 720p.
  const [semMaxres, setSemMaxres] = React.useState<boolean>(false);

  const moldura = cn(
    "relative aspect-video w-full overflow-hidden rounded-imagem",
    className,
  );

  // Sem vídeo ainda: estado desenhado, não um retângulo cinza de placeholder.
  if (!videoId) {
    return (
      <div className={cn(moldura, "bg-ck-azul-profundo")}>
        <PadraoIcones className="text-ck-branco/20" />
        <div className="absolute inset-0 grid place-items-center">
          <span className="rounded-botao bg-ck-branco/95 px-5 py-2.5 font-corpo text-sm font-semibold text-ck-roxo-profundo shadow-sombra">
            Vídeo em breve
          </span>
        </div>
      </div>
    );
  }

  if (ativo) {
    return (
      <div className={cn(moldura, "bg-ck-tinta")}>
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={titulo}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setAtivo(true)}
      aria-label={`Assistir ao vídeo: ${titulo}`}
      className={cn(moldura, "group block bg-ck-tinta")}
    >
      {poster ? (
        <Image
          src={poster}
          alt=""
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      ) : (
        <Image
          src={`https://i.ytimg.com/vi/${videoId}/${
            semMaxres ? "hqdefault" : "maxresdefault"
          }.jpg`}
          alt=""
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          // `hqdefault` vem em 4:3 com tarjas pretas em cima e embaixo; o
          // recorte de `object-cover` para 16:9 come exatamente as tarjas.
          className="object-cover"
          onError={() => setSemMaxres(true)}
        />
      )}

      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 grid place-items-center bg-ck-roxo-profundo/30",
          "transition-colors duration-220 ease-ck group-hover:bg-ck-roxo-profundo/15",
          "motion-reduce:transition-none",
        )}
      >
        {/* Play em vidro. O disco é roxo a 70%, e não translúcido puro: sobre
            uma miniatura clara, um vidro só com blur deixaria o ícone branco
            em ~1.9:1. Com 70% o pior caso ainda dá 5.0:1. */}
        <span
          className={cn(
            "grid h-20 w-20 place-items-center rounded-full",
            "border-2 border-ck-branco bg-ck-roxo-profundo/70 text-ck-branco backdrop-blur-md",
            "transition-transform duration-220 ease-ck group-hover:scale-110",
            "motion-reduce:transform-none motion-reduce:transition-none",
          )}
        >
          {/* Deslocado: o triângulo parece descentralizado num círculo. */}
          <Play className="ml-1 h-8 w-8 fill-current" strokeWidth={0} />
        </span>
      </span>
    </button>
  );
}

export default VideoYoutube;
