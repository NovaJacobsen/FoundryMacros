import { Resources } from "../../types";
import { ResourcePointer } from "./CustomResource";
import { CustomResources } from "./CustomResources";

export class BloodPoints extends ResourcePointer {
  constructor(res: Resources) {
    super(res, /blood.*points?/gi);
  }
}

export class Corruption extends ResourcePointer {
  constructor(res: Resources) {
    super(res, /corruption/gi);
  }
}

export type CharacterResource = {
    get: () => number;
    set: (n: number) => void;
    select: (k: keyof Resources) => void;
    getKey: () => keyof Resources;
}
export type CharacterResources = {
  [P in keyof CustomResources]: CharacterResource
};
