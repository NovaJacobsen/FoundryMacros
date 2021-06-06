import { Base } from "./Base";

export class Checkbox extends Base<boolean> {
  constructor(key: string, parms: { label?: string; default?: boolean , disabled?: boolean}) {
    super(key);
    this.injectHtml = `<div> ${
      parms.label ? `<label for="${this.key}">${parms.label}</label>` : ""
    } <input
        type=checkbox
        id="${this.key}"
        name="${this.key}"
        ${parms.default ? "checked" : ""}
        ${parms.disabled ? "disabled" : ""}
      ></input>
    </div>`;
  }

  extract(html: JQuery<HTMLElement>) {
    return this.getElement<HTMLInputElement>(html)[0].checked
  }
}
