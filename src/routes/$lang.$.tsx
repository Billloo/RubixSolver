import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { copy, LANGUAGES, type Locale } from "@/lib/i18n";
import { getPuzzle } from "@/lib/cube/puzzles";
import { SolverPage } from "./solver.$puzzle";

const validPaths = [
  "notation", "timer", "solver/2x2", "solver/3x3", "algorithms",
  "algorithms/f2l", "algorithms/oll", "algorithms/pll",
  "learn/how-to-solve-a-rubiks-cube", "guides/what-is-cfop", "scramble-generator",
];

const content = {
  en: {
    algorithms: ["Rubik's Cube Algorithms", "Learn the essential algorithms used to solve and speedsolve a 3x3 Rubik's Cube.", ["F2L Algorithms", "OLL Algorithms", "PLL Algorithms"]],
    f2l: ["F2L Algorithms", "F2L (First Two Layers) solves the four corner-edge pairs between the cross and the last layer.", ["Look for a matching corner and edge pair.", "Pair the pieces in the correct orientation.", "Insert the pair into its slot without disturbing solved pairs."]],
    oll: ["OLL Algorithms", "OLL (Orientation of the Last Layer) makes every sticker on the last layer face the correct direction.", ["Start with 2-look OLL to learn the method.", "Recognize the case from the top face.", "Apply the algorithm and check the orientation."]],
    pll: ["PLL Algorithms", "PLL (Permutation of the Last Layer) moves the last-layer pieces into their correct positions.", ["Learn 2-look PLL first.", "Identify the corner and edge permutation.", "Execute the algorithm while keeping the cube orientation fixed."]],
    learn: ["How to Solve a Rubik's Cube", "A beginner-friendly path from a scrambled 3x3 to a solved cube.", ["Understand cube notation", "Make the white cross", "Solve the white corners", "Solve the second layer", "Make the yellow cross", "Solve the yellow edges", "Position the yellow corners", "Orient the yellow corners"]],
    cfop: ["What Is CFOP?", "CFOP is a popular speedcubing method built around four stages: Cross, F2L, OLL, and PLL.", ["Cross — build the first cross efficiently.", "F2L — solve the first two layers as four pairs.", "OLL — orient the final layer.", "PLL — permute the final-layer pieces."]],
    scramble: ["Rubik's Cube Scramble Generator", "Generate practice scrambles for 3x3 speedcubing and then use the timer to record your solve.", "Generate Scramble"],
  },
  es: {
    algorithms: ["Algoritmos del Cubo de Rubik", "Aprende los algoritmos esenciales para resolver y practicar speedcubing con un Cubo de Rubik 3x3.", ["Algoritmos F2L", "Algoritmos OLL", "Algoritmos PLL"]],
    f2l: ["Algoritmos F2L", "F2L (Primeras Dos Capas) resuelve los cuatro pares de esquina y arista entre la cruz y la última capa.", ["Busca una esquina y una arista que formen un par.", "Coloca las piezas con la orientación correcta.", "Inserta el par en su posición sin alterar los pares resueltos."]],
    oll: ["Algoritmos OLL", "OLL (Orientación de la Última Capa) hace que todas las pegatinas de la última capa queden orientadas correctamente.", ["Empieza con OLL en dos pasos.", "Reconoce el caso desde la cara superior.", "Aplica el algoritmo y comprueba la orientación."]],
    pll: ["Algoritmos PLL", "PLL (Permutación de la Última Capa) coloca las piezas de la última capa en sus posiciones correctas.", ["Aprende primero PLL en dos pasos.", "Identifica la permutación de esquinas y aristas.", "Ejecuta el algoritmo manteniendo fija la orientación del cubo."]],
    learn: ["Cómo resolver un Cubo de Rubik", "Una guía para principiantes desde un 3x3 mezclado hasta un cubo resuelto.", ["Aprende la notación", "Haz la cruz blanca", "Resuelve las esquinas blancas", "Resuelve la segunda capa", "Haz la cruz amarilla", "Resuelve las aristas amarillas", "Coloca las esquinas amarillas", "Orienta las esquinas amarillas"]],
    cfop: ["¿Qué es CFOP?", "CFOP es uno de los métodos más populares de speedcubing y consta de cuatro etapas: Cruz, F2L, OLL y PLL.", ["Cruz — construye la cruz inicial de forma eficiente.", "F2L — resuelve las dos primeras capas mediante cuatro pares.", "OLL — orienta la última capa.", "PLL — permuta las piezas de la última capa."]],
    scramble: ["Generador de Mezclas del Cubo de Rubik", "Genera mezclas para practicar 3x3 y usa después el temporizador para registrar tu tiempo.", "Generar mezcla"],
  },
  fr: {
    algorithms: ["Algorithmes du Rubik's Cube", "Apprenez les algorithmes essentiels pour résoudre et pratiquer le speedcubing sur un Rubik's Cube 3x3.", ["Algorithmes F2L", "Algorithmes OLL", "Algorithmes PLL"]],
    f2l: ["Algorithmes F2L", "Le F2L (First Two Layers) résout les quatre paires coin-arête situées entre la croix et la dernière couche.", ["Repérez un coin et une arête qui forment une paire.", "Associez les pièces dans la bonne orientation.", "Insérez la paire sans perturber les paires déjà résolues."]],
    oll: ["Algorithmes OLL", "L'OLL (Orientation of the Last Layer) oriente correctement toutes les pièces de la dernière couche.", ["Commencez par l'OLL en deux étapes.", "Identifiez le cas depuis la face supérieure.", "Appliquez l'algorithme puis vérifiez l'orientation."]],
    pll: ["Algorithmes PLL", "La PLL (Permutation of the Last Layer) place les pièces de la dernière couche dans leurs positions finales.", ["Apprenez d'abord la PLL en deux étapes.", "Identifiez la permutation des coins et des arêtes.", "Exécutez l'algorithme en gardant l'orientation du cube fixe."]],
    learn: ["Comment résoudre un Rubik's Cube", "Un parcours simple pour débutants, du 3x3 mélangé au cube entièrement résolu.", ["Comprendre la notation", "Faire la croix blanche", "Résoudre les coins blancs", "Résoudre la deuxième couche", "Faire la croix jaune", "Résoudre les arêtes jaunes", "Positionner les coins jaunes", "Orienter les coins jaunes"]],
    cfop: ["Qu'est-ce que le CFOP ?", "Le CFOP est une méthode très utilisée en speedcubing, organisée en quatre étapes : Cross, F2L, OLL et PLL.", ["Cross — construire efficacement la croix initiale.", "F2L — résoudre les deux premières couches avec quatre paires.", "OLL — orienter la dernière couche.", "PLL — permuter les pièces de la dernière couche."]],
    scramble: ["Générateur de Mélanges du Rubik's Cube", "Générez des mélanges pour vous entraîner au 3x3, puis utilisez le chronomètre pour enregistrer votre temps.", "Générer un mélange"],
  },
  de: {
    algorithms: ["Rubik's Cube Algorithmen", "Lerne die wichtigsten Algorithmen zum Lösen und Speedcubing eines 3x3-Rubik's Cube.", ["F2L-Algorithmen", "OLL-Algorithmen", "PLL-Algorithmen"]],
    f2l: ["F2L-Algorithmen", "F2L (First Two Layers) löst die vier Eck-Kanten-Paare zwischen Kreuz und letzter Ebene.", ["Finde eine passende Ecke und Kante.", "Verbinde die Teile in der richtigen Orientierung.", "Setze das Paar ein, ohne bereits gelöste Paare zu stören."]],
    oll: ["OLL-Algorithmen", "OLL (Orientation of the Last Layer) richtet alle Steine der letzten Ebene korrekt aus.", ["Beginne mit 2-Look OLL.", "Erkenne den Fall von der Oberseite aus.", "Führe den Algorithmus aus und prüfe die Orientierung."]],
    pll: ["PLL-Algorithmen", "PLL (Permutation of the Last Layer) bringt die Steine der letzten Ebene an ihre richtigen Positionen.", ["Lerne zuerst 2-Look PLL.", "Erkenne die Permutation von Ecken und Kanten.", "Führe den Algorithmus bei gleichbleibender Würfelorientierung aus."]],
    learn: ["Einen Rubik's Cube lösen", "Ein verständlicher Weg für Anfänger vom gemischten 3x3 bis zum vollständig gelösten Würfel.", ["Die Würfelnotation verstehen", "Das weiße Kreuz bilden", "Die weißen Ecken lösen", "Die zweite Ebene lösen", "Das gelbe Kreuz bilden", "Die gelben Kanten lösen", "Die gelben Ecken positionieren", "Die gelben Ecken orientieren"]],
    cfop: ["Was ist CFOP?", "CFOP ist eine beliebte Speedcubing-Methode mit vier Schritten: Cross, F2L, OLL und PLL.", ["Cross — das erste Kreuz effizient bilden.", "F2L — die ersten beiden Ebenen mit vier Paaren lösen.", "OLL — die letzte Ebene orientieren.", "PLL — die Steine der letzten Ebene permutieren."]],
    scramble: ["Rubik's Cube Scramble-Generator", "Erstelle Scrambles zum 3x3-Training und nutze anschließend den Timer, um deine Zeit zu messen.", "Scramble erstellen"],
  },
} as const;

