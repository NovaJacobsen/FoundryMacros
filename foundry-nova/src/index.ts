import html from "./a.html"
import * as NovaDialog from "./NovaDialog/index"

Hooks.on('ready', () => {
    if (game.userId === "owhdFVBsbqlC79SE") {
        NovaDialog.test.render()
        console.log("Hi Nova!")
    } else {
        console.log("You're not nova!")
    }
});