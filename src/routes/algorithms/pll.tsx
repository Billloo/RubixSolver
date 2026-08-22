import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/algorithms/pll")({
  head: () => ({ meta: [
    { title: "PLL Algorithms – Rubik's Cube Last Layer Permutation Guide | RubikSolver" },
    { name: "description", content: "Learn PLL algorithms for a 3x3 Rubik's Cube. Understand permutation of the last layer, 2-look PLL, full PLL, and practical speedcubing tips." },
  ] }),
  component: PLLPage,
});

const stages = [
  ["What is PLL?", "PLL stands for Permutation of the Last Layer. After OLL has oriented the last layer, PLL moves the last-layer pieces into their correct positions."],
  ["Start with 2-look PLL", "A beginner-friendly approach solves the last layer in two steps: first permute the corners, then permute the edges. This reduces the number of algorithms you need to memorize."],
  ["Move to full PLL", "Full PLL has 21 cases. Learn recognition first, then add cases gradually. Consistent execution is more valuable than rushing to memorize every algorithm."],
] as const;

function PLLPage() {
  return <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
    <Link to="/algorithms" className="text-sm text-muted-foreground hover:text-foreground">← Algorithms</Link>
    <header className="mt-8">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">CFOP • PLL</p>
      <h1 className="mt-2 text-4xl font-semibold sm:text-5xl">PLL Algorithms</h1>
      <p className="mt-4 text-lg text-muted-foreground">Learn PLL, or Permutation of the Last Layer, and build from 2-look PLL toward the complete set of 21 PLL cases used in CFOP.</p>
    </header>
    <div className="mt-10 space-y-5">{stages.map(([title, body]) => <section key={title} className="panel p-6"><h2 className="text-2xl font-semibold">{title}</h2><p className="mt-3 leading-7 text-muted-foreground">{body}</p></section>)}</div>
    <section className="mt-8 panel p-6 sm:p-8">
      <h2 className="text-2xl font-semibold">PLL practice tips</h2>
      <ul className="mt-4 list-disc space-y-3 pl-5 text-muted-foreground"><li>Practice recognizing the case before starting the algorithm.</li><li>Learn algorithms from a consistent angle and grip.</li><li>Use slow, accurate repetitions before increasing turning speed.</li><li>Time full solves to measure whether your new algorithms are actually helping.</li></ul>
      <div className="mt-6 flex flex-wrap gap-4"><Link to="/algorithms/oll" className="text-sm font-medium text-primary underline">Learn OLL →</Link><Link to="/algorithms/f2l" className="text-sm font-medium text-primary underline">Learn F2L →</Link><Link to="/timer" className="text-sm font-medium text-primary underline">Practice with the timer →</Link></div>
    </section>
  </div>;
}
