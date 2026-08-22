import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/algorithms/f2l")({
  head: () => ({ meta: [
    { title: "F2L Algorithms – Complete First Two Layers Guide | RubikSolver" },
    { name: "description", content: "Learn F2L algorithms for the 3x3 Rubik's Cube. This First Two Layers guide explains F2L pairs, cases, intuitive solving, common algorithms, recognition, and CFOP practice." },
    { name: "keywords", content: "F2L algorithms, F2L Rubik's Cube, F2L guide, first two layers, F2L cases, 3x3 F2L, CFOP F2L, beginner F2L, Rubik's Cube algorithms" },
  ] }),
  component: F2LPage,
});

const triggers = [
  ["Right-side insertion", "R U R'", "A fundamental right-slot insertion trigger. The exact setup varies with the F2L case."],
  ["Left-side insertion", "L' U' L", "A fundamental left-slot insertion trigger. Learn both sides so you can work from either slot."],
  ["Common pair-building trigger", "U R U' R'", "A useful sequence for opening, pairing, and inserting pieces in many intuitive F2L situations."],
] as const;

function F2LPage() {
  return <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
    <Link to="/algorithms" className="text-sm text-muted-foreground hover:text-foreground">← Algorithms</Link>
    <header className="mt-8"><p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">CFOP • F2L</p><h1 className="mt-2 text-4xl font-semibold sm:text-5xl">F2L Algorithms</h1><p className="mt-4 text-lg leading-8 text-muted-foreground">Learn F2L (First Two Layers), the second stage of the CFOP method for solving a 3x3 Rubik's Cube. Learn how F2L pairs work, how to recognize cases, and how common F2L algorithms and triggers fit into speedcubing.</p></header>
    <div className="mt-10 space-y-5">
      <section className="panel p-6 sm:p-8"><h2 className="text-2xl font-semibold">What is F2L?</h2><p className="mt-3 leading-7 text-muted-foreground">F2L stands for First Two Layers. Instead of solving a first-layer corner and second-layer edge separately, F2L pairs those pieces and inserts the pair into its slot together. There are 41 commonly recognized F2L cases, but beginners should learn the concept before trying to memorize every case.</p></section>
      <section className="panel p-6 sm:p-8"><h2 className="text-2xl font-semibold">How to solve F2L step by step</h2><ol className="mt-4 list-decimal space-y-3 pl-5 leading-7 text-muted-foreground"><li>Solve the cross first.</li><li>Find an unsolved corner and its matching edge.</li><li>Bring the pieces into the top layer when necessary.</li><li>Pair the corner and edge without breaking the solved cross.</li><li>Insert the pair into its correct slot.</li><li>Repeat for all four F2L slots before OLL.</li></ol></section>
      <section className="panel p-6 sm:p-8"><h2 className="text-2xl font-semibold">F2L algorithms and common triggers</h2><p className="mt-3 leading-7 text-muted-foreground">F2L is best learned by understanding how the corner and edge interact. These common triggers are building blocks rather than a complete list of all 41 cases; the correct sequence depends on the position and orientation of your pair.</p><div className="mt-6 space-y-4">{triggers.map(([name, moves, explanation]) => <div key={name} className="rounded-xl border border-border p-5"><h3 className="font-semibold">{name}</h3><code className="mt-3 block rounded-lg bg-muted px-4 py-3 font-mono text-sm">{moves}</code><p className="mt-3 text-sm leading-6 text-muted-foreground">{explanation}</p></div>)}</div></section>
      <section className="panel p-6 sm:p-8"><h2 className="text-2xl font-semibold">Intuitive F2L vs. memorized algorithms</h2><p className="mt-3 leading-7 text-muted-foreground">Start with intuitive F2L so you understand how pairs are created and inserted. Then memorize algorithms for cases that are difficult to solve efficiently. Advanced cubers can learn the full set of 41 cases and work on lookahead, fewer rotations, and efficient solutions.</p></section>
      <section className="panel p-6 sm:p-8"><h2 className="text-2xl font-semibold">F2L recognition and practice tips</h2><ul className="mt-4 list-disc space-y-3 pl-5 leading-7 text-muted-foreground"><li>Identify the corner and matching edge before turning.</li><li>Practice one case repeatedly until recognition becomes automatic.</li><li>Use slow turning to improve lookahead instead of focusing only on TPS.</li><li>Minimize unnecessary cube rotations.</li><li>Practice complete CFOP solves so F2L connects naturally to OLL and PLL.</li></ul></section>
      <section className="panel p-6 sm:p-8"><h2 className="text-2xl font-semibold">What comes after F2L?</h2><p className="mt-3 leading-7 text-muted-foreground">After the cross and F2L are complete, CFOP moves to OLL (Orientation of the Last Layer) and then PLL (Permutation of the Last Layer).</p><div className="mt-5 flex flex-wrap gap-4"><Link to="/algorithms/oll" className="text-sm font-medium text-primary underline">Learn OLL algorithms →</Link><Link to="/algorithms/pll" className="text-sm font-medium text-primary underline">Learn PLL algorithms →</Link><Link to="/guides/what-is-cfop" className="text-sm font-medium text-primary underline">Read the CFOP guide →</Link></div></section>
    </div>
  </div>;
}