type SectionKey = keyof typeof content.en;

export const Route = createFileRoute("/$lang/$")({
  loader: ({ params }) => {
    const lang = params.lang as Locale;
    const path = (params._splat || "").replace(/^\/+|\/+$/g, "");
    if (!copy[lang] || !validPaths.includes(path)) throw notFound();
    return { lang, path, c: copy[lang] };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ name: "robots", content: "noindex" }] };
    const { lang, path, c } = loaderData;
    const section = path as SectionKey;
    const data = content[lang][section];
    const title = data ? data[0] : path === "notation" ? c.notationTitle : path === "timer" ? c.timerTitle : path === "solver/3x3" ? c.solver3Title : c.solver2Title;
    const description = data ? data[1] : path === "notation" ? c.notationDescription : path === "timer" ? c.timerDescription : path === "solver/3x3" ? c.solver3Description : c.solver2Description;
    return { meta: [{ title }, { name: "description", content: description }], links: LANGUAGES.map((x) => ({ rel: "alternate", hrefLang: x.code, href: x.code === "en" ? `https://rubiksolver.pro/${path}` : `https://rubiksolver.pro/${x.code}/${path}` })).concat([{ rel: "canonical", href: lang === "en" ? `https://rubiksolver.pro/${path}` : `https://rubiksolver.pro/${lang}/${path}` }]) };
  },
  component: LocalizedPage,
});

