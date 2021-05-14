export class NovaDialog {
  dialog: Dialog
  constructor(content: NovaDialog.Content) {
    this.dialog = new Dialog({
      title: content.title,
      content: content.toHtml(),
      buttons: {},
      default: '',
    });
  }
}

export namespace NovaDialog {
  export class Content {
    title;
    elements;
    template;

    constructor(title: string, elements: Element[], template: string) {
      this.title = title
      this.elements = elements
      this.template = template
    }

    public toHtml(): string {
      return this.elements.reduce((t, e) => e.apply(t), this.template)
    }
  }

  interface Element {
    key: string

    apply(template: string): string
  }
}