import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/algorithms/pll")({
  head: () => ({ meta: [
    { title: "PLL Algorithms – Complete Rubik's Cube PLL Guide | RubikSolver" },
    { name: "description", content: "Learn PLL algorithms for the 3x3 Rubik's Cube. This Permutation of the Last Layer guide covers 2-look PLL, common PLL algorithms, recognition, all 21 PLL cases, and CFOP practice." },
    { name: "keywords", content: "PLL algorithms, PLL Rubik's Cube, PLL guide, permutation of last layer, 2-look PLL, full PLL, 21 PLL cases, 3x3 PLL, CFOP algorithms, Rubik's Cube algorithms" },
  ] }),
  component: PLLPage,
});

const algorithms = [
  ["Ua Permutation", "R U' R U R U R U' R' U' R2", "A common edge-permutation algorithm used in full PLL. Practice recognizing which direction the three edges need to cycle."],
  ["Ub Permutation", "R2 U R U R' U' R' U' R' U R'", "The companion edge-cycle pattern to Ua. Recognition of the cycle direction helps you choose between Ua and Ub."],
  ["T Permutation", "R U R' U' R' F R2 U' R' U' R U R' F'", "A widely used PLL algorithm that swaps a pair of corners and a pair of edges. It is an important full-PLL case to learn."],
] as const;

function PLLPage() {
  return <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
    <Link to="/algorithms" className="text-sm text-muted-foreground hover:text-foreground">← Algorithms</Link>
    <header className="mt-8"><p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">CFOP • PLL</p><h1 className="mt-2 text-4xl font-semibold sm:text-5xl">PLL Algorithms</h1><p className="mt-4 text-lg leading-8 text-muted-foreground">Learn PLL (Permutation of the Last Layer), the final algorithmic stage of CFOP for the 3x3 Rubik's Cube. Learn 2-look PLL, common PLL algorithms, case recognition, and how to progress to all 21 PLL cases.</p></header>
    <div className="mt-10 space-y-5">
      <section className="panel p-6 sm:p-8"><h2 className="text-2xl font-semibold">What is PLL?</h2><p className="mt-3 leading-7 text-muted-foreground">PLL stands for Permutation of the Last Layer. After OLL has oriented the last layer, PLL moves the corners and edges into their correct positions. Full PLL solves the last layer in one algorithm and contains 21 cases.</p></section>
      <section className="panel p-6 sm:p-8"><h2 className="text-2xl font-semibold">2-look PLL for beginners</h2><p className="mt-3 leading-7 text-muted-foreground">2-look PLL breaks the final step into two easier stages: first permute the corners, then permute the edges. It dramatically reduces the number of algorithms you need to learn and is a practical starting point for new CFOP solvers.</p><ol className="mt-4 list-decimal space-y-3 pl-5 leading-7 text-muted-foreground"><li>Recognize the corner permutation.</li><li>Apply the appropriate corner algorithm.</li><li>Recognize the remaining edge cycle.</li><li>Apply the edge permutation and finish the solve.</li></ol></section>
      <section className="panel p-6 sm:p-8"><h2 className="text-2xl font-semibold">Common PLL algorithms</h2><p className="mt-3 leading-7 text-muted-foreground">These are useful full-PLL cases to learn as you move beyond 2-look PLL. Full PLL has 21 cases, so build your set gradually and focus on recognition as well as execution.</p><div className="mt-6 space-y-4">{algorithms.map(([name, moves, explanation]) => <div key={name} className="rounded-xl border border-border p-5"><h3 className="font-semibold">{name}</h3><code className="mt-3 block rounded-lg bg-muted px-4 py-3 font-mono text-sm">{moves}</code><p className="mt-3 text-sm leading-6 text-muted-foreground">{explanation}</p></div>)}</div></section>
      <section className="panel p-6 sm:p-8"><h2 className="text-2xl font-semibold">Full PLL: 21 cases</h2><p className="mt-3 leading-7 text-muted-foreground">The complete PLL set contains 21 cases: corner permutations, edge permutations, and combined corner-edge permutations. Learn each case by its visual pattern, practice the algorithm with consistent finger tricks, and then use it in timed solves.</p></section>
      <section className="panel p-6 sm:p-8"><h2 className="text-2xl font-semibold">PLL recognition and practice tips</h2><ul className="mt-4 list-disc space-y-3 pl-5 leading-7 text-muted-foreground"><li>Recognize which pieces need to cycle before starting the algorithm.</li><li>Practice algorithms from a consistent grip and angle.</li><li>Build accuracy first, then increase turning speed.</li><li>Practice AUF separately so your recognition becomes faster.</li><li>Use timed solves to measure whether your PLL execution is improving.</li></ul></section>
      <section className="panel p-6 sm:p-8"><h2 className="text-2xl font-semibold">How PLL fits into CFOP</h2><p className="mt-3 leading-7 text-muted-foreground">CFOP follows Cross → F2L → OLL → PLL. F2L solves the first two layers, OLL orients the last layer, and PLL finishes the cube by permuting the remaining pieces.</p><div className="mt-5 flex flex-wrap gap-4"><Link to="/algorithms/f2l" className="text-sm font-medium text-primary underline">Learn F2L algorithms →</Link><Link to="/algorithms/oll" className="text-sm font-medium text-primary underline">Learn OLL algorithms →</Link><Link to="/timer" className="text-sm font-medium text-primary underline">Practice with the timer →</Link></div></section>
    </div>
  </div>;
}
