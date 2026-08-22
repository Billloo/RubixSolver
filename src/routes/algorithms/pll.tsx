import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/algorithms/pll")({
  head: () => ({ meta: [
    { title: "PLL Algorithms – All 21 PLL Cases | RubikSolver" },
    { name: "description", content: "Learn PLL algorithms for the 3x3 Rubik's Cube: 2-look PLL, all 21 full PLL cases grouped by type, recognition tips, and CFOP practice advice." },
    { name: "keywords", content: "PLL algorithms, PLL Rubik's Cube, PLL guide, permutation of last layer, 2-look PLL, full PLL, 21 PLL cases, 3x3 PLL, CFOP algorithms" },
    { property: "og:title", content: "PLL Algorithms – All 21 PLL Cases" },
    { property: "og:description", content: "2-look PLL plus the complete 21-case full PLL algorithm set with recognition tips." },
    { property: "og:type", content: "article" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: PLLPage,
});

const twoLook: Array<[string, string, string]> = [
  ["Corners: adjacent swap", "R U R' U' R' F R2 U' R' U' R U R' F'", "T perm. Swaps two adjacent corners (and two edges, which the edge step then fixes)."],
  ["Corners: diagonal swap", "F R U' R' U' R U R' F' R U R' U' R' F R F'", "Y perm. Use it when the two corners to swap sit on a diagonal."],
  ["Edges: clockwise 3-cycle", "R2 U R U R' U' R' U' R' U R'", "Ub perm."],
  ["Edges: counter-clockwise 3-cycle", "R U' R U R U R U' R' U' R2", "Ua perm."],
  ["Edges: opposite swap", "M2 U M2 U2 M2 U M2", "H perm — all four edges swap in pairs."],
  ["Edges: adjacent swap", "M2 U M U2 M' U M2", "Z perm."],
];

const groups: Array<[string, string, Array<[string, string]>]> = [
  ["Edge permutations", "Corners are already solved; only edges cycle.", [
    ["Ua perm", "R U' R U R U R U' R' U' R2"],
    ["Ub perm", "R2 U R U R' U' R' U' R' U R'"],
    ["H perm", "M2 U M2 U2 M2 U M2"],
    ["Z perm", "M' U M2 U M2 U M' U2 M2"],
  ]],
  ["Corner permutations", "Edges are solved; only corners cycle.", [
    ["Aa perm", "x L2 D2 L' U' L D2 L' U L' x'"],
    ["Ab perm", "x L2 D2 L U L' D2 L U' L x'"],
    ["E perm", "x' L' U L D' L' U' L D L' U' L D' L' U L D x"],
  ]],
  ["Adjacent-corner swap cases", "Two adjacent corners swap along with an edge cycle.", [
    ["T perm", "R U R' U' R' F R2 U' R' U' R U R' F'"],
    ["Ja perm", "x R2 F R F' R U2 r' U r U2 x'"],
    ["Jb perm", "R U R' F' R U R' U' R' F R2 U' R' U'"],
    ["Ra perm", "R U' R' U' R U R D R' U' R D' R' U2 R' U'"],
    ["Rb perm", "R2 F R U R U' R' F' R U2 R' U2 R"],
    ["F perm", "R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R"],
  ]],
  ["Diagonal-corner swap cases", "Two diagonally opposite corners swap.", [
    ["Y perm", "F R U' R' U' R U R' F' R U R' U' R' F R F'"],
    ["V perm", "R' U R' U' y R' F' R2 U' R' U R' F R F"],
    ["Na perm", "R U R' U R U R' F' R U R' U' R' F R2 U' R' U2 R U' R'"],
    ["Nb perm", "R' U R U' R' F' U' F R U R' F R' F' R U' R"],
  ]],
  ["G perms", "A corner 3-cycle combined with an edge 3-cycle. The four hardest to recognize.", [
    ["Ga perm", "R2 U R' U R' U' R U' R2 U' D R' U R D'"],
    ["Gb perm", "R' U' R U D' R2 U R' U R U' R U' R2 D"],
    ["Gc perm", "R2 U' R U' R U R' U R2 U D' R U' R' D"],
    ["Gd perm", "R U R' U' D R2 U' R U' R' U R' U R2 D'"],
  ]],
];

function PLLPage() {
  return <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
    <Link to="/algorithms" className="text-sm text-muted-foreground hover:text-foreground">← Algorithms</Link>
    <header className="mt-8"><p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">CFOP • PLL</p><h1 className="mt-2 text-4xl font-semibold sm:text-5xl">PLL Algorithms</h1><p className="mt-4 text-lg leading-8 text-muted-foreground">PLL (Permutation of the Last Layer) is the final stage of CFOP. Start with the six 2-look algorithms, then work through all 21 full PLL cases grouped below by permutation type.</p></header>
    <div className="mt-10 space-y-5">
      <section className="panel p-6 sm:p-8"><h2 className="text-2xl font-semibold">What is PLL?</h2><p className="mt-3 leading-7 text-muted-foreground">After OLL orients the last layer, PLL moves the corners and edges into their correct positions. Full PLL finishes the cube in one algorithm and contains exactly 21 cases.</p></section>
      <section className="panel p-6 sm:p-8"><h2 className="text-2xl font-semibold">2-look PLL (six algorithms)</h2><p className="mt-3 leading-7 text-muted-foreground">Permute the corners first, then the edges. This covers every case with a fraction of the memorization.</p><div className="mt-5 space-y-4">{twoLook.map(([name, moves, note]) => <div key={name} className="rounded-xl border border-border p-5"><h3 className="font-semibold">{name}</h3><code className="mt-3 block rounded-lg bg-muted px-4 py-3 font-mono text-sm">{moves}</code><p className="mt-3 text-sm leading-6 text-muted-foreground">{note}</p></div>)}</div></section>
      {groups.map(([title, intro, list]) => <section key={title} className="panel p-6 sm:p-8"><h2 className="text-2xl font-semibold">{title}</h2><p className="mt-3 leading-7 text-muted-foreground">{intro}</p><ul className="mt-5 space-y-3">{list.map(([name, alg]) => <li key={name} className="rounded-xl border border-border p-4"><p className="text-sm font-medium">{name}</p><code className="mt-2 block rounded-lg bg-muted px-3 py-2 font-mono text-sm">{alg}</code></li>)}</ul></section>)}
      <section className="panel p-6 sm:p-8"><h2 className="text-2xl font-semibold">Recognition and practice tips</h2><ul className="mt-4 list-disc space-y-3 pl-5 leading-7 text-muted-foreground"><li>Recognize by headlights and side-block patterns before you turn.</li><li>Learn one algorithm per case from a consistent angle and grip.</li><li>Accuracy first, then speed — a misexecuted PLL costs more than a slow one.</li><li>Drill AUF separately so recognition doesn't stall your solve.</li><li>Learn the four G perms last; they are the hardest to recognize.</li></ul></section>
      <section className="panel p-6 sm:p-8"><h2 className="text-2xl font-semibold">How PLL fits into CFOP</h2><p className="mt-3 leading-7 text-muted-foreground">CFOP follows Cross → F2L → OLL → PLL. F2L builds the first two layers, OLL orients the last layer, and PLL finishes the cube.</p><div className="mt-5 flex flex-wrap gap-4"><Link to="/algorithms/f2l" className="text-sm font-medium text-primary underline">Learn F2L algorithms →</Link><Link to="/algorithms/oll" className="text-sm font-medium text-primary underline">Learn OLL algorithms →</Link><Link to="/timer" className="text-sm font-medium text-primary underline">Practice with the timer →</Link></div></section>
    </div>
  </div>;
}
