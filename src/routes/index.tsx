import { createFileRoute, Link } from "@tanstack/react-router";
import { Boxes, Gauge, MousePointerClick, Route as RouteIcon } from "lucide-react";

import { CubeNet } from "@/components/CubeNet";
import { Button } from "@/components/ui/button";
import { applyAlg, solvedState } from "@/lib/cube/model";
import { PUZZLES } from "@/lib/cube/puzzles";

const title = "Cubelab — Rubik's Cube Solver for 2x2 and 3x3";
const description =
  "Enter the colors of your cube and get a clean, step-by-step solution. Optimal 2x2 solving and 20-move 3x3 solving.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Index,
});

const PREVIEW = applyAlg(solvedState(3), "R U R' U' F2 L D' B R2 U");

function Index() {
  return (
    <div>
      <section className="hero-glow">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:py-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs uppercase tracking-[0.18em] text-primary">
              <Boxes className="size-3.5" /> Cube solving studio
            </span>
            <h1 className="mt-6 text-5xl font-semibold leading-[1.05] sm:text-6xl">
              Type in your colors.
              <br />
              <span className="text-primary">Get the turns.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">
              RubixSolver reads the exact state of your scrambled cube and hands back the shortest
              sequence of moves!
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link to="/solver/$puzzle" params={{ puzzle: "3x3" }}>
                  Solve a 3x3
                </Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link to="/solver/$puzzle" params={{ puzzle: "2x2" }}>
                  Solve a 2x2
                </Link>
              </Button>
            </div>
          </div>
          <div className="panel flex justify-center overflow-x-auto p-6">
            <CubeNet state={PREVIEW} />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-6 sm:px-6">
        <h2 className="text-2xl font-semibold">Pick your puzzle</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {PUZZLES.filter((p) => p.slug === "2x2" || p.slug === "3x3").map((p) => (
            <Link
              key={p.slug}
              to="/solver/$puzzle"
              params={{ puzzle: p.slug }}
              className="panel group flex flex-col gap-3 p-5 transition hover:-translate-y-1 hover:border-primary"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-3xl font-semibold">{p.slug}</span>
                <span className="rounded-full bg-primary/15 px-2.5 py-1 text-xs text-primary">
                  Auto solver
                </span>
              </div>
              <div>
                <p className="font-medium">{p.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>
              </div>
              <p className="mt-auto pt-2 text-xs uppercase tracking-wider text-muted-foreground">
                {p.pieces}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="text-2xl font-semibold">Three steps, start to finish</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            {
              icon: MousePointerClick,
              title: "Enter the colors",
              body: "Click stickers on the flat map of your cube. Centers stay locked so the orientation always matches the instructions.",
            },
            {
              icon: Gauge,
              title: "Let the engine search",
              body: "A full breadth-first search for the 2x2 and Kociemba's two-phase algorithm for the 3x3 — running in your browser, nothing uploaded.",
            },
            {
              icon: RouteIcon,
              title: "Turn along",
              body: "Step through the solution move by move with a plain-English description and a live diagram of the cube after every turn.",
            },
          ].map((f) => (
            <div key={f.title} className="panel p-6">
              <f.icon className="size-5 text-primary" />
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
