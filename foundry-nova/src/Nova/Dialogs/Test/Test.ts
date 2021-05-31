import { Nova } from "../../.."
import template from "./Test.html"

type Model = {
  theBox: boolean,
}

const buttons = {
  yay: {
    default: true,
    label: 'The default button',
  },
  echo: {
    default: true,
    icon: 'play',
    label: 'Echo!',
    callback: (params: Model) => {
      console.log(`TheBox: ${params.theBox ? 'yes' : 'no'}`)
    }
  }
}


const elements = {
  theBox: new Nova.Elements.Checkbox('theBox', {
    label: 'This is a test checkbox',
  })
}

const test = new Nova.Dialog({
  title: "A test",
  elements,
  buttons,
  template
})

export { test };
