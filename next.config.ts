import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Miniaturas do YouTube, usadas pela fachada do VideoYoutube.
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }],
  },

  async headers() {
    return [
      {
        // Mantém os PDFs fora do índice do Google: quem chega pela busca cai
        // na página /ebook, vê o autor e a escola, e só então baixa. Os headers
        // são avaliados antes do sistema de arquivos, então isto alcança os
        // arquivos servidos de `public/`.
        //
        // `:nome(regex)` é a forma de casar por expressão regular no `source`.
        source: "/:nome(.*\\.pdf)",
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
    ];
  },
};

export default nextConfig;
