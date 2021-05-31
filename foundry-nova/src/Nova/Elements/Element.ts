export abstract class Element<T = any> {
  key?: string;

  constructor(key?: string) {
    this.key = key;
  }

  apply(template: string): string {
    if (!this.key) return template;

    return template.replaceAll(`#{${this.key}}`, this.injectHtml());
  }

  abstract extract(html: JQuery<HTMLElement>): T;
  abstract injectHtml(): string;

  protected getElement<K extends HTMLElement>(html: JQuery): K {
    return (html as JQuery<HTMLElement>).find(`#${this.key}`)[0] as K;
  }
}

export type ElementCollection<T> = { [P in keyof T]: Element<T[P]> };
