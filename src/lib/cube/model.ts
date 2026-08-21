// Generic NxN cube facelet model.
// Faces order: U, R, F, D, L, B. Each face is a row-major n*n array of color ids.

export const FACE_ORDER = ["U", "R", "F", "D", "L", "B"] as const;
export type FaceKey = (typeof FACE_ORDER)[number];

export type ColorId = "w" | "r" | "g" | "y" | "o" | "b";

/** Fixed color scheme used across the app (white top, green front). */
export const FACE_COLOR: Record<FaceKey, ColorId> = {
  U: "w",
  R: "r",
  F: "g",
  D: "y",
  L: "o",
  B: "b",
};

export const COLOR_FACE: Record<ColorId, FaceKey> = {
  w: "U",
  r: "R",
  g: "F",
  y: "D",
  o: "L",
  b: "B",
};

export type CubeState = ColorId[][]; // [face][index]

export function solvedState(n: number): CubeState {
  return FACE_ORDER.map((f) => Array<ColorId>(n * n).fill(FACE_COLOR[f]));
}

export function cloneState(state: CubeState): CubeState {
  return state.map((f) => f.slice());
}

export function stateSize(state: CubeState): number {
  return Math.round(Math.sqrt(state[0].length));
}

export function isSolved(state: CubeState): boolean {
  return state.every((face) => face.every((c) => c === face[0]));
}

const U = 0,
  R = 1,
  F = 2,
  D = 3,
  L = 4,
  B = 5;

function rotateFaceCW(face: ColorId[], n: number): ColorId[] {
  const out = face.slice();
  for (let r = 0; r < n; r++)
    for (let c = 0; c < n; c++) out[c * n + (n - 1 - r)] = face[r * n + c];
  return out;
}

function rotateFaceCCW(face: ColorId[], n: number): ColorId[] {
  const out = face.slice();
  for (let r = 0; r < n; r++)
    for (let c = 0; c < n; c++) out[(n - 1 - c) * n + r] = face[r * n + c];
  return out;
}

const row = (s: CubeState, f: number, r: number, n: number): ColorId[] =>
  s[f].slice(r * n, r * n + n);
const setRow = (s: CubeState, f: number, r: number, n: number, v: ColorId[]) => {
  for (let i = 0; i < n; i++) s[f][r * n + i] = v[i];
};
const col = (s: CubeState, f: number, c: number, n: number): ColorId[] => {
  const out: ColorId[] = [];
  for (let i = 0; i < n; i++) out.push(s[f][i * n + c]);
  return out;
};
const setCol = (s: CubeState, f: number, c: number, n: number, v: ColorId[]) => {
  for (let i = 0; i < n; i++) s[f][i * n + c] = v[i];
};
const rev = (a: ColorId[]) => a.slice().reverse();

/** Apply a single quarter turn (clockwise) of `face` at depth `layer` (0 = outer). */
function quarterTurn(state: CubeState, face: FaceKey, layer: number): CubeState {
  const n = stateSize(state);
  const s = cloneState(state);

  const rotateOuter = (f: number, cw: boolean) => {
    s[f] = cw ? rotateFaceCW(s[f], n) : rotateFaceCCW(s[f], n);
  };

  if (face === "U") {
    if (layer === 0) rotateOuter(U, true);
    if (layer === n - 1) rotateOuter(D, false);
    const f = row(state, F, layer, n);
    setRow(s, L, layer, n, f);
    setRow(s, B, layer, n, row(state, L, layer, n));
    setRow(s, R, layer, n, row(state, B, layer, n));
    setRow(s, F, layer, n, row(state, R, layer, n));
  } else if (face === "D") {
    const r = n - 1 - layer;
    if (layer === 0) rotateOuter(D, true);
    if (layer === n - 1) rotateOuter(U, false);
    setRow(s, F, r, n, row(state, L, r, n));
    setRow(s, L, r, n, row(state, B, r, n));
    setRow(s, B, r, n, row(state, R, r, n));
    setRow(s, R, r, n, row(state, F, r, n));
  } else if (face === "R") {
    const c = n - 1 - layer;
    if (layer === 0) rotateOuter(R, true);
    if (layer === n - 1) rotateOuter(L, false);
    setCol(s, U, c, n, col(state, F, c, n));
    setCol(s, F, c, n, col(state, D, c, n));
    setCol(s, D, c, n, rev(col(state, B, n - 1 - c, n)));
    setCol(s, B, n - 1 - c, n, rev(col(state, U, c, n)));
  } else if (face === "L") {
    const c = layer;
    if (layer === 0) rotateOuter(L, true);
    if (layer === n - 1) rotateOuter(R, false);
    setCol(s, U, c, n, rev(col(state, B, n - 1 - c, n)));
    setCol(s, B, n - 1 - c, n, rev(col(state, D, c, n)));
    setCol(s, D, c, n, col(state, F, c, n));
    setCol(s, F, c, n, col(state, U, c, n));
  } else if (face === "F") {
    const r = n - 1 - layer; // U row / D row
    if (layer === 0) rotateOuter(F, true);
    if (layer === n - 1) rotateOuter(B, false);
    setRow(s, U, r, n, rev(col(state, L, n - 1 - layer, n)));
    setCol(s, R, layer, n, row(state, U, r, n));
    setRow(s, D, layer, n, rev(col(state, R, layer, n)));
    setCol(s, L, n - 1 - layer, n, row(state, D, layer, n));
  } else {
    // B
    const r = layer;
    if (layer === 0) rotateOuter(B, true);
    if (layer === n - 1) rotateOuter(F, false);
    setRow(s, U, r, n, col(state, R, n - 1 - layer, n));
    setCol(s, L, layer, n, rev(row(state, U, r, n)));
    setRow(s, D, n - 1 - layer, n, col(state, L, layer, n));
    setCol(s, R, n - 1 - layer, n, rev(row(state, D, n - 1 - layer, n)));
  }

  return s;
}

