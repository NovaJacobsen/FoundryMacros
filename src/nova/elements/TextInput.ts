import { Base } from ".";

export class TextInput extends Base<string> {
  constructor(
    key: string,
    params?: {
      label?: string;
      placeholder?: string;
    }
  ) {
    super(key);
    params ??= {};
    this.injectHtml = `${this.labelHtml(params.label)}
    <input id="${this.key}" name="${this.key}" 
      type="text"
      placeholder="${params.placeholder}"
    ></input>`;
  }

  extract(html: JQuery) {
    return this.getElement<HTMLInputElement>(html).value;
  }
}
