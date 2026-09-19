// Utilitário `cn`: junta classes condicionais (clsx) e resolve conflitos do Tailwind (tailwind-merge).
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
