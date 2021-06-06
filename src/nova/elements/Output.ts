import { Base } from "./Base";

export class Output<T, M> extends Base<T> {
  private label;
  private render;
  private value: T;
  updateData;
  constructor(
    key: string,
    parms: {
      label?: string;
      update?: (model: M) => T;
      render?: (value: T) => string;
      default: T;
    }
  ) {
    super(key);
    this.updateData = parms.update;
    this.render = parms.render || this.interpolate;
    this.label = parms.label;
    this.value = parms.default;
    this.injectHtml = `
    ${this.label ? `<label for="${this.key}">${this.label}</label>` : ""}
    <output id="${this.key}"></output>`;
  }

  private interpolate(value: T): string {
    return value + "";
  }

  extract() {
    return this.value;
  }

  update = (html: JQuery, model: M) => {
    if (this.updateData) {
      this.value = this.updateData(model);

      this.getElement<HTMLOutputElement>(html)[0].value = this.render(
        this.value
      );
    }
  };
}
