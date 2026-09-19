// Dados de contato da Código Kid, num lugar só.
//
// Existe porque três pontos precisam dos mesmos valores: o `wa.me` do botão de
// aula experimental em Matrículas, o rodapé, e a seção #contato que vem a
// seguir. Com uma chamada só isso viveria como `const` local — foi o que fiz em
// Matrículas de propósito. Com três, vira o mesmo caso do `ebook.ts`.

/** Qual glifo de `IconesDeMarca` a rede usa. */
export type MarcaDeRede = "instagram" | "facebook" | "youtube";

export interface RedeSocial {
  /** Nome acessível do link — o botão em si mostra só o ícone. */
  nome: string;
  url: string;
  marca: MarcaDeRede;
}

/**
 * Campos vazios continuam sendo estado válido: o bloco correspondente
 * simplesmente não aparece. Anotados como `string` de propósito — sem isso o
 * TypeScript estreita para o literal e a outra metade de cada `if` vira código
 * morto.
 */
export const ESCOLA = {
  nome: "Código Kid",

  /** Como a escola se apresenta nos textos institucionais e legais. */
  nomeCompleto: "Código Kid Serrinha",

  /** Dados da mantenedora, usados na Política de Privacidade. */
  razaoSocial: "ESPAÇO EVOLUA DESENVOLVIMENTO INFANTO JUVENIL LTDA.",
  cnpj: "53.833.163/0001-11",

  /** Uma linha, para o bloco de marca do rodapé. */
  descritor:
    "Escola de tecnologia para crianças e adolescentes: programação, robótica e neurodesenvolvimento.",

  /** Linhas do endereço, na ordem em que devem ser exibidas. */
  endereco: [
    "R. Joaquim Silvio, 75",
    "Parque Santana",
    "Serrinha - BA, 48700-000",
  ] as string[],

  /**
   * URL canônica do Maps, no formato documentado por eles
   * (`/maps/search/?api=1&query=`).
   *
   * Não é o link `share.google` que a escola passou, e a troca foi
   * deliberada: aquele encurtador resolvia para uma página de BUSCA do Google,
   * não de mapa, e levava junto um token de sessão com timestamp (`sxsrf`),
   * parâmetros `utm_*` de rastreio e um `client=firefox-b-d` — que denuncia
   * de qual navegador ele foi copiado. Além de depender do encurtador
   * continuar de pé. Este formato não tem nada disso e não expira.
   */
  mapa: "https://www.google.com/maps/search/?api=1&query=C%C3%B3digo%20Kid%20Serrinha%2C%20R.%20Joaquim%20Silvio%2C%2075%20-%20Parque%20Santana%2C%20Serrinha%20-%20BA%2C%2048700-000" as string,

  /**
   * Só dígitos, com código do país e DDD: 55 + 75 + 98185-5053.
   *
   * Confirmado com a escola em 18/09/2026: é o mesmo número do WhatsApp. Daí
   * ele servir aos três destinos — o CTA de aula experimental em Matrículas, o
   * telefone do rodapé e o glifo verde ao lado dele. Se um dia mudar, mudar
   * aqui basta.
   */
  whatsapp: "5575981855053" as string,

  /** Como o telefone deve ser lido por uma pessoa. */
  telefoneExibido: "(75) 98185-5053" as string,

  email: "codigokidserrinha@gmail.com" as string,

  /**
   * Formulário de matrícula.
   *
   * PROVISÓRIO por decisão da escola: aponta direto para o formulário
   * hospedado no Tally. O plano original era a rota `/matricula` com o
   * formulário embutido sob o nosso header — ela continua sendo o destino,
   * e é também o ponto de costura do Supabase. Trocar aqui move os três
   * botões de uma vez.
   *
   * Vazio esconde os botões que dependem dele.
   */
  formularioDeMatricula: "https://tally.so/r/PdBdrQ" as string,

  /**
   * Url vazia continua sendo estado válido: `redesDisponiveis()` filtra, e o
   * botão da rede sem perfil não aparece.
   *
   * A url do Facebook vem na forma `/people/<nome>/<id>/`, que é a que o
   * próprio Facebook entrega. Fica como está: o id numérico é o que dá
   * permanência ao link, e o `%C3%B3` é só o "ó" de Código codificado.
   *
   * ATENÇÃO ao "Sisal" na url do Facebook: ele é o slug da PÁGINA lá, não o
   * nosso copy. O texto do site padronizou em "Código Kid Serrinha"
   * (18/09/2026), mas esta url fica como está — trocar o slug de um link
   * externo que funciona não tem o que ganhar. O que dá permanência ao
   * endereço é o id numérico; o slug é enfeite do lado deles.
   */
  redes: [
    {
      nome: "Instagram",
      url: "https://www.instagram.com/codigokidserrinha/",
      marca: "instagram",
    },
    {
      nome: "Facebook",
      url: "https://www.facebook.com/people/C%C3%B3digo-Kid-Sisal/61591108104235/",
      marca: "facebook",
    },
    {
      nome: "YouTube",
      url: "https://www.youtube.com/@C%C3%B3digoKidSerrinha",
      marca: "youtube",
    },
  ] as RedeSocial[],
} as const;

/** Mensagem que vai pré-escrita no `wa.me`, para a escola saber a intenção. */
export const MENSAGEM_DE_AGENDAMENTO =
  "Olá! Gostaria de agendar uma aula experimental na Código Kid.";

/**
 * `wa.me` pronto, ou string vazia enquanto o número não existir.
 *
 * A mensagem é opt-in, e não padrão: quem clica no telefone do rodapé pode
 * querer qualquer coisa, e abrir a conversa com "gostaria de agendar uma aula
 * experimental" já digitado seria decidir pela pessoa. Só o CTA de Matrículas,
 * que é explicitamente sobre agendar, passa o texto.
 */
export function linkDoWhatsapp(mensagem?: string): string {
  if (!ESCOLA.whatsapp) return "";
  if (!mensagem) return `https://wa.me/${ESCOLA.whatsapp}`;
  return `https://wa.me/${ESCOLA.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}

export function temEndereco(): boolean {
  return ESCOLA.endereco.length > 0;
}

export function temMapa(): boolean {
  return ESCOLA.mapa.trim().length > 0;
}

export function temTelefone(): boolean {
  return ESCOLA.whatsapp.length > 0 || ESCOLA.telefoneExibido.length > 0;
}

export function temEmail(): boolean {
  return ESCOLA.email.trim().length > 0;
}

export function temFormularioDeMatricula(): boolean {
  return ESCOLA.formularioDeMatricula.trim().length > 0;
}

/** Só as redes que de fato têm perfil: ícone sem destino é pior que ausência. */
export function redesDisponiveis(): RedeSocial[] {
  return ESCOLA.redes.filter((rede) => rede.url.trim().length > 0);
}

export function temRedes(): boolean {
  return redesDisponiveis().length > 0;
}

/** Se nada disso existe ainda, a coluna inteira de contato fica de fora. */
export function temAlgumContato(): boolean {
  return temEndereco() || temTelefone() || temEmail();
}
