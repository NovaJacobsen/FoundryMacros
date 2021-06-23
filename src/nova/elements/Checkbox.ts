import { Base } from "./Base";

export class Checkbox extends Base<boolean> {
  constructor(
    key: string,
    params: { label?: string; default?: boolean; disabled?: boolean }
  ) {
    super(key);
    this.injectHtml = `${this.labelHtml(params.label)} <input
        type=checkbox
        id="${this.key}"
        name="${this.key}"
        ${params.default ? "checked" : ""}
        ${params.disabled ? "disabled" : ""}
      ></input>`;
  }

  extract(html: JQuery<HTMLElement>) {
    return this.getElement<HTMLInputElement>(html).checked;
  }
}
