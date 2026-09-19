// Sitemap das rotas públicas.
//
// A `/matricula` entra aqui quando existir. O PDF do ebook fica de fora de
// propósito: ele já sai do índice pelo `X-Robots-Tag` em `next.config.ts`, e a
// porta de entrada para ele deve ser a página /ebook, não o arquivo solto.
import type { MetadataRoute } from "next";

import { URL_DO_SITE } from "@/lib/site";

/**
 * Torna a rota gerável em build estático. Sem isto, `output: "export"`
 * falha aqui — e com o servidor Node não muda nada, porque ela já era
 * estática. Mantém as duas formas de hospedagem abertas.
 */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const agora = new Date();

  return [
    {
      url: `${URL_DO_SITE}/`,
      lastModified: agora,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${URL_DO_SITE}/ebook`,
      lastModified: agora,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${URL_DO_SITE}/privacidade`,
      lastModified: agora,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
