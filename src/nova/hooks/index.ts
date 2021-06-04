import * as nova from "..";

export const registerHooks = () => {
  Hooks.once("ready", () => {
    //@ts-ignore
    window.novaAPI = nova
  });
};
