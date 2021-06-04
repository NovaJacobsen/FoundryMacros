export abstract class Base<T, M= unknown> {
  key: string;
  constructor(key: string) {
    this.key = key;
  }

  update(_html: JQuery, _model: M): void { }

  apply(template: string): string {
    return template.replaceAll(`#{${this.key}}`, this.injectHtml);
  }

  abstract extract(html: JQuery<HTMLElement>): T;
  protected injectHtml: string = "";

  protected getElement<K extends HTMLElement>(html: JQuery): K {
    return (html as JQuery<HTMLElement>).find(`#${this.key}`)[0] as K;
  }
}
