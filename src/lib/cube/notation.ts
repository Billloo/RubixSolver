import { parseMove, type FaceKey } from "./model";

const FACE_LABEL: Record<FaceKey, string> = {
  U: "top",
  D: "bottom",
  R: "right",
  L: "left",
  F: "front",
  B: "back",
};

export function describeMove(token: string): string {
  const mv = parseMove(token);
  if (!mv) return token;
  const face = FACE_LABEL[mv.face];
  const layer = mv.width > 1 ? `two ${face} layers` : `${face} face`;
  const dir =
    mv.amount === 2
      ? "a half turn (180°)"
      : mv.amount === 1
        ? "clockwise (90°)"
        : "counter-clockwise (90°)";
  return `Turn the ${layer} ${dir}`;
}

export function arrowFor(token: string): "cw" | "ccw" | "half" {
  const mv = parseMove(token);
  if (!mv) return "cw";
  return mv.amount === 2 ? "half" : mv.amount === 1 ? "cw" : "ccw";
}
