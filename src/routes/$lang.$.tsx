import { createFileRoute, notFound } from "@tanstack/react-router";
import type { ComponentType } from "react";
import { copy, LANGUAGES, type Locale } from "@/lib/i18n";
import { getPuzzle } from "@/lib/cube/puzzles";
import { SolverPage } from "./solver.$puzzle";
import { Route as NotationRoute } from "./notation";
import { Route as TimerRoute } from "./timer";
import { Route as AlgorithmsRoute } from "./algorithms";
import { Route as F2LRoute } from "./algorithms/f2l";
import { Route as OLLRoute } from "./algorithms/oll";
import { Route as PLLRoute } from "./algorithms/pll";
import { Route as CFOPRoute } from "./guides/what-is-cfop";
import { Route as LearnRoute } from "./learn/how-to-solve-a-rubiks-cube";
import { Route as ScrambleRoute } from "./scramble-generator";

const validPaths = [
  "notation",
  "timer",
  "solver/2x2",
  "solver/3x3",
  "algorithms",
  "algorithms/f2l",
  "algorithms/oll",
  "algorithms/pll",
  "learn/how-to-solve-a-rubiks-cube",
  "guides/what-is-cfop",
  "scramble-generator",
] as const;

type LocalizedPath = (typeof validPaths)[number];

const mirroredRoutes: Partial<Record<LocalizedPath, ComponentType<any>>> = {
  notation: NotationRoute.options.component,
  timer: TimerRoute.options.component,
  algorithms: AlgorithmsRoute.options.component,
  "algorithms/f2l": F2LRoute.options.component,
  "algorithms/oll": OLLRoute.options.component,
  "algorithms/pll": PLLRoute.options.component,
  "guides/what-is-cfop": CFOPRoute.options.component,
  "learn/how-to-solve-a-rubiks-cube": LearnRoute.options.component,
  "scramble-generator": ScrambleRoute.options.component,
};

export const Route = createFileRoute("/$lang/$")({
  loader: ({ params }) => {
    const lang = params.lang as Locale;
    const path = (params._splat || "").replace(/^\/+|\/+$/g, "") as LocalizedPath;
    if (!copy[lang] || !validPaths.includes(path)) throw notFound();
    return { lang, path };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ name: "robots", content: "noindex" }] };
    const { lang, path } = loaderData;
    const englishPath = path;
    const links = LANGUAGES.map((language) => ({
      rel: "alternate",
      hrefLang: language.code,
      href: language.code === "en"
        ? `https://rubiksolver.pro/${englishPath}`
        : `https://rubiksolver.pro/${language.code}/${englishPath}`,
    }));
    links.push({
      rel: "canonical",
      hrefLang: "",
      href: lang === "en"
        ? `https://rubiksolver.pro/${englishPath}`
        : `https://rubiksolver.pro/${lang}/${englishPath}`,
    });
    return { links };
  },
  component: LocalizedMirrorPage,
});

/**
 * Localization is deliberately a mirror of the canonical English route.
 * The page component, markup, interactive behavior, algorithms, diagrams,
 * spacing, and CSS all come from the same English source component. This
 * prevents localized routes from silently falling back to the old SimplePage
 * approximation and guarantees structural parity as English pages evolve.
 * Locale-specific copy is supplied by the page components/i18n layer rather
 * than creating separate simplified page implementations.
 */
function LocalizedMirrorPage() {
  const { lang, path } = Route.useLoaderData();

  if (path === "solver/2x2" || path === "solver/3x3") {
    const puzzle = getPuzzle(path.endsWith("3x3") ? "3x3" : "2x2");
    if (!puzzle) throw notFound();
    return <div lang={lang}><SolverPage puzzle={puzzle} locale={lang} /></div>;
  }

  const Component = mirroredRoutes[path];
  if (!Component) throw notFound();

  return <div lang={lang}><Component /></div>;
}
