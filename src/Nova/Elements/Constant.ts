import { Element } from "./Element";

export class Constant<T> extends Element<T> {
  private value;
  constructor(value: T) {
    super();
    this.value = value;
  }
  injectHtml(): string {
    return "";
  }
  extract(_: any): T {
    return this.value;
  }
}
