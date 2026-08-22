import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/algorithms")({
  head: () => ({ meta: [{ title: "Rubik's Cube Algorithms – Beginner & Speedcubing Guide | RubikSolver" }, { name: "description", content: "Learn essential Rubik's Cube algorithms, including R U R' U', the sexy move, sledgehammer, beginner algorithms, and the foundations of CFOP." }] }),
  component: AlgorithmsPage,
});

const algorithms = [
  ["R U R' U'", "The classic four-move sequence used throughout beginner solving and speedcubing. It is commonly called the sexy move."],
  ["R' F R F'", "A useful four-move sequence often called the sledgehammer. It appears in several corner and pair-solving situations."],
  ["F R U R' U' F'", "A six-move sequence that can be used when working with last-layer orientation and forming a yellow cross."],
  ["Beginner algorithms", "A complete beginner method is built from a small set of repeatable sequences. Learn notation first, then practice algorithms slowly and accurately before trying to increase speed."],
  ["CFOP algorithms", "Speedcubers commonly organize 3x3 solving around Cross, F2L, OLL, and PLL. This hub will grow into dedicated F2L, OLL, and PLL resources."],
] as const;

function AlgorithmsPage() { return <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-14"><Link to="/" className="text-sm text-muted-foreground hover:text-foreground">← Home</Link><header className="mt-8"><p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">Solve faster</p><h1 className="mt-2 text-4xl font-semibold sm:text-5xl">Rubik's Cube Algorithms</h1><p className="mt-4 max-w-3xl text-lg text-muted-foreground">Explore common Rubik's Cube algorithms for beginners and speedcubers. Use the notation guide alongside this page to learn what every move means.</p></header><section className="mt-10 grid gap-5 md:grid-cols-2">{algorithms.map(([name,body]) => <article key={name} className="panel p-6"><h2 className="text-xl font-semibold">{name}</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">{body}</p>{name.includes("R U") && <code className="mt-4 block rounded-lg bg-background px-4 py-3 font-mono text-sm">{name}</code>}</article>)}</section><section className="mt-8 panel p-6 sm:p-8"><h2 className="text-2xl font-semibold">Learn the notation first</h2><p className="mt-2 text-muted-foreground">Algorithms are much easier to read once you know R, L, U, D, F, B, prime moves, and double turns.</p><Link to="/notation" className="mt-4 inline-flex text-sm font-medium text-primary underline">Read the Rubik's Cube notation guide →</Link></section></div> }
