import { Nova } from "..";

export const registerHooks = () => {
  Hooks.once("ready", () => {
    game.Nova = Nova;
  });
};
