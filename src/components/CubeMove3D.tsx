import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Axis = "x" | "y" | "z";

const FACE_AXIS: Record<string, { axis: Axis; coord: number; sign: number }> = {
  R: { axis: "x", coord: 1, sign: 1 },
  L: { axis: "x", coord: -1, sign: -1 },
  U: { axis: "y", coord: -1, sign: -1 },
  D: { axis: "y", coord: 1, sign: 1 },
  F: { axis: "z", coord: 1, sign: 1 },
  B: { axis: "z", coord: -1, sign: -1 },
};

/** Sticker colors: U white, D yellow, R red, L orange, F green, B blue. */
const STICKER: Record<string, string> = {
  U: "var(--cube-w)",
  D: "var(--cube-y)",
  R: "var(--cube-r)",
  L: "var(--cube-o)",
  F: "var(--cube-g)",
  B: "var(--cube-b)",
};

const SIZE = 34; // cubie edge in px
const GAP = 2;
const STEP = SIZE + GAP;

function faceTransform(face: string) {
  const h = SIZE / 2;
  switch (face) {
    case "U":
      return `rotateX(90deg) translateZ(${h}px)`;
    case "D":
      return `rotateX(-90deg) translateZ(${h}px)`;
    case "R":
      return `rotateY(90deg) translateZ(${h}px)`;
    case "L":
      return `rotateY(-90deg) translateZ(${h}px)`;
    case "F":
      return `translateZ(${h}px)`;
    default:
      return `rotateY(180deg) translateZ(${h}px)`;
  }
}

function Cubie({
  x,
  y,
  z,
  dim,
}: {
  x: number;
  y: number;
  z: number;
  dim: boolean;
}) {
  const faces: { key: string; show: boolean }[] = [
    { key: "U", show: y === -1 },
    { key: "D", show: y === 1 },
    { key: "R", show: x === 1 },
    { key: "L", show: x === -1 },
    { key: "F", show: z === 1 },
    { key: "B", show: z === -1 },
  ];
  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{
        width: SIZE,
        height: SIZE,
        marginLeft: -SIZE / 2,
        marginTop: -SIZE / 2,
        transformStyle: "preserve-3d",
        transform: `translate3d(${x * STEP}px, ${y * STEP}px, ${z * STEP}px)`,
      }}
    >
      {faces.map((f) => (
        <div
          key={f.key}
          style={{
            position: "absolute",
            inset: 0,
            transform: faceTransform(f.key),
            background: f.show ? STICKER[f.key] : "oklch(0.18 0.01 260)",
            borderRadius: 6,
            border: "1px solid oklch(0 0 0 / 0.35)",
            opacity: dim ? 0.35 : 1,
            transition: "opacity 300ms ease",
            backfaceVisibility: "hidden",
          }}
        />
      ))}
    </div>
  );
}

/** Signed rotation (degrees) for a clockwise quarter turn of each face. */
const CW_ANGLE: Record<string, number> = { R: 90, L: -90, U: -90, D: 90, F: 90, B: -90 };

export function CubeMove3D({
  notation,
  className,
  autoPlay = true,
}: {
  notation: string;
  className?: string;
  autoPlay?: boolean;
}) {
  const face = notation[0] ?? "R";
  const prime = notation.includes("'");
  const double = notation.includes("2");
  const info = FACE_AXIS[face] ?? FACE_AXIS["R"]!;
  const target =
    (CW_ANGLE[face] ?? 90) * (prime ? -1 : 1) * (double ? 2 : 1);

  const [angle, setAngle] = useState(0);

  useEffect(() => {
    setAngle(0);
    if (!autoPlay) return;
    let alive = true;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const loop = () => {
      if (!alive) return;
      setAngle(target);
      timers.push(
        setTimeout(() => {
          if (!alive) return;
          setAngle(0);
          timers.push(setTimeout(loop, 1000));
        }, 1500),
      );
    };
    timers.push(setTimeout(loop, 500));
    return () => {
      alive = false;
      timers.forEach(clearTimeout);
    };
  }, [notation, target, autoPlay]);

  const cubies: { x: number; y: number; z: number }[] = [];
  for (let x = -1; x <= 1; x++)
    for (let y = -1; y <= 1; y++) for (let z = -1; z <= 1; z++) cubies.push({ x, y, z });

  const inLayer = (c: { x: number; y: number; z: number }) => c[info.axis] === info.coord;
  const rotate =
    info.axis === "x"
      ? `rotateX(${angle}deg)`
      : info.axis === "y"
        ? `rotateY(${angle}deg)`
        : `rotateZ(${angle}deg)`;

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div style={{ perspective: 700, width: 200, height: 200 }} className="relative">
        <div
          className="absolute inset-0"
          style={{
            transformStyle: "preserve-3d",
            transform: "rotateX(-24deg) rotateY(-38deg)",
          }}
        >
          {/* static cubies */}
          <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
            {cubies.filter((c) => !inLayer(c)).map((c) => (
              <Cubie key={`${c.x}${c.y}${c.z}`} {...c} dim />
            ))}
          </div>
          {/* turning layer */}
          <div
            className="absolute inset-0"
            style={{
              transformStyle: "preserve-3d",
              transform: rotate,
              transition: "transform 900ms cubic-bezier(0.45, 0.05, 0.25, 1)",
            }}
          >
            {cubies.filter(inLayer).map((c) => (
              <Cubie key={`${c.x}${c.y}${c.z}`} {...c} dim={false} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
