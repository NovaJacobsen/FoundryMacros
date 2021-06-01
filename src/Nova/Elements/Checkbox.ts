import { Base } from "./Base";

export class Checkbox extends Base<boolean> {
  private label;
  private checked;
  constructor(key: string, parms: { label?: string; default?: boolean }) {
    super(key);
    this.label = parms.label;
    this.checked = parms.default;
  }

  injectHtml(): string {
    return `<div>
    ${this.label ? `<label for="${this.key}">${this.label}</label>` : ""}
    <input type="checkbox" id="${this.key}" name="${this.key} ${
      this.checked ? "checked" : ""
    }">
      </div>`;
  }

  extract(html: JQuery<HTMLElement>) {
    return this.getElement<HTMLInputElement>(html).checked;
  }
}
