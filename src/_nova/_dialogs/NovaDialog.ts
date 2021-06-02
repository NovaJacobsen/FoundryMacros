import { Element, ElementCollection } from "../_elements";

export class NovaDialog<T> {
  dialog: Dialog;
  title;
  elements;
  html: string;
  buttons: Record<string, Dialog.Button> = {};
  d: string = "";

  constructor({
    title,
    elements,
    buttons,
    template,
  }: {
    title: string;
    elements: ElementCollection<T>;
    buttons: { [_: string]: Button<T> };
    template: string;
  }) {
    this.title = title;
    this.elements = elements;
    this.html = this.parseElements(elements).reduce(
      (t, e) => e.apply(t),
      template
    );

    Object.entries(buttons).forEach(([name, button]) => {
      if (button.default) {
        this.d = name;
      }
      let callback = button.callback
        ? (html: HTMLElement | JQuery<HTMLElement>) =>
            button.callback!(this.extract(html as JQuery))
        : undefined;
      this.buttons[name] = {
        icon: `<i class="fas fa-${button.icon}"></i>`,
        label: button.label,
        callback,
      };
    });

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
    let out = {} as any;
    Object.entries(this.elements)
      .map(([key, val]) => ({
        key,
        val: val as Element,
      }))
      .forEach(({ key, val }) => (out[key] = val.extract(html)));
    return out as T;
  }

  private parseElements(e: ElementCollection<T>): Element[] {
    return Object.values(e);
  }
}

interface Button<T> {
  icon?: string;
  label?: string;
  callback?: (context: T) => any;
  default?: boolean;
}
