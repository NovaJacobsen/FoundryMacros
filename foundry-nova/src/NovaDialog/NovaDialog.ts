export class NovaDialog {
  dialog: Dialog
  constructor(content: NovaDialog.Content) {
    this.dialog = new Dialog({
      title: content.title,
      content: content.html,
      buttons: content.buttons,
      default: content.d,
    });
  }

  public render(): void {
    this.dialog.render(true);
  }
}

export namespace NovaDialog {
  export class Content {
    title;
    elements;
    html: string;
    buttons: Record<string, Dialog.Button> = {};
    d: string = "";

    constructor(parms: {
      title: string,
      elements: Element[],
      buttons: Map<string, Button>,
      template: string,
    }) {
      this.title = parms.title
      this.elements = parms.elements
      this.html = this.elements.reduce((t, e) => e.apply(t), parms.template)
      parms.buttons.forEach((button, name) => {
        if(button.default) { this.d = name }
        let callback = (button.callback) ? (html: HTMLElement | JQuery<HTMLElement>) => button.callback!(this.extract(html)) : undefined
        this.buttons[name] = {
          icon: button.icon,
          label: button.label,
          callback,
        }
      })
    }

    public extract(html: HTMLElement | JQuery<HTMLElement>): Map<string, any> {
      let out = new Map()
      this.elements.forEach(e => out.set(e.key, e.extract(html)));
      return out;
    }
  }

  export interface Button {
    icon?: string,
    label?: string,
    callback?: (context: Map<string, any>) => any,
    default?: boolean
  }

  export interface Element {
    key: string

    apply(template: string): string
    extract(html: HTMLElement | JQuery<HTMLElement>): any
  }
}