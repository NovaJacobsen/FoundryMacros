import { Base } from "./Base";
export class Constant<T> extends Base<T> {
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
