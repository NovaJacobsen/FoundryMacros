import { Base } from "./Base";
export class Constant<T> extends Base<T> {
  private value;
  constructor(key: string, value: T) {
    super(key);
    this.value = value;
  }
  apply(a: string) {
    return a;
  }
  extract(_: any): T {
    return this.value;
  }
}
