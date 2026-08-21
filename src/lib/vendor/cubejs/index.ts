// ESM entry for the vendored cubejs engine (Kociemba two-phase solver).
// Load the two legacy scripts sequentially so the Cube global is guaranteed
// to exist before solve.js reads it. This is especially important in web workers.

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

let cubePromise: Promise<CubeStatic> | null = null;

export function loadCube(): Promise<CubeStatic> {
  if (!cubePromise) {
    cubePromise = (async () => {
      // cube.js creates globalThis.Cube.
      await import("./cube.js");
      // solve.js augments that Cube with the two-phase solver.
      await import("./solve.js");

      const Cube = (globalThis as unknown as { Cube?: CubeStatic }).Cube;
      if (!Cube || typeof Cube.initSolver !== "function") {
        throw new Error("The 3x3 solving engine failed to initialize.");
      }
      return Cube;
    })();
  }
  return cubePromise;
}

export default loadCube;
