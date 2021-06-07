import { CharacterAttributes } from ".";
import { Update, CharacterData } from "../../types";

export class Attributes {
  hp: {
    value: number;
    min: number;
    max: number;
    temp?: number;
    tempmax?: number;
  };

  constructor(attrs: Attributes) {
    this.hp = attrs.hp;
  }
  static init(actorData: CharacterData, update: Update): CharacterAttributes {
    let out: any = {};
    let updateAttr = {};
    out.hp = {
      get: (): number => {
        return actorData.attributes.hp.value || 0;
      },
      set: (n: number) => {
        actorData.attributes.hp.value = n;
        update.attributes.hp ??= {};
        update.attributes.hp.value = n;
      },
    };
    update;
    update.attributes = updateAttr;
    return out;
  }
}
