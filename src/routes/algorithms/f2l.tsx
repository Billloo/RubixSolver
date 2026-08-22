import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/algorithms/f2l")({
  head: () => ({ meta: [
    { title: "F2L Algorithms – Complete First Two Layers Guide | RubikSolver" },
    { name: "description", content: "Learn F2L algorithms for the 3x3 Rubik's Cube. This First Two Layers guide explains F2L pairs, cases, intuitive solving, common algorithms, recognition, and CFOP practice." },
    { name: "keywords", content: "F2L algorithms, F2L Rubik's Cube, F2L guide, first two layers, F2L cases, 3x3 F2L, CFOP F2L, beginner F2L, Rubik's Cube algorithms" },
    { property: "og:title", content: "F2L Algorithms – Complete First Two Layers Guide" },
    { property: "og:description", content: "F2L pairs, recognition, and a full list of practical First Two Layers algorithms for CFOP." },
    { property: "og:type", content: "article" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: F2LPage,
});

const triggers = [
  ["Right-side insertion", "R U R'", "The fundamental right-slot insert. Almost every F2L case ends with some version of this."],
  ["Left-side insertion", "L' U' L", "The mirror insert for the left slot. Learn both so you never rotate the cube."],
  ["Pair-building trigger", "U R U' R'", "Opens a slot, pairs the corner and edge, and prepares the insert."],
  ["Sledgehammer", "R' F R F'", "Used to fix awkward pairs where the edge is flipped in the slot."],
] as const;

const cases: Array<[string, Array<[string, string]>]> = [
  ["Corner and edge both in the top layer — already paired", [
    ["Pair on the right, white on side", "U R U' R'"],
    ["Pair on the left, white on side", "U' L' U L"],
    ["Pair connected, insert from the back", "U' R U R'"],
    ["Pair connected, mirror insert", "U L' U' L"],
  ]],
  ["Corner and edge in the top layer — not yet paired", [
    ["Corner white on top, edge opposite", "U R U2 R' U R U' R'"],
    ["Corner white on top, edge adjacent", "U' L' U2 L U' L' U L"],
    ["Split pair, right slot", "R U' R' U2 R U' R'"],
    ["Split pair, left slot", "L' U L U2 L' U L"],
    ["Corner facing you, edge behind", "U' R U2 R' U R U' R'"],
    ["Corner facing left, edge behind", "U L' U2 L U' L' U L"],
  ]],
  ["Corner in the slot, edge in the top layer", [
    ["Corner solved, edge needs inserting", "R U' R' U R U' R'"],
    ["Corner twisted clockwise", "R U R' U' R U R' U' R U R'"],
    ["Corner twisted counter-clockwise", "R U' R' U R U2 R' U R U' R'"],
    ["Mirror on the left slot", "L' U L U' L' U L"],
  ]],
  ["Edge in the slot, corner in the top layer", [
    ["Edge flipped in slot, corner on top", "R U' R' U' R U R' U2 R U' R'"],
    ["Edge correct in slot, corner on top", "U R U' R' U' R U R'"],
    ["Mirror version", "U' L' U L U L' U' L"],
  ]],
  ["Both pieces stuck in the slot", [
    ["Pair inserted the wrong way round", "R U' R' U R U' R' — then re-solve as a top-layer case"],
    ["Corner and edge swapped", "R U R' U' R U R' U' — extract, then pair on top"],
    ["Left-slot extraction", "L' U L U' L' U L U'"],
  ]],
];

function F2LPage() {
  return <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
    <Link to="/algorithms" className="text-sm text-muted-foreground hover:text-foreground">← Algorithms</Link>
    <header className="mt-8"><p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">CFOP • F2L</p><h1 className="mt-2 text-4xl font-semibold sm:text-5xl">F2L Algorithms</h1><p className="mt-4 text-lg leading-8 text-muted-foreground">Learn F2L (First Two Layers), the second stage of the CFOP method. This guide covers how pairs work, how to recognize each family of cases, and a practical algorithm set you can drill today.</p></header>
    <div className="mt-10 space-y-5">
      <section className="panel p-6 sm:p-8"><h2 className="text-2xl font-semibold">What is F2L?</h2><p className="mt-3 leading-7 text-muted-foreground">F2L stands for First Two Layers. Instead of solving a first-layer corner and its second-layer edge separately, F2L pairs those two pieces and inserts them into the slot together. There are 41 recognized F2L cases, but they all reduce to a handful of ideas: build the pair in the top layer, then insert it without breaking the cross.</p></section>
      <section className="panel p-6 sm:p-8"><h2 className="text-2xl font-semibold">How to solve F2L step by step</h2><ol className="mt-4 list-decimal space-y-3 pl-5 leading-7 text-muted-foreground"><li>Solve the cross on the bottom.</li><li>Find an unsolved corner and its matching edge.</li><li>Bring both pieces to the top layer if either is trapped in a slot.</li><li>Pair the corner and edge using a trigger.</li><li>Insert the pair into its slot.</li><li>Repeat for all four slots before moving to OLL.</li></ol></section>
      <section className="panel p-6 sm:p-8"><h2 className="text-2xl font-semibold">Core triggers</h2><p className="mt-3 leading-7 text-muted-foreground">Every F2L algorithm below is built from these four building blocks.</p><div className="mt-6 space-y-4">{triggers.map(([name, moves, explanation]) => <div key={name} className="rounded-xl border border-border p-5"><h3 className="font-semibold">{name}</h3><code className="mt-3 block rounded-lg bg-muted px-4 py-3 font-mono text-sm">{moves}</code><p className="mt-3 text-sm leading-6 text-muted-foreground">{explanation}</p></div>)}</div></section>
      {cases.map(([group, list]) => <section key={group} className="panel p-6 sm:p-8"><h2 className="text-2xl font-semibold">{group}</h2><ul className="mt-5 space-y-3">{list.map(([label, alg]) => <li key={label} className="rounded-xl border border-border p-4"><p className="text-sm font-medium">{label}</p><code className="mt-2 block rounded-lg bg-muted px-3 py-2 font-mono text-sm">{alg}</code></li>)}</ul></section>)}
      <section className="panel p-6 sm:p-8"><h2 className="text-2xl font-semibold">Intuitive F2L vs. memorized algorithms</h2><p className="mt-3 leading-7 text-muted-foreground">Start intuitively so you understand how pairs form. Memorize algorithms only for the cases you consistently solve slowly. Advanced cubers learn all 41 cases and then focus on lookahead, rotationless solutions, and slot order.</p></section>
      <section className="panel p-6 sm:p-8"><h2 className="text-2xl font-semibold">Recognition and practice tips</h2><ul className="mt-4 list-disc space-y-3 pl-5 leading-7 text-muted-foreground"><li>Identify the corner and its matching edge before you turn.</li><li>Drill one case repeatedly until recognition is instant.</li><li>Turn slowly to build lookahead instead of chasing TPS.</li><li>Minimize cube rotations — use the left-hand mirrors.</li><li>Practice full solves so F2L flows into OLL and PLL.</li></ul></section>
      <section className="panel p-6 sm:p-8"><h2 className="text-2xl font-semibold">What comes after F2L?</h2><p className="mt-3 leading-7 text-muted-foreground">Once the first two layers are done, CFOP continues with OLL (orientation) and then PLL (permutation).</p><div className="mt-5 flex flex-wrap gap-4"><Link to="/algorithms/oll" className="text-sm font-medium text-primary underline">Learn OLL algorithms →</Link><Link to="/algorithms/pll" className="text-sm font-medium text-primary underline">Learn PLL algorithms →</Link><Link to="/guides/what-is-cfop" className="text-sm font-medium text-primary underline">Read the CFOP guide →</Link></div></section>
    </div>
  </div>;
}
