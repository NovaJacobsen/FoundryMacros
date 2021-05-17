import { NovaDialog } from ".";

export class Boolean implements NovaDialog.ExtractionResult {
  b;
  constructor(b: boolean) {
    this.b = b
  }

  bool(): boolean {
    return this.b
  }
  number(): number {
    return this.b ? 1 : 0
  }
  string(): string {
    return this.b ? 'yes' : 'no'
  }
}
