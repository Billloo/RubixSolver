import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Loader2,
  RotateCcw,
  Shuffle,
  Sparkles,
  Wand2,
} from "lucide-react";

import { CubeNet } from "@/components/CubeNet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  COLOR_NAME,
  applyAlg,
  cloneState,
  isSolved,
  randomScramble,
  solvedState,
  stateSize,
  validateColorCounts,
  type ColorId,
  type CubeState,
} from "@/lib/cube/model";
import { describeMove } from "@/lib/cube/notation";
import { getPuzzle, PUZZLES } from "@/lib/cube/puzzles";
import { GUIDES } from "@/lib/cube/guides";
import { useSolver } from "@/lib/cube/useSolver";

const AVAILABLE_PUZZLES = PUZZLES.filter((p) => p.slug === "2x2" || p.slug === "3x3");

export const Route = createFileRoute("/solver/$puzzle")({
  loader: ({ params }) => {
    if (params.puzzle !== "2x2" && params.puzzle !== "3x3") throw notFound();
    const puzzle = getPuzzle(params.puzzle);
    if (!puzzle) throw notFound();
    return { puzzle };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Unavailable — RubixSolver" }, { name: "robots", content: "noindex" }],
      };
    }
    const { puzzle } = loaderData;
    const title = `${puzzle.slug} Cube Solver — RubixSolver`;
    const description = `Enter the colors of your ${puzzle.slug} cube and get clear step-by-step turning instructions to solve it.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: SolverPage,
});

const PALETTE: ColorId[] = ["w", "y", "r", "o", "g", "b"];
const SWATCH: Record<ColorId, string> = {
  w: "bg-cube-w",
  y: "bg-cube-y",
  r: "bg-cube-r",
  o: "bg-cube-o",
  g: "bg-cube-g",
  b: "bg-cube-b",
};

function SolverPage() {
  const { puzzle } = Route.useLoaderData();
  const n = puzzle.size;

  const [state, setState] = useState<CubeState>(() => solvedState(n));
  const [color, setColor] = useState<ColorId>("w");
  const [solution, setSolution] = useState<string[] | null>(null);
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const { solve } = useSolver();

  const reset = useCallback(
    (next?: CubeState) => {
      setState(next ?? solvedState(n));
      setSolution(null);
      setStep(0);
      setError(null);
    },
    [n],
  );

  // The route component is reused when switching between /solver/2x2 and /solver/3x3.
  // Reset the cube state whenever the puzzle size changes so the displayed cube matches the selected puzzle.
  useEffect(() => {
    reset();
  }, [n, reset]);

  const paint = (face: number, index: number) => {
    setSolution(null);
    setError(null);
    setState((prev) => {
      const next = cloneState(prev);
      next[face]![index] = color;
      return next;
    });
  };

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const face of state) for (const s of face) c[s] = (c[s] ?? 0) + 1;
    return c;
  }, [state]);

  const displayState = useMemo(() => {
    if (!solution || step === 0) return state;
    return applyAlg(state, solution.slice(0, step).join(" "));
  }, [state, solution, step]);

  const handleSolve = async () => {
    setError(null);
    const counted = validateColorCounts(state);
    if (!counted.ok) {
      setError(counted.message ?? "Invalid cube.");
      return;
    }
    if (isSolved(state)) {
      setError("This cube is already solved — scramble it or paint your own colors.");
      return;
    }
    setBusy(true);
    try {
      const moves = await solve(state, n);
      setSolution(moves);
      setStep(0);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const scramble = () => reset(applyAlg(solvedState(n), randomScramble(n)));
  const guide = GUIDES[puzzle.slug];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground">
        <ArrowLeft className="size-4" /> All puzzles
      </Link>

      <header className="mt-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">{puzzle.slug} solver</p>
          <h1 className="mt-1 text-4xl font-semibold">{puzzle.name}</h1>
          <p className="mt-2 max-w-xl text-muted-foreground">{puzzle.tagline}</p>
        </div>
        <nav className="flex gap-2">
          {AVAILABLE_PUZZLES.map((p) => (
            <Link
              key={p.slug}
              to="/solver/$puzzle"
              params={{ puzzle: p.slug }}
              className={cn(
                "rounded-lg border border-border px-3 py-1.5 text-sm transition hover:border-primary hover:text-primary",
                p.slug === puzzle.slug && "border-primary bg-primary/10 text-primary",
              )}
            >
              {p.slug}
            </Link>
          ))}
        </nav>
      </header>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <section className="panel p-5 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">{solution ? "Follow the solution" : "Paint your cube"}</h2>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" onClick={scramble}><Shuffle className="size-4" /> Scramble</Button>
              <Button variant="ghost" size="sm" onClick={() => reset()}><RotateCcw className="size-4" /> Reset</Button>
            </div>
          </div>

          <p className="mt-2 text-sm text-muted-foreground">
            Hold the cube with <span className="text-foreground">white on top</span> and <span className="text-foreground">green facing you</span>, then click stickers to match your cube.
          </p>

          <div className="mt-6 overflow-x-auto pb-2">
            <CubeNet state={displayState} editable={!solution} onPaint={paint} className="mx-auto" />
          </div>

          {!solution && (
            <div className="mt-6 flex flex-wrap items-center gap-2">
              {PALETTE.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={cn(
                    "flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm capitalize transition hover:border-primary",
                    color === c && "border-primary bg-primary/10",
                  )}
                >
                  <span className={cn("size-4 rounded", SWATCH[c])} />
                  {COLOR_NAME[c]}
                  <span className={cn("tabular-nums text-xs", (counts[c] ?? 0) === n * n ? "text-muted-foreground" : "text-primary")}>
                    {counts[c] ?? 0}/{n * n}
                  </span>
                </button>
              ))}
            </div>
          )}

          {error && <p className="mt-5 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive-foreground">{error}</p>}

          <div className="mt-6 flex flex-wrap gap-3">
            {!solution && (
              <Button size="lg" onClick={handleSolve} disabled={busy}>
                {busy ? <><Loader2 className="size-4 animate-spin" /> Crunching…</> : <><Wand2 className="size-4" /> Solve my cube</>}
              </Button>
            )}
            {solution && <Button variant="secondary" size="lg" onClick={() => reset(state)}>Edit colors</Button>}
            {busy && n === 3 && <span className="self-center text-sm text-muted-foreground">First solve builds the lookup tables (a few seconds).</span>}
          </div>
        </section>

        <aside className="panel flex flex-col p-5 sm:p-6">
          {solution ? (
            <SolutionPanel solution={solution} step={step} setStep={setStep} size={stateSize(state)} />
          ) : guide ? (
            <div>
              <h2 className="text-lg font-semibold">Reduction method</h2>
              <ol className="mt-4 space-y-5">
                {guide.map((g) => (
                  <li key={g.title}>
                    <h3 className="text-sm font-semibold text-primary">{g.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{g.body}</p>
                    {g.algs?.map((a) => <code key={a} className="mt-2 block rounded-lg bg-background/70 px-3 py-2 font-mono text-xs text-foreground">{a}</code>)}
                  </li>
                ))}
              </ol>
            </div>
          ) : (
            <div>
              <h2 className="text-lg font-semibold">How it works</h2>
              <ol className="mt-4 space-y-4 text-sm text-muted-foreground">
                <li><span className="font-medium text-foreground">1. Enter your cube.</span> Pick a color, then click each sticker. Centers are locked so the orientation always matches the instructions.</li>
                <li><span className="font-medium text-foreground">2. Hit solve.</span> The engine{n === 2 ? " searches every one of the 3.6 million states for the shortest solution." : " runs Kociemba's two-phase algorithm and returns about 20 moves."}</li>
                <li><span className="font-medium text-foreground">3. Turn along.</span> Step through the moves one at a time — the diagram updates with every turn.</li>
              </ol>
              <div className="mt-6 rounded-xl border border-border bg-surface-2 p-4 text-sm text-muted-foreground">
                <Sparkles className="mb-2 size-4 text-primary" />
                Notation: <span className="text-foreground">R</span> = right face clockwise, <span className="text-foreground">R'</span> = counter-clockwise, <span className="text-foreground">R2</span> = half turn. Same for U (up), F (front), D (down), L (left), B (back).
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

function SolutionPanel({ solution, step, setStep, size }: { solution: string[]; step: number; setStep: (s: number) => void; size: number }) {
  const done = step >= solution.length;
  const current = solution[step];

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-baseline justify-between">
        <h2 className="text-lg font-semibold">Solution</h2>
        <span className="text-sm text-muted-foreground">{solution.length} moves · {size}x{size}</span>
      </div>
      <div className="mt-4 rounded-xl border border-primary/30 bg-primary/10 p-4 text-center">
        <div className="font-display text-5xl font-semibold text-primary">{done ? "Solved" : current}</div>
        <p className="mt-2 text-sm text-muted-foreground">{done ? "Every face is complete. Nice work." : describeMove(current!)}</p>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <Button variant="secondary" size="sm" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}><ChevronLeft className="size-4" /> Back</Button>
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2"><div className="h-full rounded-full bg-primary transition-all" style={{ width: `${(step / solution.length) * 100}%` }} /></div>
        <Button size="sm" onClick={() => setStep(Math.min(solution.length, step + 1))} disabled={done}>Next <ChevronRight className="size-4" /></Button>
      </div>
      <div className="mt-5 flex flex-wrap gap-1.5">
        {solution.map((mv, i) => (
          <button key={`${mv}-${i}`} type="button" onClick={() => setStep(i)} className={cn("min-w-9 rounded-lg border border-border px-2 py-1.5 font-mono text-sm transition hover:border-primary", i < step && "text-muted-foreground opacity-60", i === step && "border-primary bg-primary/15 text-primary")}>{mv}</button>
        ))}
      </div>
    </div>
  );
}
