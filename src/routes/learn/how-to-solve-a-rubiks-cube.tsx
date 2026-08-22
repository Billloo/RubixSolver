import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/learn/how-to-solve-a-rubiks-cube")({
  head: () => ({ meta: [{ title: "How to Solve a Rubik's Cube – Beginner 3x3 Guide | RubikSolver" }, { name: "description", content: "Learn how to solve a 3x3 Rubik's Cube with a beginner-friendly layer-by-layer method, cube notation, algorithms, and step-by-step instructions." }] }),
  component: GuidePage,
});

const steps = [
  ["1. Understand cube notation", "Before learning algorithms, learn the six face letters: R, L, U, D, F, and B. A prime mark means turn the face counterclockwise, while 2 means a half turn.", "/notation"],
  ["2. Make the white cross", "Build a white cross on the first layer and match each cross edge with the center color on the side face. The goal is not just a white cross: the side colors should line up with their centers.", null],
  ["3. Solve the white corners", "Place each white corner underneath its correct location, then use simple right-hand or left-hand insertions to move it into the first layer without breaking the cross.", null],
  ["4. Solve the second layer", "Find an edge that belongs in the middle layer. Use a left or right insertion algorithm to move it from the top layer into its matching slot.", null],
  ["5. Make the yellow cross", "Work on the last layer by forming a yellow cross. Depending on the pattern you see, repeat the appropriate orientation algorithm until the four yellow edge stickers form a cross.", null],
  ["6. Solve the yellow edges", "Turn the top layer until as many side colors as possible match their centers, then use a last-layer edge algorithm to cycle the remaining edges into position.", null],
  ["7. Position the yellow corners", "Move the last-layer corners into their correct locations even if their yellow stickers are not facing upward yet. Focus on whether the three colors of each corner belong in that location.", null],
  ["8. Orient the yellow corners", "Finally, twist each incorrectly oriented corner in place. The cube may look temporarily scrambled while you work, but it will return to solved once every corner is oriented.", null],
] as const;

function GuidePage() {
  return <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14"><Link to="/" className="text-sm text-muted-foreground hover:text-foreground">← Home</Link><header className="mt-8"><p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">Beginner guide</p><h1 className="mt-2 text-4xl font-semibold sm:text-5xl">How to Solve a Rubik's Cube</h1><p className="mt-4 text-lg text-muted-foreground">Learn the beginner layer-by-layer method for solving a standard 3×3 Rubik's Cube. Follow the eight stages below, and use RubikSolver when you want help with a specific scrambled cube.</p></header><div className="mt-8 rounded-2xl border border-primary/20 bg-primary/10 p-5"><p className="font-semibold">Have a scrambled cube in front of you?</p><p className="mt-1 text-sm text-muted-foreground">Use the interactive <Link className="text-primary underline" to="/solver/$puzzle" params={{ puzzle: "3x3" }}>3x3 Rubik's Cube Solver</Link> to enter your colors and get a personalized step-by-step solution.</p></div><main className="mt-10 space-y-5">{steps.map(([title, body, link]) => <section key={title} className="panel p-6 sm:p-7"><h2 className="text-2xl font-semibold">{title}</h2><p className="mt-3 leading-7 text-muted-foreground">{body}</p>{link && <Link to={link as any} className="mt-4 inline-flex text-sm font-medium text-primary underline">Learn Rubik's Cube notation →</Link>}</section>)}</main><section className="mt-10 panel p-6 sm:p-8"><h2 className="text-2xl font-semibold">Practice with a Rubik's Cube Timer</h2><p className="mt-2 text-muted-foreground">Once you can solve consistently, practice with scrambles and track your average, best, worst, and Ao5 times using the free <Link className="text-primary underline" to="/timer">Rubik's Cube Timer</Link>.</p></section></div>;
}
