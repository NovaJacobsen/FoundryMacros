export class NovaDialog {
    constructor(html: String, data: NovaDialog.Element[], buttons: DialogButton[]) {
        let p : Dialog.Data = {
            title: "",
            content: "",
            default: "",
            buttons: {}
        }
        let dialog = new Dialog(p);
    }    
}

declare namespace NovaDialog {
    interface Element {
        key: String;
        type: never;
        extract(): void;
    }
}