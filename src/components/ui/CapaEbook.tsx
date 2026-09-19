// Capa do ebook. Aparece pequena no banner da landing e grande na página
// /ebook, por isso vive num componente só.
import * as React from "react";
import Image, { type StaticImageData } from "next/image";

import { PadraoIcones } from "@/components/ui/PadraoIcones";
import { cn } from "@/lib/utils";

export interface CapaEbookProps {
  /** Arte da capa. Sem ela, entra o estado desenhado da marca. */
  capa?: StaticImageData;
  /** Vai para o `alt`. Sem `capa`, a imagem não existe e isto é ignorado. */
  alt?: string;
  /**
   * Inclina levemente, como um livro apoiado. Só vale para o estado desenhado:
   * a arte real já é um mockup em perspectiva, e girar de novo empenaria o
   * livro numa direção que a própria imagem não tem.
   */
  inclinada?: boolean;
  className?: string;
}

export function CapaEbook({
  capa,
  alt,
  inclinada = false,
  className,
}: CapaEbookProps) {
  if (!capa) {
    // Estado desenhado, não um retângulo cinza: o mesmo tratamento que o
    // VideoYoutube dá ao vídeo que ainda não subiu.
    return (
      <div
        className={cn(
          "relative aspect-[3/4] w-full overflow-hidden rounded-imagem bg-ck-roxo-profundo shadow-sombra-forte",
          inclinada && "rotate-3 motion-reduce:transform-none",
          className,
        )}
      >
        <PadraoIcones className="text-ck-amarelo/25" />
        <div className="absolute inset-0 grid place-items-center p-4">
          <span className="rounded-botao bg-ck-branco/95 px-4 py-2 text-center font-corpo text-sm font-semibold text-ck-roxo-profundo shadow-sombra">
            Capa em breve
          </span>
        </div>
      </div>
    );
  }

  // O mockup vem recortado, com fundo transparente e a própria sombra
  // desenhada. Por isso entra solto: moldura, cantos arredondados e
  // `shadow-sombra-forte` desenhariam um retângulo em volta de uma imagem que
  // não é retangular.
  return (
    <Image
      src={capa}
      alt={alt ?? ""}
      sizes="(min-width: 1024px) 30vw, 60vw"
      className={cn("h-auto w-full", className)}
    />
  );
}

export default CapaEbook;
