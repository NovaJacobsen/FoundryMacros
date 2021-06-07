import { Attributes } from "./Attributes";

export type CharacterAttribute = {
  get: () => number;
  set: (n: number) => void;
};
export type CharacterAttributes = {
  [P in keyof Attributes]: CharacterAttribute;
};
