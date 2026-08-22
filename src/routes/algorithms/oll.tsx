import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/algorithms/oll")({
  head: () => ({ meta: [
    { title: "OLL Algorithms – Complete Rubik's Cube OLL Guide | RubikSolver" },
    { name: "description", content: "Learn OLL algorithms for the 3x3 Rubik's Cube. Full 2-look OLL algorithm set, popular full-OLL cases, recognition tips, and how OLL fits into CFOP." },
    { name: "keywords", content: "OLL algorithms, OLL Rubik's Cube, OLL guide, orientation of last layer, 2-look OLL, full OLL, 57 OLL cases, 3x3 OLL, CFOP algorithms" },
    { property: "og:title", content: "OLL Algorithms – Complete Rubik's Cube OLL Guide" },
    { property: "og:description", content: "Full 2-look OLL set plus popular full-OLL cases with recognition tips." },
    { property: "og:type", content: "article" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: OLLPage,
});

const edgeCases: Array<[string, string, string]> = [
  ["Dot (no edges oriented)", "F R U R' U' F' f R U R' U' f'", "No yellow edges on top. Two algorithms back to back turn the dot into a cross."],
  ["Line (horizontal bar)", "F R U R' U' F'", "Hold the yellow line horizontally, then apply the algorithm."],
  ["L-shape (bent pair)", "f R U R' U' f'", "Hold the L so the two yellow edges point to the back and left."],
];

const cornerCases: Array<[string, string, string]> = [
  ["Sune", "R U R' U R U2 R'", "One corner oriented, the sticker facing left at front-left."],
  ["Anti-Sune", "R U2 R' U' R U' R'", "One corner oriented, mirror of Sune."],
  ["Pi / Bruno", "R U2 R2 U' R2 U' R2 U2 R", "Two headlights facing you with two opposite corners twisted."],
  ["H / Double Sune", "R U R' U R U' R' U R U2 R'", "All four corners twisted, two bars facing left and right."],
  ["T shape", "r U R' U' r' F R F'", "Two oriented corners next to each other with a T-shaped block."],
  ["U shape (headlights)", "R2 D R' U2 R D' R' U2 R'", "Headlights facing away from you."],
  ["L shape", "F R' F' r U R U' r'", "Two oriented corners on a diagonal."],
];

const fullOll: Array<[string, string]> = [
  ["OLL 21 (H)", "R U2 R' U' R U R' U' R U' R'"],
  ["OLL 22 (Pi)", "R U2 R2 U' R2 U' R2 U2 R"],
  ["OLL 23 (Headlights)", "R2 D' R U2 R' D R U2 R"],
  ["OLL 24 (Chameleon)", "r U R' U' r' F R F'"],
  ["OLL 25 (Bowtie)", "F' r U R' U' r' F R"],
  ["OLL 26 (Anti-Sune)", "R U2 R' U' R U' R'"],
  ["OLL 27 (Sune)", "R U R' U R U2 R'"],
  ["OLL 33 (T)", "R U R' U' R' F R F'"],
  ["OLL 45 (T)", "F R U R' U' F'"],
  ["OLL 44 (P)", "f R U R' U' f'"],
  ["OLL 43 (P mirror)", "f' L' U' L U f"],
  ["OLL 32 (Squeegee)", "S R U R' U' R' F R f'"],
  ["OLL 28 (Duck)", "r U R' U' r' R U R U' R'"],
  ["OLL 57 (H, all edges)", "R U R' U' M' U R U' r'"],
];

function OLLPage() {
  return <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
    <Link to="/algorithms" className="text-sm text-muted-foreground hover:text-foreground">← Algorithms</Link>
    <header className="mt-8"><p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">CFOP • OLL</p><h1 className="mt-2 text-4xl font-semibold sm:text-5xl">OLL Algorithms</h1><p className="mt-4 text-lg leading-8 text-muted-foreground">OLL (Orientation of the Last Layer) is the third stage of CFOP. Learn the complete 2-look OLL set first — ten algorithms that cover every case — then expand toward full OLL.</p></header>
    <div className="mt-10 space-y-5">
      <section className="panel p-6 sm:p-8"><h2 className="text-2xl font-semibold">What is OLL?</h2><p className="mt-3 leading-7 text-muted-foreground">OLL makes the entire top face a single color. It does not care where the pieces end up — PLL handles that. Full OLL solves this in one algorithm across 57 cases; 2-look OLL splits it into edges then corners using only ten algorithms.</p></section>
      <section className="panel p-6 sm:p-8"><h2 className="text-2xl font-semibold">Step 1 · Orient the edges (yellow cross)</h2><div className="mt-5 space-y-4">{edgeCases.map(([name, moves, note]) => <div key={name} className="rounded-xl border border-border p-5"><h3 className="font-semibold">{name}</h3><code className="mt-3 block rounded-lg bg-muted px-4 py-3 font-mono text-sm">{moves}</code><p className="mt-3 text-sm leading-6 text-muted-foreground">{note}</p></div>)}</div></section>
      <section className="panel p-6 sm:p-8"><h2 className="text-2xl font-semibold">Step 2 · Orient the corners</h2><p className="mt-3 leading-7 text-muted-foreground">With the cross made, these seven cases cover every remaining corner orientation.</p><div className="mt-5 space-y-4">{cornerCases.map(([name, moves, note]) => <div key={name} className="rounded-xl border border-border p-5"><h3 className="font-semibold">{name}</h3><code className="mt-3 block rounded-lg bg-muted px-4 py-3 font-mono text-sm">{moves}</code><p className="mt-3 text-sm leading-6 text-muted-foreground">{note}</p></div>)}</div></section>
      <section className="panel p-6 sm:p-8"><h2 className="text-2xl font-semibold">Popular full-OLL cases</h2><p className="mt-3 leading-7 text-muted-foreground">Learning full OLL means 57 cases. These are the highest-value ones to add first because they appear often and replace two-look solutions.</p><ul className="mt-5 space-y-3">{fullOll.map(([name, alg]) => <li key={name} className="rounded-xl border border-border p-4"><p className="text-sm font-medium">{name}</p><code className="mt-2 block rounded-lg bg-muted px-3 py-2 font-mono text-sm">{alg}</code></li>)}</ul></section>
      <section className="panel p-6 sm:p-8"><h2 className="text-2xl font-semibold">Recognition and practice tips</h2><ul className="mt-4 list-disc space-y-3 pl-5 leading-7 text-muted-foreground"><li>Learn the shape before the moves — count oriented edges, then corners.</li><li>Practice recognition from all four AUF angles.</li><li>Use consistent finger tricks before increasing speed.</li><li>Add three or four full-OLL cases per week, not all 57 at once.</li><li>Drill OLL directly after F2L so recognition happens under real conditions.</li></ul></section>
      <section className="panel p-6 sm:p-8"><h2 className="text-2xl font-semibold">What comes after OLL?</h2><p className="mt-3 leading-7 text-muted-foreground">Once the top face is one solid color, PLL permutes the pieces into place and finishes the solve.</p><div className="mt-5 flex flex-wrap gap-4"><Link to="/algorithms/f2l" className="text-sm font-medium text-primary underline">Learn F2L algorithms →</Link><Link to="/algorithms/pll" className="text-sm font-medium text-primary underline">Learn PLL algorithms →</Link><Link to="/guides/what-is-cfop" className="text-sm font-medium text-primary underline">Read the CFOP guide →</Link></div></section>
    </div>
  </div>;
}