function LocalizedPage() {
  const { lang, path, c } = Route.useLoaderData();
  if (path === "solver/2x2" || path === "solver/3x3") {
    const puzzle = getPuzzle(path.endsWith("3x3") ? "3x3" : "2x2");
    if (!puzzle) throw notFound();
    return <div lang={lang}><SolverPage puzzle={puzzle} locale={lang} /></div>;
  }
  if (path === "notation") return <SimplePage lang={lang} title={c.notationTitle} description={c.notationDescription} home={c.home} links={[`R = ${lang === "es" ? "Derecha" : lang === "fr" ? "Droite" : lang === "de" ? "Rechts" : "Right"}`, "L = Left", "U = Up", "D = Down", "F = Front", "B = Back", "R' = inverse turn", "R2 = 180° turn"]} />;
  if (path === "timer") return <SimplePage lang={lang} title={c.timerTitle} description={c.timerDescription} home={c.home} links={[c.solve3, c.solve2, "Scramble generator", "Ao5", "Solve history"]} />;
  const data = content[lang][path as SectionKey];
  if (!data) throw notFound();
  const items = Array.isArray(data[2]) ? data[2] as string[] : [data[2] as string];
  return <SimplePage lang={lang} title={data[0] as string} description={data[1] as string} home={c.home} links={items} path={path} />;
}

function SimplePage({ lang, title, description, home, links, path }: { lang: Locale; title: string; description: string; home: string; links: string[]; path?: string }) {
  return <main lang={lang} className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 sm:py-16"><Link to={`/${lang}/` as any} className="text-sm text-muted-foreground hover:text-foreground">← {home}</Link><header className="mt-8 max-w-3xl"><p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">RubikSolver</p><h1 className="mt-2 text-4xl font-semibold sm:text-5xl">{title}</h1><p className="mt-4 text-lg leading-8 text-muted-foreground">{description}</p></header><section className="mt-10 panel p-6 sm:p-8"><div className="grid gap-4 sm:grid-cols-2">{links.map((item, i) => <article key={item} className="rounded-xl border border-border bg-background/50 p-5"><span className="text-sm font-medium text-primary">{i + 1}</span><h2 className="mt-2 text-lg font-semibold">{item}</h2></article>)}</div>{path === "algorithms" && <div className="mt-8 flex flex-wrap gap-3"><InternalLink lang={lang} href="algorithms/f2l" label={links[0]!} /><InternalLink lang={lang} href="algorithms/oll" label={links[1]!} /><InternalLink lang={lang} href="algorithms/pll" label={links[2]!} /></div>}{path === "guides/what-is-cfop" && <div className="mt-8 flex flex-wrap gap-3"><InternalLink lang={lang} href="algorithms/f2l" label="F2L" /><InternalLink lang={lang} href="algorithms/oll" label="OLL" /><InternalLink lang={lang} href="algorithms/pll" label="PLL" /></div>}{path === "learn/how-to-solve-a-rubiks-cube" && <div className="mt-8"><InternalLink lang={lang} href="solver/3x3" label="Rubik's Cube Solver" /></div>}{path === "scramble-generator" && <div className="mt-8"><InternalLink lang={lang} href="timer" label="Rubik's Cube Timer" /></div>}</section></main>;
}

function InternalLink({ lang, href, label }: { lang: Locale; href: string; label: string }) { return <Link to={`/${lang}/${href}` as any} className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-accent">{label} →</Link>; }
