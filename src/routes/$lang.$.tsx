import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock3, RotateCw } from "lucide-react";
import { copy, LANGUAGES, type Locale } from "@/lib/i18n";

const validPaths = ["notation", "timer", "solver/2x2", "solver/3x3"];

export const Route = createFileRoute("/$lang/$")({
  loader: ({ params }) => { const lang = params.lang as Locale; const path = params._splat || ""; if (!copy[lang] || !validPaths.includes(path)) throw notFound(); return { lang, path, c: copy[lang] }; },
  head: ({ loaderData }) => { if (!loaderData) return { meta: [{ name: "robots", content: "noindex" }] }; const { lang, path, c } = loaderData; const title = path === "notation" ? c.notationTitle : path === "timer" ? c.timerTitle : path === "solver/3x3" ? c.solver3Title : c.solver2Title; const description = path === "notation" ? c.notationDescription : path === "timer" ? c.timerDescription : path === "solver/3x3" ? c.solver3Description : c.solver2Description; return { meta: [{ title }, { name: "description", content: description }, { tagName: "link", rel: "canonical", href: `https://rubiksolver.pro/${lang}/${path}` }, ...LANGUAGES.map(x => ({ tagName: "link", rel: "alternate", hrefLang: x.code, href: x.code === "en" ? `https://rubiksolver.pro/${path}` : `https://rubiksolver.pro/${x.code}/${path}` }))] }; },
  component: LocalizedPage,
});

function LocalizedPage() {
  const { lang, path, c } = Route.useLoaderData();
  const isNotation = path === "notation"; const isTimer = path === "timer"; const is3 = path === "solver/3x3";
  const title = isNotation ? c.notationTitle : isTimer ? c.timerTitle : is3 ? c.solver3Title : c.solver2Title;
  const description = isNotation ? c.notationDescription : isTimer ? c.timerDescription : is3 ? c.solver3Description : c.solver2Description;
  const localized = (p: string) => `/${lang}/${p}`;
  return <div lang={lang} className="min-h-screen"><main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14"><Link to={`/${lang}/` as any} className="inline-flex items-center gap-2 text-sm text-muted-foreground"><ArrowLeft className="size-4"/>{c.home}</Link><header className="mt-8 max-w-3xl"><p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">{isNotation ? c.learn : isTimer ? c.tools : "RubikSolver"}</p><h1 className="mt-2 text-4xl font-semibold sm:text-5xl">{title}</h1><p className="mt-4 text-lg text-muted-foreground">{description}</p></header>{isNotation ? <Notation c={c}/> : isTimer ? <Timer c={c} lang={lang}/> : <Solver c={c} is3={is3} lang={lang} localized={localized}/>}</main></div>;
}

function Notation({ c }: { c: any }) { const rows = ["R","R'","R2","L","L'","L2","U","U'","U2","D","D'","D2","F","F'","F2","B","B'","B2"]; return <section className="mt-10 panel p-6 sm:p-8"><h2 className="text-2xl font-semibold">{c.notation}</h2><p className="mt-2 text-sm text-muted-foreground">{c.notationDescription}</p><div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{rows.map(m => <div key={m} className="rounded-xl border border-border bg-background/50 p-4"><div className="flex h-32 items-center justify-center rounded-lg bg-surface-2"><div className="relative"><div className="grid grid-cols-3 gap-1 rounded-lg border-2 border-border p-2">{Array.from({length:9}).map((_,i)=><span key={i} className="size-6 rounded border border-border bg-cube-r"/>)}</div><RotateCw className="absolute -right-12 top-1/2 size-8 -translate-y-1/2 text-primary"/></div></div><p className="mt-4 font-display text-xl font-semibold">{m}</p></div>)}</div></section>; }

function Timer({ c, lang }: { c: any; lang: Locale }) { return <section className="mt-10 panel p-8 text-center"><Clock3 className="mx-auto size-8 text-primary"/><p className="mt-6 font-display text-7xl font-semibold tabular-nums">0.00</p><p className="mt-4 text-muted-foreground">{c.timerDescription}</p><Link to={`/${lang}/timer` as any} className="mt-6 inline-flex rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground">{c.timer}</Link></section>; }

function Solver({ c, is3, lang, localized }: { c: any; is3: boolean; lang: Locale; localized: (p: string) => string }) { return <section className="mt-10 grid gap-6 md:grid-cols-2"><div className="panel p-6"><h2 className="text-xl font-semibold">{is3 ? c.solve3 : c.solve2}</h2><p className="mt-3 text-sm text-muted-foreground">{is3 ? c.solver3Description : c.solver2Description}</p><ol className="mt-5 space-y-3 text-sm text-muted-foreground"><li>1. {c.intro}</li><li>2. Enter the colors of every sticker.</li><li>3. Follow the generated moves one at a time.</li></ol><Link to={`/${lang}/solver/${is3 ? "3x3" : "2x2"}` as any} className="mt-6 inline-flex rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground">{is3 ? c.solve3 : c.solve2}</Link></div><div className="panel p-6"><h2 className="text-xl font-semibold">{c.notation}</h2><p className="mt-3 text-sm text-muted-foreground">{c.notationDescription}</p><Link to={localized("notation") as any} className="mt-6 inline-flex text-sm font-medium text-primary">{c.notation} →</Link></div></section>; }
