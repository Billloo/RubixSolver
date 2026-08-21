import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Clock3, RotateCw } from "lucide-react";
import { CubeNet } from "@/components/CubeNet";
import { applyAlg, solvedState } from "@/lib/cube/model";
import { PUZZLES } from "@/lib/cube/puzzles";
import { copy, LANGUAGES, type Locale } from "@/lib/i18n";

export const Route = createFileRoute("/$lang/")({
  loader: ({ params }) => { const lang = params.lang as Locale; if (!copy[lang]) throw notFound(); return { lang, c: copy[lang] }; },
  head: ({ loaderData }) => { if (!loaderData) return { meta: [{ name: "robots", content: "noindex" }] }; const { lang, c } = loaderData; return { meta: [{ title: c.homeTitle }, { name: "description", content: c.homeDescription }, { tagName: "link", rel: "canonical", href: `https://rubiksolver.pro/${lang}/` }, ...LANGUAGES.map(x => ({ tagName: "link", rel: "alternate", hrefLang: x.code, href: x.code === "en" ? "https://rubiksolver.pro/" : `https://rubiksolver.pro/${x.code}/` }))] }; },
  component: LocalizedHome,
});

const PREVIEW = applyAlg(solvedState(3), "R U R' U' F2 L D' B R2 U");

function LocalizedHome() {
  const { lang, c } = Route.useLoaderData();
  const localized = (path: string) => `/${lang}/${path}` as any;
  return <div lang={lang} className="min-h-screen">
    <main>
      <section className="hero-glow"><div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:py-28"><div><p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">{c.learn}</p><h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-tight sm:text-6xl">{c.homeTitle}</h1><p className="mt-6 max-w-2xl text-lg text-muted-foreground">{c.intro}</p><div className="mt-8 flex flex-wrap gap-3"><Link to={localized("solver/3x3")} className="rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground">{c.solve3}</Link><Link to={localized("solver/2x2")} className="rounded-lg border border-border bg-background px-5 py-3 text-sm font-medium">{c.solve2}</Link></div></div><div className="panel flex justify-center p-6"><CubeNet state={PREVIEW} /></div></div></section>
      <section className="mx-auto w-full max-w-6xl px-4 pb-6 sm:px-6"><h2 className="text-2xl font-semibold">{c.tools}</h2><p className="mt-2 max-w-2xl text-sm text-muted-foreground">{c.solver3Description}</p><div className="mt-6 grid gap-4 sm:grid-cols-2">{PUZZLES.filter(p => p.slug === "2x2" || p.slug === "3x3").map(p => <Link key={p.slug} to={localized(`solver/${p.slug}`)} className="panel group flex flex-col gap-3 p-5 transition hover:-translate-y-1 hover:border-primary"><div className="flex items-center justify-between"><span className="font-display text-3xl font-semibold">{p.slug}</span><span className="rounded-full bg-primary/15 px-2.5 py-1 text-xs text-primary">{c.tools}</span></div><div><p className="font-medium">{p.name}</p><p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p></div><p className="mt-auto pt-2 text-xs uppercase tracking-wider text-muted-foreground">{p.pieces}</p></Link>)}</div></section>
      <section className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-16 sm:px-6 md:grid-cols-2"><Link to={localized("notation")} className="panel p-6 hover:border-primary"><RotateCw className="size-5 text-primary"/><h2 className="mt-4 text-xl font-semibold">{c.notationTitle}</h2><p className="mt-2 text-sm text-muted-foreground">{c.notationDescription}</p></Link><Link to={localized("timer")} className="panel p-6 hover:border-primary"><Clock3 className="size-5 text-primary"/><h2 className="mt-4 text-xl font-semibold">{c.timerTitle}</h2><p className="mt-2 text-sm text-muted-foreground">{c.timerDescription}</p></Link></section>
    </main>
  </div>;
}
