export interface GuideStep {
  title: string;
  body: string;
  algs?: string[];
}

export const GUIDES: Record<string, GuideStep[]> = {
  "4x4": [
    {
      title: "1 · Solve the six centers",
      body: "Each face has a 2x2 block of centers with no fixed reference. Build white first, then yellow opposite it, then the four side centers in the correct clockwise order: white top, yellow bottom, then blue, orange, green, red around the sides.",
      algs: ["Uw R U R' Uw'", "Rw U R' U' Rw'"],
    },
    {
      title: "2 · Pair the twelve edges",
      body: "Bring two matching edge halves to the front-left and front-right slots, then join them with the slice-flip-slice trick. Repeat until every edge behaves like a single 3x3 edge.",
      algs: ["Dw R U R' F R' F' R Dw'", "Uw' R U R' F R' F' R Uw"],
    },
    {
      title: "3 · Solve it like a 3x3",
      body: "With centers built and edges paired, use your normal 3x3 method (cross, F2L, OLL, PLL). Treat each paired edge as one piece and never use single-slice turns from here on.",
    },
    {
      title: "4 · Fix the parity cases",
      body: "Only a 4x4 can end with a single flipped edge (OLL parity) or two swapped pieces (PLL parity). Apply the parity algorithm, then finish with normal 3x3 moves.",
      algs: [
        "OLL parity: Rw U2 x Rw U2 Rw U2 Rw' U2 Lw U2 Rw' U2 Rw U2 Rw' U2 Rw'",
        "PLL parity: Rw2 U2 Rw2 Uw2 Rw2 Uw2",
      ],
    },
  ],
  "5x5": [
    {
      title: "1 · Build the centers",
      body: "Each center is a 3x3 block: solve the four edge-centers around a fixed middle center, then the corners of the center block. Build opposite faces in pairs to avoid destroying finished work.",
      algs: ["Rw U R' U' Rw'", "Lw' U' L U Lw"],
    },
    {
      title: "2 · Pair the edges (tredges)",
      body: "Each edge is three pieces. Place the wing pieces next to their matching middle edge using slice moves, then lock the pair in with the standard flipping insert.",
      algs: ["Dw R U R' F R' F' R Dw'", "Rw U R' F R' F' R Rw'"],
    },
    {
      title: "3 · Reduce and solve as a 3x3",
      body: "Once centers are solid and all twelve edges are paired, solve with your usual 3x3 method. Use only outer-layer turns so the reduction stays intact.",
    },
    {
      title: "4 · Handle last-edge and parity cases",
      body: "A 5x5 can end with one edge that needs flipping. Use the edge-flip algorithm, and remember odd cubes never get PLL parity — only the flipped-edge case.",
      algs: ["Flip last edge: Rw U2 Rw' U2 Rw U2 Rw' U2 Rw U2 Rw'"],
    },
  ],
};
