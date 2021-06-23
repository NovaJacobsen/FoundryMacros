export abstract class Base<T, M = unknown> {
  key: string;
  constructor(key: string) {
    this.key = key;
  }

  update(_html: JQuery, _model: M): void {}
  onRender(_html: JQuery): void {}

  abstract extract(html: JQuery): T;
  protected injectHtml: string = "";

  protected getElement<K extends HTMLElement>(html: JQuery): K {
    const findings = html.find(`#${this.key}`);
    if (findings.length === 0) {
      console.error(`could not find element ${this.key}`);
    }
    return findings[0] as K;
  }

  protected labelHtml(label?: string) {
    if (!label) return "";
    return `<label for="${this.key}">${label}</label>`;
  }

  apply(template: string): string {
    return template.replaceAll(`#{${this.key}}`, this.injectHtml);
  }
}
