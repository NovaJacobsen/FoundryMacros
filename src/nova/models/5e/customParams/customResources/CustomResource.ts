import { Resource, Resources } from "../../types";

export class ResourcePointer {
  current: keyof Resources;
  rx: RegExp;
  
  match(res: Resource): boolean {
    return !!res.label?.match(this.rx);
  }

  constructor(res: Resources, rx: RegExp) {
    this.rx = rx;
    this.current = "primary";
    Object.entries(res).forEach(([k, v]) => {
      if (this.match(v)) this.current = k as keyof Resources;
    });
  }
}
