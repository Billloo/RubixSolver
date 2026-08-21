/// <reference lib="webworker" />
import type { CubeState } from "./model";
import { solve2x2 } from "./solve2x2";
import { solve3x3 } from "./solve3x3";

export interface SolveRequest {
  id: number;
  size: number;
  state: CubeState;
}

self.onmessage = async (event: MessageEvent<SolveRequest>) => {
  const { id, size, state } = event.data;
  try {
    const moves = size === 2 ? solve2x2(state) : await solve3x3(state);
    (self as unknown as Worker).postMessage({ id, moves });
  } catch (error) {
    (self as unknown as Worker).postMessage({ id, error: (error as Error).message });
  }
};
