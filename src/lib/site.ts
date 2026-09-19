// URL base do site e identificadores de terceiros.
//
// Vivem em variável de ambiente, e não no código, por dois motivos: o preview
// da Vercel e a produção precisam de URLs diferentes (senão as tags `og:` do
// preview apontam para o site publicado), e o id de medição não fica versionado.

/**
 * Domínio de produção. `metadataBase`, o sitemap, as tags canônicas e a imagem
 * de compartilhamento dependem dele — nenhuma dessas quatro funciona com URL
 * relativa.
 *
 * A cadeia de fallback cobre os três ambientes: a variável explícita manda, na
 * Vercel o preview usa o próprio domínio efêmero, e em desenvolvimento cai no
 * localhost.
 */
export const URL_DO_SITE: string =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

/** Id de medição do Google Analytics. Vazio desliga o carregamento. */
export const GA_ID: string = process.env.NEXT_PUBLIC_GA_ID ?? "";

/** Monta uma URL absoluta a partir de um caminho da aplicação. */
export function urlAbsoluta(caminho: string): string {
  return new URL(caminho, URL_DO_SITE).toString();
}
