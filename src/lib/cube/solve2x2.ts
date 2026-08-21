// Exact 2x2x2 solver: full breadth-first distance table over all 3,674,160
// states (DBL corner held fixed), giving a guaranteed shortest solution.

import {
  applyAlg,
  cloneState,
  solvedState,
  type ColorId,
  type CubeState,
  type FaceKey,
} from "./model";

/** Corner cubies: URF, UFL, ULB, UBR, DFR, DLF, DBL, DRB */
const CORNER_FACELETS: Array<[number, number][]> = [
  [
    [0, 3],
    [1, 0],
    [2, 1],
  ], // URF -> U,R,F
  [
    [0, 2],
    [2, 0],
    [4, 1],
  ], // UFL -> U,F,L
  [
    [0, 0],
    [4, 0],
    [5, 1],
  ], // ULB -> U,L,B
  [
    [0, 1],
    [5, 0],
    [1, 1],
  ], // UBR -> U,B,R
  [
    [3, 1],
    [2, 3],
    [1, 2],
  ], // DFR -> D,F,R
  [
    [3, 0],
    [4, 3],
    [2, 2],
  ], // DLF -> D,L,F
  [
    [3, 2],
    [5, 3],
    [4, 2],
  ], // DBL -> D,B,L
  [
    [3, 3],
    [1, 3],
    [5, 2],
  ], // DRB -> D,R,B
];

const OPPOSITE: Record<ColorId, ColorId> = {
  w: "y",
  y: "w",
  r: "o",
  o: "r",
  g: "b",
  b: "g",
};

export interface CornerState {
  cp: number[];
  co: number[];
}

/**
 * Decode a 2x2 facelet state into corner permutation/orientation.
 * The DBL cubie defines the reference frame, so the cube does not need to be
 * pre-oriented to the standard color scheme.
 */
export function decode2x2(state: CubeState): CornerState {
  const at = (f: number, i: number) => state[f]![i]!;
  const cD = at(3, 2),
    cB = at(5, 3),
    cL = at(4, 2);
  const faceColor: Record<string, ColorId> = {
    D: cD,
    B: cB,
    L: cL,
    U: OPPOSITE[cD],
    F: OPPOSITE[cB],
    R: OPPOSITE[cL],
  };
  const colorFace: Partial<Record<ColorId, string>> = {};
  for (const f of Object.keys(faceColor)) colorFace[faceColor[f]!] = f;

  // canonical color-set signature -> cubie index
  const sig = (cols: string[]) => cols.slice().sort().join("");
  const cubieBySig = new Map<string, number>();
  CORNER_FACELETS.forEach((_, i) => {
    const names = ["URF", "UFL", "ULB", "UBR", "DFR", "DLF", "DBL", "DRB"][i]!;
    cubieBySig.set(sig(names.split("")), i);
  });

  const cp: number[] = [];
  const co: number[] = [];
  for (let pos = 0; pos < 8; pos++) {
    const stickers = CORNER_FACELETS[pos]!.map(([f, i]) => at(f, i));
    const faces = stickers.map((c) => colorFace[c]);
    if (faces.some((f) => !f)) throw new Error("Invalid sticker colors.");
    const cubie = cubieBySig.get(sig(faces as string[]));
    if (cubie === undefined) throw new Error("Impossible corner piece detected.");
    const ori = faces.findIndex((f) => f === "U" || f === "D");
    cp.push(cubie);
    co.push(ori);
  }
  if (new Set(cp).size !== 8) throw new Error("Duplicate corner pieces detected.");
  if (co.reduce((a, b) => a + b, 0) % 3 !== 0)
    throw new Error("Corner twist is impossible — re-check your colors.");
  return { cp, co };
}

export const MOVES_2X2 = ["U", "U2", "U'", "R", "R2", "R'", "F", "F2", "F'"] as const;

function moveCornerTable(alg: string): CornerState {
  return decode2x2(applyAlg(solvedState(2), alg));
}

const MOVE_TABLES: CornerState[] = MOVES_2X2.map((m) => moveCornerTable(m));

function applyCorners(s: CornerState, m: CornerState): CornerState {
  const cp = new Array<number>(8);
  const co = new Array<number>(8);
  for (let i = 0; i < 8; i++) {
    cp[i] = s.cp[m.cp[i]!]!;
    co[i] = (s.co[m.cp[i]!]! + m.co[i]!) % 3;
  }
  return { cp, co };
}

/** positions that move when DBL is fixed */
const POS = [0, 1, 2, 3, 4, 5, 7];
const FACT = [1, 1, 2, 6, 24, 120, 720, 5040];

