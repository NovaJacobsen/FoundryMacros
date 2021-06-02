import * as nova from "..";

export const registerHooks = () => {
  Hooks.once("ready", () => {
    game.nova = nova
  });
};
