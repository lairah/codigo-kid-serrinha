// Conteúdo do ebook, num arquivo só. O banner da landing, a página /ebook e a
// metadata da rota leem daqui, então trocar os marcadores por conteúdo real é
// mexer num lugar só.
//
// TODO: preencher tudo que está marcado. Enquanto os textos ficarem como estão,
// eles aparecem no site: são marcadores visíveis de propósito, não placeholders
// silenciosos que passariam despercebidos numa revisão.

import capaEbook from "@/images/capa-ebook-02.webp";

export interface LinkDoAutor {
  rotulo: string;
  href: string;
}

export const EBOOK = {
  // Título e linha de apoio lidos da própria capa. A arte em uso é a segunda
  // versão, que corrigiu o "ao pasco a passo" da primeira.
  titulo: "Manual de Segurança Digital para Famílias",

  /**
   * Linha curta, para onde o espaço é apertado: o banner da landing e a
   * `description` da rota. Fica separada da `apresentacao` porque aquela tem
   * 270 caracteres — num banner de faixa ela estouraria a altura, e como meta
   * description o Google corta perto dos 160.
   */
  linhaDeApoio:
    "Da consciência sobre os riscos ao passo a passo das configurações de segurança.",

  /** Parágrafo de abertura da página /ebook, onde há espaço para respirar. */
  apresentacao:
    "Criado para pais, responsáveis e educadores que desejam compreender melhor os riscos do ambiente digital e agir com mais consciência. O material une orientação prática, segurança, privacidade e diálogo, sem tratar a tecnologia como inimiga da infância e da adolescência.",

  /**
   * Os três números da faixa de destaque, copiados da página 7 do próprio PDF,
   * no capítulo "O universo digital que seus filhos habitam". Mesma ordem e
   * mesma redação do livro.
   *
   * Antes daqui estavam três números sobre o próprio material (13 plataformas,
   * 10 configurações, 32 páginas). Estes falam do problema, não do produto.
   *
   * Só o primeiro tem fonte citada, e essa lacuna é do livro: o texto original
   * também não atribui os outros dois. `fonte` vazio simplesmente não desenha
   * a linha.
   */
  numeros: [
    {
      valor: "95%",
      descricao: "dos adolescentes brasileiros acessam a internet diariamente",
      fonte: "IBGE, 2023",
    },
    {
      valor: "4h",
      descricao:
        "é o tempo médio diário que jovens de 13 a 17 anos passam em redes sociais",
      fonte: "",
    },
    {
      valor: "1 em 5",
      descricao:
        "crianças online já recebeu abordagem inadequada de um adulto desconhecido",
      fonte: "",
    },
  ],

  /**
   * As quatro etapas da linha do tempo. Texto do cliente, palavra por palavra.
   *
   * Amarelo fica de fora dos acentos de propósito: a faixa de números logo
   * acima é amarela inteira, e um círculo amarelo encostado nela se perderia.
   */
  etapas: [
    {
      titulo: "Riscos digitais reais",
      acento: "coral",
      resumo:
        "Entenda situações como aliciamento, cyberbullying, golpes, extorsão e exposição a conteúdos inadequados.",
    },
    {
      titulo: "Proteção nas plataformas",
      acento: "azul",
      resumo:
        "Conheça configurações de segurança, privacidade e supervisão em celulares, redes sociais, jogos e aplicativos.",
    },
    {
      titulo: "Diálogo e confiança",
      acento: "turquesa",
      resumo:
        "Reflexões sobre como acompanhar crianças e adolescentes sem transformar cuidado em vigilância constante.",
    },
    {
      titulo: "Orientação para emergências",
      acento: "roxo",
      resumo:
        "Saiba quais passos considerar quando uma situação problemática já aconteceu no ambiente digital.",
    },
  ],

  autor: {
    /** Lido da capa interna do PDF e do campo `/Author` dos metadados. */
    nome: "Diego Barreto Reis",
    papel:
      "Educador Tecnológico e Orientador Parental | Fundador da Código Kid Serrinha",
    /**
     * Texto do cliente, em primeira pessoa. O trecho entre asteriscos vira
     * ênfase na renderização e não aparece como asterisco na tela.
     */
    bio: [
      "Acredito em uma educação que prepara crianças não apenas para provas, mas para a vida. Minha atuação une tecnologia, neurodesenvolvimento, aprendizagem e compreensão do comportamento humano para construir experiências educacionais mais significativas, inclusivas e conectadas às necessidades de cada criança.",
      "Vejo a tecnologia como instrumento de criatividade, autonomia e transformação, a família como parte essencial do processo educativo. *Educar, para mim, é se disponibilizar a compreender quem está aprendendo.*",
    ],
    /** Perfis de marca pessoal. Vazio esconde o bloco inteiro. */
    links: [] as LinkDoAutor[],
  },

  /**
   * Mockup 3D da capa, recortado e com fundo transparente. A versão em uso
   * traz o livro e o celular lado a lado, então é mais larga que alta
   * (1.146) — a primeira era quase retrato (0.851).
   *
   * A primeira versão não está mais no repositório: os originais das
   * conversões saíram antes do primeiro commit, para não entrarem no
   * histórico. Voltar atrás exige reenviar a arte, e a largura do bloco em
   * `Materiais.tsx` foi calibrada para a proporção atual.
   */
  capa: capaEbook,

  /**
   * Caminho do PDF dentro de `public/`. Vazio faz os botões virarem um aviso
   * de "em breve" em vez de apontarem para um 404: um CTA principal quebrado
   * é pior do que um que ainda não abriu.
   */
  pdf: "/ebook-manual-seguranca-digital.pdf",

  /**
   * Nome que o arquivo ganha no computador de quem baixa. Sem acento de
   * propósito: acento em nome de download ainda embaralha em alguns sistemas.
   */
  pdfNomeParaSalvar: "Manual de Seguranca Digital para Familias.pdf",

  /**
   * Preenchidos depois de medir o arquivo de verdade. Viram uma linha visível
   * abaixo dos botões: um CTA de download que não diz o tamanho obriga o
   * visitante a arriscar, e num celular com dado limitado isso trava o clique.
   * As anotações de tipo existem para o `as const` não travar os valores nos
   * literais "" e 0, que são só o estado inicial.
   */
  pdfTamanho: "2,8 MB" as string,
  pdfPaginas: 32 as number,
} as const;

/** Só existe link de download quando o arquivo existe. */
export function ebookDisponivel(): boolean {
  return EBOOK.pdf.trim().length > 0;
}
