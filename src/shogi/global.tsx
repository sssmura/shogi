export type KomaType =
  | "Fu"
  | "Kaku"
  | "Hisha"
  | "Kyou"
  | "Kei"
  | "Gin"
  | "Kin"
  | "Gyoku"
  | "Ou"
  | "NariKin"
  | "Ryu"
  | "Uma"
  | "NariGin"
  | "NariKei"
  | "NariKyou";

export const typeToNariType: Record<string, KomaType> = {
  Fu: "NariKin",
  Kyou: "NariKyou",
  Kaku: "Uma",
  Hisha: "Ryu",
  Kei: "NariKei",
  Gin: "NariGin",
};
export const typeToMoveDistance: Record<KomaType, number> = {
  Fu: 1,
  Kyou: 8,
  Kei: 2, //Math.trunc(Math.sqrt(5))
  Gin: 1,
  Kin: 1,
  Gyoku: 1,
  Ou: 1,
  NariKin: 1,
  Kaku: 8,
  Hisha: 8,
  Ryu: 8,
  Uma: 8,
  NariGin: 1,
  NariKei: 1,
  NariKyou: 1,
};
//移動方向は10方向存在する。
type Direction =
  | "up"
  | "down"
  | "right"
  | "left"
  | "up_right"
  | "up_left"
  | "down_right"
  | "down_left"
  | "kei_right"
  | "kei_left";
export const direction: Record<"sente" | "gote", Record<string, Direction>> = {
  //[d_row,d_col]、
  sente: {
    "[-1,0]": "up",
    "[1,0]": "down",
    "[0,1]": "right",
    "[0,-1]": "left",
    "[-1,1]": "up_right",
    "[-1,-1]": "up_left",
    "[1,1]": "down_right",
    "[1,-1]": "down_left",
    "[-2,1]": "kei_right",
    "[-2,-1]": "kei_left",
  },
  gote: {
    "[1,0]": "up",
    "[-1,0]": "down",
    "[0,-1]": "right",
    "[0,1]": "left",
    "[1,-1]": "up_right",
    "[1,1]": "up_left",
    "[-1,-1]": "down_right",
    "[-1,1]": "down_left",
    "[2,-1]": "kei_right",
    "[2,1]": "kei_left",
  },
};
export const typeToMoveDirection: Record<KomaType, Direction[]> = {
  Fu: ["up"],
  Kaku: ["up_right", "up_left", "down_right", "down_left"],
  Hisha: ["up", "down", "right", "left"],
  Kyou: ["up"],
  Kei: ["kei_right", "kei_left"],
  Gin: ["up", "up_right", "up_left", "down_right", "down_left"],
  Kin: ["up", "up_right", "up_left", "right", "left", "down"],
  Gyoku: [
    "up",
    "up_right",
    "up_left",
    "right",
    "left",
    "down_right",
    "down_left",
    "down",
  ],
  Ou: [
    "up",
    "up_right",
    "up_left",
    "right",
    "left",
    "down_right",
    "down_left",
    "down",
  ],
  NariKin: ["up", "up_right", "up_left", "right", "left", "down"],
  NariGin: ["up", "up_right", "up_left", "right", "left", "down"],
  NariKei: ["up", "up_right", "up_left", "right", "left", "down"],
  NariKyou: ["up", "up_right", "up_left", "right", "left", "down"],
  Uma: [
    "up",
    "up_right",
    "up_left",
    "right",
    "left",
    "down_right",
    "down_left",
    "down",
  ],
  Ryu: [
    "up",
    "up_right",
    "up_left",
    "right",
    "left",
    "down_right",
    "down_left",
    "down",
  ],
};
export type Koma = {
  teban: "sente" | "gote";
  type: KomaType;
  pos: {
    x: number;
    y: number;
  };
};
// export type KomaState = nullState | notNullState;

export const startFieldData: (Koma | null)[][] = [
  [
    { teban: "gote", type: "Kyou", pos: { x: 0, y: 0 } },
    { teban: "gote", type: "Kei", pos: { x: 1, y: 0 } },
    { teban: "gote", type: "Gin", pos: { x: 2, y: 0 } },
    { teban: "gote", type: "Kin", pos: { x: 3, y: 0 } },
    { teban: "gote", type: "Gyoku", pos: { x: 4, y: 0 } },
    { teban: "gote", type: "Kin", pos: { x: 5, y: 0 } },
    { teban: "gote", type: "Gin", pos: { x: 6, y: 0 } },
    { teban: "gote", type: "Kei", pos: { x: 7, y: 0 } },
    { teban: "gote", type: "Kyou", pos: { x: 8, y: 0 } },
  ],
  [
    null,
    { teban: "gote", type: "Hisha", pos: { x: 1, y: 1 } },
    null,
    null,
    null,
    null,
    null,
    { teban: "gote", type: "Kaku", pos: { x: 7, y: 1 } },
    null,
  ],
  [
    { teban: "gote", type: "Fu", pos: { x: 0, y: 2 } },
    { teban: "gote", type: "Fu", pos: { x: 1, y: 2 } },
    { teban: "gote", type: "Fu", pos: { x: 2, y: 2 } },
    { teban: "gote", type: "Fu", pos: { x: 3, y: 2 } },
    { teban: "gote", type: "Fu", pos: { x: 4, y: 2 } },
    { teban: "gote", type: "Fu", pos: { x: 5, y: 2 } },
    { teban: "gote", type: "Fu", pos: { x: 6, y: 2 } },
    { teban: "gote", type: "Fu", pos: { x: 7, y: 2 } },
    { teban: "gote", type: "Fu", pos: { x: 8, y: 2 } },
  ],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [
    { teban: "sente", type: "Fu", pos: { x: 0, y: 6 } },
    { teban: "sente", type: "Fu", pos: { x: 1, y: 6 } },
    { teban: "sente", type: "Fu", pos: { x: 2, y: 6 } },
    { teban: "sente", type: "Fu", pos: { x: 3, y: 6 } },
    { teban: "sente", type: "Fu", pos: { x: 4, y: 6 } },
    { teban: "sente", type: "Fu", pos: { x: 5, y: 6 } },
    { teban: "sente", type: "Fu", pos: { x: 6, y: 6 } },
    { teban: "sente", type: "Fu", pos: { x: 7, y: 6 } },
    { teban: "sente", type: "Fu", pos: { x: 8, y: 6 } },
  ],
  [
    null,
    { teban: "sente", type: "Kaku", pos: { x: 1, y: 7 } },
    null,
    null,
    null,
    null,
    null,
    { teban: "sente", type: "Hisha", pos: { x: 7, y: 7 } },
    null,
  ],
  [
    { teban: "sente", type: "Kyou", pos: { x: 0, y: 8 } },
    { teban: "sente", type: "Kei", pos: { x: 1, y: 8 } },
    { teban: "sente", type: "Gin", pos: { x: 2, y: 8 } },
    { teban: "sente", type: "Kin", pos: { x: 3, y: 8 } },
    { teban: "sente", type: "Ou", pos: { x: 4, y: 8 } },
    { teban: "sente", type: "Kin", pos: { x: 5, y: 8 } },
    { teban: "sente", type: "Gin", pos: { x: 6, y: 8 } },
    { teban: "sente", type: "Kei", pos: { x: 7, y: 8 } },
    { teban: "sente", type: "Kyou", pos: { x: 8, y: 8 } },
  ],
];
