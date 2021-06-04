import { Element, ElementCollection } from "../elements";

export class NovaDialog<T> {
  dialog: Dialog;
  title;
  elements: Element[];
  elementKeys;
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
    this.elements = Object.values(elements);
    this.elementKeys = Object.keys(elements);
    this.html = `<form id="ndia">${this.elements.reduce(
      (t, e) => e.apply(t),
      template
    )}</form>`;

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
        label: button.label!,
        callback: callback!,
      };
    });

    const onChange = (html: JQuery) => {
      return () =>
        this.elements.forEach((e) => {
          const model = this.extract(html);
          try {
            e.update(html, model);
          } catch (e) {
            console.log(`Failed to update: ${e.key} with:`, model);
          }
        });
    };

    this.dialog = new Dialog({
      title: this.title,
      content: this.html,
      buttons: this.buttons,
      default: this.d,
      render: (html: JQuery) => {
        let form = html.find("#ndia")[0] as HTMLFormElement;
        form.addEventListener("change", onChange(html), true);
        onChange(html)();
      },
    });
  }

  public render(): void {
    this.dialog.render(true);
  }

  public extract(html: JQuery<HTMLElement>): T {
    let out = Object.fromEntries(
      this.elements.map((element, index) => {
        return [this.elementKeys[index], element.extract(html)];
      })
    );
    return out as T;
  }
}

interface Button<T> {
  icon?: string;
  label?: string;
  callback?: (context: T) => any;
  default?: boolean;
}
