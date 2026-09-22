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

/**
 * Imagem de compartilhamento, para as rotas que declaram `openGraph` próprio.
 *
 * Existe por causa de uma regra do Next que morde em silêncio: declarar
 * `openGraph` numa rota **substitui** o `openGraph` do layout inteiro, em vez
 * de mesclar. E como a arte vem do arquivo `opengraph-image.jpg`, que se
 * prende ao layout raiz, ela sumia de toda rota com metadata própria — medido
 * em 22/09/2026: `/ebook` e `/privacidade` estavam no ar sem prévia nenhuma.
 *
 * A própria documentação do Next manda resolver assim: extrair o campo comum
 * e espalhar com `...` em cada rota.
 *
 * A url vai sem o hash de cache que o Next acrescenta sozinho — a rota
 * `/opengraph-image.jpg` serve a imagem com ou sem ele —, e o `metadataBase`
 * do layout a transforma em absoluta, que é o que o WhatsApp exige.
 */
export const IMAGEM_DE_COMPARTILHAMENTO = {
  // Sem `as const`: ele tornaria o array somente-leitura, e o tipo `OGImage[]`
  // do Next é mutável — o build recusa.
  images: ["/opengraph-image.jpg"],
};
