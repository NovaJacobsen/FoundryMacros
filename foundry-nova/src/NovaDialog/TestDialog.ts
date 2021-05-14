import { NovaDialog } from "./NovaDialog";
import template from "./TestDialog.html"
const content = new NovaDialog.Content("A test", [], template)

const test = new NovaDialog(content)
export { test };
