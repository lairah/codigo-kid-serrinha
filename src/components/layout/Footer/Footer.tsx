// Rodapé da landing: marca, navegação recolhida, contato e barra de fecho.
//
// Fica sobre `roxo-profundo`, que é a superfície escura da marca — e não sobre
// `ck-noite`, que é mais perto do preto da referência mas nasceu com um
// propósito só: casar com a borda da imagem de Cursos sem emenda visível.
//
// `"use client"` por causa do `usePrefixoDeAncora`, que lê a rota atual.
"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";

import { Section, SectionContainer } from "@/components/layout/Section";
import {
  IconeFacebook,
  IconeInstagram,
  IconeWhatsapp,
  IconeYoutube,
} from "@/components/ui/IconesDeMarca";
import { usePrefixoDeAncora } from "@/hooks/usePrefixoDeAncora";
import {
  ESCOLA,
  linkDoWhatsapp,
  redesDisponiveis,
  temAlgumContato,
  temEmail,
  temEndereco,
  temMapa,
  temRedes,
  temTelefone,
  type MarcaDeRede,
} from "@/lib/escola";
import { cn } from "@/lib/utils";

import { Logo } from "../Header/Logo";

interface LinkDoRodape {
  rotulo: string;
  /** Âncora da landing (ganha prefixo fora da home) ou rota absoluta. */
  href: string;
}

interface ColunaDoRodape {
  /** Vira o id do título, que rotula a `<nav>` da coluna. */
  id: string;
  titulo: string;
  links: LinkDoRodape[];
}

/**
 * As colunas repetem a navegação da página, agrupadas por intenção em vez de
 * pela ordem das seções: primeiro quem está entendendo a escola, depois quem
 * já está decidindo.
 *
 * `#ferramentas` não está no menu do header, mas é uma seção real da página e
 * cabe aqui — rodapé é justamente onde vão os destinos que não couberam na
 * navegação principal.
 */
const COLUNAS: ColunaDoRodape[] = [
  {
    id: "rodape-escola",
    titulo: "A escola",
    links: [
      { rotulo: "Metodologia", href: "#metodologia" },
      { rotulo: "Cursos", href: "#cursos" },
      { rotulo: "Projetos", href: "#projetos" },
      { rotulo: "Parceiros", href: "#ferramentas" },
    ],
  },
  {
    id: "rodape-familias",
    titulo: "Para famílias",
    links: [
      { rotulo: "Perguntas frequentes", href: "#faq" },
      { rotulo: "Manual de Segurança Digital", href: "/ebook" },
      { rotulo: "Matrículas", href: "#matriculas" },
    ],
  },
];

/** Estilo comum dos links: `branco/75` dá 8.85:1 sobre roxo-profundo. */
const LINK =
  "inline-flex min-h-11 items-center gap-2 font-corpo text-ck-branco/75 transition-colors duration-220 ease-ck hover:text-ck-branco motion-reduce:transition-none";

const TITULO_DE_COLUNA =
  "font-display text-sm font-bold uppercase tracking-[0.14em] text-ck-branco";

/** Literal de propósito, para o JIT do Tailwind não perder nada. */
const GLIFO_DA_REDE: Record<
  MarcaDeRede,
  React.ComponentType<{ className?: string }>
> = {
  instagram: IconeInstagram,
  facebook: IconeFacebook,
  youtube: IconeYoutube,
};

