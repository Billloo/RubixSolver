export interface Puzzle {
  slug: string;
  name: string;
  size: number;
  tagline: string;
  /** true when an automatic state solver is available */
  solvable: boolean;
  pieces: string;
}

export const PUZZLES: Puzzle[] = [
  {
    slug: "2x2",
    name: "Pocket Cube",
    size: 2,
    tagline: "2x2x2 — shortest possible solution, every time",
    solvable: true,
    pieces: "3.6 million states",
  },
  {
    slug: "3x3",
    name: "Rubik's Cube",
    size: 3,
    tagline: "3x3x3 — Kociemba two-phase solver, ~20 moves",
    solvable: true,
    pieces: "43 quintillion states",
  },
  {
    slug: "4x4",
    name: "Rubik's Revenge",
    size: 4,
    tagline: "4x4x4 — guided reduction method with algorithms",
    solvable: false,
    pieces: "7.4 quattuordecillion states",
  },
  {
    slug: "5x5",
    name: "Professor's Cube",
    size: 5,
    tagline: "5x5x5 — guided reduction method with algorithms",
    solvable: false,
    pieces: "282 tredecillion states",
  },
];

export const getPuzzle = (slug: string): Puzzle | undefined =>
  PUZZLES.find((p) => p.slug === slug);
