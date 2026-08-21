import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, RotateCcw, RotateCw } from "lucide-react";

export const Route = createFileRoute("/notation")({
  head: () => ({
    meta: [
      { title: "Rubik's Cube Notation — RubixSolver" },
      { name: "description", content: "Learn Rubik's Cube move notation with clear visual diagrams for every basic face turn, prime turn, and double turn." },
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

type Face = "R" | "L" | "U" | "D" | "F" | "B";

const faceTransforms: Record<Face, string> = {
  F: "translateZ(60px)",
  B: "rotateY(180deg) translateZ(60px)",
  R: "rotateY(90deg) translateZ(60px)",
  L: "rotateY(-90deg) translateZ(60px)",
  U: "rotateX(90deg) translateZ(60px)",
  D: "rotateX(-90deg) translateZ(60px)",
};

const faceNames: Record<Face, string> = { R: "R", L: "L", U: "U", D: "D", F: "F", B: "B" };
const faceLabels: Record<Face, string> = { R: "RIGHT", L: "LEFT", U: "TOP", D: "BOTTOM", F: "FRONT", B: "BACK" };

function CubeFace({ face, highlighted }: { face: Face; highlighted: boolean }) {
  return (
    <div
      className={`absolute left-1/2 top-1/2 grid h-[126px] w-[126px] -translate-x-1/2 -translate-y-1/2 grid-cols-3 gap-1 rounded-lg border-2 p-1.5 ${highlighted ? "border-primary bg-primary/20 shadow-[0_0_28px_hsl(var(--primary)/0.45)]" : "border-border bg-muted/80"}`}
      style={{ transform: `translate(-50%, -50%) ${faceTransforms[face]}` }}
    >
      {Array.from({ length: 9 }).map((_, i) => (
        <span key={i} className={`rounded-sm border ${highlighted ? "border-primary/70 bg-primary/70" : "border-border bg-background/80"}`} />
      ))}
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center font-display text-2xl font-bold text-foreground/80">{faceNames[face]}</span>
    </div>
  );
}

function MoveArrow({ face, prime, double }: { face: Face; prime: boolean; double: boolean }) {
  // The arrow is intentionally drawn over the cube rather than in the corner so viewers
  // can immediately associate its direction with the highlighted face.
  const rotation: Record<Face, number> = { F: 0, B: 180, R: 90, L: -90, U: 0, D: 180 };
  const base = prime ? -1 : 1;
  const turns = double ? 2 : 1;
  const arrowRotation = rotation[face] + (base * turns * 90);

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div className="relative h-[170px] w-[170px]" style={{ transform: `rotate(${rotation[face]}deg)` }}>
        <svg viewBox="0 0 180 180" className="absolute inset-0 h-full w-full overflow-visible drop-shadow-md" aria-hidden="true">
          <defs>
            <marker id={`arrow-${face}-${prime}-${double}`} markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
              <path d="M0,0 L9,4.5 L0,9 Z" fill="currentColor" />
            </marker>
          </defs>
          <path
            d={double ? "M 90 18 A 72 72 0 1 1 90 162" : "M 90 18 A 72 72 0 0 1 145 45"}
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            markerEnd={`url(#arrow-${face}-${prime}-${double})`}
            className={`text-primary ${prime ? "[transform:scaleX(-1)] [transform-origin:center]" : ""}`}
          />
        </svg>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/30 bg-background/90 p-2 text-primary shadow-lg">
          {double ? <RotateCw className="size-6" /> : prime ? <RotateCcw className="size-6" /> : <RotateCw className="size-6" />}
        </div>
      </div>
    </div>
  );
}

function MoveDiagram({ move }: { move: string }) {
  const face = move[0] as Face;
  const prime = move.includes("'");
  const double = move.includes("2");

  return (
    <div className="relative h-[310px] overflow-hidden rounded-xl border border-border bg-gradient-to-br from-background via-surface-2 to-muted [perspective:1000px]">
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d]">
        <div className="relative h-[126px] w-[126px] [transform-style:preserve-3d]" style={{ transform: "rotateX(-24deg) rotateY(-38deg)" }}>
          {(["F", "B", "R", "L", "U", "D"] as Face[]).map((cubeFace) => (
            <CubeFace key={cubeFace} face={cubeFace} highlighted={cubeFace === face} />
          ))}
        </div>
      </div>

      <MoveArrow face={face} prime={prime} double={double} />

      <div className="absolute left-3 top-3 z-20 rounded-md border border-border bg-background/95 px-2.5 py-1 text-xs font-semibold tracking-wider text-muted-foreground">
        TURN THE <span className="text-primary">{faceLabels[face]}</span> FACE
      </div>

      <div className="absolute bottom-3 left-1/2 z-20 -translate-x-1/2 rounded-full border border-border bg-background/95 px-5 py-1.5 font-display text-xl font-semibold shadow-md">
        {move}
      </div>
    </div>
  );
}

function NotationPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"><ArrowLeft className="size-4" /> Home</Link>
      <header className="mt-8 max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">Learn the language</p>
        <h1 className="mt-2 text-4xl font-semibold sm:text-5xl">Rubik's Cube Move Notation</h1>
        <p className="mt-4 text-lg text-muted-foreground">Every move tells you which face to turn and how far. The cube is centered in every diagram, the turned face is highlighted, and the curved arrow shows the direction of the move.</p>
      </header>

      <section className="mt-10 panel p-6 sm:p-8">
        <h2 className="text-2xl font-semibold">The six basic faces</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">The letter tells you which face to turn: <strong className="text-foreground">R</strong> Right, <strong className="text-foreground">L</strong> Left, <strong className="text-foreground">U</strong> Up, <strong className="text-foreground">D</strong> Down, <strong className="text-foreground">F</strong> Front, and <strong className="text-foreground">B</strong> Back. The highlighted face is the face you actually turn.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{moves.map((item) => <article key={item.move} className="rounded-xl border border-border bg-background/50 p-4"><MoveDiagram move={item.move} /><h3 className="mt-5 font-semibold">{item.face}</h3><p className="mt-1 text-sm text-muted-foreground">{item.description}</p></article>)}</div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="panel p-6"><h2 className="font-semibold">No symbol = clockwise</h2><p className="mt-2 text-sm text-muted-foreground">R means a 90° clockwise turn of the right face, viewed directly from that face.</p></div>
        <div className="panel p-6"><h2 className="font-semibold">' = counterclockwise</h2><p className="mt-2 text-sm text-muted-foreground">R' means a 90° counterclockwise turn of the right face.</p></div>
        <div className="panel p-6"><h2 className="font-semibold">2 = half turn</h2><p className="mt-2 text-sm text-muted-foreground">R2 means turn the right face 180°. Direction does not matter for a half turn.</p></div>
      </section>

      <section className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-6"><h2 className="font-semibold">How to read a solution</h2><p className="mt-2 text-sm text-muted-foreground">A sequence such as <span className="font-mono text-foreground">R U R' U'</span> means perform each move from left to right. Keep the same cube orientation unless the instructions specifically tell you to reorient it.</p></section>
    </div>
  );
}
