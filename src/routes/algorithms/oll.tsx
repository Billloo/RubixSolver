import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/algorithms/oll")({
  head: () => ({ meta: [
    { title: "OLL Algorithms – Rubik's Cube Last Layer Guide | RubikSolver" },
    { name: "description", content: "Learn OLL algorithms for the last layer of a 3x3 Rubik's Cube. Understand orientation, the OLL step in CFOP, and how to practice cases." },
  ] }),
  component: OLLPage,
});

const cases = [
  ["Orient the last layer", "OLL stands for Orientation of the Last Layer. The goal is to make every sticker on the last layer face the same direction before the final permutation step."],
  ["Start with 2-look OLL", "Beginners can split OLL into two stages: first make the yellow cross, then orient the remaining yellow corners. This is much easier to learn than memorizing every case at once."],
  ["Learn full OLL later", "Full OLL contains 57 cases. Once your F2L is comfortable, learning OLL cases can reduce your solve time and make your CFOP solves more consistent."],
] as const;

function OLLPage() {
  return <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
    <Link to="/algorithms" className="text-sm text-muted-foreground hover:text-foreground">← Algorithms</Link>
    <header className="mt-8">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">CFOP • OLL</p>
      <h1 className="mt-2 text-4xl font-semibold sm:text-5xl">OLL Algorithms</h1>
      <p className="mt-4 text-lg text-muted-foreground">Learn how OLL, or Orientation of the Last Layer, fits into CFOP and how to progress from beginner 2-look OLL to full OLL.</p>
    </header>
    <div className="mt-10 space-y-5">{cases.map(([title, body]) => <section key={title} className="panel p-6"><h2 className="text-2xl font-semibold">{title}</h2><p className="mt-3 leading-7 text-muted-foreground">{body}</p></section>)}</div>
    <section className="mt-8 panel p-6 sm:p-8">
      <h2 className="text-2xl font-semibold">OLL practice tips</h2>
      <ul className="mt-4 list-disc space-y-3 pl-5 text-muted-foreground"><li>Learn the visual pattern before memorizing the moves.</li><li>Practice recognition separately from execution.</li><li>Use a consistent grip and turn direction.</li><li>Keep F2L efficient so OLL is part of a complete CFOP solve.</li></ul>
      <div className="mt-6 flex flex-wrap gap-4"><Link to="/algorithms/f2l" className="text-sm font-medium text-primary underline">Learn F2L →</Link><Link to="/algorithms/pll" className="text-sm font-medium text-primary underline">Learn PLL →</Link><Link to="/guides/what-is-cfop" className="text-sm font-medium text-primary underline">Read the CFOP guide →</Link></div>
    </section>
  </div>;
}
