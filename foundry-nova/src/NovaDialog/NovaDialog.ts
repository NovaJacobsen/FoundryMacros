export class NovaDialog {
  dialog: Dialog;
  title;
  elements;
  html: string;
  buttons: Record<string, Dialog.Button> = {};
  d: string = "";

  constructor(parms: {
    title: string,
    elements: NovaDialog.Element<any>[],
    buttons: Map<string, NovaDialog.Button>,
    template: string,
  }) {
    this.title = parms.title
    this.elements = parms.elements
    this.html = this.elements.reduce((t, e) => e.apply(t), parms.template)
    parms.buttons.forEach((button, name) => {
      if (button.default) { this.d = name }
      let callback = (button.callback) ? (html: HTMLElement | JQuery<HTMLElement>) => button.callback!(this.extract(html as JQuery)) : undefined
      this.buttons[name] = {
        icon: `<i class="fas fa-${button.icon}"></i>`,
        label: button.label,
        callback,
      }
    })
    this.dialog = new Dialog({
      title: this.title,
      content: this.title,
      buttons: this.buttons,
      default: this.d,
    });
  }

  public render(): void {
    this.dialog.render(true);
  }

  public extract(html: JQuery<HTMLElement>): NovaDialog.Params {
    let out = new Map()
    this.elements.forEach(e => out.set(e.key, e.extract(html)));
    return out;
  }
}

export namespace NovaDialog {
  export type Params = Map<string, ExtractionResult>


  export interface Button {
    icon?: string,
    label?: string,
    callback?: (context: Params) => any,
    default?: boolean
  }

  export interface ExtractionResult {
    bool(): boolean
    number(): number
    string(): string
  }

  export abstract class Element<T extends ExtractionResult> {
    key: string

    constructor(key: string) {
      this.key = key
    }

    apply(template: string): string {
      return template.replaceAll(`#{${this.key}}`, this.injectHtml())
    }

    abstract extract(html: JQuery<HTMLElement>): T
    abstract injectHtml(): string

    protected getElement<K extends HTMLElement>(html: JQuery): K {
      return ((html as JQuery<HTMLElement>).find(`#${this.key}`)[0] as K)
    }

  }
}