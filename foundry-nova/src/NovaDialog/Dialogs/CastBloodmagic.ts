import { NovaDialog } from "../NovaDialog";
import template from "./CastBloodmagic.html"

const buttons = new Map()

const elements: NovaDialog.Element[] = [

]

const content = new NovaDialog.Content({
  title: "Blood Magic Cost",
  elements,
  buttons,
  template
})

const CastBloodmagicDialog = new NovaDialog(
  content
)
export { CastBloodmagicDialog }
