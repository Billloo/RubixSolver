import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/algorithms")({
  head: () => ({ meta: [{ title: "Rubik's Cube Algorithms – Beginner & CFOP Guide | RubikSolver" }, { name: "description", content: "Learn Rubik's Cube algorithms for beginners and speedcubers, including the sexy move, sledgehammer, F2L, OLL, PLL, and CFOP." }] }),
  component: AlgorithmsPage,
});

const algorithms = [
  ["R U R' U'", "The classic four-move sequence used throughout beginner solving and speedcubing. It is commonly called the sexy move."],
  ["R' F R F'", "A useful four-move sequence often called the sledgehammer. It appears in several corner and pair-solving situations."],
  ["F R U R' U' F'", "A six-move sequence commonly used when working with last-layer orientation and forming a yellow cross."],
  ["Beginner algorithms", "A beginner method uses a small set of repeatable sequences. Learn notation first, then practice algorithms slowly and accurately before increasing speed."],
] as const;

function AlgorithmsPage() {
  return <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
    <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">← Home</Link>
    <header className="mt-8"><p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">Solve faster</p><h1 className="mt-2 text-4xl font-semibold sm:text-5xl">Rubik's Cube Algorithms</h1><p className="mt-4 max-w-3xl text-lg text-muted-foreground">Explore common Rubik's Cube algorithms for beginners and speedcubers. Start with essential sequences, then learn F2L, OLL, and PLL as you progress through CFOP.</p></header>
    <section className="mt-10 grid gap-5 md:grid-cols-2">{algorithms.map(([name, body]) => <article key={name} className="panel p-6"><h2 className="text-xl font-semibold">{name}</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">{body}</p>{name.includes("R U") && <code className="mt-4 block rounded-lg bg-background px-4 py-3 font-mono text-sm">{name}</code>}</article>)}</section>
    <section className="mt-8 grid gap-4 md:grid-cols-3">
      <Link to="/algorithms/f2l" className="panel block p-6 transition hover:-translate-y-1 hover:border-primary" aria-label="Learn F2L algorithms"><h2 className="text-xl font-semibold">F2L</h2><p className="mt-2 text-sm text-muted-foreground">First Two Layers: pair corners and edges efficiently.</p><span className="mt-4 inline-block text-sm font-medium text-primary">Learn F2L algorithms →</span></Link>
      <Link to="/algorithms/oll" className="panel block p-6 transition hover:-translate-y-1 hover:border-primary" aria-label="Learn OLL algorithms"><h2 className="text-xl font-semibold">OLL</h2><p className="mt-2 text-sm text-muted-foreground">Orient the Last Layer and build toward full OLL.</p><span className="mt-4 inline-block text-sm font-medium text-primary">Learn OLL algorithms →</span></Link>
      <Link to="/algorithms/pll" className="panel block p-6 transition hover:-translate-y-1 hover:border-primary" aria-label="Learn PLL algorithms"><h2 className="text-xl font-semibold">PLL</h2><p className="mt-2 text-sm text-muted-foreground">Permute the Last Layer and finish a CFOP solve.</p><span className="mt-4 inline-block text-sm font-medium text-primary">Learn PLL algorithms →</span></Link>
    </section>
    <section className="mt-8 panel p-6 sm:p-8"><h2 className="text-2xl font-semibold">Learn the notation first</h2><p className="mt-2 text-muted-foreground">Algorithms are much easier to read once you know R, L, U, D, F, B, prime moves, and double turns.</p><div className="mt-4 flex flex-wrap gap-4"><Link to="/notation" className="text-sm font-medium text-primary underline">Read the notation guide →</Link><Link to="/guides/what-is-cfop" className="text-sm font-medium text-primary underline">What is CFOP? →</Link></div></section>
  </div>;
}
