import { Base } from "./Base";
export class Blank extends Base<void> {
  constructor(key: string) {
    super(key);
  }
  injectHtml = "";
  extract(): void {}
}
