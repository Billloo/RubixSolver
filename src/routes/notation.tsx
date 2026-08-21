import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, RotateCw } from "lucide-react";

export const Route = createFileRoute("/notation")({
  head: () => ({
    meta: [
      { title: "Rubik's Cube Notation — RubixSolver" },
      {
        name: "description",
        content: "Learn Rubik's Cube move notation with clear visual diagrams for every basic face turn, prime turn, and double turn.",
      },
    ],
  }),
  component: NotationPage,
});

const moves = [
  { move: "R", face: "Right", description: "Turn the right face clockwise when looking directly at the right face." },
  { move: "R'", face: "Right inverse", description: "Turn the right face counterclockwise when looking directly at the right face." },
  { move: "R2", face: "Right double", description: "Turn the right face 180 degrees." },
  { move: "L", face: "Left", description: "Turn the left face clockwise when looking directly at the left face." },
  { move: "L'", face: "Left inverse", description: "Turn the left face counterclockwise when looking directly at the left face." },
  { move: "L2", face: "Left double", description: "Turn the left face 180 degrees." },
  { move: "U", face: "Up", description: "Turn the top face clockwise when looking directly at the top face." },
  { move: "U'", face: "Up inverse", description: "Turn the top face counterclockwise when looking directly at the top face." },
  { move: "U2", face: "Up double", description: "Turn the top face 180 degrees." },
  { move: "D", face: "Down", description: "Turn the bottom face clockwise when looking directly at the bottom face." },
  { move: "D'", face: "Down inverse", description: "Turn the bottom face counterclockwise when looking directly at the bottom face." },
  { move: "D2", face: "Down double", description: "Turn the bottom face 180 degrees." },
  { move: "F", face: "Front", description: "Turn the front face clockwise when looking directly at the front face." },
  { move: "F'", face: "Front inverse", description: "Turn the front face counterclockwise when looking directly at the front face." },
  { move: "F2", face: "Front double", description: "Turn the front face 180 degrees." },
  { move: "B", face: "Back", description: "Turn the back face clockwise when looking directly at the back face." },
  { move: "B'", face: "Back inverse", description: "Turn the back face counterclockwise when looking directly at the back face." },
  { move: "B2", face: "Back double", description: "Turn the back face 180 degrees." },
];

function MoveDiagram({ move }: { move: string }) {
  const prime = move.includes("'");
  const double = move.includes("2");
  const angle = double ? 180 : prime ? -90 : 90;
  return (
    <div className="flex h-44 items-center justify-center rounded-xl border border-border bg-surface-2">
      <div className="relative">
        <div className="grid grid-cols-3 gap-1 rounded-lg border-2 border-border bg-background p-2 shadow-sm">
          {Array.from({ length: 9 }).map((_, i) => (
            <span key={i} className="size-7 rounded border border-border bg-cube-r sm:size-8" />
          ))}
        </div>
        <div
          className="absolute -right-14 top-1/2 -translate-y-1/2 text-primary transition-transform"
          style={{ transform: `translateY(-50%) rotate(${angle}deg)` }}
        >
          <RotateCw className="size-10" />
        </div>
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-display text-xl font-semibold text-foreground">
          {move}
        </div>
      </div>
    </div>
  );
}

function NotationPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground">
        <ArrowLeft className="size-4" /> Home
      </Link>

      <header className="mt-8 max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">Learn the language</p>
        <h1 className="mt-2 text-4xl font-semibold sm:text-5xl">Rubik's Cube Move Notation</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Every move in a solution tells you which face to turn and how far. Use the visual guides below to learn the notation used by RubixSolver.
        </p>
      </header>

      <section className="mt-10 panel p-6 sm:p-8">
        <h2 className="text-2xl font-semibold">The six basic faces</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          The letter tells you which face to turn: <strong className="text-foreground">R</strong> Right, <strong className="text-foreground">L</strong> Left, <strong className="text-foreground">U</strong> Up, <strong className="text-foreground">D</strong> Down, <strong className="text-foreground">F</strong> Front, and <strong className="text-foreground">B</strong> Back.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {moves.map((item) => (
            <article key={item.move} className="rounded-xl border border-border bg-background/50 p-4">
              <MoveDiagram move={item.move} />
              <h3 className="mt-5 font-semibold">{item.face}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="panel p-6">
          <h2 className="font-semibold">No symbol = clockwise</h2>
          <p className="mt-2 text-sm text-muted-foreground">R means a 90° clockwise turn of the right face, viewed directly from that face.</p>
        </div>
        <div className="panel p-6">
          <h2 className="font-semibold">' = counterclockwise</h2>
          <p className="mt-2 text-sm text-muted-foreground">R' means a 90° counterclockwise turn of the right face.</p>
        </div>
        <div className="panel p-6">
          <h2 className="font-semibold">2 = half turn</h2>
          <p className="mt-2 text-sm text-muted-foreground">R2 means turn the right face 180°. Direction does not matter for a half turn.</p>
        </div>
      </section>

      <section className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-6">
        <h2 className="font-semibold">How to read a solution</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A sequence such as <span className="font-mono text-foreground">R U R' U'</span> means perform each move from left to right. Keep the same cube orientation unless the instructions specifically tell you to reorient it.
        </p>
      </section>
    </div>
  );
}
