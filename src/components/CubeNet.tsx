import { cn } from "@/lib/utils";
import { FACE_ORDER, stateSize, type ColorId, type CubeState, type FaceKey } from "@/lib/cube/model";

const COLOR_CLASS: Record<ColorId, string> = {
  w: "bg-cube-w",
  y: "bg-cube-y",
  r: "bg-cube-r",
  o: "bg-cube-o",
  g: "bg-cube-g",
  b: "bg-cube-b",
};

const FACE_LABEL: Record<FaceKey, string> = {
  U: "Up",
  R: "Right",
  F: "Front",
  D: "Down",
  L: "Left",
  B: "Back",
};

const CELL: Record<number, number> = { 2: 44, 3: 34, 4: 26, 5: 22 };

interface CubeNetProps {
  state: CubeState;
  editable?: boolean;
  onPaint?: ((face: number, index: number) => void) | undefined;
  className?: string | undefined;
}

function Face({
  state,
  face,
  n,
  editable,
  onPaint,
}: {
  state: CubeState;
  face: number;
  n: number;
  editable: boolean;
  onPaint?: ((face: number, index: number) => void) | undefined;
}) {
  const cell = CELL[n] ?? 24;
  const key = FACE_ORDER[face]!;
  const isCenter = (i: number) => n % 2 === 1 && i === (n * n - 1) / 2;

  return (
    <div
      className="grid gap-[3px] rounded-lg bg-background/60 p-[3px] ring-1 ring-border"
      style={{ gridTemplateColumns: `repeat(${n}, ${cell}px)` }}
      aria-label={`${FACE_LABEL[key]} face`}
    >
      {state[face]!.map((color, i) => {
        const locked = isCenter(i);
        const content = (
          <span
            className={cn(
              "block h-full w-full rounded-[5px] shadow-[var(--shadow-sticker)] transition-transform",
              COLOR_CLASS[color],
            )}
          />
        );
        return editable && !locked ? (
          <button
            key={i}
            type="button"
            onClick={() => onPaint?.(face, i)}
            style={{ height: cell, width: cell }}
            className="cursor-pointer rounded-[5px] outline-none ring-primary transition hover:scale-[1.08] focus-visible:ring-2"
            aria-label={`${FACE_LABEL[key]} sticker ${i + 1}`}
          >
            {content}
          </button>
        ) : (
          <span key={i} style={{ height: cell, width: cell }} className="block">
            {content}
          </span>
        );
      })}
    </div>
  );
}

export function CubeNet({ state, editable = false, onPaint, className }: CubeNetProps) {
  const n = stateSize(state);
  const wrap = (face: number) => (
    <Face state={state} face={face} n={n} editable={editable} onPaint={onPaint} />
  );

  return (
    <div className={cn("inline-flex flex-col items-start gap-[6px]", className)}>
      <div className="flex gap-[6px]">
        <Spacer n={n} />
        {wrap(0)}
      </div>
      <div className="flex gap-[6px]">
        {wrap(4)}
        {wrap(2)}
        {wrap(1)}
        {wrap(5)}
      </div>
      <div className="flex gap-[6px]">
        <Spacer n={n} />
        {wrap(3)}
      </div>
    </div>
  );
}

function Spacer({ n }: { n: number }) {
  const cell = CELL[n] ?? 24;
  return <div style={{ width: n * cell + (n - 1) * 3 + 6 }} aria-hidden />;
}
