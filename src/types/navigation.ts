// Contratos de tipagem da navegação da landing page.
// `NavItem` descreve um único item do menu (rótulo visível + âncora de destino).

export interface NavItem {
  /** Texto exibido no link. */
  label: string;
  /** Âncora da seção correspondente, no formato `#id`. */
  href: `#${string}`;
}

export type NavItems = readonly NavItem[];
