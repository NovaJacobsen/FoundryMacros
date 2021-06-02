import { Base } from "./Base";
export { Base } from "./Base";
export { Checkbox } from "./Checkbox";
export { Constant } from "./Constant";
export { Dropdown } from "./Dropdown";

export type ElementCollection<T> = { [P in keyof T]: Base<T[P]> };
export type Element = Base;
