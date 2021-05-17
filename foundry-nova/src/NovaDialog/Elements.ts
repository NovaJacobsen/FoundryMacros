import { NovaDialog } from ".";
import * as Extractions from "./Extractions"

export class Checkbox extends NovaDialog.Element<Extractions.Boolean> {
  label;
  checked
  constructor(key: string, label?: string, checked?: boolean) {
    super(key)
    this.label = label
    this.checked = checked
  }

  injectHtml(): string {
    return `<div>
    ${this.label ? `<label for="${this.key}">${this.label}</label>` : ''}
    <input type="checkbox" id="${this.key}" name="${this.key} ${this.checked ? 'checked' : ''}">
      </div>`
  }

  extract(html: JQuery<HTMLElement>) {
    return new Extractions.Boolean(this.getElement<HTMLInputElement>(html).checked)
  }
}