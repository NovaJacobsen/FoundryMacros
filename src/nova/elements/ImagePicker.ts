import { Base } from ".";

export class ImagePicker extends Base<string> {
  private path: string;
  constructor(key: string, params?: { label?: string; default?: string }) {
    super(key);
    params ??= {};
    this.path = params.default ?? CONST.DEFAULT_TOKEN;
    this.injectHtml = `${this.labelHtml(params.label)}
    <img  id="${this.key}" name="${this.key}" src="${params.default}"></img>`;
  }

  extract() {
    return this.path;
  }

  onRender(html: JQuery) {
    super.onRender(html);

    this.getElement(html).addEventListener("click", (ev) => {
      const field = ev.currentTarget as HTMLImageElement;
      const callback = (path: string) => {
        this.path = path;
        field.src = path;
      };
      const fp = new FilePicker({
        current: this.path,
        type: "image",
        title: "Select icon for Spell",
        callback,
      } as any);
      fp.browse();
    });
  }
}
