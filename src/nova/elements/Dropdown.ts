import { Character } from "../models/5e";
import { CharacterResource } from "../models/5e/customParams/customResources";
import { Resource, Resources } from "../models/5e/types";
import { Base } from "./Base";
interface params<T> {
  label?: string | undefined;
  required?: boolean | undefined;
  disabled?: boolean | undefined;
  selected?: T | undefined;
  options: { value: T; label: string }[];
}
export class Dropdown<T> extends Base<T> {
  protected params;

  constructor(key: string, params: params<T>) {
    super(key);
    this.params = params;
    this.injectHtml = `${this.labelHtml(params.label)}
    <select id="${this.key}" name="${this.key}">${this.params.options.map(
      (option) => {
        return `<option ${option.value === params.selected ? "selected" : ""}>${
          option.label
        }</option>`;
      }
    )}</select>
    `;
  }

  extract(html: JQuery<HTMLElement>) {
    return this.params.options[
      this.getElement<HTMLSelectElement>(html).selectedIndex
    ].value;
  }
}

export class AttrDropdown extends Dropdown<keyof Resources> {
  r;
  constructor(
    key: string,
    p: Partial<params<Resource> & { char: Character; r: CharacterResource }>
  ) {
    super(key, {
      ...p,
      selected: p.r?.getKey(),
      options: (Object.keys(p.char!.resorces) as (keyof Resources)[]).map(
        (key) => {
          return {
            value: key,
            label: p.char?.resorces[key].label || key,
          };
        }
      ),
    });
    this.r = p.r;
  }
  onRender(html: JQuery) {
    super.onRender(html);
    this.getElement<HTMLSelectElement>(html).addEventListener("change", () => {
      this.r?.select(this.extract(html));
    });
  }
}
