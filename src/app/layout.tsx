// Layout raiz: carrega as fontes do design system (Funnel Display + Hanken Grotesk),
// define a metadata da landing page e envolve toda a aplicação.
import type { Metadata } from "next";
import { Funnel_Display, Hanken_Grotesk } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

import { ESCOLA } from "@/lib/escola";
import { GA_ID, URL_DO_SITE } from "@/lib/site";

import "./globals.css";

// Fontes variáveis: um arquivo cobre toda a faixa de pesos usada.
const funnelDisplay = Funnel_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-corpo",
  display: "swap",
});

const DESCRICAO =
  "Escola de tecnologia para crianças e adolescentes: programação, robótica e criatividade.";

export const metadata: Metadata = {
  /**
   * Sem isto, `og:image` e as canônicas saem relativas — e aí o WhatsApp
   * simplesmente não mostra prévia nenhuma ao compartilhar o link.
   */
  metadataBase: new URL(URL_DO_SITE),

  title: {
    /**
     * O título da home carrega o que a escola faz e onde fica, porque é isso
     * que alguém digita na busca. O `h1` da página é copy de marca ("O futuro
     * precisa de quem sabe criar…") e não traz esses termos.
     */
    default: "Código Kid Serrinha | Programação e robótica para crianças",
    /** As rotas passam a informar só o próprio nome. */
    template: "%s | Código Kid",
  },
  description: DESCRICAO,

  alternates: { canonical: "/" },

  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: ESCOLA.nomeCompleto,
    title: "Código Kid Serrinha | Programação e robótica para crianças",
    description: DESCRICAO,
    url: "/",
    // A arte vem de `opengraph-image.jpg`, que o Next encontra por convenção.
  },

  twitter: { card: "summary_large_image" },

  robots: { index: true, follow: true },
};

/**
 * Dados estruturados da escola. Alimentam o painel de conhecimento e o pacote
 * local do Google — que é onde alguém procurando "robótica para crianças em
 * Serrinha" encontra o endereço, o telefone e o horário sem nem abrir o site.
 *
 * Tudo sai de `escola.ts`, então não existe segunda fonte de verdade: mudar o
 * telefone lá muda o rodapé, o botão flutuante e este schema de uma vez.
 *
 * O horário veio do FAQ que a escola escreveu: seg a sex das 14h às 18h,
 * sábado das 8h às 12h.
 */
function dadosEstruturados() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${URL_DO_SITE}/#organizacao`,
    name: ESCOLA.nomeCompleto,
    legalName: ESCOLA.razaoSocial,
    taxID: ESCOLA.cnpj,
    description: DESCRICAO,
    url: URL_DO_SITE,
    email: ESCOLA.email,
    telephone: `+${ESCOLA.whatsapp}`,
    logo: `${URL_DO_SITE}/icon.png`,
    image: `${URL_DO_SITE}/opengraph-image.jpg`,
    hasMap: ESCOLA.mapa,
    address: {
      "@type": "PostalAddress",
      streetAddress: ESCOLA.endereco[0],
      addressLocality: "Serrinha",
      addressRegion: "BA",
      postalCode: "48700-000",
      addressCountry: "BR",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "14:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "08:00",
        closes: "12:00",
      },
    ],
    sameAs: ESCOLA.redes
      .filter((rede) => rede.url.trim().length > 0)
      .map((rede) => rede.url),
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${funnelDisplay.variable} ${hankenGrotesk.variable}`}
    >
      <body className="font-corpo">
        {children}

        {/* `dangerouslySetInnerHTML` é a forma correta aqui: o conteúdo é JSON
            gerado por nós, nunca entrada de usuário, e um `<script>` com filho
            de texto no React escaparia as aspas e quebraria o JSON. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(dadosEstruturados()),
          }}
        />

        {/* Fora do caminho crítico: o carregador oficial do Next injeta o
            gtag depois da hidratação. Sem id, nada é carregado — o que mantém
            os previews e o desenvolvimento limpos de medição. */}
        {GA_ID ? <GoogleAnalytics gaId={GA_ID} /> : null}
      </body>
    </html>
  );
}
