import "@league-of-foundry-developers/foundry-vtt-types"

export class NovaDialog {
    constructor(html: String, data: NovaDialog.Element[], buttons: DialogButton[]) {
        let p : Dialog.Data = {

        }
        let dialog = new Dialog(p);
    }    
}

declare namespace NovaDialog {
    interface Element {
        public key: String;
        public type: ElementType;

        public extract();
    }
}