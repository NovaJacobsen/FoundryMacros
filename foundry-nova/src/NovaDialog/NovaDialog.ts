export class NovaDialog<T> {
  dialog: Dialog;
  title;
  elements;
  html: string;
  buttons: Record<string, Dialog.Button> = {};
  d: string = "";

  constructor({ title, elements, buttons, template}:{
    title: string,
    elements: NovaDialog.ElementCollection<T>,
    buttons: { [K: string]: NovaDialog.Button<T> },
    template: string,
  }) {
    this.title = title
    this.elements = elements
    this.html = this.parseElements(elements).reduce((t, e) => e.apply(t), template)

    Object.entries(buttons)
      .forEach(([name, button]) => {
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
      content: this.html,
      buttons: this.buttons,
      default: this.d,
    });
  }

  public render(): void {
    this.dialog.render(true);
  }

  public extract(html: JQuery<HTMLElement>): T {
    let out = {} as any
    Object.entries(this.elements)
      .map(([key,val]) => ({
        key,
        val: val as NovaDialog.Element
      }))
      .forEach(({key, val}) => out[key] = val.extract(html))
    return out as T
  }

  private parseElements(e: NovaDialog.ElementCollection<T>): NovaDialog.Element[] {
    return Object.values(e)
  }
}

export namespace NovaDialog {
  export type Params = Map<string, ExtractionResult>
  export type ElementCollection<T> = { [P in keyof T]: Element<T[P]> }

  export interface Button<T> {
    icon?: string,
    label?: string,
    callback?: (context: T) => any,
    default?: boolean
  }

  export interface ExtractionResult {
    bool(): boolean
    number(): number
    string(): string
  }

  export class ElementContext {
  }

  export abstract class Element<T = any> {
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