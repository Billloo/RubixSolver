import { useCallback, useEffect, useRef } from "react";
import type { CubeState } from "./model";

interface Pending {
  resolve: (moves: string[]) => void;
  reject: (err: Error) => void;
}

/** Runs the solving engines in a web worker so the UI never freezes. */
export function useSolver() {
  const workerRef = useRef<Worker | null>(null);
  const pending = useRef(new Map<number, Pending>());
  const nextId = useRef(1);

  useEffect(() => {
    return () => {
      workerRef.current?.terminate();
      workerRef.current = null;
    };
  }, []);

  const getWorker = useCallback(() => {
    if (!workerRef.current) {
      const worker = new Worker(new URL("./solver.worker.ts", import.meta.url), {
        type: "module",
      });
      worker.onmessage = (
        event: MessageEvent<{ id: number; moves?: string[]; error?: string }>,
      ) => {
        const entry = pending.current.get(event.data.id);
        if (!entry) return;
        pending.current.delete(event.data.id);
        if (event.data.error) entry.reject(new Error(event.data.error));
        else entry.resolve(event.data.moves ?? []);
      };
      worker.onerror = () => {
        pending.current.forEach((p) => p.reject(new Error("The solving engine failed to load.")));
        pending.current.clear();
      };
      workerRef.current = worker;
    }
    return workerRef.current;
  }, []);

  const solve = useCallback(
    (state: CubeState, size: number) =>
      new Promise<string[]>((resolve, reject) => {
        const id = nextId.current++;
        pending.current.set(id, { resolve, reject });
        getWorker().postMessage({ id, size, state });
      }),
    [getWorker],
  );

  return { solve };
}
