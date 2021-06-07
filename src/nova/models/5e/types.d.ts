import { CustomParams } from "./customParams";

export type Optional<T> = {
  [P in keyof T]?: Optional<T[P]>;
};
export type Update = Optional<CharacterData>;

// look at game.system.template.Actor["character"]
export type CharacterActor = {
  update: (updates: { data: Update }) => void;
  data: {
    data: CharacterData;
    name: string;
  };
};

export type CharacterData = {
  nova?: CustomParams;
  resources: Resources;
  attributes: Attributes;
};

export type Resources = {
  primary: Resource;
  secondary: Resource;
  tertiary: Resource;
};

export type Resource = {
  value: ?number;
  max: ?number;
  sr: number;
  lr: number;
  label: string;
};
