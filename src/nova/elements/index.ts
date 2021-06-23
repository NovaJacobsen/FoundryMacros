import { Base } from "./Base";
export { Base } from "./Base";
export { Blank } from "./Blank";
export { Checkbox } from "./Checkbox";
export { Constant } from "./Constant";
export { Dropdown } from "./Dropdown";
export { ImagePicker } from "./ImagePicker";
export { Output } from "./Output";
export { TextInput } from "./TextInput";

export type ElementCollection<T> = { [P in keyof T]: Base<T[P]> };
export type Element<T = any> = Base<T>;
