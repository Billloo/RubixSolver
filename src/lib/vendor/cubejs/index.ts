// ESM entry for the vendored cubejs engine (Kociemba two-phase solver).
import "./cube.js";
import "./solve.js";

export interface CubeInstance {
  move(alg: string): CubeInstance;
  solve(maxDepth?: number): string;
  asString(): string;
  isSolved(): boolean;
}

export interface CubeStatic {
  new (): CubeInstance;
  fromString(facelets: string): CubeInstance;
  random(): CubeInstance;
  initSolver(): void;
  inverse(alg: string): string;
}

export const Cube = (globalThis as unknown as { Cube: CubeStatic }).Cube;
export default Cube;