export interface Move {
  face: FaceKey;
  /** number of layers turned, from the given face inward (1 = outer slice) */
  width: number;
  /** 1 = clockwise, 2 = half turn, 3 = counter-clockwise */
  amount: 1 | 2 | 3;
}

const MOVE_RE = /^([URFDLB])(w)?([2']?)$/;

export function parseMove(token: string): Move | null {
  const m = MOVE_RE.exec(token);
  if (!m) return null;
  const amount = m[3] === "2" ? 2 : m[3] === "'" ? 3 : 1;
  return { face: m[1] as FaceKey, width: m[2] ? 2 : 1, amount: amount as 1 | 2 | 3 };
}

export function parseAlg(alg: string): Move[] {
  return alg
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((t) => {
      const mv = parseMove(t);
      if (!mv) throw new Error(`Unknown move: ${t}`);
      return mv;
    });
}

export function moveToString(mv: Move): string {
  return `${mv.face}${mv.width > 1 ? "w" : ""}${mv.amount === 2 ? "2" : mv.amount === 3 ? "'" : ""}`;
}

export function applyMove(state: CubeState, mv: Move): CubeState {
  let s = state;
  for (let a = 0; a < mv.amount; a++) {
    for (let layer = 0; layer < mv.width; layer++) s = quarterTurn(s, mv.face, layer);
  }
  return s;
}

export function applyAlg(state: CubeState, alg: string | Move[]): CubeState {
  const moves = typeof alg === "string" ? parseAlg(alg) : alg;
  return moves.reduce(applyMove, state);
}

export function invertMoves(moves: Move[]): Move[] {
  return moves
    .slice()
    .reverse()
    .map((m) => ({ ...m, amount: (m.amount === 2 ? 2 : m.amount === 1 ? 3 : 1) as 1 | 2 | 3 }));
}

export function randomScramble(n: number, length = n * n * 3): Move[] {
  const faces: FaceKey[] = ["U", "R", "F", "D", "L", "B"];
  const out: Move[] = [];
  let last = "";
  while (out.length < length) {
    const face = faces[Math.floor(Math.random() * 6)];
    if (face === last) continue;
    last = face;
    const width = n > 3 && Math.random() < 0.35 ? 2 : 1;
    const amount = ([1, 2, 3] as const)[Math.floor(Math.random() * 3)];
    out.push({ face, width, amount });
  }
  return out;
}

/** 54-character facelet string (cubejs / Kociemba order) for a 3x3 state. */
export function toFaceletString(state: CubeState): string {
  return state
    .map((face) => face.map((c) => COLOR_FACE[c]).join(""))
    .join("");
}

export interface ValidationResult {
  ok: boolean;
  message?: string;
}

export function validateColorCounts(state: CubeState): ValidationResult {
  const n = stateSize(state);
  const counts: Record<string, number> = {};
  for (const face of state) for (const c of face) counts[c] = (counts[c] ?? 0) + 1;
  for (const f of FACE_ORDER) {
    const c = FACE_COLOR[f];
    if ((counts[c] ?? 0) !== n * n) {
      return {
        ok: false,
        message: `Each color must appear exactly ${n * n} times. Check your ${COLOR_NAME[c]} stickers.`,
      };
    }
  }
  return { ok: true };
}

export const COLOR_NAME: Record<ColorId, string> = {
  w: "white",
  r: "red",
  g: "green",
  y: "yellow",
  o: "orange",
  b: "blue",
};
