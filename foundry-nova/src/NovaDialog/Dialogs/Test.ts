import { NovaDialog } from "../NovaDialog";
import template from "./TestDialog.html"
const content = new NovaDialog.Content({
  title: "A test",
  elements: [],
  buttons: new Map,
  template
})

const test = new NovaDialog(content)
export { test };
