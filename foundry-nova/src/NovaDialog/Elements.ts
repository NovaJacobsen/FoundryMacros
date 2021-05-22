import { NovaDialog } from ".";

export class Checkbox extends NovaDialog.Element<boolean> {
  label;
  checked
  constructor(key: string, parms: { label?: string, default?: boolean}) {
    super(key)
    this.label = parms.label
    this.checked = parms.default
  }

  injectHtml(): string {
    return `<div>
    ${this.label ? `<label for="${this.key}">${this.label}</label>` : ''}
    <input type="checkbox" id="${this.key}" name="${this.key} ${this.checked ? 'checked' : ''}">
      </div>`
  }

  extract(html: JQuery<HTMLElement>) {
    return this.getElement<HTMLInputElement>(html).checked
  }
}