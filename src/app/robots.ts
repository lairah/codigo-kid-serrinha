// robots.txt.
//
// Libera o site e aponta o sitemap, com uma exceção: os PDFs.
//
// O plano original deixava esse bloqueio a cargo do `X-Robots-Tag: noindex`
// declarado em `next.config.ts`, que é de fato mais forte — `Disallow` impede
// o rastreio, mas não tira da busca um arquivo já indexado por link externo.
//
// Só que, medido em produção (19/09/2026), aquele header NÃO chega: a
// Hostinger serve `public/` pelo CDN dela, antes do Node. A resposta do PDF
// não traz nenhum header do Next (`x-powered-by`, `x-nextjs-cache`), que o
// HTML traz — ou seja, o `headers()` do Next nunca é executado para esse
// arquivo. O `Disallow` aqui é o que sobra, e basta: o site subiu agora, nada
// foi indexado ainda, e é exatamente nesse caso que ele funciona.
//
// O header fica onde está, para o dia em que a hospedagem mudar.
import type { MetadataRoute } from "next";

import { URL_DO_SITE } from "@/lib/site";

/**
 * Torna a rota gerável em build estático. Sem isto, `output: "export"`
 * falha aqui — e com o servidor Node não muda nada, porque ela já era
 * estática. Mantém as duas formas de hospedagem abertas.
 */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      /** `$` ancora no fim da url. Google e Bing entendem os dois curingas. */
      disallow: "/*.pdf$",
    },
    sitemap: `${URL_DO_SITE}/sitemap.xml`,
    host: URL_DO_SITE,
  };
}
