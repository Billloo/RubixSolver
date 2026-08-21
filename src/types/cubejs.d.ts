declare module "cubejs" {
  export interface CubeInstance {
    move(alg: string): CubeInstance;
    solve(maxDepth?: number): string;
    asString(): string;
    isSolved(): boolean;
  }
  interface CubeStatic {
    new (): CubeInstance;
    fromString(facelets: string): CubeInstance;
    random(): CubeInstance;
    initSolver(): void;
    inverse(alg: string): string;
  }
  const Cube: CubeStatic;
  export default Cube;
}
