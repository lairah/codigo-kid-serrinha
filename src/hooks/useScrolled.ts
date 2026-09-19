// Hook `useScrolled`: informa se a página já rolou além de um limite (padrão: 8px).
// Usado pelo Header para aplicar sombra, borda, blur e redução de altura.
"use client";

import { useEffect, useState } from "react";

export function useScrolled(threshold: number = 8): boolean {
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const update = (): void => {
      setScrolled(window.scrollY > threshold);
    };

    // Avalia já na montagem (ex.: reload no meio da página).
    update();

    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
    };
  }, [threshold]);

  return scrolled;
}

export default useScrolled;
