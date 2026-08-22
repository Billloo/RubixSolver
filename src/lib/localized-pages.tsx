import type { Locale } from "./i18n";

/**
 * The localized route layer deliberately uses the English page structure as its
 * canonical template. Locale-specific text is supplied here; layout, ordering,
 * algorithms, controls, and functionality must never diverge by locale.
 */
export const localeLabels: Record<Locale, {
  algorithms: string;
  f2l: string;
  oll: string;
  pll: string;
  learn: string;
  scramble: string;
  home: string;
  back: string;
  next: string;
}> = {
  en: { algorithms: "Algorithms", f2l: "F2L Algorithms", oll: "OLL Algorithms", pll: "PLL Algorithms", learn: "Learn", scramble: "Scramble Generator", home: "Home", back: "← Algorithms", next: "Next" },
  es: { algorithms: "Algoritmos", f2l: "Algoritmos F2L", oll: "Algoritmos OLL", pll: "Algoritmos PLL", learn: "Aprender", scramble: "Generador de mezclas", home: "Inicio", back: "← Algoritmos", next: "Siguiente" },
  fr: { algorithms: "Algorithmes", f2l: "Algorithmes F2L", oll: "Algorithmes OLL", pll: "Algorithmes PLL", learn: "Apprendre", scramble: "Générateur de mélanges", home: "Accueil", back: "← Algorithmes", next: "Suivant" },
  de: { algorithms: "Algorithmen", f2l: "F2L-Algorithmen", oll: "OLL-Algorithmen", pll: "PLL-Algorithmen", learn: "Lernen", scramble: "Scramble-Generator", home: "Startseite", back: "← Algorithmen", next: "Weiter" },
};
