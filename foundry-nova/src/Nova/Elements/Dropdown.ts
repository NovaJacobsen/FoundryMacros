import { Element } from "./Element";

interface Parms<T> {
  label?: string;
  required?: boolean;
  options: { value: T; label: string }[];
}

export class Dropdown<T> extends Element<T> {
  private parms;

  constructor(key: string, parms: Parms<T>) {

    super(key);
    this.parms = parms;
  }

  injectHtml(): string {
    return `
    ${
      this.parms.label
        ? `<label for="${this.key}">${this.parms.label}</label>`
        : ""
    }
    <select id="${this.key}" name="${this.key}">${this.parms.options.map(
      (option) => {
        return `<option>${option.label}</option>`;
      }
    )}</select>
    `;
  }

  extract(html: JQuery<HTMLElement>) {
    return this.parms.options[
      this.getElement<HTMLSelectElement>(html).selectedIndex
    ].value;
  }
}