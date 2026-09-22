// Rota /links: o destino do link único da bio do Instagram.
//
// Existe porque quem chega de rede social é outro público: já conhece a
// escola e vem atrás de UMA coisa específica — agendar, matricular, achar o
// endereço, baixar o manual. Fazer essa pessoa rolar a landing inteira é
// fricção. Por isso a página é curta, e por isso ela não tem menu: quem entra
// aqui escolhe um destino, não navega.
//
// Tudo sai do `escola.ts`. Esta página é uma VISTA de dados que já existem,
// nunca uma segunda lista — que é justamente o que um Linktree externo seria.
import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ClipboardList, Download, Globe, Mail, MapPin } from "lucide-react";

import { Logo } from "@/components/layout/Header/Logo";
import { Button } from "@/components/ui/Button";
import {
  IconeFacebook,
  IconeInstagram,
  IconeWhatsapp,
  IconeYoutube,
} from "@/components/ui/IconesDeMarca";
import { PadraoIcones } from "@/components/ui/PadraoIcones";
import { ebookDisponivel } from "@/lib/ebook";
import {
  ESCOLA,
  MENSAGEM_DE_AGENDAMENTO,
  type MarcaDeRede,
  linkDoWhatsapp,
  redesDisponiveis,
  temEmail,
  temFormularioDeMatricula,
  temMapa,
} from "@/lib/escola";
import { IMAGEM_DE_COMPARTILHAMENTO } from "@/lib/site";

const DESCRICAO =
  "Todos os canais da Código Kid Serrinha num lugar só: aula experimental, matrícula, materiais e contato.";

export const metadata: Metadata = {
  // Sem sufixo: o `title.template` do layout raiz já acrescenta "| Código Kid".
  title: "Links",
  description: DESCRICAO,

  /**
   * Fora da busca de propósito: uma lista de botões é conteúdo raso, e
   * indexá-la só criaria um concorrente fraco da home para os mesmos termos.
   *
   * `noindex` e não `Disallow` no robots.txt — e a diferença importa. Bloquear
   * o rastreio impediria o Google de LER a página, e sem ler ele não vê o
   * `noindex`: uma url linkada de fora acabaria no índice assim mesmo, como
   * link pelado, sem título nem descrição. As duas táticas se anulam.
   *
   * `follow` continua ligado para os links de saída para `/` e `/ebook` não
   * perderem valor. A canônica é tratada logo abaixo, e a rota fica fora do
   * `sitemap.ts`.
   *
   * Nada disso a torna privada: quem tem o link entra, e o rastreador do
   * Instagram busca a página para montar a prévia. O ganho é só não competir
   * com a home.
   */
  robots: { index: false, follow: true },

  /**
   * Anulada de propósito. Sem isto a rota HERDA a canônica do layout raiz,
   * que aponta para a HOME — e canônica apontando para outra página numa
   * rota `noindex` é o pior arranjo possível: o Google pode levar o
   * `noindex` junto, para o alvo. Medido aqui antes de existir: a tag saía
   * com `https://www.codigokidserrinha.com.br`.
   */
  alternates: { canonical: null },

  openGraph: {
    // Espalhado porque declarar `openGraph` substitui o do layout inteiro.
    ...IMAGEM_DE_COMPARTILHAMENTO,
    title: ESCOLA.nomeCompleto,
    description: DESCRICAO,
    url: "/links",
  },
};

interface Destino {
  rotulo: string;
  href: string;
  variante: "destaque" | "invertido" | "contorno-claro";
  icone: React.ReactNode;
  /** Sai do site: abre em aba nova e ganha o aviso para leitor de tela. */
  externo?: boolean;
}

const GLIFOS_DE_REDE: Record<
  MarcaDeRede,
  React.ComponentType<{ className?: string }>
> = {
  instagram: IconeInstagram,
  facebook: IconeFacebook,
  youtube: IconeYoutube,
};

/**
 * A lista, na ordem da intenção: primeiro o que converte, depois o que
 * informa, por último o que é referência.
 *
 * Cada bloco passa pelas guardas que já existem no `escola.ts`, então um campo
 * vazio some da página em vez de virar botão morto.
 */
