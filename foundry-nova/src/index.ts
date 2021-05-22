import * as NovaDialog from "./NovaDialog/index"

Hooks.on('ready', () => {
    if (game.userId === "W6ZmuiuY59tnrNxv") {
        NovaDialog.test.render()
        console.log("Hi Nova!")
    } else {
        console.log("You're not nova!")
    }
});