import { Base } from "./Base";
import { Checkbox } from "./Checkbox";
import { Constant } from "./Constant";
import { Dropdown } from "./Dropdown";

export const Elements = {
  Dropdown,
  Constant,
  Checkbox,
};

export type ElementCollection<T> = { [P in keyof T]: Base<T[P]> };
export type Element = Base;
