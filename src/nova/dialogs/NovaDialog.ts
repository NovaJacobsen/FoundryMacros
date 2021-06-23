import { Element, ElementCollection } from "../elements";

const tags = /\#\{[^{]*\}/g;

export class NovaDialog<T> {
  dialog: Dialog;
  title;
  elements: Element[];
  elementKeys;
  html: string;
  buttons: Record<string, Dialog.Button> = {};
  d: string = "";
  options = Dialog.defaultOptions;

  constructor({
    title,
    elements,
    buttons,
    template,
    options,
  }: {
    title: string;
    elements: ElementCollection<T>;
    buttons: { [_: string]: Button<T> };
    template: string;
    options?: { height?: number; width?: number };
  }) {
    if(options?.height) this.options.height = options.height
    if(options?.width) this.options.width = options.width
    this.title = title;
    this.elements = Object.values(elements);
    this.elementKeys = Object.keys(elements);
    this.html = `<form id="ndia">${this.elements.reduce(
      (t, e) => e.apply(t),
      template
    )}</form>`.replaceAll(tags, "");

    Object.entries(buttons).forEach(([name, button]) => {
      if (button.default) {
        this.d = name;
      }
      let callback = button.callback
        ? (html: HTMLElement | JQuery<HTMLElement>) =>
            button.callback!(this.extract(html as JQuery))
        : undefined;
      this.buttons[name] = {
        icon: `<i class="fas fa-${button.icon?.toLocaleLowerCase()}"></i>`,
        label: button.label!,
        //@ts-ignore
        jQuery: true,
        callback: callback!,
      };
    });

    const onChange = (html: JQuery) => {
      return () => {
        let model: T = {} as T;
        let oldModel: T;
        let circuit = 10;
        do {
          oldModel = model;
          this.elements.forEach((elem) => {
            model = this.extract(html);
            try {
              elem.update(html, model);
            } catch (error: any) {
              console.error(
                `Failed to update: ${elem.key} with:`,
                model,
                error
              );
            }
          });
          if (circuit-- < 0) break;
        } while (JSON.stringify(model) !== JSON.stringify(oldModel));
      };
    };

    this.dialog = new Dialog(
      {
        title: this.title,
        content: this.html,
        buttons: this.buttons,
        default: this.d,
        render: (html: JQuery) => {
          let form = html.find("#ndia")[0] as HTMLFormElement;
          form.addEventListener(
            "change",
            () => {
              queueMicrotask(onChange(html));
            },
            true
          );
          onChange(html)();
          this.elements.forEach((x) => x.onRender(html));
        },
      },
      this.options
    );
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
