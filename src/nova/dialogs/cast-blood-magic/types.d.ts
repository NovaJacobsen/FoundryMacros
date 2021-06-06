import { Base, Blank, ElementCollection } from "../../elements";
import { Resources } from "../../models/5e/types";

export type Elements = {
  [P in keyof Model]: Base<Model[P]>;
};

export type Model = {
  bp: boolean;
  bpCost: number;
  cCost: number;
  chat: boolean;
  costs: number[];
  hpCost: number;
  level: number;
  update: boolean;
  bpCurr?: number;
  bpAttr?: Resource;
  cCurr?: number;
  cAttr?: Resource;
  hpCurr?: number;
};
