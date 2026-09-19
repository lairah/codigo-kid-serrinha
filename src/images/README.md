# Imagens do projeto

Coloque aqui os arquivos de imagem que fazem parte da interface: logo, ilustrações,
fotos de seções, ícones customizados.

## Como usar

Importe o arquivo e passe para o `next/image`. O import estático já entrega
`width`/`height` automaticamente, então não precisa declarar dimensão:

```tsx
import Image from "next/image";
import logo from "@/images/logo-codigo-kid.svg";

<Image src={logo} alt="Código Kid" priority className="h-10 w-auto" />;
```

Formatos aceitos: `.svg`, `.png`, `.webp`, `.jpg`, `.avif`, `.gif`.

## Convenção de nomes

Tudo em minúsculo, separado por hífen, sem acento:

```
logo-codigo-kid.svg
logo-codigo-kid-horizontal.svg
hero-criancas-programando.webp
```

## O que NÃO vai aqui

`favicon.ico`, `robots.txt`, `sitemap.xml` e a imagem de Open Graph ficam em
`public/`, porque precisam de URL fixa e previsível.
