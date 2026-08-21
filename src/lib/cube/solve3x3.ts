// 3x3x3 state validation + solving (Kociemba two-phase, via cubejs).

import { COLOR_FACE, toFaceletString, type CubeState } from "./model";

const CORNERS: Array<[number, number][]> = [
  [
    [0, 8],
    [1, 0],
    [2, 2],
  ], // URF
  [
    [0, 6],
    [2, 0],
    [4, 2],
  ], // UFL
  [
    [0, 0],
    [4, 0],
    [5, 2],
  ], // ULB
  [
    [0, 2],
    [5, 0],
    [1, 2],
  ], // UBR
  [
    [3, 2],
    [2, 8],
    [1, 6],
  ], // DFR
  [
    [3, 0],
    [4, 8],
    [2, 6],
  ], // DLF
  [
    [3, 6],
    [5, 8],
    [4, 6],
  ], // DBL
  [
    [3, 8],
    [1, 8],
    [5, 6],
  ], // DRB
];
const CORNER_NAMES = ["URF", "UFL", "ULB", "UBR", "DFR", "DLF", "DBL", "DRB"];

const EDGES: Array<[number, number][]> = [
  [
    [0, 5],
    [1, 1],
  ], // UR
  [
    [0, 7],
    [2, 1],
  ], // UF
  [
    [0, 3],
    [4, 1],
  ], // UL
  [
    [0, 1],
    [5, 1],
  ], // UB
  [
    [3, 5],
    [1, 7],
  ], // DR
  [
    [3, 1],
    [2, 7],
  ], // DF
  [
    [3, 3],
    [4, 7],
  ], // DL
  [
    [3, 7],
    [5, 7],
  ], // DB
  [
    [2, 5],
    [1, 3],
  ], // FR
  [
    [2, 3],
    [4, 5],
  ], // FL
  [
    [5, 5],
    [4, 3],
  ], // BL
  [
    [5, 3],
    [1, 5],
  ], // BR
];
const EDGE_NAMES = ["UR", "UF", "UL", "UB", "DR", "DF", "DL", "DB", "FR", "FL", "BL", "BR"];

const sig = (a: string[]) => a.slice().sort().join("");

function parity(perm: number[]): number {
  let p = 0;
  for (let i = 0; i < perm.length; i++)
    for (let j = i + 1; j < perm.length; j++) if (perm[i]! > perm[j]!) p ^= 1;
  return p;
}

/** Returns an error message if the state can't exist on a real cube, else null. */
export function validate3x3(state: CubeState): string | null {
  const faceOf = (f: number, i: number) => COLOR_FACE[state[f]![i]!];

  const cornerIdx = new Map(CORNER_NAMES.map((n, i) => [sig(n.split("")), i]));
  const edgeIdx = new Map(EDGE_NAMES.map((n, i) => [sig(n.split("")), i]));

  const cp: number[] = [];
  let twist = 0;
  for (const facelets of CORNERS) {
    const faces = facelets.map(([f, i]) => faceOf(f, i));
    const id = cornerIdx.get(sig(faces));
    if (id === undefined) return "One of the corner pieces has an impossible color combination.";
    const ori = faces.findIndex((f) => f === "U" || f === "D");
    if (ori < 0) return "One of the corner pieces has an impossible color combination.";
    twist += ori;
    cp.push(id);
  }
  if (new Set(cp).size !== 8) return "Two corners have the same colors — check your stickers.";
  if (twist % 3 !== 0) return "A corner is twisted the wrong way. Re-check the corner colors.";

  const ep: number[] = [];
  let flip = 0;
  for (let e = 0; e < EDGES.length; e++) {
    const faces = EDGES[e]!.map(([f, i]) => faceOf(f, i));
    const id = edgeIdx.get(sig(faces));
    if (id === undefined) return "One of the edge pieces has an impossible color combination.";
    const first = faces[0]!;
    const second = faces[1]!;
    let oriented: boolean;
    if (first === "U" || first === "D") oriented = true;
    else if (second === "U" || second === "D") oriented = false;
    else if (first === "F" || first === "B") oriented = true;
    else oriented = false;
    if (!oriented) flip ^= 1;
    ep.push(id);
  }
  if (new Set(ep).size !== 12) return "Two edges have the same colors — check your stickers.";
  if (flip) return "An edge is flipped the wrong way. Re-check the edge colors.";
  if (parity(cp) !== parity(ep))
    return "This combination is impossible (permutation parity) — two pieces look swapped.";
  return null;
}

let solverReady = false;

export async function init3x3Solver(): Promise<void> {
  if (solverReady) return;
  const { Cube } = await import("@/lib/vendor/cubejs");
  Cube.initSolver();
  solverReady = true;
}

export async function solve3x3(state: CubeState): Promise<string[]> {
  const err = validate3x3(state);
  if (err) throw new Error(err);
  await init3x3Solver();
  const { Cube } = await import("@/lib/vendor/cubejs");
  const cube = Cube.fromString(toFaceletString(state));
  const alg: string = cube.solve();
  return alg.split(/\s+/).filter(Boolean);
}
