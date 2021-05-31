import * as Nova from "./Nova"
export {Nova}

Hooks.once('ready', () => {
    game.Nova = Nova
});