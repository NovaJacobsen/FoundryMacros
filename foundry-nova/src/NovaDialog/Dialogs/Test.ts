import { Checkbox } from "../Elements";
import { NovaDialog } from "../NovaDialog";
import template from "./Test.html"


const buttons = new Map<string, NovaDialog.Button>()
buttons.set('yay', {
  default: true,
  label: 'The default button',
})
buttons.set('echo', {
  default: true,
  icon: 'play',
  label: 'Echo!',
  callback: (params) => {
    console.log(`TheBox: ${params.get('theBox')!.string()}`)
  }
})

const elements: NovaDialog.Element<NovaDialog.ExtractionResult>[] = [
  new Checkbox('theBox', 'This is a test checkbox')
]

const test = new NovaDialog({
  title: "A test",
  elements,
  buttons,
  template
})

export { test };