function permIndex(cp: number[]): number {
  const vals = POS.map((p) => POS.indexOf(cp[p]!));
  let idx = 0;
  for (let i = 0; i < 7; i++) {
    let smaller = 0;
    for (let j = i + 1; j < 7; j++) if (vals[j]! < vals[i]!) smaller++;
    idx += smaller * FACT[6 - i]!;
  }
  return idx;
}

function permFromIndex(idx: number): number[] {
  const vals: number[] = [];
  const avail = [0, 1, 2, 3, 4, 5, 6];
  let rest = idx;
  for (let i = 0; i < 7; i++) {
    const f = FACT[6 - i]!;
    const k = Math.floor(rest / f);
    rest %= f;
    vals.push(avail.splice(k, 1)[0]!);
  }
  const cp = new Array<number>(8).fill(6);
  POS.forEach((p, i) => {
    cp[p] = POS[vals[i]!]!;
  });
  cp[6] = 6;
  return cp;
}

function oriIndex(co: number[]): number {
  let idx = 0;
  for (let i = 0; i < 6; i++) idx = idx * 3 + co[POS[i]!]!;
  return idx;
}

function oriFromIndex(idx: number): number[] {
  const co = new Array<number>(8).fill(0);
  let rest = idx;
  let sum = 0;
  for (let i = 5; i >= 0; i--) {
    const v = rest % 3;
    rest = Math.floor(rest / 3);
    co[POS[i]!] = v;
    sum += v;
  }
  co[7] = (3 - (sum % 3)) % 3;
  return co;
}

const N_PERM = 5040;
const N_ORI = 729;
export const N_STATES = N_PERM * N_ORI;

let permTrans: Int16Array | null = null;
let oriTrans: Int16Array | null = null;
let distTable: Uint8Array | null = null;

function buildTransitions() {
  if (permTrans && oriTrans) return;
  permTrans = new Int16Array(N_PERM * 9);
  oriTrans = new Int16Array(N_ORI * 9);
  for (let p = 0; p < N_PERM; p++) {
    const cp = permFromIndex(p);
    for (let m = 0; m < 9; m++) {
      const mv = MOVE_TABLES[m]!;
      const ncp = new Array<number>(8);
      for (let i = 0; i < 8; i++) ncp[i] = cp[mv.cp[i]!]!;
      permTrans[p * 9 + m] = permIndex(ncp);
    }
  }
  for (let o = 0; o < N_ORI; o++) {
    const co = oriFromIndex(o);
    for (let m = 0; m < 9; m++) {
      const mv = MOVE_TABLES[m]!;
      const nco = new Array<number>(8);
      for (let i = 0; i < 8; i++) nco[i] = (co[mv.cp[i]!]! + mv.co[i]!) % 3;
      oriTrans[o * 9 + m] = oriIndex(nco);
    }
  }
}

/** Builds the full distance table (~3.7M entries). Takes ~1-2s, cached after. */
export function init2x2Solver(): void {
  if (distTable) return;
  buildTransitions();
  const dist = new Uint8Array(N_STATES).fill(255);
  const solved = permIndex([0, 1, 2, 3, 4, 5, 6, 7]) * N_ORI + 0;
  dist[solved] = 0;
  let frontier = [solved];
  let depth = 0;
  while (frontier.length) {
    const next: number[] = [];
    for (const idx of frontier) {
      const p = Math.floor(idx / N_ORI);
      const o = idx % N_ORI;
      for (let m = 0; m < 9; m++) {
        const ni = permTrans![p * 9 + m]! * N_ORI + oriTrans![o * 9 + m]!;
        if (dist[ni] === 255) {
          dist[ni] = depth + 1;
          next.push(ni);
        }
      }
    }
    frontier = next;
    depth++;
  }
  distTable = dist;
}

export function solve2x2(state: CubeState): string[] {
  init2x2Solver();
  const { cp, co } = decode2x2(state);
  let idx = permIndex(cp) * N_ORI + oriIndex(co);
  const dist = distTable!;
  if (dist[idx] === 255) throw new Error("This cube state is not solvable.");
  const out: string[] = [];
  while (dist[idx]! > 0) {
    const p = Math.floor(idx / N_ORI);
    const o = idx % N_ORI;
    for (let m = 0; m < 9; m++) {
      const ni = permTrans![p * 9 + m]! * N_ORI + oriTrans![o * 9 + m]!;
      if (dist[ni]! === dist[idx]! - 1) {
        out.push(MOVES_2X2[m]!);
        idx = ni;
        break;
      }
    }
  }
  return out;
}

export function checkSolvable2x2(state: CubeState): string | null {
  try {
    decode2x2(cloneState(state));
    return null;
  } catch (e) {
    return (e as Error).message;
  }
}

export type { FaceKey };