export function Footer() {
  const prefixo = usePrefixoDeAncora();
  // Sem mensagem: o telefone do rodapé não presume o assunto.
  const whatsapp = linkDoWhatsapp();

  // Âncoras ganham o prefixo; rotas absolutas passam intactas.
  const destino = (href: string) =>
    href.startsWith("#") ? `${prefixo}${href}` : href;

  return (
    <Section as="footer" variant="roxo-profundo" espacamento="compacto">
      <SectionContainer>
        {/* Cinco colunas, não quatro: são quatro blocos, mas o da marca ocupa
            duas células. Com `grid-cols-4` o contato sobrava e caía numa
            segunda linha sozinho, ao lado de três células vazias — foi o que
            fez o rodapé pular de 433 para 699px de altura. */}
        <div className="grid gap-10 md:grid-cols-2 md:gap-12 lg:grid-cols-5">
          {/* Bloco de marca: ocupa duas colunas da grade no desktop, para o
              descritor não quebrar em linhas curtas demais. */}
          <div className="lg:col-span-2 lg:pr-12">
            {/* `w-fit` porque aqui a logo vive numa célula de grade, e não
                num flex como no header: sem isso a âncora estica pelos 592px
                da coluna e clicar no vazio à direita da marca navega. */}
            <Logo
              variante="branca"
              href={prefixo || "#inicio"}
              className="w-fit"
            />

            <p className="mt-5 max-w-sm font-corpo leading-relaxed text-ck-branco/75">
              {ESCOLA.descritor}
            </p>

            {/* Sem os perfis, nem o rótulo aparece.

                São links de texto, e não os botões redondos da referência,
                porque o `lucide-react` não traz ícones de marca — foi o que
                apareceu quando procurei o glifo do WhatsApp para Matrículas.
                Desenhar marca de terceiro de cabeça sai errado; com os SVGs
                oficiais em mãos isto vira botão. */}
            {temRedes() ? (
              <ul className="mt-6 flex flex-wrap items-center gap-3">
                {redesDisponiveis().map((rede) => {
                  const Glifo = GLIFO_DA_REDE[rede.marca];

                  return (
                    <li key={rede.url}>
                      {/* 44px redondos: o botão mostra só o glifo, então o
                          nome acessível vem do `sr-only` — sem ele o link
                          seria anunciado sem rótulo nenhum. */}
                      <a
                        href={rede.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "grid h-11 w-11 place-items-center rounded-full",
                          "text-ck-branco/75 ring-1 ring-ck-branco/25",
                          "transition-colors duration-220 ease-ck",
                          "hover:bg-ck-branco/10 hover:text-ck-branco",
                          "motion-reduce:transition-none",
                        )}
                      >
                        <Glifo />
                        <span className="sr-only">
                          {rede.nome} (abre em nova aba)
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>

          {/* `aria-labelledby` em vez de `aria-label`: o título visível já
              nomeia a coluna, e repetir o texto num atributo criaria duas
              fontes da mesma verdade — quem edita uma esquece a outra. */}
          {COLUNAS.map((coluna) => (
            <nav key={coluna.id} aria-labelledby={coluna.id}>
              <h2 id={coluna.id} className={TITULO_DE_COLUNA}>
                {coluna.titulo}
              </h2>

              <ul className="mt-2 flex flex-col">
                {coluna.links.map((item) => (
                  <li key={item.href}>
                    {item.href.startsWith("#") ? (
                      <a href={destino(item.href)} className={LINK}>
                        {item.rotulo}
                      </a>
                    ) : (
                      <Link href={item.href} className={LINK}>
                        {item.rotulo}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* A coluna inteira some enquanto a escola não passar nenhum dado. */}
          {temAlgumContato() ? (
            <div>
              <h2 className={TITULO_DE_COLUNA}>Contato</h2>

              {/* `items-start` porque estes links são filhos diretos de um flex
                  em coluna e, sem isso, esticam até a largura da coluna: o
                  telefone ficava com 95px de área clicável vazia à direita do
                  número. Os das outras colunas já colam no texto, porque lá
                  cada um vive dentro de um `<li>`. */}
              <div className="mt-2 flex flex-col items-start gap-1">
                {temEndereco() ? (
                  <address className="font-corpo not-italic leading-relaxed text-ck-branco/75">
                    {/* O endereço inteiro é o link do mapa, e não um "ver no
                        mapa" ao lado: é o alvo maior e é o que a pessoa já ia
                        tentar clicar. */}
                    {temMapa() ? (
                      <a
                        href={ESCOLA.mapa}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          LINK,
                          "min-h-0 flex-col items-start py-2",
                        )}
                      >
                        {ESCOLA.endereco.map((linha, indice) => (
                          <span
                            key={linha}
                            className="flex items-center gap-1.5"
                          >
                            {linha}
                            {/* A seta inclinada vai só na última linha, que é
                                onde o endereço termina — repetida nas três
                                viraria ruído. */}
                            {indice === ESCOLA.endereco.length - 1 ? (
                              <ArrowUpRight
                                aria-hidden="true"
                                className="h-4 w-4 shrink-0"
                              />
                            ) : null}
                          </span>
                        ))}
                        <span className="sr-only">
                          Ver no Google Maps (abre em nova aba)
                        </span>
                      </a>
                    ) : (
                      <span className="block py-2">
                        {ESCOLA.endereco.map((linha) => (
                          <span key={linha} className="block">
                            {linha}
                          </span>
                        ))}
                      </span>
                    )}
                  </address>
                ) : null}

                {temTelefone() ? (
                  <a
                    href={whatsapp || `tel:${ESCOLA.whatsapp}`}
                    {...(whatsapp
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className={LINK}
                  >
                    {/* O glifo do WhatsApp só entra quando o link REALMENTE
                        vai para lá; sem número, o destino vira `tel:` e o
                        ícone estaria mentindo sobre onde o clique cai. */}
                    {whatsapp ? (
                      <IconeWhatsapp className="h-[18px] w-[18px]" />
                    ) : null}
                    {ESCOLA.telefoneExibido || ESCOLA.whatsapp}
                    {whatsapp ? (
                      <span className="sr-only"> (abre o WhatsApp)</span>
                    ) : null}
                  </a>
                ) : null}

                {temEmail() ? (
                  <a href={`mailto:${ESCOLA.email}`} className={LINK}>
                    <Mail
                      aria-hidden="true"
                      className="h-[18px] w-[18px] shrink-0"
                    />
                    {ESCOLA.email}
                  </a>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>

        {/* Divisor em `branco/20`: 1.80:1 sobre roxo-profundo, visível sem
            virar linha dura. */}
        <div
          className={cn(
            "mt-12 flex flex-col gap-4 border-t border-ck-branco/20 pt-8",
            "md:flex-row md:items-center md:justify-between",
          )}
        >
          {/* O ano é avaliado no build, porque a página é estática. Se o site
              passar janeiro sem ser reconstruído, mostra o ano anterior. */}
          <p className="font-corpo text-sm text-ck-branco/60">
            © {new Date().getFullYear()} {ESCOLA.nome}. Todos os direitos
            reservados.
          </p>

          {/* Só a política existe por enquanto. "Termos de uso" entra ao lado
              quando a página dele existir — link para rota inexistente não. */}
          <ul className="flex flex-wrap items-center gap-x-6">
            <li>
              <Link href="/privacidade" className={cn(LINK, "text-sm")}>
                Política de Privacidade
              </Link>
            </li>
          </ul>
        </div>
      </SectionContainer>
    </Section>
  );
}

export default Footer;