function destinos(): Destino[] {
  const lista: Destino[] = [];
  const whatsapp = linkDoWhatsapp(MENSAGEM_DE_AGENDAMENTO);

  if (whatsapp) {
    lista.push({
      rotulo: "Agendar aula experimental",
      href: whatsapp,
      variante: "destaque",
      icone: <IconeWhatsapp className="h-5 w-5 shrink-0" />,
      externo: true,
    });
  }

  if (temFormularioDeMatricula()) {
    lista.push({
      rotulo: "Fazer matrícula",
      href: ESCOLA.formularioDeMatricula,
      variante: "invertido",
      icone: <ClipboardList aria-hidden="true" className="h-5 w-5 shrink-0" />,
      externo: true,
    });
  }

  lista.push({
    rotulo: "Conhecer a escola",
    href: "/",
    variante: "contorno-claro",
    icone: <Globe aria-hidden="true" className="h-5 w-5 shrink-0" />,
  });

  if (ebookDisponivel()) {
    lista.push({
      // Rótulo curto de propósito: o título completo do material vive na
      // /ebook. Aqui isto é um item de menu, e o nome inteiro quebraria em
      // duas linhas, descolando o ícone do texto.
      rotulo: "Manual de Segurança Digital",
      href: "/ebook",
      variante: "contorno-claro",
      icone: <Download aria-hidden="true" className="h-5 w-5 shrink-0" />,
    });
  }

  if (temMapa()) {
    lista.push({
      rotulo: "Como chegar",
      href: ESCOLA.mapa,
      variante: "contorno-claro",
      icone: <MapPin aria-hidden="true" className="h-5 w-5 shrink-0" />,
      externo: true,
    });
  }

  if (temEmail()) {
    lista.push({
      rotulo: "Falar por e-mail",
      // `mailto:` abre o aplicativo de e-mail, não uma aba — daí não ser externo.
      href: `mailto:${ESCOLA.email}`,
      variante: "contorno-claro",
      icone: <Mail aria-hidden="true" className="h-5 w-5 shrink-0" />,
    });
  }

  return lista;
}

/** `mailto:` e `tel:` não são navegação: `next/link` não tem o que otimizar. */
function saiDoRoteador(href: string): boolean {
  return !href.startsWith("/");
}

export default function PaginaDeLinks() {
  const lista = destinos();
  const redes = redesDisponiveis();

  return (
    // `min-h-dvh` e não `min-h-screen`: no celular a barra do navegador entra
    // e sai, e `100vh` ignora isso — a página ficaria mais alta que a tela.
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-ck-roxo-profundo px-5 py-14">
      <PadraoIcones className="text-ck-branco/10" />

      <div className="relative z-10 flex w-full max-w-md flex-col items-center">
        <Logo href="/" variante="branca" />

        {/* A logo é imagem: o título da página precisa existir como texto. */}
        <h1 className="sr-only">{ESCOLA.nomeCompleto}</h1>

        <p className="mt-5 text-center font-corpo text-sm leading-relaxed text-ck-branco/80 sm:text-base">
          {ESCOLA.descritor}
        </p>

        <nav aria-label="Canais da escola" className="mt-9 w-full">
          <ul className="flex flex-col gap-3">
            {lista.map((destino) => (
              <li key={destino.href}>
                {/* `whitespace-normal` é a rede de segurança: nenhum rótulo
                    daqui deve quebrar, mas se um crescer, é melhor ele quebrar
                    do que vazar o botão no telefone. */}
                <Button
                  asChild
                  variant={destino.variante}
                  className="w-full whitespace-normal text-center"
                >
                  {saiDoRoteador(destino.href) ? (
                    <a
                      href={destino.href}
                      {...(destino.externo
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {destino.icone}
                      {destino.rotulo}
                      {destino.externo ? (
                        <span className="sr-only"> (abre em nova aba)</span>
                      ) : null}
                    </a>
                  ) : (
                    <Link href={destino.href}>
                      {destino.icone}
                      {destino.rotulo}
                    </Link>
                  )}
                </Button>
              </li>
            ))}
          </ul>
        </nav>

        {redes.length > 0 ? (
          <div className="mt-10 flex items-center gap-3">
            {redes.map((rede) => {
              const Glifo = GLIFOS_DE_REDE[rede.marca];
              return (
                <a
                  key={rede.url}
                  href={rede.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  /* p-3 em volta de um glifo de 20px dá 44px de alvo, o mínimo
                     de toque. A borda é a mesma medida do `contorno-claro`. */
                  className="rounded-full border-2 border-ck-branco/40 p-3 text-ck-branco transition-colors duration-220 ease-ck hover:bg-ck-branco hover:text-ck-roxo-profundo motion-reduce:transition-none"
                >
                  <Glifo className="h-5 w-5" />
                  <span className="sr-only">{rede.nome} (abre em nova aba)</span>
                </a>
              );
            })}
          </div>
        ) : null}
      </div>
    </main>
  );
}
