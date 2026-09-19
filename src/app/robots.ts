// robots.txt.
//
// Libera tudo e aponta o sitemap. O `noindex` dos PDFs continua vindo do
// header em `next.config.ts`, que é mais forte: `Disallow` impede o rastreio
// mas não tira da busca um arquivo que já foi indexado por um link externo.
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
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${URL_DO_SITE}/sitemap.xml`,
    host: URL_DO_SITE,
  };
}
