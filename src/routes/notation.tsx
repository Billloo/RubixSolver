import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { CubeMove3D } from "@/components/CubeMove3D";
import { useState } from "react";

export const Route = createFileRoute("/notation")({
  head: () => ({
    meta: [
      { title: "Rubik's Cube Notation – Complete Move Guide | RubikSolver" },
      {
        name: "description",
        content:
          "Learn Rubik's Cube notation with interactive visual guides for R, L, U, D, F, B, prime, and double moves. See which face moves, which direction to turn, and how algorithms are read.",
      },
    ],
  }),
  component: NotationPage,
});

type Move = {
  notation: string;
  face: string;
  direction: "clockwise" | "counterclockwise" | "double";
  description: string;
};

const moves: Move[] = [
  ["R", "Right", "clockwise", "Turn the right face 90° clockwise when looking directly at the right face."],
  ["R'", "Right", "counterclockwise", "Turn the right face 90° counterclockwise when looking directly at the right face."],
  ["R2", "Right", "double", "Turn the right face 180°. A double turn works in either direction."],
  ["L", "Left", "clockwise", "Turn the left face 90° clockwise when looking directly at the left face."],
  ["L'", "Left", "counterclockwise", "Turn the left face 90° counterclockwise when looking directly at the left face."],
  ["L2", "Left", "double", "Turn the left face 180°."],
  ["U", "Up", "clockwise", "Turn the top face 90° clockwise when looking directly at the top face."],
  ["U'", "Up", "counterclockwise", "Turn the top face 90° counterclockwise when looking directly at the top face."],
  ["U2", "Up", "double", "Turn the top face 180°."],
  ["D", "Down", "clockwise", "Turn the bottom face 90° clockwise when looking directly at the bottom face."],
  ["D'", "Down", "counterclockwise", "Turn the bottom face 90° counterclockwise when looking directly at the bottom face."],
  ["D2", "Down", "double", "Turn the bottom face 180°."],
  ["F", "Front", "clockwise", "Turn the front face 90° clockwise when looking directly at the front face."],
  ["F'", "Front", "counterclockwise", "Turn the front face 90° counterclockwise when looking directly at the front face."],
  ["F2", "Front", "double", "Turn the front face 180°."],
  ["B", "Back", "clockwise", "Turn the back face 90° clockwise when looking directly at the back face."],
  ["B'", "Back", "counterclockwise", "Turn the back face 90° counterclockwise when looking directly at the back face."],
  ["B2", "Back", "double", "Turn the back face 180°."],
].map(([notation, face, direction, description]) => ({ notation, face, direction, description })) as Move[];

function CubeDiagram({ move, size = "md" }: { move: Move; size?: "md" | "sm" }) {
  return (
    <div className="relative flex min-h-[230px] items-center justify-center overflow-hidden rounded-2xl border border-border bg-surface-2 p-4">
      <div className="absolute left-4 top-4 rounded-full border border-border bg-background/90 px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
        {move.face} face
      </div>
      <CubeMove3D notation={move.notation} className={size === "sm" ? "scale-90" : ""} />
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-background/90 px-3 py-1 text-xs font-medium shadow-sm">
        {move.direction === "double" ? "180° turn" : move.direction === "clockwise" ? "90° clockwise" : "90° counterclockwise"}
      </div>
    </div>
  );
}

function InteractiveMoveGuide() {
  const [selected, setSelected] = useState<Move>(moves[0]!);

  return (
    <section className="mt-10 overflow-hidden rounded-2xl border border-border bg-surface-2 p-5 sm:p-8">
      <div className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">Interactive move guide</p>
        <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">See exactly which face to turn</h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
          Select a move below. The highlighted face shows which side you are turning, while the arrow shows the direction. For clockwise and counterclockwise moves, imagine you are looking directly at the face being turned.
        </p>
      </div>

      <div className="mt-7 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <CubeDiagram move={selected} />
        <div>
          <div className="rounded-xl border border-border bg-background p-5">
            <div className="flex items-center gap-3">
              <span className="font-display text-3xl font-semibold">{selected.notation}</span>
              <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">{selected.face} face</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{selected.description}</p>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">
            {moves.filter((move) => !move.notation.includes("2") && ["R", "L", "U", "D", "F", "B"].includes(move.notation)).map((move) => (
              <button key={move.notation} type="button" onClick={() => setSelected(move)} className={`rounded-lg border px-3 py-2 text-sm font-semibold transition hover:border-primary hover:bg-primary/5 ${selected.notation === move.notation ? "border-primary bg-primary/10 text-primary" : "border-border bg-background"}`}>
                {move.notation}
              </button>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-6">
            {moves.filter((move) => move.notation.includes("'") || move.notation.includes("2")).map((move) => (
              <button key={move.notation} type="button" onClick={() => setSelected(move)} className={`rounded-lg border px-3 py-2 text-sm font-semibold transition hover:border-primary hover:bg-primary/5 ${selected.notation === move.notation ? "border-primary bg-primary/10 text-primary" : "border-border bg-background"}`}>
                {move.notation}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function NotationPage({ homeHref = "/" }: { homeHref?: string }) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <Link to={homeHref as any} className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground">
        <ArrowLeft className="size-4" /> Home
      </Link>

      <header className="mt-8 max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">Learn the language</p>
        <h1 className="mt-2 text-4xl font-semibold sm:text-5xl">Rubik's Cube Move Notation</h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          Every move in a solution tells you which face to turn and how far. Use these interactive visual guides to learn Rubik's Cube notation, understand move direction, and read solution sequences with confidence.
        </p>
      </header>

      <InteractiveMoveGuide />

      <section className="mt-10 panel p-6 sm:p-8">
        <h2 className="text-2xl font-semibold">What Do the Rubik's Cube Letters Mean?</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
          R = Right, L = Left, U = Up, D = Down, F = Front, and B = Back. The letter tells you which face to turn. The prime symbol (') means turn that face in the opposite direction, while 2 means make a 180° turn.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {moves.map((move) => (
            <article key={move.notation} className="rounded-xl border border-border bg-background/50 p-4">
              <CubeDiagram move={move} size="sm" />
              <div className="mt-5 flex items-center justify-between gap-3">
                <h3 className="font-display text-xl font-semibold">{move.notation}</h3>
                <span className="text-xs font-medium text-muted-foreground">{move.face} face</span>
              </div>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{move.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="panel p-6"><h2 className="font-semibold">What Does R Mean?</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">R means a 90° clockwise turn of the right face, viewed directly from that face.</p></div>
        <div className="panel p-6"><h2 className="font-semibold">What Does R' Mean?</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">R' means a 90° counterclockwise turn of the right face. The prime symbol means reverse the direction.</p></div>
        <div className="panel p-6"><h2 className="font-semibold">What Does R2 Mean?</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">R2 means turn the right face 180°. Direction does not matter for a half turn.</p></div>
      </section>

      <section className="mt-8 panel p-6 sm:p-8">
        <h2 className="text-2xl font-semibold">What Does R U R' U' Mean?</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
          R U R' U' is a common four-move sequence. Read it from left to right: turn the right face, then the top face, reverse the right face, and reverse the top face. You will see sequences like this in beginner methods and speedcubing algorithms.
        </p>
        <Link to="/solver/$puzzle" params={{ puzzle: "3x3" }} className="mt-5 inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Try the 3x3 solver</Link>
      </section>
    </div>
  );
}
