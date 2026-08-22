import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/algorithms/oll")({
  head: () => ({ meta: [
    { title: "OLL Algorithms – Complete Rubik's Cube OLL Guide | RubikSolver" },
    { name: "description", content: "Learn OLL algorithms for the 3x3 Rubik's Cube. This Orientation of the Last Layer guide covers 2-look OLL, common OLL algorithms, recognition, the 57 OLL cases, and CFOP practice." },
    { name: "keywords", content: "OLL algorithms, OLL Rubik's Cube, OLL guide, orientation of last layer, 2-look OLL, full OLL, 57 OLL cases, 3x3 OLL, CFOP algorithms, Rubik's Cube algorithms" },
  ] }),
  component: OLLPage,
});

const algorithms = [
  ["Make the yellow cross", "F R U R' U' F'", "A standard 2-look OLL edge-orientation algorithm. Use it when the last-layer edge stickers are not yet oriented into a yellow cross."],
  ["Sune", "R U R' U R U2 R'", "One of the most recognizable OLL algorithms. It is used for a common last-layer corner-orientation pattern."],
  ["Anti-Sune", "R U2 R' U' R U' R'", "The inverse-pattern companion to Sune and an important early OLL algorithm to recognize."],
] as const;

function OLLPage() {
  return <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
    <Link to="/algorithms" className="text-sm text-muted-foreground hover:text-foreground">← Algorithms</Link>
    <header className="mt-8"><p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">CFOP • OLL</p><h1 className="mt-2 text-4xl font-semibold sm:text-5xl">OLL Algorithms</h1><p className="mt-4 text-lg leading-8 text-muted-foreground">Learn OLL (Orientation of the Last Layer), the third stage of CFOP for the 3x3 Rubik's Cube. Learn 2-look OLL first, then progress toward the full set of OLL cases and algorithms used by speedcubers.</p></header>
    <div className="mt-10 space-y-5">
      <section className="panel p-6 sm:p-8"><h2 className="text-2xl font-semibold">What is OLL?</h2><p className="mt-3 leading-7 text-muted-foreground">OLL stands for Orientation of the Last Layer. The goal is to orient every last-layer piece so its top-facing sticker has the same color. OLL changes orientation without trying to put every piece in its final position; PLL handles that next.</p></section>
      <section className="panel p-6 sm:p-8"><h2 className="text-2xl font-semibold">2-look OLL for beginners</h2><p className="mt-3 leading-7 text-muted-foreground">2-look OLL divides the job into two smaller steps: orient the last-layer edges to make a cross, then orient the last-layer corners. It requires far fewer algorithms than full OLL and is an excellent bridge from beginner solving to CFOP.</p><ol className="mt-4 list-decimal space-y-3 pl-5 leading-7 text-muted-foreground"><li>Orient the last-layer edges.</li><li>Recognize the corner orientation pattern.</li><li>Apply the appropriate corner-orientation algorithm.</li><li>Move to PLL once the entire last layer is oriented.</li></ol></section>
      <section className="panel p-6 sm:p-8"><h2 className="text-2xl font-semibold">Common OLL algorithms</h2><p className="mt-3 leading-7 text-muted-foreground">These are useful algorithms to learn early. Full OLL contains 57 cases, so use these as a starting point rather than trying to memorize the entire set immediately.</p><div className="mt-6 space-y-4">{algorithms.map(([name, moves, explanation]) => <div key={name} className="rounded-xl border border-border p-5"><h3 className="font-semibold">{name}</h3><code className="mt-3 block rounded-lg bg-muted px-4 py-3 font-mono text-sm">{moves}</code><p className="mt-3 text-sm leading-6 text-muted-foreground">{explanation}</p></div>)}</div></section>
      <section className="panel p-6 sm:p-8"><h2 className="text-2xl font-semibold">Full OLL: 57 cases</h2><p className="mt-3 leading-7 text-muted-foreground">Full OLL uses 57 cases to orient the entire last layer in one algorithm. Learn cases gradually: recognize the visual pattern, learn the algorithm, drill it slowly, then practice it inside complete solves. Good OLL recognition is just as important as execution speed.</p></section>
      <section className="panel p-6 sm:p-8"><h2 className="text-2xl font-semibold">OLL recognition and practice tips</h2><ul className="mt-4 list-disc space-y-3 pl-5 leading-7 text-muted-foreground"><li>Learn the case shape before memorizing the moves.</li><li>Practice recognition from different AUF angles.</li><li>Use accurate, repeatable finger tricks before increasing turning speed.</li><li>Drill algorithms in short sessions instead of cramming all 57 cases.</li><li>Practice OLL after F2L so recognition becomes part of a real CFOP solve.</li></ul></section>
      <section className="panel p-6 sm:p-8"><h2 className="text-2xl font-semibold">What comes after OLL?</h2><p className="mt-3 leading-7 text-muted-foreground">Once the last layer is oriented, use PLL to move the pieces into their correct positions and finish the solve.</p><div className="mt-5 flex flex-wrap gap-4"><Link to="/algorithms/f2l" className="text-sm font-medium text-primary underline">Learn F2L algorithms →</Link><Link to="/algorithms/pll" className="text-sm font-medium text-primary underline">Learn PLL algorithms →</Link><Link to="/guides/what-is-cfop" className="text-sm font-medium text-primary underline">Read the CFOP guide →</Link></div></section>
    </div>
  </div>;
}
