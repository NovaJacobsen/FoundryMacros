import { NovaDialog } from "../NovaDialog";
import template from "./Test.html"


const buttons = new Map<string, NovaDialog.Button>()
buttons.set('yay', {default: true, label: 'The default button'})
buttons.set('nay', {default: true, label: 'Not this one'})

const elements: NovaDialog.Element[] = [

]

const content = new NovaDialog.Content({
  title: "A test",
  elements,
  buttons,
  template
})

const test = new NovaDialog(content)
export { test };
